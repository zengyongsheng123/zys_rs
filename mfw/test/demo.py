import asyncio
import platform
import cv2
import numpy as np
import requests
import time
import random
import hashlib
from loguru import logger
import urllib3
import uuid
import os
import glob
from DrissionPage import ChromiumPage, ChromiumOptions

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class SliderCaptchaSolver:
    """简化的腾讯滑块验证码解决方案（基于本地背景图）"""

    def __init__(self, page, offset_adjust=0):
        self.page = page
        self.bg_width = 672  # 本地背景图宽度
        self.bg_height = 390  # 本地背景图高度
        self.web_bg_height = 480  # 网页背景图高度
        self.scale_factor = self.web_bg_height / self.bg_height  # 缩放比例 480/390 ≈ 1.23
        self.slider_init_x = 25  # 滑块初始位置（动态更新）
        self.max_slide_distance = 552  # 最大滑动距离
        self.slider_width = 60  # 滑块宽度
        self.offset_adjust = offset_adjust  # 额外偏移
        self.debug_dir = "captcha_debug"
        os.makedirs(self.debug_dir, exist_ok=True)
        self.current_slider = None
        self.slider_hash = None

    def _download_and_save_image(self, url, filename_prefix):
        """下载图片并保存"""
        try:
            response = requests.get(url, verify=False, timeout=10)
            web_content = response.content
            timestamp = int(time.time())
            random_str = uuid.uuid4().hex[:6]
            save_path = os.path.join(self.debug_dir, f"{filename_prefix}_{timestamp}_{random_str}.png")
            with open(save_path, 'wb') as f:
                f.write(web_content)
            img_array = cv2.imdecode(np.frombuffer(web_content, np.uint8), cv2.IMREAD_COLOR)
            logger.info(f"保存图片: {save_path}")
            return img_array, save_path
        except Exception as e:
            logger.error(f"图片下载失败: {e}")
            raise

    def _get_and_save_images(self):
        """获取并保存验证码图片"""
        for attempt in range(3):
            try:
                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=20)
                if not iframe:
                    logger.warning(f"iframe获取失败 (尝试 {attempt + 1}/3)")
                    continue
                bg_img = iframe.ele('#slideBg', timeout=5)
                if not bg_img:
                    logger.warning("背景图片元素未找到")
                    continue
                bg_url = bg_img.style('background-image').split('url("')[1].split('")')[0]
                logger.debug(f"背景图片URL: {bg_url}")
                bg_img_array, bg_path = self._download_and_save_image(bg_url, "bg")
                return bg_img_array, bg_path
            except Exception as e:
                logger.warning(f"图片获取失败 (尝试 {attempt + 1}/3): {str(e)}")
                time.sleep(random.uniform(2.0, 3.0))
        raise ValueError("无法获取并保存验证码图片")

    def _load_saved_image(self):
        """加载保存的背景图"""
        try:
            bg_files = glob.glob(os.path.join(self.debug_dir, "bg_*.png"))
            if not bg_files:
                raise ValueError("未找到保存的背景图")
            bg_path = max(bg_files, key=os.path.getmtime)
            logger.info(f"加载背景图: {bg_path}")
            bg_img = cv2.imread(bg_path)
            if bg_img is None:
                raise ValueError("无法读取背景图")
            return bg_img, bg_path
        except Exception as e:
            logger.error(f"加载背景图失败: {e}")
            raise

    def _crop_gap(self, bg_img):
        """裁剪背景图中的左边缺口区域"""
        try:
            gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)
            blurred = cv2.GaussianBlur(gray, (5, 5), 0)

            thresholds = [
                (cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU), "otsu"),
                (cv2.threshold(blurred, 80, 255, cv2.THRESH_BINARY), "fixed_80"),
                (cv2.threshold(blurred, 120, 255, cv2.THRESH_BINARY), "fixed_120")
            ]
            contours = []
            timestamp = int(time.time())
            for (ret, mask), thresh_name in thresholds:
                if ret is None:
                    continue
                kernel = np.ones((5, 5), np.uint8)
                mask = cv2.dilate(mask, kernel, iterations=2)
                temp_contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
                contours.extend(temp_contours)
                cv2.imwrite(os.path.join(self.debug_dir, f"mask_{thresh_name}_{timestamp}.png"), mask)

            edges = cv2.Canny(gray, 50, 150)
            edge_contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
            contours.extend(edge_contours)
            cv2.imwrite(os.path.join(self.debug_dir, f"edges_{timestamp}.png"), edges)

            logger.debug(f"检测到轮廓数量: {len(contours)}")

            contour_info = []
            for contour in contours:
                x, y, w, h = cv2.boundingRect(contour)
                contour_info.append(f"x={x}, y={y}, w={w}, h={h}")
            logger.debug(f"轮廓详情: {contour_info}")

            valid_contours = []
            for contour in contours:
                x, y, w, h = cv2.boundingRect(contour)
                if 30 < w < 80 and 30 < h < 80 and 100 < x < 400:
                    valid_contours.append((x, y, w, h))
            if not valid_contours:
                logger.warning("未找到合适的缺口轮廓")
                return None, None

            valid_contours.sort(key=lambda c: c[0], reverse=True)
            x, y, w, h = valid_contours[0]
            padding = 5
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = min(bg_img.shape[1] - x, w + 2 * padding)
            h = min(bg_img.shape[0] - y, h + 2 * padding)
            gap = bg_img[y:y + h, x:x + w]
            logger.debug(f"裁剪缺口: x={x}, y={y}, w={w}, h={h}")
            cv2.imwrite(os.path.join(self.debug_dir, f"gap_{timestamp}.png"), gap)
            return gap, x
        except Exception as e:
            logger.error(f"缺口裁剪失败: {e}")
            return None, None

    def process_saved_image(self):
        """处理背景图并返回滑动距离"""
        try:
            bg_img, bg_path = self._load_saved_image()
            bg_height, bg_width = bg_img.shape[:2]
            logger.info(f"背景图尺寸: {bg_width}x{bg_height}")

            if bg_width != self.bg_width or bg_height != self.bg_height:
                logger.warning(f"背景图尺寸({bg_width}x{bg_height})与预期({self.bg_width}x{self.bg_height})不符")
                self.bg_width = bg_width
                self.bg_height = bg_height
                self.max_slide_distance = bg_width - self.slider_width - self.slider_init_x

            gap_img, gap_x_start = self._crop_gap(bg_img)
            if gap_img is None or gap_x_start is None:
                logger.warning("无法裁剪缺口，使用默认距离")
                return random.randint(100, 400)

            gap_height, gap_width = gap_img.shape[:2]
            logger.info(f"缺口尺寸: {gap_width}x{gap_height}")

            bg_gray = cv2.cvtColor(bg_img, cv2.COLOR_BGR2GRAY)
            gap_gray = cv2.cvtColor(gap_img, cv2.COLOR_BGR2GRAY)
            res = cv2.matchTemplate(bg_gray, gap_gray, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, max_loc = cv2.minMaxLoc(res)
            logger.info(f"模板匹配置信度: {max_val}")

            if max_val >= 0.95 or max_loc[0] < 100 or abs(max_loc[0] - gap_x_start) < 50:
                logger.warning(
                    f"模板匹配置信度过高({max_val})或匹配位置无效(x={max_loc[0]}, gap_x={gap_x_start})，可能匹配到缺口本身")
                return random.randint(100, 400)

            gap_x = max_loc[0]
            distance = gap_x - self.slider_init_x + self.offset_adjust
            distance = int(distance * self.scale_factor)
            distance = max(100, min(self.max_slide_distance, distance))
            logger.success(f"最终滑动距离: {distance}px (gap_x={gap_x}, init_x={self.slider_init_x})")

            match_img = bg_img.copy()
            cv2.rectangle(match_img, (gap_x, max_loc[1]), (gap_x + gap_width, max_loc[1] + gap_height), (0, 0, 255), 2)
            cv2.imwrite(os.path.join(self.debug_dir, f"match_{int(time.time())}.png"), match_img)
            return distance
        except Exception as e:
            logger.error(f"处理背景图失败: {e}")
            return random.randint(100, 400)

    def _generate_trajectory(self, distance):
        """生成更自然的水平拖动轨迹"""
        trajectory = []
        remaining = distance
        steps = random.randint(30, 40)  # 增加步数
        current_x = 0
        for i in range(steps):
            progress = i / steps
            acceleration = 1 - (1 - progress) ** 2  # 减速曲线
            step = int(distance * (random.uniform(0.015, 0.04) * acceleration))
            step = min(max(step, 1), remaining)
            dy = random.randint(-2, 2) if random.random() > 0.7 else 0  # 微小垂直抖动
            delay = random.uniform(0.02, 0.05)  # 更短的延迟
            trajectory.append((step, dy, delay))
            current_x += step
            remaining -= step
            if remaining <= 0:
                break
        if current_x < distance:
            trajectory.append((distance - current_x, 0, 0.05))
        trajectory.append((0, 0, 0.05))
        logger.debug(f"生成轨迹: {len(trajectory)}步, 总距离 {sum(t[0] for t in trajectory)}px")
        return trajectory

    def _execute_drag(self, slider, trajectory):
        """执行滑块拖动"""
        logger.info("=== 开始执行拖动 ===")
        self.page.get_screenshot(os.path.join(self.debug_dir, f"before_drag_{int(time.time())}.png"))

        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if not iframe:
                raise ValueError("无法找到 iframe")

            initial_iframe_hash = hashlib.md5(iframe.html.encode()).hexdigest()
            logger.debug(f"初始 iframe hash: {initial_iframe_hash}")

            # 1. Refresh slider reference
            slider_result = self._find_slider_element()
            if not slider_result or slider_result[0] is None:
                raise ValueError("无法重新定位滑块元素")
            slider, _ = slider_result
            if not self._check_page_stability(slider, self.slider_hash):
                raise ValueError("滑块不稳定")

            # 2. Get current position
            js_code = """
            var slider = arguments[0];
            var rect = slider.getBoundingClientRect();
            return {
                x: rect.left,
                y: rect.top,
                width: rect.width,
                height: rect.height
            };
            """
            rect_info = iframe.run_js(js_code, slider)
            if not rect_info:
                raise ValueError("无法获取滑块位置信息")

            iframe_js_code = """
            var rect = arguments[0].getBoundingClientRect();
            return {
                x: rect.left + window.scrollX,
                y: rect.top + window.scrollY
            };
            """
            iframe_rect = self.page.run_js(iframe_js_code, iframe.ele)
            if not iframe_rect:
                raise ValueError("无法获取 iframe 位置")

            start_x = rect_info['x'] + iframe_rect['x'] + rect_info['width'] / 2
            start_y = rect_info['y'] + iframe_rect['y'] + rect_info['height'] / 2
            logger.info(f"起始坐标（页面级）: ({start_x}, {start_y})")

            # 3. Simulate human-like mouse movement
            mouse = self.page.mouse
            mouse.move_to(random.randint(100, 300), random.randint(100, 300))
            time.sleep(random.uniform(0.2, 0.4))
            mouse.move_to(start_x, start_y)
            time.sleep(random.uniform(0.1, 0.3))
            mouse.down()

            # 4. Execute trajectory with validation
            total_moved = 0
            for dx, dy, delay in trajectory:
                slider_result = self._find_slider_element()
                if not slider_result or slider_result[0] is None:
                    raise ValueError("滑块在拖动过程中失效")
                slider, _ = slider_result
                if not self._check_page_stability(slider, self.slider_hash):
                    raise ValueError("滑块在拖动过程中不稳定")
                current_iframe_hash = hashlib.md5(iframe.html.encode()).hexdigest()
                if current_iframe_hash != initial_iframe_hash:
                    raise ValueError(f"iframe 在拖动过程中发生刷新: {current_iframe_hash}")
                mouse.move(dx, dy, steps=1)
                total_moved += dx
                time.sleep(delay)  # 使用原始延迟以加快拖动

            # 5. Add small random overshoot
            overshoot = random.randint(3, 8)
            mouse.move(overshoot, 0)
            time.sleep(0.05)
            mouse.move(-overshoot, 0)

            # 6. Release
            mouse.up()
            logger.success(f"拖动完成, 总移动距离: {total_moved}px")

        except Exception as e:
            logger.error(f"拖动失败: {str(e)}")
            try:
                self.page.mouse.up()
            except:
                pass
            timestamp = int(time.time())
            with open(os.path.join(self.debug_dir, f"iframe_html_{timestamp}.html"), 'w', encoding='utf-8') as f:
                f.write(iframe.html if iframe else "No iframe")
            with open(os.path.join(self.debug_dir, f"page_html_{timestamp}.html"), 'w', encoding='utf-8') as f:
                f.write(self.page.html)
            self.page.get_screenshot(os.path.join(self.debug_dir, f"debug_drag_fail_{timestamp}.png"))
            with open(os.path.join(self.debug_dir, f"slider_debug_{timestamp}.txt"), 'w', encoding='utf-8') as f:
                f.write(f"Slider: {slider}\n")
                try:
                    f.write(f"Slider HTML: {slider.html}\n")
                    f.write(f"Slider Style: {slider.style}\n")
                except:
                    f.write("Unable to access slider properties\n")
            raise
        finally:
            self.page.get_screenshot(os.path.join(self.debug_dir, f"after_drag_{timestamp}.png"))

    def _get_slider_position(self, slider, iframe):
        """获取滑块当前位置"""
        try:
            transform = slider.style('transform')
            if transform and 'translateX' in transform:
                pos = float(transform.split('translateX(')[1].split('px)')[0])
                logger.debug(f"通过transform获取位置: {pos}px")
                return pos
            left = slider.style('left')
            if left and left != 'none':
                pos = float(left.replace('px', ''))
                logger.debug(f"通过left获取位置: {pos}px")
                return pos
            pos = iframe.run_js("return arguments[0].offsetLeft;", slider)
            if pos is not None:
                logger.debug(f"通过offsetLeft获取位置: {pos}px")
                return pos
            logger.warning("无法获取滑块位置")
            return None
        except Exception as e:
            logger.warning(f"获取滑块位置失败: {str(e)}")
            return None

    def _find_slider_element(self):
        """定位滑块元素"""
        try:
            if self.current_slider and self._check_page_stability(self.current_slider, self.slider_hash):
                return self.current_slider, self.slider_hash
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=20)
            if not iframe:
                logger.warning("无法定位验证码 iframe")
                return None, None
            time.sleep(random.uniform(3.0, 4.0))  # 等待 iframe 加载
            slider = iframe.ele('.tc-fg-item')
            if not slider:
                logger.warning("无法找到滑块元素 .tc-fg-item")
                return None, None
            logger.info(f"成功定位滑块元素: .tc-fg-item")
            style_hash = hashlib.md5(str(slider.style).encode()).hexdigest()
            logger.debug(
                f"滑块属性: ID={slider.attr('id') or '无ID'}, Class={slider.attr('class')}, StyleHash={style_hash}, Width={slider.style('width')}")
            slider_pos = self._get_slider_position(slider, iframe)
            logger.info(f"动态更新滑块初始位置: {slider_pos}px")
            self.current_slider = slider
            self.slider_hash = style_hash
            self.slider_init_x = slider_pos
            return slider, style_hash
        except Exception as e:
            logger.error(f"定位滑块元素失败: {str(e)}")
            return None, None

    def _drag_with_stability_check(self, slider, distance, slider_hash):
        """带稳定性检查的拖动"""
        for attempt in range(3):
            try:
                if not slider or not self._check_page_stability(slider, slider_hash):
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 滑块无效或页面不稳定")
                    return False
                iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
                if not iframe:
                    logger.warning(f"拖动尝试 {attempt + 1}/3: 无法获取iframe")
                    return False
                initial_pos = self._get_slider_position(slider, iframe)
                if initial_pos is None:
                    logger.warning("无法获取初始位置")
                    return False
                logger.info(f"初始位置: {initial_pos}px")
                trajectory = self._generate_trajectory(distance)
                self._execute_drag(slider, trajectory)
                final_pos = self._get_slider_position(slider, iframe)
                if final_pos is None:
                    logger.warning("无法获取最终位置")
                    return False
                expected_pos = self.slider_init_x + distance
                logger.info(f"最终位置: {final_pos}px (预期: {expected_pos}px)")
                return abs(final_pos - expected_pos) < 20
            except Exception as e:
                logger.error(f"拖动尝试 {attempt + 1}/3 失败: {str(e)}")
                time.sleep(random.uniform(1.0, 2.0))
        return False

    def _check_page_stability(self, slider, prev_hash=None):
        """检查页面和滑块稳定性"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=3)
            if not iframe:
                logger.warning("iframe不存在")
                return False
            # 检查滑块是否可访问
            try:
                display = slider.style('display')
                visibility = slider.style('visibility')
                if display == 'none' or visibility == 'hidden':
                    logger.warning(f"滑块不可见: display={display}, visibility={visibility}")
                    return False
            except Exception as e:
                logger.warning(f"滑块元素不可访问: {str(e)}")
                return False
            # 检查 iframe 是否有效
            current_iframe_html = iframe.html
            if not current_iframe_html:
                logger.warning("iframe HTML 为空")
                return False
            return True
        except Exception as e:
            logger.warning(f"页面稳定性检查失败: {str(e)}")
            return False

    def _verify_success(self):
        """验证是否成功"""
        try:
            iframe = self.page.get_frame('#tcaptcha_iframe_dy', timeout=5)
            if not iframe:
                return False
            time.sleep(3.0)
            if iframe.ele('.tc-success-icon', timeout=2):
                logger.info("验证成功")
                return True
            logger.info("验证失败")
            return False
        except Exception as e:
            logger.warning(f"验证失败: {str(e)}")
            return False

    def solve_captcha(self, max_attempts=3):
        """主验证码解决方案"""
        try:
            bg_img, bg_path = self._get_and_save_images()
            logger.info("验证码图片已保存")
        except Exception as e:
            logger.error(f"无法保存验证码图片: {e}")
            return False
        for attempt in range(1, max_attempts + 1):
            logger.info(f"尝试 {attempt}/{max_attempts}")
            distance = self.process_saved_image()
            logger.info(f"计算滑动距离: {distance}px")
            slider, slider_hash = self._find_slider_element()
            if not slider:
                logger.warning("无法定位滑块")
                continue
            if self._drag_with_stability_check(slider, distance, slider_hash):
                if self._verify_success():
                    logger.success(f"验证码破解成功 (尝试 {attempt})")
                    return True
                logger.warning("拖动成功但验证失败")
            else:
                logger.warning("拖动失败")
            self.page.get_screenshot(os.path.join(self.debug_dir, f"debug_attempt_{attempt}_{uuid.uuid4().hex}.png"))
            time.sleep(random.uniform(3.0, 4.0))
        logger.error(f"验证失败，达到最大尝试次数 {max_attempts}")
        return False


async def main():
    options = ChromiumOptions()
    options.set_argument('--disable-blink-features=AutomationControlled')
    options.set_argument('--no-sandbox')
    options.set_argument('--disable-gpu')
    options.set_argument('--disable-dev-shm-usage')
    options.set_argument('--window-size=800,600')
    options.set_user_agent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    )
    options.set_argument('--disable-features=WebDriver')
    # options.set_proxy("http://127.0.0.1:8000")
    page = ChromiumPage(options)
    try:
        try:
            page.run_js("""
                Object.defineProperty(navigator, 'webdriver', { get: () => false });
                Object.defineProperty(navigator, 'platform', { get: () => 'Win32' });
                Object.defineProperty(navigator, 'hardwareConcurrency', { get: () => 8 });
                Object.defineProperty(navigator, 'maxTouchPoints', { get: () => 1 });
                Object.defineProperty(navigator, 'languages', { get: () => ['en-US', 'en'] });
                window.chrome = { runtime: {}, app: {} };
                Object.defineProperty(navigator, 'plugins', { get: () => [1, 2, 3] });
                Object.defineProperty(navigator, 'mimeTypes', { get: () => [1, 2, 3] });
            """)
        except Exception as e:
            logger.warning(f"JavaScript伪装代码运行失败: {str(e)}，继续执行验证码逻辑")
        page.get('https://www.mafengwo.cn/sales/8539850.html', timeout=10)
        time.sleep(8)
        solver = SliderCaptchaSolver(page, offset_adjust=0)
        if solver.solve_captcha():
            logger.success("验证码破解成功！")
        else:
            logger.error("验证码破解失败")
    except Exception as e:
        logger.error(f"主程序出错: {e}")
    finally:
        page.quit()


if platform.system() == "Emscripten":
    asyncio.ensure_future(main())
else:
    if __name__ == "__main__":
        asyncio.run(main())
