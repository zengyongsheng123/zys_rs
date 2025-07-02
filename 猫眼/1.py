import random

from PIL import Image

# 加载背景图
image = Image.open("111.png")  # 背景图 (672 × 390)
image = image.convert("RGBA")

# 手动指定右侧黑色缺口的边界（根据图片观察）
gap_left, gap_top = 171, 69  # 右侧缺口左上角坐标
gap_right, gap_bottom = 222, 122  # 右侧缺口右下角坐标

# 计算缺口的宽度和高度
gap_width = gap_right - gap_left + random.randint(1, 3)
gap_height = gap_bottom - gap_top + random.randint(1, 3)

# 调试：打印坐标
print(f"Gap coordinates: left={gap_left}, top={gap_top}, right={gap_right}, bottom={gap_bottom}")

# 截取黑色缺口
gap_region = (gap_left, gap_top, gap_right, gap_bottom)
gap_image = image.crop(gap_region)

# 保存裁剪出的缺口（调试用）
gap_image.save("gap_image.png")

# 将缺口平移到最左侧，与原缺口顶部对齐
paste_x = 0
paste_y = gap_top  # 使用检测到的顶部坐标

# 可选：微调 Y 坐标以确保视觉对齐
paste_y_adjusted = paste_y  # 可调整，例如 paste_y + 5 或 paste_y - 5

# 粘贴缺口
image.paste(gap_image, (paste_x, paste_y_adjusted), gap_image)

# 保存结果
image.save("output.png")