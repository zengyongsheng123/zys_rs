import requests
import time
import random
import hashlib
import execjs
import ddddocr
from restore import process_image
timestamp = int(time.time() * 1000)
# nonce是时间戳（13位整数）+随机数（8位随机整数）相加之后的结果
nonce = timestamp + random.randint(10000000, 99999999)
print(nonce)
# print(stamp_time)
headers = {
    "accept": "*/*",
    "accept-language": "zh-cn",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://tianyu.360.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://tianyu.360.cn/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
url = "https://captcha.jiagu.360.cn/api/v3/auth"


# md5加密
# "appId dc1db94ea7b3843cdc0ec0hc0 nonce 1746713414644 os 3 pc 0 phone 10000000000 pn com.web.tianyu rc 0 sdkName 360CaptchaSDK timestamp 1746707422322 type 1 ui null version 2.0.0 xc 0"
def generate_sign(data):
    # 排除 sign 键
    keys = sorted([key for key in data.keys() if key != "sign"])
    # 拼接字符串：key=value
    sign_string = "".join(f"{key}{data[key]}" for key in keys)
    # 计算 MD5
    md5_hash = hashlib.md5(sign_string.encode('utf-8')).hexdigest()
    return sign_string, md5_hash


# 生成轨迹
def parse_traceData(slide_distance):
    traceData = {}
    x = 0
    t = timestamp
    y = random.randint(210, 230)
    traceData[str(x)] = {'t': t, 'y': y}
    while x < slide_distance:
        x += random.randint(1, 5)
        t += random.randint(10, 20)
        if x >= slide_distance:
            x = slide_distance
            traceData[str(x)] = {'t': t, 'y': y + random.randint(-1, 1)}
            break
        traceData[str(x)] = {'t': t, 'y': y + random.randint(-1, 1)}
    return [traceData]


# 输入数据
auth_data = {
    "appId": "dc1db94ea7b3843c",
    "type": "1",
    "version": "2.0.0",
    "pn": "com.web.tianyu",
    "os": "3",
    "sdkName": "360CaptchaSDK",
    "timestamp": str(timestamp),
    "nonce": str(nonce),
    "ui": "null",
    "rc": "0",
    "pc": "0",
    "ec": "0",
    "hc": "0",
    "xc": "0",
    "dc": "0",
    "phone": "10000000000"
}

# 执行并验证
sign_string, calculated_sign = generate_sign(auth_data)
auth_data['sign'] = calculated_sign
response = requests.post(url, headers=headers, data=auth_data)
data_auth = response.json().get("data")
# 背景图
bg_url = data_auth.get("bg")[0]
# 滑块图
slider_url = data_auth.get("front")[0]
# token
token = data_auth.get("token")
# captchaId
captchaId = data_auth.get("captchaId")
# K值
k = data_auth.get("k")
print('背景图地址--->', bg_url, '\n', '滑块图地址--->', slider_url, '\n', 'token值为:', token, '\n', 'captchaId值为:',
      captchaId, '\t', 'k值为:', k)

url_verify = "https://captcha.jiagu.360.cn/api/v3/check"
with open('main.js', 'r', encoding='utf-8') as f:
    js_code = f.read()
js_code = execjs.compile(js_code)
# 未还原之前的背景图名称后缀
array_bg = bg_url.split('/')[7].split('.')[0]
# print('array_bg值为:', array_bg)
# 将图片保存在本地
with open('slide.png', 'wb') as f:
    slide = f.write(requests.get(slider_url).content)
with open('background.png', 'wb') as f:
    background = f.write(requests.get(bg_url).content)
process_image('background.png',  array_bg)
with open('slide.png', 'rb') as f:
    slide = f.read(slide)
with open('restore_bg.png', 'rb') as f:
    restore_bg = f.read()
ocr = ddddocr.DdddOcr(show_ad=False)
slide_distance = int(ocr.slide_match(slide, restore_bg, simple_target=False)['target'][0]*300/544)
print('滑动距离为:', slide_distance)

track = parse_traceData(slide_distance)
report = js_code.call('get_rsa_enc', k, track, captchaId, token)
verify_data = {
    "captchaId": str(captchaId),
    "token": str(token),
    "length": str(slide_distance),
    "version": "2.0.0",
    "width": "300",
    "report": report,
    "tracking": "[object Object]"
}
response = requests.post(url_verify, headers=headers, data=verify_data)

print(response.text)
# print(response)
