# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 20:39
# @Author  : 顾安
# @File    : 5.页面滚动.py


import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get('https://36kr.com/')

# 绝对定位
# js_code = 'window.scrollTo(0, 2000);'
# browser.execute_script(js_code)

# 相对定位
for page in range(1, 11):
    browser.execute_script(f'window.scrollBy(0, {page * 1000});')
    time.sleep(1)

time.sleep(5)
browser.quit()
