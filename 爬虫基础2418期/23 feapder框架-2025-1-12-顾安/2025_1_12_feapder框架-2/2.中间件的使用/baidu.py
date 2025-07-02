# -*- coding: utf-8 -*-
"""
Created on 2025-01-12 21:11:02
---------
@summary:
---------
@author: poppies
"""

import feapder


class Baidu(feapder.AirSpider):
    def download_midware(self, request):
        request.headers = {
            'User-Agent': 'abc'
        }

        # 修改相关参数之后记得返回request对象
        return request

    # 自定义中间件
    def custom_download_midware(self, request):
        # 提取代理API接口，获取1个代理IP
        api_url = "https://dps.kdlapi.com/api/getdps/?secret_id=orsnof8y6rxqtgnf2v33&signature=zugc8en4ct195aoish9iwma4dnvgeya5&num=1&pt=1&format=text&sep=1"
        proxy_ip = feapder.Request(api_url).get_response().text

        # 用户名密码认证(私密代理/独享代理)
        username = "d2119504442"
        password = "4zcxgwca"
        proxies = {
            "http": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": proxy_ip},
            "https": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": proxy_ip}
        }

        request.proxies = proxies
        return request

    def start_requests(self):
        yield feapder.Request("https://www.baidu.com",
                              download_midware=[self.download_midware, self.custom_download_midware])

    def parse(self, request, response):
        pass


if __name__ == "__main__":
    Baidu().start()



"""
1.可以直接在spider类中重写download_midware方法定义中间件
2.可以自定义中间件, 并在Request对象中使用download_midware参数传递自定义中间件类的内存地址使用
3.download_midware参数可以传递一个列表, 列表中的元素是多个中间件类地址
"""