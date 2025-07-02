# -*- coding: utf-8 -*-
# @Time    : 2024/11/28 20:19
# @Author  : 顾安
# @File    : 2.蜻蜓FM数据获取.py


import requests


url = 'https://webapi.qingting.fm/api/mobile/rank/hotSaleWeekly'

headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
}

response = requests.get(url, headers=headers).json()
for temp in response['rankinglist']:
    temp_dict = dict()  # 一组数据生成一个新字典方便操作
    temp_dict['title'] = temp['title']
    temp_dict['desc'] = temp['desc']
    temp_dict['imgUrl'] = temp['imgUrl']
    print(temp_dict)

