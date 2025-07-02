import requests
import execjs

js_code = open('招标投标.js', encoding='utf-8').read()
js = execjs.compile(js_code)
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://ctbpsp.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "Hm_lvt_b966fe201514832da03dcf6cbf25b8a2": "1733623941,1734245881",
    "HMACCOUNT": "7A301C6CA1456CA8",
    "acw_tc": "1a0c642717342670020105597e004467b7237b6e7172a77e89fa67dab2ea40",
    "Hm_lpvt_b966fe201514832da03dcf6cbf25b8a2": "1734268135",
    "ssxmod_itna": "QqjxyDgDR73bD7DzEDUDL3oYKuDiw4xDtkqDcQD1br0x0yKdGzDAoxnRyBm4mREavzPCDvPi+xhHQmX37BaRokmDB3DEx06x89B4iiDC40rD74irDDxD3DbbdDSDWKD9D0+8BnLuKGWDm+zDY5FDQys44DFuEKOq4i7DDH=7x07K9KeDG5ez425eDKx44Dr7=BCFKyDpU2KfxG1K40HvidefoO6y4rzp9SLD/4ODlF2DCF1=4vpan9z9xYPsl+4sYrNwY2iIj2YYlxePG64wCbAeG0gWOGyvQRc7HPaOqDW37mH4D===",
    "ssxmod_itna2": "QqjxyDgDR73bD7DzEDUDL3oYKuDiw4xDtkqDcQD1brDnILRHqxDsIwYDLC8iAdwF=D6C4+UhKnE+ANmQn1GBETN5eP42x3iUESGxeaW1BY1s/iCwgRdNoFvEBvbXOgcNO6TBSG=yD44U3BXwC7EVKRUrQBA=F2D+YGmUDr5NjrrRmqQc9r2NFbxcBf=VWLLpGYQpW8L846Xr6uUTjhFrLhLw/7eHD7QPKOPZBPjgRqAh=SKM/B7XbzqPKDGcDiQYeD=="
}
for i in range(1, 5):
    url = "https://ctbpsp.com/cutominfoapi/recommand/type/5/pagesize/10/currentpage/{}".format(i)
    parms = js.call('getEncryptText')
    params = {
        "province": "",
        "industry": "",
        "type__1017": parms
    }

    print(params)
    response = requests.get(url, headers=headers, cookies=cookies, params=params)
    data = js.call('getDecryptText', response.text)
    print(data)
    # print(response)
