# -*- coding: utf-8 -*-
# @Time    : 2024/12/31 21:17
# @Author  : 顾安
# @File    : my_extend.py

import time
import threading

import requests
from scrapy import signals

# 提取代理IP的api
api_url = 'https://dps.kdlapi.com/api/getdps/?secret_id=orsnof8y6rxqtgnf2v33&signature=zugc8en4ct195aoish9iwma4dnvgeya5&num=1&pt=1&format=json&sep=1'
foo = True


class Proxy:
    def __init__(self, ):
        self._proxy_list = requests.get(api_url).json().get('data').get('proxy_list')

    @property
    def proxy_list(self):
        return self._proxy_list

    @proxy_list.setter
    def proxy_list(self, list):
        self._proxy_list = list


pro = Proxy()
print(pro.proxy_list)


class MyExtend:

    def __init__(self, crawler):
        self.crawler = crawler
        # 将自定义方法绑定到scrapy信号上,使程序与spider引擎同步启动与关闭
        # scrapy信号文档: https://www.osgeo.cn/scrapy/topics/signals.html
        # scrapy自定义拓展文档: https://www.osgeo.cn/scrapy/topics/extensions.html
        crawler.signals.connect(self.start, signals.engine_started)
        crawler.signals.connect(self.close, signals.spider_closed)

    @classmethod
    def from_crawler(cls, crawler):
        return cls(crawler)

    def start(self):
        t = threading.Thread(target=self.extract_proxy)
        t.start()

    @staticmethod
    def extract_proxy():
        while foo:
            pro.proxy_list = requests.get(api_url).json().get('data').get('proxy_list')
            # 设置每15秒提取一次ip
            time.sleep(15)

    @staticmethod
    def close():
        global foo
        foo = False
