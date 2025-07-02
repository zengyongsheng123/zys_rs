# 第一次 : https://www.geetest.com/demo/gt/register-click-official?t=171050801
# 第三次:   https://api.geetest.com/get.php?gt=9dd4b398509fd4b2a2cbf2a7c0a7c605&challenge=428444b7895b00c089ce6614a83958e7&lang=zh-cn&pt=0&client_type=web
# 第四次:   https://api.geevisit.com/ajax.php?gt=9dd4b398509fd4b2a2cbf2a7c0a7c605&challenge=428444b7895b00c089ce6614a83958e7&lang=zh-cn&pt=0&client_type=web
# 第五次:   https://api.geevisit.com/get.php?is_next=true&type=click&gt=9dd4b398509fd4b2a2cbf2a7c0a7c605&challenge=428444b7895b00c089ce6614a83958e7&lang=zh-cn&https=true&protocol=https%3A%2F%2F&offline=false&product=float&api_server=api.geevisit.com&isPC=true&autoReset=true&width=100%25&callback=geetest_1710508110643
# 第六次:   https://api.geevisit.com/ajax.php?gt=9dd4b398509fd4b2a2cbf2a7c0a7c605&challenge=428444b7895b00c089ce6614a83958e7&lang=zh-cn&pt=0&client_type=web&w=
import base64
import json

import requests
import execjs
import time

requests = requests.session()


class JiYan():
    def __init__(self):
        self.one_url = 'https://www.geetest.com/demo/gt/register-click-official'
                    #   https://api.geevisit.com/ajax.php
        self.two_url = 'https://api.geevisit.com/ajax.php'
        self.th_url = 'https://api.geevisit.com/get.php'

        self._custom_url = "http://api.jfbym.com/api/YmServer/customApi"
        self._headers = {
            'Content-Type': 'application/json'
        }
        self.headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://www.geetest.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
            "^sec-ch-ua": "^\\^Chromium^^;v=^\\^122^^, ^\\^Not(A:Brand^^;v=^\\^24^^, ^\\^Microsoft",
            "sec-ch-ua-mobile": "?0",
            "^sec-ch-ua-platform": "^\\^Windows^^^"
        }
        self.gt = None
        self.challenge = None

    def one_request(self):
        # 获取到gt, 和challenge的值
        params = {
            't': str(int(time.time() * 1000))
        }
        res = requests.get(self.one_url, params=params, headers=self.headers)
        challenge = res.json()['challenge']
        gt = res.json()['gt']
        self.gt = gt
        self.challenge = challenge

    def two_request(self):
        # 获取 验证码的类型
        params1 = {
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "pt": "0",
            "client_type": "web",
            "w": "",
            "callback": "geetest_" + str(int(time.time() * 1000))
        }
        print(requests.get(self.two_url, params=params1).text)

        params = {
            "is_next": "true",
            "type": "click",
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "https": "true",
            "protocol": "https://",
            "offline": "false",
            "product": "float",
            "api_server": "api.geevisit.com",
            "isPC": "true",
            "autoReset": "true",
            "width": "100%",
        }
        # 获取验证码的图片
        response = requests.get(self.th_url, headers=self.headers, params=params)
        pic = json.loads(response.text[1:-1])['data']['pic']
        s = json.loads(response.text[1:-1])['data']['s']
        c = json.loads(response.text[1:-1])['data']['c']
        return pic, c, s

    def click_verify(self, image, extra=None, verify_type="30103"):
        payload = {
            "image": base64.b64encode(image).decode(),
            "extra": 'click',
            "token": "8Ex4T4HOPaoA2Sl91uhDRjGZc8zS0XzhpCOvwBtkbR4",
            "type": verify_type
        }
        if extra:
            payload['extra'] = extra
        resp = requests.post(self._custom_url, headers=self._headers, data=json.dumps(payload))
        # print(resp.text)
        return resp.json()['data']['data']

    def geetest_click(self, click_xy):
        # 坐标还原
        click_point_array = click_xy.split('|')
        click_point_true = []
        for item in click_point_array:
            x, y = item.split(',')
            point = str(int(int(x) / 344 * 10000)) + '_' + str(int(int(y) / 344 * 10000))
            click_point_true.append(point)
        click_true_str = ','.join(click_point_true)
        return click_true_str



    def parse_data(self, pic, s, c):
        img_res = requests.get('https://static.geetest.com' + pic, headers=self.headers)
        open('dd.png', 'wb').write(img_res.content)
        xy = self.click_verify(img_res.content)
        print(xy)
        click_true_str = self.geetest_click(xy)
        print(click_true_str)
        # print(click_true_str, pic, s, c, self.gt, self.challenge)
        js = execjs.compile(open('01-点选验证码.js', encoding='utf-8').read())
        data_w = js.call('get_w', click_true_str, pic, c, s, self.gt, self.challenge)
        return data_w

    def th_request(self, data_w):
        params = {
            "gt": self.gt,
            "challenge": self.challenge,
            "lang": "zh-cn",
            "pt": "0",
            "client_type": "web",
            "w": data_w,
            "callback": "geetest_1710510001251"
        }
        time.sleep(2)
        res = requests.get('https://api.geevisit.com/ajax.php', params=params, headers=self.headers)
        print(res.text)



    def main(self):
        self.one_request()
        pic, c, s = self.two_request()
        print(pic, c, s)
        data_w = self.parse_data(pic, s, c)
        self.th_request(data_w)
        # print(pic, c, s)


if __name__ == '__main__':
    jy = JiYan()
    jy.main()

    # 看了洛神第10期讲滑块的课程然后是写了下老是返回这个数据geetest_17063446088860(
    #     {"status": "error", "error": "param decrypt error", "user_error": "\u7f51\u7edc\u4e0d\u7ed9\u529b",
    #      "error_code": "error_03"})