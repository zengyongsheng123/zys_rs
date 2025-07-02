# -*- coding: utf-8 -*-
# @Time    : 2024/12/24 20:52
# @Author  : 顾安
# @File    : 3.快代理免费ip脚本采集.py


import re
import json
import requests


class FreeIP:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
        }

    def get_ip(self, page):
        url = f'https://www.kuaidaili.com/free/inha/{page}'
        response = requests.get(url, headers=self.headers).text
        ip_list = re.findall(r'const fpsList = (.*?);', response)[0]

        ip_pattern = r'"ip": "(\d{1,3}(?:\.\d{1,3}){3})"'
        port_pattern = r'"port": "(\d{1,5})"'

        ips = re.findall(ip_pattern, ip_list)
        ports = re.findall(port_pattern, ip_list)

        for temp in zip(ips, ports):
            ip_dict = dict()
            ip_dict['ip'] = temp[0]
            ip_dict['port'] = temp[1]

            yield ip_dict

    def test_ip(self, max_page_num):
        for page in range(1, max_page_num + 1):
            for result in self.get_ip(page):
                proxies = {
                    # http://ip:port
                    'http': 'http://' + result['ip'] + ':' + result['port'],
                    'https': 'http://' + result['ip'] + ':' + result['port']
                }

                try:
                    response = requests.get('http://httpbin.org/ip', headers=self.headers, proxies=proxies, timeout=3)
                    if response.status_code == 200:
                        print(response.text)
                        with open('可以使用的免费ip.txt', 'a', encoding='utf-8') as f:
                            f.write(json.dumps(proxies, ensure_ascii=False, indent=4) + '\n')
                            print('写入成功:', proxies)
                except Exception as e:
                    print('请求失败:', e)


if __name__ == '__main__':
    free_ip = FreeIP()
    free_ip.test_ip(20)
