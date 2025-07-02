# -*- coding: utf-8 -*-
# @Time    : 2024/12/1 20:07
# @Author  : 顾安
# @File    : 1.xpath案例练习.py


import requests
from lxml import etree


url = 'https://movie.douban.com/subject/1292052/'

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

response = requests.get(url, headers=headers).text

tree = etree.HTML(response)

# 如果在浏览器元素中找到的标签class属性与页面源代码不一致, 直接使用源代码中的属性值
content_list = tree.xpath("//div[@class='review-list  ']//div[@class='short-content']/text()")
print(content_list)
