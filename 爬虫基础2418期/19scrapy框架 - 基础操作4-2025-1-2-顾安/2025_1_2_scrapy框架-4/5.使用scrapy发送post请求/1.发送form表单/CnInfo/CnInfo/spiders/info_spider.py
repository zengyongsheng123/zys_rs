import scrapy
from scrapy import cmdline
from scrapy.http import HtmlResponse


class InfoSpiderSpider(scrapy.Spider):
    name = 'info_spider'

    # allowed_domains = ['www.cninfo.com.cn']
    # start_urls = ['http://www.cninfo.com.cn/']

    def start_requests(self):
        api_url = "http://www.cninfo.com.cn/new/disclosure"
        for page in range(1, 11):
            data = {
                "column": "szse_latest",
                "pageNum": str(page),
                "pageSize": "30",
                "sortName": "",
                "sortType": "",
                "clusterFlag": "true"
            }

            yield scrapy.FormRequest(api_url, formdata=data, dont_filter=False)

    def parse(self, response: HtmlResponse, **kwargs):
        for info_list in response.json()['classifiedAnnouncements']:
            for info in info_list:
                item = dict()
                item['announcementTitle'] = info['announcementTitle']
                item['announcementTypeName'] = info['announcementTypeName']
                item['batchNum'] = info['batchNum']
                item['secName'] = info['secName']
                item['adjunctType'] = info['adjunctType']
                print(item)


if __name__ == '__main__':
    cmdline.execute("scrapy crawl info_spider".split())
