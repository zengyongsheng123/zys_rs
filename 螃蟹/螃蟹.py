import requests
import execjs
import time

time = int(time.time())


with open("螃蟹.js",  encoding="utf-8") as f:
    js_code = f.read()
js = execjs.compile(js_code)
p = {
        "game_id": "8",
        "rec": "",
        "category": {
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": [],
            "10": []
        },
        "scope": {
            "min_price": "",
            "max_price": "",
            "min_gongli": "",
            "max_gongli": "",
            "min_meili": "",
            "max_meili": ""
        },
        "services": "all",
        "sort": {
            "type": "",
            "method": 2
        },
        "page": 5,
        "timestamp": str(time),
        "session": "1733848921"
    }
head = js.call("getSign", p)
# print(head)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Authorization": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJQWEI3LUZST05ULkFQSSIsImV4cCI6MTczMzY4OTc0MCwiYXVkIjoiYWRtaW4iLCJuYmYiOjE3MzM2NDY1NDAsImlhdCI6MTczMzY0NjU0MCwidXNlciI6eyJ1c2VyX2lkIjoxMDYzOTg4MSwidXNlcl9zbiI6IlE1R1o5QSIsImVtYWlsIjoiIiwicXEiOiIiLCJ1c2VkX3FxIjoiIiwidXNlZF93eCI6IiIsInVzZWRfcGhvbmUiOiIiLCJwYXNzd29yZCI6IjkyNGM5OGQxZmFmMWM1OTNiYWQwMGY4MzMyM2RlNTcwIiwiY29udGFjdCI6IiIsImF2YXRhciI6IiIsInJlYWxuYW1lIjoiIiwidGVscGhvbmUiOiIxNzY3MDgwMDA2MiIsImNvdW50cnlfY29kZSI6Ijg2IiwiYWRkcmVzcyI6IiIsInBvc3Rjb2RlIjoiIiwic2V4IjoxLCJuaWNrbmFtZSI6Ilx1NzUyOFx1NjIzN18xNzMzNjQ2NDMyNTQiLCJkZWZpbmVkIjpudWxsLCJjZXJ0X25hbWUiOm51bGwsImNlcnRfaWQiOm51bGwsImNlcnRfdGVscGhvbmUiOm51bGwsImF1dGhfc3RhdGUiOjAsImF1dGhfaWQiOm51bGwsImxhc3RfbG9naW4iOiIxNzMzNjQ2NTQwIiwibGFzdF9pcCI6IjE2My4xMjUuMjI5LjE0OSIsImxvZ2luX2NvdW50IjoyLCJhZGRfdGltZSI6MTczMzY0NjQzMiwiYWRkX3NvdXJjZSI6MSwibGFzdF9jaGVja19ibGFjayI6MCwidG91eGlhbmciOiJodHRwczpcL1wvbTEucHhiNy5jb21cL2ltYWdlXC9teVwvYXZhdGFyXC9hdmF0YXIyLnBuZyIsImFsaXBheSI6IiIsImFsaXBheV9xcmNvZGUiOiIiLCJ3ZWNoYXQiOm51bGwsIndlY2hhdF9xcmNvZGUiOiIiLCJiYW5rY2FyZCI6IiIsImJhbmtfcmVhbG5hbWUiOiIiLCJiYW5rX2FkZHJlc3MiOiIiLCJwYXlwd2QiOiIiLCJub3dfbW9uZXkiOiIwLjAwIiwidXNlcl9ub3RlIjoiIiwibG9nb3V0X3RpbWUiOjAsImNhbmNlbGVkIjowLCJjYW5jZWxlZF9zb3VyY2UiOjAsImZkZF91aWQiOm51bGwsImZkZF90cmFuc2FjdGlvbl9ubyI6bnVsbCwibG9ja2luZyI6MCwicHVzaF9jb250cm9sbCI6MSwid3hhX29wZW5pZCI6IiIsInB4X2NoYW5uZWxfdXNlcl9pZCI6MCwiZG93bmxvYWRfY2hhbm5lbF9pZCI6MCwibWVtYmVyc2hpcCI6MSwiZGV2aWNlX2ZpbmdlcnByaW50IjoiZGY3ZjNhZTBmMjQ5NDFkZmQyOTE1OGY3Yzk3MGVjNGIiLCJpbV9jb250cm9sbCI6MSwiaW52aXRhdGlvbl9jb2RlIjoiIiwidW5pb25faWQiOiIiLCJvZmZpY2lhbF9vcGVuaWQiOiIiLCJhcHBfb3BlbmlkIjoiIiwid3hfbmlja25hbWUiOiIiLCJpc19zdWJzY3JpYmUiOjAsImlzX2JpbmRfd2VjaGF0IjowLCJhbGlwYXlfb3BlbmlkIjoiIn19.OF3o2O4l67Fige2CKSaSofFYZQhSy5dNDO0eIIidXQU",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "LoginStatus": "true",
    "Origin": "https://www.pxb7.com",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "randomStr": head['randomStr'],
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sign": head['sign'],
    "timestamp": str(head['timestamp']),
    "visitorId": "10639881",
    "x-fronend-tcpport": "10639881"
}
# head['Token'] = head['token']
# head['ApiToken'] = head['ApiToken']
cookies = {
    "UM_distinctid": "1939f66b7e474c-0e8cc17a9c5af9-26011851-1fa400-1939f66b7e51d71",
    "Hm_lvt_6d8ffc7e04e74b3866a454a4477796ce": "1733646321",
    "HMACCOUNT": "7A301C6CA1456CA8",
    "aliyungf_tc": "a663b5ad4aa14f6764d698bed6eab7f0933524ec5f76e92524d37510f35fdd37",
    "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%2210639881%22%2C%22first_id%22%3A%221939f66b6e62291-0aa87d4bc81829-26011851-2073600-1939f66b6e7113c%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTkzOWY2NmI2ZTYyMjkxLTBhYTg3ZDRiYzgxODI5LTI2MDExODUxLTIwNzM2MDAtMTkzOWY2NmI2ZTcxMTNjIiwiJGlkZW50aXR5X2xvZ2luX2lkIjoiMTA2Mzk4ODEifQ%3D%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%24identity_login_id%22%2C%22value%22%3A%2210639881%22%7D%7D",
    "acw_tc": "abe4cab7388e77213666b598f293a604bd2161ea2fba534fb501ec1075b6fba5",
    "Hm_lpvt_6d8ffc7e04e74b3866a454a4477796ce": "1733658160",
    "ssxmod_itna": "Yqjx0Q0Q0=kzDXKDHQuxeewMxfxmuGr9vhhIr+KDsO1iDSxGKeidDnDGuEBivrvtL/E+mAFK9c3mhaoSmkauTOWxB3DEx06e7RiD4GGDBeGwD0eG+DD4DWDmmFDnxAQDjxGpc2LkX=DEDYpZDitjD7tD5eDjAk6RYeG0DDtO04G2tn=qDDNTQgK44wGxxGYjYmUdpdhbuYwcD0UqxBLtAcGcIj9k=iXbkZcDHEQDzL7Dtut5wMRoCwXM4W+kFOGkGGvCm0oKlgIkQAeoREwioBwRE8hfCovL2twjcYkDG31Y+HD=",
    "ssxmod_itna2": "Yqjx0Q0Q0=kzDXKDHQuxeewMxfxmuGr9vhhIr4ikfOOesoDlpcpDiq03o11gU0IxAPDBiQv0xq9OiIiHdifCyDvO7GlPTveVGl7+f4NGW5Nv1+87y4vybmul=y0ZpYqZCzqM9yz2oBczu62sgi0=3Op4YPBtqrWKbPc1t=Gm465zNpat+imaSrpQLp28BiSNejqzLZ9tsmSDyBPouWSt1jgfO7I7I/q7VSpYN+94S0g4EekHpoQ=ZFImlOfNorOaYIcblhpiOdT2o6qhbz8T9oOmRD5xr1TT0pxrdPsfO0Aqnmu8Z0V8imBS5jKALSDVj5xKBDGy4pWqhuqfR8F+E+clSFaAI1fRbFFCAAvY+tScQtHC+pmn+40wmUrBjyE0Tyi0N+rM/rxZ2dT5xXHWnAQl2bnpjlR=iANYGevxC/0d1Ev7m4+cbIOfSGP=D4hqYLFtj28YOT4BGB5Z3ExWEfQhvbDqmhttcKHpiQq=6d0BuBnbc0eZKcbzbBBeh5cTFuT/qHR4nKqyQI+HPsWC5g5mLnK+C+8HWb4SeHRC2AlR15PCY5C5YvfWfM9Q/QcCga=In08=ngfNby0qC38kFoLWxDKwDexerM5wGvSBBovnI3ybqgNCjo3tdiLz4r1Inmnz8y+o4DLxD2QGDD=="
}
url = "https://api.pxb7.com/api/product/list"
response = requests.get(url, headers=headers, cookies=cookies)

print(response.text)
print(response)