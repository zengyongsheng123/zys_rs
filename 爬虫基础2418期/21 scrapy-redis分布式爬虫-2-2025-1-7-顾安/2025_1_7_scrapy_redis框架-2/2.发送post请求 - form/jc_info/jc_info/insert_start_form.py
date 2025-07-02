# -*- coding: utf-8 -*-
# @Time    : 2025/1/7 20:51
# @Author  : 顾安
# @File    : insert_start_form.py


import json
import redis


def push_start_form(redis_client, form_data):
    redis_client.lpush('jc_json_info:start_forms', form_data)


if __name__ == '__main__':
    with redis.Redis() as redis_client:
        for page in range(1, 18):
            form_data = {
                "column": "szse_latest",
                "pageNum": str(page),
                "pageSize": "30",
                "sortName": "",
                "sortType": "",
                "clusterFlag": "true"
            }

            form_data_dict = {
                'form_data': form_data
            }

            # redis无法直接保存python的字典对象, 需要将对象转为字节
            push_start_form(redis_client, json.dumps(form_data_dict))
