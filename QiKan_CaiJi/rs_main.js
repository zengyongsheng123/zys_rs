delete __filename;
delete __dirname;
// delete process;
// delete global;

function watch(obj, name) {
    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                if (typeof target[property] === "function") {
                    console.log("对象 => " + name + ",读取属性:" + property + ",值为:" + 'function' + ",类型为:" + (typeof target[property]))
                } else {
                    console.log("对象 => " + name + ",读取属性:" + property + ",值为:" + target[property] + ",类型为:" + (typeof target[property]))
                }
            } catch (e) {
            }
            return target[property]
        },
        set: (target, property, newValue, receiver) => {
            try {
                console.log("对象 => " + name + ",设置属性:" + property + ",值为:" + newValue + ",类型为:" + (typeof newValue))
            } catch (e) {
            }
            return Reflect.set(target, property, newValue, receiver)
        }
    })
}
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
var content="OHXgdazrh0Ro8QiTYZ5sI00m5XeTuBC1D89xVXhO3Ymn2oZR49bO6UW50TYjKj4xapti_4g1s0MsJ.mD2dvoh0Dzc3OTtOqap57ENxGrTwtHr4qcVyNVCZlRU1QkYhx5"
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen', "localStorage", "sessionStorage"]
window = global;
window.top = window;
window.self = window;

function Window() {}
window.Window = Window;

location = {
    "ancestorOrigins": {},
    "href": "https://qikan.cqvip.com/Qikan/Journal/JournalGuid?from=index",
    "origin": "https://qikan.cqvip.com",
    "protocol": "https:",
    "host": "qikan.cqvip.com",
    "hostname": "qikan.cqvip.com",
    "port": "",
    "pathname": "/Qikan/Journal/JournalGuid",
    "search": "?from=index",
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
    mimeTypes: {
    "0": {},
    "1": {},
   "application/pdf": {
        description:"Portable Document Format",
        suffixes: "pdf",
        type:"application/pdf"
   },
   "text/pdf": {},
},
};


window.addEventListener = function (args) {
    console.log("---------->window的addEventListener--->", args)
};
window.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
window.HTMLFormElement = function () {
    console.log('window的XMLHttpRequest的参数', arguments)
}
window.ActiveXObject=function (){
    console.log("window的ActiveXObject",arguments)
};
window.WebSocket=function (){
    console.log("window的WebSocket",arguments)
};
window.HTMLCanvasElement=function (){
    console.log("window的HTMLCanvasElement",arguments)
};
window.CanvasRenderingContext2D=function (){
    console.log("window的CanvasRenderingContext2D",arguments)
};
window.PointerEvent=function (){
    console.log("window的PointerEvent",arguments)
};
window.indexedDB={};
window.webkitRequestFileSystem=function (){
    console.log("window的webkitRequestFileSystem",arguments)
};
window.open=function (){};
window.Navigator=function (){
    console.log("window的Navigator",arguments)
};

window.__proto__=Window.prototype;

document = {
    createElement: function (args) {
        console.log("---------->document的createElement--->", args)
        if (args === "div") {
            return {
                style:{
                    visibility:'hidden',
                    position:'absolute',
                },
                getElementsByTagName: function (args) {
                    console.log("---------->div的getElementsByTagName--->", args)
                    if (args === "i") {
                        return []
                    }
                },
                setAttribute: function (arg, arg1) {
                    console.log("div标签的setAttribute方法接受的参数====>",arg,arg1)
                },
            }
        }
        if (args === "form") {
            return {}
        }
        if (args === "a") {
            return {
                "pathname": location.pathname,
                "search": location.search,
                "hash": location.hash,
                "href": location.href,
                "origin": location.origin,
                "protocol": location.protocol,
                "host": location.host,
                "hostname": location.hostname,
                "port": location.port,
            }
        }
        if (args === "input") {
            return {}
        }
    },
    getElementsByTagName: function (args) {
        console.log("---------->document的getElementsByTagName--->", args)
        if (args === "base") {
            return []
        }
        if (args === "script") {
            return {}
        }
        if(args==="meta"){
            return [
                {
                    'http-equiv': 'Content-Type',
                    content: 'text/html; charset=utf-8',
                    getAttribute: function (res) {
                        console.log('meta中getAttribute接收到的参数为：', res)
                    },
                },
                {
                    content: content,
                    parentNode: {
                        removeChild: function () {
                        }
                    },
                    getAttribute: function (res) {
                        console.log('meta中getAttribute接收到的参数为：', res)
                    },
                }
            ]
        }
    },
    getElementById: function (args) {
        console.log("---------->document的getElementById--->", args)
    },
    addEventListener: function (args) {
        console.log("---------->document的addEventListener--->", args)
    },
    attachEvent: function (args) {
        console.log("---------->document的attachEvent--->",args)
     },
    visibilityState:'visible',
    body: function (arg){console.log('document的body获取参数====>',arg)},
    documentElement: {
        appendChild: function () {
            console.log('document的documentElement的参数', arguments)
        },
        style:{},
        getAttribute: function () {
            console.log('document.documentElement的getAttribute获取参数:', arguments)
        },
    },
    all:{length:0},
    createExpression: function (args) {
        console.log("---------->document的createExpression--->", args)
    },
    appendChild: function () {
        console.log('document的appendChild的参数', arguments)
    },
    removeChild: function () {
        console.log('document的removeChild的参数', arguments)
    },
};


