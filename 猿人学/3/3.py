import requests

session = requests.session()
headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-length": "0",
    "origin": "https://match.yuanrenxue.cn",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://match.yuanrenxue.cn/match/3",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
}
# cookies = {
#     "sessionid": "66tl43gfdwvdme2c5dgn3xk2loc0isqu",
#     "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738488823",
#     "HMACCOUNT": "AB6AFBE38CA7777A",
#     "qpfccr": "true",
#     "no-alert3": "true",
#     "tk": "-5171022550730025884",
#     "Hm_lvt_9bcbda9cbf86757998a2339a0437208e": "1738488887",
#     "Hm_lpvt_9bcbda9cbf86757998a2339a0437208e": "1738488887",
#     "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1738488893"
# }
url = "https://match.yuanrenxue.cn/jssm"
response = session.post(url, headers=headers)

url = "https://match.yuanrenxue.cn/api/match/3"
params = {
    "page": "3"
}
res = session.get(url, headers=headers, params=params)

print(res.text)
print(res)