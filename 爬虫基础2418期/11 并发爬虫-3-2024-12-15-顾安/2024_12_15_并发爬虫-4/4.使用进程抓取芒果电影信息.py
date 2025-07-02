# -*- coding: utf-8 -*-
# @Time    : 2024/12/15 21:09
# @Author  : 顾安
# @File    : 4.使用进程抓取芒果电影信息.py


import redis
import pymongo
import hashlib
import requests
from multiprocessing import Process, JoinableQueue as Queue


class MovieInfo:
    # 进程环境下链接对象需要声明成类属性
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['mg_movie']
    redis_client = redis.Redis()

    def __init__(self):
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        }

        self.url = "https://pianku.api.mgtv.com/rider/list/pcweb/v3"

        self.params_queue = Queue()
        self.json_queue = Queue()
        self.content_queue = Queue()

    def put_params(self):
        for page in range(1, 6):
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
                "sort": "c2",
                "feature": "all"
            }
            self.params_queue.put(params_dict)

    def get_movie_info(self):
        while True:
            params_dict = self.params_queue.get()
            response = requests.get(self.url, headers=self.headers, params=params_dict).json()
            self.json_queue.put(response)
            self.params_queue.task_done()

    def parse_movie_info(self):
        while True:
            response = self.json_queue.get()
            movie_list = response['data']['hitDocs']
            for movie in movie_list:
                item = dict()
                item['title'] = movie['title']
                item['subtitle'] = movie['subtitle']
                item['story'] = movie['story']
                self.content_queue.put(item)
            self.json_queue.task_done()

    @staticmethod
    def get_md5(dict_item):
        md5_hash = hashlib.md5(str(dict_item).encode()).hexdigest()
        return md5_hash

    # 数据保存
    def save_movie_info(self):
        while True:
            item = self.content_queue.get()
            md5_hash = self.get_md5(item)

            redis_result = self.redis_client.sadd('mg_movie:filter', md5_hash)
            if redis_result:
                self.collection.insert_one(item)
                print('数据插入成功:', item)
            else:
                print('数据已存在...')
            self.content_queue.task_done()

    def close_spider(self):
        self.mongo_client.close()
        self.redis_client.close()
        print('爬虫结束...')

    def main(self):
        process_list = list()
        p_put_params = Process(target=self.put_params)
        p_put_params.start()
        p_put_params.join()

        for _ in range(3):
            p_get_movie = Process(target=self.get_movie_info)
            process_list.append(p_get_movie)

        p_parse_movie_info = Process(target=self.parse_movie_info)
        process_list.append(p_parse_movie_info)

        p_save_movie_info = Process(target=self.save_movie_info)
        process_list.append(p_save_movie_info)

        for process_obj in process_list:
            process_obj.daemon = True
            process_obj.start()

        for queue in [self.params_queue, self.json_queue, self.content_queue]:
            queue.join()

        self.close_spider()


if __name__ == '__main__':
    movie_info = MovieInfo()
    movie_info.main()
