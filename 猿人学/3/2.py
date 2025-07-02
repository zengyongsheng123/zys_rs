import requests
import jsonpath

session = requests.session()
session.headers = {
    'Content-Length': '0',
    'Accept': '*/*',
    'Referer': 'https://match.yuanrenxue.cn/match/3',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cookie': 'sessionid=66tl43gfdwvdme2c5dgn3xk2loc0isqu',
}

values = []
for index in range(1, 6):
    url = f"https://match.yuanrenxue.com/api/match/3?page={index}"
    session.post('https://match.yuanrenxue.cn/jssm')
    # values.extend([v['value'] for v in session.get(url).json()['data']])
    values.extend(jsonpath.jsonpath(session.get(url).json()['data'], '$..value'))
times = {}
for value in set(values):
    times[value] = values.count(value)
print(max(times, key=lambda t: times[t]))
