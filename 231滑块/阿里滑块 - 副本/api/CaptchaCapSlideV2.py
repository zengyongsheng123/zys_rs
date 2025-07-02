import os
import random

import execjs
import sys
import json

__dir__ = os.path.dirname(os.path.abspath(__file__))


sys.path.append(__dir__)
sys.path.append(os.path.abspath(os.path.join(__dir__, '../')))
PATH = os.path.abspath(os.path.dirname(os.getcwd()))
import sign
import requests


class CaptchaCapSlideV2():
    def __init__(self, url, config, umidToken=None):
        self.config = config
        self.url = url
        self.headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 Edg/124.0.0.0',
        }
        self.umidToken = umidToken if umidToken else sign.getUmidToken()
        # logger.info(self.umidToken)

    def get_xmax(self, imageData, ques):
        headers = {
            'Content-Type': 'application/json',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
        }
        # 将 base64 字符串解码为图像
        url = "http://127.0.0.1:9999/img/api/TbCaptchaMatch"
        json_data = {
            "imageData": imageData,
            "ques": ques,
        }
        response = requests.post(url, headers=headers, json=json_data)
        return response.json()["data"]["xmax"]


    def captchaInfo(self, token, appKey, x5secdata, url):
        params = {
            'token': token,
            'appKey': appKey,
            'x5secdata': x5secdata,
            'language': 'cn',
            'v': '010628731260757007',
        }
        for i in range(5):
            try:
                response = requests.get(url=url, params=params, headers=self.headers, timeout=5)
                encryptToken = response.json()["data"]["encryptToken"]
                ques = response.json()["data"]["ques"]
                imageData = response.json()["data"]['imageData']
                return encryptToken, ques, imageData
            except:
                continue

    def verify(self, cookie=""):
        bx_pp = sign.ppSign(self.config['pp'])
        token = self.config['NCTOKENSTR']
        appKey = self.config['NCAPPKEY']
        x5secdata = self.config['SECDATA']
        domain = "https://" + self.config['HOST'].replace(':443', '') + self.config['PATH']
        validateUrl = domain + '/_____tmd_____/newslidevalidate'
        captchaUrl = domain + '/_____tmd_____/newslidecaptcha'
        encryptToken, ques, imageData = self.captchaInfo(token, appKey, x5secdata, captchaUrl)
        x = self.get_xmax(imageData, ques)
        per = str(round(x / 320 * 1e3) / 1e3)

        trajectory = sign.offsetTrajectory(json.loads(open(sign.trajectoryPath2, 'r', encoding='utf-8').read()))


        ua, screenTop, screenLeft, innerWidth, innerHeight, outerWidth, outerHeight = sign.uaSign(self.url, 1, self.umidToken, trajectory,  cookie)

        params = {
            'token': token, 'appKey': appKey, 'ua': ua,
            'umidToken': self.umidToken,
            'width': '272', 'per': per,
            'encryptToken': encryptToken,
            'x5secdata': x5secdata, 'time': trajectory["endTime"] - trajectory["startTime"],
            'ppt': '1', 'v': str(random.randint(10000000000, 99999999999))
        }
        validateUrl = validateUrl + "?" + sign.encode(params)
        bx_et = sign.etSign(validateUrl, self.url, trajectory, cookie)
        return {'bx_et': bx_et, 'bx-pp': bx_pp, 'url': validateUrl, "referer": self.url.replace(':443', '')}

