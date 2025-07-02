# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 20:48
# @Author  : 顾安
# @File    : 1.使用csv写入数据 - 列表.py


import csv


headers = ['班级', '姓名', '性别', '手机号', 'QQ']

rows = [
    ["18级Python", '小王', '男', '13146060xx1', '123456xx1'],
    ["18级Python", '小李', '男', '13146060xx2', '123456xx2'],
    ["19级Python", '小赵', '女', '13146060xx3', '123456xx3'],
    ["19级Python", '小红', '女', '13146060xx4', '123456xx4']
]


with open('stu_info_1.csv', 'w', encoding='utf-8') as f:
    # 1.创建csv文件写入对象
    f_csv = csv.writer(f)

    # 2.使用csv对象写入表头
    f_csv.writerow(headers)

    # 3.使用csv对象写入数据
    f_csv.writerows(rows)
