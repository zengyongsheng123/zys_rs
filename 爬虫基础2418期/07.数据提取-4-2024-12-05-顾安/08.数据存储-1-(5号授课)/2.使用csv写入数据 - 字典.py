# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 20:55
# @Author  : 顾安
# @File    : 2.使用csv写入数据 - 字典.py


import csv

rows = [
    {
        "class_name": "18级Python",
        "name": '小王',
        "gender": '男',
        "phone": '13146060xx1',
        "qq": '123456xx1'
    },
    {
        "class_name": "18级Python",
        "name": '小李',
        "gender": '男',
        "phone": '13146060xx2',
        "qq": '123456xx2'
    },
    {
        "class_name": "19级Python",
        "name": '小赵',
        "gender": '女',
        "phone": '13146060xx3',
        "qq": '123456xx3'
    },
    {
        "class_name": "19级Python",
        "name": '小红',
        "gender": '女',
        "phone": '13146060xx4',
        "qq": '123456xx4'
    },
]

# 字典写入csv设置的表头必须和字典中的key保持一致
headers = list(rows[0].keys())

# windows在进行写入的时候会出现多余的空单元格: newline=''
# office excel软件的编码方式是gbk
with open('stu_info_2.csv', 'w', newline='', encoding='utf-8') as f:
    # 创建csv文件写入对象
    f_csv = csv.DictWriter(f, headers)

    # 将表头写入到文件中
    f_csv.writeheader()

    # 写入数据
    f_csv.writerows(rows)
