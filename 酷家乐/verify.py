import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://www.kujiale.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.kujiale.com/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "qhdi": "f817a7083bbe11f09f1257d95e383998",
    "jwt-qunhequnhesso-test": "qwertyuioasdfghjk123456-1748435183720",
    "latest_login_time": "1748435183747",
    "bodypack_devicedetail_version": "v20240305"
}
url = "https://www.kujiale.com/passport/api/phone/send/verify/code"
data = {
    "telephone": "19398205916",
    "tts": False,
    "smsType": 6,
    "captchaGuard": {
        "captchaType": 3,
        "validateToken": "GBrqFqYZGz6tneKf8Xeb5pspzBHRT9/hiwqwRqTzDDDkmULaTcTeXZsKziEy4zJL2OmihzXu88nNcto7Ooi+cg==_2"
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)