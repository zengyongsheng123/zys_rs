import time
import execjs
import requests
import json
timestamp = str(int(time.time() * 1000))
print(timestamp)
js = execjs.compile(open('./demo.js', encoding='utf-8').read())
headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://stu.tulingpyton.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://stu.tulingpyton.cn/problem-detail/5/",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36"
}
cookies = {
    "sensorsdata2015jssdkcross": "%7B%22%24device_id%22%3A%221939ed480a6a77-0c2355a5bffe38-26011851-2073600-1939ed480a72445%22%7D",
    "csrftoken": "fWLDSy9wcjFhQxmPLxPL2UKYnMtx8KX1",
    "sessionid": "byrd37fnqr2j51jbwu8ytqsr2oq120eo"
}

datas = []
for page in range(1, 5):
    url = "https://stu.tulingpyton.cn/api/problem-detail/5/data/?page={}".format(page)
    params = {
        "page": str(page),
        "_ts": timestamp
    }
    params = json.dumps(params, separators=(',', ':'))
    xl = js.call("get_xl", params)
    print(xl)
    data = {
        "xl": xl
    }
    # print(data)
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, cookies=cookies, data=data)
    number_info = response.json().get("number_info")[0]['需要求和的数组']
    datas.append(number_info)
print(datas)
random_array = [num for sub_list in datas[-1] for num in sub_list]
array_sum = sum(random_array)
print(array_sum)
