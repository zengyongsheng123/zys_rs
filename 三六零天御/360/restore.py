from PIL import Image
import math


def decrypt_image(input_string):
    result = []
    for i in range(min(len(input_string), 32)):
        char_code = ord(input_string[i])
        while (char_code % 32) in result:
            char_code += 1
        result.append(char_code % 32)
    return result


def convert_array(block_order, block_width, source_image, canvas_context):
    # 获取图像尺寸
    image_width, image_height = source_image.size
    for src_index, target_index in enumerate(block_order):
        # 计算源 x 坐标 （sx）
        sx = src_index * block_width
        # 从源图像裁剪源块
        # (sx, sy, sx + block_width, sy + image_height)
        block = source_image.crop((sx, 0, sx + block_width, image_height))
        # 计算目标 x 坐标 （dx）
        dx = target_index * block_width
        # 将块粘贴到画布上的目标位置
        # (dx, dy) = (dx, 0)
        canvas_context.paste(block, (dx, 0))


def process_image(image_path, filename):
    # Load source image
    source_image = Image.open(image_path)

    # Get block order from decrypt_image
    block_order = decrypt_image(filename)

    # Calculate block width
    block_width = math.floor(source_image.width / len(block_order))

    # Create a new canvas (same size as source image)
    canvas = Image.new("RGB", source_image.size)

    convert_array(block_order, block_width, source_image, canvas)

    # Save or display the result
    canvas.save("restore_bg.png")
    # canvas.show()  # Uncomment to display the image


# image_path = "2.png"  # Replace with your image path
# filename = "d592cen96b7919o38j0ifg9499ak9lhm"  # Example filename
# process_image(image_path, filename)
