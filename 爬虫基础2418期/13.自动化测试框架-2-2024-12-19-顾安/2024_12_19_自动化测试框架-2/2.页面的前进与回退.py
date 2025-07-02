# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 20:15
# @Author  : 顾安
# @File    : 2.页面的前进与回退.py


import time
from selenium import webdriver


browser = webdriver.Chrome()

browser.get('https://www.jd.com')
time.sleep(2)

browser.get('https://www.taobao.com')
time.sleep(2)


# 页面回退
browser.back()
time.sleep(3)

# 页面前进
browser.forward()
time.sleep(3)

browser.quit()