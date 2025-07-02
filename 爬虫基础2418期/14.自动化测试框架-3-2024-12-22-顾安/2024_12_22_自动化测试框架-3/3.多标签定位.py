# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 20:31
# @Author  : 顾安
# @File    : 3.多标签定位.py


from DrissionPage import ChromiumPage


page = ChromiumPage()
page.get("https://movie.douban.com/top250")

# eles 定位多个元素, 返回的是一个列表
div_list = page.eles("xpath://ol[@class='grid_view']/li/div[@class='item']")

for item in div_list:
    # 获取标签中的文本直接使用element对象提供的text方法
    movie_name = item.ele('xpath:.//div[@class="hd"]//span[@class="title"][1]').text
    movie_image = item.ele('xpath:./div[@class="pic"]/a/img').attr('src')

    # 返回定位的标签的所有属性值
    # movie_all_attr = item.ele('xpath:./div[@class="pic"]/a/img').attrs
    print(movie_name, movie_image)


"""
获取标签中的文本直接使用element对象中提供的text方法
获取标签中的属性直接使用element对象中提供的attr方法

补充：获取标签中的所有属性直接使用element对象中提供的attrs方法
"""