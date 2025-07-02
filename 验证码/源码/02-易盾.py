import json
import random
import string
import time

import ddddocr
import requests
import execjs

from cBezier import bezierTrajectory


class YD:
    def __init__(self):
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.cookies = {
            "_ga": "GA.1.292b2749df4ef.23144f351e412a999478",
            "__root_domain_v": ".163.com",
            "_qddaz": "QD.391614896978802",
            "_ntes_nnid": "d6abdb2fd443025c7978a683948468b1,1728198881421",
            "_ntes_nuid": "d6abdb2fd443025c7978a683948468b1",
            "mp_versions_hubble_jsSDK": "DATracker.globals.1.6.14",
            "Hm_lvt_4671c5d502135636b837050ec6d716ce": "1728799891,1731238135",
            "HMACCOUNT": "1F30BE8AEE0F5663",
            "hb_MA-93D5-9AD06EA4329A_source": "www.baidu.com",
            "Hm_lpvt_4671c5d502135636b837050ec6d716ce": "1731238163"
        }
        self.token = None
        with open('01-易盾滑块.js', encoding='utf-8') as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)

    def generate_random_string(self):
        # 生成7位的随机英文字符
        random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=13))  # 生成一个13位的随机字符串
        return random_string[:7]  # 返回前7个字符

    def dddd_ocr(self, slider_bytes, background_bytes):
        # 识别缺口的距离
        det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        res = det.slide_match(slider_bytes, background_bytes)

        print(f"滑动的距离为: {res['target'][0]}")
        return res['target'][0]

    def get_image(self):
        # 获取图片,提取token的值
        cb = self.js.call('get_cb')
        url = "https://c.dun.163.com/api/v3/get"
        params = {
            "referer": "https://dun.163.com/trial/jigsaw",
            "zoneId": "CN31",
            "dt": "Mt7aIjLpe51AR1RVVFLUujVr9k5a7Ch9",
            "irToken": "IimY6BCDeyVEc1UVRBLCG0Im6T57zTdk",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            "fp": "EKPkw0M65143Ra2xevxOh6Rr+d1QYrT+X3jXERQiPYNKaZeJtOGgbnEIGeKMmfMQItaCMqIMtkj+H9BnYnqAgAWkT94ypCBTKHekWp51cKTgwXpxJcS1cc3PQoqiob9T5ZJNvQ9ubOt9EUrj5bbEJ1e08Typ+iAPXoHmwRqs+L4NevEA:1731239046244",
            "https": "true",
            "type": "2",
            "version": "2.28.0",
            "dpr": "1.25",
            "dev": "1",
            "cb": cb,
            "ipv6": "false",
            "runEnv": "10",
            "group": "",
            "scene": "",
            "lang": "zh-CN",
            "sdkVersion": "",
            "loadVersion": "2.5.1",
            "iv": "4",
            "user": "",
            "width": "320",
            "audio": "false",
            "sizeType": "10",
            "smsVersion": "v3",
            # "token": "6d90db19a7c84041964e5ba1964ed6eb",
            "callback": "__JSONP_qo50r2z_4"
        }

        response = requests.get(url, headers=self.headers, cookies=self.cookies, params=params)
        json_data = json.loads(response.text[response.text.index("(") + 1:response.text.rindex(")")])

        self.token = json_data['data']['token']

        slider_image_url = json_data['data']['front'][0]
        background_image_url = json_data['data']['bg'][0]

        slider_bytes = requests.get(slider_image_url, headers=self.headers).content
        background_bytes = requests.get(background_image_url, headers=self.headers).content

        return slider_bytes, background_bytes

    def check(self, guiji, slider_x):
        # 校验接口
        cb = self.js.call('get_cb')
        data = self.js.call('get_data', guiji, self.token, slider_x - 10.5)

        url = "https://c.dun.163.com/api/v3/check"
        params = {
            "referer": "https://dun.163.com/trial/jigsaw",
            "zoneId": "CN31",
            "dt": "4Y1KJwBISuVBR0ABFVLF+9YLfG0Tjfyv",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            "token": self.token,
            "acToken": "undefined",
            "data": data,
            "width": "320",
            "type": "2",
            "version": "2.27.2",
            "cb": cb,
            "extraData": "",
            "bf": "0",
            "runEnv": "10",
            "sdkVersion": "undefined",
            "iv": "4",
            "callback": "__JSONP_ieo0u7h_4".format(self.generate_random_string(), str(random.randint(1, 9)))
        }
        response = requests.get(url, headers=self.headers, cookies=self.cookies, params=params)
        print(response.text)
        print(response)

    def run(self):
        for i in range(10):
            slider_bytes, background_bytes = self.get_image()
            slider_x = self.dddd_ocr(slider_bytes, background_bytes)
            print(slider_x)
            guiji = bezierTrajectory().generate_gj(slider_x + 10)
            print(guiji)
            # time.sleep(2)
            self.check(guiji, slider_x + 10)


if __name__ == '__main__':
    yd = YD()
    yd.run()
