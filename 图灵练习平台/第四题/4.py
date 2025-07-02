import requests
import time
import hashlib


def get_md5(text):
    md5 = hashlib.md5()  # 32位
    md5.update(text.encode())
    return md5.hexdigest()


timestamp = str(int(time.time() * 1000))
print(timestamp)

headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://stu.tulingpyton.cn/problem-detail/4/",
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
url = "https://stu.tulingpyton.cn/api/problem-detail/4/data/"
datas = []
for page in range(1, 5):
    sign_text = "tuling" + timestamp + str(page)
    params = {
        "page": str(page),
        "sign": get_md5(sign_text),
        "_ts": timestamp
    }
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    number_info = response.json().get("number_info")[0]['需要求和的数组']
    datas.append(number_info)
print(datas)
random_array = [num for sub_list in datas[-1] for num in sub_list]
array_sum = sum(random_array)
print(array_sum)
