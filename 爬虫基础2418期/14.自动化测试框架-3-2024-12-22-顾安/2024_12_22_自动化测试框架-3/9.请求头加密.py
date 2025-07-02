# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 21:40
# @Author  : 顾安
# @File    : 9.请求头加密.py


import requests

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://kaoyan.docin.com",
    "Pragma": "no-cache",
    "Referer": "https://kaoyan.docin.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "X-Application": "Pdfreader.Web",
    "X-Nonce": "d987dad2-c862-4e6b-3ff2-535ea7e39b3d",
    "X-Sign": "6CCF90D694B7F2B255B661A0D9F5E2CF",
    "X-Timestamp": "1734874897",
    "X-Token": "null",
    "X-Version": "V2.2",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
}
url = "https://www.handebook.com/api/web/document/list"

json_data = {
    "SearchType": 0,
    "SearchKeyword": "复试仿真模拟",
    "DocumentType": " ",
    "UniversityCode": "",
    "MajorCode": "",
    "ExamSubjectList": [],
    "PageIndex": 2,
    "PageSize": 30
}


response = requests.post(url, headers=headers, json=json_data).json()
print(response)
