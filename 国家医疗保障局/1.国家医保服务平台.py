import requests
import json
import execjs
import time
with open('1.国家医保服务平台.js', encoding='utf-8') as f:
    js_code = f.read()
js = execjs.compile(js_code)
headers = js.call('get_header')
headers = {
    "Accept": "application/json",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://fuwu.nhsa.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://fuwu.nhsa.gov.cn/nationalHallSt/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "X-Tingyun": "c=B|4Nl_NnGbjwY;x=e67e86e2affb4c10",
    "channel": "web",
    "contentType": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-tif-nonce": headers["x-tif-nonce"],
    "x-tif-paasid": "undefined",
    "x-tif-signature": headers["x-tif-signature"],#"ece4891f2d03c54ff434339bb05fe6d0581580baca1c45665ca99fd357b2f6ca",
    "x-tif-timestamp": str(headers["x-tif-timestamp"])
}
cookies = {
    "amap_local": "410000"
}
for page in range(1, 5):
    payload = {
        "data": {
            "addr": "",
            "regnCode": "410000",
            "medinsName": "",
            "medinsLvCode": "",
            "medinsTypeCode": "",
            "outMedOpenFlag": "",
            "pageNum": page,
            "pageSize": 10,
            "queryDataSource": "es"
        },
        "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
        "version": "1.0.0",
        "encType": "SM4",
        "signType": "SM2",
        "timestamp": str(headers["x-tif-timestamp"])
    }

    Data = js.call('get_signData', payload)
    encData = js.call('get_encData', payload)
    print(headers, Data, encData)

    url = "https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital"
    data = {
        "data": {
            "data": {
                # "encData": "3DFBCA4667B978F639BB23B95DCE4CC7586D49DB6E7B51EEF3DAE158A2077E29CCD20943B4DAE96380B41164D761DE9742C84A985FE3BABC31CB352556BB87C9C1495DB24A29AB6BC3A85AB7FCA00F33C56677481A67C67F739EE2C7D589054DC373615B5DDB33C24C5B31E61CB7643E00DDA865C3B75C85735F0744B0227B5CD0B4E7BB97C60BF8E5275CAFCAFD1E13E384C10195003FD638576645B5EF45EA"
                "encData": encData
            },
            "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
            "version": "1.0.0",
            "encType": "SM4",
            "signType": "SM2",
            "timestamp": Data['ts'],
            # "signData": "elSkib7ew5w8ZsnJvLjwfgVlwQ/zdvC/D2jlCpJZb8c7j2XO6j9IIGMGohRCJ1Lphnu4qP/bDCMfJ2YNZJ9jHw=="
            "signData": Data['signData']
        }
    }
    response = requests.post(url, headers=headers, cookies=cookies, json=data)
    info = js.call('get_response', json.loads(response.text))
    print(info)

