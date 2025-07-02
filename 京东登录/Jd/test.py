import base64
import re
import time
from slider_trajectory_generator import generate_slider_trajectory



from captcha_recognizer.recognizer import Recognizer
# import requests
from curl_cffi import requests
import json
import random
from slide_guiji import generate_b, generate_human_track
from getCoordinate import getCoordinate
import execjs

# 生成0到1之间的随机数，保留18位小数


callback = 'jsonp_' + str(round(random.random(), 18)).replace(".", "")
print(callback)
# requests = requests.session
headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "referer": "https://passport.jd.com/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "__jdu": "1747480632022643117267"
}
url = "https://iv.jd.com/slide/g.html"
params = {
    "appId": "1604ebb2287",
    "scene": "login",
    "product": "click-bind-suspend",
    "e": "MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSI",
    "j": "",
    "lang": "zh_CN",
    "callback": callback
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

data = json.loads(re.findall(r"\((.*?)\)", response.text)[0])
challenge = data["challenge"]
bg = data["bg"]
patch = data["patch"]
y = data["y"]
bg = base64.b64decode(bg)
patch = base64.b64decode(patch)
print(y)
with open("bg.jpg", "wb") as f:
    f.write(bg)
with open("patch.jpg", "wb") as f:
    f.write(patch)
box, confidence = Recognizer().identify_gap(source='bg.jpg', verbose=False)
print(box, confidence)
distance = int(box[0]*342/360)
print(distance)
# 调用函数，生成轨迹
trajectory = generate_slider_trajectory(
        start_x=1027,
        start_y=184,
        distance=distance,  # 滑动 150 像素
        duration_ms=1200,
        width=342
    )
# data_track = generate_b(distance=distance,  duration=random.randint(1000, 2500))
print(trajectory)
dd = getCoordinate(trajectory)
url = "https://iv.jd.com/slide/s.html"
params = {
    "d": str(dd),
    "c": str(challenge),
    "w": "342",
    "appId": "1604ebb2287",
    "scene": "login",
    "product": "click-bind-suspend",
    "e": "MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSI",
    "j": "",
    "s": "581220970577761168",
    "o": "1362525636",
    "o1": "0",
    "u": "https://passport.jd.com/new/login.aspx?ReturnUrl=https%3A%2F%2Fhome.jd.com%2Findex.html",
    "lang": "zh_CN",
    "callback": str(callback)
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)