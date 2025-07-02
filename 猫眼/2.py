from PIL import Image

# 加载背景图
image = Image.open("image22.png")  # 背景图 (672 × 390)
image = image.convert("RGBA")

# 自动检测右边黑色缺口的边界
width, height = image.size
black_threshold = 30  # 优化阈值，检测更宽泛的暗区域
gap_left, gap_top, gap_right, gap_bottom = width, height, 0, 0

# 限制检测范围到右上角（例如右上角 1/4 区域）
search_width = width // 2
search_height = height // 2
for x in range(width - search_width, width):
    for y in range(search_height):
        r, g, b, a = image.getpixel((x, y))
        if r < black_threshold and g < black_threshold and b < black_threshold and a > 50:  # 放宽alpha阈值
            gap_left = min(gap_left, x)
            gap_top = min(gap_top, y)
            gap_right = max(gap_right, x)
            gap_bottom = max(gap_bottom, y)

# 微调边界，确保包含整个缺口
gap_left = max(0, gap_left - 5)
gap_top = max(0, gap_top - 5)
gap_right = min(width, gap_right + 5)
gap_bottom = min(height, gap_bottom + 5)

# 验证边界，确保有效
if gap_right <= gap_left or gap_bottom <= gap_top:
    raise ValueError(f"Invalid gap region detected: left={gap_left}, top={gap_top}, right={gap_right}, bottom={gap_bottom}. "
                     "Please adjust black_threshold or check the image.")

# 调试：打印检测到的边界
print(f"Detected gap coordinates: left={gap_left}, top={gap_top}, right={gap_right}, bottom={gap_bottom}")

# 计算缺口的宽度和高度
gap_width = gap_right - gap_left + 1
gap_height = gap_bottom - gap_top + 1

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