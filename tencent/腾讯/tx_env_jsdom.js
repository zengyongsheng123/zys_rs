dtavm = {}
dtavm.log = console.log
dtavm.log = function () { }
_log = console.log
const jsdom = require('jsdom');
const {JSDOM} = jsdom;

const resourceLoader  = new jsdom.ResourceLoader({
    userAgent:'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
})
const html = "<!DOCTYPE html><p>hello world</p>"
const dom = new JSDOM(html,{
    url:"https://ti.qq.com/safe/tools/captcha/sms-verify-login?_wwv=2",
    referrer:"https://ti.qq.com/safe/tools/captcha/sms-verify-login?_wwv=2/",
    contentType:"text/html",
    resources:resourceLoader
})

function proxy(obj, objname, type) {
    function getMethodHandler(WatchName, target_obj) {
        let methodhandler = {
            apply(target, thisArg, argArray) {
                if (this.target_obj) {
                    thisArg = this.target_obj
                }
                let result = Reflect.apply(target, thisArg, argArray)
                if (target.name !== "toString") {
                    if (target.name === "addEventListener") {
                        dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`)
                    } else if (WatchName === "window.console") {
                    } else {
                        dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                    }
                } else {
                    dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                }
                return result
            },
            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                dtavm.log(`调用者 => [${WatchName}] 构造函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${(result)}].`)
                return result;
            }
        }
        methodhandler.target_obj = target_obj
        return methodhandler
    }

    function getObjhandler(WatchName) {
        let handler = {
            get(target, propKey, receiver) {
                let result = target[propKey]
                if (result instanceof Object) {
                    if (typeof result === "function") {
                        dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}] , 是个函数`)
                        return new Proxy(result, getMethodHandler(WatchName, target))
                    } else {
                        dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}], 结果 => [${(result)}]`);
                        if (`${propKey}` === 'self') {
                            return self
                        }
                    }
                    return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
                }
                if (typeof (propKey) !== "symbol") {
                    if (`${propKey}` === 'toDataURL') {
                        debugger
                    }
                    dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey?.description ?? propKey}], 结果 => [${result}]`);
                }
                return result;
            },
            set(target, propKey, value, receiver) {
                if (value instanceof Object) {
                    dtavm.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${(value)}]`);
                } else {
                    dtavm.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${value}]`);
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            has(target, propKey) {
                var result = Reflect.has(target, propKey);
                dtavm.log(`针对in操作符的代理has=> [${WatchName}] 有无属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            deleteProperty(target, propKey) {
                var result = Reflect.deleteProperty(target, propKey);
                dtavm.log(`拦截属性delete => [${WatchName}] 删除属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            defineProperty(target, propKey, attributes) {
                var result = Reflect.defineProperty(target, propKey, attributes);
                dtavm.log(`拦截对象define操作 => [${WatchName}] 待检索属性名 => [${propKey.toString()}] 属性描述 => [${(attributes)}], 结果 => [${result}]`)
                // debugger
                return result
            },
            getPrototypeOf(target) {
                var result = Reflect.getPrototypeOf(target)
                dtavm.log(`被代理的目标对象 => [${WatchName}] 代理结果 => [${(result)}]`)
                return result;
            },
            setPrototypeOf(target, proto) {
                dtavm.log(`被拦截的目标对象 => [${WatchName}] 对象新原型==> [${(proto)}]`)
                return Reflect.setPrototypeOf(target, proto);
            },
            preventcExtensions(target) {
                dtavm.log(`方法用于设置preventcExtensions => [${WatchName}] 防止扩展`)
                return Reflect.preventcExtensions(target);
            },
            isExtensible(target) {
                var result = Reflect.isExtensible(target)
                dtavm.log(`拦截对对象的isExtensible() => [${WatchName}] isExtensible, 返回值==> [${result}]`)
                return result;
            },
        }
        return handler;
    }

    if (type === "method") {
        return new Proxy(obj, getMethodHandler(objname, obj));
    }
    return new Proxy(obj, getObjhandler(objname));
}
function proxyc(obj, name) {
    return new Proxy(obj, {
        get: function (target, p, receiver) {
        // console.table([
        //   {
        //     method: "get",
        //     target: name,
        //     p: p,
        //     receiver: receiver,
        //     value: Reflect.get(target, p, receiver),
        //   },
        // ]);
        return Reflect.get(target, p, receiver);
      },
      set: function (target, p, value, receiver) {
        // console.table([
        //   { method: "set", target: name, p: p, value: value, receiver: receiver },
        // ]);
        return Reflect.set(target, p, value, receiver);
      },
    });
}
function proxy(obj, objname, type) {
    return obj;
}

