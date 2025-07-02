from DrissionPage import ChromiumPage
from DrissionPage import WebPage
import random
from time import sleep

page = WebPage()
# 访问目标网站
page.get('https://www.mafengwo.cn/sales/8539850.html')


# 滑块移动定位
huadong = page.ele('xpath://div[@class="tc-fg-item tc-slider-normal"]')
# 滑块图定位
slider = page.ele('xpath://div[@class="tc-fg-item"]')
# 背景图定位
background = page.ele('xpath://div[@class="tc-slider-bg"]')
