import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class QingTingSpider(scrapy.Spider):
    name = 'qingting'
    # allowed_domains = ['m.qingting.fm']
    start_urls = ['https://m.qingting.fm/rank']

    def parse(self, response: HtmlResponse, **kwargs):
        rank_list = response.xpath('//div[@class="rank-list"]/a')

        for rank in rank_list:
            rank_number = rank.xpath('./div[@class="badge"]/text()').get()
            img_url = rank.xpath("./img/@src").extract_first()
            title = rank.xpath('./div[@class="content"]/div[@class="title"]/text()').extract_first()  # 标题
            desc = rank.xpath('./div[@class="content"]/div[@class="desc"]/text()').extract_first()  # 描述
            play_number = rank.xpath('.//div[@class="info-item"][1]/span/text()').extract_first()  # 播放次数

            dict_info = {
                'type_': 'text',
                'rank_number': rank_number,
                'img_url': img_url,
                'title': title,
                'desc': desc,
                'play_number': play_number
            }
            # 解析函数中的yield能够传递的对象只能是：BaseItem、Request、dict、None
            yield dict_info

            # 在请求图片资源时建议检查请求白名单
            yield scrapy.Request(img_url, callback=self.parse_image, cb_kwargs={'image_name': title})

    # 回调函数: 组织图片的数据结构
    def parse_image(self, response: HtmlResponse, image_name):
        yield {
            'type_': 'image',
            'image_name': image_name + '.png',
            'image_content': response.body
        }


if __name__ == '__main__':
    cmdline.execute('scrapy crawl qingting --nolog'.split())


    """
    1.在spider爬虫类中的yield可以发送多种类型数据
        item requests dict none
    
    2.在一个解析函数中可以存在多个yield关键字
    
    3.如果需要在解析函数中构建一个新的请求对象需要用到Request
        scrapy.Request
        
        创建新的请求对象需要绑定一个新的解析函数(需要开发者自己手动构建)
            构建完成之后需要进行绑定: callback=你自己构建的解析函数引用
            如果自己构建的解析函数有形式参数则使用cb_kwargs去进行传递
    """