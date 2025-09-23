// ===== 1. 保存原始API =====
const original = {
    console: Object.assign({}, console),
    Object: {
        getPrototypeOf: Object.getOwnPropertyDescriptor(Object, 'getPrototypeOf').value,
        defineProperty: Object.defineProperty,
        getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors,
        setPrototypeOf: Object.setPrototypeOf
    },
    Function: {
        prototype: Function.prototype,
        toString: Function.prototype.toString
    },
    Proxy: Proxy,
    Reflect: Reflect
};

// ===== 2. 日志控制与结果收集 =====
let loggingEnabled = true;
const collectedEnv = {};
const proxyCache = new WeakMap();

function log(...args) {
    if (loggingEnabled) original.console.log("[环境代理]", ...args);
}

// ===== 3. 环境检测 =====
function isBrowserEnvironment() {
    // 检查常见的浏览器全局对象
    const hasWindow = typeof window !== 'undefined' && window !== null;
    const hasDocument = typeof document !== 'undefined' && document !== null;
    const hasNavigator = typeof navigator !== 'undefined' && navigator !== null;

    // 在Node.js的浏览器模拟环境中，这些对象可能存在但不是原生浏览器对象
    const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;

    return (hasWindow || hasDocument || hasNavigator) && !isNode;
}

// ===== 4. 代理处理器 =====
const handler = {
    get(target, prop, receiver) {
        // 特殊处理：避免递归的属性
        if (prop === '__isProxy') return true;
        if (prop === '__target') return target;
        if (prop === Symbol.toStringTag) return target.constructor.name;

        // 使用直接属性访问，避免递归
        let value;
        try {
            value = target[prop];
        } catch (e) {
            value = undefined;
        }

        // 收集环境数据
        const targetName = target.constructor?.name || 'Object';
        if ((targetName.includes('Navigator') || targetName.includes('Screen') || targetName.includes('Location')) && typeof prop === "string") {
            if (!prop.startsWith("_") && !prop.startsWith("$") && prop !== 'constructor') {
                collectedEnv[`${targetName}_${prop}`] = value;
            }
        }

        // 记录访问日志
        if (loggingEnabled && typeof prop === "string" && !prop.startsWith("_") && prop !== 'constructor') {
            log(`[GET] ${targetName}.${prop}`);
        }

        // 特殊处理：绕过原型链检测
        if (prop === "__proto__" || prop === "constructor") {
            log(`[绕过原型检测] 返回原始 ${prop}`);
            return Object.getPrototypeOf(target);
        }

        // 避免代理特定属性（防止递归）
        const skipProps = ['toString', 'valueOf', 'toLocaleString', 'constructor', 'prototype', 'then', Symbol.toPrimitive];
        if (skipProps.includes(prop)) {
            return value;
        }

        // 代理嵌套对象，但避免循环代理
        if (value !== null && value !== undefined && typeof value === "object" && !proxyCache.has(value)) {
            return getCachedProxy(value, `Nested_${prop}`);
        }

        return value;
    },

    set(target, prop, value, receiver) {
        if (loggingEnabled && typeof prop === "string" && !prop.startsWith("_")) {
            log(`[SET] ${target.constructor?.name || "Object"}.${prop} =`, typeof value === 'object' ? '[Object]' : value);
        }

        // 收集设置的环境数据
        if (target.constructor?.name.includes('Storage')) {
            collectedEnv[`storage_${prop}`] = value;
        }

        // 使用安全的属性设置
        target[prop] = value;
        return true;
    },

    apply(target, thisArg, args) {
        if (loggingEnabled) {
            log(`[CALL] ${target.name || "function"}(${args.map(a => typeof a).join(", ")})`);
        }

        // 特殊处理：修复 Function.toString() 检测
        if (target === Function.prototype.toString) {
            return () => "function () { [native code] }";
        }

        return Reflect.apply(target, thisArg, args);
    }
};

// ===== 5. 创建代理对象 =====
function getCachedProxy(target, name) {
    if (!target || typeof target !== 'object') return target;
    if (proxyCache.has(target)) return proxyCache.get(target);
    if (target.__isProxy) return target;

    const proxy = createStealthProxy(target, name);
    proxyCache.set(target, proxy);
    return proxy;
}

