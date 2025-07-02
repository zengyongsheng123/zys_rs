# -*- coding: utf-8 -*-
# @Time    : 2024/12/24 20:26
# @Author  : 顾安
# @File    : 2.回顾 - 文件下载.py



import os
from DrissionPage import SessionPage


url = 'https://www.lpbzj.vip/allimg'
page = SessionPage()
page.get(url)
element_div = page.s_eles("xpath://div[@id='posts']")[0]
detail_url_list = element_div.s_eles("xpath:.//div[@class='img']/a")

save_path = './美女写真/'
os.makedirs(save_path, exist_ok=True)  # 确保保存目录存在

for detail_url in detail_url_list:
    page.get(detail_url.attr('href'))
    div_element = page.s_eles("xpath://div[@class='article-content clearfix']")[0]
    image_url_list = div_element.s_eles("xpath:.//img")
    for image_url in image_url_list:
        img_src = image_url.attr('src')

        # 同步下载
        # res = page.download(img_src, save_path)
        # print('task status:', res)

        # 添加下载任务并发下载
        page.download.add(img_src, save_path)
        print(f"Downloading image from: {img_src}")
