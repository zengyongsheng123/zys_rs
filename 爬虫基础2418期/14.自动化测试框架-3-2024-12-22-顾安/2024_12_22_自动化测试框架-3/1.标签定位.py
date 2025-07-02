# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 20:04
# @Author  : 顾安
# @File    : 1.标签定位.py


import time
from DrissionPage.common import By
from DrissionPage import ChromiumPage


# 1.创建浏览器对象(无需单独下载浏览器驱动文件)
page = ChromiumPage()

# 2.使用浏览器对象访问指定页面
page.get('https://www.baidu.com')

# 3.浏览器窗口最大化
page.set.window.max()

# 4.定位元素, 使用By完成标签定位时需要传递元组
"""
在drissionpage框架中发送搜索关键字不是send_keys而是input
"""
# page.ele((By.XPATH, '//input[@id="kw"]')).input('jk')
# page.ele((By.XPATH, '//input[@id="su"]')).click()


page.ele('xpath://input[@id="kw"]').input('汉服')
page.ele('xpath://input[@id="su"]').click()

time.sleep(5)

# 5.关闭浏览器
page.quit()



