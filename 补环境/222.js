// --------------------------------------你要导入的模块包--------------------------------------------------------
const CryptoJs = require("crypto-js");

// ******************************************toString检测脚本**************************************************
function obj_toString(obj, name) {
  Object.defineProperty(obj, Symbol.toStringTag, {
    value: name,
  });
}

// **********************************************深度监测补环境脚本**********************************************
function watch(obj, name, visited = new WeakSet()) {
    // 防止循环引用导致无限递归
    if (obj === null || typeof obj !== 'object' || visited.has(obj)) {
        return obj;
    }

    visited.add(obj);

    // 检查原型链访问
    const checkPrototypeChain = (target, property) => {
        let current = target;
        while (current) {
            if (Object.prototype.hasOwnProperty.call(current, property)) {
                return false; // 属性直接存在于当前对象上
            }
            current = Object.getPrototypeOf(current);
            if (current && current !== Object.prototype && current !== null) {
                console.log(`原型链检测:true (对象: ${name}, 属性: ${property})`);
                return true;
            }
        }
        return false;
    };

    // 需要特殊处理的属性列表（这些属性对this上下文敏感）
    const sensitiveProperties = new Set(['crypto', 'performance', 'indexedDB', 'webkitIndexedDB', 'mozIndexedDB', 'msIndexedDB']);

    // 添加日志去重机制：使用Set记录已打印的属性访问
    const loggedProperties = new Set();

    return new Proxy(obj, {
        get: function (target, property, receiver) {
    try {
        // 排除一些不常见的或可能导致问题的属性
        if (typeof property === 'symbol' || property === 'constructor' || property === '__proto__') {
            return Reflect.get(target, property, receiver);
        }

        // *** 核心修改：针对 window.navigator.platform 的特殊处理 ***
        if (name === "navigator" && property === "platform") {
            if (!loggedProperties.has(`${name}.${property}`)) {
                console.log(`对象 => ${name}, 特殊处理属性: ${String(property)}, 模拟值为: Win32`);
                loggedProperties.add(`${name}.${property}`);
            }
            return "Win32";
        }
        // ***************************************************************

        // 对于敏感属性，直接返回原始值，避免Proxy干扰this上下文
        if (sensitiveProperties.has(String(property))) {
            const value = target[property];
            if (!loggedProperties.has(`${name}.${property}`)) {
                console.log(`对象 => ${name}, 敏感属性直接返回: ${String(property)}`);
                loggedProperties.add(`${name}.${property}`);
            }
            return value;
        }

        const value = Reflect.get(target, property, receiver);

        // 格式化显示的值（如果是函数，只显示"Function"）
        let displayValue = value;
        if (typeof value === 'function') {
            displayValue = 'Function';
        } else if (typeof value === 'object' && value !== null) {
            displayValue = '[object Object]';
        }

        // 深度监听嵌套对象
        if (typeof value === 'object' && value !== null) {
            // 为嵌套对象生成一个更具体的名称
            const nestedName = `${name}.${String(property)}`;
            return watch(value, nestedName, visited);
        }

        // 打印所有属性访问（使用格式化后的值），但添加去重检查
        const logKey = `${name}.${String(property)}`;
        if (!loggedProperties.has(logKey)) {
            console.log(`对象 => ${name}, 读取属性: ${String(property)}, 值为: ${displayValue}, 类型为: ${typeof value}`);
            loggedProperties.add(logKey);
        }

        // 检测原型链访问
        if (!Object.prototype.hasOwnProperty.call(target, property)) {
            checkPrototypeChain(target, property);
        }

        // 检测描述符
        const descriptor = Object.getOwnPropertyDescriptor(target, property);
        if (descriptor) {
            if (descriptor.get || descriptor.set) {
                console.log(`特殊检测: 存在Getter/Setter (对象: ${name}, 属性: ${String(property)})`);
            }
            if (!descriptor.writable && !descriptor.get) {
                console.log(`特殊检测: 只读属性 (对象: ${name}, 属性: ${String(property)})`);
            }
            if (!descriptor.configurable) {
                console.log(`特殊检测: 不可配置属性 (对象: ${name}, 属性: ${String(property)})`);
            }
        }

        return value;
    } catch (e) {
        console.error(`Error in get trap for ${name}.${String(property)}:`, e);
        // 出错时返回原始值
        return target[property];
    }
},
        set: (target, property, newValue, receiver) => {
            try {
                // set 操作不受 undefined 值限制，依然打印
                const logKey = `${name}.${String(property)}.set`;
                if (!loggedProperties.has(logKey)) {
                    console.log(`对象 => ${name}, 设置属性: ${String(property)}, 值为: ${typeof newValue === 'function' ? 'function' : newValue}, 类型为: ${typeof newValue}`);
                    loggedProperties.add(logKey);
                }
            } catch (e) {
                console.error(`Error in set trap for ${name}.${String(property)}:`, e);
            }
            return Reflect.set(target, property, newValue, receiver);
        },
        // 捕获 in 操作符
        has: function(target, property) {
            const logKey = `${name}.${String(property)}.has`;
            if (!loggedProperties.has(logKey)) {
                console.log(`对象 => ${name}, in 操作符检测属性: ${String(property)}`);
                loggedProperties.add(logKey);
            }
            return Reflect.has(target, property);
        },
        // 捕获 delete 操作符
        deleteProperty: function(target, property) {
            console.log(`对象 => ${name}, 删除属性: ${String(property)}`);
            return Reflect.deleteProperty(target, property);
        },
        // 捕获 Object.keys(), Object.values(), Object.entries() 等操作
        ownKeys: function(target) {
            const logKey = `${name}.ownKeys`;
            if (!loggedProperties.has(logKey)) {
                console.log(`对象 => ${name}, 获取自身所有键`);
                loggedProperties.add(logKey);
            }
            return Reflect.ownKeys(target);
        },
        // 捕获 Object.defineProperty()
        defineProperty: function(target, property, descriptor) {
            console.log(`对象 => ${name}, 定义属性: ${String(property)}`);
            return Reflect.defineProperty(target, property, descriptor);
        },
        // 捕获 Object.setPrototypeOf()
        setPrototypeOf: function(target, prototype) {
            console.log(`特殊检测: setPrototypeOf 被调用 (对象: ${name})`);
            return Reflect.setPrototypeOf(target, prototype);
        },
        // 捕获 Object.getPrototypeOf()
        getPrototypeOf: function(target) {
            console.log(`特殊检测: getPrototypeOf 被调用 (对象: ${name})`);
            return Reflect.getPrototypeOf(target);
        }
    });
}
// *******************************************你要补的环境代码***************************************************
window = global;
window.XMLHttpRequest = function(){}
obj_toString(XMLHttpRequest, 'XMLHttpRequest')
function Window(){}
window.devicePixelRatio = 1
window.outerHeight = 1040
window.outerWidth = 1920
window.chrome = {}
// 给window添加prototype
Object.setPrototypeOf(window, Window.prototype);
obj_toString(window, 'Window');
console.log('=== 开始访问window属性 ===');
window = watch(window, 'window');


console.log('=== 开始访问document属性 ===');
function HTMLDocument(){}
document = new HTMLDocument()
window.document = document
obj_toString(document, 'HTMLDocument')
function HTMLBodyElement(){
    this.childElementCount = 24
}
body = new HTMLBodyElement()

innerHTML = ''
HTMLDocument.prototype.body = watch(body,'body')
obj_toString(body, 'HTMLBodyElement')
HTMLDocument.prototype.body.innerHTML = watch(innerHTML,'innerHTML')
HTMLDocument.prototype.all = watch(new HTMLCollection(), 'all')
function HTMLScriptElement(){
    this.parentNode = null
}
obj_toString(new HTMLScriptElement(), 'HTMLScriptElement')
function HTMLCollection(){
    this.length = 1
}

function HTMLHeadElement(){
    this.childElementCount = 49;
}
function CanvasRenderingContext2D(){
    this.direction = "ltr";
    this.fillStyle = "#000000";
    this.filter = "none";
    this.font = "10px sans-serif";
    this.fontKerning = "auto";
    this.fontStretch = "normal";
    this.fontVariantCaps = "normal";
    this.globalAlpha = 1;
    this.globalCompositeOperation = "source-over";
    this.imageSmoothingEnabled = true;
    this.imageSmoothingQuality = "low";
    this.lang = "inherit";
    this.letterSpacing = "0px";
    this.lineCap = "butt";
    this.lineDashOffset = 0;
    this.lineJoin = "miter";
    this.lineWidth = 1;
    this.miterLimit = 10;
    this.shadowBlur = 0;
    this.shadowColor = "rgba(0, 0, 0, 0)";
    this.shadowOffsetX = 0;
    this.shadowOffsetY = 0;
    this.strokeStyle = "#000000";
    this.textAlign = "start";
    this.textBaseline = "alphabetic";
    this.textRendering = "auto";
    this.wordSpacing = "0px";
}
function fillRect(){}
function arc(){}
function stroke(){}
function fillText(){}
CanvasRenderingContext2D.prototype.fillRect = watch(fillRect, 'fillRect')
CanvasRenderingContext2D.prototype.arc = watch(arc, 'arc')
CanvasRenderingContext2D.prototype.stroke = watch(stroke, 'stroke')
CanvasRenderingContext2D.prototype.fillText = watch(fillText, 'fillText')

function WebGLRenderingContext(){
    this.drawingBufferColorSpace = "srgb";
    this.drawingBufferFormat = 32856;
    this.drawingBufferHeight = 150;
    this.drawingBufferWidth = 300;
    this.unpackColorSpace = "srgb";
}
WebGLRenderingContext.prototype.ARRAY_BUFFER = 34962
WebGLRenderingContext.prototype.STATIC_DRAW = 35044

function bindBuffer(){}
WebGLRenderingContext.prototype.bindBuffer = watch(bindBuffer, 'bindBuffer')
function bufferData(){}
WebGLRenderingContext.prototype.bufferData = watch(bufferData, 'bufferData')
function createBuffer(){}
WebGLRenderingContext.prototype.createBuffer = watch(createBuffer, 'createBuffer')


function HTMLCanvasElement() {
    this.width = 300
    this.height = 150
    this.toDataURL = function(){}
    this.getContext = function(val){
        console.log("document.createElement('canvas').getContext('" + val + "')")
        if (val === '2d'){
            d2cn = watch(new CanvasRenderingContext2D(), 'CanvasRenderingContext2D')
            return d2cn
        }
        if (val === 'webgl'){
            webgl = watch(new WebGLRenderingContext(), 'WebGLRenderingContext')
            return webgl
        }
    }
}

HTMLDocument.prototype.head = watch(new HTMLHeadElement(), 'head')
Object.defineProperty(HTMLDocument.prototype, 'createElement',{
    enumerable: true,
    configurable: true,
    writable:true,
    value: function createElement(val){
        console.log("document.createElement('" + val + "')")
        if (val === 'script') {
            script = watch(new HTMLScriptElement(), 'script')
            return script
        }
        if (val === 'canvas') {
            let canvas = watch(new HTMLCanvasElement(), 'canvas');
            return canvas;
        }
    }
})
Object.defineProperty(HTMLDocument.prototype, 'createEvent',{
    enumerable: true,
    configurable: true,
    writable:true,
    value: function createEvent(val){
        console.log("document.createEvent('" + val + "')")
    }
})
Object.defineProperty(HTMLDocument.prototype, 'getElementsByTagName',{
    enumerable: true,
    configurable: true,
    writable:true,
    value: function getElementsByTagName(val){
        console.log("document.getElementsByTagName('" + val + "')")
    }
})
HTMLDocument.prototype.cookie = '__jdu=17475483728601170377086; shshshfpa=660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855; shshshfpx=660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855; PCSYCityID=CN_440000_441300_0; TrackID=1Iupml7GhUMppYoOHNcLMRV1n8vU4LIHHmHRBL8r39imVNRB6EYrPvEE4ZhyaFQjdP-I4vTd_LwWTtoBECn_AbXNrbKURW9hxPKzRCpItCns; pinId=Z_RulOG-J27d71tPa3l1iw; pin=jd_DpKnwcKTUZZG; unick=t0wd2u0z6pw1vh; _tp=GSi0H9%2BqGDdfdwyFnYkXBw%3D%3D; areaId=2; ipLoc-djd=2-2813-61125-0; unpl=JF8EALRnNSttCx8DAh4FHBcRTV9SWw9fQx9WbWUHUVtRGF1SEgYTG0R7XlVdWRRKHx9vYBRXXlNLXQ4aBisSEXteU11bD00VB2xXXAQDGhUQR09SWEBJJVtVWFkKTRADZ2QNZG1bS2QFGjIbFBVNWVFXXw5IHgRuZwVSXFpNUgQSBSsTIExtZG5YDUgTA2dXBGRcaAkAWR4FHBEYThBUWFgOTxIKbWEGXVpZS1QDGgAdFBFCWmRfbQs; __jdv=232945309|haosou-search|t_262767352_haosousearch|cpc|70753761929_0_bef6466407374cf99d333478b8f8598e|1758032287181; __jda=143920055.17475483728601170377086.1747548373.1758032287.1758114986.12; __jdc=143920055; o2State=; 3AB9D23F7A4B3CSS=jdd03MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSIAAAAMZK7I3WTAAAAAADV3CKBD66GUSF4X; shshshfpb=BApXSlyvZVPxA-lb62kUbGA0TRDBDQGMaBnQCH3pi9xJ1MknjYoG2; 3AB9D23F7A4B3C9B=MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSI'
HTMLDocument.prototype.referrer = 'https://www.jd.com/'
function HTMLHtmlElement(){
    this.getAttribute = function(val){
        console.log("document.documentElement.getAttribute('" + val + "')")
        return this.dianshangji_tabid = null
    }
}
documentElement = new HTMLHtmlElement()
HTMLDocument.prototype.documentElement = watch(documentElement, 'documentElement')

document = watch(document, 'document')
Element = function (){
    this.prototype = {
        scrollIntoViewIfNeeded: function (tagName) {
            console.log("scrollIntoViewIfNeeded", tagName);
        }
    };
}
Element = new Element();

