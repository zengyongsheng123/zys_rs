'''
@File    ：Picture_Restore.py
@Author  ：南宫啸天
@Date    ：2025/3/12 23:01 
'''
from PIL import Image
import requests
# 常量定义（提高可维护性）
TILE_WIDTH = 12
TILE_HEIGHT = 200
IMAGE_WIDTH = 400
BORDER_START = 384
BORDER_WIDTH = 16

def restore_sliding_captcha(position_indices,source_image_path,output_image_path):
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





