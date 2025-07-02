from PIL import Image
import requests

# 常量定义（提高可维护性）
TILE_WIDTH = 12
TILE_HEIGHT = 200
IMAGE_WIDTH = 400
BORDER_START = 384
BORDER_WIDTH = 16  # 400 - 384 = 16


def restore_sliding_captcha(image_url, source_image_path, output_image_path):
    """还原滑块验证码底图
    Args:
        image_url: 包含图片哈希的完整URL
        source_image_path: 原始背景图保存路径
        output_image_path: 输出图片保存路径
    """
    # 将验证码图片下载到本地目录
    res = requests.get(image_url).content
    with open(source_image_path, "wb") as f:
        f.write(res)
    # 提取图片哈希标识
    image_hash = image_url.split("/")[7].split(".")[0]
    # 生成定位索引数组
    position_indices = []
    for index, char in enumerate(image_hash):
        if index >= 32:  # 只需处理前32个字符
            break
        char_code = ord(char)
        # 确保哈希值唯一性
        while (mod_value := char_code % 32) in position_indices:
            char_code += 1
        position_indices.append(mod_value)
    # 图片处理流程
    with Image.open(source_image_path) as src_img:
        # 创建新画布
        canvas = Image.new('RGB', (IMAGE_WIDTH, TILE_HEIGHT))
        # 排列拼图碎片
        for idx, position in enumerate(position_indices):
            # 计算碎片位置
            tile_start_x = position * TILE_WIDTH
            # 提取碎片
            tile = src_img.crop((
                tile_start_x,
                0,
                tile_start_x + TILE_WIDTH,
                TILE_HEIGHT
            ))
            # 定位到画布
            canvas.paste(tile, (idx * TILE_WIDTH, 0))
        # 添加右侧边框
        border_tile = src_img.crop((
            BORDER_START,
            0,
            BORDER_START + BORDER_WIDTH,
            TILE_HEIGHT
        ))
        canvas.paste(border_tile, (BORDER_START, 0))
        # 保存结果
        canvas.save(output_image_path)


# 使用示例
if __name__ == "__main__":
    restore_sliding_captcha(
        image_url="https://static4.dingxiang-inc.com/picture/dx/sKOLJemjeo/zib3/75a5b8cf232d434daf19bfa3d09693d6.webp",
        source_image_path='./bg.webp',
        output_image_path='./bg.jpg'
    )
