from PIL import Image, ImageChops, ImageFilter, ImageDraw


def precise_gap_detection(img):
    """精确识别拼图形状缺口"""
    # 转换为HSV空间检测明度变化
    hsv = img.convert("HSV")
    v_channel = hsv.split()[2]

    # 寻找亮度突变区（拼图缺口特征）
    edge_map = v_channel.filter(ImageFilter.FIND_EDGES)
    bbox = edge_map.getbbox()

    # 扩展检测区域（包含锯齿边缘）
    return (
        bbox[0] - 5, bbox[1] - 5,
        bbox[2] + 5, bbox[3] + 5
    ) if bbox else (width - 100, 100, width, 200)


# 加载图像
base_img = Image.open("img.png").convert("RGBA")
width, height = base_img.size

# 精确识别缺口区域
gap_box = precise_gap_detection(base_img)
print(f"Detected gap area: {gap_box}")

# 创建分层处理系统
layer_system = {
    "background": base_img.copy(),
    "gap_mask": Image.new("L", base_img.size, 0),
    "mirror_effect": Image.new("RGBA", base_img.size, (0, 0, 0, 0))
}

# 生成动态缺口蒙版
gap_mask_draw = ImageDraw.Draw(layer_system["gap_mask"])
gap_mask_draw.rectangle(gap_box, fill=255)

# 创建镜像缺口（带羽化边缘）
original_gap = base_img.crop(gap_box)
mirror_gap = original_gap.transpose(Image.FLIP_LEFT_RIGHT).filter(
    ImageFilter.GaussianBlur(radius=2)
)

# 计算精准粘贴位置（保持透视关系）
mirror_position = (
    gap_box[0] - mirror_gap.width - 20,  # 20px安全间距
    gap_box[1] + (gap_box[3] - gap_box[1]) // 4
)

# 多层合成
layer_system["mirror_effect"].paste(
    mirror_gap,
    mirror_position,
    mask=mirror_gap.split()[3]  # 使用alpha通道作为蒙版
)

# 最终合成公式：background - (gap_mask ∩ mirror_effect)
result = Image.composite(
    layer_system["mirror_effect"],
    layer_system["background"],
    layer_system["gap_mask"]
)

result.save("magic_output.png")