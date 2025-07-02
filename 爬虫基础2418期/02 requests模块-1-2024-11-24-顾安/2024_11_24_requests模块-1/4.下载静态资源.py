# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 20:44
# @Author  : 顾安
# @File    : 4.下载静态资源.py


import requests

url = 'https://img1.baidu.com/it/u=1494974577,3964476210&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=889'
response = requests.get(url)

# 1.获取图片本身的二进制数据
image_content = response.content

# 2.使用open函数写入二进制图片数据
with open('jk.png', 'wb') as f:
    f.write(image_content)

