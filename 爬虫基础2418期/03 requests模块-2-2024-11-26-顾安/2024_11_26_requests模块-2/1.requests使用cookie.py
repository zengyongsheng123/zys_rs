# -*- coding: utf-8 -*-
# @Time    : 2024/11/26 20:04
# @Author  : 顾安
# @File    : 1.requests使用cookie.py

"""
cookie是标识用户的一个身份信息的一段数据
    服务器会给你返回一个身份信息: cookie(session_id)
        网站后端会维护一个用户身份信息表 (session_id) 去用户身份表中进行session_id的查询

        如果第二次请求网站需要将cookie信息带入到网站后端怎么带？
"""


import requests


url = 'https://www.baidu.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36 Edg/118.0.0.0',
    'Cookie': 'BIDUPSID=3BA9FC01A771AFA7C9BAAF86BA3BB8EE; PSTM=1728558123; H_WISE_SIDS_BFESS=60449_60815_60840; BAIDUID=BD6C9EC3BD750D48D367128322C8BD16:FG=1; BD_UPN=123253; H_PS_PSSID=61027_61140_61160_61219_61223_61207_61211_61208_61214_61242; H_WISE_SIDS=61160; BAIDUID_BFESS=BD6C9EC3BD750D48D367128322C8BD16:FG=1; B64_BOT=1; ZFY=pNKdkfsEH:AqdNE8D0KPT:AajxAcM96rXbM58VPuRTnNo:C; COOKIE_SESSION=39_0_7_7_1_12_1_2_7_5_0_3_0_0_0_0_1732198783_0_1732454975%7C7%230_0_1732454975%7C1; BD_HOME=1; BA_HECTOR=aha020ah2k24a5al2k2k002192jslg1jkbequ1u'
}
response = requests.get(url, headers=headers)
print(response.content.decode())

print(response.request.headers)

