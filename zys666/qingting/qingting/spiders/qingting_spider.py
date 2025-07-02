import scrapy
from scrapy.http import HtmlResponse
from scrapy import cmdline


class QingtingSpiderSpider(scrapy.Spider):
    name = 'qingting_spider'
    allowed_domains = ['https://m.qingting.fm']
    start_urls = ['https://m.qingting.fm/rank']

    def parse(self, response: HtmlResponse, **kwargs):
        print(response.text)


if __name__ == '__main__':
    cmdline.execute("scrapy crawl qingting_spider".split())
