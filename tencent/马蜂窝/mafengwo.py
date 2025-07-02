import base64
import json
import re
import requests
import time
import hashlib
import execjs
import cv2
import numpy as np
from loguru import logger
from urllib.parse import quote
import urllib3
import io
import sys
import os
from datetime import datetime

# 禁用 urllib3 警告
urllib3.disable_warnings()

# 设置编码
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


class SliderCaptchaSolver:
    """滑块验证码求解器类"""

    def __init__(self, background_path, slider_image_path):
        self.background_path = background_path
        self.slider_image_path = slider_image_path
        self.background = None
        self.slider_image = None
        self.bg_width = None
        self.slider_width = None
        self.cropped_slider = None

    def load_images(self):
        """加载背景图和滑块图"""
        self.background = cv2.imread(self.background_path)
        self.slider_image = cv2.imread(self.slider_image_path)

        if self.background is None or self.slider_image is None:
            raise ValueError("无法加载背景图或滑块图")

        # 获取图像尺寸
        bg_height, self.bg_width, _ = self.background.shape
        slider_height, self.slider_width, _ = self.slider_image.shape
        logger.debug(f"背景图尺寸: ({self.bg_width}, {bg_height}), 滑块图尺寸: ({self.slider_width}, {slider_height})")

    def crop_slider(self):
        """从滑块图中裁剪出滑块区域（支持多种形状）"""
        # 转换为 HSV 颜色空间，尝试通过颜色分割提取滑块
        slider_hsv = cv2.cvtColor(self.slider_image, cv2.COLOR_BGR2HSV)

        # 假设滑块区域颜色较深（接近黑色），背景可能透明或较亮
        lower_black = np.array([0, 0, 0])
        upper_black = np.array([180, 255, 50])
        mask = cv2.inRange(slider_hsv, lower_black, upper_black)

        # 去噪
        mask = cv2.GaussianBlur(mask, (5, 5), 0)

        # 找到轮廓
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        logger.debug(f"滑块图中找到 {len(contours)} 个轮廓（颜色分割）")

        # 如果颜色分割失败，尝试自适应阈值
        if not contours:
            slider_gray = cv2.cvtColor(self.slider_image, cv2.COLOR_BGR2GRAY)
            mask = cv2.adaptiveThreshold(slider_gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                         cv2.THRESH_BINARY_INV, 11, 2)
            mask = cv2.GaussianBlur(mask, (5, 5), 0)
            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            logger.debug(f"滑块图中找到 {len(contours)} 个轮廓（自适应阈值）")

        if not contours:
            raise ValueError("未找到滑块图中的轮廓")

        # 筛选最大的轮廓
        max_contour = max(contours, key=cv2.contourArea)
        perimeter = cv2.arcLength(max_contour, True)
        approx = cv2.approxPolyDP(max_contour, 0.02 * perimeter, True)
        sides = len(approx)
        logger.debug(f"滑块形状: {sides} 边形")

        # 获取边界框
        x, y, w, h = cv2.boundingRect(max_contour)
        logger.debug(f"裁剪滑块区域: 位置 ({x}, {y}), 大小 ({w}, {h})")

        # 裁剪滑块区域（稍微扩大边界）
        padding = 5
        x = max(0, x - padding)
        y = max(0, y - padding)
        w = min(self.slider_width - x, w + 2 * padding)
        h = min(self.slider_image.shape[0] - y, h + 2 * padding)
        self.cropped_slider = self.slider_image[y:y + h, x:x + w]
        cv2.imwrite('cropped_slider.png', self.cropped_slider)
        logger.debug("裁剪后的滑块图已保存为 cropped_slider.png")

    def preprocess_image(self, image):
        """预处理图像：灰度化、高斯模糊、边缘检测"""
        # 转换为 HSV 颜色空间，增强缺口对比
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        lower_black = np.array([0, 0, 0])
        upper_black = np.array([180, 255, 50])
        mask = cv2.inRange(hsv, lower_black, upper_black)

        # 去噪
        mask = cv2.GaussianBlur(mask, (5, 5), 0)

        # 边缘检测
        edges = cv2.Canny(mask, 30, 100)
        return edges

    def find_gap_position(self):
        """使用模板匹配找到背景图中的缺口位置"""
        # 裁剪滑块
        self.crop_slider()

        # 预处理背景图和裁剪后的滑块图
        background_edges = self.preprocess_image(self.background)
        slider_edges = self.preprocess_image(self.cropped_slider)

        # 获取滑块尺寸
        slider_h, slider_w = slider_edges.shape
        logger.debug(f"裁剪后滑块尺寸: ({slider_w}, {slider_h})")

        # 多尺度模板匹配
        best_match_val = -float('inf')
        best_match_loc = None
        best_scale = 1.0
        scales = [0.8, 0.9, 1.0, 1.1, 1.2]
        for scale in scales:
            scaled_slider = cv2.resize(slider_edges, None, fx=scale, fy=scale, interpolation=cv2.INTER_LINEAR)
            scaled_h, scaled_w = scaled_slider.shape

            if scaled_h > background_edges.shape[0] or scaled_w > background_edges.shape[1]:
                continue

            result = cv2.matchTemplate(background_edges, scaled_slider, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, max_loc = cv2.minMaxLoc(result)

            if max_val > best_match_val:
                best_match_val = max_val
                best_match_loc = max_loc
                best_scale = scale

        logger.debug(f"最佳模板匹配值: {best_match_val}, 位置: {best_match_loc}, 缩放比例: {best_scale}")

        if best_match_val < 0.05:
            logger.warning(f"模板匹配值过低 ({best_match_val})，可能识别失败")

        scaled_slider_w = int(slider_w * best_scale)
        scaled_slider_h = int(slider_h * best_scale)
        gap_x = best_match_loc[0] + scaled_slider_w // 2
        gap_y = best_match_loc[1] + scaled_slider_h // 2
        logger.debug(f"缺口中心位置: ({gap_x}, {gap_y})")

        # 可视化
        background_with_marks = self.background.copy()
        cv2.rectangle(background_with_marks, (best_match_loc[0], best_match_loc[1]),
                      (best_match_loc[0] + scaled_slider_w, best_match_loc[1] + scaled_slider_h), (0, 0, 255), 2)
        cv2.imwrite('gap_detection_result.png', background_with_marks)

        return gap_x, gap_y

    def calculate_move_distance(self):
        """计算滑块需要移动的距离"""
        # 加载图片
        self.load_images()

        # 找到缺口位置
        gap_x, gap_y = self.find_gap_position()

        # 使用固定的滑块初始 x 坐标
        slider_initial_x = 50
        distance = gap_x - slider_initial_x
        logger.debug(f"滑块初始位置: {slider_initial_x}, 缺口x位置: {gap_x}, 计算距离: {distance}")

        # 确保距离为正
        if distance < 0:
            logger.warning("计算距离为负，调整为正值")
            distance = abs(distance)

        return distance


class TencentCaptchaVerifier:
    """腾讯滑块验证码验证类"""

    def __init__(self, proxies=None):
        self.proxies = proxies
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://www.mafengwo.cn/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "cross-site",
            "Sec-Fetch-Storage-Access": "none",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.verify_headers = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://turing.captcha.gtimg.com",
            "Pragma": "no-cache",
            "Referer": "https://turing.captcha.gtimg.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.sess = None
        self.init_pos_y = None
        self.pow_answer = None
        self.pow_calc_time = None

    def get_captcha_images(self):
        """获取验证码图片链接并下载"""
        url = "https://t.captcha.qq.com/cap_union_prehandle"
        params = {
            "aid": "2017163193",
            "protocol": "https",
            "accver": "1",
            "showtype": "popup",
            "ua": str(base64.b64encode(self.headers['User-Agent'].encode('utf-8')), 'utf-8'),
            "noheader": "1",
            "fb": "1",
            "aged": "0",
            "enableAged": "0",
            "enableDarkMode": "0",
            "grayscale": "1",
            "dyeid": "0",
            "clientype": "2",
            "cap_cd": "",
            "uid": "",
            "lang": "zh-cn",
            "entry_url": "https://www.mafengwo.cn/sales/8539850.html",
            "elder_captcha": "0",
            "js": "/tcaptcha-frame.771c270b.js",
            "login_appid": "",
            "wb": "1",
            "version": "1.1.0",
            "subsid": "1",
            "callback": "_aq_773179",
            "sess": ""
        }
        response = requests.get(url, headers=self.headers, params=params, proxies=self.proxies, verify=False)
        response_json = json.loads(re.findall(r'\((.*?)\)', response.text)[0])
        data = response_json['data']
        img_url = 'https://t.captcha.qq.com' + data['dyn_show_info']['bg_elem_cfg']['img_url']
        sprite_url = 'https://t.captcha.qq.com' + data['dyn_show_info']['sprite_url']
        self.sess = response_json['sess']
        tdc_url = 'https://t.captcha.qq.com' + data['comm_captcha_cfg']['tdc_path']
        pow_cfg = data['comm_captcha_cfg']['pow_cfg']
        prefix = pow_cfg['prefix']
        md5_value = pow_cfg['md5']
        self.init_pos_y = data['dyn_show_info']['fg_elem_list'][1]['init_pos'][1]

        logger.success("背景图地址======>{}", img_url)
        logger.success("滑块图地址======>{}", sprite_url)
        logger.success("tdc.js地址======>{}", tdc_url)
        logger.success("init_pos_y======>{}", self.init_pos_y)
        logger.success("sess======>{}", self.sess)

        # 下载图片
        with open("img.png", "wb") as f:
            f.write(requests.get(img_url, proxies=self.proxies, verify=False).content)
        with open("sprite.png", "wb") as f:
            f.write(requests.get(sprite_url, proxies=self.proxies, verify=False).content)
        logger.warning("验证码图片下载完成")

        # 下载 tdc.js
        tdc_js_code = requests.get(tdc_url, proxies=self.proxies, verify=False).text
        with open("tdc.js", "w", encoding='utf-8') as f:
            f.write(tdc_js_code)
        logger.warning("tdc.js下载完成")

        # 计算 pow_answer 和 pow_calc_time
        start_time = int(time.time() * 1000)
        self.pow_answer = ""
        for i in range(1, 1000000):
            val = hashlib.md5((prefix + str(i)).encode('utf-8')).hexdigest()
            if val == md5_value:
                self.pow_answer += prefix + str(i)
                break
        end_time = int(time.time() * 1000)
        self.pow_calc_time = end_time - start_time
        logger.debug("pow_answer======>{}", self.pow_answer)
        logger.debug("pow_calc_time======>{}", self.pow_calc_time)

    def verify_captcha(self, distance):
        """执行验证码验证"""
        ans = [
            {
                "elem_id": 1,
                "type": "DynAnswerType_POS",
                "data": f"{int(distance)},{self.init_pos_y}"
            }
        ]

        js = execjs.compile(open('./tx_env_jsdom.js', 'r', encoding='utf-8').read())
        js_code = js.call('get_data')
        logger.debug(js_code)

        collect_value = js_code['collect']
        eks_value = js_code['eks']
        tlg_value = js_code['tlg']

        logger.debug("collect_value======>{}", collect_value)
        logger.debug("tlg_value======>{}", tlg_value)
        logger.debug("eks_value======>{}", eks_value)
        logger.debug("ans======>{}", ans)

        url = "https://t.captcha.qq.com/cap_union_new_verify"
        data = {
            "collect": collect_value,
            "tlg": str(tlg_value),
            "eks": eks_value,
            "sess": self.sess,
            "ans": json.dumps(ans, separators=(',', ':')),
            "pow_answer": self.pow_answer,
            "pow_calc_time": str(self.pow_calc_time)
        }
        response = requests.post(url, headers=self.verify_headers, data=data, proxies=self.proxies, verify=False)
        logger.success("验证结果======>{}", response.text)
        return response.text


def safe_rename(src, dst):
    """安全地重命名文件，避免文件冲突"""
    if not os.path.exists(src):
        logger.debug(f"源文件 {src} 不存在，跳过重命名")
        return

    # 如果目标文件已存在，生成一个新文件名（添加时间戳）
    if os.path.exists(dst):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base, ext = os.path.splitext(dst)
        dst = f"{base}_{timestamp}{ext}"
        logger.warning(f"目标文件 {dst} 已存在，使用新文件名: {dst}")

    try:
        os.rename(src, dst)
        logger.debug(f"文件已重命名为: {dst}")
    except Exception as e:
        logger.error(f"重命名文件失败: {src} -> {dst}, 错误: {str(e)}")


if __name__ == "__main__":
    # 代理设置
    user = 'z60089016'
    psw = ''
    psw = quote(psw, safe="")
    proxies = {
        'http': f'http://{user}:{psw}@proxycn2.huawei.com:8080/',
        'https': f'http://{user}:{psw}@proxycn2.huawei.com:8080/'
    }

    max_retries = 3
    for attempt in range(max_retries):
        # 在每次重试前清理临时文件
        for file in ["img.png", "sprite.png"]:
            if os.path.exists(file):
                os.remove(file)
                logger.debug(f"已删除临时文件: {file}")

        try:
            # 实例化验证码验证器
            verifier = TencentCaptchaVerifier(proxies=proxies)
            verifier.get_captcha_images()

            # 实例化滑块求解器并计算距离
            background_path = "img.png"
            slider_image_path = "sprite.png"
            solver = SliderCaptchaSolver(background_path, slider_image_path)
            distance = solver.calculate_move_distance()
            logger.success(f"计算得到的滑块移动距离: {distance} 像素")

            # 执行验证
            result = verifier.verify_captcha(distance)
            response_json = json.loads(result)
            if response_json.get('errorCode') == '0':
                logger.success("验证码验证成功！")
                break
            else:
                logger.warning(f"验证码验证失败，错误信息: {response_json.get('errorMessage')}")
                safe_rename("img.png", f"failed_img_attempt_{attempt + 1}.png")
                safe_rename("sprite.png", f"failed_sprite_attempt_{attempt + 1}.png")
                if attempt < max_retries - 1:
                    logger.info("重试中...")
                    time.sleep(2)
                    continue
                else:
                    logger.error("达到最大重试次数，验证失败")
                    break
        except Exception as e:
            logger.error(f"错误: {str(e)}")
            safe_rename("img.png", f"failed_img_attempt_{attempt + 1}.png")
            safe_rename("sprite.png", f"failed_sprite_attempt_{attempt + 1}.png")
            if attempt < max_retries - 1:
                logger.info("重试中...")
                time.sleep(2)
                continue
            else:
                logger.error("达到最大重试次数，验证失败")
                break

    # 最后清理临时文件
    for file in ["img.png", "sprite.png"]:
        if os.path.exists(file):
            os.remove(file)
            logger.debug(f"已删除临时文件: {file}")