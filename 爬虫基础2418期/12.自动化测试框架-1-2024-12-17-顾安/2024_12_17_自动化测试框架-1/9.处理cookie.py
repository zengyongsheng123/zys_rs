# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 21:50
# @Author  : 顾安
# @File    : 9.处理cookie.py


from selenium import webdriver


browser = webdriver.Chrome()
browser.get('https://www.baidu.com')


# cookie_list = browser.get_cookies()

# for temp in cookie_list:
#     print(temp)

# cookie的结构组织
# cookie_dict = {x['name']: x['value'] for x in cookie_list}
# print(cookie_dict)


# 删除指定cookie
browser.delete_cookie('BA_HECTOR')
print(browser.get_cookies())

# 删除所有cookie
browser.delete_all_cookies()

# 自定义cookie
browser.add_cookie({'name': 'username', 'value': 'anna'})
cookie_list = browser.get_cookies()

cookie_dict = {x['name']: x['value'] for x in cookie_list}
print(cookie_dict)

# 获取指定的cookie
cookie_info = browser.get_cookie('username')
print(cookie_info)


