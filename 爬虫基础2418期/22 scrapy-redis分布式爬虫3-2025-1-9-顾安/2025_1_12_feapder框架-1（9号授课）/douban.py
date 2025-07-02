# -*- coding: utf-8 -*-
"""
Created on 2025-01-09 21:11:57
---------
@summary:
---------
@author: poppies
"""

import feapder


class Douban(feapder.AirSpider):
    def start_requests(self):
        for page in range(10):
            yield feapder.Request(f"https://movie.douban.com/top250?start={page * 25}&filter=")

    def parse(self, request, response):
        # print("请求地址:", response.request.url)
        # print("请求头:", response.request.headers)
        # print("响应头:", response.headers)
        # print("返回地址:", response.url)
        # print('文本数据:', response.text)
        # print('字节数据:', response.content)

        li_list = response.xpath('//ol[@class="grid_view"]/li/div[@class="item"]')
        for li in li_list:
            item = dict()
            item['title'] = li.xpath('./div[@class="info"]/div/a/span[1]/text()').extract_first()
            item['detail_url'] = li.xpath('./div[@class="info"]/div/a/@href').extract_first()
            item['score'] = li.xpath('.//div[@class="star"]/span[2]/text()').extract_first()
            print('数据信息:', item)


if __name__ == "__main__":
    # 在启动当前脚本之前可以自行配置启动线程数量
    Douban(thread_count=5).start()


"""
AirSpider是最基础的爬虫模板, 当前模板中默认存在两个方法
    start_requests: 用于构建request对象
    parse: 用于接收response对象并完成解析任务
"""
