var target="÷ÍÊ¹ÑÒÇáî\\rØx1\u0011¦{\u0007\u0012Äf°7ÈÂ%Y\u0016Ç[æZKHÓ";
var plaintext = 'sd":{"od":"C","ft":"qf_7Pf__H"}}';
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


function get_key(){
    var maxKey=10000000;
    for (let keyNum = 0; keyNum <= maxKey; keyNum++) {
        var key = keyNum.toString(); // 将数字转换为字符串作为密钥
        var encrypted = rc4(key, plaintext);
        console.log(`Key: ${key}, Encrypted ${encrypted}`);
        // 如果需要，可以将结果保存或进一步处理
        if (encrypted === target) {
            console.log(`Key found: ${key}`);
        }

    }

    // 加密
    // var encrypted = rc4(key, plaintext);
    // console.log("Encrypted:", encrypted);

}

get_key();