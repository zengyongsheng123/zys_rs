delete __dirname
delete __filename
window = global
function Window() {}
window.__proto__ = Window.prototype
window.Window = Window
delete global
delete Buffer
delete process
window.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
function Screen() {}
window.screen ={}
screen.__proto__ = Screen.prototype
function HTMLDocument(){}
Window = function () {}
window.__proto__ = Window.prototype
window.Window = Window
function HTMLCollection(){}
HTMLCollection = {}
HTMLCollection.__proto__ = HTMLCollection.prototype
window.HTMLCollection = HTMLCollection
function HTMLAllCollection(){}
HTMLAllCollection = {}
HTMLAllCollection.__proto__ = HTMLAllCollection.prototype
window.HTMLCollection = HTMLCollection
function HTMLBodyElement(){}
window.HTMLBodyElement = HTMLBodyElement
HTMLBodyElement.__proto__ = HTMLBodyElement.prototype
body = {}
body.__proto__ = HTMLBodyElement.prototype
document = {
  head: {},
  all: HTMLAllCollection,
  body: body,
  querySelector: function (args) {
    console.log("---------->document的querySelector--->",args)
   },
  getElementsByTagName: function (args) {
    console.log("---------->document的getElementsByTagName--->",args)
    if(args==="head"){
      return {
        appendChild: {
          src: "https://storage.360buyimg.com/webcontainer/main/js-security-v3-rac.js?v=20250306",
          type: "text/javascript"
        },
        HTMLCollection: HTMLCollection,
      }
    }
   },
  documentElement: function(args){
    console.log("---------->document的documentElement--->",args)
  },
  createElement: function (arg) {
    console.log("document的createElement--->",arg)
    if(arg==="canvas"){
        return {
            getContext: function (arg) {
                console.log("canvas的getContext--->",arg);
            }
        }
    }
    if(arg==="script"){
        return {
            parentNode: {
                appendChild: function (arg) {
                    console.log("script的appendChild--->",arg)
                },
                removeChild: function (arg) {
                    // console.log("script的removeChild--->",arg)
                }
            }
        }
    }
},
  createEvent: function (args) {
    console.log("---------->document的createEvent--->",args)
  },
  cookie: '3AB9D23F7A4B3C9B=P7MLKWGQRZ3SLXXEEPA36HPKZWLWB6YYPWRFOGCBBQFFMSZL56O7DVCK5TYPTIXH36HS26GIFXYNWJZM5T5EG5BVOI; __jdu=1736431854632894516456; shshshfpa=660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855; shshshfpx=660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855; __jda=76161171.1736431854632894516456.1736431855.1739696466.1741186929.4; __jdc=76161171; __jdv=76161171|direct|-|none|-|1741186929098; areaId=19; ipLoc-djd=19-1607-0-0; o2State={%22webp%22:true%2C%22avif%22:true%2C%22lastvisit%22:1741186931386}; shshshfpb=BApXS6EvfZfBA-lb62kUbGA0TRDBDQGMaBnQCH3pr9xJ1MknjYoG2; 3AB9D23F7A4B3CSS=jdd03P7MLKWGQRZ3SLXXEEPA36HPKZWLWB6YYPWRFOGCBBQFFMSZL56O7DVCK5TYPTIXH36HS26GIFXYNWJZM5T5EG5BVOIAAAAMVM3RYBIIAAAAADDITYONXFDVLDMX'
}
document.__proto__ = HTMLDocument.prototype
function Navigator(){}
window.navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
    platform: 'Win32',
    languages: [
    "zh",
    "zh-CN"
],
    plugins: {
    "0": {
        "0": {}
    },
    "1": {
        "0": {}
    },
    length:2
},
    hardwareConcurrency: 8,
    webdriver: false,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36'
}
navigator.__proto__ = Navigator.prototype
window.location ={
    "ancestorOrigins": {},
    "href": "https://www.jd.com/",
    "origin": "https://www.jd.com",
    "protocol": "https:",
    "host": "www.jd.com",
    "hostname": "www.jd.com",
    "port": "",
    "pathname": "/",
    "search": "",
    "hash": ""
}
function Location(){}
window.Location = Location
location.__proto__ = Location.prototype
function Storage(){}
window.Storage = Storage
localStorage = {
  getItem: function (args) {
    console.log("---------->localStorage的getItem--->",args)
    if (args === 'WQ_gather_cv1') {
      return '{"v":"0fb7f119e21bb6b17b2b0d333a5617bf","t":1741187940543,"e":31536000}'
  }
    else if (args === 'WQ_gather_wgl1') {
      return '{"v":"cdaea4efc7f06ecc0172753d962d6f68","t":1741187940543,"e":31536000}'
    }
    else if (args === 'WQ_dy1_vk') {
      return '{"5.0":{"73806":{"e":31536000,"v":"sw3dpxras93swc76","t":1741186929848},"b5216":{"e":31536000,"v":"xr3rpccppaswd980","t":1741186929686}}}'
    }
    else if (args === 'WQ_dy1_tk_algo') {
      return '{"xr3rpccppaswd980":{"b5216":{"v":"eyJ0ayI6InRrMDN3YzhkYjFkZDYxOG5NQURzM3RsWGo4MnplQkF4Z0RsSDdWY1ptSlBsU0dtYlBQNUFSdXhvbFhYbXB6VlNiWDNsUHd5RG9xdFpWQnNVYVJUSHJpd3NaWXpWIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdPUk5lZzNCV2pRSnMnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9","e":86400,"t":1741186931369}},"sw3dpxras93swc76":{"73806":{"v":"eyJ0ayI6InRrMDN3YjEzODFjYjExOG5KdnI4UW9DbjFPZWRiVko5WEo3elpGSkZNVFVMUld5ODRva3gwalZoZzBka09vVnVFZ19WdEl4ZlhlLWxWcUxlOHFZVXg0b29mQS1WIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdUYXVMcVNidVdvbGQnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9","e":86400,"t":1741186931769}}}'
    }
  },
  "setItem":function (arg){
    console.log("localStorage的setItem--->",arg);
},
  "removeItem":function (arg){
      console.log("localStorage的removeItem--->",arg);
  },
  "clear":function (arg){
      console.log("localStorage的clear--->",arg);
  },
  "key":function (arg){}
}

localStorage.__proto__ = Storage.prototype
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
// proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen']
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen', 'localStorage']

get_enviroment(proxy_array)