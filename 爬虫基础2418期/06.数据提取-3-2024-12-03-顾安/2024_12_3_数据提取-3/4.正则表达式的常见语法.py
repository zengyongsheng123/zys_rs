# -*- coding: utf-8 -*-
# @Time    : 2024/12/3 21:10
# @Author  : 顾安
# @File    : 4.正则表达式的常见语法.py


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