RTCPeerConnection = class {
}
RTCPeerConnection.prototype.getLocalStreams = function () {

}
RTCPeerConnection.prototype.createDataChannel = function () {

    return {
        onopen: function () {
        }, onclose: function () {
        }, onmessage: function () {
        }, send: function () {
        }, close: function () {
        },
    }
}
RTCPeerConnection.prototype.createDivnswer = function () {

}
RTCPeerConnection.prototype.createOffer = function () {
    return new Promise((resolve, reject) => {
        const offer = {
            "sdp":"v=0\r\no=- 627758748607417531 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 1961 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 117.152.145.34\r\na=candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 49812 typ host generation 0 network-cost 999\r\na=candidate:842163049 1 udp 1677729535 117.152.145.34 1961 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=ice-ufrag:/CYr\r\na=ice-pwd:QRs0Mo7A0ouqDBYDlcvDSjPQ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 BC:AC:D1:9B:EC:2F:F1:47:B5:EF:6D:2F:1A:E3:B6:9F:2B:76:07:CF:32:90:9F:B0:33:A6:90:63:F9:25:45:59\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
            "type":"offer"
        };
        resolve(offer);
    });
}
RTCPeerConnection.prototype.setLocalDescription = function (sampleDescription) {
    return new Promise((resolve, reject) => {
        resolve();
    });
}
RTCPeerConnection.prototype.setConfiguration = function () {

}
RTCPeerConnection.prototype.addIceCandidate = function () {

}
RTCPeerConnection.prototype.addTrack = function () {

}
RTCPeerConnection.prototype.onicecandidate = function () {

}
RTCPeerConnection.prototype.localDescription = {
    "sdp":"v=0\r\no=- 627758748607417531 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 1961 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 117.152.145.34\r\na=candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 49812 typ host generation 0 network-cost 999\r\na=candidate:842163049 1 udp 1677729535 117.152.145.34 1961 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=ice-ufrag:/CYr\r\na=ice-pwd:QRs0Mo7A0ouqDBYDlcvDSjPQ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 BC:AC:D1:9B:EC:2F:F1:47:B5:EF:6D:2F:1A:E3:B6:9F:2B:76:07:CF:32:90:9F:B0:33:A6:90:63:F9:25:45:59\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
    "type":"offer"
}
RTCPeerConnection.prototype.sctp = {}
webkitRTCPeerConnection = RTCPeerConnection;

require_ = require;
delete require;

Object.defineProperties(globalThis, {
    [Symbol.toStringTag]: {
        value: 'Window'
    }
});
function setTostringAndstringTag(obj, dictValue) {
    // 重写toString方法
    obj.toString = function toString() {
        return 'function ' + obj.name + '() { [native code] }';
    }
    // 重写Symbol.toStringTag属性
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: '' + obj.name,
    });
    // 重写原型链Symbol.toStringTag属性
    Object.defineProperty(obj.prototype, Symbol.toStringTag, {
        value: '' + obj.name,
    });
    // 重写原型链toString方法
    obj.prototype.toString = function toString() {
        return '[object ' + obj.name + ']';
    }

    if (dictValue) {
        // 重写原型链属性或者方法
        if (dictValue['prototype_func_type']) {
            dictValuep = dictValue['prototype_func_type'];
            for (let key in dictValuep) {
                if (!obj.prototype.hasOwnProperty(key)) {
                    obj.prototype[key] = dictValuep[key];
                }
            }
        }
        // 重写对象属性或者方法
        if (dictValue['object_func_type']) {
            dictValueo = dictValue['object_func_type'];
            for (let key in dictValueo) {
                if (!obj.hasOwnProperty(key)) {
                    obj[key] = dictValueo[key];
                }
            }
        }
    }
};
function setprotoof(prototypes) {
    for (let i = 0; i < prototypes.length; i++) {
        let ctx = prototypes[i] + '.__proto__';
        let name__ = ctx;
        let boolc = false;
        for (let j = 0; j < prototypes.length; j++){
            if (boolc) {
                ctx += '.__proto__';
                name__ += '=' + prototypes[j] + '.prototype;\n' + ctx;
            }
            if (prototypes[j] === prototypes[i]) {
                boolc = true;
            }
        }
        eval(name__);
    }
}

