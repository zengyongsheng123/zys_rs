import pymongo
import requests
import threading
from lxml import etree
from retrying import retry
from queue import Queue, Empty
from fake_useragent import UserAgent


class DangDangShop:
    mongo_client = pymongo.MongoClient()
    collection = mongo_client['py_spider']['dangdang_shop']

    def __init__(self):
        self.url = 'https://search.dangdang.com/?key=python&act=input'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
        self.ip_url = 'https://dps.kdlapi.com/api/getdps/?secret_id=orsnof8y6rxqtgnf2v33&signature=zugc8en4ct195aoish9iwma4dnvgeya5&num=1&pt=1&format=text&sep=1'

        self.ip_queue = Queue()
        self.url_queue = Queue()
        self.response_queue = Queue()
        self.detail_queue = Queue()

    def get_ip(self):
        try:
            proxy_ip = requests.get(self.ip_url, timeout=5).text.strip()
            self.ip_queue.put(proxy_ip)
        except requests.RequestException as e:
            print(f"获取代理 IP 出错: {e}")

    def get_page_num(self):
        try:
            response = requests.get(self.url, headers=self.headers, timeout=5)
            tree = etree.HTML(response.text)
            max_page = tree.xpath("//ul[@name='Fy']/li[last()-2]/a/text()")[0]
            for page in range(1, int(max_page) + 1):
                url = f'https://search.dangdang.com/?key=python&act=input&page_index={page}'
                self.url_queue.put(url)
        except Exception as e:
            print(f"获取分页数失败: {e}")
            self.url_queue.put(self.url)  # 默认至少添加一个 URL

    @retry(stop_max_attempt_number=3)
    def get_goods_list(self):
        while True:
            try:
                url = self.url_queue.get(timeout=3)
                if self.ip_queue.empty():
                    self.get_ip()

                proxy_ip = self.ip_queue.get()
                username = "d2119504442"
                password = "4zcxgwca"
                proxies = {
                    "http": f"http://{username}:{password}@{proxy_ip}/",
                    "https": f"http://{username}:{password}@{proxy_ip}/"
                }
                self.headers['User-Agent'] = UserAgent().random
                response = requests.get(url, headers=self.headers, proxies=proxies, timeout=5)
                self.response_queue.put(response)

                if response.status_code == 200:
                    self.ip_queue.put(proxy_ip)  # 成功请求后重用代理
                self.url_queue.task_done()
            except Empty:
                break  # 队列为空时退出
            except requests.RequestException as e:
                print(f"获取商品列表失败: {e}")
                self.url_queue.task_done()

    def parse_info(self):
        while True:
            try:
                response = self.response_queue.get(timeout=5)
                tree = etree.HTML(response.text)
                li_list = tree.xpath("//ul[@class='bigimg']/li")
                for li in li_list:
                    item = {
                        'goods_name': li.xpath("./a/@title")[0],
                        'goods_price': li.xpath("p[@class='price']/span[1]/text()") or '空'
                    }
                    self.detail_queue.put(item)
                self.response_queue.task_done()
            except Empty:
                break  # 队列为空时退出
            except Exception as e:
                print(f"解析失败: {e}")
                self.response_queue.task_done()

    def save_info(self):
        while True:
            try:
                detail = self.detail_queue.get(timeout=3)
                self.collection.insert_one(detail)
                print('数据保存成功:', detail)
                self.detail_queue.task_done()
            except Empty:
                break  # 队列为空时退出

    def main(self):
        self.get_page_num()

        thread_list = []
        for _ in range(5):
            thread_list.append(threading.Thread(target=self.get_goods_list))
            thread_list.append(threading.Thread(target=self.parse_info))

        save_thread = threading.Thread(target=self.save_info)
        thread_list.append(save_thread)

        for thread in thread_list:
            thread.start()

        # 等待队列完成所有任务
        self.url_queue.join()
        self.response_queue.join()
        self.detail_queue.join()

        # 等待线程完成
        for thread in thread_list:
            thread.join()

        print("所有任务完成！")


if __name__ == '__main__':
    shop = DangDangShop()
    shop.main()
