import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse
from scrapy_redis.spiders import RedisSpider


class Top250Spider(RedisSpider):
    name = 'top250'
    redis_key = 'top250:start_urls'  # 让scrapy从redis数据库中获取请求的url

    def parse(self, response: HtmlResponse, **kwargs):
        li_list = response.xpath('//ol[@class="grid_view"]/li')
        for li_temp in li_list:
            info_dict = dict()

            image = li_temp.xpath(".//img/@src").extract_first()
            title = li_temp.xpath(".//span[@class='title'][1]/text()").extract_first()
            rating_num = li_temp.xpath(".//span[@class='rating_num']/text()").extract_first()
            people_num = li_temp.xpath(".//div[@class='star']/span[4]/text()").extract_first()

            # 如果使用items验证字段, 在缺少字段的情况下能验证通过, 多部分字段不行
            info_dict['type_'] = 'info'
            info_dict['image'] = image
            info_dict['title'] = title
            info_dict['rating_num'] = rating_num
            info_dict['people_num'] = people_num

            yield info_dict
            yield scrapy.Request(image, callback=self.parse_image, cb_kwargs={'image_name': title})

        if response.xpath("//span[@class='next']/a/@href"):
            next_url = response.urljoin(response.xpath("//span[@class='next']/a/@href").extract_first())
            print('开始抓取下一页:', next_url)
            yield scrapy.Request(next_url, callback=self.parse)

    def parse_image(self, response, image_name):
        yield {
            'type_': 'image',
            'image_name': image_name + '.jpg',
            'image_content': response.body
        }


if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250'.split())


"""
总结:
    如果需要将豆瓣项目转为分布式
        1.需要将原有的spider替换成redisSpider类: RedisSpider
        2.当爬虫类被替换之后, 原有的start_requests方法无法使用
        3.继承了RedisSpider类之后需要在redis数据库中上传你要访问的url: redis_key (本质上是一个基于redis的列表)
        4.需要自己编辑一个上传url的脚本
        5.需要在settings中设置scrapy-redis的配置项(可以直接复制)
"""
