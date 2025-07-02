import random

import requests
from cpature import get_parms, get_time
import ddddocr
import execjs
import requests

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-type": "application/x-www-form-urlencoded",
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
url_js = "https://cdn.dingxiang-inc.com/ctu-group/ctu-greenseer/greenseer.js"
params = {
    "_t": "485176"
}
response = requests.get(url_js, headers=headers, params=params)
with open('green.js', 'w', encoding='utf-8') as f:
    f.write(response.text)

url = "https://cap.dingxiang-inc.com/api/v1"
ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
# 滑块图保存本地
target = requests.get(get_parms()['p2']).content
with open('target.png', 'wb') as f:
    f.write(target)
with open('target.png', 'rb') as f:
    target_bytes = f.read()

with open('output.png', 'rb') as f:
    background_bytes = f.read()

res = ocr.slide_match(target_bytes, background_bytes, simple_target=True)
# 画布是400*200尺寸,而背景图片实际尺寸是380*165
x = int(res['target'][0] * 380 / 400)
# y = int(res['target'][1] * 165 / 200)
y = get_parms()['y']
print('滑块移动的距离为--->', x, '\t', '滑块y坐标为--->', y)
stamp_time, dx_number, number = get_time()
with open('./main.js', 'r', encoding='utf-8') as f:
    js = f.read()
ac = execjs.compile(js).call('getAc', str(x), str(y), str(get_parms()['sid']))
data = {
    "ac": str(ac),
    "ak": "99de95ad1f23597c23b3558d932ded3c",
    "c": "681892b5tAghKSCaF19yKkNzhzHOQtDvI63OJTe1",
    "uid": "",
    "jsv": "5.1.53",
    "sid": str(get_parms()['sid']),
    "aid": f"dx-{stamp_time}-{dx_number}-{random.randint(1, 10)}",
    "x": str(x),
    "y": str(y),
    "w": "380",
    "h": "165"
}
response = requests.post(url, headers=headers, data=data)
#
print(response.text)
print(response)
