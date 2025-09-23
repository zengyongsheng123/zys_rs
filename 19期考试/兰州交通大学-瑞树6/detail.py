import execjs
import requests
from lxml import etree
from urllib.parse import urljoin
import pymysql


class LZJT:
    def __init__(self):
        self.headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.session = requests.Session()
        self.url = "https://zbzx.lzjtu.edu.cn/zbxx/"

        # MySQL数据库连接信息
        self.db_config = {
            'host': 'localhost',
            'user': 'root',
            'password': 'zys123',
            'database': 'lzjt_data',
            'charset': 'utf8mb4'
        }

    def create_database_and_table(self):
        """创建数据库和表"""
        # try:
        #     # 连接到MySQL服务器
        #     connection = pymysql.connect(
        #         host=self.db_config['host'],
        #         user=self.db_config['user'],
        #         password=self.db_config['password'],
        #         charset=self.db_config['charset']
        #     )
        #
        #     with connection.cursor() as cursor:
        #         # 创建数据库
        #         cursor.execute(
        #             f"CREATE DATABASE IF NOT EXISTS {self.db_config['database']} DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci")
        #
        #         # 切换到新创建的数据库
        #         cursor.execute(f"USE {self.db_config['database']}")
        #
        #         # 创建数据表
        #         create_table_sql = """
        #                            CREATE TABLE IF NOT EXISTS procurement_data \
        #                            ( \
        #                                id \
        #                                INT \
        #                                AUTO_INCREMENT \
        #                                PRIMARY \
        #                                KEY, \
        #                                category \
        #                                ENUM \
        #                            ( \
        #                                'gcl', \
        #                                'hwl', \
        #                                'fwl' \
        #                            ) NOT NULL,
        #                                title VARCHAR \
        #                            ( \
        #                                255 \
        #                            ) NOT NULL,
        #                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        #                                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE =utf8mb4_unicode_ci; \
        #                            """
        #         cursor.execute(create_table_sql)
        #
        #     connection.commit()
        #     print("数据库和表创建成功！")
        #
        # except Exception as e:
        #     print(f"创建数据库和表时出错: {e}")
        # finally:
        #     if connection:
        #         connection.close()

    def get_cookie(self):
        response = self.session.get(self.url + 'gcl.htm', headers=self.headers)
        tree = etree.HTML(response.text)
        script = tree.xpath('//script[@r="m"][1]/text()')[0]
        with open("111.js", "r", encoding='utf-8') as f:
            js_code = f.read().replace('!"ts_flag";', script)
        with open("tmp.js", "w", encoding='utf-8') as f:
            f.write(js_code)
        with open("tmp.js", "r", encoding='utf-8') as f:
            js_code = f.read()
        js = execjs.compile(js_code)
        new_cookie = js.call("gen_cookie")
        self.session.cookies.update({new_cookie['name']: new_cookie['value']})

    def get_html(self, url):
        response = self.session.get(url, headers=self.headers)
        response.encoding = 'utf-8'
        return [response.text, response.url]

    def parse_data(self, html):
        tree = etree.HTML(html[0])
        next_ = tree.xpath('//td[@align="left"]/div/span[@class="NextDisabled"]')
        td = tree.xpath('//td[@align="left"]')
        titles = tree.xpath('//div[@class="listmain"]/ul/li/a/text()')
        for title in titles:
            self.title_list.append(title)
        if len(next_) == 0 and len(td) != 0:
            href = tree.xpath('//td[@align="left"]//a[@class="Next"][1]/@href')
            html = self.get_html(str(urljoin(html[1], href[0])))
            self.parse_data(html)

    def save_to_mysql(self, data):
        """将数据保存到MySQL数据库"""
        global connection
        try:
            # 创建连接
            connection = pymysql.connect(**self.db_config)

            with connection.cursor() as cursor:
                # 准备插入数据的SQL语句
                insert_sql = """
                             INSERT INTO procurement_data (category, title)
                             VALUES (%s, %s) \
                             """

                # 准备批量插入的数据
                records = []
                for category, titles in data.items():
                    for title in titles:
                        # 去除标题中的多余空格和换行符
                        cleaned_title = " ".join(title.split())
                        records.append((category, cleaned_title))

                # 执行批量插入
                cursor.executemany(insert_sql, records)

                # 提交事务
                connection.commit()
                print(f"成功插入 {len(records)} 条数据到数据库！")

        except Exception as e:
            print(f"保存到数据库时出错: {e}")
            if connection:
                connection.rollback()
        finally:
            if connection:
                connection.close()

    def main(self):
        # 创建数据库和表
        # self.create_database_and_table()
        # 获取数据
        self.get_cookie()
        names = ['gcl', 'hwl', 'fwl']
        self.lzjt_dict = {}
        for name in names:
            self.title_list = []
            url = self.url + name
            html = self.get_html(url + '.htm')
            self.parse_data(html)
            self.lzjt_dict[name] = self.title_list
        print(self.lzjt_dict)
        # 保存到MySQL数据库
        # self.save_to_mysql(self.lzjt_dict)


if __name__ == '__main__':
    lzjt = LZJT()
    lzjt.main()

