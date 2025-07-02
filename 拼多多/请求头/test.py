import requests
import json
from curl_cffi import requests

headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "anti-content": "0arAfx5eBwCElPNPpLG-T0pZjhX0sQe0YQi9ntirXAelMNYXSxShN9y0y5WErofc23Pr8wrYSTE_0Aq-zEL0L_JOd3CWC4UFrtOe-bl1Qmx68phhXQPmPo16QXOP68uNpDYfZ0uxQZgRw_T5S5nW2iPh73CWCRUpGNqnixFen0NxuaQ1lpRXNN0dCm3BjVAoBuUzXo3FGSx9qQ0POLHYnl9i6YlZNYGCWTNYoQX8b4yilrEX3NeGNWARmxbQ-DceyEGLEq_UKfZtJJiCOqywG84YGqdySaCyUolYivSd0-FRNZVC7N4VbAmZkBwOkz3VEz1ODMFZkzwOkLVhEM3ZeM2MeB3Ues3TPn0xnpUfktfFeMvVEavRDr3veU3lESL1SKB4VHVTgQYqbOv-gPd09Jy0tavC9fMfcEtszEMMCIl2Td3IAB1_uLefW19O-zXYwTyo0j4W6jys6PqOjXvJslpO-XjseaYZofYd-dn5mJy0g2TPpCxGDgKgLIFT_lZPGmaxq4iXImCx4oQP4THa5GAxpJToNbbtZTZniyOa58oonpf8qAJC8Zv4q_mX3YXTcxpg-yZtCtNy1JtqoG_9xYpDzj74Mi5S6DSqgGV4aaJB2NaXTg9FZhJu-l80Qm-",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://pifa.pinduoduo.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://pifa.pinduoduo.com/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "_nano_fp": "Xpmql0gylpTJn0TjX9_DGQO~3ZTXmg6XGnwuBKLm",
    "api_uid": "ChB6TGeaNXxPJgBvvngPAg==",
    "rckk": "Un6qJ7bJsfptI5LKYt8jArgov2uz2hde",
    "_bee": "Un6qJ7bJsfptI5LKYt8jArgov2uz2hde",
    "ru1k": "467dc588-d895-4bee-a58e-3dc440070b8c",
    "_f77": "467dc588-d895-4bee-a58e-3dc440070b8c",
    "ru2k": "7e2dc5c6-4acc-4bb6-aeb6-99defe64f646",
    "_a42": "7e2dc5c6-4acc-4bb6-aeb6-99defe64f646",
    "webp": "true",
    "VISITOR_PASS_ID": "KTl73WcNVVCINk19JQJcuttXSbYu1MLqod2JVYoMMjvT-HIsIhRMmfSkEIj6oCLymY4wKTVGj52HK8MXo2w9mACAtFz8rNAPSJcroKxK0_U_102cb2d265f"
}
url = "https://pifa.pinduoduo.com/pifa/recommend/queryRecommendGoods"
data = {
    "rn": "569f4497741ab64f45eb34d332345199",
    "page": 9,
    "pageSize": 20,
    "queryApi": ""
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, data=data)

print(response.text)
print(response)