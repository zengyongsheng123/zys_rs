const weba = require('./weba.js');
window = global;
function get_print(miid,deviceId,rc) {
    weba().then(function (Module) {
    var _0x3f32cd = miid + "|" + "f6d4071c1aa5133ba2ca35801749d792869a8a3127548916c96ec9ec687f8999";
    var _0x2b9afb = {
        hitId: miid,
        deviceId: deviceId,
        weight: 0.2,
        print: _0x3f32cd
    };
    var _0x342a24 = null;
    window[_0x2b9afb.deviceId] = function () {
        return _0x342a24 = Module.allocateUTF8(rc);
    };
    var _0x32f34d = Module.allocateUTF8(JSON.stringify(_0x2b9afb));
    // console.log(_0x32f34d);
    var _0x528dd9 = Module._rotate(_0x32f34d);
    Module._free(_0x32f34d);
    Module._free(_0x528dd9);
    Module._free(_0x342a24);
    result = Module.UTF8ToString(_0x528dd9)
        console.log(JSON.parse(result));//  这里后面要写活而且是调用wasm里面的方法
    return JSON.parse(result);//  这里后面要写活而且是调用wasm里面的方法

})
}

get_print("bb6597cf-ad44-47ed-b744-17034ece11fc","ysQqSy3hUmJVDDb5IeSvi8Gh3cuwwDZJ4ZpQuFSdQcrmauCGzgMHZ9DzDF","PQwSxMdl27O99IBdcWl43eBYNigrISLOCH/Oy899d7+Zsj0Fxq6Mh42ItFQ9es0H")
