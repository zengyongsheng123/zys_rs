import requests
from PIL import Image
from io import BytesIO


def get_params(url):
    """参数生成函数"""
    parts = url.split('/')
    chars = parts[7].split('.')[0][:32]  # 直接截取前32字符

    params = []
    for c in chars:
        u = ord(c)
        while u % 32 in params:
            u += 1
        params.append(u % 32)
    return params


def process_image(url):
    """核心处理流程"""
    try:
        # 下载并转换图片
        response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
        img = Image.open(BytesIO(response.content)).convert('RGB')

        # 创建画布
        canvas = Image.new('RGB', (400, 200))
        params = get_params(url)
        slice_width = 400 // len(params)

        # 拼接图片
        for i, n in enumerate(params):
            x = n * slice_width
            region = img.crop((x, 0, x + slice_width, 200))
            canvas.paste(region, (i * slice_width, 0))

        canvas.save('output.png')
        print("处理完成，输出到 output.png")

    except Exception as e:
        print(f"处理出错: {e}")


if __name__ == "__main__":
    test_url = "https://static4.dingxiang-inc.com/picture/dx/PG9u1XrXvs/zib3/3ac4bf40f6d344ad93314b413bbabf7f.webp"
    process_image(test_url)