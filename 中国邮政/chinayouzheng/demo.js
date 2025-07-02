require('./weba.js');
function get_print(miid,deviceId,rc) {
    var _0x3f32cd = miid + "|" + "f6d4071c1aa5133ba2ca35801749d792869a8a3127548916c96ec9ec687f8999";
    var _0x2b9afb = {
        hitId: miid,
        deviceId: deviceId,
        weight: 0.2,
        print: _0x3f32cd
    };
    console.log(_0x2b9afb);
    var _0x342a24 = null;
// window[_0x2b9afb.deviceId] = function (rc) {  // 这里后面要写活
    window[_0x2b9afb.deviceId] = function () {  // 这里后面要写活
        return _0x342a24 = allocateUTF8(rc);
    };
    _0x26183d._free(_0x32f34d);
    _0x26183d._free(_0x528dd9);
    _0x26183d._free(_0x342a24);
    return JSON.parse(_0x26183d.UTF8ToString(_0x26183d._rotate(allocateUTF8(JSON.stringify(_0x2b9afb)))));//  这里后面要写活而且是调用wasm里面的方法
}

