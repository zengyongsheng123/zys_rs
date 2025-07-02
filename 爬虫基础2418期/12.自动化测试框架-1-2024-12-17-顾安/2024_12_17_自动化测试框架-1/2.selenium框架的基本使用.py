# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 20:19
# @Author  : 顾安
# @File    : 2.selenium框架的基本使用.py


import time
from selenium import webdriver


"""
谷歌浏览器驱动下载: https://googlechromelabs.github.io/chrome-for-testing/#stable
"""


# 1.创建浏览器对象
browser = webdriver.Chrome()

# 2.使用浏览器对象访问指定页面
browser.get('https://www.baidu.com')

# 3.对访问的网站进行截图
browser.save_screenshot('百度首页.png')

# 4.让浏览器最大化
browser.maximize_window()

# 5.程序休眠, 防止浏览器闪退
time.sleep(5)

# 6.使用完浏览器之后需要释放资源
"""
在没有调用quit方法时代码执行完毕浏览器也会自动退出为什么需要使用quit?
    代码执行完毕之后会被GC垃圾回收掉, 内存中的数据会被清空
"""
browser.quit()  # 释放浏览器资源






