import re
import execjs

import requests

requests = requests.session()
headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://pcticket.cstm.org.cn/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
url = "https://pcticket.cstm.org.cn/"
response = requests.get(url, headers=headers)
ts_code = re.findall('<script type="text/javascript" r=\'m\'>(.*?)</script>', response.text)[0]
content = re.findall('<meta id="(.*?)" content="(.*?)"', response.text)[0][1]
print(content)
# 替换content
with open("./ck.js", "r", encoding="utf-8") as f:
    js_content = f.read().replace("content", content)
# 替换ts文件
with open("./rs_ts.js", "w", encoding="utf-8") as f:
    f.write(ts_code)
func_code = 'https://pcticket.cstm.org.cn' + \
            re.findall('</script><script type="text/javascript" charset="utf-8" src="(.*?)" r=\'m\'></script>',
                       response.text)[0]
# 替换外链js文件
func_code = requests.get(func_code, headers=headers).text
with open("./rs_func.js", "w", encoding="utf-8") as f:
    f.write(func_code)
print('第一次请求状态码===>>', response.status_code)
js = execjs.compile(open("./ck.js", "r", encoding="utf-8").read())
ck = js.call("get_cookie").split(';')[0]
print(ck)
cookie = {ck.split("=")[0]: ck.split("=")[1]}
response.cookies.update(cookie)
response = requests.get('https://pcticket.cstm.org.cn/', headers=headers).text
print('第二次请求状态码===>>', response.status_code)
