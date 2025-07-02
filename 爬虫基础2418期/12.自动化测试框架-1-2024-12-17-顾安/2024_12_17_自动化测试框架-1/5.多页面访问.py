# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 21:14
# @Author  : 顾安
# @File    : 5.多页面访问.py


import time
from selenium import webdriver


browser = webdriver.Chrome()
browser.get('https://www.jd.com')
time.sleep(3)
# browser.get('https://www.taobao.com')
# time.sleep(3)

js_code = 'window.open("https://www.taobao.com")'
browser.execute_script(js_code)
time.sleep(3)

browser.quit()
