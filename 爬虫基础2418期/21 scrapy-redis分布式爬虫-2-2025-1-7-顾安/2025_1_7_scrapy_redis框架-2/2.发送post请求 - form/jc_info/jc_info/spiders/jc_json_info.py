import json
from scrapy_redis.spiders import RedisSpider
from scrapy.http import FormRequest, HtmlResponse


class JcJsonInfoSpider(RedisSpider):
    name = 'jc_json_info'
    redis_key = 'jc_json_info:start_forms'

    def make_request_from_data(self, data):
        """
        :param data: redis存储的数据给data形式参数, 接收的参数可以是(form表单、json载荷信息、 url请求地址)
        :return:
        """

        api_url = 'http://www.cninfo.com.cn/new/disclosure'
        dict_data = json.loads(data)
        print('请求参数data中的数据为:', dict_data)
        form_data = dict_data.get('form_data')
        return FormRequest(api_url, formdata=form_data, callback=self.parse)

    def parse(self, response: HtmlResponse, **kwargs):
        print('响应信息:', response.json())


"""
1.需要自己去构建请求对象, 构建请求对象的方法是make_request_from_data而不是start_requests
2.在redis中保存的不再是url信息了, 而是api需要携带的参数信息
"""