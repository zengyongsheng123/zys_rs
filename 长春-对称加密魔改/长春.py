
import requests
import execjs
js = execjs.compile(open('长春.js', encoding='utf-8').read())


o = {
    "id": "rtn3chj1i2o3nypx",
    "projectKey": "honsan_cloud_ccprec",
    "clientKey": "rtn3cgqpwts7ho6h",
    "token": None,
    "clientDailyData": {},
    "acts": [
        {
            "id": "rtn3chba9lscpvmu",
            "fullPath": "/ccprec.com.cn.web/client/info/cqweb_nonphy_cqzr",
            "args": [
                1,
                20,
                None
            ]
        }
    ]
}


da = js.call('get_json', o)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "text/xml;charset=UTF-8",
    "Origin": "https://www.ccprec.com",
    "Pragma": "no-cache",
    "Referer": "https://www.ccprec.com/projectSecPage/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    "^sec-ch-ua": "^\\^Chromium^^;v=^\\^128^^, ^\\^Not;A=Brand^^;v=^\\^24^^, ^\\^Google",
    "sec-ch-ua-mobile": "?0",
    "^sec-ch-ua-platform": "^\\^Windows^^^"
}
url = "https://www.ccprec.com/honsanCloudAct"
# data = '004ar67pw151vl32jyhfb29c5rb5jmec4d5d5v7f4e4s497u7y566373867w5a5m664v6k4d7s6j4b707f686d7v6x9k6o5h6i587v8x5r4b68979c8h8y564y6u3x5z714y6e607o6k49549l8i6o7m6c9f864v618r5r7g67584n627g587y7c4e6k5u748r6t757b9d6s5l6k9q8a6f787v9i7y7d7d6l3z7b4u5o5z5y796s7l7d4f555x7h7a6n6l7u986a5k8i7r6e6x6y4y6d6b3v6h713v7f5x7g7u7n618l9r754u6n7j7e7j6x82867g6n5k5g5z66537l5x6c6r5f616l637p7l7l6a5l5x7v7c5k4o6s7u7k8r7z514478645k6b687q898x7q7y6p6d7u6q5u7t6o766i76727k826m60504m575x79664i7u71576f6q4l6q7w687m6j7u5v5c4m72695r6b6u5y65735r6w5z4d686z6g6k5x7b6x655f5v4s6w7t4m696r5r646o797p655n639f966x94777o7v4e5q8v8s4t4g68735r505z60727y617i4q5s7u6x7j815o7n7s6x7b635v796l573x49826a584a798w708599686k786e9n7p447j8j5g955t5q6a957g747h93844y5q7f94886k6z7j7o6x6e967t6s978b93825i648p827m404b70745w5i7h75696x56475w7p727j8x5a5s737766546c6b8655474f745p5q5y7o888z6y6x6l5d665l5m5m6a686z676s5o4a'.encode('unicode_escape')
# json.dumps    json
response = requests.post(url, headers=headers, data=da)

data = js.call('get_encdata', response.text)
print(data)
for i in data['list']:
    print(i)


# print(response)
