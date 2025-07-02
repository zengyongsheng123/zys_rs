# -*- coding: utf-8 -*-
# @Time    : 2024/12/8 20:33
# @Author  : 顾安
# @File    : 3.爱奇艺电影信息爬虫.py


import pymongo
import requests


class AiQiYi:
    def __init__(self):
        self.client = pymongo.MongoClient(host='localhost', port=27017)
        self.db = self.client['py_spider']['aqy_movie_list']

        self.api_url = 'https://pcw-api.iqiyi.com/search/recommend/list'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
        }

    def get_movie_info(self, params_attr):
        result_json = requests.get(self.api_url, headers=self.headers, params=params_attr).json()
        return result_json

    def parse_movie_info(self, response):
        """
        :param response: 将get_movie_info方法返回的结果传递到parse_movie_info完成解析
        :return:
        """
        movie_list = response['data']['list']
        for movie in movie_list:
            item = dict()
            item['title'] = movie['title']
            item['playUrl'] = movie['playUrl']
            item['description'] = movie['description']
            self.save_movie_info(item)

    def save_movie_info(self, item):
        try:
            self.db.insert_one(item)
            print('数据插入成功:', item)
        except Exception as e:
            print('保存失败:', e)

    def close_spider(self):
        self.client.close()
        print('爬虫已关闭...')


    def main(self):
        for page_num in range(1, 11):
            params_dict = {
                "channel_id": "2",
                "data_type": "1",
                "mode": "11",
                "page_id": page_num,
                "ret_num": "48",
                "session": "e64d984f625ec16b91024489440a4908",
                "three_category_id": "15;must"
            }

            info = self.get_movie_info(params_dict)
            self.parse_movie_info(info)

        self.close_spider()



if __name__ == '__main__':
    aqy = AiQiYi()
    aqy.main()
