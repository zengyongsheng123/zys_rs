import requests


headers = {
    "Accept": "application/json, text/plain, */*",
    # "Referer": "https://m.ctyun.cn/wap/main/auth/login?redirect=%2Fmy",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
}
url = "https://m.ctyun.cn/account/login"
params = {
    "referrer": "wap",
    "mainVersion": "300031500",
    "comParam_curTime": "1737644002606",
    "comParam_seqCode": "505488443B8581D2811A4DEAB1502243",
    "comParam_signature": "61125303bc1dd2c37f1ccffaa33a392e",
    "isCheck": "true",
    "locale": "zh-cn"
}
data = {
    "userName": "3263903492@qq.com",
    "password": "bEd2U+zyYLMoKfUYZ6x0kQ=="
}
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)
print(response)