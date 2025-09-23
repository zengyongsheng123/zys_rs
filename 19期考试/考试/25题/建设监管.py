import csv
import hashlib

import ddddocr
import redis
import requests
import json
import execjs
import base64


class JsJg(object):
    def __init__(self):
        with open('建设监管.js', 'r', encoding='utf-8') as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)
        self.headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/json;charset=UTF-8",
            "Origin": "https://www.ynjzjgcx.com",
            "Pragma": "no-cache",
            "Referer": "https://www.ynjzjgcx.com/dataPub/enterprise",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "appId": "84ded2cd478642b2",
            "isToken": "false",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.requests = requests.Session()
        self.genVcode_url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/vcode/genVcode"
        self.find_url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/dataServ/findBaseEntDpPage"
        self.redis_client = redis.Redis()

    def one_data(self):
        params = self.js.call('get_img_params')
        data = {
            "params": params
        }
        data = json.dumps(data, separators=(',', ':'))

        res = requests.post(self.genVcode_url, headers=self.headers, data=data).json()
        data = json.loads(res['data'])
        return data

    def dec_bs4(self, img, name):
        content = base64.b64decode(img)
        with open(f'{name}.jpg', 'wb') as f:
            f.write(content)

    def verify(self, slide_image, background_image):
        url = "http://api.jfbym.com/api/YmServer/customApi"
        data = {
            ## 关于参数,一般来说有3个;不同类型id可能有不同的参数个数和参数名,找客服获取
            "token": "DPX_geifZ3xG7enywVO8vvVxIO1FRRQ481KjStioFQs",
            "type": "20111",
            "slide_image": slide_image,
            "background_image": background_image,
        }
        _headers = {
            "Content-Type": "application/json"
        }
        response = requests.request("POST", url, headers=_headers, json=data).json()
        return response['data']['data']
    def find_data(self, params):
        data = {
            "params": params
        }
        data = json.dumps(data, separators=(',', ':'))
        res = self.requests.post(self.find_url, headers=self.headers, data=data).json()
        return res
    def parse_data(self, data,f_csv):
        for i in data['data']['records']:
            name=i['name']
            creditCode=i['creditCode']
            address=i['address']
            value = self.get_md5(name)
            result = self.redis_client.sadd('jsjt:filter', value)
            if result:
                self.save_data([name,creditCode,address], f_csv)
                print(f'{name}写入完成')
            else:
                print('数据重复...')
    def get_md5(self, value):
        md5_hash = hashlib.md5(str(value).encode('utf-8')).hexdigest()
        return md5_hash
    def save_data(self, data,f_csv):
        f_csv.writerow(data)
    def main(self):
        with open('建设监管.csv', 'a', encoding='utf-8', newline='') as f:
            headers = ['企业名称', '信用代码', '企业注册地']
            f_csv = csv.writer(f)
            f_csv.writerow(headers)
            for i in range(1,11):
                while(1):
                    data = self.one_data()
                    smallImage = data['smallImage']
                    bigImage = data['bigImage']
                    yHeight = data['yHeight']
                    slideId = data['slideId']
                    self.dec_bs4(smallImage, 'smallImage')
                    self.dec_bs4(bigImage, 'bigImage')
                    x = self.verify(smallImage,bigImage)
                    params = self.js.call('get_find_params', i, x, slideId)
                    find_data = self.find_data(params)
                    # print(find_data['code'])
                    if find_data['code']==200:
                        self.parse_data(find_data,f_csv)
                        # print(find_data)
                        break


if __name__ == '__main__':
    jg = JsJg()
    jg.main()
