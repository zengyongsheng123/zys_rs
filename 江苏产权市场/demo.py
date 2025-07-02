import execjs
import requests
from lxml import etree


class JSsc:
    def __init__(self):
        self.requests = requests.Session()
        self.js = execjs.compile(open('1.js', encoding='utf-8').read())
        self.headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language": "zh",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        self.url = "https://www.jscq.com.cn/jscq/cqjy/jygg/cqzr/index.shtml"

    def get_first_request(self):
        response = self.requests.get(self.url, headers=self.headers)
        return response.cookies

    def save_jsfile(self):
        response = self.requests.get(self.url, headers=self.headers)
        html = etree.HTML(response.text)

        # 提取第一个 <script> 标签的文本内容
        script1 = html.xpath('//script[1]/text()')[0]
        with open('./1_ts.js', 'w', encoding='utf-8') as f:
            f.write(script1)

        # 提取 <script> 标签的 src 属性值
        script2_src = html.xpath('//script[@type="text/javascript" and @charset="utf-8"]/@src')[0]
        script2_url = 'https://www.jscq.com.cn' + script2_src
        script2_content = self.requests.get(script2_url).text
        with open('./1_func.js', 'w', encoding='utf-8') as f:
            f.write(script2_content)

        return script1, script2_content

    def get_second_request(self):
        self.save_jsfile()
        cookie_value = self.js.call('get_cookie')
        cookie_name = cookie_value.split('=')[0]
        cookie_value = cookie_value.split('=')[1]
        cookies = {cookie_name: cookie_value}

        response = self.requests.get(self.url, headers=self.headers, cookies=cookies)
        print(response.text)
        return response.cookies

    def get_third_request(self):
        cookies = self.get_second_request()
        headers = {
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Language": "zh,zh-CN;q=0.9",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Pragma": "no-cache",
            "Referer": "https://www.jscq.com.cn/jscq/cqjy/jygg/cqzr/index.shtml",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest",
            "request-by": "ajax-request-tag",
            "sec-ch-ua": "\"Not(A:Brand\";v=\"99\", \"Google Chrome\";v=\"133\", \"Chromium\";v=\"133\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        }
        url = "https://www.jscq.com.cn/eportal/ui"
        params = {
            "eTNYgNI9": ''
        }
        response = self.requests.get(url, headers=headers, params=params, cookies=cookies)
        print(response.text)
        print(response)


if __name__ == '__main__':
    aa = JSsc()
    aa.get_third_request()