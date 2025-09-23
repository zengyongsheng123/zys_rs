function get_enviroment(proxy_array) {
    let handler;
    for (var i = 0; i < proxy_array.length; i++) {
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
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
proxy_array = ['window', 'document', 'location', 'navigator', 'history','screen', 'aaa', 'target' ]
get_enviroment(proxy_array)

function obj_toString(obj, name) {
  Object.defineProperty(obj, Symbol.toStringTag, {
    value: name,
  });
}

// prototype
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

window = watch(window, "window");
document = watch(document, "document")
navigator = watch(navigator, "navigator")
location = watch(location, "location")
history = watch(history, "history")
screen = watch(screen, "screen")
localStorage = watch(localStorage, "localStorage")


(function () {
    const originalToString = Function.prototype.toString;
    Function.prototype.toString = function () {
        console.log('发现调用了toString-->', originalToString.apply(this));
        // debugger
        return originalToString.apply(this);
    };
})();
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

proxy_array = ['window.location', 'window.chrome', 'window.navigator', 'window.screen', 'window.document', 'window.history', 'window.navigator', 'window', 'document', 'Location', 'navigator', 'history', 'screen', 'target', 'window.self', 'globalThis']



// 新检测代理0.1版本
function watch(obj, name) {
    const isProxyActive = Symbol("isProxyActive");
    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                const value = target[property];
                if (value === undefined && !receiver[isProxyActive]) {
                    const protoChainNeeded = !Object.getPrototypeOf(target).hasOwnProperty(property);
                    const descriptor = Object.getOwnPropertyDescriptor(target, property) || {};
                    const toStringDesc = descriptor.toString || (descriptor.get && descriptor.get.toString());
                    console.log(`${name}.${property} 读取: ${String(value)} (${typeof value}), 补原型链: ${protoChainNeeded}, toString: ${toStringDesc || '无'}`);
                }
            } catch (e) {}
            return target[property];
        },
        set: (target, property, newValue, receiver) => {
            try {
                if (!receiver[isProxyActive]) {
                    const displayValue = String(newValue);
                    if (displayValue.length <= 50) {
                        const protoChainNeeded = !Object.getPrototypeOf(target).hasOwnProperty(property);
                        const descriptor = Object.getOwnPropertyDescriptor(target, property) || {};
                        const toStringDesc = descriptor.toString || (descriptor.get && descriptor.get.toString());
                        console.log(`${name}.${property} 设置: ${displayValue} (${typeof newValue}), 补原型链: ${protoChainNeeded}, toString: ${toStringDesc || '无'}`);
                    }
                }
            } catch (e) {}
            return Reflect.set(target, property, newValue, receiver);
        }
    });
}

