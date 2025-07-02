import requests

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh",
    "cache-control": "no-cache",
    "origin": "https://www.douyin.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.douyin.com/",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "uifid": "fd93a02f3f52f94d15e514b5060909b7718dbdccf5e652d020e98a2368c5c67f7b1dbb7cb49d9d8aa214d7c4180213695af63b6bf6a8f37fdf13195aa63498f8a9f78b843a623031a4523e28ff1f7d904211846d1156dd0c6ce013ccb677351567479bf68d4bfd3b1e38456a7bf59a542b2f349af2c697a4085684eeb22c4eabaae79041208bccdcec6a341dbb737d1b01eec64decc6c42eb7c115739db58d1c",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
}
url = "https://www-hj.douyin.com/aweme/v1/web/danmaku/get_v2/"
params = {
    "device_platform": "webapp",
    "aid": "6383",
    "channel": "channel_pc_web",
    "app_name": "aweme",
    "format": "json",
    "group_id": "7404395817399880997",
    "item_id": "7404395817399880997",
    "start_time": "0",
    "end_time": "32000",
    "authentication_token": "MS4wLjAAAAAA2cqPudkTmqTck-8CkhjdhDz29FKf8663k-hKQqSgIGAQiPRltD6Tg_sRTQzpJEFMiK0RQRzPM74aDrUOt3ZvgSNBqFbIv9rMxV6hjApKFknKBi2QHNl9iFRYoOGgWzvouEid2c_4zTTsgSVMCqVoJjNlLKb8ngavONFOCGSvWtLlYm4z2ru0iotoWP7dYi5TkAYGvTjdVK86DF9UjuTOsYPKl1C2s1br98LihWTB9qgzV7KkJK2AbyFlXsnE4HXY",
    "duration": "83871",
    "update_version_code": "170400",
    "pc_client_type": "1",
    "pc_libra_divert": "Windows",
    "support_h265": "1",
    "support_dash": "1",
    "version_code": "170400",
    "version_name": "17.4.0",
    "cookie_enabled": "true",
    "screen_width": "1920",
    "screen_height": "1080",
    "browser_language": "zh",
    "browser_platform": "Win32",
    "browser_name": "Chrome",
    "browser_version": "133.0.0.0",
    "browser_online": "true",
    "engine_name": "Blink",
    "engine_version": "133.0.0.0",
    "os_name": "Windows",
    "os_version": "10",
    "cpu_core_num": "16",
    "device_memory": "8",
    "platform": "PC",
    "downlink": "10",
    "effective_type": "4g",
    "round_trip_time": "50",
    "webid": "7478202530745484811",
    "uifid": "fd93a02f3f52f94d15e514b5060909b7718dbdccf5e652d020e98a2368c5c67f7b1dbb7cb49d9d8aa214d7c4180213695af63b6bf6a8f37fdf13195aa63498f8a9f78b843a623031a4523e28ff1f7d904211846d1156dd0c6ce013ccb677351567479bf68d4bfd3b1e38456a7bf59a542b2f349af2c697a4085684eeb22c4eabaae79041208bccdcec6a341dbb737d1b01eec64decc6c42eb7c115739db58d1c",
    # "msToken": "UuPTipC1AL5aPb7rh3CIepD7il2wVkfneUKft2-QyU2MByJDiaCmLqRWJoMH4rVvZ8nIhnZHIF1CrGX935j5nMMZuLIsdJr8vtZY3ecYIuXD5Np3hkhcISv3rzOeGk9VTf03M8YWNrthR4y4y6Js-n85glUguNMrEk_EqZqNEiCpTD87_XLKjw==",
    # "a_bogus": "YXUfk7ywEq/bOd/SuCOjyU2lBuolrsuyGBidRHOP7NKqGXlGtRNqDNcuaowSHYprZSBkwKBH2ne/Ofdc/sUhZorpumpkuTG6iG/9Iymo2ZH2Yak2JrfmSGtEFiTY0SGY85AUE265AsMK2E5WnrChABM7u/lxRbEdFr-GV2TjO9u4US8jhx/Ca5GkOwTqLD==",
    "verifyFp": "verify_m7viki13_DrGqRUbt_pdjC_4NXX_AuMq_PjN1Trl05mKc",
    "fp": "verify_m7viki13_DrGqRUbt_pdjC_4NXX_AuMq_PjN1Trl05mKc"
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)

"eljFU7GryeL6zEEBHjFIs3AHpXNcJzSUnir7fZHrkWCSemLvVdIDfEHehCnKh2buH4oJSaCE7LEhG_tHjhcoMdqbbQgLoXm7glizbfmVjpA3GIM3biAgk_Kq_wTtaJXr0qC7oj8yo0ZJ6ebe2gbb5o36BQ5rHCF4m5JxHo7dH848oBTi5fA8Pw=="
