//如果代理函数的时候，打印了函数的所有内容了，证明没有保护该函数
ffglobal={};
//描述符检测，函数toString检测
!(() => {
        "use strict";
        const $toString = Function.toString;  //hook Function.toString 且命名为myToString
        //变量名取随机数防检测
        const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
        const myToString = function () {
            return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);   //谁调用这个方法,this就是谁,比如boda调用,这个this就是boda
        };
        function set_native(func, key, value) {
            //定义描述符
            Object.defineProperty(func, key, {
                "enumerable": false,
                "configurable": true,
                "writable": true,
                "value": value
            })
        };
        delete Function.prototype['toString']; //删除原型链上的toString
        set_native(Function.prototype, "toString", myToString); //自己定义个getter方法
        //myToString的 myFunction_toString_symbol属性设置为  function toString() { [native code] }
        //myFunction_toString_symbol= function toString() { [native code] }
        set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }"); //套个娃 保护一下我们定义的toString 否则就暴露了
        ffglobal.safefunction = (func, name) => {
            set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, name || ''}() { [native code] }`);
            set_native(func, 'name', `${myFunction_toString_symbol, name || ''}`);
            // }
        }; //导出函数到globalThis
    }).call(this);
//对象标识符检测
ffglobal.reNameObj = function reNameObj(obj, obname) {
        Object.defineProperty(obj.prototype, Symbol.toStringTag, {
            value: obname,
            configurable: true,
            writable: false,
            enumerable: false
        })
    };

/////============================
window=globalThis;
//delete global;
//delete Buffer;
delete process;
delete __dirname;
delete __filename;
Object.assign(window,{
    outerHeight:901,
    outerWidth:1412,
    chrome:{},
    setTimeout:function (){},
    setInterval:function (){},
})
document={};
location={};
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
history={};
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
localStorage={};
sessionStorage={};
/////============================
//这里面全是函数了，下面是demo
/////=========函数集合地===================
//window////////
window.addEventListener = function addEventListener(arg){
    if (arg ==='load'){
        return {}
    }
    console.log('window中的addEventListener的参数为==>', arg);
    debugger;
};ffglobal.safefunction(window.addEventListener,'addEventListener');
//document的地方/////
document.createElement=function createElement(arg){
        if (arg ==="div"){
            return {
                getElementsByTagName:function (arg){
                    console.log("getElementsByTagName的参数值是==>"+arg)
                    return {}
                }
            }
        }
        console.log('document中的createElement的参数为==>', arg);
        debugger;
    };ffglobal.safefunction(document.createElement, 'createElement');
document.getElementsByTagName =function getElementsByTagName(arg){
    if(arg==='meta'){
        return [
            {},{
            content:content,
            parentNode:{
                removeChild:function (){}
            },
            getAttribute:function (){}

            }
        ]}
    if (arg==='script'){
        return {
            0: {
                getAttribute: function (res) {
                    if(res == 'r'){
                        return 'm'
                    }
                },
                parentElement: {
                    removeChild: function (res) {}
                }
            },
            1: {
                getAttribute: function (res) {
                    if(res == 'r'){return 'm'}},
                parentElement: {
                    removeChild: function (res) {}
                }
            },
            length: 2
}}
    if (arg ==="base"){
        return {
            length: 0
        }}
    console.log('document中的getElementsByTagName的参数为==>', arg);
    debugger;
};ffglobal.safefunction(document.getElementsByTagName,'getElementsByTagName');
document.addEventListener=function addEventListener(arg){
    console.log('document中的addEventListener的参数为==>', arg);
    debugger;
};ffglobal.safefunction(document.addEventListener,'addEventListener')
document.removeChild = function (arg){
    console.log('document中的removeChild的参数为==>', arg);
    debugger;
};ffglobal.safefunction(document.removeChild,'removeChild')
document.getElementById = function (arg){
    console.log('document中的getElementById的参数为==>', arg);
    debugger;
};ffglobal.safefunction(document.getElementById,'getElementById')
//==========================================================================================================
//===========代理===============
let count = 0;
let skipCount = 0; // 设置你想跳过的打印次数
// 你可以定义一个数组，用来存放你想要忽略的属性名
let ignoreList = ["document","navigator","location","localStorage","sessionStorage"];
function proxy(obj, objName) {
    let printedProps = new Set();  // 用 Set 来保存已经打印过的属性名,过滤掉重复属性
    let handler = {
        get(target, prop, receiver) {
            // 你可以检查 prop 是否在忽略列表中，如果是，就直接返回原始值，不进行拦截
            if (ignoreList.includes(prop)) {return Reflect.get(target, prop, receiver);}
            // 其他部分不变
            if (!printedProps.has(prop)) {
                let result = Reflect.get(target, prop, receiver);
                count++;
                if (typeof result === 'function') {
                    if (result.toString().length<=60){
                        // 检查是否跳过打印
                        if (skipCount > 0) {skipCount--;} else {console.log('计数:', count, '[' + objName + ']', '获取属性', prop, '   [FF函数经过]=>', result.toString());}}else {
                        // 检查是否跳过打印
                        if (skipCount > 0) {skipCount--;} else {console.log('计数:', count, '[' + objName + ']', '获取属性(===toString值太长===):', prop);}}
                    result = proxy(result, objName + '.' + prop);  // 对函数属性进行递归代理
                }else if (typeof result === "object" && result !== null && result !== undefined) {
                    if (result.toString().length<=60){
                        // 检查是否跳过打印
                        if (skipCount > 0) {skipCount--;} else {console.log('计数:', count, '[' + objName + ']', '获取属性', prop, '   [OO对象经过]=>', result.toString());}}else {
                        // 检查是否跳过打印
                        if (skipCount > 0) {skipCount--;} else {console.log('计数:', count, '[' + objName + ']', '获取属性(===toString值太长===):', prop);}}
                    result = proxy(result, objName + '.' + prop);  // 对对象属性进行递归代理
                }else {
                    // 检查是否跳过打印
                    if (skipCount > 0) {skipCount--;} else {console.log('计数:', count, '[' + objName + ']', '获取属性', prop, '   [值为]=>', result);}}
                printedProps.add(prop);  // 记录已经打印过的属性
                return result}
            return Reflect.get(target, prop, receiver);
            },
        set(target, propKey, value, receiver) {
            // 同样，你可以检查 propKey 是否在忽略列表中，如果是，就直接返回原始值，不进行拦截
            if (ignoreList.includes(propKey)) {return Reflect.set(target, propKey, value, receiver);}
            // 其他部分不变
            if (!printedProps.has(propKey)) {
                count++;
                if (typeof value === 'function') {
                    if (value.toString().length<=60){
                        // 检查是否跳过打印
                        if (skipCount > 0) {skipCount--;} else {console.log('计数:', count,'['+objName+']', "  设置属性:", propKey, "   value:   ", value.toString())}}else {
                        // 检查是否跳过打印
                        if (skipCount > 0) {skipCount--;} else {console.log('计数:', count,'['+objName+']', "  设置属性(===toString值太长===):", propKey)}}} else {
                    // 检查是否跳过打印
                    if (skipCount > 0) {skipCount--;} else {console.log('计数:', count,'['+objName+']', "  设置属性:", propKey, "   value:   ", value);}}
                printedProps.add(propKey);  // 记录已经打印过的属性
            }
            return Reflect.set(target, propKey, value, receiver);
        }
    };
    return new Proxy(obj, handler);
}
/////=========构造函数============
Window=function Window(){};ffglobal.reNameObj(Window,'Window');
Document=function Document(){};ffglobal.reNameObj(Document,'Document');
HTMLDocument=function HTMLDocument(){};ffglobal.reNameObj(HTMLDocument,'HTMLDocument');
Location=function Location(){};ffglobal.reNameObj(Location,'Location');
History=function History(){};ffglobal.reNameObj(History,'History');
Navigator=function Navigator(){};ffglobal.reNameObj(Navigator,'Navigator');
Screen=function Screen(){};ffglobal.reNameObj(Screen,'Screen');
Storage=function Storage(){};ffglobal.reNameObj(Storage,'Storage');
////================原型绑定================///////
window.__proto__=Window.prototype;
document.__proto__=HTMLDocument.prototype;
HTMLDocument.prototype.__proto__=Document.prototype;
location.__proto__=Location.prototype;
history.__proto__=History.prototype;
navigator.__proto__=Navigator.prototype;
screen.__proto__=Screen.prototype;
localStorage.__proto__=Storage.prototype;
sessionStorage.__proto__=Storage.prototype;
/////===================代理对象=====================//////
window=proxy(window,'window')
document=proxy(document,'document')
navigator=proxy(navigator,'navigator')
location=proxy(location,'location')
history=proxy(history,'history')
screen=proxy(screen,'screen')
localStorage=proxy(localStorage,'localStorage')
sessionStorage=proxy(sessionStorage,'sessionStorage')
/////==========代码==================
