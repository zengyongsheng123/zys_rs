import random, string, base64, hashlib, json, time, threading, urllib.parse
from typing import List
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad


# 生成x-b3-traceid参数
def generate_trace_id():
    hex_chars = string.hexdigits.lower()[:16]  # 直接获取 "0123456789abcdef"
    return ''.join(random.choice(hex_chars) for _ in range(16))


# print(generate_trace_id())

# 生成x-s参数
def generate_X_s(url: str, a1: str, ts: str, platform: str = 'xhs-pc-web') -> str:
    key_bytes = b'7cc4adla5ay0701v'
    iv = b'4uzjr7mbsibcaldp'
    # 步骤1: MD5加密URL
    md5_hash = hashlib.md5(url.encode()).hexdigest()
    # 步骤2: 构造待加密文本
    plain_text_parts = [
        f'x1={md5_hash}',
        'x2=0|0|0|1|0|0|1|0|0|0|1|0|0|0|0|1|0|0|0',
        f'x3={a1}',
        f'x4={ts}'
    ]
    plain_text = ';'.join(plain_text_parts) + ';'
    # 步骤3: AES-CBC加密
    text_encoded = base64.b64encode(plain_text.encode())
    cipher = AES.new(key_bytes, AES.MODE_CBC, iv)
    ciphertext = cipher.encrypt(pad(text_encoded, AES.block_size))
    encrypted_b64 = base64.b64encode(ciphertext).decode()
    # 步骤4: 构造payload
    payload_obj = {
        "signSvn": "56",
        "signType": "x2",
        "appId": platform,
        "signVersion": "1",
        "payload": base64.b64decode(encrypted_b64).hex()
    }
    payload_b64 = base64.b64encode(
        json.dumps(payload_obj, separators=(',', ':')).encode()
    ).decode()
    return f'XYW_{payload_b64}'


# url = '''url=/api/sns/web/v1/homefeed{"cursor_score":"","num":39,"refresh_type":1,"note_index":35,"unread_begin_note_id":"","unread_end_note_id":"","unread_note_count":0,"category":"homefeed_recommend","search_key":"","need_num":14,"image_formats":["jpg","webp","avif"],"need_filter_image":false}'''
# a1 = "1960b4b8035inpqotvqy6240bb0ex80p8y92xavdp50000176977"
# signature = generate_X_s(url, a1,str(int(time.time() * 1000)))
# print(signature)

# 生成x-xray-traceid
def generate_xray_trace_id() -> str:
    """生成32位十六进制追踪ID（线程安全）"""
    # 静态变量（通过函数属性模拟）
    if not hasattr(generate_xray_trace_id, '_atomic_counter'):
        generate_xray_trace_id._atomic_counter = 0
        generate_xray_trace_id._lock = threading.Lock()
        generate_xray_trace_id._random = random.Random()

    # 时间戳部分（左移23位留出计数器空间）
    timestamp = int(time.time() * 1000) << 23

    # 原子计数器部分
    with generate_xray_trace_id._lock:
        counter = generate_xray_trace_id._atomic_counter & 0x7FFFFF  # 23位掩码
        generate_xray_trace_id._atomic_counter = (counter + 1) & 0x7FFFFF

    # 组合时间戳和计数器
    part1 = (timestamp | counter) & 0xFFFFFFFFFFFFFFFF  # 确保64位无符号

    # 随机数部分
    part2 = generate_xray_trace_id._random.getrandbits(64)

    # 格式化为32位HEX
    return f"{part1:016x}{part2:016x}"


# print(generate_xray_trace_id())

