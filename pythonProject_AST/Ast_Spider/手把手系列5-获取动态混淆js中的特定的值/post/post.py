import requests

decodeUrl = "http://127.0.0.1:3000"

data = {
    "a": 1,
    "b": 2,
}

res = requests.post(decodeUrl,data = data)

print(res.text)