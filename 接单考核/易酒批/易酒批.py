# 地址：https://www.yijiupi.com/#/index/list
# 需求：抓取本站点商品分类3个
# 采集字段：标题、价格、规格
# 交付：代码 +思路 + 结果截图
import requests
import json
import execjs

js = execjs.compile(open('易酒批.js', encoding='utf-8').read())
data1 = {
    'headers': {},
    "cityId": 402,
    "countyRegionId": "320116",
    "userClassId": 1,
    "userDisplayClass": 0,
    "addressId": "",
    "deviceType": 3
}
head = js.call('get_headers', data1)
print(head)
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://www.yijiupi.com",
    "Pragma": "no-cache",
    "Referer": "https://www.yijiupi.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "UUID": "ee819d3c7f05244ae7c9e1388bb85724",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "appCode": "ShoppingMallPC",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "token;": head['token'],
    "x-sign": head['x-sign'],
    "x-sign-nonce": head['x-sign-nonce'],
    "x-sign-timestamp": head['x-sign-timestamp'],
    "x-sign-version": head['x-sign-version']
}
print(headers)
url = "https://www.yijiupi.com/v58/Product/List"
data2 = {
    "currentPage": 1,
    "data": {
        "searchModes": [
            2
        ],
        "sort": 0,
        "currentPage": 1,
        "pageSize": 25,
        "filterSpecialArea": False,
        "searchSource": 1,
        "searchKeyNotCorrect": False,
        "brandId": ""
    },
    "pageSize": 25,
    "cityId": 402,
    "countyRegionId": "320116",
    "userClassId": 1,
    "userDisplayClass": 0,
    "addressId": "",
    "deviceType": 3
}
data2 = json.dumps(data2, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data2)
print(response.text)
print(response)