window.localStorage = {
    "cfjrrval": "cw:yes~cfp:data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9AAAADICAYAAACwGnoBAAAQAElEQVR4AezdB5xldX3///e9U7YXipQFFhDQpSywi7JINPlpIiaaokaN5aeiwoIldhOTaNxf1BhjF2NYihKNJbZEjRrUwN9IlEVhgZWiUrfQBLawdcq9//f7zNzZ6Tt9Z+68xu9nzjnf8/1+z/f7PGeWx8PPnDtlTfKvqqqHO85xvMlxkeObjp857nZsduxxVDoj+6nLubRJ2/RJ34xxePflus8cx5Md5zr+0fEdx08cax23Oe5xPOjY5mjtjOynLufSJm3TJ30zRsbKmHO6X0vV6uGOcxxvclzk+KbjZ467HZsdexyVzsh+6nIubdI2fdI3Y/RYR4/rcIAAAggggAACCCCAAAIIIIBAXwFqEEAAAQQQQAABBBBAAAEEEEBgCAKTLoHuJPUSx+scX3Lc7TXc57jS8XHHGxx/7HiS4xhJCyU1O0qdkf3UHePjtEnb9EnfjHGfx9zi2OR42G22O65zfNbxDsezHU9xnO5Y4jjacYhjnqOxM7KfupxLm7RNn/TNGBnrutul7R+eX334mSuqmw58Q3WL/l336WFlDh/3OJlT5pY5Zq6Zc+Y+5HU40Z7k+pe8fZ0j8/CwQyvVle4xDWNoOrSawgJP8NzPdVzgOMWRnydvKAgggAACCCCAAAIIIDD1BVgBAggggAACCCCAAAIIIIAAAhMjMCkS6E5mr3D8g+MWL/s2xz85XuxIctmbMS0LPNoix0GOMS1rPNo7HSc7TnS8fZsO+sEaLXr0U1qg57vicY5ljqTPvyhpg/dHXmITo1jd5pT4LY5/cKwY+ZD0RGDKCRzsGX/K8cicWeVfnnr8nM8uf+LcixfMbVjnuq2OzziOclAQQAABBBBAAAEEEEAAgf0nwJURQAABBBBAAAEEEEAAAQSmjMB+S6A7WX6w4+2OG611reMvHSc5JnV5qa5SSZfoGH1R1+s3Wuztcl2lvIZ+lqQPOm51DFiy2qS8X+YWix15d/193t7s6K9cdpWU6O9cre6eh6S/+uJJuuehGF6rT125WX/1hbt09W1Jstdajfn2G1qmhfq4rtPYXualOk9P0zv0mGYqX72PUzcuceE/n6mVq7fogovz6w7jcolpN+irL59n0x8Xkf2xBXimh7vjD55ywOvXfm7Zgduv/i3d9K/Ldf2/LNOWH56tW760fN7L/+CQV7nNrx0vdVAQQAABBBBAAAEEEEAAAQRGIEAXBBBAAAEEEEAAAQQQQGA6CfSfQL/wn49wwuseR7Urxiip6IT5UsfFRnbWVx/y9jTHlCjv0w36iR7QRr1M39ZL9XHN1gZJax03OUZU8qsD73bPKDzL27xLe6+3oykzGhfqgLnH6qzj7lK1erFj6WiGq9O+LGtqCzx15ozytz/3nics+O7HTtHpT5jbZzUnHTtHn3vPE/VfHz9lxgHzG7/gBi90UBBAAAEEEEAAAQQQQAABBKaXAKtFAAEEEEAAAQQQQAABBIYlUO7T+oKL36VKeaNK1bfqkgtKXVEpv2A0b+Y6aZ7E+ed8vbxrfYG3U+7vE9+qLTpQc/V2NetUSf+qOf7+UsczHGNQvu8x/tyxxPEix+cdFcfIS4xjfbOT6J9zkEgfueUk6zmE6dR+ESY/00NoPmiTvD2+cvWPdf4lXxy0Xe+Tn3nNY/435GlFZL/3+ZEdN7vbFy7+i+NnvPwPDvXu4OVZZx2gr7xviUr+18wtD3JQEEAAAQQQQAABBBBAAAEEEJgiAkwTAQQQQAABBBBAAAEEJlqgZwI9b5lXS29XubJCqy/8Ro/JXLrypX3qejTo/8CJ83xU+0U+m8T5y72dkuURz/p6R942/7K341p2e/SvOl7h+DtHEusPezu6Evsk0i8a/VCjmwi9EdDoCM599tkHLH7lczqS5z+4brPO+/tf9Rnxrz59t/71v/JBF9LvnXmALnje4Qvd6C0OCgIIIIAAAggggAACCCCAAAIITIQA10AAAQQQQAABBBBAYAoK7E2g5w3TauktKlU/rItfe12/a0mb3m+h1t5y7f5mamfd80+88t8XNF/x0Dd09xtq43lfeRE02+51x+iL2qQdeqmu0tP0Lf2F1hTt0jbHj6lV79MNXXW19rUxem/TPv3SP7FQV+g6dSTT1PnVfby0yXHnqR6bv/e8DtEX9Svd4foHHJ91XOVodXzLkX1vilKru8RHtbjB+91L2qffGlemTY69q8zvCu+kLuH6TT5MMn2Zt/mo90zhMtdf4POJN7v93enn873L2rultKlFjqU3nOB2n3a8T8+25+quyLGri1L7++bZHqO/77dN0bDbt+t0jPI30dN+k/c0wFf+pnlJHddN+4v0dB2tDyj9B+hSVGcutX7Z5jgnss04vfunvjaXXFN5dleufqW3g/9pgmqp9ne7O9p1f7ZzwRyvXN1xLmPm5yL13WOgv6eeX1LJ31nP+bTv/FnpNqcfq/t42c819l7vHqVP+nbMY4uPz8xhEbW6Cy7+y+KTJGTaaum9xfiDvYmec3uv0fF34Feuvqf41InMtbFtg8d/qv99eEkxVq6TedTa+GRXybnMOXNPZffjntepGVaH+Wb7q9/6kiMzchE/uG6LLv/Wg8V+929fuPI3+taPH+mqetOLFmU/fxM9n8yQ/REHHRFAAAEEEEAAAQQQQAABBBBAoP4FWCECCCCAAAIIIIDA9BTYm0BvbjnRBPmI71u97b/kI5hL1SudRDtKteSYdIQbL3Td2U7kZV8vv+kJZz/+2/MO/PvbznzuqS0Hlm7VZjfpKLX9r8nJ3Y4qpe5sHeaB8pHo0jV6QPPVJGfXtFEv0wZt9/Fn3W5LV126vkNrsuk3rtAv9RGdVbSvaqWercV6kX6oTdpRtE8yfYGau85/Xc/Uu/VzdU/s3+6Wz3b8jeaoonxU+/E+OsyRHFx/H9uesZPtnus2KzvjZd5mpKu87V6SiG9yRdplrCTBv+vjfDh86hILfZyMuTcbHe9znOJxLnbfl3nc1W6z6oXSD26WdrX4ZLdyh9vc4k5pk/iTJ0kX/0ByEn2Lm71ex+hL2qXbdIENLtDXdbHerT/RN7RMta+tmqW36oX6X/2jqm73Xn1TH9Y56p2oTvtNWqgXaaWWapPW6e90hHIV9flKIvsnerw26i+LMW/RKn1Ez9RWX0uDfF2j43WlTi761Obyp7qwmO8K3a2F2qnv6yTVvh7TTH1Mv6ezdZe6zeWpqpaepdqfJihV3+3jrxdJ4lrHju0nVK68rWhXqv6pn+2XdLVJArhUPdvnjyzOp11D+4qObt2+tzTf5qN1TmK/wNu9JX8KoVr6bvFLKklMV8q3ePy3FmO1Nc4vGja2fVf5+UqCurFtnc9fWZzPvKuln3jM/y1+1tobLnD7dWpveLO3ct2Zbvtsx6u1+sIPFnOU7vXxu4v+qy/ME1Q07fEta6p98kSu0dZ4lF3e4jZHO/zcvPY6pU66xvVfKsbKJ1IUJ4f5LXPINWqRe5A5NrS/Y4gjzSmX9eTfXtZBNcQ+RbMlx8zWosc1J4v+xKJi+n5j5QgggAACCCCAAAIIIIAAAgggUP8CrBABBBBAAAEEEEBghALlXv22Otm2sVddz8NSNR8ovlgdCXc5oXaOG6xzbHMcUVX1/BOuXfClRffPmbdIc/QsHenE50bljfDEldqol+h4JSme40TqTlKSxSq+nqrD9CYtLfaP8Bhn+/hozdWH1JGnTN15WtI1RtGw17c/1yk6U4d01b7Zx1Uf1RLoOZc2rirKM3Wkct0k81Nxqb+d5vieY+jll51NV3Rus8kvBTzFO+sdDzlqJUn27nm8X/jEgY6OdXvHJfuHeVsr7r/H41zv8Z7tcZMOnevtC31ca1LbHuTxX9BtHs/wWMd7rOvv7mxxj27V1coas9Zn6jav/w7XHd55XlqgXfqKLlEtAf0q/US9E9Xy1zbN0ot1vo7SZn1XF2me8hn0PtGrJPH+XZ2ij+qrqo2ZbY57Ne1zeLQe0Yf0ta76N+kqPVV36Gs6QxnjbN2lK3WykjhPo9t0mNbrQL1ZP1S3r3vVPVHb2vQJn7vGCemeSe5S9dVFgtsn1dr0A2+u6WpTKZ/k4w1qac7z3pFcvnRlj4v4vLT3l03OdmL7iKIuCfGO5PvXiuMkvpNMr/25hI4+H/O5pcXPV7WU39TY4Dlknq52aWj/uL8vVLW0ovMaH/PP7EuUN+sr5Y94/8NOnvf88wvuMGDJnKql84p+tU+eyDzyiwHS1gH7jcWJvI2ft+NL1bfaO5+1MJRRjzjykBnlpsZyV9tTHj9bL33W47qOazvP+52D9KQl/jmoVXh77OEz/V0d9yN7xBQUYMoIIIAAAggggAACCCCAAAIIIFD/AqwQAQQQQAABBBDYfwJ7s1BDnUPHm7XrncA7p3hLNm/0Spe5+9ZXf/PET3l7yW3VrQ3P0pGapyad4+16bddt2lzEVrXoBTpWtbptPk5d2rlvvyXJ9aM0V/PV3ON8kvDp36Oy28FLdZVKuqSIFfqP4pobtUO1r2/o7uJc2szXZ5U332/VFl0oaaWjxTG8kreunaTWnF7dasd7ry2vR2rubJePfd/u/XwsdZO3tZL97gnA9E+fQ1QsIx/p/jS3/bnHn5V679fK4z2Pha6vHc/0WAd4rM25TpFE9JllatFqrXTM1ye8/uN1qxa5fnjlNXpF0WGw5HkabNQBWqidyhvj6vZ1pDYryfpuVX12kyBPorx2Ikn6o7RZGzxmkuZv1g99fw/UbfK63Shvoy/WozpRD/ios+Tt7YtfuzdRm0RxtbTByePun6jQ2XiATbmS5PdT1di2reut9AGaetzPFqeS7M5ObVuqril+dkrVo9zmJU5+V7uiWvp6mhbRkazvuFbt49Ur5TU+t8DRUZJ8r5a+5IMrHOqRbC8q9vntCLcoeR75xRjvdpU45YHuqhjTnY7E/UeVuWcNQx981649lR6tX/HsQ/WF/7ekR10OPvHW4/QXLz8qu13R2XdXVwU7CEy0ANdDAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAAIIIDClBbon0JMwqzqhdc6gK6olHZPca26Zn7ar1iy/7S1fXnrkr+7f+uTbtUW/cOKylhDP2+IlSRud8U2cogOVt70Xa66+79o1ekgL1OxE5wFuNTZlk3boGH1RP3HydKNeJmcntUbPVa6jzq+X6ir9qX6gr+uZyvltepWerMP03z6/2jFlyrWeabL9/+XteseQy3lumV8VuNjbfBL4m7RAd2inj4ZTtmqW5mu31umIruT1cPqPVdskypMwT+L8Mc3UlTpZz9ItSqJ9rK5RjJNkbz5+PInfJLuT2M6b1MXJXt+SrE/SPh/bno9kr5be4kT1ZT3ets5HmGe8nrHQba4rRst1ep4rFR+hnnkUDfytXLnV36dWaW/4kCe8QR0fQ+/dIZcNv9nc2vLo1vzSidTeXtWqy+4dNB7pbJsr3HZP8YRPPa9MnkBgEggwBQQQZYpvjAAAEABJREFUQAABBBBAAAEEEEAAAQQQqH8BVogAAggggMB0F9ibQK8l+/Jxznk7dDCZvIWbj6Kulp6/aP2cne+56UlfefG2447Jm+S3arOO0lydqI6EeBLo+Qj2r+luJfL2+Tw1Obl5pPK2d9rX3lYf7JLDOZek/Ba16Cv6PeX66ZvkfeaX/STYk1x/r56k5+vYVOlHatFabddDxdFIv+Vj6PPG845eA+Q4b4gf0qu+92HvF37TL+N1b9fig9R701U2Sje6/kWuuMiRkjfNd3ckGXOoLe5zl8c6OW+5z3TV4x3fdKx1pMzUVh2gH3p3jWOoJW+OX65/0bP1C52jNysf065BvrZotjYpTur6+r5O0lbN6jrub6f2pnntXMb4iR7v56gjST5Pu4v9K3Wy1uhYZbxX6Se15h3bvPGdRHbHkYqPVs9zXKpeWXwceq1+KNtLV75UbY3z3XTvx7v7oE+p/aw0tT7T5xY7gd7xpnftF1HyCQ7d5+RGXSWJ8cxvsJ/HC//5TFVL53vcP3W/o9TU+iZvh1sWeIw8GHv7dbwtf/TeikH3Thr0bO+T+YWDUvXZysfEx6H3+X0f/+DKNZuLVg0NJW1ufoZWXXpvv1Fd9ArNnlEu2v7vTVu1a09lnQ96/6C5ioIAAtNAgCUigAACCCCAAAIIIIAAAggggED9C7BCBBBAAAEERi3QkVmqDdPxNugGVcq3OLl4Zq262J5/yRe7PrI6H0EtbZt1T9O7PnHlU37H548+UQcob3i/R9cX2yTJXV+UJM3/Vw84xfqoVuiQoi5vqKfuUt3u9GlHsr04MQbfjtScYpQkzbOThPlb9dPsFpGPgk+SPwn8VCSj+TynXduUjzdPzUjjiZ0du6egd7gu185HTHfMyxW9SpOPlzrucNzgqJWM031OyXEe6JNJc2dc7yop/5uzIz3ozRsdlzlucrL8quQKvZ/yNY+100n2kzLGbtckAdn949pf4LqDlFF/13s3OoZTVutftVSbNFgS/Zm6rWjzIq10y44kehLuH9Y5+7zUNTpen9Azutq9Qy/QFs12z1tV+3qVfqKtmqWP6fd0iu5T949872zz1B4J5o63oOXk82c11K+Vqz/on40jhtpcrU0/cNsN/pl6gaql/+16s9yVTiB/zZuec0pCfOXqfCyAPK88mgtVm6f8lWR6fhaTdM9+pfyVYty8kV6qvtX7b/f8On52W5q3uUeuPXCC++LXXuc+33V81P061pVxq6WPuu/ekkR374+77++XbjqS4y/Z27HXXm3sUvXDPSzSLGtaufrH/nfmXTkcJD79/is2FG+fp82R5R+pVCr1G5tv+4xmzWxIM/2tk+ze+bSDggACCExBAaaMAAIIIIAAAggggAACCCCAAAL1L8AKEUAAAQQmg0C5xySSJLvkgqc5cfdqVcprlI+nrkXepE2SLh2cODvutvmPHnLlzEOeUj10RqqSMH+WjlQ+vj0J89TVIknzkg/y8e1HqCOJnIT7Ys1V6nPep8esnKlD9Hadqj/VDzz+JfotfVMf1VO0QHkLXMpcP6Kz9F2tV0mX6FmONiWxfNgo55C1vdBjbHdc0hlf8PYpjuWOwcqxPpmXlH/uba1v6o73ca0k0f4HPpjryLhpl89wT79m13WWNd7+0Gv5lpPrF7hNIm+fr/LcjskvMCSB/lU3OsWxujNu8TYJfGmH997raHMMteQN8O/qIi3VJq3QX+kbWtana63NUdps7Q+qpNV6m16or3m7QLv6tO9e8VTdoZ/quKJP+uXt81u0SmfqHtW+jtAWnaL79F1/f4GuVz9f16hamt/1XOft7nLlt5zI3dRP2/6rypWvK79gkp+LxrZtHm+D8jZ6/61VvNmeN9xL1Zd0Jsz3tszPU7mywmO8vWtOlfJH1Nb4jqJRktvlysn+eTy72/n/VUN7x/lK+ctFu9pxR7J+nef3lSIZnp/nUvVj7v+Sov8FF/efmM78q6WfuN/Gol3Wl2S8dG8xfu1bQ/vHvbtUWXeS+D7oNpda3xd4PV/KqT7R2DzX18icj3ab9xbXimNH/Fjak9/oWOD5fr9P354V373lrp1ffesn7ipq3/6yI/QX//dIHe9E+TWnHaiblx+sM+c16ZXPOUQffVM+aUH68Bc26qqfb/U1dGnRiW8IIIAAAhMrwNUQQAABBBBAAAEEEEAAAQQQQKD+BVghAgggUCcCPRPotUUlsXfJBc4td4vUdZ6vqnrOHT9+8W/fo5eqlhDPqXdpuapaqecrid/UdETapO0X9YyOCn+fpyb9WH+s1Oe8Or/SJvU531mljNtfXe++tfbZpk/mkki753tOW3SuspW/ztQh+orOVUkrpSKe4O0fO57hGKjkXNokkd29Tcfb1B01OZc2tXGz7ekhDTTOsR4i7WuR47RN+FRReo+fa+XF4Zf6bJLj3mT8B12/+velxR5rtePvfX7hnJzsjCSe3+z9Czrjp95+yHGZI2WtdurN2qK0U/GVBPU9+mvfj+8Wx8/XWm3Rm3WmOtokQf5jfUhVXaCcUz9f3dukXdpv00xt1ayu1l/UZX42PqS0TWXt+Du6qBg7/TKPzCfnu8dJuk9Jtj9Tt3Wv3rvf1vhe7X22j+mRPE/C+pILFqrbs14kwPNLJUkyZ5Ram9oYtfqcGyhWX/i+4prdx6217T1erpXE997zm9z3GEft57FjzmmTtpdc0HGc9v3V5Zq1uWYeaddfZB21djHo+JSJni27zzXtc/bi1/acX+oTmVvmkza140tefr/X8TRHbS3dt09TU/lkN9+qluYBbp7P7i3nffIr9937mvf/Sjt2VfTBNxyrz110in745Ln6+vLZ+rv3PlFXvPuJqlSreuc/3a2//Ke785ELL3X3dgcFAQQQQACBYQnQGAEEEEAAAQQQQAABBBBAAAEE6l+AFSKAAAI1gf4T6LWz/Wyrqq5w9TcceXncm6lZ1njaz3dUHSMvLe663XGAY5KWd3le+XT2jpd1fTD0EpsYxWrovYbf8lYdroXaqf4S4hrG12NOxF+pk/Us3dKVfB9Gd5ruf4GTlI+JryXeB5/PNp/+rc98+8GfnPDCn+kjX9yohXMb9Z7zjtYqx5KjZ+nTX79PJ774en3w8xtvrVT0O26/0UFBAAEEEEBgugmwXgQQQAABBBBAAAEEEEAAAQQQqH8BVogAAmMoMKwEupPni33tf3N0f5XZh1OrrPd0/8yxwzG68svO7rU3vzsPJ9vm657QHzrWOoZZYhSrmA2za5/mSXA/R3+u63SMal/f0DK9W3+i83SNRptA/4FO1AYdoFfpJ7Xh2U4lgbwhn7fVhz7nfPT+bz3wSOvz3v7Ju79x0kuu/03prB8rcczzfrb59R+689t3bdr9Kg93qmOdg4IAAggggAACU06ACSOAAAIIIIAAAggggAACCCCAQP0LsEIEJpdAeZjT+bzbH+2Y0uXlnv29jpGXq9z1EsfNjt9zTIHfJ8iHYv++p5pPavdmOCVWMRtOn/7a5iPZL9Hn9SKtVEmri/hTXaiv62K9S9/tr8uQ6pKQX6iP69V6pb6iS0adiBdfU03gPzzhP3XkN1nyyRiJA338x44rHHxsuxEoCCCAAAIIILAfBLgkAggggAACCCCAAAIIIIAAAgjUvwArrDuBISfQq6pe7NX/tmNKlws9+/9xjK48w91XOs51JGfnzVQoD3mSZzvucwyzxCx2w+zWp3neMr9Hf62qLuiK52sEr8Z3G/lM3aMterMS2Vc/X1/UZdIlFzxNQ/t48H5GmGZVF792k72O0eoL8+captniWS4CCCCAAAIIIIBABAgEEEAAAQQQQAABBBBAAAEEEKh/AVbYV2BICXQnz8931wscU7pc6tmvdkz78p8W2OAYZoldDIfZjeYIIIAAAggggAACCCCAwEQLcD0EEEAAAQQQQAABBBBAAAEEEKh/gXFZ4T4T6E6eL/GVP+WY0uV2z/4NDkoEqtL3HKc4Vg8vVq6utpRWV08sXaLSVIusnEAAAQQQQAABBBBAAAEEJr8AM0QAAQQQQAABBBBAAAEEEEAAgf0lsM8Euif2UUezY3RlP/d+q6/f4qB0E3ij9//eMbySZyHPxPB60RoBBBBAAAEEEEAAAQQQQGB6CLBKBBBAAAEEEEAAAQQQQAABBKawwKAJ9Kqqr/Pa/sAxpcunPfvvOUZT6rbv33hln3QMr/yBqsWzMbxetEYAAQTqRyD//Vzo5RzpOM5xsmOZ41THEx1HOw5xzHBQEEAAAQQQQAABBKaQAFNFAAEEEEAAAQQQQAABBBCY3gJJAPQr4OT5wT7xfseULg979skRezOdy+Brf5NPf8YxvPJ+J9HzjAyvF60RQACBqS9wkJew1JHE+aHeLlwwu2nmiiWzy8cdPrvJx3Md+ffxKG9PcTze0eigIIAAAggggAACCCAw3gKMjwACCCCAAAIIIIAAAgggMEqBARPoHvc9jrxd583ULf/PU9/ioOxD4DU+/xXH0EuejTwjQ+8x4pZ0RAABBCaFQJLgJ3gmxzQ1qfGVzzlYV35iqe77zxXactUKXXvFct3x78u148dP1fXe/8BrF2vJ4tlurgP8LW+oL/CWggACCCCAAAIIIIAAAgMKcAIBBBBAAAEEEEAAAQQQ2P8C/SbQq6rmzbo37P/pjW4G69z9Uw7KEAXOd7sfOYZe3qBq8awMvcd0bMmaEUCgHgTmeRFJgs9/6TkHO1G+Qle8e4nOWbFAhx+cl859trPkHfTlS2brna9crNu+slyffttxOnhBU5Lvx7tJ3koveUtBAAEEEEAAAQQQQACBehNgPQgggAACCCCAAAIIIFAXAv0m0L2ydzimfPnQlF/BBC9gm6+30nGXY+ilLp6VoS93+rVkxQggoPk2OGH2bDX+54eX6gt/t0SLeyXNfX7A8toXHq47nEh/+vLiBfRD3DCJdJLohqAggAACCCCAAAIIIIDA5BFgJggggAACCCCAAAIIINAh0CeB3vn2+cs7Tnd836Pt+o3u1EbdpHt1fRHrdYOP12mLNqmiNk22r7x9/vnJNqkJnc9uX+1Xjhsc1zuy3eTt7Y4c3+1tPyVd/qKf+oGrXj6St9Bf8xMd+JobteyCG3Tayp+r+IzjgS+x94zbLjnvep1x3hodW6vNfupyrlY3mbavu0WH7c/59edjq9mxzz3IvZhMXplP5pX5ZZ6jnNu0737uWi18zfU63pY9X5Mea5mqShfeqCN8ncWjHdpjNL3mZzolz0Geh9GON8r+M9z/uKYmla76xFI956lFEtxVwysLFjQVH/eeN9bdMwn5I7ylIIAAAggggAACCCCAAAIIjI0AoyCAAAIIIIAAAgggMGYCfRLoHvn1jqK0q1UP6dd6QL/UTm1RuxPlZTUoIZV83KKtPrtJt/j8Zk2mr3+aTJOZ8LlUfMV7HI85qo6Gzmj2dgjl627zfsfQS9czM/QutEQAgX0LjK7Fa2/WAQmH2HcAABAASURBVA1tOlYVzRzdSPvufe6NOrqtXYdV2v0fiX03n0otjvFky5e+c4lWLB1Z8tz9i+IkvL6St9cPb8rxof425F8eclsKAggggAACCCCAAAIIIIBA3QqwMAQQQAABBBBAAIHJJFDuPpmqqgf7OB/iXSTHH9SvtEvbVFJZ83WoFmuZjtLpRWT/cXq8GtWsihPrj2i99mi7JsPXw57EJY7pW9q99DZHPiH4SG9Pd5zmeJxjieMMR9cL3N7vp7zLdd9xDK2sVLV4dobWmlYIIDAhAi3bVVLThFxKjS2+Vu9LjfD4kiep9fIn6xeXn661l5+tR0c4zFh0S8Z8bj6C/ZXPyX8e9w55+/qduuH2nXsr+tl7eGurrr5hq1pb957Mm+j5GPgk012bf6C9oSCAAAIIIIAAAggggAACCCAwhQWYOgIIIIAAAgggUGcCPRLoXtu5jmRdnbHYoFbtVlmNepyO0wE6UiUfqdvXbB1QnGtQk5JE36yNqnqvW5P9snuFr5r3rr2Z5qXk9Y8ie5aPcr/PQ+y75EJ5dvbdkhYIIIDAFBHwNA9bMLtJH3htz0+lT2L81JfdoDPOvUFrBkmi/+Hbb9czXrdOH/nieg+1tyw9brZe+9zDUzHP33gL3QgUBBBAAAEEEEAAAQQQQAABBPaXANdFAAEEEEAAAQR6C5R7VfzfHO/WY06d5+O/pbk6SLM0P9X9RrNmF23KalDJCfZ2p90f1Xrdq+v1kH6t3l87lLNri/PZ630+b73f29l3o27Weq3VLm3t3UwP6JdKu7Rp1e4e5z+nLZL7STd7m3N3e3u9I9sd3t7muMGRuhu93eRIyj0ffX6v91OXc2nzKx9nDG+GXPL2d8Zc5x4ZI2MlbvJx5tDibe+S6z/gylsc3ftkLne4bvA3Hd3AJa85/sLbrHuPt1lPrpdr3+7jlGxznPocd484/9IVax1uc6vn8TaP1/YbH/cqbY9Ku9xuV8f5xh3XnX/e9Trj/Ot0ev4Ocq31y2/SnFf/TE9c+XMtr51/xU90hPJeZ61R721VpVffoEVuf6rjjM6+J3q7z0TT627R3FfdoJPctrie+5+aseQxe18mx24323HcBTfoNLc9I+Hj5a+5Saece50O693P55akja9zWP62tPt1XStrf80NOnrV1WrM2PuKVbeo2WOd6Mgal8ZqX32K815L1uR+hY+3Z2S+ntvBmVeOvZ+PGiia7+tbq390neM7KvPv7Ls896z3fC5YqxNy/tU36YkDjZlzaROHtMk8cpx5ef/gzDPHiez7XuVjEdK032jbrYaM1X1u+dvYse/ToT+XG7Usc/K1B3viuobK39vO393O9V59jZLc7DpX2zlvnQ5deZOWn/tzLc09rNXnvmeufia6nqXspy7nau16bPuZ8/lrdXr+ZvkL/Xx0b5t77nUs74wi+9r9/Hk36di4vnqNTrP3XLdbUpqhY0vtKpfKmlEp6dTMx/X7/DnKuLn/eQ7cvvhZiknWkrEzTsLn8vMzO/t+6g9Mv2wzD58rnsGaadq4rs+1+zvvdn3+Brrriutk7MEi9y9jFnMZ3bcmd5+bv3meJLr3u8r9D7d2vVV+5/qB/22unbt9ff5t7upe7LzyOV23sMOtqB3TbwyGAAIIIIAAAggggAACCCCAAAL1L8AKEUAAAQQQQGAcBLoS6FVVV3j8fM63dmqzKmp3SrxRs3WAqwcvC50PPUqn61A9wbmTGZrhlHpJZSWx3aY96v6Vj3mvevTUtWhXNl2R9omS+87V44qx0na3OpL56vxKm7bOcSueZ2u3cda4zTpt8/ckj/NnfxM+LEqu9yvvJeFR9jaRjztP4jpvCP7adfkA+Kq3DY5sc+07vd83AeLKfkqS4790fcbMfq6RsbJtc70Tz8p1cs6HRclcM68k3ZOsL7m21ifzS2I7fba7fl+l0Q3SN2N4V9mvRY4HivziQNaZa2Td6eMxvuz790nb7Mn8Ms/e/b2m1k1qKzU+4X8P/ZuTKs0qOenpSukVa3RQc4ueUC5rbno5kdee880zdFjlMSenU9krVlVVfvXP3aeqZJeaqhVVqg3FAzO7rV0nWK2pV5euw7ayZrS26PiGqmalT/r6ZFPZY2XMjO3jrpL5tVf1xEpJC922IfNLpEGpTTMaG3TEedfpGPXz1bZLC5vb9Xj377qWr9lQqurgjfN1wqp9JNFz3nm3fI7+bM+vZVeT7vr8adrRz6V6VK2yz/k36QT36fJxcrQ983XDxZmXt0MuDW0qNTfqiJYWHeJxyrX1557l3sWoNli1XZt93WpTu2YmuVqrr21Tl3O2rDRUlN9iUe2rc16LM09fp91Wlez7Xi0+b43iUGvatfX9LJdn6dhSVQfnuanNzf1nxP7Cm3RIrXFcco89v8Nd1+Q27Wmf9ZXbNLe9UY93ArbnZ3C7Ye9y1B5tK7eoxfNraJ6r+b3P57i0Uwsqdmts1/ZVJ6sldVn7ffN0YubqZ6KxVFZ7otj3/HMubdK2Fkm+n3eDltTmHLfM2VEuSQsW7tBJ+RvmtfaLl+mBaqO2+3ktOR73lp9oVu1c7lO1qoUeq+rn9qFPn6ztLW0dc0ib1Hvcdv8Mtc9pUTV1g0XGy/3Pc5B26ev1lLO+1h062tcvpT6R8TKuzSo5zjbtc/0cj1XUrpOx+4usMdfKuZY52pP9UUZx/89Zsc/HZkSXWb5ktg5eUPxzVlxHfPUS4BABBBBAAAEEEEAAAQQQQAABBOpfgBUigAACCCAwOQWS1a3N7Hm1nZbOhHSDmv2/rhyNhvo10/nSstPf7WpzFmOHun+1KMnrjpp2557a3KLjSN7bror7NKhJMzRHGSfn9qjnGDmuKIllORNUcb+957/hEdTVvvcLpLs8XJMjL0ae7m1iobcpD/tb5nakt8scOXe0t2VHcjFbvR1K2ehGSYI3e9v9OhlzketKjpxPIt27Rbnf35O4bvT28Y60zfWzTf62wXVtjszRmwFLbW0nu0Wun7nno4cz1gmuG6jkDfNHfDJ5tfzCxKneT59c33P+sMe58zGpxYl0n+lRnFWV77VmnqTbjnjfyUedppsuW6GHktxLYjZJNye2dmyepV9ceqZuvPw03Vgt6eGmRs10oqusXl/3Xa8jk7RLMlGt2nj5k7X20mW6sXmmfunEYKWxpCysV6+OQ1+nMf2aduqu9EnfjJG6jJmxO1pKSV6WG7Soc35bFj2mmzO/RPYbysVvYajSpPlv2aA+PwROIM7xWDu3ztS62rVa9ugBz6FabtSsBw7UgG+VJtm7fq6Oy5wktTbO0t1DSZ67rTau0SKTz8uasrasMdff06jbnaxt6ZxXmg4p3D4PZFOlos1Zd9afe+V17IhN7mHuZQZbNEvbWjxfX6dxVqvmp657zKlqYc41lLRr0RnyA7P3rK8zx+daMs/MN89Be7se8nWqvg8HnHetDt3bumMvz4eTsQ1uc1/aZ24tj+nWUoN2e7ySHQ7+P52/qOB7e6CfqzlObLftatWvc420X+T76rVtL8aq6NBVne07rtD3+6qnq63SqPwwymPNW1VVuXurPAvVRs2Mf1uzNstfqzymk+lJKje7fk9tjZlD9tvt4fk2z2jT4lXdxru/RfkHZrbPteWZLe6lf0biX2rTY1l7e4uOPPdqFb8FtKqkyu6S8ls2rb5s045m+YdTyvmZDVqUNbp+6yVP0v3e6oqz9OvKLq33OJXY+37e4mv84mNna1fODxS537nvbl+2fdfP7qIzdKMa9ajHy/ob1PmV8TJuaY+KX5rINva5vsbwq3adjN072hv1UC5l/4oT95uG+vOUPoPEnJx76tI+L82nekxixdIFGSf3Nz+H2SfqRYB1IIAAAggggAACCCCAAAIIIIBA/QuwQgQQQACBuhXonhz6o6yy3QnsamdyusHZklLP/JGG8tWgZs3QbFWV5PZ21b5atdujt3jERmXsXCt1tfO79Zj7VN17thrUpJma77YN7rPHucIknTtatmiH21WUFqlp1d580LeLfaf5PIJUvPicJp1R9vZIxxxHSsnfkudMvXeV/e55vCTXZ/hEEstJrnt30JLrZp4ZLy/H1q5T65Sxa7nY2pwz9g43SJ9cLwlsH3aVg7xX+0WAjO3DMS0Vj1ZLnscrCfsk8l1dlMOl+x8nfdgH7dukam3ePq6VRs+xnByQ/ihJPpXcanaBmbe/W5z0vOernW/q5tzly3Wvk597H4zOcZLUtuCCHDoZ+JvLztKD2U8Ub9Q2aEMSZDnuL5zYq1T3aOM/P01FYjNtMkbGyn7GzjWyv2Gr5jqBHfTWOYfqvlVOnKY+kf3WHXrACcS8RVzetkG1m5bTtUi/e7vW5drHP0X3Oxm6y4nX0u6KfwBc17skgbrpJh3va891u7bmmbora+vdrr/jzL2tUcUDkjVlbbV2SRjubtf6zLlWN9RtpaLti5+ke7Lu9Mmacs+cPDWZmnZ13Eut8j10orh23xZkLWmfyL7XUzyo5UY9tqqkPFg5VUTmlfllnh0Vqn72TG3w/lablfzDfGDG8HHPUtGjRUK4pPyg6Iqna3epTQ96btVWqWnZ8e7pHo2z1OjEfamxQXu+cJb8oLrSZVXu6x7d53NtnkP5zgOVH2ifGbhUd+pRt233szZz/f9qTveWOx5UfkiL5/qYLSos8ssSTQ2a6XW0zZite7rWKCn7s7Zqfc45iT0riX5Xa+XPtaCtTXPzzLa19nxm419q0N2+/h73a555gPwDll4d43ntv3FUnTSe//rbdNCMhToq7dJ+0SzFtKPxCL933u8md2+d06KuZ3xVSZUjT9W9eV58btKUl12r+b6/h9ig1NSozZ9bofyDNhbzi4GOW9w3gb6g483x4hq9P969qOz81vmGuQ4u/lXrrOy2WbK4uET+Q1TsdDvFLgL7VYCLI4AAAggggAACCCCAAAIIIIBA/QuwQgQQQACBgQXKOVVVNa9Kn5R9OU9VUUfuq6zuiVQN62um5qnk/+3RjmLEdM5+Re3OYM32yDOK+hZ1JKbb1aZW7XKPkrOV89NcTd5rVLNn06Y9KnJVRX2LdrpdWTM1v9i2+my7e9/us7cpyei8nT7DRz1yXz5ucvSuS7swJOb5fPeS9ac+dRkz28Gi2SfDmDe3kyz3YY+SsUo9auQVSE+QlD55IdW7fUr69akco4pdHieJ+czrIO/3d62Dpc/a7j/bpPbH3KZ7cfuO5HkqT1K1eJbU0qq5qag0aXuSntnvHk4QPlqu+hHoVvlgu+Y0VNXo5HD7nlnqSoLXmhxzurY5sbm7dtx76367j3qKirdg1e0rY/lce8bONXLq8rP16GeW66bLztDNHzvKD14qu0XjTLX3nl+303IScU/vfkkwur6Sdo0tCmh2e8TGm3V0tV3znGxumzlXdw41eZ5BMveswcnCtqwpdd2jSBznh6N75T72s8bGkh7J3Ls3zT3LvUtd7V5mP29dO1FbcfQhhCyNAAAQAElEQVRILifRnLrMbUdJfe6Bn5IdxfzU86u9RZuTRC61a8adN6vHLyp4vEpzo7qS4bWebbu1J338RMoJ7cLZnhUn7pNUnvW6dToqv2xQa/+Zp+qx1ct1kxPx65LQrtUPtF38W9rh+ez2NRo85oLu7dqa/I+OK0plPbYqyXnvV1qL+1lqKmlnf/fz00/Xdv+zt9s2pZaGzp+LNs3zGOXGivas36k+H2/hubY6QV78o9fd35fTojP0YLVRxVv1u7drcZ6nWLVWdH9+ySFtRhO16/nZ2JG3vruPtaqkSp4Xnyt+oaH7uf2xn/s8e6aO8vob/LO3/bDT1c/HZIx4Zg2zZzf123nxwU269J3H6QOvXaxzVvR4RHq0/8TbjtO7z1usN75wcY/62kG38RtqdWwRQGDUAgyAAAIIIIAAAggggAACCCCAAAL1L8AKEUAAgXEVKHeO/ozOrcpqKCLHFTlhmp0RxEzN8ziNaleL/5ckrbzdoaoqatYcNTr9LX/V8n0t2qFW7Sn6zNBcn5Fn0li0rbrXbnUkblvV8RZ7g5o0WwtUco+K2tx3t65SvpKLSm4nifJyKrpFEuL9J0S6NRrD3YrHytrzEel3e3+dY6djsJK5p88jbpRc0C3e9sklu26sSj6ePtds8IB937R0pUvcHB92u5bdPu5WnAVUaUa3Cj1j5c/V1NDkW+xaJ0CzGO/1LLuatMtJrwB1ndi1WzM8XLlSUtusVrV0nejcSfLOo/aaQOfJbBq1u2iT/W6RsTJmxnbifka3U127mfPrbtFcbw+/YK1OcNsT2qu+WleLnjvlSt/5pcVA9TnnOczxo5qPOVBDs0o7WwYeP+17R+bueZXb2tWeNfU+n+PW5v7nlXP9Re5B7kV/52r3riQ12aX4wTlmi7Y7edqS5HLzXM2v9UuiOXVOJu/qL0ndvkf9Pgd22O0kcqVij+Yd6nFvGhtUcYI9D2jtMsW2v19u8HU3J+ntKLe06JCNu7X0ght02muu1/Ge+wJV/U9F0Xvf3/IMeT0d/+A0aV7tzfhXX6N5DXs0y/eg3Un84ocy53xfmzNqW0lzz79Op/cXpSYVP1zN7Zopf3n8Gd7I/jNPmKNT+uvT0KYD0qa7f44zv9pHuXsuZV+/VKpoy1i8eW2rrp/dSpv25Hr9xE5ft72f+gmtiv36nTq22q6Z/tnYvXi27o7NGE6ifefO1gGHO++5h+udr1yspuIno/9mSa7/nRPoiw/vv1G38Xv8W9j/aNQigMD0EGCVCCCAAAIIIIAAAggggAACCCBQ/wKsEAEEJrtAuXOCT+vcquSEdENnXq/d2b6qRvb/6zdplkeZ4d7tatEO568q2uNtxp+hOc6Uzfa1SkpCvL34/ljRplmz1KSZqn3N1Dy3K7vFLrV7Pnu03WO2uc0Mx2w1+nvFZ/Zoh/5He9xtt6PsWODYH6Xqi97nuNmx1nGrI4nwR73tkxN2Xa0kyf4LH9zgSJ97vE1d1uPd/VqcPJdNr/MkPrTPvFnxLDmhWXLrAYsTwFUnEYPV1Wb2nK7dgXcG4xjsXD8jvvAWNSfB+pqfaZmTkKe27NYTvV3UXtF8JzYb+uky6iqP31YkoCtqcOL48CQBRz1otwFmN2tYCrkHuRfdhhh0d9XTlY9CL5LLTrAWyeX/c7UanQifn7EaZqrP2+fyV/M8jfy3cdx/XyVvbB++Vb+qlvRwqd3/ILhDfgHCD+ECmx9//o067dzrdJirh1RmHaT8wLY6UTwjb9enU35hIL8k4PF35y311N13vRpqz4rryznfX+Rc2neLpux7bqX+2qfO1/YPXVr1jeNO1a5K/kn1KT9P1XKDhnXf3W3AUvvZHe97NuAEhnhi43U6uvanEJzEvncs3r7vdekie77+/mLT69TYHN65d+zxu8jYTJVREEAAgaEJ0AoBBBBAAAEEEEAAAQQQQAABBOpfgBUiMA0Eagmas7qvdYY63gBvd+q7Rf2+ONq9udPWO7RJ6/SAbtduFbm14vxMj1NVtahr81jtToM3qEnNmu2YUyTGU9fmEfYoH70uzXCfonPnt4xRdpo8/Vu1Sy3a6RGrSrsG1zdplvKVcz8txmjzYXJTs73dHyWJ7/t94eRDMo953s/HuR/n7WmO/uaVhPsGn9vjSLI6/od4/xjHqY7iRVRv91eJaaXj4h/ymvJ7AR1H/X0vnqVyk2+Tz+7ek8y7d4ZQdnY8AkXLzbP8eBR7w/g2c99ta9fIRz8vbNUJJWlBQ0mlvMHqROSW5pnatKdRt+9q0i9dn4Xve9AhtnDCuW1Pi+5uadAGJ0fzmwizN67RoiF2H1Kztl1qHlLDzkaeU8lrLXUe9rup3cvaybx97YRwuxPHxce4P2Ge5rS1+0eyVa1Ns7W11q77djjPQfd+w9lPcv/y5br30jN147xDdKv/uXnQ89zt+1r1XBtsvmjlz3XwUMbMx/OX2rQ7/cqNWrCqqrKt8sOc7ltXlVTJzq8eUzVvyme/raxHLjtD1w8WTvTnL03Iz1vuv5wE3z5Y+5y7/Mn6hfvlH5Rcpggn7g9tLGlODpKEdzzu5Td1HKdupNF9PS2PqXGk44x3v1ffoEXlBh3g++Pboo39fXT+GMyh+I/fDbdv7TNU89OuUems4cU//0f+u9BzqHW370xF/uEvnqccEAgggAAC+0+AKyOAAAIIIIAAAggggAACCCCAQP0LsEIEhiJQrqp6uBsmU+tNR5nhJHZZDWpXm3aq+KTijhMDfE+bNrX4f7tU7cgrFS1nar6zpw1F/U5tUcXjNTnP1qAmZ2ZmOJqL9rucc2vTHl+xUTM1X92/GtTsHrNV8Wx26zG32qGSR21WRyJ6hnNGJdds0i6t1zbJLeU6+Ro+mOCSREtewC35umFN8vsJ3j/SsdDRXz5qt+sfdlQd+XTvJNmf6P2jHAc5mhzjWWZ48LIj+bwimeP93iW5u+SSva4dzdJnep/vcXzMJWdUD/aDVbxu31jRrB5nOw92t2uWE465cGeN1FxW8bHuTlg2ztusTKzrXG3HSbN+63O+3Np/Hyd8Z2bMJNtmzdSetL1vlw7LRz87+9bWOEu/uvR03eIk5Z1OxD1Q+whyn/OC03pswonWPV84S9uuWKYtDVIeFFWadVA+Ol5D+NqzVfno9IrHaXDS2zeibycnZgf06dvaPy3NKpV2+8eun5NOxs9JdXur2mzTmv1E3r52Mnp3tUENdl3gugWlssptzdpx0Qkdvq7rUQZ6DtpbNDPPQe7N/KNUJCx7dBzhQRLgl52ljU6m3+JE8K0ef09DSaVKu2pJ8H2OnLfpvb6q/ymZ98gazfUYM92pdc6hKu6d/PX/Pd3/qJXU6l2VyxqyvZ+94jksae/H42eMoUQS5UmYO0qNZT3SXlLcmmZWdUQS/UMZY6A23dfTMEP9/uy6b1Nbu8rejklpmqPG3JuhDvaKNTqo1K78VpL8DD44Fh9dP8C1t6f+O2vy73r29sbyJQdrx44dqlarQ4o3vvGNWrK4479ZtVHuXL9Td96/M4fFdbJDIIAAAgggMAoBuiKAAAIIIIAAAggggAACCCCAQP0LsMIJEkgSZGnva810jmmWkheTtusR7dK23k26jve4RdqkYqbmOuPS0S/HTT5qdAK83fmlXdqqqv83w21yrkGN/t8M11S1U1tUUZsa1Oz/zVLvr5map5L/t0tb3arF7ZrcriMZ0eRrlFTWL9QiKW+/l7yd59gfJXmsii/c4EjC3JseJY67e9RISaC0uy63Yq+dKzpL2o9nfiXeM3ytJPAf8Tbz96ZHSX2ra7Iu51Sv8O6djoHL0vZGbUvy0Um+OW/Z4JvUq+3MBi10EiyLVu1r0WPakcS7E5UNpdnKbxPUThXbl12r+U6YzSwO+vmWc2nT+1TjTOVN1QZJrU7Y1jCLB6ixQXucNK/VuUlHmbHLfRqUPh0VY/z9sGbd53Xu8Xobd+8cWuLzqAXa3t6mtnw0eebXe0qvu1pzW6sq1tX73EDHuQe5F73Pv+UnmpV7l/rGkvLgZreIzrevi6yi7/HctLN9pbRdXYll9f2afe7VfRP1Dc06IHNwgn3PgiNVJJX7dt13zbnX6oR8FP9rbtDRvVtf8XTtdoK2rXf9vo4Pa9SWllYVH+O+o0EHe40NpTbtTnK+e9/as95Q0az+nr+VP1eT53aKY1ltfi0N2ub7X7Fdc2tZff6xWFVV+dU/0xNfc6OWXbBWJ6iq/MOm1CdRLqmp1KDdlXZtKu/WAxnLc5ubN9N9blSltp48S/39ckelSQeWyioP9SItc7Sn3KJqflHCP399fn4rrZpXaetY377GzHwapSNz/Wqjti9epgf21WcU5/MPestXv/+wtu5s7THM05fO1ic/+UldffXVQ4rvf/87eurSnv++f/Kr99fG3PdvqdVaskUAAQQQQKBuBVgYAggggAACCCCAAAIIIIAAAgjUv8DUWWGSICf2N90DdISaNLNIbP9Gd2qzNqrqo1rbqo+26UE9pDtc2+ZsSqMW6PDa6WLboEY1a46qbpFEe8mtmjVbta9mn8t+q3a7TVUzNc9ZlEwptXsj9WWP1aKdHqnN85rhzGaT8tXkXg2u+bXafdjiSP08b/dHafZFM//MJUlnH3aV5Eju9VHOedNVZngvfSrepk223i1KfiHgLu9lXd6MS8m186Z7yaMnj3yPt22OWkmS5zedB0kAzZHS7HOdVf1vTizv0aPVqpIQbXrsIR3TlTx1IvBV1ymv12ewHr1XPV1tTow96qRy1Y/KgU48dj1QeevWid7FThQ29OjU7SDn0iZta9UZwwnBgzKmk6iP1N6kduIxc5OvN+PctepKYCZBed61OrI6U4/TOH6tOlktlQY96GR4tbGkOUNJfKZPY5vykOTN28d5nsVbuJlm1tx6gI72OhtzPMxYUNwT35v0O9eJ7sdmKJ9K0ZQkraSHHT1K51vYra3SbF9zlhOkLUftUY9Ee/cOSRQ3z9MxL7xF+SGRfK3imtICJ6YrTqw+tKrkH+/unYaxP3OmdvpeltWuPDc9Pqbdz8DBdp7leVZ93fzGypBGjne5WTvyXDWWtLDcqGreSu/dufasp92cRh19brfnyddusuExntuM9G8vqfjFg2NO17Zyk3b4mSz5nh5x4U3K32wohs4zeM+1WtxY0pyGNpXa99i15Jn7bJ6TJMp9rUplp+7P83z52Xq01KwtNi45HpdnwU17FK+9caBPLejR0AdHPqxHWtuVj75v3LNTx3SN13nPyq0a9G9K9P6UiFmtftZLassvSjQ065CY+DLyikq1Z6A43se3/NkFP3BH27HRY+0+okn3jOaZ2cflaqcfTPL8b/95fe242L72hYfrb//2r/SMZzxjSPGc5TvV1FR0Lb7l7fPOj3TPv0MD/twUjfmGAAIIIIAAApNfgBkigAACCCCAAAIIIIAAAggggEBdCZS9muMdPUoOGtTsDOJx/j7beY6Kt6ttLgAAEABJREFUMzgPar3WaoNu7Iy1SlK94oxVo2boEB3v73PV+yvJ75JyGalBTWrulkCf4QR62bXyV8lt0lb9fDVplnKN2qkZ2nudBo/Z5CT6PbWT3pdn0nU4oTvJw+YXBKq+6kOOtY4bHdkmEZ7kec67Si355pjjmO9IyQu8aZ9In1+5Mm+gp03J++nvlKX3xrYkV1xLoic/e7OHr83hPu9XHPMcix2d5V+87f07Aq7qLMcnseeE0b2VNrW5bnbjfJ18/lqd/pqbdHpDgw5xQrPqpF6gfHpvcb/7ndze7ARZ2cnARa+5UcvSb0ablpTKmuEIwt4O3facnMwbo01pmz554zdjFGM1afMlZ+iBWvPmufpN5uZ5NDZWdFzan3+dTneC8nQ/UoeqpEC3pq8T8M21fmO5/exy/aa5QY95jkXiM29972v8I1foPidkH7ND2fM8MmvM3LNmJ1ZnSMW8ZcMk5nw4ePE47U7G7sk9yb2JgRPdJ7nX7Pjs3K0NviexcNXekrewG8ralQRwMf9GbV/19OJe723Ucy9jzD5gl07JNXKtXDNNKi16OEng7I80PNf8wBVJdM/n6OK58f2MT469zrKfj232q/02yJAulbfqk+D3GKWWVrXmrfTeHeOTZ931rW7X3P15ct3S9orm51n3s/bQFcuUH3KtKqmSBLCfr+Kj8NvadFTmGps8g43NOshjlZyMfvSys/Sg/JW3r9vadUjqkzDvbtb2qO73NfKPSlNTi45MEt5d1DJHezyfitfQ0FzVE5y8Xppxcm6gWOX7OGuGkjEu3r7Ps5VnrHbPfP02X6vPz67nmn+s5PNz0v78G/WEzCM+fk4eSZ+c83WXZp0rr9eyPAOu2+X7M+DPtdsX5Z4WLaq2a2Zx0KSmTTt0UsbpL7zO4h8rb4u3/8+7Xmect0bHFn2H9y3PS0veFl+zrvjdh6L34sOb9IV3L+lKivtQ71w8W19ZskCfOG6BzlmwN1t+zooF+rvzjiv61b697L13qjU/EdIm1/WxdB0FAQQQQAABBBCYMAEuhAACCCCAAAIIIIAAAggggAACPQXKPiwSDd72KU3OVRymJTpIR2uG5qikspIwT8hfOb9QR2iRTi7Ou6pPSb8Gp79zosmtGrQ3sdCkmR6xMafcotln5xT7/X3LOKkvuUezakloFV85ThZCnqE0X/vvq+xLJ1GSF2AbvJ/Ec/JCqc8nkp/kuiSrS97ucexypBzjb3nZusnb5FLSJ20W+HiJ4whHxkh+bIf3x6Pkk68f74FzD3LtzCFzSb4qj8gTfC5z8CYl4P+anX4jHZSPRn9srm7zKFudpK04GvJGrROv25xQu2ugpNllK3S3k53rq43a4wRjOf18ldbGRm2olrU3i+XK7qWhVbuc7L7b7fc4Gjx+OWNkrMtO090qyVPp6JG5tc7UHZWKtiexV2vf3qQWJyk3XX6qbnF9gd1UVe03HDo6j+H3nWXlNxSSSmvaOUtH7mvoVSVVLj1Nv3bSMR8NkARn4eP572lp0F21Oe9rnNp5t6+2t2h9Y1mPyLNIotWJ3qqhtubefeEsbau17b11MnNz+vvalYaKisSwBvpq1GPlJm30vNtyjeI5KGlX5vzZM7VhoG5DrU+S9sht+rX/IUmyuTXjF9cpqVR7Bi4/Q3fEb6hjpl3eqs/b9dnP2+h5Kz37vSPPky1uq5b0sJ/tNps05Pp+Hqt5xnY16ZefWV7c666uGeuIJ+u2xgblFzs67mWD8g+H/MzuaivrzouX6R75K4nofNR/3r4uV/2MOmHu6q5yxdO1u7WsB9qrqubN9fVrdVhOfv407djTpgf9c9TuKLuuqW2X8kPt3YFL1rN1pm7Pc+C1FD+78vOR56Rc1X1ZV+/ei87Qgz63xVF1n3zc/YxH7uj4B9/35/72WbrH9fmHT7HJs+C4f0+j1qdP7/F6Hze2+Ce4s9LjNGSMgaLS3uHY2Xw0GxOouAfP+6vb9fBWI6jj64XnHKxrL12uJU6cP+fg2Xq6k+ZP7YzzDp8t7+oDr12sKz+xVLO7/Sfr7Z+8U53J+Mc80mYHBQEEEEAAAQQQQGDkAvREAAEEEEAAAQQQQAABBBBAYMwFklBZNNiozj9prg5WEumLtUxH64wiFmu5FulkLfCZtBlojEanxY/QUqXfITqhR7MGNekInVKcy1hlNWqgrwN0ZNFusecwSwt6NFugw7XF85LnJB2qvl/HuuoMxxJH75LMxmmuXOZIktubHiV90jdj9DgxwEHWcLTPne5Iv0TGT/9m1yW5vtzbUx2zHCklf8ttSF3aJ9I/Hw6Q+c3z+RxnjnnL3YeDliTiT3GLtO9vTT7Vb8nYWW/6ZQ6Z58lumaS/Nz2Kx/2C2zV5beXMscfJLKao+OrJakni8vIna+1lZ+h6J9JuWL1Mv/Z26+rluinh/Z1F427f8nb25afpF+nTGTdffJoeSiK8OHaSvdY8Cfda3RXLtMXX6uqXMTJWrW33bZKLn3myfunr35D+2ab9FWfqAZVU9fGdqb90hfJRAEVX192eulyzqOj1LfW9zzsZ+UDq0rdXc2UOPnez4/q49D7f77HnlmSs+xT9vL0+a87a3T43X23NSuLPh1JtTt2v7/2dsU985ql6LIlaj1Hco2xzz3LvigH28c0J411OniYZOHDL3VJx/85QMWdf/wZf+9bOOffolzerLz9da33+Jrfr82ykLucS2a91XvV0tfn52GiPm13f454O9AzU+g60zZiXnqlbPOb1nzlVdw3ULvW+Zuvly3Vv5pX2iawjz1juc9r0jlUlVS4+XZvctnDxtvgZ8Xx72KRdxuk8v+4KJ8x7j+U+v/nsk3SD53FDno/a+TzPXsONnX1z/uHaucG2uf95DvI8pG+2eU7aW5TfDOrTNXP0te901OzXXXSCioR5Gl9+sh71GL+onfeYN2eesYlZwueK++1ta9rGL89D+teeY/e7fp/R+e9DxjnqSbrV/YtxvR1Jecyd7rn/4dbq085fp/UP702iL18yWzd/YblWvPJwfcT/DL6stVVvV6u+7/prXf/OVxa/S+TuHeVvL1uvj3wxv/ui/HLOnR21fEcAAQQQQAABBBCYvgKsHAEEEEAAAQQQQAABBBBAYDIKJIGejO5knNuw5jSkjNCwRqTxPgV+4RZfcnQvHft18Ux1LGXyfH/LBs0673qdmjh3rfLbDur+de7VmunjpnKjqjPLGk3C0MPsu1TbdWClpJJbbk3y1FsKApNO4L7rdWCprBntTdo+isnlD1bcefv6ndVTX3aDLvuP+7uGamqSznvu4cWb5ld9eqkSl77zuOLN9Fqj2+/cqWe8bp3e6wS667Y6funIx3x4Q0EAAQQQQAABBBBAYIoKMG0EEEAAAQQQQAABBBBAoE4FkkDvk4ibimsd/POjp+KKxmPObR60lrOZ4f0xKN/ud4wp+0z1u5pJUrn2DrU2lJSb2FRu06Erfy6n7joml/3yXB3thHZzS6taD2vUuPxIvPArapC/zrtWh1bKmlOuqqXlMW12FQWBSSewqqpyW5MOqlS1+bPLNNrfs0ri+9dbt7a2nv8Pd+rEF92gf/nO/do5yK+q5KPa0/bUc2/Q1Tekux40Ut487/qECB9TEEAAAQQQQAABBBBAYD8IcEkEEEAAAQQQQAABBBBAYCCBJNBnD3RyKtUPksOYSssYp7nu8rh5XXydt7sdyYHmY+G9O9qSBPq9fQapi2eqz6r2c8X/93S17WrVg9WKKuWy5no6S8+/Tqefv1anO3F+armsuaWy2htmadOqk9Xi82NakqSff6xOPO96neHU/ZFO5pfaynqkv48TH9MLMxgCIxTIJyN85jT9Mh+tr5LGImmdj3O/xdN54Pb1OyvnvvdOLXzWNUUyPW+Y1+Ks89dp4TPWKNvL/uN+tbYq/fLW+Ub3HYt5eBgKAggggAACCCCAAAIITGMBlo4AAggggAACCCCAAALjKJAEetdbrON4nXEfeu9fpR33S03BC+TPEOfF5Yrnntt9hLdjlEBPPj5JdI/YreQi3Q7ZHSuBz63QIy3N+lWpTY9VG1RxNDih3pDEubNyW7c069b8remxul73cfL3pMtNKhLzuV5rRb/J37Du3mZ0+/RGYEoI5GM8NnmmNznudHL8QSfTt159w9bdjoqjdc26rdu37mzNx75vcJv85tKvvB3NR8i7OwUBBBBAAAEEEEAAAQQQqBcB1oEAAggggAACCCCAwOQWSAJ9cs9wQmaXv2f7fV/pE44/d/yJ48mOYx0HOGY4QpXIfupyLm3SNn3SN2NkLDefVCWfqH66Z3SG41TH4xxjWPom0MdwcIbqLfD507Tj0hX61aXLdONlZ+j6RPYvP0N3fHUc3jzvfv1LT9evatf77JlKcrD76T77TrrfnvaXrdDdfU7WW8U0Wc/lZ+vRy0/X2tXLdZPv73T+8I/8RtIW3/a8VX6Ht7c41jpuduRt83u8fchR/NKJtxQEEEAAAQQQQAABBBBAAIF6EGANCCCAAAIIIIAAAnUvkIxwXby8PbxXnm/3jf204yWOJMIXefssx5sdn3J8y/FzR/IfyY8k/1H1cSL7qcu5tEnb9EnfjJGxMmbGzjVyLXet55LfG0jKaO8a6+KZ2rsc9hCofwFWiAACCCCAAAIIIIAAAggggAAC9S/AChFAAAEEEEAAAQT2LZAEel28QTh7n2td4xbvdJzsONHxeseXHUmEezOmJWNm7Fwj18o1c+3MYUwvNHkGy+8R7J1NXTxTe5fDHgIITHIBpocAAggggAACCCCAAAIIIIAAAvUvwAoRQAABBBBAAIEJEUgCPa9TT8jFxvMi+ZDyvuM/7KoPO/Lx5Wd5+0HHrY6JLrlmrp05ZC6ZU+Y20fMYx+t9t8fYdfFM9VgRBwgggMC4CTAwAggggAACCCCAAAIIIIAAAgjUvwArRAABBBBAAIGpIpAEel1kcg/uIb7ORxc6DnG8w3GTY7KUzCVzytwyx8x1ssxtFPP4qfve5+godfFMdSyF7wgggAACgwpwEgEEEEAAAQQQQAABBBBAAAEE6l+AFSKAAAIIIDCNBJJA35v2nMILX1TMPcnoV3jvVMdqR9UxWUvmljlmrplz5j5Z5zrEeV3X1a4unqmu1bCDAAIIIFC3AiwMAQQQQAABBBBAAAEEEEAAAQTqX4AVIoAAAgggMByBJNDXD6fD5Gz7sBbrzz21JKM/7+1UK5mz5/6ErGEKv7y9psu9Dp6prrWwgwACCCCAwGQVYF4IIIAAAggggAACCCCAAAIIIFD/AqwQAQQQQGCCBZJAv2OCrznGl/u0xztBx+tT3k7x8jqv4dsnSL+bNU3BtVzVNecp/kx1rYMdBBBAAAEEEBg3AQZGAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAwNQTSAL9tqk37cz4dn97tuP1ji060d+nfMki/nCL9EOv6VKvbW7WOIVWlY9wf7SY72Nwl7QAABAASURBVBR9poq58w0BBBBAAAEEENi3AC0QQAABBBBAAAEEEEAAAQQQQKD+BVghAghMS4Ek0NdNvZVf6imf5vieo6Ms7dhM7e/dF3Ge1/Ytr/H4rHUKLeuaYq5T8Jkq5s03BBBAAAEEEEBgWgiwSAQQQAABBBBAAAEEEEAAAQQQqH8BVogAAiMTKJdUut9dtzqmSLnQ81zpaHHsLYd79xjHlC2ZfBbRfQFP9xqv9lp/K2vufmLy7h/4A21VqXimJu8kmRkCCCCAAAIIIIDAVBZg7ggggAACCCCAAAIIIIAAAgggUP8CrBCB/SaQN9Bz8R35Nrljvaf3O47Vjv7LWf1XT43agSZ/pKd/jdf8p1l7DHw8icsZP9MUeJYmMSBTQwABBBBAAAEEEKhzAZaHAAIIIIAAAggggAACCCCAAAL1L8AKp7JALYE+Y3IvYo2n99uO/3EMXJ428KnJf2Zfk/+a1/6WGMRi8i7nWbdpkj9Lk9eOmSGAAAIIIIAAAgggMOkFmCACCCCAAAIIIIAAAggggAACCNS/wDRfYbmq6hwbHOSYpOX7ntfvOu51DF6eMfjpyX12KJP/qA2+EouYTM7lPGebDup8pibnBJkVAggggAACCCCAAAIITFsBFo4AAggggAACCCCAAAIIIIAAAvUvMNoV5g30k0Y7yPj1/46H/n3H0D4VfIlbTuLFeHYDlMe5PpP3Zp/lhbbYEJPY7LP1hDaIfecysjuh1+ZiCCCAAAIIIIAAAggggECdC7A8BBBAAAEEEEAAAQQQQAABBBCYAIEk0E+egOsMcInBqvOW9R+5QdUx9JIeQ289SVru8jw2O4ZajrTJI1lpjIbaafzbZUadV5mkz1Tn7NgggAACCCCAAAIIIIAAAghMsACXQwABBBBAAAEEEEAAAQQQQGBqCCSBPgnfFs7f+X6+BZ0o9vfhlOcNp/Fo245V/+0eaLi58ANtc22MYuX+k6B0s5+Ez9QkAGIKCCCAAAIIIIAAAggggAACU1OAWSOAAAIIIIAAAggggAACCEwbgSTQJ9nbwuuN/2eOHY7hlxXucppjypUrRzDjFTb611jFbPj9x7JHzGPfOeYke6Y6Z8UGAQQQQAABBBBAAAEEEEAAgWkowJIRQAABBBBAAAEEEEAAAQSGLpAE+gFDbz4RLV/ui9zrGHn5vyPvuv96ftGXbnEMt7zMVqtiNtyOY9u+l/nCsR2939GoRAABBBBAAAEEEEAAAQQQQACB+hdghQgggAACCCCAAAIIIIDAhAokgT5rQq846MUu9Nn/cYyunOvuJceUKns82287RlLeY7OXxW4knUffJ9Yx7zbSJHqmus1qUu0yGQQQQAABBBBAAAEEEEAAAQQQqH8BVogAAggggAACCCCAAAJTTSAJ9JmTY9KXehqrHaMvB3uIlY4pV346ihl/0nYrYjiKMUbYNdYx79Z9drd9dutRgDUhgAACCCCAAAIIIIAAAggggED9C7BCBBBAAAEEEEAAAQSmoUAS6JPgbeHbTf8Gx9iV14/dUBM30n2juNSB7vsJGx4YS+9PYOnHmgT6BPpzqeEL0AMBBBBAAAEEEEAAAQQQQAABBOpfgBUigAACCCCAAAIIIDASgUmSQH+r597iGLuy1EO93DGlykOjnO0KG34glqMcZxjdYxzrXl1IoPcC4RCBMRRgKAQQQAABBBBAAAEEEEAAAQQQqH8BVogAAggggAACCCCwnwQmQQL901769xxjX94x9kOO74ijeQO9NrOVtjwjprWK8d0OYDwJPtVgfNfN6AggMFIB+iGAAAIIIIAAAggggAACCCCAQP0LsEIEEEAAAQQQQGDqCuznBPrDlvsbx/iUvBn9hvEZenxG3TRGw/5tTGM7RuMNMExsY9zPad5A7weFKgQQqAMBloAAAggggAACCCCAAAIIIIAAAvUvwAoRQAABBBBAYFoLJIG+HwH+n6+9xTF+5T0eeqFjSpSqZ5lXukvejib+xKbftG3GG7/Y8qmqHldSqdQ7PPtVDgoCCCCAwCQTYDoIIIAAAggggAACCCCAAAIIIFD/AqwQAQQQQAABBEYnkAT6rtENMdLe69zxU47xLQd7+Pc7pkQ53LP8kGMs0s/vjG2MPd74lL9x7rzPa+5VVVf5cu92UBBAAAEEEBhLAcZCAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAAII7HeB/ZhAT6Z4Ytb/Ol/mDxyTvizqnGFem//bzv2Rbm5zx38cN+PvOXn+aV+hR6l2JM8z+509TnCAAAIIIIDAtBcAAAEEEEAAAQQQQAABBBBAAAEE6l+AFSKAAAII1IPAfkqg583oz0+o30d9tWbHpC55A702wf/nnXc5RlM+auOHYz2aQfr0bXHNWx09Srfkeep35BuBAAIIIIAAAnUiwDIQQAABBBBAAAEEEEAAAQQQQKD+BVghAggggEAhsJ8S6P9UXHwivy3xxfKh5t5M3lJ7A702w/d6568dIy0PuuMHxtz6DSqVbvfIXaVX8jz1JNCjQCCAAAIIIIDApBBgEggggAACCCCAAAIIIIAAAgggUP8CrBABBBAYK4Ek0HeP1WBDG+dhN7vEMfHlfF/yAsekLU/pZ2bvd907HSMtF9n6hpiPdIAe/VY7eX5p95p+kuc5zUe4R4FAAAEEEEAAAQRGL8AICCCAAAIIIIAAAggggAACCCBQ/wKsEAEEJpFAEui7JnY+V/hyVcf+KRf7sr/tmHRlhmf0R47+ygdc+ReOkZRWW/8g5iPp3KPP/zh5fmH3mgGS52nCG+hRIBBAAAEEEEAAgWkvAAACCCCAAAIIIIAAAggggAACCNS/ACtEoL4EkkDfPLFL+teJvVw/V/u86452TKryUs+m2TFQ+aBPvN0xkvKjUZvf68u+3NFVBkmep82j+UYggAACCCCAAAIIIDClBZg8AggggAACCCCAAAIIIIAAAgjUvwArRKCXQBLot/SqG8fDNR77Jsf+LYt9+X9zzHFMmvKsIczkQ27zNsdwy5U2/03sh9uxaJ+3yf9MpdL64sjf9pE8dwtN4DOVyxEIIIAAAggggAACCCDQW4BjBBBAAAEEEEAAAQQQQAABBBCofwFWOPYCSaDfOvbDDjTivw90YsLrV/iK33CUHPu9HO4ZnOMYSvmwG73FMZxSceP/b0T2Vfd8vpPnXdn3ISTP3UUT+EzlcgQCCCCAAAIIIIAAAgjUmQDLQQABBBBAAAEEEEAAAQQQQACB+heYlCtMAn0C3xb+9qRCSM46M9rvSfQLzHKAY6jlo274JsdwytVZ6XA6KMnzP3Ly/Pu1XkNMnqf5BD5TuRyBAAIIIIAAAggggAACCEwmAeaCAAIIIIAAAggggAACCCCAAAJTVSAJ9KG9LTzqFd7uESboUr7SUMtz3PC/HPvt49zz9vn5nsBwy8fd4c8dQy3/GfvcgyF1yMe2/76T59+ptR5G8jxdcrFsCQQQQAABBBBAAAEEEEAAgakmwHwRQAABBBBAAAEEEEAAAQQQmMYC5ZJKSZbeM/4GV43/JQa5wmCn8ib6f7vB0Y4JL3n7fNEIr/pJ93u9YyhlgxvdMKR7cK9b/q6T5yN589xddU/nMyW+EEAAAQQQQAABBBBAAAEEEJhoAa6HAAIIIIAAAggggAACCCCAwGgE8gZ6+k/AG8M/znUmbeRvov+PZ/fbjgkrQ3/7fOApfcqnXusYSvmvfd6DDoJSaU1tuGG+eZ5uE/As5TIEAggggAACCCCAAAIIIIAAAnUnwIIQQAABBBBAAAEEEEAAAQT2s0AtgT4Bf7P62v281H1ffrGb/MiRl8K9Gf/yLl9ipG+fu2tX+bT3hjLp/xz0HqxWqfQ7jvUerSgjSJ6nXz/PUqoJBBBAAAEEEEAAAQQQQAABBBCobwFWhwACCCCAAAIIIIAAAghMfYFaAv2a8V3K/R5+Aj4l3lcZi3KxB7nE0ewYt3KeR36dY6xKJv2GfQz2U9+DltyLHu1afLTSifMLve0qI0yep/84P0u5xAQHl0MAAQQQQAABBBBAAAEEEEAAgfoXYIUIIIAAAggggAACCCCAgAUmKIG+zpeaWuV8T/cmxx84xrws94iXOsa6XOQB3+wYrDzQ4158z01Pc/K8x2xGkTz3cCKBHoVJFEwFAQQQQAABBBBAAAEEEEAAAQTqX4AVIoAAAggggAACCCCAwNgIFAn0kkqPerjrHONUbhunccd32CUe/ruOf3IsdIxZuX7MRuo70Mdc9Q7HQOWB4l5s8enXO3H+bMft3u8qo0yeX9f5LHWNxw4CoxSgOwIIIIAAAggggAACCCCAAAII1L8AK0QAAQQQQAABBBBAYNIIFAn0ztlc1bkd+80h67aO/aATN2I+af0OX25fn5DuJoOXP/bpqmO8yz/6An/t6Kf82V35HHed4MT5p3ufHmXyPMON3zOU0QkEppwAE0YAAQQQQAABBBBAAAEEEEAAgfoXYIUIIIAAAggggAAC9STQPYG+ZtwW9rs3PqKbPfrLHVO0HOR55xPSR7yMf/AA33RMVHm/L/QeR2cJfeb+5TvWbnXy/OHO6q7NGCTPM9b4PUMZnUAAgYkV4GoIIIAAAggggAACCCCAAAIIIFD/AqwQAQQQQAABBBBAoIfAxCTQj32gWUt93c85ksW9wNuSYwqWYS/jcC/yCsdfOia4lFZJF7xXxe8uhD5z15Zdj+s9jaqqq1zXLd3uo5EVEugjc6MXAgiMgwBDIoAAAggggAACCCCAAAIIIIBA/QuwQgQQQAABBBBAYKwFuhLoJZXu9+A/dYx9efzWGV2DJot7sY8ecnzIcZpjCpZ9LiOJ86Slf+7FvdIxgSWkoQ3xxe+Slubt99r1N++aV9vNtjp2yfOfdj5DGZZAAAEEEBidAL0RQAABBBBAAAEEEEAAAQQQQKD+BVghAggggAACCExCga4Eeufcvtu5HdvN0btn9RnwYNe83XGj41pH3tA+yduJLnkfe+7IL9pnGU6cn7TK4yVxnne6F3l/AspJvkYIQxnS0GZurpZy4iPFnvTIrpmde6qOXfI8Q47Ps5ORCQQQQACBKSbAdBFAAAEEEEAAAQQQQAABBBBAoP4FWCECCCCAAAL1KdA7gf6tcVnmke1730Dv7wIrXJm3pG/x9jbHPzle7DjGMdYlY2bsXCPXymva9/gin3X8qaPZMdySPu67wmP8wzrpFifOb3PiPJfIpXLJ4Q65r/YZM2PnGllG6EIYyn77vtW1n3A81NLo72OdPM+Q4/PsZGQCAQQQQACBiRTgWggggAACCCCAAAIIIIAAAgggUP8CrBABBBBAAIEBBHok0Esq3ex233eMbTmiWiRthzToErd6neNLjrsd9zmudHzc8QbHHzue5EgGeaG3SV6XvE1kP3U5lzZpmz7pmzEyVsbM2LlGruWuOsjfznV8zbHN8WXH2xwvcfwfxxMc+eDzRPZTl3Npk7bpk74ZI2Nl4PKZAAAQAElEQVS5eYbOJXKpXDKXzhQylUwpU8sUM9VMOVPPEhLZT13OpU3apk/6ZoyMlTEzdq6Ra/mS+y5vdJNXtI5H8vz7pY5nxxegIIAAAggggMD+FODaCCCAAAIIIIAAAggggAACCCBQ/wKsEAEEEEBg/AR6JNA7L/Ptzu3k2BzuaZzjeJPjIsc3HT9zJIO82ds9jkpnZD91OZc2aZs+6ZsxMpabDlryrvyfucWHHV90XO34pSNJ8kT2U5dzaZO26eMmg5VcOlPIVDKlTC1TzFQz5Ux9LJcx4FxeVJx5T/F97L5Nrmdm7NbFSAgggAACCCAwsQJcDQEEEEAAAQQQQAABBBBAAAEE6l+AFSKAAAKTWmCgBPruMZ31plLbmI7HYCMXuH/M70WeFRLoI78j9EQAAQQQQACBuhFgIQgggAACCCCAAAIIIIAAAgggUP8CrBABBOpdoE8CvaTSvV702CZENzbkBWsPS9nvApvG/F58u/OZ2e9LYwIIIIAAAggggAACoxCgKwIIIIAAAggggAACCCCAAAII1L8AK0QAgX0K9Emgd/YY2wT6vTN3dY7LZn8LbBjzezG2z8r+9uH6CCCAAAIIIIAAAlNSgEkjgAACCCCAAAIIIIAAAggggED9C7BCBCZCYKAE+pd88V84xqbctYA30MdGcvSj3Dum9yLPSJ6V0c+LERBAAAEEEEAAAQQQmL4CrBwBBBBAAAEEEEAAAQQQQAABBOpfgBVOEYF+E+glldo8/39xjE25+7CWsRmIUUYtcPehY/nLDP/S+ayMeloMgAACCCCAAAIIIIAAAlNVgHkjgAACCCCAAAIIIIAAAggggED9C0yfFfabQO9c/hXebnSMvtxzbGX0gzDCmAjcNWb3Is9GnpExmRaDIIAAAggggAACCCCAAAL7RYCLIoAAAggggAACCCCAAAIIIIBA/QsMY4UDJtBLKj3sccYmQbrplAaPRZkMAhvH7F5c0fmMTIZVMQcEEEAAAQQQQAABBBBAYFoKsGgEEEAAAQQQQAABBBBAAAEEEBhbgQET6J2Xyce4b+/cH/nm4eWzhtGZpuMp8PAZs8dg+DwTeTbGYCiGQAABBBBAAAEEEEAAAQQQmKYCLBsBBBBAAAEEEEAAAQQQQACBSScwaAK9pNIdnvHo30LfdcaBHmealEm+zLG5F3n7PM/GJF8s00MAAQQQQAABBBBAAAEEEEBgvAQYFwEEEEAAAQQQQAABBBBAoB4FBk2gdy74M97ucIy8VBc160cz7x/5APQcE4Hcg9yLwQbb97k8C3km9t2SFggggAACCCCAAAIIIIAAAgggMDkFmBUCCCCAAAIIIIAAAggggEC/AvtMoJdUWuue/+AYXbnitM2jG4DeoxYYm3vwD53PxKinMx4DMCYCCCCAAAIIIIAAAggggAACCNS/ACtEAAEEEEAAAQQQQAABBMZLYJ8J9M4LJ4F+bef+yDb/9dx5I+tIrzETGP09yDOQZ2HMpsRAPQQ4QAABBBBAAAEEEEAAAQQQQACB+hdghQgggAACCCCAAAIIIDCJBYaUQC+p1OY1jC5x+sBzj9IGj0LZPwKxzz0Y3dXz9nmehdGNQu86FWBZCCCAAAIIIIAAAggggAACCCBQ/wKsEAEEEEAAAQQQQACB+hYYUgI9BE6if9PbSx0jLEukfzvo/hF2pttoBQp734ORj3Np5zMw8hHoicBkFmBuCCCAAAIIIIAAAggggAACCCBQ/wKsEAEEEEAAAQQQQACBfQgMOYHeOU7eQr+vc3/4m688Z9vwO9FjTARGZ597nns/JlNhEAQQGHsBRkQAAQQQQAABBBBAAAEEEEAAgfoXYIUIIIAAAggggAAC4y8wrAR6SaW7PKWRJ1JvXHmIKh6BMrECMY/9yK+aj27PvR/5CPREAAEEBhbgDAIIIIAAAggggAACCCCAAAII1L8AK0QAAQQQQAABBKaEwLAS6FmRk+gXefsFx/BL628doG8sIBE7fLnR9Yh57Ec2yhc67/nIetMLAQQQqHsBFogAAggggAACCCCAAAIIIIAAAvUvwAoRQAABBBBAYLoIDDuB3gnzF97e4hh+ufwF9w6/Ez1GJTBy89zj3OtRXZ7OCCCAAAKTWICpIYAAAggggAACCCCAAAIIIIBA/QuwQgQQQAABBBAYssCIEuglle7zFf7SMfzy3+87SC2qDr8jPUYkEOuYj6iz/rLzXo+sN70QQAABBBAYZwGGRwABBBBAAAEEEEAAAQQQQACB+hdghQgggAACCEykwIgS6JmgE6vf8fZdjuGV1sNO1ZufumZ4nWg9YoFYx3z4A7yr8x4Pvyc9EEAAAQQQQGAoArRBAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAAJTTGDECfSs0wnW93v7dcfwymWffLw2DK8LrUcgEONYD7/r1zvv7fB70gMBBBBAAAEEpokAy0QAAQQQQAABBBBAAAEEEEAAgfoXYIUIIIDA9BMYVQK9k+svvP2VY+ilddkhesfTbh16B1qOSCDGsR5e59zL3NPh9aI1AggggAACCCAwlQSYKwIIIIAAAggggAACCCCAAAII1L8AK0QAAQRGIDDqBHpJpbt83ZWObY6hl6/80xL9bOjNaTlMgdjGeHjdcg9Xdt7T4fWkNQIIIIAAAggggMCECXAhBBBAAAEEEEAAAQQQQAABBBCofwFWiAAC+0dg1An0TNsJ1x95e75j6KW6tKy3PT9vOw+9Dy2HLhDbGA+9R1qe33kvs08ggAACCCCAAAIIIDAeAoyJAAIIIIAAAggggAACCCCAAAL1L8AKEZiyAmOSQM/qnXj9irevcQy9/Hj1E/TNph1D70DLIQnENLZDatzV6DWd97Crgh0EEEAAAQQQQAABBBDoLcAxAggggAACCCCAAAIIIIAAAgjUvwArnM4CY5ZAD6ITsJ/x9k2OIZaDpbe8e+MQG9NsqAKFqW2H2l56U+e9G3oPWiKAAAIIIIAAAggggMDUE2DGCCCAAAIIIIAAAggggAACCCBQ/wKscFQCY5pAz0yciP2kt3/jGFq5+91P1AeO+8XQGtNqnwKxjOk+G3Y1+JvOe9ZVwQ4CCCCAAAIIIIAAAgggMBkFmBMCCCCAAAIIIIAAAggggAACCNS/wP5e4Zgn0LMgJ2T/3ts3OoZW3v2to7Sm1Dq0xrQaUCCGsRywQZ8Tb+y8V31OUIEAAggggAACCCCAAAIIIDCmAgyGAAIIIIAAAggggAACCCCAAAJTQGCUCfSBV+jE7EU++2zHvkv7SQv0vH/cqEf33ZQWAwjELoaxHKBJr+pnd96jXtUcIoAAAggggAACCCCAAAIIINBbgGMEEEAAAQQQQAABBBBAAAEEpofAuCXQw+cE7fe8fYZj3+X+tx+r5//Rr/fdcAxb1NNQsYvh0Nb0jM57M7TWtEIAAQQQQAABBBBAAAEEEEBgKgswdwQQQAABBBBAAAEEEEAAAQSGKDCuCfTMwYnaq7092/GQY/Dyo2+doDced+/gjThbE+jaxix2XRUD7uQenN15TwZsxAkEEEAAAQQQQAABBBBAAAEEEJg8AswEAQQQQAABBBBAAAEEEEBg4gTGPYGepThh+1Nvf99xm2PwctFVR+vyuQ8P3oizXQKxillXxYA7sf/9znsxYKMJPMGlEEAAAQQQQAABBBBAAAEEEECg/gVYIQIIIIAAAggggAACCCAwpQQmJIEeESdu13r7h46vOwYpi6Xzfniwri3vGqQRpyIQo1jJZjkeOGL+h533YOBWnBmGAE0RQAABBBBAAAEEEEAAAQQQQKD+BVghAggggAACCCCAAAIITDeBCUugB9YJ3LscL/D+uxyDlBXSU743S4+qOkij6X0qNjGSrQaXeFfMHXcN3oyz00qAxSKAAAIIIIAAAggggAACCCCAQP0LsEIEEEAAAQQQQAABBBAYtsCEJtBrs3My9/3ez9vot3g7QDlHOug/S9pIEr0PUExiIxv1OdlVEdu8dR7rrkp2EKgHAdaAAAIIIIAAAggggAACCCCAAAL1L8AKEUAAAQQQQAABBBDYHwL7JYGehTqJ/h1vkwH+grcDlOdIR11Z0r817hmgwfSrjkVMZJuBVx/TczqNB27FGQQQ2B8CXBMBBBBAAAEEEEAAAQQQQAABBOpfgBUigAACCCCAAAIITFGB/ZZAj5cTvPc5/q/33+i4z9FPcY79xdfM0OsP3NbPyelV9foDtykWA795HsM3xtSR/enlw2oRQGACBLgEAggggAACCCCAAAIIIIAAAgjUvwArRAABBBBAAAEEpq/Afk2g19id7L3I+09zXOrop6yQPr12vp556sP9nJweVVl7DGSL/lccu6d1WvbfgloEEEBguguwfgQQQAABBBBAAAEEEEAAAQQQqH8BVogAAggggAACCIxCYFIk0DN/J37vcqz0/nMd1zp6lcXSD286WEv+7AFt1PT5ylqz5qxdNui78lg9N3aOu/qepgYBBBBAoF4EWAcCCCCAAAIIIIAAAggggAACCNS/ACtEAAEEEEAAgf0rMGkS6DUGJ4G/6f28jf5ub3c4epZffvkwnfKJ3+i/y209T9ThUdaYtWbNfZcXmxjlrfOY9W1BDQIIIIAAApNHgJkggAACCCCAAAIIIIAAAggggED9C7BCBBBAAAEEprzApEugR9RJ9DbH+7yfRPqnvN3u2Fu2vvFxOmddiz5w3C/2VtbZXtaWNWatPZcWi5gkcf4+O9X/LxL0XD9HCCCAAAII7AcBLokAAggggAACCCCAAAIIIIAAAvUvwAoRQAABBBCQJmUCvXZjSiqtdfy5j5c5klDPB5p716Vy0mz99R2n6PF/90t9sylvY7uyDkrWkjVlbVnj3iVl7TFYFhPH2r2n2EMAAQQQQAABBAYR4BQCCCCAAAIIIIAAAggggAACCNS/ACtEAAEEEBgTgUmdQK+t0MniOxz5uPIk0t/h+r1vnt/97ifquffN0W8//1f6mc9M1ZK5Zw1ZS9a0dx1Za9acxPm77XDH3lPsIYAAAggggAAC9S/AChFAAAEEEEAAAQQQQAABBBBAoP4FWCECCCAwWQSmRAK9huXk8cOOD/s4ifRXePtVx27pYOnHX3+CVtxc0Yufdqs2uHaqlMw1c87cs4asRfKalLVljUmcf9jrfniqLIl5IoAAAggggAACCHQJsIMAAggggAACCCCAAAIIIIAAAvUvwAoRQKCOBKZUAr3m7mRym+Pzjhe5bokjH/P+fVWXlvVv/3OSjrvhIb3uqdeqRVWfm5wlc8scM9fMOXOXvu/JZi1LsjZH1tjmOgoCCCCAAAIIIIAAAvtBgEsigAACCCCAAAIIIIAAAggggED9C7BCBBDoLjAlE+jdF+Ak872OTzme5frTHO9W67K79M8/Pktz71+n57z6Kn1r/p2qaP9/ZQ7/seCuYk6ZW+aYuUr5ePrTsgbHpxz37v/JMgMEEEAAJKU38wAAC0RJREFUAQQQQAABBKa4ANNHAAEEEEAAAQQQQAABBBBAAIH6F2CFCIyxwJRPoHf3cOL5Zsf7HE9x/WK1HvZBfffy2/QnWx/TzGse0f956TpdcsAm3eezE1VyrdW+5u/42pnD87ZsK+aUuUmLM1dH5nzzRE2J6yCAAAIIIIAAAggggMDkF2CGCCCAAAIIIIAAAggggAACCCBQ/wKscPIJ1FUCvTuvk9IbHF90vMGxTK2/tUQ/+sJ7dMGj/6Yl1/9MR73/Ll34pHW6Zub93fuNyX7GzNi5Rq51oa/5P76255C5ODKnzG3DmFyPQRBAAAEEEEAAAQQQQACBySXAbBBAAAEEEEAAAQQQQAABBBBAoP4F6nKFdZtA7323nLR+2PHvjreVHjvjzNLGvzlOq3/2VD1t16t06E0f0eFfvl4zPrxbC1fu1ClPf1R/fMKjevsBW3RJ8079d7lN96haRPZTl3Npk7bpk76Hf+nnOtxjZUyPnWsU11Lpbb5urv2w+EIAAQQQQAABBBBAAAEEEJjkAkwPAQQQQAABBBBAAAEEEEAAAQTqX6D/FU6bBHp/y3dSe5vjytJDp7299MCLn1Rqefus0tZL5pRuufqg0rd/fVDpI5sPKF3QMqf0e5Wm0rEqF5H91OVc2qRt+qTvAy95cukBj6XSlR53W3/XpA4BBBBAAAEEEEAAAQQQQACBcRVgcAQQQAABBBBAAAEEEEAAAQQQGLHAlEmgj3iFdEQAAQQQQAABBBBAAAEEEEAAgSkjwEQRQAABBBBAAAEEEEAAAQQQ2J8CJNAnRp+rIIAAAggggAACCCCAAAIIIIBA/QuwQgQQQAABBBBAAAEEEEAAgSkuQAJ9it/AiZk+V0EAAQQQQAABBBBAAAEEEEAAgfoXYIUIIIAAAggggAACCCCAAAIk0HkG6l+AFSKAAAIIIIAAAggggAACCCCAQP0LsEIEEEAAAQQQQAABBBBAYAwESKCPASJDIDCeAoyNAAIIIIAAAggggAACCCCAAAL1L8AKEUAAAQQQQAABBBBAYHIIkECfHPeBWSBQrwKsCwEEEEAAAQQQQAABBBBAAAEE6l+AFSKAAAIIIIAAAgggUDcCJNDr5layEAQQGHsBRkQAAQQQQAABBBBAAAEEEEAAgfoXYIUIIIAAAggggAACCOwVIIG+14I9BBBAoL4EWA0CCCCAAAIIIIAAAggggAACCNS/ACtEAAEEEEAAAQQQGFMBEuhjyslgCCCAAAJjJcA4CCCAAAIIIIAAAggggAACCCBQ/wKsEAEEEEAAAQQQmGwCJNAn2x1hPggggAAC9SDAGhBAAAEEEEAAAQQQQAABBBBAoP4FWCECCCCAAAII1KEACfQ6vKksCQEEEEAAgdEJ0BsBBBBAAAEEEEAAAQQQQAABBOpfgBUigAACCCCAQH8CJND7U6EOAQQQQAABBKauADNHAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAAIIjJMACfRxgmVYBBBAAAEEEEBgJAL0QQABBBBAAAEEEEAAAQQQQACB+hdghQgggAACk1eABPrkvTfMDAEEEEAAAQQQmGoCzBcBBBBAAAEEEEAAAQQQQAABBOpfgBUigAACdS1AAr2uby+LQwABBBBAAAEEEBi6AC0RQAABBBBAAAEEEEAAAQQQQKD+BVghAgggMLgACfTBfTiLAAIIIIAAAggggMDUEGCWCCCAAAIIIIAAAggggAACCCBQ/wKsEAEExl2ABPq4E3MBBBBAAAEEEEAAAQQQ2JcA5xFAAAEEEEAAAQQQQAABBBBAoP4FWCECU0GABPpUuEvMEQEEEEAAAQQQQAABBCazAHNDAAEEEEAAAQQQQAABBBBAAIH6F2CF00SABPo0udEsEwEEEEAAAQQQQAABBBDoX4BaBBBAAAEEEEAAAQQQQAABBBCofwFWOFQBEuhDlaIdAggggAACCCCAAAIIIIDA5BNgRggggAACCCCAAAIIIIAAAgggUP8CE7hCEugTiM2lEEAAAQQQQAABBBBAAAEEEOguwD4CCCCAAAIIIIAAAggggAACCEwugfFIoE+uFTIbBBBAAAEEEEAAAQQQQAABBBAYDwHGRAABBBBAAAEEEEAAAQQQQKDuBEig97mlVCCAAAIIIIAAAggggAACCCCAQP0LsEIEEEAAAQQQQAABBBBAAAEE+gqQQO9rMrVrmD0CCCCAAAIIIIAAAggggAACCNS/ACtEAAEEEEAAAQQQQAABBBAYFwES6OPCyqAjFaAfAggggAACCCCAAAIIIIAAAgjUvwArRAABBBBAAAEEEEAAAQQmqwAJ9Ml6Z5jXVBRgzggggAACCCCAAAIIIIAAAgggUP8CrBABBBBAAAEEEEAAAQTqWIAEeh3fXJaGwPAEaI0AAggggAACCCCAAAIIIIAAAvUvwAoRQAABBBBAAAEEEEBgMAES6IPpcA4BBKaOADNFAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAAIIIIAAAgiMswAJ9HEGZngEEEBgKAK0QQABBBBAAAEEEEAAAQQQQACB+hdghQgggAACCCCAAAKTX4AE+uS/R8wQAQQQmOwCzA8BBBBAAAEEEEAAAQQQQAABBOpfgBUigAACCCCAAALTQoAE+rS4zSwSAQQQQGBgAc4ggAACCCCAAAIIIIAAAggggED9C7BCBBBAAAEEEEBgaAIk0IfmRCsEEEAAAQQmpwCzQgABBBBAAAEEEEAAAQQQQACB+hdghQgggAACCCAwYQIk0CeMmgshgAACCCCAQG8BjhFAAAEEEEAAAQQQQAABBBBAoP4FWCECCCCAAAJTSYAE+lS6W8wVAQQQQAABBCaTAHNBAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAALTTIAE+jS74SwXAQQQQAABBBDoEOA7AggggAACCCCAAAIIIIAAAgjUvwArRAABBBAYrgAJ9OGK0R4BBBBAAAEEEEBg/wswAwQQQAABBBBAAAEEEEAAAQQQqH8BVogAAgjsBwES6PsBnUsigAACCCCAAAIITG8BVo8AAggggAACCCCAAAIIIIAAAvUvwAoRQGBqCpBAn5r3jVkjgAACCCCAAAIIILC/BLguAggggAACCCCAAAIIIIAAAgjUvwArRGDaCpBAn7a3noUjgAACCCCAAAIIIDAdBVgzAggggAACCCCAAAIIIIAAAgjUvwArRGDkAiTQR25HTwQQQAABBBBAAAEEEEBgYgW4GgIIIIAAAggggAACCCCAAAII1L8AK9yvAiTQ9ys/F0cAAQQQQAABBBBAAAEEpo8AK0UAAQQQQAABBBBAAAEEEEAAgfoXmOorJIE+1e8g80cAAQQQQAABBBBAAAEEEJgIAa6BAAIIIIAAAggggAACCCCAAAL1LyAS6NPgJrNEBBBAAAEEEEAAAQQQQACB6S7A+hFAAAEEEEAAAQQQQAABBBBAYCgCUzuBPpQV0gYBBBBAAAEEEEAAAQQQQAABBKa2ALNHAAEEEEAAAQQQQAABBBBAYIIESKBPEHR/l6EOAQQQQAABBBBAAAEEEEAAAQTqX4AVIoAAAggggAACCCCAAAIITB0BEuhT515NtpkyHwQQQAABBBBAAAEEEEAAAQQQqH8BVogAAggggAACCCCAAAIITCsBEujT6naz2L0C7CGAAAIIIIAAAggggAACCCCAQP0LsEIEEEAAAQQQQAABBBBAYHgCJNCH50VrBCaHALNAAAEEEEAAAQQQQAABBBBAAIH6F2CFCCCAAAIIIIAAAgggMOECJNAnnJwLIoAAAggggAACCCCAAAIIIIAAAgggUP8CrBABBBBAAAEEEEAAgako8P8DAAD//y9fid4AAAAGSURBVAMAy9jcU0tb7LwAAAAASUVORK5CYII=",
    "timejrrwg": "1758032319196",
    "dra_union_device": "f03dd24d-2d09-45cc-bb01-1b39df75a594",
    "JDst_rac_nfd": "{\"v\":10,\"t\":1758114987858,\"e\":31536000}",
    "hf_time": "1758132987336",
    "__we_m_gl__": "ZnAlM0FmNjQwNTBkOGQ2Mjc2MzZiYzgwMmFmMTJmMjY2NWI5OX52ZW5kb3IlM0FXZWJLaXR+dmVyc2lvbiUzQVdlYkdMJTIwMS4wJTIwKE9wZW5HTCUyMEVTJTIwMi4wJTIwQ2hyb21pdW0pfnVubWFza2VkJTIwdmVuZG9yJTNBR29vZ2xlJTIwSW5jLiUyMChJbnRlbCl+dW5tYXNrZWQlMjByZW5kZXJlciUzQUFOR0xFJTIwKEludGVsJTJDJTIwSW50ZWwoUiklMjBJcmlzKFIpJTIwWGUlMjBHcmFwaGljcyUyMCgweDAwMDA0NkE2KSUyMERpcmVjdDNEMTElMjB2c181XzAlMjBwc181XzAlMkMlMjBEM0QxMSk=",
    "WQ_gather_cv1": "{\"v\":\"34310898711cbc67e174afd9403101a4\",\"t\":1758114986410,\"e\":31536000}",
    "loglevel": "SILENT",
    "3AB9D23F7A4B3CSS": "jdd03MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSIAAAAMZK7I3WTAAAAAADV3CKBD66GUSF4X",
    "3AB9D23F7A4B3C9B": "MUSK5LTRNAAUFD3HGO33DMWB757NKHIWQCV2RRT6BEOT4ZX3MCLTHNATBXT4RINO22AEHSYD777H7ZEFV72ZGEALSI",
    "cfvalmdjrr": "8fecdc9f1834d371f9a22ad222f4a4c2",
    "CA1AN5BV0CA8DS2EPC": "c6fa1c264bdfc25b63ae080b2523e8c0",
    "jrrwebglv": "data:image/png;base64,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§extensions:ANGLE_instanced_arrays;EXT_blend_minmax;EXT_clip_control;EXT_color_buffer_half_float;EXT_depth_clamp;EXT_disjoint_timer_query;EXT_float_blend;EXT_frag_depth;EXT_polygon_offset_clamp;EXT_shader_texture_lod;EXT_texture_compression_bptc;EXT_texture_compression_rgtc;EXT_texture_filter_anisotropic;EXT_texture_mirror_clamp_to_edge;EXT_sRGB;KHR_parallel_shader_compile;OES_element_index_uint;OES_fbo_render_mipmap;OES_standard_derivatives;OES_texture_float;OES_texture_float_linear;OES_texture_half_float;OES_texture_half_float_linear;OES_vertex_array_object;WEBGL_blend_func_extended;WEBGL_color_buffer_float;WEBGL_compressed_texture_s3tc;WEBGL_compressed_texture_s3tc_srgb;WEBGL_debug_renderer_info;WEBGL_debug_shaders;WEBGL_depth_texture;WEBGL_draw_buffers;WEBGL_lose_context;WEBGL_multi_draw;WEBGL_polygon_mode§w1[1, 1]§w2[1, 1024]§w38§w4yes§w58§w624§w78§w816§w932§w1016384§w111024§w1216384§w1316§w1416384§w1530§w1616§w1716§w184096§w19[32767, 32767]§w208§w21WebKit WebGL§w22WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)§w230§w24WebKit§w25WebGL 1.0 (OpenGL ES 2.0 Chromium)§wuv:Google Inc. (Intel)§wur:ANGLE (Intel, Intel(R) Iris(R) Xe Graphics (0x000046A6) Direct3D11 vs_5_0 ps_5_0, D3D11)§w2623§w27127§w28127§w2923§w30127§w31127§w3223§w33127§w34127§w3523§w36127§w37127§w3823§w39127§w40127§w4123§w42127§w43127§w440§w4531§w4630§w470§w4831§w4930§w500§w5131§w5230§w530§w5431§w5530§w560§w5731§w5830§w590§w6031§w6130",
    "WQ_dy1_vk": "{\"5.2\":{\"73806\":{\"e\":31536000,\"v\":\"9g6a669zz3dwhtj9\",\"t\":1757734680583},\"f06cc\":{\"e\":31536000,\"v\":\"3336mgaz9qh6twt1\",\"t\":1757734680391},\"fb5df\":{\"e\":31536000,\"v\":\"ittia3z9g6d666h0\",\"t\":1757734680498}}}",
    "JDst_rac_last_update": "{\"v\":1758114986389}",
    "WQ_gather_wgl1": "{\"v\":\"4a3d5a4e1ed70f80da6f60583689d1fa\",\"t\":1758114986410,\"e\":31536000}",
    "aria": "{\"runtime\":{\"appid\":\"bfeaebea192374ec1f220455f8d5f952\"},\"road\":\"https://static.360buyimg.com/item/assets/oldman/wza1/\"}",
    "__we_m_ft__": "QXJpYWwlMkNBcmlhbCUyMEJsYWNrJTJDQXJpYWwlMjBOYXJyb3clMkNDYWxpYnJpJTJDQ2FtYnJpYSUyQ0NhbWJyaWElMjBNYXRoJTJDQ29taWMlMjBTYW5zJTIwTVMlMkNDb25zb2xhcyUyQ0NvdXJpZXIlMkNDb3VyaWVyJTIwTmV3JTJDR2VvcmdpYSUyQ0hlbHZldGljYSUyQ0x1Y2lkYSUyMENvbnNvbGUlMkNMdWNpZGElMjBTYW5zJTIwVW5pY29kZSUyQ01pY3Jvc29mdCUyMFNhbnMlMjBTZXJpZiUyQ01TJTIwR290aGljJTJDTVMlMjBQR290aGljJTJDTVMlMjBTYW5zJTIwU2VyaWYlMkNNUyUyMFNlcmlmJTJDUGFsYXRpbm8lMjBMaW5vdHlwZSUyQ1NlZ29lJTIwUHJpbnQlMkNTZWdvZSUyMFNjcmlwdCUyQ1NlZ29lJTIwVUklMkNTZWdvZSUyMFVJJTIwTGlnaHQlMkNTZWdvZSUyMFVJJTIwU2VtaWJvbGQlMkNTZWdvZSUyMFVJJTIwU3ltYm9sJTJDVGFob21hJTJDVGltZXMlMkNUaW1lcyUyME5ldyUyMFJvbWFuJTJDVHJlYnVjaGV0JTIwTVMlMkNWZXJkYW5hJTJDV2luZ2Rpbmdz",
    "timecfjrr": "1758032319186",
    "__we_m_cv__": "Y2FudmFzJTIwd2luZGluZyUzQXllc35jYW52YXMlMjBmcCUzQTliODNiY2Y4ZTUxNmQzNTAxNTAwNzkwM2E5NDdlZjI5",
    "__we_m_ftk__": "MTQ2NmUxZWYxYzQxYmE5OTQ2MTJhN2Q2OWUxOGQwMDY=",
    "__we_m_cf__": "{\"t\":1758115046925,\"v\":\"qKovBzs7S_6Nb6Q1_7yBvz1SvAGxT4VbvsA5JDQiHM25uUlrbWKZFFiXachCpsqJpRyIAzhJO3Uit12dhTIEg0Osh8j5XlH8KmIrHtB-F5v6Ic3lxaAgYsVcLDCm_X08BSB1c0SFRzChvK-oGCGTWuXjNrkODbpnSh32gEwuYkqwoQ6njsLQMJgDAjwUmVTQPa1sKYmgFRLcpOLhM_ELS95uC-UkXwX59rbrTwm5iLj1sNp70LEkarlWjcarTbQLCn9KtOw8oLsswmvEo1OEXRKvE3WS-NTqYaklVv_zABfmjgM9lPQCaiys2Dk7tuFy1515YQS061H1gs490TZGMCUe7bcRsRiTgFcKuql4BTTH2WWxFeuX6YR9T8quQ5X-z8j28B-aYFhdvXZ3yB4AaHU0p_hanR3NQ-3FRlMwZGjdfndXlRJk1xmn_tm4Pto3MxvQKqQdU_VZUShtlSzwQARdiT82bOsmWcV_HkoImRf9lxL9jeTkFgkqmBQ3DnHE8VMSbtKLbYe6z7Q6wvl6JfAP_rZMT36NDY_Z01YhfuOfViBOSYAiFjFQzK5oGoXf1R49sWwF6YGA67u7-k7Z3WNNDNnTnGAWo_o4N5_EVtNBGSXlywFk6qwOxHEHm0bLfBX3gELWwqhE1Scdp_WH_hQX7bGuiOSqlwe7yo_8nNH15vi5Yt_aqsZR_WG4TMG-HpiqE_Xjo5_WdFErzLIuu5ieomc6OWT2ZqemRMvrctz_Qql5fi5Nmvx7xQ2_nDdK8KvC3Yft4Tr8vjBTi5yMvkZMu9qj3dLFx0RGeEa9gHgZxIjliN5T6GoX7raxFugpnSMJvYlY0zMxACVisg__EF8GLZJcAp6joUPWC6zn09TIazfSzrYajOyIA0ND8koBTqd4pvs-K3YmgKHJ_iaaX5gPbSZy98XJWD8wxziV7R18sGF6h8l0tjhjK7n9lVEWqHuJf9zMC77G0EYxodTwxiCpMbZUe8wvt27cKhDuIipcXfS51OL2Q4wnNqXZefuAoyUKr0jBkVewz1eRrQ99CcgF2qHzI9Hib1e_WSnTykXLk4hs2NYZp_z45UiqIpJBdzW1DMHhhco9cvDkYSIPiuRyzsg8jC_0Pvzg6uZrgC-Yd8oy681O3BH8sOGSdYpW9xdbTzNJVXOXZIFHuB-aMtf0QAtw_G7Qb8eEUMghCBWNHJ1LTw2PLc0dnYV4dviT4cc8X2OtWaKsAy5Tei69Y8yuVHQPSD7mqNkqfqJQlhObGBQRAdfxulRaO5O8cwUudLyDlaDib4D3juoKH6qZKAKTrFa8PmZcpWfVOFzdFfv-ZjNslZrz7amFAcL0Vj3slpzAlzHXgeAznA5sgEYAQ_gR5g5bh2V3onzE2hnpvBpvo5OeebNKWIfDBs7_fk8QYqtEAYvtNXCfx8Bcnu_JfLeMa6bNx96OeKEkGRD8Gev80dGkVoLlrpHvZCQtgxWL7lyO9Z2kmVPWtm5tGb5d3rlXpwiaWlhuQxrtoJF-6ugEavSiLNc-5gwveE3T6hYuCcEhCfr5H9V20UQBDH1J8jOo8jox9HSTLKZsFKsQoVcVtHKNoJM50iSX1TdaE39R24qT_Y-0AOASBsUs4rojLmItoFhSuMZ9IWPXTs-vNHdIVG0tfMmUpNTNuNV2xPeJy6s9w8M-UsN2k9_JIJ7c9VENxkxGGumrBYA_VnNpA4VxtTJr5aXoe-6x2jWOCj-XKRElrvkwRAEEO33cxwF4mno_zr0CCS9LREy22Zfe5dFOJeOcx-j5WCaRbVkrQDt-1_flS5_plJJs1D00ed9GIr3wRjjKgGDjJXRfLfmHkQIrFOgcOtdeT9gFxtICZAeV-xEa7r_dXM_H8ide56FvHHXhdXE0cI9V85NBXwIreqFdmuanS9BLJcDZTjPrvaN4fs0x2L-zJ2JFK2CtJNgG76uOLMjkpIF2kfpAD6rgJytd3nub41U-GTrsA4m2mJrJwQagatnbUfMcp_6ZSjfNgjAW_8MZferPNrGkl4g6ZQxgT9EAAlNsPsmCY8vkV2XafXCFMtOWM3wP3o93QubljKr4OYOERVmdnwMNcjIzhksw-ty7lOM133O6U_8dMGXaze1TQhkNqkTGrTbRzBdFnT6yCQZAq1SxB4eiCZ8o0UE6vrGm7VznBIRstX-_nSxbKLTZH-A1QG-t3rvmjhfxPwowJfWt2SIhzXWTkDL23vmFXslgaJKb-36nzboLVtk5EHGJjbKuP1CMCJyLEPnZDqPBvNfcuAt_QPuzQKLIQ5c2viP_xHmx_jRdMMr2FdeF6nbsbsArs_RBnM7GXvjDhlGR6saVXVdug0rglDsFKO9JLxyZuleU24rY7oDZKwwZBE3XugwZAgytDvW9qhr92CrZUv6F7N0JeCwMWBjk356LDCrXeHgL7EEzzQ8DupT-kwznHQxLTQo8FEgkyS_c42QuEEYLlX4TbmHDkl4h5y7WYP4cmCUe1GWpixT2MgLQLJtKukRxUZWeN9GkE_E4knIr75NEQwtxjgnxdMNPsFX8Sc7KhpFzlWGKnBE5AA0ltkamgkkK4lgjmM66Q6SCyCIYQd5xYjnoUJwk8KWrSOlHtzYthd2NRQPsIt8fXXRtoKuPj6lgkxAyRlPcYGB8JTpE9xLX7WFgEAp7t8A0AU_4j85mmgMV5tQQXiujq1kxTQHTShTPkyNmE02Q8I2qsMnnHaTpHmBAXC1KFtI9bPWYNMS03Mz9twChelrPhFIGjpYLP7BhjqxGQFwKGdiyPsiOpl8pPyX8E8xJ-hcZ6Hrt2wOyJZF0wa7ifsVBj12XAt2k4rfQNGZQtLGiEufc-6tufkKMve5XLuM1YDwe9zojVrhT_Y6zIGK7kUjassKQeaNPxrw2-vfsG7hCQph2QX1S9zlt95CffRgP723XJsc5s2XBUc7QLDWra-BJNsedf5zByBfkvWhNpD84tmGtDbqOiVO5saWZqWrHh5GKYLV5vUtkerDbFDqLYoIxSCaYgYcOKGZXz89ruUOcQXPjCuhP_HDJlbYe6DXVeZ9RhLfaik7kS9nU27WARaZkMtzjuglI-pTY7kLBlHElRJmJMM6sVQX5_hPpX9puoXxWwpYkFRb9aB-N1AZqkZWHxCvNdW5aPsXygIxLOEp6cNBGVtj7tt7zqs8o-O82rlfuB1ALWucI5_t9Sm2h-Z69lN9oopLbgPS_MgOBLWw4mBsTjMcN4TTqWAMPtUUeaYvphICbTpNZJ-5nk1QQXH9SUhry-T09g7woPlNXKuNwpPkHWhRrBE0rd6WqyH4TOEfQTXfJ_VB2sPskSS9UsJ2C6aQx8W4F5yjEmUOUGkPPPnq1vx7UXn7bFwjyCCARrFFGdzX8R4a-jNZCRvigKsXjTIZg7rITHT3UIR9NbxU9zn07js0x4ErkwIUf1ta82rWaonklrZUFsa3yfot10NxvKY_So7bf25yQG52OMB8JVNdmCnMEusbqQaBu7SVQ-C_c4Z9Tk2JsbBg-2Nagd_5rZ57y\"}",
    "areaId": "\"2\"",
    "PCA9D23F7A4B3CSS": "2c81e2eac9fac1e16072e8f650a65796",
    "shshshfpb": "BApXSlyvZVPxA-lb62kUbGA0TRDBDQGMaBnQCH3pi9xJ1MknjYoG2",
    "JDst_behavior_flag": "[{\"t\":1758114989577,\"e\":3600,\"v\":\"Ff\"}]",
    "webglvmdjrr": "093c3aecf9e9f92cba6973731ae8f67b",
    "keyword": "美妆",
    "shshshfpx": "660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855",
    "shshshfpa": "660cf8ea-2802-f5ac-bfda-2d47f886d2c0-1736431855",
    "PCTSD23F7A4B3CSS": "1758115586023",
    "WQ_dy1_tk_algo": "{\"3336mgaz9qh6twt1\":{\"f06cc\":{\"v\":\"eyJ0ayI6InRrMDN3YWQyYzFjNzUxOG5DSEhxaGhtYzBpZjFEYnRESE9vUHdBRHZLbDlvSFFKME53RkRKb0hPcF9hS1h5WjF6UEVWd2JES19XSVVTY0FGamZQQXJvcGxtRmEyIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdXVjVLeVRROHpKbU8nO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uU0hBMjU2KHN0cik7fSJ9\",\"e\":86400,\"t\":1758032314115}},\"ittia3z9g6d666h0\":{\"fb5df\":{\"v\":\"eyJ0ayI6InRrMDN3ZWE0NzFkOTkxOG5VVlJxVWNjdEloazZUWE5jel9nd1RtR3NwbVVadUNXU1BMU0ZYZGVLc1RQa0dpYUdXWDNrbk1MeDZlVUlOcUpoc2xXRDB1SkJpZ2lnIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdGbU1GcTJZWk1QM1EnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uU0hBMjU2KHN0cik7fSJ9\",\"e\":86400,\"t\":1758032314125}},\"9g6a669zz3dwhtj9\":{\"73806\":{\"v\":\"eyJ0ayI6InRrMDN3YjliMzFkMjAxOG5nRHdzREM5aTJoSzNRZU8xQ05WeWpGa1FCbHVPTHZmbVhVeG5NN0tjbW4tT09Vb1Vxa2NHZ2lwSV9WbDVzUDJ2eG00ZEpEeTdNZHd5IiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdrQjNIcTNTd2owQ2knO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uU0hBMjU2KHN0cik7fSJ9\",\"e\":86400,\"t\":1758032314187}}}",
    getItem: function (val) {
        console.log("localStorage.getItem('" + val + "')")
        if (val === 'WQ_dy1_vk'){
            return '{"5.2":{"73806":{"e":31536000,"v":"9g6a669zz3dwhtj9","t":1757734680583},"f06cc":{"e":31536000,"v":"3336mgaz9qh6twt1","t":1757734680391},"fb5df":{"e":31536000,"v":"ittia3z9g6d666h0","t":1757734680498}}}'
        }
        if (val === 'WQ_dy1_tk_algo'){
            return '{"ittia3z9g6d666h0":{"fb5df":{"v":"eyJ0ayI6InRrMDN3YmE0OTFjYTcxOG5heEhjUEJteXBtOTVGYnlPcGMwRGdEUk05MU9xcHVTZ3BQX3ExT1JWb1RLM1M0aW1SUjVvd0QtMWNBTXF6dXJhOFNZYWJFR1pxbkZ4IiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPScwdnl1VW9FYm10UlknO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uU0hBMjU2KHN0cik7fSJ9","e":86400,"t":1758356108445}},"3336mgaz9qh6twt1":{"f06cc":{"v":"eyJ0ayI6InRrMDN3OTNmMTFiYjAxOG5wRTlxRmg1MkpvRjhOZUhxYW5TYjBKYmZyMmJqRHdzbThDaThNLXd1ZzBIQmNXMjFzR3JRM21LWE1iWnBCNmpmbVQ1STV2TnBaNlBuIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSczUm1YYUYzRXhJOXEnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uU0hBMjU2KHN0cik7fSJ9","e":86400,"t":1758356108446}},"9g6a669zz3dwhtj9":{"73806":{"v":"eyJ0ayI6InRrMDN3YTY5MjFjNDcxOG4xbEV2YXZaaXpOS0pLVW5WM1NtODgwOVBFakdPanJKRGlsOTNvTnZnOUY0QW1xbEJGbV92M3NudWhna1BMQVljTVQ5eGpNVHQxajNaIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdDSEYxS2FvMEhKVVUnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uU0hBMjU2KHN0cik7fSJ9","e":86400,"t":1758356108446}}}'
        }
        if (val === 'JDst_behavior_flag'){
            return '[{"t":1758357746683,"e":3600,"v":"Ff"}]'
        }
        if (val === 'WQ_gather_cv1'){
            return '{"v":"34310898711cbc67e174afd9403101a4","t":1758357724512,"e":31536000}'
        }
        if (val === 'WQ_gather_wgl1'){
            return '{"v":"4a3d5a4e1ed70f80da6f60583689d1fa","t":1758357724512,"e":31536000}'
        }
    },
    setItem: function (val){
        console.log("localStorage.setItem('" + val + "')")
    }
}
localStorage = watch(localStorage, 'localStorage')
function Location(){
    this.ancestorOrigins = {};
    this.href = "https://search.jd.com/Search?keyword=%E7%BE%8E%E5%A6%86&enc=utf-8&wq=%E7%BE%8E%E5%A6%86&pvid=c8ee6f8f98ba4aeabf534a34348c0d87";
    this.origin = "https://search.jd.com";
    this.protocol = "https:";
    this.host = "search.jd.com";
    this.hostname = "search.jd.com";
    this.port = "";
    this.pathname = "/Search";
    this.search = "?keyword=%E7%BE%8E%E5%A6%86&enc=utf-8&wq=%E7%BE%8E%E5%A6%86&pvid=c8ee6f8f98ba4aeabf534a34348c0d87";
    this.hash = "";
}
window.location = new Location()
location = watch(location, 'location')

