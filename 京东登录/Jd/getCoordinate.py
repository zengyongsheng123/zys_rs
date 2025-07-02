import math


def string10to64(num):
    """将十进制数转换为64进制字符串（严格对齐JS逻辑）"""
    charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~'
    base = len(charset)
    result = []
    num = abs(num)

    while num > 0:
        num, remainder = divmod(num, base)
        result.insert(0, charset[remainder])

    return ''.join(result) if result else '0'


def prefixInteger(num, length):
    """数字补零对齐（完全还原JS行为）"""
    num_str = str(num)
    if len(num_str) >= length:
        return num_str
    return '0' * (length - len(num_str)) + num_str


def pretreatment(value, length, is_first=False):
    """数据预处理（严格匹配JS逻辑）"""
    if not is_first:
        sign_bit = '1' if value > 0 else '0'
        encoded = string10to64(value)
        return sign_bit + prefixInteger(encoded, length)
    else:
        encoded = string10to64(value)
        return prefixInteger(encoded, length)


def getCoordinate(b):
    """轨迹编码主函数（完全还原JS行为）"""
    result = []
    for i, point in enumerate(b):
        x, y, t = map(int, point)
        if i == 0:
            # 首点特殊处理
            x = min(x, 0x3FFFF)  # 262143
            y = min(y, 0xFFFFFF)  # 16777215
            t = min(t, 0x3FFFFFFFFFF)  # 4398046511103
            result.append(pretreatment(x, 3, True))
            result.append(pretreatment(y, 4, True))
            result.append(pretreatment(t, 7, True))
        else:
            # 计算增量并限制范围
            prev_x, prev_y, prev_t = map(int, b[i - 1])
            dx = x - prev_x
            dy = y - prev_y
            dt = t - prev_t
            dx = min(dx, 0xFFF) if dx >= 0 else max(dx, -0xFFF)
            dy = min(dy, 0xFFF) if dy >= 0 else max(dy, -0xFFF)
            dt = min(dt, 0xFFFFFF)
            result.append(pretreatment(dx, 2, False))
            result.append(pretreatment(dy, 2, False))
            result.append(pretreatment(dt, 4, True))
    return ''.join(result)