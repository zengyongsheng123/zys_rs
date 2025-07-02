import random
import re
from track_list import generate_trajectory
import requests
import json
from stamptime import generate_sliding_window, to_iso8601
import subprocess
from ocr_img import identify_gap


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "origin": "https://passport.11185.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://passport.11185.cn/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "tfstk": "gRcnLkYwQvyBpLxTBfNBnenprHJ9dWN7V0C827EyQlr_2eZLv4oorqyz8JyF71riV8EeApZrjcisv23-ZA1ol4GpR7LQO2N7anKvM70IR7s6XoritNPalVzPLzJT_K1VgcxvMI3E60xoRnhJtcU7YzPz88WUQF40y7SFa0raQrzAY7or4PyalraPa9zP71r_z7rr478g_lauaukgU_rmafGwf3GSpcFcr9UUKouUjs0jsySQbIZVa_lg-2Zq8t1Paf43KfobRqg8pYubhX3JZ1NKoAParbTVEu2mUXFZThR4C8krH8DOYenqqVo79f8PLokKv5lEna5rSWqgey2CxhqqOVlb_Rd2oVlsv2GiyaRzWmEZRXPkgEN3TkPg5bK1TuDZUXeQNM-uVf0ZTYjrOOWqWQ177UhNFTwU5PqYL7DV9e4voRYMSt9QLPapDFYGFTwU5PqvSFXfVJz_JnC.."
}
url = "https://kks.11185.cn/ZxptRestKks/kks/api/gen"
data = {
    "clientUid": "4d39884c-2801-4639-b358-068e6a87317a",
    "type": "SINGLE_SLIDER"
}
data = json.dumps(data, separators=(',', ':'))
ret = requests.post(url, headers=headers, cookies=cookies, data=data).json()
response = ret['data']['data']
id = response['id']
deviceId = response['deviceId']
backgroundImage = response['captcha']['backgroundImage']
sliderImage = response['captcha']['sliderImage']
backgroundImageWidth = response['captcha']['backgroundImageWidth']
backgroundImageHeight = response['captcha']['backgroundImageHeight']
sliderImageWidth = response['captcha']['sliderImageWidth']
sliderImageHeight = response['captcha']['sliderImageHeight']
webAName = response['captcha']['webAName']
miid = response['captcha']['miid']
rc = response['captcha']['rc']
timestamp = to_iso8601(ret['timestamp'])
print(id, deviceId, backgroundImage, sliderImage, backgroundImageWidth, backgroundImageHeight, sliderImageWidth, sliderImageHeight, timestamp)
end_time, start_time = generate_sliding_window()
url = "https://kks.11185.cn/ZxptRestKks/kks/api/matching"
headers_params = subprocess.run(
            ["node", "222.js", miid, deviceId, rc],
            capture_output=True
        )
strret = headers_params.stdout
# 正则表达式匹配 print 的值
pattern = r'"print":"([^"]+)"'
match = re.search(pattern, strret)
if match:
    print_value = match.group(1)
    print("Extracted print value:", print_value)
else:
    print("No match found for print value")
params = {
    "id": str(id)
}
target_x = identify_gap(requests.get(backgroundImage, headers=headers).content, requests.get(sliderImage, headers=headers).content)*0.55
trajectory = generate_trajectory(target_x, total_time=random.randint(600, 1200))
data = {
    "bgImageWidth": backgroundImageWidth,
    "bgImageHeight": backgroundImageHeight,
    "sliderImageWidth": sliderImageWidth,
    "sliderImageHeight": sliderImageHeight,
    "startSlidingTime": str(start_time),
    "entSlidingTime": str(end_time),
    "trackList": trajectory,
    "enmiid": str(miid),
    "print": str(print_value),
    "deviceId": str(deviceId),
    "clientUid": "4d39884c-2801-4639-b358-068e6a87317a"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)