# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 21:12
# @Author  : 顾安
# @File    : 4.读取csv文件 - 字典.py

import csv

with open('stu_info_2.csv') as f:
    # 创建csv的读取对象
    f_csv = csv.DictReader(f)

    for row in f_csv:
        print(row)