EventTarget = function EventTarget() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(EventTarget, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
WindowProperties = function Window() {throw new TypeError("Illegal constructor");};
setTostringAndstringTag(WindowProperties, {
    // 重写对象属性或者方法
    'object_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
    },
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
        addEventListener:function addEventListener(){}
    }
});
Window = function Window() {throw new TypeError("Illegal constructor");};
setTostringAndstringTag(Window, {
    // 重写对象属性或者方法
    'object_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
    },
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        PERSISTENT: 1,
        TEMPORARY: 2,
        addEventListener:function addEventListener(){}
    }
});

Location = function Location() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Location, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});

plugins = proxy({
    length: 5,
    '0': proxy({
        name: 'PDF Viewer',
        filename: 'internal-pdf-viewer',
        description: 'Portable Document Format',
        length: 2,
        '0': proxy({
            type: 'application/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins00'),
        '1': proxy({
            type: 'text/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins01')
    }, 'plugins0'),
    '1': proxy({
        name: 'Chrome PDF Viewer',
        filename: 'internal-pdf-viewer',
        description: 'Portable Document Format',
        length: 2,
        '0': proxy({
            type: 'application/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins10'),
        '1': proxy({
            type: 'text/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins11')
    }, 'plugins1'),
    '2': proxy({
        name: 'Chromium PDF Viewer',
        filename: 'internal-pdf-viewer',
        description: 'Portable Document Format',
        length: 2,
        '0': proxy({
            type: 'application/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins20'),
        '1': proxy({
            type: 'text/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins21')
    }, 'plugins2'),
    '3': proxy({
        name: 'Microsoft Edge PDF Viewer',
        filename: 'internal-pdf-viewer',
        description: 'Portable Document Format',
        length: 2,
        '0': proxy({
            type: 'application/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins30'),
        '1': proxy({
            type: 'text/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins31')
    }, 'plugins3'),
    '4': proxy({
        name: 'WebKit built-in PDF',
        filename: 'internal-pdf-viewer',
        description: 'Portable Document Format',
        length: 2,
        '0': proxy({
            type: 'application/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins40'),
        '1': proxy({
            type: 'text/pdf',
            suffixes: 'pdf',
            description: 'Portable Document Format',
        }, 'plugins41')
    }, 'plugins4')
}, 'plugins');
ServiceWorkerContainer = function ServiceWorkerContainer() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(ServiceWorkerContainer, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});
serviceWorkerContainer = {};
serviceWorkerContainer.__proto__ = ServiceWorkerContainer.prototype;
Navigator = function Navigator() { throw new TypeError("Illegal constructor");};
setTostringAndstringTag(Navigator, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        vendorSub:"",
        productSub:"20030107",
        vendor:"Google Inc.",
        maxTouchPoints:0,
        scheduling:{},
        userActivation:{},
        doNotTrack:null,
        geolocation:{},
        connection:{
            downlink: 10,
            effectiveType: "4g",
            onchange: null,
            rtt: 50,
            saveData: false,
        },
        plugins:plugins,
        mimeTypes:{},
        pdfViewerEnabled:true,
        webkitTemporaryStorage:{},
        webkitPersistentStorage:{},
        hardwareConcurrency:8,
        cookieEnabled:true,
        appCodeName:"Mozilla",
        appName:"Netscape",
        appVersion:"5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
        platform:"Win32",
        product:"Gecko",
        userAgent:"Mozilla/5.0 (Windows NT 10.0; JiSu) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.3.1.7 Safari/537.36",
        language:"zh-CN",
        languages:['zh-CN', 'zh'],
        onLine:true,
        webdriver:false,
        getGamepads:function(){},
        javaEnabled:function(){return false},
        sendBeacon:function(){},
        vibrate:function(){},
        bluetooth:{},
        clipboard:{},
        credentials:{},
        keyboard:{},
        managed:{},
        mediaDevices:{},
        storage:{},
        serviceWorker:serviceWorkerContainer,
        virtualKeyboard:{},
        wakeLock:{},
        deviceMemory:8,
        ink:{},
        hid:{},
        locks:{},
        gpu:{},
        mediaCapabilities:{},
        mediaSession:{},
        permissions:{},
        presentation:{},
        usb:{},
        xr:{},
        serial:{},
        windowControlsOverlay:{},
        userAgentData:{},
        canShare:function(){},
        share:function(){},
        clearAppBadge:function(){},
        getBattery:function(){},
        getUserMedia:function(){},
        requestMIDIAccess:function(){},
        requestMediaKeySystemAccess:function(){},
        setAppBadge:function(){},
        webkitGetUserMedia:function(){},
        getInstalledRelatedApps:function(){},
        registerProtocolHandler:function(){},
        unregisterProtocolHandler:function(){}
    }
});


Node = function Node() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Node, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
Document = function Document() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Document, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
HTMLDocument = function HTMLDocument() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLDocument, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type':null
});
Screen = function Screen() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(Screen, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        availHeight: 824,
        availLeft: 0,
        availTop: 0,
        availWidth: 1536,
        colorDepth: 24,
        height: 864,
        isExtended: true,
        onchange: null,
        pixelDepth: 24,
        width: 1536,
        orientation: {
            angle: 0,
            type: "landscape-primary",
            onchange: null
        }
    }
});
History = function History() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(History, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        length: 2,
        back: function back() { },
        forward: function forward() { },
        go: function go() { },
        pushState: function pushState() { },
        replaceState: function replaceState() { },
        scrollRestoration: "auto",
        state: null
    }
});
Storage = function Storage() { throw new TypeError("Illegal constructor"); };
local = {};
setTostringAndstringTag(Storage, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': {
        clear: function clear() {
            local = {};
        },
        getItem: function getItem(key) {
            if (!Object.keys(local).includes(key)) {
                return null;
            }
            return local[key];
        },
        setItem: function setItem(key, value) {
            local[key] = value;
        },
        removeItem: function removeItem(key) {
            delete local[key];
        },
        key: function key(index) {
            return Object.keys(local)[index];
        },
        length: 0,
        get length() {
            return Object.keys(local).length;
        }
    }
});
HTMLCanvasElement = function HTMLCanvasElement() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(HTMLCanvasElement, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});
WebGLRenderingContext = function WebGLRenderingContext() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(WebGLRenderingContext, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});
CanvasRenderingContext2D = function CanvasRenderingContext2D() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(CanvasRenderingContext2D, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});
MediaQueryList = function MediaQueryList() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(CanvasRenderingContext2D, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});
CSSStyleDeclaration = function CSSStyleDeclaration() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(CSSStyleDeclaration, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});
WebGLDebugRendererInfo = function WebGLDebugRendererInfo() { throw new TypeError("Illegal constructor"); };
setTostringAndstringTag(WebGLDebugRendererInfo, {
    // 重写对象属性或者方法
    'object_func_type': null,
    // 重写对象原型链属性或者方法
    'prototype_func_type': null
});