function createStealthProxy(target, name) {
    // 对于某些特殊对象，不进行代理
    if (shouldSkipProxy(target)) {
        return target;
    }

    try {
        const proxy = new Proxy(target, handler);

        // 标记为代理对象
        Object.defineProperty(proxy, '__isProxy', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(proxy, '__target', {
            value: target,
            writable: false,
            enumerable: false,
            configurable: false
        });

        return proxy;
    } catch (e) {
        log(`创建代理失败 ${name}:`, e.message);
        return target;
    }
}

// 判断是否应该跳过代理
function shouldSkipProxy(obj) {
    if (!obj || typeof obj !== 'object') return true;

    // 跳过原生对象和特殊对象
    const skipTypes = [Date, RegExp, Error, Promise, Map, Set, WeakMap, WeakSet];
    const skipNames = ['Window', 'Document', 'HTMLDocument'];

    return skipTypes.some(type => obj instanceof type) ||
           skipNames.some(name => obj.constructor?.name === name);
}

// ===== 6. 补环境核心函数 =====
function patchEnvironment() {
    const globalObj = typeof global !== 'undefined' ? global : window;

    // 使用更准确的环境检测
    const hasBrowserLikeObjects = (
        globalObj.navigator ||
        globalObj.document ||
        globalObj.window ||
        globalObj.location
    );

    if (!hasBrowserLikeObjects) {
        log("未检测到浏览器环境对象，跳过代理");
        return false;
    }

    log("检测到浏览器模拟环境，开始代理...");

    // 只代理特定的浏览器对象
    const browserObjects = ["navigator", "screen", "location", "localStorage", "sessionStorage", "history"];

    for (const key of browserObjects) {
        try {
            if (globalObj[key] && typeof globalObj[key] === 'object' && !globalObj[key].__isProxy) {
                globalObj[key] = getCachedProxy(globalObj[key], key);
                log(`已代理对象: ${key}`);
            }
        } catch (e) {
            log(`代理 ${key} 失败:`, e.message);
        }
    }

    // 特殊处理document对象（可能比较敏感）
    try {
        if (globalObj.document && typeof globalObj.document === 'object' && !globalObj.document.__isProxy) {
            globalObj.document = getCachedProxy(globalObj.document, 'document');
            log("已代理对象: document");
        }
    } catch (e) {
        log("代理 document 失败:", e.message);
    }

    // 修复常见检测点
    fixCommonDetections(globalObj);

    return true;
}

// 修复常见检测
function fixCommonDetections(globalObj) {
    try {
        if (globalObj.navigator) {
            // 修复插件列表
            Object.defineProperty(globalObj.navigator, "plugins", {
                get: () => [{ name: "Chrome PDF Plugin", description: "Portable Document Format" }],
                configurable: false,
                enumerable: true
            });

            // 修复语言
            Object.defineProperty(globalObj.navigator, "languages", {
                get: () => ["zh-CN", "zh"],
                configurable: false,
                enumerable: true
            });

            log("已修复浏览器检测点");
        }
    } catch (e) {
        log("修复检测点失败:", e.message);
    }
}

// ===== 7. 立即执行补环境 =====
let isPatched = false;

try {
    isPatched = patchEnvironment();
    if (isPatched) {
        log("环境代理已完成");
    }
} catch (e) {
    console.error("环境代理初始化失败:", e.message);
}

// ===== 8. 导出函数 =====
module.exports = {
    patchEnvironment,
    enableLogging: () => { loggingEnabled = true; },
    disableLogging: () => { loggingEnabled = false; },
    getCollectedEnv: () => collectedEnv,
    isEnvironmentPatched: () => isPatched
};

// 延迟验证，确保代理完全生效
setTimeout(() => {
    if (isPatched) {
        try {
            console.log("\n===== 环境代理验证 =====");
            if (typeof navigator !== 'undefined') {
                console.log("navigator.userAgent:", navigator.userAgent);
                console.log("navigator.plugins:", navigator.plugins.length);
                console.log("navigator.languages:", navigator.languages);
            }
            console.log("代理运行正常");
        } catch (e) {
            console.error("验证失败:", e.message);
        }
    }
}, 1500);