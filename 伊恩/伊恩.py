import requests
import execjs


headers = {
    "Accept": "text/plain, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://www.endata.com.cn",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 "
                  "Safari/537.36",
    "X-Requested-With": "XMLHttpRequest",
    "sec-ch-ua": "^\\^Google",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "^\\^Windows"
}
url = "https://www.endata.com.cn/API/GetData.ashx"
for i in range(1, 11):
    data = {
        "startTime": f"2024-{i}-01",
        "MethodName": "BoxOffice_GetMonthBox"
    }
    response = requests.post(url, headers=headers, data=data)
    js = execjs.compile(open('伊恩.js', encoding='utf-8').read())
    js_data = js.call('webInstace.shell', response.text)
    print(js_data)
