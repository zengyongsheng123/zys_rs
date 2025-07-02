#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：TestProject 
@File    ：decode_1.py
@IDE     ：PyCharm 
@Author  ：南宫啸天
@Date    ：2025/2/3 21:30 
'''
import json
from loguru import logger
import re

# 读取混淆文件
with open('./demo_3.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
    # logger.info(js_code)
    matches = re.findall(r'\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4}', js_code)
    logger.info(matches)

# 如果需要解码这些转义序列，可以使用以下代码
decoded_strings = []
for match in matches:
    if match.startswith('\\x'):
        # 解码16进制转义序列
        decoded_strings.append(bytes.fromhex(match[2:]).decode('utf-8'))
    elif match.startswith('\\u'):
        # 解码Unicode转义序列
        decoded_strings.append(bytes(match, 'utf-8').decode('unicode_escape'))
logger.info(f"解码后的字符串: {decoded_strings}")

# 替换原始文件中的转义序列
for match, decoded_str in zip(matches, decoded_strings):
    js_code = js_code.replace(match, decoded_str)

# 输出解混淆文件
with open('./demo_3_bk.js', 'w', encoding='utf-8') as f:
    f.write(js_code)
    logger.info("文件已更新")

logger.info("替换完成")
