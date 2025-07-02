import requests


headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "sec-ch-device-memory": "8",
    "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
    "sec-ch-ua-arch": "\"x86\"",
    "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"137.0.7151.69\", \"Chromium\";v=\"137.0.7151.69\", \"Not/A)Brand\";v=\"24.0.0.0\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-model": "\"\"",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36"
}
cookies = {
    "stck_anonymous_id": "db0a436b-92e3-44c5-9496-897533e8080a",
    "sstk_anonymous_id": "db0a436b-92e3-44c5-9496-897533e8080a",
    "n_v": "50f9ddd2e07",
    "sstk_session_start": "2025-06-11T14%3A26%3A07.062Z",
    "stck_session_id": "70913424-f7e7-4c40-982e-2a17e1ef5386",
    "sstk_session_id": "70913424-f7e7-4c40-982e-2a17e1ef5386",
    "visit_id": "17496519676393443",
    "visitor_id": "17496519676393443",
    "htjs_anonymous_id": "db0a436b-92e3-44c5-9496-897533e8080a",
    "OptanonCachedGroups": ",C0001,C0003,C0002,C0005,C0004,C0007,",
    "locale": "zh",
    "NEXT_LOCALE": "zh",
    "hl": "zh",
    "downlink": "slow",
    "OptanonConsent": "isGpcEnabled=0&datestamp=Wed+Jun+11+2025+22%3A33%3A07+GMT%2B0800+(%E4%B8%AD%E5%9B%BD%E6%A0%87%E5%87%86%E6%97%B6%E9%97%B4)&version=202403.2.0&browserGpcFlag=0&isIABGlobal=false&hosts=&consentId=77f4d794-fe8c-400f-8895-a4ea3583774f&interactionCount=1&isAnonUser=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0003%3A1%2CC0002%3A1%2CC0005%3A1%2CC0004%3A1%2CC0007%3A1&AwaitingReconsent=false",
    "datadome": "XqeSPSiIhrHAQd~joi9YkaXTbefDLb7J~zsrQT4NGBMRsGKVyypHySoN9VDe3KYE_oWlo6r1QRYuaM3eOFZrSMfyxWZTaIOl6YBsC1A9H~SOiq_SqRB6v2LeByfo7SwD",
    "go_lihp": "image",
    "tracking_id": "0f891632-0904-4c3e-a1dc-0ef7267cf1ef",
    "search-term-cookie": "%E7%BE%8E%E5%A5%B3",
    "footage_search_tracking_id": "0f891632-0904-4c3e-a1dc-0ef7267cf1ef",
    "search-component-cookie": "filters"
}
url = "https://www.shutterstock.com/zh/search/%e7%be%8e%e5%a5%b3"
response = requests.get(url, headers=headers, cookies=cookies)

print(response.text)
print(response)