

import requests
import json
import execjs


js = execjs.compile(open('demo.js', encoding='utf-8').read())

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    # "da4728817277230574d7": "501fbf7109938d3758756cbfdb154b5cad341eca254944c4f8d81ef7bb328432da9308e6e50016cc0f9c79d63cfaa9f046b506469244061a71faa0f3eae359e9",
    "origin": "https://www.qcc.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.qcc.com/web/search?key=%E5%B0%8F%E7%B1%B3",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "x-pid": "ddfadee6dfb607d18721620ee0a7338a",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "qcc_did": "cbca3769-bc95-42bc-9c72-31e34fd67c51",
    "UM_distinctid": "1917f26dc9c1a50-0143085e6ccb97-26001e51-1fa400-1917f26dc9d1c79",
    "QCCSESSID": "3708e4f5939102bacb6c61ad02",
    "tfstk": "fXbSsnOx7YD5ZtZzfXF2hcMT5iYC-9awdXOds63r9UL-pvC93Q7zE6pCdtJcdHVkLppCL6IzgPzNZ_YHJpwa7PrUqaVGFvLKJWpv1QHVYRqFZ_YniQ6Os9fodMZjuTLdpEKvtCYKJ2pLGEdM_e3Jv4nxHKvvpe3pvEKv1CG-peBdMSOHHpHL6-O0VLC7ggkjBOG8ls9jJVGMN3UFgDun-ZOWVwCJh_15lQtWBnWbswQR36QPrn2sBefVf9sdKloDP6IJyC5uPqTOwi7BgwPEALBllsQkcfuwRgB5vhjbScxJALsAynGKJsYvnhICF8ikegWXjIKxOPAVQKClyiNnH_BwFUdv0PF1MHIVrhbzH4TOj_8Pv9qZmU1d2EsrWVJ1i2nIGh0BGdPbGDmhgp418crkxBxJiI7aGSMSxA0K80_UGDnp2IA2DSNjFc1..",
    "acw_tc": "1a0c39d617334930117888706e00495ee494eaf8a81169cefc55756dd3f03e",
    "CNZZDATA1254842228": "834972625-1724415139-%7C1733493027"
}
url = "https://www.qcc.com/api/search/searchMulti"
data = {
    "searchKey": "小米",
    "pageIndex": 2,
    "pageSize": 20
}

# print(data)
hea = js.call('get_data', data)
# print(hea)
headers[hea['key']] = hea['val']
# data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, json=data)

print(response.text)
print(response)
