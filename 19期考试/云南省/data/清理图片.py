import os
import glob


def clean_image_files():
    """清理所有生成的图片文件"""
    # 要删除的文件模式
    patterns = [
        "smallImage.png",
        "bigImage.png",
        "debug_small.png",
        "debug_big.png",
        "fail_small_*.png",
        "fail_big_*.png"
    ]

    deleted_files = []

    for pattern in patterns:
        for file_path in glob.glob(pattern):
            try:
                os.remove(file_path)
                deleted_files.append(file_path)
                print(f"已删除: {file_path}")
            except Exception as e:
                print(f"删除失败 {file_path}: {e}")

    if deleted_files:
        print(f"\n成功删除 {len(deleted_files)} 个文件")
    else:
        print("没有找到需要删除的图片文件")


# 执行清理
clean_image_files()