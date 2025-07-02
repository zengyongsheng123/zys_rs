# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 20:39
# @Author  : 顾安
# @File    : 3.标签定位与标签操作.py


import time
from selenium import webdriver
from selenium.webdriver.common.by import By

# 如果将浏览器驱动放入指定文件夹之下后还是无法正常启动浏览器
from selenium.webdriver.chrome.service import Service


# 如果是windows系统需要将文件后缀名加上
service = Service(executable_path='/usr/local/bin/chromedriver')

# 指定浏览器驱动路径
browser = webdriver.Chrome(service=service)
browser.get('https://www.baidu.com')

# 标签定位
browser.find_element(By.ID, 'kw').send_keys('jk萌妹')
browser.find_element(By.ID, 'su').click()

time.sleep(5)

# 退出浏览器
browser.quit()





