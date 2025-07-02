# -*- coding: utf-8 -*-
# @Time    : 2024/12/12 21:11
# @Author  : 顾安
# @File    : 5.使用多线程获取爱奇艺电影信息.py


import pymongo
import requests
import threading
from queue import Queue


class AiQiYi:
    def __init__(self):
        self.mongo_client = pymongo.MongoClient()
        self.collection = self.mongo_client['py_spider']['thread_aqy_movie']

        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }

        self.api_url = 'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=2&data_type=1&mode=11&page_id={}&ret_num=48&session=85dd981b69cead4b60f6d980438a5664&three_category_id=15;must'

        self.url_queue = Queue()
        self.json_queue = Queue()
        self.content_dict_queue = Queue()

    def get_url(self):
        for page in range(1, 6):
            self.url_queue.put(self.api_url.format(page))

    def get_api_json(self):
        while True:
            url = self.url_queue.get()
            response = requests.get(url, headers=self.headers).json()
            self.json_queue.put(response)

            # 获取一个请求地址要让队列计数器 -1
            self.url_queue.task_done()

    def parse_movie_info(self):
        while True:
            json_info = self.json_queue.get()
            category_movies = json_info['data']['list']
            for movie in category_movies:
                item = dict()
                item['title'] = movie['title']
                item['playUrl'] = movie['playUrl']
                item['description'] = movie['description']
                self.content_dict_queue.put(item)

            self.json_queue.task_done()

    def save_movie_info(self):
        while True:
            item = self.content_dict_queue.get()
            self.collection.insert_one(item)
            print('保存成功:', item)
            self.content_dict_queue.task_done()

    def main(self):
        thread_list = list()
        # 主线程执行的任务无需等待, 因为主线程必须要把任务执行完毕之后才能执行之下的代码
        self.get_url()

        for _ in range(3):
            t_get_json = threading.Thread(target=self.get_api_json)
            thread_list.append(t_get_json)

        for _ in range(3):
            t_parse_movie = threading.Thread(target=self.parse_movie_info)
            thread_list.append(t_parse_movie)

        t_save_info = threading.Thread(target=self.save_movie_info)
        thread_list.append(t_save_info)

        for thread_obj in thread_list:
            thread_obj.daemon = True
            thread_obj.start()

        for q in [self.url_queue, self.json_queue, self.content_dict_queue]:
            q.join()

        self.mongo_client.close()
        print('爬虫任务执行完毕...')


if __name__ == '__main__':
    aqy = AiQiYi()
    aqy.main()
