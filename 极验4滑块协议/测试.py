import ddddocr
import execjs
import hashlib
import json
import random
import requests
import time
from loguru import logger


class JY4:
    def __init__(self):
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://www.geetest.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        with open("w.js", "r", encoding="utf-8") as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)

    def download_image(self, url, path):
        response = requests.get(url, headers=self.headers)
        with open(path, "wb") as f:
            f.write(response.content)

    def first_request(self):
        url = "https://gcaptcha4.geetest.com/load"
        params = {
            "callback": "geetest_1742221904566",
            "captcha_id": "24f56dc13c40dc4a02fd0318567caef5",
            # "challenge": uuid,
            "client_type": "web",
            "risk_type": "slide",
            "lang": "zh"
        }
        response = requests.get(url, headers=self.headers, params=params)
        json_data = json.loads(response.text[response.text.index("(") + 1:response.text.rindex(")")])
        bg_url = "https://static.geetest.com/" + json_data["data"]["bg"]
        slice_url = "https://static.geetest.com/" + json_data["data"]["slice"]
        lot_number = json_data['data']["lot_number"]
        captcha_type = json_data['data']["captcha_type"]
        payload = json_data['data']["payload"]
        process_token = json_data['data']["process_token"]
        datatime = json_data['data']['pow_detail']['datetime']

        # 下载图片并保存到本地
        bg_path = "bg.png"
        slice_path = "slice.png"
        self.download_image(bg_url, bg_path)
        self.download_image(slice_url, slice_path)

        return bg_path, slice_path, lot_number, captcha_type, payload, process_token, datatime

    def dddd_ocr(self, slider_path, background_path):
        try:
            # 读取本地图片并转换为二进制
            with open(slider_path, "rb") as f:
                slider_bytes = f.read()
            with open(background_path, "rb") as f:
                background_bytes = f.read()

            # 识别缺口的距离
            det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
            res = det.slide_match(slider_bytes, background_bytes, simple_target=True)
            logger.info(f"滑动的距离为: {res['target'][0]}")
            return res['target'][0]
        except Exception as e:
            logger.error(f"错误信息是: {e}")

    def get_verify(self, lot_number, captcha_type, payload, process_token, w):
        url = "https://gcaptcha4.geetest.com/verify"
        params = {
            "callback": "geetest_1742221904566",
            "captcha_id": "24f56dc13c40dc4a02fd0318567caef5",
            "client_type": "web",
            "lot_number": lot_number,
            "risk_type": captcha_type,
            "payload": payload,
            "process_token": process_token,
            "payload_protocol": "1",
            "pt": "1",
            "w": w
        }
        response = requests.get(url, headers=self.headers, params=params)

        json_data = json.loads(response.text[response.text.index("(") + 1:response.text.rindex(")")])
        # print(json_data)
        try:
            if json_data['data']["result"]:
                if json_data['data']["result"] == "success":
                    captcha_output = json_data["data"]["seccode"]['captcha_output']
                    logger.success(f"验证成功-->返回的数据为 {captcha_output}")
                else:
                    logger.error(f"验证失败-->返回的数据为 {json_data}")
        except Exception as e:
            logger.error(f"发生异常-->异常原因为: {e}")
        # print(response)

    def md5_encryption(self, text):
        md5 = hashlib.md5()  # 创建一个md5对象
        md5.update(text.encode('utf-8'))  # 使用utf-8编码数据
        return md5.hexdigest()  # 返回加密后的十六进制字符串

    def run(self):
        for i in range(5):
            bg_path, slice_path, lot_number, captcha_type, payload, process_token, datatime = self.first_request()
            captcha_id = "24f56dc13c40dc4a02fd0318567caef5"

            randomKey = self.js.call("four_random_rt")
            # print(randomKey)
            pow_msg = f'1|0|md5|{datatime}|{captcha_id}|{lot_number}||{randomKey}'
            pow_sign = self.md5_encryption(pow_msg)
            distance = self.dddd_ocr(slice_path, bg_path)
            passtime = random.randint(1000, 3000)

            w = self.js.call("genSlideW4", lot_number, distance, passtime, pow_msg, pow_sign, randomKey)

            self.get_verify(lot_number, captcha_type, payload, process_token, w)
            time.sleep(1)


if __name__ == '__main__':
    jy = JY4()
    jy.run()
