import requests


headers = {
    "Upgrade": "websocket",
    "Origin": "https://live.kuaishou.com",
    "Cache-Control": "no-cache",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Pragma": "no-cache",
    "Connection": "Upgrade",
    "Sec-WebSocket-Key": "VFrwJEK//KyZ8slck7oWdA==",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "Sec-WebSocket-Version": "13",
    "Sec-WebSocket-Extensions": "permessage-deflate; client_max_window_bits"
}
url = "wss://livejs-ws-group9.gifshow.com/websocket"
response = requests.get(url, headers=headers)

print(response.text)
print(response)