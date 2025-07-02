import requests
import json
from datetime import datetime
from stamptime import generate_sliding_window, to_iso8601



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
params = {
    "id": str(id)
}
data = {
    "bgImageWidth": backgroundImageWidth,
    "bgImageHeight": backgroundImageHeight,
    "sliderImageWidth": sliderImageWidth,
    "sliderImageHeight": sliderImageHeight,
    "startSlidingTime": str(start_time),
    "entSlidingTime": end_time,
    "trackList": [
        {
            "x": 0,
            "y": 0,
            "type": "down",
            "t": 3874
        },
        {
            "x": 2,
            "y": 0,
            "type": "move",
            "t": 3895
        },
        {
            "x": 5,
            "y": 0,
            "type": "move",
            "t": 3903
        },
        {
            "x": 9,
            "y": 0,
            "type": "move",
            "t": 3910
        },
        {
            "x": 15,
            "y": 0,
            "type": "move",
            "t": 3919
        },
        {
            "x": 22,
            "y": 0,
            "type": "move",
            "t": 3926
        },
        {
            "x": 31,
            "y": 1,
            "type": "move",
            "t": 3934
        },
        {
            "x": 42,
            "y": 1,
            "type": "move",
            "t": 3942
        },
        {
            "x": 54,
            "y": 1,
            "type": "move",
            "t": 3950
        },
        {
            "x": 67,
            "y": 1,
            "type": "move",
            "t": 3958
        },
        {
            "x": 80,
            "y": 1,
            "type": "move",
            "t": 3966
        },
        {
            "x": 93,
            "y": 1,
            "type": "move",
            "t": 3975
        },
        {
            "x": 105,
            "y": 1,
            "type": "move",
            "t": 3983
        },
        {
            "x": 117,
            "y": 1,
            "type": "move",
            "t": 3990
        },
        {
            "x": 127,
            "y": 1,
            "type": "move",
            "t": 3998
        },
        {
            "x": 133,
            "y": 1,
            "type": "move",
            "t": 4006
        },
        {
            "x": 139,
            "y": 1,
            "type": "move",
            "t": 4014
        },
        {
            "x": 142,
            "y": 1,
            "type": "move",
            "t": 4022
        },
        {
            "x": 144,
            "y": 1,
            "type": "move",
            "t": 4030
        },
        {
            "x": 145,
            "y": 1,
            "type": "move",
            "t": 4047
        },
        {
            "x": 145,
            "y": 1,
            "type": "move",
            "t": 4319
        },
        {
            "x": 145,
            "y": 1,
            "type": "up",
            "t": 4350
        }
    ],
    "enmiid": str(miid),
    "print": "v3kAK9hecKbx3AeeY4ytzhoZTVLWqt/zcTlvfwvCySBNUU7Xaz2h7G9SC1nVqNc4Njw214vmz9rx+OtARQuzhANNNIGiDql2J+8nzwK+tYzXgh/ZbRV6BKEi0GgC6lhU2QF/SMEp7ra6raIu5BRcRg==",
    "deviceId": str(deviceId),
    "clientUid": "4d39884c-2801-4639-b358-068e6a87317a"
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)