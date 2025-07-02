import requests
import execjs
import json

# from curl_cffi


n = '{"query":"python","pageNum":4,"limit":15}'
js = execjs.compile(open('05-看准.js', encoding='utf-8').read())
da = js.call('get_params', n)
print(da)
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
}
url = "https://www.kanzhun.com/api_to/search/interview.json"
params = {
    "b": da['b'],
    "kiv": da['iv']
}
response = requests.get(url, headers=headers, params=params)
data = js.call('c', response.text, params['kiv'])
print(data)
