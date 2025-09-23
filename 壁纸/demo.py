import requests
import urllib3
urllib3.disable_warnings()
urls = [
    "https://c.53326.com/d/file/lan20221010/130132yn0zn.jpg",
    "https://c.53326.com/d/file/lan20211231/vkmivt2j0wk.jpg",
    "https://c.53326.com/d/file/lan20210602/lg1qbq5f2y2.jpg",
    "https://c.53326.com/d/file/lan20210602/rdr0nmjlcaa.jpg",
    "https://img.netbian.com/file/2025/0826/215744OlWHe.jpg",
    "https://img.netbian.com/file/2023/1227/205357xaGrN.jpg",
    "https://img.netbian.com/file/2023/0310/235953Z6C7p.jpg",
    "https://img.netbian.com/file/2019/1103/88a0c2293416705dd1df2a618169d9ba.jpg",
    "https://img.netbian.com/file/2018/0816/fedf74f8e61a3c0bad3d10c148f2fb84.jpg",
    "https://img.netbian.com/file/2024/0125/010813rQ3kM.jpg"
]
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
}
for url in urls:
    response = requests.get(url, headers=headers, verify=False).content
    name = url.split("/")[-1].split(".")[0]
    with open(f"{name}.jpg", "wb") as f:
        f.write(response)
print('保存成功')
