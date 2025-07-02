import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh",
    "account-id;": "",
    "cache-control": "no-cache",
    "from-domain": "51job_web",
    "partner;": "",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "property": "%7B%22partner%22%3A%22%22%2C%22webId%22%3A2%2C%22fromdomain%22%3A%2251job_web%22%2C%22frompageUrl%22%3A%22https%3A%2F%2Fwe.51job.com%2F%22%2C%22pageUrl%22%3A%22https%3A%2F%2Fwe.51job.com%2Fpc%2Fsearch%3Fkeyword%3D%25E7%2588%25AC%25E8%2599%25AB%26searchType%3D2%26sortType%3D0%26metro%3D%22%2C%22identityType%22%3A%22%22%2C%22userType%22%3A%22%22%2C%22isLogin%22%3A%22%E5%90%A6%22%2C%22accountid%22%3A%22%22%7D",
    "referer": "https://we.51job.com/pc/search?keyword=%E7%88%AC%E8%99%AB&searchType=2&sortType=0&metro=",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sign": "c0542ccdcf4e8a631da90e65e933ad17653630a8897c512a7f8594dd5d38611f",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "user-token;": "",
    "uuid": "17482667564696296467"
}
cookies = {
    "acw_tc": "ac11000117482667304581349e009c7d96d9c59338521daad4f1b19b732df3",
    "ssxmod_itna": "QqRxnD0Q0=YxcD0xBPiKGdAk14+OOeax7uYBYrhv5Ds1NTDSxG9eidhYFYaNYNN7gkG54aiB4rem1Q+nivtoO2hqGLDmKDyK0EuAoD44GTDt4DTD34DYDixib8xi5GRD0KDFF5XUZ9Dm4GW9qDg04GgDCiD0+Uc3wiD4qDBIxdDKMiyiDDliBTeQ7m0KOiDY4d4EMbgK0nAFqDMteGXzGFeFkR8XPxZQccA4mpRDB6+xBQMCQUdX0=/UdidQG3qIiv3AYAtKAwYtihrUFM5ePpYl2+PihGtn9hanEqjxD31IHD==",
    "ssxmod_itna2": "QqRxnD0Q0=YxcD0xBPiKGdAk14+OOeax7uYBYrh5ikLYDl64QKQ08D+hYD==",
    "sajssdk_2015_cross_new_user": "1",
    "sensorsdata2015jssdkcross": "%7B%22distinct_id%22%3A%221970cd193ba2174-0f32c752622f9e-26011f51-2073600-1970cd193bb1f97%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22identities%22%3A%22eyIkaWRlbnRpdHlfY29va2llX2lkIjoiMTk3MGNkMTkzYmEyMTc0LTBmMzJjNzUyNjIyZjllLTI2MDExZjUxLTIwNzM2MDAtMTk3MGNkMTkzYmIxZjk3In0%3D%22%2C%22history_login_id%22%3A%7B%22name%22%3A%22%22%2C%22value%22%3A%22%22%7D%2C%22%24device_id%22%3A%221970cd193ba2174-0f32c752622f9e-26011f51-2073600-1970cd193bb1f97%22%7D",
    "guid": "d82998f6390d5db95820b50c76fef3f5"
}
url = "https://we.51job.com/api/job/search-pc"
params = {
    "api_key": "51job",
    "timestamp": "1748266756",
    "keyword": "爬虫",
    "searchType": "2",
    "function": "",
    "industry": "",
    "jobArea": "000000",
    "jobArea2": "",
    "landmark": "",
    "metro": "",
    "salary": "",
    "workYear": "",
    "degree": "",
    "companyType": "",
    "companySize": "",
    "jobType": "",
    "issueDate": "",
    "sortType": "0",
    "pageNum": "1",
    "requestId": "",
    "pageSize": "20",
    "source": "1",
    "accountId": "",
    "pageCode": "sou|sou|soulb",
    "scene": "7"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)