const CryptoJS = require("crypto-js");
// token = "kujia-1748437844943-bbff4f8e5e1d98"
stamp = new Date().getTime();
console.log('当前时间戳值为===========>',stamp);
token = "kujia-" + stamp + "-bbff4f8e5e1d98"

p1 = 'b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F' + '^^' + token + '^^' + 'kujia' + '^^' + "kujia_web";
console.log('p1的值为=====>',p1);
function QOoooO(o0QQQ) {
    // 提取输入字符串的特定部分
    const Q0OOo = [
        o0QQQ.charAt("0123456789abcdef".indexOf(o0QQQ[0])),
        o0QQQ.substring(1, 4),
        o0QQQ.substring(4, 14),
        o0QQQ.substring(14, 22),
        o0QQQ.substring(22, 23)
    ];

    // 预定义字符集
    const OQQ0o = [
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
    ];

    // 随机选取三个字符
    const OOOoO = [
        OQQ0o[Math.floor(Math.random() * 62)],
        OQQ0o[Math.floor(Math.random() * 62)],
        OQQ0o[Math.floor(Math.random() * 62)]
    ];

    // 组合生成 8 字符字符串
    return `${Q0OOo[0]}${Q0OOo[1]}${OOOoO[0]}${Q0OOo[2]}${OOOoO[1]}${Q0OOo[3]}${OOOoO[2]}${Q0OOo[4]}`;
}

// blackbox = 'rWPH31748437542lRx0IgcmAX7'

blackbox = QOoooO("bWPH1748437542Rx0IgcmA7")
// console.log(blackbox);
// p2第一个1是指获取验证码时候的请求类型，第一个为2的时候是代表刷新验证码，第一个为3的时候代表在进行验证
p2 = blackbox + '^^1^^1^^1'
console.log('p2的值为=======>',p2);

function encryptAES(plainText, key, iv) {
    iv = "Mnz14C2tXod8AUJ5"
    // 参数验证
    if (typeof plainText !== 'string' || plainText.length === 0) {
        throw new Error('Plaintext must be a non-empty string');
    }
    if (typeof key !== 'string' || key.length === 0) {
        throw new Error('Key must be a non-empty string');
    }

    try {
        // 执行 AES 加密
        return CryptoJS.AES.encrypt(
            plainText,
            CryptoJS.enc.Latin1.parse(key),
            {
                iv: CryptoJS.enc.Latin1.parse(iv),
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }
        ).toString();
    } catch (error) {
        throw new Error('Encryption failed: ' + error.message);
    }
}

// 将字符串大写转小写小写转大写
function swapCase(str) {
    return str.split('').map(char =>
        char === char.toUpperCase() ?
        char.toLowerCase() :
        char.toUpperCase()
    ).join('');
}


const QQ0ooO = function() {
    return arguments["callee"]["caller"]["toString"]()["length"];
}();
const oOOoQO = (QQ0ooO || '|') + '^^' + '|' + '^^' + '|' + '^^' + new Date().getTime();
ooQQ0Q = CryptoJS.MD5(p1 + '^^' + p2) + '^^' + '|' + '^^' + "|" + '^^' + "|" + CryptoJS.MD5(oOOoQO).toString();
QQQOQO = "rsp67ou9" + (token.split('-')[1] + '-' + token.split('-')[2]).substring(10, 18)
mouseInfo = '|'
QOo0Oo = '|' + '^^' + (mouseInfo || '|') + '^^' + '|';
p3 = swapCase(encryptAES(ooQQ0Q, QQQOQO));
console.log('p3的值为======>',p3);
// p4待解决
p4 = swapCase(encryptAES(QOo0Oo, QQQOQO));
console.log('p4的值为=====>',p4);
var Qoo0Q0 = swapCase(encryptAES("lBJuHqlA" + "https://www.kujiale.com/", QQQOQO));
p5 = 'web';
console.log('p5的值为=====================>',p5);
p6 = Qoo0Q0;
console.log('p6的值为====>',p6);
var QOQ0QQ = CryptoJS.MD5(Qoo0Q0).toString() + CryptoJS.MD5(oOOoQO).toString();
function generateRandomString(length) {
    const chars = 'abcdefghijklmnoqprstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * 35);
        result += chars[randomIndex];
    }
    return result;
}
p7 = QOQ0QQ + generateRandomString(32);
console.log('p7的值为========>',p7);
p8 = generateRandomString(8);
console.log('p8的值为========>',p8);
p9 = swapCase(encryptAES(oOOoQO, QQQOQO));
console.log('p9的值为========>',p9);;
mode = 1;
console.log('mode的值为====================>',mode);
