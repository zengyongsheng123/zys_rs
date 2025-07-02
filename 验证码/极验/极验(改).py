import json
import requests
import uuid
import time


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

    def get_payload(self):
        """获取payload，第一次请求获取滑块跟背景图片"""
        url = "https://gcaptcha4.geetest.com/load"
        params = {
            "callback": "geetest_" + str(int(time.time() * 1000)),
            "captcha_id": "24f56dc13c40dc4a02fd0318567caef5",
            "challenge": str(uuid.uuid4()),
            "client_type": "web",
            "risk_type": "slide",
            "lang": "zh"
        }
        response = requests.get(url, headers=self.headers, cookies=self.cookies, params=params)
        ret = response.text
        left_index = ret.find('(') + 1
        right_index = ret.rfind(')')
        # 获取（）内的数据
        data = json.loads(ret[left_index:right_index])['data']
        print(data)
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

    def run(self):
        self.get_payload()


if __name__ == '__main__':
    jy = Jiyan()
    jy.run()
