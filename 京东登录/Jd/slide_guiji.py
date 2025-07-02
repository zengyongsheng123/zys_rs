from getCoordinate import getCoordinate
import time
import random
import math


def dynamic_step(distance, current_step, total_steps):
    """
    生成人类行为模拟的位移增量
    :param distance: 总滑动距离
    :param current_step: 当前步骤索引（从0开始）
    :param total_steps: 总步骤数
    :return: 当前步骤的水平位移增量
    """
    # 基础速度曲线（三次贝塞尔缓动）
    t = current_step / total_steps
    base_speed = 1 - (1 - t) ** 3  # 先快后慢

    # 随机扰动因子（防止完全匀速）
    rand_factor = random.uniform(0.9, 1.1)  # ±10%扰动

    # 步长计算（动态调整权重）
    step = distance * base_speed * rand_factor / total_steps

    # 首步和末步特殊处理
    if current_step == 0:
        return max(step, random.uniform(2, 5))  # 初始启动步长
    elif current_step == total_steps - 1:
        return min(step, distance * 0.05)  # 最后一步不超过5%距离

    # 中间步长限制（防越界）
    return max(1, min(step, 0xFFF))  # 确保不超过JS函数限制


def generate_human_track(distance):
    """
    生成人类行为轨迹（工业级抗检测）
    :param duration:
    :param distance: 需要滑动的总距离（像素）
    :return: 符合JS校验的轨迹数组
    """
    duration = int(distance * 1.2 + 1500)
    track = []
    start_time = int(time.time() * 1000)
    total_steps = int(distance / 3)  # 动态计算步数

    current_x = random.randint(50, 100)
    current_y = random.randint(200, 300)

    for step in range(total_steps):
        # 计算动态步长
        dx = dynamic_step(distance, step, total_steps)
        dy = random.gauss(0, 0.8)  # 垂直随机扰动

        # 时间戳生成（带随机延迟）
        time_offset = int((duration / total_steps) * (step + random.uniform(-0.2, 0.2)))
        timestamp = start_time + time_offset

        # 更新坐标
        current_x += dx
        current_y += dy

        track.append([int(current_x), int(current_y), timestamp])

    # 强制修正总距离（关键！）
    track[-1][0] = track[0][0] + distance

    return track


def generate_b(distance=None, duration=None):
    """生成符合JS校验规则的轨迹数据"""
    # 初始化参数
    start_x = random.randint(100, 500)
    start_y = random.randint(100, 500)
    start_time = int(time.time() * 1000)

    b = []
    current_x = start_x
    current_y = start_y
    current_time = start_time

    # 生成首点（必须符合首点限制）
    b.append([
        min(current_x, 0x3FFFF),
        min(current_y, 0xFFFFFF),
        min(current_time, 0x3FFFFFFFFFF)
    ])

    # 生成后续点（控制增量）
    time_step = duration // (distance // 10)  # 动态时间间隔
    for _ in range(distance // 10):
        dx = random.randint(5, 15)
        dy = random.randint(-2, 2)
        dt = random.randint(10, 50)

        # 确保增量不越界
        new_x = current_x + dx
        new_y = current_y + dy
        new_time = current_time + dt

        # 强制限制增量范围
        if abs(new_x - current_x) > 0xFFF:
            new_x = current_x + (0xFFF if dx > 0 else -0xFFF)
        if abs(new_y - current_y) > 0xFFF:
            new_y = current_y + (0xFFF if dy > 0 else -0xFFF)
        if (new_time - current_time) > 0xFFFFFF:
            new_time = current_time + 0xFFFFFF

        b.append([new_x, new_y, new_time])
        current_x = new_x
        current_y = new_y
        current_time = new_time

    return b


# # 生成200像素滑动轨迹（约1.5秒）
# b_data = generate_b(distance=200, duration=1500)
#
# # 转换为JS需要的格式（二维数组）
# js_b = "[%s]" % ",\n".join(["[%s, %s, %s]" % (x, y, t) for x, y, t in b_data])
#
# # 保存到文件供JS调用
# with open("b_data.js", "w") as f:
#     f.write(f"const b = {js_b};")
# # 使用Python处理
# py_result = getCoordinate(b_data)
# # print("Python 加密结果:", py_result)
#
# # 使用Node.js验证（需安装node）
# import subprocess
#
# with open("temp.js", "w") as f:
#     f.write("""
#     const b = %s;
#     %s
#     console.log(getCoordinate(b));
#     """ % (js_b, open("demo.js").read()))  # 需替换为实际JS文件路径
#
# js_result = subprocess.check_output(["node", "temp.js"], text=True)
# # print("JavaScript 加密结果:", js_result.strip())
#
# assert py_result == js_result.strip(), "加密结果不一致！"
