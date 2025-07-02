import requests
import execjs


js = execjs.compile(open('02-抖音.js', encoding='utf-8').read())

headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://www.douyin.com/user/MS4wLjABAAAAompXkPoYOGsA152dqYoytKycjIZ_aCCxHwGmLX5IsDM?from_tab_name=main",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "uifid": "2eb4f745f9fe6544447c1d68cb43a44931f67e23b1951fd9ca8b76ce94a62236635628564412d5ad9331c997779cc62e7c68fcae4a6f7e3ecc0fa8f9ed318b4297204c4cbc90f9b38cae6002906755cc",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
}
cookies = {
    "__ac_nonce": "067ea9e5d00d56b696091",
    "__ac_signature": "_02B4Z6wo00f01J3ao.QAAIDAqv5nqrJypwyd-qdAAECg55",
    "ttwid": "1%7CLTlC9q5zpF4HOiB0JlcLYzGVC5O-yL-POfGN64uGLXM%7C1743429213%7C4bf685ef3afc3526836d8c0b2b2ce9e7d5da0c85d14ccf71e7b494d8715f1636",
    "UIFID_TEMP": "2eb4f745f9fe6544447c1d68cb43a44931f67e23b1951fd9ca8b76ce94a62236635628564412d5ad9331c997779cc62e7c68fcae4a6f7e3ecc0fa8f9ed318b4297204c4cbc90f9b38cae6002906755cc",
    "x-web-secsdk-uid": "9af30de4-6cfd-4dcb-b1a8-805712e3ad15",
    "s_v_web_id": "verify_m8x4qnpr_gq4dOEbb_KXg7_4BSn_9Xwq_sGruF46gVnjG",
    "hevc_supported": "true",
    "IsDouyinActive": "true",
    "home_can_add_dy_2_desktop": "%220%22",
    "dy_swidth": "1920",
    "dy_sheight": "1080",
    "stream_recommend_feed_params": "%22%7B%5C%22cookie_enabled%5C%22%3Atrue%2C%5C%22screen_width%5C%22%3A1920%2C%5C%22screen_height%5C%22%3A1080%2C%5C%22browser_online%5C%22%3Atrue%2C%5C%22cpu_core_num%5C%22%3A16%2C%5C%22device_memory%5C%22%3A8%2C%5C%22downlink%5C%22%3A10%2C%5C%22effective_type%5C%22%3A%5C%224g%5C%22%2C%5C%22round_trip_time%5C%22%3A0%7D%22"
}
url = "https://www.douyin.com/aweme/v1/web/aweme/post/?device_platform=webapp&aid=6383&channel=channel_pc_web&sec_user_id=MS4wLjABAAAAompXkPoYOGsA152dqYoytKycjIZ_aCCxHwGmLX5IsDM&max_cursor=0&locate_query=false&show_live_replay_strategy=1&need_time_list=1&time_list_query=0&whale_cut_token=&cut_version=1&count=18&publish_video_strategy_type=2&from_user_page=1&update_version_code=170400&pc_client_type=1&pc_libra_divert=Windows&support_h265=1&support_dash=0&version_code=290100&version_name=29.1.0&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=Win32&browser_name=Chrome&browser_version=134.0.0.0&browser_online=true&engine_name=Blink&engine_version=134.0.0.0&os_name=Windows&os_version=10&cpu_core_num=16&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7487974042364855846&uifid=2eb4f745f9fe6544447c1d68cb43a44931f67e23b1951fd9ca8b76ce94a62236261c51d25d94a59d32a6cbb657ee5906953c79c9ee17f8b70a464d6d6bf97a79a2fcda895e77b89095aa1a207ed0b9d0&verifyFp=verify_m8x53ww6_4wrlHZcM_Hbhz_4rNi_9CRE_eOTgLVzLeppt&fp=verify_m8x53ww6_4wrlHZcM_Hbhz_4rNi_9CRE_eOTgLVzLeppt&a_bogus=mJ4Vh7XJEoQ5FdMt8Cr4eUdUF6nlrTSySpTORjATSOOHGXUYU8NGNccwnoq05OLGwup0h9VHhj0MYxnc%2FsXkZFHkwmpvSD0fpG55908L2qqRTziQgr6Ye8gFLw0NUcsql5VtiIkIZUtogjVAkHdD%2FpArH%2FKeQRWBBpxfkZTbN9B6Z0gAD1c-PBtpPXitUUAG"

ab = js.call('get_ab', url)
print(ab)
url += '&a_bogus=' + ab

response = requests.get(url, headers=headers, cookies=cookies)
# print(response.text)
print(response.json())
print(response)

