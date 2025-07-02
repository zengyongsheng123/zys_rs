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

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class SliderCaptchaSolver:
    """滑块验证码自动化解决方案"""

    def __init__(self, page, offset_adjust=0):
        self.page = page
        self.bg_width = 672  # 背景图宽度
        self.slider_init_x = 50  # 固定滑块初始位置为50px
        self.max_slide_distance = 502  # 最大滑动距离
        self.slider_width = 60  # 滑块默认宽度
        self.offset_adjust = offset_adjust  # 用户指定的额外偏移量

    def refresh_captcha(self):
        """仅刷新验证码而不刷新整个页面"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy')
            if iframe:
                refresh_btn = iframe.ele('.tc-button-icon tc-refresh-icon', timeout=3)
                if refresh_btn:
                    refresh_btn.click()
                    time.sleep(random.uniform(2.5, 3.5))
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
                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=10)
                if not iframe:
                    logger.warning(f"iframe获取失败 (尝试 {attempt}/{max_retries})")
                    continue

                bg_img = iframe.ele('#slideBg', timeout=10)
                slider_img = iframe.ele('.tc-fg-item', timeout=10)

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

    def process_images(self, bg_url, slider_url):
        """处理验证码图片并返回滑动距离"""
        try:
            bg_content = requests.get(bg_url, verify=False, timeout=10).content
            slider_content = requests.get(slider_url, verify=False, timeout=10).content

            bg_img = cv2.imdecode(np.frombuffer(bg_content, np.uint8), cv2.IMREAD_COLOR)
            slider_img = cv2.imdecode(np.frombuffer(slider_content, np.uint8), cv2.IMREAD_COLOR)

            cropped_slider = self._crop_slider(slider_img)
            distance, method, confidence, gap_x = self._template_match(bg_img, cropped_slider)
            if distance is None:
                return None

            distance = max(0, min(self.max_slide_distance, distance))
            logger.success(f"计算滑动距离: {distance} (方法: {method}, 置信度: {confidence:.3f}, gap_x: {gap_x}, 滑块宽度: {self.slider_width}, 总位置: {self.slider_init_x + distance})")
            return distance

        except Exception as e:
            logger.error(f"图片处理失败: {e}")
            return None

    def _crop_slider(self, slider_img):
        """优化滑块裁剪算法"""
        gray = cv2.cvtColor(slider_img, cv2.COLOR_BGR2GRAY)
        _, mask = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)

        kernel = np.ones((3, 3), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if not contours:
            raise ValueError("无法检测到滑块轮廓")

        max_contour = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(max_contour)

        padding = 5
        x = max(0, x - padding)
        y = max(0, y - padding)
        w = min(slider_img.shape[1] - x, w + 2 * padding)
        h = min(slider_img.shape[0] - y, h + 2 * padding)

        return slider_img[y:y + h, x:x + w]

    def _template_match(self, bg_img, slider_img):
        """更鲁棒的模板匹配实现"""
        try:
            self.slider_width = slider_img.shape[1]
            sift = cv2.SIFT_create(nfeatures=3000, contrastThreshold=0.02, edgeThreshold=15)
            kp1, des1 = sift.detectAndCompute(slider_img, None)
            kp2, des2 = sift.detectAndCompute(bg_img, None)

            flann = cv2.FlannBasedMatcher(dict(algorithm=1, trees=5), dict(checks=50))
            matches = flann.knnMatch(des1, des2, k=2)

            good = []
            for m, n in matches:
                if m.distance < 0.75 * n.distance:  # 更严格的匹配
                    good.append(m)

            if len(good) > 60:  # 提高匹配数量要求
                src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
                dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)

                M, _ = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
                if M is not None:
                    h, w = slider_img.shape[:2]
                    pts = np.float32([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]).reshape(-1, 1, 2)
                    dst = cv2.perspectiveTransform(pts, M)
                    x_coords = [pt[0][0] for pt in dst]
                    gap_x = int(sum(x_coords) / len(x_coords))

                    # 精确计算距离，滑块左边缘对齐缺口左边缘
                    distance = gap_x - self.slider_init_x + self.offset_adjust
                    distance = max(0, min(self.max_slide_distance, distance))

                    debug_img = cv2.polylines(bg_img.copy(), [np.int32(dst)], True, (0, 255, 0), 3)
                    cv2.imwrite(f'debug_match_{int(time.time())}.png', debug_img)

                    return distance, "SIFT", len(good) / len(matches), gap_x

            return self._fallback_template_match(bg_img, slider_img)

        except Exception as e:
            logger.error(f"SIFT特征匹配失败: {e}")
            return self._fallback_template_match(bg_img, slider_img)

    def _fallback_template_match(self, bg_img, slider_img):
        """传统的模板匹配回退方法"""
        try:
            bg_gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)
            slider_gray = cv2.cvtColor(slider_img, cv2.COLOR_BGR2GRAY)

            res = cv2.matchTemplate(bg_gray, slider_gray, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, max_loc = cv2.minMaxLoc(res)

            if max_val < 0.85:  # 提高置信度阈值
                logger.warning(f"模板匹配置信度低: {max_val}")
                return None, "Template", max_val, 0

            gap_x = max_loc[0]
            distance = gap_x - self.slider_init_x + self.offset_adjust
            return max(10, min(self.max_slide_distance, distance)), "Template", max_val, gap_x
        except Exception as e:
            logger.error(f"模板匹配失败: {e}")
            return None, "Template", 0.0, 0

    def _generate_trajectory(self, distance, is_backtrack=False):
        """生成更自然的人类滑动轨迹，支持回滑"""
        trajectory = []
        remaining = distance
        steps = random.randint(45, 55) if not is_backtrack else random.randint(20, 25)  # 回滑轨迹更长
        for i in range(steps):
            ratio = 1 - (i / steps) ** (4.5 if not is_backtrack else 3.0)
            step = int(distance * ratio / (steps - i))
            step = min(max(1 if not is_backtrack else -1, step), remaining)
            trajectory.append((step, random.randint(-18, 18), random.uniform(0.04, 0.4)))
            remaining -= step
            if remaining <= 0:
                break
        if remaining != 0:
            trajectory.append((remaining, random.randint(-6, 6), 0.35))
        for _ in range(random.randint(5, 8) if not is_backtrack else 3):
            if random.random() < 0.65:
                trajectory.append((0, random.randint(-10, 10), random.uniform(0.6, 0.9)))
            trajectory.append((random.randint(-7, 7), random.randint(-6, 6), random.uniform(0.3, 0.5)))
        logger.debug(f"生成{'回滑' if is_backtrack else '前进'}轨迹: 步数 {len(trajectory)}, 总距离 {sum(t[0] for t in trajectory)}")
        return trajectory

    def solve_captcha(self, max_attempts=3):
        """最终稳定版的验证码解决方案"""
        for attempt in range(1, max_attempts + 1):
            try:
                logger.info(f"开始尝试 {attempt}/{max_attempts}")
                if attempt > 1:
                    self._refresh_or_reload()
                    time.sleep(random.uniform(2.5, 3.5))

                bg_url, slider_url = self._get_images_with_retry()
                if not bg_url:
                    logger.warning("获取图片失败，跳过本次尝试")
                    continue

                distance = self._calculate_distance_with_fallback(bg_url, slider_url)
                if distance is None:
                    logger.warning("滑动距离计算失败，跳过本次尝试")
                    continue
                logger.info(f"计算得到的滑动距离: {distance}")

                slider, slider_hash = self._find_slider_element()
                if not slider:
                    logger.warning("无法定位滑块元素，跳过本次尝试")
                    continue

                time.sleep(random.uniform(0.8, 1.5))
                if not self._check_page_stability(slider, slider_hash):
                    logger.warning("页面不稳定，尝试刷新验证码")
                    self._refresh_or_reload()
                    continue

                if not self._drag_with_stability_check(slider, distance, slider_hash):
                    logger.warning("拖动失败，跳过本次尝试")
                    continue

                if self._verify_success():
                    logger.success(f"验证码破解成功 (尝试 {attempt})")
                    return True

                self._save_debug_info(attempt)

            except Exception as e:
                logger.error(f"尝试 {attempt} 出错: {str(e)}")
                if "断开" in str(e):
                    self._recover_from_disconnect()

            if attempt < max_attempts:
                self._refresh_or_reload()

        logger.error(f"验证失败，已达最大尝试次数 {max_attempts}")
        return False

    def _get_images_with_retry(self):
        """带重试的图片获取方法"""
        for attempt in range(3):
            try:
                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=10)
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

    def _orb_feature_match(self, bg_img, slider_img):
        """使用ORB特征匹配计算滑动距离"""
        try:
            orb = cv2.ORB_create(nfeatures=3000, scaleFactor=1.05, nlevels=14)
            kp1, des1 = orb.detectAndCompute(slider_img, None)
            kp2, des2 = orb.detectAndCompute(bg_img, None)

            bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
            matches = bf.match(des1, des2)
            matches = sorted(matches, key=lambda x: x.distance)

            if len(matches) > 60:  # 提高匹配数量要求
                src_pts = np.float32([kp1[m.queryIdx].pt for m in matches]).reshape(-1, 1, 2)
                dst_pts = np.float32([kp2[m.trainIdx].pt for m in matches]).reshape(-1, 1, 2)

                M, _ = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
                if M is not None:
                    h, w = slider_img.shape[:2]
                    pts = np.float32([[0, 0], [0, h - 1], [w - 1, h - 1], [w - 1, 0]]).reshape(-1, 1, 2)
                    dst = cv2.perspectiveTransform(pts, M)
                    x_coords = [pt[0][0] for pt in dst]
                    gap_x = int(sum(x_coords) / len(x_coords))

                    # 精确计算距离，滑块左边缘对齐缺口左边缘
                    distance = gap_x - self.slider_init_x + self.offset_adjust
                    distance = max(0, min(self.max_slide_distance, distance))

                    debug_img = cv2.polylines(bg_img.copy(), [np.int32(dst)], True, (0, 255, 0), 3)
                    cv2.imwrite(f'debug_orb_match_{int(time.time())}.png', debug_img)

                    return distance, "ORB", len(matches) / max(len(des1), len(des2)), gap_x
            return None, "ORB", 0.0, 0
        except Exception as e:
            logger.error(f"ORB特征匹配失败: {e}")
            return None, "ORB", 0.0, 0

    def _calculate_distance_with_fallback(self, bg_url, slider_url):
        """带智能回退的距离计算方法"""
        try:
            bg_content = requests.get(bg_url, verify=False, timeout=5).content
            slider_content = requests.get(slider_url, verify=False, timeout=5).content

            bg_img = cv2.imdecode(np.frombuffer(bg_content, np.uint8), cv2.IMREAD_COLOR)
            slider_img = cv2.imdecode(np.frombuffer(slider_content, np.uint8), cv2.IMREAD_COLOR)

            timestamp = int(time.time())
            cv2.imwrite(f'debug_bg_{timestamp}.png', bg_img)
            cv2.imwrite(f'debug_slider_{timestamp}.png', slider_img)

            distance, method, confidence, gap_x = self._orb_feature_match(bg_img, slider_img)
            if distance is not None:
                return distance

            distance, method, confidence, gap_x = self._template_match(bg_img, slider_img)
            if distance is not None:
                return distance

            logger.warning("所有匹配方法失败，生成随机距离")
            return random.randint(int(self.bg_width * 0.3), int(self.bg_width * 0.7)) - self.slider_init_x

        except Exception as e:
            logger.warning(f"距离计算失败: {str(e)}")
            return random.randint(100, 400)

    def _find_slider_element(self):
        """多重选择器定位滑块元素"""
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
                    time.sleep(random.uniform(0.8, 1.5))
                    try:
                        ele_id = ele.attr('id') or '无ID'
                        ele_class = ele.attr('class')
                        ele_style = ele.style('left') + ele.style('top')
                        ele_hash = hashlib.md5(ele_style.encode()).hexdigest()
                        ele_width = float(ele.style('width').replace('px', '')) if ele.style('width') else self.slider_width
                        self.slider_width = ele_width
                        logger.debug(f"滑块元素属性: ID={ele_id}, Class={ele_class}, StyleHash={ele_hash}, Width={ele_width}px")
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
        """检查页面是否稳定（iframe是否存在且未刷新）"""
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

            try:
                left = float(slider.style('left').replace('px', ''))
                logger.debug(f"滑块当前位置: {left}px")
                # 不再更新slider_init_x，保持为50
                if prev_hash:
                    new_style = slider.style('left') + slider.style('top')
                    new_hash = hashlib.md5(new_style.encode()).hexdigest()
                    if new_hash != prev_hash:
                        logger.warning(f"滑块样式变更: 原哈希={prev_hash}, 新哈希={new_hash}")
                        return False
            except:
                logger.debug("无法获取滑块位置")
                return False

            return True
        except Exception as e:
            logger.warning(f"页面稳定性检查失败: {str(e)}")
            return False

    def _get_slider_position(self, slider, iframe):
        """获取滑块的当前位置，尝试多种方法"""
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
            # 返回平均值以提高可靠性
            avg_pos = sum(positions) / len(positions)
            logger.debug(f"滑块位置 (平均值): {avg_pos}px")
            return avg_pos
        logger.error("所有滑块位置获取方法均失败")
        return None

    def _drag_with_stability_check(self, slider, distance, slider_hash=None):
        """带元素稳定性检查的拖动方法，包含动态回滑"""
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
                    time.sleep(random.uniform(0.8, 1.8))
                except Exception as e:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 点击滑块失败: {str(e)}")
                    continue

                if not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 点击后页面不稳定")
                    continue

                # 前进轨迹
                trajectory = self._generate_trajectory(distance)
                logger.info(f"拖动尝试 {attempt + 1}/3: 生成前进轨迹长度 {len(trajectory)}, 总距离 {sum(t[0] for t in trajectory)}")

                total_dx = sum(t[0] for t in trajectory)
                try:
                    slider.drag(total_dx, 0, duration=len(trajectory) * 0.15)
                    logger.info(f"拖动尝试 {attempt + 1}/3: DrissionPage 前进拖动执行，目标距离 {total_dx}px")
                except Exception as e:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: DrissionPage 前进拖动失败: {str(e)}")
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

                # 检查滑动后位置
                current_pos = self._get_slider_position(slider, iframe)
                if current_pos is None:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 无法获取前进后滑块位置")
                    return False

                expected_pos = self.slider_init_x + distance
                overshoot = current_pos - expected_pos
                logger.info(f"拖动尝试 {attempt + 1}/3: 前进后滑块位置 {current_pos}px, 预期位置 {expected_pos}px, 偏差 {overshoot}px")

                # 动态回滑（强制执行）
                backtrack_distance = -int(overshoot * 1.2)  # 放大回滑距离
                if abs(backtrack_distance) > 0:
                    backtrack_trajectory = self._generate_trajectory(backtrack_distance, is_backtrack=True)
                    logger.info(f"拖动尝试 {attempt + 1}/3: 生成回滑轨迹长度 {len(backtrack_trajectory)}, 总距离 {sum(t[0] for t in backtrack_trajectory)}")

                    total_dx_backtrack = sum(t[0] for t in backtrack_trajectory)
                    try:
                        slider.drag(total_dx_backtrack, 0, duration=len(backtrack_trajectory) * 0.25)  # 回滑更慢
                        logger.info(f"拖动尝试 {attempt + 1}/3: DrissionPage 回滑拖动执行，目标距离 {total_dx_backtrack}px")
                    except Exception as e:
                        logger.warning(f"拖动尝试 {attempt + 1}/3: DrissionPage 回滑拖动失败: {str(e)}")
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

                # 最终位置检查
                final_pos = self._get_slider_position(slider, iframe)
                if final_pos is None:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 无法获取最终滑块位置")
                    return False

                logger.info(f"拖动尝试 {attempt + 1}/3: 最终滑块位置 {final_pos}px, 预期位置 {expected_pos}px, 偏差 {abs(final_pos - expected_pos)}px")
                if abs(final_pos - expected_pos) > 15:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 滑块位置偏差过大，可能仍未对齐")

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
        """验证是否成功"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if not iframe:
                logger.warning("验证成功检查: iframe 不存在")
                return False

            time.sleep(4.0)
            success_selectors = [
                '.tc-success-icon',
                '.tc-cover tc-success',
                'xpath://div[contains(@class, "tc-success")]',
                'xpath://div[contains(@class, "tc-success-icon")]'
            ]
            for selector in success_selectors:
                if iframe.ele(selector, timeout=2):
                    logger.info(f"验证成功: 找到成功标志 {selector}")
                    return True
            logger.info("验证失败: 未找到成功标志")
            return False
        except Exception as e:
            logger.warning(f"验证成功检查失败: {str(e)}")
            return False

    def _save_debug_info(self, attempt):
        """保存调试信息"""
        try:
            screenshot_path = f"debug_attempt_{attempt}_{uuid.uuid4()}.png"
            self.page.get_screenshot(screenshot_path)
            logger.info(f"已保存调试截图: {screenshot_path}")
        except Exception as e:
            logger.warning(f"保存调试截图失败: {str(e)}")

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
    options.set_argument('--disable-blink-features=AutomationControlled')
    options.set_argument('--no-sandbox')
    options.set_argument('--disable-gpu')
    options.set_argument('--disable-dev-shm-usage')
    options.set_argument('--window-size=800,600')
    options.set_user_agent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
    options.set_argument('--disable-features=WebDriver')

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
        page.get('https://www.mafengwo.cn/sales/8539850.html', timeout=10)
        time.sleep(6)

        # 设置 offset_adjust 为 0，依赖图像匹配
        solver = SliderCaptchaSolver(page, offset_adjust=0)
        if solver.solve_captcha():
            logger.success("验证码破解成功！")
        else:
            logger.error("验证码破解失败")

    except Exception as e:
        logger.error(f"主程序出错: {e}")
    finally:
        page.quit()