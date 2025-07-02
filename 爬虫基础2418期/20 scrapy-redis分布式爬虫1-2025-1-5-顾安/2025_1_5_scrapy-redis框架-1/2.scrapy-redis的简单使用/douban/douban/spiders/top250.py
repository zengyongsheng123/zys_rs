import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class Top250Spider(scrapy.Spider):
    name = 'top250'

    def start_requests(self):
        url = 'https://movie.douban.com/top250?start={}&filter='
        for page in range(10):
            yield scrapy.Request(url.format(page * 25))

    def parse(self, response: HtmlResponse, **kwargs):
        li_list = response.xpath('//ol[@class="grid_view"]/li')
        for li_temp in li_list:
            info_dict = dict()

            image = li_temp.xpath(".//img/@src").extract_first()
            title = li_temp.xpath(".//span[@class='title'][1]/text()").extract_first()
            rating_num = li_temp.xpath(".//span[@class='rating_num']/text()").extract_first()
            people_num = li_temp.xpath(".//div[@class='star']/span[4]/text()").extract_first()

            # 如果使用items验证字段, 在缺少字段的情况下能验证通过, 多部分字段不行
            info_dict['image'] = image
            info_dict['title'] = title
            info_dict['rating_num'] = rating_num
            info_dict['people_num'] = people_num

            yield info_dict

            yield scrapy.Request(image, callback=self.parse_image, cb_kwargs={'image_name': title})

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
    当启动项目之后暂停会在redis中创建两个key: request / dupfilter
        request表示暂未请求的请求对象
        dupfilter表示已经请求过的请求对象
"""
