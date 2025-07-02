import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "origin": "https://www.599.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.599.com/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "douyin_ads": "UcZ4N6BmHa",
    "Hm_lvt_b8167d9d4d6b87ad4f016f6096a48019": "1747231938",
    "Hm_lpvt_b8167d9d4d6b87ad4f016f6096a48019": "1747231938",
    "HMACCOUNT": "FF2788912656957F",
    "ads-tracker-baidu": "YXbKtKEi4Tugs3a9XKidbG-dWSUKg5DTMG1jw-nnYTFKq9IUo1NmDaBG"
}
url = "https://fb-p.599.com/footballapi/core/matchlist/bbbbb/instant"
params = {
    "comId": "8",
    "lang": "zh",
    "timeZone": "8",
    "version": "666",
    "versionCode": "666",
    "channelNumber": "GF1001",
    "platform": "pc",
    "appType": "3",
    "st": "1747232209363",
    "sign": "9f49b343be419df9fa30b00f021b5de599"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)