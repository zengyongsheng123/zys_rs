import base64
import json
import math
import random
import re
import string
import time

# from curl_cffi import requests
import execjs
import requests

from cBezier import bezierTrajectory

requests = requests.Session()


class YiDun:
    _custom_url = "http://api.jfbym.com/api/YmServer/customApi"
    _token = '自己的云码'
    _headers = {
        'Content-Type': 'application/json'
    }

    def __init__(self):
        self.headers = headers = {
            "Accept": "*/*",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://dun.163.com/",
            "Sec-Fetch-Dest": "script",
            "Sec-Fetch-Mode": "no-cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
            "sec-ch-ua": "\"Microsoft Edge\";v=\"125\", \"Chromium\";v=\"125\", \"Not.A/Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.cookies = {
            "_ga": "GA.1.243d643b719f5.ff5038e556f76c1a57d0",
            "__root_domain_v": ".163.com",
            "_qddaz": "QD.171015916449927",
            "wyy_uid": "fa408a8c-9c70-4ebe-962f-0287319e20e6",
            "hb_MA-91DF-2127272A00D5_source": "dun.163.com",
            "locale": "zh_CN",
            "_gcl_au": "1.1.682307428.1716533957",
            "urs_u": "TPtsT8I-m9R38UEjlk4qz-HOYE9cie1/Ze2H8nRaSlpXpS9tXZ4iXG6RK7Fz/RHMwPQWQJyi0ErjGQqAB4T/meEK1sZEnYn9xuMzFhD4FWdpM8Lr0BYJPczb0m3-YdftMVutdC5Frp2Jvtu7rBsKMWcPFS/DgIHJC3ZiG5RdPd2bFjOf25AFhu/NmBjj5ixfw-AAG/slguVB8bR1/LbeGOPQNQL/0LwF46J80F6d6AVyoPuWeCHC0PAiO1skERTXU6VkDC-8CjQZ3szHnrd8zDGQkIzFf8b9vV8FzdnK5ZfEXI5ybY3wqwr4S15FhLe-",
            "urs_t": "x9zyxMd41AInp6ryD9ApK2-Q",
            "mp_versions_hubble_jsSDK": "DATracker.globals.1.6.14",
            "Hm_lvt_4671c5d502135636b837050ec6d716ce": "1718354851,1719405518",
            "hb_MA-93D5-9AD06EA4329A_source": "www.baidu.com",
            "Hm_lpvt_4671c5d502135636b837050ec6d716ce": "1719405592"
        }
        self.url = "https://c.dun.163.com/api/v3/get"

        self.token = None
        self.node_token = None
        self.node_fp = None
        self.node_cb = None
        self.node_data = None
        self.node_data_d = None

    def generate_random_string(self, length=7):
        # 将26个英文字母小写和数字0-9合并为一个字符串
        characters = string.ascii_lowercase + string.digits
        # 从合并后的字符串中随机选择length个字符，然后将它们连接起来返回
        return ''.join(random.sample(characters, length))

    def first_requests(self):
        url = "https://ac.dun.163.com/v3/b"
        d = self.node_data_d.call('get_d')
        data = {
            "d": d,
            "v": "33d41777",
            "cb": f"__wmjsonp_{self.generate_random_string()}"
        }
        res = requests.post(url, headers=self.headers, data=data)
        print(res.text)

    def get_js_code(self):
        # 获取对应的js代码
        with open('易盾点选_图片参数_acToken.js', encoding='utf-8') as f:
            js_code_token = f.read()
        with open('易盾点选_图片参数_fp.js', encoding='utf-8') as f:
            js_code_fp = f.read()
        with open('易盾点选_图片参数_cb.js', encoding='utf-8') as f:
            js_code_cb = f.read()
        with open('易盾点选_坐标加密_data.js', encoding='utf-8') as f:
            js_code_data = f.read()
        with open('易盾点选_data_d.js', encoding='utf-8') as f:
            js_code_data_d = f.read()
        self.node_token = execjs.compile(js_code_token)
        self.node_fp = execjs.compile(js_code_fp)
        self.node_cb = execjs.compile(js_code_cb)
        self.node_data = execjs.compile(js_code_data)
        self.node_data_d = execjs.compile(js_code_data_d)

    def click_verify(self, image, label_image=None, extra=None, verify_type="30100"):
        # 通用任意点选1~4个坐标 30009
        # 通用文字点选1(extra,点选文字逗号隔开,原图) 30100
        # 定制-文字点选2(extra="click",原图) 30103
        # 定制-单图文字点选 30102
        # 定制-图标点选1(原图) 30104
        # 定制-图标点选2(原图,extra="icon") 30105
        # 定制-语序点选1(原图,extra="phrase") 30106
        # 定制-语序点选2(原图) 30107
        # 定制-空间推理点选1(原图,extra="请点击xxx") 30109
        # 定制-空间推理点选1(原图,extra="请_点击_小尺寸绿色物体。") 30110
        # 定制-tx空间点选(extra="请点击侧对着你的字母") 50009
        # 定制-tt_空间点选 30101
        # 定制-推理拼图1(原图,extra="交换2个图块") 30108
        # 定制-xy4九宫格点选(原图,label_image,image) 30008
        payload = {
            "image": base64.b64encode(image).decode(),
            # "label_image": base64.b64encode(label_image).decode(),
            "token": self._token,
            "type": verify_type
        }
        if extra:
            payload['extra'] = extra
        resp = requests.post(self._custom_url, headers=self._headers, data=json.dumps(payload))
        print(resp.text)
        return resp.json()['data']['data']

    def get_img(self):
        # 获取图片
        acToken = self.node_token.call('get_acToken')
        cb = self.node_cb.call('get_cb')
        fp = self.node_fp.call('get_fp')
        params = {
            "referer": "https://dun.163.com/trial/picture-click",
            "zoneId": "CN31",
            "dt": "/5GkrYj1rVxBA0FEAFaQusAg0j9NHYnG",
            "irToken": "Q/bjQ66OI3JEN1VVQQaSXOfE+GQB6dZy",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            "fp": "u2SejPyghiyJ4iAs3QnLLRpANWRN+QJrN3nnHXn9/gjqUIz8xb/dNdB2cHQ0/91Irnpmq5UY53d0YQwwDBale0O5opnBsj1m4aDZMX2jc2N2T1GvQ5Rf7MReL0jsinCGBerba4\laxqqpMcAcfX+ChP471rPQVWeCUwxxx0zAcLwiqoK:1730216546806",
            "https": "true",
            "type": "3",
            "version": "2.28.0",
            "dpr": "1",
            "dev": "1",
            "cb": cb,
            "ipv6": "false",
            "runEnv": "10",
            "group": "",
            "scene": "",
            "lang": "zh-CN",
            "sdkVersion": "undefined",
            "iv": "4",
            "width": "320",
            "audio": "false",
            "sizeType": "10",
            "smsVersion": "v3",
            "token": "",
            "callback": f"__JSONP_{self.generate_random_string()}_" + str(random.randint(1, 9))
        }
        response = requests.get(self.url, headers=self.headers, params=params, cookies=self.cookies)
        print(response.text)
        img_url = re.findall(r'{"bg":\["(.*?)",', response.text)[0]
        extra = re.findall(r'"front":"(.*?)"', response.text)[0]
        self.token = re.findall(r'"token":"(.*?)"', response.text)[0]
        extra_list = []
        for i in extra:
            extra_list.append(i)
        zhi_ti = (',').join(extra_list)
        print(zhi_ti)
        res = requests.get(img_url, headers=self.headers)
        res = requests.get(img_url, headers=self.headers)
        with open('img_yidun.jpg', 'wb') as f:
            f.write(res.content)
        image = open('img_yidun.jpg', 'rb').read()

        # 图片交给云码识别获取坐标
        coordinate_str = self.click_verify(image, extra=zhi_ti)
        print(coordinate_str)
        return coordinate_str

    def get_data(self, coordinate_str):
        guiji = bezierTrajectory()

        coordinate_list = []
        for i in coordinate_str.split('|'):
            coordinate_list.append(i.split(','))
        date = int(time.time() * 1000)
        coordinate_sign_list = []

        # 生成随机的初始位置
        # x = random.randint(150, 200)
        x = 189
        # y = random.randint(90, 120)
        y = 116
        I_list = []
        # 遍历坐标，把坐标放到加密函数进行加密
        ii = 0
        for coordinate in coordinate_list:
            if ii != 0:
                time.sleep(random.uniform(0.5, 0.75))
                distance = math.sqrt((int(coordinate[0]) - x) ** 2 + (int(coordinate[1]) - y) ** 2)
                # 每次移动的步长为2
                step_length = 1

                # 计算坐标点数
                number_of_coordinates = math.ceil(distance / step_length)
                # 生成移动轨迹，并对移动的轨迹进行加密， 然后把3次加密轨迹添加到I_list里面
                # i_list = self.node_data.call('generateRandomCoordinates', self.token, date - 1985, x, y, int(coordinate[0]),
                #                              int(coordinate[1]))
                zuobiao = guiji.trackArray([x, y], [int(coordinate[0]), int(coordinate[1])], int(number_of_coordinates),
                                           4, 5, 0.5, 3)

                i_list = self.node_data.call('generateRandomCoordinates', self.token, date - 985, x, y,
                                             int(coordinate[0]),
                                             int(coordinate[1]), zuobiao['trackArray'])
                I_list.extend(i_list)

            # 调用加密坐标函数进行加密得到coordinate_sign
            coordinate_sign = self.node_data.call('get_coordinate_sign', int(coordinate[0]), int(coordinate[1]),
                                                  self.token, date)

            x = int(coordinate[0])
            y = int(coordinate[1])
            # 把加密的坐标放到数组里面
            coordinate_sign_list.append(coordinate_sign)
            ii += 1
        # print(I_list)

        print(coordinate_sign_list)
        # 对3个坐标和移动轨迹进行最终的加密
        data_sign = self.node_data.call('get_data_sign', self.token, coordinate_sign_list, I_list)
        return data_sign

    def second_request(self, data_sign):
        # 第二次请求
        cb = self.node_cb.call('get_cb')
        url = "https://c.dun.163.com/api/v3/check"
        params = {
            "referer": "https://dun.163.com/trial/picture-click",
            "zoneId": "CN31",
            "dt": "/5GkrYj1rVxBA0FEAFaQusAg0j9NHYnG",
            "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
            "token": self.token,
            "acToken": "undefined",
            "data": data_sign,
            "width": "320",
            "type": "3",
            "version": "2.27.2",
            "cb": cb,
            "extraData": "",
            "bf": "0",
            "runEnv": "10",
            "sdkVersion": "undefined",
            "iv": "4",
            "callback": f"__JSONP_{self.generate_random_string()}_" + str(random.randint(1, 9))
        }
        # time.sleep(1)
        response = requests.get(url, headers=self.headers, params=params, cookies=self.cookies)

        print(response.text)

    def main(self):
        self.get_js_code()
        self.first_requests()
        coordinate_str = self.get_img()
        data_sign = self.get_data(coordinate_str)
        self.second_request(data_sign)


if __name__ == '__main__':
    yd = YiDun()
    yd.main()
