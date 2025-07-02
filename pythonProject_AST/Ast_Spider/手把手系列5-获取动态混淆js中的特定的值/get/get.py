import requests

decodeUrl = "http://127.0.0.1:3000"

params = {
    "a": 1,
    "b": 2,
}

res = requests.get(decodeUrl,params = params)

print(res.text)
