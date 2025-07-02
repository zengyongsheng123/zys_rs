from mafengwo import SliderCaptchaSolver, TencentCaptchaVerifier, safe_rename

import requests


headers1 = {
    "accept": "*/*",
    "accept-language": "zh",
    "cache-control": "no-cache",
    "content-type": "text/plain;charset=UTF-8",
    "origin": "https://www.mafengwo.cn",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.mafengwo.cn/sales/8539850.html",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}
cookies = {
    "x-waf-captcha-referer": "https%3A%2F%2Fwww.mafengwo.cn%2Fsales%2F8539850.html",
    "w_tsfp": "ltv2UU8E3ewC6mwF46vukE6pEzAlcjgklw9sXqNmeJ94Q7ErU5mB1IF/tsnwMHXd5cxnt9jMsoszd3qAUdIgehQcR8uRc4sWkB/Gy99yicxUQ0k5VYnWS1BKcO8k7DYSLm9fcELvi2d4LNIVnuFhiF4FtyV1zvwlXvFqL5kXjB0ZufzCkpxuDW3HlFWQRzaZciVfKr/c9OtwraxQ9z/c5Vv7LFt0A6hewgfHg31dWzox6wPjMK0ddgmuUtutLvgy23S0hSeqO8b5h0Fkvk5k7gs/dJalhWCJOnQyKA5obFC3gqB8P/P3JPo3/HNATqZdER1R6UwMtpMs+zJaD176JzKRWKss4F5XAa1HrJO5e12Gh8a5Yx1bntUrllI/vpIbt3wvO3vrP40CHTKQJjZSa4cSOJmzPXxjVEdQX2FEshITaCteX7gqbdKc6h++fkdWgLchKQ=="
}
url1 = "https://www.mafengwo.cn/WafCaptcha"
data = '0\\nt042DYD9nVDol5BxeKe-sCO6G_c5lyyGWVmCOCZ3agvqRcD6jbLOmD_nv9eqZjs4-Vy5gE1d24ke83wUnOvubrqpf_AZYzcZcKE_hbdSJGZ8sB2zaqsx9DI5ma54fhi5OsBdfMxUPyKzfS-2N5lnVNDJD_cgML4dcvAF1gLbO2-DwTVJJFodVbu7gslHcY5tWm27JBAehNL-b4VLBKS2pOpkCbgEhq0NJjTi6bI7FMzZmz_Bvq4h_7tavB6BaWpADo_CAyDRY7KTuMH9huo5yNUcgGDhTNsLuufnPUh_S_M576tF0uwxsI1AlDaFX5269Lqw-yU9d-Xr6bA8VcYyGgi0F7OHOrVElGrN5QVbJwljfrv5E5b_HlrJskJuMYFb9e2\\n@wF0\\n4a3bc75a081c56f758a696cb729a4dc241ce54fd1002078e647e02a0e11cb3d261d5d393894f107084ca58dc9e2cf3f578b6cbc7d9363fe79ef62ede38d9933f3db06e4474d8375415dcecf96931034f'.encode('unicode_escape')
response = requests.post(url1, headers=headers1, cookies=cookies, data=data)

print(response.text)

headers2 = {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "zh",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=0, i",
    "referer": "https://www.mafengwo.cn/sales/8539850.html",
    "sec-ch-ua": "\"Google Chrome\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36"
}
cookies = {
    "x-waf-captcha-referer": "https%3A%2F%2Fwww.mafengwo.cn%2Fsales%2F8539850.html",
    "w_tsfp": "ltv2UU8E3ewC6mwF46vukE6pEzAlcjgklw9sXqNmeJ94Q7ErU5mB1IF/tsnwMHXd5cxnt9jMsoszd3qAUdIgehQcR8uRc4sWkB/Gy99yicxUQ0k5VYnWS1BKcO8k7DYSLm9fcELvi2d4LNIVnuFhiF4FtyV1zvwlXvFqL5kXjB0ZufzCkpxuDW3HlFWQRzaZciVfKr/c9OtwraxQ9z/c5Vv7LFt0A6hewgfHg31dWzox6wPjMK0ddgmuUtutLvgy23S0hSeqO8b5h0Fkvk5k7gs/dJalhWCJOnQyKA5obFC3gqB8P/P3JPo3/HNATqZdER1R6UwMtpMs+zJaD176JzKRWKss4F5XAa1HrJO5e12Gh8a5Yx1bntUrllI/vpIbt3wvO3vrP40CHTKQJjZSa4cSOJmzPXxjVEdQX2FEshITaCteX7gqbdKc6h++fkdWgLchKQ=="
}
url2 = "https://www.mafengwo.cn/sales/8539850.html"
response = requests.get(url2, headers=headers2, cookies=cookies)

print(response.text)