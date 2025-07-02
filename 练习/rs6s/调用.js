
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
              'if (typeof target[property] == "undefined"){debugger}' +
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
 proxy_array = ['window', 'document', 'location', 'navigator', 'history','screen']

let log_flag = true
function vlog(){
    if (log_flag){
        console.log(...arguments)
    }
}
_null = function (){
    vlog(arguments)
}
vlog("补环境开始")

window = global;
window.top = window;
window.HTMLFormElement = _null
div = {
    getElementsByTagName:function (arg){
        if (arg==="i"){
            return {length:0}
        }
    }
}
script = {
    0:{},
    1:{}
}
meta = {
    getAttribute:function (arg){
        if (arg==="r"){
            return "m"
        }
    },
    parentNode:{
        removeChild:_null
    }
}
document = {
    createElement:function (arg){
        vlog("createElement",arguments)
        if(arg==="div"){
            return div
        }
        if(arg==="form"){
            return {}
        }
    },
    appendChild:_null,
    removeChild:_null,
    getElementsByTagName:function (arg){
        vlog("getElementsByTagName",arguments)
        if (arg==="script"){
            return script
        }
        if(arg==="meta"){
            return [meta,meta]
        }
        if (arg==="base"){
            return {}
        }
    },
    getElementById: _null,
    addEventListener:_null,
    attachEvent :undefined,
}
location = {
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
window.addEventListener = _null
window.attachEvent = undefined
navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    webdriver:false
}
setTimeout = _null
setInterval = _null

vlog("补环境结束")
get_enviroment(proxy_array)

'ts_code'
require('./tscode')
function get_ck(){
    return document.cookie
}
// vlog(document.cookie)