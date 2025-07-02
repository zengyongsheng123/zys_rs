# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 22:05
# @Author  : 顾安
# @File    : 10.代理.py


"""
当前演示的代码是基于本地代理: clash
"""

import requests


headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
}

ip = '127.0.0.1'
port = 7890

proxies = {
    'http': f'http://{ip}:{port}',
    'https': f'http://{ip}:{port}'
}

url = 'http://httpbin.org/ip'

response = requests.get(url, headers=headers, proxies=proxies)
print(response.json())
