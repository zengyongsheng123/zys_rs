import requests
import json
import execjs
import ddddocr
import base64
import pymongo

HEADER = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://www.ynjzjgcx.com",
    "Pragma": "no-cache",
    "Referer": "https://www.ynjzjgcx.com/dataPub/enterprise",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "appId": "84ded2cd478642b2",
    "isToken": "false",
    "sec-ch-ua": "\"Chromium\";v=\"130\", \"Google Chrome\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\""
}


class CaptchaHandler:
    def __init__(self, js_encryptor):
        self.js_encryptor = js_encryptor
        self.headers = HEADER
        self.url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/vcode/genVcode"

    @staticmethod
    def save_image(base64_str, filename):
        image_data = base64.b64decode(base64_str)
        with open('./' + filename, 'wb') as f:
            f.write(image_data)

    def get_captcha_data(self):
        data = {"params": self.js_encryptor.call("encrypt", '{"key":"query"}')}
        response = requests.post(self.url, headers=self.headers, data=json.dumps(data, separators=(',', ':')))
        resp_data = json.loads(response.json().get("data"))

        # Save images for slide verification
        self.save_image(resp_data.get("smallImage"), 'smallImage.png')
        self.save_image(resp_data.get("bigImage"), 'bigImage.png')

        # Use ddddocr for slide matching
        det = ddddocr.DdddOcr(det=False, ocr=False)
        with open('./smallImage.png', 'rb') as f:
            target_bytes = f.read()
        with open('./bigImage.png', 'rb') as f:
            background_bytes = f.read()

        res = det.slide_match(target_bytes, background_bytes, simple_target=True)
        slide_width = res.get("target")[0]
        slide_id = resp_data.get("slideId")
        print("识别验证码参数", slide_id, slide_width)
        return slide_id, slide_width


class DataFetcher:
    def __init__(self, js_encryptor):
        self.js_encryptor = js_encryptor
        self.url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/dataServ/findBaseEntDpPage"
        self.headers = HEADER

    def fetch_data(self, page_num, slide_id, width):
        params = {
            "pageNum": page_num,
            "pageSize": 10,
            "certificateType": "01",
            "name": "",
            "slideId": slide_id,
            "key": "query",
            "width": width
        }
        data = {"params": self.js_encryptor.call("encrypt", json.dumps(params, separators=(',', ':')))}
        response = requests.post(self.url, headers=self.headers, data=json.dumps(data, separators=(',', ':')))
        return self.parse_data(response.json())

    def parse_data(self, response):
        if response.get("code") != 200:
            return []
        response_data = response.get("data").get("records")
        data_list = []
        for item in response_data:
            data_list.append({
                "name": item.get("name"),
                "creditCode": item.get("creditCode"),
                "address": item.get("address")
            })
        return data_list


class PageQuery:
    def __init__(self, js_file_path):
        with open(js_file_path, 'r') as f:
            js_code = f.read()
            self.js_encryptor = execjs.compile(js_code)
        self.captcha_handler = CaptchaHandler(self.js_encryptor)
        self.data_fetcher = DataFetcher(self.js_encryptor)
        self.client = pymongo.MongoClient()
        self.db = self.client.get_database("yunNan")
        self.collection = self.db.get_collection("yunNan")

    def deduplicate(self, data_list):
        # 用于存储唯一名称的哈希集合
        hash_set = set()
        # 用于存储去重后的数据
        unique_data = []

        for item in data_list:
            name = item["name"]
            # 对名称进行哈希处理
            name_hash = hash(name)
            # 检查哈希值是否已经存在于集合中
            if name_hash not in hash_set:
                hash_set.add(name_hash)  # 添加哈希值到集合
                unique_data.append(item)  # 添加该项目到去重后的数据列表

        return unique_data

    def save_data(self, data_list):
        self.collection.insert_many(data_list)
        print("数据保存成功")

    def start(self, num_pages):
        data_list = []
        for page_num in range(1, num_pages + 1):
            response_data = []
            while len(response_data) == 0:
                print(f"正在查询第 {page_num} 页的数据...")
                slide_id, width = self.captcha_handler.get_captcha_data()
                response_data = self.data_fetcher.fetch_data(page_num, int(slide_id), width)
                # 把response_data数据，追加到data_list中
                print(response_data)
            data_list.extend(response_data)

        # 数据按照标题使用 hash去重
        save_list = self.deduplicate(data_list)
        # 保存或处理返回的数据
        self.save_data(save_list)


# 使用示例
if __name__ == "__main__":
    query = PageQuery("./云南.js")
    query.start(10)  # 查询 3 页数据
