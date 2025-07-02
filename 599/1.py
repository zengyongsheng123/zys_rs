import requests


headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "http://www.813china.com/index.php?m=content&c=index&a=lists&catid=64",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
url = "http://www.813china.com/index.php"
for page in range(1, 15):
    params = {
        "m": "content",
        "c": "index",
        "a": "lists",
        "catid": "64",
        "page": str(page)
    }
    response = requests.get(url, headers=headers, params=params, verify=False)
    print(response.text)
    print(response)