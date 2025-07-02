# -*- coding: utf-8 -*-
# @Time    : 2024/12/1 21:54
# @Author  : 顾安
# @File    : 5.bs4的简单使用.py


from bs4 import BeautifulSoup

html = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title" name="dromouse"><b>The Dormouse's story</b></p>
<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>
<p class="story">...</p>
"""

# 1.创建soup对象
soup = BeautifulSoup(html, 'lxml')
# print(type(soup))

# 2.打印页面格式化之后的html
# print(soup.prettify())

# 3.获取页面中的所有的p标签, 返回结果是一个列表
res_1 = soup.find_all('p')
print(res_1)

# 4.获取所有的a标签
res_2 = soup.find_all('a')
print(res_2)


# 5.获取所有的b标签
res_3 = soup.find_all('b')
print(res_3)
res_4 = soup.find('b')  # 获取第一个b标签
print(res_4)

# 6.获取第一次出现的a标签
res_5 = soup.find('a')
print(res_5)


# 7.添加属性条件查询指定标签
res_6 = soup.find('a', attrs={'id': 'link2'})
print(res_6)
res_7 = soup.find('a', id='link2')
print(res_7)

res_8 = soup.find_all('a', attrs={'class': 'sister'})
print(res_8)

res_9 = soup.find('p', class_='title')
print(res_9)


"""
bs4与xpath的区别:
    xpath需要根据页面结构编辑标签的路径规则
    bs4无需关心标签路径, 根据标签名称与标签属性进行定位, 从语法层面上说更像面向对象
"""









