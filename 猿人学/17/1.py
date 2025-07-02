from curl_cffi import requests

headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://match.yuanrenxue.cn/match/17",
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
    "sessionid": "colrxiv39537210iqpe25yqonbxej8s5",
    "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738488823,1738633825",
    "HMACCOUNT": "25E31AE1F01B489E",
    "Hm_lvt_9bcbda9cbf86757998a2339a0437208e": "1738488887,1738633825",
    "Hm_lpvt_9bcbda9cbf86757998a2339a0437208e": "1738633825",
    "qpfccr": "true",
    "no-alert3": "true",
    "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1738644370"
}
total = 0
for page in range(1, 6):
    url = f"https://match.yuanrenxue.cn/api/match/17?page={page}"
    response = requests.get(url, headers=headers, cookies=cookies)
    data = response.json()['data']
    # print(data)
    for i in data:
        sum_data = i['value']
        total += sum_data
print(total)
