import execjs
import json
import os
import subprocess
from curl_cffi import requests

# 设置 execjs 运行时
os.environ["EXECJS_RUNTIME"] = "Node"

# 调试函数：检查 Node.js 环境
def check_node_environment():
    try:
        result = subprocess.run(["node", "-v"], capture_output=True, text=True)
        node_version = result.stdout.strip()
        if result.returncode != 0 or not node_version:
            print("错误: Node.js 未安装或不可用。请确保已安装 Node.js 并添加到 PATH。")
            exit(1)
        print(f"Node.js 版本: {node_version}")
        return node_version
    except Exception as e:
        print("检查 Node.js 环境失败:", str(e))
        exit(1)

# 检查 Node.js 环境
check_node_environment()

# 安装依赖模块
try:
    subprocess.run(["npm", "install", "jsdom", "crypto-js"], check=True)
    print("成功安装 jsdom 和 crypto-js 模块")
except Exception as e:
    print("安装 jsdom 和 crypto-js 失败:", str(e))
    print("请手动运行：npm install jsdom crypto-js")
    exit(1)

# 读取 JS 文件
js_file_path = '333.js'
try:
    with open(js_file_path, 'r', encoding='utf-8') as f:
        js_code = f.read()
    print(f"成功读取 JS 文件: {js_file_path}")
except Exception as e:
    print(f"读取 JS 文件错误 ({js_file_path}):", str(e))
    exit(1)

# 创建 JS 执行环境
try:
    # 添加 jsdom 模拟浏览器环境
    jsdom_code = """
    const { JSDOM } = require('jsdom');
    const dom = new JSDOM();
    global.window = dom.window;
    global.document = dom.window.document;
    global.navigator = dom.window.navigator;
    """
    ctx = execjs.compile(jsdom_code + "\n" + js_code)
    print("JS 编译成功（包含 jsdom 模拟）")
except Exception as e:
    print("JS 编译错误:", str(e))
    print("请检查 333.js 是否依赖其他模块或 ParamsSign 的实现")
    exit(1)

# 调用 JS 函数
try:
    # generateH5st 不需要参数，直接调用
    result = ctx.call('generateH5st')
    print("JS 返回结果:", result)

    # 检查返回结果
    if not result:
        print("错误: generateH5st 返回空值 (undefined 或 null)")
        exit(1)
    if not isinstance(result, dict):
        print("错误: generateH5st 未返回字典对象，实际返回类型:", type(result), "值:", result)
        exit(1)
    if 'error' in result:
        print("JS 函数错误:", result['error'])
        print("可能的错误原因：")
        print("- window.ParamsSign 未定义（需要加载 JD.com 的签名库）")
        print("- CryptoJS 或其他依赖缺失")
        exit(1)

    h5st_value = result.get('h5st')
    timestamp = result.get('timestamp')
    length = result.get('length')
    if not h5st_value or not timestamp:
        print("错误: h5st 或 timestamp 为空")
        exit(1)
    print("生成的 H5ST:", h5st_value)
    print("H5ST 长度:", length)
    print("时间戳:", timestamp)
except Exception as e:
    print("JS 执行错误:", str(e))
    print("可能的错误原因：")
    print("1. window.ParamsSign 未定义（需要加载 JD.com 的签名库）")
    print("2. 缺少其他依赖模块（例如 crypto-js）")
    print("3. JS 代码依赖浏览器环境未正确模拟")
    print("调试建议：")
    print("- 确保已安装 jsdom 和 crypto-js：npm install jsdom crypto-js")
    print("- 检查 333.js 是否需要加载 ParamsSign 的实现（例如另一个 JS 文件）")
    print("- 测试 generateH5st：node -e \"const generateH5st = require('./333.js').generateH5st; console.log(generateH5st());\"")
    exit(1)

# 构造请求 headers
headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "origin": "https://search.jd.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://search.jd.com/",
    "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Google Chrome\";v=\"140\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    "x-referer-page": "https://search.jd.com/Search",
    "x-rp-client": "h5_1.0.0"
}

