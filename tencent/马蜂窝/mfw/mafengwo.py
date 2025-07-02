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
from DrissionPage import ChromiumPage, ChromiumOptions
from PIL import Image
import uuid

# 禁用 urllib3 警告
urllib3.disable_warnings()

# 设置编码
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


class SliderCaptchaSolver:
    """滑块验证码求解器类，处理图片URL"""

    def __init__(self, background_url, slider_image_url):
        self.background_url = background_url
        self.slider_image_url = slider_image_url
        self.background = None
        self.slider_image = None
        self.bg_width = None
        self.slider_width = None
        self.cropped_slider = None
        self.temp_bg_path = None
        self.temp_slider_path = None

    def load_images(self):
        """从URL加载背景图和滑块图，并保存为临时文件"""
        try:
            # 下载背景图
            bg_content = requests.get(self.background_url, verify=False, timeout=10).content
            self.temp_bg_path = f"temp_bg_{int(time.time())}.png"
            with open(self.temp_bg_path, 'wb') as f:
                f.write(bg_content)

            # 下载滑块图
            slider_content = requests.get(self.slider_image_url, verify=False, timeout=10).content
            self.temp_slider_path = f"temp_slider_{int(time.time())}.png"
            with open(self.temp_slider_path, 'wb') as f:
                f.write(slider_content)

            # 加载图像
            self.background = cv2.imread(self.temp_bg_path)
            self.slider_image = cv2.imread(self.temp_slider_path)

            if self.background is None or self.slider_image is None:
                raise ValueError("无法加载背景图或滑块图")

            # 获取图像尺寸
            bg_height, self.bg_width, _ = self.background.shape
            slider_height, self.slider_width, _ = self.slider_image.shape
            logger.debug(
                f"背景图尺寸: ({self.bg_width}, {bg_height}), 滑块图尺寸: ({self.slider_width}, {slider_height})")

        except Exception as e:
            logger.error(f"加载图片失败: {e}")
            raise

    def cleanup_temp_files(self):
        """清理临时文件"""
        for path in [self.temp_bg_path, self.temp_slider_path]:
            if path and os.path.exists(path):
                try:
                    os.remove(path)
                    logger.debug(f"已删除临时文件: {path}")
                except Exception as e:
                    logger.warning(f"删除临时文件 {path} 失败: {e}")

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
        try:
            # 加载图片
            self.load_images()

            # 找到缺口位置
            gap_x, gap_y = self.find_gap_position()

            # 使用固定的滑块初始 x 坐标
            slider_initial_x = 50
            distance = gap_x - slider_initial_x
            logger.debug(f"滑块初始位置: {slider_initial_x}, 缺口x位置: {gap_x}, 计算距离: {distance}")

            # 确保距离为正并限制在合理范围内
            distance = max(50, min(552, abs(distance)))

            return distance
        finally:
            # 清理临时文件
            self.cleanup_temp_files()


