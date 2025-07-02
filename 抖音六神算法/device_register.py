import base64
import binascii
import json
import time
import urllib.parse
from flurl.utils import *
from flurl.request_params import generate_url_params
from flurl.utils import UUID, md5, generate_mac_address, generate_android_id, gzip_compress
from flurl.ttEncryptorUtil import ttEncrypt
import requests
from flurl.core import core_sixgod

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
def get_post_data(dev_info: dict) -> bytes:
    """Generate the post data for device registration."""
    gtime = round(time.time() * 1000)
    post_data = {
        "magic_tag": "ss_app_log",
        "header": {
            "display_name": "抖音",
            "update_version_code": dev_info['app']['update_version_code'],
            "manifest_version_code": dev_info['app']['manifest_version_code'],
            "aid": 1128,
            "channel": dev_info['app']['channel'],
            "package": "com.ss.android.ugc.aweme",
            "app_version": dev_info['app']['version_name'],
            "version_code": dev_info['app']['version_code'],
            "sdk_version": "3.7.3-rc.53-douyin-bugfix",
            "os": dev_info['device']['os'],
            "os_version": dev_info['device']['os_version'],
            "os_api": dev_info['device']['os_api'],
            "device_model": dev_info['device']['device_type'],
            "device_brand": dev_info['device']['device_brand'],
            "device_manufacturer": "Google",
            "device_category": "phone",
            "cpu_abi": "arm64-v8a",
            "release_build": f"{UUID()}",
            "density_dpi": dev_info['device']['dpi'],
            "display_density": "mdpi",
            "resolution": dev_info['device']['resolution'].replace('*', 'x'),
            "language": "zh",
            "mac": generate_mac_address(),
            "timezone": 8,
            "access": "wifi",
            "carrier": "CHINA MOBILE",
            "mcc_mnc": "46007",
            "rom": dev_info['device']['rom'],
            "rom_version": dev_info['device']['rom_version'],
            "sig_hash": md5(UUID()),
            "openudid": dev_info['device']['openudid'],
            "clientudid": dev_info['device']['clientudid'],
            "region": "CN",
            "tz_name": "Asia/Shanghai",
            "tz_offset": 28800,
            "sim_region": "cn",
        },
        "_gen_time": gtime
    }
    return gzip_compress(json.dumps(post_data).encode('utf-8'))


def get_headers(dev_info: dict, md5Hash: str = "") -> dict:
    """Generate headers for requests."""
    extra_headers = {
        "content-type": "application/octet-stream;tt-data=a",
        'X-SS-STUB': md5Hash,
    }
    headers = {
        "accept-encoding": "gzip",
        "log-encode-type": "gzip",
        "x-tt-request-tag": "t=0;n=1",
        "x-ss-req-ticket": str(round(time.time() * 1000)),
        "sdk-version": "2",
        "passport-sdk-version": "203316",
        "x-vc-bdturing-sdk-version": "3.7.4.cn",
        "user-agent": dev_info['extra']['userAgent'],
        "host": "log.snssdk.com",
        "connection": "Keep-Alive",
    }
    if md5Hash:
        headers.update(extra_headers)
    return headers


def post_device_register(dev_info: dict, extra: dict) -> requests.Response:
    """Send device registration request."""
    url = "https://log.snssdk.com/service/2/device_register/"
    params = generate_url_params(dev_info, extra)
    req_url = f"{url}?{urllib.parse.urlencode(params)}"
    print(params)

    gzip_post_data = get_post_data(dev_info)
    post_data = ttEncrypt(gzip_post_data)

    headers = get_headers(dev_info, md5(post_data))
    response = requests.post(req_url, headers=headers, data=post_data)

    print(response.text)
    obj = response.json()
    dev_info['device']['deviceId'] = str(obj.get("device_id", ""))
    dev_info['device']['iid'] = str(obj.get("install_id", ""))

    if response.cookies:
        cookies_dict = cookie_json(response)
        dev_info['extra']['cookies'] = cookies_dict
        print(dev_info['extra']['cookies'])

    return response


def send_app_alert_check(dev_info: dict):
    """Send app alert check."""
    url = "https://ichannel.snssdk.com/service/2/app_alert_check/"
    extra = {'device_id': dev_info['device']['deviceId'], 'iid': dev_info['device']['iid']}
    params = generate_url_params(dev_info, extra)
    headers = get_headers(dev_info)

    sign_headers, sign_urls = core_sixgod(surl=url, params=params, devices={}, header=headers, log=False)
    response = requests.get(sign_urls, headers=sign_headers)
    print(response.text)

    if response.cookies:
        cookies_dict = cookie_json(response)
        dev_info['extra']['cookies'] = cookies_dict

    time.sleep(2)


def device_register():
    """Simulate device registration."""
    openudid = generate_android_id()
    uuid = UUID()
    cdid = UUID()
    clientudid = UUID()
    rom = f'EMUI-{rand_str(13)}'

    dev_info = {
        'device': {
            'os': 'Android',
            'device_platform': 'android',
            'device_type': 'MI 12',
            'device_brand': 'Xiaomi',
            'os_version': '10',
            'os_api': '29',
            'openudid': openudid,
            'resolution': '1440*2392',
            'dpi': '560',
            'cdid': cdid,
            'uuid': uuid,
            'clientudid': clientudid,
            'rom': rom,
            'rom_version': rand_str(2),
        },
        'app': {
            'channel': 'douyin-ls-sm-xz-and-20',
            'version_code': '340100',
            'version_name': '34.1.0',
            'manifest_version_code': '340100',
            'update_version_code': '34101100',
        },
        'extra': {
            'userAgent': f'com.ss.android.ugc.aweme/340100 (Linux; U; Android 10; zh_CN; MI 12; Build/MMB29M)',
            'cookies': '',
        }
    }

    post_device_register(dev_info, extra={})
    send_app_alert_check(dev_info)


device_register()
