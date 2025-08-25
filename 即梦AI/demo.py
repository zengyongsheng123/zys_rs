import requests
import json


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9",
    "app-sdk-version": "48.0.0",
    "appid": "513695",
    "appvr": "5.8.0",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "device-time": "1756126564",
    "lan": "zh-Hans",
    "loc": "cn",
    "origin": "https://jimeng.jianying.com",
    "pf": "7",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://jimeng.jianying.com/ai-tool/home/",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sign": "bae6f752e5aba5898cd9a11a06d41359",
    "sign-ver": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36"
}
cookies = {
    "_tea_web_id": "7542505916283176475",
    "x-web-secsdk-uid": "179a2886-b208-4147-a418-53b322a614e5",
    "_tea_utm_cache_513695": "{%22utm_source%22:%22bing%22%2C%22utm_medium%22:%22bingpc%22%2C%22utm_campaign%22:%22ppc%22}",
    "s_v_web_id": "verify_mer4e1h5_dQ4B8Cq4_36Wj_4AXi_8c1O_l8MfAVuVeqvC",
    "uifid_temp": "dea8e0b149a544d16d5fb76a641a0702d32e88f6d7c03a4deaa905e8979fce4343c50438bb4470fda04b59771e278c8bef5459005b00a78dae87b66d4948843a1f8b2dc61ce263b2b2ee312978335938",
    "fpk1": "9f47a6df018750e609c7b02658b093db2d8438f509983d3a7f7735930133d23760c9fc863bc0e0f0c95147a01f887906",
    "_tea_utm_cache_2018": "{%22utm_source%22:%22bing%22%2C%22utm_medium%22:%22bingpc%22%2C%22utm_campaign%22:%22ppc%22}",
    "uifid": "dea8e0b149a544d16d5fb76a641a0702d32e88f6d7c03a4deaa905e8979fce4343c50438bb4470fda04b59771e278c8bfd4c0447919eb4057b10e199e8ed5a9d15d142816699146a02bc98e0d0d014edfc9ea4c0f40b346395d6043f4fcf4e080d1666d7056fe205bdec74a902695361b13d85aeef3e654e630463668d9ca02042a85cf161b2268db88383abe0fb7e8ad51f7c66df0e91b5560baef272e7c21930db3debedcdec9aab51bf8c189979fc",
    "_uetsid": "c319ac6081b211f0a9b2efeb5c33db04",
    "_uetvid": "c319c60081b211f0bdc833e536d7faa5",
    "_uetmsclkid": "_uetbaf90cdda8f510693ee36471f5c2dfae",
    "ttwid": "1|NXyc_StICMrB3Z8_IkAyDplco4f48GG-4QORdRfReqw|1756126548|3fac0c4425bbbefed599bc16403dccc3db9be4211846189f34edbc2cc6d9dcf7"
}
url = "https://jimeng.jianying.com/mweb/v1/get_explore"
params = {
    "aid": "513695",
    "web_version": "6.6.0",
    "da_version": "3.2.8",
    "aigc_features": "app_lip_sync",
    "msToken": "bcoo9kfqlL4j4xa_XqslxDav1qQENQ-E0FZcNbqE4St1_TRd08l3W6qpfb0rQMd6Bd4-vLoCnVjHBiPPUSeyyOslV2zkvxt7Hp1KgLYM_nos3rxtRr9XjQ==",
    "a_bogus": "D7lQvchGMsm1KI/IB7kz9eatkCm0YWREgZENQJ-HXUoD"
}
data = {
    "count": 40,
    "filter": {
        "work_type_list": [
            "video",
            "image",
            "canvas"
        ]
    },
    "offset": 60,
    "image_info": {
        "width": 2048,
        "height": 2048,
        "format": "webp",
        "image_scene_list": [
            {
                "scene": "smart_crop",
                "width": 240,
                "height": 240,
                "format": "webp",
                "uniq_key": "smart_crop-w:240-h:240"
            },
            {
                "scene": "smart_crop",
                "width": 320,
                "height": 320,
                "format": "webp",
                "uniq_key": "smart_crop-w:320-h:320"
            },
            {
                "scene": "smart_crop",
                "width": 480,
                "height": 480,
                "format": "webp",
                "uniq_key": "smart_crop-w:480-h:480"
            },
            {
                "scene": "smart_crop",
                "width": 480,
                "height": 320,
                "format": "webp",
                "uniq_key": "smart_crop-w:480-h:320"
            },
            {
                "scene": "smart_crop",
                "width": 240,
                "height": 160,
                "format": "webp",
                "uniq_key": "smart_crop-w:240-h:160"
            },
            {
                "scene": "smart_crop",
                "width": 160,
                "height": 213,
                "format": "webp",
                "uniq_key": "smart_crop-w:160-h:213"
            },
            {
                "scene": "smart_crop",
                "width": 320,
                "height": 427,
                "format": "webp",
                "uniq_key": "smart_crop-w:320-h:427"
            },
            {
                "scene": "loss",
                "width": 1080,
                "height": 1080,
                "format": "webp",
                "uniq_key": "1080"
            },
            {
                "scene": "loss",
                "width": 900,
                "height": 900,
                "format": "webp",
                "uniq_key": "900"
            },
            {
                "scene": "loss",
                "width": 720,
                "height": 720,
                "format": "webp",
                "uniq_key": "720"
            },
            {
                "scene": "loss",
                "width": 480,
                "height": 480,
                "format": "webp",
                "uniq_key": "480"
            },
            {
                "scene": "loss",
                "width": 360,
                "height": 360,
                "format": "webp",
                "uniq_key": "360"
            },
            {
                "scene": "normal",
                "width": 2048,
                "height": 2048,
                "format": "webp",
                "uniq_key": "2048"
            }
        ]
    },
    "category_id": 11222,
    "feed_refer": "feed_loadmore"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)