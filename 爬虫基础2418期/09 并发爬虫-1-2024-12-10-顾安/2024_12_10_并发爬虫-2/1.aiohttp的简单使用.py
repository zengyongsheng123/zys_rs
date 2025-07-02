# -*- coding: utf-8 -*-
# @Time    : 2024/12/10 20:04
# @Author  : 顾安
# @File    : 1.aiohttp的简单使用.py


import asyncio
import aiohttp


url = 'https://www.baidu.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}


async def get_baidu():
    # 1.创建请求对象
    # session = aiohttp.ClientSession()

    # 2.使用请求对象发送网络请求 - get（get方法会返回一个响应对象）
    # response = await session.get(url, headers=headers)

    # 3.获取响应对象中的结果
    # result = await response.text()
    # print(result)

    # 4.关闭资源
    # await session.close()
    # response.close()

    # 利用异步上下文的方式释放请求资源
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            result = await response.text()
            print(result)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()  # 创建事件循环对象
    tasks = [loop.create_task(get_baidu()) for _ in range(10)]
    loop.run_until_complete(asyncio.wait(tasks))

