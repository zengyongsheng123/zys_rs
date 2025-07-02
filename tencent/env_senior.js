/*****
File：env_senior.py
Author：南宫啸天
Date：2025/3/9 20:53
*****/
//如果代理函数的时候，打印了函数的所有内容了，证明没有保护该函数
ffglobal = {};
//描述符检测，函数toString检测
!(() => {
    "use strict";
    const $toString = Function.toString;  //hook Function.toString 且命名为myToString
    //变量名取随机数防检测
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const myToString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);   //谁调用这个方法,this就是谁,比如boda调用,这个this就是boda
    };

    function set_native(func, key, value) {
        //定义描述符
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    };
    delete Function.prototype['toString']; //删除原型链上的toString
    set_native(Function.prototype, "toString", myToString); //自己定义个getter方法
    //myToString的 myFunction_toString_symbol属性设置为  function toString() { [native code] }
    //myFunction_toString_symbol= function toString() { [native code] }
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }"); //套个娃 保护一下我们定义的toString 否则就暴露了
    ffglobal.safefunction = (func, name) => {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, name || ''}() { [native code] }`);
        set_native(func, 'name', `${myFunction_toString_symbol, name || ''}`);
        // }
    }; //导出函数到globalThis
}).call(this);
//对象标识符检测
ffglobal.reNameObj = function reNameObj(obj, obname) {
    Object.defineProperty(obj.prototype, Symbol.toStringTag, {
        value: obname,
        configurable: true,
        writable: false,
        enumerable: false
    })
};

/////============================
window = globalThis;
delete global;
delete Buffer;
delete process;
delete __dirname;
delete __filename;
Object.assign(window, {
    outerHeight: 901,
    outerWidth: 1412,
    chrome: {},
    setTimeout: function () {
    },
    setInterval: function () {
    },
    TCaptchaReferrer: 'https://cloud.tencent.com/product/captcha',
    CSS: {},
    innerHeight: 360,
    innerWidth: 360,
})
document = {
    documentElement: {
        clientWidth: 360,
    },
    body: {
        clientWidth: 360,
        appendChild: function () {
        },
        removeChild: function () {
        },
    },
    location: {
        "ancestorOrigins": {
            "0": "https://cloud.tencent.com"
        },
        "href": "https://turing.captcha.gtimg.com/1/template/drag_ele.html",
        "origin": "https://turing.captcha.gtimg.com",
        "protocol": "https:",
        "host": "turing.captcha.gtimg.com",
        "hostname": "turing.captcha.gtimg.com",
        "port": "",
        "pathname": "/1/template/drag_ele.html",
        "search": "",
        "hash": ""
    },
    cookie: '',
    charset: 'UTF-8',
    characterSet: 'UTF-8',
};
location = {
    "ancestorOrigins": {
        "0": "https://cloud.tencent.com"
    },
    "href": "https://turing.captcha.gtimg.com/1/template/drag_ele.html",
    "origin": "https://turing.captcha.gtimg.com",
    "protocol": "https:",
    "host": "turing.captcha.gtimg.com",
    "hostname": "turing.captcha.gtimg.com",
    "port": "",
    "pathname": "/1/template/drag_ele.html",
    "search": "",
    "hash": ""
};
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    cookieEnabled: true,
    doNotTrack: null,
    hardwareConcurrency: 12,
    language: "zh-CN",
    languages: ["zh-CN", "zh"],
    maxTouchPoints: 0,
    onLine: true,
    pdfViewerEnabled: true,
    platform: "Win32",
    plugins: {
        length: 4,
        [Symbol.toStringTag]: 'PluginArray',
        0: {
            name: 'PDF Viewer',
            [Symbol.toStringTag]: 'Plugin',
            length: 2
        },
        1: {
            name: 'ff_ss',
            [Symbol.toStringTag]: 'Plugin',
            length: 2
        },
        2: {
            name: 'ss_ff',
            [Symbol.toStringTag]: 'Plugin',
            length: 2
        },
        3: {
            name: 'FFloveSS',
            [Symbol.toStringTag]: 'Plugin',
            length: 2
        },
    },
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver: false,
};
history = {};
screen = {
    availHeight: 901,
    availLeft: 0,
    availTop: 0,
    availWidth: 1412,
    colorDepth: 24,
    height: 942,
    pixelDepth: 24,
    width: 1412,
};
localStorage = {
    getItem: function (key) {
        console.log("localStorage.getItem==>", key);
        if (key === "TDC_itoken") {
            return "893410591:1735177165"
        }
    },
    setItem: function (key, value) {
        console.log("localStorage.setItem==>", key, value);
        localStorage[key] = value;
    },
    removeItem: function (key) {
        console.log("localStorage.removeItem==>", key);
    },
    clear: function () {
        console.log("localStorage.clear==>");
    },
    key: function (index) {
    },
    sto: {
        "TDC_itoken": "893410591:1735177165"
    },
    TDC_itoken: ""
};
sessionStorage = {
    getItem: function (key) {
        console.log("sessionStorage.getItem==>", key);
        return null
    },
    setItem: function (key, value) {
        console.log("sessionStorage.setItem==>", key, value);
    },
    removeItem: function (key) {
        console.log("sessionStorage.removeItem==>", key);
    },
    clear: function () {
        console.log("sessionStorage.clear==>");
    },
    key: function (index) {
    }
};
/////============================
//这里面全是函数了，下面是demo
/////=========函数集合地===================
//window////////
window.addEventListener = function addEventListener(arg) {
    console.log('window中的addEventListener的参数为==>', arg);
};
ffglobal.safefunction(window.addEventListener, 'addEventListener');
window.webkitRTCPeerConnection = function webkitRTCPeerConnection(arg) {
    console.log('window中的webkitRTCPeerConnection的参数为==>', arg);
};
ffglobal.safefunction(window.webkitRTCPeerConnection, 'webkitRTCPeerConnection');
window.RTCPeerConnection = function RTCPeerConnection(arg) {
    console.log('window中的RTCPeerConnection的参数为==>', arg);
    return {
        createDataChannel: function (arg) {
            console.log('RTCPeerConnection中的createDataChannel的参数为==>', arg);
        },
        createOffer: function (arg) {
            console.log('RTCPeerConnection中的createOffer的参数为==>', arg);
            return {
                then: function (arg) {
                    console.log('RTCPeerConnection中的createOffer的then的参数为==>', arg);
                }
            }
        }
    }
};
ffglobal.safefunction(window.RTCPeerConnection, 'RTCPeerConnection');
window.matchMedia = function matchMedia(arg) {
    console.log('window中的matchMedia的参数为==>', arg);
};
ffglobal.safefunction(window.matchMedia, 'matchMedia');
//标签
_div = {
    appendChild: function (arg) {
        console.log('div中的appendChild的参数为==>', arg);
    },
    cloneNode: function (arg) {
        console.log('div中的cloneNode的参数为==>', arg);
    },
    insertBefore: function (arg) {
        console.log('div中的insertBefore的参数为==>', arg);
    },
    outerHTML: '<div></div>',
    innerHTML: '',
    style: {
        innerHTML:""
    },
    createElement: function (arg) {
        console.log('div中的createElement的参数为==>', arg);
    },
};
_span = {
    setAttribute: function (arg) {
        console.log('span中的setAttribute的参数为==>', arg);
    },
    removeAttribute: function (arg) {
        console.log('span中的removeAttribute的参数为==>', arg);
    },
    removeChild: function (arg) {
        console.log('span中的removeChild的参数为==>', arg);
    },
    appendChild: function (arg) {
        console.log('span中的appendChild的参数为==>', arg);
    },
};
_p = {};
_iframe = {
    style: {},
    contentWindow:{
        top:{},
        document:{},
    },
};
_style = {
    innerHTML:"",
};
_a={}
_h1={}
//指纹
_webgl = {
    drawingBufferColorSpace: "srgb",
    drawingBufferFormat: 32856,
    drawingBufferHeight: 150,
    drawingBufferWidth: 300,
    unpackColorSpace: "srgb",
    getSupportedExtensions: function (arg) {
        console.log("canvas中的webgl的getSupportedExtensions==>", arg);
        return [
            "ANGLE_instanced_arrays",
            "EXT_blend_minmax",
            "EXT_clip_control",
            "EXT_color_buffer_half_float",
            "EXT_depth_clamp",
            "EXT_disjoint_timer_query",
            "EXT_float_blend",
            "EXT_frag_depth",
            "EXT_polygon_offset_clamp",
            "EXT_shader_texture_lod",
            "EXT_texture_compression_bptc",
            "EXT_texture_compression_rgtc",
            "EXT_texture_filter_anisotropic",
            "EXT_texture_mirror_clamp_to_edge",
            "EXT_sRGB",
            "KHR_parallel_shader_compile",
            "OES_element_index_uint",
            "OES_fbo_render_mipmap",
            "OES_standard_derivatives",
            "OES_texture_float",
            "OES_texture_float_linear",
            "OES_texture_half_float",
            "OES_texture_half_float_linear",
            "OES_vertex_array_object",
            "WEBGL_blend_func_extended",
            "WEBGL_color_buffer_float",
            "WEBGL_compressed_texture_s3tc",
            "WEBGL_compressed_texture_s3tc_srgb",
            "WEBGL_debug_renderer_info",
            "WEBGL_debug_shaders",
            "WEBGL_depth_texture",
            "WEBGL_draw_buffers",
            "WEBGL_lose_context",
            "WEBGL_multi_draw",
            "WEBGL_polygon_mode"
        ]
    },
    getExtension: function (arg) {
        console.log("canvas中的webgl的getExtension==>", arg);
        if (arg === "WEBGL_debug_renderer_info") {
            return {
                UNMASKED_RENDERER_WEBGL: 37446,
                UNMASKED_VENDOR_WEBGL: 37445,
            }
        }
    },
    getParameter: function (arg) {
        console.log("canvas中的webgl的getParameter==>", arg);
        return {
            replace: function (arg) {
                console.log("canvas中的webgl的getParameter中的replace==>", arg);
                return {
                    replace: function (arg) {
                        console.log("canvas中的webgl的getParameter中的replace中的replace==>", arg);
                        return {
                            replace: function (arg) {
                                console.log("canvas中的webgl的getParameter中的replace中的replace中的replace==>", arg);
                                return {
                                    replace: function (arg) {
                                        console.log("canvas中的webgl的getParameter中的replace中的replace中的replace中的replace==>", arg);
                                        return {

                                        }
                                    }
                                }
                            }
                        }
                    }
                };
            }
        }
    },
};
_2d = {
    direction: "ltr",
    fillStyle: "#000000",
    filter: "none",
    font: "10px sans-serif", fontKerning: "auto",
    fontStretch: "normal",
    fontVariantCaps: "normal",
    globalAlpha: 1,
    globalCompositeOperation: "source-over",
    imageSmoothingEnabled: true,
    imageSmoothingQuality: "low",
    letterSpacing: "0px",
    lineCap: "butt",
    lineDashOffset: 0,
    lineJoin: "miter",
    lineWidth: 1,
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: "rgba(0, 0, 0, 0)",
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: "#000000",
    textAlign: "start",
    textBaseline: "alphabetic",
    textRendering: "auto",
    wordSpacing: "0px",
    fillRect: function (arg) {
        console.log("canvas中的2d的fillRect==>", arg);
    },
    fillText: function (arg) {
        console.log("canvas中的2d的fillText==>", arg);
    },
};
_canvas = {
    getContext: function (arg) {
        console.log("canvas中的getContext==>", arg);
        if (arg === 'webgl') {
            return _webgl;
        }
        if (arg === '2d') {
            return _2d;
        }
    },
    toDataURL: function (arg) {
        console.log("canvas中的toDataURL==>", arg);
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==";
    },
};
//document的地方/////
document.createElement = function createElement(tagName) {
    console.log("document.createElement==>", tagName);
    if (tagName === 'canvas') {
        return _canvas
    }
    if (tagName === 'div') {
        return _div
    }
    if (tagName === 'span') {
        return _span
    }
    if (tagName === 'p') {
        return _p
    }
    if (tagName === 'iframe') {
        return _iframe
    }
    if(tagName==='a'){return _a}
    if(tagName==='h1'){return _h1}
};
ffglobal.safefunction(document.createElement, 'createElement');
document.addEventListener = function addEventListener(arg) {
    console.log('document中的addEventListener的参数为==>', arg);
};
ffglobal.safefunction(document.addEventListener, 'addEventListener')
_preview={
    innerHTML:"",
    captureStream:{},
    mozCaptureStream:{},
    msCaptureStream:{},
    webkitCaptureStream:{},

}
_tCaptchaDyContent={
    innerHTML:"",
    addEventListener:function(arg){
        console.log('_tCaptchaDyContent的addEventListener的参数为==>', arg);
    },
    clientWidth:"",
    clientHeight:"",
}
document.getElementById = function (arg) {
    console.log('document中的getElementById的参数为==>', arg);
    if(arg==="preview"){
        return _preview;
    }
    if(arg==="tCaptchaDyContent"){
        return _tCaptchaDyContent;
    }
};
ffglobal.safefunction(document.getElementById, 'getElementById')
//==========================================================================================================
//===========代理===============
let count = 0;
let skipCount = 0; // 设置你想跳过的打印次数
// 你可以定义一个数组，用来存放你想要忽略的属性名
// let ignoreList = ["document","navigator","location","localStorage","sessionStorage","screen","window","location"];
let ignoreList = ["encodeURIComponent"];

function proxy(obj, objName) {
    let printedProps = new Set();  // 用 Set 来保存已经打印过的属性名,过滤掉重复属性
    let handler = {
        get(target, prop, receiver) {
            // 你可以检查 prop 是否在忽略列表中，如果是，就直接返回原始值，不进行拦截
            if (ignoreList.includes(prop)) {
                return Reflect.get(target, prop, receiver);
            }
            if (prop === "prototype") {
                return target.prototype;
            }
            // 其他部分不变
            if (!printedProps.has(prop)) {
                let result = Reflect.get(target, prop, receiver);
                count++;
                if (typeof result === 'function') {
                    if (result.toString().length <= 60) {
                        // 检查是否跳过打印
                        if (skipCount > 0) {
                            skipCount--;
                        } else {
                            console.log('计数:', count, '[' + objName + ']', '获取属性', prop, '   [FF函数经过]=>', result.toString());
                        }
                    } else {
                        // 检查是否跳过打印
                        if (skipCount > 0) {
                            skipCount--;
                        } else {
                            console.log('计数:', count, '[' + objName + ']', '获取属性(===toString值太长===):', prop);
                        }
                    }
                    result = proxy(result, objName + '.' + prop);  // 对函数属性进行递归代理
                } else if (typeof result === "object" && result !== null && result !== undefined) {
                    if (result.toString().length <= 60) {
                        // 检查是否跳过打印
                        if (skipCount > 0) {
                            skipCount--;
                        } else {
                            console.log('计数:', count, '[' + objName + ']', '获取属性', prop, '   [OO对象经过]=>', result.toString());
                        }
                    } else {
                        // 检查是否跳过打印
                        if (skipCount > 0) {
                            skipCount--;
                        } else {
                            console.log('计数:', count, '[' + objName + ']', '获取属性(===toString值太长===):', prop);
                        }
                    }
                    result = proxy(result, objName + '.' + prop);  // 对对象属性进行递归代理
                } else {
                    // 检查是否跳过打印
                    if (skipCount > 0) {
                        skipCount--;
                    } else {
                        console.log('计数:', count, '[' + objName + ']', '获取属性', prop, '   [值为]=>', result);
                    }
                }
                printedProps.add(prop);  // 记录已经打印过的属性
                return result
            }
            return Reflect.get(target, prop, receiver);
        },
        set(target, propKey, value, receiver) {
            // 同样，你可以检查 propKey 是否在忽略列表中，如果是，就直接返回原始值，不进行拦截
            if (ignoreList.includes(propKey)) {
                return Reflect.set(target, propKey, value, receiver);
            }
            // 其他部分不变
            if (!printedProps.has(propKey)) {
                count++;
                if (typeof value === 'function') {
                    if (value.toString().length <= 60) {
                        // 检查是否跳过打印
                        if (skipCount > 0) {
                            skipCount--;
                        } else {
                            console.log('计数:', count, '[' + objName + ']', "  设置属性:", propKey, "   value:   ", value.toString())
                        }
                    } else {
                        // 检查是否跳过打印
                        if (skipCount > 0) {
                            skipCount--;
                        } else {
                            console.log('计数:', count, '[' + objName + ']', "  设置属性(===toString值太长===):", propKey)
                        }
                    }
                } else {
                    // 检查是否跳过打印
                    if (skipCount > 0) {
                        skipCount--;
                    } else {
                        console.log('计数:', count, '[' + objName + ']', "  设置属性:", propKey, "   value:   ", value);
                    }
                }
                printedProps.add(propKey);  // 记录已经打印过的属性
            }
            return Reflect.set(target, propKey, value, receiver);
        }
    };
    return new Proxy(obj, handler);
}

/////=========构造函数============
Window = function Window() {};
ffglobal.reNameObj(Window, 'Window');
Document = function Document() {};
ffglobal.reNameObj(Document, 'Document');
HTMLDocument = function HTMLDocument() {};
ffglobal.reNameObj(HTMLDocument, 'HTMLDocument');
Location = function Location() {};
ffglobal.reNameObj(Location, 'Location');
History = function History() {};
ffglobal.reNameObj(History, 'History');
Navigator = function Navigator() {};
ffglobal.reNameObj(Navigator, 'Navigator');
Screen = function Screen() {};
ffglobal.reNameObj(Screen, 'Screen');
Storage = function Storage() {};
ffglobal.reNameObj(Storage, 'Storage');
//dom
HTMLDivElement = function HTMLDivElement() {};
ffglobal.reNameObj(HTMLDivElement, 'HTMLDivElement');
HTMLIFrameElement = function HTMLIFrameElement() {};
ffglobal.reNameObj(HTMLIFrameElement, 'HTMLIFrameElement');
HTMLSpanElement = function HTMLSpanElement() {};
ffglobal.reNameObj(HTMLSpanElement, 'HTMLSpanElement');
HTMLParagraphElement = function HTMLParagraphElement() {};
ffglobal.reNameObj(HTMLParagraphElement, 'HTMLParagraphElement');
HTMLCanvasElement = function HTMLCanvasElement() {};
ffglobal.reNameObj(HTMLCanvasElement, 'HTMLCanvasElement');
HTMLStyleElement = function HTMLStyleElement() {};
ffglobal.reNameObj(HTMLStyleElement, 'HTMLStyleElement');
HTMLAnchorElement= function HTMLAnchorElement() {};
ffglobal.reNameObj(HTMLAnchorElement, 'HTMLAnchorElement');
HTMLHeadingElement= function HTMLHeadingElement() {};
ffglobal.reNameObj(HTMLHeadingElement, 'HTMLHeadingElement');
//指纹
WebGLRenderingContext= function WebGLRenderingContext() {};
ffglobal.reNameObj(WebGLRenderingContext, 'WebGLRenderingContext');
CanvasRenderingContext2D= function CanvasRenderingContext2D() {};
ffglobal.reNameObj(CanvasRenderingContext2D, 'CanvasRenderingContext2D');
////================原型绑定================///////
window.__proto__ = Window.prototype;
document.__proto__ = HTMLDocument.prototype;
HTMLDocument.prototype.__proto__ = Document.prototype;
location.__proto__ = Location.prototype;
history.__proto__ = History.prototype;
navigator.__proto__ = Navigator.prototype;
screen.__proto__ = Screen.prototype;
localStorage.__proto__ = Storage.prototype;
sessionStorage.__proto__ = Storage.prototype;
_div.__proto__ = HTMLDivElement.prototype;
_p.__proto__ = HTMLParagraphElement.prototype;
_span.__proto__ = HTMLSpanElement.prototype;
_iframe.__proto__ = HTMLIFrameElement.prototype;
_canvas.__proto__ = HTMLCanvasElement.prototype;
_style.__proto__ = HTMLStyleElement.prototype;
_a.__proto__=HTMLAnchorElement.prototype;
_h1.__proto__ = HTMLHeadingElement.prototype;
_webgl.__proto__ = WebGLRenderingContext.prototype;
_2d.__proto__ = CanvasRenderingContext2D.prototype;
/////===================代理对象=====================//////
window = proxy(window, 'window')
document = proxy(document, 'document')
navigator = proxy(navigator, 'navigator')
location = proxy(location, 'location')
history = proxy(history, 'history')
screen = proxy(screen, 'screen')
localStorage = proxy(localStorage, 'localStorage')
sessionStorage = proxy(sessionStorage, 'sessionStorage')
_div = proxy(_div, "div")
_p = proxy(_p, "p")
_span = proxy(_span, "span")
_iframe = proxy(_iframe, "iframe")
_style = proxy(_style, "style")
_canvas= proxy(_canvas, "canvas")
_preview=proxy(_preview,"preview")
_a=proxy(_a,"a")
_h1=proxy(_h1,"h1")
_webgl=proxy(_webgl,"webgl")
_2d=proxy(_2d,"2d")
_tCaptchaDyContent=proxy(_tCaptchaDyContent,"tCaptchaDyContent")
/////==========代码==================
