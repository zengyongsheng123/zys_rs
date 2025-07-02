# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 21:25
# @Author  : 顾安
# @File    : 8.查询字符串.py


import requests

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}

# 直接将你要查询的信息关键字写入在url中
# url = 'https://www.baidu.com/s?wd=jk'
# response = requests.get(url, headers=headers)
# print(response.content.decode())


# 使用params参数
params_dict = {
    'wd': 'golang'
}

# 如果使用params参数，那么url中就不需要携带查询字符串了以及问号
url = 'https://www.baidu.com/s'
response = requests.get(url, headers=headers, params=params_dict)
print(response.content.decode())
print(response.url)