window = globalThis;
window.toString = function () {
    return '[object Window]'
}
setprotoof(['window', 'Window', 'WindowProperties', 'EventTarget'])

top = window.top = window;
self =window.self = window;
Object.defineProperty(window, "self", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function self(){
        return window
    }
})
Object.defineProperty(window, "top", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function top(){
        return window
    }
})

window.TCaptchaReferrer = 'https://ti.qq.com/safe/tools/captcha/sms-verify-login?_wwv=2'
window.innerWidth = 1536;
window.innerHeight = 715;
window.devicePixelRatio = 1.25;
window.customElements = {};
window.SyncManager = function SyncManager() { throw new TypeError("Illegal constructor"); };

navigator = {};
navigator.__proto__ = Navigator.prototype;

location = {
    "ancestorOrigins": {},
    "href": "https://ti.qq.com/safe/tools/captcha/sms-verify-login?_wwv=2",
    "origin": "https://ti.qq.com",
    "protocol": "https:",
    "host": "ti.qq.com",
    "hostname": "ti.qq.com",
    "port": "",
    "pathname": "/safe/tools/captcha/sms-verify-login",
    "search": "?_wwv=2",
    "hash": ""
};
location.__proto__ = Location.prototype;
CSS = proxy({
    supports:function supports() {
        dtavm.log('supports:', arguments)
        if(arguments[0] === 'overscroll-behavior'){
            return true
        }
    }
}, 'CSS');

