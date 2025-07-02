import base64
import random
from sign_pb import Medusa, Report, Device, MedushaAlgorithmCount, Env
from xutil import (
    rl8,
    SM3,
    hash_f13,
    md5sum,
    get_key_hash,
    AES_V3
)

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
def xmxor(data: bytearray, key: bytearray) -> bytearray:
    """Encrypts the data using the xmxor algorithm."""
    data = xmxor1(data, key)
    last_flag = data[-1] ^ data[-2]
    data[0] = (~last_flag + data[0]) & 0xff
    data[1] = ((data[0] ^ data[-1] ^ 254) + data[1]) & 0xff
    data[2] = (data[2] + ((last_flag - data[0]) ^ rl8(data[1], 3) ^ 2)) & 0xff

    for i in range(len(data) - 4):
        temp = (rl8(data[i + 2], 3)) ^ data[i + 1] ^ (i + 3)
        data[i + 3] = (~temp + data[i + 3]) & 0xff

    data[-1] ^= data[-2]

    data[0] = ((data[0] ^ data[1]) + sum(data[1:])) & 0xff
    return data


def xmxor1(data: bytearray, key: bytearray) -> bytearray:
    """Helper function to perform part of the xmxor encryption."""
    enc_data = bytearray(len(data))
    for i in range(len(data)):
        index = (i * 4) & 28
        d0, d1 = key[index], key[index + 1]
        d2 = (rl8(data[i], 4) + d0) ^ d1
        d2 = ~d2
        d2 = (rl8(d2 & 0xff, 3)) & 0xff
        d2 += d1
        d2 = (d2 & 0xff) ^ d0
        enc_data[-i - 1] = ~d2 & 0xff
    return enc_data


def fix_data(data: bytes, query: str, body_md5: str, khronos: int, xg_seed: int, lanusk: str = '') -> tuple[bytes, bytes, bytes]:
    """Fix data and generate necessary hashes."""
    m = Medusa().parse(data)

    m.xg_seed_bytes = xg_seed.to_bytes(8, "little")
    body_md5_bytes = bytes.fromhex(body_md5) if body_md5 else bytes(16)
    ts_bytes = khronos.to_bytes(4, "little")
    query_sm3 = SM3(query.encode()).digest()

    m.magic = bytes.fromhex("36 6c 95 6c 35 72 5a 9b e4 d4 1d 65 c8 b8 79 26")
    m.query_body_ts_hash = hash_f13(query_sm3, body_md5_bytes, ts_bytes, khronos)
    m.query_sm3 = query_sm3[:6]

    if lanusk:
        lanusk_sm3 = SM3(bytes.fromhex(lanusk) + ts_bytes).digest()
        lanusk_hash = md5sum(lanusk_sm3 + body_md5_bytes + bytes.fromhex("84 96 77 9d db 6d bc b6 d4 15 0b f8 80 01 00 00"))
        m.lanusk_hash = lanusk_hash
        m.psk_version = "1"

    m.query_body_hash_sm3 = SM3(query.encode() + body_md5_bytes + b"1").digest()
    m.time = khronos
    m.time2 = khronos
    return bytes(m), query_sm3, m.query_body_ts_hash


def encrypt_medusa(config: dict, data: bytes, query: str, body_md5: str, khronos: int, xg_seed: int, hash_rand: int = 0, xm_rand: int = 0, lanusk: str = '') -> str:
    """Encrypt data using the Medusa encryption scheme."""
    x, query_sm3, body_sm3 = fix_data(data, query, body_md5, khronos, xg_seed, lanusk)

    hash_rand = hash_rand or random.randint(0, 0xFFFFFFFF)
    xm_rand = xm_rand or random.randint(0, 0xFFFFFFFF)

    key, seed = get_key_hash(config['signKey'], hash_rand)
    data = xmxor(x, key)
    data = xg_seed.to_bytes(8, "little") + data
    data = bytearray(data[::-1])

    for i in range(len(data)):
        data[i] ^= seed[~i & 3]

    hash_rand_bytes = hash_rand.to_bytes(4, "little")
    check_bit = (query_sm3[0] & 63) << 14
    check_bit |= 0x18000001
    check_bit |= (body_sm3[0] & 63) << 8

    data = config['fix'] + xm_rand.to_bytes(4, 'little') + \
           check_bit.to_bytes(4, 'little') + data + hash_rand_bytes[2:]

    data = AES_V3(config['aes_key'], khronos).encrypt(data, config['aes_iv'])

    version_or = bytes()
    version3 = bytes.fromhex("02 00 00 00 36 6c 95 6c 35 72 5a 9b e4 d4 1d 65 c8 b8 79 26 ")

    for i in range(0, 20, 4):
        d = int.from_bytes(version3[i:i + 4], "little") ^ khronos
        version_or += d.to_bytes(4, "little")

    data = version_or + hash_rand_bytes[:2] + int(256).to_bytes(2, "little") + data
    return base64.b64encode(data).decode()


