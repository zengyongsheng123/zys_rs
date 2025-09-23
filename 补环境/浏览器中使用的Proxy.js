watch = function (obj, name) {
    return new Proxy(obj, {
        get(target, p, receiver) {
            if (p === Symbol.toPrimitive || p === Symbol.toStringTag || p === "Math" || p === "isNaN" || p === "encodeURI" || p === "Uint8Array") {
                return Reflect.get(target, p, receiver);
            }

            const value = Reflect.get(target, p, target); // 直接从 target 获取值，确保 this 指向正确

            console.log('取值:', name, '.', p, '=>', value);

                 if(p==='data'){
                     debugger
                 }

            return value;
        },
        set(target, p, newValue, receiver) {
            const oldValue = Reflect.get(target, p, target);
            if(p===''){}
            console.log(`设置值${name}.${p},${oldValue}=>${newValue}`);

       return Reflect.set(target, p, newValue, receiver);
        },
        // apply(target, thisArg, args) {
        //     debugger
        //     console.log(`${name}方法接收了`, args);
        //     debugger
        //     return target.apply(thisArg, args);
        // },
        // construct(target, args, newTarget) {
        //     console.log(`${name}方法构造参数接收了`, args);
        //     debugger
        //     return {}
        //     // return new (Function.prototype.bind.apply(target, [null, ...args]))();
        // },
        // getPrototypeOf(target) {
        //     console.log(`利用getPrototypeOf获取${name}对象中的原型链属性`);
        //     return  Reflect.getPrototypeOf(target);
        // },
    });
}


