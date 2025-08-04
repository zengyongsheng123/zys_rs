function main(OBJECT,proto){
    let tempProto = OBJECT;
    while (true) {
        tempProto = tempProto.__proto__;
        if(tempProto == null){ // 因为我们之前讲过，原型链最终点是指向null，如果为null，就说明链条已到末端
            console.error("在实例原型链中未找到指定原型模板");
            break;
        };
        if(tempProto.constructor == proto){
            // 此处就说明我们找到了，就可以进行其他操作;
            console.log(getProto(OBJECT,proto));
            console.info("在实例原型链中找到指定原型模板");
            break;
        };
    };
};
function getProto(OBJECT,proto){
    let JsCode =
        `
            ${proto.name} = function ${proto.name}(){
                debugger;
            };
        \r\n`;

    let names = Object.getOwnPropertyNames(proto.prototype);
    for(let i = 0;i < names.length; i++){
        const msf = Object.getOwnPropertyDescriptor(proto.prototype,names[i]);
        console.log(msf);
        const value = typeof msf['value'] == 'function' ? `function ${msf['value'].name}(){ debugger; }` : msf['value'] == undefined ? `undefined` : `(function (){ debugger; })()`
        const set = msf['set'] == undefined ? `undefined` : `function set(){ debugger; }`;
        const get = msf['get'] == undefined ? `undefined` : `function get(){ debugger; }`;
        JsCode += `
        Object.defineProperty(${proto.name}.prototype,"${names[i]}",{
            configurable: ${msf['configurable']},
            enumerable: ${msf['enumerable']},
            ${msf['writable'] == undefined ? "" : `writable: ${msf['writable']},`}
            ${msf['value'] == undefined ? "" : `value: ${value},`}
            ${msf['set'] == undefined ? "" : `set: ${set},`}
            ${msf['get'] == undefined ? "" : `get: ${get},`}
        }); \r\n`

        if(msf['get'] != undefined){
            JsCode +=
            `Object.defineProperty(Object.getOwnPropertyDescriptor(${proto.name}.prototype,"${names[i]}").get,"name",{
                value: "get " + "${names[i]}",
                configurable: true,
                enumerable: true,
                writable: true
            });`
        };
        if(msf['set'] != undefined){
            JsCode +=
            `Object.defineProperty(Object.getOwnPropertyDescriptor(${proto.name}.prototype,"${names[i]}").set,"name",{
                value: "set " + "${names[i]}",
                configurable: true,
                enumerable: true,
                writable: true
            });`
        }
    };
    return JsCode;
}