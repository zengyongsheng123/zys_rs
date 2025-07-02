import os
import random
import sys
import sign
import json
import time
from loguru import logger

__dir__ = os.path.dirname(os.path.abspath(__file__))

sys.path.append(__dir__)
sys.path.append(os.path.abspath(os.path.join(__dir__, '../')))
PATH = os.path.abspath(os.path.dirname(os.getcwd()))


class Captcha():
    def __init__(self, url, config, umidToken=None):
        self.config = config
        self.url = url
        self.umidToken = umidToken if umidToken else sign.getUmidToken()

    def verify(self, cookie=""):
        bx_pp = sign.ppSign(self.config['pp'])
        token = self.config['NCTOKENSTR']
        appKey = self.config['NCAPPKEY']
        x5secdata = self.config['SECDATA']
        validateUrl = "https://" + self.config['HOST'].replace(':443', '') + self.config[
            'PATH'] + '/_____tmd_____/slide'
        # trajectory = sign.offsetTrajectory(sign.getTrajectory(1))

        trajectory = sign.offsetTrajectory(json.load(open(sign.trajectoryPath, 'r', encoding='utf-8')))
        n, screenTop, screenLeft, innerWidth, innerHeight, outerWidth, outerHeight = sign.uaSign(self.url, 0,
                                                                                                 self.umidToken,
                                                                                                 trajectory, cookie)

        slidedata = {
            "a": appKey, "t": token, "n": n,
            "p": f'{{"ncbtn":"808|593|42|30|593|623|808|850","umidToken":"{self.umidToken}","ncSessionID":"5e701f1956fb","et":"1"}}',
            "scene": "register", "asyn": 0, "lang": "cn", "v": 1,
        }
        slidedata = json.dumps(slidedata).replace(' ', '')
        params = {
            'slidedata': slidedata, 'x5secdata': x5secdata,
            'ppt': '1', 'landscape': '1', 'ts': str(int(time.time() * 1000)),
            'v': random.randint(10000000000, 99999999999),
        }
        validateUrl = validateUrl + "?" + sign.encode(params)
        bx_et = sign.etSign(validateUrl, self.url, trajectory, cookie)
        return {'bx_et': bx_et, 'bx-pp': bx_pp, 'url': validateUrl, "referer": self.url.replace(':443', '')}
