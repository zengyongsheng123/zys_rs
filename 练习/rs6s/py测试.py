# -*- coding: utf-8 -*-
# -*- coding: utf-8 -*-

import execjs
import requests
from lxml import etree

session = requests.session()

url = "https://www.aao.cdut.edu.cn/"
headers = {
    "Accept": "*/*",
    "Accept-Language": "en-GB,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "X-Tingyun-Id": "shNg2wpepqo;r=550280083",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
res = session.get(url, headers=headers)
# print(res.text)
print("rs1", res)

html = etree.HTML(res.text)
meta = html.xpath('//meta[2]/@content')[0]
ts_code = html.xpath('//script[1]/text()')[0]

with open("调用.js", encoding='utf-8') as f1:
    js_Code = f1.read().replace("'ts_code'", ts_code)

# 测试的JS
# open("new.js",'w',encoding='utf-8').write(js_Code)

cookie = execjs.compile(js_Code).call("get_ck")
print(cookie)

keydata = cookie.split(';')[0]
cookies = {
    keydata.split('=')[0]: keydata.split('=')[1]
}
print(cookies)
res = session.get(url, headers=headers, cookies=cookies)
print("rs2", res)
res.encoding = 'utf-8'
print(res.text)

# 跑数据
