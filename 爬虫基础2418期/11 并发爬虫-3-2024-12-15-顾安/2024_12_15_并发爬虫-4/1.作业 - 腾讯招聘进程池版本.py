# -*- coding: utf-8 -*-
# @Time    : 2024/12/15 20:03
# @Author  : 顾安
# @File    : 1.作业 - 腾讯招聘进程池版本.py


import pymongo
import requests
import jsonpath
from multiprocessing import Manager
from concurrent.futures import ProcessPoolExecutor, wait

url = "https://careers.tencent.com/tencentcareer/api/post/Query"

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://careers.tencent.com/search.html",
    "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
}

cookies = {
    "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%22187ead606fc1e90-0fade5bb97c621-1d525634-2104200-187ead606fd1dd6%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E8%87%AA%E7%84%B6%E6%90%9C%E7%B4%A2%E6%B5%81%E9%87%8F%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTg3ZWFkNjA2ZmMxZTkwLTBmYWRlNWJiOTdjNjIxLTFkNTI1NjM0LTIxMDQyMDAtMTg3ZWFkNjA2ZmQxZGQ2In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%2C%22%24device_id%22%3A%22187ead606fc1e90-0fade5bb97c621-1d525634-2104200-187ead606fd1dd6%22%7D",
    "_ga": "GA1.2.1754171620.1683272108",
    "_gcl_au": "1.1.898737491.1728884649",
}

mongo_client = pymongo.MongoClient()
collection = mongo_client['py_spider']['process_pool_tx_work']


def get_work_info(page_num, q):
    params = {
        "timestamp": "1734073301349",
        "countryId": "",
        "cityId": "",
        "bgIds": "",
        "productId": "",
        "categoryId": "",
        "parentCategoryId": "",
        "attrId": "",
        "keyword": "",
        "pageIndex": page_num,
        "pageSize": "10",
        "language": "zh-cn",
        "area": "cn",
    }

    response = requests.get(url, headers=headers, params=params, cookies=cookies).json()

    try:
        for info in response["Data"]["Posts"]:
            work_info_dict = dict()
            work_info_dict["recruit_post_name"] = jsonpath.jsonpath(info, "$..RecruitPostName")[0]
            work_info_dict["country_name"] = jsonpath.jsonpath(info, "$..CountryName")[0]
            work_info_dict["location_name"] = jsonpath.jsonpath(info, "$..LocationName")[0]
            work_info_dict["category_name"] = jsonpath.jsonpath(info, "$..CategoryName")[0]
            work_info_dict["responsibility"] = jsonpath.jsonpath(info, "$..Responsibility")[0]
            work_info_dict["last_update_time"] = jsonpath.jsonpath(info, "$..LastUpdateTime")[0]
            q.put(work_info_dict)
    except Exception as e:
        print('解析异常:', e)


def save_work_info(q):
    while True:
        dict_info = q.get()
        if dict_info is None:
            break
        collection.insert_one(dict_info)
        print('数据插入成功:', dict_info)


if __name__ == '__main__':
    with Manager() as manager:
        queue = manager.Queue()
        with ProcessPoolExecutor() as pool:
            futures = [pool.submit(get_work_info, page, queue) for page in range(1, 6)]
            pool.submit(save_work_info, queue)

            wait(futures)  # 阻塞主进程直到生产者任务全部结束时上传哨兵值
            queue.put(None)

    print('爬虫任务结束...')

