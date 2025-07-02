import random
from cpature import get_parms, get_time
import execjs
import requests
from captcha_recognizer.recognizer import Recognizer

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
# 滑块图保存本地
target = requests.get(get_parms()['p2']).content
with open('target.png', 'wb') as f:
    f.write(target)
with open('target.png', 'rb') as f:
    target_bytes = f.read()

with open('output.png', 'rb') as f:
    background_bytes = f.read()

# pip install captcha-recognizer
# source传入图片路径
box, confidence = Recognizer().identify_gap(source='output.png', verbose=False)

print(f'缺口坐标: {box}')
print(f'可信度: {confidence}')

"""
打印结果格式如下:
缺口方框坐标: [331.72052001953125, 55.96122741699219, 422.079345703125, 161.7498779296875]
可信度: 0.9513089656829834

坐标原点：图片左上角
缺口方框坐标为缺口方框左上角和右下角距离坐标原点的距离
"""

# 画布是400*200尺寸,而背景图片实际尺寸是380*165
x0 = random.randint(8, 11)
print(x0)
x = int(round((box[0]) - x0) * 380 / 400)
y = get_parms()['y']
print('滑块移动的距离为--->', x, '\t', '滑块y坐标为--->', y)
stamp_time, dx_number, number = get_time()
with open('./main.js', 'r', encoding='utf-8') as f:
    js = f.read()
ac = execjs.compile(js).call('getAc', str(x), str(y), str(get_parms()['sid']))
data = {
    "ac": str(ac),
    "ak": "99de95ad1f23597c23b3558d932ded3c",
    "c": "6825ed74A1gvBDtUH9bsFmzpbLV8WZbN80l2e5x1",
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
# print(len('4898#X8XIRtMZsyfLXRQFF/rQXrm8+24pYErhIX89X64hI9OpDLSvFcMc/RaDIaZzDNW3fcOr/6WjZ2aCaATDf2f9aNORfXfV/Rm/ka2KjjbJFu9y/1TTZ9ayXLnjI8/Nm646O/WjXX07NrtDf7rDcCDkar8XIlHR0ZJtdFG37QjSNpKiGQzQevdqLIqiBl0LNeLsLJY+qSL3ylebxg6so5F0dkEZbWRAm8XeXHxwWVSkp2PmXkA73Mp7AHSRJhUmEOA7l8pmE8UvAOAM3GAvrTIk35ysX8=='))
