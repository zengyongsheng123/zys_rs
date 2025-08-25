import requests
import json
import execjs
import base64
import ddddocr
with open("get_verify_params.js", "r", encoding="utf-8") as f:
    js_code = f.read()
with open("get_verify_params.js", "r", encoding="utf-8") as f:
    js_code1 = f.read()
capture_params = execjs.compile(js_code).call("get_verify_params", '{"key": "query"}')
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://www.ynjzjgcx.com",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    "appId": "84ded2cd478642b2",
    "isToken": "false",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/vcode/genVcode"
data = {
    "params": capture_params
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, data=data)
res = response.json()
json_data = json.loads(res['data'])
slideId = json_data["slideId"]
smallImage = json_data["smallImage"]
bigImage = json_data["bigImage"]
yHeight = json_data["yHeight"]
timestamp = res["timestamp"]
print(slideId, yHeight, timestamp, sep="\n")
with open("smallImage.png", "wb") as f:
    f.write(base64.b64decode(smallImage))
    print("图片保存成功")
with open("bigImage.png", "wb") as f:
    f.write(base64.b64decode(bigImage))
    print("图片保存成功")
# 创建OCR对象
ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
# 获取滑块图片
with open('smallImage.png', 'rb') as f:
    target_bytes = f.read()
# 获取背景图片
with open('bigImage.png', 'rb') as f:
    background_bytes = f.read()

result = ocr.slide_match(target_bytes, background_bytes, simple_target=True)
print("识别结果:", result)
distance = int(result['target'][0])
print("滑块移动距离为:", distance)
verify_url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/dataServ/findBaseEntDpPage"
for page in range(1, 11):
    print(f'========>第{page}页开始抓取数据')
    verify_params = {
        "pageNum": page,
        "pageSize": 10,
        "certificateType": "",
        "name": "",
        "slideId": slideId,
        "key": "query",
        "width": distance
    }
    verify_params_data = execjs.compile(js_code1).call("get_verify_params", json.dumps(verify_params, separators=(',', ':')))
    data_params = {
        "params": verify_params_data
    }
    resp = requests.post(verify_url, headers=headers, json=data_params)
    print(resp.text)
    records = resp.json()['data']['records']
    for record in records:
        # 企业名称
        name = record['name']
        # 统一社会信用代码
        creditCode = record['creditCode']
        # 企业注册地
        address = record['address']
        print("企业名称", name, "统一社会信用代码", creditCode, "企业注册地", address, sep="\t")
    print(f'第{page}页数据抓取完毕')
print('--------全部数据抓取完毕-------')