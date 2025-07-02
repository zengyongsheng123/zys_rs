# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 21:40
# @Author  : 顾安
# @File    : 8.提取标签信息.py


from selenium import webdriver
from selenium.webdriver.common.by import By


browser = webdriver.Chrome()
browser.get('https://movie.douban.com/top250')

li_list = browser.find_elements(By.XPATH, "//ol[@class='grid_view']/li")

for li in li_list:
    # 获取标签属性
    a_href = li.find_element(By.XPATH, './/div[@class="pic"]/a')
    # 在selenium中先获取element标签对象之后通过get_attribute获取标签属性
    print(a_href.get_attribute('href'))

    # 获取标签文本信息
    movie_name = li.find_element(By.XPATH, './/div[@class="hd"]//span[@class="title"][1]')
    print(movie_name.text)


"""
get_attribute: 根据定位的element对象并调用方法获取标签属性
text: 根据定位的element对象并调用方法获取标签文本
"""

