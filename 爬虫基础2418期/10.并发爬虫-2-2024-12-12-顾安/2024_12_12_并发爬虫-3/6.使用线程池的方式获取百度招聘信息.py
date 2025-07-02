# -*- coding: utf-8 -*-
# @Time    : 2024/12/12 21:45
# @Author  : 顾安
# @File    : 6.使用线程池的方式获取百度招聘信息.py


import pymysql
import requests
from dbutils.pooled_db import PooledDB
from concurrent.futures import ThreadPoolExecutor, as_completed


class BaiDuWorkSpider:
    def __init__(self):
        self.pool = PooledDB(
            creator=pymysql,  # 使用链接数据库的模块
            maxconnections=6,  # 连接池允许的最大连接数，0和None表示不限制连接数
            mincached=2,  # 初始化时，链接池中至少创建的空闲的链接，0表示不创建
            maxcached=5,  # 链接池中最多闲置的链接，0和None不限制
            maxshared=3,  # 设置线程之间的共享连接
            blocking=True,  # 连接耗尽则等待直至有可用的连接为止
            maxusage=None,  # 一个链接最多被重复使用的次数，None表示无限制
            setsession=[],  # 开始会话前执行的命令列表。如：["set datestyle to ...", "set time zone ..."]
            ping=0,
            host='localhost',
            port=3306,
            user='root',
            password='root',
            database='py_spider',
            charset='utf8'
        )

        self.api_url = 'https://talent.baidu.com/httservice/getPostListNew'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://talent.baidu.com/jobs/social-list?search=python'
        }

    def get_work_info(self, page_num):
        post_form = {
            "recruitType": "SOCIAL",
            "pageSize": "10",
            "keyWord": "python",
            "curPage": page_num,
            "projectType": ""
        }
        response = requests.post(self.api_url, headers=self.headers, data=post_form).json()
        return response


    def parse_work_info(self, response):
        works = response['data']['list']
        for work_info in works:
            education = work_info['education'] if work_info['education'] else '空'
            name = work_info['name']
            service_condition = work_info['serviceCondition']
            self.save_work_info(0, education, name, service_condition)


    def save_work_info(self, *args):
        """
        :param args: id, education, name, service_condition
        :return:
        """

        with self.pool.connection() as db:
            with db.cursor() as cursor:
                sql = """
                    insert into baidu_work_thread_pool values (%s, %s, %s, %s);
                """

                try:
                    cursor.execute(sql, args)
                    db.commit()
                    print('数据保存成功:', args)
                except Exception as e:
                    print('数据保存失败:', e)
                    db.rollback()

    def create_table(self):
        with self.pool.connection() as db:
            with db.cursor() as cursor:
                sql = """
                    create table if not exists baidu_work_thread_pool(
                        id int primary key auto_increment,
                        name varchar(100),
                        education varchar(200),
                        service_condition text
                    );
                """
                try:
                    cursor.execute(sql)
                    print('表创建成功...')
                except Exception as e:
                    print('表创建失败:', e)


    def main(self):
        self.create_table()
        with ThreadPoolExecutor(max_workers=5) as pool:
            futures = [pool.submit(self.get_work_info, page) for page in range(1, 38)]
            for future in as_completed(futures):
                pool.submit(self.parse_work_info, future.result())


if __name__ == '__main__':
    baidu_work = BaiDuWorkSpider()
    baidu_work.main()

