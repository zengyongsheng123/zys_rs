from DrissionPage import ChromiumPage, ChromiumOptions
import cv2
import numpy as np
import requests
import time
import random
import hashlib
from loguru import logger
import urllib3
import uuid
import math
import ddddocr

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class SliderCaptchaSolver:
    """滑块验证码自动化解决方案，使用 ddddocr 进行缺口检测，支持动态初始位置"""

    def __init__(self, page, offset_adjust=0):
        self.page = page
        self.bg_width = 672  # 背景图宽度
        self.slider_init_x = 50  # 滑块初始位置（动态更新）
        self.gap_init_x = 50  # 缺口初始位置
        self.max_slide_distance = 502  # 最大滑动距离
        self.slider_width = 60  # 滑块默认宽度
        self.offset_adjust = offset_adjust  # 用户指定的额外偏移量
        self.initial_url = page.url  # 记录初始页面 URL
        try:
            # 使用最新 ddddocr 模型
            self.ddddocr_slide = ddddocr.DdddOcr(show_ad=False, det=False, ocr=False)
        except Exception as e:
            logger.error(f"初始化 ddddocr 失败: {e}")
            self.ddddocr_slide = None

    def has_captcha(self):
        """检查页面是否包含验证码"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if iframe:
                logger.info("检测到验证码 iframe")
                return True
            logger.info("未检测到验证码 iframe")
            return False
        except Exception as e:
            logger.warning(f"检查验证码存在性失败: {str(e)}")
            return False

    def refresh_captcha(self):
        """仅刷新验证码而不刷新整个页面"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if iframe:
                refresh_btn = iframe.ele('.tc-button-icon tc-refresh-icon', timeout=5)
                if refresh_btn:
                    refresh_btn.click()
                    time.sleep(random.uniform(4.0, 6.0))  # 增加等待时间
                    logger.info("验证码已刷新")
                    return True
        except Exception as e:
            logger.error(f"刷新验证码失败: {e}")
        return False

    def get_captcha_images(self):
        """增强稳定性的图片获取方法"""
        max_retries = 3
        for attempt in range(1, max_retries + 1):
            try:
                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=15)
                if not iframe:
                    logger.warning(f"iframe获取失败 (尝试 {attempt}/{max_retries})")
                    continue

                bg_img = iframe.ele('#slideBg', timeout=5)
                slider_img = iframe.ele('.tc-fg-item', timeout=5)

                bg_style = bg_img.style('background-image')
                slider_style = slider_img.style('background-image')

                bg_url = bg_style.split('url("')[1].split('")')[0]
                slider_url = slider_style.split('url("')[1].split('")')[0]

                return bg_url, slider_url

            except Exception as e:
                logger.warning(f"图片获取失败 (尝试 {attempt}/{max_retries}): {str(e)}")
                if attempt == max_retries:
                    raise
                time.sleep(random.uniform(1.5, 2.5))
        return None, None

    def _template_match(self, bg_img, slider_img):
        """使用 OpenCV 模板匹配作为 ddddocr 失败时的备选"""
        try:
            bg_gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)
            slider_gray = cv2.cvtColor(slider_img, cv2.COLOR_BGR2GRAY)
            result = cv2.matchTemplate(bg_gray, slider_gray, cv2.TM_CCOEFF_NORMED)
            _, _, _, max_loc = cv2.minMaxLoc(result)
            gap_x = max_loc[0]
            logger.debug(f"OpenCV 模板匹配结果: gap_x={gap_x}")
            return gap_x
        except Exception as e:
            logger.error(f"模板匹配失败: {e}")
            return None

    def process_images(self, bg_url, slider_url):
        """使用 ddddocr 处理验证码图片并返回滑动距离，包含 OpenCV 备选"""
        try:
            # 下载图片并验证
            bg_response = requests.get(bg_url, verify=False, timeout=10)
            slider_response = requests.get(slider_url, verify=False, timeout=10)

            if bg_response.status_code != 200 or len(bg_response.content) < 1000:
                logger.error(f"背景图下载失败: 状态码 {bg_response.status_code}, 内容长度 {len(bg_response.content)}")
                return None
            if slider_response.status_code != 200 or len(slider_response.content) < 100:
                logger.error(f"滑块图下载失败: 状态码 {slider_response.status_code}, 内容长度 {len(slider_response.content)}")
                return None

            bg_content = bg_response.content
            slider_content = slider_response.content

            # 转换为 OpenCV 格式
            bg_img = cv2.imdecode(np.frombuffer(bg_content, np.uint8), cv2.IMREAD_COLOR)
            slider_img = cv2.imdecode(np.frombuffer(slider_content, np.uint8), cv2.IMREAD_COLOR)

            if bg_img is None or slider_img is None:
                logger.error("图片解码失败: 背景图或滑块图无效")
                return None

            # 验证图片尺寸
            bg_height, bg_width = bg_img.shape[:2]
            slider_height, slider_width = slider_img.shape[:2]
            logger.debug(f"背景图尺寸: {bg_width}x{bg_height}, 滑块图尺寸: {slider_width}x{slider_height}")
            if bg_width < 100 or bg_height < 100 or slider_width < 10 or slider_height < 10:
                logger.error(f"图片尺寸过小: 背景图 {bg_width}x{bg_height}, 滑块图 {slider_width}x{slider_height}")
                return None

            # 保存原始图片用于调试
            timestamp = int(time.time())
            cv2.imwrite(f'raw_bg_{timestamp}.png', bg_img)
            cv2.imwrite(f'raw_slider_{timestamp}.png', slider_img)

            # 预处理图片（跳过复杂预处理，保留原始图像）
            bg_img_processed = bg_img
            slider_img_processed = self._preprocess_slider(slider_img)
            if slider_img_processed is None:
                logger.error("滑块图预处理失败")
                return None

            # 保存处理后的图片
            cv2.imwrite(f'debug_bg_{timestamp}.png', bg_img_processed)
            cv2.imwrite(f'debug_slider_{timestamp}.png', slider_img_processed)
            logger.info(f"保存调试图像: debug_bg_{timestamp}.png, debug_slider_{timestamp}.png")

            # 使用 ddddocr 进行滑块识别
            gap_x = None
            if self.ddddocr_slide:
                try:
                    _, bg_encoded = cv2.imencode('.png', bg_img_processed)
                    _, slider_encoded = cv2.imencode('.png', slider_img_processed)
                    bg_content_processed = bg_encoded.tobytes()
                    slider_content_processed = slider_encoded.tobytes()

                    result = self.ddddocr_slide.slide_match(slider_content_processed, bg_content_processed)
                    if not result or 'target_x' not in result:
                        logger.error("ddddocr 滑块识别失败，返回空结果")
                    else:
                        gap_x = result['target_x']
                        logger.debug(f"ddddocr 识别结果: {result}")
                        if gap_x < self.gap_init_x:
                            logger.warning(f"ddddocr 识别的缺口位置 {gap_x} 小于初始位置 {self.gap_init_x}，调整为最小值")
                            gap_x = self.gap_init_x
                except Exception as e:
                    logger.error(f"ddddocr 滑块识别失败: {str(e)}")

            # 如果 ddddocr 失败，尝试 OpenCV 模板匹配
            if gap_x is None:
                logger.warning("ddddocr 失败，尝试 OpenCV 模板匹配")
                gap_x = self._template_match(bg_img_processed, slider_img_processed)
                if gap_x is None:
                    logger.error("OpenCV 模板匹配失败，回退到随机距离")
                    gap_x = random.randint(100, 400)

            # 计算滑动距离
            distance = gap_x - self.slider_init_x + self.offset_adjust
            distance = max(10, min(self.max_slide_distance, distance))

            # 调试图像：标记滑块初始、缺口位置和预期滑块位置
            debug_img = bg_img_processed.copy()
            cv2.line(debug_img, (int(self.slider_init_x), 0), (int(self.slider_init_x), debug_img.shape[0]), (255, 0, 0), 2)
            cv2.line(debug_img, (gap_x, 0), (gap_x, debug_img.shape[0]), (0, 255, 0), 2)
            expected_pos = self.slider_init_x + distance
            cv2.line(debug_img, (int(expected_pos), 0), (int(expected_pos), debug_img.shape[0]), (0, 0, 255), 2)
            cv2.imwrite(f'debug_match_{timestamp}.png', debug_img)
            logger.info(f"保存缺口检测调试图像: debug_match_{timestamp}.png")

            logger.success(f"计算滑动距离: {distance} (方法: {'ddddocr' if gap_x != random.randint(100, 400) else '随机'}, gap_x: {gap_x}, 滑块初始位置: {self.slider_init_x}, 总位置: {self.slider_init_x + distance})")
            return distance

        except Exception as e:
            logger.error(f"图片处理失败: {e}")
            return None

    def _preprocess_slider(self, slider_img):
        """预处理滑块图，裁剪透明区域并调整到60x60px"""
        try:
            gray = cv2.cvtColor(slider_img, cv2.COLOR_BGR2GRAY)
            _, mask = cv2.threshold(gray, 10, 255, cv2.THRESH_BINARY)

            contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            if not contours:
                logger.error("滑块图无有效轮廓")
                return None

            max_contour = max(contours, key=cv2.contourArea)
            x, y, w, h = cv2.boundingRect(max_contour)

            target_size = 60
            padding = 5
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = min(slider_img.shape[1] - x, target_size)
            h = min(slider_img.shape[0] - y, target_size)

            cropped = slider_img[y:y + h, x:x + w]
            if cropped.shape[0] < 10 or cropped.shape[1] < 10:
                logger.error(f"裁剪后滑块图尺寸过小: {cropped.shape[1]}x{cropped.shape[0]}")
                return None

            resized = cv2.resize(cropped, (target_size, target_size), interpolation=cv2.INTER_AREA)
            return resized
        except Exception as e:
            logger.error(f"滑块图预处理失败: {e}")
            return None

    def _generate_trajectory(self, distance, is_backtrack=False):
        """生成人类化的水平轨迹，增加随机性和垂直抖动"""
        trajectory = []
        total_time = random.uniform(1.2, 1.8) if not is_backtrack else random.uniform(0.6, 0.8)
        steps = random.randint(50, 70)
        dt = total_time / steps
        remaining = distance

        for i in range(steps):
            progress = i / (steps - 1)
            weight = 0.3 + 0.7 * (progress ** 1.5)
            step_distance = (distance / steps) * (1 + weight) / 1.35
            jitter_x = random.uniform(-2.0, 2.0) if not is_backtrack else 0
            jitter_y = random.uniform(-3.0, 3.0) if not is_backtrack else 0
            step_distance = int(min(max(1 if not is_backtrack else -1, step_distance + jitter_x), remaining))
            trajectory.append((step_distance, jitter_y, dt * random.uniform(0.8, 1.2)))
            remaining -= step_distance
            if abs(remaining) <= 1:
                break

        if remaining != 0:
            trajectory.append((remaining, 0, dt))

        total_distance = sum(t[0] for t in trajectory)
        logger.debug(f"生成{'回滑' if is_backtrack else '前进'}轨迹: 步数 {len(trajectory)}, 总距离 {total_distance}, 目标距离 {distance}, 总时间 {total_time:.2f}s")
        return trajectory

    def solve_captcha(self, max_attempts=3):
        """验证码解决方案，成功后执行后续操作"""
        for attempt in range(1, max_attempts + 1):
            try:
                logger.info(f"开始尝试 {attempt}/{max_attempts}")
                if attempt > 1:
                    self._refresh_or_reload()
                    time.sleep(random.uniform(3.0, 4.0))

                bg_url, slider_url = self._get_images_with_retry()
                if not bg_url:
                    logger.warning("获取图片失败，跳过本次尝试")
                    continue

                slider, slider_hash = self._find_slider_element()
                if not slider:
                    logger.warning("无法定位滑块元素，跳过本次尝试")
                    continue

                time.sleep(random.uniform(1.0, 2.0))
                if not self._check_page_stability(slider, slider_hash):
                    logger.warning("页面不稳定，尝试刷新验证码")
                    self._refresh_or_reload()
                    continue

                distance = self.process_images(bg_url, slider_url)
                if distance is None:
                    logger.warning("滑动距离计算失败，跳过本次尝试")
                    continue
                logger.info(f"计算得到的滑动距离: {distance}")

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning("页面不稳定，尝试刷新验证码")
                    self._refresh_or_reload()
                    continue

                if not self._drag_with_stability_check(slider, distance, slider_hash):
                    logger.warning("拖动失败，跳过本次尝试")
                    continue

                if self._verify_success():
                    logger.success(f"验证码破解成功 (尝试 {attempt})")
                    self._confirm_captcha_cleared()
                    self._perform_post_captcha_actions()
                    return True

                self._save_children_iframe_html(f"debug_iframe_{attempt}_{uuid.uuid4()}.html")
                self._save_debug_info(attempt)

            except Exception as e:
                logger.error(f"尝试 {attempt} 出错: {str(e)}")
                if "断开" in str(e):
                    self._recover_from_disconnect()

            if attempt < max_attempts and not self._verify_success():
                logger.info(f"尝试 {attempt} 失败，准备下一次尝试")
                self._refresh_or_reload()

        logger.error(f"验证失败，已达最大尝试次数 {max_attempts}")
        return False

    def _get_images_with_retry(self):
        """带重试的图片获取方法"""
        for attempt in range(3):
            try:
                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=15)
                if not iframe:
                    logger.warning(f"iframe获取失败 (尝试 {attempt + 1}/3)")
                    continue

                bg_img = iframe.ele('#slideBg', timeout=5)
                slider_img = iframe.ele('.tc-fg-item', timeout=5)

                bg_url = bg_img.style('background-image').split('url("')[1].split('")')[0]
                slider_url = slider_img.style('background-image').split('url("')[1].split('")')[0]

                return bg_url, slider_url
            except Exception as e:
                logger.warning(f"图片获取失败 (尝试 {attempt + 1}/3): {str(e)}")
                time.sleep(random.uniform(1.5, 2.5))
        return None, None

    def _find_slider_element(self):
        """多重选择器定位滑块元素，并动态更新初始位置"""
        iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=15)
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
                    logger.info(f"成功定位滑块元素: {selector}, ID={ele.attr('id')}, Class={ele.attr('class')}, Style={ele.style('left')}, Display={ele.style('display')}, Visibility={ele.style('visibility')}")
                    time.sleep(random.uniform(1.0, 2.0))
                    try:
                        ele_id = ele.attr('id') or '无ID'
                        ele_class = ele.attr('class')
                        ele_style = ele.style('left') + ele.style('top')
                        ele_hash = hashlib.md5(ele_style.encode()).hexdigest()
                        ele_width = float(ele.style('width').replace('px', '')) if ele.style('width') else self.slider_width
                        self.slider_width = ele_width
                        # 动态更新滑块初始位置
                        left = float(ele.style('left').replace('px', '')) if ele.style('left') else self.slider_init_x
                        self.slider_init_x = left
                        logger.debug(f"滑块元素属性: ID={ele_id}, Class={ele_class}, StyleHash={ele_hash}, Width={ele_width}px, 初始位置={left}px")
                        return ele, ele_hash
                    except:
                        logger.debug("无法获取滑块元素属性")
                        return ele, None
            except Exception as e:
                logger.debug(f"选择器 {selector} 定位失败: {str(e)}")
                continue
        logger.warning("所有选择器均无法定位滑块元素")
        return None, None

    def _check_page_stability(self, slider, prev_hash=None):
        """检查页面是否稳定"""
        try:
            if self.page.url != self.initial_url:
                logger.warning("页面 URL 变化，可能是刷新")
                return False

            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if not iframe:
                logger.warning("iframe 不存在，页面可能已刷新")
                return False

            display = slider.style('display')
            visibility = slider.style('visibility')
            disabled = slider.attr('disabled')
            if display == 'none' or visibility == 'hidden' or disabled:
                logger.warning(f"滑块元素不可交互: display={display}, visibility={visibility}, disabled={disabled}")
                return False

            try:
                left = float(slider.style('left').replace('px', ''))
                logger.debug(f"滑块当前位置: {left}px")
                if left < 0 or left > self.bg_width:
                    logger.warning(f"滑块位置异常: {left}px")
                    return False
            except:
                logger.debug("无法获取滑块位置")
                return False

            return True
        except Exception as e:
            logger.warning(f"页面稳定性检查失败: {str(e)}")
            return False

    def _get_slider_position(self, slider, iframe):
        """获取滑块的当前位置"""
        positions = []
        try:
            left = float(slider.style('left').replace('px', ''))
            logger.debug(f"滑块位置 (style.left): {left}px")
            positions.append(left)
        except Exception as e:
            logger.warning(f"获取滑块位置 (style.left) 失败: {str(e)}")

        try:
            rect = iframe.run_js("return arguments[0].getBoundingClientRect();", slider)
            left = rect['left']
            logger.debug(f"滑块位置 (getBoundingClientRect): {left}px")
            positions.append(left)
        except Exception as e:
            logger.warning(f"获取滑块位置 (getBoundingClientRect) 失败: {str(e)}")

        if positions:
            avg_pos = sum(positions) / len(positions)
            logger.debug(f"滑块位置 (平均值): {avg_pos}px")
            return avg_pos
        logger.error("所有滑块位置获取方法均失败")
        return None

    def _drag_with_stability_check(self, slider, distance, slider_hash=None):
        """拖动滑块，使用 JavaScript 模拟，包含回滑校验"""
        for attempt in range(3):
            try:
                if not slider:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 滑块元素为空，重新定位")
                    slider, slider_hash = self._find_slider_element()
                    if not slider:
                        return False

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 页面不稳定，放弃本次拖动")
                    return False

                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
                if not iframe:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: iframe 获取失败")
                    return False

                try:
                    slider.click()
                    time.sleep(random.uniform(1.0, 2.0))
                except Exception as e:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 点击滑块失败: {str(e)}")
                    continue

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 点击后页面不稳定")
                    continue

                trajectory = self._generate_trajectory(distance)
                logger.info(f"拖动尝试 {attempt + 1}/3: 生成前进轨迹长度 {len(trajectory)}, 总距离 {sum(t[0] for t in trajectory)}")

                moves = ",".join([f"{{dx:{m[0]},dy:{m[1]},delay:{m[2]}}}" for m in trajectory])
                js_script = f"""
                try {{
                    const slider = arguments[0];
                    const moves = [{moves}];
                    const rect = slider.getBoundingClientRect();
                    let x = rect.left + rect.width/2;
                    let y = rect.top + rect.height/2;

                    function triggerEvent(type, x, y) {{
                        const evt = new MouseEvent(type, {{
                            bubbles: true,
                            cancelable: true,
                            view: window,
                            clientX: x,
                            clientY: y
                        }});
                        slider.dispatchEvent(evt);
                    }}

                    triggerEvent('mousedown', x, y);
                    let totalDelay = 0;
                    moves.forEach((move, i) => {{
                        totalDelay += move.delay * 1000;
                        setTimeout(() => {{
                            x += move.dx;
                            y += move.dy;
                            triggerEvent('mousemove', x, y);
                            if (i === moves.length - 1) {{
                                setTimeout(() => {{
                                    triggerEvent('mouseup', x, y);
                                }}, 250);
                            }}
                        }}, totalDelay);
                    }});

                    function triggerTouchEvent(type, x, y) {{
                        const evt = new TouchEvent(type, {{
                            bubbles: true,
                            cancelable: true,
                            view: window,
                            touches: [{{clientX: x, clientY: y}}]
                        }});
                        slider.dispatchEvent(evt);
                    }}
                    triggerTouchEvent('touchstart', x, y);
                    moves.forEach((move, i) => {{
                        totalDelay += move.delay * 1000;
                        setTimeout(() => {{
                            x += move.dx;
                            y += move.dy;
                            triggerTouchEvent('touchmove', x, y);
                            if (i === moves.length - 1) {{
                                setTimeout(() => {{
                                    triggerTouchEvent('touchend', x, y);
                                }}, 250);
                            }}
                        }}, totalDelay);
                    }});

                    return true;
                }} catch (e) {{
                    console.error('拖动失败:', e);
                    return false;
                }}
                """
                result = iframe.run_js(js_script, slider)
                logger.info(f"拖动尝试 {attempt + 1}/3: JS 前进拖动结果: {result}")
                if not result:
                    continue

                total_delay = sum(t[2] for t in trajectory) + 2.0
                time.sleep(total_delay)

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 前进拖动后页面不稳定，可能被刷新")
                    return False

                current_pos = self._get_slider_position(slider, iframe)
                if current_pos is None:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 无法获取前进后滑块位置")
                    return False

                expected_pos = self.slider_init_x + distance
                overshoot = current_pos - expected_pos
                logger.info(f"拖动尝试 {attempt + 1}/3: 前进后滑块位置 {current_pos}px, 预期位置 {expected_pos}px, 偏差 {overshoot}px")

                if overshoot > 5:
                    backtrack_distance = -int(overshoot * 1.2)
                    backtrack_trajectory = self._generate_trajectory(backtrack_distance, is_backtrack=True)
                    logger.info(f"拖动尝试 {attempt + 1}/3: 生成回滑轨迹长度 {len(backtrack_trajectory)}, 总距离 {sum(t[0] for t in backtrack_trajectory)}")

                    backtrack_moves = ",".join([f"{{dx:{m[0]},dy:{m[1]},delay:{m[2]}}}" for m in backtrack_trajectory])
                    js_script = f"""
                    try {{
                        const slider = arguments[0];
                        const moves = [{backtrack_moves}];
                        const rect = slider.getBoundingClientRect();
                        let x = rect.left + rect.width/2;
                        let y = rect.top + rect.height/2;

                        function triggerEvent(type, x, y) {{
                            const evt = new MouseEvent(type, {{
                                bubbles: true,
                                cancelable: true,
                                view: window,
                                clientX: x,
                                clientY: y
                            }});
                            slider.dispatchEvent(evt);
                        }}

                        triggerEvent('mousedown', x, y);
                        let totalDelay = 0;
                        moves.forEach((move, i) => {{
                            totalDelay += move.delay * 1000;
                            setTimeout(() => {{
                                x += move.dx;
                                y += move.dy;
                                triggerEvent('mousemove', x, y);
                                if (i === moves.length - 1) {{
                                    setTimeout(() => {{
                                        triggerEvent('mouseup', x, y);
                                    }}, 250);
                                }}
                            }}, totalDelay);
                        }});

                        function triggerTouchEvent(type, x, y) {{
                            const evt = new TouchEvent(type, {{
                                bubbles: true,
                                cancelable: true,
                                view: window,
                                touches: [{{clientX: x, clientY: y}}]
                            }});
                            slider.dispatchEvent(evt);
                        }}
                        triggerTouchEvent('touchstart', x, y);
                        moves.forEach((move, i) => {{
                            totalDelay += move.delay * 1000;
                            setTimeout(() => {{
                                x += move.dx;
                                y += move.dy;
                                triggerTouchEvent('touchmove', x, y);
                                if (i === moves.length - 1) {{
                                    setTimeout(() => {{
                                        triggerTouchEvent('touchend', x, y);
                                    }}, 250);
                                }}
                            }}, totalDelay);
                        }});

                        return true;
                    }} catch (e) {{
                        console.error('回滑拖动失败:', e);
                        return false;
                    }}
                    """
                    result = iframe.run_js(js_script, slider)
                    logger.info(f"拖动尝试 {attempt + 1}/3: JS 回滑拖动结果: {result}")
                    if not result:
                        continue

                    total_delay = sum(t[2] for t in backtrack_trajectory) + 3.0
                    time.sleep(total_delay)

                    if not self._check_page_stability(slider, slider_hash):
                        logger.warning(f"拖动尝试 {attempt + 1}/3: 回滑拖动后页面不稳定，可能被刷新")
                        return False

                final_pos = self._get_slider_position(slider, iframe)
                if final_pos is None:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 无法获取最终滑块位置")
                    return False

                logger.info(f"拖动尝试 {attempt + 1}/3: 最终滑块位置 {final_pos}px, 预期位置 {expected_pos}px, 偏差 {abs(final_pos - expected_pos)}px")
                if abs(final_pos - expected_pos) > 10:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 滑块位置偏差过大，可能仍未对齐")

                self._save_debug_info(attempt)
                return True

            except Exception as e:
                logger.warning(f"拖动尝试 {attempt + 1}/3: 拖动失败: {str(e)}")
                time.sleep(random.uniform(2.5, 3.5))
                slider, slider_hash = self._find_slider_element()
                if not slider:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 重新定位滑块失败")
                    return False
        logger.warning("拖动失败，达到最大重试次数")
        return False

    def _verify_success(self):
        """增强验证逻辑，确保验证码真正通过"""
        try:
            time.sleep(15.0)  # 延长等待时间
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=2)
            if not iframe:
                logger.info("验证码 iframe 不存在，验证通过")
                login_button = self.page.ele('button:contains("登录")', timeout=2)
                if login_button:
                    logger.info("找到登录按钮，确认验证码通过")
                    return True
                return False

            success = iframe.ele('.tc-success-icon', timeout=2)
            if success:
                time.sleep(3.0)
                if not self.page.get_frame('#tcaptcha_iframe_dy', timeout=2):
                    logger.info("验证码 iframe 已消失，验证通过")
                    return True
                logger.warning("验证码 iframe 仍存在，验证未通过")
                return False

            failure = iframe.ele('.tc-error-tip', timeout=2)
            if failure:
                logger.warning(f"检测到失败标志: {failure.text}")
                return False

            logger.info("未找到明确成功或失败标志，假设验证失败")
            return False
        except Exception as e:
            logger.warning(f"验证成功检查失败: {str(e)}")
            return False

    def _confirm_captcha_cleared(self):
        """确认验证码已通过"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=3)
            if iframe:
                logger.warning("验证码 iframe 仍然存在，检查页面状态")
                time.sleep(3.0)
                if not self.page.get_frame('#tcaptcha_iframe_dy', timeout=2):
                    logger.info("验证码 iframe 已消失，确认验证码通过")
                else:
                    logger.warning("验证码 iframe 持续存在，验证码可能未通过")
            else:
                logger.info("验证码 iframe 不存在，确认验证码通过")
            logger.success("验证码已通过，准备执行后续操作")
            logger.debug(f"当前页面 URL: {self.page.url}")
        except Exception as e:
            logger.warning(f"确认验证码通过时出错: {str(e)}")

    def _perform_post_captcha_actions(self):
        """执行验证码通过后的操作"""
        try:
            logger.info("开始执行后续操作")
            login_button = self.page.ele('button:contains("登录")', timeout=5)
            if login_button:
                login_button.click()
                logger.info("点击登录按钮成功")
            else:
                logger.warning("未找到登录按钮，请指定其他操作")
            time.sleep(2.0)
        except Exception as e:
            logger.error(f"执行后续操作失败: {str(e)}")

    def _save_debug_info(self, attempt):
        """保存调试信息"""
        try:
            screenshot_path = f"debug_attempt_{attempt}_{uuid.uuid4()}.png"
            html_path = f"debug_attempt_{attempt}_{uuid.uuid4()}.html"
            self.page.get_screenshot(screenshot_path)
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(self.page.html)
            logger.info(f"已保存调试信息: {screenshot_path}, {html_path}")
        except Exception as e:
            logger.warning(f"保存调试信息失败: {str(e)}")

    def _save_children_iframe_html(self, path):
        """保存 iframe 的 HTML 内容用于调试"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=2)
            if iframe:
                html = iframe.html
                with open(path, 'w', encoding='utf-8') as f:
                    f.write(html)
                logger.info(f"已保存 iframe HTML: {path}")
            else:
                logger.warning("未找到 iframe，无法保存 HTML")
        except Exception as e:
            logger.warning(f"保存 iframe HTML 失败: {str(e)}")

    def _recover_from_disconnect(self):
        """从连接断开中恢复"""
        try:
            self.page.refresh()
            time.sleep(6)
            logger.info("页面已刷新，尝试恢复")
            return True
        except Exception as e:
            logger.warning(f"页面刷新失败: {str(e)}")
            return False

    def _refresh_or_reload(self):
        """刷新验证码或整个页面"""
        if not self.refresh_captcha():
            logger.warning("刷新验证码失败，尝试刷新页面")
            self.page.refresh()
            time.sleep(6)


