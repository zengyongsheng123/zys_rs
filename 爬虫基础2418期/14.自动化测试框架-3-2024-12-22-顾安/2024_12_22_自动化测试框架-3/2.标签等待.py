# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 20:22
# @Author  : 顾安
# @File    : 2.标签等待.py


from DrissionPage import ChromiumPage

page = ChromiumPage()
page.get('https://www.baidu.com')

# element = page.ele('xpath://input[@id="abc"]')

# 在规定时间内定位到指定标签, 如果标签不存在且超出最大等待时间则返回一个布尔值(False)
element = page.wait.eles_loaded('xpath://input[@id="abc"]', timeout=2)
print(element)

page.quit()

"""
标签等待: wait.eles_loaded
    如果标签在规定时间内被定位到则返回True, 否则返回False
    
    eles_loaded: 可以等待单个标签也可以等待多个标签
"""
