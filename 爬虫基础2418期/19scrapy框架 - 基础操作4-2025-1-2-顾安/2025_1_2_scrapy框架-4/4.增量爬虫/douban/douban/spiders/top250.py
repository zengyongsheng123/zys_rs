import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class Top250Spider(scrapy.Spider):
    name = 'top250'

    # start_urls = ['https://movie.douban.com/top250']

    def start_requests(self):
        url = 'https://movie.douban.com/top250?start={}&filter='
        for page in range(10):
            yield scrapy.Request(url.format(page * 25))

    def parse(self, response: HtmlResponse, **kwargs):
        print('请求地址:', response.url)


if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250 --nolog'.split())


"""
scrapy默认自带的暂停功能使用以下指令完成:
    scrapy crawl 爬虫名称 -s JOBDIR=crawls/my_spider-1
    
    如果需要暂停则使用: ctrl + c
"""