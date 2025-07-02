# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 20:55
# @Author  : 顾安
# @File    : 4.获取响应信息.py


from selenium import webdriver


browser = webdriver.Chrome()
browser.get('https://www.baidu.com')

# 获取网页源码
# print(browser.page_source)

# 获取cookie信息
print(browser.get_cookies())
# print(browser.get_cookie('httpOnly'))

# 获取访问地址
print(browser.current_url)


"""
page_source: 获取渲染之后的源代码
get_cookies: 获取cookie信息
current_url: 获取请求地址
"""

