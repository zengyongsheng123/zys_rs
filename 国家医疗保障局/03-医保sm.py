


import requests
import json
import execjs

js = execjs.compile(open('04-医保sm.js', encoding='utf-8').read())


head = js.call('get_headers')
print(head)
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
    "X-Tingyun": "c=B|4Nl_NnGbjwY;x=ebf43946aa6f444b",
    "channel": "web",
    "contentType": "application/x-www-form-urlencoded",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-tif-nonce": head['x-tif-nonce'],
    "x-tif-paasid": "undefined",
    "x-tif-signature": head['x-tif-signature'],
    "x-tif-timestamp": str(head['x-tif-timestamp'])
}
cookies = {
    "amap_local": "430100",
    "yb_header_active": "-1"
}

da = js.call('get_data', head['x-tif-timestamp'], 1)
print(da)
url = "https://fuwu.nhsa.gov.cn/ebus/fuwu/api/nthl/api/CommQuery/queryFixedHospital"
# data = {
#     "data": {
#         "data": {
#             "encData": "3DFBCA4667B978F639BB23B95DCE4CC776E66F7BDE8C41EE881B1D73483269E5CCD20943B4DAE96380B41164D761DE9742C84A985FE3BABC31CB352556BB87C9C1495DB24A29AB6BC3A85AB7FCA00F33C56677481A67C67F739EE2C7D589054DC373615B5DDB33C24C5B31E61CB7643E00DDA865C3B75C85735F0744B0227B5CD0B4E7BB97C60BF8E5275CAFCAFD1E13E384C10195003FD638576645B5EF45EA"
#         },
#         "appCode": "T98HPCGN5ZVVQBS8LZQNOAEXVI9GYHKQ",
#         "version": "1.0.0",
#         "encType": "SM4",
#         "signType": "SM2",
#         "timestamp": 1734698196,
#         "signData": "LIHeuwvN4yGCus5Ky3pdiKzydsrLLODKUTokqn/KHadO/eUncB1GiZBQsdCZl86LTlTUx9poeuMBeYlkGhcKNQ=="
#     }
# }
data = json.dumps(da, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)