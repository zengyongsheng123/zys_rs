# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 20:17
# @Author  : 顾安
# @File    : 2.分组练习.py


import re


content = """
张三，手机号码15945678901
李四，手机号码13945677701
王二，手机号码13845666901
"""

print(re.findall(r'(.*?)，.*?(\d{11})', content, re.M))