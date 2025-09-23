import requests
import execjs
import csv


class Simu_spider():
    def __init__(self):
        self.headers = {
            "accept": "*/*",
            "accept-language": "zh-CN,zh;q=0.9",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://dc.simuwang.com",
            "priority": "u=1, i",
            "referer": "https://dc.simuwang.com/",
            "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
            "x-requested-with": "bd5df80ec7029e1ca3344cdace5dd389"
        }
        self.cookies = {
            "_ga": "GA1.1.1462806862.1756016243",
            "http_tK_cache": "2054deafee7a21e4858f17a43f61ef8f4955b442",
            "_c_WBKFRo": "OAkwoDjYrCdRjSkwHLYiI5ukL7T5jy60RQHtuBVi",
            "_nb_ioWEgULi": "",
            "Hm_lvt_c3f6328a1a952e922e996c667234cdae": "1756016431",
            "HMACCOUNT": "C2558C2C89EF3C26",
            "Hm_lpvt_c3f6328a1a952e922e996c667234cdae": "1756017970",
            "_ga_ZCWR11HG01": "GS2.1.s1756016430$o1$g1$t1756017970$j60$l0$h0",
            "_ga_7SBBX4Y5RE": "GS2.1.s1756016243$o1$g1$t1756018045$j60$l0$h0"
        }
        self.url = "https://sppwapi.simuwang.com/sun/ranking/fundRankV3"
        with open('私募.js', 'r', encoding='utf-8') as f:
            js_code = f.read()
        self.js = execjs.compile(js_code)

    def get_data(self, page):
        # 发送请求，获取数据
        params = {
            "page": page,
            "size": "50",
            "condition": "{\"fund_type\":\"6\"}",
            "sort_name": "ret_6m",
            "sort_asc": "desc",
            "tab_type": "1",
            "USER_ID": "3545145"
        }
        response = requests.get(self.url, headers=self.headers, cookies=self.cookies, params=params)
        data = response.json()['data']
        return data

    def de_data(self, data):
        # 数据解密
        dec_data = self.js.call("de_data", data)
        return dec_data

    def parse_data(self, data, f):
        # 数据解析
        for i in data['list']:
            simu_list = []
            simu_list.append(i['fund_short_name'])
            simu_list.append(i['company_short_name'])
            simu_list.append(i['province'])
            print(simu_list)
            self.save_data(simu_list, f)

    def save_data(self, data, f):
        # 数据保存
        f.writerow(data)

    def main(self):
        # 主函数
        with open('私募.csv', 'w', encoding='utf-8', newline='') as f:
            headers = ['基金简称', '基金公司', '省份']
            # 创建一个csv的writer对象，这样才能够将写入csv格式数据到这个文件
            f_csv = csv.writer(f)
            # 写入一行（我们用第一行当做表头）
            f_csv.writerow(headers)
            # 写入多行（当做数据）
            for page in range(1, 11):
                data = self.get_data(page)
                dec_data = self.de_data(data)
                self.parse_data(dec_data, f_csv)


if __name__ == '__main__':
    simu = Simu_spider()
    simu.main()
