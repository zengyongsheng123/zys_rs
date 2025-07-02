import requests
from lxml import etree
from loguru import logger
import execjs

request = requests.session()

url = 'https://sugh.szu.edu.cn/Html/News/Columns/7/3.html'

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
}

logger.info('开始第一次请求————————————————')
response1 = request.get(url, headers=headers)
logger.info(f"获取的响应值————————————>>>>{response1.status_code}")
# print(response1.text)
tree = etree.HTML(response1.text)
content_1 = tree.xpath('//meta[2]/@content')[0]
func_1 = tree.xpath('//script[2]/text()')[0]

with open('test-深圳.js', encoding='utf-8') as f:
    js_code = f.read().replace('"xxx_1"', func_1).replace('content_1', content_1)

cookies = dict()
cookies.update({'ihkYnttrQXfVP': execjs.compile(js_code).call('get_cookie').split(';')[0].split('=')[-1]})
logger.info('提取到的cookies是————————>>>>  {}'.format(cookies))

logger.info('开始第二次请求————————————')
response2 = request.get(url, headers=headers, cookies=cookies)
logger.info('获取的响应值————————————>>>> {}'.format(response2.status_code))
logger.info('最后获取的数据————————————>>>> {}'.format(response2.content.decode('utf-8')))
