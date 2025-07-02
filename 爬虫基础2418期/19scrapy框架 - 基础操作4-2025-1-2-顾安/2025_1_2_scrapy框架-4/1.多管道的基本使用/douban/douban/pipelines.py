# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
from scrapy.exceptions import DropItem  # 异常类(管道在执行的过程中如果捕获到了DropItem异常则将数据丢弃)


class DoubanPipeline:
    def process_item(self, item, spider):
        # if item.get('type_') == 'info':
        #     raise DropItem('数据异常')

        print('返回的数据 - 1:', item)
        # 在数据返回给第二个管道之前再次对数据进行处理
        item['type_'] = '自定义的数据类型'
        # 如果想将数据传递给下一个管道则必须通过return返回
        return item


class NewDoubanPipeline:
    def process_item(self, item, spider):
        print('返回的数据 - 2:', item)
