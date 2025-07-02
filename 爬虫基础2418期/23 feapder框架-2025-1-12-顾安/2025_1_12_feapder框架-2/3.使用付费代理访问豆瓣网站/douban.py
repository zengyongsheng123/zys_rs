# -*- coding: utf-8 -*-
"""
Created on 2025-01-12 20:10:04
---------
@summary:
---------
@author: poppies
"""

import feapder
from douban_feapder_item import DoubanFeapderItem


class Douban(feapder.AirSpider):
    def download_midware(self, request):
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

        # 修改相关参数之后记得返回request对象
        return request

    # 创建请求对象
    def start_requests(self):
        for page in range(10):
            yield feapder.Request(f"https://movie.douban.com/top250?start={page * 25}&filter=")

    # 解析数据
    def parse(self, request, response):
        li_list = response.xpath('//ol[@class="grid_view"]/li/div[@class="item"]')
        for li in li_list:
            # 创建item对象后支持数据自动入库
            item = DoubanFeapderItem()

            item['title'] = li.xpath('./div[@class="info"]/div/a/span[1]/text()').extract_first()
            item['detail_url'] = li.xpath('./div[@class="info"]/div/a/@href').extract_first()
            item['score'] = li.xpath('.//div[@class="star"]/span[2]/text()').extract_first()
            # print('数据信息:', item)

            yield feapder.Request(item['detail_url'], callback=self.parse_detail, item=item)

    # 自定义解析方法
    def parse_detail(self, request, response):
        if response.xpath('//div[@class="indent"]/span[@class="all hidden"]//text()'):
            request.item['detail_text'] = response.xpath(
                '//div[@class="indent"]/span[@class="all hidden"]//text()').extract_first().strip()
        else:
            request.item['detail_text'] = response.xpath(
                '//div[@class="indent"]/span[1]//text()').extract_first().strip()

        # print('数据信息:', request.item)

        # 自定入库
        yield request.item


if __name__ == "__main__":
    Douban().start()

"""
1.通过命令创建setting文件
2.创建py脚本用于创建数据库
3.根据数据库名称创建items文件
4.将items文件生成的item类导入到spider文件中并实例化
5.yield返回数据保存到数据库中
"""
