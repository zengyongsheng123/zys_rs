import requests
from curl_cffi import requests

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
    "Sec-Fetch-Storage-Access": "none",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://turing.captcha.qcloud.com/cap_union_prehandle"
params = {
    "aid": "194385944",
    "protocol": "https",
    "accver": "1",
    "showtype": "popup",
    "ua": "TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEzOC4wLjAuMCBTYWZhcmkvNTM3LjM2",
    "noheader": "1",
    "fb": "0",
    "aged": "0",
    "enableAged": "0",
    "enableDarkMode": "0",
    "grayscale": "1",
    "clientype": "2",
    "userLanguage": "zh-tw",
    "aidEncrypted": "",
    "cap_cd": "",
    "uid": "",
    "lang": "zh",
    "entry_url": "https://tfz.maoyan.com/yamaha/myasverify",
    "elder_captcha": "0",
    "js": "/tgJCap.7fd83034.js",
    "login_appid": "",
    "wb": "2",
    "subsid": "1",
    "callback": "_aq_771140",
    "sess": ""
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)