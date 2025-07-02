delete global;
delete __dirname;
delete __filename;


ld = {};
ld.config = {};
ld.config.proxy = true;
ld.config.filterProp = ["eval", 'hasOwnProperty', '__proto__', 'constructor', 'valueOf', 'toString', 'prototype', '$_ts', 'Symbol(Symbol.toStringTag)', '__#classType']
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    black: '\x1b[30m',
};
function logWithColor(color, message) {
    console.log(color + message + colors.reset);
}

ld.getType = function getType(obj) {
    return Object.prototype.toString.call(obj);
}
ld.proxy = function proxy(obj, objName) {
    if (!ld.config.proxy) {
        return obj;
    }
    let handler = {
        get: function (target, prop, receiver) {
            let result;
            try {
                result = Reflect.get(target, prop, receiver);
                if (ld.config.filterProp.includes(prop)) {
                    return result;
                }
                let type = ld.getType(result);
                if (result instanceof Object) {
                    logWithColor(colors.cyan, `{get|obj:[${objName}]-> prop:[${prop.toString()}], type:[${type}]}`);
                    result = ld.proxy(result, `${objName}.${prop.toString()}`);
                } else if (typeof result === "symbol") {
                    logWithColor(colors.cyan, `{get|obj:[${objName}]-> prop:[${prop.toString()}], ret:[${result.toString()}]}`);
                } else {
                    logWithColor(colors.cyan, `{get|obj:[${objName}]-> prop:[${prop.toString()}], ret:[${result}]}`);
                }
            } catch (e) {
                logWithColor(colors.red, `{get|obj:[${objName}]-> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        },
        set: function (target, prop, value, receiver) {
            let result;
            try {
                result = Reflect.set(target, prop, value, receiver);
                let type = ld.getType(value);
                if (value instanceof Object) {
                    logWithColor(colors.green, `{set|obj:[${objName}]-> prop:[${prop.toString()}], type:[${type}]}`);
                } else if (typeof value === "symbol") {
                    logWithColor(colors.green, `{set|obj:[${objName}]-> prop:[${prop.toString()}], value:[${value.toString()}]}`);
                } else {
                    logWithColor(colors.green, `{set|obj:[${objName}]-> prop:[${prop.toString()}], value:[${value}]}`);
                }
            } catch (e) {
                logWithColor(colors.red, `{set|obj:[${objName}]-> prop:[${prop.toString()}], error:[${e.message}]}`);
            }
            return result;
        },
        // getOwnPropertyDescriptor: function (target, prop) {
        //     let result;
        //     try {
        //         result = Reflect.getOwnPropertyDescriptor(target, prop);
        //         let type = ld.getType(result);
        //         if ("constructor" !== prop) {
        //             logWithColor(colors.yellow, `{getOwnPropertyDescriptor|obj:[${objName}]-> prop:[${prop.toString()}], type:[${type}]}`);
        //         }
        //     } catch (e) {
        //         logWithColor(colors.red, `{getOwnPropertyDescriptor|obj:[${objName}]-> prop:[${prop.toString()}], error:[${e.message}]}`);
        //     }
        //     return result;
        // },
        defineProperty: function (target, prop, descriptor) {
            let result;
            try {
                result = Reflect.defineProperty(target, prop, descriptor);
                logWithColor(colors.blue, `{defineProperty|obj:[${objName}]-> prop:[${prop.toString()}]}`);
            } catch (e) {
                logWithColor(colors.red, `{defineProperty|obj:[${objName}]-> prop:[${prop.toString()}],error:[${e.message}]}`);
            }
            return result;
        },
        apply: function (target, thisArg, argumentsList) {
            let result;
            try {
                result = Reflect.apply(target, thisArg, argumentsList);
                let type = ld.getType(result);
                if (result instanceof Object) {
                    logWithColor(colors.magenta, `{apply|function:[${objName}], args:[${argumentsList}], type:[${type}]}`);
                } else if (typeof result === 'symbol') {
                    logWithColor(colors.magenta, `{apply|function:[${objName}], args:[${argumentsList}], type:[${result.toString()}]}`);
                } else {
                    logWithColor(colors.magenta, `{apply|function:[${objName}], args:[${argumentsList}], type:[${result}]}`);
                }
            } catch (e) {
                logWithColor(colors.red, `{apply|function:[${objName}], args:[${argumentsList}], error:[${e.message}]}`);
            }
            return result;
        },
        construct: function (target, argArray, newTarget) {
            let result;
            try {
                result = Reflect.construct(target, argArray, newTarget);
                let type = ld.getType(result);
                logWithColor(colors.cyan, `{construct|function:[${objName}], type:[${type}]}`);
            } catch (e) {
                logWithColor(colors.red, `{construct|function:[${objName}], error:[${e.message}]}`);
            }
            return result
        },
        deleteProperty: function (target, propKey) {
            let result = Reflect.deleteProperty(target, propKey);
            logWithColor(colors.green, `{deleteProperty|obj:[${objName}]-> prop:[${propKey.toString()}], result:[${result}]}`);
            return result;
        },
    };
    return new Proxy(obj, handler);
}

// ===============================配置=================================HTMLDocument

// =============================history========================================
History = function History() {
}

history = new History()
history.replaceState = function replaceState(state, title) {
    return {}
    // console.log(`{replaceState|state:[${JSON.stringify(state)}], title:[${title}]`);
}
// =============================localStorage==============================
Storage = function Storage() {
}
Storage.prototype.setItem = function setItem(key, value) {
    console.log(`{setItem|key:[${key}], value:[${value}]}`);
}
Storage.prototype.getItem = function getItem(key) {
    console.log(`{getItem|key:[${key}]}`);
}
Storage.prototype.removeItem = function removeItem(key) {
    console.log(`{removeItem|key:[${key}]}`);
}
Storage.prototype.clear = function clear() {
    console.log(`{clear}`);
}

localStorage = {
    "$_YVTX": "WG",
    "_$rc": "5muwSwlpGcYjRayyL0pG7nltZqQIYn1mur7u32l8HhlxYuHPnfOAKlYDKV1btF4hYuedOwUzV2ExuujXu_G7d.Fv8HN0vzrUisqc5UaIjmsraphH5b2ld4NG6b8yGFc08l0.qaU8e.0.AQF7CGx0bKdY.388kJBKvI.TPnlgtFJbq6wUHjpF.QjjEvqzlbhUJ7T1kAveg5JY6GnMcEE1PMxYGg2lDMw56qn0cV2Jkxb1WUDIFw6M_YSa9W.UqKvbE8NRl5emmyafpyohcIHxLa2KWAA3PgOSty.zMB.aybsVhvgEZN91PiSIcNAORHZdpb6CEXCcuQUv3GGzq9IdU4If7KqXtlrUPfxj0D2pbraCx3dDahm_RaB7P0xj7WXsgXCHWd1Qy.bkJo8Ka8KDTpFpynhDOxb9M0nA9VgbjsB5b5sBS9VtBTZccv_JSxw8LkGEevWB73V0aXRlwrrOK.Esh3RVJGZMo1_VcIhCYQqs_Q685PizvSa_QE1jwlY1WqhlMG.Ssuy5E4TFfi3XjFvmaJeQu6rKTw.PhRuFIAL7Ui.5p7sp6js5YmpJd7vmhBdIte0GgO6PiOoZt5hcpRudKnW",
    "__#classType": "localStorage",
    "$_YWTU": "70u.4ECY.0Ph06tdRlATZ7mC4KCevinpMPbUQSB5U7Q"
}
Object.setPrototypeOf(localStorage, Storage.prototype);
sessionStorage = {}
Object.setPrototypeOf(sessionStorage, Storage.prototype);

// =============================location==================================
Location = function Location() {
}
location = new Location()
location.href = 'http://www.sgcc.com.cn/html/sgcc/col2022121225/column_2022121225_1.shtml'
location.hostname = 'www.sgcc.com.cn'
location.protocol = ''
location.pathname = '/html/sgcc/col2022121225/column_2022121225_1.shtml'
location.hash = ''
location.port = ''
location.host = 'www.sgcc.com.cn'
location.search = ''
// ===========================document===================================

Document = function Document() {
}
div = {
    getElementsByTagName: function getElementsByTagName(tagName) {
        console.log(`{getElementsByTagName|tagName:[${tagName}]}`);
        if (tagName === 'i') {
            return {length: 0}
        }
    }
}
Document.prototype.createElement = function createElement(tagName) {
    console.log(`{createElement|tagName:[${tagName}]}`);
    if (tagName === 'div') {
        return div;
    }
    if (tagName === 'a') {
        return 'a'
    }
    if (tagName === 'form') {
        return 'form'
    }
    if (tagName === 'input') {
        return 'input'
    }
}
meta1 = {'http-equiv':"Content-Type", 'content':"text/html charset=utf-8"}

meta2 = {
    'content': "content1", 'r': 'm',
    "getAttribute": function getAttribute(name) {
        if (name === 'r') {
            return 'm'
        }
    },
    "parentNode": {
        "removeChild": function removeChild(node) {
            console.log(`{removeChild|node:[${node}]}`);
        }
    }
}
Document.prototype.documentElement = 1;
Document.prototype.getElementsByTagName = function getElementsByTagName(tagName) {
    if (tagName === 'script') {
        return {}
    }
    if (tagName === 'meta') {
        return [meta1, meta2]
    }
    if (tagName === 'base') {
        return {}
    }
}
Document.prototype.getElementById = function getElementById(id) {
    console.log(`{getElementById|id:[${id}]}`);
    if (id === 'root-hammerhead-shadow-ui') {
        return null;
    }
    if (id === 'a'){
        return 'a'
    }
}
Document.prototype.appendChild = function appendChild(node) {
    console.log(`{appendChild|node:[${node}]}`);
}
Document.prototype.removeChild = function removeChild(node) {
    console.log(`{removeChild|node:[${node}]}`);
}
Document.prototype.addEventListener = function addEventListener(){
    console.log(`{addEventListener|event:[${arguments[0]}]}`);
}
Document.prototype.attachEvent = function attachEvent(){
    console.log(`{attachEvent|event:[${arguments[0]}]}`);
}
Document.prototype.removeEventListener = function removeEventListener(){
    console.log(`{removeEventListener}`);
}
HTMLDocument = function HTMLDocument() {
}
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype)
document = new HTMLDocument()
document.visibilityState = 'visible'
document.all = {};
document.body = {}
// =============================navigator==============================
Navigator = function Navigator() {
}
Navigator.prototype.getBattery = function getBattery(){
    console.log(`{getBattery}`);
}

navigator = new Navigator()
navigator.appCodeName = 'Mozilla'
navigator.battery = {
    level: 1,
    charging: true,
    chargingTime: 10,
}
navigator.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36'
navigator.webdriver = false
navigator.appName = 'Netscape'
navigator.platform = 'Win32'
navigator.connection = {}
navigator.appVersion = '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36'
navigator.languages = ['zh-CN', 'zh']
// ===============================window===============================
Window = function Window() {
}
Window.prototype.addEventListener = function addEventListener(){
    console.log(`{addEventListener|event:[${arguments[0]}]}`);
}
Window.prototype.removeEventListener = function removeEventListener(){
    console.log(`{removeEventListener}`);
}
window = globalThis;
window.ActiveXObject = undefined;
window.top = window;
window.self = window;
window.DOMParser = function DOMParser() {
    return 'function DOMParser() { [native code] }'
}
window.name = ''
window.Request = function Request() {
    return 'function Request() { [native code] }'
}
window.fetch = function fetch() {
    return 'function fetch() { [native code] }'
}
window.open = function open() {
    console.log(`{open|url:[${arguments[0]}]}`);
}
setTimeout = function setTimeout() {
}
setInterval = function setInterval() {
}
Object.defineProperty(window, "indexedDB", {value: new IDBFactory(), writable: true, configurable: true});
Object.defineProperty(window, "openDatabase", {
    value: function () {
    }, writable: true, configurable: true
});
Object.setPrototypeOf(window, Window.prototype);
window.XMLHttpRequest = function XMLHttpRequest() {
    this.open = function () {
        console.log(`{XMLHttpRequest|open}`);
    }
}
function IDBFactory() {
    this.cmd = function () {
    }
    this.databases = function () {
    }
    this.deleteDatabase = function () {
    }
    this.open = function () {
    }
}

// =============================代理==================================
window = ld.proxy(window, "window");
location = ld.proxy(location, "location");
document = ld.proxy(document, "document");
navigator = ld.proxy(navigator, "navigator");
localStorage = ld.proxy(localStorage, "localStorage");
sessionStorage = ld.proxy(sessionStorage, "sessionStorage");
history = ld.proxy(history, "history");
let PluginArray = function () {
}
let MimeTypeArray = function () {
}

// =============================console===============================



"$_tsCode";
;

"waiLianWenJian";



function getCk(){
    return document.cookie;
}

console.log(getCk());

// console.log(document.cookie)
// console.log(document.cookie.length)
