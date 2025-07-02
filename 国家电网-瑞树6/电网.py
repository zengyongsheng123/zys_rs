
import requests
import execjs
from lxml import etree

session = requests.Session()
session.headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # 'Cookie': 'Rq9ZlcGkVvC3S=60hXLebtiDMSfiqmFzb840qpXN9eDqsBZsr4frD2l43PgxRNscsYaDQbctJUhr8uYhXSNk1YiWrDNPxm0j75oYMG; Rq9ZlcGkVvC3T=0XQ.XxnoVLKf5eoIJVvM5D2oV6lUIaCFyQjGc3wK5Js9Pz3Z4Qt5efb2tX4qmskZF7bKPY53YsiZbnu0pPYYRCzcG8YSOtBiWaT8xsCXuBZaZLrHdy2a5qvxay91SizfnWjGR_kV4kzXIFtEFYnWb1_Qjqyq_dlEQu0HCQdVuX5TCQOVkcSnQL4hTGbtRUlMINdbs9axWj0loazo3SRi5cOYlnsE_q72D3tT_fdXB1QG',
    'Pragma': 'no-cache',
    'Referer': 'http://www.sgcc.com.cn/',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
}
url = 'http://www.sgcc.com.cn/'
res1 = session.get(url)
session.cookies = res1.cookies
print(res1.text)
tree = etree.HTML(res1.text)
metaContent = tree.xpath('//meta/@content')[-1]
print(metaContent)
_ts = tree.xpath("//script/text()")[0]
# print(_ts)
jsScc = 'http://www.sgcc.com.cn' + tree.xpath("//script[2]/@src")[0]
# print(jsScc)
waiLian = session.get(jsScc).text
with open('./demo.js', 'r', encoding='utf-8') as f:
    jsCode = f.read()
# print(waiLian)
js = execjs.compile(
    jsCode.replace('content1', metaContent).replace('"$_tsCode"', _ts).replace('"waiLianWenJian"', waiLian)
)
# print(js.call('getCk'))
Cookies = js.call('getCk').split(';')[0]
print(Cookies)
cookieName = Cookies.split('=')[0]
cookieValue = Cookies.split('=')[1]
session.cookies.update({cookieName: cookieValue})
print(session.cookies)

res2 = session.get(url)
print(res2.text)
print(res2)


