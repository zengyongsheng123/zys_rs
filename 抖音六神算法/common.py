from dataclasses import dataclass
import betterproto
from pysmx.SM3 import SM3


@dataclass
class DecryptParams(betterproto.Message):
    """Class to represent decryption parameters."""
    argus: str = betterproto.string_field(1)
    medusa: str = betterproto.string_field(2)
    gorgon: str = betterproto.string_field(3)
    ladon: str = betterproto.string_field(4)
    helios: str = betterproto.string_field(5)

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
@dataclass
class SignKey(betterproto.Message):
    """Class to represent the sign key parameters."""
    aid: str = betterproto.string_field(1)
    license_id: str = betterproto.string_field(2)
    sdk_ver_code: int = betterproto.sint32_field(3)
    lanusk: str = betterproto.string_field(4)
    sec_device_token: str = betterproto.string_field(5)

    query: str = betterproto.string_field(10)
    body_md5: str = betterproto.string_field(11)
    khronos: int = betterproto.sint32_field(12)

    xg_seed: int = betterproto.sint32_field(13)
    xg_rand: int = betterproto.sint32_field(14)

    xl_rand: int = betterproto.sint32_field(15)
    xh_rand: int = betterproto.sint32_field(16)

    xa_data: bytes = betterproto.bytes_field(17)
    xa_rand: int = betterproto.sint32_field(18)
    xa_hash_rand: int = betterproto.sint32_field(19)

    xm_data: bytes = betterproto.bytes_field(21)
    xm_rand: int = betterproto.sint32_field(22)
    xm_hash_rand: int = betterproto.sint32_field(23)
    xm_n: int = betterproto.sint32_field(24)
    xg_seed_xm: int = betterproto.sint32_field(25)


def get_key_hash(key: bytes, rand: int) -> tuple[bytes, bytes]:
    """
    Generate a hash for the given key and random number.

    Args:
        key (bytes): The key to hash.
        rand (int): The random number used in the hash calculation.

    Returns:
        tuple[bytes, bytes]: The SM3 hash digest and additional random value.
    """
    to_hash = bytearray(68)
    to_hash[:32] = key
    to_hash[32:36] = rand.to_bytes(4, byteorder='little')
    to_hash[36:] = key

    # Calculating the hash manipulation for randomness
    d1 = (rand >> 16) & 0x000000ff
    d2 = (d1 << 11) | (rand >> 24)
    d2 ^= (d1 >> 5) ^ d1
    d2 = ~d2 & 0xffffffff

    return SM3(to_hash).digest(), d2.to_bytes(4, "little")