# 使用示例
if __name__ == "__main__":
    options = ChromiumOptions()

    # 核心配置：指定使用 Edge 浏览器
    options.set_browser_path(  # 方法一：直接指定 Edge 可执行文件路径
        path=r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    )
    # 或使用 Playwright 的 channel 参数（推荐）
    # options.channel = 'msedge'  # 方法二：自动查找已安装的 Edge 浏览器

    # 其他配置参数
    options.set_argument('--disable-blink-features=AutomationControlled')
    options.set_argument('--no-sandbox')
    options.set_argument('--disable-gpu')
    options.set_argument('--disable-dev-shm-usage')
    options.set_argument('--window-size=800,600')
    options.set_user_agent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0'
    )
    options.set_argument('--disable-features=WebDriver')

    # 启动 Edge 浏览器
    page = ChromiumPage(options)
    try:
        page.run_js("""
            Object.defineProperty(navigator, 'webdriver', {
                get: () => undefined
            });
            Object.defineProperty(navigator, 'platform', {
                get: () => 'Win32'
            });
            Object.defineProperty(navigator, 'hardwareConcurrency', {
                get: () => 8
            });
            Object.defineProperty(navigator, 'maxTouchPoints', {
                get: () => 1
            });
            Object.defineProperty(navigator, 'languages', {
                get: () => ['en-US', 'en']
            });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const originalFillText = ctx.fillText;
            ctx.fillText = function(text, x, y) {
                originalFillText.call(this, text + String.fromCharCode(Math.random() * 10), x, y);
            };
            const getParameter = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                if (parameter === 37446) {
                    return 'Intel Inc.';
                }
                if (parameter === 37447) {
                    return 'Intel Iris OpenGL Engine';
                }
                return getParameter.apply(this, arguments);
            };
        """)
        page.get('https://www.mafengwo.cn/', timeout=15)
        time.sleep(6)

        solver = SliderCaptchaSolver(page, offset_adjust=0)
        if solver.has_captcha():
            logger.info("验证码存在，尝试解决验证码")
            if solver.solve_captcha():
                logger.success("验证码破解成功！后续操作已执行")
            else:
                logger.error("验证码破解失败")
        else:
            logger.info("无验证码，直接执行后续操作")
            solver._perform_post_captcha_actions()

    except Exception as e:
        logger.error(f"主程序出错: {e}")
    finally:
        page.quit()