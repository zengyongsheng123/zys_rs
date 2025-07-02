# -*- coding: utf-8 -*-
"""
Created on 2025-01-12 21:54:15
---------
@summary:
---------
@author: poppies
"""

import feapder
from feapder.utils.webdriver import WebDriver


class FeapderXhrRender(feapder.AirSpider):
    def start_requests(self):
        yield feapder.Request("https://spidertools.cn", render=True)

    def parse(self, request, response):
        browser: WebDriver = response.browser


        xhr_response = browser.xhr_response('/ad')
        # print('xhr响应对象:', xhr_response)

        print('请求接口:', xhr_response.request.url)
        print('请求头:', xhr_response.request.headers)  # 请求头信息是不完整的
        print('请求体:', xhr_response.request.data)
        print('响应头:', xhr_response.headers)
        print('返回地址:', xhr_response.url)
        print('返回内容:', xhr_response.content)


if __name__ == "__main__":
    FeapderXhrRender().start()
