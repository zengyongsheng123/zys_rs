import requests

params = {
    'group': 'rpc-test',
    'action': 'get_time',
    'data': '1232345'
}

res = requests.post('http://127.0.0.1:5620/business-demo/invoke', data=params)
print(res.text)

