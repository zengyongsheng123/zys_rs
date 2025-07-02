import requests

url = 'http://x30.top/5/'

r = requests.get(url)
r.encoding = 'utf-8'
print(r.text)