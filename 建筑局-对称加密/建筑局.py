import os.path

import requests
import execjs

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Cookie": "Hm_lvt_b1b4b9ea61b6f1627192160766a9c55c=1733058903; "
              "Hm_lpvt_b1b4b9ea61b6f1627192160766a9c55c=1733058903; HMACCOUNT=B76FB1B52A129DDC",
    "Referer": "https://jzsc.mohurd.gov.cn/data/company",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 "
                  "Safari/537.36",
    "accessToken;": "",
    "sec-ch-ua": "\\Google",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\Windows",
    "timeout": "30000",
    "v": "231012"
}
url = "https://jzsc.mohurd.gov.cn/APi/webApi/dataservice/query/comp/list"
for i in range(1, 31):
    params = {
        "pg": i,
        "pgsz": "15",
        "total": "450"
    }
    response = requests.get(url, headers=headers, params=params)
    js = execjs.compile(open('建筑局.js', encoding='utf-8').read())
    js_code = js.call("b", response.text)
    print('第一页数据结束：', js_code)
