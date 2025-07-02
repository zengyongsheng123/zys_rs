# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:48
# @Author  : 顾安
# @File    : 5.请求超时.py


import requests

try:
    url = 'https://www.google.com'
    response = requests.get(url, timeout=3)
    print(response.text)
except Exception as e:
    print('链接超时:', e)
