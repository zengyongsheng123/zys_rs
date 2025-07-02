import requests
import execjs
import time

timer = time.strftime("%Y-%m-%d", time.localtime())
# print(timer)
with open('七麦.js',  encoding='utf-8') as f:
    js_code = f.read()

js = execjs.compile(js_code)

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Cookie": "qm_check=A1sdRUIQChtxen8pI0dAMRcOUFseEHBeQF0JTjVBWDAIXEQaYhAQbF1FIRUJCBETVkQSGAlIBAhVVl4pTEBTFXNbQlxTQAshV1ZIDgolAGgCEElDaw06VktIPEo+BAYbEhUSV1AABQxKQltKGQceABUAGAhHGw%3D%3D; PHPSESSID=u16l83so293t06r1m8np64snfp; gr_user_id=75f1c62e-1323-415d-9b3d-02c4fa2f6369; ada35577182650f1_gr_session_id=6d805fc5-f6cb-470e-8cd4-5f3961535ef1; ada35577182650f1_gr_session_id_sent_vst=6d805fc5-f6cb-470e-8cd4-5f3961535ef1; USERINFO=DPpKfuta8oV1H6iJZgNr%2BjjOIlmdtoncWutZU6Li%2BLVX2PdLqZsl3t6FP6APZPfP6SXezRkEMnWLcvAGW3C%2FnngYPI1r8VXjD6gevUYUHhHTM2afu17W6Ca66Sq4oZlYJK0tEJslGzxviI%2FEiswOcgylGZOSMNR1; AUTHKEY=4P605sK42AUivnTuTu%2FDzzgKVeB5rfUsEjrz6VdPWhuGc3lRyfpZDmn3aIIzlE5p8njDZfwFzGBqbXqq4He%2FcomWw5wb8GEsPOdBvqXA4PQZUjZaS3ryZg%3D%3D; ada35577182650f1_gr_last_sent_sid_with_cs1=6d805fc5-f6cb-470e-8cd4-5f3961535ef1; ada35577182650f1_gr_last_sent_cs1=qm23286841715; aso_ucenter=1052nhgwGoVABPdtng4iZV58EEPaSjwZbELsSPSQukJCcieTN4%2FeSx6R5mBblb2FxLc; synct=1733191098.912; syncd=-17; ada35577182650f1_gr_cs1=qm23286841715",
    "Origin": "https://www.qimai.cn",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-site",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "sec-ch-ua": "\\Google",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\\Windows"
}
for i in range(1, 6):
    url = "https://api.qimai.cn/rank/offline"
    params = {
        # "analysis":
        # "ew8vECUSKA54ZX4XKSV0TygiLlg0LT9MfWMiHixTdxwoJFgANBMFRnoZKRt3XDcMBQ9FRDoWHkUCCgoWWQMACwEWHDoWBgZaUlYNAVFSXlo4Wkk%3D",
        "status": "3",
        "date": timer,
        "sdate": timer,
        "edate": timer,
        "country": "cn",
        "genre": "36",
        "option": "4",
        "page": str(i)
    }
    aa = list(params.values())
    analysis = js.call('get_data', aa)
    params['analysis'] = analysis
    # print(analysis)
    response = requests.get(url, headers=headers, params=params)
    print(response.json())
