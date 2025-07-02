import requests

import json


class JianZhu():

    def __init__(self):
        self.url = "https://jzsc.mohurd.gov.cn/APi/webApi/dataservice/query/comp/list?pg={}&pgsz=15&total=0"
        self.headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://jzsc.mohurd.gov.cn/data/company",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
            "accessToken;": "",
            "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "timeout": "30000",
            "v": "231012"
        }
        self.cookies = {
            "Hm_lvt_b1b4b9ea61b6f1627192160766a9c55c": "1727611270,1729236908,1729254589",
            "HMACCOUNT": "EF4E9D2D87A7D1A4",
            "Hm_lpvt_b1b4b9ea61b6f1627192160766a9c55c": "1729254807"
        }

    def get_data(self, page):
        res = requests.get(self.url.format(page), headers=self.headers)
        return res.text

    def parse_data(self, data1):
        data = {
            'group': 'jzsc',
            'action': 'decr_data',
            'baichuandata': data1
        }
        res = requests.post('http://127.0.0.1:5620/business-demo/invoke', data=data)
        if res.json().get('data'):
            print('获取成功')
        else:
            print('获取失败 ')

    def main(self):
        for i in range(1, 30):
            res = self.get_data(i)
            self.parse_data(res)

if __name__ == '__main__':
    js = JianZhu()
    js.main()
