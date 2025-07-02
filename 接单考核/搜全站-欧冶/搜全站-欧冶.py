# 地址：https://www.ouyeel.com/search-ng/queryResource/index
# 需求：采集首页产品标题、价格、地址等信息10页。
# 交付：代码+思路+结果截图上传该位置
import requests


headers = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Referer": "https://www.ouyeel.com/search-ng/queryResource/index",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "same-origin",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "T0k1m0u5AfREO": "5MMyogml9MBCg11TAK0Z9_s1S1An.yCwiW.MORhL51AZbCf3Bh6bMN3fAOka3kY5U.nRyzyn9fyQOB_jKN7InJA",
    "T0k1m0u5AfREP": "7.aVe2PXDKgJKpUiR2NDRLJ9th136xBzPCF596hUfk8hJI2CB3Jt6I5kckxWam7LAp_KRLhrmaR17pE35N5vpt5kO9DcesmqC6NTShZ2b7mpybSji0yVd26j8avkO3L26HqkGMACSdpNExmikQbKHacdrxDjvVF8CPg3jpiuIx7JhVHVjvv4n7Tfkv4r6llSYsJ6izQuHSNoWdURkF_f6Vu9eommYwBgDZlTKKAiOiG"
}
url = "https://www.ouyeel.com/search-ng/queryResource/index"
response = requests.get(url, headers=headers, cookies=cookies)

print(response.text)
print(response)