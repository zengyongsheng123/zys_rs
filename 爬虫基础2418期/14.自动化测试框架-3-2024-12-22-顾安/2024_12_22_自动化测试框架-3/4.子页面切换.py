# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 20:45
# @Author  : 顾安
# @File    : 4.子页面切换.py


"""
在drissionpage框架中操作iframe无需切入
"""

import time
from DrissionPage.common import By
from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://www.douban.com/')

page.ele((By.CLASS_NAME, 'account-tab-account')).click()
page.ele((By.ID, 'username')).input('admin')
page.ele((By.ID, 'password')).input('admin123')

page.ele((By.LINK_TEXT, '登录豆瓣')).click()

time.sleep(4)
page.quit()
