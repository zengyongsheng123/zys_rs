import base64
import ddddocr
import requests
import json
import execjs

Headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://www.ynjzjgcx.com",
    "Pragma": "no-cache",
    "Referer": "https://www.ynjzjgcx.com/dataPub/enterprise",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "appId": "84ded2cd478642b2",
    "isToken": "false",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}


class CaptchaHandler:
    def __init__(self):
        self.js = open('./1.js', 'r').read()
        self.js_code = execjs.compile(self.js)
        self.headers = Headers

    @staticmethod
    def save_image(base64_str, filename):
        image_data = base64.b64decode(base64_str)
        with open('./' + filename, 'wb') as f:
            f.write(image_data)

    def get_captcha_data(self):
        url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/vcode/genVcode"
        data = {"params": self.js_code.call("getParms")}
        response = requests.post(url, headers=self.headers, data=json.dumps(data, separators=(',', ':')))
        da = json.loads(response.json().get('data'))
        slideId = da.get('slideId')
        self.save_image(da.get('smallImage'), 'smallImage.png')
        self.save_image(da.get('bigImage'), 'bigImage.png')
        # Use ddddocr for slide matching
        det = ddddocr.DdddOcr(det=False, ocr=False)
        with open('./smallImage.png', 'rb') as f:
            target_bytes = f.read()
        with open('./bigImage.png', 'rb') as f:
            background_bytes = f.read()

        res = det.slide_match(target_bytes, background_bytes, simple_target=True)
        slide_width = res.get("target")[0]
        print("识别验证码参数", slideId, slide_width)
        return slideId, slide_width


class DataFetcher:
    def __init__(self):
        self.js = open('./1.js', 'r').read()
        self.js_code = execjs.compile(self.js)
        self.headers = Headers

    def fetch(self, page_num):
        url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/dataServ/findBaseEntDpPage"
        slide_id, width = CaptchaHandler().get_captcha_data()
        for page_num in range(1, page_num + 1):
            params = {
                "pageNum": page_num,
                "pageSize": 10,
                "certificateType": "01",
                "name": "",
                "slideId": slide_id,
                "key": "query",
                "width": width
            }
            data = {
                "params": self.js_code.call("get_parms", params)
            }
            data = json.dumps(data, separators=(',', ':'))
            response = requests.post(url, headers=self.headers, data=data)

            print(response.text)
            print(response)
            return response.text

    def parse_data(self):
        response = self.fetch(10)
        if response.get("code") != 200:
            return []
        response_data = response.get("data").get("records")
        data_list = []
        for item in response_data:
            data_list.append({
                "name": item.get("name"),
                "creditCode": item.get("creditCode"),
                "address": item.get("address")
            })
        print(data_list)
        return data_list


if __name__ == '__main__':
    bb = DataFetcher()
    bb.parse_data()
