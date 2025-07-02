# -*- coding: utf-8 -*-
# @Time    : 2024/12/1 20:35
# @Author  : 顾安
# @File    : 3.jsonpath的简单使用.py

from jsonpath import jsonpath

info = {
    "error_code": 0,
    "stu_info": [
        {
            "id": 2059,
            "name": "小白",
            "sex": "男",
            "age": 28,
            "addr": "河南省济源市北海大道xx号",
            "grade": "天蝎座",
            "phone": "1837830xxxx",
            "gold": 10896,
            "info": {
                "card": 12345678,
                "bank_name": '中国银行'
            }
        },
        {
            "id": 2067,
            "name": "小黑",
            "sex": "男",
            "age": 28,
            "addr": "河南省济源市北海大道xx号",
            "grade": "天蝎座",
            "phone": "87654321",
            "gold": 100
        }
    ]
}


# res_1 = info['stu_info'][0]['name']
# res_2 = info['stu_info'][1]['name']
# print(res_1, res_2)

# jsonpath返回的数据类型是一个列表
# res_1 = jsonpath(info, '$.stu_info[0].name')
# print(res_1)
#
# res_2 = jsonpath(info, '$.stu_info[1].name')
# print(res_2)


res_list = jsonpath(info, '$..name')
print(res_list)


bank_info = jsonpath(info, '$..bank_name')
print(bank_info)

gold_info = jsonpath(info, '$..gold')[1]
print(gold_info)



