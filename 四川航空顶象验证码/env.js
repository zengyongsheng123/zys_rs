/*****
File：env.js
Author：南宫啸天
Date：2025/3/10 21:44
 *****/
// function get_enviroment(proxy_array) {
//     for(var i=0; i<proxy_array.length; i++){
//         handler = '{\n' +
//             '    get: function(target, property, receiver) {\n' +
//             '        console.log("方法:", "get  ", "对象:", ' +
//             '"' + proxy_array[i] + '" ,' +
//             '"  属性:", property, ' +
//             '"  属性类型:", ' + 'typeof property, ' +
//             // '"  属性值:", ' + 'target[property], ' +
//             '"  属性值类型:", typeof target[property]);\n' +
//             '        return target[property];\n' +
//             '    },\n' +
//             '    set: function(target, property, value, receiver) {\n' +
//             '        console.log("方法:", "set  ", "对象:", ' +
//             '"' + proxy_array[i] + '" ,' +
//             '"  属性:", property, ' +
//             '"  属性类型:", ' + 'typeof property, ' +
//             // '"  属性值:", ' + 'target[property], ' +
//             '"  属性值类型:", typeof target[property]);\n' +
//             '        return Reflect.set(...arguments);\n' +
//             '    }\n' +
//             '}'
//         eval('try{\n' + proxy_array[i] + ';\n'
//         + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
//         + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
//     }
// }
// proxy_array = ['window', 'document', 'location', 'navigator', 'history','screen',"localStorage","sessionStorage","_body"]

window=global;
window.top=window.self=window;
window.addEventListener=function(arg){
    // console.log('window中的addEventListener的参数为==>', arg)
};
window.attachEvent=function(arg){
    // console.log('window中的attachEvent的参数为==>', arg)
};
window.outerHeight=860;
window.outerWidth=1600;
window.innerHeight=755;
window.innerWidth=1552;
window.screenLeft=0;
window.screenTop=0;

_body={
    appendChild:function(arg){
        console.log('_body中的appendChild的参数为==>', arg)
    },
    innerHTML:{length:120568,substr:function (arg){
        console.log('_body中的substr的参数为==>', arg)
    },},
    removeChild:function(arg){
        console.log('_body中的removeChild的参数为==>', arg)
    },
};
_head={
    innerHTML:{length:155594}
};
document={
    documentElement:{
        getAttribute:function (arg){
            // console.log('document的documentElement的getAttribute接受的参数:=======>', arg)
        },
    },
    readyState:'complete',
    addEventListener:function(arg){
        // console.log('document中的addEventListener的参数为==>', arg)
    },
    body: _body,
    referrer:'',
    createElement:function (arg){
        // console.log('document中的createElement的参数为==>', arg)
        if(arg==="iframe"){
            return {
                style:{
                    display:'none'
                },
                contentWindow:{
                    navigator:{
                        webdriver:false
                    }
                }
            }
        }
    },
    getElementsByTagName:function (arg){
        // console.log('document中的getElementsByTagName的参数为==>', arg)
        if(arg==="meta"){
            return {}
        }
        if(arg==="head"){
            return {}
        }
    },
    head: _head,
};

location={
    "ancestorOrigins": {},
    "href": "https://flights.sichuanair.com/3uair/ibe/ticket/bjs-nkg.html?telassa-id=IbeNotLogin%7E341ED9580146347EE199DF6F7A8FED2A%7E3u-dev-PRD-0af11389-485722-75184&_catRootMessageId=3u-dev-PRD-0af11389-485722-75184&_catParentMessageId=3u-dev-PRD-0af11389-485722-75184&_catChildMessageId=3u-dev-PRD-0af11389-485722-75561",
    "origin": "https://flights.sichuanair.com",
    "protocol": "https:",
    "host": "flights.sichuanair.com",
    "hostname": "flights.sichuanair.com",
    "port": "",
    "pathname": "/3uair/ibe/ticket/bjs-nkg.html",
    "search": "?telassa-id=IbeNotLogin%7E341ED9580146347EE199DF6F7A8FED2A%7E3u-dev-PRD-0af11389-485722-75184&_catRootMessageId=3u-dev-PRD-0af11389-485722-75184&_catParentMessageId=3u-dev-PRD-0af11389-485722-75184&_catChildMessageId=3u-dev-PRD-0af11389-485722-75561",
    "hash": ""
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
screen={
    width: 1920,
    height: 1080,
    availWidth: 1920,
    availHeight: 1050,
    colorDepth: 24,
    pixelDepth: 24,
    orientation: {
        type: "landscape-primary",
        angle: 0,
        onchange: null
    }
};
// get_enviroment(proxy_array)