window = global;

// 全局存储器
memory  = {
    'setProxy': true,                                       // 是否进行代理(代理的对象是补的环境对象的每一个对象)
    'setLog':true,                                          // 是否输出 set捕获的日志
    'getLog': true,                                          // 是否输出 get捕获的日志
    'setDebugger': false,                                    // 是否断点 set捕获
    'getDebugger':false,                                     // 是否断点 get捕获
    'funTostringDebugger':false,                             // 函数tostring检测  正常代码谁toString啊
    'callFunDebugger': true,                                // 调用了补的函数是否断点
    'node':[],                                               // 存放运行中window的undefined变量  最后直接去node遍历里面输出是否undefined 突破node检测
    'nodes':{},                                              // 存放undefined
    'order':0,                                               // 日志的输出排序号码 (便于查看位置)
    'log':0,                                                 // 插桩输出序号定位
    'passOrder':0 ,                                          // 跳过低于这个序号的代理断点
    'random':0.5,                                            // hook随机数
    'timestamp': false,                              // hooks时间戳
    'data':{},                                               // 存放本地模拟的对象
    'cookies': {},                                           // 存放cookie
    'EventListener':{},                                      // 存放事件
    'attachEvent': {},                                       // 存放事件
    'create_element': {},                                    // 存放创建dom的元素方法
    'objects': {},                                           // 存放一些对象
    'domElement' : {'body':{}},                              // 存放html的dom层级关系
    'promise':{},
    'tree':{},
};

// 突破node检测  应用在python的execjs
memory.delete = function(obj,prop){delete prop || Object.defineProperty(obj,prop, {get:function() {return undefined;}})};
node_obj = ['global'];  // 这里用上面的node  在最后运行代码结束时拿出来node填充的进行替换  在vm2运行这个不用搞
node_obj.map((x)=>{memory.delete(window,x)});

if(memory.random){Math.random = function(){return memory.random}}
if(memory.timestamp){Date.prototype.getTime = function (){return memory.timestamp}}

// 调用后给对象挂上代理
memory.proxy = function(name){
    let paramObj = memory.data[name] || window[name]
    if(memory.setProxy == false)return paramObj
    const handler1 = {
        set(obj, prop, value) {
            if(memory.setLog){
                if(typeof(value) == 'function'){
                    zhi = 'function'
                }else{
                    zhi = obj[prop]
                }
                // console.log('方法 : set\t序号 : '+ (++memory.order) + '\t对象 : '+obj.SHENzhi + '\t属性 : ',prop,'\t值 : ',value)
            }
            // if(memory.setDebugger && memory.passOrder<=memory.order){debugger}
            return Reflect.set(...arguments)
        },
        get(obj, prop){
            if(obj.SHENzhi=='window'){return obj[prop]}
            if(memory.getLog){
                if(typeof(obj[prop]) == 'function'){
                    zhi = 'function'
                }else{
                    zhi = obj[prop]
                }
                // console.log('方法 : get\t序号 : ' + (++memory.order) + '\t对象 : ' + obj.SHENzhi + '\t属性 : ' , prop ,'\t值 : ', zhi)
            }
            if(obj.SHENzhi=='window' && obj[prop]==undefined){memory.node.push(prop)};
            if(obj[prop]==undefined){memory.nodes[obj.SHENzhi]? memory.nodes[obj.SHENzhi].push(prop):memory.nodes[obj.SHENzhi]=[],memory.nodes[obj.SHENzhi].push(prop)}
            // if(memory.getDebugger && memory.passOrder<=memory.order){debugger}
            return obj[prop]

        }};
    return new Proxy(paramObj, handler1);
};


// 调用后方法tostring保护
memory.protect = (function() {
    "use strict";
    //原函数
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('',')_',(Math.random() + '').toString(36)));
    //自定义函数
    const myTostring = function(){
        // if(memory.funTostringDebugger){debugger}

        // return '=this;=this,=module;=module,arguments'
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };
    function set_native(func,key,value){
        Object.defineProperty(func,key,{
            "enumerable":false,
            "configurable":true,
            "writable":true,
            "value":value
        })
    }
    delete Function.prototype['toString']; //删除原型是toString
    set_native(Function.prototype,"toString",myTostring);
    set_native(Function.prototype.toString,myFunction_toString_symbol,"function toString() { [native code] }");
    function protect(func){
        if(typeof(func) == 'function'){
            set_native(func,myFunction_toString_symbol,'function '+func.name+'() { [native code] }')

        }};
    return protect
})();

// 调用后对象的名字改变
memory.rename = function (target,name){
    Object.defineProperties(target,{
        [Symbol.toStringTag]:{
            value:name,
            configurable:true
        }
    })
};

// 设置对象为不可枚举    模拟浏览器的那些灰色暗淡的变量名
memory.NO_enumerable = function(obj,pro){
    Object.defineProperty(obj,pro,{
        enumerable:false
    })
};

// 调用后组成对象原型链
memory.make_chain = function(target,obj){
    let fff;
    if(obj){
        first = obj;
        fff = 0;
        memory.rename(obj,target[0])
    }else{
        firstName = target[0]
        first = memory.data[firstName] || window[firstName] || memory.create_element[firstName];
        first.SHENzhi = firstName;
        memory.rename(first,target[1]); //先把对象的名字改变  如: window的名字为 Window
        fff = 1
    }
    first.chain = target;
    for(let i=0;i<target.length-1;i++){
        let nextName = target[i + fff];
        let second = window[nextName] || memory.data[nextName];
        // 要么对象构造  要么函数构造
        if(typeof second == "object"){
            memory.rename(second,nextName);
            first.__proto__ = second;
        }else if(typeof second == "function"){
            memory.rename(second.prototype,nextName);
            first.__proto__ = second.prototype;
        }else{
            // 这种情况只能是获取到的是 undefined
            throw new TypeError('原型链的组成时没有在全局window或者全局缓存找到该变量:'+nextName);
        }
        first = first.__proto__;
    }
};

// 调用后会创建一个挂了代理的对象
memory.createProxyObject = function(name,obj){
    if(obj){
        memory.data[name] = obj;
    }else{
        memory.data[name] = {};
    }
    memory.data[name].SHENzhi = name;
    memory.rename(memory.data[name],name)
    return memory.proxy(name)
}

// 深拷贝
memory.deepCopy = function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    };
    memory.make_chain(p.chain,c)
    return c;
};


// 浅拷贝
memory.extendCopy = function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
    memory.make_chain(p.chain,c);
    return c;
};


// dom标签构建
memory.domStr = function domStr(x){
    let zhi = '<'+x.SHENzhi;
    if(x.class){
        zhi += ' class="'+x.class+'"'
    }
    if(x.id && x.id != "50000000"){
        zhi += ' id="'+x.id+'"'
    }
    if(x.content){
        zhi += x.content;
    }
    zhi += '>'

    if(x.childNodes && x.childNodes.length){
        for(let sx of x.childNodes){
            zhi += domStr(sx);
        }
    };
    zhi += '</'+x.SHENzhi+'>';
    if(x.siblingNode && x.siblingNode.length){
        for(let sx of x.siblingNode){
            zhi += domStr(sx);
        }
    };
    return zhi;
};


memory.domForObj = function domForObj(a,y){
    for(let x of a.childNodes){
        if(x.id == y){
            return x
        }
        if(x.childNodes.length>0){
            let zhi = domForObj(x,y)
            if(zhi){
                return zhi
            }
        }

    }
};

memory.domForObj_2 = function domForObj(a,y){
    for(let x of a.childNodes){
        if(x == y){
            return a
        }
        if(x.childNodes.length>0){
            let zhi = domForObj(x,y)
            if(zhi){
                return zhi
            }
        }

    }
};


;
memory.objects.RTCPeerConnection = memory.createProxyObject('RTCPeerConnection');

memory.objects.RTCPeerConnection.localDescription = {
    "sdp":"v=0\r\no=- 627758748607417531 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 1961 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 117.152.145.34\r\na=candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 49812 typ host generation 0 network-cost 999\r\na=candidate:842163049 1 udp 1677729535 117.152.145.34 1961 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=ice-ufrag:/CYr\r\na=ice-pwd:QRs0Mo7A0ouqDBYDlcvDSjPQ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 BC:AC:D1:9B:EC:2F:F1:47:B5:EF:6D:2F:1A:E3:B6:9F:2B:76:07:CF:32:90:9F:B0:33:A6:90:63:F9:25:45:59\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
    "type":"offer"
};
memory.objects.RTCPeerConnection.createDataChannel = function createDataChannel(x){
    // debugger;
    return memory.createProxyObject(x)
};memory.protect(memory.objects.RTCPeerConnection.createDataChannel);

memory.objects.RTCPeerConnection.createOffer = function createOffer(x){
    return {
        'candidate':{
            address: "a3198269-2c6e-4adc-828e-b7f9c949277d.local",
            candidate: "candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 55154 typ host generation 0 ufrag gcmS network-cost 999",
            component: "rtp",
            foundation: "3539891574",
            port: 55154,
            priority: 2113937151,
            protocol: "udp",
            relatedAddress: null,
            relatedPort: null,
            sdpMLineIndex: 0,
            sdpMid: "0",
            tcpType: "",
            type: "host",
            usernameFragment: "gcmS",
        },
        'then':function(x){
            memory.promise['3'] = x;
            return memory.createProxyObject('createOffer');
        }
    }
};memory.protect(memory.objects.RTCPeerConnection.createOffer);

memory.objects.RTCPeerConnection.setLocalDescription = function setLocalDescription(x){
    // return {'then':function(){debugger}}

};memory.protect(memory.objects.RTCPeerConnection.setLocalDescription);


;
window.length = 0; //内嵌了页面frame

window.onmessage = null;
window.outerHeight = 864;
window.innerHeight = 360;
window.outerWidth = 1474;
window.innerWidth = 360;
// window.name = "https://turing.captcha.qcloud.com"
window.name = ""
window.performance = memory.createProxyObject('performance');
window.indexedDB = {

};
window.indexedDB.open = function open(){
    return memory.createProxyObject('IDBFactory')
};memory.protect(window.indexedDB.open);

window.chrome =  memory.createProxyObject('chrome');
window.chrome.runtime = memory.createProxyObject('chrome_runtime');

window.clientInformation = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    bluetooth:  memory.createProxyObject('bluetooth'),
    clipboard: memory.createProxyObject('clipboard'),
    cookieEnabled: true,
    deviceMemory: 8,
    hardwareConcurrency: 12,
    keyboard: memory.createProxyObject('keyboard'),
    language: "zh-CN",
    languages: ["zh-CN","zh"],
    locks:  memory.createProxyObject('locks'),
    onLine: true,
    platform: "Win32",
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWeb…KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    vendor: "Google Inc.",
    vendorSub: "",
    wakeLock:memory.createProxyObject('wakeLock'),
    usb:memory.createProxyObject('usb')
};memory.proxy('clientInformation')



window.openDatabase = function openDatabase(){
    // if(memory.callFunDebugger){debugger}
    return {version: "",transaction:function(){}}
};memory.protect(window.openDatabase);


window.FileReader = function FileReader(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.FileReader);

window.webkitRequestFileSystem = function(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.webkitRequestFileSystem);

window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.SpeechSynthesisUtterance);



window.MediaEncryptedEvent = function MediaEncryptedEvent(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.MediaEncryptedEvent);


window.open = function open(method,url){
    // if(memory.callFunDebugger){debugger}
    return url
};memory.protect(window.open);

window.DOMParser = function DOMParser(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.DOMParser);

window.XMLHttpRequest = function XMLHttpRequest(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.XMLHttpRequest);

window.XMLHttpRequest.prototype.open = function(){
    // if(memory.callFunDebugger){debugger}
    return arguments[1]
};memory.protect(window.XMLHttpRequest.prototype.open);

window.fetch = function fetch(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.fetch );

window.Request = function Request(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.Request);

window.SourceBuffer = function SourceBuffer(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.SourceBuffer);

window.ScreenOrientation = function ScreenOrientation(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.ScreenOrientation);

window.Path2D = function Path2D(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.Path2D);

