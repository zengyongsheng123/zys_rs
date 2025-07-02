# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 20:08
# @Author  : 顾安
# @File    : 1.页面的编码问题.py


# import requests


# url = 'https://www.baidu.com'
# response = requests.get(url).text
# response = requests.get(url).content  # 返回的是字节数据, 需要使用解码的方式转为字符串
# print(response.decode('utf-8'))


str_data = 'abc'

# 将字符串转为字节
# encode: 编码，将字符串编码成字节
bytes_data = str_data.encode('utf-8')
print(bytes_data)

# 将字节转为字符串
print(bytes_data.decode('utf-8'))
