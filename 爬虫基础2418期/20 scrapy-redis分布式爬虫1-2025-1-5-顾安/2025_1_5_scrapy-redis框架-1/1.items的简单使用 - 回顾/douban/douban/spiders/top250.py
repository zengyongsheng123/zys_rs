import scrapy
from scrapy import cmdline
from ..items import DoubanItem  # 如果通过当前方式完成导入则必须使用终端命令的方式启动
from scrapy.http import HtmlResponse


class Top250Spider(scrapy.Spider):
    name = 'top250'
    start_urls = ['https://movie.douban.com/top250']

    def parse(self, response: HtmlResponse, **kwargs):
        li_list = response.xpath('//ol[@class="grid_view"]/li')

        for li_temp in li_list:
            info_dict = DoubanItem()

            image = li_temp.xpath(".//img/@src").extract_first()
            title = li_temp.xpath(".//span[@class='title'][1]/text()").extract_first()
            rating_num = li_temp.xpath(".//span[@class='rating_num']/text()").extract_first()
            people_num = li_temp.xpath(".//div[@class='star']/span[4]/text()").extract_first()

            # 如果使用items验证字段, 在缺少字段的情况下能验证通过, 多部分字段不行
            info_dict['image'] = image
            info_dict['title'] = title
            info_dict['rating_num'] = rating_num
            info_dict['people_num'] = people_num

            # print(info_dict)
            yield info_dict


# if __name__ == '__main__':
#     cmdline.execute("scrapy crawl top250 --nolog".split())