window.HTMLFrameSetElement = function HTMLFrameSetElement(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.HTMLFrameSetElement);

window.CDATASection = function CDATASection(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.CDATASection);

window.SVGGraphicsElement = function SVGGraphicsElement(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.SVGGraphicsElement);

window.PerformancePaintTiming = function PerformancePaintTiming(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.PerformancePaintTiming);



window.atob = function atob(s) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    s = s.replace(/\s|=/g, '');
    var cur,
        prev,
        mod,
        i = 0,
        result = [];
    while (i < s.length) {
        cur = base64hash.indexOf(s.charAt(i));
        mod = i % 4;
        switch (mod) {
            case 0:
                //TODO
                break;
            case 1:
                result.push(String.fromCharCode(prev << 2 | cur >> 4));
                break;
            case 2:
                result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                break;
            case 3:
                result.push(String.fromCharCode((prev & 3) << 6 | cur));
                break;
        }
        prev = cur;
        i ++;
    }
    return result.join('');
};memory.protect(window.atob);
window.btoa  = function btoa(s) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    if (/([^\u0000-\u00ff])/.test(s)) {
        throw new Error('INVALID_CHARACTER_ERR');
    }
    var i = 0,
        prev,
        ascii,
        mod,
        result = [];
    while (i < s.length) {
        ascii = s.charCodeAt(i);
        mod = i % 3;
        switch(mod) {
            // 第一个6位只需要让8位二进制右移两位
            case 0:
                result.push(base64hash.charAt(ascii >> 2));
                break;
            //第二个6位 = 第一个8位的后两位 + 第二个8位的前4位
            case 1:
                result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
                break;
            //第三个6位 = 第二个8位的后4位 + 第三个8位的前2位
            //第4个6位 = 第三个8位的后6位
            case 2:
                result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
                result.push(base64hash.charAt(ascii & 0x3f));
                break;
        }
        prev = ascii;
        i ++;
    }
    // 循环结束后看mod, 为0 证明需补3个6位，第一个为最后一个8位的最后两位后面补4个0。另外两个6位对应的是异常的“=”；
    // mod为1，证明还需补两个6位，一个是最后一个8位的后4位补两个0，另一个对应异常的“=”
    if(mod == 0) {
        result.push(base64hash.charAt((prev & 3) << 4));
        result.push('==');
    } else if (mod == 1) {
        result.push(base64hash.charAt((prev & 0x0f) << 2));
        result.push('=');
    }
    return result.join('');
};memory.protect(window.btoa);


window.alert = function alert(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.alert);
window.setInterval = function setInterval(x){
    memory.promise['2'] = x;
    return 1
};memory.protect(window.setInterval);
window.clearInterval = function clearInterval(){
};memory.protect(window.clearInterval);
window.setTimeout = function setTimeout(x){
    memory.promise['1'] = x;
    return 1
};memory.protect(window.setTimeout);
window.clearTimeout = function clearTimeout(){

};memory.protect(window.clearTimeout);


eval_ = eval;
eval = function eval(x){
    return eval_(x)
};memory.protect(eval);

window.HTMLFormElement = function HTMLFormElement(){
    // if(memory.callFunDebugger){debugger}
};memory.protect(window.HTMLFormElement);


// 查看ip信息
window.RTCPeerConnection = function RTCPeerConnection(x){
    return memory.objects.RTCPeerConnection
};memory.protect(window.RTCPeerConnection);


window.matchMedia = function matchMedia(x){
    return {'matches':true}
};memory.protect(window.matchMedia);

window.CSS = function CSS(x){
    // debugger
    return {}
};memory.protect(window.CSS);


window.CSS.supports = function supports(x){
    return true
};memory.protect(window.CSS.supports);

window.customElements = memory.createProxyObject('customElements')

window.CSSStyleSheet = {};
window.CSSStyleSheet.cssRules = [{cssText: "::marker { }"}]

col = ['rgb(0, 128, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 0)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)', 'rgb(255, 0, 0)']
window.getComputedStyle = function getComputedStyle(){
    let obj = memory.createProxyObject('CSSStyleDeclaration');
    obj.getPropertyValue = function(x){
        if('color'==x){
            return col.shift()
        }
    }
    return obj
};memory.protect(window.getComputedStyle);


window.SyncManager = function SyncManager(x){
    return true
};memory.protect(window.SyncManager);

window.RTCPeerConnectionIceEvent = function RTCPeerConnectionIceEvent(){
    // debugger
};memory.protect(window.RTCPeerConnectionIceEvent);
Window = function Window(){
    throw new TypeError('Illegal constructor');
};memory.protect(Window);

Window.prototype.TEMPORARY = 0;
Window.prototype.PERSISTENT = 1;
memory.data.WindowProperties = {};
EventTarget = function EventTarget(){};memory.protect(EventTarget);




EventTarget.prototype.addEventListener = function addEventListener(x,y){
    memory.EventListener[x] ? memory.EventListener[x].push(y) : memory.EventListener[x] = [y]
};memory.protect(EventTarget.prototype.addEventListener);
Node = function Node(){
    throw new TypeError('Illegal constructor');
};memory.protect(Node);


Node.prototype.appendChild = function appendChild(newNode){
    if(this.SHENzhi == 'body' || this.SHENzhi == 'head'){
        document.childNodes.push(this);
    }
    if(newNode.parentNode){
        newNode.parentNode.removeChild(newNode);
        newNode.parentNode = undefined;
    }
    if(this == newNode || this == newNode.parentNode){
        return newNode
    }
    if(!this.childNodes.some((x)=>{return x==newNode})){
        this.childNodes.push(newNode);
        newNode.parentNode = this;
    }
    return newNode;
};memory.protect(Node.prototype.appendChild);


Node.prototype.removeChild = function removeChild(child){
    let index = this.childNodes.indexOf(child);
    if(index != -1){
        this.childNodes.splice(index,1);
        child.parentNode = undefined;
    }
    return child
};memory.protect(Node.prototype.removeChild);


Node.prototype.replaceChild = function replaceChild(newChild, oldChild){
    if(newChild==oldChild){
        return oldChild
    }
    if(this.childNodes.some((x)=>{return x==newChild})){
        this.childNodes.splice(this.childNodes.indexOf(newChild),1)
    }
    for(let i=0; i<this.childNodes.length; i++){
        if(oldChild == this.childNodes[i]){
            this.childNodes[i] = newChild;
            return oldChild
        }
    }
};memory.protect(Node.prototype.replaceChild);


Node.prototype.cloneNode = function cloneNode(x){
    if(x){
        return memory.extendCopy(this);
    }else{
        zhi = memory.extendCopy(this);
        zhi.childNodes = []
        return zhi
    }
};memory.protect(Node.prototype.cloneNode);


Node.prototype.insertBefore = function insertBefore(newNode, referenceNode){
    if(this.childNodes.some((x)=>{return x==newNode})){
        this.childNodes.splice(this.childNodes.indexOf(newNode),1)
        for(let i=0; i<this.childNodes.length; i++){
            if(referenceNode == this.childNodes[i]){
                this.childNodes.splice(i++,0,newNode)
            }
        }
    }else{
        this.childNodes.push(newNode)
    };
    return newNode
};memory.protect(Node.prototype.insertBefore);


HTMLElement = function HTMLElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLElement);
Element = function Element(){
    throw new TypeError('Illegal constructor');
};memory.protect(Element);


Element.prototype.setAttribute = function setAttribute(key,val){
    this[key] = val;
};memory.protect(Element.prototype.setAttribute);

Element.prototype.removeAttribute = function removeAttribute(key){
    delete this[key]
};memory.protect(Element.prototype.removeAttribute);


Object.defineProperty(Element.prototype, 'outerHTML', {
    get: function(){
        let zhi = '<'+this.SHENzhi;
        if(this.class){
            zhi += ' class="'+this.class+'"'
        }
        if(this.id && this.id != "50000000"){
            zhi += ' id="'+this.id+'"'
        }
        if(this.content){
            zhi += this.content;
        }
        zhi += '>'
        if(this.childNodes && this.childNodes.length>0){
            for(let x of this.childNodes){
                zhi += memory.domStr(x,this)
            }
        }
        zhi += '</'+this.SHENzhi+'>';
        return zhi
    }}
);

Object.defineProperty(Element.prototype, 'innerHTML', {
    get: function(){
        if(this.childNodes && this.childNodes.length>0){
            zhi = ''
            for(let x of this.childNodes){
                zhi += memory.domStr(x,this)
            }
            return zhi
        }
        return null
    }}
);
HTMLDocument = function HTMLDocument(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLDocument);


Document = function Document(){

};memory.protect(Document);

create_count = 0
Document.prototype.createElement = function createElement(tag){
    let zhi;
    create_count += 1
    if(tag=='canvas'){
        zhi = memory.create_element.create_canvas();
    }
    else if(tag=='iframe'){
        zhi = memory.create_element.create_iframe();
    }
    else if(tag=='div'){
        zhi = memory.create_element.create_div();
    }
    else if(tag=='span'){
        zhi = memory.create_element.create_span();
    }
    else if(tag=='p'){
        zhi = memory.create_element.create_p();
    }
    else if(tag=='style'){
        zhi = memory.create_element.create_style();
    }
    else if(tag=='a'){
        zhi = memory.create_element.create_a();
    }
    else if(tag == 'h1'){
        zhi = memory.create_element.create_h1();
    }
    else if(tag=='li'){
        zhi = memory.create_element.create_li()
    }
    else{
        zhi = memory.create_element.create_other(tag);
    }
    zhi.order = create_count;
    return zhi
};memory.protect(Document.prototype.createElement);




Document.prototype.getElementById = function getElementById(tag){
    // debugger;
    return memory.domForObj(document,tag)
};memory.protect(Document.prototype.getElementById);


Document.prototype.getElementsByClassName = function getElementsByClassName(tag){

};memory.protect(Document.prototype.getElementsByClassName);


Document.prototype.getElementsByTagName = function getElementsByTagName(tag){

};memory.protect(Document.prototype.getElementsByTagName);


Document.prototype.exitFullscreen = function exitFullscreen(){

};memory.protect(Document.prototype.exitFullscreen);




memory.create_element.create_document = function(){
    let obj = memory.createProxyObject('document');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLDocument','Document','Node','EventTarget'],obj);

    obj.head = memory.create_element.create_head();
    obj.body = memory.create_element.create_body();

    let v = memory.create_element.create_video();
    v.id = 'preview'
    obj.appendChild(v);

    obj.appendChild(obj.head);
    obj.appendChild(obj.body);
    return obj
};
;
memory.objects.webgl = memory.createProxyObject('WebGLRenderingContext');

memory.objects.webgl.drawingBufferHeight = 150;
memory.objects.webgl.drawingBufferWidth = 300;


memory.objects.webgl.getSupportedExtensions = function getSupportedExtensions(){
    //每个电脑不一样
    return ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_clip_control', 'EXT_color_buffer_half_float', 'EXT_depth_clamp', 'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth', 'EXT_polygon_offset_clamp', 'EXT_shader_texture_lod', 'EXT_texture_compression_bptc', 'EXT_texture_compression_rgtc', 'EXT_texture_filter_anisotropic', 'EXT_texture_mirror_clamp_to_edge', 'EXT_sRGB', 'KHR_parallel_shader_compile', 'OES_element_index_uint', 'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_blend_func_extended', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context', 'WEBGL_multi_draw', 'WEBGL_polygon_mode']
};memory.protect(memory.objects.webgl.getSupportedExtensions);

memory.objects.webgl.getExtension = function getExtension(x){
    if(x=='WEBGL_debug_renderer_info'){
        return {
            UNMASKED_RENDERER_WEBGL: 37446,
            UNMASKED_VENDOR_WEBGL: 37445
        }
    }
};memory.protect(memory.objects.webgl.getExtension);

memory.objects.webgl.getParameter = function getParameter(x){
    if(x==37445){
        return "Google Inc. (Intel)"
    }
    else if(x==37446){
        return "ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x00009A49) Direct3D11 vs_5_0 ps_5_0, D3D11)"
    }
};memory.protect(memory.objects.webgl.getParameter);
;
memory.objects.CanvasRenderingContext2D = memory.createProxyObject('CanvasRenderingContext2D');

