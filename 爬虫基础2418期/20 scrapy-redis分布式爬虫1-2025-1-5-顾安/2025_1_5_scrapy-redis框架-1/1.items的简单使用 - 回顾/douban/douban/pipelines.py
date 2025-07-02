# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import pymongo
from itemadapter import ItemAdapter


class DoubanPipeline:
    def open_spider(self, spider):
        self.mongo_client = pymongo.MongoClient()
        self.collection = self.mongo_client['py_spider']['scrapy_douban']

    def process_item(self, item, spider):
        # 需要将item字段数据强转为字典类型
        self.collection.insert_one(dict(item))
        print('保存成功:', item)
        return item

    def close_spider(self, spider):
        self.mongo_client.close()

