const CryptoJS = require("crypto-js");

class KujiaEncryption {
    constructor() {
        this.stamp = new Date().getTime(); // 获取当前时间戳
        this.token = `kujia-${this.stamp}-bbff4f8e5e1d98`; // 生成 token
        this.iv = "Mnz14C2tXod8AUJ5"; // 固定初始化向量
    }

    // 生成 p1 参数
    generateP1() {
        return 'b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F' +
               '^^' + this.token + '^^' + 'kujia' + '^^' + 'kujia_web';
    }

    // 生成 blackbox 字符串
    generateBlackbox(input) {
        const charSet = "0123456789abcdef";
        const Q0OOo = [
            input.charAt(charSet.indexOf(input[0])), // 提取首字符
            input.substring(1, 4), // 提取第1-3字符
            input.substring(4, 14), // 提取第4-13字符
            input.substring(14, 22), // 提取第14-21字符
            input.substring(22, 23) // 提取第22字符
        ];

        const OQQ0o = [
            "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
            "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
            "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
            "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
        ];

        // 随机生成三个字符
        const OOOoO = Array(3).fill().map(() =>
            OQQ0o[Math.floor(Math.random() * 62)]
        );

        return `${Q0OOo[0]}${Q0OOo[1]}${OOOoO[0]}${Q0OOo[2]}${OOOoO[1]}${Q0OOo[3]}${OOOoO[2]}${Q0OOo[4]}`;
    }

    // AES 加密并转换大小写
    encryptAndSwap(plainText, key) {
        if (typeof plainText !== 'string' || plainText.length === 0) {
            throw new Error('明文必须为非空字符串');
        }
        if (typeof key !== 'string' || key.length === 0) {
            throw new Error('密钥必须为非空字符串');
        }

        try {
            const encrypted = CryptoJS.AES.encrypt(
                plainText,
                CryptoJS.enc.Latin1.parse(key),
                {
                    iv: CryptoJS.enc.Latin1.parse(this.iv),
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }
            ).toString();

            return this.swapCase(encrypted);
        } catch (error) {
            throw new Error('加密失败: ' + error.message);
        }
    }

    // 大小写转换
    swapCase(str) {
        return str.split('').map(char =>
            char === char.toUpperCase() ?
            char.toLowerCase() :
            char.toUpperCase()
        ).join('');
    }

    // 生成随机字符串
    generateRandomString(length) {
        const chars = 'abcdefghijklmnoqprstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * 35);
            result += chars[randomIndex];
        }
        return result;
    }

    // 生成所有参数
    generateParameters() {
        const p1 = this.generateP1();

        const blackbox = this.generateBlackbox("bWPH1748437542Rx0IgcmA7");
        const p2 = `${blackbox}^^1^^1^^1`;

        // 修复 QQ0ooO 的计算，添加错误处理
        const QQ0ooO = (() => {
            try {
                return arguments.callee.caller ? arguments.callee.caller.toString().length : '|';
            } catch (e) {
                return '|';
            }
        })();
        const oOOoQO = (QQ0ooO || '|') + '^^' + '|' + '^^' + '|' + '^^' + new Date().getTime();
        const ooQQ0Q = CryptoJS.MD5(p1 + '^^' + p2) + '^^' + '|' + '^^' + '|' + '^^' + CryptoJS.MD5(oOOoQO).toString();

        const QQQOQO = "rsp67ou9" + (this.token.split('-')[1] + '-' + this.token.split('-')[2]).substring(10, 18);

        const mouseInfo = '|';
        const QOo0Oo = '|' + '^^' + (mouseInfo || '|') + '^^' + '|';

        const p3 = this.encryptAndSwap(ooQQ0Q, QQQOQO);
        const p4 = this.encryptAndSwap(QOo0Oo, QQQOQO);
        const p5 = 'web';
        const Qoo0Q0 = this.encryptAndSwap("lBJuHqlA" + "https://www.kujiale.com/", QQQOQO);
        const p6 = Qoo0Q0;
        const QOQ0QQ = CryptoJS.MD5(Qoo0Q0).toString() + CryptoJS.MD5(oOOoQO).toString();
        const p7 = QOQ0QQ + this.generateRandomString(32);
        const p8 = this.generateRandomString(8);
        const p9 = this.encryptAndSwap(oOOoQO, QQQOQO);
        const mode = 1;

        return { p1, p2, p3, p4, p5, p6, p7, p8, p9, mode };
    }

    // 打印所有参数
    logParameters() {
        const params = this.generateParameters();
        console.log('当前时间戳值为===========>', this.stamp);
        console.log('p1的值为=====>', params.p1);
        console.log('p2的值为=======>', params.p2);
        console.log('p3的值为======>', params.p3);
        console.log('p4的值为=====>', params.p4);
        console.log('p5的值为=====================>', params.p5);
        console.log('p6的值为====>', params.p6);
        console.log('p7的值为========>', params.p7);
        console.log('p8的值为========>', params.p8);
        console.log('p9的值为========>', params.p9);
        console.log('mode的值为====================>', params.mode);
    }
}

// 使用示例
try {
    const encrypter = new KujiaEncryption();
    encrypter.logParameters();
} catch (error) {
    console.error('错误:', error.message);
}