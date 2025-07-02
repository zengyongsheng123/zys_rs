import requests


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://match.yuanrenxue.cn/match/3",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "sessionid": "90pzm4zjcti33meawj5w7kfygduw2gqf",
    "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738473177",
    "HMACCOUNT": "384B3BF72FA11566",
    "no-alert3": "true",
    "tk": "-5171022550730025884",
    "Hm_lvt_9bcbda9cbf86757998a2339a0437208e": "1738473207",
    "Hm_lpvt_9bcbda9cbf86757998a2339a0437208e": "1738482345",
    "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1738482357"
}
url = "https://match.yuanrenxue.cn/api/match/3"
params = {
    "page": "3"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)