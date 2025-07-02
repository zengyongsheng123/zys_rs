# -*- coding: utf-8 -*-
"""
Created on 2025-01-12 21:32:57
---------
@summary:
---------
@author: poppies
"""

import feapder
from feapder import Request, Response


class Baidu(feapder.AirSpider):
    def start_requests(self):
        yield feapder.Request("https://www.baidu.com")

    def parse(self, request, response):
        pass

    def validate(self, request: Request, response: Response):
        if response.status_code != 200:
            raise Exception("请求失败")



if __name__ == "__main__":
    Baidu().start()
