# -*- coding: utf-8 -*-
# @Time    : 2024/12/15 20:22
# @Author  : 顾安
# @File    : 2.作业 - 照片图集（线程池版本）.py



import os
import time
import requests
from lxml import etree
from concurrent.futures import ThreadPoolExecutor, as_completed


url = 'https://www.lpbzj.vip/allimg/page/{}'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
    'Referer': 'https://www.lpbzj.vip/allimg'
}


def get_detail_url(page_num):
    response = requests.get(url.format(page_num), headers=headers).text
    tree = etree.HTML(response)
    element_div = tree.xpath("//div[@id='posts']")[0]
    detail_url_list = element_div.xpath(".//div[@class='img']/a/@href")
    return detail_url_list


def save_image(detail_url):
    response = requests.get(detail_url, headers=headers)
    if response.status_code == 200:
        tree = etree.HTML(response.text)
        div_element = tree.xpath("//div[@class='article-content clearfix']")[0]
        image_url_list = div_element.xpath(".//img/@src")
        for image_url in image_url_list:
            response = requests.get(image_url, headers=headers).content
            file_name = image_url.rsplit('/')[-1]
            with open('./照片图集/' + file_name, 'wb') as f:
                f.write(response)
                print('下载成功:', file_name)
    else:
        print('资源不存在...')



if __name__ == '__main__':
    if not os.path.exists('./照片图集/'):
        os.mkdir('./照片图集/')


    start_time = time.time()
    with ThreadPoolExecutor() as pool:
        futures = [pool.submit(get_detail_url, page_num) for page_num in range(1, 17)]
        for future in as_completed(futures):
            pool.map(save_image, future.result())
    end_time = time.time()
    print('执行时间:', end_time - start_time)


