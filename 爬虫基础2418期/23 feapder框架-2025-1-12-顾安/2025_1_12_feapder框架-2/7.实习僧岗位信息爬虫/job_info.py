# -*- coding: utf-8 -*-
"""
Created on 2025-01-12 22:08:31
---------
@summary:
---------
@author: poppies
"""
import time
import feapder
from feapder import Request, Response
from feapder.utils.webdriver import WebDriver


class JobInfo(feapder.AirSpider):
    def start_requests(self):
        yield feapder.Request("https://q.yingjiesheng.com/jobs/search/Python?jobarea=220200", render=True)

    def parse(self, request, response):
        browser: WebDriver = response.browser
        json_data = browser.xhr_json('open/noauth/job/search')
        for temp in json_data['resultbody']['searchData']['joblist']['items']:
            item = dict()
            item['jobname'] = temp['jobname']
            item['coname'] = temp['coname']
            item['jobarea'] = temp['jobarea']
            item['issuedate'] = temp['issuedate']
            item['jobtag'] = temp['jobtag']
            item['providesalary'] = temp['providesalary']
            print(item)

    def validate(self, request: Request, response: Response):
        browser: WebDriver = response.browser
        json_data = browser.xhr_json('open/noauth/job/search')
        if json_data is None:
            raise Exception("请求失败...")
        else:
            return request


if __name__ == "__main__":
    JobInfo().start()
