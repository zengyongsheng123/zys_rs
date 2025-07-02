# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 20:41
# @Author  : 顾安
# @File    : 3.页面数据的获取方式.py


import requests

url = 'https://www.baidu.com'
response = requests.get(url)
# print(response.content.decode())

# 手动设置解码规则
response.encoding = 'utf-8'
print(response.text)
