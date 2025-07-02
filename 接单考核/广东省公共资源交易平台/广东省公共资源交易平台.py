# 地址:https://ygp.gdzwfw.gov.cn/#/44/jygg
# 需求：采集该平台数据10000条
# 字段：标题、发布时间
# 交付：(代码 + 思路 + 结果)截图上传该位置
import time

import requests
import json
import execjs

with open('广东省公共资源交易平台.js', encoding='utf-8') as f:
    js_code = f.read()
js = execjs.compile(js_code)
for i in range(1, 100):
    data = {
        "type": "trading-type",
        "openConvert": False,
        "keyword": "",
        "siteCode": "44",
        "secondType": "A",
        "tradingProcess": "",
        "thirdType": "[]",
        "projectType": "",
        "publishStartTime": "",
        "publishEndTime": "",
        "pageNo": i,
        "pageSize": 10
    }

    head = js.call('get_headers', data)
    # print(head)
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh,zh-CN;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Type": "application/json",
        "Origin": "https://ygp.gdzwfw.gov.cn",
        "Pragma": "no-cache",
        "Referer": "https://ygp.gdzwfw.gov.cn/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "X-Dgi-Req-App": head['X-Dgi-Req-App'],
        "X-Dgi-Req-Nonce": head['X-Dgi-Req-Nonce'],
        "X-Dgi-Req-Signature": head['X-Dgi-Req-Signature'],
        "X-Dgi-Req-Timestamp": str(head['X-Dgi-Req-Timestamp']),
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = "https://ygp.gdzwfw.gov.cn/ggzy-portal/search/v2/items"
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    ret = response.json()['data']['pageData']

    for item in ret:
        noticeTitle = item['noticeTitle']
        publishDate = item['publishDate']
        print(f'================第{i}页开始==============')
        print('标题:', noticeTitle, '发布时间:', publishDate)
        time.sleep(0.5)
