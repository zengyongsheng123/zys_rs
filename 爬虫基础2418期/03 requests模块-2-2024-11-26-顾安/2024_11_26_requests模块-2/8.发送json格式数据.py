# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 21:18
# @Author  : 顾安
# @File    : 8.发送json格式数据.py

import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
}

url = 'https://hr.163.com/api/hr163/position/queryPage'
json_data = {"currentPage": 1, "pageSize": 10, "workType": "0"}

# api中的载荷信息发现提交的内容不是表单而是json则需要使用requests.post中的json参数进行提交
response = requests.post(url, headers=headers, json=json_data)
print(response.json())
