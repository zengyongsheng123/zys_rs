import requests
import subprocess
import json
import hashlib
import time

timestamp = str(int(time.time() * 1000))
with open('jd.js', 'r', encoding='utf-8') as file:
    js_code = file.read()
body = {"page": 1, "pagesize": 25, "area": "19_1607_0_0", "source": "pc-home"}


def get_sha(text):
    sha = hashlib.sha256()
    sha.update('text'.encode())
    return sha.hexdigest()


rrr = {
    'appid': 'www-jd-com',
    'body': str(get_sha(body)),
    'clientVersion': '1.0.0',
    'client': 'pc',
    'functionId': 'pc_home_feed',
    't': timestamp,
}
h5st = subprocess.check_output(['node', 'jd.js', rrr])
print(h5st)
headers = {
    'accept': '*/*',
    'accept-language': 'zh,zh-CN;q=0.9',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'referer': 'https://www.jd.com/',
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'script',
    'sec-fetch-mode': 'no-cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
    'cookie': '3AB9D23F7A4B3C9B=P7MLKWGQRZ3SLXXEEPA36HPKZWLWB6YYPWRFOGCBBQFFMSZL56O7DVCK5TYPTIXH36HS26GIFXYNWJZM5T5EG5BVOI; __jdu=1736431854632894516456; shshshfpa=660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855; shshshfpx=660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855; __jda=76161171.1736431854632894516456.1736431855.1739696466.1741186929.4; __jdc=76161171; __jdv=76161171|direct|-|none|-|1741186929098; areaId=19; ipLoc-djd=19-1607-0-0; shshshfpb=BApXS4tbcZfBA-lb62kUbGA0TRDBDQGMaBnQCH3pr9xJ1MknjYoG2; __jdb=76161171.2.1736431854632894516456|4.1741186929; 3AB9D23F7A4B3CSS=jdd03P7MLKWGQRZ3SLXXEEPA36HPKZWLWB6YYPWRFOGCBBQFFMSZL56O7DVCK5TYPTIXH36HS26GIFXYNWJZM5T5EG5BVOIAAAAMVM3L4YQIAAAAADPRN4Z7SSYKKC4X; _gia_d=1; sdtoken=AAbEsBpEIOVjqTAKCQtvQu173LEz3CoR9Zo6pIHDi8dGkHbX3MjgBriyWL4GIAw0XMhoENT2qX8z08gtwwCpObNm3pBZ5l32yeg9vcDRKVR1v7bPtgRyzbpk23G8',
}

params = {
    'h5st': str(h5st),
    'appid': 'www-jd-com',
    'body': str(body),
    'clientVersion': '1.0.0',
    'client': 'pc',
    'functionId': 'pc_home_feed',
    't': timestamp,
    'uuid': '76161171.1736431854632894516456.1736431855.1739696466.1741186929.4',
    'loginType': '3',
    'x-api-eid-token': 'jdd03P7MLKWGQRZ3SLXXEEPA36HPKZWLWB6YYPWRFOGCBBQFFMSZL56O7DVCK5TYPTIXH36HS26GIFXYNWJZM5T5EG5BVOIAAAAMVM3KBJYAAAAAACFS3N42HELRCDUX',
    'callback': 'jsonpMore2Goods',
    '_': timestamp,
}

response = requests.get('https://api.m.jd.com/', params=params, headers=headers)
print(response.text)
print(response)
