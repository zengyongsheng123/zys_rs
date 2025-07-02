import hashlib
import re
import string
import os
import execjs
import requests
import random
import urllib.parse

PATH = os.getcwd()

uaSignJsPath = os.path.join(PATH, 'js/fireyejs.js')
ppSignJsPath = os.path.join(PATH, 'js/bx-pp.js')
etSignJsPath = os.path.join(PATH, 'js/bx_et.js')
encodeJsPath = os.path.join(PATH, 'js/encode.js')
# captcha
trajectoryPath = os.path.join(PATH, 'utils/trajectory.json')
# captchacapslidev2
trajectoryPath2 = os.path.join(PATH, 'utils/trajectory2.json')
# captchapuzzle
trajectoryPath3 = os.path.join(PATH, 'utils/trajectory3.json')
# captchaclick
trajectoryPath4 = os.path.join(PATH, 'utils/trajectory4.json')
# captchaconnect
trajectoryPath5 = os.path.join(PATH, 'utils/trajectory5.json')


def ppSign(pp):
    randomStr = ''.join(random.choices(string.ascii_letters + string.digits, k=16))
    md5Str = hashlib.md5(
        f"{pp['i']}|{pp['l']}|{pp['q']}|{pp['t']}|{pp['f']}|{pp['k']}|1|1||{randomStr}|0".encode()).hexdigest()
    _str = f"xa:{md5Str}:0|0|a|{pp['t']}|{pp['f']}|{pp['k']}|1|1||{randomStr}|0:{randomStr}:0:{pp['enc']}:0"
    return _str.encode().hex()


def etSign(validateUrl, url, trajectory, cookie=""):
    parse_url = urllib.parse.urlparse(url)
    netloc = parse_url.netloc.replace(':443', '')
    scheme = parse_url.scheme
    path = parse_url.path
    query = parse_url.query
    if query: query = '?' + query
    location = {
        "ancestorOrigins": {},
        "href": url.replace(':443', ''),
        "origin": scheme + "://" + netloc,
        "protocol": scheme + ':',
        "host": netloc, "hostname": netloc,
        "port": "", "pathname": path,
        "search": query, "hash": ""
    }
    et_script = open(etSignJsPath, 'r', encoding='utf-8').read()
    et_script = et_script.replace('location={}', f'location={location}')
    et_script = et_script.replace("cookie: ''", f"cookie: '{cookie}'")
    return execjs.compile(et_script).call('sign', validateUrl, trajectory)


# 228参数生成
def uaSign(url, action, umidToken, trajectory, cookie=""):
    cookie = "" if not cookie else cookie
    parse_url = urllib.parse.urlparse(url)
    netloc = parse_url.netloc.replace(':443', '')
    scheme = parse_url.scheme
    path = parse_url.path
    query = parse_url.query
    if query: query = '?' + query
    location = {
        "ancestorOrigins": {},
        "href": url.replace(':443', ''),
        "origin": scheme + "://" + netloc,
        "protocol": scheme + ':',
        "host": netloc, "hostname": netloc,
        "port": "", "pathname": path,
        "search": query, "hash": ""
    }
    ua_script = open(uaSignJsPath, 'r', encoding='utf-8').read()
    ua_script = ua_script.replace('let [screenTop, screenLeft, innerWidth, innerHeight, outerWidth, outerHeight] = []',
                                  f'let [screenTop, screenLeft, innerWidth, innerHeight, outerWidth, outerHeight] = {trajectory["screenSize"]}')
    ua_script = ua_script.replace('location={}', f'location={location};')
    ua_script = ua_script.replace("cookie: ''", f"cookie: '{cookie}'")
    return execjs.compile(ua_script).call('ua', trajectory, umidToken, action)


# 轨迹偏移
def offsetTrajectory(trajectory):
    if type(trajectory) == list:
        trajectory = random.choice(trajectory)
        # trajectory = trajectory[-1]
    x1 = random.randint(-300, 300)
    y1 = random.randint(-300, 300)
    t1 = random.randint(0, 3000)
    trajectory_list = trajectory["trajectory_list"]
    for index, i in enumerate(trajectory_list):
        point = trajectory_list[index]
        if point.get('pageX'):
            point['pageX'] = point['pageX'] + x1
            point['pageY'] = point['pageY'] + y1
            point['timeStamp'] = point['timeStamp'] + t1
        elif point.get('touches'):
            point['touches']['pageX'] = point['touches']['pageX'] + x1
            point['touches']['screenX'] = point['touches']['screenX'] + x1
            point['touches']['pageY'] = point['touches']['pageY'] + y1
            point['touches']['screenY'] = point['touches']['screenY'] + y1
            point['timeStamp'] = point['timeStamp'] + t1
    return trajectory


def getUmidToken():
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 Edg/123.0.0.0', }
    response = requests.get('https://ynuf.aliapp.org/w/wu.json', headers=headers)
    return re.findall("umx\.wu\('(.*?)'\);", response.text)[0]


def encode(params):
    return execjs.compile(open(encodeJsPath, 'r').read()).call('encode', params)
