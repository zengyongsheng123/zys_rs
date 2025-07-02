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
proxy_array = ['window']

window = global
delete global
delete Buffer
window.requestAnimationFrame = function (){}
XMLHttpRequest = function (){}
_sdkGlueVersionMap = {
    "sdkGlueVersion": "1.0.0.64-fix.01",
    "bdmsVersion": "1.0.1.19-fix.01",
    "captchaVersion": "4.0.10"
}
window.EventSource = function (){}
navigator = {
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
}
document = {}
get_enviroment(proxy_array)