import requests
from PIL import Image
import os
from io import BytesIO
import urllib.parse


# ------------ 原JS混淆函数的Python移植 ------------
def a(n, t):
    """等效于原JS的a函数，判断元素是否存在"""
    try:
        return t in n
    except:
        # 处理非迭代对象的兼容逻辑
        for e in range(len(n)):
            if n[e] == t:
                return True
        return False


def An(n):
    """核心处理逻辑的Python实现"""
    t = [1, 0, 3, 2]
    i = 0
    s = "lengt"
    c = []
    while True:
        if i >= len(t):
            break
        case = t[i]
        i += 1
        if case == 0:
            c = []
        elif case == 1:
            s = "lengt"  # 修正字符串匹配
        elif case == 2:
            return c
        elif case == 3:
            str_len = len(n)
            for d in range(str_len):
                if d >= 32:
                    break
                u = ord(n[d])
                # 处理字符运算
                while a(c, u % 32):
                    u += 1
                c.append(u % 32)
    return c


def sn(url):
    """URL处理函数"""
    parts = url.split("/")
    if len(parts) < 8:
        raise ValueError("URL格式不符合要求")

    target_part = parts[7].split(".")[0]
    return An(target_part)


# ------------ 图像处理逻辑 ------------
def download_image(url, save_path):
    """下载图片并保存"""
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers)
    if response.status_code != 200:
        raise Exception(f"下载失败，状态码: {response.status_code}")
    with open(save_path, 'wb') as f:
        f.write(response.content)


def convert_webp_to_png(webp_path, png_path):
    """转换图片格式"""
    with Image.open(webp_path) as img:
        img.save(png_path, 'PNG')


def process_image(bg_img_url):
    """主处理逻辑"""
    try:
        # 临时文件路径
        webp_path = './temp.webp'
        png_path = './temp.png'

        # 1. 下载图片
        download_image(bg_img_url, webp_path)

        # 2. 转换格式
        convert_webp_to_png(webp_path, png_path)

        # 3. 加载图片
        img = Image.open(png_path)
        img_width, img_height = img.size

        # 4. 创建画布
        canvas = Image.new('RGB', (400, 200), (255, 255, 255))

        # 5. 获取切片参数
        params = sn(bg_img_url)
        a_size = 400 // len(params)

        # 6. 执行切片拼接
        for i, n in enumerate(params):
            # 计算源区域
            src_x = n * a_size
            src_box = (src_x, 0, src_x + a_size, 200)

            # 计算目标位置
            dst_x = i * a_size
            dst_box = (dst_x, 0, dst_x + a_size, 200)

            # 裁剪并粘贴
            region = img.crop(src_box)
            canvas.paste(region, dst_box)

        # 7. 保存结果
        canvas.save('output.png')
        print("处理完成，输出到 output.png")

        # 清理临时文件（可选）
        os.remove(webp_path)
        os.remove(png_path)

    except Exception as e:
        print(f"处理出错: {str(e)}")


# ------------ 测试执行 ------------
if __name__ == "__main__":
    # 测试用URL（需替换为实际值）
    test_url = "https://static4.dingxiang-inc.com/picture/dx/PG9u1XrXvs/zib3/3ac4bf40f6d344ad93314b413bbabf7f.webp"

    # 执行处理流程
    process_image(test_url)
