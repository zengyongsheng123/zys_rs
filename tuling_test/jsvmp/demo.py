import requests


headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mashangpa.com/problem-detail/12/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183": "1747146216",
    "HMACCOUNT": "9274A410DB5E96D0",
    "sessionid": "brstpz44y52s8dyxyzfshr7m3eyvkg0r",
    "Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183": "1747151952"
}
url = "https://www.mashangpa.com/api/problem-detail/12/data/"
params = {
    "page": "2",
    "m": "d378d7ba7ae7aa833bfe640c320b7b115cb49ebd",
    "t": "1747151966251"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)