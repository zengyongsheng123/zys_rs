# -*- coding: utf-8 -*-
# @Time    : 2024/11/24 20:57
# @Author  : 顾安
# @File    : 6.视频下载.py

"""
要求: 在读写二进制文件的过程中显示下载进度条
"""
import requests
from tqdm import tqdm  # 显示一个下载进度条: pip install tqdm


def download_video(url, save_path):
    response = requests.get(url, stream=True)

    total_size = int(response.headers.get('content-length', 0))

    # 初始化资源大小
    downloaded_size = 0

    # unit: 下载单位（字节）
    # unit_scale: 自动调整单位
    # unit_divisor: 单位换算（除数为1024）
    with open(save_path, 'wb') as file, tqdm(total=total_size, unit='B', unit_scale=True, unit_divisor=1024) as bar:
        for chunk in response.iter_content(chunk_size=1024):
            if chunk:
                file.write(chunk)
                downloaded_size += len(chunk)
                bar.update(len(chunk))

    print('下载完成...')


video_url = "https://6qenm46tkm2as4q600ni00qbe95v3jt8u5co9caq8f84lj6hgd0vu0h5.tt.x.bsgslb.cn/xdispatchaf09e439749906ad/v9-y.douyinvod.com/e1565c1ab0db9cb50725598d18486488/674337ab/video/tos/cn/tos-cn-ve-15c000-ce/ogduXRwEJE6Z4lZnAsnKI6QefgA5GCEedDg9PF/?a=1128&ch=0&cr=0&dr=0&er=0&cd=0%7C0%7C0%7C0&cv=1&br=1357&bt=1357&cs=0&ds=3&ft=Qimo7JEuffPdh2~kI1jNvAq-antLjrKN.xpNRka-LP-LUjVhWL6&mime_type=video_mp4&qs=0&rc=ZTU8PDU0OTw8NzplNjY8Z0BpM2hsNmo5cjpodjMzbGkzNEBfYjIvYmE0XzExLmAyMDVgYSNvZTFiMmRjZHNgLS1kLWJzcw%3D%3D&btag=c0000e000b8001&cquery=100y&dy_q=1732453345&feature_id=aa7df520beeae8e397df15f38df0454c&l=20241124210225828F834B77FE560B3426&bsxdisp=paco&bsxdc=1"
path = './douyin.mp4'
download_video(video_url, path)