# 生成x-s-common
def generate_xs_common(a1: str, x_t: str, x_s: str, b1: str) -> str:
    """Python 版本的小红书签名生成函数"""
    # 初始化 Base64 字符集
    A = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5"
    P = list(A)

    # CRC32 校验函数
    def crc32(data: bytes) -> int:
        crc_table = []
        for n in range(256):
            e = n
            for _ in range(8):
                e = (e >> 1) ^ 0xedb88320 if (e & 1) else e >> 1
            crc_table.append(e & 0xFFFFFFFF)

        crc = 0xFFFFFFFF
        for byte in data:
            crc = (crc >> 8) ^ crc_table[(crc ^ byte) & 0xFF]
        return (crc ^ 0xFFFFFFFF) & 0xFFFFFFFF

    # Base64 编码函数组
    def triplet_to_base64(e: int) -> str:
        return P[(e >> 18) & 63] + P[(e >> 12) & 63] + P[(e >> 6) & 63] + P[e & 63]

    def encode_chunk(chunk: List[int], start: int, end: int) -> str:
        s = []
        for u in range(start, end, 3):
            if u + 2 >= len(chunk):
                break
            a = (chunk[u] << 16 & 0xFF0000) + (chunk[u + 1] << 8 & 0xFF00) + chunk[u + 2]
            s.append(triplet_to_base64(a))
        return ''.join(s)

    def b64_encode(data: List[int]) -> str:
        length = len(data)
        pad = length % 3
        chunks = []
        chunk_size = 16383 * 3

        for i in range(0, length - pad, chunk_size):
            end = min(i + chunk_size, length - pad)
            chunks.append(encode_chunk(data, i, end))

        if pad == 1:
            r = data[-1]
            chunks.append(P[r >> 2] + P[(r << 4) & 63] + "==")
        elif pad == 2:
            r = (data[-2] << 8) + data[-1]
            chunks.append(P[r >> 10] + P[(r >> 4) & 63] + P[(r << 2) & 63] + "=")

        return ''.join(chunks)

    # 构造参数对象
    m = {
        "s0": 5,
        "s1": "",
        "x0": "1",
        "x1": "4.1.0",
        "x2": "Windows",
        "x3": "xhs-pc-web",
        "x4": "4.62.3",
        "x5": a1,
        "x6": x_t,
        "x7": x_s,
        "x8": b1,
        "x9": f"{crc32(f'{x_t}{x_s}{b1}'.encode()):08x}",
        "x10": 12  # getSigCount 固定返回 12
    }
    # 序列化并编码
    json_str = json.dumps(m, separators=(',', ':'))
    utf8_bytes = urllib.parse.quote(json_str, safe='').encode()
    byte_list = []
    i = 0
    while i < len(utf8_bytes):
        if chr(utf8_bytes[i]) == '%' and i + 2 < len(utf8_bytes):
            byte = int(utf8_bytes[i + 1:i + 3], 16)
            byte_list.append(byte)
            i += 3
        else:
            byte_list.append(utf8_bytes[i])
            i += 1
    return b64_encode(byte_list)


# print(generate_xs_common("your_a1", "your_x_t", "your_x_s", "your_b1"))

# 生成a1 cookies值
def generate_a1() -> str:
    """生成包含时间戳、随机字符串和CRC32校验的追踪ID（前6位）"""
    # 生成CRC32表 (严格对应图片中的魔数3988292384)
    crc_table = []
    for n in range(256):
        e = n
        for _ in range(8):
            e = (e >> 1) ^ 0xEDB88320 if (e & 1) else e >> 1
        crc_table.append(e)

    # 生成复合字符串
    timestamp = int(time.time() * 1000)
    rand_str = ''.join(random.choice("abcdefghijklmnopqrstuvwxyz1234567890") for _ in range(30))
    combined = f"{timestamp:x}{rand_str}50008"

    # 计算CRC32校验值 (严格模拟图片中的位运算)
    crc = 0xFFFFFFFF
    for c in combined[:6].encode():  # 只取前6位计算CRC
        crc = (crc >> 8) ^ crc_table[(crc ^ c) & 0xFF]
    crc_hex = f"{(crc ^ 0xFFFFFFFF) & 0xFFFFFFFF:08x}"

    # 拼接最终结果并截取前6位
    return combined + crc_hex
# print(generate_a1())
