import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse, JsonRequest


class WorkInfoSpider(scrapy.Spider):
    name = 'work_info'

    def start_requests(self):
        api_url = 'https://hr.163.com/api/hr163/position/queryPage'
        for page in range(1, 230):
            data = {
                "currentPage": page,
                "pageSize": 10
            }
            yield JsonRequest(api_url, data=data)

    def parse(self, response: HtmlResponse, **kwargs):
        print('返回的数据为:', response.json())


if __name__ == '__main__':
    cmdline.execute('scrapy crawl work_info'.split())



"""
1.多管道使用
    想要将第一个管道中的数据传递给第二个管道需要在第一个管道中return
    在管道类中存在3个方法: open_spider close_spider process_item
    如果需要在管道中抛弃数据则可以使用DropItem
    
2.数据去重
    使用scrapy中的dont_filter完成
    通过保存请求url到redis完成去重
    通过保存数据本身到redis完成去重
    
3.使用scrapy发送post请求
    表单: FormRequest
    载荷: JsonRequest
"""