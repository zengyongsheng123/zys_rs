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
proxy_array = ['window', 'document', 'location', 'navigator', 'history','screen',"localStorage","sessionStorage","_body"]
window = global;
window.top = window;
window.self = window;
window.addEventListener = function (args) {
    console.log('window.addEventListener的参数为==>', args)
};
window.attachEvent = function (args) {
    console.log('window.attachEvent的参数为==>', args)
};
window.outerHeight = 1040;
window.outerWidth = 1920;
window.innerHeight = 404;
window._dx = {};
_body = {};
document = {
    title: "",
    head: {},
    readyState: '',
    referrer: "",
    addEventListener:  function (args) {
        console.log('document.addEventListener的参数为==>', args)
        if  (args == "DOMContentLoaded") {
            return {}
        }
    },
    documentElement:{
        getAttribute:  function (args) {
            console.log("---------->document的documentElement--->",args)
        }
    },
    createElement: function (args) {
        console.log("---------->document的createElement--->", args)
        if (args === "iframe") {
            return {}
        }
    },
    getElementsByTagName: function (args) {
        console.log("---------->document的getElementsByTagName--->", args)
        if (args === "meta") {
            return {}
        }
        if (args === "head") {
            return {}
        }
    },
    body: _body
};
location = {
    "ancestorOrigins": {},
    "href": "https://www.dingxiang-inc.com/business/captcha",
    "origin": "https://www.dingxiang-inc.com",
    "protocol": "https:",
    "host": "www.dingxiang-inc.com",
    "hostname": "www.dingxiang-inc.com",
    "port": "",
    "pathname": "/business/captcha",
    "search": "",
    "hash": ""
};
navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515",
    platform: "Win32",
    webdriver: false,
};
history = {};
screen = {};
localStorage = {};
sessionStorage = {};


get_enviroment(proxy_array)






