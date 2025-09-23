function obj_toString(obj, name) {
  Object.defineProperty(obj, Symbol.toStringTag, {
    value: name,
  });
}
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

    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                // 排除一些不常见的或可能导致问题的属性
                if (typeof property === 'symbol' || property === 'constructor' || property === '__proto__') {
                    return Reflect.get(target, property, receiver);
                }

                // *** 核心修改：针对 window.navigator.platform 的特殊处理 ***
                // if (name === "navigator" && property === "platform") {
                //     console.log(`对象 => ${name}, 特殊处理属性: ${String(property)}, 模拟值为: Win32`); // 你可以根据需要修改模拟值
                //     return "Win32"; // 直接返回一个你想要的模拟值，绕过原生访问
                // }
                if (property === "crypto" || property === "navigator" || property === "window")
                    return target[property];
                // ***************************************************************

                const value = Reflect.get(target, property, receiver);

                // 深度监听嵌套对象
                if (typeof value === 'object' && value !== null) {
                    // 为嵌套对象生成一个更具体的名称
                    const nestedName = `${name}.${String(property)}`;
                    return watch(value, nestedName, visited);
                }

                // 只在值为 undefined 时打印属性访问信息
                if (value === undefined) {
                    console.log(`对象 => ${name}, 读取属性: ${String(property)}, 值为: undefined, 类型为: ${typeof value}`);
                }

                // 检测原型链访问 (无论值是否为undefined，都检测)
                // 如果属性不在 target 上，但通过原型链访问到，则标记为 true
                if (!Object.prototype.hasOwnProperty.call(target, property)) {
                    checkPrototypeChain(target, property);
                }

                // 检测描述符 (无论值是否为undefined，都检测)
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
            } catch (e) {
                console.error(`Error in get trap for ${name}.${String(property)}:`, e);
            }
            return Reflect.get(target, property, receiver);
        },
        set: (target, property, newValue, receiver) => {
            try {
                // set 操作不受 undefined 值限制，依然打印
                console.log(`对象 => ${name}, 设置属性: ${String(property)}, 值为: ${typeof newValue === 'function' ? 'function' : newValue}, 类型为: ${typeof newValue}`);
            } catch (e) {
                console.error(`Error in set trap for ${name}.${String(property)}:`, e);
            }
            return Reflect.set(target, property, newValue, receiver);
        },
        // 捕获 in 操作符
        has: function(target, property) {
            console.log(`对象 => ${name}, in 操作符检测属性: ${String(property)}`);
            return Reflect.has(target, property);
        },
        // 捕获 delete 操作符
        deleteProperty: function(target, property) {
            console.log(`对象 => ${name}, 删除属性: ${String(property)}`);
            return Reflect.deleteProperty(target, property);
        },
        // 捕获 Object.keys(), Object.values(), Object.entries() 等操作
        ownKeys: function(target) {
            console.log(`对象 => ${name}, 获取自身所有键`);
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
const CryptoJs =require('crypto-js')
window = global;
function Window(){}
Object.setPrototypeOf(window, Window.prototype);
obj_toString(window, 'Window')


window.XMLHttpRequest = function () {
    console.log("new XMLHttpRequest()");
};
window = watch(window, 'window')

function HTMLHtmlElement(){}
documentElement = new HTMLHtmlElement();
function HTMLDocument(){}
document = new HTMLDocument();


Element = function (){
    this.prototype = {
        scrollIntoViewIfNeeded: function (tagName) {
            console.log("scrollIntoViewIfNeeded", tagName);
        }
    };
}
Element = new Element();

HTMLHtmlElement.prototype.documentElement = watch(documentElement, 'documentElement')
function HTMLScriptElement(){}
Object.defineProperty(HTMLDocument.prototype, 'createElement', {
    enumerable: true,
    writable: true,
    configurable: true,
    value: function createElement(tagName) {
        console.log("document.createElement('" + tagName + "')");
        if (tagName === 'script') {
            return new HTMLScriptElement();
        }
    }
});

Object.defineProperty(HTMLDocument.prototype, 'createEvent', {
  enumerable: true,
  writable: true,
  configurable: true,
  value: function createEvent(tagName) {
    console.log("document.createEvent('" + tagName + "')");
    return {
      initEvent: function() {},
      dispatchEvent: function() { return true; }
    };
  }
});


document = watch(document, 'document')
require("./code");

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