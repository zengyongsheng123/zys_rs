import json
import time
import uuid

import requests


class Jiyan:
    """极验验证码"""

    def __init__(self):
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh,zh-CN;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://gt4.geetest.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-platform": "\"Android\""
        }
        self.cookies = {
            "captcha_v4_user": "f04025c8f7ab40a487d246e6d3a1a61c",
            "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%22194410cfc4e581-0519a2970059e6-4201551b-671460-194410cfc4f1979%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%7D%2C%22%24device_id%22%3A%22194410cfc4e581-0519a2970059e6-4201551b-671460-194410cfc4f1979%22%7D",
            "sajssdk_2015_cross_new_user": "1",
            "Hm_lvt_25b04a5e7a64668b9b88e2711fb5f0c4": "1736253319,1736258158",
            "HMACCOUNT": "2440EE43F6C5DC06",
            "Hm_lpvt_25b04a5e7a64668b9b88e2711fb5f0c4": "1736258186"
        }
        self.callback = 'geetest_' + str(int(time.time() * 1000))
        self.challenge = str(uuid.uuid4())

    def get_payload(self):
        """获取payload，第一次请求获取滑块跟背景图片"""
        url = "https://gcaptcha4.geetest.com/load"
        params = {
            "callback": self.callback,
            "captcha_id": "54088bb07d2df3c46b79f80300b0abbe",
            "challenge": self.challenge,
            "client_type": "h5",
            "risk_type": "slide",
            "lang": "zh"
        }
        response = requests.get(url, headers=self.headers, cookies=self.cookies, params=params)
        ret = response.text
        left_index = ret.find('(') + 1
        right_index = ret.rfind(')')
        # 获取（）内的数据
        data = json.loads(ret[left_index:right_index])['data']
        # print(data)
        # 第一次加载验证码返回的payload会在第二次请求中用到进行验证
        payload = data['payload']
        # 第一次加载验证码返回的process_token会在第二次请求中用到进行验证
        process_token = data['process_token']
        # 背景图片地址
        background_img_url = 'https://static.geetest.com/' + data['bg']
        # 滑块图片地址
        slice_img_url = 'https://static.geetest.com/' + data['slice']
        # 背景图片
        background_img = requests.get(background_img_url).content
        # 滑块图片
        slice_img = requests.get(slice_img_url).content

        print('背景图片地址:', background_img_url, '滑块图片地址:', slice_img_url, 'payload=', payload,
              'process_token=', process_token, sep='\n')
        return payload, process_token, background_img, slice_img

    def get_verify(self, payload, process_token):
        url = "https://gcaptcha4.geetest.com/verify"
        params = {
            "callback": self.callback,
            "captcha_id": "54088bb07d2df3c46b79f80300b0abbe",
            "client_type": "web_mobile",
            "lot_number": "cfc83e6057024695971a7b9895852e68",
            "risk_type": "slide",
            "payload": payload,
            "process_token": process_token,
            "payload_protocol": "1",
            "pt": "1",
            "w": "dcb37fe4381a8c38c27210a3d50f6de6b891b4eebe65a6445b48efd6c5210cf4ace48dddc10a0bb09290c191fe0ffb0e730370016eca68a17647f0d77c1add68ed2025380db56ada48811f0a6771ec00e93a3ab8766981d192160c64a3915f964c3b08cbd1a2bf63ecb804ed8dcbd25aa7ed08ea00d5a09c00dc94373a98075f5982ffc944c3fb1da699a17c66cdc8ad354b6cae44ec3ccf1726e847435185021dbb62aaf372cf5597150a798ffe9cb55e8199dcc4d4a811c34d0d759b5778da572e7424c251ce4777d86289614d9acada555b089319b0983109b0c01f10576ed5d820d2bba25ddc77135285643a543dd9fa2f3c49583fa42a15ca5610b103d055a777622c0ce2bdbcb10b2eef72a012806ab88295b09aa47f15bdbfb5633ba18dc918098022d2f288aec07820abeff7378a06bce356d9d7f57728e64adc8155b39bef2cca46e9a62504fbaf472a50df3cb5056cfe96df60fa978cf75c191d178071c05130018ce708b540d5862d92dc2634a6911b44943b2c67d49ea6549765fd898710b90a2b7bd8a0ba1ace83c784cda263f7514fe317a8fd1d1b477cb67f9c1dddec6195d95d8b71671b47b686ccc5fa27fb80a04a03aaafc6c02c94391c12b55da295acdf5ca44e3c641ccb950013e26c39d5e572974b901e62ced1cb77d6f37fb710ec0c01a63d5c3714de533c535cbfc91944ecbdd6c20f244a9db1b300dadc6263e7eb7cf92684ff9675fac4eed0043f28153c6f2b4e8b19e7c5a8e970872a672d035f51e52a5878bdc8a06ef6da762ef6facb8891735d0d06d8258e4645a6553bf97e99327b281458daa2b2"
        }
        response = requests.get(url, headers=self.headers, cookies=self.cookies, params=params)
        print(response.text)
        print(response)

    def run(self):
        payload, process_token, background_img, slice_img = self.get_payload()
        self.get_verify(payload, process_token)


if __name__ == '__main__':
    jy = Jiyan()
    jy.run()
