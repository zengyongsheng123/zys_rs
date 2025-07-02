function get_enviroment (proxy_array) {
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
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen']

window=global;
window.top=window;
window.self=window;
window.addEventListener=function (args) {
    console.log("---------->window的addEventListener--->",args)
}


location={
    "ancestorOrigins": {},
    "href": "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html",
    "origin": "https://qiye.obei.com.cn",
    "protocol": "https:",
    "host": "qiye.obei.com.cn",
    "hostname": "qiye.obei.com.cn",
    "port": "",
    "pathname": "/web-zone/bwzy/procurement.html",
    "search": "",
    "hash": "",
}


document={
    appendChild:function (args){
        console.log("---------->document的appendChild--->",args)
    },
    removeChild:function (args){
        console.log("---------->document的removeChild--->",args)
    },
    createElement:function (args) {
        console.log("---------->document的createElement--->",args)
        if(args==="div"){
            return {
                getElementsByTagName: function (args) {
                    console.log("---------->div的getElementsByTagName--->",args)
                    if(args==="i"){
                        return []
                    }
                 }
             }
         }
     },
    getElementsByTagName: function (args) {
        console.log("---------->document的getElementsByTagName--->",args)
        if(args==="base"){
            return {}
        }
        if(args==="script"){
            return {}
        }
     },
    getElementById: function (args) {
        console.log("---------->document的getElementById--->",args)
     },
 }



setInterval = function () {
}
setTimeout = function () {
}
get_enviroment(proxy_array)

require('./rs_ts')
require('./rs_func')

console.log(document.cookie);
function get_cookie(){
    return document.cookie;
}