'''
@File    ：Slice_Verify_Code.py
@Author  ：南宫啸天
@Date    ：2025/3/9 18:28 
'''
import requests, re, random, base64, json, hashlib, time, execjs, ddddocr, subprocess
from loguru import logger

# 发送请求拿到验证码图片链接
headers = {
    "Accept": "*/*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://cloud.tencent.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Storage-Access": "active",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://turing.captcha.qcloud.com/cap_union_prehandle"
params = {
    "aid": "199999861",
    "protocol": "https",
    "accver": "1",
    "showtype": "popup",
    "ua": str(base64.b64encode(headers['User-Agent'].encode('utf-8')), 'utf-8'),
    "noheader": "1",
    "fb": "1",
    "aged": "0",
    "enableAged": "0",
    "enableDarkMode": "0",
    "grayscale": "1",
    "clientype": "2",
    "cap_cd": "",
    "uid": "",
    "lang": "zh-cn",
    "entry_url": "https://cloud.tencent.com/product/captcha",
    "elder_captcha": "0",
    "js": "/tcaptcha-frame.c055d939.js",
    "login_appid": "",
    "wb": "2",
    "subsid": "1",
    "callback": "_aq_362417",
    "sess": ""
}
response = requests.get(url, headers=headers, params=params)
response_json = json.loads(re.findall(r'\((.*?)\)', response.text)[0])
data = response_json['data']
img_url = "https://turing.captcha.qcloud.com" + data['dyn_show_info']['bg_elem_cfg']['img_url']
sprite_url = "https://turing.captcha.qcloud.com" + data['dyn_show_info']['sprite_url']
sess = response_json['sess']
tdc_url = "https://turing.captcha.qcloud.com" + data['comm_captcha_cfg']['tdc_path']
pow_cfg = data['comm_captcha_cfg']['pow_cfg']
prefix = pow_cfg['prefix']
md5_value = pow_cfg['md5']
init_pos_y = data['dyn_show_info']['fg_elem_list'][1]['init_pos'][1]

logger.success("背景图地址======>{}", img_url)
logger.success("滑块图地址======>{}", sprite_url)
logger.success("tdc.js地址======>{}", tdc_url)
logger.success("init_pos_y======>{}", init_pos_y)
logger.success("sess======>{}", sess)

# 写入本地
with open("img.png", "wb") as f:
    f.write(requests.get(img_url).content)
with open("sprite.png", "wb") as f:
    f.write(requests.get(sprite_url).content)
logger.warning("验证码图片下载完成")

# 下载tdc文件js代码
tdc_js_code = requests.get(tdc_url).text
with open("tdc.js", "w") as f:
    f.write(tdc_js_code)
logger.warning("tdc.js下载完成")

# 计算pow_answer和pow_calc_time
start_time = int(time.time() * 1000)
pow_answer = ""
for i in range(1, 1000000):
    val = hashlib.md5((prefix + str(i)).encode('utf-8')).hexdigest()
    if (val == md5_value):
        pow_answer += prefix + str(i)
        break
end_time = int(time.time() * 1000)
logger.debug("pow_answer======>{}", pow_answer)
pow_calc_time = end_time - start_time
logger.debug("pow_calc_time======>{}", pow_calc_time)

x = int(input("请输入滑块距离:"))

ans = [
    {
        "elem_id": 1,
        "type": "DynAnswerType_POS",
        "data": str(x) + "," + str(init_pos_y)
    }
]
codes = subprocess.run("node main.js", shell=True, capture_output=True)
print(re.findall(r'collect_value=====> (.*)', str(codes)))
collect_value, eks_value = re.findall(r'collect_value=====>(.*?)\neks_value=====>(.*?)', str(codes))[0]
print(collect_value, eks_value)

# maincode=execjs.compile(open('./main.js', encoding='utf-8').read()).call('get_collect_value')
# logger.debug(maincode)
# collect_value=maincode.call('get_collect_value')
# eks_value=maincode.call('get_eks_value')
logger.debug("ans======>{}", ans)
logger.debug("collect_value======>{}", collect_value)
logger.debug("eks_value======>{}", eks_value)
# 请求验证接口
headers = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://turing.captcha.gtimg.com",
    "Pragma": "no-cache",
    "Referer": "https://turing.captcha.gtimg.com/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "cross-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
url = "https://turing.captcha.qcloud.com/cap_union_new_verify"
data = {
    "collect": collect_value,
    "tlg": len(collect_value),
    "eks": eks_value,
    "sess": sess,
    "ans": json.dumps(ans, separators=(',', ':')),
    "pow_answer": pow_answer,
    "pow_calc_time": str(pow_calc_time)
}
response = requests.post(url, headers=headers, data=data)
logger.success("验证结果======>{}", response.text)