memory.objects.CanvasRenderingContext2D.fillRect = function fillRect(){
    return memory.createProxyObject('fillRect')
};memory.protect(memory.objects.CanvasRenderingContext2D.fillRect);

memory.objects.CanvasRenderingContext2D.fillText = function fillText(){
    return memory.createProxyObject('fillText')
};memory.protect(memory.objects.CanvasRenderingContext2D.fillText);

;
HTMLCanvasElement = function HTMLCanvasElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLCanvasElement);


HTMLCanvasElement.prototype.getContext = function getContext(x){
    return memory.objects[x]
};memory.protect(HTMLCanvasElement.prototype.getContext);

HTMLCanvasElement.prototype.captureStream = function captureStream(x){
    return true
};memory.protect(HTMLCanvasElement.prototype.captureStream);
memory.create_element.create_canvas = function(){
    let obj = memory.createProxyObject('canvas');
    obj.childNodes = [];
    obj.siblingNode = [];
    obj.getContext = function getContext(x){
        if(x=='webgl'){
            return memory.objects.webgl
        }
        else if(x=='2d'){
            return memory.objects.CanvasRenderingContext2D
        }
    };memory.protect(obj.getContext);
    obj.toDataURL = function toDataURL(){
        //每个电脑不一样
        return "data:image/png;base64,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AWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkIUFjSpIqBkgAJUFisARIgAWkI/B/AAJ8P9Hrw4gAAAABJRU5ErkJggg==";
    };memory.protect(obj.toDataURL)

    memory.make_chain(['HTMLCanvasElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLAnchorElement = function HTMLAnchorElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLAnchorElement);
memory.create_element.create_a = function(){
    let obj = memory.createProxyObject('a');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLAnchorElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLHeadElement = function HTMLHeadElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHeadElement);
memory.create_element.create_head = function(){
    let obj = memory.createProxyObject('head');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLHeadElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};


;
HTMLSpanElement = function HTMLSpanElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLSpanElement);
memory.create_element.create_span = function(){
    let obj = memory.createProxyObject('span');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLSpanElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLBodyElement = function HTMLBodyElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLBodyElement);
memory.create_element.create_body = function(){
    let obj = memory.createProxyObject('body');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLBodyElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

Document.prototype.body = memory.create_element.create_body();

;
HTMLParagraphElement = function HTMLParagraphElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLParagraphElement);
memory.create_element.create_p = function(){
    let obj = memory.createProxyObject('p');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLParagraphElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLDivElement = function HTMLDivElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLDivElement);
memory.create_element.create_div = function(){
    let obj = memory.createProxyObject('div');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLDivElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLIFrameElement = function HTMLIFrameElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLIFrameElement);


memory.create_element.create_iframe = function(){
    let obj = memory.createProxyObject('iframe');
    obj.childNodes = [];
    obj.siblingNode = [];

    obj.contentWindow = {
        'document':memory.create_element.create_document()
    };
    let v = memory.create_element.create_video();
    v.id = 'preview'
    obj.contentWindow.document.appendChild(v)

    obj.style = {
        'display':'none'
    }
    memory.make_chain(['HTMLIFrameElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLUnknownElement = function HTMLUnknownElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLUnknownElement);


memory.create_element.create_other = function(x){
    let obj = memory.createProxyObject(x);
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLUnknownElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLStyleElement = function HTMLStyleElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLStyleElement);


HTMLStyleElement.prototype.remove = function remove(){
    return true
};memory.protect(HTMLStyleElement.prototype.remove);
memory.create_element.create_style = function(){
    let obj = memory.createProxyObject('style');
    obj.childNodes = [];
    obj.siblingNode = [];
    obj.sheet = {cssRules:[{cssText: "::marker { }"}]};

    memory.make_chain(['HTMLStyleElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLHtmlElement = function HTMLHtmlElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHtmlElement);


memory.create_element.create_html = function(){
    let obj = memory.createProxyObject('html');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLHtmlElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLMediaElement = function HTMLMediaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMediaElement);


HTMLMediaElement.prototype.captureStream = function captureStream(){
    return true
};memory.protect(HTMLMediaElement.prototype.captureStream);
HTMLVideoElement = function HTMLVideoElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLVideoElement);

memory.create_element.create_video = function(){
    let obj = memory.createProxyObject('video');
    obj.childNodes = [];
    obj.siblingNode = [];

    memory.make_chain(['HTMLVideoElement','HTMLMediaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLHeadingElement = function HTMLHeadingElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHeadingElement);
memory.create_element.create_h1 = function(){
    let obj = memory.createProxyObject('h1');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLHeadingElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLLIElement = function HTMLLIElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLLIElement);
memory.create_element.create_li = function(){
    let obj = memory.createProxyObject('li');
    obj.childNodes = [];
    obj.siblingNode = [];
    memory.make_chain(['HTMLLIElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
;
document = memory.create_element.create_document();


document.characterSet = "UTF-8";
document.charset = "UTF-8";
document.hidden = false;
document.visibilityState = "visible";

document.createExpression = function createExpression(){
    var obj = memory.createProxyObject('createExpression')
    return obj
};memory.protect(document.createExpression)

navigator = {};

navigator.appCodeName = "Mozilla";
navigator.appName = "Netscape";
navigator.appVersion = "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
navigator.cookieEnabled = true;
navigator.deviceMemory = 8;
navigator.appCodeName = "Mozilla";
navigator.appCodeName = "Mozilla";
navigator.doNotTrack = null;
navigator.hardwareConcurrency = 8;
navigator.language = "zh-CN";
navigator.onLine = true;
navigator.pdfViewerEnabled = true;
navigator.platform = "Win32";
navigator.product = "Gecko";
navigator.productSub = "20030107";
navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
navigator.vendor = "Google Inc.";
navigator.vendorSub = ""
navigator.languages = ['zh-CN', 'zh', 'en', 'zh-TW']
navigator.connection = memory.createProxyObject('connection',{
    downlink: 10,
    effectiveType: "4g",
    onchange: null,
    rtt: 100,
    saveData: false,
    type:"wifi"
});

navigator.mimeTypes = memory.createProxyObject('mimeTypes');
navigator.mimeTypes ['application/x-shockwave-flash'] = memory.createProxyObject('mimeTypes_flash');
navigator.mimeTypes ['application/x-shockwave-flash'].enabledPlugin =  memory.createProxyObject('mimeTypes_flash_enabledPlugin');


navigator.serviceWorker = memory.createProxyObject('serviceWorker')
Navigator = function(){
    throw new TypeError('Illegal constructor');
};memory.protect(Navigator);

Navigator.prototype.webkitPersistentStorage = {};

Navigator.prototype.getBattery = function getBattery(){
    // if(memory.callFunDebugger){debugger}
    obj = {then:function(){}}
    return obj
};memory.protect(Navigator.prototype.getBattery);

Navigator.prototype.maxTouchPoints = 0;

Navigator.prototype.requestMIDIAccess = function requestMIDIAccess(){
    return true
};memory.protect(Navigator.prototype.requestMIDIAccess);



history = {};
history.length= 2
history.scrollRestoration= "auto"
history.state=null
History = function History(){
    throw new TypeError('Illegal constructor');
};memory.protect(History);
Storage = function Storage(){
    throw new TypeError('Illegal constructor');
};memory.protect(Storage);

Storage.prototype.getItem = function getItem(keyName){
    // if(memory.callFunDebugger){debugger}
    return this[keyName] || null
};memory.protect(Storage.prototype.getItem);

Storage.prototype.removeItem = function removeItem(keyName){
    // if(memory.callFunDebugger){debugger}
    delete this[keyName]
};memory.protect(Storage.prototype.removeItem)

Storage.prototype.setItem = function setItem(key,value){
    // if(memory.callFunDebugger){debugger}
    this[key] = value
};memory.protect(Storage.prototype.setItem)
sessionStorage = {};
localStorage = {
    "TDC_itoken": "1501405626:1703468472",
    "AEGIS_ID": "6aad324b-0b66-4a47-bef5-6d95cf6bd821"
};

memory.make_chain(['sessionStorage','Storage']);
memory.make_chain(['localStorage','Storage']);
location = {};

location.href = "https://sso.weidian.com/login/index.php?redirect=https%3A%2F%2Fshop978275038.v.weidian.com%2Fdecoration%2Funi-mine%2F%3Fspider_token%3Dcc81%23%2F";
location.toString = function(){
    // if(memory.callFunDebugger){debugger}
    return location.href
}

location.protocol = "https:"; //每个网站不一样
location.port = '';//每个网站不一样
location.search = "?redirect=https%3A%2F%2Fshop978275038.v.weidian.com%2Fdecoration%2Funi-mine%2F%3Fspider_token%3Dcc81%23%2F";//每个网站不一样
location.hash = "";//每个网站不一样
location.host = "sso.weidian.com"//每个网站不一样
location.hostname = "sso.weidian.com"//每个网站不一样
location.origin = "https://sso.weidian.com"//每个网站不一样
location.pathname = "/login/index.php"//每个网站不一样

Location = function Location(){
    throw new TypeError('Illegal constructor');
};memory.protect(Location);
screen = {};

ScreenOrientation = memory.createProxyObject('ScreenOrientation ');
Object.assign(ScreenOrientation,{angle: 0, type: "landscape-primary", onchange: null});

screen.availHeight = 864;
screen.availLeft = 62;
screen.availTop = 0;
screen.availWidth = 1474;
screen.colorDepth = 24;
screen.height = 864;
screen.isExtended = false;
screen.onchange = null;
screen.orientation = {};
screen.pixelDepth = 24;
screen.width = 1536;
Screen = function Screen(){
    throw new TypeError('Illegal constructor');
};memory.protect(Screen);


;
// 第4个加载            进行原型链的组成

memory.make_chain(['window','Window','WindowProperties','EventTarget']);
memory.make_chain(['document','HTMLDocument','Document','Node','EventTarget']);
memory.make_chain(['history','History']);
memory.make_chain(['location','Location']);
memory.make_chain(['navigator','Navigator']);
memory.make_chain(['screen','Screen']);



document.location = location;
window.top = window;
Document.prototype.documentElement = memory.create_element.create_html();
;
JSON.stringify_ = JSON.stringify;
JSON.stringify = function(x){if(typeof(x)== 'object' &&  x['sd']){x['sd'] = {"od":"C","ft":"qf_7P___H"}};return JSON.stringify_(x)};

Document.prototype.body.clientHeight = 359;
Document.prototype.body.clientWidth = 360;
screen.height= 864;


screen.width = 1536;
Document.prototype.documentElement.clientHeight = 360;
Document.prototype.documentElement.clientWidth = 360;
// 文本语言
navigator.languages = ["zh-CN","zh","en","zh-TW"]
// refer
location.href = "https://sso.weidian.com/login/index.php?redirect=https%3A%2F%2Fshop978275038.v.weidian.com%2Fdecoration%2Funi-mine%2F%3Fspider_token%3Dcc81%23%2F";
// iframe的refer
window.TCaptchaReferrer = "https://sso.weidian.com/login/index.php"
// 鼠标滑动轨迹
track = [[104,0,51105],[-38,15,0],[-6,3,0],[-6,3,1],[-7,2,1],[-4,1,1],[-9,2,1],[-12,6,3],[-4,2,0],[-7,1,1],[-6,3,1],[75,191,9946],[-1,-2,3],[0,-1,5],[-1,-1,7],[0,-1,2],[0,-1,4],[0,-1,4],[0,-1,7],[-1,0,4],[0,-1,2],[0,-1,2],[-1,0,3],[-1,-1,4],[-1,0,11],[0,-1,2],[-1,0,3],[0,-1,6],[-1,0,2],[-1,0,6],[0,-1,7],[-1,-1,13],[0,0,3],[-1,0,15],[-1,0,36],[-1,-1,7],[-1,0,11],[0,-1,3],[-1,0,2],[-1,0,2],[0,-1,7],[-1,0,3],[-1,0,11],[0,-1,2],[-1,0,8],[-1,0,14],[-1,-1,15],[-1,-1,15],[0,0,12],[0,-1,8],[0,-1,18],[-1,0,7],[-1,-1,22],[0,-1,9],[0,-1,29],[-1,0,420],[-1,0,12],[-1,0,2],[-1,0,5],[-1,0,3],[1,1,12]];

Tindex = 0


mylog = console.log;
console.log = function(){}


// 第5个加载        对对象进行代理 并且遍历对象:  函数进行toString保护  对象则进行递归调用


sessionStorage = memory.proxy('sessionStorage');
localStorage = memory.proxy('localStorage');
location = memory.proxy('location');
navigator = memory.proxy('navigator');
screen = memory.proxy('screen');
history = memory.proxy('history');
document = memory.proxy('document');
window = memory.proxy('window');




(function() {
    'use strict';
    var cookieTemp = "";
    Object.defineProperty(document, 'cookie', {
        set: function(val) {
            cookieTemp = val.split(';')[0] + ';';
            return val;
        },
        get: function(){return cookieTemp}});
})();;


// function TX() {
//     window._lCFnHVEZFMYeiWgkMiGCljicgGkNZinZ = function () {
//       return new Date()
//     }
//     ;
//     window._RMDZClZBTZGZcTRBBfnSYXhFmZjYWRXM = function (a, b) {
//       return Date[a].apply(Date, b)
//     }
//     ;
//     window.BKJcNRdfBOWZhWnaPOnZXEUdaFJiPQKG = 'wVFUCHom4CLCOOkPnkxJ1ujpKlV07VKVOYznP7b16YwTfOaAXyRr/sg0l0CABQIplJFSm0AgBVzVhxzTVugwlMydTHPg3z/Z6/XRFJFg/ncnMvQuZI+ldmS0UuhxRkKcGc8ICH/3xuYPoVRBFVo9B2CycoCxrOpjKTGZSmIyUcg31CFXuq/Qe8hnYy8U3eJA3Ajvm0lVXTcL01ibZhR00dk6R3+D4gbmtTatJRCuOE4=';
//     var __TENCENT_CHAOS_STACK = function () {
//       function __TENCENT_CHAOS_VM(E, M, D, Q, R, g, h, T) {
//           var w, x = !Q, H = (E = +E,
//               M = M || [0],
//               Q = Q || [[this], [{}]],
//               R = R || {},
//               []), c = null;
//
//           function A() {
//               return function (x, H, c) {
//                   return new (Function.bind.apply(x, H))
//               }
//                   .apply(null, arguments)
//           }
//
//           Function.prototype.bind || (w = [].slice,
//                   Function.prototype.bind = function (x) {
//                       if ("function" != typeof this)
//                           throw new TypeError("bind101");
//                       var H = w.call(arguments, 1)
//                           , c = H.length
//                           , A = this
//                           , G = function () {
//                       }
//                           , B = function () {
//                           return H.length = c,
//                               H.push.apply(H, arguments),
//                               A.apply(G.prototype.isPrototypeOf(this) ? this : x, H)
//                       };
//                       return this.prototype && (G.prototype = this.prototype),
//                           B.prototype = new G,
//                           B
//                   }
//           );
//           for (var G = [, function () {
//               Q.push([D, Q.pop()])
//           }
//               , function () {
//                   Q.push(!Q.pop())
//               }
//               , , , , function () {
//                   var x = M[E++];
//                   Q[Q.length - 1] && (E = x)
//               }
//               , function () {
//                   Q.push([M[E++]])
//               }
//               , function () {
//                   Q[Q.length - 1] = D[Q[Q.length - 1]]
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] * Q.pop()
//               }
//               , function () {
//                   Q.push(M[E++])
//               }
//               , , function () {
//                   Q.push(Q[Q.length - 1])
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] % Q.pop()
//               }
//               , function () {
//                   return !!c
//               }
//               , function () {
//                   Q.push("")
//               }
//               , function () {
//                   Q.push(typeof Q.pop())
//               }
//               , , function () {
//                   var x = M[E++]
//                       , H = Q[Q.length - 2 - x];
//                   Q[Q.length - 2 - x] = Q.pop(),
//                       Q.push(H)
//               }
//               , function () {
//                   Q.pop()
//               }
//               , function () {
//                   var x = Q.pop();
//                   Q.push(delete x[0][x[1]])
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] >> Q.pop()
//               }
//               , function () {
//                   c = null
//               }
//               , function () {
//                   throw Q[Q.length - 1]
//               }
//               , function () {
//                   Q.push([Q.pop(), Q.pop()].reverse())
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] / Q.pop()
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] << Q.pop()
//               }
//               , function () {
//                   var x, H = [];
//                   for (x in Q.pop())
//                       H.push(x);
//                   Q.push(H)
//               }
//               , function () {
//                   Q[Q.length - 1] += String.fromCharCode(M[E++])
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] >= Q.pop()
//               }
//               , function () {
//                 // mylog("Q[Q.length - 2]::", Q[Q.length - 2], "Q[Q.length - 1]", Q[Q.length-1], "value(in)::", Q[Q.length - 2]in Q[Q.length-1]);
//                   Q[Q.length - 2] = Q[Q.length - 2] in Q.pop()
//               }
//               , function () {
//                   var x = M[E++]
//                       , H = x ? Q.slice(-x) : []
//                       , x = (Q.length -= x,
//                       H.unshift(null),
//                       Q.pop());
//
//                   Q.push(A(x[0][x[1]], H))
//               }
//               , , , function () {
//                   Q.push(!1)
//               }
//               , function () {
//                   var x = M[E++]
//                       , H = x ? Q.slice(-x) : []
//                       , x = (Q.length -= x,
//                       Q.pop());
//                     //   mylog("方法调用", "this", x[0], "function", x[1], "arguments", H);;;;
//                   Q.push(x[0][x[1]].apply(x[0], H))
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] & Q.pop()
//               }
//               , function () {
//                   Q.push(undefined)
//               }
//               , function () {
//                   var x = M[E++]
//                       , H = x ? Q.slice(-x) : [];
//                   Q.length -= x,
//                       Q.push(Q.pop().apply(D, H))
//               }
//               , function () {
//                 // if (Q[Q.length - 2] == '3') {
//                 //     Q[Q.length - 2] = '0'
//                 //   }
//                 // mylog("Q[Q.length - 2]::", Q[Q.length - 2], " Q.pop::", Q[Q.length - 1], "value(===)::", Q[Q.length - 2] === Q[Q.length - 1])
//                   Q[Q.length - 2] = Q[Q.length - 2] === Q.pop()
//               }
//               , function () {
//                   var x = Q.pop();
//                   Q.push(x[0][x[1]])
//               }
//               , function () {
//                   var x = Q[Q.length - 2];
//                   x[0][x[1]] = Q[Q.length - 1]
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] ^ Q.pop()
//               }
//               , function () {
//                   H.push([M[E++], Q.length, M[E++]])
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] > Q.pop()
//               }
//               , , function () {
//                   Q.length = M[E++]
//               }
//               , function () {
//                   var x = M[E++];
//                   Q[x] = Q[x] === undefined ? [] : Q[x]
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] == Q.pop()
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] | Q.pop()
//               }
//               , function () {
//                   var x = Q.pop()
//                       , H = Q.pop();
//                     //   mylog("H[0]::",H[0],"H[1]::", H[1] ,"x::", x);
//                   Q.push([H[0][H[1]], x])
//               }
//               , , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] >>> Q.pop()
//               }
//               , function () {
//                   var x = Q.pop();
//                   Q.push([Q[Q.pop()][0], x])
//               }
//               , function () {
//                   H.pop()
//               }
//               , function () {
//                   Q.push(Q[Q.pop()[0]][0])
//               }
//               , , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] + Q.pop()
//               }
//               , function () {
//                   Q.push(Q[M[E++]][0])
//               }
//               , function () {
//                   Q[Q.length - 2] = Q[Q.length - 2] - Q.pop()
//               }
//               , function () {
//                   return !0
//               }
//               , function () {
//                   for (var c = M[E++], A = [], x = M[E++], H = M[E++], G = [], B = 0; B < x; B++)
//                       A[M[E++]] = Q[M[E++]];
//                   for (B = 0; B < H; B++)
//                       G[B] = M[E++];
//                   Q.push(function w() {
//                       var x = A.slice(0);
//                       x[0] = [this],
//                           x[1] = [arguments],
//                           x[2] = [w];
//                       for (var H = 0; H < G.length && H < arguments.length; H++)
//                           0 < G[H] && (x[G[H]] = [arguments[H]]);
//                       return __TENCENT_CHAOS_VM(c, M, D, x, R, g, h, T)
//                   })
//               }
//               , function () {
//                   var x = M[E++]
//                       , H = x ? Q.slice(-x) : [];
//                   Q.length -= x,
//                       H.unshift(null),
//                       Q.push(A(Q.pop(), H))
//               }
//               , function () {
//                   Q[Q[Q.length - 2][0]][0] = Q[Q.length - 1]
//               }
//               , function () {
//                   E = M[E++]
//               }
//               , function () {
//                   Q.push(!0)
//               }
//               , function () {
//                   Q[Q.length - 1] = M[E++]
//               }
//               , , function () {
//                   Q[Q.length - 1].length ? Q.push(Q[Q.length - 1].shift(), !0) : Q.push(undefined, !1)
//               }
//               , function () {
//                   Q.push(null)
//               }
//           ]; ;)
//               try {
//                   for (var B = !1; !B;)
//                       B = G[M[E++]]();
//                   if (c)
//                       throw c;
//                   return x ? (Q.pop(),
//                       Q.slice(3 + __TENCENT_CHAOS_VM.v)) : Q.pop()
//               } catch (U) {
//                   var C = H.pop();
//                   if (C === undefined)
//                       throw U;
//                   c = U,
//                       E = C[0],
//                       Q.length = C[1],
//                   C[2] && (Q[C[2]][0] = c)
//               }
//       }
//
//       function R(x) {
//           for (var H, c, A = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".split(""), G = String(x).replace(/[=]+$/, ""), B = 0, w = 0, E = ""; c = G.charAt(w++); ~c && (H = B % 4 ? 64 * H + c : c,
//           B++ % 4) && (E += String.fromCharCode(255 & H >> (-2 * B & 6))))
//               c = function (x, H, c) {
//                   if ("function" == typeof Array.prototype.indexOf)
//                       return Array.prototype.indexOf.call(x, H, c);
//                   var A;
//                   if (null == x)
//                       throw new TypeError('"array" is null or not defined');
//                   var G = Object(x)
//                       , B = G.length >>> 0;
//                   if (0 != B) {
//                       x = 0 | c;
//                       if (!(B <= x))
//                           for (A = Math.max(0 <= x ? x : B - Math.abs(x), 0); A < B; A++)
//                               if (A in G && G[A] === H)
//                                   return A
//                   }
//                   return -1
//               }(A, c);
//           return E
//       }
//
//       return __TENCENT_CHAOS_VM.v = 0,
//           __TENCENT_CHAOS_VM(0, function (x) {
//               var H = x[0]
//                   , c = x[1]
//                   , A = []
//                   , G = R(H)
//                   , B = c.shift()
//                   , w = c.shift()
//                   , E = 0;
//
//               function M() {
//                   for (; E === B;)
//                       A.push(w),
//                           E++,
//                           B = c.shift(),
//                           w = c.shift()
//               }
//
//               for (var D = 0; D < G.length; D++) {
//                   var Q = G.charAt(D).charCodeAt(0);
//                   M(),
//                       A.push(Q),
//                       E++
//               }
//               return M(),
//                   A
//           }(["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OhxtHGEcchxrHGUcciYBPAcNPQEAAwg/ExNAOC4JLwIvAy8ELwUvBi8GBwMiPxMTQB8WKwA2QCMvBysHBwQPHGQcbxxjHHUcbRxlHG4cdAEPHGMcchxlHGEcdBxlHEUcbBxlHG0cZRxuHHQyDxxkHGkcdiMBPxMTDxxkHG8cYxx1HG0cZRxuHHQBDxxiHG8cZBx5Mg8cYRxwHHAcZRxuHGQcQxxoHGkcbBxkMjoEIwETBwQPHGkcbhxuHGUcchxIHFQcTRxMNQ8cPBxzHGUcYxx0HGkcbxxuHD4cPBxoHDMcIBxpHGQcPRwnHGYcaRxyHHMcdBxoHCccPhxnHHIcZRxlHG4cPBwvHGgcMxw+HDwccBwgHGkcZBw9HCccZhxpHHIccxx0HHAcJxw+HHIcZRxkHDwcLxxwHD4cZxxyHGUcZRxuHDwcLxxzHGUcYxx0HGkcbxxuHD4cPBxzHGUcYxx0HGkcbxxuHCAcYxxsHGEccxxzHD0cJxx3HGkcdBxoHC0cchxlHHYcZRxyHHQcJxw+HDwcaBwzHCAcaRxkHD0cJxxzHGUcYxxvHG4cZBxoHCccPhxiHGwcYRxjHGscPBwvHGgcMxw+HDwccBwgHGkcZBw9HCcccxxlHGMcbxxuHGQccBwnHD4cchxlHGQcPBwvHHAcPhxiHGwcYRxjHGscPBwvHHMcZRxjHHQcaRxvHG4cPikTEwcFDxxkHG8cYxx1HG0cZRxuHHQBDxxjHHIcZRxhHHQcZRxFHGwcZRxtHGUcbhx0Mg8ccxx0HHkcbBxlIwE/ExMHBQ8caRxuHG4cZRxyHEgcVBxNHEw1DxxzHGUcYxx0HGkcbxxuHCAcexwgHGMcbxxsHG8cchw6HCAcZxxyHGUcZRxuHCAcfRwgHHAcIBx7HCAcYxxvHGwcbxxyHDocIBxyHGUcZBwgHH0cIBxzHGUcYxx0HGkcbxxuHC4cdxxpHHQcaBwtHHIcZRx2HGUcchx0HCAcexwgHGMcbxxsHG8cchw6HCAcchxlHHYcZRxyHHQcIBx9KRMTDxxkHG8cYxx1HG0cZRxuHHQBDxxoHGUcYRxkMg8cYRxwHHAcZRxuHGQcQxxoHGkcbBxkMjoFIwETQD0WKwA2QBIvCCsIBwMPHGccZRx0HEMcbxxtHHAcdRx0HGUcZBxTHHQceRxsHGUBDxxkHG8cYxx1HG0cZRxuHHQBDxxnHGUcdBxFHGwcZRxtHGUcbhx0HEIceRxJHGQyDxxmHGkcchxzHHQcaCMBRSMCDxxnHGUcdBxQHHIcbxxwHGUcchx0HHkcVhxhHGwcdRxlGA8cYxxvHGwcbxxyIwEPHHIcZxxiHCgcMBwsHCAcMRwyHDgcLBwgHDAcKScGQCMTDxxnHGUcdBxDHG8cbRxwHHUcdBxlHGQcUxx0HHkcbBxlAQ8cZBxvHGMcdRxtHGUcbhx0AQ8cZxxlHHQcRRxsHGUcbRxlHG4cdBxCHHkcSRxkMg8cZhxpHHIccxx0HHAjAUUjAg8cZxxlHHQcUBxyHG8ccBxlHHIcdBx5HFYcYRxsHHUcZRgPHGMcbxxsHG8cciMBDxxyHGccYhwoHDIcNRw1HCwcIBwwHCwcIBwwHCknBkAvEw8cZxxlHHQcQxxvHG0ccBx1HHQcZRxkHFMcdBx5HGwcZQEPHGQcbxxjHHUcbRxlHG4cdAEPHGccZRx0HEUcbBxlHG0cZRxuHHQcQhx5HEkcZDIPHHMcZRxjHG8cbhxkHGgjAUUjAg8cZxxlHHQcUBxyHG8ccBxlHHIcdBx5HFYcYRxsHHUcZRgPHGMcbxxsHG8cciMBDxxyHGccYhwoHDAcLBwgHDAcLBwgHDAcKScGQB8TDxxnHGUcdBxDHG8cbRxwHHUcdBxlHGQcUxx0HHkcbBxlAQ8cZBxvHGMcdRxtHGUcbhx0AQ8cZxxlHHQcRRxsHGUcbRxlHG4cdBxCHHkcSRxkMg8ccxxlHGMcbxxuHGQccCMBRSMCDxxnHGUcdBxQHHIcbxxwHGUcchx0HHkcVhxhHGwcdRxlGA8cYxxvHGwcbxxyIwEPHHIcZxxiHCgcMhw1HDUcLBwgHDAcLBwgHDAcKSc/ExM2Dg8cZBxvHGMcdRxtHGUcbhx0AQ8cYhxvHGQceTIPHHIcZRxtHG8cdhxlHEMcaBxpHGwcZDI6BCMBEwcFDxxyHGUcbRxvHHYcZTUjABM2DjoDPAcOPQAAPxMTQD4uCS8CLwMvBC8FLwYvBgcDIj8TE0ArFisANkAjLwcrBwcEDxxkHG8cYxx1HG0cZRxuHHQBDxxjHHIcZRxhHHQcZRxFHGwcZRxtHGUcbhx0Mg8cZBxpHHYjAT8TEw8cZBxvHGMcdRxtHGUcbhx0AQ8cYhxvHGQceTIPHGEccBxwHGUcbhxkHEMcaBxpHGwcZDI6BCMBEwcEDxxpHG4cbhxlHHIcSBxUHE0cTDUPHDwccBwgHGMcbBxhHHMccxw9HCIcZhxpHHIccxx0HHAcIhw+HGYcaRxyHHMcdBxwHDwcLxxwHD4cChwgHCAcIBwgHCAcIBwgHCAcPBxwHCAcaRxkHD0cIhxzHGUcYxxvHG4cZBxwHCIcPhxzHGUcYxxvHG4cZBxwHDwcLxxwHD4cChwgHCAcIBwgHCAcIBwgHCAcPBxwHCAcYxxsHGEccxxzHD0cIhx0HGgcaRxyHGQccBwiHD4cdBxoHGkcchxkHHAcPBwvHHAcPhwKHCAcIBwgHCAcIBwgHCAcIBw8HGgcMhw+HAocIBwgHCAcIBwgHCAcIBwgHCAcIBw8HHMccBxhHG4cIBxjHGwcYRxzHHMcPRwiHGYcbxxvHCIcPhxmHG8cbxw8HC8ccxxwHGEcbhw+HAocIBwgHCAcIBwgHCAcIBwgHCAcIBw8HHMccBxhHG4cIBxjHGwcYRxzHHMcPRwiHGIcYRxyHCIcIBxpHGQcPRwiHGIcYRxyHCIcPhxiHGEcchw8HC8ccxxwHGEcbhw+HAocIBwgHCAcIBwgHCAcIBwgHDwcLxxoHDIcPikTEwcFDxxkHG8cYxx1HG0cZRxuHHQBDxxjHHIcZRxhHHQcZRxFHGwcZRxtHGUcbhx0Mg8ccxx0HHkcbBxlIwE/ExMHBQ8caRxuHG4cZRxyHEgcVBxNHEw1DxxiHG8cZBx5HCAcOhxuHG8cdBwoHC4cZhxpHHIccxx0HHAcLBwgHC4cdBxoHGkcchxkHHAcKRwgHHscChwgHCAcIBwgHCAcIBwgHCAcYxxvHGwcbxxyHDocIBxiHGwcdRxlHDscChwgHCAcIBwgHCAcIBx9HAocIBwgHCAcIBwgHCAcaBwyHCAcOhxuHG8cdBwoHHMccBxhHG4cLhxmHG8cbxwpHCAcexwKHCAcIBwgHCAcIBwgHCAcIBxjHG8cbBxvHHIcOhwgHHIcZRxkHDscChwgHCAcIBwgHCAcIBx9KRMTDxxkHG8cYxx1HG0cZRxuHHQBDxxoHGUcYRxkMg8cYRxwHHAcZRxuHGQcQxxoHGkcbBxkMjoFIwETQC4WKwA2QBIvCCsIBwMPHGccZRx0HEMcbxxtHHAcdRx0HGUcZBxTHHQceRxsHGUBDxxkHG8cYxx1HG0cZRxuHHQBDxxnHGUcdBxFHGwcZRxtHGUcbhx0HEIceRxJHGQyDxxzHGUcYxxvHG4cZBxwIwFFIwIPHGccZRx0HFAcchxvHHAcZRxyHHQceRxWHGEcbBx1HGUYDxxjHG8cbBxvHHIjAQ8cchxnHGIcKBwwHCwcIBwwHCwcIBwyHDUcNRwpJwZAChMPHGccZRx0HEMcbxxtHHAcdRx0HGUcZBxTHHQceRxsHGUBDxxkHG8cYxx1HG0cZRxuHHQBDxxnHGUcdBxFHGwcZRxtHGUcbhx0HEIceRxJHGQyDxxiHGEcciMBRSMCDxxnHGUcdBxQHHIcbxxwHGUcchx0HHkcVhxhHGwcdRxlGA8cYxxvHGwcbxxyIwEPHHIcZxxiHCgcMhw1HDUcLBwgHDAcLBwgHDAcKSc/ExM2Dg8cZBxvHGMcdRxtHGUcbhx0AQ8cYhxvHGQceTIPHHIcZRxtHG8cdhxlHEMcaBxpHGwcZDI6BCMBEwcFDxxyHGUcbRxvHHYcZTUjABM2DjoDPAcPPQAAPxMTQBwuBi8CLwMvBAcDIj8TE0AGFisANkAGLwUrBQcDDxx3HGkcbhxkHG8cdwEPHG0cYRx0HGMcaBxNHGUcZBxpHGEyDxwoHHAcchxlHGYcZRxyHHMcLRxjHG8cbBxvHHIcLRxzHGMcaBxlHG0cZRw6HCAcZBxhHHIcaxwpIwEPHG0cYRx0HGMcaBxlHHMYKAYTDxx3HGkcbhxkHG8cdwEPHG0cYRx0HGMcaBxNHGUcZBxpHGEyDxwoHHAcchxlHGYcZRxyHHMcLRxjHG8cbBxvHHIcLRxzHGMcaBxlHG0cZRw6HCAcbBxpHGccaBx0HCkjAQ8cbRxhHHQcYxxoHGUccxgoBhMPHHccaRxuHGQcbxx3AQ8cbRxhHHQcYxxoHE0cZRxkHGkcYTIPHCgccBxyHGUcZhxlHHIccxwtHGMcbxxsHG8cchwtHHMcYxxoHGUcbRxlHDocIBxuHG8cLRxwHHIcZRxmHGUcchxlHG4cYxxlHCkjAQ8cbRxhHHQcYxxoHGUccxgoPxMTNg46AzwHED0AAD8TE0BALgYvAi8DLwQHAyI/ExNAHBYrADZALS8FKwUHAw8cdxxpHG4cZBxvHHcBDxxtHGEcdBxjHGgcTRxlHGQcaRxhMg8cKBxwHHIcZRxmHGUcchxzHC0cchxlHGQcdRxjHGUcZBwtHG0cbxx0HGkcbxxuHDocIBxyHGUcZBx1HGMcZRwpIwEPHG0cYRx0HGMcaBxlHHMYKAYTDxx3HGkcbhxkHG8cdwEPHG0cYRx0HGMcaBxNHGUcZBxpHGEyDxwoHHAcchxlHGYcZRxyHHMcLRxyHGUcZBx1HGMcZRxkHC0cbRxvHHQcaRxvHG4cOhwgHG4cbxwtHHAcchxlHGYcZRxyHGUcbhxjHGUcKSMBDxxtHGEcdBxjHGgcZRxzGCg/ExM2DjoDPAcRPQAAPxMTQAouCC8CLwMvBC8FLwYHAyI/ExNAPRYrADZAHy8HKwcHBA8cZBxvHGMcdRxtHGUcbhx0AQ8cYxxyHGUcYRx0HGUcRRxsHGUcbRxlHG4cdDIPHGQcaRx2IwE/ExMPHGQcbxxjHHUcbRxlHG4cdAEPHGIcbxxkHHkyDxxhHHAccBxlHG4cZBxDHGgcaRxsHGQyOgQjARMHBA8caRxuHG4cZRxyHEgcVBxNHEw1Dxw8HGQcaRx2HCAcYxxsHGEccxxzHD0cIhxsHGUcZhx0HCIcPhwKHCAcIBwgHCAcIBwgHCAcIBw8HGQcaRx2HCAcaRxkHD0cIhxzHHQcYRxyHHQcQhx1HHQcdBxvHG4cIhwgHGMcbBxhHHMccxw9HCIcYhx1HHQcdBxvHG4cIhw+HAocIBwgHCAcIBwgHCAcIBwgHCAcIBxTHHQcYRxyHHQcChwgHCAcIBwgHCAcIBwgHCAcPBwvHGQcaRx2HD4cChwgHCAcIBwgHCAcIBwgHCAcPBxoHDIcPhxQHHIcZRx2HGkcZRx3HDwcLxxoHDIcPhwKHCAcIBwgHCAcIBwgHCAcIBw8HHYcaRxkHGUcbxwgHGkcZBw9HCIccBxyHGUcdhxpHGUcdxwiHCAcdxxpHGQcdBxoHD0cIhwxHDYcMBwiHCAcaBxlHGkcZxxoHHQcPRwiHDEcMhwwHCIcIBxhHHUcdBxvHHAcbBxhHHkcIBxtHHUcdBxlHGQcPhw8HC8cdhxpHGQcZRxvHD4cChwgHCAcIBwgHCAcIBw8HC8cZBxpHHYcPikTEwcFDxxkHG8cYxx1HG0cZRxuHHQBDxxnHGUcdBxFHGwcZRxtHGUcbhx0HEIceRxJHGQyDxxwHHIcZRx2HGkcZRx3IwE/ExMHBQ8cYxxhHHAcdBx1HHIcZRxTHHQcchxlHGEcbTUHBQ8cYxxhHHAcdBx1HHIcZRxTHHQcchxlHGEcbTUoBhMHBQ8cbRxvHHocQxxhHHAcdBx1HHIcZRxTHHQcchxlHGEcbTUoBhMHBQ8cbRxzHEMcYRxwHHQcdRxyHGUcUxx0HHIcZRxhHG01KAYTBwUPHHccZRxiHGscaRx0HEMcYRxwHHQcdRxyHGUcUxx0HHIcZRxhHG01KCkTEwcDBwUPHGMcYRxwHHQcdRxyHGUcUxx0HHIcZRxhHG01KAICPxMTDxxkHG8cYxx1HG0cZRxuHHQBDxxiHG8cZBx5Mg8cchxlHG0cbxx2HGUcQxxoHGkcbBxkMjoEIwETNg46AzwHEj0AAD8TE0AcLgMvAg8cchxlHHEcdRxlHHMcdBxNHEkcRBxJHEEcYxxjHGUccxxzDxxuHGEcdhxpHGccYRx0HG8ccggePAcTPQAAPxMTQBwuAy8CDxxzHGUcchx2HGkcYxxlHFccbxxyHGscZRxyDxxuHGEcdhxpHGccYRx0HG8ccggeBkA9Ew8cUxx5HG4cYxxNHGEcbhxhHGccZRxyDxx3HGkcbhxkHG8cdwgePAcUPQAAPxMTBwZALy4FLwIvAy8EBwMPHGQcbxxjHHUcbRxlHG4cdAEPHGMcchxlHGEcdBxlHEUcbBxlHG0cZRxuHHQyDxxkHGkcdiMBPxMTBwQPHFccZRxiHGscaRx0HCAcTxwgHE0cbxx6HCAcTRxzDxxzHHAcbBxpHHQYDxwgIwE/ExNAOC4HLwIvAy8EOgMHBQ8ccxx0HHkcbBxlNSgeBhNAPRNBPAcDBwMPHHIcZRxwHGwcYRxjHGU1DxxSHGUcZxxFHHgccAgPHF4cWxxhHC0cehxdDyYCQCYuBC8CLwMHAw8cdBxvHFUccBxwHGUcchxDHGEccxxlNSMAPD0AAQMjAj8TEwcEBwYPHGwcZRxuHGccdBxoNSg/ExMHBAw3DBIBEgAKATs/E0IAEgAxBhNAKxMHBjoENSg6AzkHBQ8ccxx0HHkcbBxlNSgeBhNAOhNBPEAcIjw9AgEFAwYEAzw9AAAmAD8TEwcHQBIuDS8CLwMvBC8FLwYvBy8ILwkvCgcFDxwtHHccZRxiHGscaRx0HC0cIBwtHG8cLRwgHC0cbRxvHHocLRwgHC0cbRxzHC0PHHMccBxsHGkcdBgPHCAjAT8TEwcGDxxBHHIcchxhHHkIPgAMCgAYOgMpExM/ExMHBwoAPxMTBwc3BwUPHGwcZRxuHGccdBxoNSgdAgYTQC8TBwYPHHAcdRxzHGg1BwU6BzUoOgM5IwETBwcMNwwSARIACgE5PxNCABIAMRNAEkAjFisANkAjLwsrCw8cdxxpHG4cZBxvHHcBDxxDHFMcUzIoBkBAEw8cdxxpHG4cZBxvHHcBDxxDHFMcUzIPHHMcdRxwHHAcbxxyHHQcczIoBhNALxMHCCU/ExMHCQoAPxMTBwk3BwYPHGwcZRxuHGccdBxoNSgdAgYTQBITOgQQDxx1HG4cZBxlHGYcaRxuHGUcZCcGEwcIDxx3HGkcbhxkHG8cdwEPHEMcUxxTMg8ccxx1HHAccBxvHHIcdBxzMgcGOgk1KDoEIwI/ExNAOhMHCA8cdxxpHG4cZBxvHHcBDxxDHFMcUzIPHHMcdRxwHHAcbxxyHHQcczIHBjoJNSgjAT8TEwcIN0EnBhNAEhM6CDY8BwkMNwwSARIACgE5PxNCABIAMRNAEjYOOgw6AyYBPD0BAgwGAwQ/ExMHCEA9LggvAi8DLwQvBS8GBwQiPxMTQC4WKwA2QD4vBysHBwUPHGQcbxxjHHUcbRxlHG4cdAEPHGMcchxlHGEcdBxlHEUcbBxlHG0cZRxuHHQyDxxzHHQceRxsHGUjAT8TEwcFDxxpHG4cbhxlHHIcSBxUHE0cTDU6Aw8cexx9OSkTEw8cZBxvHGMcdRxtHGUcbhx0AQ8caBxlHGEcZDIPHGEccBxwHGUcbhxkHEMcaBxpHGwcZDI6BSMBEwcEBwUPHHMcaBxlHGUcdDUPHGMccxxzHFIcdRxsHGUcczIPHGwcZRxuHGccdBxoMigKASc/ExMHBQ8cchxlHG0cbxx2HGU1IwATNg46BDw9AAEDPxMTBwMPHGUceBxwHG8cchx0HHM1DxxPHGIcahxlHGMcdAg+AAwPHGccZRx0GEBCLhEvAi8DLwQvBUA6FisANkAmLwYrBgcDDxxBHHIcchxhHHkIPgA/ExMHAw8cdRxuHHMcaBxpHGYcdDUPHE4cdRxtHGIcZRxyAToHJgAjASMBEwcDDxx1HG4ccxxoHGkcZhx0NQ8cThx1HG0cYhxlHHIBOggmACMBIwETBwMPHHUcbhxzHGgcaRxmHHQ1DxxOHHUcbRxiHGUccgE6CSYAIwEjARMHAw8cdRxuHHMcaBxpHGYcdDUPHE4cdRxtHGIcZRxyAToKJgAjASMBEwcDDxx1HG4ccxxoHGkcZhx0NQ8cThx1HG0cYhxlHHIBOgsmACMBIwETBwMPHHUcbhxzHGgcaRxmHHQ1DxxOHHUcbRxiHGUccgE6DCYAIwEjARMHAw8cdRxuHHMcaBxpHGYcdDUPHE4cdRxtHGIcZRxyAToNJgAjASMBEwcDDxx1HG4ccxxoHGkcZhx0NQ8cThx1HG0cYhxlHHIBOg4mACMBIwETBwMPHHUcbhxzHGgcaRxmHHQ1DxxOHHUcbRxiHGUccgE6DyYAIwEjARMHAw8cdRxuHHMcaBxpHGYcdDUPHE4cdRxtHGIcZRxyAToQJgAjASMBEwcEBwMPHGocbxxpHG41DyMBPxMTDxxBHHIcchxhHHkIPgAMCgAYDxxwHGEcchxzHGUcSRxuHHQBOgQKAiMCKRMTNjwODxxBHHIcchxhHHkIPgAMCgAYCgApExM8PQoABwsIDAkSCg0LDgwTDRAOEQ8UEA8pExMpExMlPD0AAwMEBSkTEwwKPBhAHy4MLwIvAy8ELwUvBi8HLwgvCS8KLwtAPi4FLwIvAwcEOgM/ExMlPAcIPQEBBAcDPxMTQD0uBC8COgM8Bwk9AQADBz8TE0BALgcvAi8DLwNABhYrADZAPS8EKwQ6BQ8cZRxuHGMcbxxkHGUcVRxSHEkcQxxvHG0ccBxvHG4cZRxuHHQBOgY6AyYBDxxzHGwcaRxjHGUYCgAKZDsjASMBJgETNg4lPAcKPQIBBQgGBgM/ExNAHC4GLwIvA0AtFisAOgU6BCYBEzZALy8EKwQPHEUcchxyHG8ccgEPHGUcchxyHHIfARc2DiU8Bws9AQAFCj8TEwcGOgUKPSYBPxMTBwcPPxMTBwQPHHMcZRx0HEUcchxyHG8cchxTHHQcYRxjHGs1OgspExMHBA8ccxxlHHQcRRxyHHIcbxxyNToIKRMTBwQPHGccZRx0HEUcchxyHG8ccjU6CSkTEyU8PQADAwQFKRMTDAo9GEAHLgcvAi8DLwQvBS8GQAouCC8CLwMvBC8FLwYHBA8/ExM6AwZAEhMHAw8ccxx0HGEcYxxrNSgGE0A+EwcEBwMPHHMcdBxhHGMcazUPHHIcZRxwHGwcYRxjHGUyDxxSHGUcZxxFHHgccAgPHFwcbg8cZxxpJgIPIwIPHHMccBxsHGkcdBgPHFIcZRxnHEUceBxwCA8cXBxiHGEcdBxcHGIPJgIjAQ8cahxvHGkcbhgPHAojAQ8cchxlHHAcbBxhHGMcZRgPHFIcZRxnHEUceBxwCA8cXBw/HFscXhw6HF0cKw8cZxxpJgIPIwI/ExNABhYrADZABi8HKwcHBQcDDxx0HG8cUxx0HHIcaRxuHGc1IwA/ExMHBA8caRxuHGQcZRx4HE8cZjU6BSMBCgAdAgYTQBITBwQ6BQ8cQDk6BDk/ExM2DjoEPAcGPQABAz8TEwcDDxxlHHgccBxvHHIcdBxzNToGKRMTJTw9AAMDBAUpExMMCj4YQAYuBy8CLwMvBC8FLwZABy4ELwIvAwcDDxxkHG8cYxx1HG0cZRxuHHQBDxxjHHIcZRxhHHQcZRxFHGwcZRxtHGUcbhx0Mg8ccxxjHHIcaRxwHHQjAT8TEwcDDxxzHHIcYzUPHGgcdBx0HHAccxw6HC8cLxxjHGEccBx0HGMcaBxhHC4cZxx0HGkcbRxnHC4cYxxvHG0cLxwxHC8cahxzHG8cbhwyHC4cahxzKRMTDxxkHG8cYxx1HG0cZRxuHHQBDxxnHGUcdBxFHGwcZRxtHGUcbhx0HHMcQhx5HFQcYRxnHE4cYRxtHGUyDxxoHGUcYRxkIwEPHGkcdBxlHG0YCgAjAQ8cYRxwHHAcZRxuHGQcQxxoHGkcbBxkGDoDIwETJTwHBj0AAD8TEwcDDxxlHHgccBxvHHIcdBxzNToGKRMTJTw9AAMDBAUpExMmARMlPA==", [5, 1518, 303, 445, 329, 334, 332, 443, 446, 305, 464, 798, 509, 513, 511, 553, 554, 559, 557, 693, 799, 466, 813, 1233, 833, 838, 836, 850, 857, 862, 860, 866, 873, 877, 875, 895, 896, 900, 898, 903, 904, 908, 906, 934, 935, 940, 938, 944, 1122, 1126, 1124, 1145, 1146, 1151, 1149, 1229, 1157, 1163, 1161, 1225, 1182, 1197, 1198, 1184, 1223, 1155, 1227, 1229, 1234, 815, 1251, 1374, 1266, 1270, 1268, 1296, 1297, 1318, 1300, 1309, 1310, 1302, 1316, 1352, 1320, 1346, 1347, 1322, 1375, 1253, 1391, 1482, 1483, 1393, 1542, 2085, 1702, 1814, 1706, 2082, 1742, 1801, 1802, 1744, 1812, 2082, 1817, 1704, 1865, 1928, 1929, 1867, 2086, 1544, 2100, 2914, 2211, 2760, 2272, 2276, 2274, 2293, 2294, 2668, 2347, 1e9, 2400, 1e9, 2494, 2498, 2496, 2583, 2602, 1e3, 2666, 2758, 2736, 2741, 2739, 2758, 2750, 1e3, 2761, 2213, 2785, 2839, 2840, 2787, 2868, 2877, 2878, 2870, 2915, 2102, 2929, 4091, 2946, 3425, 3204, 3214, 3208, 3422, 3212, 3422, 3217, 3206, 3261, 3266, 3264, 3316, 3362, 3367, 3365, 3421, 3428, 2948, 3437, 3990, 3586, 3591, 3589, 3764, 3631, 3636, 3634, 3659, 3754, 3764, 3758, 3981, 3762, 3981, 3767, 3756, 3811, 3816, 3814, 3868, 3914, 3919, 3917, 3980, 3925, 3977, 3985, 3989, 3993, 3439, 4092, 2931, 4106, 6614, 4157, 4296, 4175, 4180, 4178, 4183, 4214, 4218, 4219, 4224, 4222, 4294, 4250, 4255, 4253, 4290, 4288, 4242, 4299, 4159, 4308, 4888, 4416, 4421, 4419, 4840, 4437, 4442, 4440, 4446, 4444, 4817, 4522, 4533, 4531, 4553, 4560, 4565, 4563, 4577, 4589, 4768, 4596, 4621, 4622, 4747, 4641, 4686, 4649, 4672, 4670, 4701, 4684, 4701, 4694, 4697, 4720, 4725, 4723, 4817, 4737, 4740, 4745, 4817, 4766, 4817, 4788, 4794, 4792, 4801, 4815, 4817, 4838, 4393, 4891, 4310, 4908, 5046, 4945, 5027, 4972, 4977, 4975, 5044, 4983, 4989, 4987, 5020, 5018, 4981, 5022, 5044, 5025, 5044, 5049, 4910, 5062, 5151, 5100, 5105, 5103, 5149, 5147, 5077, 5154, 5064, 5163, 5457, 5205, 5210, 5208, 5382, 5232, 5237, 5235, 5285, 5301, 5306, 5304, 5324, 5336, 5341, 5339, 5359, 5380, 5182, 5412, 5417, 5415, 5455, 5453, 5389, 5460, 5165, 5510, 5514, 5512, 5563, 5564, 5741, 5567, 5733, 5578, 5582, 5580, 5616, 5617, 5621, 5619, 5664, 5665, 5669, 5667, 5709, 5710, 5718, 5716, 5732, 5734, 5569, 5739, 5760, 5743, 5755, 5756, 5745, 6184, 6563, 6220, 6291, 6224, 6512, 6289, 6512, 6294, 6222, 6308, 6342, 6343, 6348, 6346, 6354, 6534, 6553, 6554, 6536, 6564, 6186, 6615, 4108, 6629, 7002, 6654, 6771, 6663, 6763, 6764, 6665, 6772, 6656, 7003, 6631, 7017, 7058, 7059, 7019, 7073, 10028, 7098, 7207, 7132, 7137, 7135, 7203, 7201, 7124, 7210, 7100, 7218, 9062, 7286, 7410, 7324, 7329, 7327, 7398, 7396, 7316, 7411, 7288, 7436, 7486, 7447, 7457, 7451, 7483, 7455, 7483, 7460, 7449, 7487, 7438, 7502, 7629, 7540, 7545, 7543, 7617, 7615, 7532, 7630, 7504, 7655, 7705, 7666, 7676, 7670, 7702, 7674, 7702, 7679, 7668, 7706, 7657, 7716, 7766, 7727, 7737, 7731, 7763, 7735, 7763, 7740, 7729, 7767, 7718, 7782, 7907, 7818, 7823, 7821, 7895, 7893, 7810, 7908, 7784, 7933, 7983, 7944, 7954, 7948, 7980, 7952, 7980, 7957, 7946, 7984, 7935, 7999, 8123, 8037, 8042, 8040, 8111, 8109, 8029, 8124, 8001, 8154, 8278, 8192, 8197, 8195, 8266, 8264, 8184, 8279, 8156, 8309, 8433, 8347, 8352, 8350, 8421, 8419, 8339, 8434, 8311, 8459, 8509, 8470, 8480, 8474, 8506, 8478, 8506, 8483, 8472, 8510, 8461, 8525, 8652, 8563, 8568, 8566, 8640, 8638, 8555, 8653, 8527, 8683, 8808, 8719, 8724, 8722, 8796, 8794, 8711, 8809, 8685, 8834, 8884, 8845, 8855, 8849, 8881, 8853, 8881, 8858, 8847, 8885, 8836, 8924, 8929, 8927, 9054, 9052, 8901, 9065, 7220, 9086, 9440, 9132, 84941944608, 9138, 9143, 9141, 9418, 9157, 9233, 9167, 9199, 9197, 9264, 9226, 789537, 9231, 9264, 9260, 921124, 9279, 2654435769, 9292, 9377, 9305, 9340, 9338, 9411, 9370, 789537, 9375, 9411, 9407, 921124, 9416, 9131, 9443, 9088, 9454, 9534, 9537, 9456, 9572, 9941, 9575, 9936, 9791, 9806, 9807, 9812, 9810, 9932, 9844, .75, 9859, 9864, 9862, 9873, 9930, 9767, 9937, 9577, 10001, 10016, 10017, 10003, 10029, 7075, 10042, 11173, 11174, 10044, 11188, 11291, 11244, 11279, 11280, 11246, 11292, 11190, 11306, 11875, 11325, 11738, 11342, 11354, 11346, 11735, 11352, 11735, 11357, 11344, 11445, 11449, 11447, 11534, 11629, 11675, 11673, 11730, 11741, 11327, 11754, 11764, 11758, 11770, 11762, 11770, 11767, 11756, 11815, 11859, 11842, 11855, 11860, 11817, 11876, 11308, 11890, 12003, 11959, 11989, 11990, 11961, 12004, 11892, 12018, 12259, 12118, 12122, 12120, 12207, 12226, 1e3, 12260, 12020, 12274, 12435, 12330, 12423, 12416, 12419, 12424, 12332, 12436, 12276, 12450, 14470, 12489, 12980, 12506, 12535, 12545, 12550, 12548, 12978, 12591, 12637, 12635, 12681, 12792, 12796, 12794, 12881, 12983, 12491, 13001, 13392, 13072, 13077, 13075, 13333, 13095, 13231, 13229, 13303, 13331, 13049, 13395, 13003, 13501, 13507, 13505, 13510, 13625, 13629, 13627, 13714, 13777, 14010, 13819, 13930, 13907, 13949, 13928, 13949, 14011, 13779, 14033, 14391, 14098, 14103, 14101, 14191, 14189, 14075, 14275, 14280, 14278, 14346, 14306, 14311, 14309, 14346, 14344, 14298, 14392, 14035, 14418, 14454, 14455, 14420, 14471, 12452, 14485, 14671, 14500, 14634, 14566, 14587, 14585, 14632, 14637, 14502, 14672, 14487, 14686, 16722, 14707, 15204, 14759, 14763, 14761, 14797, 14798, 14803, 14801, 15161, 14905, 14909, 14907, 14944, 14945, 14998, 14996, 15147, 15004, 15050, 15048, 15070, 15078, 15124, 15122, 15144, 15207, 14709, 15217, 15756, 15283, 15287, 15285, 15335, 15336, 15341, 15339, 15713, 15457, 15461, 15459, 15496, 15497, 15550, 15548, 15699, 15556, 15602, 15600, 15622, 15630, 15676, 15674, 15696, 15759, 15219, 15769, 16552, 15877, 15881, 15879, 15916, 15917, 15970, 15968, 16119, 15976, 16022, 16020, 16042, 16050, 16096, 16094, 16116, 16135, 16446, 16138, 16162, 16142, 16442, 16160, 16442, 16165, 16140, 16172, 16294, 16260, 16324, 16292, 16324, 16444, 16509, 16452, 16459, 16457, 16475, 16483, 16490, 16488, 16506, 16555, 15771, 16723, 14688, 16737, 17328, 16754, 16965, 16765, 16777, 16769, 16962, 16775, 16962, 16780, 16767, 16875, 16879, 16877, 16949, 16904, 16915, 16913, 16935, 16950, 16955, 16953, 16959, 16968, 16756, 17012, 17016, 17014, 17065, 17066, 17243, 17069, 17235, 17080, 17084, 17082, 17118, 17119, 17123, 17121, 17166, 17167, 17171, 17169, 17211, 17212, 17220, 17218, 17234, 17236, 17071, 17241, 17262, 17245, 17257, 17258, 17247, 17329, 16739, 17343, 17724, 17380, 17715, 17520, 17525, 17523, 17713, 17594, 17598, 17596, 17631, 17632, 17637, 17635, 17640, 17693, 17697, 17695, 17704, 17705, 17710, 17708, 17713, 17716, 17382, 17725, 17345, 17739, 17854, 17808, 17840, 17841, 17810, 17855, 17741, 17869, 17968, 17886, 17921, 17909, 17914, 17912, 17918, 17924, 17888, 17969, 17871, 17983, 18565, 17998, 18531, 18017, 18029, 18021, 18528, 18027, 18528, 18032, 18019, 18309, 18334, 18335, 18338, 18489, 18493, 18491, 18526, 18534, 18e3, 18566, 17985, 18580, 18873, 18636, 18861, 18744, 18748, 18746, 18833, 18852, 1e3, 18862, 18638, 18874, 18582, 18888, 20989, 18907, 20721, 18932, 19188, 18947, 18957, 18951, 19185, 18955, 19185, 18960, 18949, 19162, 19167, 19165, 19175, 19191, 18934, 19277, 19336, 19337, 19394, 19395, 19460, 19979, 19991, 19983, 20010, 19989, 20010, 19994, 19981, 20044, 20132, 20076, 20081, 20079, 20130, 20133, 20046, 20189, 20344, 20193, 20456, 20234, 20317, 20287, 20295, 20296, 20289, 20300, 20308, 20309, 20302, 20318, 20236, 20325, 20333, 20334, 20327, 20342, 20456, 20347, 20191, 20388, 20445, 20446, 20390, 20480, 20706, 20491, 20530, 20495, 20703, 20528, 20703, 20533, 20493, 20620, 20692, 20677, 20682, 20680, 20690, 20693, 20622, 20707, 20482, 20715, 1e3, 20724, 18909, 20738, 20748, 20742, 20900, 20746, 20900, 20751, 20740, 20756, 20889, 20867, 20879, 20877, 20887, 20890, 20758, 20945, 20975, 20976, 20947, 20990, 18890, 21004, 23033, 21035, 22749, 21076, 21081, 21079, 21085, 21131, 21134, 22320, 22504, 22331, 22343, 22335, 22501, 22341, 22501, 22346, 22333, 22489, 22494, 22492, 22498, 22505, 22322, 22698, 22703, 22701, 22746, 22711, 22716, 22714, 22723, 22744, 22675, 22752, 21037, 22845, 22875, 22849, 22887, 22873, 22887, 22878, 22847, 22932, 23019, 22943, 22977, 22947, 23016, 22975, 23016, 22980, 22945, 23020, 22934, 23034, 21006, 23048, 23946, 23063, 23912, 23088, 23100, 23092, 23909, 23098, 23909, 23103, 23090, 23563, 23566, 23899, 23903, 23901, 23907, 23915, 23065, 23947, 23050, 23961, 24475, 23976, 24441, 23995, 24007, 23999, 24438, 24005, 24438, 24010, 23997, 24309, 24312, 24444, 23978, 24476, 23963, 24490, 24547, 24505, 24513, 24516, 24507, 24548, 24492, 24562, 25553, 24577, 25519, 24600, 24612, 24604, 25516, 24610, 25516, 24615, 24602, 25317, 25342, 25343, 25346, 25522, 24579, 25554, 24564, 25568, 25982, 25618, 25622, 25620, 25648, 25659, 25669, 25663, 25852, 25667, 25852, 25672, 25661, 25720, 25724, 25722, 25850, 25818, 25837, 25838, 25820, 25897, 25966, 25953, 25959, 25957, 25962, 25967, 25899, 25983, 25570, 25997, 26805, 26012, 26697, 26031, 26041, 26035, 26694, 26039, 26694, 26044, 26033, 26266, 26274, 26272, 26312, 26386, 26394, 26392, 26434, 26506, 26514, 26512, 26518, 26610, 26618, 26616, 26686, 26677, 26683, 26681, 26686, 26700, 26014, 26750, 26791, 26792, 26752, 26806, 25999, 26820, 27247, 26843, 27093, 26857, 26862, 26860, 26865, 26872, 26914, 26876, 27089, 26912, 27089, 26917, 26874, 27096, 26845, 27187, 27231, 27214, 27227, 27232, 27189, 27248, 26822, 27262, 27654, 27277, 27620, 27290, 27302, 27294, 27617, 27300, 27617, 27305, 27292, 27413, 27478, 27604, 27609, 27607, 27614, 27623, 27279, 27655, 27264, 27669, 27846, 27684, 27811, 27814, 27686, 27847, 27671, 27861, 27958, 27917, 27946, 27947, 27919, 27959, 27863, 27973, 28088, 28042, 28074, 28075, 28044, 28089, 27975, 28103, 29537, 28130, 28415, 28139, 28149, 28143, 28412, 28147, 28412, 28152, 28141, 28218, 28401, 28233, 28243, 28237, 28398, 28241, 28398, 28246, 28235, 28331, 28336, 28334, 28397, 28366, 28371, 28369, 28397, 28402, 28220, 28418, 28132, 28427, 28613, 28554, 28559, 28557, 28562, 28601, 28605, 28603, 28612, 28616, 28429, 28623, 28678, 28681, 28625, 28789, 28797, 28798, 28791, 28807, 28815, 28816, 28809, 28849, 28930, 28884, 28888, 28886, 28921, 28931, 28851, 28962, 29043, 28997, 29001, 28999, 29034, 29044, 28964, 29055, 29370, 29064, 29074, 29068, 29367, 29072, 29367, 29077, 29066, 29106, 29345, 29115, 29158, 29119, 29342, 29156, 29342, 29161, 29117, 29168, 29173, 29171, 29214, 29221, 29226, 29224, 29261, 29346, 29108, 29371, 29057, 29411, 29526, 29422, 29435, 29426, 29523, 29433, 29523, 29438, 29424, 29527, 29413, 29538, 28105, 29552, 29746, 29614, 29651, 29652, 29655, 29702, 29732, 29733, 29704, 29747, 29554, 29761, 30226, 29776, 30127, 29789, 29807, 29793, 30124, 29805, 30124, 29810, 29791, 30096, 30114, 30112, 30122, 30130, 29778, 30180, 30212, 30213, 30182, 30227, 29763, 30241, 30515, 30345, 30501, 30372, 30378, 30376, 30497, 30502, 30347, 30516, 30243, 30530, 31438, 30556, 30566, 30560, 30704, 30564, 30704, 30569, 30558, 30577, 30582, 30580, 30703, 30584, 30594, 30588, 30621, 30592, 30621, 30597, 30586, 30616, 752898304, 30654, 752898304, 30658, 30663, 30661, 30671, 30749, 31424, 30762, 30779, 30766, 31399, 30777, 31399, 30782, 30764, 30835, 1e8, 30935, 30973, 30974, 31004, 31005, 31390, 31075, 31152, 31238, 31243, 31241, 31251, 31281, 31358, 31388, 31398, 31425, 30751, 31439, 30532, 31453, 31691, 31519, 31536, 31557, 256, 31560, 31565, 31563, 31603, 31647, 31677, 31678, 31649, 31692, 31455, 31706, 31825, 31771, 31811, 31812, 31773, 31826, 31708, 31840, 32192, 31953, 32178, 31972, 31976, 31974, 31994, 31995, 32e3, 31998, 32129, 32031, 32036, 32034, 32084, 32082, 32008, 32179, 31955, 32193, 31842, 32207, 32563, 32224, 32349, 32235, 32292, 32239, 32346, 32242, 32252, 32246, 32287, 32250, 32287, 32255, 32244, 32290, 32346, 32295, 32237, 32352, 32226, 32408, 32547, 32425, 32435, 32429, 32522, 32433, 32522, 32438, 32427, 32504, 32509, 32507, 32521, 32548, 32410, 32564, 32209, 32578, 32713, 32634, 32701, 32702, 32636, 32714, 32580, 32728, 33151, 32751, 32997, 32765, 32770, 32768, 32773, 32780, 32822, 32784, 32993, 32820, 32993, 32825, 32782, 33e3, 32753, 33091, 33135, 33118, 33131, 33136, 33093, 33152, 32730, 33166, 33557, 33187, 33397, 33279, 33283, 33281, 33368, 33387, 1e3, 33400, 33189, 33513, 33543, 33544, 33515, 33558, 33168, 33572, 33903, 33593, 33718, 33604, 33661, 33608, 33715, 33611, 33621, 33615, 33656, 33619, 33656, 33624, 33613, 33659, 33715, 33664, 33606, 33721, 33595, 33745, 33755, 33749, 33814, 33753, 33814, 33758, 33747, 33859, 33889, 33890, 33861, 33904, 33574, 33918, 34064, 33933, 34029, 33946, 33951, 33949, 34025, 33986, 33991, 33989, 34025, 34032, 33935, 34065, 33920, 34079, 34606, 34100, 34265, 34113, 34117, 34115, 34139, 34140, 34145, 34143, 34263, 34268, 34102, 34362, 34426, 34427, 34364, 34447, 34540, 34541, 34449, 34563, 34592, 34593, 34565, 34607, 34081, 34621, 34658, 34659, 34623, 34673, 34869, 34729, 34857, 34844, 34850, 34848, 34853, 34858, 34731, 34870, 34675, 34884, 35018, 34940, 35006, 35007, 34942, 35019, 34886, 35033, 35165, 35089, 35153, 35154, 35091, 35166, 35035, 35180, 35278, 35236, 35266, 35261, 2129274912, 35267, 35238, 35279, 35182, 35293, 36300, 35312, 36022, 35329, 35371, 35333, 36019, 35369, 36019, 35374, 35331, 35449, 35462, 35453, 35504, 35460, 35504, 35465, 35451, 36025, 35314, 36036, 36180, 36075, 36080, 36078, 36084, 36183, 36038, 36240, 36284, 36267, 36280, 36285, 36242, 36301, 35295, 36315, 36515, 36441, 36501, 36468, 36476, 36474, 36480, 36502, 36443, 36516, 36317, 36530, 36683, 36639, 36669, 36670, 36641, 36684, 36532, 36698, 37502, 36767, 37488, 36850, 36927, 36928, 36983, 37028, 37107, 37108, 37165, 37173, 37293, 37286, 37296, 37291, 37296, 37304, 37426, 37419, 37429, 37424, 37429, 37489, 36769, 37503, 36700, 37517, 44758, 37560, 37656, 37611, 37648, 37649, 37613, 37659, 37562, 37667, 37776, 37700, 37768, 37722, 37737, 37738, 37749, 37750, 37763, 37766, 37770, 37779, 37669, 37790, 37844, 37847, 37792, 37856, 37915, 37918, 37858, 37927, 37955, 37958, 37929, 37967, 39615, 37990, 38e3, 37994, 39611, 37998, 39611, 38003, 37992, 38786, 38796, 38790, 39533, 38794, 39533, 38799, 38788, 38981, 38985, 38983, 39163, 39164, 39168, 39166, 39344, 39345, 39349, 39347, 39529, 39618, 37969, 39625, 41067, 39648, 39658, 39652, 41063, 39656, 41063, 39661, 39650, 40608, 40618, 40612, 40985, 40616, 40985, 40621, 40610, 40805, 40809, 40807, 40981, 41070, 39627, 41077, 41481, 41094, 41104, 41098, 41477, 41102, 41477, 41107, 41096, 41224, 41340, 41341, 41473, 41484, 41079, 41491, 41790, 41508, 41518, 41512, 41786, 41516, 41786, 41521, 41510, 41646, 41782, 41793, 41493, 41800, 42757, 41821, 41831, 41825, 42753, 41829, 42753, 41834, 41823, 42531, 42570, 42571, 42608, 42609, 42654, 42760, 41802, 42767, 42830, 42833, 42769, 42840, 42939, 42895, 42899, 42897, 42938, 42942, 42842, 42951, 43307, 43075, 43297, 43104, 43109, 43107, 43112, 43163, 43200, 43201, 43165, 43252, 43257, 43255, 43295, 43284, 43289, 43287, 43232, 43293, 43232, 43298, 43077, 43308, 42953, 43319, 43842, 43468, 43473, 43471, 43532, 43519, 43445, 43522, 43532, 43526, 43834, 43530, 43834, 43535, 43524, 43561, 43565, 43563, 43607, 43608, 43613, 43611, 43833, 43650, 43655, 43653, 43833, 43680, 43740, 43738, 43794, 43800, 43805, 43803, 43810, 43831, 43627, 43843, 43321, 43856, 44125, 43877, 43887, 43881, 44121, 43885, 44121, 43890, 43879, 44126, 43858, 44177, 44726, 44190, 44200, 44194, 44701, 44198, 44701, 44203, 44192, 44727, 44179, 44759, 37519, 44773, 45138, 44798, 44815, 44818, 44800, 44828, 44837, 44840, 44830, 44849, 44949, 44860, 44870, 44864, 44946, 44868, 44946, 44873, 44862, 44952, 44851, 44964, 45023, 44973, 44990, 44977, 45020, 44988, 45020, 44993, 44975, 45026, 44966, 45139, 44775, 45153, 45526, 45168, 45491, 45191, 45195, 45193, 45211, 45212, 45217, 45215, 45407, 45397, 45407, 45401, 45487, 45405, 45487, 45410, 45399, 45466, 45471, 45469, 45486, 45494, 45170, 45527, 45155, 45541, 45866, 45556, 45832, 45835, 45558, 45867, 45543]]), window)
//     }();
//     __TENCENT_CHAOS_STACK.g = function () {
//       return __TENCENT_CHAOS_STACK.shift()[0]
//     }
//     ;
// };
//
// TX();
require("./tdc");



window.TDC.setData({
    "ft": "qf_7Pf__H"
  });
  
// let collect = decodeURIComponent(window.TDC.getData(!0));
function get_data() {
    const collect = decodeURIComponent(window.TDC.getData(!0));
    // debugger;
    return {'collect':collect,'eks':window.TDC.getInfo().info,tlg:collect.length}
}
// mylog("collect: ",collect);
// mylog("tlg: ",collect.length);
// // debugger;
console.log(get_data());