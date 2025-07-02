from functools import partial
import subprocess
import ddddocr
import re
import subprocess
import requests

from trace_generator import Generate_trajectory
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8', errors='ignore')


ALL_COOKIES = {
}


class KS:
    def __init__(self):
        self.cookies = {
            "did": "web_b84e38090cc3e1acafb26116cdfb3ab6",
            "soft_did": "1619580708547"
        }

        self.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-type': 'application/x-www-form-urlencoded',
            # 'Cookie': 'did=web_363b33a47139d99ed8479cb87d4dd4a0; bUserId=1000401107552; didv=1735563573866',
            'Origin': 'https://passport.kuaishou.com',
            'Pragma': 'no-cache',
            'Referer': 'https://passport.kuaishou.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        self.captchaSession = ''
        self.captchaSn = ''
        self.captchaSn = ''
        self.codeX = ''
        self.finaliguiji = ''
        self.disY = ''
        self.captchaToken = ''

    def requestMobileCode(self, input_url):
        # 给定的字符串
        # 使用正则表达式提取 captchaSession 的值
        match = re.search(r'captchaSession=([A-Za-z0-9-_]+)', input_url)

        if match:
            captcha_session = match.group(1)
            print("captchaSession:", captcha_session)
        else:
            print("没有找到 captchaSession")

        self.captchaSession = captcha_session

    def RqConfig(self):

        data = {
            'captchaSession': self.captchaSession
        }

        response = requests.post(
            'https://captcha.zt.kuaishou.com/rest/zt/captcha/sliding/config',
            cookies=self.cookies,
            headers=self.headers,
            data=data,
        )
        print(response.text)
        data = response.json()

        self.captchaSn = data['captchaSn']

        # 提取图片 URL
        self.captchaSn = data['captchaSn']
        bg_pic_url = data["bgPicUrl"]
        cut_pic_url = data["cutPicUrl"]
        params = {
            'captchaSn': self.captchaSn,
        }
        self.slider_bytes = requests.get(cut_pic_url, params=params).content
        self.background_bytes = requests.get(bg_pic_url, params=params).content
        self.disY = data["disY"] * 0.46

    def go(self):
        import requests

        cookies = {
            "did": "web_b84e38090cc3e1acafb26116cdfb3ab6",
            "soft_did": "1619580708547"
        }

        headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            # 'Cookie': 'did=web_363b33a47139d99ed8479cb87d4dd4a0; didv=1735563573866',
            'Origin': 'https://captcha.zt.kuaishou.com',
            'Pragma': 'no-cache',
            'Referer': 'https://captcha.zt.kuaishou.com/iframe/index.html?captchaSession=' + self.captchaSession,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }

        # Define the command to run the Node.js script
        # Run the command and capture the output
        goparam = f'node KSFuck.js {self.captchaSn} {self.finaliguiji} {self.disY} {self.codeX}'
        # print(goparam)
        res = subprocess.run(goparam.split(), capture_output=True, text=True).stdout

        # json_data = {
        #     'verifyParam': '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',
        # }

        print(res)

        json_data = {
            'verifyParam': str.replace(res, '\n', ''),
        }

        print(json_data)

        response = requests.post(
            'https://captcha.zt.kuaishou.com/rest/zt/captcha/sliding/kSecretApiVerify',
            cookies=cookies,
            headers=headers,
            json=json_data,
        )

        # Note: json_data will not be serialized by requests
        # exactly as it was in the original request.
        # data = '{"verifyParam":"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"}'
        # response = requests.post(
        #    'https://captcha.zt.kuaishou.com/rest/zt/captcha/sliding/kSecretApiVerify',
        #    cookies=cookies,
        #    headers=headers,
        #    data=data,
        # )
        print(response.json())
        self.captchaToken = response.json()['captchaToken']

    def verify(self):
        # 识别缺口的距离
        det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        res = det.slide_match(self.slider_bytes, self.background_bytes)
        self.codeX = res['target'][0]
        self.codeX = int(round(int(self.codeX) * 0.469, 0) - 5)
        print(f"滑动的距离为: {res['target'][0]}")

    def guiji(self):
        distance = self.codeX
        final_guiji = Generate_trajectory().get_slide_track(int(int(distance) * 3.42))
        print(final_guiji)
        self.finaliguiji = final_guiji

    def requestCode(self):
        cookies = {
            'didv': '1735563573866',
            'soft_did': '1619580708547',
            'kwpsecproductname': 'PCLive',
            'did': 'web_d1f9d2425fed55a3789629d0eda6f5fa',
            'kwfv1': 'PnGU+9+Y8008S+nH0U+0mjPf8fP08f+98f+nLlwnrIP9+Sw/ZFGfzY+eGlGf+f+e4SGfbYP0QfGnLFwBLU80mYG9cFP0WU8eWA8040808DPBrMG0bYGAWMwnpjP/QDw/ZE+/mS8fPAGnr98/Z7P/Qj8eqM+9zjPApS+980+/SDP0P=',
            'bUserId': '1000401107552',
            'userId': '3733004330',
        }

        headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-type': 'application/x-www-form-urlencoded',
            # 'Cookie': 'did=web_363b33a47139d99ed8479cb87d4dd4a0; didv=1735563573866',
            'Origin': 'https://passport.kuaishou.com',
            'Pragma': 'no-cache',
            'Referer': 'https://passport.kuaishou.com/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
            'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }

        data = {
            'sid': 'kuaishou.web.cp.api',
            'type': '53',
            'countryCode': '+86',
            'phone': '15926576640',
            'account': '',
            'ztIdentityVerificationType': '2',
            'ztIdentityVerificationCheckToken': self.captchaToken,
            'channelType': 'PC_PAGE',
            'encryptHeaders': '',
        }

        response = requests.post(
            'https://id.kuaishou.com/pass/kuaishou/sms/requestMobileCode',
            cookies=cookies,
            headers=headers,
            data=data,
        )
        print(response.text)


