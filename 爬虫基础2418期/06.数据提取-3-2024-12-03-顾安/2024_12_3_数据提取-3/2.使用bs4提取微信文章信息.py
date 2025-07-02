# -*- coding: utf-8 -*-
# @Time    : 2024/12/3 20:30
# @Author  : 顾安
# @File    : 2.使用bs4提取微信文章信息.py


import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}

url = 'https://weixin.sogou.com/weixin?_sug_type_=1&type=2&query=python'
response = requests.get(url, headers=headers).text
soup = BeautifulSoup(response, 'lxml')

# news_element_list = soup.select('ul[class="news-list"]')
# print(news_element_list)

# 返回的就是选中的标签对象本身
news_element_list = soup.find('ul', class_='news-list').find_all('h3')
for item in news_element_list:
    print('文本信息:', item.get_text())
    print('详情链接:', 'https://weixin.sogou.com/' + item.find('a').get('href'))

"""
https://mp.weixin.qq.com/s?src=11&timestamp=1733228852&ver=5666&signature=5PDM423gk6Y2yYABWYbjqLtl5bzc1PpCxPEhO7GNjvPmsoBQ8u5FvbuMld15i-oki60f-fVgDVMbm9Oi-AiC2xkzjEqx0M1nkbOPucFd8xKrQuRxy58DorpMrpgO5Xvf&new=1
"""
