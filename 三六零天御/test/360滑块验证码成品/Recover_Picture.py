#!/usr/bin/env python
# -*- coding: UTF-8 -*-
'''
@Project ：TestProject 
@File    ：Recover_Picture.py
@IDE     ：PyCharm 
@Author  ：南宫啸天
@Date    ：2025/3/14 14:12 
'''
from PIL import Image
import requests

proxies = {
    # "http": "http://127.0.0.1:8888",
    # "https": "http://127.0.0.1:8888"
}
def restore_sliced_image(url,input_path,out_path):
    """还原切片验证码背景图"""
    # 常量定义
    SLICE_WIDTH = 17
    TOTAL_WIDTH = 544
    BASE = 32
    # 下载图片
    with requests.get(url, stream=True, proxies=proxies, verify=False) as res:
        res.raise_for_status()
        with open(input_path, "wb") as f:
            for chunk in res.iter_content(1024):
                f.write(chunk)
    # 生成位置序列
    filename = url.split("/")[-1].split(".")[0][:BASE]
    positions = []
    for char in filename:
        code = ord(char)
        while (mod := code % BASE) in positions:
            code += 1
        positions.append(mod)
    # 重组图像
    with Image.open(input_path) as src:
        dst = Image.new('RGBA', (TOTAL_WIDTH, src.height))
        for i, pos in enumerate(positions):
            x = i * SLICE_WIDTH
            slice_img = src.crop((x, 0, x + SLICE_WIDTH, src.height))
            dst.paste(slice_img, (pos * SLICE_WIDTH, 0))
    dst.save(out_path)


#使用实例
#参数1是验证码图片的url，参数2是图片下载保存路径，参数3是还原图片的保存路径
# restore_sliced_image("https://p432.ssl.qhimgs4.com/d/jiagubao/sdk/captcha/fgn9391o599946de9790b9cjma8ki2hl.png","./sliced.png","./restored.png")