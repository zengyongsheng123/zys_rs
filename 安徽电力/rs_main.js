delete __filename;
delete __dirname;
// delete process;
// delete global;

function watch(obj, name) {
    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                if (typeof target[property] === "function") {
                    console.log("对象 => " + name + ",读取属性:" + property + ",值为:" + 'function' + ",类型为:" + (typeof target[property]))
                } else {
                    console.log("对象 => " + name + ",读取属性:" + property + ",值为:" + target[property] + ",类型为:" + (typeof target[property]))
                }
            } catch (e) {
            }
            return target[property]
        },
        set: (target, property, newValue, receiver) => {
            try {
                console.log("对象 => " + name + ",设置属性:" + property + ",值为:" + newValue + ",类型为:" + (typeof newValue))
            } catch (e) {
            }
            return Reflect.set(target, property, newValue, receiver)
        }
    })
}
function get_enviroment(proxy_array) {
    for (var i = 0; i < proxy_array.length; i++) {
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            // 'if (typeof target[property] == "undefined"){debugger}' +
            '        return target[property];\n' +
            '    },\n' +
            '    set: function(target, property, value, receiver) {\n' +
            '        console.log("方法:", "set  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return Reflect.set(...arguments);\n' +
            '    }\n' +
            '}'
        eval('try{\n' + proxy_array[i] + ';\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
    }
}
var content="OHXgdazrh0Ro8QiTYZ5sI00m5XeTuBC1D89xVXhO3Ymn2oZR49bO6UW50TYjKj4xapti_4g1s0MsJ.mD2dvoh0Dzc3OTtOqap57ENxGrTwtHr4qcVyNVCZlRU1QkYhx5"
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen', "localStorage", "sessionStorage"]
window = global;
window.top = window;
window.self = window;

function Window() {}
window.Window = Window;

location = {
    "ancestorOrigins": {},
    "href": "https://pmos.ah.sgcc.com.cn:20080/#/outNet",
    "origin": "https://pmos.ah.sgcc.com.cn:20080",
    "protocol": "https:",
    "host": "pmos.ah.sgcc.com.cn:20080",
    "hostname": "pmos.ah.sgcc.com.cn",
    "port": "20080",
    "pathname": "/",
    "search": "",
    "hash": "#/outNet"
};

navigator={
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    cookieEnabled: true,
    doNotTrack: null,
    hardwareConcurrency: 12,
    language: "zh-CN",
    languages:["zh-CN", "zh"],
    maxTouchPoints: 0,
    onLine: true,
    pdfViewerEnabled: true,
    platform: "Win32",
    plugins: {
        length: 4,
        [Symbol.toStringTag]:'PluginArray',
        0:{
            name:'PDF Viewer',
            [Symbol.toStringTag]:'Plugin',
            length:2
        },
        1:{
            name:'ff_ss',
            [Symbol.toStringTag]:'Plugin',
            length:2
        },
        2:{
            name:'ss_ff',
            [Symbol.toStringTag]:'Plugin',
            length:2
        },
        3:{
            name:'FFloveSS',
            [Symbol.toStringTag]:'Plugin',
            length:2
        },
    },
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver: false,
    mimeTypes: {
    "0": {},
    "1": {},
   "application/pdf": {
        description:"Portable Document Format",
        suffixes: "pdf",
        type:"application/pdf"
   },
   "text/pdf": {},
},
};


window.addEventListener = function (args) {
    console.log("---------->window的addEventListener--->", args)
};
window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
window.HTMLFormElement = function () {
    console.log('window的XMLHttpRequest的参数', arguments)
}
window.ActiveXObject=function (){
    console.log("window的ActiveXObject",arguments)
};
window.WebSocket=function (){
    console.log("window的WebSocket",arguments)
};
window.HTMLCanvasElement=function (){
    console.log("window的HTMLCanvasElement",arguments)
    return {
        toString:function (){
            console.log("window的CanvasRenderingContext2D的toString方法")
        },
    }
};
window.CanvasRenderingContext2D=function (){
    console.log("window的CanvasRenderingContext2D",arguments)
    return {
        toString:function (){
            console.log("window的CanvasRenderingContext2D的toString方法")
        },
    }
};
window.PointerEvent=function (){
    console.log("window的PointerEvent",arguments)
};
window.indexedDB={};
window.webkitRequestFileSystem=function (){
    console.log("window的webkitRequestFileSystem",arguments)
};
window.open=function (){};
window.Navigator=function (){
    console.log("window的Navigator",arguments)
};

window.__proto__=Window.prototype;

document = {
    createElement: function (args) {
        console.log("---------->document的createElement--->", args)
        if (args === "div") {
            return {
                style:{
                    visibility:'hidden',
                    position:'absolute',
                },
                getElementsByTagName: function (args) {
                    console.log("---------->div的getElementsByTagName--->", args)
                    if (args === "i") {
                        return []
                    }
                },
                setAttribute: function (arg, arg1) {
                    console.log("div标签的setAttribute方法接受的参数====>",arg,arg1)
                },
            }
        }
        if (args === "form") {
            return {}
        }
        if (args === "a") {
            return {
                "pathname": location.pathname,
                "search": location.search,
                "hash": location.hash,
                "href": location.href,
                "origin": location.origin,
                "protocol": location.protocol,
                "host": location.host,
                "hostname": location.hostname,
                "port": location.port,
            }
        }
        if (args === "input") {
            return {}
        }
    },
    getElementsByTagName: function (args) {
        console.log("---------->document的getElementsByTagName--->", args)
        if (args === "base") {
            return []
        }
        if (args === "script") {
            return {}
        }
        if(args==="meta"){
            return [
                {
                    'http-equiv': 'Content-Type',
                    content: 'text/html; charset=utf-8',
                    getAttribute: function (res) {
                        console.log('meta中getAttribute接收到的参数为：', res)
                    },
                },
                {
                    content: content,
                    parentNode: {
                        removeChild: function () {
                        }
                    },
                    getAttribute: function (res) {
                        console.log('meta中getAttribute接收到的参数为：', res)
                    },
                }
            ]
        }
    },
    getElementById: function (args) {
        console.log("---------->document的getElementById--->", args)
    },
    addEventListener: function (args) {
        console.log("---------->document的addEventListener--->", args)
    },
    attachEvent: function (args) {
        console.log("---------->document的attachEvent--->",args)
     },
    visibilityState:'visible',
    body: function (arg){console.log('document的body获取参数====>',arg)},
    documentElement: {
        appendChild: function () {
            console.log('document的documentElement的参数', arguments)
        },
        style:{},
        getAttribute: function () {
            console.log('document.documentElement的getAttribute获取参数:', arguments)
        },
    },
    all:{length:0},
    createExpression: function (args) {
        console.log("---------->document的createExpression--->", args)
    },
    appendChild: function () {
        console.log('document的appendChild的参数', arguments)
    },
    removeChild: function () {
        console.log('document的removeChild的参数', arguments)
    },
};


localStorage={
    "$_YWTU": "OqxB5t9YmhbYwUOfjJ8dGPSM2XtcRXgPevX4gVPErA7",
    "_$rc": "f7RqmjocaJzlZCxCD_H6YOI7LNiOZf18isTnbngYKAwo6DcBCk6bw1Dl84UCYB6lbnzUbGqwEIC9_PWYBdCQApSGXRCm_jBY5PGpw2RvTVii8dUeEvmwVkAQoB.CUvmHPVPpw1esZoUgBp7dYq2Vlm1ivIBVJSeqyWHo6toxxgLxd0_sAh8IBtZYCmlD5gBB0HZg5fF54.b213ANhgMUFzrtiGxAdwr7aqLiBq.ndbwDAuklZjR2qzzbT1TVErVFJSghiSgo0cFeNMbsc1o0ZPBAh61FCU1lTYR55u5mBi.L3OCtLjdzde1vr44nVbPoBj0s9K_virIoqfBJr0buSiAfbfE40qHkaZ3KN_34WJoMnPJqTsyx3MKjRteMR7HtBFpIVpLgWDzm0RC.h1_pnR00hBJkTuuI1LAyLjwHIUqIPg79VXInJcfWN3QmH0rip9xvkUUaXWf2XAOngxU7F6jL_CcrElOV1dqRkD.jHjlPix5uYfOwKAPYAznxBBExVGwIaywcj7eWKEcEYbzJgmAGNjyKljtXn0dGAt.DgRCzku.WMM4LKCtIrqCcFAaL50jFOadxnMsHRokk5f5wQt6w2850tFcQ_taeCWgWaovZDDkIGJ8jexs98sunMOnFceRa6sDMqXkraee.qunPUKY9hu6etQfaedDTQGF7TRB6N4GQlQRguuK4q.Qy0oJ0q2Xht9pY.LHwBLaINTCiVId55iFtthIs1ioZhu0es3dwRaDNob5PvxhUMs7",
    "__#classType": "localStorage",
    "$_YVTX": "WA",


    // 方法
    removeItem: function (arg) {
        console.log('window的localStorage的removeItem接受的参数======>', arg);
    },
    setItem: function (key, value) {
        console.log('window的localStorage的setItem接受的参数======>', key);
        localStorage.key = value;
    },
    getItem: function (key) {
        console.log('window的localStorage的getItem接受的参数======>', key);
        if (key === "$_YWTU") {
            return localStorage.$_YWTU;
        }
        if (key === "$_rc") {
            return localStorage.$_rc;
        }
    },
    clear: function (arg) {
        console.log('window的localStorage的clear接受的参数:', arg);
    },
    key: function (arg) {
        console.log('window的localStorage的key接受的参数======>', arg);
    }
};
sessionStorage={
    "passPaths": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-extendFieldMap": "[object Object]",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-temporaryAddress": "",
    "skipShowMessageList": "",
    "systemStatus": "RUNNING",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-APILIST-version": "v1",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-digest": "false",
    "iscVersion": "v3",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-checkInterfaceGoToList": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-skipShowMessageList": "",
    "marketIpMap": "[object Object]",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-noCacheIframeList": "",
    "alertError": "false",
    "defaultMenuSwitch": "true",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-outNetHide": "false",
    "marketId": "PHDAH",
    "noCacheIframeList": "",
    "enabled": "false",
    "oldIframeUrl": "",
    "OutLoginType": "NewLogin",
    "outNetHide": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-APILIST-enabled": "false",
    "timeout": "60",
    "routeWhiteList": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-iscAddress": "http://iscsso.ah.sgcc.com.cn/isc_sso",
    "checkInterfaceGoToList": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-systemStatus": "RUNNING",
    "version": "v1",
    "getToken": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-routeWhiteList": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-iscVersion": "v3",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-personalSwitch": "true",
    "concealInfo": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-userInfo-clientTag": "OUTNET_BROWSE",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-oldMsgSwitch": "true",
    "menuSwitch": "false",
    "digest": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-defaultMenuSwitch": "true",
    "temporaryAddress": "",
    "oldOutIframeUrl": "",
    "batchTokenSwitch": "false",
    "personalSwitch": "true",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-marketId": "PHDAH",
    "gatewayExpirationTime": "1743158862356",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-formalAddress": "/pxf-service-omarketservice/LoginFormal",
    "$_YWTU": "OqxB5t9YmhbYwUOfjJ8dGPSM2XtcRXgPevX4gVPErA7",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-mpushShow": "true",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-menuSwitch": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-": "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-",
    "extendFieldMap": "{\"registerUserTypeList\":\"[\\\"30\\\",\\\"70\\\",\\\"80\\\"]\",\"enterpriseCredit\":\"/pxf-compliance-outnetpub/enterpriseCreditQueryHome\",\"legalAuthorityUserInfoWordTip\":\"个人信息。第二行。\",\"QRcodeListRight\":\"[{\\\"src\\\":\\\"/pxf-common-static/new_image/QR_others/12398.jpg\\\",\\\"description\\\":\\\"能源监管局微信公众号\\\"},{\\\"src\\\":\\\"/pxf-common-static/new_image/QR_others/loginApp.jpg\\\",\\\"description\\\":\\\"能源监管局APP\\\"}]\",\"QRTipRight\":\"国家能源局监管热线：12398\",\"QRcodeListLeft\":\"[{\\\"src\\\":\\\"/pxf-private-static/erweima.png\\\",\\\"description\\\":\\\"安徽电力交易公众号\\\"},{\\\"src\\\":\\\"/pxf-common-static/new_image/QR_others/tradeApp.jpg\\\",\\\"description\\\":\\\"E交易APP\\\"}]\",\"bayMessage\":\"为落实《中华人民共和国网络安全法》、《互联网用户账号信息管理规定》网信办令[2022]10号等国家监管部门有关网络实名制管理要求，保证用户账号使用安全，安徽电力交易平台将全面开启双因子认证登录和账号实名制，其中双因子认证包括密码+Ukey、密码+短信、密码+电子营业执照三种方式。为确保账号正常使用，请提前登录平台访问个人中心，确认已绑定手机号码是否正常使用，补充企业和个人实名信息，完成企业和个人实名。提醒：个人实名时，身份证号码是办理手机号码填写的身份证号码。如遇相关问题请联系,业务咨询电话：0551-63402298；技术支持电话：0551-63402478。\",\"loginWord\":\"\",\"footWebsiteData\":\"[{\\\"value\\\":\\\"国家发改委\\\",\\\"href\\\":\\\"http://www.ndrc.gov.cn/\\\"},{\\\"value\\\":\\\"国资委\\\",\\\"href\\\":\\\"http://www.sasac.gov.cn/\\\"},{\\\"value\\\":\\\"国家能源局\\\",\\\"href\\\":\\\"http://www.nea.gov.cn/\\\"},{\\\"value\\\":\\\"中国电力企业联合会\\\",\\\"href\\\":\\\"http://www.cec.org.cn/\\\"},{\\\"value\\\":\\\"国家电网公司\\\",\\\"href\\\":\\\"http://www.sgcc.com.cn/\\\"},{\\\"value\\\":\\\"信用中国\\\",\\\"href\\\":\\\"https://www.creditchina.gov.cn/\\\"},{\\\"value\\\":\\\"12398能源监管热线\\\",\\\"href\\\":\\\"http://www.nea.gov.cn/ztzl/12398nyjgrx/\\\"}]\",\"carouselData\":\"[{\\\"title\\\":\\\"企业信用查询\\\",\\\"imgSrc\\\":null,\\\"path\\\":\\\"/pxf-compliance-sxoutnetcreditrating-fdqy/enterpriseCreditQueryHome\\\"},{\\\"title\\\":\\\"交易动态\\\",\\\"imgSrc\\\":null,\\\"path\\\":\\\"/pxf-settlement-outnetpub/columnHomeLeftMenuNew?guid=b3448aae-4489-418e-9fec-65715840ddb9\\\"},{\\\"title\\\":\\\"信息披露\\\",\\\"imgSrc\\\":\\\"https://pmos.ah.sgcc.com.cn:20080/pxf-common-static/image/carousel/msgPublish.png\\\",\\\"path\\\":\\\"/pxf-settlement-outnetpub/columnHomeLeftMenuNew\\\"},{\\\"title\\\":\\\"年度公示\\\",\\\"imgSrc\\\":\\\"https://pmos.ah.sgcc.com.cn:20080/pxf-common-static/image/carousel/marketTwo.png\\\",\\\"path\\\":\\\"/pxf-service-omarketservice/yearPublicInfo\\\"},{\\\"title\\\":\\\"注册公示\\\",\\\"imgSrc\\\":\\\"https://pmos.ah.sgcc.com.cn:20080/pxf-common-static/image/carousel/marketTwo.png\\\",\\\"path\\\":\\\"/pxf-service-omarketservice/publicInfo\\\"}]\",\"findPasswordByLagalWordTip\":\"找回密码。第二行。\",\"loginPage\":\"安徽电力交易中心投诉举报邮箱:dljyzx@ah.sgcc.com.cn  地址:安徽省合肥市芜湖路415号\",\"legalRiskWarningTips\":\"注册法人授权弹窗上方蓝色文案采访可添加风险提示。\",\"tradeImgUrl\":\"/pxf-private-static/erweima.png\",\"openPlatformShow\":\"true\",\"recordUrl\":\"https://beian.miit.gov.cn\",\"bayWindow\":\"true\",\"QRTipLeft\":\"电力交易服务热线：4001895598\",\"realNameShow\":\"true\",\"registerAddress\":\"\",\"legalAuthorityWordTip\":\"法人授权进度。第二行。\",\"bayAddress\":\"\",\"loginText\":\"\",\"setBusinessManagerWordTip\":\"个人中心。第二行。\",\"registerRiskWarningTips\":\"新版本注册上方风险提示。\"}",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-APILIST-timeout": "60",
    "$_YVTX": "WA",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-APILIST-passPaths": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-APILIST-": "[object Object]",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-oldIframeUrl": "",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-batchTokenSwitch": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-concealInfo": "false",
    "mpushShow": "true",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-getToken": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-oldOutIframeUrl": "",
    "oldMsgSwitch": "true",
    "formalAddress": "/pxf-service-omarketservice/LoginFormal",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-alertError": "false",
    "KUANGJIAZU-PXF-COMMON-PORTAL-SESSION-marketIpMap": "[object Object]",
    "iscAddress": "http://iscsso.ah.sgcc.com.cn/isc_sso",


    // //方法
    removeItem: function (arg) {
        console.log('window的sessionStorage的removeItem接受的参数======>', arg);
    },
    setItem: function (key, value) {
        console.log('window的sessionStorage的setItem接受的参数======>', arg);
        sessionStorage.key = value;
    },
    getItem: function (key) {
        console.log('window的sessionStorage的getItem接受的参数======>', key);
        if (key === "$_YWTU") {
            return sessionStorage.$_YWTU;
        }
    },
    clear: function (arg) {
        console.log('window的sessionStorage的clear接受的参数:', arg);
    },
    key: function (arg) {
        console.log('window的sessionStorage的key接受的参数======>', arg);
    }
};
history={};
screen={};
setInterval = function(){};
setTimeout = function(){};

// window=watch(window, "window对象");
// document=watch(document,"document对象");
// navigator=watch(navigator,"navigator对象");
// location=watch(location,"location对象");
// history=watch(history,"history对象");
// screen=watch(screen,"screen对象");
// localStorage=watch(localStorage,"localStorage对象");
// sessionStorage=watch(sessionStorage,"sessionStorage对象");
get_enviroment(proxy_array);

require('./rs_ts');
require('./rs_func');

function get_cookie() {
    ck=document.cookie;
    ck_length=ck.split(';')[0].split('=')[1].length;
    console.log('cookie长度=======>',ck_length);
    return ck;
}
console.log(get_cookie());