// 0.1优化版本
function watch(obj, name) {
    // 使用WeakMap存储原始对象到代理的映射，避免重复代理
    const proxyMap = new WeakMap();

    // 内部标记，用于避免代理内部操作触发循环
    const IS_INTERNAL_PROXY_OPERATION = Symbol("isInternalProxyOperation");

    return new Proxy(obj, {
        get: function (target, property, receiver) {
            // 如果是内部操作（比如代理自身在访问属性），则不打印日志
            if (property === IS_INTERNAL_PROXY_OPERATION) {
                return true;
            }

            const value = Reflect.get(target, property, receiver);

            try {
                // 判断属性是否在对象自身或原型链上定义
                const hasOwnOrProto = Object.prototype.hasOwnProperty.call(target, property) ||
                                     Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(target), property);

                // 获取属性描述符
                const descriptor = Object.getOwnPropertyDescriptor(target, property);
                let descriptorInfo = '无描述符';
                if (descriptor) {
                    descriptorInfo = JSON.stringify(descriptor, (key, val) => {
                        // 对于函数类型的get/set，只保留一小段字符串
                        if (typeof val === 'function' && (key === 'get' || key === 'set')) {
                            return val.toString().substring(0, 50) + '...';
                        }
                        return val;
                    });
                }

                // 只有当属性未定义，或者你在关注所有读取时才打印
                // 这里我们假设你主要关注 'undefined' 的情况，并进行了简化
                if (value === undefined && !hasOwnOrProto) { // 仅当属性在对象自身和原型链上都不存在时
                    let valueToString = 'N/A';
                    if ((typeof value === 'object' || typeof value === 'function')) {
                        try {
                            valueToString = value.toString();
                        } catch (e) {
                            valueToString = `toString() error: ${e.message}`;
                        }
                    } else if (value !== undefined) { // 对于非 undefined 的原始类型，直接转字符串
                        valueToString = String(value);
                    }

                    console.log(`[GET] ${name}.${String(property)}: ` +
                                `值=${String(value)} (${typeof value}), ` +
                                `补原型链=${!hasOwnOrProto}, ` +
                                `值toString='${valueToString}', ` +
                                `描述符=${descriptorInfo}`);
                }
            } catch (e) {
                // 捕获日志打印过程中的错误，不影响主逻辑
                console.error(`Error logging GET for ${name}.${String(property)}:`, e);
            }

            // 如果获取到的是对象或函数，且之前未代理过，则对其进行嵌套代理
            if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
                if (!proxyMap.has(value)) {
                    const nestedProxy = watch(value, `${name}.${String(property)}`);
                    proxyMap.set(value, nestedProxy);
                    return nestedProxy;
                }
                return proxyMap.get(value);
            }

            return value;
        },
        set: (target, property, newValue, receiver) => {
            // 如果是内部操作，则不打印日志
            if (property === IS_INTERNAL_PROXY_OPERATION) {
                return Reflect.set(target, property, newValue, receiver);
            }

            try {
                const oldValue = Reflect.get(target, property, receiver);

                // 判断属性是否在对象自身或原型链上定义
                const hasOwnOrProto = Object.prototype.hasOwnProperty.call(target, property) ||
                                     Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(target), property);

                // 获取属性描述符
                const descriptor = Object.getOwnPropertyDescriptor(target, property);
                let descriptorInfo = '无描述符';
                if (descriptor) {
                    descriptorInfo = JSON.stringify(descriptor, (key, val) => {
                        if (typeof val === 'function' && (key === 'get' || key === 'set')) {
                            return val.toString().substring(0, 50) + '...';
                        }
                        return val;
                    });
                }

                let newValueDisplay = String(newValue);
                if (newValueDisplay.length > 100) { // 截断过长的字符串以保持日志可读性
                    newValueDisplay = newValueDisplay.substring(0, 100) + '... (truncated)';
                }

                console.log(`[SET] ${name}.${String(property)}: ` +
                            `旧值=${String(oldValue)} (${typeof oldValue}), ` +
                            `新值=${newValueDisplay} (${typeof newValue}), ` +
                            `补原型链=${!hasOwnOrProto}, ` +
                            `描述符=${descriptorInfo}`);

            } catch (e) {
                console.error(`Error logging SET for ${name}.${String(property)}:`, e);
            }

            return Reflect.set(target, property, newValue, receiver);
        },
        // 也可以考虑拦截 deleteProperty, defineProperty 等操作
        defineProperty(target, property, descriptor) {
            console.log(`[DEFINE] ${name}.${String(property)}: 定义描述符=${JSON.stringify(descriptor)}`);
            return Reflect.defineProperty(target, property, descriptor);
        },
        deleteProperty(target, property) {
            console.log(`[DELETE] ${name}.${String(property)}`);
            return Reflect.deleteProperty(target, property);
        }
    });
}


// 0.3版本  海外补环境 akamai  re84  cf盾  不稳定 优化
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
                if (name === "navigator" && property === "platform") {
                    console.log(`对象 => ${name}, 特殊处理属性: ${String(property)}, 模拟值为: Win32`); // 你可以根据需要修改模拟值
                    return "Win32"; // 直接返回一个你想要的模拟值，绕过原生访问
                }
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