WEBGL_debug_renderer_info = {
    UNMASKED_RENDERER_WEBGL: 37446,
    UNMASKED_VENDOR_WEBGL:37445
}
WEBGL_debug_renderer_info.__proto__ = WebGLDebugRendererInfo.prototype;
webgl = {
    getSupportedExtensions : function getSupportedExtensions() {
        return [
            "ANGLE_instanced_arrays",
            "EXT_blend_minmax",
            "EXT_color_buffer_half_float",
            "EXT_disjoint_timer_query",
            "EXT_float_blend",
            "EXT_frag_depth",
            "EXT_shader_texture_lod",
            "EXT_texture_compression_bptc",
            "EXT_texture_compression_rgtc",
            "EXT_texture_filter_anisotropic",
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
            "WEBGL_color_buffer_float",
            "WEBGL_compressed_texture_s3tc",
            "WEBGL_compressed_texture_s3tc_srgb",
            "WEBGL_debug_renderer_info",
            "WEBGL_debug_shaders",
            "WEBGL_depth_texture",
            "WEBGL_draw_buffers",
            "WEBGL_lose_context",
            "WEBGL_multi_draw"
        ]
    },
    getExtension: function () {
        dtavm.log("getExtension:", arguments[0]);
        if (arguments[0] === 'WEBGL_debug_renderer_info') {
            return WEBGL_debug_renderer_info
        }
    },
    getParameter: function getParameter(res) {
        dtavm.log("getParameter:", res);
        if (res + '' === '37445') {
            return 'Google Inc. (NVIDIA)'
        }
        if (res + '' === '37446') {
            return 'ANGLE (NVIDIA, NVIDIA GeForce RTX 2060 SUPER (0x00001F06) Direct3D11 vs_5_0 ps_5_0, D3D11)'
        }
    }
};
webgl.__proto__ = WebGLRenderingContext.prototype;

canvas2d = {
    moveTo:function(){},
        stroke:function(){},
        lineTo:function(){},
        canvas: this,
        direction: "ltr",
        fillStyle: "#000000",
        filter: "none",
        font: "24px Arial",
        globalAlpha: 1,
        globalCompositeOperation: "source-over",
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "low",
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
        fillRect: function(v1, v2, v3, v4) {},
        fillText: function(v1, v2, v3) {},
};
canvas2d.__proto__ = CanvasRenderingContext2D.prototype;
canvas = {
    getContext: function (res) {
        dtavm.log("getContext:", res);
        if (res === 'webgl') {
            return webgl
        }
        if (res === '2d') {
            return canvas2d
        }
    },
    toDataURL: function () {
        return "data:image/png;base64,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QGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQhQGFJkyoGSgIkQGGxBkiABKQh8H+NkcUPVYUE9AAAAABJRU5ErkJggg=="
    }
};
canvas.__proto__ = HTMLCanvasElement.prototype;

