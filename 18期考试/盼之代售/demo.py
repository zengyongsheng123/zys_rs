import requests
import json


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
    "Origin": "https://www.pzds.com",
    "PZOs": "windows",
    "PZPlatform": "pc",
    "PZTimestamp": "1745637159193",
    "PZVersion": "1.0.0",
    "PZVersionCode": "1",
    "Pragma": "no-cache",
    "Random": "645165",
    "Referer": "https://www.pzds.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "Sign": "8566346823a54223b2d3e501a03e84c8",
    "Skey": "CLIENT",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36",
    "channelInfo": "{\"channelCode\":null,\"tag\":null,\"channelType\":null,\"searchWord\":\"null\"}",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "x-oss-forbid-overwrite": "true"
}
cookies = {
    "acw_tc": "ac11000117456371597483735e00d78e4b906999b2469d448ad5aafd3566e1",
    "ssxmod_itna": "CqGxcQiQ0QG=KGKGHGMDpxeqQ5GQ08DRDBb+7qvWRDmru+R4x2D78+r3DsybDSxGIeD6DxDtemD+DYq5QmLg+WDRrgt45yapitY5R2PO=DHxY=DU6AF+KbDeeDvDCeDIDWeDiDG4GmtqGtdDG=D7xNV4WiZDi3DbgiDmLQ=7lrD0R4lmqbD4qDB/EQDKTwZYDDlmrKY806KzeD+3qbdeZXPG=he0qDMnDGXQBH40uTGPIDqhPH1kQ5gDB=AxBQxunNrPONe5j2mGY5iIij+mBoKbAAElRhoDEAY8AhEGHQqQD/Kbsf9bi4ml5xDDWoGD/k=4D===",
    "ssxmod_itna2": "CqGxcQiQ0QG=KGKGHGMDpxeqQ5GQ08DRDBb+7qvWRDmru+R4x2D78+xikBiG=eDlZD4GaDxxitqNU0i+sdKR7AwsqI81xAfqaQc0TpeK4O0NiChIcC2mdGjt2cc+hDWjLAD0gMOidb4b4=QyiKDnO26izGxbzTgeF+EIrrpik8E7W=BA8UPPeEgW4t8GxTEaqPPaGGpAFtzI8oeHjdlw3wZAOEzgNieH4ecOfyCfOe=LUxNWff2E2IFdCI+nNDnb+ghPeq+6EFuOOFMyi7yjFwkpgSt/yb6G6Lk=FtO1fwHAT+OgD0z0H7wOVo3e7xckWqrbAqoom1u+YI+oHMKnbb2MKiOOUO+XY3rl=FqW327wT7mQOEozIRaTWQ2SG283GW34Lz=YteOD0qYqn82itGi1B4zy3oGu7oiQ/WHt3GepY3l5oEIyRroc7VjHiDOoS=O3x2bdBfOtxO3Oi2htifhKlFExEE3FGlYDk3KCrhjhcg8i2EcuWrPsnx1EchjZa52rUjGdbAbS=2OEfOEuwmKaitlkG0+TWA7h0sLHFuAW6Rg1R=PdHWEPqcpuTT/Q/mzGE19Z5Ud+8r9s/53==+ZcvjXcgYiQNckGGA=GCTThTgDDw6lDZpLtd4QcKxPfswkxjmfZlmr4D4NGx4YD"
}
url = "https://api.pzds.com/api/web-client/v2/public/goodsPublic/page"
params = {
    "decode__1174": "n4+xBiD=GQ1bD7Dl=oGkbG8D9DI2bmxmuIB+ehD"
}
data = {
    "order": "ASC",
    "sort": None,
    "page": 2,
    "pageSize": 21,
    "action": {
        "gameId": "7",
        "goodsCatalogueId": 6,
        "merchantMark": None,
        "keywords": [],
        "searchWords": [],
        "searchPropertyIds": [],
        "unionGameIds": [],
        "goodsSearchActions": []
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)