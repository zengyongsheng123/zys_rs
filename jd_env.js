// --------------------------------------你要导入的模块包--------------------------------------------------------
const CryptoJs = require("crypto-js");
window=globalThis
function watch(obj,name){
    console_log= console.log
    return new Proxy(obj,{
        get(target, p, receiver) {
            if(p===Symbol.toPrimitive||p===Symbol.toStringTag||p==="Math"||p==="isNaN"||p==="encodeURI"||p==="Uint8Array"){

                return Reflect.get(target, p, receiver);
            }else {

                let  vel = Reflect.get(...arguments)
                if((typeof vel) ==='object'){
                    console_log('取值:',name,'.',p,'=>',typeof vel)
                    return Reflect.get(target, p, receiver);
                }
                if(p==='da_toString'){
                    return Reflect.get(target, p, receiver);
                }
                console_log('取值:',name,'.',p,'=>',vel)
                return Reflect.get(target, p, receiver);
            }
        },
        set(target, p, newValue, receiver) {
            let val = Reflect.get(...arguments)
            console_log(`设置值${name}.${p},${val}=>${newValue}`)
            return Reflect.set(target, p, newValue, receiver);
        }   ,
        has(target, p) {
            console_log(`in检测:${"'"+p+"'"} in ${name}=>>${p in target}`)
            return Reflect.has(target, p);
        },
        deleteProperty(target, p) {
            console_log(`删除了${name}中的${p}`)
            return Reflect.deleteProperty(target, p);

        },
        ownKeys(target) {
            console.log(`正在获取${name}对象的自有属性键`);
            return Reflect.ownKeys(target);
        },
        // getOwnPropertyDescriptor(target, p) {
        //     console.log(`获取了${name}中的${p}属性的描述符`);
        //     return Reflect.getOwnPropertyDescriptor(target, p);
        //
        // },
        // defineProperty(target, property, descriptor) {
        //     return Reflect.defineProperty(target, property, descriptor);
        // },
        getPrototypeOf(target) {
            console.log(`利用getPrototypeOf获取${name}对象中的原型链属性`);
            return  Reflect.getPrototypeOf(target);
        },
        // preventExtensions(target) {
        //     return Reflect.preventExtensions(target);
        // },
        // isExtensible(target) {
        //     return Reflect.isExtensible(target);
        // },
        // setPrototypeOf(target, prototype) {
        //     console.log(`利用setPrototypeOf设置了${name}中的设置了原型链对象属性`);
        //     return Reflect.setPrototypeOf(target, prototype);;
        // },
        apply(target, thisArg, args) {
            console.log(`${name}方法接收了`,args);
            return Reflect.apply(target, thisArg, args);
        },
        construct(target, args, newTarget) {
            console.log(`${name}方法构造参数接收了`,args);
            return  Reflect.construct(target, args, newTarget);
        }
    })
}
watch=function (a,b){
    return a
}
function makeFun(name) {
    //方法保护
    func = function () {
        console.log(`${name}-->`,arguments)
    };
    Object.defineProperty(func, 'name', { value: name });
    ps={}
    ps=watch(ps,`${name}.prototype`)
    func.prototype=ps
    func= watch(func,`${name}`)
    return func
}
setTimeout=function (){}
setInterval=function (){}
crypto=watch({},'crypto')
Element=makeFun('Element')
Element.prototype.da_toString=function (){
    return 'Element'
}
screen={
    da_toString:function (){
        return 'screen'
    },
    availHeight:816,
    availLeft:0,
    availTop:0,
    availWidth:1536,
    colorDepth:24,
    height:864,
    isExtended:false,
    onchange:null,
    orientation:{
        angle:0,
        onchange:null,
        type:"landscape-primary",
    },
    pixelDepth:24,
    width:1536,
}
document={
    da_toString:function (){
        return 'document'
    },

    createElement:function (a){
        // console.log("document-->createElement",a)
        if(a==='script'){
            script={
                parentNode:null,
            }
            script=watch(script,'script')
            return script
        }
    },
    createEvent:function (a){
        // console.log('document-->createEvent',a)
    },
    documentElement:watch({},'document.documentElement'),
    querySelector:makeFun('querySelector'),
    getElementsByTagName:function (a){
        // console.log('document-->getElementsByTagName',a)
        if(a==='head'){
            head={
                0:watch({
                    appendChild:function (a){
                        return a
                    },
                },'head[0]')
            }
            head=watch(head,'head')
            return head
        }
    },


}
navigator={
    lp:globalThis,
    appCodeName:"Mozilla",
    appName:"Netscape",
    appVersion:"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    deprecatedRunAdAuctionEnforcesKAnonymity:false,
    deviceMemory:8,
    vendor:"Google Inc.",
    vendorSub:"",
    language:"zh-CN",
    languages:['zh-CN'],
    userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    vendor:"Google Inc.",
    vendorSub:"",
    webdriver:false,
    da_toString:function (){
        return 'navigator'
    },
}
location={
    "ancestorOrigins": {},
    "href": "https://ntp.msn.cn/edge/ntp?locale=zh-CN&title=%E6%96%B0%E5%BB%BA%E6%A0%87%E7%AD%BE%E9%A1%B5&dsp=1&sp=%E5%BF%85%E5%BA%94&PC=CNNDDB&adppc=EDGEESS",
    "origin": "https://ntp.msn.cn",
    "protocol": "https:",
    "host": "ntp.msn.cn",
    "hostname": "ntp.msn.cn",
    "port": "",
    "pathname": "/edge/ntp",
    "search": "?locale=zh-CN&title=%E6%96%B0%E5%BB%BA%E6%A0%87%E7%AD%BE%E9%A1%B5&dsp=1&sp=%E5%BF%85%E5%BA%94&PC=CNNDDB&adppc=EDGEESS",
    "hash": ""
}
localStorage={
    getItem:function (a){
        // console.log("localStorage-->getItem",a)

    },

}
window=watch(window,'window')
document=watch(document,'document')
navigator=watch(navigator,'navigator')
location=watch(location,'location')
localStorage=watch(localStorage,'localStorage')
screen=watch(screen,'screen')

// *******************************************你全扣得网页代码***************************************************
// require("./decodeResult");
require("./demo");
// *******************************************你的核心逻辑代码***************************************************
