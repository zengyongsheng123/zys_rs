import requests


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://passport.suning.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://iar-web.suning.com/iar-web/refresh.json"
params = {
    "_callback": "c7784259167",
    "ticket": "298e379e3f9a8c3725819bde06e93abed1d5cbe5120d66b8930dff5c7ecd15a390a98b02a55c7a20272c6d8a19c8b7858454582bcb6a5acf",
    "client": "",
    "jsCode": ""
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)