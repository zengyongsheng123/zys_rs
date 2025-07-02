# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 21:21
# @Author  : 顾安
# @File    : 5.将b站视频信息写入到csv.py


import csv
import requests


url = 'https://api.bilibili.com/x/web-interface/wbi/search/type?category_id=&search_type=video&ad_resource=5654&__refresh__=true&_extra=&context=&page={}&page_size=42&pubtime_begin_s=0&pubtime_end_s=0&from_source=&from_spmid=333.337&platform=pc&highlight=1&single_column=0&keyword=%E7%BE%8E%E5%A5%B3&qv_id=0KowVPm2EEXFT6Hi2JlFgz7lD84VI2Cb&source_tag=3&gaia_vtoken=&dynamic_offset=36&web_location=1430654&w_rid=fd05d53204ffaa56ec04b5325bf5eeed&wts=1733404571'
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
    'Cookie': "buvid3=C8331505-8AFB-3FC2-9271-A6ADF2DE7D2C32718infoc; b_nut=1732879332; _uuid=C1073FD7C-EFDE-2E67-BD87-910A1F1ACA551033043infoc; enable_web_push=DISABLE; home_feed_column=5; browser_resolution=1920-849; buvid4=13947CEA-6740-D88C-C168-246C8A15A20934016-024112911-fba0cBtQNqg+M3Fzv6w20Q%3D%3D; buvid_fp=d4a46908f742bada81e4db9c242d2bad; DedeUserID=508205460; DedeUserID__ckMd5=73fc57c2f075cc42; header_theme_version=CLOSE; CURRENT_FNVAL=4048; rpdid=|(kmJY|~u~l~0J'u~Jk))||)|; CURRENT_QUALITY=112; bp_t_offset_508205460=1005205025108000768; b_lsid=10FB25789_19396F51158; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM2NjM2NjQsImlhdCI6MTczMzQwNDQwNCwicGx0IjotMX0.Bscn667Wne6RWdqm5RJGmYXZ6_Rhfg03n-4dvvdkc_0; bili_ticket_expires=1733663604; SESSDATA=c3785040%2C1748956465%2Cf1dea%2Ac2CjAhiafz7JHv1KziLq1Q6AXICaETdyvq5suiRYRgKLux-T3iky_5ujkU0t86q8Qk4EASVmJwM3JvcnN0TGhIempYM3lIQ2h0Rm5XODI3S3hQdk01TmxwbTdhUGNFQTJQeGpiX0gwT3lOSFMzVXJJRDF5R1hmVW1fWTg0Y2VwS01IaUFhSVdqLWdnIIEC; bili_jct=600e85f968cc4408e442cf6c790be9e2; sid=7tcseco3"
}


def save_csv_video_info(api_url):
    field_names = ['title', 'author']

    # newline
    # encoding: GBK
    with open('bilibili_video_info.csv', 'w', newline='', encoding='utf-8') as f:
        f_csv = csv.DictWriter(f, field_names)
        f_csv.writeheader()

        for page in range(1, 29):
            response = requests.get(api_url.format(page), headers=headers).json()
            for temp in response['data']['result']:
                item = dict()
                item['title'] = temp['title']
                item['author'] = temp['author']
                print(item)
                f_csv.writerow(item)


save_csv_video_info(url)
