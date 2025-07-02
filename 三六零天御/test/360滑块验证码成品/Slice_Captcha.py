#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：TestProject 
@File    ：Slice_Captcha.py
@IDE     ：PyCharm 
@Author  ：南宫啸天
@Date    ：2025/1/14 13:01 
'''
import requests, time, random, hashlib, json, re, ddddocr, execjs
from Recover_Picture import restore_sliced_image
from loguru import logger

proxies = {
    # "http": "http://127.0.0.1:8888",
    # "https": "http://127.0.0.1:8888"
}

timestamp = round(time.time() * 1000)
nonce = timestamp + random.randint(0, 99999999)

logger.debug("生成的时间戳为=====>{}", timestamp)
logger.debug("生成的随机数是=====>{}", nonce)

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-cn",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://tianyu.360.cn",
    "Pragma": "no-cache",
    "Referer": "https://tianyu.360.cn/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://captcha.jiagu.360.cn/api/v3/auth"
data = {
    "appId": "dc1db94ea7b3843c",
    "dc": "0",
    "ec": "0",
    "hc": "0",
    "nonce": nonce,
    "os": "3",
    "pc": "0",
    "phone": "10000000000",
    "pn": "com.web.tianyu",
    "rc": "0",
    "sdkName": "360CaptchaSDK",
    "timestamp": timestamp,
    "type": "1",
    "ui": "null",
    "version": "2.0.0",
    "xc": "0",
}
jm_data = \
    re.findall(r'\{(.*?)\}',
               json.dumps(data, separators=(',', ':')).replace(":", "").replace('"', "").replace(",", ""))[0]
# print(jm_data)
data['sign'] = hashlib.md5(jm_data.encode('utf-8')).hexdigest()
response = requests.post(url, headers=headers, data=data, proxies=proxies, verify=False)
# print(response.json())
captchaId = response.json()['data']['captchaId']
token = response.json()['data']['token']
k = response.json()['data']['k']
heigh = response.json()['data']['heigh']

logger.success("k--->{}", k)
logger.success("heigh--->{}", heigh)
logger.success("token--->{}", token)
logger.success("captchaId--->{}", captchaId)

# 下载图片
bg = response.json()['data']['bg'][0]
front = response.json()['data']['front'][0]

# with open('bg.png', 'wb') as f:
#     f.write(requests.get(bg).content)
with open('front.png', 'wb') as f:
    f.write(requests.get(front, proxies=proxies, verify=False).content)
logger.warning("图片下载成功")
restore_sliced_image(bg, "./bg.png", "./recover-bg.png")
logger.warning("图片恢复成功")

ocr = ddddocr.DdddOcr(show_ad=False)
with open('front.png', 'rb') as f:
    target_bytes = f.read()
with open('recover-bg.png', 'rb') as f:
    background_bytes = f.read()
res = ocr.slide_match(target_bytes, background_bytes, simple_target=True)
logger.debug("ddddocr库识别结果--->{}", res)
# x=res['target'][0]
# logger.debug("滑动距离为=====>{}",x)
x = round(int(input("请输入滑动距离：")) * 300 / 544)


def parse_traceData(slide_distance):
    traceData = {}
    x = 0
    t = int(time.time() * 1000)
    y = random.randint(210, 220)
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


traceData = json.dumps(parse_traceData(x), separators=(',', ':'))
logger.debug("轨迹数据为=====>{}", traceData)
report = execjs.compile(open('./main_Code.js', encoding='utf-8').read()).call("rsa_enc", traceData, captchaId, token, k)
logger.debug("加密后的轨迹数据为=====>{}", report)

tracking_value = {
    "UA": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "Screen": [1600, 900],
    "Language": "zh-CN"
}
logger.debug("tracking_value--->{}", tracking_value)
tracking_value = json.dumps(tracking_value, separators=(',', ':'))
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-cn",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://tianyu.360.cn",
    "Pragma": "no-cache",
    "Referer": "https://tianyu.360.cn/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://captcha.jiagu.360.cn/api/v3/check"
data = {
    "captchaId": captchaId,
    "token": token,
    "length": x,
    "version": "2.0.0",
    "width": 300,
    # "report": report,
    "tracking": "[object Object]"
}
logger.debug("data--->{}", data)
response = requests.post(url, headers=headers, data=data, proxies=proxies, verify=False)
logger.success("验证结果为=====>{}", response.json())
if response.json()['data']['result'] == False:
    logger.error("验证失败")
else:
    logger.success("验证成功")
