# -*- coding: utf-8 -*-
# @Time    : 2024/12/10 20:32
# @Author  : 顾安
# @File    : 3.asyncio中的回调函数脚本.py


import asyncio


# 必须是任务执行完毕之后才能被调用
def my_callback(obj):
    print(obj.result())


async def work():
    print(1)
    await asyncio.sleep(1)
    print(2)
    return 123


loop = asyncio.get_event_loop()
task_obj = loop.create_task(work())
task_obj.add_done_callback(my_callback)
loop.run_until_complete(task_obj)
