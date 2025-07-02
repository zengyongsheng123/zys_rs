# -*- coding: utf-8 -*-
# @Time    : 2024/12/8 20:53
# @Author  : 顾安
# @File    : 4.芒果tv电影信息爬虫.py


import redis
import pymongo
import hashlib
import requests


class MgTV:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }
        self.api_url = 'https://pianku.api.mgtv.com/rider/list/pcweb/v3'
        self.mongo_client = pymongo.MongoClient()
        self.collection = self.mongo_client['py_spider']['mg_movie_list']
        self.redis_client = redis.Redis()

    def get_movie_info(self, params_dict):
        result_dict = requests.get(self.api_url, params=params_dict, headers=self.headers).json()
        return result_dict

    def parse_movie_info(self, response):
        movie_list = response['data']['hitDocs']
        for movie in movie_list:
            item = dict()
            item['title'] = movie['title']
            item['subtitle'] = movie['subtitle']
            item['story'] = movie['story']
            self.save_movie_info(item)

    @staticmethod
    def get_md5(response):
        # md5方法接收的参数必须是字节, md5方法中的hexdigest返回的是编码之后的md5结果值
        md5_hash = hashlib.md5(str(response).encode('utf-8')).hexdigest()
        return md5_hash

    def save_movie_info(self, item):
        md5_hash = self.get_md5(item)

        # sadd用于在redis中添加元素到集合中, 如果集合中已经存在想同的数据则返回结果为0, 否则返回1
        flag = self.redis_client.sadd('movie:filter', md5_hash)
        # print('redis存储结果状态:', flag)
        if flag:
            try:
                self.collection.insert_one(item)
                print('插入成功:', item)
            except Exception as e:
                print('插入失败:', e)
        else:
            print('数据重复...')

    def close_spider(self):
        self.redis_client.close()
        self.mongo_client.close()
        print('爬虫结束...')

    def main(self):
        for page in range(1, 11):
            params_dict = {
                "allowedRC": "1",
                "platform": "pcweb",
                "channelId": "2",
                "pn": page,
                "pc": "80",
                "hudong": "1",
                "_support": "10000000",
                "kind": "19",
                "area": "10",
                "year": "all",
                "chargeInfo": "a1",
            }

            response = self.get_movie_info(params_dict)
            self.parse_movie_info(response)

        self.close_spider()


if __name__ == '__main__':
    mg = MgTV()
    mg.main()

