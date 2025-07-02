# import redis
# import hashlib

import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class TxWorkInfoSpider(scrapy.Spider):
    # def __init__(self, name=None, **kwargs):
    #     super().__init__(name, **kwargs)
    #     self.redis_client = redis.Redis()

    # 关闭redis数据库
    # def __del__(self):
    #     self.redis_client.close()

    name = 'tx_work_info'

    def start_requests(self):
        url = "https://careers.tencent.com/search.html?index={}&keyword=python"
        for page in range(1, 35):
            # md5_hash = hashlib.md5()
            # md5_hash.update(url.format(page).encode())
            # hash_value = md5_hash.hexdigest()
            # if self.redis_client.get(f'tx_work_url_filter: {hash_value}'):
            #     print('数据重复...')
            #     continue
            # else:
            #     self.redis_client.set(f'tx_work_url_filter: {hash_value}', url.format(page))
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
