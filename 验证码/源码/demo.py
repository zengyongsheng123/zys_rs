def generate_trajectory(num_points):
    trajectory = []
    x, y, z = 4, 0, 93  # 初始值
    dx = 1  # x 的增量
    dz = 2  # z 的增量
    for i in range(num_points):
        trajectory.append([x, y, z])

        # 更新 x
        x += dx
        if i % 10 == 0:  # 逐渐增加 x 的增量
            dx += 1

        # 更新 y
        if i > 20 and i % 15 == 0:
            y -= 1

        # 更新 z
        if i < 50:
            z += dz
        elif i < 100:
            dz += 1  # z 的增量逐渐变大
            z += dz
        else:
            dz += 2  # 后期增量更大
            z += dz

    return trajectory

# 生成并打印轨迹数据
trajectory = generate_trajectory(100)
for point in trajectory:
    print(point)