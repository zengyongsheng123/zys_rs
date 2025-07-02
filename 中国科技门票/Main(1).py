'''
@File:Main.py
@Autho:南宫啸天
@Date:2025/5/12 22:02 
'''
import requests,re,execjs,json,ddddocr
from loguru import logger


headers = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://pcticket.cstm.org.cn/",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0"
}
response = requests.get("https://pcticket.cstm.org.cn/", headers=headers)
rs_ck1=response.cookies.get_dict()
logger.success("第一次请求首页返回的cookies=====>{}",rs_ck1)

meta_label=re.findall(r'<meta id="(.*?)" content="(.*?)"',response.text)[0]
meta_label_content=meta_label[1]
ts_code=re.findall(r'<script type="text/javascript" r=\'m\'>(.*?)</script>',response.text)[0]
func_code_url="https://pcticket.cstm.org.cn"+re.findall(r'<script type="text/javascript" charset="utf-8" src="(.*?)" r=\'m\'></script>',response.text)[0]
logger.debug("meta标签的content的值=====>{}",meta_label_content)
logger.debug("外联自执行方法=====>{}",func_code_url)
rs_func_code=requests.get(func_code_url).text
with open('rs_ts.js', 'w', encoding='utf-8') as f:
    f.write(ts_code)
with open('rs_func.js', 'w', encoding='utf-8') as f:
    f.write(rs_func_code)
logger.warning("js文件下载本地成功")

js_code=open("./rs_main(1).js", "r", encoding="utf-8").read()
rs5_ck2=execjs.compile(js_code).call("get_cookie").split(";")[0]
rs_ck2={
    rs5_ck2.split("=")[0]:rs5_ck2.split("=")[1]
}
logger.debug("第二次生成的cookies值=====>{}",rs_ck2)

rs_cookie={**rs_ck1,**rs_ck2}
logger.debug("最终提交请求的cookies=====>{}",rs_cookie)
response = requests.get('https://pcticket.cstm.org.cn/',headers=headers,cookies=rs_cookie)
if response.status_code==200:
    logger.success("请求成功,状态码=====>{}",response)
    # logger.success("请求成功,响应内容=====>{}",response.text)
else:
    logger.error("请求失败=====>{}",response)

headers = {
    "accept": "application/json",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "authorization;": "",
    "cache-control": "no-cache",
    "lang": "zh_cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://pcticket.cstm.org.cn/",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0"
}
cookies = {
    "e89geEmDI6fkO": "60X6TvOAL924GCFKKRLgADja9LTiz2CJE0ULt0bRuw2mqWhw4pvYXs1.XGIdOiJeOM13AxlruemXXXzRb_J0M1Aq",
    "e89geEmDI6fkP": "0cAJkJIEIVPi.OVnGD9O8fgBJ1YfQgDyT_aHN.QRlXkmCAmaLXJAUyHC.qxIlUNrCZm_kwJfIpCx4x0HlLR4fL51xGvnDGGg6np5Ks3.al6INH3jVncOH_LrTk7zf6dueS1358W6LjCHlk542KV10zqJnGoENZUG_TfgfTOUAEzzYBwp29KHWrp0xHtuPmjSJadzDEZzMDfGrMW.fKTvfCUM8trgfyP0NE_6PfGy.MPM6upEtwdcsYubJkDOUvQ62.cA7_aSSUwfOLYz8DYnCpqK5AkD.IkRR7s9tkd34yivek74R63_L6R4E.rc7Du_SMobzb5u9JTnk3MDVEO0OV0s0fLep7WOENsABknmgvBNwHUJwa3t3YCn3VKUsERFP.HN9nMPPMQIm4.ayxG4iLY833jNERpw3qb0T7CIeOF6RyPJHK1B2RFH3ZywyS6cHfKuwpdHgLlSijuUB.0MeKa"
}
url = "https://pcticket.cstm.org.cn/prod-api/ingore/captchaImage"
params = {
    "GoHnnqm0": "0dgavOAlqWxbrD0OA9m6d3tmeBXRDN5deVC2e5dRMM4E4TW5QIhPTr1Syedlh.CuZvhM05LqNskc8ae1OiHQqzyucgUYA7vDfKbUiRUl4.rz.XsaQNBf5k5WNqDhrPcfIeCRd75TJM1V"
}
# response = requests.get(url, headers=headers, cookies=cookies, params=params)
# print(response.text)