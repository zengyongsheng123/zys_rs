import json
import re

import requests

headers = {
    "Accept": "*/*",
    "Accept-Language": "zh",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://tfz.maoyan.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Storage-Access": "active",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://turing.captcha.qcloud.com/cap_union_prehandle"
params = {
    "aid": "194385944",
    "protocol": "https",
    "accver": "1",
    "showtype": "popup",
    "ua": "TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNi4wLjAuMCBTYWZhcmkvNTM3LjM2",
    "noheader": "1",
    "fb": "0",
    "aged": "0",
    "enableAged": "0",
    "enableDarkMode": "0",
    "grayscale": "1",
    "clientype": "2",
    "cap_cd": "",
    "uid": "",
    "lang": "zh",
    "entry_url": "https://tfz.maoyan.com/yamaha/myasverify",
    "elder_captcha": "0",
    "js": "/tcaptcha-frame.c055d939.js",
    "login_appid": "",
    "wb": "2",
    "subsid": "1",
    "callback": "_aq_310057",
    "sess": ""
}
response = requests.get(url, headers=headers, params=params)
# 使用正则表达式提取整个 JSON 内容（去掉 _aq_310057 前缀）
json_match = re.match(r'^_aq_310057\((.*)\)$', response.text, re.DOTALL)
if not json_match:
    print("无法解析 JSON 字符串")
    exit()
# 获取 JSON 内容
json_str = json_match.group(1)
try:
    # 解析 JSON
    json_data = json.loads(json_str)
    # 提取 data 字段
    data_field = json_data.get('data', None)
    data_field = data_field.get('dyn_show_info', None)
    img_url = 'https://turing.captcha.qcloud.com' + data_field['bg_elem_cfg']['img_url']
    slider_url = 'https://turing.captcha.qcloud.com' + data_field['sprite_url']
    with open('img.png', 'wb') as f:
        f.write(requests.get(img_url).content)
    with open('slider.png', 'wb') as f:
        f.write(requests.get(slider_url).content)
except json.JSONDecodeError as e:
    print(f"JSON 解析错误: {e}")

