import requests

requests = requests.session()
headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://author.baidu.com/home/1727346778559448"
response = requests.get(url, headers=headers)
print(response.cookies.get_dict())
headers1 = {
    "Accept": "*/*",
    "Accept-Language": "zh",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://author.baidu.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}

url1 = "https://mbd.baidu.com/webpage"
cookies = {
    "BAIDUID": "8B2A697F11C5E70F43624D2E654AFCCD:FG=1",
    "BAIDUID_BFESS": "8B2A697F11C5E70F43624D2E654AFCCD:FG=1"
}
params1 = {
    "tab": "column",
    "num": "10",
    "uk": "YrFYZVHT40Bn2LczhODRQQ",
    "source": "pc",
    "ctime": "17275793739999",
    "type": "newhome",
    "action": "dynamic",
    "format": "jsonp",
    "otherext": "h5_20250428115222",
    "Tenger-Mhor": "225754038",
    "callback": "__jsonp71746341089453"
}
response1 = requests.get(url1, headers=headers1,  cookies=cookies, params=params1)

print(response1.text)
print(response1)