localStorage={
    "_$rc": "3Ph2NxRzvRxNwqU3HAtZhUWKuAwe1xf2yTZG8YJMnJOvb2d.o7WU55VIK._XDNpRs0za_8XtoORCmGCAl9jGKCmRQWabWf5XS2jIbPuyCDARF06kb3ETOP9pKiS7WQwh5kRVOHwxMHBKnYmb1u7RAfuhjeKD6am_zjeTIVAtEjy9GvKKrvhNxxk9XBqr2gpJBPEnG1n3WPhImw68myVH8L.zoQEdWUPv25Du6Tt5snO2JUFTtfIF__8s8imgaVefCDGg43MPGOG3cJXJnUpqCv8Dvd6xHjGIAGNC527Ln2BCG4Z8k4jRYNheqXHvMon4Hi.yT0O_FsbpiJiv710ARpQjRBKuMzn_tUzw07172FvE8iOtbJojqYzjvZYaxi3CL6PKVqflUKSQ_r7c_B.a.jJUCrlDHkgYG2.TFhOR_9vcSS8YHLp7zTJG3kbREmrH027tvi_wjXrAchRQ6d5MDVlrE1NmqZZM9DqpvYkIUD2bKMiFoI_spvaYD46EXMlFlUUTZRiW78kjrTdMil5P4dLe_VM37Wu2M7fmaLGd9D6_H5dISI1my.3WV0lf5Yv_kYruKjbM9X6dPHdnFRAeyDtzdwnjpPmz.w5Ju0hOYmwwtcNcrgU1uq_BLqW.OtX_3bkLDm3NEJK1PbuIfHvVv.eP.bJRM.9ol24mxszRwemAXQYF73Hxc12M4UbV55BPYQTY5QtYQjjFrFVypBOaLXpXh1wRMwX0UzdT5jsop7FkMBbMhQT4eLd201Pl1NqdXT7kp6AdQZtW3szp",
    "qdwpa_saas_d2_2885776891": "qEuT3oRw5hq5uxE5SCHq4yvE7PG5wd20ASAGStaPKTaF4lcA+XBZRYAGU9MVC5uw0BA8HUSpx+qg3PEq0XzLRqU18IZgJ1NDfJZqOVaKFoYlUxLp/P9d6ICf9fzYeninlUyH+waAItEoz2znnicZYxEani/ovJd/7+C6FaCx3coThTEYJFViopYBCt6FGpnhVISS8i71vUuXxndnmzG0Zg4xOad7u5+ufOaraOlmT7pTRoRovGP/Cvy9iMatpqRQdRRagb/pgQD2gbdvwdaSksCBV3VVh4GNj6OQwNq+OmRwM6bjA6l/J29YZqK1E3TNJ/+kr8OKoRA=",
    "_qd_fst": "1733500800000",
    "qdwpa_saas_user_id_2885776891": "581733582252937",
    "_qd_latest": "{\"latest_utm\":{}}",
    "__#classType": "localStorage",
    "Hm_lvt_fee827c3dc795c5122daf5ee854c1683": "1773899137523|1742362819",
    "auyst": "1733582246",
    "syfhs": "1142959123",
    "lswucn": "T2gAcr59aMyUCp7eZHdWEvtx84b5tYgo4mMeJXw1oAnNrvTr-RRE8SidVMGI4cHwBBc=@@1742362819",
    "ETLCD": "false",
    "qdim_saas_d2_2885776891": "",
    "lstest": "1",
    "tfstk__": "gSXmbpghjsRXr5bKkaJb9z8JrRPJHm96jNH9WdLaaU8WDiQYG1fl7GcODdIwSNbJPnsAkS1GrtbSMhITGlblnaGvXGFbj4sdoOQGfotw7N7MWsF8pisXCdzdIJedckVImYbD0ClzbhKn_ud48UvFZdzLJ8erDNIJQZnI1Cyl4Uti3ARV7LuyXUuZQN82a4-HAd8N7NJraHttQARZgbyyPhJw7NJaqLlfl08vQLWzzkDjAaA8tTKDieS2uiIAUPAjGiLoQAWlZIYUeUDZQTxc2G83hvV986Tv9UQzexvG4hbHxZ0zrdSlh9AP3zMMNLLvstS8-XTFaZpP36mZQgvDPQWflq4k8tsPdLR8LkjPFZIfEGnaQ3Qpzi62IJrBnK82E36TPx8Ga1WvGdg4odSkbgumaXWC-AtzXTls1I-WqeKKsiMVaQOMxuqoT6O2Vn_Lqucs1I-WqeEuqXrWg3tfJ",
    "$_YWTU": "ubHGbLe_K1T_621orLYlsq4em8VjQDLsrsZV6OQkslq",
    "qdwpa_saas_uuid_2885776891": "bdbd7fb806f1f91db745336710fd2a87",
    "tencentSig": "760933582251128",
    "Hm_lvt_17262dc62ce874a510e9c97140f381d6": "1773899137611|1742362819",
    "$_YVTX": "iA",

    // 方法
    removeItem: function (arg) {
        console.log('window的localStorage的removeItem接受的参数======>', arg);
    },
    setItem: function (key, value) {
        console.log('window的localStorage的setItem接受的参数======>', key);
        localStorage.key=value;
    },
    getItem: function (key) {
        console.log('window的localStorage的getItem接受的参数======>', key);
        if(key==="$_YWTU"){
            return localStorage.$_YWTU;
        }
        if(key==="$_rc"){
            return localStorage.$_rc;
        }
    },
    clear: function (arg) {
        console.log('window的localStorage的clear接受的参数:', arg);
    },
    key: function (arg) {
        console.log('window的localStorage的key接受的参数======>', arg);
    }
}
sessionStorage={
    "lstest": "1",
    "HMACCOUNT": "72681BA8A47131F0",
    "$_YWTU": "ubHGbLe_K1T_621orLYlsq4em8VjQDLsrsZV6OQkslq",
    "Hm_lpvt_fee827c3dc795c5122daf5ee854c1683": "1742363138",
    "Hm_lpvt_17262dc62ce874a510e9c97140f381d6": "1742363138",
    "$_YVTX": "iA",

    // //方法
    removeItem: function (arg) {
        console.log('window的sessionStorage的removeItem接受的参数======>', arg);
    },
    setItem: function (key, value) {
        console.log('window的sessionStorage的setItem接受的参数======>', arg);
        sessionStorage.key=value;
    },
    getItem: function (key) {
        console.log('window的sessionStorage的getItem接受的参数======>', key);
        if(key==="$_YWTU"){
            return sessionStorage.$_YWTU;
        }
    },
    clear: function (arg) {
        console.log('window的sessionStorage的clear接受的参数:', arg);
    },
    key: function (arg) {
        console.log('window的sessionStorage的key接受的参数======>', arg);
    }
};
history={};
screen={};
setInterval = function(){};
setTimeout = function(){};

window=watch(window, "window对象");
document=watch(document,"document对象");
navigator=watch(navigator,"navigator对象");
location=watch(location,"location对象");
history=watch(history,"history对象");
screen=watch(screen,"screen对象");
localStorage=watch(localStorage,"localStorage对象");
sessionStorage=watch(sessionStorage,"sessionStorage对象");
// get_enviroment(proxy_array);

require('./rs_ts');
require('./rs_func');

function get_cookie() {
    ck=document.cookie;
    ck_length=ck.split(';')[0].split('=')[1].length;
    console.log('cookie长度=======>',ck_length);
    return ck;
}
console.log(get_cookie());
