import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class Top250Spider(scrapy.Spider):
    name = 'top250'
    allowed_domains = ['www.movie.douban.com']
    start_urls = ['https://movie.douban.com/top250?start=0&filter=']

    def parse(self, response: HtmlResponse, **kwargs):
        li_list = response.xpath('//ol[@class="grid_view"]/li')
        for li_temp in li_list:
            image_url = li_temp.xpath(".//img/@src").extract_first()
            title = li_temp.xpath(".//span[@class='title'][1]/text()").extract_first()
            rating_num = li_temp.xpath(".//span[@class='rating_num']/text()").extract_first()
            people_num = li_temp.xpath(".//div[@class='star']/span[4]/text()").extract_first()

            yield {
                'type_': 'info',
                'image_url': image_url,
                'title': title,
                'rating_num': rating_num,
                'people_num': people_num
            }


if __name__ == '__main__':
    cmdline.execute('scrapy crawl top250 --nolog'.split())