csstyle = {
    getPropertyValue: function getPropertyValue() {
        dtavm.log("firsth-getPropertyValue:", arguments[0]);
        if (arguments[0] === 'color') {
            return 'rgb(0, 128, 0)'
        }
    }
}
csstyle.__proto__ = CSSStyleDeclaration.prototype;
secondpNum = 0;
window.getComputedStyle = function () {
    if (arguments[0].id === 'firsth') {
        return csstyle
    }
    if (arguments[0].id === 'firstp') {
        csstyle.getPropertyValue = function getPropertyValue() {
            dtavm.log("firstp-getPropertyValue:", arguments[0]);
            if (arguments[0] === 'color') {
                return 'rgb(255, 0, 0)'
            }
        }
        return csstyle
    }
    if (arguments[0].id === 'secondh') {
        csstyle.getPropertyValue =  function getPropertyValue() {
            dtavm.log("secondh-getPropertyValue:", arguments[0]);
            if (arguments[0] === 'color') {
                return 'rgb(0, 0, 0)'
            }
        }
        return csstyle
    }
    if (arguments[0].id === 'bar') {
        csstyle.getPropertyValue = function getPropertyValue() {
            dtavm.log("bar-getPropertyValue:", arguments[0]);
            if (arguments[0] === 'color') {
                return 'rgb(255, 0, 0)'
            }
        }
        return csstyle
    }
    if (arguments[0].id === 'secondp') {
        if (secondpNum === 0) {
            secondpNum += 1;
            csstyle.getPropertyValue = function getPropertyValue() {
                dtavm.log("secondp-getPropertyValue:", arguments[0]);
                if (arguments[0] === 'color') {
                    return 'rgb(255, 0, 0)'
                }
            }
            return csstyle
        }
        if (secondpNum === 1) {
            csstyle.getPropertyValue = function getPropertyValue() {
                dtavm.log("secondp-getPropertyValue:", arguments[0]);
                if (arguments[0] === 'color') {
                    return 'rgb(0, 0, 255)'
                }
            }
            return csstyle
        }
    }
}
window.getComputedStyle.toString = function () {
    return 'function getComputedStyle() { [native code] }'
}
document = dom.window.document;
document.createElement_ = document.createElement.bind(document);
document.createElement = function (tagName) {
    dtavm.log('createElement:'+ tagName);
    if (tagName === 'canvas') {
        return canvas;
    }
    return document.createElement_(tagName);
}

document.getElementById_ = document.getElementById.bind(document);
document.getElementById = function (tagName) {
    if (tagName === 'preview') {
        preview = document.getElementById_(tagName);
        preview.captureStream = function () {
            dtavm.log("captureStream:", arguments);
            return proxy({
                active: false,
                id: '3a71f27a-419d-4e5f-bb3f-fd1cb06fc1ff',
                onactive: null,
                onaddtrack: null,
                oninactive: null,
                onremovetrack:null
            },'MediaStream')
        }
        return preview;
    }
    return document.getElementById_(tagName);
}

document.addEventListener_ = document.addEventListener.bind(document);
document.addEventListener = function addEventListener(type, listener, useCapture) {
    if (type === 'mousemove') {
        window.mose_move = listener
    }
    return document.addEventListener_(type, listener, useCapture);
}

!(function () {
    var cook = '';
    Object.defineProperty(document, 'cookie', {
        get: function () {
            return cook;
        },
        set: function (value) {
            cook = value;
            return cook;
        }
    });
})();

mediaQueryList = {
    matches: false,
    media: '(prefers-color-scheme: dark)',
    onchange: null
};
mediaQueryList.__proto__ = MediaQueryList.prototype;
window.matchMedia = function () {
    dtavm.log("matchMedia:", arguments[0]);
    if (arguments[0] === '(prefers-color-scheme: dark)') {
        mediaQueryList.matches = false;
        return proxy(mediaQueryList,'prefers-color-scheme: dark')
    }
    if (arguments[0] === '(prefers-color-scheme: light)') {
        mediaQueryList.matches = true;
        return proxy(mediaQueryList,'(prefers-color-scheme: light)')
    }
    if (arguments[0] === '(prefers-reduced-motion: reduce)') {
        mediaQueryList.matches = false;
        return proxy(mediaQueryList,'(prefers-reduced-motion: reduce)')
    }
    if (arguments[0] === '(prefers-reduced-motion: no-preference)') {
        debugger;
        mediaQueryList.matches = true;
        return proxy(mediaQueryList,'(prefers-reduced-motion: no-preference)')
    }
}
window.matchMedia.toString = function () {
    return 'function matchMedia() { [native code] }'
}

