# -*- coding: utf-8 -*-
# @Time    : 2024/12/12 20:08
# @Author  : 顾安
# @File    : 1.汽车之家 - mongodb.py


import redis
import chardet
import hashlib
import asyncio
import aiohttp
from lxml import etree
from fake_useragent import UserAgent
from motor.motor_asyncio import AsyncIOMotorClient


class CarSpider:
    redis_client = redis.Redis()

    # motor自带数据库链接池且执行完毕之后会自动释放资源
    mongo_client = AsyncIOMotorClient('localhost', 27017)['py_spider']['car_info']

    def __init__(self):
        self.url = 'https://www.che168.com/china/a0_0msdgscncgpi1ltocsp{}exf4x0/?pvareaid=102179#currengpostion'
        self.api_url = 'https://cacheapigo.che168.com/CarProduct/GetParam.ashx?specid={}'
        self.user_agent = UserAgent()

    def __del__(self):
        print('redis数据库连接即将关闭...')
        self.redis_client.close()

    async def get_car_id(self, page, session):
        headers = {'User-Agent': self.user_agent.random}
        async with session.get(self.url.format(page), headers=headers) as response:
            content = await response.read()
            encoding = chardet.detect(content)['encoding']
            if encoding == 'GB2312' or encoding == 'ISO-8859-1':
                result = content.decode('gbk')
                print('请求成功:', headers)
            else:
                result = content.decode(encoding)
                print('被反爬了:', headers)

            tree = etree.HTML(result)
            id_list = tree.xpath('//ul[@class="viewlist_ul"]/li/@specid')
            if id_list:
                tasks = [asyncio.create_task(self.get_car_info(spec_id, session)) for spec_id in id_list]
                await asyncio.wait(tasks)

    async def get_car_info(self, spec_id, session):
        headers = {'User-Agent': self.user_agent.random}
        async with session.get(self.api_url.format(spec_id), headers=headers) as response:
            result = await response.json()
            if result['result'].get('paramtypeitems'):
                item = dict()
                item['name'] = result['result']['paramtypeitems'][0]['paramitems'][0]['value']
                item['price'] = result['result']['paramtypeitems'][0]['paramitems'][1]['value']
                item['brand'] = result['result']['paramtypeitems'][0]['paramitems'][2]['value']
                item['altitude'] = result['result']['paramtypeitems'][1]['paramitems'][2]['value']
                item['breadth'] = result['result']['paramtypeitems'][1]['paramitems'][1]['value']
                item['length'] = result['result']['paramtypeitems'][1]['paramitems'][0]['value']
                await self.save_car_info(item)
            else:
                print('数据不存在...')

    @staticmethod
    def get_md5(dict_item):
        md5 = hashlib.md5()
        md5.update(str(dict_item).encode('utf-8'))
        return md5.hexdigest()

    async def save_car_info(self, item):
        md5_hash = self.get_md5(item)
        redis_result = self.redis_client.sadd('car:filter', md5_hash)
        if redis_result:
            await self.mongo_client.insert_one(item)
            print('数据保存成功:', item)
        else:
            print('数据重复...')


    async def main(self):
        async with aiohttp.ClientSession() as session:
            tasks = [asyncio.create_task(self.get_car_id(page, session)) for page in range(1, 11)]
            await asyncio.wait(tasks)


if __name__ == '__main__':
    car_spider = CarSpider()
    loop = asyncio.get_event_loop()
    loop.run_until_complete(car_spider.main())
