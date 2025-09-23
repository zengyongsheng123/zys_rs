import random
import time
import ddddocr
import requests
import execjs
from cBezier import bezierTrajectory


class FC(object):
    def __init__(self):
        self.requests = requests.Session()
        with open('丰巢.js', 'r', encoding='utf-8') as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)
        self.headers = {
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
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.querySlideImage_url = "https://acs.fcbox.com/captcha/querySlideImage/"
        self.checkCode_url = 'https://acs.fcbox.com/captcha/checkCode/'
        self.getPublicKey_url = 'https://www.fcbox.com/noshiro/getPublicKey'
        self.login_url='https://www.fcbox.com/passport/login'

    def one_data(self):
        url = self.querySlideImage_url + self.uuid
        res = self.requests.post(url, headers=self.headers).json()
        query_data = {}
        query_data['checkId'] = res['data']['checkId']
        query_data['clientIp'] = res['data']['clientIp']
        query_data['key'] = res['data']['key']
        query_data['pointX'] = res['data']['pointX']
        query_data['pointY'] = res['data']['pointY']
        query_data['shadeImageUrl'] = res['data']['shadeImageUrl']
        query_data['slideImageUrl'] = res['data']['slideImageUrl']
        return query_data

    def get_img(self, shadeImageUrl, slideImageUrl):
        res = requests.get(shadeImageUrl, headers=self.headers)
        with open('shade.jpg', 'wb') as f:
            f.write(res.content)
        res = requests.get(slideImageUrl, headers=self.headers)
        with open('slide.jpg', 'wb') as f:
            f.write(res.content)

    def dddd_ocr(self):
        det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        with open('shade.jpg', 'rb') as f:
            background_bytes = f.read()
        with open('slide.jpg', 'rb') as f:
            target_bytes = f.read()
        res = det.slide_match(target_bytes, background_bytes)
        return res['target'][0]

    def check_code(self, data):
        url = self.checkCode_url + self.uuid
        res = self.requests.post(url, headers=self.headers, data=data)
        return res.json()

    def main(self):
        date = int(time.time() * 1000)
        while (1):
            self.uuid = self.js.call('get_H5uuid')
            query_data = self.one_data()
            self.get_img(query_data['shadeImageUrl'], query_data['slideImageUrl'])
            x = self.dddd_ocr()
            print(x)
            gj = bezierTrajectory().generate_gj(x)
            data_ = []
            for i in gj:
                data = {}
                data['x'] = i[0]
                data['y'] = query_data['pointY']
                date += random.randint(1, 10)
                data['time'] = date
                data_.append(data)
            jm_gj = self.js.call('get_gjjm', data_, query_data['key'], query_data['clientIp'], query_data['checkId'],
                                 self.uuid)
            code_data = self.check_code(jm_gj)
            print(code_data)
            if code_data['success'] != False:
                code=code_data['data']['token']
                break
        res = self.requests.post(self.getPublicKey_url, headers=self.headers)
        PublicKey = res.json()['data']
        print(PublicKey)
        pwd = self.js.call('rsaEncrypt', '123456', PublicKey)
        params = {
            "username": "15545454545",
            "password": pwd,
            "verifyCode": code,
            "_": str(int(time.time() * 1000))
        }
        print(params)
        res1=self.requests.get(self.login_url,params=params)
        print(res1.json())


if __name__ == '__main__':
    fc = FC()
    fc.main()
