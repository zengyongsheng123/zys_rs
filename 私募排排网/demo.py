import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://dc.simuwang.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://dc.simuwang.com/",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    "x-requested-with": "60c6f9f5951ef9a8d4770429c45d1f0e"
}
cookies = {
    "_ga": "GA1.1.793243626.1756303035",
    "http_tK_cache": "fea483d0cc1557b83f6b9ac06d6a812e37cf8471",
    "_c_WBKFRo": "8u3xAVsBM85hLfBRNIArnwvLQ03E7A80hHfcMByN",
    "_nb_ioWEgULi": "",
    "certification": "0",
    "qualified_investor": "0",
    "evaluation_result": "-1",
    "focus-certification-pop": "1",
    "Hm_lvt_c3f6328a1a952e922e996c667234cdae": "1756303346",
    "Hm_lpvt_c3f6328a1a952e922e996c667234cdae": "1756303346",
    "HMACCOUNT": "7B7F0E49752E6261",
    "collect": "%7B%22count%22%3A1%2C%22time%22%3A1756303355875%7D",
    "_ga_ZCWR11HG01": "GS2.1.s1756303346$o1$g1$t1756303371$j35$l0$h0",
    "_ga_7SBBX4Y5RE": "GS2.1.s1756303034$o1$g1$t1756303394$j60$l0$h0"
}
url = "https://sppwapi.simuwang.com/sun/ranking/fundRankV3"
params = {
    "page": "2",
    "size": "50",
    "condition": "{\"fund_type\":\"6\"}",
    "sort_name": "ret_6m",
    "sort_asc": "desc",
    "tab_type": "1",
    "USER_ID": "3550870"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)