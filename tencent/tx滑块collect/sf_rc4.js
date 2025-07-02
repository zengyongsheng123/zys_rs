function rc4(key, str) {
    // 初始化 S 盒
    let s = new Array(256);
    for (let i = 0; i < 256; i++) {
        s[i] = i;
    }

    // 密钥调度算法 (KSA)
    let j = 0;
    for (let i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        // 交换 s[i] 和 s[j]
        let temp = s[i];
        s[i] = s[j];
        s[j] = temp;
    }

    // 伪随机生成算法 (PRGA) 并加解密
    let i = 0;
    j = 0;
    let result = '';

    for (let k = 0; k < str.length; k++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        // 交换 s[i] 和 s[j]
        let temp = s[i];
        s[i] = s[j];
        s[j] = temp;
        // 生成密钥流并与输入字符进行异或
        let keyStream = s[(s[i] + s[j]) % 256];
        result += String.fromCharCode(str.charCodeAt(k) ^ keyStream);
    }

    return result;
}
timestamp = Date.now();
console.log(timestamp);
// 使用示例
function rc4Example() {
    const key = JSON.stringify(timestamp);
    const plaintext = 'sd":{"od":"C","ft":"qf_7Pf__H"}}';
    console.log("Original:", plaintext);

    // 加密
    const encrypted = rc4(key, plaintext);
    console.log("Encrypted:", encrypted);

    // 解密（对加密结果再次应用 RC4 即可解密）
    const decrypted = rc4(key, encrypted);
    console.log("Decrypted:", decrypted);
}
rc4Example();   