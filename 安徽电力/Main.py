#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：TestProject 
@File    ：Main.py
@IDE     ：PyCharm 
@Author  ：南宫啸天
@Date    ：2025/3/28 18:49 
'''
import execjs
import json
import re
import requests
import time
from loguru import logger

headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://pmos.ah.sgcc.com.cn:20080/"
response = requests.get(url, headers=headers)
rs_ck1 = response.cookies.get_dict()
logger.success("瑞数cookies1======>{}", rs_ck1)
# logger.success(response.text)

meta_label = re.findall(r'<meta id="(.*?)" content="(.*?)"', response.text)[0]
meta_label_content = meta_label[1]
ts_code = re.findall(r'<script type="text/javascript" r=\'m\'>(.*?)</script>', response.text)[0]
func_code_url = "https://pmos.ah.sgcc.com.cn:20080" + \
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

js_code = open("./rs_mains2.js", "r", encoding="utf-8").read()
rs5_ck2 = execjs.compile(js_code).call("get_cookie").split(";")[0]
rs_ck2 = {
    rs5_ck2.split("=")[0]: rs5_ck2.split("=")[1]
}
logger.debug("第二次生成的cookies值=====>{}", rs_ck2)

rs_cookie = {**rs_ck1, **rs_ck2}
logger.debug("最终提交请求的cookies=====>{}", rs_cookie)
timestamp = str(int(time.time() * 1000))
logger.debug("时间戳---->>>>>>>>", timestamp)

response = requests.get("https://pmos.ah.sgcc.com.cn:20080/?2XHa1niT8Vwo=" + timestamp,
                        headers=headers, cookies=rs_cookie)
response.encoding = "utf-8"
alteonp = response.cookies.get_dict()
if response.status_code == 200:
    logger.success("请求成功,状态码=====>{}", response)
    logger.success("请求成功,响应内容=====>{}", response.text)
    logger.success("请求成功,响应ck=====>{}", alteonp)
    meta_label = re.findall(r'<meta id="(.*?)" content="(.*?)"', response.text)[0]
    meta_label_content = meta_label[1]
    ts_code = re.findall(r'<script type="text/javascript" r=\'m\'>(.*?)</script>', response.text)[0]
    func_code_url = "https://pmos.ah.sgcc.com.cn:20080" + \
                    re.findall(r'<script type="text/javascript" charset="utf-8" src="(.*?)" r=\'m\'></script>',
                               response.text)[0]
    logger.debug("meta标签的content的值=====>{}", meta_label_content)
    logger.debug("外联自执行方法=====>{}", func_code_url)
    rs_func_code = requests.get(func_code_url).text
    with open('rs_ts_2.js', 'w', encoding='utf-8') as f:
        f.write(ts_code)
    with open('rs_func_2.js', 'w', encoding='utf-8') as f:
        f.write(rs_func_code)
    logger.warning("js文件下载本地成功")
else:
    logger.error("请求失败=====>{}", response)

js_code = open("./rs_mains2.js", "r", encoding="utf-8").read()
rs5_ck2 = execjs.compile(js_code).call("get_cookie").split(";")[0]
rs_ck2 = {
    rs5_ck2.split("=")[0]: rs5_ck2.split("=")[1]
}
rs_cookie2 = {**rs_cookie, **rs_ck2}
logger.debug("[2]最终提交请求的cookies=====>{}", rs_cookie2)
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "ClientTag": "OUTNET_BROWSE",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "CurrentRoute": "/outNet",
    "Intercept-Headers": "SKIP",
    "Origin": "https://pmos.ah.sgcc.com.cn:20080",
    "Pragma": "no-cache",
    "Referer": "https://pmos.ah.sgcc.com.cn:20080/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "X-Ticket": "undefined",
    "X-Token": "null",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
params = {
    # "a3KfuFO3": "03ZNrxqlqWlo6vbHHoGL2kwq.Tbeyxib9paramsSrp8ibROP8LXRmkFex4SM.NY.2h5GxsO5tNpRzglW1cgIkisUpurfQlHWQg8q3YApQpEhlq053XgZnxTeKNrUa"
}
data = {
    "data": {
        "marketName": "",
        "newMarketCode": "",
        "newUrl": "",
        "oldUrl": ""
    },
    "pageInfo": {
        "pageSizes1": [
            "20",
            "50",
            "100",
            "200",
            "500",
            "1000"
        ],
        "pageSizes": [
            20,
            50,
            100,
            200,
            500,
            1000
        ],
        "pageSize": 100,
        "pageNum": 1
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post("https://pmos.ah.sgcc.com.cn:20080/px-common-authority/marketMapping/selectByCondition",
                         headers=headers, cookies=rs_cookie2, params=params, data=data)
response.encoding = "utf-8"
if response.status_code == 200:
    logger.success("[2]请求成功,状态码=====>{}", response)
    logger.success("[2]请求成功,响应内容=====>{}", response.text)
else:
    logger.error("[2]请求失败=====>{}", response)
