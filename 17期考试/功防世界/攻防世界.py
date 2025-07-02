import threading
from queue import Queue

import pymysql
import requests


class GFSJ:
    def __init__(self):
        self.url = 'https://adworld.xctf.org.cn/api/event/release_event/list/'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        }

        self.request_queue = Queue()
        self.data_queue = Queue()
        self.request_params_queue = Queue()
        self.db = pymysql.connect(host='localhost', port=3306, user='root', password='zys123', db='python',
                                  charset='utf8')
        self.cursor = self.db.cursor()
        self.create_table()

    def create_table(self):
        sql = """
        create table if not exists gfsj(
        release_name varchar(255),
        competition_start_time varchar(255),
        competition_end_time varchar(255),
        release_sponsor varchar(255)
        )
        """
        try:
            self.cursor.execute(sql)
            self.db.commit()
            print('创建表成功')
        except Exception as e:
            print("创建表失败", e)
            self.db.rollback()

    def get_request_params(self, page_num):
        for i in range(1, page_num + 1):
            params = {
                'page': i,
                'page_size': '7'
            }
            print('正在构建第%s页请求参数' % i)
            self.request_params_queue.put(params)

    def get_data(self):
        while True:
            params = self.request_params_queue.get()
            resp = requests.get(self.url, headers=self.headers, params=params)
            self.request_queue.put(resp.json())
            self.request_params_queue.task_done()

    def parse_data(self):
        while True:
            print('开始解析数据')

            respData = self.request_queue.get()
            data_list = []
            for item in respData['data']['rows']:
                print(item)
                data_item = {
                    'release_name': item['release_name'],
                    'competition_start_time': item['competition_start_time'],
                    'competition_end_time': item['competition_end_time'],
                    'release_sponsor': item['release_sponsor']
                }
                data_list.append(data_item)
            self.data_queue.put(data_list)
            self.request_queue.task_done()

    def save_data(self):
        while True:
            dataList = self.data_queue.get()
            insertParams = []
            for item in dataList:
                insertParams.append((item['release_name'], item['competition_start_time'], item['competition_end_time'],
                                     item['release_sponsor']))
            try:
                self.cursor.executemany(
                    "insert into gfsj(release_name,competition_start_time,competition_end_time,release_sponsor) values(%s,%s,%s,%s)",
                    insertParams)
                self.db.commit()
                print('插入数据成功')
                self.data_queue.task_done()
            except Exception as e:
                print("插入数据失败", e)
                self.db.rollback()

    def start(self):
        task_list = []
        t = threading.Thread(target=self.get_request_params, args=[10])
        t.start()

        for i in range(1, 4):
            get_data_task = threading.Thread(target=self.get_data)
            task_list.append(get_data_task)

        for i in range(1, 4):
            parse_data_task = threading.Thread(target=self.parse_data)
            task_list.append(parse_data_task)

        save_data_task = threading.Thread(target=self.save_data)
        task_list.append(save_data_task)

        for task in task_list:
            task.setDaemon(True)
            task.start()

        for queue in [self.request_params_queue, self.request_queue, self.data_queue]:
            queue.join()


if __name__ == '__main__':
    gfsj = GFSJ()
    gfsj.start()
