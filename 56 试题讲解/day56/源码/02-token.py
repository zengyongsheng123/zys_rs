import requests


headers = {
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9",
    "app-type": "web",
    "cache-control": "no-cache",
    # "devid": "afdc5e0a-a228-4e34-a5fe-42495b228f2d",
    # "ok-timestamp": "1732107152529",
    # "ok-verify-sign": "L5zTkhReTuiYkpnVHV3Xt6D++0tr05I8KO2hicTANUA=",
    # "ok-verify-token": "2634110d-4e50-4618-b67a-5cf106bf3cc6",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.oklink.com/zh-hans/btc/tx-list/page/3",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "x-apikey": "LWIzMWUtNDU0Ny05Mjk5LWI2ZDA3Yjc2MzFhYmEyYzkwM2NjfDI4NDMyMTgyNjM2MzUzNTg=",
    # "x-cdn": "https://static.oklink.com",
    # "x-id-group": "2040121044283690001-c-4",
    # "x-locale": "zh_CN",
    # "x-site-info": "9FjOikHdpRnblJCLiskTJx0SPJiOiUGZvNmIsIiTDJiOi42bpdWZyJye",
    # "x-utc": "8",
    # "x-zkdex-env": "0"
}
cookies = {
    "locale": "zh_CN",
    "browserVersionLevel": "v5.6ad2a8e37c01",
    "devId": "afdc5e0a-a228-4e34-a5fe-42495b228f2d",
    "ok_site_info": "9FjOikHdpRnblJCLiskTJx0SPJiOiUGZvNmIsIiTDJiOi42bpdWZyJye",
    "okg.currentMedia": "xl",
    "ok-exp-time": "1732087743185",
    "aliyungf_tc": "372972ec72507ef6e34cfc6a6d2312436241bbcfc33e51a31f607981b373c9be",
    "traceId": "2040121044283690001",
    "_monitor_extras": "{\"deviceId\":\"fNExz4L7LPpJ-06ASMN7La\",\"eventId\":194,\"sequenceNumber\":194}",
    "amp_d77757": "afdc5e0a-a228-4e34-a5fe-42495b228f2d...1id4q1f88.1id4q1i60.5v.0.5v",
    "ok-ses-id": "whZWc1nEv48O2lXjifAWlY9aODN2jcCRilkxp8B6qmInRdpJxOglOUePLT3gYoeeRMmj6ZAPljL05/t1FV04tE7hL54BSvBUh5YXjSUmPNNf3J5LrtaWC/g9dS1OSQjh"
}
url = "https://www.oklink.com/api/explorer/v1/btc/transactionsNoRestrict"
params = {
    "offset": "40",
    "limit": "20",
    "t": "1732107152524"
}
response = requests.get(url, headers=headers, params=params)

print(response.text)
print(response)