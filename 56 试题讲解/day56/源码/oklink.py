import json
import subprocess
import threading
from queue import Queue

import pymongo
import redis
import requests


class OKLINK:
    def __init__(self):
        self.url = "https://www.oklink.com/api/explorer/v1/btc/transactionsNoRestrict"
        self.cookies = {
            "aliyungf_tc": "812ece6536d3a4049a62f2b40395fd818bc129d60d6b5851870dccd4ce39caba",
            "traceId": "2040117609828840003",
            "devId": "6c776349-2829-41d8-902a-7aa96498d147",
            "ok_site_info": "9FjOikHdpRnblJCLiskTJx0SPJiOiUGZvNmIsIiTDJiOi42bpdWZyJye",
            "locale": "zh_CN",
            "ok-exp-time": "1731760982892",
            "okg.currentMedia": "xl",
            "oklink.unaccept_cookie": "1",
            "_monitor_extras": "{\"deviceId\":\"7I83NBdw8D6G9kQE3fh6rG\",\"eventId\":10,\"sequenceNumber\":10}",
            "amp_d77757": "6c776349-2829-41d8-902a-7aa96498d147...1icqfv5st.1icqg0gcg.9.0.9",
            "ok-ses-id": "EF/AEfhQvSb+xxaUbz+twAeSxS2Lk5zba9Y+9xwOQ1rbrN6D7tqFeAv0SDfDpEG3EpP33/6zNGhKknu0OfaaJb65Vlz4MKqiDvhPWre7BL31cC5BLux9Is6MoaiJc5Rb"
        }
        self.request_params_queue = Queue()
        self.request_params_header_queue = Queue()
        self.response_queue = Queue()
        self.data_queue = Queue()
        self.client = pymongo.MongoClient()
        self.collection = self.client['okLink']['okLink']
        self.redis = redis.Redis(db=4)

    def init_request_params(self):
        for i in range(0, 1):
            params = {"offset": str(i * 20), "limit": "20"}
            self.request_params_queue.put(params)

    def gender_request_headers(self):
        while True:
            if self.request_params_queue.empty():
                continue
            params = self.request_params_queue.get()
            headers = self.get_headers(params)
            self.request_params_header_queue.put((params, headers))
            self.request_params_queue.task_done()

    def build_url(self, url, params):
        url += "?"
        for key, value in params.items():
            url += f"{key}={value}&"
        return url[:-1]

    def get_headers(self, params):
        headers_str = subprocess.run(['node', './oklink-header.js', 'encrypt', self.build_url(self.url, params)],
                                     capture_output=True, text=True, encoding='utf-8').stdout
        return json.loads(headers_str)

    def request_data(self):
        while True:
            if self.request_params_header_queue.empty():
                continue
            params, headers = self.request_params_header_queue.get()
            res = requests.get(self.url, headers=headers, cookies=self.cookies, params=params)
            page_num = int(int(params['offset']) / 20 + 1)
            print("请求第{}页数据成功:=====>code:{}".format(page_num, res.status_code))
            self.response_queue.put((res, page_num))
            self.request_params_header_queue.task_done()

    def parse_data(self):
        while True:
            if self.response_queue.empty():
                continue
            res, page_num = self.response_queue.get()
            data_list = res.json().get("data").get("hits")
            self.data_queue.put((data_list, page_num))
            self.response_queue.task_done()

    def save_data(self):
        while True:
            if self.data_queue.empty():
                continue
            data_list, page_num = self.data_queue.get()
            new_data_list = self.distinct(data_list)
            if len(new_data_list) > 0:
                print("保存第{}页数据失败: 去重后数据为空,跳过".format(page_num))
                self.data_queue.task_done()
                continue
            self.collection.insert_many(new_data_list)
            print("保存第{}页数据成功: 条数:{}=====>".format(page_num, len(data_list)))
            self.data_queue.task_done()

    def distinct(self, data_list):
        new_list = []
        for data in data_list:
            hash = data.get("hash")
            res = self.redis.sadd('okLink:filter', hash)
            if res == 1:
                new_list.append(data)
        return new_list

    def start(self):
        self.init_request_params()

        task_list = []
        for i in range(6):
            t = threading.Thread(target=self.gender_request_headers)
            task_list.append(t)

        for i in range(4):
            t = threading.Thread(target=self.request_data)
            task_list.append(t)

        for i in range(6):
            t = threading.Thread(target=self.parse_data)
            task_list.append(t)

        for i in range(4):
            t = threading.Thread(target=self.save_data)
            task_list.append(t)

        for task in task_list:
            task.setDaemon(True)
            task.start()

        for queue in [self.request_params_queue, self.response_queue, self.data_queue,
                      self.request_params_header_queue]:
            queue.join()


if __name__ == '__main__':
    okLink = OKLINK()
    okLink.start()