// 安卓:
// watch.js
Java.perform(function () {

    // WeakSet 模拟，用于防止循环引用和重复代理
    // 在Frida的JS环境中，我们可以直接使用JS的WeakSet
    const visited = new WeakSet();

    /**
     * 深度监听 Java 对象的方法和字段访问。
     * 模拟 JavaScript Proxy 的行为。
     * @param {Java.Wrapper} javaObj 要监听的 Java 对象实例。
     * @param {string} name 对象的名称，用于日志输出。
     */
    function watchJavaObject(javaObj, name) {
        // 防止循环引用或非对象类型
        if (!javaObj || typeof javaObj !== 'object' || visited.has(javaObj)) {
            return javaObj;
        }

        visited.add(javaObj);

        const javaClassName = javaObj.$className || 'UnknownClass';
        console.log(`[+] 正在监听 Java 对象: ${name} (类型: ${javaClassName})`);

        // 遍历所有方法并进行 Hook
        const methods = Java.cast(javaObj.getClass(), Java.use('java.lang.Class')).getDeclaredMethods();
        methods.forEach(function (method) {
            const methodName = method.getName();
            const argTypes = method.getParameterTypes().map(t => t.getName());
            const returnType = method.getReturnType().getName();
            const fullMethodSignature = `${returnType} ${methodName}(${argTypes.join(', ')})`;

            try {
                // Hook 方法的重载，Frida 允许你Hook所有重载
                const methodHook = Java.use(javaClassName)[methodName];

                // 检查是否有重载，并选择合适的Hook点
                if (methodHook.overloads) {
                    methodHook.overloads.forEach(function(overload) {
                        overload.implementation = function () {
                            const args = Array.from(arguments);
                            console.log(`对象 => ${name}, 调用方法: ${methodName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`);

                            // 调用原始方法
                            const result = this[methodName].apply(this, arguments);

                            // 如果返回值是对象，尝试深度监听
                            if (result && typeof result === 'object' && !visited.has(result)) {
                                const nestedName = `${name}.${methodName}Result`;
                                watchJavaObject(result, nestedName);
                            }
                            console.log(`对象 => ${name}, 方法 ${methodName} 返回值: ${JSON.stringify(result)}`);
                            return result;
                        };
                    });
                } else { // 单个方法（无重载）
                    methodHook.implementation = function () {
                        const args = Array.from(arguments);
                        console.log(`对象 => ${name}, 调用方法: ${methodName}(${args.map(arg => JSON.stringify(arg)).join(', ')})`);
                        const result = this[methodName].apply(this, arguments);
                        if (result && typeof result === 'object' && !visited.has(result)) {
                            const nestedName = `${name}.${methodName}Result`;
                            watchJavaObject(result, nestedName);
                        }
                        console.log(`对象 => ${name}, 方法 ${methodName} 返回值: ${JSON.stringify(result)}`);
                        return result;
                    };
                }
            } catch (e) {
                // 忽略无法Hook的方法，例如 native 方法或构造函数
                // console.warn(`[-] 无法 Hook 方法 ${javaClassName}.${fullMethodSignature}: ${e.message}`);
            }
        });

        // 遍历所有字段并进行 Hook （Java 没有直接的 Proxy get/set 陷阱，需要通过 Hook 字段的 Getter/Setter 或直接 Hook 访问点）
        // 对于公开字段，我们可以通过 Hook 构造函数或相关方法来观察其赋值
        // 对于 private 字段，通常需要 Hook 访问这些字段的方法
        const fields = Java.cast(javaObj.getClass(), Java.use('java.lang.Class')).getDeclaredFields();
        fields.forEach(function (field) {
            const fieldName = field.getName();
            const fieldType = field.getType().getName();
            const modifiers = field.getModifiers(); // 获取字段的修饰符

            // 检查字段修饰符
            const isStatic = Java.use('java.lang.reflect.Modifier').isStatic(modifiers);
            const isFinal = Java.use('java.lang.reflect.Modifier').isFinal(modifiers);

            // 打印字段信息，模拟描述符检测
            if (isStatic) {
                console.log(`特殊检测: 静态字段 (对象: ${name}, 字段: ${fieldName})`);
            }
            if (isFinal) {
                console.log(`特殊检测: Final字段 (对象: ${name}, 字段: ${fieldName})`);
            }

            // 对于 public 字段，尝试在运行时直接读取其值
            try {
                // 这里无法像 JS Proxy 那样直接 Hook 字段的读取和写入
                // 但我们可以通过 Hook 构造函数或对字段进行访问的方法来观察
                // 或者在某些场景下，我们可以直接读取其值
                const fieldValue = javaObj[fieldName]; // 尝试直接访问字段
                if (fieldValue === undefined) { // 模拟 JS Proxy undefined 打印
                    console.log(`对象 => ${name}, 读取字段: ${fieldName}, 值为: undefined, 类型为: ${typeof fieldValue}`);
                }
                if (fieldValue && typeof fieldValue === 'object' && !visited.has(fieldValue)) {
                    // 如果字段值是对象，进行深度监听
                    watchJavaObject(fieldValue, `${name}.${fieldName}`);
                }
            } catch (e) {
                // 忽略无法访问的字段，例如 private 字段
                // console.warn(`[-] 无法直接读取字段 ${javaClassName}.${fieldName}: ${e.message}`);
            }
        });

        // 模拟原型链检测 (Java 中的继承关系)
        let currentClass = javaObj.getClass();
        while (currentClass) {
            const superclass = currentClass.getSuperclass();
            if (superclass && superclass !== Java.use('java.lang.Object').class) {
                console.log(`原型链检测:true (对象: ${name}, 继承自: ${superclass.getName()})`);
                // 也可以递归地监听父类的方法，但这可能导致大量输出和复杂性
                // watchJavaObject(Java.cast(javaObj, superclass), `${name}.superclass`);
            }
            currentClass = superclass;
        }

        return javaObj;
    }

    // --- 应用到特定的 Java 类实例 ---
    // 这里以 Hook Android 的 ApplicationContext 为例
    // 你需要根据你的目标应用来确定要Hook的Java对象和类

    // 方式一：Hook 已存在的对象实例 (例如通过获取当前上下文)
    // 这种方式通常用于Hook已知全局单例或上下文对象
    Java.choose("android.app.ActivityThread", {
        onMatch: function(instance) {
            const app = instance.getApplication();
            if (app) {
                console.log("[*] 发现 ApplicationContext, 尝试监听...");
                watchJavaObject(app.getApplicationContext(), "ApplicationContext");
            }
        },
        onComplete: function() {
            console.log("[*] ApplicationContext 查找完成.");
        }
    });

    // 方式二：Hook 类的构造函数或特定方法来获取新实例并监听
    // 适用于需要监听某个类的所有新创建实例的情况
    const Toast = Java.use('android.widget.Toast');
    Toast.show.implementation = function () {
        console.log("[*] Toast.show() 被调用！");
        // 监听 Toast 实例本身
        // watchJavaObject(this, "ToastInstance"); // this 就是 Toast 实例
        return this.show.apply(this, arguments);
    };

    // 示例：监听 Activity 的生命周期方法
    const Activity = Java.use('android.app.Activity');
    Activity.onCreate.implementation = function (bundle) {
        console.log(`[+] Activity: ${this.$className} onCreate 被调用！`);
        // 监听当前的 Activity 实例
        // watchJavaObject(this, `Activity:${this.$className}`);
        this.onCreate(bundle); // 调用原始方法
    };

    // 示例：如果你想监听某个特定包名下的所有类，可以这样操作
    /*
    const packageName = "com.example.myapp"; // 替换为你的目标包名
    Java.enumerateLoadedClassesSync().forEach(function(className) {
        if (className.startsWith(packageName)) {
            try {
                const targetClass = Java.use(className);
                // 遍历并 Hook 这个类的所有方法
                // 但要小心，这可能导致巨大的性能开销和崩溃
                // console.log(`[+] 发现类: ${className}`);
                // watchJavaObject(targetClass.$new(), className); // 尝试创建实例并监听
            } catch(e) {
                // console.warn(`[-] 无法Hook类 ${className}: ${e.message}`);
            }
        }
    });
    */

});




