import json
import time

import ddddocr
import execjs
import requests

from cBezier import bezierTrajectory


def save_img(url, filename):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
    }
    img_data = requests.get(url, headers=headers).content
    with open('./' + filename, 'wb') as f:
        f.write(img_data)


def get_width():
    det = ddddocr.DdddOcr(det=False, ocr=False)

    with open('./shadeImage.png', 'rb') as f:
        target_bytes = f.read()

    with open('./slideImage.png', 'rb') as f:
        background_bytes = f.read()

    res = det.slide_match(target_bytes, background_bytes, simple_target=True)

    print(res)
    return res.get("target")[0]


cookies = {
    "_2a12e": "http://172.29.101.28:8080",
    "Hm_lvt_bf8738513d38a2418063f7b873084c15": "1731817788",
    "Hm_lvt_753eeeff229f4510294f196bd27291b5": "1731817789",
    "Hm_lpvt_bf8738513d38a2418063f7b873084c15": "1731852217",
    "Hm_lpvt_753eeeff229f4510294f196bd27291b5": "1731852217"
}

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://www.fcbox.com",
    "Pragma": "no-cache",
    "Referer": "https://www.fcbox.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
with open("./丰巢.js", 'r') as f:
    js_code = f.read()
    js = execjs.compile(js_code)


class FC:
    def __init__(self):
        pass

    def get_verify_code(self):
        uuid = js.call("H5uuid")
        url = "https://acs.fcbox.com/captcha/querySlideImage/" + uuid
        data = {}
        data = json.dumps(data, separators=(',', ':'))
        response = requests.post(url, headers=headers, data=data)

        resp = response.json()
        shadeImageUrl = resp['data']['shadeImageUrl']
        slideImageUrl = resp['data']['slideImageUrl']
        save_img(shadeImageUrl, 'shadeImage.png')
        save_img(slideImageUrl, 'slideImage.png')

        print(resp)
        return resp['data'], uuid

    def check_verify_code(self):
        data, uuid = self.get_verify_code()
        width = get_width()
        print(width)
        track_ = bezierTrajectory()
        track_list = track_.generate_gj(width, data['pointY'])
        print(track_list)
        with open("./丰巢.js", 'r') as f:
            js_code = f.read()
            js = execjs.compile(js_code)
            data = js.call("getParams", data, track_list, uuid)
            # print(data)
        url = "https://acs.fcbox.com/captcha/checkCode/" + uuid
        response = requests.post(url, headers=headers, data=data)
        response.encoding = 'utf-8'
        # if response.json()['code'] != 400100000:
        #     return self.check_verify_code()
        print(response.json())
        return response.json()['data']['token']

    def login(self, username, password, token):

        url = "https://www.fcbox.com/passport/login"
        params = {
            "username": username,
            "password": password,
            "verifyCode": token,
            "_": int(time.time() * 1000)
        }
        response = requests.get(url, headers=headers, cookies=cookies, params=params)
        print(response.text)
        print(response)

    def get_pk(self):
        url = "https://www.fcbox.com/noshiro/getPublicKey"

        response = requests.post(url, headers=headers, cookies=cookies)
        print(response, response.json())
        if response.json()["code"] != 0:
            return self.get_pk()
        return response.json()["data"]

    def encrypt_pwd(self, pwd, pk):
        return js.call("pwdEncrypt", pwd, pk)

    def main(self):
        token = self.check_verify_code()
        username = "17670800062"
        password = "Aa3626758"
        pk = self.get_pk()
        encrypt_password = self.encrypt_pwd(password, pk)
        print(encrypt_password, pk)
        self.login(username, encrypt_password, token)


if __name__ == '__main__':
    fc = FC()
    fc.main()
