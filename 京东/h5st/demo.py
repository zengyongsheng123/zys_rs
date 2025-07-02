import requests


headers = {
    "accept": "*/*",
    "accept-language": "zh,zh-CN;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "referer": "https://www.jd.com/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "script",
    "sec-fetch-mode": "no-cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "__jdv": "95931165|direct|-|none|-|1747548372861",
    "__jdu": "17475483728601170377086",
    "3AB9D23F7A4B3C9B": "MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSI",
    "__jda": "76161171.17475483728601170377086.1747548373.1747548373.1747666416.2",
    "__jdb": "76161171.2.17475483728601170377086|2.1747666416",
    "__jdc": "76161171",
    "3AB9D23F7A4B3CSS": "jdd03MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSIAAAAMW5EE4XNAAAAAADQOIDEO235YEKUX",
    "_gia_d": "1",
    "areaId": "19",
    "ipLoc-djd": "19-1655-0-0",
    "PCSYCityID": "CN_440000_441900_0",
    "shshshfpa": "660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855",
    "shshshfpx": "660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855",
    "sdtoken": "AAbEsBpEIOVjqTAKCQtvQu17qS-rNO0RZowxhxtwIBBA80riYWLAId32ugxy8YmnPJN7rMzP-8ld_tq4-Fa76fHSk_nPBA4KekbRx7XZMEbqMHlqP8gbHlpeI-q2",
    "shshshfpb": "BApXSqHgB6vNA-lb62kUbGA0TRDBDQGMaBnQCH3pu9xJ1MknjYoG2"
}
url = "https://api.m.jd.com/"
params = {
    "h5st": "20250519225441334;9d9waz3i9hqqq2m3;b5216;tk03wd0cf1c5d18nNBpHE4IywgiXme30t7dqyohAslxjO5v9favcldsX4ibdjwCD0KB11kf_J9YXeJ4zt95R_T09ADIl;bec93a97248ba44818e031de5ee3eff9335aa8edf210e4c8b593fed8e9d8f9d0;5.1;1747666480334;smePkm8iBlbS9pnU1K4i0p4R1eYgMuMgMuHVMusmk_Mh9uMgM24WLlsmOGujMOLhIVrV8WbgKhbh3m7h9u7WLZIh_W4hLVYV6qYVNd4WMuMgMuHdCRIWJRHmOuMsCmMVMRbi4abW7i7iKtLW8m4h9mIhMlYi8aYg9qLV3mIV_msm0m8SNVHTNhImOuMsCqbjOGLm6aHWMusmk_Mm62ciAaLRPZoTFV4X5OImOGLm4lsmOGujMqXjs56Xfxpb8maSsVLmOGLmBxoVApISMusmk_Mm8iLTFRJmOGLmItHmOuMsC6nmOGOiOGLm9qbRMlsmOusmk_ci9uMgMubi5lImOusmOGuj26sm0mMi9aHWMusmOuMsCm8U2SZUD5aWal7XWJ6eMuMgM64TK1YW8lsmOusmk_siOGLm2aHWMusmOuMsCurm0m8h5lImOusmOGuj2mrm0mMh5lImOusmOGuj_uMgMabRMlsmOusmk_siOGLm6aHWMusmOuMsCerhOGLm7aHWMusmOuMsCmshAqLj_msm0mci5lImOusmOGuj_uMgMC4RMusmOuMsCarm0m8SClsmOusmk_siOGLmClsmOusmk_siOGLmKRHmOusmOG_QOGLmK1YV6NXVMusmk_cPztMgMunSMusmk_Mm6WrQOCrh42YUXt8g_2si9usZgt8S3xoVAJ4ZMuMgMqYR7lsmOG_Q;324eb6452a7ec08cbb20cd976a2ca96d527d794b0c0a49f8441b85bf4d81b864;tenjKJKT-JoRL1YRI9MT-J4S8ZIZ61YVF94WCeHTJJoTL9cQKxIWCeYU_tXW",
    "appid": "www-jd-com",
    "body": "{\"page\":5,\"pagesize\":25,\"area\":\"\",\"source\":\"pc-home\",\"gb\":1}",
    "clientVersion": "1.0.0",
    "client": "pc",
    "functionId": "pc_home_feed",
    "t": "1747666480328",
    "uuid": "76161171.17475483728601170377086.1747548373.1747548373.1747666416.2",
    "loginType": "3",
    "x-api-eid-token": "jdd03MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSIAAAAMW4H77Z3QAAAAADWL5LUSE7DAFTEX",
    "callback": "jsonpMore2Goods",
    "_": "1747666480336"
}
response = requests.get(url, headers=headers, cookies=cookies, params=params)

print(response.text)
print(response)