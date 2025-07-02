# -*- coding: utf-8 -*-
# @Time    : 2025/1/12 20:35
# @Author  : 顾安
# @File    : create_table_info.py


from feapder.db.mysqldb import MysqlDB

db = MysqlDB(ip='localhost', port=3306, user='root', password='root', db='py_spider')

sql = """
    create table if not exists douban_feapder(
        id int primary key auto_increment,
        title varchar(255) not null,
        score varchar(255) not null,
        detail_url varchar(255) not null,
        detail_text text
    );
"""

# 使用MysqlDB无需手动创建游标对象
db.execute(sql)

