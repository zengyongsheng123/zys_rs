delete __filename;
delete __dirname;
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
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen','Object']

// var content="meta_content_replace";
// var content="ZInUCuQmqTQHc1WQviZqZcZqYpncjaO5bTrB72Ds9Dq";

//补的一些环境
//window环境
window = global;
window.top=window;
window.self=window;
window.addEventListener=function (){
    console.log("window的addEventListener",arguments)
};
window.attachEvent=function (){
    console.log("window的attachEvent",arguments)
};

//document环境
document = {
    body: {
    },
    appendChild : function (){
        // console.log("appendChild")
    },
    removeChild: function (){
        // console.log("removeChild")
    },
    createElement: function (arg) {
        console.log('document的createElement获取参数:', arg)
        if (arg === 'div') {
            return {
                getElementsByTagName: function (res) {
                    if (res == 'i') {
                        return []
                    } else {
                        console.log('argumentsError：' + 'div.getElementsByTagName' + '的参数应该是："' + res + '"。')
                    }
                }
            }
        }
        if(arg==="form"){
            return {}
        }
        if(arg==="input"){
            return {}
        }
    },
    getElementsByTagName: function (arg) {
        console.log('document的getElementsByTagName获取参数:', arg)
        if (arg === 'meta') {
            return []
        } else if (arg === 'base') {
            return []
        } else if (arg === 'script') {
            return [
                {
                    getAttribute: function (res) {
                        console.log('argumentsError：' + 'script[0].getAttribute' + '的参数应该是："' + res + '"。');
                        if (res === 'r') {
                            return "m"
                        }
                    },
                    parentElement: {
                        removeChild: function (arg) {
                            console.log('script的parentElement的removeChild接受的参数:', arg);
                        }
                    },
                    parentNode: {
                        removeChild: function (arg) {
                            console.log('script的parentNode的removeChild接受的参数:', arg);
                        }
                    },
                },
                {
                    getAttribute: function (res) {
                        console.log('argumentsError：' + 'script[1].getAttribute' + '的参数应该是："' + res + '"。');
                        if (res === 'r') {
                            return "m"
                        }
                    },
                    parentElement: {
                        removeChild: function (arg) {
                            console.log('script的parentElement的removeChild接受的参数:', arg);
                        }
                    },
                    parentNode: {
                        removeChild: function (arg) {
                            console.log('script的parentNode的removeChild接受的参数:', arg);
                        }
                    },
                }
            ]
        }
    },
    getElementById: function (arg) {
        console.log('document的getElementById获取参数:', arg)
    },
    addEventListener: function () {
        console.log('document的addEventListener获取参数:', arguments)
    },
    attachEvent: function () {
        console.log('document的attachEvent获取参数:', arguments)
    },
}


location={
    "ancestorOrigins": {},
    "href": "https://www.ouyeel.com/search-ng/queryResource/index",
    "origin": "https://www.ouyeel.com",
    "protocol": "https:",
    "host": "www.ouyeel.com",
    "hostname": "www.ouyeel.com",
    "port": "",
    "pathname": "/search-ng/queryResource/index",
    "search": "",
    "hash": ""
}

navigator={
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.67",
};

setTimeout=function () {

}
setInterval=function () {

}

get_enviroment(proxy_array)
//导入ts和解析ts的自执行方法

require('./rs_ts');
require('./rs_func');
//外链js文件
// 'tsCode'
//自执行函数
// 'autoJsCode'

function get_cookie() {
    return document.cookie;
}
console.log(get_cookie());





