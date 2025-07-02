# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 20:03
# @Author  : 顾安
# @File    : 1.页面标签等待.py

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# 创建浏览器对象
browser = webdriver.Chrome()

# 创建等待操作对象
wait_obj = WebDriverWait(browser, 10)

# 打开网页
browser.get('https://www.jd.com')

# 等待页面输入框加载完成
# EC.presence_of_element_located()
# EC.presence_of_all_elements_located()
search_input = wait_obj.until(EC.presence_of_element_located((By.ID, 'key')))
# print(search_input)

search_input.send_keys('口红')
time.sleep(3)

search_button = wait_obj.until(EC.presence_of_element_located((By.XPATH, '//*[@id="search"]/div/div[2]/button')))
search_button.click()

time.sleep(10)

browser.quit()


"""
EC.presence_of_element_located(): 等待加载某一个指定的标签
EC.presence_of_all_elements_located(): 等待加载某一些指定的标签
"""
