# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:27
# @Author  : 顾安
# @File    : 2.百度翻译.py


import requests

url = 'https://fanyi.baidu.com/basetrans'
form_data = {
    # 对于query中的翻译单词只能是happy, 不能是其他信息
    'query': 'happy',
    'from': 'en',
    'to': 'zh',
    'token': '09c2d4cb2bc02107bcff2f23225f3478',
    'sign': 221212.492333
}

headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    'cookie': 'BIDUPSID=3BA9FC01A771AFA7C9BAAF86BA3BB8EE; PSTM=1728558123; H_WISE_SIDS_BFESS=60449_60815_60840; BAIDUID=BD6C9EC3BD750D48D367128322C8BD16:FG=1; H_PS_PSSID=61027_61140_61160_61219_61223_61207_61211_61208_61214_61242; H_WISE_SIDS=61160; BAIDUID_BFESS=BD6C9EC3BD750D48D367128322C8BD16:FG=1; ZFY=pNKdkfsEH:AqdNE8D0KPT:AajxAcM96rXbM58VPuRTnNo:C; BA_HECTOR=aha020ah2k24a5al2k2k002192jslg1jkbequ1u; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1732623759; HMACCOUNT=F5F4B9BE26A181F2; Hm_lvt_afd111fa62852d1f37001d1f980b6800=1732623759; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1732623823; Hm_lpvt_afd111fa62852d1f37001d1f980b6800=1732623823; ab_sr=1.0.1_ZmRiZjBlNDlmZDMxM2U3NjY3Y2M1NGUxMzJlYmM2Y2ZjZDA5NGM0YzdmYTE3NzNjODI0OGI0ZmZmOTI5ZTQzMDQwYmUxZDJmZDI3NmJkOWU1YTcwNjhkOWJiM2RkOGU3ODI2MjllOWYxMjhlZWJiOGRlZGI0ZDNjYThhZjJjZWU1NWM2Mzk1YzhmNTk4YmM0MmE2ODFkZWFmYTY0YTQyZg=='
}

response = requests.post(url, headers=headers, data=form_data).json()
print(response)

