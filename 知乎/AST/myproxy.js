
function myProxy(obj,name){
    return new Proxy(obj,{
        get(target, propKey, receiver){ //拦截对象属性的读取，比如proxy.foo和proxy['foo']。
            let temp = Reflect.get(target,propKey,receiver);
            console.log(`${name} -> get ${propKey.toString()} return -> ${temp}`);
            if(typeof temp == 'object') {
                temp = myProxy(temp,name + " => " + propKey)
            }
            return temp;
        },
        set(target, propKey, value, receiver){ //拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
            const temp = Reflect.set(target,propKey,value,receiver);
            console.log(`${name} -> set ${propKey} value -> ${value}`);
            return temp;
        },
        has(target, propKey){ //拦截propKey in proxy的操作，返回一个布尔值。
            const temp = Reflect.has(target,propKey);
            console.log(`${name} -> has ${propKey.toString()}`);
            return temp;
        },
        deleteProperty(target, propKey){ //拦截delete proxy[propKey]的操作，返回一个布尔值。
            const temp = Reflect.deleteProperty(target,propKey);
            console.log(`${name} -> deleteProperty ${propKey}`);
            return temp;
        },
        ownKeys(target){ //拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)、for...in循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
            const temp = Reflect.ownKeys(target);
            console.log(`${name} -> ownKeys ${temp}`);
            return temp;
        },
        getOwnPropertyDescriptor(target, propKey){ //拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
            const temp = Reflect.getOwnPropertyDescriptor(target,propKey);
            return temp;
        },
        defineProperty(target, propKey, propDesc){ //拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
            const temp = Reflect.defineProperty(target,propKey,propDesc);
            return temp;
        },
        preventExtensions(target){ //拦截Object.preventExtensions(proxy)，返回一个布尔值。
            const temp = Reflect.preventExtensions(target);
            return temp;
        },
        getPrototypeOf(target){ //拦截Object.getPrototypeOf(proxy)，返回一个对象。
            const temp = Reflect.getPrototypeOf(target);
            return temp;
        },
        isExtensible(target){ //拦截Object.isExtensible(proxy)，返回一个布尔值。
            const temp = Reflect.isExtensible(target);
            return temp;
        },
        setPrototypeOf(target, proto){ //拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
            const temp = Reflect.setPrototypeOf(target,proto);
            return temp;
        },
        apply(target, object, args){ //拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
            const temp = Reflect.apply(target, object, args);
            return temp;
        },
        construct(target, args){ //拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
            const temp = Reflect.construct(target, args);
            return temp;
        }
    })
}

window = global;
document = {
    getElementById: function (arg){
        console.log('document中的getElementById的参数为==>', arg);
        if (arg === 'zh-zse-ck')
            return {
                getAttribute: function (arg){
                    console.log('getElementById中的getAttribute的参数为==>', arg);
                    return {
                        content: ''
                    }
                }
            }
    },
    getElementsByTagName: function (arg){
        console.log('document中的getElementsByTagName的参数为==>', arg);
        if (arg === 'meta') {
            return {
                getAttribute: function (arg){
                    console.log('getElementsByTagName中的getAttribute的参数为==>', arg);
                    return {
                        content:''
                    }
                }
            }
        }
            },

};
sessionStorage = {
    getItem: function (arg){
        console.log('sessionStorage中的getItem的参数为==>', arg);
        return {}
    },
    setItem: function (arg1, arg2){
        console.log('sessionStorage中的setItem的参数为==>', arg1, arg2);
        return {
        }
    }
};
location = {
    "ancestorOrigins": {},
    "href": "https://zhuanlan.zhihu.com/p/1928426288277877394",
    "origin": "https://zhuanlan.zhihu.com",
    "protocol": "https:",
    "host": "zhuanlan.zhihu.com",
    "hostname": "zhuanlan.zhihu.com",
    "port": "",
    "pathname": "/p/1928426288277877394",
    "search": "",
    "hash": "",
    "reload": function(arg1){
        console.log('window.reload的参数为==>', arg1);
    }
}
navigator = {
    'useAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
}
localStorage = {
    'getItem': function(key){
        console.log('localStorage.getItem的参数为==>', key);
    }
}

myProxy(window,'window')
myProxy(document,'document')
myProxy(sessionStorage,'sessionStorage')
myProxy(localStorage,'localStorage')
myProxy(navigator,'navigator')
myProxy(location,'location')
// myProxy(screen,'screen')
// myProxy(history,'history')
// myProxy(performance,'performance')
// myProxy(console,'console')
// myProxy(reload,'reload')
require('./output')
// 004_/rtVXhxpCQm8Z3DkA=/EPhyCfGJB2W1s49aqTuNBF4X=c3QwHdabBnh=1jcaDK2aKkNaiNblFaF1MF64iBFbCOnZZQL9f69ci2/1Y1Mdc5eEL144y2Vflv3lrA5489Nu-v5Al4C2GobwSX/W/0v566ohGT7g6+lz+Q8ulsB7sOJgTxpVBo0SYx+zHF0CdU564FNETQeZ58rXq144pT+DwlvX4mhBsHgq6JNED29qGLJHbs++1iv3YwvJ6/X9m0dI8
