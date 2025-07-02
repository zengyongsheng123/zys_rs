#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：TestProject 
@File    ：pow_answer_value.py
@IDE     ：PyCharm 
@Author  ：南宫啸天
@Date    ：2025/3/10 13:48 
'''
import random
import hashlib
import time

target="9b3d1755cbe3394e822a2c09901d2fc1"
prefix="f40ac66a8ea9a6be#"
start_time=int(time.time()*1000)
for i in range(1,1000000):
    val=hashlib.md5((prefix+str(i)).encode('utf-8')).hexdigest()
    if(val==target):
        print(prefix+str(i))
        break
end_time=int(time.time()*1000)
print(end_time-start_time)