# -*- coding: utf-8 -*-
# @Time    : 2024/12/8 21:51
# @Author  : 顾安
# @File    : 1.协程函数以及协程对象并执行协程任务.py



import asyncio


# 1. 协程任务必须先要定义协程函数
async def work():
    for i in range(1, 6):
        print('结果:', i)
        await asyncio.sleep(1)


# 2. 执行协程函数: 返回了一个协程对象, 协程函数本身是不能直接被运行的
# 3. 通过事件循环对象去执行协程对象

coro_obj_1 = work()
coro_obj_2 = work()

coro_list = [coro_obj_1, coro_obj_2]
loop = asyncio.get_event_loop()
loop.run_until_complete(asyncio.wait(coro_list))



