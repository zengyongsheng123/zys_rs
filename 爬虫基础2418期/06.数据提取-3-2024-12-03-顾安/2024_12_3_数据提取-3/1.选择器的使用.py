# -*- coding: utf-8 -*-
# @Time    : 2024/12/3 20:02
# @Author  : 顾安
# @File    : 1.选择器的使用.py


"""
在bs4中主要使用find和find_all方法来获取指定的标签
    除了上述方式获取标签之外, 还可以使用select的方式获取标签
"""


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


soup = BeautifulSoup(html, 'lxml')

# res = soup.find_all(string=['Tillie', 'Elsie', 'Lacie'])
# print(res)


# 标签选择器
# select返回的是一个列表类型, select_one返回的是标签对象本身
print(soup.select('title'))
print(soup.select('a'))
print(soup.select_one('a'))
print(soup.select('b'))


# 类选择器
print('类选择器:', soup.select('.sister'))

# id选择器
print('id选择器:', soup.select('#link1'))

# 层级选择器
print('层级选择器:', soup.select('p #link1'))
print('层级选择器:', soup.select('p .sister'))

# 属性选择器
print('属性选择器:', soup.select("a[class='sister']"))
print('属性选择器:', soup.select("p[class='story']"))


# 获取文本内容
print('文本数据:', soup.find('title').get_text())
print('文本数据:', soup.select('title')[0].get_text())

a_list = soup.find_all('a', class_='sister')
for item in a_list:
    print('文本数据:', item.get_text())


# 获取标签的内部属性值
for item in a_list:
    print('属性值:', item.get('href'))










