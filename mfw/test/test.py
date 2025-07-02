import base64
import requests
with open('img/1.png', 'rb') as f:
    slide_image = base64.b64encode(f.read()).decode()  # 图片二进制流base64字符串
with open('img/2.png', 'rb') as f:
    background_image = base64.b64encode(f.read()).decode()  # 图片二进制流base64字符串


# proxies = {
#     "http": "http://127.0.0.1:8888",
#     "https": "http://127.0.0.1:8888"
# }
def verify():
    url = "http://api.jfbym.com/api/YmServer/customApi"
    data = {
        "token": "bvpnCWtXYendX-T-g3zHgFKHAYZWoi4U21iaWjkpNe0",
        "type": "20111",
        "slide_image": slide_image,
        "background_image": background_image
    }
    _headers = {
        "Content-Type": "application/x-www-form-urlencoded"
    }
    # response = requests.request("POST", url, headers=_headers, data=data,proxies=proxies).json()
    response = requests.request("POST", url, headers=_headers, data=data).json()

    print(response)


if __name__ == '__main__':
    verify()

