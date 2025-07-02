import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class BaiduSpider(scrapy.Spider):
    name = 'baidu'  # 爬虫名称
    # allowed_domains = ['www.baidu.com']  # 允许访问的域名
    start_urls = ['http://www.baidu.com/']  # 爬虫入口

    # 因为parse函数是重写了Spider类中的parse函数, 需要补齐参数（**kwargs）
    def parse(self, response: HtmlResponse, **kwargs):
        # 解析函数中存在response形参, 接收的是响应对象, 可以直接使用响应对象打印页面源代码
        print('响应对象信息:', response)
        print('页面文本数据:', response.text)
        print('响应对象状态码:', response.status)
        print('响应对象二进制数据:', response.body)  # 如果数据是图片等二进制文件则使用此方式

        print('请求对象的url:', response.request.url)
        print('响应对象的url:', response.url)
        print('请求对象的方法:', response.request.method)
        print('请求头信息:', response.request.headers)
        print('响应头信息:', response.headers)



if __name__ == '__main__':
    cmdline.execute('scrapy crawl baidu'.split())


"""
scrapy默认遵守君子协议
在settings文件的第十九行中将ROBOTSTXT_OBEY = True 修改成 ROBOTSTXT_OBEY = False
"""
