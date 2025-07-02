# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import os
import pymongo
from itemadapter import ItemAdapter


# 管道文件, 主要负责数据的存储操作
# 管道类必须在settings中完成注册
class FmPipeline:
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['fm_info']

    # 尽量不要用这种方式释放数据库资源
    def __del__(self):
        self.mongo_client.close()
        print('数据库已关闭...')

    def process_item(self, item, spider):
        type_ = item.get('type_')
        if type_ == 'text':
            self.collection.insert_one(item)
            print('保存成功:', item)
        elif type_ == 'image':
            download_path = os.getcwd() + '/download_images/'
            if not os.path.exists(download_path):
                os.mkdir(download_path)

            image_name = item.get('image_name')
            image_content = item.get('image_content')
            with open(download_path + image_name, 'wb') as f:
                f.write(image_content)
                print('保存成功:', image_name)
        else:
            print('数据类型不符合规定...')

        return item
