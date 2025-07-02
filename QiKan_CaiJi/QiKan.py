#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：Verification_Code 
@File    ：QiKan.py
@IDE     ：PyCharm 
@Author  ：南宫啸天
@Date    ：2024/12/14 16:11 
'''

# 导入第三方库
import requests, re, execjs
from loguru import logger

headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'pragma': 'no-cache',
    'priority': 'u=0, i',
    'sec-ch-ua': '"Not(A:Brand";v="99", "Microsoft Edge";v="133", "Chromium";v="133"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
}
cookies = {
    '6HZbKHDjIEcgS': '60J5J_0BPGoV59MgzhZ.NU2JBhyGhfvNPpkMMF6Yn1KUYpkwMGU8uL713bIAhOWUcRUVnNRGvPCj3bBOkZr4Bp6q',
    'tfstk': 'g4GrEOxixQdrxklyxrVF37bBLmP8Z7x_rXZQ-203PuquFYtUTmrjNzaIF2Dqxme7q8HWYWo4D2E7PJMUTmExJua7dvPEDfBSPHhEH6utJbT8OUF-yWFHfhO6f4389s3PXVKjoe4LTzc94-DjyWFHc66WbX0-jUWnfXVHuS43RyV3EkjDuP4ut_2hZtj0DyV3t8V3mi4argXuxD0DuyEcEW2oMVGi9IzaEekKpM12qQeuj4qVt17Tz8bjP91htF4uUl20f64rgzyzj4cWhqCuojG4C-_BjS0th044_B50aRko4r0vY1roCV3sM-_N_-Mm2jyqhgXu77rzIb2Rr_F8Kxl4NbxdBqg4qRPjhKK7d7orBlekHnnEuuina-jyckMslb2qjn1qvJko4rVG4ijLoDgm9YShL84YulT2uUzcS07edmtVp9eJyrr6yaBdp84YulT2u9BLeDU4fUQR.',
    '6HZbKHDjIEcgT': '0cuIA7LTTE9xoOPXkWx3MelDgNy82_f0UMz647EQ3oFAUZvRmUMJ7DNOAH9olPtQD.ehYHBastZ2p0KhNfx8eCjiLR5oEI2ORbIUPBgBIttVk5GtDldthdiaRcrpbBhB9QO3IqfnVlc50xVTrh4yVbPVAEGtCICfLz7tKzbk0FaPsCTsxIUCs9oVbIcC6MUPm2CpwgYVufI7ILUNEX9Hl_vb2BEv2KPeNwO_tGi6FWwiMx80JSXvV6EqXf0QZpQnuUrp8wmU_Rt.e5mleNjcb4zS.ydg6eetFTK61cDg91BKLVNJeI8grXksMIWFVi2AQ',
}
params = {
    'from': 'index',
}
response = requests.get('https://qikan.cqvip.com/Qikan/Journal/JournalGuid', params=params, headers=headers)
rs_ck1 = response.cookies.get_dict()
logger.success("第一次请求首页返回的cookies=====>{}", rs_ck1)

meta_label = re.findall(r'<meta id="(.*?)" content="(.*?)"', response.text)[0]
meta_label_content = meta_label[1]
ts_code = re.findall(r'<script type="text/javascript" r=\'m\'>(.*?)</script>', response.text)[0]
func_code_url = "https://qikan.cqvip.com" + \
                re.findall(r'<script type="text/javascript" charset="utf-8" src="(.*?)" r=\'m\'></script>',
                           response.text)[0]

logger.debug("meta标签的content的值=====>{}", meta_label_content)
logger.debug("外联自执行方法=====>{}", func_code_url)

rs_func_code = requests.get(func_code_url).text
with open('rs_ts.js', 'w', encoding='utf-8') as f:
    f.write(ts_code)
with open('rs_func.js', 'w', encoding='utf-8') as f:
    f.write(rs_func_code)

logger.warning("js文件下载本地成功")

js_code = open("./rs_main.js", "r", encoding="utf-8").read()
rs5_ck2 = execjs.compile(js_code).call("get_cookie").split(";")[0]
rs_ck2 = {
    rs5_ck2.split("=")[0]: rs5_ck2.split("=")[1]
}
logger.debug("第二次生成的cookies值=====>{}", rs_ck2)

rs_cookie = {**rs_ck1, **rs_ck2}
logger.debug("最终提交请求的cookies=====>{}", rs_cookie)
response = requests.get('https://qikan.cqvip.com/Qikan/Journal/JournalGuid', params=params, headers=headers,
                        cookies=rs_cookie)
if response.status_code == 200:
    logger.success("请求成功,状态码=====>{}", response)
    # logger.success("请求成功,响应内容=====>{}",response.text)
else:
    logger.error("请求失败=====>{}", response)

meta_content = re.findall(r'<meta id="(.*?)" content="(.*?)" r=\'m\'>', response.text)[0][1]
logger.debug("第二次请求meta标签的content的值=====>{}", meta_content)
ts_code = re.findall(r'<script type="text/javascript" r=\'m\'>(.*?)</script>', response.text)[0]
func_code_url = "https://qikan.cqvip.com" + \
                re.findall(r'<script type="text/javascript" charset="utf-8" src="(.*?)" r=\'m\'></script>',
                           response.text)[0]

logger.debug("第二个外联自执行方法=====>{}", func_code_url)
rs_func_code = requests.get(func_code_url).text
with open('rs_ts_2.js', 'w', encoding='utf-8') as f:
    f.write(ts_code)
with open('rs_func_2.js', 'w', encoding='utf-8') as f:
    f.write(rs_func_code)

logger.warning("第二次的js文件下载本地成功")

js_code = open("./rs_main.js", "r", encoding="utf-8").read()
rs5_ck2 = execjs.compile(js_code).call("get_cookie").split(";")[0]
rs_ck2 = {
    rs5_ck2.split("=")[0]: rs5_ck2.split("=")[1]
}
logger.debug("第二次生成的cookies值=====>{}", rs_ck2)

rs_cookie = {**rs_ck1, **rs_ck2}
headers = {
    "accept": "text/html, */*; q=0.01",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    "origin": "https://qikan.cqvip.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "6HZbKHDjIEcgS": "60YNtuVVZ9NnQg75jh.fAfpsTlkW2Lux2SGgTqlN67e48khLZXU0ftuc2GgRjORpNaoftKuczsJTgcjFExsOppHG",
    "bbe2fd78a5836b4864": "94ee5fb45ad7f8f15d2d00578ab61262",
    "ASP.NET_SessionId": "jcmxoy2oejkarr1xpqgfdqff",
    "LIBUSERCOOKIE": "Oosn4ui%2b3LJX5JgKzYZ95idPxkVpETqyjRyS8c7iRf0HCVRXosYw7LzYtXoz%2fa2BcXU26V2QLFlxOL0kv7VPUkvzdYaV9EU4zMzj800rsYtQuX9ryhpLIizuSAIe3hk6GwzBwj9ndxfj9gouCCC41nJPa3kz4Aq60ZbfvzhIbdNDO05tHXtM%2bqJFze2iFrDStikRXvCNFPv%2bQzW2WUN9xOfIAQPLKSL4YS3KmKDV3T%2fFz6UwEeqyrbEHVxKK9WHvvcd19xVQ6BAhAJLQacRqoxSzoR7EMSYR3626VyNUBTuxvlJHSOJuhqgEEZuRpCcvbiC4dzcf7RHonQVo68nX3Fy8H71r58sv9oDf%2f9swh4snwMzEF9%2bLYbWtfXfzeKtTUN%2bjQVa59OOLW2iyriU4wf5AcG687H6nVApKWpxlOxY%3d",
    "LIBUSERIDCOOKIE": "0",
    "LIBUSERNAMECOOKIE": "",
    "f6324025fe": "075acf59953577e481a10d15d668f262",
    "Hm_lvt_fee827c3dc795c5122daf5ee854c1683": "1740191408,1742393900",
    "Hm_lpvt_fee827c3dc795c5122daf5ee854c1683": "1742393982",
    "Hm_lvt_17262dc62ce874a510e9c97140f381d6": "1740191408,1742393900",
    "Hm_lpvt_17262dc62ce874a510e9c97140f381d6": "1742393982",
    "__root_domain_v": ".cqvip.com",
    "_qddaz": "QD.151734271367955",
    "_qdda": "3-1.3788s4",
    "_qddab": "3-5pd4xt.m8g0e1eb",
    "user_behavior_flag": "5cb5e0e3-19e9-46a3-9978-379bde5358ec",
    "search_isEnable": "1",
    "6HZbKHDjIEcgT": "0DN.lFwJ42pXUNt_4oizj7i8E5Cm1G.7TunbnK2zqFmSNMzsG1iS5_pLEguYab79tRPTw8Qtifq.i9ggGUzJgFyKO5ibe38sg80YhX0LHS_4HkNtsVmFzwGGmm8GpFPPT7RxDLV_31WcjQs04xpv9Qn2w3ekKfPiaKi.d7ZxQ1jPYIyfdLIWMs3FuswbIgDzXtdHqQ4RtjHKbQ7u8e0ZbTnao2UAoHmINDuC8paeHqeYDnUg_rx931zM4fziKvv7Al7MQXX9Owvoswk2GOd04WsbrWBwOnMKQ9TXNLjhzdf.ECydQq2EXDK6qZtGQ5Y1qCYtfN3iGmabMo3GxmRY_C_meLt5.PSUpjcXFgJxzGv.oguitv1n.VfpbMspAlLm3En42zB8PWSIIUZav0jQQ1FHTO4UoLNVVos994vmXg18bvmHERGx1tdrF1NrumGza.9L52zHFYuhTi108iLaaoBBX3yp9MQdjDdpDC7XOmYen5hYovajd.c3mBJJzttMH",
    "tfstk": "g79rbmgM-YHyClpr-iXUg1mGqVXR3T01qp_CxHxhVablNQgFLE7XFgsBNHA2-EC5r_dS898VkHQ5V6OFLEQvvas5OBWekdFWV2peMJ-9vLiRd0BJ29Bn5VMs53KRpzNRfIpznnjHm7VlZj6cXwmE9VMsC3vxDMwI5LNO1f75x9jlrabm0MsLE92uKm7cYGF3reXn0mSCfMjlqJ40igslKwYhKm-ckMlXsdvK3G5oY5a8bKaUi_QMqZy3QlIPZc-zOJye3g5yK3bVci9V4_7GMHQESLYXxL9RMfNOpnOw8BYm388eqCYhPK0gLwO9e6pRZk0drLKHLTBaxYxVUa5Mh1rKbFx2xC12hcDOUTbkOTKQb4t2UUtJ3HZ3iTWWg1JPIAUlRItwLMJKJx8wqCYHTgobJiYBmpdz-W5lDi7s0myw0oLTYXTjuWFdw0IV50E89WClDi7s0mPL9_Ld0Ni82"
}
data = {
    "searchParamModel": "{\"ObjectType\":7,\"SearchKeyList\":[],\"SearchExpression\":null,\"BeginYear\":null,\"EndYear\":null,\"UpdateTimeType\":null,\"JournalRange\":null,\"DomainRange\":null,\"ClusterFilter\":\"ZY=320#产业经济\",\"ClusterLimit\":0,\"ClusterUseType\":\"Article\",\"UrlParam\":\"\",\"Sort\":\"1\",\"SortField\":null,\"UserID\":\"0\",\"PageNum\":1,\"PageSize\":20,\"SType\":null,\"StrIds\":null,\"IsRefOrBy\":0,\"ShowRules\":\"\",\"IsNoteHistory\":0,\"AdvShowTitle\":null,\"ObjectId\":null,\"ObjectSearchType\":0,\"ChineseEnglishExtend\":0,\"SynonymExtend\":0,\"ShowTotalCount\":0,\"AdvTabGuid\":\"\"}"
}
response = requests.post("https://qikan.cqvip.com/Search/SearchList", headers=headers, cookies=rs_cookie, data=data)
if response.status_code == 200:
    logger.success("请求成功,状态码=====>{}", response)
    logger.success("请求成功,响应内容=====>{}", response.text)
else:
    logger.error("请求失败=====>{}", response)
