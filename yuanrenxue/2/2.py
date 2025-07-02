import requests


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "origin": "https://match2025.yuanrenxue.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://match2025.yuanrenxue.cn/match2025/topic/2",
    "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3": "1738647205",
    "Hm_lvt_3e4ffd7a3b6387fe4632831f1230b518": "1749209310",
    "HMACCOUNT": "AF69AB7A175BA263",
    "sessionid": "k4h05wui9f20zfw0gzcs1jev0vtrfrzt",
    "Hm_lpvt_3e4ffd7a3b6387fe4632831f1230b518": "1749211794"
}
url = "https://match2025.yuanrenxue.cn/match2025/topic/2_captcha_check"
data = {
    "yaseila%E6%A2%81%E9%9D%9E%E5%87%A1": "6509d4ea02a68505943160ffcde8ba22"
}
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)