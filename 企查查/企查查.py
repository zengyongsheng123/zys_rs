import requests
import json
import execjs
with open('企查查.js', encoding='utf-8')as f:
    js_code = f.read()

js = execjs.compile(js_code)
data = {
    "searchKey": "小米",
    "pageIndex": 1,
    "pageSize": 20
}
# data = json.dumps(data, separators=(',', ':'))
data_json = js.call('get_header', data)
headers = {
    data_json['key']: data_json['val'],
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://www.qcc.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.qcc.com/web/search?key=%E5%B0%8F%E7%B1%B3&p=2",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 "
                  "Safari/537.36",
    "x-pid": "28af7723312897564e38fcc1712f5a76",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "qcc_did": "77443880-bf09-4362-8c5e-8eafa7c2ab8b",
    "QCCSESSID": "e2f83e4b6f4b18e871a5f1fcfb",
    "UM_distinctid": "193a484da15c9e-0625648fd1cf41-26011851-1fa400-193a484da1629d5",
    "tfstk": "fj4BzG_JwpvQtRsFcQCZCtToKL0WA8_qFQG8i7Lew23peLFxQXzFK7H7FRkgF0fnUYH7U7EF_Z74tW0oyY6VuZ5zFKWbRYpryBKWnaWV3Z7Z8IT_WtyEtaOe1bDt9b3JJ19twjg-9vnR1AhSi3pLe8FO1bGp9XhKehQtab0-e83R15hl7IG5AvVC_-p77H_GbWM6yEOiODFdoATJyPGQTxFdMUL85XiQrAg6yEiU2Sm0877WS2PbXVh7rsKSFmZ88VUdBZni2uEqVlJdT-e7680UW_KKHkyEWyEXwUFsRAirODvCCxU36r0tbZCb6P2UtPNywaha3AF3J4_Ai2gKpVGgzOYKFlE88D0kpTMu55ULVgJwuxt3n3OsmUGs3116q3VZEZazEQ2RqDhiOc511pEovfcs3116q3mKsXGV119Lq",
    "CNZZDATA1254842228": "1902132027-1733631990-%7C1733635779",
    "acw_tc": "0a472f8417336381205045085e0049d2a81a3695afbe68bfe56d37381f2bb3"
}
url = "https://www.qcc.com/api/search/searchMulti"
# headers[data_json['key']] = data_json['val']
# print(headers)
response = requests.post(url, headers=headers, cookies=cookies, json=data)

print(response.text)
print(response)