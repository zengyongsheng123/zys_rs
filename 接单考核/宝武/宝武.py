# 地址：https://qiye.obei.com.cn/web-zone/bwzy/procurement.html
# 需求：抓取采购公告分类下的数据10页
# 采集字段：标题、发布时间、寻源方式
# 提示：cookie要处理
# 交付：代码 +思路 + 结果截图
import requests
import json
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html"
response = requests.get(url, headers=headers)

print(response.text)
print(response)

# headers = {
#     "Accept": "application/json, text/plain, */*",
#     "Accept-Language": "zh",
#     "Cache-Control": "no-cache",
#     "Connection": "keep-alive",
#     "Content-Type": "application/json;charset=UTF-8",
#     "Origin": "https://qiye.obei.com.cn",
#     "Pragma": "no-cache",
#     "Referer": "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html",
#     "Sec-Fetch-Dest": "empty",
#     "Sec-Fetch-Mode": "cors",
#     "Sec-Fetch-Site": "same-origin",
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
#     "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
#     "sec-ch-ua-mobile": "?0",
#     "sec-ch-ua-platform": "\"Windows\"",
#     "x-csrf-token": "5yyXIzxtaPdNcEP1eQJ62jgH"
# }
# cookies = {
#     "csrfToken": "5yyXIzxtaPdNcEP1eQJ62jgH"
# }
# url = "https://qiye.obei.com.cn/web-zone/api/sys/zone/getPurchaseList"
# data = {
#     "code": "bwzy",
#     "noticeType": "1",
#     "pageNum": 1,
#     "pageSize": 10,
#     "pageFlag": "addSelect",
#     "sidx": "issueDate",
#     "sord": "desc"
# }
# data = json.dumps(data, separators=(',', ':'))
# response = requests.post(url, headers=headers, cookies=cookies, data=data)
#
# print(response.text)
# print(response)