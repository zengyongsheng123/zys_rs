import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class QingTingSpider(scrapy.Spider):
    name = 'qingting'
    allowed_domains = ['m.qingting.fm']
    start_urls = ['https://m.qingting.fm/rank']

    def parse(self, response: HtmlResponse, **kwargs):
        rank_list = response.xpath('//div[@class="rank-list"]/a')

        for rank in rank_list:
            rank_number = rank.xpath('./div[@class="badge"]/text()').get()
            img_url = rank.xpath("./img/@src").extract_first()
            title = rank.xpath('./div[@class="content"]/div[@class="title"]/text()').extract_first()  # 标题
            desc = rank.xpath('./div[@class="content"]/div[@class="desc"]/text()').extract_first()  # 描述
            play_number = rank.xpath('.//div[@class="info-item"][1]/span/text()').extract_first()  # 播放次数

            # 需要将数据保存到数据库中
            # 可以将数据返回给一个对象(管道), 通过管道来管理数据的保存问题
            info_dict = {
                'rank_number': rank_number,
                'img_url': img_url,
                'title': title,
                'desc': desc,
                'play_number': play_number
            }

            yield info_dict


if __name__ == '__main__':
    cmdline.execute('scrapy crawl qingting --nolog'.split())
