import base64
import json
import re
import requests
import cv2
import numpy as np
from loguru import logger
from urllib.parse import quote
import urllib3
import io
import sys
import uuid
import hashlib
import execjs
import time
from dataclasses import dataclass
from typing import Optional, Tuple
import os

# 禁用urllib3警告
urllib3.disable_warnings()

# 设置编码
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# 配置日志：输出到终端和文件
logger.remove()
logger.add(sys.stderr, level="DEBUG", format="{time} {level} {message}")
logger.add("captcha_log.txt", level="DEBUG", format="{time} {level} {message}", rotation="10 MB")

@dataclass
class CaptchaImages:
    background_path: str
    slider_path: str
    sess: str
    init_pos_y: int
    pow_answer: str
    pow_calc_time: int

class SliderCaptchaSolver:
    """优化的滑块验证码求解器"""

    def __init__(self, background_path: str, slider_image_path: str):
        self.background_path = background_path
        self.slider_image_path = slider_image_path
        self.background: Optional[np.ndarray] = None
        self.slider_image: Optional[np.ndarray] = None
        self.bg_width: Optional[int] = None
        self.slider_width: Optional[int] = None

    def preprocess_image(self, img: np.ndarray) -> np.ndarray:
        """预处理图像：灰度转换、归一化、去噪"""
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        norm = cv2.normalize(gray, None, 0, 255, cv2.NORM_MINMAX)
        blurred = cv2.GaussianBlur(norm, (5, 5), 0)
        logger.debug("图像预处理完成：灰度转换、归一化、去噪")
        return blurred

    def crop_slider(self, img: np.ndarray) -> np.ndarray:
        """裁剪滑块图像，提取实际滑块区域"""
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        lower_blue = np.array([100, 100, 50])
        upper_blue = np.array([140, 255, 255])
        mask = cv2.inRange(hsv, lower_blue, upper_blue)
        mask = cv2.GaussianBlur(mask, (5, 5), 0)

        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        logger.debug(f"滑块裁剪：找到 {len(contours)} 个轮廓")

        if not contours:
            logger.warning("未找到滑块轮廓，使用原始图像")
            return img

        max_contour = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(max_contour)
        area = cv2.contourArea(max_contour)
        logger.debug(f"最大滑块轮廓：面积={area}, 边界框=({x}, {y}, {w}, {h})")

        if w < 20 or h < 20 or w > 200 or h > 200:
            logger.warning(f"滑块尺寸异常: ({w}, {h})，使用原始图像")
            return img

        cropped = img[y:y+h, x:x+w]
        logger.debug(f"滑块裁剪成功：区域=({x}, {y}, {w}, {h})")
        return cropped

    def load_images(self) -> None:
        """加载并预处理背景图和滑块图"""
        logger.debug(f"加载图像：背景图={self.background_path}, 滑块图={self.slider_image_path}")
        self.background = cv2.imread(self.background_path)
        slider_raw = cv2.imread(self.slider_image_path)

        if self.background is None or slider_raw is None:
            logger.error("无法加载背景图或滑块图")
            raise ValueError("无法加载背景图或滑块图")

        self.slider_image = self.crop_slider(slider_raw)
        self.background = self.preprocess_image(self.background)
        self.slider_image = self.preprocess_image(self.slider_image)

        bg_height, self.bg_width = self.background.shape
        slider_height, self.slider_width = self.slider_image.shape
        logger.debug(f"图像尺寸：背景图=({self.bg_width}, {bg_height})，滑块图=({self.slider_width}, {slider_height})")

    def find_slider_position(self) -> Tuple[int, int]:
        """使用多尺度模板匹配查找滑块位置"""
        scales = [0.5, 0.75, 1.0, 1.25, 1.5]
        best_val = 0.0
        best_loc = (0, 0)
        best_scale = 1.0

        logger.debug("开始滑块模板匹配")
        for scale in scales:
            resized_slider = cv2.resize(self.slider_image, (int(self.slider_width * scale), int(self.slider_image.shape[0] * scale)))
            if resized_slider.shape[0] > self.background.shape[0] or resized_slider.shape[1] > self.background.shape[1]:
                logger.debug(f"跳过缩放={scale}：滑块尺寸过大")
                continue

            result = cv2.matchTemplate(self.background, resized_slider, cv2.TM_CCOEFF_NORMED)
            _, max_val, _, max_loc = cv2.minMaxLoc(result)
            logger.debug(f"缩放={scale}，相关性={max_val:.3f}，位置={max_loc}")

            if max_val > best_val:
                best_val = max_val
                best_loc = max_loc
                best_scale = scale

        if best_val < 0.4:
            failed_bg_path = f"failed_bg_{uuid.uuid4().hex}.png"
            failed_slider_path = f"failed_slider_{uuid.uuid4().hex}.png"
            cv2.imwrite(failed_bg_path, cv2.imread(self.background_path))
            cv2.imwrite(failed_slider_path, cv2.imread(self.slider_image_path))
            logger.error(f"未找到滑块，最大相关性={best_val:.3f}，最佳缩放={best_scale}，保存失败图像：{failed_bg_path}, {failed_slider_path}")
            raise ValueError(f"未找到滑块，最大相关性={best_val}")

        x, y = best_loc
        w = int(self.slider_width * best_scale)
        h = int(self.slider_image.shape[0] * best_scale)
        logger.debug(f"滑块检测成功：位置=({x + w // 2}, {y + h // 2})，相关性={best_val:.3f}，缩放={best_scale}")
        return x + w // 2, y + h // 2

    def find_gap_position(self) -> Tuple[int, int]:
        """基于灰度阈值分割和轮廓分析查找缺口位置"""
        image = cv2.imread(self.background_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        mean_brightness = np.mean(gray)
        thresh_value = max(30, min(70, mean_brightness * 0.3))
        logger.debug(f"缺口检测：平均亮度={mean_brightness:.1f}，阈值={thresh_value}")

        _, thresh = cv2.threshold(gray, thresh_value, 255, cv2.THRESH_BINARY_INV)
        thresh = cv2.GaussianBlur(thresh, (5, 5), 0)

        contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        logger.debug(f"缺口检测：找到 {len(contours)} 个轮廓")

        candidates = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if 500 < area < 20000:
                x, y, w, h = cv2.boundingRect(contour)
                aspect_ratio = w / h if h != 0 else 0
                perimeter = cv2.arcLength(contour, True)
                approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)
                sides = len(approx)
                logger.debug(f"轮廓：面积={area}, 边界框=({x}, {y}, {w}, {h})，宽高比={aspect_ratio:.2f}，边数={sides}")
                if 0.5 <= aspect_ratio <= 2.0 or 3 <= sides <= 10:
                    candidates.append((contour, x, y, w, h))

        if not candidates:
            logger.error("未找到有效缺口")
            raise ValueError("未找到有效缺口")

        max_contour, x, y, w, h = max(candidates, key=lambda c: cv2.contourArea(c[0]))
        logger.debug(f"缺口选择：位置=({x + w // 2}, {y + h // 2})，尺寸=({w}, {h})，面积={cv2.contourArea(max_contour)}")

        output_path = f"gap_output_{uuid.uuid4().hex}.jpg"
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        cv2.imwrite(output_path, image)
        logger.debug(f"保存缺口可视化图像：{output_path}")

        return x + w // 2, y + h // 2

    def calculate_move_distance(self) -> float:
        """计算滑块移动距离"""
        self.load_images()
        slider_x, slider_y = self.find_slider_position()
        gap_x, gap_y = self.find_gap_position()

        expected_slider_width = min(self.bg_width // 6, 100)
        scale = expected_slider_width / self.slider_width
        scaled_slider_x = slider_x * scale
        distance = gap_x - scaled_slider_x

        logger.debug(f"距离计算：缺口=({gap_x}, {gap_y})，滑块=({scaled_slider_x}, {slider_y})，缩放比例={scale:.3f}，距离={distance}")

        if abs(distance) > 537 or abs(distance) < 50:
            logger.warning(f"距离 {distance} 超出范围（50-552），调整...")
            distance = min(max(distance, 50), 552)

        logger.info(f"最终移动距离：{distance} 像素")
        return distance

class TencentCaptchaVerifier:
    """优化的腾讯滑块验证码验证器"""

    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Referer": "https://www.mafengwo.cn/",
        }
        self.verify_headers = {
            "User-Agent": self.headers["User-Agent"],
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Origin": "https://turing.captcha.qq.com",
            "Referer": "https://turing.captcha.qq.com/",
        }
        self.session = requests.Session()

    def get_captcha_images(self) -> CaptchaImages:
        """获取验证码图片"""
        url = "https://t.captcha.qq.com/cap_union_prehandle"
        params = {
            "aid": "2017163193",
            "protocol": "https",
            "accver": "1",
            "showtype": "popup",
            "ua": str(base64.b64encode(self.headers['User-Agent'].encode('utf-8')), 'utf-8'),
            "clientype": "2",
            "lang": "zh-cn",
            "entry_url": "https://www.mafengwo.cn/sales/8539850.html",
            "js": "/tcaptcha-frame.771c270b.js",
            "version": "1.1.0",
            "subsid": "1",
            "callback": f"_aq_{uuid.uuid4().int % 1000000}",
        }

        logger.debug("发送获取验证码图片请求")
        response = self.session.get(url, headers=self.headers, params=params, verify=False)
        response_json = json.loads(re.findall(r'\((.*?)\)', response.text)[0])
        data = response_json['data']
        img_url = 'https://t.captcha.qq.com' + data['dyn_show_info']['bg_elem_cfg']['img_url']
        sprite_url = 'https://t.captcha.qq.com' + data['dyn_show_info']['sprite_url']
        sess = response_json['sess']
        init_pos_y = data['dyn_show_info']['fg_elem_list'][1]['init_pos'][1]
        pow_cfg = data['comm_captcha_cfg']['pow_cfg']
        prefix = pow_cfg['prefix']
        md5_value = pow_cfg['md5']

        logger.debug(f"验证码信息：背景图={img_url}, 滑块图={sprite_url}, sess={sess}, init_pos_y={init_pos_y}")

        bg_path = f"img_{uuid.uuid4().hex}.png"
        slider_path = f"sprite_{uuid.uuid4().hex}.png"
        for url, path in [(img_url, bg_path), (sprite_url, slider_path)]:
            with open(path, "wb") as f:
                f.write(self.session.get(url, verify=False).content)
        logger.info(f"图片下载完成：背景图={bg_path}, 滑块图={slider_path}")

        tdc_url = 'https://t.captcha.qq.com' + data['comm_captcha_cfg']['tdc_path']
        tdc_js_code = self.session.get(tdc_url, verify=False).text
        tdc_path = f"tdc_{uuid.uuid4().hex}.js"
        with open(tdc_path, "w", encoding='utf-8') as f:
            f.write(tdc_js_code)
        logger.debug(f"tdc.js下载完成：路径={tdc_path}")

        start_time = int(time.time() * 1000)
        pow_answer = ""
        for i in range(1, 1000000):
            val = hashlib.md5((prefix + str(i)).encode('utf-8')).hexdigest()
            if val == md5_value:
                pow_answer = prefix + str(i)
                break
        else:
            logger.error("POW计算失败")
            raise ValueError("POW计算失败")
        pow_calc_time = int(time.time() * 1000) - start_time
        logger.debug(f"POW计算：答案={pow_answer}，时间={pow_calc_time}ms")

        return CaptchaImages(bg_path, slider_path, sess, init_pos_y, pow_answer, pow_calc_time)

    def verify_captcha(self, images: CaptchaImages, distance: float) -> str:
        """验证验证码"""
        ans = [{"elem_id": 1, "type": "DynAnswerType_POS", "data": f"{int(distance)},{images.init_pos_y}"}]
        js = execjs.compile(open('./tx_env_jsdom.js', 'r', encoding='utf-8').read())
        js_code = js.call('get_data')

        logger.debug(f"JS参数：collect={js_code['collect'][:50]}..., tlg={js_code['tlg']}, eks={js_code['eks'][:50]}...")
        logger.debug(f"验证参数：sess={images.sess}, ans={ans}, pow_answer={images.pow_answer}, pow_calc_time={images.pow_calc_time}")

        url = "https://t.captcha.qq.com/cap_union_new_verify"
        data = {
            "collect": js_code['collect'],
            "tlg": str(js_code['tlg']),
            "eks": js_code['eks'],
            "sess": images.sess,
            "ans": json.dumps(ans, separators=(',', ':')),
            "pow_answer": images.pow_answer,
            "pow_calc_time": str(images.pow_calc_time),
        }
        logger.debug("发送验证码验证请求")
        response = self.session.post(url, headers=self.verify_headers, data=data, verify=False)
        logger.info(f"验证结果：{response.text}")
        return response.text

