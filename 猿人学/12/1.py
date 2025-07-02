import base64
import requests
import jsonpath
from urllib.parse import quote

headers = {
    "accept": "application/json, text/javascript, */*; q=0.01",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://match.yuanrenxue.cn/match/12",
    "sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\", \"Google Chrome\";v=\"132\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "x-requested-with": "XMLHttpRequest"
}
cookies = {
    "sessionid": "66tl43gfdwvdme2c5dgn3xk2loc0isqu",
    "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738488823",
    "HMACCOUNT": "AB6AFBE38CA7777A",
    "qpfccr": "true",
    "no-alert3": "true",
    "tk": "-5171022550730025884",
    "Hm_lvt_9bcbda9cbf86757998a2339a0437208e": "1738488887",
    "Hm_lpvt_9bcbda9cbf86757998a2339a0437208e": "1738497965",
    "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1738498660"
}


def get_page_data(index):
    # 对 base64 编码后的字符串进行 URL 编码
    encoded_param = quote(base64.b64encode(f'yuanrenxue{index}'.encode()).decode())
    url = f"https://match.yuanrenxue.com/api/match/12?page={index}&m={encoded_param}"

    try:
        response = requests.get(url, headers=headers, cookies=cookies)
        response.raise_for_status()  # 检查请求是否成功
        data = response.json()  # 将响应内容解析为字典
        print(f"Page {index} Data:", data)  # 打印响应数据

        # 使用 jsonpath 提取所有 value
        values = jsonpath.jsonpath(data, '$..value')
        if values:
            return sum(values)
    except requests.exceptions.RequestException as e:
        print(f"请求失败: {e}")
    except ValueError as e:
        print(f"JSON 解析失败: {e}")
    return 0


total_value = 0
for index in range(1, 6):
    total_value += get_page_data(index)

print("Total Value:", total_value)