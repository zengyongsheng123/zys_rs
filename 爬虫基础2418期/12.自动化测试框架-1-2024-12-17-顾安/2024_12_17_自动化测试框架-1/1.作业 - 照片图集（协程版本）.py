# -*- coding: utf-8 -*-
# @Time    : 2024/12/17 20:04
# @Author  : 顾安
# @File    : 1.作业 - 照片图集（协程版本）.py


import os
import time
import asyncio
import aiohttp
import aiofile
from lxml import etree

# 全局变量
url = 'https://www.lpbzj.vip/allimg/page/{}'
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    'Referer': 'https://www.lpbzj.vip/allimg'
}


# 获取单个页面的详情链接
async def get_detail_url(session, page_num):
    async with session.get(url.format(page_num), headers=headers) as response:
        text = await response.text()
        tree = etree.HTML(text)
        element_div = tree.xpath("//div[@id='posts']")[0]
        detail_url_list = element_div.xpath(".//div[@class='img']/a/@href")
        print(f"第{page_num}页: 获取到{len(detail_url_list)}个详情链接")
        return detail_url_list


# 下载单个图片
async def download_image(session, image_url):
    async with session.get(image_url, headers=headers) as response:
        if response.status == 200:
            file_name = image_url.rsplit('/')[-1]
            save_path = os.path.join('./照片图集', file_name)
            async with aiofile.async_open(save_path, 'wb') as f:
                await f.write(await response.read())
            print('下载成功:', file_name)


# 获取详情页面的图片并下载
async def save_image(session, detail_url):
    async with session.get(detail_url, headers=headers) as response:
        if response.status == 200:
            text = await response.text()
            tree = etree.HTML(text)
            div_element = tree.xpath("//div[@class='article-content clearfix']")[0]
            image_url_list = div_element.xpath(".//img/@src")
            print(f"详情链接 {detail_url} 包含 {len(image_url_list)} 张图片")
            # 下载所有图片
            tasks = [download_image(session, image_url) for image_url in image_url_list]
            await asyncio.gather(*tasks)
        else:
            print('资源不存在:', detail_url)


# 主函数
async def main():
    if not os.path.exists('./照片图集'):
        os.mkdir('./照片图集')

    start_time = time.time()
    async with aiohttp.ClientSession() as session:
        # 获取所有页面的详情链接
        tasks = [get_detail_url(session, page_num) for page_num in range(1, 17)]
        detail_url_lists = await asyncio.gather(*tasks)

        # 展开所有详情链接
        all_detail_urls = [url for sublist in detail_url_lists for url in sublist]

        # 下载每个详情链接里的图片
        tasks = [save_image(session, detail_url) for detail_url in all_detail_urls]
        await asyncio.gather(*tasks)

    end_time = time.time()
    print('\n耗时:', end_time - start_time)


if __name__ == '__main__':
    asyncio.run(main())
