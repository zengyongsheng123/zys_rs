import asyncio
import websockets
import json
import random
from datetime import datetime

# 存储每个客户端的采集频率和定时任务
clients = {}


async def handle_client(websocket, path):
    client_id = id(websocket)
    print(f"客户端 {client_id} 已连接")

    # 默认采集频率为 1 秒
    clients[client_id] = {"frequency": 1, "task": None}

    async def send_data():
        """定时推送采集数据"""
        while True:
            data = {
                "timestamp": datetime.now().isoformat(),
                "value": random.uniform(0, 100)  # 模拟传感器数据
            }
            try:
                await websocket.send(json.dumps(data))
            except websockets.ConnectionClosed:
                break
            await asyncio.sleep(clients[client_id]["frequency"])

    # 启动数据推送任务
    clients[client_id]["task"] = asyncio.create_task(send_data())

    try:
        # 监听客户端消息
        async for message in websocket:
            print(f"收到客户端 {client_id} 消息: {message}")
            try:
                data = json.loads(message)
                # 处理设置采集频率的指令
                if data.get("type") == "set_frequency":
                    frequency = float(data.get("frequency", 1))
                    if frequency <= 0:
                        await websocket.send(json.dumps({"error": "频率必须大于 0"}))
                        continue
                    clients[client_id]["frequency"] = frequency
                    await websocket.send(json.dumps({"message": f"采集频率已设置为 {frequency} 秒"}))
            except json.JSONDecodeError:
                await websocket.send(json.dumps({"error": "无效的 JSON 格式"}))
            except Exception as e:
                await websocket.send(json.dumps({"error": str(e)}))

    except websockets.ConnectionClosed:
        print(f"客户端 {client_id} 已断开")
    finally:
        # 清理客户端
        if client_id in clients:
            clients[client_id]["task"].cancel()
            del clients[client_id]


async def main():
    # 启动 WebSocket 服务器，监听 localhost:8080
    server = await websockets.serve(handle_client, "localhost", 8080)
    print("WebSocket 服务器运行在 ws://localhost:8080")
    await server.wait_closed()


if __name__ == "__main__":
    asyncio.run(main())