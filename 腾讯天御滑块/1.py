import json

import requests


headers = {
    "Accept": "*/*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://cloud.tencent.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Storage-Access": "active",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://turing.captcha.qcloud.com/cap_union_prehandle"
params = {
    "aid": "199999861",
    "protocol": "https",
    "accver": "1",
    "showtype": "popup",
    "ua": "TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzNC4wLjAuMCBTYWZhcmkvNTM3LjM2",
    "noheader": "1",
    "fb": "1",
    "aged": "0",
    "enableAged": "0",
    "enableDarkMode": "0",
    "grayscale": "1",
    "clientype": "2",
    "cap_cd": "",
    "uid": "",
    "lang": "zh",
    "entry_url": "https://cloud.tencent.com/product/captcha",
    "elder_captcha": "0",
    "js": "/tcaptcha-frame.c055d939.js",
    "login_appid": "",
    "wb": "2",
    "subsid": "1",
    "callback": "_aq_966358",
    "sess": ""
}
response = requests.get(url, headers=headers, params=params)
r = response.text.split('_aq_966358(')[1].split(')')[0]

r = json.loads(r)
sess = r["sess"]
md5 = r["data"]["comm_captcha_cfg"]["pow_cfg"]["md5"]
prefix = r["data"]["comm_captcha_cfg"]["pow_cfg"]["prefix"]
print(md5, prefix)
r = r["data"]["dyn_show_info"]
background_image_url = 'https://turing.captcha.qcloud.com' + r["bg_elem_cfg"]["img_url"]
sprite_image_url = 'https://turing.captcha.qcloud.com' + r["sprite_url"]

print(f'背景图片地址--->>>{background_image_url}')
print(f'滑块图片地址--->>>{sprite_image_url}')
print(f'sess--->>>{sess}')
print(response)