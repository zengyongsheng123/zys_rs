import scrapy
from scrapy import cmdline


class BaiduSpider(scrapy.Spider):
    name = 'baidu'
    allowed_domains = ['www.baidu.com']
    start_urls = ['http://www.baidu.com/']

    def parse(self, response):
        pass


if __name__ == '__main__':
    cmdline.execute('scrapy crawl baidu'.split())

"""
创建scrapy项目分为两步:
    1. scrapy startproject <项目名称>
    2. cd <项目名称>
    3. scrapy genspdier <爬虫文件名> <站点路由>
    
    
运行scrapy项目: 必须通过scrapy指令运行
    scrapy crawl <爬虫名称>
    
    
通过指令运行之后查看框架的执行日志发现执行有警告信息与报错信息:
    pip install urllib3==1.26.18
    pip install Twisted==22.10.0
    pip install parsel==1.7.0
    
    
配置scrapy在pycharm中执行
    cmdline.execute('scrapy crawl <爬虫名称>'.split())
"""