import httpx

client = httpx.Client(http2=True)
client.headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'Cookie': 'Hm_lvt_c99546cf032aaa5a679230de9a95c7db=1728646875; HMACCOUNT=BD815CA35CFECED8; qpfccr=true; no-alert3=true; Hm_lvt_9bcbda9cbf86757998a2339a0437208e=1728646879; tk=8258780053392544352; sessionid=colrxiv39537210iqpe25yqonbxej8s5; yuanrenxue_cookie=1728647008|j2IWzkR0SjEFNNDLGkXnNoHOJ6Y9ZJz9yN8NacPCQOQUy; Hm_lpvt_9bcbda9cbf86757998a2339a0437208e=1728647129; Hm_lpvt_c99546cf032aaa5a679230de9a95c7db=1728647270'
}
# 获取Cookie
client.get(url='https://match.yuanrenxue.cn/match/17')

# 下次请求前注意设置请求头中的Referer
client.headers.update({'Referer': 'https://match.yuanrenxue.cn/match/17'})

total_value = 0
for pid in range(1, 6):
    try:
        res = client.get(url=f'https://match.yuanrenxue.cn/api/match/17?page={pid}')
        res.raise_for_status()  # 检查请求是否成功
        data = res.json()['data']
        print(f"第{pid}页数据:{data}")
        for item in data:
            total_value += item['value']
    except httpx.HTTPStatusError as e:
        print(f"请求失败，状态码: {e.response.status_code}")
        print(f"响应内容: {e.response.text}")
    except ValueError as e:
        print(f"JSON解析失败: {e}")
        print(f"响应内容: {res.text}")

print(f"求和：{total_value}")
