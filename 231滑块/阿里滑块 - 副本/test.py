import re
import time
from loguru import logger
import requests
import json
def getUmidToken():
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0', }
    response = requests.get('https://ynuf.aliapp.org/w/wu.json', headers=headers)
    return re.findall("umx\.wu\('(.*?)'\);", response.text)[0]

def verify(url=None):
    global num, s
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0',
    }

    response = requests.get(url, headers=headers, timeout=5)
    res = response.text.replace('\n', '').replace('\r', '').replace('\t', '').replace(' ', '')
    script = re.findall('<script>window._config_=(.*?);</script>', res)[0]
    config = json.loads(script)
    json_data = {
        'url': url,
        'config': config,
        'umidToken': getUmidToken(),
    }
    t1 = time.time()
    response = requests.post('http://127.0.0.1:8888/', json=json_data, headers=headers)
    # logger.info(f'响应耗时 => {float(time.time() - t1)} s')
    # logger.info(f"服务器接口响应 => {response.json()}")
    action = config['action']
    logger.info(f"滑块类型: {action}")
    x5secdata = config['SECDATA']
    headers['bx_et'] = response.json()['data']['bx_et']
    headers['bx-pp'] = response.json()['data']['bx-pp']
    headers['referer'] = response.json()['data']['referer']
    url = response.json()['data']['url']
    time.sleep(0.5)
    response = requests.get(url, headers=headers)
    x5sec = response.cookies.get("x5sec")
    logger.info(f'滑块响应 => {response.json()}')
    # if x5sec: logger.info(f'x5sec => {x5sec}')
    s += 1
    if x5sec:
        num += 1
    logger.info(f'目前成功率 {num / s * 100} %, {num}/{s}')
    return response.cookies.get("x5sec")

num = 0
s = 0

headers = {
    'cookie': 'x5sec=7b22733b32223a2232643138333438346662643031396261222c22617365727665723b33223a22307c434b4331756277474549753576366a382f2f2f2f2f77456943574e6863484231656e70735a5367494d4a6a4d734f6f48227d',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
}
url1 = 'https://detail.1688.com/offer/762417744212.html'
url2 = 'https://passport.taobao.com/iv/phone/send_code.do?htoken=pzzAqSFVY7LGZZbypnkZojdzOe71kqyPvRQktm-YZMITPAO8MmUAX2dHGisNBS1p_wCutv489qTO9eoEqpJ1EQ&phone=852-94****32&type=phone&area=852&tag=852&_=1721061526234&bx-ua=228!%2BfVTQlYJRRvelfIs9bpWg%2FGTQz9Nnlj8WtZcmO5cWzMD5IOkg8%2FxRzuO0c2FTxhoxe9kGkInads2XCEM233gEXSii%2FkeXaqJVIgBlIGgvvnnaTkA%2B2D%2FInLGpdAtbnrOvczHPURnbu72BGGsMeEwTPaYOrFi8c%2FIeUUMIIlKqxXNdSv2VXdiU5fcjl1IP%2FARZDqPUzZgAZUzF67IRC%2FZTRIcKl1smAoRJm7WUzVgATYRF67ITv%2FITRImFlmImYRlT2qPjl9AAlYQKx7hRKUZRGSPelGYmA6ly5McRg0EA9klKcmIRK1LEt1KZqMKvVgnXE9cF6W%2Bpa0DukQMKPZ8hZUGFL3nKE2EXEQpi53s6HveBa3pf5Q4tk1yiLqTtBfLXgIci5Qn6HAzXMqcf5ELd98eFM3vfqhJXE9cik1yZUFfaaUkZUZkmDHyog%2FJiCXNui7HP9fqX26T6lWYlygqHj3BxuWycwMP0vjLQ%2Ban3ggwrxIosO5Ys5rxVQ%2FHRSPRt9vyGW%2BJxXHaYBQOQB4HAE9irCoUbrfGW%2FEXHxNytZOhKQVsJPUFzM2Ukmhm%2FxNSSpnAuR5dHbDu%2BERtBH9eFZBPSgZoeaHOfYWpRbIxbnL2jsfQ56ouaTMJnAscuLwybKJ%2FCb3UxkdRrHGcYaU0YJhX4KIrMW%2FzkEqvW8hzb4FoqTWzJsbj9rNUfbFqItnYDWi8OXa3aPBjUlNOl02QugbROdtx69LOUHkpsHWQt%2FU53rryn3z5Rnl2yGeWxfVQv4augLoP%2BAB6Qh95C2d0Bsl9YT%2FR7ehlVL3rICGw2XMX1dXqNGZjWDJCtDLtkMqnjz%2BpCJjG5miTA1mJMmYelYb1FggemPTNkZMtJPMM%2FFiyIgT2HEd6jA8OMgbFkfefUiehN7XWZIWJpaKzm2O5RWjANXElX9eCoQSbf3%2BUB9NQbrxFTwmMh6BBjzoJYjFnFjKna%2BV4m3x3uXnWWtnSNiiEifr5s2WkgFRAcs7IadktJ0RLRPitELENj681l%2FJk6E2Gba0g%2BRPDx0BajwYcpNKAclNwgea%2FnEIl%2BmdZX3Lwpgakj3UhV5lOUu2LRG9EQOE0JQjRUgFhNjAbMhwt7YL2x2TkGgHlvk7UTdzyEmBE%2Byp4BBOJggqFAngdzKabZjeNy9EEDjPrqQDzTQdlFnl9tPeYsWsi6SKnsWwML%2F06yNz%2BF0GAsbY51eUIj0kb4VH%2FWo%2Ff8AKaCZbsM4rC3W93RLTus8ntBpJO5oqRD%2BeczFC2XjMhlzM9lBEf9cD%2BfTpAxjN4p7AfKIfAKGDcchWYtpMAOGloGgXiY0vXget4xvsmdhVpyKpKYGT9Kx3fYUaMgu8Oo1fLqztpUde6Sc59vIA%2F70M5MQa7S4coUW6xcdjc%2B4MO0r7BpaNO1f9oeD%2FAR566MjfrKf4ZQ4%2Fc%2BxrBRjyopcBWgOOB0em7fL5NrPMM0NXRxQVRj%2BJXflnOmRxkhCxNJuzlrcYRouF24UyEZvDN1XPPed6uQpSFhk5G8Efc7jqLq5oyKPmQTJypoON30OT70faNpCKtDDsRh68oTfCwjgf0hUP%2BgVgcErK1LFPEcIS9QgILjcrZsQoxXBQ29ve8tUjI07zrDOvPt4yB6%2BnAfkN8WBOt%2BxDD5vLb34UGJzv4T9nViSsWQ82ZwDuI2%2F9FdvKLKstgVBykqtUJUTgdI2nbUIpTC6L18qOCe5DtIl%3D%3D&bx-umidtoken=T2gAD-I2JNRxcEfncTAslLEf-v0-stHNM-Zpg-hp2apLpGY63taQwXpbW5GbOrP_QMo%3D&_bx-v=2.5.13'

while True:
    try:
        # 滑块url
        # x5sec = verify(url1)
        x5sec = verify(requests.get(url2, headers=headers).json()['data']['url'])
    except Exception as e:
        print(e)
        continue

