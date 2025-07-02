# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class DoubanItem(scrapy.Item):
    # 创建你要保存的字段, 当前字段在保存之前会进行验证(会验证这个字段是否存在)
    image = scrapy.Field()
    title = scrapy.Field()
    rating_num = scrapy.Field()
    people_num = scrapy.Field()