def cleanup_images(images: CaptchaImages):
    """清理临时图像文件"""
    for path in [images.background_path, images.slider_path]:
        if os.path.exists(path):
            os.remove(path)
            logger.debug(f"已删除临时文件：{path}")

def process_captcha(verifier: TencentCaptchaVerifier, max_retries: int = 3) -> str:
    """处理验证码，支持重试"""
    for attempt in range(max_retries):
        images = None
        try:
            logger.info(f"开始尝试 {attempt + 1}/{max_retries}")
            images = verifier.get_captcha_images()
            solver = SliderCaptchaSolver(images.background_path, images.slider_path)
            distance = solver.calculate_move_distance()
            result = verifier.verify_captcha(images, distance)
            if '"errorCode":"0"' in result:
                logger.success(f"验证码验证成功：{result}")
                return result
            logger.warning(f"尝试 {attempt + 1} 验证失败：{result}")
        except Exception as e:
            logger.error(f"尝试 {attempt + 1} 错误：{str(e)}")
        finally:
            if images:
                cleanup_images(images)
        logger.debug("重试间隔：2秒")
        time.sleep(2)
    logger.error("多次尝试后仍未解决验证码")
    raise RuntimeError("多次尝试后仍未解决验证码")

if __name__ == "__main__":
    user = 'z60089016'
    psw = ''
    proxies = {
        'http': f'http://{user}:{quote(psw, safe="")}@proxycn2.huawei.com:8080/',
        'https': f'http://{user}:{quote(psw, safe="")}@proxycn2.huawei.com:8080/'
    }
    try:
        verifier = TencentCaptchaVerifier()
        result = process_captcha(verifier)
    except Exception as e:
        logger.error(f"程序错误：{str(e)}")