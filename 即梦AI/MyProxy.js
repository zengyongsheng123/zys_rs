/**
 * 修复的环境代理补全脚本
 * 避免console.log导致的递归调用问题
 */

// 保存原始console方法
const originalConsole = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
    debug: console.debug
};

function createEnvProxy(target, name) {
    return new Proxy(target, {
        get: function(target, property, receiver) {
            const value = target[property];

            // 避免在代理console时使用console.log导致递归
            if (name !== 'console' || !['log', 'warn', 'error', 'info', 'debug'].includes(property)) {
                originalConsole.log("方法:", "get  ", "对象:", name,
                                   "  属性:", property,
                                   "  属性类型:", typeof property,
                                   "  属性值类型:", typeof value);
            }

            return value;
        },
        set: function(target, property, value, receiver) {
            // 避免在代理console时使用console.log导致递归
            if (name !== 'console' || !['log', 'warn', 'error', 'info', 'debug'].includes(property)) {
                originalConsole.log("方法:", "set  ", "对象:", name,
                                   "  属性:", property,
                                   "  属性类型:", typeof property,
                                   "  值类型:", typeof value);
            }

            return Reflect.set(target, property, value, receiver);
        }
    });
}

function my_proxy(proxy_array) {
    for (var i = 0; i < proxy_array.length; i++) {
        const objName = proxy_array[i];
        try {
            // 特殊处理console对象
            if (objName === 'console') {
                // 对console对象使用特殊的代理，避免递归
                window[objName] = createConsoleProxy(console, objName);
                continue;
            }

            // 尝试获取全局对象
            let target = window[objName];
            if (target === undefined || target === null) {
                // 如果对象不存在，创建一个空对象
                target = {};
                window[objName] = target;
            }
            // 创建代理
            window[objName] = createEnvProxy(target, objName);
        } catch (e) {
            originalConsole.error(`处理对象 ${objName} 时出错:`, e);
            // 创建空对象的代理
            window[objName] = createEnvProxy({}, objName);
        }
    }
}

// 专门处理console对象的代理，避免递归
function createConsoleProxy(target, name) {
    return new Proxy(target, {
        get: function(target, property, receiver) {
            const value = target[property];

            // 对于console方法，我们使用原始console来记录日志
            if (['log', 'warn', 'error', 'info', 'debug'].includes(property)) {
                return function(...args) {
                    originalConsole.log("方法:", "call ", "对象:", name,
                                       "  方法:", property,
                                       "  参数:", args);
                    return value.apply(target, args);
                };
            }

            originalConsole.log("方法:", "get  ", "对象:", name,
                               "  属性:", property,
                               "  属性类型:", typeof property,
                               "  属性值类型:", typeof value);

            return value;
        },
        set: function(target, property, value, receiver) {
            originalConsole.log("方法:", "set  ", "对象:", name,
                               "  属性:", property,
                               "  属性类型:", typeof property,
                               "  值类型:", typeof value);
            return Reflect.set(target, property, value, receiver);
        }
    });
}

// 要代理的对象列表
const proxy_array = [
    'window', 'document', 'navigator', 'localStorage',
    'sessionStorage', 'console', 'location', 'history', 'screen'
];

// 应用代理
my_proxy(proxy_array);

// 添加工具函数：启用/禁用日志
let loggingEnabled = true;

function enableLogging() {
    loggingEnabled = true;
    originalConsole.log("环境代理日志已启用");
}

function disableLogging() {
    loggingEnabled = false;
    originalConsole.log("环境代理日志已禁用");
}

// 重写代理函数，添加日志控制
function createEnvProxyWithLogControl(target, name) {
    const handler = {
        get: function(target, property, receiver) {
            const value = target[property];

            if (loggingEnabled) {
                if (name !== 'console' || !['log', 'warn', 'error', 'info', 'debug'].includes(property)) {
                    originalConsole.log("方法:", "get  ", "对象:", name,
                                       "  属性:", property,
                                       "  属性类型:", typeof property,
                                       "  属性值类型:", typeof value);
                }
            }

            return value;
        },
        set: function(target, property, value, receiver) {
            if (loggingEnabled) {
                if (name !== 'console' || !['log', 'warn', 'error', 'info', 'debug'].includes(property)) {
                    originalConsole.log("方法:", "set  ", "对象:", name,
                                       "  属性:", property,
                                       "  属性类型:", typeof property,
                                       "  值类型:", typeof value);
                }
            }

            return Reflect.set(target, property, value, receiver);
        }
    };

    return new Proxy(target, handler);
}

// 导出函数（如果是在模块环境中）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        my_proxy,
        createEnvProxy,
        createConsoleProxy,
        enableLogging,
        disableLogging
    };
}