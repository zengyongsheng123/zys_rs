# -*- coding: utf-8 -*-
# @Time    : 2024/12/12 20:28
# @Author  : 顾安
# @File    : 3.使用线程池的方式获取豆瓣电影信息.py


import requests
from lxml import etree
from concurrent.futures import ThreadPoolExecutor, as_completed

url = 'https://movie.douban.com/top250?start={}&filter='
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}


def get_movie_info(page_num):
    response = requests.get(url.format(page_num * 25), headers=headers).text
    tree = etree.HTML(response)
    result = tree.xpath("//div[@class='hd']/a/span[1]/text()")
    # print(result)
    return result


if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=5) as pool:
        futures = [pool.submit(get_movie_info, page) for page in range(10)]
        # for future in futures:
        #     print(future.result())  # result会堵塞主线程

        # 任务完成后直接返回而不是跟随任务上传顺序
        for future in as_completed(futures):
            print(future.result())

"""
1.创建线程池对象
2.如何获取线程绑定任务的返回值: result()
3.result方法会堵塞主线程则使用as_completed返回future列表的迭代器并返回
"""
