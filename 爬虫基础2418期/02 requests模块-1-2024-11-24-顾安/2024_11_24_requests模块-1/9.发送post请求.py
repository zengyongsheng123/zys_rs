# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 21:47
# @Author  : 顾安
# @File    : 9.发送post请求.py


import requests

url = 'http://www.cninfo.com.cn/new/disclosure'
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}

form_data = {
    'column': 'szse_latest',
    'pageNum': 1,
    'pageSize': 30,
    'sortName': '',
    'sortType': '',
    'clusterFlag': 'true'
}


# data参数: 专门用于传递表单数据
response = requests.post(url, headers=headers, data=form_data)

# api返回的数据是json数据, 则可以将json序列化为字典数据
print(response.json())
print(type(response.json()))

