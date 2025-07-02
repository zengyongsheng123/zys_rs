import time
import random
import math


def generate_slider_trajectory(start_x=1027, start_y=184, distance=None, duration_ms=None, width=342):
    """
    生成滑块验证的轨迹数据，模拟 bindEvent 中的鼠标拖动行为，支持指定滑动距离
    参数:
        start_x: 起始 clientX 坐标（默认 1027，固定）
        start_y: 起始 clientY 坐标（默认 184，固定）
        distance: 滑块滑动距离（像素，默认 100-250，n = clientX - disX）
        duration_ms: 拖动持续时间（毫秒，默认 800-2000）
        width: 滑块容器宽度（默认 342，固定）
    返回:
        轨迹列表，每个元素为 [clientX, clientY, timestamp]
    """
    # 固定参数
    width = 342
    img_ratio = 360 / width  # imgRatio = 0x168 / 342 ≈ 1.0526

    # 动态参数
    duration_ms = duration_ms if duration_ms is not None else random.randint(800, 2000)  # 800-2000 毫秒
    distance = distance if distance is not None else random.randint(100, 250)  # 默认 100-250 像素
    target_x = start_x + distance  # 目标 clientX

    # 当前时间戳（毫秒）
    start_time = int(time.time() * 1000)

    # 初始化轨迹
    trajectory = []

    # 移动范围
    max_btn_x = width - 40  # [0, 302]
    max_img_x = width - 50 / img_ratio  # [0, 294.5]

    # 计算 disX
    dis_x = start_x  # 初始 n = 0
    target_n = min(distance, max_btn_x)  # 目标 n，限制在 [0, 302]

    # 初始点（onmousedown）
    x = start_x
    y = start_y
    timestamp = start_time
    x = min(x, 262143)  # x ≤ 0x3ffff
    y = min(y, 16777215)  # y ≤ 0xffffff
    timestamp = min(timestamp, 17592186044415)  # t ≤ 0x3ffffffffff
    trajectory.append([int(x), int(y), timestamp])

    # y 坐标波动
    y_peak = start_y + 10  # 上升 10 像素
    y_peak_time = duration_ms * 0.3  # 前 30% 时间

    # 动态生成移动点（onmousemove）
    current_time = 0
    while current_time < duration_ms:
        # 进度（0 到 1）
        progress = min(current_time / duration_ms, 1.0)

        # 非线性 x 坐标
        sigmoid = 1 / (1 + math.exp(-12 * (progress - 0.5)))
        n = target_n * sigmoid  # 相对 x (n)
        x = dis_x + n  # clientX

        # 限制 x 坐标
        n = max(0, min(n, max_btn_x))
        x = dis_x + n

        # y 坐标
        if current_time <= y_peak_time:
            y = start_y + (y_peak - start_y) * (current_time / y_peak_time)
        else:
            y = y_peak - (y_peak - start_y) * ((current_time - y_peak_time) / (duration_ms - y_peak_time))
        y += random.uniform(-5, 5)  # 波动 ±5

        # 时间间隔
        if progress < 0.5:
            time_step = random.uniform(10, 30)  # 早期 10-30 毫秒
        else:
            time_step = random.uniform(20, 60)  # 后期 20-60 毫秒
        current_time += time_step
        timestamp = start_time + int(current_time)

        # getCoordinate 约束
        prev_x, prev_y, prev_t = trajectory[-1]
        dx = x - prev_x
        dy = y - prev_y
        dt = timestamp - prev_t

        if abs(dx) > 4095:
            x = prev_x + (4095 if dx > 0 else -4095)
        if abs(dy) > 4095:
            y = prev_y + (4095 if dy > 0 else -4095)
        if abs(dt) > 16777215:
            timestamp = prev_t + (16777215 if dt > 0 else -16777215)

        trajectory.append([int(x), int(y), timestamp])

    # 结束点（onmouseup）
    n = target_n
    x = dis_x + n
    n = max(0, min(n, max_btn_x))
    x = dis_x + n
    y = start_y + random.uniform(-5, 5)
    timestamp = trajectory[-1][2] + random.randint(200, 600)  # 最后 200-600 毫秒

    prev_x, prev_y, prev_t = trajectory[-1]
    dx = x - prev_x
    dy = y - prev_y
    dt = timestamp - prev_t

    if abs(dx) > 4095:
        x = prev_x + (4095 if dx > 0 else -4095)
    if abs(dy) > 4095:
        y = prev_y + (4095 if dy > 0 else -4095)
    if abs(dt) > 16777215:
        timestamp = prev_t + (16777215 if dt > 0 else -16777215)

    trajectory.append([int(x), int(y), timestamp])

    # 确保点数 > 3
    if len(trajectory) <= 3:
        trajectory.append([int(x), int(y) + random.uniform(-5, 5), timestamp + random.randint(10, 30)])

    return trajectory


# 示例使用
if __name__ == "__main__":
    # 测试指定滑动距离
    trajectory = generate_slider_trajectory(
        start_x=1027,
        start_y=184,
        distance=150,  # 滑动 150 像素
        duration_ms=1200,
        width=342
    )

    # 打印前几个轨迹点
    print("生成的滑块轨迹数据（前 5 个点）：")
    for i, point in enumerate(trajectory[:5]):
        print(f"点 {i + 1}: [x={point[0]}, y={point[1]}, timestamp={point[2]}]")

    # 打印最后几个轨迹点
    print("\n生成的滑块轨迹数据（最后 5 个点）：")
    for i, point in enumerate(trajectory[-5:]):
        print(f"点 {i + len(trajectory) - 4}: [x={point[0]}, y={point[1]}, timestamp={point[2]}]")

    # 打印点数和持续时间
    print(f"\n总共生成 {len(trajectory)} 个轨迹点")
    print(f"持续时间：{trajectory[-1][2] - trajectory[0][2]} 毫秒")