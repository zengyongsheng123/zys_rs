function watch(obj, name) {
    return new Proxy(obj, {
        get: function (target, property) {
            try {
                const value = target[property];
                const valueType = typeof value;
                const displayValue = valueType === "function" ? "function" : value;

                console.log(`对象=>${name} 对象属性:${property}，值为：${displayValue}，类型为：${valueType}`);
            } catch (e) {
                // 静默处理异常
            }
            return target[property];
        },
        set: function (target, property, newValue, receiver) {
            try {
                console.log(`对象=>${name} 对象属性:${property}，值为：${newValue}，类型为：${typeof newValue}`);
            } catch (e) {
                // 静默处理异常
            }
            return Reflect.set(target, property, newValue, receiver);
        }
    });
}

function get_enviroment(proxy_array) {
    for (var i = 0; i < proxy_array.length; i++) {
        const objName = proxy_array[i];
        const handlerTemplate = {
            get: function (target, property, receiver) {
                console.log("方法:", "get  ", "对象:", objName,
                    "  属性:", property,
                    "  属性类型:", typeof property,
                    "  属性值类型:", typeof target[property]);
                return target[property];
            },
            set: function (target, property, value, receiver) {
                console.log("方法:", "set  ", "对象:", objName,
                    "  属性:", property,
                    "  属性类型:", typeof property,
                    "  属性值类型:", typeof target[property]);
                return Reflect.set(...arguments);
            }
        };

        try {
            // 尝试获取对象
            const targetObj = eval(objName);
            // 创建代理
            eval(`${objName} = new Proxy(targetObj, handlerTemplate)`);
        } catch (e) {
            // 如果对象不存在，创建一个空对象并代理它
            eval(`${objName} = {}`);
            eval(`${objName} = new Proxy(${objName}, handlerTemplate)`);
        }
    }
}

get_enviroment(["navigator", "window", "document", "localStorage", "sessionStorage", "location", "history", "screen"]);
// require("./source");
// require("./tmp");