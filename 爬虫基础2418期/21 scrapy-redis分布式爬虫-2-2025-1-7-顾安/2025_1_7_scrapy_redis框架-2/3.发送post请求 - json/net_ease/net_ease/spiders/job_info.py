import json
from scrapy_redis.spiders import RedisSpider
from scrapy.http import HtmlResponse, JsonRequest


class JobInfoSpider(RedisSpider):
    name = 'job_info'
    redis_key = 'job_info:start_payload'

    def make_request_from_data(self, data):
        api_url = 'https://hr.163.com/api/hr163/position/queryPage'
        data = json.loads(data)
        json_data = data.get('json_data')
        # print('载荷信息:', json_data)

        # make_request_from_data不能用yield
        return JsonRequest(api_url, data=json_data, callback=self.parse)


    def parse(self, response: HtmlResponse, **kwargs):
        print('响应数据:', response.json())


"""
无论是载荷信息请求还是表单信息请求
    我们在redis中传递的都是请求参数本身而不是url链接
"""