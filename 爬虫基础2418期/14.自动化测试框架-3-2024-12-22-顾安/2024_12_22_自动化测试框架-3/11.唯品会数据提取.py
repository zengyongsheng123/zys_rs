# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 22:00
# @Author  : 顾安
# @File    : 11.唯品会数据提取.py


import json
from DrissionPage.common import By
from DrissionPage import ChromiumPage

page = ChromiumPage()
url = 'https://category.vip.com/suggest.php?keyword=%E7%94%B5%E8%84%91&ff=235%7C12%7C1%7C1&tfs_url=%2F%2Fmapi-pc.vip.com%2Fvips-mobile%2Frest%2Fshopping%2Fpc%2Fsearch%2Fproduct%2Frank&page=1'
page.listen.start('vips-mobile/rest/shopping/pc/product/module/list/v2')
page.get(url)

for item in page.listen.steps():
    response_body = item.response.body
    # 提取 JSON 字符串部分
    start_index = response_body.find('{')
    end_index = response_body.rfind('}') + 1
    json_str = response_body[start_index:end_index]

    info_dict = json.loads(json_str)

    for temp in info_dict['data']['products']:
        shop_info = dict()
        shop_info['商品名称'] = temp['title']
        shop_info['商品品牌'] = temp['brandShowName']
        shop_info['商品价格'] = temp['price']['salePrice']
        print(shop_info)

    button = page.ele((By.CLASS_NAME, 'cat-paging-next'), timeout=3)
    if button:
        button.click()
    else:
        print('爬虫结束...')
        page.quit()
