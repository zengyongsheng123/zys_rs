# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 20:50
# @Author  : 顾安
# @File    : 5.使用生成器下载静态资源.py


"""
在资源下载的过程中, 某些二进制资源体积较大, 如果一次性将这个文件的所有数据载入内存可能会导致内存爆掉
"""

import requests

url = 'https://img1.baidu.com/it/u=1494974577,3964476210&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=889'

# 使用字节流的方式获取资源
response = requests.get(url, stream=True)

with open('jk.png', 'wb') as f:
    for chunk in response.iter_content(chunk_size=1024):
        f.write(chunk)



