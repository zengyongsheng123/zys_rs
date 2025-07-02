# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 21:37
# @Author  : 顾安
# @File    : 9.session会话.py


"""
在requests.get/requests.post普通请求之后得到响应则会立马释放与网站的链接资源
    如果要重新请求则需要重新构造请求参数

    第一次请求网站之后会在响应头设置一个cookie信息, 当第二次请求则直接使用响应头中的cookie信息如何实现
"""

import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
}

# 创建session对象
session = requests.Session()

url_1 = 'https://www.baidu.com'
response = session.get(url_1, headers=headers)
print('第一次请求成功之后的请求头信息:', response.request.headers)
print('第一次请求成功之后的响应头信息:', response.headers)

# print('获取set-cookie:', response.cookies)

# 将获取到的set-cookie字典拼接成一段字符串作为请求头Cookie的value值
cookies_str = "; ".join([f"{key}={value}" for key, value in dict(response.cookies).items()])
headers['Cookie'] = cookies_str

print('这是设置后的请求头信息:', response.request.headers)

url_2 = 'https://www.baidu.com/'

# 第二次请求没有携带headers的情况, 则UA信息是默认信息
response = session.get(url_2)
print('第二次请求成功之后的请求头信息:', response.request.headers)



