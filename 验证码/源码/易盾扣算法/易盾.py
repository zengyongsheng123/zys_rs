import base64
import json
import random
import re
import time

import requests

import execjs


def slide_verify(slide_image, background_image, verify_type="20101"):
    # 滑块类型
    # 通用双图滑块  20111
    _headers = {
        'Content-Type': 'application/json'
    }
    _custom_url = "http://api.jfbym.com/api/YmServer/customApi"
    payload = {
        "slide_image": base64.b64encode(slide_image).decode(),
        "background_image": base64.b64encode(background_image).decode(),
        "token": '8Ex4T4HOPaoA2Sl91uhDRjGZc8zS0XzhpCOvwBtkbR4',
        "type": verify_type
    }
    resp = requests.post(_custom_url, headers=_headers, data=json.dumps(payload))
    print(resp.text)
    return resp.json()['data']['data']


def generate_similar_trajectory(num_points):
    trajectory = []
    x = 0
    t = 0
    for i in range(num_points):
        if x >= num_points:
            break
        x = x + random.randint(6, 12)
        y = random.randint(-2, 2)
        t_diff = random.randint(5, 9)
        t += t_diff
        trajectory.append([x, y, t])
    return trajectory


cb = execjs.compile(open('易盾.js', 'r', encoding='utf8').read())
get_data = execjs.compile(open('验证易盾.js', 'r', encoding='utf8').read())
# josn_data = execjs.compile(open('jsonP.js', 'r', encoding='utf8').read()).call('get_jsonp', 0)
headers = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Host': 'c.dun.163yun.com',
    'Referer': 'https://dun.163.com/trial/jigsaw',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.'
                  '3904.108 Safari/537.36'
}
url = "https://c.dun.163.com/api/v3/get"
params = {
    "referer": "https://dun.163.com/trial/jigsaw",
    "zoneId": "CN31",
    "dt": "Mt7aIjLpe51AR1RVVFLUujVr9k5a7Ch9",
    "acToken": "",
    "id": "07e2387ab53a4d6f930b8d9a9be71bdf",
    "fp": 'ctDlEL0nVjcBJL+\W5Cua8jwBGqNmcPWXBHb9Ko3uAWOEwL54Sqfqv3QWxlQyIs1CNziXNXAUQbnJnEf7i\JVOA9KsviYnQi+AgLADLL1qAAZl3sHAvsW1P+sZvYpleTt6BZI6nXhng3DL3n8ktduj1TzqHzoDWzCWeaxke\7Ua7p3hI:'
          + str(int(time.time() * 1000)),
    "https": "true",
    "type": "2",
    "version": "2.27.2",
    "dpr": "1.25",
    "dev": "1",
    "cb": cb.call('get_cb'),
    "ipv6": "false",
    "runEnv": "10",
    "group": "",
    "scene": "",
    "lang": "zh-CN",
    "sdkVersion": "undefined",
    "iv": "4",
    "width": "320",
    "audio": "false",
    "sizeType": "10",
    "smsVersion": "v3",
    "token": "",
    "callback": '__JSONP_gznmfqa_0'
}
# print(params)
response = requests.get(url, headers=headers, params=params)
print(response.text)

data_ = json.loads(re.findall('.*?\((.*?)\);', response.text)[0])
# print(data_)
token = data_['data']['token']
print(token)

open('1.png', 'wb').write(requests.get(data_['data']['front'][0]).content)
open('2.jpg', 'wb').write(requests.get(data_['data']['bg'][0]).content)
# request.urlretrieve(data_['data']['bg'][0], )
distance = int(slide_verify(requests.get(data_['data']['front'][0]).content,
                            requests.get(data_['data']['bg'][0]).content))
print(distance)
k = generate_similar_trajectory(distance)
print(k)

left = k[-1][0] - 10
data_ = get_data.call('get_data', token, k, left)
# print(data_)
# print(token)
get_data1 = {'id': '75f9f716460a422f89a628f50fd8cc2b', 'token': token, 'acToken': '',
             'data': data_,
             'width': '320', 'type': '2', 'version': '2.21.5',
             'cb': cb.call('get_cb'), 'extraData': '', 'runEnv': '20',
             'referer': 'https://cstaticdun.126.net/api/v2/mobile.v2.13.5.html', 'callback': '__JSONP_48mk47t_1'}
print(get_data1)
r = requests.get("https://c.dun.163yun.com/api/v3/check", headers=headers, params=get_data1)

print(r.text)

