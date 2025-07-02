import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class QingtingSpider(scrapy.Spider):
    name = 'qingting'
    allowed_domains = ['m.qingting.fm']
    start_urls = ['https://m.qingting.fm/rank']

    def parse(self, response: HtmlResponse, **kwargs):
        # print('测试信息:', response.text)
        # print('请求头信息:', response.request.headers)

        # 获取排行榜父标签(xpath方法返回的数据集是一个列表)
        rank_list = response.xpath('//div[@class="rank-list"]/a')
        # print(rank_list)

        for rank in rank_list:
            # rank_number = rank.xpath('./div[@class="badge"]/text()')
            # img_url = rank.xpath("./img/@src")
            # title = rank.xpath('./div[@class="content"]/div[@class="title"]/text()')  # 标题
            # desc = rank.xpath('./div[@class="content"]/div[@class="desc"]/text()')  # 描述
            # play_number = rank.xpath('.//div[@class="info-item"][1]/span/text()')  # 播放次数
            #
            # print(rank_number[0], img_url[0], title[0], desc[0], play_number[0])

            # 没有索引下标取值的情况下返回的是一个列表, 并且列表中的元素是一个对象, extract可以将元素对象转为数据
            # rank_number = rank.xpath('./div[@class="badge"]/text()').extract()
            # img_url = rank.xpath("./img/@src").extract()
            # title = rank.xpath('./div[@class="content"]/div[@class="title"]/text()').extract()  # 标题
            # desc = rank.xpath('./div[@class="content"]/div[@class="desc"]/text()').extract()  # 描述
            # play_number = rank.xpath('.//div[@class="info-item"][1]/span/text()').extract()  # 播放次数

            # 使用extract_first方法直接返回数据
            rank_number = rank.xpath('./div[@class="badge"]/text()').get()
            img_url = rank.xpath("./img/@src").extract_first()
            title = rank.xpath('./div[@class="content"]/div[@class="title"]/text()').extract_first()  # 标题
            desc = rank.xpath('./div[@class="content"]/div[@class="desc"]/text()').extract_first()  # 描述
            play_number = rank.xpath('.//div[@class="info-item"][1]/span/text()').extract_first()  # 播放次数
            print(rank_number, img_url, title, desc, play_number)


if __name__ == '__main__':
    cmdline.execute('scrapy crawl qingting --nolog'.split())

    """
    scrapy中的response对象直接支持xpath语法, 解析返回的数据是一个列表, 列表中的元素是Selector对象
        有三种方式直接返回数据
            1.元素下标取值可以直接拿到数据
            2.通过extract将对象转为数据并通过元素下标获取数据
            3.通过extract_first直接返回数据本身
            4.通过get方法直接返回数据本身
    """