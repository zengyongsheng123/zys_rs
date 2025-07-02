# 地址：http://www.winshangdata.com/brandList
# 需求：用scrapy框架采集本站数据，至少抓取5个分类，数据量要求2000以上
# 采集字段：标题、创建时间、开店方式、合作期限、面积要求
# 交付：(代码 + 思路 + 结果)截图上传该位置
import requests
from lxml import etree
import json

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Authorization;": "",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://www.winshangdata.com",
    "Pragma": "no-cache",
    "Referer": "https://www.winshangdata.com/brandList",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "appType": "bigdata",
    "platform": "pc",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "token;": "",
    "uid;": "",
    "uuid": "123456"
}
url = "https://www.winshangdata.com/wsapi/brand/getBigdataList3_4"
for page in range(1, 9):
    data = {
        "isHaveLink": "",
        "isTuozhan": "",
        "isXxPp": "",
        "kdfs": "",
        "key": "",
        "orderBy": "1",
        "pageNum": page,
        "pageSize": 60,
        "pid": "",
        "qy_p": "",
        "qy_r": "",
        "xqMj": "",
        "ytlb1": "",
        "ytlb2": ""
    }
    data = json.dumps(data, separators=(',', ':'))
    print('----------第{}页开始----------'.format(page))
    response = requests.post(url, headers=headers, data=data)
    print(response.text)
    href = response.json()["data"]["list"]
    brand_dict = {}
    for i in href:
        item = {}
        brandId = i["brandId"]
        brandName = i["brandName"]
        item["brandId"] = brandId
        item["brandName"] = brandName
        # print(item)
        url_list = f"http://www.winshangdata.com/brandDetail?brandId={item['brandId']}"
        item["url_list"] = url_list
        brand_dict[brandName] = item
    print('----------第{}页结束----------'.format(page))
    # print(brand_dict)
    for brand_name, details in brand_dict.items():
        url_list = details["url_list"]
        detail_response = requests.get(url_list, headers=headers)
        # print(detail_response.text)
        if detail_response.status_code == 200:
            html = etree.HTML(detail_response.text)
            # 标题
            title = html.xpath('//div[@class="detail-three-tit"]/text()')[0]
            # print(title)
            # 创建时间
            create_time = html.xpath('//div[@class="fl w-p-50 detail-info"]//li/span['
                                     '@class="detail-option-value"]/text()')[1]
            # print(create_time)
            # 开店方式
            shop_way = html.xpath('//div[@class="fl w-p-50 detail-info"]//li/span[@class="detail-option-value"]/text()')[2]
            # 合作期限
            time_limit = html.xpath('//div[@class="fl w-p-50 detail-info"]//li/span['
                                    '@class="detail-option-value"]/text()')[3]
            # 面积要求
            area_requirement = html.xpath('//div[@class="fl w-p-50 detail-info"]//li/span['
                                          '@class="detail-option-value"]/text()')[4]
            print(title, create_time, shop_way, time_limit, area_requirement)


