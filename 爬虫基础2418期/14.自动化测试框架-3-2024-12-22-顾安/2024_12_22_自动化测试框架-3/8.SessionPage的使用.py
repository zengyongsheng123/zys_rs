# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 21:34
# @Author  : 顾安
# @File    : 8.SessionPage的使用.py


"""
SessionPage只是用来发送网络请求, 使用方式与requests一致
"""

from DrissionPage import SessionPage

url = 'http://www.ccgp-hunan.gov.cn/mvc/getContentList.do'

form_data = {
    "column_code": "2",
    "title": "",
    "pub_time1": "",
    "pub_time2": "",
    "own_org": "1",
    "page": "1",
    "pageSize": "18"
}

page = SessionPage()
page.post(url, data=form_data)

print(page.user_agent)

print(page.response.json())

# page.close()

