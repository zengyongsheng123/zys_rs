import requests
import time
import random
import hashlib
import execjs
import ddddocr
from loguru import logger
from restore import process_image
from captcha_recognizer.recognizer import Recognizer


class SliderCaptchaSolver:
    def __init__(self, log_file="captcha_solver.log", max_retries=3, proxies=None):
        """初始化滑块验证码求解器，并配置鲜艳的彩色日志（无灰色）"""
        logger.remove()

        log_format = (
            "<cyan>{time:YYYY-MM-DD HH:mm:ss.SSS}</cyan> | "
            "<level>{level: <8}</level> | "
            "<yellow>{function}</yellow>:<magenta>{line}</magenta> - "
            "<bold><blue>{message}</blue></bold>"
        )

        logger.level("DEBUG", color="<cyan>")
        logger.level("INFO", color="<green>")
        logger.level("WARNING", color="<yellow>")
        logger.level("ERROR", color="<red>")
        logger.level("CRITICAL", color="<red><bold>")
        logger.level("TRACE", color="<magenta>")

        logger.add(lambda msg: print(msg, end=""), format=log_format, level="DEBUG", colorize=True)
        logger.add(log_file, rotation="1 MB", level="INFO",
                   format="{time:YYYY-MM-DD HH:mm:ss.SSS} | {level: <8} | {function}:{line} - {message}",
                   colorize=False)

        self.logger = logger
        self.max_retries = max_retries
        self.proxies = proxies

        self.session = requests.Session()
        self.headers = {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://tianyu.360.cn",
            "pragma": "no-cache",
            "priority": "u=1, i",
            "referer": "https://tianyu.360.cn/",
            "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        }
        self.session.headers.update(self.headers)
        self.auth_url = "https://captcha.jiagu.360.cn/api/v3/auth"
        self.verify_url = "https://captcha.jiagu.360.cn/api/v3/check"

        self._initialize_session()
        self.update_timestamp_and_nonce()
        self.logger.info(
            f"Generated timestamp: <magenta>{self.timestamp}</magenta>, nonce: <magenta>{self.nonce}</magenta>")

    def _initialize_session(self):
        """模拟真实用户访问主页，获取 Cookie"""
        try:
            response = self.session.get("https://tianyu.360.cn", proxies=self.proxies)
            response.raise_for_status()
            self.logger.info("Initialized session by visiting homepage, Cookies: <green>{}</green>".format(
                self.session.cookies.get_dict()))
        except Exception as e:
            self.logger.error(f"Failed to initialize session: <red>{e}</red>")

    def update_timestamp_and_nonce(self):
        """更新时间戳和 nonce"""
        self.timestamp = int(time.time() * 1000)
        self.nonce = self.timestamp + random.randint(10000000, 99999999)

    def generate_sign(self, data):
        """生成 MD5 签名"""
        keys = sorted([key for key in data.keys() if key != "sign"])
        sign_string = "".join(f"{key}{data[key]}" for key in keys)
        md5_hash = hashlib.md5(sign_string.encode('utf-8')).hexdigest()
        self.logger.debug(f"Sign string: <cyan>{sign_string}</cyan>, MD5 hash: <red>{md5_hash}</red>")
        return sign_string, md5_hash

    def parse_trace_data(self, slide_distance):
        """生成更自然的滑动轨迹，使用贝塞尔曲线"""
        trace_data = {}
        t = self.timestamp
        y = random.randint(210, 230)

        points = [(0, y)]
        control_point = (slide_distance * 0.5, y + random.randint(-10, 10))
        end_point = (slide_distance, y + random.randint(-2, 2))
        steps = 50

        for i in range(steps + 1):
            t_step = i / steps
            x = (1 - t_step) ** 2 * points[0][0] + 2 * (1 - t_step) * t_step * control_point[0] + t_step ** 2 * \
                end_point[0]
            y = (1 - t_step) ** 2 * points[0][1] + 2 * (1 - t_step) * t_step * control_point[1] + t_step ** 2 * \
                end_point[1]
            x = round(x)
            y = round(y) + random.randint(-1, 1)
            t += random.randint(10, 30)
            trace_data[str(x)] = {'t': t, 'y': y}

        self.logger.info(
            f"Generated trace data for distance <yellow>{slide_distance}</yellow>: <green>{trace_data}</green>")
        return [trace_data]

    def download_image(self, url, file_path):
        """下载图片并保存到本地"""
        try:
            response = self.session.get(url, proxies=self.proxies)
            response.raise_for_status()
            with open(file_path, 'wb') as f:
                f.write(response.content)
            self.logger.info(f"Downloaded image from <cyan>{url}</cyan> to <magenta>{file_path}</magenta>")
        except Exception as e:
            self.logger.error(f"Failed to download image from <cyan>{url}</cyan>: <red>{e}</red>")
            raise

    def get_slide_distance(self, bg_path):
        """使用 OCR 计算滑块距离"""
        try:
            # with open(slide_path, 'rb') as f:
            #     slide = f.read()
            with open(bg_path, 'rb') as f:
                f.read()
            # source传入图片路径, verbose=False表示关闭冗余输出
            # show_result 为True展示识别效果图 (生产环境请设置show_result=False)
            # save 为True保存识别结果图 （生产环境请设置save=False)
            recognizer = Recognizer()
            box, confidence = recognizer.identify_gap(source='restore_bg.png', verbose=False)

            print(f'缺口坐标: {box}')
            print(f'可信度: {confidence}')

            """
            打印结果如下:
            缺口方框坐标: [331.72052001953125, 55.96122741699219, 422.079345703125, 161.7498779296875]
            可信度: 0.9513089656829834

            坐标原点：图片左上角
            缺口方框坐标为缺口方框左上角和右下角距离坐标原点的距离
            """

            slide_distance = int(box[0] * 300 / 544)
            self.logger.info(f"Calculated slide distance: <yellow>{slide_distance}</yellow> pixels")
            return slide_distance
        except Exception as e:
            self.logger.error(f"Failed to calculate slide distance: <red>{e}</red>")
            raise

    def solve_captcha(self, js_file="main.js", slide_path="slide.png", bg_path="background.png",
                      restored_bg_path="restore_bg.png"):
        """主函数：解决滑块验证码"""
        try:
            auth_data = {
                "appId": "dc1db94ea7b3843c",
                "type": "1",
                "version": "2.0.0",
                "pn": "com.web.tianyu",
                "os": "3",
                "sdkName": "360CaptchaSDK",
                "timestamp": str(self.timestamp),
                "nonce": str(self.nonce),
                "ui": "null",
                "rc": "0",
                "pc": "0",
                "ec": "0",
                "hc": "0",
                "xc": "0",
                "dc": "0",
                "phone": "10000000000"
            }
            _, calculated_sign = self.generate_sign(auth_data)
            auth_data['sign'] = calculated_sign
            self.logger.debug(f"Sending auth request with data: <green>{auth_data}</green>")
            response = self.session.post(self.auth_url, data=auth_data, proxies=self.proxies)
            response.raise_for_status()
            data_auth = response.json().get("data")

            bg_url = data_auth.get("bg")[0]
            slider_url = data_auth.get("front")[0]
            token = data_auth.get("token")
            captcha_id = data_auth.get("captchaId")
            k = data_auth.get("k")
            self.logger.info(f"Background URL: <cyan>{bg_url}</cyan>")
            self.logger.info(f"Slider URL: <cyan>{slider_url}</cyan>")
            self.logger.info(
                f"Token: <magenta>{token}</magenta>, Captcha ID: <magenta>{captcha_id}</magenta>, K: <magenta>{k}</magenta>")

            self.download_image(slider_url, slide_path)
            self.download_image(bg_url, bg_path)

            array_bg = bg_url.split('/')[7].split('.')[0]
            process_image(bg_path, array_bg)
            self.logger.info(f"Restored background image: <magenta>{restored_bg_path}</magenta>")

            slide_distance = self.get_slide_distance(bg_path)

            track = self.parse_trace_data(slide_distance)

            with open(js_file, 'r', encoding='utf-8') as f:
                js_code = f.read()
            js_executor = execjs.compile(js_code)
            report = js_executor.call('get_rsa_enc', k, track, captcha_id, token)
            self.logger.info(f"Generated report: <green>{report}</green>")

            verify_data = {
                "captchaId": str(captcha_id),
                "token": str(token),
                "length": str(slide_distance),
                "version": "2.0.0",
                "width": "300",
                "report": report,
                "tracking": "[object Object]"
            }
            self.logger.debug(f"Sending verify request with data: <green>{verify_data}</green>")
            response = self.session.post(self.verify_url, data=verify_data, proxies=self.proxies)
            response.raise_for_status()
            result = response.json()
            self.logger.info(f"Verification result: <green>{result}</green>")
            return result

        except requests.exceptions.HTTPError as e:
            self.logger.error(f"HTTP Error solving CAPTCHA: <red>{e}</red>")
            if e.response.status_code == 403:
                self.logger.warning("403 Forbidden: Possible IP restriction, missing headers, or invalid parameters.")
            raise
        except Exception as e:
            self.logger.error(f"Error solving CAPTCHA: <red>{e}</red>")
            raise

    def refresh_and_retry(self, max_retries=None, base_delay=1):
        """刷新验证码并重试，直到成功或达到最大重试次数"""
        if max_retries is None:
            max_retries = self.max_retries

        attempt = 0
        delay = base_delay
        consecutive_403s = 0

        while attempt < max_retries:
            try:
                self.update_timestamp_and_nonce()
                self.logger.info(
                    f"Attempt {attempt + 1}/{max_retries} - Refreshed timestamp: <magenta>{self.timestamp}</magenta>, nonce: <magenta>{self.nonce}</magenta>")

                result = self.solve_captcha()
                if result.get("data", {}).get("result", False):
                    self.logger.info(
                        "CAPTCHA solved successfully! Token: <green>{}</green>".format(result.get("data").get("token")))
                    return result
                else:
                    self.logger.warning(f"Attempt {attempt + 1} failed: {result}")
                    attempt += 1
                    if attempt < max_retries:
                        self.logger.info(f"Refreshing CAPTCHA for retry {attempt + 1}...")
                        time.sleep(random.uniform(delay, delay + 2))
                    else:
                        self.logger.error(f"Max retries ({max_retries}) reached, CAPTCHA solving failed.")
                        return None
            except requests.exceptions.HTTPError as e:
                self.logger.error(f"Attempt {attempt + 1} failed due to HTTP error: <red>{e}</red>")
                if e.response.status_code == 403:
                    consecutive_403s += 1
                    if consecutive_403s >= 3:
                        self.logger.error(
                            "Detected 3 consecutive 403 errors. Likely IP restriction. Please wait a while before retrying or use a proxy.")
                        return None
                attempt += 1
                if attempt < max_retries:
                    self.logger.info(f"Refreshing CAPTCHA for retry {attempt + 1} due to HTTP error...")
                    delay *= 2
                    self.logger.info(f"Increased delay to {delay} seconds due to HTTP error.")
                    time.sleep(random.uniform(delay, delay + 2))
                else:
                    self.logger.error(
                        f"Max retries ({max_retries}) reached due to HTTP errors, CAPTCHA solving failed.")
                    return None
            except Exception as e:
                self.logger.error(f"Attempt {attempt + 1} failed due to error: <red>{e}</red>")
                attempt += 1
                if attempt < max_retries:
                    self.logger.info(f"Refreshing CAPTCHA for retry {attempt + 1} due to error...")
                    time.sleep(random.uniform(delay, delay + 2))
                else:
                    self.logger.error(f"Max retries ({max_retries}) reached due to errors, CAPTCHA solving failed.")
                    return None


# 使用示例
if __name__ == "__main__":
    solver = SliderCaptchaSolver()
    try:
        result = solver.refresh_and_retry()
        if result and result.get("data", {}).get("result", False):
            token_ticket = result.get("data").get("token")
            logger.info("验证码破解成功！")
            logger.info(f"token_ticket: <green>{token_ticket}</green>")
        else:
            logger.info("验证码破解失败")
    except Exception as e:
        print(f"Failed to solve CAPTCHA: {e}")
