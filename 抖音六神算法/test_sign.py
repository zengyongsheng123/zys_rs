import time
import requests
from flurl.core import core_sixgod
from slider.slider import call_sliderV2

def call_slider(vdata: dict):
    """
    Call the slider verification function.
    """
    call_sliderV2(vdata)
    time.sleep(1)
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
def encrypt_account_password(val: str, pwd: bool = False) -> str:
    """
    Encrypt the account password or mobile number.
    :param val: The account or mobile value.
    :param pwd: If True, treat `val` as password.
    :return: Encrypted string.
    """
    if pwd:
        bytes_val = val.encode('utf-8')
    else:
        # Check if mobile number is a Chinese number (11 digits).
        if val[0] == '1' and len(val) == 11:
            bytes_val = f'+86 {val}'.encode('utf-8')
        else:
            print(f"Non-China mobile: {val}")
            bytes_val = f'+852 {val}'.encode('utf-8')

    return ''.join(hex(i ^ 5)[2:] for i in bytes_val)
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
def query_account(dev: dict = {}, mobile: str = "", proxys: dict = None) -> requests.Response:
    """
    Query the account details.
    :param dev: Device details.
    :param mobile: Mobile number for the query.
    :param proxys: Proxy settings if any.
    :return: Response object from the server.
    """
    headers = {
        "Host": "api.amemv.com",
        "x-ss-stub": "15F6713C40BF83ADA974D66645ADE387",
        "user-agent": "com.ss.android.ugc.aweme/310101 (Linux; U; Android 9; zh_CN; SKW-A0; Build/PQ3B.190801.06281541;tt-ok/3.12.13.4-tiktok)",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }

    cookies = {
        "store-region": "cn-gz",
        "install_id": "1132959998687130",
        "passport_csrf_token": "5705bbb0d9251352fcf0e41c72ba2d36",
        "d_ticket": "ec2c21b1f8183448987c2de3c5ef765a926d4"
    }

    url = "https://api.amemv.com/passport/safe/query_account/"
    params = {
        "is_vcd": "1",
        "iid": "1132959998687130",
        "device_id": "4281930742540667",
        "ac": "wifi",
        "channel": "update",
        "aid": "1128",
        "app_name": "aweme",
        "version_code": "310100",
        "version_name": "31.1.0",
        "device_platform": "android",
        "os": "android",
        "language": "zh",
        "os_api": "28",
        "os_version": "9",
        "resolution": "900*1600",
        "dpi": "320",
        "update_version_code": "31109900",
        "_rticket": "1723656096257",
        "package": "com.ss.android.ugc.aweme",
        "mcc_mnc": "46000",
        "first_launch_timestamp": "0",
        "cpu_support64": "true",
        "host_abi": "arm64-v8a",
        "is_guest_mode": "0",
        "app_type": "normal",
        "minor_status": "0",
        "is_android_pad": "0",
        "ts": "1723656096",
        "cdid": "23d5616d-df98-4769-bb85-13c9771b64cd"
    }

    data = {
        "mobile": encrypt_account_password(mobile),
        "scene": "find_account",
        "device_id": dev.get("device_id", params["device_id"]),
        "iid": dev.get("iid", params["iid"]),
        "ts": "1723656096"
    }

    # Call core_sixgod to sign headers and urls
    sign_headers, sign_urls = core_sixgod(surl=url, params=params, data=data, devices=dev, header=headers, log=True)

    # Perform the actual POST request
    response = requests.post(
        url=sign_urls,
        cookies=cookies,
        headers=sign_headers,
        data=data,
        proxies=proxys
    )

    print(response.text)
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # Handle CAPTCHA verification logic
    response_data = response.json()
    if response_data["data"].get("verify_center_decision_conf"):
        vdata = {
            "verify_data": response_data["data"].get("verify_center_decision_conf"),
            "device_id": dev.get("device_id", params["device_id"]),
            "iid": dev.get("iid", params["iid"]),
            "proxy": ""
        }
        call_slider(vdata)
        dev["captchaVerify"] = "true"
        query_account(dev, mobile, proxys=proxys)
    elif response_data["data"].get("description") == "用户不存在":
        return response
    elif dev.get("captchaVerify") == "true" and response_data["message"] == "error":
        time.sleep(2)
        query_account(dev, mobile, proxys=proxys)
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
if __name__ == '__main__':
    dev = {
        "aid": "1128",
        "iid": "3076883975280827",
        "device_id": "3076883975276731",
        "channel": "wandoujia_1128_0413",
        "version_code": 310900,
        "version_name": "31.9.0",
        "device_type": "V2046A",
        "device_brand": "vivo",
        "device_model": "V2046A",
        "os_version": "13",
        "resolution": "2376×1080",
        "dpi": 480,
        "cdid": "98203c9d-5d7f-46e6-940b-0294e6b5f324",
        "uuid": "",
        "ua": "com.ss.android.ugc.aweme/310900 (Linux; U; Android 13; zh_CN; V2046A; Build/TP1A.220624.014; Cronet/TTNetVersion:4801b8cf 2023-09-04)"
    }
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    mobile = "13149542215"
    query_account(dev, mobile=mobile)
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担