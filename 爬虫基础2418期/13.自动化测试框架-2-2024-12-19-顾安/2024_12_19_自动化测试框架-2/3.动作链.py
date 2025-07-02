# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 20:18
# @Author  : 顾安
# @File    : 3.动作链.py


import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver import ActionChains


driver = webdriver.Chrome()
driver.get('http://www.runoob.com/try/try.php?filename=jqueryui-api-droppable')

iframe = driver.find_element(By.ID, 'iframeResult')

# 切入子页面
driver.switch_to.frame(iframe)

source = driver.find_element(By.ID, 'draggable')
target = driver.find_element(By.ID, 'droppable')

# 创建动作链对象
actions = ActionChains(driver)
actions.drag_and_drop(source, target)

# 执行动作链
actions.perform()

time.sleep(3)
driver.quit()


"""
子页面切入
    1.定位iframe标签
    2.切入到iframe标签内部
    switch_to.frame

动作链对象
    actions = ActionChains(driver)
    drag_and_drop
"""
