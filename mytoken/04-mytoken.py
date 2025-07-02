

import requests
import time
# pip install pyexecjs
import execjs

with open('03-mytoken.js', encoding='utf-8')as f:
    js_code = f.read()
time_Data = str(int(time.time() * 1000))

js = execjs.compile(js_code)

code = js.call('get_md5', time_Data)
# print(code)

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded;charset=utf-8",
    "origin": "https://www.mytokencap.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mytokencap.com/",
    "^sec-ch-ua": "^\\^Chromium^^;v=^\\^128^^, ^\\^Not;A=Brand^^;v=^\\^24^^, ^\\^Google",
    "sec-ch-ua-mobile": "?0",
    "^sec-ch-ua-platform": "^\\^Windows^^^",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36"
}
url = "https://api.mytokenapi.com/ticker/currencyranklist"
params = {
    "pages": "5,1",
    "sizes": "100,100",
    "subject": "market_cap",
    "language": "en_US",
    "legal_currency": "USD",
    "timestamp": time_Data,
    "code": code,
    "platform": "web_pc",
    "v": "0.1.0",
    "international": "1"
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)
