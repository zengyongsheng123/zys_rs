# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 21:23
# @Author  : 顾安
# @File    : 6.动作链.py


import time
from DrissionPage.common import By
from DrissionPage import ChromiumPage


page = ChromiumPage()
url = "https://www.runoob.com/try/try.php?filename=jqueryui-api-droppable"
page.get(url)


source = page.ele((By.ID, 'draggable'))
target = page.ele((By.ID, 'droppable'))

page.actions.hold(source).release(target)
time.sleep(5)

page.quit()
