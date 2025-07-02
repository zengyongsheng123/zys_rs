# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 21:10
# @Author  : 顾安
# @File    : 3.读取csv文件 - 列表.py



import csv


with open('stu_info_1.csv') as f:
    # 创建csv的读取对象
    f_csv = csv.reader(f)

    for row in f_csv:
        print(row)