screen = {};
setprotoof(['screen', 'Screen', 'EventTarget'])

chrome = {
    app: {
        InstallState: { DISABLED: 'disabled', INSTALLED: 'installed', NOT_INSTALLED: 'not_installed' },
        RunningState: { CANNOT_RUN: 'cannot_run', READY_TO_RUN: 'ready_to_run', RUNNING: 'running' },
        getDetails:function(){},
        getIsInstalled:function(){},
        installState:function(){},
        isInstalled: false,
        runningState: function(){}
    },
    csi: function () { },
    loadTimes: function () { },
}
chrome.__proto__ = Object.prototype;

history = {};
history.__proto__ = History.prototype;

localStorage = {};
sessionStorage = {};
localStorage.__proto__ = Storage.prototype;
sessionStorage.__proto__ = Storage.prototype;

JSON.stringify_ = JSON.stringify;
JSON.stringify = function(x){if(typeof(x)== 'object' &&  x['sd']){x['sd'] = {"od":"C","isNewEntry":0,"slideValue":[[4,0,0,new Date().getTime(),0],[1,116,6,52,0],[1,15,30,34,0],[1,7,19,42,0],[1,0,20,45,0],[1,0,12,32,0],[1,0,6,46,0],[1,-2,6,42,0],[1,-2,3,42,0],[1,-3,0,143,0],[1,30,76,3501,0],[1,8,0,40,0],[1,0,-5,41,0],[1,-1,-4,32,0],[1,0,-1,31,0],[1,-4,0,102,0],[1,-7,0,43,0],[1,7,23,538,0],[1,-18,627,26632,0],[1,26,-17,38,0],[1,4,-776,31434,0],[1,-79,-23,471,0]],"verifyBtnPos":[143,161,173,176],"opAreaPos":[4,47,172,158],"clientSize":[160,802],"ft":"qf_7Pf__H"}};return JSON.stringify_(x)};


// xxxxxxxxxxxxxxxxxx;
require_('./tdc');
window.TDC.setData({
    "ft": "qf_7Pf__H"
});

