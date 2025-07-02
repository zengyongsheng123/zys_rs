# -*- coding: utf-8 -*-
import requests
import execjs
import time


def get_m_value():
    with open('./1.js', 'r', encoding='utf-8') as f:
        js_code = f.read()
    ctx = execjs.compile(js_code)
    return str(ctx.call('get_m'))


def fetch_page(page, m):
    url = "https://match.yuanrenxue.cn/api/match/1"
    params = {
        "page": str(page),
        "m": m
    }
    headers = {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "referer": "https://match.yuanrenxue.cn/match/1",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest"
    }
    cookies = {
        "sessionid": "zxpf7qnkb91ogtlsj1m4ut58bgfwj73d",
        "Hm_lvt_c99546cf032aaa5a679230de9a95c7db": "1738474078",
        "Hm_lpvt_c99546cf032aaa5a679230de9a95c7db": "1738474078",
        "HMACCOUNT": "5CB104E01BBBF634",
        "qpfccr": "true",
        "no-alert3": "true"
    }
    try:
        response = requests.get(url, headers=headers, cookies=cookies, params=params)
        response.raise_for_status()  # 如果响应状态码不是200，抛出异常
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"请求第 {page} 页时出错: {e}")
        return None


def main():
    total = 0
    num = 0
    for page in range(1, 6):
        m = get_m_value()  # 每次请求都重新生成 m 值
        data = fetch_page(page, m)
        if data:
            print('请求第 {} 页结果：'.format(page), data)
            items = data['data']
            for item in items:
                total += item['value']
            num += len(items)
        time.sleep(1)  # 根据需要调整等待时间

    if num > 0:
        print('所有机票价格的平均值: ', total / num)
    else:
        print('没有获取到任何数据')


if __name__ == "__main__":
    main()
