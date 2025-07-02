//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：env.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/3/9 20:09
 *****/
function get_enviroment(proxy_array) {
    for(var i=0; i<proxy_array.length; i++){
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
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
proxy_array = ['window', 'document', 'location', 'navigator', 'history','screen',"localStorage", "sessionStorage","Object"]

window=global;
window.addEventListener=function(){};
window.TCaptchaReferrer='https://cloud.tencent.com/product/captcha';
window.innerWidth=360;
window.innerHeight=360;
window.webkitRTCPeerConnection=function(){};
window.RTCPeerConnection=function(){};
window.setInterval=function(){};
window.setTimeout=function(){}
window.CSS={};


document={
    "charset":'UTF-8',
    "characterSet":'UTF-8',
    createElement: function (tagName) {
        console.log("document.createElement==>", tagName);
        if(tagName==='canvas'){return {}}
        if(tagName==='div'){return {}}
        if(tagName==='span'){return {}}
        if(tagName==='p'){return {}}
        if(tagName==='iframe'){return {}}
    },
    addEventListener: function (type, listener, options) {
        console.log("document.addEventListener==>", type, listener, options)
    },
    location:{
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
    "cookie":'',
    getElementById: function (id) {
        console.log("document.getElementById==>", id);
 },
    documentElement:{},
    body:{},
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
};
location={
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
screen={
    availHeight: 901,
    availLeft: 0,
    availTop: 0,
    availWidth: 1412,
    colorDepth: 24,
    height: 942,
    pixelDepth: 24,
    width: 1412,
};
localStorage={
    getItem:function (key) {
        console.log("localStorage.getItem==>", key);
        return null
    },
    setItem:function (key, value) {
        console.log("localStorage.setItem==>", key, value);
    },
    removeItem:function (key) {
        console.log("localStorage.removeItem==>", key);
    },
    clear:function () {
        console.log("localStorage.clear==>");
    },
    key:function (index) {}
}
sessionStorage={
    getItem:function (key) {
        console.log("sessionStorage.getItem==>", key);
        return null
    },
    setItem:function (key, value) {
        console.log("sessionStorage.setItem==>", key, value);
    },
    removeItem:function (key) {
        console.log("sessionStorage.removeItem==>", key);
    },
    clear:function () {
        console.log("sessionStorage.clear==>");
    },
    key:function(index) {}
}

Array.prototype=[]
get_enviroment(proxy_array)