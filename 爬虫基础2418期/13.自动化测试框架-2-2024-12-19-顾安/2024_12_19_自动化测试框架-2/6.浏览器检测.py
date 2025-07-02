# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 20:52
# @Author  : 顾安
# @File    : 6.浏览器检测.py


import time
from selenium import webdriver


url = 'https://bot.sannysoft.com/'

# 浏览器配置对象
options = webdriver.ChromeOptions()
options.add_argument('--disable-blink-features=AutomationControlled')

browser = webdriver.Chrome(options=options)
browser.get(url)

time.sleep(5)

browser.quit()
