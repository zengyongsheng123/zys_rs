# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 20:33
# @Author  : 顾安
# @File    : 5.字符串分割.py


import re

names = '关羽; 张飞, 赵云,马超, 黄忠  李逵'
print(re.split(r'[;,\s]\s*', names))
