# -*- coding: utf-8 -*-
# @Time    : 2024/12/8 20:19
# @Author  : 顾安
# @File    : 2.mongodb的操作回顾.py


import pymongo


mongo_client = pymongo.MongoClient()
collection = mongo_client['py_spider']['stu_info']


# stu_1 = {'name': '安娜', 'age': 18, 'gender': '女'}
# res = collection.insert_one(stu_1)
# print(res)

stu_list = [
    {'name': '双双', 'age': 19, 'gender': '女'},
    {'name': '夏洛', 'age': 20, 'gender': '男'},
    {'name': '小明', 'age': 21, 'gender': '男'}
]

res = collection.insert_many(stu_list)
print(res)
