import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class TxWorkInfoSpider(scrapy.Spider):
    name = 'tx_work_info'

    def start_requests(self):
        url = "https://careers.tencent.com/search.html?index={}&keyword=python"
        for page in range(1, 35):
            yield scrapy.Request(url.format(page))

    def parse(self, response: HtmlResponse, **kwargs):
        div_list = response.xpath("//div[@class='correlation-degree']/div/div")
        for div in div_list:
            item = dict()
            item['title'] = div.xpath('./a//span[@class="job-recruit-title"]/text()').extract_first()
            item['department'] = div.xpath('./a/p[1]/span[1]/text()').extract_first()
            item['address'] = div.xpath('./a//span[2]/text()').extract_first()
            item['post'] = div.xpath('./a/p[1]/span[3]/text()').extract_first()
            item['date'] = div.xpath('./a/p[1]/span[last()]/text()').extract_first()
            item['recruit_data'] = div.xpath('./a/p[2]/text()').extract_first()
            yield item


if __name__ == '__main__':
    cmdline.execute('scrapy crawl tx_work_info --nolog'.split())
