import requests
import json


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Authorization;": "",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://tpass.hebei.chinatax.gov.cn:8443",
    "Pragma": "no-cache",
    "Referer": "https://tpass.hebei.chinatax.gov.cn:8443/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "X-APP-CLIENTID": "ap5bfdavp66a49979apa5848fpaa5353",
    "X-LANG-ID": "null",
    "X-NATURE-IP;": "",
    "X-SM4-INFO": "0",
    "X-TEMP-INFO": "e575aab6d1e54ac0ade36f4305ee01e6",
    "X-TICKET-ID": "null",
    "deviceIdentyNo": "Pi3opU6P9wIx1eKMLtGuZWKmRUpooXsJ",
    "hUid;": "",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://tpass.hebei.chinatax.gov.cn:8443/sys-api/v1.0/auth/qrcodeLogin/verifyQRCode"
params = {
    "R432t1Wu": "0p8qu.qlqWEfGAk79WB1Vyo4lOJxm1MQaOhjafm42aq_Wn6VDQgxKpT68d6DZ5z8WHNs94kcP8cq5EHheRZ.wf2qn_MQWGMbzFl41MkCoKrlPtQYqQ5MqPq"
}
data = {
    "zipCode": "0",
    "datagram": "0aae82d189b46a38810f6e6391719538b712ff273b3c39aa007e7e7de46345fca31986b5a1e8eb2720286c0a334d9fd3c88f74c7d62feb5f88d9043fea28a756",
    "encryptCode": "2",
    "timestamp": "20250212222306",
    "access_token": "",
    "signtype": "HMacSHA256",
    "signature": "82f116a658b2944eef29e0ccaad1ffca690879e05024b547b918cb52fa0b7809"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, params=params, data=data)

print(response.text)
print(response)