# -*- coding: utf-8 -*-
# @Time    : 2024/12/10 20:20
# @Author  : 顾安
# @File    : 2.获取协程任务中的返回值.py


import asyncio
import aiohttp

url = 'https://www.baidu.com'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}


# 创建回调函数: 不是协程任务
def callback(future):
    print(future.result())


async def get_baidu():
    async with aiohttp.ClientSession() as session:
        async with session.get(url, headers=headers) as response:
            result = await response.text()
            return result


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    tasks = [loop.create_task(get_baidu()) for _ in range(10)]

    for task in tasks:
        task.add_done_callback(callback)

    loop.run_until_complete(asyncio.wait(tasks))

    # done, pending = loop.run_until_complete(asyncio.wait(tasks))
    # for task in done:
    #     print(task.result())

    # result_list = loop.run_until_complete(asyncio.gather(*tasks))
    # print(result_list)