# https://c.dun.163.com/api/v3/check?referer=https%3A%2F%2Fdun.163.com%2Ftrial%2Fjigsaw&zoneId=CN31&dt=Mt7aIjLpe51AR1RVVFLUujVr9k5a7Ch9&id=07e2387ab53a4d6f930b8d9a9be71bdf&token=ee7e03bd16bb47259d50d0e0ae9142aa&acToken=undefined&data=%7B%22d%22%3A%221X3fvCHddBk6j6HKq%2Bd%2BbKNlHnV0KpE0pE%2B%2Bf1CbeFLxqsvVyskhhLJFOVDhYPuWDCskN4lrP3kzdm%2BM4MP9L5CVyDu6TgmFOPpIYhB8RVoi0SAsUN1dZ%2B22aclq6KF%2B3DUP2LHERft9fCsthe0.ZDPHv.ScLYoen1T1HP.K5LZDG9wBznRLw8c9BdUNwXWsHHikFpQzc48Ru9ZIDJKKVivpgZssd21L6R2ZAVW53lzMZ%2FjWkBAWzvLZtgz6ZyJ2cukAb95avAmzuqK8EJEhqmGgTpnG9NiVnM42e%2F83xlpKajPHZK8kUSL%2B21uvlHJz0OBAkBUPoieGVOcuxA3j54fcnXjeogoiCFo1az9oiALkSDjLUghS8uA0cAx05Tz2QPXuwgwX0jr6beh%2FgniQY0qYISIT8Jx44jrV0D4xnGXc2V4iyRPcejJBh4uljbmfnxSiSPxVOa5vYJMTGlZKV%2FQDn49hFWsrXBLsgE3GP43hu23oK8Xjg9UYV%2BAYFWr9Q4HejwjDJU8tdquo3OOGR1cgbKlgZZO9aV64UAQBP4OPW8F9ku00iNaQ%2F.kDUgOh0tRt58rLufowfhq4bhi0sCBaRHZRrmg8qpxtzWzIIRuIMO5DdZZVFqsStsfKOghIkyDm4krhDvMDljGTYDhPdIRPQm4mAT3u3cxMca%2FSe9fY8X4TDn1QX2r8wG3rEx2TG1v53w.ZD6X09xVrO5z.xVp.jCd.l%2BUj82RaUX%2BJzyhNSFlrDwVDbXYMEb05gUxvmmZKm6Grg%2F4M6taraZlNw5ZzjHZwq.p5gLFKilalGMpA4ztF0J92OMAs91YiJBaWblnRnZ%2FJr5o1ucbPcElpZ2oU.bjY13tTVjBMH1ToPn%2FpUeso8tYIPuc%2FW9tTfzufk2LNwuvrw03gWjBkmiUp1GNyl%22%2C%22m%22%3A%22%22%2C%22p%22%3A%22cQHNoH4m6ymhHR36aJjXAU8y%2BcnlI45xz0JdU1G5w2HAJZ8vW2HFmD599njaBRqJ5v%2FFCWg0fIths%2FjEmPf9RJLtF%2B97%22%2C%22f%22%3A%224922Qt1i%2BE3ehs%2FaNx1SZLGtlm9onKp6IDqfkXydtgNxJThpgnhNtX98Seuxr.rXjZiJaahhzc%2FHxIneE4rOuHRjuWKX42pGhtBt4euK%2FkShEMl.3Gz8NIBANfbJLpxDLBScLJV1CJ4W%2F2ap2liKEuTEF8%2BO4gvXMFrbYP.JXDe%2BmmW2Ur6XT%2BeDriKiz%2B8583QdML%2FVnuQvFbsgtJ%2F%2BWXl1qlm2YesPFrbwYA0k%2BhWwVsCqxnyWfBERV%2FwYNI%2FDeKnTVEb%2F9Y1kbFtx2rbVQK6tQ8ROnmO5CrYi0NpE%2FCDwUhwRV%2FiQMMhk54aJfJl1NxzP%2B2LZMXgPWrC4Wa2GUP08xbAqra1tgegdSehA9mAh1v6HuBRYkYk4MIViX.FgGQ.JjpBW8QN9uJNBOXyHwhUYbiTNdrGaxCANba4UVDvlLp26%22%2C%22ext%22%3A%22VsZb1oYGb2dCHf6wpwHUh1joQECgeVQXBnYIlOOXDRF3hHVGkrM5iJ1JI28TdCfMmP%2Fu2s.O9GtC51Sacbq%2FFEHx5h87%22%7D&width=320&type=2&version=2.27.2&cb=Y5ZOD5MFbrO6BbFihg5zGuCox%2FdqldA5Ij.4K.iBoHQ3MYwKH8TNKJtxRDdG3SF5nOk22PUhwrFfB9WmfU9nB6OMNfc7&extraData=&bf=0&runEnv=10&sdkVersion=undefined&iv=4&callback=__JSONP_zf4lm0q_48