# -*- coding: utf-8 -*-
# @Time    : 2024/12/3 21:10
# @Author  : 顾安
# @File    : 1.正则表达式的常见语法.py


import re

"""通配符: . """
content = """
苹果是绿色的
橙子是橙色的
香蕉是黄色的
乌鸦是黑色的
"""

# 匹配所有颜色
# re模块中的方法: findall(返回的数据类型是一个列表)
for temp in re.findall(r'.色', content):
    print(temp)

print('-' * 40)

"""匹配任意次数: * 可以匹配0次或多次"""
content = """
苹果，是绿色的
橙子，是橙色的
香蕉，是黄色的
乌鸦，是黑色的
猴子，
"""

for temp in re.findall(r'，.*', content):
    print(temp)

print('-' * 40)

"""匹配任意次数: + 可以匹配1次或多次"""
content = """
苹果，是绿色的
橙子，是橙色的
香蕉，是黄色的
乌鸦，是黑色的
猴子，
"""

for temp in re.findall(r'，.+', content):
    print(temp)

print('-' * 40)

"""匹配任意次数: ? 可以匹配0次或1次"""
content = """
苹果，是绿色的
橙子，是橙色的
香蕉，是黄色的
乌鸦，是黑色的
猴子，
"""

for temp in re.findall(r'，.?', content):
    print(temp)

print('-' * 40)
"""
匹配任意次数: {n,m} 匹配连续n次到连续m次, 并不能超过m次
如果 m 省略，例如 {n,}，则表示前面的元素必须连续出现至少 n 次，没有上限
"""
content = '红彤彤，绿油油，黑乎乎，绿油油油油'
for temp in re.findall(r'油{2,5}', content):
    print(temp)

print('-' * 40)

"""
贪婪模式与非贪婪模式
"""
content = "<html><head><title>Title</title>"
# 非贪婪模式
for temp in re.findall(r'<.*?>', content):
    print('非贪婪模式:', temp)

print('-' * 40)

# 贪婪模式
for temp in re.findall(r'<.*>', content):
    print('贪婪模式:', temp)

"""元字符转译"""
content = """
苹果.是绿色的
橙子.是橙色的
香蕉.是黄色的
"""

for temp in re.findall(r'.*\.', content):
    print(temp)

print('-' * 40)

"""匹配字符类型以及中括号的使用"""
content = """
1234567890
abcdefghijklmnopqrstuvwxyz
ABCDEFGHIJKLMNOPQRSTUVWXYZ
"""

print(re.findall(r'[a-z]', content))
print(re.findall(r'[A-Z]', content))
print(re.findall(r'[a-c]', content))

print('-' * 40)

"""以指定字符开头以及以指定字符结尾: ^ $"""
content = """this is a test123"""
print(re.findall(r'^this', content))
print(re.findall(r'3$', content))

"""在中括号中使用^以及$: 代表取反"""
content = """1234567890.aaabcdefg_?+*()$%你好   """
for temp in re.findall(r'[^1-3a-g.]', content):
    print(temp)

"""匹配模式"""
content = """001-苹果价格-60
002-橙子价格-70
003-香蕉价格-80
"""
r"""
当使用正则表达式进行匹配时，可以使用不同的模式来指定匹配的方式和规则。以下是一些常用的模式及其含义：
    re.I（忽略大小写）：使匹配对大小写不敏感。例如，re.search('apple', 'Apple', re.I)将会匹配到'Apple'。
    re.M（多行模式）：使^和$匹配每一行的开头和结尾，而不仅仅是整个字符串的开头和结尾。
    re.S（点任意匹配模式）：使.可以匹配任意字符，包括换行符。默认情况下，.无法匹配换行符。
    re.X（扩展模式）：允许在正则表达式模式中使用空格和注释，以提高可读性。
    re.A（ASCII模式）：使\w, \W, \b, \B, \d, \D, \s, \S仅匹配ASCII字符集。默认情况下，它们将匹配Unicode字符。
"""

for temp in re.findall(r'^\d+', content, re.M):
    print(temp)


for temp in re.findall(r'\d+$', content, re.M):
    print(temp)


"""多选匹配"""
content = """苹果，苹果是绿色的
橙子，橙子是橙色的
香蕉，香蕉是黄色的
"""

print(re.findall(r'苹果|橙子|香蕉', content, re.M))


"""分组匹配"""
print(re.findall(r'(.*)，', content))

