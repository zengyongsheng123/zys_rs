import asyncio
import websockets


# 发送数据给客户端
async def echo(websocket):
    await asyncio.create_task(recv_msg(websocket))
    mess = 'hello'
    await websocket.send(mess)
    return True


# 接受客户端返回的数据
async def recv_msg(websocket):
    while True:
        rec_text = await websocket.recv()
        print(rec_text)


# 修改后的 main 函数
async def main():
    async with websockets.serve(echo, '127.0.0.1', 8081) as ws:
        await ws.serve_forever()


# 使用 asyncio.run 启动事件循环
if __name__ == '__main__':
    asyncio.run(main())
