const fs = require('fs');
async function runEncrypt(page, ts) {
    try {
        // 确保 WASM 文件路径正确
        const wasmBuffer = fs.readFileSync('e4ddd62a');
        const module = await WebAssembly.instantiate(wasmBuffer, { env: {} });
        const encrypt = module.instance.exports.encrypt;

        // 直接返回 encrypt 的结果（同步调用）
        return encrypt(page, ts);
    } catch (error) {
        console.error('Error in runEncrypt:', error);
        throw error; // 或根据需要处理错误
    }
}

async function get_m(page, ts) {
    console.log(await runEncrypt(page, ts));
    return await runEncrypt(page, ts); // 等待 runEncrypt 完成
}

const [,, page, ts] = process.argv;
// 使用 async/await 调用 get_m
(async () => {
    try {
        return await get_m(parseInt(page), parseInt(ts));
    } catch (error) {
        console.error('Error in get_m:', error);
    }
})();