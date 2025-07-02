# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:58
# @Author  : 顾安
# @File    : 7.请求重试.py


import requests
from retrying import retry

num = 1

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
}

get_url = 'https://www.360buy.com'


@retry(stop_max_attempt_number=3)
def get_html_info(url):
    global num
    print(f'第{num}次请求...')
    num += 1
    response = requests.get(url, headers=headers, timeout=3)
    for resp in response.history:

        # 断言: 如果响应状态码不是200, 则抛出异常
        assert resp.status_code == 200
    print(response)


try:
    get_html_info(get_url)
except Exception as e:
    print('程序异常:', e)
