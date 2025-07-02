# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 20:17
# @Author  : 顾安
# @File    : 2.requests模块的简单使用.py


import requests


# 定义一个访问的地址
url = 'https://www.baidu.com'

# 使用requests模块模拟浏览器发送一个get请求
response = requests.get(url)

# 打印响应对象: 我们需要使用到这个响应对象内部提供到属性和方法
# print(response)

# 响应对象中的方法与属性
print(f'响应状态码: {response.status_code}')
print(f'字节数据: {response.content}')  # 如果页面中文数据乱码或者需要写入静态文件(图片、音频、视频)
print(f'字符串数据: {response.text}')  # 如果页面中文数据是正常的，可以直接使用字符串进行数据获取
print(f'字节数据解码为字符串: {response.content.decode()}')

print('*' * 50)

print(f'网站响应头: {response.headers}')
print(f'网站请求头: {response.request.headers}')
print(f'请求头中的cookie信息: {response.request.headers.get("cookies")}')
print(f'响应头中的cookie信息: {dict(response.cookies)}')  # 默认返回的类型是RequestsCookieJar, 可以使用dict强转
print(f'在响应对象中打印请求网站的地址: {response.url}')
print(f'在请求对象中打印请求的url地址: {response.request.url}')







