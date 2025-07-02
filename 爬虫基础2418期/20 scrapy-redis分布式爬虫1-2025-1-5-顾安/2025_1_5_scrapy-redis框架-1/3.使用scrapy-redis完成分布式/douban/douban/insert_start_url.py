# -*- coding: utf-8 -*-
# @Time    : 2025/1/5 21:59
# @Author  : 顾安
# @File    : insert_start_url.py


import redis

with redis.Redis(host='192.168.18.6', port=6379, db=0) as redis_client:
    redis_client.lpush('top250:start_urls', 'https://movie.douban.com/top250?start=0&filter=')
    print('插入完成...')
