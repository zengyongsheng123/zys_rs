# -*- coding: utf-8 -*-
import requests
import execjs
import time

headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "referer": "https://match.yuanrenxue.cn/match/1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "sessionid": "zxpf7qnkb91ogtlsj1m4ut58bgfwj73d",
    "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738474078",
    "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1738474078",
    "HMACCOUNT": "5CB104E01BBBF634",
    "qpfccr": "true",
    "no-alert3": "true"
}
url = "https://match.yuanrenxue.cn/api/match/1"
with open('./1.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
ctx = execjs.compile(js_code)
m = ctx.call('get_m')
total = 0
num = 0
for page in range(1, 6):
    params = {
        "page": str(page),
        "m": m
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    if response.status_code == 200:
        print('请求第 {} 页结果：'.format(page), response.json())
        items = response.json()['data']
        for item in items:
            total += item['value']
        num += len(items)
    time.sleep(1)

print('所有机票价格的平均值: ', total / num)