function MimeTypeArray(){
    this.length = 2
}
Navigator.prototype.mimeTypes = watch(new MimeTypeArray(), 'MimeTypeArray')
function Navigator(){
    this.appCodeName = "Mozilla";
    this.appName = "Netscape";
    this.appVersion = "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
    this.cookieEnabled = true;
    this.deprecatedRunAdAuctionEnforcesKAnonymity = false;
    this.deviceMemory = 8;
    this.hardwareConcurrency = 16;
    this.language = "zh";
    this.languages = ['zh', 'zh-CN'];
    this.maxTouchPoints = 0;
    this.onLine = true;
    this.pdfViewerEnabled = true;
    this.platform = "Win32";
    this.product = "Gecko";
    this.productSub = "20030107";
    this.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
    this.vendor = "Google Inc.";
    this.vendorSub = "";
    this.webdriver = false;
    this.plugins = {
    "0": {
        "0": {},
        "1": {}
    },
    "1": {
        "0": {},
        "1": {}
    },
    "2": {
        "0": {},
        "1": {}
    },
    "3": {
        "0": {},
        "1": {}
    },
    "4": {
        "0": {},
        "1": {}
    }
};
    this.plugins.length = 5;
}
window.navigator = new Navigator()
navigator = watch(navigator, 'navigator')
function Screen(){
    this.availHeight = 1040;
    this.availLeft = 0;
    this.availTop = 0;
    this.availWidth = 1920;
    this.colorDepth = 24;
    this.height = 1080;
    this.isExtended = false;
    this.onchange = null;
    this.pixelDepth = 24;
    this.width = 1920;
}
window.screen = new Screen()
screen = watch(screen, 'screen')

// *******************************************你全扣得网页代码***************************************************
require("./code");
// *******************************************你的核心逻辑代码***************************************************
const paramsH5sign = {
    appid: 'search-pc-java',
    functionId: "pc_search_searchWare", // functionId
    client: 'pc',
    clientVersion: '1.0.0',
    t: new Date().getTime(),
  }
const params = {
    "enc": "utf-8",
    "pvid": "f945e4fc1628448aaf9f567f3b9b1e3e",
    "area": "2_2813_61125_0",
    "page": 6,
    "s": 115
}
paramsH5sign['body'] = CryptoJs.SHA256(JSON.stringify(params)).toString();
window.PSign = new window.ParamsSign({appId: 'f06cc'})
const _$Ga = window.PSign._$sdnmd(paramsH5sign);
console.log(_$Ga.h5st)
console.log(_$Ga.h5st.length)
// process.exit();