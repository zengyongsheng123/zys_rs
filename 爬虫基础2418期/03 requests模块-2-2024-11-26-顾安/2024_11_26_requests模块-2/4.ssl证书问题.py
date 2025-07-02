# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:46
# @Author  : 顾安
# @File    : 4.ssl证书问题.py


import requests

url = "https://chinasoftinc.com/owa"

# verify: 忽略证书
# 如果控制台抛出ssl错误, 大概率是证书问题
response = requests.get(url, verify=False)
print(response.text)