def reqCode(phone):
    ks = KS()
    ks.requestMobileCode(phone)
    ks.RqConfig()
    ks.verify()
    ks.guiji()
    ks.go()


def getRet(phone, code):
    import requests

    cookies = {
        'didv': '1735563573866',
        'soft_did': '1619580708547',
        'kwpsecproductname': 'PCLive',
        'did': 'web_d1f9d2425fed55a3789629d0eda6f5fa',
        'kwfv1': 'PnGU+9+Y8008S+nH0U+0mjPf8fP08f+98f+nLlwnrIP9+Sw/ZFGfzY+eGlGf+f+e4SGfbYP0QfGnLFwBLU80mYG9cFP0WU8eWA8040808DPBrMG0bYGAWMwnpjP/QDw/ZE+/mS8fPAGnr98/Z7P/Qj8eqM+9zjPApS+980+/SDP0P=',
        'bUserId': '1000401107552',
        'userId': '3733004330',
    }

    headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-type': 'application/x-www-form-urlencoded',
        # 'Cookie': 'did=web_363b33a47139d99ed8479cb87d4dd4a0; didv=1735563573866',
        'Origin': 'https://passport.kuaishou.com',
        'Pragma': 'no-cache',
        'Referer': 'https://passport.kuaishou.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
        'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }

    data = {
        'countryCode': '+86',
        'phone': str(phone),
        'sid': 'kuaishou.web.cp.api',
        'createId': 'true',
        'smsCode': str(code),
        'setCookie': 'true',
        'channelType': 'PC_PAGE',
        'encryptHeaders': '',
    }

    response = requests.post('https://id.kuaishou.com/pass/kuaishou/login/mobileCode', cookies=cookies, headers=headers,
                             data=data)
    print(response.text)

    cookies_dict = requests.utils.dict_from_cookiejar(response.cookies)

    ALL_COOKIES.update(cookies_dict)

    return response.json()['kuaishou.web.cp.api.at']


def getFullCK(authToken):
    cookies = {
        'didv': '1735563573866',
        'soft_did': '1619580708547',
        'kwpsecproductname': 'PCLive',
        'did': 'web_d1f9d2425fed55a3789629d0eda6f5fa',
        'kwfv1': 'PnGU+9+Y8008S+nH0U+0mjPf8fP08f+98f+nLlwnrIP9+Sw/ZFGfzY+eGlGf+f+e4SGfbYP0QfGnLFwBLU80mYG9cFP0WU8eWA8040808DPBrMG0bYGAWMwnpjP/QDw/ZE+/mS8fPAGnr98/Z7P/Qj8eqM+9zjPApS+980+/SDP0P=',
        'bUserId': '1000401107552',
        'userId': '3733004330',
    }
    headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'https://passport.kuaishou.com/',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-site',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        # 'Cookie': 'didv=1735563573866; soft_did=1619580708547; kwpsecproductname=PCLive; did=web_d1f9d2425fed55a3789629d0eda6f5fa; kwfv1=PnGU+9+Y8008S+nH0U+0mjPf8fP08f+98f+nLlwnrIP9+Sw/ZFGfzY+eGlGf+f+e4SGfbYP0QfGnLFwBLU80mYG9cFP0WU8eWA8040808DPBrMG0bYGAWMwnpjP/QDw/ZE+/mS8fPAGnr98/Z7P/Qj8eqM+9zjPApS+980+/SDP0P=; bUserId=1000401107552; userId=3733004330',
    }

    params = {
        'followUrl': 'https://cp.kuaishou.com/profile',
        'setRootDomain': 'true',
        'sid': 'kuaishou.web.cp.api',
        'authToken': authToken,
    }

    response = requests.get('https://cp.kuaishou.com/rest/infra/sts', params=params, cookies=cookies, headers=headers,
                            allow_redirects=False)
    print(response.text)
    print(response.status_code)
    cookies_dict = requests.utils.dict_from_cookiejar(response.cookies)
    print(cookies_dict)
    ALL_COOKIES.update(cookies_dict)


if __name__ == '__main__':
    input_url = input("请输入url:")
    reqCode(str(input_url))
