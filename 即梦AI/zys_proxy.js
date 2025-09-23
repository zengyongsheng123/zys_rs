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

window = globalThis;
navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36",

};
document = {};
location = {
    "ancestorOrigins": {},
    "href": "https://jimeng.jianying.com/ai-tool/home",
    "origin": "https://jimeng.jianying.com",
    "protocol": "https:",
    "host": "jimeng.jianying.com",
    "hostname": "jimeng.jianying.com",
    "port": "",
    "pathname": "/ai-tool/home",
    "search": "",
    "hash": ""
}
history = {
    length: 1,
    scrollRestoration: "auto"
};
screen = {
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    orientation:  {angle: 0, type: 'landscape-primary', onchange: null},
    pixelDepth:24,
    width:1920
}
performance = {};
localStorage = {};
sessionStorage = {};
fetch = function (arguments) {
    console.log("fetch", arguments);
};
setTimeout = function (arguments) {
    console.log("setTimeout", arguments);
};
setInterval = function (arguments) {
    console.log("setInterval", arguments);
};
clearTimeout = {
    clearTimeout: function (arguments) {
        console.log("clearTimeout", arguments);
    }
};
clearInterval = {
    clearInterval: function (arguments) {
        console.log("clearInterval", arguments);
    }
};

// 使用示例
watch({
    requestAnimationFrame : function (arguments) {
        console.log("window的requestAnimationFrame参数为=========>", arguments)
    }
}, "window");
watch(navigator, "navigator");
watch(document, "document");
watch(location, "location");
watch(history, "history");
watch(console, "console");
watch(screen, "screen");
watch(performance, "performance");
watch(localStorage, "localStorage");
watch(sessionStorage, "sessionStorage");


// get_enviroment(["navigator", "window", "document"]);
require("./source");