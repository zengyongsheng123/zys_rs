# -*- coding: utf-8 -*-
# @Time    : 2025/1/7 21:19
# @Author  : 顾安
# @File    : push_start_payload.py


import json
import redis


def push_start_payload(redis_client, payload):
    redis_client.lpush('job_info:start_payload', payload)


if __name__ == '__main__':
    with redis.Redis() as db:
        for page in range(1, 229):
            payload_info = {
                "currentPage": page,
                "pageSize": 10
            }

            json_data = {
                'json_data': payload_info
            }
            push_start_payload(db, json.dumps(json_data))