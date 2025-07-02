# -*- coding: utf-8 -*-
"""
Created on 2025-01-12 21:32:57
---------
@summary:
---------
@author: poppies
"""

import time
import feapder
from selenium.webdriver.common.by import By
from feapder.utils.webdriver import WebDriver


class Baidu(feapder.AirSpider):
    def start_requests(self):
        # render=True: 使用浏览器访问网站
        yield feapder.Request("https://www.baidu.com", render=True)

    def parse(self, request, response):
        # 创建浏览器对象
        browser: WebDriver = response.browser

        # 使用浏览器对象定位元素
        browser.find_element(By.ID, 'kw').send_keys('jk')
        browser.find_element(By.ID, 'su').click()
        time.sleep(10)


if __name__ == "__main__":
    Baidu(thread_count=3).start()
