import requests
import json
import execjs

# 读取并编译 JavaScript 代码
with open('宝钢.js', encoding='utf-8') as f:
    js_code = f.read()

js = execjs.compile(js_code)
for i in range(1, 11):
    # 构造请求数据
    data = {
        "pageNo": i,
        "pageSize": 12,
        "condition": {
            "nodeId": 436
        }
    }

    # 将数据转换为 JSON 字符串
    data_json = json.dumps(data, ensure_ascii=False, separators=(',', ': '))

    # 获取动态生成的头部数据
    code = js.call('get_data', data_json)
    # print(code)

    # 构建请求头
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "zh,zh-CN;q=0.9",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Content-Md5": code["Content-Md5"],
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "https://www.baosteel.com",
        "Pragma": "no-cache",
        "Referer": "https://www.baosteel.com/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "x-date": str(code["x-date"]),
        "x-nonce": code["x-nonce"],
        "x-signature": code["x-signature"],
        "x-user": code["x-user"]
    }

    # 请求 URL
    url = "https://cmsauth.baowugroup.com/v1/web/api/content/list"

    # 请求参数
    params = {
        "domainId": "12"
    }

    # 发送 POST 请求
    response = requests.post(url, headers=headers, params=params, data=data_json)  # 使用 'data' 而不是 'json'

    # 输出响应结果
    print(response.text)
    print(response)
