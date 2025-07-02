# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 21:29
# @Author  : 顾安
# @File    : 7.验证码拖动案例.py


import time
from DrissionPage.common import By
from DrissionPage import ChromiumPage



url = "https://ynjzjgcx.com/dataPub/enterprise"
page = ChromiumPage()
page.get(url)

button = page.ele((By.CLASS_NAME, 'slide-verify-slider-mask-item'))
page.actions.hold(button)

# 向右移动指定的像素位并释放(对于移动的像素位计算需要使用ddddocr第三方包完成计算)
page.actions.right(300).release()


time.sleep(4)
page.quit()