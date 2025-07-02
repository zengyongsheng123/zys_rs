import requests
import json
import execjs
import time

timestamp = int(time.time())

# 读取并编译 JavaScript 代码
with open("豆丁考研.js", "r", encoding="utf-8") as f:
    js_code = f.read()
js = execjs.compile(js_code)

# 请求的基础数据
base_data = {
    "SearchType": 0,
    "SearchKeyword": "复试",
    "DocumentType": " ",
    "UniversityCode": "",
    "MajorCode": "",
    "ExamSubjectList": [],
    "PageSize": 30
}
# 请求 URL
url = "https://www.handebook.com/api/web/document/list"
# 循环请求每一页
for page_index in range(1, 12):
    data = base_data.copy()
    data["PageIndex"] = page_index
    data_json = json.dumps(data, separators=(',', ':'))
    try:
        data1 = js.call('get_data', data_json)
        print("生成的动态参数：", data1)  # 输出动态参数
        # 请求头
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh,zh-CN;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Origin": "https://kaoyan.docin.com",
            "Pragma": "no-cache",
            "Referer": "https://kaoyan.docin.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "cross-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
            "X-Application": "Pdfreader.Web",
            "X-Nonce": data1["X-Nonce"],
            "X-Sign": data1["X-Sign"],
            "X-Timestamp": data1["X-Timestamp"],  # 时间戳timestamp),
            "X-Token": "null",
            "X-Version": "V2.2",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }

        response = requests.post(url, headers=headers, data=data_json)
        print(f"请求第{page_index}页：{response.status_code}")
        if response.status_code == 200:
            print("返回的JSON数据：", response.json())
        else:
            print(f"请求失败，状态码：{response.status_code}, 错误信息：{response.text}")
    except Exception as e:
        print(f"请求第{page_index}页时发生异常：{e}")
