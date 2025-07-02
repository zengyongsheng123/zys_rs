import urllib
import time
import requests
import subprocess

headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mashangpa.com/problem-detail/11/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "Hm_lvt_b5d072258d61ab3cd6a9d485aac7f183": "1747146216",
    "HMACCOUNT": "9274A410DB5E96D0",
    "sessionid": "brstpz44y52s8dyxyzfshr7m3eyvkg0r",
    "Hm_lpvt_b5d072258d61ab3cd6a9d485aac7f183": "1747146487"
}
url = "https://www.mashangpa.com/api/problem-detail/11/data/"

_ts = int(time.time())
print(_ts)
arrays = []
for page in range(1, 21):
    mm = subprocess.run(["node", "mm.js",str(page), str(_ts)], capture_output=True, text=True)
    print(mm.stdout.strip())
    params = {
        "page": str(page),
        "m": mm.stdout.strip(),
        "_ts": str(_ts)
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params,timeout=2)
    data = response.json()['current_array']
    for i in data:
        arrays.append(i)
print(arrays)
sum_array = 0
for i in arrays:
    sum_array += i
print('结果为======>>>', sum_array)
