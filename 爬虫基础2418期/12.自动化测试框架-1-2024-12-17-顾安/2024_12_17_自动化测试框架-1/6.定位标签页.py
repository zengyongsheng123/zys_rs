# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 21:20
# @Author  : 顾安
# @File    : 6.定位标签页.py

import time
from selenium import webdriver

browser = webdriver.Chrome()
browser.get('https://www.taobao.com')
time.sleep(2)

js_code = 'window.open("https://www.sogou.com")'
browser.execute_script(js_code)
time.sleep(2)

js_code = 'window.open("https://www.jd.com")'
browser.execute_script(js_code)
time.sleep(2)

# 获取指定的标签页列表
print(browser.window_handles)  # 获取当前所有的标签页的句柄(标签页id), 返回的句柄顺序不一定是打开的顺序

# 切入指定的标签页
# browser.switch_to.window(browser.window_handles[0])
# print(browser.title)
# time.sleep(3)
# browser.switch_to.window(browser.window_handles[1])
# time.sleep(3)
# browser.switch_to.window(browser.window_handles[2])
# time.sleep(3)


for handle in browser.window_handles:
    browser.switch_to.window(handle)
    print(f'句柄: {handle}, 页面标题: {browser.title}')
    if ("淘宝" in browser.title) or ("taobao.com" in browser.current_url):
        print("已切换到淘宝页面:", handle)
        time.sleep(2)
    elif ("京东" in browser.title) or ("jd.com" in browser.current_url):
        print("已切换到京东页面:", handle)
        time.sleep(2)
    else:
        print("已切换到搜狗页面:", handle)
        time.sleep(2)


browser.quit()

