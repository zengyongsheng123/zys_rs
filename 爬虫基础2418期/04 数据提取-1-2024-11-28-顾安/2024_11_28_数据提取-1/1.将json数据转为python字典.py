# -*- coding: utf-8 -*-
# @Time    : 2024/11/28 20:11
# @Author  : 顾安
# @File    : 1.将json数据转为python字典.py

import json
import requests

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "http://www.cninfo.com.cn",
    "Pragma": "no-cache",
    "Proxy-Connection": "keep-alive",
    "Referer": "http://www.cninfo.com.cn/new/commonUrl?url=disclosure/list/notice",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
}
cookies = {
    "JSESSIONID": "BEEF8473DA2101CDC8305FB4BD69AAE7",
    "SF_cookie_4": "90357558",
    "insert_cookie": "45380249",
    "_sp_ses.2141": "*",
    "_sp_id.2141": "3615fe0b-841b-48c0-82e0-2f7fdc6e622a.1730035197.4.1732795832.1732455954.510bcbe2-90da-486b-af6f-5be1b697fbf5",
    "routeId": ".uc1"
}
url = "http://www.cninfo.com.cn/new/disclosure"
data = {
    "column": "szse_latest",
    "pageNum": "1",
    "pageSize": "30",
    "sortName": "",
    "sortType": "",
    "clusterFlag": "true"
}
response = requests.post(url, headers=headers, cookies=cookies, data=data).json()
# dict_info = json.loads(response)
# print(dict_info)
# print(type(dict_info))
# print(response.text)

print(response)
print(type(response))



