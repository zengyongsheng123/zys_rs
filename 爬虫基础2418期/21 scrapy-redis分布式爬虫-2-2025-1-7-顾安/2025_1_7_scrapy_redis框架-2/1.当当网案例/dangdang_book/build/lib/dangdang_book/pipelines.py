# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
import pymysql
from itemadapter import ItemAdapter


class DangDangBookPipeline:
    def open_spider(self, spider):
        self.db = pymysql.connect(host='localhost', port=3306, user='root', password='root', db='py_spider')
        self.cursor = self.db.cursor()

        # 创建数据表
        sql = '''
            CREATE TABLE IF NOT EXISTS book_info(
                id int primary key auto_increment not null,
                title VARCHAR(255) NOT NULL, 
                price VARCHAR(255) NOT NULL, 
                author VARCHAR(255) NOT NULL, 
                date_data VARCHAR(255) NOT NULL, 
                detail TEXT, 
                producer VARCHAR(255) NOT NULL)
            '''
        try:
            self.cursor.execute(sql)
            print("表创建成功...")
        except Exception as e:
            print(f"表创建失败:", e)

    def process_item(self, item, spider):
        sql = '''
            INSERT INTO book_info(id, title, price, author, date_data, detail, producer) values (%s, %s, %s, %s, %s, %s, %s)
        '''
        try:
            self.cursor.execute(sql, (
                0, item['title'], item['price'], item['author'], item['date_data'], item['detail'],
                item['producer']))
            # 提交到数据库执行
            self.db.commit()
            print('数据插入成功:', (
                0, item['title'], item['price'], item['author'], item['date_data'], item['detail'],
                item['producer']))
        except Exception as e:
            print(f'数据插入失败: {e}')
            # 如果发生错误就回滚
            self.db.rollback()

        return item

    def close_spider(self, spider):
        self.cursor.close()
        self.db.close()
