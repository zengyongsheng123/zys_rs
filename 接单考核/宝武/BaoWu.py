#!/usr/bin/env python
# -*- coding: UTF-8 -*-

# 导入第三方库
import requests
import json
import re
import execjs

# 第一次请求首页
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html"
response = requests.get(url, headers=headers)

meta_label = re.findall(r'<meta id="(.*?)" content="(.*?)"', response.text)[0]
meta_label_id = meta_label[0]
meta_label_content = meta_label[1]

ts_code = re.findall(r'<script type="text/javascript" r=\'m\'>(.*?)</script>', response.text)[0]
func_code_url = "https://qiye.obei.com.cn/" + \
                re.findall(r'<script type="text/javascript" charset="utf-8" src="(.*?)" r=\'m\'></script>',
                           response.text)[0]

print(meta_label_id)
print(meta_label_content)
print(func_code_url)

with open('rs_ts.js', 'w', encoding='utf-8') as f:
    f.write(ts_code)
with open('rs_func.js', 'w', encoding='utf-8') as f:
    f.write(requests.get(func_code_url).text)

rs_ck = execjs.compile(open("./rs_main.js", "r", encoding="utf-8").read()).call("get_cookie").split(";")[0]
print(rs_ck)

# 第二次请求首页
cookies = {
    rs_ck.split("=")[0]: rs_ck.split("=")[1]
}
url = "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html"
response = requests.get(url, headers=headers, cookies=cookies)
ck = response.cookies.get_dict()
print(ck["csrfToken"])

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://qiye.obei.com.cn",
    "Pragma": "no-cache",
    "Referer": "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-csrf-token": ck['csrfToken']
}
cookies = {
    'csrfToken': ck["csrfToken"]
}
url = "https://qiye.obei.com.cn/web-zone/api/sys/zone/getPurchaseList"
for page in range(1, 11):
    data = {
        "code": "bwzy",
        "noticeType": "1",
        "pageNum": page,
        "pageSize": 10,
        "pageFlag": "addSelect",
        "sidx": "issueDate",
        "sord": "desc"
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data, cookies=cookies)

    print(response.text)
