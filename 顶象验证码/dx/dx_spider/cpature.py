import random
import requests
import time
from restore_plus import process_image


def get_time():
    stamp_time = int(time.time() * 1000)
    print('当前时间戳:', stamp_time)
    dx_number = random.randint(1, 99999999)
    number = random.randint(0, 10 ** 17 - 1) / 10 ** 17
    print('长随机数--->>>', "{0:.17f}".format(number))
    return stamp_time, dx_number, number
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://www.dingxiang-inc.com",
    "Pragma": "no-cache",
    "Referer": "https://www.dingxiang-inc.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://cap.dingxiang-inc.com/api/a"

stamp_time, dx_number, number = get_time()
params = {
    "ak": "99de95ad1f23597c23b3558d932ded3c",
    "aid": f"dx-{stamp_time}-{dx_number}-2",
    "c": "681892b5tAghKSCaF19yKkNzhzHOQtDvI63OJTe1",
    "code": "undefined",
    "de": "0",
    "h": "165",
    "jsv": "5.1.53",
    "lf": "0",
    "m": "",
    "s": "50",
    # "sid": "9749aa1e1d38f04b1e2803499e593d54",
    "sid": "",
    "tpc": "",
    "uid": "",
    "w": "380",
    "wp": "1",
    "wtf": "false",
    "cid": "08593348",
    "_r": str(number)
}
response = requests.get(url, headers=headers, params=params)
ret = response.json()


def get_parms():
    params = {}
    # 背景图
    p1 = 'https://static4.dingxiang-inc.com/picture' + ret.get("p1")
    # 滑块图
    p2 = 'https://static4.dingxiang-inc.com/picture' + ret.get("p2")
    sid = ret.get("sid")
    y = ret.get("y")
    # print('背景图-->>>', p1, '滑块图--->>>', p2, sep='\n')
    # print('sid的值:', sid, '\t', 'y的值:', y)
    params['p1'] = p1
    params['p2'] = p2
    params['sid'] = sid
    params['y'] = y
    # 还原背景图
    process_image(p1)
    return params


# print(get_parms())
