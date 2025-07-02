import requests
import execjs
from lxml import etree

requests = requests.session()
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0",
    "^sec-ch-ua": "^\\^Microsoft",
    "sec-ch-ua-mobile": "?0",
    "^sec-ch-ua-platform": "^\\^Windows^^^"
}
url = "https://amr.sz.gov.cn/xyjggs.webui/xyjggs/List.aspx"
params = {
    "view": "ycml"
}
response = requests.get(url, headers=headers, params=params)
print(response.url)
html_obj = etree.HTML(response.text)
# meta_content = html_obj.xpath('//meta[2]/@content')[0]
ts_code = html_obj.xpath('//script[1]/text()')[0]
meta_content = html_obj.xpath('//meta[2]/@content')[0]
# print(self.js_code.replace("'ts_code'", ts_code).replace("all_content", meta_content))
js = execjs.compile(
    open('商事主体.js', encoding='utf-8').read().replace("'ts_code'", ts_code).replace("all_content", meta_content))

# print(js.call('get_cookie'))
cookies = {
    js.call('get_cookie').split('=')[0]: js.call('get_cookie').split('=')[1]
}
print(cookies)
url = "https://amr.sz.gov.cn/xyjggs.webui/xyjggs/Ajax/Ajax.ashx"
# params = {
#     "hjKSxEQQ": "041gzbGlqEHPmUZC49r00.YVQzQL8sck.lghXjE9PyhONuUR6HQ8rEksg2h5kGf.WT9uwYvvZM8CWe9Clwsd9HlwllLdil1nR"
# }
data = {
    "action": "getYCMLList",
    "keyword": "",
    "PageIndex": "2",
    "pageType": "",
    "code": "",
    "a": "Fri Nov 01 2024 16:03:11 GMT+0800 (中国标准时间)"
}
response = requests.post(url, headers=headers, cookies=cookies, data=data)
# print(response.text)
# print(response.json()['Data']['Items'])
print(response)
