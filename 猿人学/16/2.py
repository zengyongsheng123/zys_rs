import os
import time
import execjs
import requests
import jsonpath

os.environ["EXECJS_RUNTIME"] = "Node"

headers = {
    'cookie': 'sessionid=ducerglhx2o1ham9g67slbqn2p76vpu1',
    'User-Agent': 'yuanrenxue.project'
}

js = open('2.js', 'r', encoding='utf-8').read()

value = 0
for index in range(1, 6):
    t = int(time.time()) * 1000
    url = f"https://match.yuanrenxue.cn/api/match/16?page={index}&m={execjs.compile(js).eval(f'btoa({repr(str(t))})')}&t={t}"
    # value += sum(v['value'] for v in requests.get(url, headers=headers).json()['data'])
    value += sum(jsonpath.jsonpath(requests.get(url, headers=headers).json(), '$..value'))
print(value)
