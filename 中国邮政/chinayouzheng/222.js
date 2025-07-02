window = global;
const weba = require('./weba.js');

const HASH_KEY = "f6d4071c1aa5133ba2ca35801749d792869a8a3127548916c96ec9ec687f8999";
let cachedModule = null;

async function get_print(miid, deviceId, rc) {
    try {
        if (!cachedModule) cachedModule = await weba();
        const Module = cachedModule;

        console.log("Input:", { miid, deviceId, rc });

        const _0x3f32cd = miid + "|" + HASH_KEY;
        const _0x2b9afb = {
            hitId: miid,
            deviceId: deviceId,
            weight: 0.2,
            print: _0x3f32cd
        };

        let _0x342a24 = null;
        window[_0x2b9afb.deviceId] = function () {
            return _0x342a24 = Module.allocateUTF8(rc);
        };

        const _0x32f34d = Module.allocateUTF8(JSON.stringify(_0x2b9afb));
        // console.log("Input JSON:", JSON.stringify(_0x2b9afb));
        const _0x528dd9 = Module._rotate(_0x32f34d);
        // console.log("Rotate result pointer:", _0x528dd9);

        if (!_0x528dd9) throw new Error("Rotate returned null or invalid pointer");

        const result = Module.UTF8ToString(_0x528dd9);
        // console.log("Raw result:", result); // 调试输出

        Module._free(_0x32f34d);
        Module._free(_0x528dd9);
        if (_0x342a24) Module._free(_0x342a24);

        const parsedResult = JSON.parse(result);
        // console.log("Parsed result:", parsedResult);
        return parsedResult;
    } catch (error) {
        console.error("Error in get_print:", error.message);
        throw error;
    }
}

// 从命令行获取参数
const [miid, deviceId, rc] = process.argv.slice(2);

// 执行并输出结果
get_print(miid, deviceId, rc)
    .then(result => console.log(JSON.stringify(result)))
    .catch(err => {
        console.error("Error:", err.message);
        process.exit(1);
    });