# -*- coding: utf-8 -*-
# @Time    : 2024/12/24 20:09
# @Author  : 顾安
# @File    : 1.回顾 - 小红书首页api数据获取.py

import time
import random
from DrissionPage import ChromiumPage

page = ChromiumPage()
page.listen.start('api/sns/web/v1/homefeed')
page.get("https://www.xiaohongshu.com/explore")

while True:
    js_code = f"document.documentElement.scrollTop = document.documentElement.scrollHeight * {1000}"
    page.run_js(js_code)

    # for item in page.listen.steps():
    #     print(item.response.body)  # 如果没有监听到api会堵塞主线程

    is_api_list = page.listen.wait(count=5, timeout=1)
    print('数据状态:', is_api_list)
    if is_api_list:
        for item in is_api_list:
            print(item.response.body)




