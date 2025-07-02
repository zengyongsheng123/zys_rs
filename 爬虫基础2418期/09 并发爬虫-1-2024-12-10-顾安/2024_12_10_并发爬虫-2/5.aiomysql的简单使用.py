# -*- coding: utf-8 -*-
# @Time    : 2024/12/10 20:45
# @Author  : 顾安
# @File    : 5.aiomysql的简单使用.py


import asyncio
import aiomysql


async def get_tx_work():
    # 1.创建数据库链接对象
    # db = await aiomysql.connect(host='localhost', port=3306, user='root', password='root', db='py_spider')

    # 2.创建游标对象
    # cursor = await db.cursor()

    # 3.查询数据
    # sql = 'select * from tx_work;'
    # await cursor.execute(sql)
    # result = await cursor.fetchall()
    # print(result)

    # 4.关闭资源
    # await cursor.close()
    # db.close()

    async with aiomysql.connect(host='localhost', port=3306, user='root', password='root', db='py_spider') as db:
        async with db.cursor() as cursor:
            await cursor.execute('select * from tx_work;')
            result = await cursor.fetchall()
            print(result)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(get_tx_work())