# 构造请求 cookies
cookies = {
    "__jdu": "17475483728601170377086",
    "shshshfpa": "660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855",
    "shshshfpx": "660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855",
    "jcap_dvzw_fp": "OsWY5nt6V6o_6-gdoxbRErS-HIOxxIp5zoFKe3ZNBoXMymY1O_DQY7w3ods4VcjdvUAVUplmPMQe610g2CEbVV70w7k=",
    "TrackID": "1Iupml7GhUMppYoOHNcLMRV1n8vU4LIHHmHRBL8r39imVNRB6EYrPvEE4ZhyaFQjdP-I4vTd_LwWTtoBECn_AbXNrbKURW9hxPKzRCpItCns",
    "light_key": "AASBKE7rOxgWQziEhC_QY6yaQmqwmAvoneMZaGuM9dSaO-APlI4nqBzzPDUM90pJa_14WnbB",
    "pinId": "Z_RulOG-J27d71tPa3l1iw",
    "pin": "jd_DpKnwcKTUZZG",
    "unick": "t0wd2u0z6pw1vh",
    "_tp": "GSi0H9%2BqGDdfdwyFnYkXBw%3D%3D",
    "_pst": "jd_DpKnwcKTUZZG",
    "areaId": "2",
    "ipLoc-djd": "2-2813_61125-0",
    "unpl": "JF8EALRnNSttCx8DAh4FHBcRTV9SWw9fQx9WbWUHUVtRGF1SEgYTG0R7XlVdWRRKHx9vYBRXXlNLXQ4aBisSEXteU11bD00VB2xXXAQDGhUQR09SWEBJJVtVWFkKTRADZ2QNZG1bS2QFGjIbFBVNWVFXXw5IHgRuZwVSXFpNUgQSBSsTIExtZG5YDUgTA2dXBGRcaAkAWR4FHBEYThBUWFgOTxIKbWEGXVpZS1QDGgAdFBFCWmRfbQs",
    "__jdv": "232945309|haosou-search|t_262767352_haosousearch|cpc|70753761929_0_bef6466407374cf99d333478b8f8598e|1758032287181",
    "__jdc": "143920055",
    "__jda": "143920055.17475483728601170377086.1747548373.1758421645.1758450305.16",
    "thor": "251ECB82F51D8C8D4E3D1428DB84C3209944C3190610545ADFD85FB4E0138CA75E9F7D1E58F54CEF995B79C9D5E4B8EA78A5F89CDB55C75CE9B4FDA93346F2FA6BD780B8EF32368A07F766D54A6C3BD7E8C759D4511B724DBA3B9D3F0E122373AD02D80E912FEDD98A4A6B4542A0FD04ACC41273E9164F879C87E47F87E5F9CF344FD955A5D2816AE4D7F4295B3E8A925CCDB9B1687346467B29762EC360BE69",
    "3AB9D23F7A4B3CSS": "jdd03MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSIAAAAMZNPHEYEIAAAAACJT4LWG36GHHM4X",
    "3AB9D23F7A4B3C9B": "MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSI",
    "shshshfpb": "BApXS-vPGaPxA-lb62kUbGA0TRDBDQGMaBnQCH3pl9xJ1MknjYoG2",
    "flash": "3_OeRBlaeFjxh7T-Wmf0KNiR0XCaChV0ocYxFIk6LMNDD7IdQo0o72etXuK_Bx00DZF9tggku80out1O6_D7P8BT1AOneqeKsb1uT3rlNchETFJ3FgS_qbeSMhL7swEmpCi5qYXrF0uzd-ubt6nKzSVOy3hA8f4lICTtjl8sEhukMcIh1G8bbY",
    "sdtoken": "AAbEsBpEIOVjqTAKCQtvQu17-iLqAaegTHlxuiIuk2YuWtfVYfzr3H002vJH7oeKWRrHtLfIQnrV7sN-31dgQCFBj1vrbj3MRKkACzYuxWSUNIfT1CP-j0sM6igDDpOuJgP8_SuICTJWs3t6lemfbBM"
}

# 构造请求参数
params = {
    "appid": "search-pc-java",
    "t": str(timestamp),
    "client": "pc",
    "clientVersion": "1.0.0",
    "cthr": "1",
    "uuid": "17475483728601170377086",
    "loginType": "3",
    "keyword": "美妆",
    "functionId": "pc_search_searchWare",
    "body": json.dumps({
        "enc": "utf-8",
        "pvid": "c8ee6f8f98ba4aeabf534a34348c0d87",
        "area": "2_2813_61125_0",
        "page": 5,
        "s": 94
    }, ensure_ascii=False),
    "x-api-eid-token": "jdd03MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSIAAAAMZNPHEYEIAAAAACJT4LWG36GHHM4X",
    "h5st": h5st_value
}

# 发送请求
try:
    response = requests.get(
        url="https://api.m.jd.com/api",
        headers=headers,
        cookies=cookies,
        params=params,
        impersonate="chrome120"
    )
    print("状态码:", response.status_code)
    try:
        response_json = response.json()
        print("响应内容:", json.dumps(response_json, indent=2, ensure_ascii=False))
    except ValueError as e:
        print("响应不是有效的 JSON:", response.text)
except Exception as e:
    print("请求错误:", str(e))

# 调试：保存响应到文件以便进一步分析
with open("response.txt", "w", encoding="utf-8") as f:
    f.write(response.text)
print("响应已保存到 response.txt")