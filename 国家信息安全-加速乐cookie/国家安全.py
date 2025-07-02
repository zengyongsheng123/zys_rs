import requests
import re
import execjs

headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0"
}
url = "https://www.cnvd.org.cn/flaw/typelist"
params = {
    "typeId": "27"
}
requests = requests.session()
js = execjs.compile(open("国家安全.js", encoding="utf-8").read())


def get_one_cookie():
    response = requests.get(url, headers=headers, params=params)
    js_co = re.findall("cookie=(.*?);location", response.text)[0]
    __jsl_clearance_s = execjs.eval(js_co).split('ance_s=')[-1]
    # print(__jsl_clearance_s)
    return __jsl_clearance_s


def get_two_cookie():
    __jsl_clearance_s = get_one_cookie()
    cookies = {'__jsl_clearance_s': __jsl_clearance_s}
    response = requests.get(url, headers=headers, params=params, cookies=cookies)
    print(response.text.replace('<script>', '').replace('</script>', ''))
    go_code = execjs.eval(re.findall(';}};go\((.*?)\)</', response.text)[0])
    # print(go_code)
    cookie = js.call('get_cookie', go_code)
    print(cookie)
    cookies = {'__jsl_clearance_s': cookie.split('ce_s=')[-1]}
    response = requests.get(url, headers=headers, params=params, cookies=cookies)
    print(response.text)


get_two_cookie()
