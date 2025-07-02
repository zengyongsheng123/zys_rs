# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 21:19
# @Author  : 顾安
# @File    : 7.携带浏览器信息.py


"""
为什么要携带浏览器信息:
    一些网站中在进行请求的过程中需要对发送过来的请求进行验证(cookie, 浏览器信息等).
    如果这些信息校验失败则禁止访问或者返回一个错误的页面
"""

import requests


headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}

response = requests.get('https://www.baidu.com', headers=headers)
print(response.request.headers)
response.encoding = 'utf-8'
print(response.text)

