# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:36
# @Author  : 顾安
# @File    : 3.重定向与历史请求.py


import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}

url = 'https://www.360buy.com'

# allow_redirects: 如果为False禁止重定向
# response = requests.get(url, headers=headers, allow_redirects=False)

response = requests.get(url, headers=headers)

# 打印历史请求
print(response.history)

for resp in response.history:
    print(resp.url, resp.status_code, resp.request.headers)
