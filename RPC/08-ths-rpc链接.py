
import requests


params = {
    'group':'ths',
    'action': 'get_cookie'
}
res = requests.get('http://127.0.0.1:5620/business-demo/invoke', params=params)
print(res.json()['data'])






