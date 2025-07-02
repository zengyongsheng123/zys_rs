import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class Top250Spider(scrapy.Spider):
    name = 'top250'
    start_urls = ['https://movie.douban.com/top250']

    def start_requests(self):
        for page in range(10):
            url = f'https://movie.douban.com/top250?start={page * 25}&filter='
            # 默认情况下callback自动回调parse函数
            yield scrapy.Request(url)

    def parse(self, response: HtmlResponse, **kwargs):
        # print('spider中的请求信息:', response.request.headers)
        li_list = response.xpath('//ol[@class="grid_view"]/li')
        for li_temp in li_list:
            image_url = li_temp.xpath(".//img/@src").extract_first()
            title = li_temp.xpath(".//span[@class='title'][1]/text()").extract_first()
            rating_num = li_temp.xpath(".//span[@class='rating_num']/text()").extract_first()
            people_num = li_temp.xpath(".//div[@class='star']/span[4]/text()").extract_first()

            yield {
                'type_': 'info',
                'image': image_url,
                'title': title,
                'rating_num': rating_num,
                'people_num': people_num,
            }

            # cb_kwargs中的key必须和parse函数的参数一致
            yield scrapy.Request(image_url, callback=self.parse_image, cb_kwargs={'image_name': title})

        # 根据页面中的翻页按钮的属性url完成下一页的链接拼接并请求
        # if response.xpath('//span[@class="next"]/a/@href'):
        #     next_url = response.urljoin(response.xpath('//span[@class="next"]/a/@href').extract_first())
        #     yield scrapy.Request(next_url)
        # else:
        #     print('全站抓取完毕...')


    def parse_image(self, response: HtmlResponse, image_name):
        yield {
            'type_': 'image',
            'image_name': image_name + '.jpg',
            'image_content': response.body
        }


if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250'.split())
