# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 21:56
# @Author  : 顾安
# @File    : 10.序列化与反序列化.py


import json


dict_data = {
    'name': '安娜'
}

# dumps: 将字典数据转换为字符串
str_data = json.dumps(dict_data, ensure_ascii=False)
print(type(str_data))
print(str_data)

# loads: 将json格式的字符串转字典
print(type(json.loads(str_data)))
print(json.loads(str_data))

