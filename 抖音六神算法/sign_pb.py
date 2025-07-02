from dataclasses import dataclass
import betterproto

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
@dataclass
class Medusa(betterproto.Message):
    """Class representing Medusa message structure."""
    magic: bytes = betterproto.bytes_field(1)
    version: int = betterproto.sint32_field(2)
    rand: int = betterproto.sint32_field(3)
    ms_app_id: str = betterproto.string_field(4)
    device_id: str = betterproto.string_field(5)
    license_id: str = betterproto.string_field(6)
    app_version: str = betterproto.string_field(7)
    sdk_version_str: str = betterproto.string_field(8)
    sdk_version: int = betterproto.sint32_field(9)
    xg_seed_bytes: bytes = betterproto.bytes_field(10)
    time: int = betterproto.sint32_field(12)
    query_body_ts_hash: bytes = betterproto.bytes_field(13)
    query_sm3: bytes = betterproto.bytes_field(14)
    request: "MedushaAlgorithmCount" = betterproto.message_field(15)
    sec_device_token: str = betterproto.string_field(16)
    time2: int = betterproto.sint32_field(17)
    lanusk_hash: bytes = betterproto.bytes_field(18)
    query_body_hash_sm3: bytes = betterproto.bytes_field(19)
    psk_version: str = betterproto.string_field(20)
    call_type: int = betterproto.sint32_field(21)
    env: "Env" = betterproto.message_field(23)
    unknown24: str = betterproto.string_field(24)


@dataclass
class MedushaAlgorithmCount(betterproto.Message):
    """Class to represent Medusha algorithm count data."""
    sign_count: int = betterproto.sint32_field(1)
    report_count: int = betterproto.sint32_field(2)
    setting_count: int = betterproto.sint32_field(3)
    unknown4: int = betterproto.sint32_field(4)
    unknown5: int = betterproto.sint32_field(5)

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
@dataclass
class Env(betterproto.Message):
    """Class to represent environment data for Medusa."""
    launch_time: int = betterproto.sint32_field(1)
    unknown2: int = betterproto.sint32_field(2)
    unknown3: int = betterproto.sint32_field(3)
    unknown5: int = betterproto.sint32_field(5)
    version: str = betterproto.string_field(6)
    pid: int = betterproto.sint32_field(7)
    device: "Device" = betterproto.message_field(12)
    report: "Report" = betterproto.message_field(13)
    app_version: str = betterproto.string_field(14)

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
@dataclass
class Device(betterproto.Message):
    """Class to represent device information."""
    d1: int = betterproto.sint32_field(1)
    collect_stat: int = betterproto.sint32_field(2)
    aid: str = betterproto.string_field(3)
    device_id: str = betterproto.string_field(4)
    sec_device_token: str = betterproto.string_field(5)
    app_version: str = betterproto.string_field(6)
    battery: int = betterproto.sint32_field(7)
    battery2: int = betterproto.sint32_field(8)
    battery_health: int = betterproto.sint32_field(9)
    battery_changed: int = betterproto.sint32_field(10)
    network: str = betterproto.string_field(11)
    tz: str = betterproto.string_field(12)
    lan: str = betterproto.string_field(13)
    cpu: int = betterproto.sint32_field(14)
    sdcard: float = betterproto.float_field(16)
    sdcard_used: float = betterproto.float_field(17)
    memory: float = betterproto.float_field(18)
    memory2: float = betterproto.float_field(19)
    data: float = betterproto.float_field(20)
    data_used: float = betterproto.float_field(21)
    os_version: str = betterproto.string_field(22)
    brightness: int = betterproto.sint32_field(23)
    volume: int = betterproto.sint32_field(24)
    ts: int = betterproto.sint64_field(25)
    ts2: int = betterproto.sint64_field(26)
    ts3: int = betterproto.sint64_field(27)
    ts4: int = betterproto.sint64_field(28)
    usb: int = betterproto.sint32_field(29)
    hw_version: str = betterproto.string_field(30)
    brand: str = betterproto.string_field(31)
    board: str = betterproto.string_field(32)
    product_name: str = betterproto.string_field(33)
    product_device: str = betterproto.string_field(34)
    product_manufacturer: str = betterproto.string_field(35)
    hardware: str = betterproto.string_field(36)
    unknown38: int = betterproto.sint64_field(38)

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
@dataclass
class Report(betterproto.Message):
    """Class to represent report data for Medusa."""
    time: int = betterproto.sint64_field(1)
    state: int = betterproto.sint32_field(2)
    code: int = betterproto.sint32_field(4)
    times: int = betterproto.sint32_field(5)
    unknown6: int = betterproto.sint32_field(6)
