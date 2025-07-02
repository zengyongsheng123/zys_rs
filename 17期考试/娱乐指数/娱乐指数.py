import hashlib

import execjs
import pymongo
import requests
import json


class YLE():
    def __init__(self):
        self.url = 'https://www.chinaindex.net/iIndexMobileServer/teleplay/rank/waiting/fans'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        }
        self.cookies = {
            "Hm_lvt_2873e2b0bdd5404c734992cd3ae7253f": "1731676984",
            "HMACCOUNT": "63CA3A46E3E95D07",
            "mobile_iindex_uuid": "2fd72eed-11a2-5a12-a8e0-3dad100ef70f",
            "Hm_lpvt_2873e2b0bdd5404c734992cd3ae7253f": "1731679025"
        }
        self.client = pymongo.MongoClient()
        self.db = self.client["yule"]
        self.collection = self.db["yule"]

        md5 = hashlib.md5()
        md5.update("iIndex".encode())
        self.params = {
            "sign": md5.hexdigest(),
        }

        with open("./娱乐指数.js", 'r') as f:
            code = f.read()
            js = execjs.compile(code)
            self.js = js

    def request_data(self):
        response = requests.get(self.url, headers=self.headers, cookies=self.cookies, params=self.params)
        print("请求成功", response.json())
        return response.json()

    def parse_data(self, resp):
        data = resp['data']
        lastFetchTime = resp['lastFetchTime']
        result = self.js.call("decrypt", data, lastFetchTime)
        print("解密完成", result)
        data_list = []
        for item in json.loads(result)["rank_list"]:
            data_list.append(item["object_info"])
        return data_list

    def save_data(self, result):
        self.collection.insert_many(result)
        print("保存成功")

    def start(self):
        resp = self.request_data()
        result = self.parse_data(resp)
        self.save_data(result)


if __name__ == '__main__':
    yle = YLE()
    yle.start()
