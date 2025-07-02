import random
import string

import ddddocr
import requests
import execjs
import json
from cBezier import bezierTrajectory


class YD:
    def __init__(self):
        self.img_token = None
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh,zh-CN;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\""
        }
        self.cookies = {
            "_ga": "GA.1.22eb2d4eb1d71.ce22bc4b70bef7300751",
            "Hm_lvt_4671c5d502135636b837050ec6d716ce": "1736066835",
            "Hm_lpvt_4671c5d502135636b837050ec6d716ce": "1736087848",
            "__root_domain_v": ".163.com",
            "_qddaz": "QD.149336066836050"
        }
        with open("易盾.js", "r", encoding="utf-8") as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)

    def generate_random_string(self):
        # 生成7位的随机英文字符
        random_string = ''.join(random.choices(string.ascii_lowercase + string.digits, k=13))  # 生成一个13位的随机字符串
        return random_string[:7]  # 返回前7个字符

    def get_image(self):
        cb = self.js.call("get_cb")
        image_url = "https://c.dun.163.com/api/v3/get"
        image_params = {
            "referer": "https://dun.163.com/trial/jigsaw",
            "zoneId": "CN31",
            # "dt": "0tkkSiwqtKhAUkBEAVPWIBpnyGaddU1O",
            # "irToken": "8FSNCq+g7RlBIxAUUAbHJR9p/f0Dg8v8",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            # "fp": "gf5vW6wH9N66MMUr9PAMCweqxnYelzHrm0IokTe4PCw\\hjiRb8CjdxIriMGbEU4u\\M6iuc+8XSsS4CJymjE9k53niS9Pe2ea8pyYVPhU0zhxQCOLhUPeIOdatECbvOfEB987g9BtbI91W3KrLtSk4GVwTNmDxAzQLJfoiDXbb6mQzZ/u:1736088749281",
            "https": "true",
            "type": "2",
            "version": "2.28.0",
            "dpr": "2",
            "dev": "2",
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
            # "token": "b5e3b576b23b494c9bd141514ed3679a",
            "callback": "__JSONP_zamc49z_14"
        }
        response = requests.get(image_url, headers=self.headers, cookies=self.cookies, params=image_params)
        # json_data = response.text
        json_data = json.loads(response.text[response.text.index("(") + 1:response.text.rindex(")")])
        # print(json_data)
        # 滑块初始图片
        slider_image_url = json_data["data"]["front"][0]
        # 背景图片
        background_image_url = json_data["data"]["bg"][0]
        # 生成图片token
        self.img_token = json_data["data"]["token"]
        print('滑块初始图片:', slider_image_url, '背景图片:', background_image_url, '生成图片token:', self.img_token,
              sep='\n',
              end='')
        # 获取滑块图片
        slider_image = requests.get(slider_image_url, headers=self.headers).content
        # 获取背景图片
        background_image = requests.get(background_image_url, headers=self.headers).content
        return slider_image, background_image

    def dddd_ocr(self, slider_image, background_image):
        # 识别缺口的距离
        det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        res = det.slide_match(slider_image, background_image)

        print(f"滑动的距离为: {res['target'][0]}")
        return res['target'][0]

    def check(self, guiji, slider_x):
        # 校验接口
        cb = self.js.call('get_cb')
        data = self.js.call('get_data', guiji, self.img_token, slider_x - 10.5)

        url = "https://c.dun.163.com/api/v3/check"
        params = {
            "referer": "https://dun.163.com/trial/jigsaw",
            "zoneId": "CN31",
            "dt": "4Y1KJwBISuVBR0ABFVLF+9YLfG0Tjfyv",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            "token": self.img_token,
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
        for i in range(1):
            slider_image, background_image = self.get_image()
            slider_x = self.dddd_ocr(slider_image, background_image)
            print(slider_x)
            guiji = bezierTrajectory().generate_gj(slider_x + 10)
            print(guiji)
            # time.sleep(2)
            self.check(guiji, slider_x + 10)


if __name__ == '__main__':
    yd = YD()
    yd.run()
