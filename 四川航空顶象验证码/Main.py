'''
@File:Main.py
@Autho:南宫啸天
@Date:2025/5/30 16:59 
'''

import requests,time,random,ddddocr,execjs
from loguru import logger
from Picture_Restore import restore_sliding_captcha

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://flights.sichuanair.com",
    "Pragma": "no-cache",
    "Referer": "https://flights.sichuanair.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://rcs.sichuanair.com/dx-captcha/libs/greenseer.js"
params = {
    "_t": "485722"
}
response = requests.get(url, headers=headers, params=params)
with open("greenseer.js", "w") as f:
    f.write(response.text)
logger.success("greenseer.js已下载到本地")

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Origin": "https://flights.sichuanair.com",
    "Pragma": "no-cache",
    "Referer": "https://flights.sichuanair.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://rcs.sichuanair.com/api/a"
params = {
    "w": "300",
    "h": "150",
    "s": "50",
    "ak": "92bb3eed1321e78c48e0774327a1b121",
    "c": "68397348U9Xughb20TlAdQ5aBLRasI7YcwrKDNC1",
    "jsv": "1.3.41.353",
    "aid": f"dx-{int(time.time()*1000)}-{random.randint(0,99999999)}-2",
    "wp": "1",
    "de": "0",
    "uid": "",
    "lf": "0",
    "tpc": "",
    "_r": random.random()
}
resp = requests.get(url, headers=headers, params=params)
logger.success(resp.json())
resp_json=resp.json()
sid=resp_json["sid"]
y=resp_json["y"]
o=resp_json["o"]
bg_url="https://rcs.sichuanair.com"+resp_json["p1"]
fg_url="https://rcs.sichuanair.com"+resp_json["p2"]
p3=resp_json["p3"]
logger.success("sid======>{}",sid)
logger.success("o======>{}",o)
logger.success("y坐标======>{}",y)
logger.success("背景图url======>{}",bg_url)
logger.success("滑块图url======>{}",fg_url)

with open("bg.jpg", "wb") as f:
    f.write(requests.get(bg_url).content)
with open("fg.png", "wb") as f:
    f.write(requests.get(fg_url).content)
logger.warning("验证码图片已保存至本地")

def gen_restore_array(r):
    t = []
    for n, char in enumerate(r):
        if n >= 32:  # 当索引达到32时跳出循环
            break
        i = ord(char)  # 获取字符的Unicode码点
        # 计算模32值并确保其在t中不存在
        while True:
            mod_val = i % 32
            if mod_val in t:
                i += 1
            else:
                break
        t.append(mod_val)
    return t
restore_sliding_captcha(gen_restore_array(o),"bg.jpg","restore_bg.jpg")
ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
with open('fg.png', 'rb') as f:
    target_bytes = f.read()
with open('restore_bg.jpg', 'rb') as f:
    background_bytes = f.read()
res = ocr.slide_match(target_bytes, background_bytes)
# x=round(res['target'][0]*300/400)
dx=int(input("请输入滑块x坐标:"))
x=round(dx*300/400)
logger.debug("识别结果--->{}",res)
logger.debug("滑块x坐标--->{}",res['target'][0])


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-type": "application/x-www-form-urlencoded",
    "Origin": "https://flights.sichuanair.com",
    "Pragma": "no-cache",
    "Referer": "https://flights.sichuanair.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://rcs.sichuanair.com/api/v1"
ac_value=execjs.compile(open("./main.js", "r", encoding="utf-8").read()).call("getAc",x,y,str(sid))
logger.debug("ac值======>{}",ac_value)
data = {
    "ac": ac_value,
    "ak": "92bb3eed1321e78c48e0774327a1b121",
    "c": "68397348U9Xughb20TlAdQ5aBLRasI7YcwrKDNC1",
    "uid": "",
    "jsv": "1.3.41.353",
    "sid": str(sid),
    "aid": f"dx-{int(time.time()*1000)}-{random.randint(0,99999999)}-2",
    "x": str(x),
    "y": str(y)
}
verify_response = requests.post(url, headers=headers, data=data)
logger.success(verify_response.text)
