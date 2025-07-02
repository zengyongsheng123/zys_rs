import requests


headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://match2025.yuanrenxue.cn/match2025/topic/1",
    "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
}
cookies = {
    "Hm_lvt_434c501fe98c1a8ec74b813751d4e3e3": "1738647205",
    "Hm_lvt_3e4ffd7a3b6387fe4632831f1230b518": "1749209310",
    "HMACCOUNT": "AF69AB7A175BA263",
    "sessionid": "k4h05wui9f20zfw0gzcs1jev0vtrfrzt",
    "Hm_lpvt_3e4ffd7a3b6387fe4632831f1230b518": "1749211486"
}
url = "https://match2025.yuanrenxue.cn/match2025/topic/1"
response = requests.get(url, headers=headers, cookies=cookies)

print(response.text)
print(response)