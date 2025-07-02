# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 20:56
# @Author  : 顾安
# @File    : 7.浏览器参数配置.py


import time
from selenium import webdriver

# 浏览器配置加载
options = webdriver.ChromeOptions()

# 禁止图片加载
prefs = {"profile.managed_default_content_settings.images": 2}
options.add_experimental_option('prefs', prefs)

# 设置UA
# user_agent = 'abc'
# options.add_argument(f'user-agent={user_agent}')

# 隐藏开发者警告
options.add_experimental_option('useAutomationExtension', False)
options.add_experimental_option('excludeSwitches', ['enable-automation'])

# 设置代理
options.add_argument("--proxy-server=http://127.0.0.1:7890")

# 初始化浏览器对象并加载自定义配置
browser = webdriver.Chrome(options=options)
browser.get('https://www.baidu.com')

# 程序休眠以便观察浏览器中的参数设置
time.sleep(100)
