# -*- coding: utf-8 -*-
# @Time    : 2024/12/8 21:47
# @Author  : 顾安
# @File    : 2.在协程环境下使用requests模块.py


"""
requests同步爬虫库: 本身不支持协程环境
"""

import asyncio
import requests
from functools import partial
from bs4 import BeautifulSoup

url = 'https://movie.douban.com/top250?start={}&filter='
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}


async def get_movie_info(page_num):
    # 1.将requests模块放入线程池执行
    # partial(偏函数): 函数的参数进行固定并返回一个新函数
    response = await loop.run_in_executor(None, partial(requests.get, url.format(page_num * 25), headers=headers))
    soup = BeautifulSoup(response.text, 'lxml')
    div_list = soup.find_all('div', class_='hd')
    for title in div_list:
        print(title.get_text())



if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    tasks = [loop.create_task(get_movie_info(page)) for page in range(10)]
    loop.run_until_complete(asyncio.wait(tasks))