class TencentCaptchaVerifier:
    """腾讯滑块验证码验证类，改进拖动逻辑"""

    def __init__(self, page=None, output_dir="output"):
        self.page = page
        self.output_dir = output_dir
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
        self.bg_url = None
        self.slider_url = None

    def check_captcha_presence(self):
        """检查页面是否出现验证码"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if iframe:
                logger.info("检测到验证码iframe")
                return True
            logger.info("未检测到验证码iframe")
            return False
        except Exception as e:
            logger.warning(f"检查验证码iframe失败: {str(e)}")
            return False

    def get_captcha_images(self):
        """使用DrissionPage获取验证码图片链接"""
        try:
            # 等待iframe加载
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=10)
            if not iframe:
                raise ValueError("无法定位验证码 iframe")

            # 获取背景图和滑块图
            bg_img = iframe.ele('#slideBg', timeout=5)
            slider_img = iframe.ele('.tc-fg-item', timeout=5)

            if not bg_img or not slider_img:
                raise ValueError("无法获取背景图或滑块图元素")

            # 提取图片URL
            self.bg_url = bg_img.style('background-image').split('url("')[1].split('")')[0]
            self.slider_url = slider_img.style('background-image').split('url("')[1].split('")')[0]

            logger.success(f"背景图地址: {self.bg_url}")
            logger.success(f"滑块图地址: {self.slider_url}")

            # 调用API获取sess和其他参数
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
                "entry_url": self.page.url,  # 动态使用当前页面 URL
                "elder_captcha": "0",
                "js": "/tcaptcha-frame.771c270b.js",
                "login_appid": "",
                "wb": "1",
                "version": "1.1.0",
                "subsid": "1",
                "callback": "_aq_773179",
                "sess": ""
            }
            response = requests.get(url, headers=self.headers, params=params, verify=False)
            response_json = json.loads(re.findall(r'\((.*?)\)', response.text)[0])
            data = response_json['data']
            self.sess = response_json['sess']
            tdc_url = 'https://t.captcha.qq.com' + data['comm_captcha_cfg']['tdc_path']
            pow_cfg = data['comm_captcha_cfg']['pow_cfg']
            prefix = pow_cfg['prefix']
            md5_value = pow_cfg['md5']
            self.init_pos_y = data['dyn_show_info']['fg_elem_list'][1]['init_pos'][1]

            logger.success(f"tdc.js地址: {tdc_url}")
            logger.success(f"init_pos_y: {self.init_pos_y}")
            logger.success(f"sess: {self.sess}")

            # 下载 tdc.js
            tdc_js_code = requests.get(tdc_url, verify=False).text
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
            logger.debug(f"pow_answer: {self.pow_answer}")
            logger.debug(f"pow_calc_time: {self.pow_calc_time}")

        except Exception as e:
            logger.error(f"获取验证码图片失败: {e}")
            raise

    def _find_slider_element(self):
        """多重选择器定位滑块元素"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=10)
            if not iframe:
                logger.warning("无法定位验证码 iframe")
                return None, None

            selectors = [
                '.tc-fg-item tc-slider-normal',
                '.tc-fg-item',
                '.tc-blank-text',
                '.tc-slider-bg unselectable',
                'xpath://div[contains(@class, "tc-fg-item")]',
                'xpath://div[contains(@class, "tc-slider-normal")]'
            ]

            for selector in selectors:
                try:
                    ele = iframe.ele(selector, timeout=2)
                    if ele:
                        logger.info(f"成功定位滑块元素: {selector}")
                        time.sleep(np.random.uniform(0.8, 1.5))
                        try:
                            ele_id = ele.attr('id') or '无ID'
                            ele_class = ele.attr('class')
                            ele_style = ele.style('left') + ele.style('top')
                            ele_hash = hashlib.md5(ele_style.encode()).hexdigest()
                            logger.debug(f"滑块元素属性: ID={ele_id}, Class={ele_class}, StyleHash={ele_hash}")
                            return ele, ele_hash
                        except:
                            logger.debug("无法获取滑块元素属性")
                            return ele, None
                except Exception as e:
                    logger.debug(f"选择器 {selector} 定位失败: {str(e)}")
                    continue
            logger.warning("所有选择器均无法定位滑块元素")
            return None, None
        except Exception as e:
            logger.error(f"定位滑块元素失败: {e}")
            return None, None

    def _check_page_stability(self, slider, prev_hash=None):
        """检查页面是否稳定（检查 iframe 和滑块可见性）"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=3)
            if not iframe:
                logger.warning("iframe 不存在，页面可能已刷新")
                return False

            display = slider.style('display')
            visibility = slider.style('visibility')
            disabled = slider.attr('disabled')
            if display == 'none' or visibility == 'hidden' or disabled:
                logger.warning(f"滑块元素不可交互: display={display}, visibility={visibility}, disabled={disabled}")
                return False

            if prev_hash:
                new_style = slider.style('left') + slider.style('top')
                new_hash = hashlib.md5(new_style.encode()).hexdigest()
                if new_hash != prev_hash:
                    logger.warning(f"滑块样式变更: 原哈希={prev_hash}, 新哈希={new_hash}")
                    return False

            # 额外检查页面是否发生跳转或刷新
            current_url = self.page.url
            if 'mafengwo.cn' not in current_url:
                logger.warning(f"页面URL异常: {current_url}")
                return False

            return True
        except Exception as e:
            logger.warning(f"页面稳定性检查失败: {str(e)}")
            return False

    def _save_debug_screenshot(self, attempt, prefix="debug"):
        """保存调试截图"""
        try:
            screenshot_path = os.path.join(self.output_dir, f"{prefix}_attempt_{attempt}_{uuid.uuid4()}.png")
            self.page.get_screenshot(path=screenshot_path)
            logger.info(f"已保存调试截图: {screenshot_path}")
        except Exception as e:
            logger.warning(f"保存调试截图失败: {str(e)}")

    def drag_slider(self, distance):
        """执行滑块拖动，模拟人类行为"""
        for attempt in range(3):
            try:
                slider, slider_hash = self._find_slider_element()
                if not slider:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 滑块元素为空")
                    self._save_debug_screenshot(attempt, "drag_fail_no_slider")
                    continue

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 页面不稳定")
                    self._save_debug_screenshot(attempt, "drag_fail_unstable")
                    continue

                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
                if not iframe:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: iframe 获取失败")
                    self._save_debug_screenshot(attempt, "drag_fail_no_iframe")
                    continue

                # 保存拖动前截图
                self._save_debug_screenshot(attempt, "before_drag")

                # 获取滑块初始位置
                try:
                    initial_left = float(slider.style('left').replace('px', ''))
                    logger.debug(f"滑块初始left位置: {initial_left}px")
                except:
                    initial_left = 0
                    logger.warning("无法获取滑块初始left位置，使用默认值0")

                try:
                    slider.click()
                    time.sleep(np.random.uniform(0.8, 1.8))
                except Exception as e:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 点击滑块失败: {str(e)}")
                    self._save_debug_screenshot(attempt, "drag_fail_click")
                    continue

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 点击后页面不稳定")
                    self._save_debug_screenshot(attempt, "drag_fail_post_click")
                    continue

                # 模拟人类拖动：分段移动
                total_distance = distance
                steps = np.random.randint(5, 10)  # 随机5-10个步骤
                step_distance = total_distance / steps
                current_distance = 0

                for step in range(steps):
                    step_size = step_distance + np.random.uniform(-2, 2)  # 随机抖动
                    current_distance += step_size
                    try:
                        slider.drag(step_size, 0, duration=np.random.uniform(0.1, 0.3))
                        logger.debug(
                            f"拖动步骤 {step + 1}/{steps}: 移动 {step_size:.2f}px, 累计 {current_distance:.2f}px")
                        time.sleep(np.random.uniform(0.05, 0.15))
                    except Exception as e:
                        logger.warning(f"拖动步骤 {step + 1}/{steps} 失败: {str(e)}")
                        break

                # 确保最终距离接近目标
                final_adjust = total_distance - current_distance
                if abs(final_adjust) > 1:
                    try:
                        slider.drag(final_adjust, 0, duration=np.random.uniform(0.1, 0.2))
                        logger.debug(f"最终调整: 移动 {final_adjust:.2f}px")
                    except Exception as e:
                        logger.warning(f"最终调整失败: {str(e)}")

                # 保存拖动后截图
                time.sleep(np.random.uniform(1.5, 2.5))
                self._save_debug_screenshot(attempt, "after_drag")

                # 检查滑块最终位置
                try:
                    final_left = float(slider.style('left').replace('px', ''))
                    logger.debug(f"滑块最终left位置: {final_left}px, 预期移动: {distance}px")
                    if abs(final_left - initial_left - distance) > 10:
                        logger.warning(f"滑块移动距离偏差较大: 实际 {final_left - initial_left}px, 预期 {distance}px")
                except:
                    logger.warning("无法获取滑块最终left位置")

                logger.success(f"拖动尝试 {attempt + 1}/3: 拖动完成，目标距离 {distance}px")
                return True

            except Exception as e:
                logger.warning(f"拖动尝试 {attempt + 1}/3: 拖动失败: {str(e)}")
                self._save_debug_screenshot(attempt, "drag_fail_general")
                time.sleep(np.random.uniform(2.5, 3.5))
        logger.warning("拖动失败，达到最大重试次数")
        return False

    def verify_captcha(self, distance):
        """执行验证码验证"""
        try:
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

            logger.debug(f"collect_value: {collect_value}")
            logger.debug(f"tlg_value: {tlg_value}")
            logger.debug(f"eks_value: {eks_value}")
            logger.debug(f"ans: {ans}")

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
            response = requests.post(url, headers=self.verify_headers, data=data, verify=False)
            logger.success(f"验证结果: {response.text}")
            return response.text
        except Exception as e:
            logger.error(f"验证码验证失败: {e}")
            raise


def safe_rename(src, dst, output_dir):
    """安全地重命名文件，避免文件冲突"""
    if not os.path.exists(src):
        logger.debug(f"源文件 {src} 不存在，跳过重命名")
        return

    if os.path.exists(dst):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        base, ext = os.path.splitext(os.path.basename(dst))
        dst = os.path.join(output_dir, f"{base}_{timestamp}{ext}")
        logger.warning(f"目标文件 {dst} 已存在，使用新文件名: {dst}")

    try:
        os.rename(src, dst)
        logger.debug(f"文件已重命名为: {dst}")
    except Exception as e:
        logger.error(f"重命名文件失败: {src} -> {dst}, 错误: {str(e)}")


def perform_additional_operations(page, output_dir):
    """执行验证码验证成功后的其他操作或无验证码时的操作"""
    try:
        logger.info("开始执行附加操作")

        # 示例操作1：爬取整个网页的 HTML 数据
        try:
            html_content = page.html
            if not html_content:
                logger.warning("未获取到页面 HTML 内容")
            else:
                # 解析 URL 获取 /sales/[1] 部分
                current_url = page.url
                logger.debug(f"当前页面 URL: {current_url}")
                match = re.search(r'/sales/(\d+)', current_url)
                if match:
                    sales_id = match.group(1)
                    html_filename = os.path.join(output_dir, f"page_html_{sales_id}.html")
                    logger.info(f"从 URL 提取 sales_id: {sales_id}")
                else:
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    html_filename = os.path.join(output_dir, f"page_html_{timestamp}.html")
                    logger.warning(f"无法从 URL 提取 sales_id，使用时间戳命名: {html_filename}")

                # 检查文件是否存在，若存在则添加时间戳
                if os.path.exists(html_filename):
                    base, ext = os.path.splitext(os.path.basename(html_filename))
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    html_filename = os.path.join(output_dir, f"{base}_{timestamp}{ext}")
                    logger.warning(f"文件 {html_filename} 已存在，使用新文件名: {html_filename}")

                # 保存 HTML
                with open(html_filename, "w", encoding='utf-8') as f:
                    f.write(html_content)
                logger.success(f"网页 HTML 已保存到 {html_filename}")
        except Exception as e:
            logger.error(f"爬取或保存 HTML 失败: {str(e)}")
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            html_filename = os.path.join(output_dir, f"page_html_failed_{timestamp}.html")
            try:
                with open(html_filename, "w", encoding='utf-8') as f:
                    f.write("<!-- HTML 爬取失败 -->\n")
                logger.warning(f"创建空 HTML 文件: {html_filename}")
            except Exception as e2:
                logger.error(f"创建备用 HTML 文件失败: {str(e2)}")

        # TODO: 在此添加您的自定义操作
        # 例如：
        # - 填写特定表单：page.ele('input#username').input('my_username')
        # - 点击特定链接：page.ele('a:contains("下一步")').click()
        # - 提取数据：data = page.ele('.data-table').text
        # - 执行JavaScript：page.run_js('document.querySelector("form").submit()')

        logger.success("所有附加操作完成")
    except Exception as e:
        logger.error(f"附加操作失败: {str(e)}")
        raise


if __name__ == "__main__":
    # 配置浏览器
    options = ChromiumOptions()
    options.set_argument('--disable-blink-features=AutomationControlled')
    options.set_argument('--no-sandbox')
    options.set_argument('--disable-gpu')
    options.set_argument('--disable-dev-shm-usage')
    options.set_argument('--window-size=800,600')
    options.set_user_agent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/536.36')
    options.set_argument('--disable-features=WebDriver')

    # 创建输出目录
    output_dir = "output"
    try:
        os.makedirs(output_dir, exist_ok=True)
        logger.info(f"输出目录已准备: {output_dir}")
    except Exception as e:
        logger.error(f"创建输出目录 {output_dir} 失败: {str(e)}")
        sys.exit(1)

    # 读取 url.txt
    url_file = 'url.txt'
    urls = []
    try:
        with open(url_file, 'r', encoding='utf-8') as f:
            urls = [line.strip() for line in f if line.strip()]
        logger.info(f"从 {url_file} 读取到 {len(urls)} 个 URL")
    except FileNotFoundError:
        logger.error(f"URL 文件 {url_file} 不存在")
        sys.exit(1)
    except Exception as e:
        logger.error(f"读取 URL 文件失败: {str(e)}")
        sys.exit(1)

    if not urls:
        logger.error("URL 列表为空，程序退出")
        sys.exit(1)

    # 处理每个 URL
    for index, url in enumerate(urls, 1):
        logger.info(f"处理 URL {index}/{len(urls)}: {url}")

        # 去重检查
        try:
            match = re.search(r'/sales/(\d+)', url)
            if match:
                sales_id = match.group(1)
                html_filename = os.path.join(output_dir, f"page_html_{sales_id}.html")
                if os.path.exists(html_filename):
                    logger.info(f"HTML 文件 {html_filename} 已存在，跳过 URL: {url}")
                    continue
                else:
                    logger.info(f"HTML 文件 {html_filename} 不存在，开始爬取")
            else:
                logger.warning(f"无法从 URL 提取 sales_id，将继续爬取: {url}")
        except Exception as e:
            logger.error(f"去重检查失败，继续爬取 URL {url}: {str(e)}")

        page = None
        try:
            page = ChromiumPage(options)
            max_retries = 3
            captcha_solved = False

            # 访问页面
            try:
                page.get(url, timeout=15)
                time.sleep(6)
            except Exception as e:
                logger.error(f"访问 URL {url} 失败: {str(e)}")
                continue

            # 检查验证码是否存在
            verifier = TencentCaptchaVerifier(page=page, output_dir=output_dir)
            if verifier.check_captcha_presence():
                # 验证码存在，尝试解决
                for attempt in range(max_retries):
                    try:
                        # 获取验证码图片
                        verifier.get_captcha_images()

                        # 计算滑块移动距离
                        solver = SliderCaptchaSolver(verifier.bg_url, verifier.slider_url)
                        distance = solver.calculate_move_distance()
                        logger.success(f"计算得到的滑块移动距离: {distance} 像素")

                        # 执行拖动
                        logger.info("尝试执行滑块拖动")
                        if not verifier.drag_slider(distance):
                            logger.warning("滑块拖动失败，跳过本次验证")
                            safe_rename("gap_detection_result.png", f"failed_gap_attempt_{attempt + 1}.png", output_dir)
                            safe_rename("cropped_slider.png", f"failed_slider_attempt_{attempt + 1}.png", output_dir)
                            if attempt < max_retries - 1:
                                logger.info("重试中...")
                                page.refresh()
                                time.sleep(6)
                                continue
                            else:
                                logger.error("达到最大重试次数，验证失败")
                                break

                        # 拖动成功后执行验证
                        result = verifier.verify_captcha(distance)
                        response_json = json.loads(result)
                        if response_json.get('errorCode') == '0':
                            logger.success("验证码验证成功！")
                            captcha_solved = True
                            break
                        else:
                            logger.warning(f"验证码验证失败，错误信息: {response_json.get('errorMessage')}")
                            safe_rename("gap_detection_result.png", f"failed_gap_attempt_{attempt + 1}.png", output_dir)
                            safe_rename("cropped_slider.png", f"failed_slider_attempt_{attempt + 1}.png", output_dir)
                            if attempt < max_retries - 1:
                                logger.info("重试中...")
                                page.refresh()
                                time.sleep(6)
                                continue
                            else:
                                logger.error("达到最大重试次数，验证失败")
                                break
                    except Exception as e:
                        logger.error(f"验证码处理错误: {str(e)}")
                        safe_rename("gap_detection_result.png", f"failed_gap_attempt_{attempt + 1}.png", output_dir)
                        safe_rename("cropped_slider.png", f"failed_slider_attempt_{attempt + 1}.png", output_dir)
                        if attempt < max_retries - 1:
                            logger.info("重试中...")
                            page.refresh()
                            time.sleep(6)
                            continue
                        else:
                            logger.error("达到最大重试次数，验证失败")
                            break
            else:
                # 无验证码，直接执行后续操作
                logger.info("无验证码，跳过验证码处理，直接执行附加操作")
                captcha_solved = True  # 标记为已“解决”，以便执行后续操作

            # 如果验证码解决成功或无验证码，执行附加操作
            if captcha_solved:
                perform_additional_operations(page, output_dir)

        except Exception as e:
            logger.error(f"处理 URL {url} 出错: {str(e)}")
        finally:
            # 清理临时文件（不清理 HTML 文件，保留供分析）
            for file in ["gap_detection_result.png", "cropped_slider.png", "tdc.js"]:
                if os.path.exists(file):
                    try:
                        os.remove(file)
                        logger.debug(f"已删除临时文件: {file}")
                    except Exception as e:
                        logger.warning(f"删除临时文件 {file} 失败: {str(e)}")
            if page:
                page.quit()
            # 随机等待，模拟人类行为
            time.sleep(np.random.uniform(2, 5))

    logger.info("所有 URL 处理完成")