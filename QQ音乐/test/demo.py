import requests
import json


headers = {
    "accept": "application/json",
    "accept-language": "zh",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://y.qq.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://y.qq.com/",
    "sec-ch-ua": "\"Chromium\";v=\"136\", \"Google Chrome\";v=\"136\", \"Not.A/Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
}
cookies = {
    "_qpsvr_localtk": "0.8904531497075358",
    "RK": "IpnMiivKRc",
    "ptcz": "2cce266718e11b84a7607c32a9abd0be1ed7d77df0f0ee0674d1b0f598236cf4",
    "login_type": "1",
    "psrf_qqrefresh_token": "5034B6AFD8978460D9DB8570B733037B",
    "psrf_qqopenid": "B0C34714EFF9EBAF937C523B67466E74",
    "wxunionid": "",
    "wxrefresh_token": "",
    "tmeLoginType": "2",
    "euin": "oKokoi-57KEPoc**",
    "music_ignore_pskey": "202306271436Hn@vBj",
    "psrf_qqaccess_token": "78945EAA8FF03A464EDC74E5366DBFC0",
    "qqmusic_key": "Q_H_L_63k3NE9Loqgg4kjZQc3kVTlH3y5ZAl0pCtQdHvTtj8IHiERnZOzLVRcLT1mKePQarNyKnJS4zRv2453mJayy8YQ",
    "psrf_musickey_createtime": "1747921354",
    "uin": "1353215942",
    "wxopenid": "",
    "psrf_access_token_expiresAt": "1753105354",
    "psrf_qqunionid": "3BEFD71C29E9BABCF7F86E5A73106E01",
    "qm_keyst": "Q_H_L_63k3NE9Loqgg4kjZQc3kVTlH3y5ZAl0pCtQdHvTtj8IHiERnZOzLVRcLT1mKePQarNyKnJS4zRv2453mJayy8YQ",
    "pgv_pvid": "369878000",
    "fqm_pvqid": "0b1376e0-51f9-4750-8e59-ba6035e93833",
    "fqm_sessionid": "b8a0dbad-3f36-45a6-ac5e-8236ecf5a9de",
    "pgv_info": "ssid=s5520650800",
    "ts_last": "y.qq.com/n/ryqq/songDetail/004fneUm24gD2c",
    "ts_uid": "9834834650"
}
url = "https://u6.y.qq.com/cgi-bin/musics.fcg"
params = {
    # "_": "1747921373865",
    "sign": "zzcd56997fzub08t5wq6or24jwx8skyyd25wy9707fbe7"
}
data = {
    "comm": {
        "cv": 4747474,
        "ct": 24,
        "format": "json",
        "inCharset": "utf-8",
        "outCharset": "utf-8",
        "notice": 0,
        "platform": "yqq.json",
        "needNewCode": 1,
        "uin": 1353215942,
        "g_tk_new_20200303": 558885419,
        "g_tk": 558885419
    },
    "req_1": {
        "module": "music.globalComment.CommentRead",
        "method": "GetReplyCommentList",
        "param": {
            "RootCmId": "1!kXdy8jv34lQH8x1P1qXd9CyLQG2wlWSZM.1S0dvW.C6mwaN5ivhGvXtIW5JmzyRN",
            "LastCommentSeqNo": "",
            "PageSize": 10,
            "LastRankScore": "",
            "RankType": 1,
            "PicEnable": 1,
            "PageNum": 0
        }
    }
}
data = json.dumps(data, separators=(',', ':'))
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)