function randomNum(minNum, maxNum, decimalNum) {
    var max = 0,
        min = 0;
    minNum <= maxNum ? ((min = minNum), (max = maxNum)) : ((min = maxNum), (max = minNum));
    switch (arguments.length) {
        case 1:
            return Math.floor(Math.random() * (max + 1));
        case 2:
            return Math.floor(Math.random() * (max - min + 1) + min);
        case 3:
            return parseFloat((Math.random() * (max - min) + min).toFixed(decimalNum));
        default:
            return Math.random();
    }
};
function generateTracks(points, sp1 = 1, st = 0) {
    for (let i = 1; i < points.length; i++) {
        if (points[i].x == points[i - 1].x) {
            points[0].x += randomNum(20, 30);
        }
    }
    var move = [];
    (function () {
        function sp(p, p2, pp) {
            var sump = Math.abs(p - p2);
            var x3 = Math.floor((Math.abs(pp - p) / sump) * 100);
            if (sump > 200) {
                if (x3 < 5 || x3 > 95) return 1;
                if (x3 < 10 || x3 > 90) return 2;
                if (x3 < 50 || x3 > 50) return 4;
            } else if (sump > 150) {
                if (x3 <= 10 || x3 >= 90) return 1;
                if (x3 <= 25 || x3 >= 75) return 2;
                if (x3 <= 40 || x3 >= 70) return 3;
                if (x3 <= 50 || x3 >= 50) return 4;
            } else if (sump > 100) {
                if (x3 <= 10 || x3 >= 90) return 1;
                if (x3 <= 15 || x3 >= 70) return 2;
                if (x3 <= 25 || x3 >= 60) return 3;
                if (x3 <= 50 || x3 >= 50) return 4;
            } else if (sump > 70) {
                if (x3 <= 15 || x3 >= 95) return 1;
                if (x3 <= 20 || x3 >= 80) return 2;
                if (x3 <= 25 || x3 >= 70) return 3;
                if (x3 <= 50 || x3 >= 50) return 4;
            } else {
                if (x3 <= 15 || x3 >= 80) return 0;
                if (x3 <= 25 || x3 >= 65) return 1;
                if (x3 <= 50 || x3 >= 50) return 2;
            }
        }
        function computeTime(distance) {
            var t;
            switch (distance) {
                case 0:
                    t = randomNum(35, 79);
                    break;
                case 1:
                    t = randomNum(23, 37);
                    break;
                case 2:
                    t = randomNum(18, 25);
                    break;
                case 3:
                    t = randomNum(17, 19);
                    break;
                case 4:
                    t = randomNum(16, randomNum(16, 19));
                    break;
            }
            return t;
        }
        var x = 0,
            y = 0;
        var distanceX = 3;
        var s0 = [0 + sp1, 1 + sp1, 1 + sp1, 1 + sp1];
        var s1 = [1 + sp1, 1 + sp1, 2 + sp1, 2 + sp1];
        var s2 = [2 + sp1, 2 + sp1, 3 + sp1, 3 + sp1];
        var s3 = [2 + sp1, 3 + sp1, 4 + sp1, 4 + sp1];
        var s4 = [3 + sp1, 4 + sp1, 4 + sp1, 4 + sp1];
        var speed = [s0, s1, s2, s3, s4];
        x = points[0].x;
        y = points[0].y;
        move.push([x, y, st]);
        for (var i = 1; i < points.length; i++) {
            var x2 = points[i].x;
            var y2 = points[i].y;
            var o = Math.abs(points[i - 1].x - x2) / Math.abs(points[i - 1].y - y2);
            while (x - x2 !== 0 || y - y2 !== 0) {
                var xx = x - x2;
                distanceX = sp(points[i - 1].x, x2, x);
                if (!distanceX) {
                    distanceX = randomNum(2, 4);
                }
                var addX = speed[distanceX][randomNum(0, speed[distanceX].length - 1)];
                if (xx !== 0) {
                    addX = xx > 0 ? -(addX > xx ? xx : addX) : addX > Math.abs(xx) ? Math.abs(xx) : addX;
                    x += addX;
                }
                var ss = Math.round(Math.abs(points[i - 1].x - x) / o);
                ss = points[i - 1].y > y2 ? -ss : ss;
                y = ss + points[i - 1].y;
                move.push([x, y, computeTime(distanceX)]);
            }
        }
    })();
    return move;
};
window.totalDelayMs = 0;
var _Date = Date;
window.Date = new Proxy(_Date, {
    construct(target, argArray, newTarget) {
        let value = new _Date(...argArray);
        value = new _Date(value.valueOf() + totalDelayMs);
        if (newTarget !== Date) value.constructor = newTarget;
        return value;
    },
});
const _now = Date.now;
Date.now = function now() {
    return _now.call(this, ...arguments) + window.totalDelayMs;
};
let _getTime = Date.prototype.getTime;
Date.prototype.getTime = function () {
    return _getTime.call(this, ...arguments) + window.totalDelayMs;
};
window.addTime = function addTime(ms) {
    if (ms !== 0) window.totalDelayMs += ms;
};
var _parseInt = window.parseInt;
window.parseInt = function () {
    if (arguments[0] == "0111100011") return 731;
    return _parseInt.apply(this, arguments);
};
window.setTimeout = window.setInterval = function (a, b) {
    return typeof a == "function" ? a() : eval(a);
};
let sx = randomNum(150, 300),
sy = randomNum(100, 300);
let tracks = generateTracks(
    [
        {
            x: sx,
            y: sy,
        },
        {
            x: randomNum(50, 1e3),
            y: sy + randomNum(150, 200),
        },
    ],
    1,
    randomNum(40, 200)
);
// console.log(tracks)
for (let p of tracks) {
    addTime(p[2] / 2);
    mose_move({
        pageX: p[0],
        pageY: p[1],
    });
}

function get_data() {
    collect = decodeURIComponent(window.TDC.getData(!0))
    return {'collect':collect,'eks':window.TDC.getInfo().info,tlg:collect.length}
}

console.log(get_data());
