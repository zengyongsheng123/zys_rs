# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 21:49
# @Author  : 顾安
# @File    : 10.使用WebPage请求带有加密的网站.py


from DrissionPage import WebPage
from DrissionPage.common import By


class DuDing:
    def __init__(self):
        self.url = 'https://kaoyan.docin.com/pdfreader/web/#/docin/documents?type=1&keyword=%E5%A4%8D%E8%AF%95%E4%BB%BF%E7%9C%9F%E6%A8%A1%E6%8B%9F'
        self.page = WebPage()


    def get_info(self):
        self.page.listen.start('/api/web/document/list')
        self.page.get(self.url)

        for item in self.page.listen.steps(count=20):
            print(item.response.body)

            next_button = self.page.ele((By.CLASS_NAME, 'btn-next'), timeout=3)
            if next_button:
                next_button.click()
            else:
                print('没有下一页了...')
                self.page.quit()
                break


if __name__ == '__main__':
    du = DuDing()
    du.get_info()
