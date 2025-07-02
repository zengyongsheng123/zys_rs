# -*- coding: utf-8 -*-
# @Time    : 2024/12/19 21:12
# @Author  : 顾安
# @File    : 8.唯品会商品信息爬虫.py

import time
from random import randint
from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException


class WpShop:
    def __init__(self):
        self.mongo_client = MongoClient('localhost', 27017)
        self.collection = self.mongo_client['py_spider']['wp_shop']
        self.browser = webdriver.Chrome()

        self.cookies = {
            "mars_cid": "1728998814701_90070e4381ab077f1cfab513e773f430",
            "pc_fdc_area_id": "104103101",
            "pc_fdc_source_ip": "1",
            "mars_pid": "0",
            "smidV2": "202410152144580e3e051ddc222ccc34ae1969860f2da20079b0a4eb66f1110",
            "VipRUID": "469642189",
            "VipUID": "b4fcb7035781600c26fa0fd1f5ce4581",
            "VipRNAME": "ph_*****************************739",
            ".thumbcache_f65dad1092aa9e66c73b4823b4493a2f": "lR/z3goK8t53+0mHrPWO8v0S/JZtFJyFt7TdfzCLhRCR9IGcKB3fRNpvnJNrAaOpsY1sgWse2nDZ/zQUmSzcOg%3D%3D",
            "mars_sid": "f3e1c01ebb689f1017a3c3baeb31f343",
            "visit_id": "E43F3613ECA1359C0EED39035B8F921A",
            "user_class": "b",
            "VipUINFO": "luc%3Ab%7Csuc%3Ab%7Cbct%3Ac_new%7Chct%3Ac_new%7Cbdts%3A0%7Cbcts%3A0%7Ckfts%3A0%7Cc10%3A0%7Crcabt%3A0%7Cp2%3A0%7Cp3%3A1%7Cp4%3A0%7Cp5%3A0%7Cul%3A3105",
            "vip_first_visitor": "1",
            "vip_address": "%257B%2522pid%2522%253A%2522104103%2522%252C%2522cid%2522%253A%2522104103101%2522%252C%2522pname%2522%253A%2522%255Cu6e56%255Cu5357%255Cu7701%2522%252C%2522cname%2522%253A%2522%255Cu957f%255Cu6c99%255Cu5e02%2522%257D",
            "vip_province": "104103",
            "vip_province_name": "%E6%B9%96%E5%8D%97%E7%9C%81",
            "vip_city_name": "%E9%95%BF%E6%B2%99%E5%B8%82",
            "vip_city_code": "104103101",
            "vip_wh": "VIP_HZ",
            "vip_ipver": "31",
            "vip_access_times": "%7B%22list%22%3A0%7D",
            "vipshop_passport_src": "https%3A%2F%2Fcategory.vip.com%2Fsuggest.php%3Fkeyword%3D%25E7%2594%25B5%25E8%2584%2591%26ff%3D235%257C12%257C1%257C1%26tfs_url%3D%252F%252Fmapi-pc.vip.com%252Fvips-mobile%252Frest%252Fshopping%252Fpc%252Fsearch%252Fproduct%252Frank",
            "_jzqco": "%7C%7C%7C%7C%7C1.143005238.1729000641184.1730814908630.1734613842129.1730814908630.1734613842129.0.0.0.3.3",
            "tfs_fp_token": "BHpSL58LstSnYcsjkMUmHexRTZ610cYhqMP5ihuo1tRHzxBoDeEoMSR1Z+24NMbbsWT+9FB9jQY0m+iOQ/dK1GQ%3D%3D",
            "tfs_fp_timestamp": "1734613842299",
            "vip_tracker_source_from": "",
            "PASSPORT_ACCESS_TOKEN": "5721536BC035699A72084BFE39DC94918C506CD5",
            "VipLID": "0%7C1734613864%7C93f048",
            "VipDegree": "D1",
            "fe_global_sync": "1",
            "pg_session_no": "3",
            "waitlist": "%7B%22pollingId%22%3A%221497DF28-5AA3-44CF-837C-6F72EEBC5D4F%22%2C%22pollingStamp%22%3A1734614234807%7D"
        }

    def connect_shop_page(self):
        """
        连接唯品会商品页面
        """
        self.browser.get('https://category.vip.com/suggest.php?keyword=%E7%94%B5%E8%84%91&ff=235|12|1|1')
        for key, value in self.cookies.items():
            cookie_dict = {'name': key, 'value': value}
            self.browser.add_cookie(cookie_dict)
        self.browser.refresh()
        time.sleep(randint(1, 3))

    def drop_down(self):
        for page in range(1, 12):
            js_code = f'window.scrollBy(0, {page * 1000});'
            self.browser.execute_script(js_code)
            time.sleep(randint(1, 2))

    def parse_info(self):
        # 在数据提取之前完成页面滑动并加载所有商品列表数据
        self.drop_down()

        div_list = self.browser.find_elements(
            By.XPATH,
            '//section[@id="J_searchCatList"]/div[@class="c-goods-item  J-goods-item c-goods-item--auto-width"]'
        )

        for div in div_list:
            price = div.find_element(
                By.XPATH, './/div[@class="c-goods-item__sale-price J-goods-item__sale-price"]'
            ).text

            title = div.find_element(
                By.XPATH, './/div[2]/div[2]'
            ).text

            item = {
                'title': title,
                'price': price
            }
            print(item)
            self.save_info(item)
        self.next_page()  # 当前页面获取完成之后需要点击下一页

    def save_info(self, item):
        self.collection.insert_one(item)
        print('数据插入成功:', item)

    def next_page(self):
        try:
            next_button = self.browser.find_element(By.XPATH, '//*[@id="J_nextPage_link"]')
            if next_button:
                next_button.click()
                self.parse_info()  # 进入到下一页需要重新解析页面数据
            else:
                self.browser.close()
        except NoSuchElementException:
            print('最后一页...')
            self.browser.quit()

    def main(self):
        self.connect_shop_page()
        self.parse_info()


if __name__ == '__main__':
    wp_shop = WpShop()
    wp_shop.main()
