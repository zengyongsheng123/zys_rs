import asyncio
import websockets
import json
import logging
import time
import random
import requests

# 配置日志
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


class KuaishouLiveClient:
    def __init__(self, ws_url, room_id, token=None):
        self.ws_url = ws_url  # WebSocket 地址
        self.room_id = room_id  # 直播间 ID
        self.token = token  # 认证 token
        self.websocket = None
        self.reconnect_interval = 5  # 重连间隔（秒）
        self.heartbeat_interval = 15  # 心跳间隔（秒，调整为更频繁）
        self.is_connected = False  # 连接状态

    async def connect(self):
        """建立 WebSocket 连接并认证"""
        try:
            ws_url = f"{self.ws_url}?appver=3.0.0&did=device_{random.randint(1000, 9999)}"
            if self.token:
                ws_url += f"&token={self.token}"
            self.websocket = await websockets.connect(ws_url)
            self.is_connected = True
            logger.info("已连接到快手 WebSocket 服务器")
            # 认证消息（占位，需抓包确认）
            auth_message = json.dumps({
                "type": "join",
                "room_id": self.room_id,
                "client_id": f"client_{random.randint(1000, 9999)}"
            })
            await self.websocket.send(auth_message)
            logger.info(f"发送认证消息: {auth_message}")
        except Exception as e:
            self.is_connected = False
            logger.error(f"连接失败: {e}")
            await self.reconnect()

    async def heartbeat(self):
        """发送心跳包"""
        while self.is_connected:
            try:
                if self.websocket:
                    # 快手心跳（需抓包确认）
                    heartbeat_message = json.dumps({"type": "heartbeat", "timestamp": int(time.time())})
                    await self.websocket.send(heartbeat_message)
                    logger.debug("发送心跳包")
                await asyncio.sleep(self.heartbeat_interval)
            except Exception as e:
                self.is_connected = False
                logger.error(f"心跳失败: {e}")
                await self.reconnect()
                break

    async def receive_messages(self):
        """接收和处理直播间数据"""
        try:
            async for message in self.websocket:
                logger.debug(f"原始消息: {message!r}")  # 调试原始消息
                try:
                    data = json.loads(message)
                    self.process_message(data)
                except json.JSONDecodeError:
                    logger.warning(f"收到非 JSON 数据: {message!r}")
                    self.process_binary_message(message)
                except Exception as e:
                    logger.error(f"消息处理失败: {e}")
        except websockets.ConnectionClosed as e:
            self.is_connected = False
            logger.error(f"WebSocket 连接断开: {e}")
            await self.reconnect()

    def process_message(self, data):
        """处理 JSON 消息"""
        msg_type = data.get("type")
        if msg_type == "danmu":
            user = data.get("user", {}).get("name", "未知用户")
            content = data.get("content", "")
            logger.info(f"弹幕 [{user}]: {content}")
        elif msg_type == "gift":
            user = data.get("user", {}).get("name", "未知用户")
            gift_name = data.get("gift_name", "未知礼物")
            logger.info(f"礼物 [{user}]: {gift_name}")
        elif msg_type == "enter":
            user = data.get("user", {}).get("name", "未知用户")
            logger.info(f"用户进入: {user}")
        elif msg_type == "error":
            logger.error(f"服务器错误: {data.get('message', '未知错误')}")
        else:
            logger.debug(f"其他消息: {data}")

    def process_binary_message(self, message):
        """处理二进制消息（如 Protobuf）"""
        logger.info("二进制消息解析未实现，请根据抓包结果定义 Protobuf 结构")

    async def reconnect(self):
        """断线重连"""
        self.is_connected = False
        if self.websocket:
            try:
                await self.websocket.close()
            except Exception:
                pass
        backoff = self.reconnect_interval
        while not self.is_connected:
            logger.info(f"尝试重连，间隔 {backoff} 秒...")
            try:
                await self.connect()
                await asyncio.gather(self.receive_messages(), self.heartbeat())
                break
            except Exception as e:
                logger.error(f"重连失败: {e}")
                await asyncio.sleep(backoff)
                backoff = min(backoff * 2, 60)

    async def start(self):
        """启动客户端"""
        await self.connect()
        await asyncio.gather(self.receive_messages(), self.heartbeat())


def get_room_info(username):
    """获取直播间 ID 和 token"""
    try:
        url = f"https://live.kuaishou.com/rest/wd/live/info?userId={username}"
        headers = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "zh,zh-CN;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Origin": "https://live.kuaishou.com",
            "Pragma": "no-cache",
            # "Referer": "https://live.kuaishou.com/u/wzrydianjing",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
            "kww": "+/rlGfH9Gf0HA8BP0MwB80PeWlGAqF8/W9PAS0PAW7P08DG0rIPfPEPeWFwnbjPerF+9rU+ezSG0r7G9QjPePlP0SjGAL9+Br980+D+ArEwnbjPeqI+eHMPA+fGfrh+/chw/8f+/qF+/PMP9Gh80ZF+/rA+9PU+nHh+nL9GfzS8eW=",
            "sec-ch-ua": "\"Google Chrome\";v=\"137\", \"Chromium\";v=\"137\", \"Not/A)Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        cookies = {
            "kuaishou.live.bfb1s": "477cb0011daca84b36b3a4676857e5a1",
            "clientid": "3",
            "did": "web_a38b95ad0d5fc7d582f948ad23e0b4f9",
            "client_key": "65890b29",
            "kpn": "GAME_ZONE",
            "kwpsecproductname": "PCLive",
            "kwssectoken": "2w/TRvEiusqHYn7PHvOunbcqUwReqhUiFhSFtZOxhlBxJivjWGmJXQk6gvmPc1l+zZkcMEFrrfInFmRfjKLXHw==",
            "kwscode": "04dc103d63222cfdfec0057c058fb1c4c5f2eb14eefcce98b2a503578e5f8431",
            "kwfv1": "+/rlGfH9Gf0HA8BP0MwB80PeWlGAqF8/W9PAS0PAW7P08DG0rIPfPEPeWFwnbjPerF+9rU+ezSG0r7G9QjPePlP0SjGAL9+Br980+D+ArEwnbjPeqI+eHMPA+fGfrh+/chw/8f+/qF+/PMP9Gh80ZF+/rA+9PU+nHh+nL9GfzS8eW="
        }
        response = requests.get(url, headers=headers,cookies=cookies)
        data = response.json().get("data", {})
        return data.get("liveStreamId"), data.get("token")
    except Exception as e:
        logger.error(f"获取直播间信息失败: {e}")
        return None, None


async def main():
    # 获取直播间 ID 和 token
    username = "nan21241"
    room_id, token = get_room_info(username)
    if not room_id:
        logger.error("无法获取直播间 ID，程序退出")
        return

    # 配置 WebSocket
    ws_url = "wss://livejs-ws-group6.gifshow.com/websocket"
    client = KuaishouLiveClient(ws_url, room_id, token)
    await client.start()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("程序退出")
    except Exception as e:
        logger.error(f"程序异常: {e}")
