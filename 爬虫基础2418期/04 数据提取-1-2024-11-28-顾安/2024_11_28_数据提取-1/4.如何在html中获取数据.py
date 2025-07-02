# -*- coding: utf-8 -*-
# @Time    : 2024/11/28 21:31
# @Author  : 顾安
# @File    : 4.如何在html中获取数据.py


from lxml import etree

text = ''' <div> <ul> 
        <li class="item-1"><a href="link1.html">first item</a></li> 
        <li class="item-1"><a href="link2.html">second item</a></li> 
        <li class="item-inactive"><a href="link3.html">third item</a></li> 
        <li class="item-1"><a href="link4.html">fourth item</a></li> 
        <li class="item-0"><a href="link5.html">fifth item</a> 
        </ul> </div> '''


# 1. 创建解析对象
tree = etree.HTML(text)

# 2.使用返回的element对象完成数据的定位
"""
提取class属性为item-1的文本数据和属性数据
"""
# text_info = tree.xpath('//li[@class="item-1"]')  # xpath方法有返回值, 返回值类型是列表, 列表中的元素是element对象
# for a_elements in text_info:
#     a_text = a_elements.xpath('./a/text()')[0]
#     a_href = a_elements.xpath('./a/@href')[0]
#     print(a_text, a_href)

li_a_link = tree.xpath("//li[@class='item-1']/a/@href")
li_a_text = tree.xpath("//li[@class='item-1']/a/text()")

for text, href in zip(li_a_text, li_a_link):
    print(text, href)


"""
//: 跨界点获取指定标签

[@属性='值']: 根据属性值定位标签

@属性: 返回某个标签中的属性的值

text(): 返回标签内部文本

./: 当前标签(在之前定位的标签的基础上继续进行xpath操作)
"""