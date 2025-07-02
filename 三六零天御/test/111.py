import json
import time
import random
import hashlib
import platform
import requests
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import base64
from typing import Dict, Any, Callable, Optional

# 全局对象，模拟 window._jg.captcha
_jg = {"captcha": {"errcode": 0}}

# 模块缓存，模拟 JavaScript 的 _0x14e318
_modules: Dict[str, Dict[str, Any]] = {}


def load_module(name: str, func: Callable, is_interface: bool = False) -> Any:
    """模块加载器，模拟 JavaScript 的 _0x2c177e"""
    if name in _modules:
        return _modules[name]["exports"]

    module = {"name": name, "is_load": False, "exports": {}}
    func(module, module["exports"], load_module)
    module["is_load"] = True
    _modules[name] = module
    return module["exports"]


class CaptchaBusiness:
    """验证码业务逻辑类"""

    def binding(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """绑定全局对象"""

        def binding_func():
            global _jg
            _jg["captcha"] = _jg.get("captcha", {"errcode": 0})
            require("init")()

        exports["binding"] = binding_func

    def init(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """初始化验证码"""

        def init_func():
            if require("checkIE")():
                # 模拟 polyfill，Python 不需要
                pass
            require("addCSS")()  # 需要前端实现
            jg_obj = require("getJgObj")()
            require("checkPlatform")()
            jg_obj["lang"] = platform.system()
            require("containerInit")()  # 需要前端实现
            jg_obj["load"] = require("receiveData")
            if jg_obj.get("platform") == "unknown":
                jg_obj["errcode"] = 2200
            elif require("checkAutomaticEnv")():
                jg_obj["errcode"] = 2201
            else:
                jg_obj["observers"] = {}
                require("initLayout")()  # 需要前端实现
                require("initReport")()
            require("objObserver")(jg_obj, "data")  # 需要前端实现

        exports["init"] = init_func

    def containerInit(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """创建验证码容器（前端逻辑，模拟注释）"""

        def container_init():
            # 需要 Selenium 或 Playwright 实现 DOM 操作
            print("Simulating container initialization: creating div.container and div#default-captcha")

        exports["containerInit"] = container_init

    def initLayout(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """初始化布局（前端逻辑，模拟注释）"""

        def init_layout():
            print("Simulating layout initialization: setting wrapper, header, loading page, and main content")

        exports["initLayout"] = init_layout

    def initBasicConfig(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """初始化基本配置"""

        def init_basic_config():
            return {
                "obj": "_jg",
                "aid": "",
                "prefix": "jg_captcha",
                "version": "2.0.0",
                "sdkName": "360CaptchaSDK",
                "type": 1,
                "pic_cdn": "",
                "typeMap": {0: "basic", 1: "clickword"},
                "captchaTypeMap": {"TYPE_BASIC": 0, "TYPE_CLICK": 1},
                "noserverImgSrc": "https://cdn.jiagu.com/images/default.jpg",
                "api_server": "https://captcha.jiagu.360.cn",
                "api_auth": "https://captcha.jiagu.360.cn/api/v3/auth",
                "api_verify": "https://captcha.jiagu.360.cn/api/v3/check",
                "height": 150,
                "os": 3
            }

        exports["initBasicConfig"] = init_basic_config

    def setRequestBody(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """生成请求体"""

        def set_request_body(config: Dict[str, Any]) -> Dict[str, Any]:
            request_body = {
                "appId": config["aid"],
                "type": 1,
                "version": config["version"],
                "pn": config["pn"],
                "os": config["os"],
                "sdkName": config["sdkName"],
                "timestamp": int(time.time() * 1000),
                "nonce": int(time.time() * 1000) + random.randint(0, 100000000),
                "ui": None,
                "rc": 0,
                "pc": 0,
                "ec": 0,
                "hc": 0,
                "xc": 0,
                "dc": 0,
                "phone": config.get("phone", 10000000000)
            }
            sign_str = "".join(f"{key}{request_body[key]}" for key in sorted(request_body.keys()))
            request_body["sign"] = hashlib.md5(sign_str.encode()).hexdigest()
            return request_body

        exports["setRequestBody"] = set_request_body

    def requestAuth(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """发送认证请求"""

        def request_auth(data: Optional[Dict[str, Any]] = None):
            jg_obj = require("getJgObj")()
            config = require("initBasicConfig")()
            if not data:
                if jg_obj.get("data"):
                    for key in ["aid", "pn"]:
                        if key in jg_obj["data"]:
                            config[key] = jg_obj["data"].pop(key)
                config["phone"] = 10000000000
            request_body = require("setRequestBody")(config)
            if not require("checkAutomaticEnv")():
                try:
                    response = requests.post(
                        config["api_auth"],
                        data=request_body,
                        headers={"Content-Type": "application/x-www-form-urlencoded"},
                        timeout=jg_obj["data"]["configs"]["timeout"] / 1000
                    )
                    result = json.loads(response.text)
                    if result["error"] == 0:
                        jg_obj["vConfig"] = {}
                        for key in result["data"]:
                            if key in ["captchaId", "token", "k"]:
                                jg_obj["vConfig"][key] = result["data"][key]
                            elif key == "text":
                                jg_obj["texts"] = result["data"][key]
                                require("initText")(jg_obj["texts"])  # 需要前端实现
                            elif key not in ["heigh", "text"] and require("imageCheck")(result["data"][key]):
                                # 模拟图片处理
                                print(f"Simulating image processing for {key}: {result['data'][key]}")
                                if key == "bg":
                                    require("setCanvas")(result["data"][key])  # 需要前端实现
                                    require("setSliderBar")()  # 需要前端实现
                                    require("setRefresh")()  # 需要前端实现
                                    require("setSliderBox")()  # 需要前端实现
                                    require("bindEvents")()  # 需要前端实现
                                    jg_obj["state"] = "ready"
                                else:
                                    require("setMovePic")(result["data"][key], result["data"]["heigh"])  # 需要前端实现
                        if jg_obj["state"] == "ready" and jg_obj["vConfig"].get("captchaId"):
                            jg_obj["data"]["ready"](jg_obj["vConfig"]["captchaId"])
                    else:
                        require("universalLogCallback")(result["error"])
                except Exception as e:
                    print(f"Auth request error: {e}")
                    require("universalLogCallback")(2009)
            else:
                require("universalLogCallback")(2201)

        exports["requestAuth"] = request_auth

    def verify(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """验证滑动结果（前端逻辑，模拟注释）"""

        def verify_func():
            jg_obj = require("getJgObj")()
            config = require("initBasicConfig")()
            require("initTracking")()
            # 模拟滑动距离，实际需要前端交互
            verify_data = {
                "captchaId": jg_obj["vConfig"]["captchaId"],
                "token": jg_obj["vConfig"]["token"],
                "length": 100,  # 模拟滑动距离
                "version": config["version"],
                "width": 300,
                "report": require("enc")(json.dumps(jg_obj["rarr"])),
                "tracking": jg_obj["tracking"]
            }
            if not require("checkAutomaticEnv")():
                try:
                    response = requests.post(
                        config["api_verify"],
                        data=verify_data,
                        headers={"Content-Type": "application/x-www-form-urlencoded"},
                        timeout=jg_obj["data"]["configs"]["timeout"] / 1000
                    )
                    result = json.loads(response.text)
                    if result["error"] == 0 and result["data"]["result"]:
                        print("Verification successful")
                        jg_obj["data"]["success"](result["data"]["token"])
                        require("envCleaner")(True)
                    else:
                        require("envCleaner")()
                        require("verifyFailed")()
                except Exception as e:
                    print(f"Verify error: {e}")
                    require("universalLogCallback")(2018)
            else:
                require("universalLogCallback")(2201)

        exports["verify"] = verify_func

    def verifyFailed(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """验证失败处理（前端逻辑，模拟注释）"""

        def verify_failed(error_code: Optional[int] = None):
            print(f"Verification failed with error: {error_code}")
            if error_code:
                require("getJgObj")()["data"]["error"](error_code)
            # 模拟页面刷新
            print("Simulating page reload")

        exports["verifyFailed"] = verify_failed

    def imageCheck(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """检查图片格式"""

        def image_check(url: str) -> bool:
            import re
            try:
                return bool(re.match(r".*\.(png|jpg|jpeg|webp)$", url, re.I))
            except Exception as e:
                print(f"Image check error: {e}")
                return False

        exports["imageCheck"] = image_check

    def enc(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """RSA 加密"""

        def encrypt(data: str) -> str:
            try:
                jg_obj = require("getJgObj")()
                public_key = base64.b64decode(jg_obj["vConfig"]["k"]).decode()
                rsa_key = RSA.import_key(public_key)
                cipher = PKCS1_v1_5.new(rsa_key)
                encrypted = cipher.encrypt(data.encode())
                return base64.b64encode(encrypted).decode() + hashlib.md5(
                    (jg_obj["vConfig"]["captchaId"] + jg_obj["vConfig"]["token"]).encode()
                ).hexdigest()
            except Exception as e:
                print(f"Encryption error: {e}")
                return ""

        exports["enc"] = encrypt

    def initTracking(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """初始化跟踪数据"""

        def init_tracking():
            try:
                jg_obj = require("getJgObj")()
                jg_obj["tracking"] = {
                    "UA": platform.platform(),
                    "Screen": [0, 0],  # 无法获取屏幕分辨率
                    "Language": platform.system()
                }
            except Exception as e:
                print(f"Tracking error: {e}")

        exports["initTracking"] = init_tracking

    def initReport(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """初始化报告数据"""

        def init_report():
            try:
                jg_obj = require("getJgObj")()
                jg_obj["rarr"] = [{}]
            except Exception as e:
                print(f"Report error: {e}")
                require("universalLogCallback")(2001)

        exports["initReport"] = init_report

    def setRPoint(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """设置报告点（前端逻辑，模拟注释）"""

        def set_r_point(point_name: str):
            jg_obj = require("getJgObj")()
            if point_name not in jg_obj["rarr"][0]:
                jg_obj["rarr"][0][point_name] = {
                    "t": int(time.time() * 1000),
                    "y": jg_obj.get("curPos", {}).get("y", 0)
                }

        exports["setRPoint"] = set_r_point

    def universalLogCallback(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """错误日志回调"""

        def universal_log_callback(errcode: int):
            jg_obj = require("getJgObj")()
            jg_obj["errcode"] = errcode
            print(f"Error occurred: {errcode}")
            jg_obj["data"]["error"](errcode)
            require("envCleaner")()

        exports["universalLogCallback"] = universal_log_callback

    def convertArray(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """数组转换"""

        def convert_array(arr: list, callback: Callable) -> list:
            return [callback(item, index) for index, item in enumerate(arr)]

        exports["convertArray"] = convert_array

    def checkIE(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """检查是否为 IE（Python 无需实现）"""

        def check_ie():
            return False  # Python 环境不是 IE

        exports["checkIE"] = check_ie

    def checkMobileEnv(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """检查移动环境（Python 模拟）"""

        def check_mobile_env():
            return "android" in platform.system().lower()

        exports["checkMobileEnv"] = check_mobile_env

    def checkAutomaticEnv(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """检查自动化环境（Python 模拟）"""

        def check_automatic_env():
            return False  # 假设非自动化环境

        exports["checkAutomaticEnv"] = check_automatic_env

    def getJgObj(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """获取全局对象"""

        def get_jg_obj():
            return _jg["captcha"]

        exports["getJgObj"] = get_jg_obj

    def removeFromArrayByName(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """从数组移除元素"""

        def remove_from_array_by_name(arr: list, item: Any) -> list:
            if item in arr:
                arr.remove(item)
            return arr

        exports["removeFromArrayByName"] = remove_from_array_by_name

    def parseJson(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """解析 JSON"""

        def parse_json(data: str) -> Dict[str, Any]:
            try:
                return json.loads(data)
            except json.JSONDecodeError as e:
                print(f"JSON parse error: {e}")
                return {"error": 2009}

        exports["parseJson"] = parse_json

    def checkPlatform(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """检查平台"""

        def check_platform():
            jg_obj = require("getJgObj")()
            plat = platform.system().lower()
            if plat.startswith("darwin"):
                jg_obj["platform"] = "apple"
            elif plat.startswith("win"):
                jg_obj["platform"] = "windows"
            elif plat.startswith("linux"):
                jg_obj["platform"] = "android" if "arm" in platform.machine() else "linux"
            else:
                jg_obj["platform"] = "unknown"

        exports["checkPlatform"] = check_platform

    def envCleaner(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """清理环境"""

        def env_cleaner(full: bool = False):
            jg_obj = require("getJgObj")()
            keys = ["tracking", "rarr", "curPos", "pos"]
            if full:
                keys.extend(["eles", "events", "vConfig"])
            for key in keys:
                jg_obj.pop(key, None)

        exports["envCleaner"] = env_cleaner

    def appendParams(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """拼接参数"""

        def append_params(params: Dict[str, Any]) -> str:
            return "&".join(f"{key}={requests.utils.quote(str(value))}" for key, value in params.items())

        exports["appendParams"] = append_params

    def httpRequest(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """HTTP 请求"""

        def http_request():
            class HttpRequest:
                @staticmethod
                def GET(url: str, headers: Dict[str, str], timeout: float, params: Dict[str, Any], callback: Callable):
                    try:
                        response = requests.get(url, params=params, headers=headers, timeout=timeout)
                        callback(response.text, response)
                    except Exception as e:
                        callback(json.dumps({"error": 2101, "msg": str(e)}), None)

                @staticmethod
                def POST(url: str, headers: Dict[str, str], timeout: float, data: Dict[str, Any], callback: Callable):
                    try:
                        response = requests.post(url, data=data, headers=headers, timeout=timeout)
                        callback(response.text, response)
                    except Exception as e:
                        callback(json.dumps({"error": 2101, "msg": str(e)}), None)

            return HttpRequest()

        exports["httpRequest"] = http_request


class CaptchaInterfaces:
    """验证码接口类"""

    def receiveData(self, module: Dict[str, Any], exports: Dict[str, Any], require: Callable) -> None:
        """接收数据"""

        def receive_data(data: Dict[str, Any]):
            result = {}
            if data.get("aid") and data.get("pn"):
                result.update(data)
            else:
                print("WebData is invalid!")
            require("getJgObj")()["data"] = result

        exports["receiveData"] = receive_data


# 初始化验证码系统
business = CaptchaBusiness()
interfaces = CaptchaInterfaces()

# 注册模块
module_funcs = {
    "binding": business.binding,
    "init": business.init,
    "containerInit": business.containerInit,
    "initLayout": business.initLayout,
    "initBasicConfig": business.initBasicConfig,
    "setRequestBody": business.setRequestBody,
    "requestAuth": business.requestAuth,
    "verify": business.verify,
    "verifyFailed": business.verifyFailed,
    "imageCheck": business.imageCheck,
    "enc": business.enc,
    "initTracking": business.initTracking,
    "initReport": business.initReport,
    "setRPoint": business.setRPoint,
    "universalLogCallback": business.universalLogCallback,
    "convertArray": business.convertArray,
    "checkIE": business.checkIE,
    "checkMobileEnv": business.checkMobileEnv,
    "checkAutomaticEnv": business.checkAutomaticEnv,
    "getJgObj": business.getJgObj,
    "removeFromArrayByName": business.removeFromArrayByName,
    "parseJson": business.parseJson,
    "checkPlatform": business.checkPlatform,
    "envCleaner": business.envCleaner,
    "appendParams": business.appendParams,
    "httpRequest": business.httpRequest,
    "receiveData": interfaces.receiveData
}

# 模拟 setCaptchaView
for name, func in module_funcs.items():
    load_module(name, func, name == "receiveData")

# 执行 binding
load_module("binding")()