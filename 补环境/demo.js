function obj_toString(obj, name) {
  Object.defineProperty(obj, Symbol.toStringTag, {
    value: name,
  });
}
function watch(obj, name, visited = new WeakSet(), options = {}) {
    const {
        logUndefined = true,
        logProtoChain = true,
        logDescriptors = true,
        logAllOperations = false,
        depth = 10,
        excludeProperties = [],
        excludeSymbols = true,
        autoFillUndefined = true, // 新增：自动补全undefined属性
        currentDepth = 0
    } = options;

    if (obj === null || typeof obj !== 'object' || visited.has(obj) || currentDepth >= depth) {
        return obj;
    }

    visited.add(obj);

    const checkPrototypeChain = (target, property) => {
        if (!logProtoChain) return false;

        let current = target;
        while (current) {
            if (Object.prototype.hasOwnProperty.call(current, property)) {
                return false;
            }
            current = Object.getPrototypeOf(current);
            if (current && current !== Object.prototype && current !== null) {
                console.log(`🔗 原型链检测:true (对象: ${name}, 属性: ${property})`);
                return true;
            }
        }
        return false;
    };

    // 自动补全函数
    const autoFillProperty = (target, property, context = '') => {
        if (typeof property === 'symbol' || excludeProperties.includes(property)) {
            return;
        }

        // 常见的需要补全的属性
        const commonProperties = {
            // DOM 相关
            'documentElement': () => document.documentElement,
            'body': () => document.body,
            'cookie': '',
            'referrer': '',
            'all': [],
            'createElement': function(tagName) {
                console.log(`document.createElement('${tagName}')`);
                return document.createElement(tagName);
            },
            'createEvent': function(type) {
                console.log(`document.createEvent('${type}')`);
                return { initEvent: () => {}, dispatchEvent: () => true };
            },
            'querySelector': function(selector) {
                console.log(`document.querySelector('${selector}')`);
                return null;
            },

            // window 相关
            'localStorage': {
                getItem: (key) => {
                    console.log(`localStorage.getItem('${key}')`);
                    return null;
                },
                setItem: (key, value) => {
                    console.log(`localStorage.setItem('${key}', '${value}')`);
                }
            },
            'location': { href: 'https://www.jd.com' },
            'screen': { width: 1920, height: 1080 },
            'navigator': { platform: 'Win32', userAgent: 'Mozilla/5.0' },
            'outerWidth': 1920,
            'outerHeight': 1080,
            'devicePixelRatio': 1,

            // 通用方法
            'getItem': function(key) {
                console.log(`${name}.getItem('${key}')`);
                return null;
            },
            'setItem': function(key, value) {
                console.log(`${name}.setItem('${key}', '${value}')`);
            },
            'addEventListener': function() {},
            'removeEventListener': function() {},
            'dispatchEvent': function() { return true; },
            'toString': function() { return `[object ${name}]`; },
            'valueOf': function() { return this; }
        };

        // 根据上下文选择补全策略
        let valueToSet;

        if (context.includes('document') || context.includes('element')) {
            // DOM 相关属性
            if (commonProperties[property] !== undefined) {
                valueToSet = commonProperties[property];
            } else if (typeof property === 'string' && property.startsWith('on')) {
                // 事件处理器
                valueToSet = null;
            } else {
                // 默认补空对象
                valueToSet = {};
            }
        } else if (context.includes('window')) {
            // window 相关属性
            if (commonProperties[property] !== undefined) {
                valueToSet = commonProperties[property];
            } else {
                valueToSet = {};
            }
        } else {
            // 其他对象，根据属性名猜测类型
            if (typeof property === 'string') {
                if (property.endsWith('Element') || property.endsWith('Node')) {
                    valueToSet = {};
                } else if (property.startsWith('get') || property.startsWith('set') ||
                          property.startsWith('add') || property.startsWith('remove')) {
                    valueToSet = function() { console.log(`${name}.${property}() called`); };
                } else {
                    valueToSet = '';
                }
            } else {
                valueToSet = {};
            }
        }

        if (valueToSet !== undefined) {
            Object.defineProperty(target, property, {
                value: valueToSet,
                writable: true,
                enumerable: true,
                configurable: true
            });
            console.log(`✅ 自动补全: ${name}.${String(property)}`);
        }
    };

    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                if (typeof property === 'symbol') {
                    if (excludeSymbols && property !== Symbol.iterator && property !== Symbol.toStringTag) {
                        return Reflect.get(target, property, receiver);
                    }
                }

                if (property === 'constructor' || property === '__proto__' ||
                    excludeProperties.includes(property)) {
                    return Reflect.get(target, property, receiver);
                }

                if (property === "crypto" || property === "navigator" || property === "window") {
                    return target[property];
                }

                const value = Reflect.get(target, property, receiver);

                // 自动补全undefined属性
                if (autoFillUndefined && value === undefined &&
                    !Object.prototype.hasOwnProperty.call(target, property)) {
                    autoFillProperty(target, property, name);
                    return Reflect.get(target, property, receiver);
                }

                if (typeof value === 'object' && value !== null && currentDepth < depth) {
                    const nestedName = `${name}.${String(property)}`;
                    return watch(value, nestedName, visited, {
                        ...options,
                        currentDepth: currentDepth + 1
                    });
                }

                if (logAllOperations || (logUndefined && value === undefined)) {
                    const valueType = typeof value;
                    const valueStr = value === undefined ? 'undefined' :
                                   typeof value === 'function' ? 'function' :
                                   value === null ? 'null' :
                                   value.toString().slice(0, 100);

                    console.log(`🔍 ${name}, 读取: ${String(property)}, 值: ${valueStr}, 类型: ${valueType}`);
                }

                if (logProtoChain && !Object.prototype.hasOwnProperty.call(target, property)) {
                    checkPrototypeChain(target, property);
                }

                if (logDescriptors) {
                    const descriptor = Object.getOwnPropertyDescriptor(target, property);
                    if (descriptor) {
                        if (descriptor.get || descriptor.set) {
                            console.log(`⚡ Getter/Setter检测 (${name}.${String(property)})`);
                        }
                    }
                }
            } catch (e) {
                console.error(`❌ Error in get trap for ${name}.${String(property)}:`, e.message);
            }
            return Reflect.get(target, property, receiver);
        },

        // 其他trap保持不变...
        set: (target, property, newValue, receiver) => {
            try {
                const valueType = typeof newValue;
                const valueStr = typeof newValue === 'function' ? 'function' :
                               newValue === null ? 'null' :
                               newValue?.toString().slice(0, 100) || String(newValue);

                console.log(`✏️  ${name}, 设置: ${String(property)}, 值: ${valueStr}, 类型: ${valueType}`);
            } catch (e) {
                console.error(`❌ Error in set trap for ${name}.${String(property)}:`, e.message);
            }
            return Reflect.set(target, property, newValue, receiver);
        },

        has: function(target, property) {
            console.log(`❓ ${name}, in操作符检测: ${String(property)}`);
            return Reflect.has(target, property);
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
window = watch(global, 'window', new WeakSet(), {
    autoFillUndefined: true, // 开启自动补全
    logUndefined: true,
    depth: 5
});

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


document = watch(document, 'document', new WeakSet(), {
    autoFillUndefined: true, // 开启自动补全
    logUndefined: true,
    depth: 10
});
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