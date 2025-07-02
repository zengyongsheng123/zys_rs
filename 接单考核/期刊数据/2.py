# 地址：https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index
# 需求：任选一个类别针对里面的二级分类进行数据采集，比如经济管理类
# 采集字段：期刊名称、期刊详情
# 交付：代码 +思路 + 结果截图
import requests
import execjs
from lxml import etree


class Qikan:

    def __init__(self):
        self.requests = requests.session()
        self.url = "https://qikan.cqvip.com/Qikan/Journal/JournalGuid"
        self.headers = {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "zh",
            "cache-control": "no-cache",
            "pragma": "no-cache",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
        }
        self.params = {
            "from": "index"
        }

    def get_one(self):
        response = self.requests.get(self.url, headers=self.headers, params=self.params)
        response.encoding = 'utf-8'
        r = etree.HTML(response.text)
        ts_code = r.xpath('//script[1]/text()')[0]
        # print(ts_code)
        return ts_code

    def get_two(self):
        ts_code = self.get_one()
        js = execjs.compile(open('1.js', encoding='utf-8').read().replace("'ts_code'", ts_code))
        print(js.call("getCookie"))
        cookies = {
            js.call("getCookie").split('=')[0]: js.call("getCookie").split('=')[1],
        }
        # print(cookies)
        response = self.requests.get(self.url, headers=self.headers, cookies=cookies, params=self.params)
        print(response.text)
        print(response)

    def run(self):
        self.get_two()


if __name__ == '__main__':
    qikan = Qikan()
    qikan.run()