if __name__ == "__main__":
    config_android = {
        'signKey': b'\x8e\xbd\xfa8\x06\xec\xc5\xce\xe7\x94#\xe6\x02\x9e\xd8%@\xbc"\x18\xbb~\xae\xf7\x1c\xb6\x91\xf7\xaa\x8a\xa2\xf5',
        'aes_key': b'\xf1Y3vvn\xa9\x8d4\xf3\x1b\x05z\x9d[\xe4',
        'aes_iv': b'\x1f\xe1\t\xa4\x12R\x83\xf4\x18\xde\x9e\x05\x1a\x96\x9e\x12',
        'fix': bytes([0x35]),
    }

    proto_data = Medusa(
        magic=bytearray(b'\xf7\xe8_\xfa\xd7\xd7\xdc;\xd6*\xc8pW\xcfa\x18'),
        version=3,
        rand=1737416196,
        ms_app_id='1128',
        device_id='2707410529833372',
        license_id='1588093228',
        app_version='31.3.0',
        sdk_version_str='v04.06.04-ml-android',
        sdk_version=67503104,
        xg_seed_bytes=bytearray(b'\x00\x81\x00\x00\x00\x00\x00\x00'),
        time=1728388016,
        query_body_ts_hash=bytearray(b'\xf3\xd4\x91 \xa7\xf9\xe4f\x91\xc9\x06uOw\xe2\xf4\xd4_\x9ey'),
        query_sm3=bytearray(b'Y\x1b#\xb0^\xe1'),
        request=MedushaAlgorithmCount(sign_count=111, report_count=10, setting_count=694367, unknown4=0, unknown5=586952199),
        sec_device_token='AXYQOS6n2m60x1fVZHIrH3iol',
        time2=1728388016,
        lanusk_hash=b'',
        query_body_hash_sm3=b'\x06\x8b\xfe\xbb\x1aJ7j\x9c\xb7\xa69\xd5Y\xa5\xe8\x90Y\xdb>\xcc\x91\xe3\xe5\x04^\xfc\xb2\xf2\x016\xde',
        psk_version='none',
        call_type=312,
        env=Env(
            launch_time=113,
            unknown2=146331399,
            unknown3=146331396,
            unknown5=7,
            version='v04.06.04.03-bugfix',
            pid=10825,
            device=Device(
                d1=1, collect_stat=2, aid='1128',
                device_id='2707410529833372',
                sec_device_token='Ai6svO3PyrwDOUSmO6ZcResxu',
                app_version='!noperm!',
                battery=-888888, battery2=-888888, battery_health=3,
                battery_changed=-888888, network='!notset!',
                tz='Asia/Shanghai,8', lan='zh_CN', cpu=4, sdcard=255.24993896484375,
                sdcard_used=35.58599090576172, memory=3.467449188232422,
                memory2=3.467449188232422, data=255.1754913330078,
                data_used=42.17544174194336, os_version='14', brightness=41,
                volume=36, ts=1728388016635, ts2=1728388016635, ts3=1728388016635,
                ts4=1728388016637, usb=-1, hw_version='Xiaomi 14 Ultra',
                brand='Xiaomi', board='Xiaomi 14 Ultra', product_name='Xiaomi 14 Ultra',
                product_device='Xiaomi', product_manufacturer='Xiaomi',
                hardware='Xiaomi', unknown38=31
            ),
            report=Report(time=1728388016, state=-2, code=200, times=0, unknown6=0),
            app_version='34.1.0'
        ),
        unknown24='{"cmr":16777216,"cmr2":16777216,"un_h":1879194040,"vpn":0,"kd":0,"fkd":3672518972,"pd":-1872573247,"dyn":"","do":0,"tk":true}'
    )

    query = "klink_egdi=AAJNsGmSkNeYbQc4LykwkLnbFJCE6Xdo40E8YYICnwHDAfp_rCh3AITA&iid=2707410529837468&device_id=2707410529833372&ac=wifi&channel=tengxun_1128_64&aid=1128&app_name=aweme&version_code=310300&version_name=31.3.0&device_platform=android&os=android&ssmix=a&device_type=24031PN0DC&device_brand=Xiaomi&language=zh&os_api=34&os_version=14&manifest_version_code=310301&resolution=3200%C3%971440&dpi=560&update_version_code=31309900&_rticket=1728388016633&first_launch_timestamp=1728196287774&last_deeplink_update_version_code=0&cpu_support64=true&host_abi=arm64-v8a&is_guest_mode=0&app_type=normal&minor_status=0&appTheme=light&is_preinstall=0&need_personal_recommend=1&is_android_pad=0&is_android_fold=0&ts=1728388016&cdid=fe295f11-fe2e-4bce-8040-269405296347"
    body_md5 = "00000000000000000000000000000000"

    xm = encrypt_medusa(
        config_android,
        proto_data.SerializeToString(),
        query,
        body_md5,
        1707034847,
        0,
        1091240644,
        1753682545,
        lanusk=''
    )
    print(xm)
