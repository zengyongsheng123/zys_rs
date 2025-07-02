# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 21:34
# @Author  : 顾安
# @File    : 7.定位豆瓣页面标签.py


from selenium import webdriver
from selenium.webdriver.common.by import By


browser = webdriver.Chrome()
browser.get('https://movie.douban.com/top250')

li_list = browser.find_elements(By.XPATH, "//ol[@class='grid_view']/li")
print(li_list)
print(len(li_list))


"""
find_element: 定位一个元素标签, 返回的是WebElement对象
find_elements: 定位所有符合条件的标签, 返回的是一个列表
"""
