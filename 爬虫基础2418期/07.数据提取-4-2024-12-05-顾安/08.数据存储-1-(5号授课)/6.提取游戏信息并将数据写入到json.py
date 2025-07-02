# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 21:36
# @Author  : 顾安
# @File    : 6.提取游戏信息并将数据写入到json.py


import json
import requests
from lxml import etree


url = 'https://www.4399.com/flash/'
response = requests.get(url).content.decode('gbk')

tree = etree.HTML(response)
a_list = tree.xpath('//ul[@class="n-game cf"]/li/a')

game_list = list()

for a_element in a_list:
    item = dict()
    item['game_name'] = a_element.xpath("./b/text()")[0]
    item['game_url'] = a_element.xpath("./@href")[0]
    game_list.append(item)


with open('game_list.json', 'w', encoding='utf-8') as f:
    # python对象无法写入
    # ensure_ascii: 主要让中文写入到文件
    f.write(json.dumps(game_list, indent=4, ensure_ascii=False))

