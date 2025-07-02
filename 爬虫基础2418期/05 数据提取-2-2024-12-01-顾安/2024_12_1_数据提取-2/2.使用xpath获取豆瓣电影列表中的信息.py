# -*- coding: utf-8 -*-
# @Time    : 2024/12/1 20:21
# @Author  : 顾安
# @File    : 2.使用xpath获取豆瓣电影列表中的信息.py


import requests
from lxml import etree


url = 'https://movie.douban.com/top250'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

response = requests.get(url, headers=headers).text
tree = etree.HTML(response)


# image_url_list = tree.xpath('//ol/li//div[@class="pic"]/a/img/@src')
# title_list = tree.xpath('//ol/li//div[@class="hd"]//span[@class="title"][1]/text()')

# for title, image_url in zip(title_list, image_url_list):
#     movie_info = dict()
#     movie_info['title'] = title
#     movie_info['image_url'] = image_url
#     print(movie_info)


title_1 = tree.xpath('//ol/li[last()]//div[@class="hd"]//span[@class="title"][1]/text()')
# print(title_1)

title_2 = tree.xpath('//ol/li[last() - 1]//div[@class="hd"]//span[@class="title"][1]/text()')
# print(title_2)


title_3_list = tree.xpath('//ol/li[position() > 1]//div[@class="hd"]//span[@class="title"][1]/text()')
# print(title_3_list)

title_4_list = tree.xpath('//ol/li[position() > 1 and position() < 6]//div[@class="hd"]//span[@class="title"][1]/text()')
print(title_4_list)


title_5 = tree.xpath('//ol/li//div[@class="hd"]//span[text()="肖申克的救赎"]')[0]
print(title_5.xpath('./text()'))


