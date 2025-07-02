function detectionEnv(proxy_name_array, out_call = true, out_fault = true) {
    require('colors');
    const beautify = require("js-beautify");

    const createHandler = ({obj_name, env_path = undefined, env_value = undefined}) => {
        const handler = {
            get: function (target, property, receiver) {
                const value = Reflect.get(target, property, receiver);
                // 如果是symbol就直接返回
                try {
                    if (typeof property === 'symbol') {
                        return value
                    }
                } catch (e) {
                    console.log(`1.${e}`, property);
                }

                // 拼接路径
                let envPath = "";
                try {
                    envPath = `${env_path || obj_name}.${property}`;
                } catch (e) {
                    console.log(`2.${e}`, property, property === Symbol.toStringTag);
                }

                // 递归判断
                try {
                    if (typeof value === 'object' && value !== null && value !== undefined) {
                        const env_path_tag = envPath.split(".").pop();
                        if (out_call && propertyPath.exists(envPath) && env_value && env_path_tag === property) {
                            console.log(`方法：get  |  1.调用环境方法：${envPath}  |  属性：${property}  |  属性类型：${typeof property}  |  属性值类型：${typeof value}`.green);
                        }

                        envPath !== "" && propertyPath.set("get", envPath)
                        // 递归调用
                        return createHandler({obj_name: value, env_path: envPath, env_value: obj_name});
                    }
                } catch (e) {
                    console.log(`3.${e}`, property);
                }

                // 日志输出
                try {
                    if (propertyPath.exists("get", envPath)) {
                        if (out_fault && value === undefined) {
                            console.log(`方法：get  |  1.缺失环境方法：${envPath}  |  属性：${property}  |  属性类型：${typeof property}  |  属性值类型：${typeof value}`.red);
                        } else {
                            out_call && console.log(`方法：get  |  2.调用环境方法：${envPath}  |  属性：${property}  |  属性类型：${typeof property}  |  属性值类型：${typeof value}`.cyan);
                        }
                    }
                } catch (e) {
                    console.log(`3.${e}`, property);
                }

                envPath !== "" && propertyPath.set("get", envPath)
                return value;
            },

            set: function (target, property, value, receiver) {
                console.log(`方法：set    对象：${obj_name}    属性：${property}    属性类型：${typeof property}    属性值类型：${typeof value}`.blue);
                return Reflect.set(target, property, value, receiver);
            },

            deleteProperty: function (target, propKey) {
                console.log(`方法:deleteProperty    |    删除属性：${propKey}`.yellow);
                return Reflect.deleteProperty(target, propKey);
            },

            apply: function (target, thisArg, argumentsList) {
                console.log(`方法:apply    |    调用函数：${target.name || 'anonymous'}`.yellow);
                return Reflect.apply(target, thisArg, argumentsList);
            },

            construct: function (target, argumentsList, newTarget) {
                console.log(`方法:construct    |    构造函数：${target.name || 'anonymous'}`.yellow);
                return Reflect.construct(target, argumentsList, newTarget);
            },

            defineProperty: function (target, property, descriptor) {
                console.log(`方法:defineProperty    |    定义属性：${property}`.yellow);
                return Reflect.defineProperty(target, property, descriptor);
            },

            getOwnPropertyDescriptor: function (target, property) {
                console.log(`方法:getOwnPropertyDescriptor    |    获取属性描述符：${property}`.yellow);
                return Reflect.getOwnPropertyDescriptor(target, property);
            },

            getPrototypeOf: function (target) {
                console.log(`方法:getPrototypeOf    |    获取原型`.yellow);
                return Reflect.getPrototypeOf(target);
            },

            setPrototypeOf: function (target, prototype) {
                console.log(`方法:setPrototypeOf    |    设置原型${prototype}`.yellow);
                return Reflect.setPrototypeOf(target, prototype);
            },

            isExtensible: function (target) {
                console.log(`方法:isExtensible    |    检查是否可扩展`.yellow);
                return Reflect.isExtensible(target);
            },

            preventExtensions: function (target) {
                console.log(`方法:preventExtensions    |    阻止扩展`.yellow);
                return Reflect.preventExtensions(target);
            },

            has: function (target, property) {
                console.log(`方法:has    |    检查属性是否存在：${property}`.yellow);
                return Reflect.has(target, property);
            },

            ownKeys: function (target) {
                console.log(`方法:ownKeys    |    获取自身属性键`.yellow);
                return Reflect.ownKeys(target);
            }
        };

        if (env_path === undefined) {
            let handlerString = "{" + Object.entries(handler).map(([key, value]) => {
                return `${key}: ${value.toString()}`
            }).join(",\n") + "}";
            handlerString = beautify(handlerString, {indent_size: 2, space_in_empty_paren: true});

            const name = obj_name.toUpperCase() === "window".toUpperCase() ? "global" : "Object.create({})"
            // 开始代理
            return eval(`
                try {
                    ${obj_name} = new Proxy(${obj_name}, ${handlerString});
                } catch (e) {
                    console.log(("未定义 " + obj_name + " 默认赋值为: ${name}").red);
                    ${obj_name} = new Proxy(${name}, ${handlerString});
                }`);
        }

        // 递归
        return new Proxy(obj_name, handler);
    }

    const propertyPath = new class {
        constructor() {
            this.PropertyPath = new Map();
        }

        exists(key, property_path) {
            let property_path_set = this.get(key);
            return !property_path_set.has(property_path);
        }

        get(key) {
            let property_path_set = this.PropertyPath.get(key.toLowerCase());
            if (!property_path_set) {
                property_path_set = new Set();
            }
            return property_path_set;
        }

        set(key, property_path) {
            let property_path_set = this.get(key);
            property_path_set.add(property_path);
            this.PropertyPath.set(key.toLowerCase(), property_path_set);
        }
    }
    proxy_name_array.forEach(obj_name => createHandler({obj_name: obj_name}));
}
const proxy_array = [
    "baseSelector.hqrW1", "baseSelector.footerText", "baseSelector.xnSV0", "baseSelector.frHelperLoopLink",
    "alert", "window", "body", "document", "history", "getContext", "localStorage", "location", "navigator", "sessionStorage", "XMLHttpRequest",
    "WebSocket", "requestAnimationFrame", "getElementsByTagName", "getElementsByClassName",
    "cancelAnimationFrame", "addEventListener", "removeEventListener", "dispatchEvent", "FileReader", "Worker",
    "SharedWorker", "AudioContext", "WebGLRenderingContext", "WebGL2RenderingContext", "Audio", "Video", "Image",
    "indexedDB", "canvas", "screen"
];
detectionEnv(proxy_array, true, true);