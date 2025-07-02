# -*- coding: utf-8 -*-
# @Time    : 2024/11/28 22:07
# @Author  : 顾安
# @File    : 6.三元表达式.py


from lxml import etree


text = ''' <div> <ul> 
        <li class="item-1"><a href="link1.html">first item</a></li> 
        <li class="item-1"><a href="link2.html">second item</a></li> 
        <li class="item-inactive"><a href="link3.html">third item</a></li> 
        <li class="item-1"><a href="link4.html">fourth item</a></li> 
        <li class="item-0"><a href="link5.html">fifth item</a> 
        </ul> </div> '''


tree = etree.HTML(text)
li_list = tree.xpath('//li[@class="item-1"]')
# print(li_list)

for li_element in li_list:
    item = dict()
    item['href'] = li_element.xpath('./a/@href')[0] if len(li_element.xpath('./a/@href')) > 0 else '暂无数据'
    item['title'] = li_element.xpath('./a/text()')[0] if len(li_element.xpath('./a/text()')) > 0 else '暂无数据'
    print(item)

