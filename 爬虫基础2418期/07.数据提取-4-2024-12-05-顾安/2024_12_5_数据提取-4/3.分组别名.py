# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 20:21
# @Author  : 顾安
# @File    : 3.分组别名.py

import re

content = """
张三，手机号码15945678901
李四，手机号码13945677701
王二，手机号码13845666901
"""

# finditer: 作用和findall类似, 返回的数据是一个迭代器
# print(re.finditer(r'^(?P<user_name>.+)，.*?(?P<mobile>\d{11})', content, re.M))
for temp in re.finditer(r'^(?P<user_name>.+)，.*?(?P<mobile>\d{11})', content, re.M):
    print(temp.group('user_name'), temp.group('mobile'))

