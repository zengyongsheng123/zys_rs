# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:51
# @Author  : 顾安
# @File    : 6.retrying模块的简单使用.py


import time
from retrying import retry

num = 1


@retry(stop_max_attempt_number=3)
def work():
    global num
    print(f'num = {num}')
    num += 1
    time.sleep(1)

    # 模拟请求失败
    for i in num:
        print(i)


try:
    work()
except Exception as e:
    print('代码异常:', e)

