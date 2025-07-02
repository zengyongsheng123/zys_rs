import base64
import json
import re
import requests
import subprocess
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

    def find_slider_position(self):
        """从滑块图像中识别滑块位置（基于颜色分割）"""
        # 转换为HSV颜色空间
        hsv = cv2.cvtColor(self.slider_image, cv2.COLOR_BGR2HSV)

        # 定义蓝色范围（滑块为蓝色）
        lower_blue = np.array([100, 150, 50])
        upper_blue = np.array([140, 255, 255])
        mask = cv2.inRange(hsv, lower_blue, upper_blue)

        # 去噪
        mask = cv2.GaussianBlur(mask, (7, 7), 0)

        # 找到轮廓
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        logger.debug(f"基于颜色找到滑块区域 {len(contours)} 个轮廓")

        # 筛选滑块轮廓
        for contour in contours:
            area = cv2.contourArea(contour)
            logger.debug(f"滑块轮廓面积: {area}")

            # 放宽面积范围
            if area < 100 or area > 15000:
                continue

            x, y, w, h = cv2.boundingRect(contour)
            logger.debug(f"找到滑块，位置: ({x}, {y}), 大小: ({w}, {h})")
            return x + w // 2, y + h // 2

        raise ValueError("未找到符合条件的滑块")

    def find_gap_position(self):
        """基于颜色识别缺口位置（支持多种形状）"""
        # 转换为HSV颜色空间
        hsv = cv2.cvtColor(self.background, cv2.COLOR_BGR2HSV)

        # 定义黑色范围（缺口为黑色）
        lower_black = np.array([0, 0, 0])
        upper_black = np.array([180, 255, 50])
        mask = cv2.inRange(hsv, lower_black, upper_black)

        # 去噪
        mask = cv2.GaussianBlur(mask, (7, 7), 0)

        # 找到轮廓
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        logger.debug(f"基于颜色找到 {len(contours)} 个轮廓")

        # 筛选可能的缺口轮廓
        for contour in contours:
            area = cv2.contourArea(contour)
            logger.debug(f"轮廓面积: {area}")

            # 面积筛选
            if area < 200 or area > 15000:
                continue

            # 获取边界框
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = w / h if h != 0 else 0
            logger.debug(f"轮廓边界框: ({x}, {y}), 大小: ({w}, {h}), 宽高比: {aspect_ratio}")

            # 筛选规则形状（正方形、长方形、三角形等）
            if 0.5 <= aspect_ratio <= 2.0:
                logger.debug(f"找到疑似缺口（可能为正方形/长方形），位置: ({x}, {y}), 大小: ({w}, {h})")
                return x + w // 2, y + h // 2

            # 近似多边形，检测三角形等形状
            perimeter = cv2.arcLength(contour, True)
            approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)
            sides = len(approx)
            logger.debug(f"轮廓边数: {sides}")

            # 支持三角形（3边）或更多边形
            if 3 <= sides <= 10:
                logger.debug(f"找到疑似缺口（可能为三角形/多边形），位置: ({x}, {y}), 大小: ({w}, {h})")
                return x + w // 2, y + h // 2

        raise ValueError("未找到符合条件的缺口")

    def calculate_move_distance(self):
        """计算滑块需要移动的距离"""
        # 加载图片
        self.load_images()

        # 找到滑块位置（中心x和y坐标）
        slider_x, slider_y = self.find_slider_position()

        # 找到缺口位置（中心x和y坐标）
        gap_x, gap_y = self.find_gap_position()

        # 缩放滑块x坐标到背景图的坐标系
        scale = self.bg_width / self.slider_width
        scaled_slider_x = slider_x * scale
        logger.debug(f"缩放比例: {scale}, 原始滑块x: {slider_x}, 缩放后滑块x: {scaled_slider_x}")

        # 计算距离（滑块和缺口在同一水平线，忽略y坐标差异）
        if gap_x < scaled_slider_x:
            logger.warning("缩放后缺口x坐标小于滑块x坐标，可能是识别错误，调整为正距离...")
            distance = scaled_slider_x - gap_x
        else:
            distance = gap_x - scaled_slider_x

        logger.debug(f"缺口中心位置: ({gap_x}, {gap_y}), 缩放后滑块中心位置: ({scaled_slider_x}, {gap_y})")

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
        # 构造 ans 参数
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

        # # 调用 main.js 获取 collect_value 和 eks_value
        # result = subprocess.run(
        #     ["node", "main.js"],
        #     capture_output=True,
        #     text=True,
        #     encoding="utf-8"
        # )
        # # 捕获 stdout 和 stderr
        # stdout = result.stdout.strip() if result.stdout else ""
        # stderr = result.stderr.strip() if result.stderr else ""
        # logger.debug("main.js stdout={}", stdout)
        # logger.debug("main.js stderr={}", stderr)
        #
        # # 检查是否有错误
        # if stderr:
        #     logger.error("main.js 执行出错: {}", stderr)
        #     raise RuntimeError(f"main.js 执行出错: {stderr}")
        #
        # # 提取 collect_value 和 eks_value
        # collect_value_match = re.search(r'collect_value=====>(.+?)(?=\n|$|eks_value)', stdout, re.DOTALL)
        # eks_value_match = re.search(r'eks_value=====>(.+?)(?=\n|$)', stdout, re.DOTALL)
        #
        # if not collect_value_match or not eks_value_match:
        #     logger.error("未能从main.js输出中提取collect_value和eks_value")
        #     logger.debug("完整输出: {}", stdout)
        #     if not collect_value_match:
        #         logger.error("collect_value 提取失败")
        #     if not eks_value_match:
        #         logger.error("eks_value 提取失败")
        #     raise ValueError("未能从main.js输出中提取collect_value和eks_value")
        #
        # collect_value = collect_value_match.group(1).strip()
        # eks_value = eks_value_match.group(1).strip()
        collect_value = js_code['collect']
        eks_value = js_code['eks']
        tlg_value = js_code['tlg']

        logger.debug("collect_value======>{}", collect_value)
        logger.debug("tlg_value======>{}", tlg_value)
        logger.debug("eks_value======>{}", eks_value)
        logger.debug("ans======>{}", ans)

        # 请求验证接口
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


if __name__ == "__main__":
    # 代理设置
    user = 'z60089016'
    psw = ''
    psw = quote(psw, safe="")
    proxies = {
        'http': f'http://{user}:{psw}@proxycn2.huawei.com:8080/',
        'https': f'http://{user}:{psw}@proxycn2.huawei.com:8080/'
    }

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
    except Exception as e:
        logger.error(f"错误: {str(e)}")