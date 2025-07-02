import time
import binascii
from pysmx.SM3 import SM3
import random

# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
# 旋转相关的工具函数
xtime = lambda a: (((a << 1) ^ 0x1B) & 0xFF) if (a & 0x80) else (a << 1)


def rl8(x: int, k: int) -> int:
    """Rotate left by k positions on 8-bit integer."""
    n = 8
    s = k & (n - 1)
    return ((x << s) | (x >> (n - s))) & 0xff


def ror32(value: int, count: int) -> int:
    """Rotate right for 32-bit integer."""
    count %= 32
    low = value << (32 - count)
    value >>= count
    value |= low
    value &= 0xFFFFFFFF
    return value
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担


# 加密相关工具函数
def xor_bytes(a: bytes, b: bytes) -> bytearray:
    """XOR two byte sequences."""
    return bytearray(i ^ j for i, j in zip(a, b))


def bytes2matrix(text: bytes) -> list:
    """Convert bytes into a matrix (4x4 byte array)."""
    return [list(text[i:i + 4]) for i in range(0, len(text), 4)]


def matrix2bytes(matrix: list) -> bytearray:
    """Convert matrix of bytes back to flat bytearray."""
    return bytearray(sum(matrix, []))

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担


# SM3哈希函数
def get_key_hash(key: bytes, rand: int) -> tuple[bytes, bytes]:
    """Generate a key hash using SM3 and a random number."""
    to_hash = bytearray(68)
    to_hash[:32] = key
    to_hash[32:36] = rand.to_bytes(4, byteorder='little')
    to_hash[36:] = key

    d1 = (rand >> 16) & 0x000000ff
    d2 = (d1 << 11) | (rand >> 24)
    d2 ^= (d1 >> 5) ^ d1
    d2 = ~d2 & 0xffffffff

    return SM3(to_hash).digest(), d2.to_bytes(4, "little")

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担


# AES加密类 (修改为六神算法用)
class AES_V3:
    r_con = [[1, 0, 2, 3], [1, 3, 0, 2], [0, 1, 3, 2], [1, 0, 2, 3]]
    r_con2 = [[1, 0, 2, 3], [2, 0, 3, 1], [0, 1, 3, 2], [1, 0, 2, 3]]
    r_orders = [[0, 9, 14, 11, 4, 13, 2, 7, 8, 1, 6, 15, 12, 5, 10, 3],  # More r_orders rows
                [0, 9, 14, 15, 4, 13, 2, 7, 8, 1, 6, 3, 12, 5, 10, 11]]

    def __init__(self, aes_key: bytes, khronos: int) -> None:
        self.word_size = khronos & 3
        self.aes_key = aes_key
        self.s_box = s_box[self.word_size << 8:]
        self.inv_s_box = inv_s_box[self.word_size << 8:]
        self.master_key = self._expand_key()
        self._key_matrices = bytes2matrix(self.master_key)
        self.con = self.r_con[self.word_size]
        self.con2 = self.r_con2[self.word_size]
        self.order = self.r_orders[self.word_size]

    def _expand_key(self) -> bytearray:
        init_values = [0xca025ddc, 0x823dc546, 0xc9420583, 0xc298225f]
        init_value = init_values[self.word_size]
        mk = bytearray(init_value.to_bytes(4, "little")) * 4
        mk = xor_bytes(mk, self.aes_key)
        mk += bytearray(32)
        rounds = 8

        for i in range(4, 12):
            idx = 4 * (i - 1)
            k0, k1, k2, k3 = mk[idx], mk[idx + 1], mk[idx + 2], mk[idx + 3]
            if i & 3 == 0:
                k00 = (init_value >> (rounds & 24)) ^ self.s_box[k1]
                k1 = self.s_box[k2]
                k2 = self.s_box[k3]
                k3 = self.s_box[k0]
                k0 = k00 & 0xff
            rounds += 2

            mk[idx + 4] = k0 ^ mk[idx - 12]
            mk[idx + 5] = k1 ^ mk[idx - 11]
            mk[idx + 6] = k2 ^ mk[idx - 10]
            mk[idx + 7] = k3 ^ mk[idx - 9]
        return mk

    def encrypt(self, data: bytes, iv: int) -> bytes:
        """Encrypt data using AES V3."""
        plaintext = self.sum_data(data)
        blocks = []
        previous = iv
        for plaintext_block in split_blocks(plaintext):
            x = xor_bytes(plaintext_block, previous)
            block = self.encrypt_block(x)
            blocks.append(block)
            previous = block
        key = b''.join(blocks)
        data = self.mix_columns(data, key)
        return key[-1:] + data

    def encrypt_block(self, plaintext: bytes) -> bytes:
        """Encrypt a single block of data."""
        plain_state = bytes2matrix(plaintext)
        add_round_key_con(plain_state, self._key_matrices[0:4], self.con2)
        # More operations for block encryption...
        return matrix2bytes(plain_state)

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担


# 六神算法处理
def branch_2(iv, khronos, query_sm3, body_md5_bytes, ts_bytes):
    n0 = (iv & 15 - 2) * 86
    iv_v0 = (n0 >> 15 & 0xff) + (n0 >> 8 & 0xff)

    t001 = [0xb08726db, 0xd40cb5e6, 0x8980f29b, 0xeb549c7f, 0xe8f559e4]
    n1 = t001[iv_v0]
    count_v1 = (n1 + khronos + 1) & 0xff
    count_v2 = (n1 + khronos) & 0xffffffff

    n0 = (count_v2 + 5) & 7

    pad = bytearray(8)
    seed = bytes([0xd4, 0x15, 0x0b, 0x84, 0x96, 0x77, 0x9d, 0xf8])
    for i in range(8):
        v = int.from_bytes(bytes([seed[i], seed[i]]), 'little')
        v = v >> n0
        pad[i] = v & 0xff

    data = query_sm3 + body_md5_bytes + ts_bytes + pad + bytes.fromhex('a0 01 00 00')
    idx = iv_v0 << 6
    ret = md5sum_v3(data, count_v2, branch_2_orders[idx:idx + 64], count_v1)

    return ret

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担


# 示例：加密和算法测试
def example_usage():
    aes_key = b'examplekey1234567'
    khronos = 123456789
    aes = AES_V3(aes_key, khronos)
    encrypted_data = aes.encrypt(b'plaintextdata', 0x20245928)
    print(f'Encrypted data: {encrypted_data.hex()}')
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担


# 执行示例
if __name__ == "__main__":
    example_usage()
