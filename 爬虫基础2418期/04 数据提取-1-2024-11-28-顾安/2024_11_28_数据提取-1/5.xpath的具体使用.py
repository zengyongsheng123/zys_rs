# -*- coding: utf-8 -*-
# @Time    : 2024/11/28 21:55
# @Author  : 顾安
# @File    : 5.xpath的具体使用.py


from lxml import etree

text = ''' <div> <ul> 
        <li class="item-1"><a href="link1.html">first item</a></li> 
        <li class="item-1"><a href="link2.html">second item</a></li> 
        <li class="item-inactive"><a href="link3.html">third item</a></li> 
        <li class="item-1"><a href="link4.html">fourth item</a></li> 
        <li class="item-0"><a href="link5.html">fifth item</a> 
        </ul> </div> '''

tree = etree.HTML(text)

# 1. 提取class=item-1的第一个标签, xpath中的1表示开始索引
res = tree.xpath('//li[@class="item-1"][1]/a/text()')
print(res)

# 2. 提取class=item-1的第二个标签
res = tree.xpath('//li[@class="item-1"][2]/a/text()')
print(res)

# 3. 提取class=item-1的最后一个标签
res = tree.xpath('//li[@class="item-1"][last()]/a/text()')
print(res)

# 4. 提取class=item-1的倒数第二个标签
res = tree.xpath('//li[@class="item-1"][last() - 1]/a/text()')
print(res)

# 5. 提取class=item-1的标签中position()大于1并且小于3的标签
res = tree.xpath('//li[@class="item-1"][position() > 1 and position() < 3]/a/text()')
print(res)

# 6. 根据文本值获取指定的标签(提取属性)
res = tree.xpath('//li/a[text()="second item"]/@href')
print(res)

