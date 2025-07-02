import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://account.youzan.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://account.youzan.com/login",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "yz_log_seqb": "1747319495624",
    "acw_tc": "3b35455050123638fce013e6708d274da7920fc99d51841653887c8bc2678e2f",
    "KDTSESSIONID": "YZ1372702990481993728YZx2C6imWG",
    "nobody_sign": "YZ1372702990481993728YZx2C6imWG",
    "captcha_sid": "YZ1372702990494203904YZkgVFB2vp",
    "_kdt_id_": "371189",
    "yz_log_seqn": "7"
}
url = "https://passport.youzan.com/api/captcha/get-behavior-captcha-token-v2.json"
params = {
    "bizType": "15",
    "version": "1.0"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)
da = response.json()['data']
token = da['token']
randomStr = da['randomStr']
print(token)