import requests

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Referer': 'https://www.vivaaerobus.com/en-us/',
    'Sec-Fetch-Dest': 'script',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}
requests = requests.session()
response = requests.get('https://www.vivaaerobus.com/en-us/', headers=headers)
# print(response.text)
# print(response.cookies.get_dict())
url = 'https://www.vivaaerobus.com/BsKNcXMUMaFQroFtJA/Ea7Lzc7kt9X8k7/PW0JTHkTAQ/CF96UHN/AbHQ'
res = requests.get(url, headers=headers)
print(res.text)
