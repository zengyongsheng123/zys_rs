import time

import requests

stamp_time = int(time.time() * 1000)
headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://match.yuanrenxue.cn/match/16",
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
    "Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3": "1738647205",
    "sessionid": "ducerglhx2o1ham9g67slbqn2p76vpu1",
    "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738488823,1738633825,1739089968",
    "HMACCOUNT": "25E31AE1F01B489E",
    "qpfccr": "true",
    "no-alert3": "true",
    "tk": "-5171022550730025884",
    "Hm_lvt_9bcbda9cbf86757998a2339a0437208e": "1738488887,1738633825,1739089985",
    "Hm_lpvt_9bcbda9cbf86757998a2339a0437208e": "1739090401",
    "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1739090520"
}
url = "https://match.yuanrenxue.cn/api/match/16"
params = {
    "page": "2",
    "m": "KjiYFBCBBHrJyfw36d71de51e32aadbbfc5043d647ea568X77ecZNB5s",
    "t": "1739090550000"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)
