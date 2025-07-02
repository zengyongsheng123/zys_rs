import subprocess
import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://www.jianyu360.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.jianyu360.cn/jylab/supsearch/index.html?searchGroup=1",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
}
cookies = {
    "SESSIONID": "6c1bb754eb277cd4cbcebb06c578b078d76f7b0b",
    "JYGuestUID": "1868659218395955200",
    "Hm_lvt_52c42de35032567eb9d7a24a43c84bda": "1734358051",
    "HMACCOUNT": "57754D43E7BB393F",
    "fid": "5ee7be7715046fe161b8583b685575db",
    "JYTrustedId": "QQoVWQcRBQcAAERbRggARQQBUw1BV0MMU0wHBQYAEA1aRE9FCgYJA0FWQl9dRwsFCABBXUBe",
    "limitSearchTextFlag": "DbCpK1734358053773676876",
    "Hm_lpvt_52c42de35032567eb9d7a24a43c84bda": "1734362794",
    "eid": "SplLhOrj1xVRrBRftPIUqH7QPOgb0GWe0J5V3eCPAcIMpC6urU+AgiZXnybAxGCGzIYlPgpac6PvJS65JVZufH7sd6UZJyMJJrzBOh4gljuVVqyJwf9ukoMWlEKoW5cMXwdvR7rSefTQu+/5RZfMG7X1W2/vBIzc6QyIPnXdWE8="
}
url = "https://www.jianyu360.cn/jyapi/jybx/core/fType/searchList"
for i in range(1, 6):
    data = {
        "searchGroup": 1,
        "reqType": "lastNews",
        "pageNum": i,
        "pageSize": 50,
        "keyWords": "",
        "searchMode": 0,
        "bidField": "",
        "publishTime": "1702740410-1734362810",
        "selectType": "title,content",
        "subtype": "",
        "exclusionWords": "",
        "buyer": "",
        "winner": "",
        "agency": "",
        "industry": "",
        "province": "",
        "city": "",
        "district": "",
        "buyerClass": "",
        "fileExists": "",
        "price": "",
        "buyerTel": "",
        "winnerTel": ""
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    js_code = open('剑鱼.js', encoding='utf-8').read().replace('aaaa', response.json()['data']).replace('bbbb', response.json()['secretKey'])
    open('01-jianyu.js', 'w', encoding='utf-8').write(js_code)
    da = subprocess.run('node 01-jianyu.js'.split(), capture_output=True, text=True).stdout
    print(da)
    print('这是第{}页'.format(i))

