from PIL import Image

# 加载背景图
image = Image.open("image2.png")  # 背景图 (672 × 390)
image = image.convert("RGBA")

# 手动指定右侧黑色缺口的边界（当前图片的已知坐标）
gap_left, gap_top = 485, 102  # 右侧缺口左上角坐标
gap_right, gap_bottom = 572, 177  # 右侧缺口右下角坐标

# 可选：启用自动检测（将 use_auto_detect 设为 True）
use_auto_detect = False

if use_auto_detect:
    # 自动检测右边黑色缺口的边界
    width, height = image.size
    black_threshold = 50  # 检测暗区域的阈值
    gap_left, gap_top, gap_right, gap_bottom = width, height, 0, 0

    # 遍历右半部分像素
    for x in range(width // 2, width):
        for y in range(height):
            r, g, b, a = image.getpixel((x, y))
            if r < black_threshold and g < black_threshold and b < black_threshold and a > 100:
                gap_left = min(gap_left, x)
                gap_top = min(gap_top, y)
                gap_right = max(gap_right, x)
                gap_bottom = max(gap_bottom, y)

    # 微调边界
    gap_left = max(0, gap_left - 5)
    gap_top = max(0, gap_top - 5)
    gap_right = min(width, gap_right + 5)
    gap_bottom = min(height, gap_bottom + 5)

    # 调试：打印检测到的边界
    print(f"Detected gap coordinates: left={gap_left}, top={gap_top}, right={gap_right}, bottom={gap_bottom}")

    # 检查边界是否有效，若无效则使用手动坐标
    if gap_right <= gap_left or gap_bottom <= gap_top:
        print("Warning: Invalid gap region detected. Using manual coordinates.")
        gap_left, gap_top = 485, 102
        gap_right, gap_bottom = 572, 177

# 计算缺口的宽度和高度
gap_width = gap_right - gap_left + 1
gap_height = gap_bottom - gap_top + 1

# 调试：打印最终使用的坐标
print(f"Using gap coordinates: left={gap_left}, top={gap_top}, right={gap_right}, bottom={gap_bottom}")

# 截取黑色缺口
gap_region = (gap_left, gap_top, gap_right, gap_bottom)
gap_image = image.crop(gap_region)

# 保存裁剪出的缺口（调试用）
gap_image.save("gap_image.png")

# 将缺口平移到最左侧，与原缺口顶部对齐
paste_x = 0
paste_y = gap_top  # 使用检测到的顶部坐标

# 粘贴缺口
image.paste(gap_image, (paste_x, paste_y), gap_image)

# 保存结果
image.save("output.png")