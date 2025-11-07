# zys_rs
https://mp.weixin.qq.com/s/pXjmkZvwkm22xGGOs1yu3A
https://note.youdao.com/ynoteshare/index.html?id=0c42d26654e8f5bd77854cae527f7302&type=note&_time=1725535676814
class AlgorithmReconstructor {
    constructor() {
        // 自定义Base64字符集
        this._map1 = 'hgfedcbaZYXWVUTSRQPONMLKJIHGFEDCBA-_9876543210zyxwvutsrqponmlkji';
    }

    // WordArray类
    createWordArray(words, sigBytes) {
        return {
            words: words || [],
            sigBytes: sigBytes !== undefined ? sigBytes : (words ? words.length * 4 : 0)
        };
    }

    // 字节数组 → WordArray
    toWordArray(byteArray) {
        const words = [];
        for (let i = 0; i < byteArray.length; i++) {
            const wordIndex = i >>> 2;
            const bytePos = i % 4;
            const shift = 24 - bytePos * 8;

            if (!words[wordIndex]) words[wordIndex] = 0;
            words[wordIndex] |= (byteArray[i] & 0xFF) << shift;
        }
        return this.createWordArray(words, byteArray.length);
    }

    // WordArray → 字节数组
    fromWordArray(wordArray) {
        const byteArray = new Uint8Array(wordArray.sigBytes);
        for (let i = 0; i < wordArray.sigBytes; i++) {
            const wordIndex = i >>> 2;
            const bytePos = i % 4;
            const shift = 24 - bytePos * 8;
            byteArray[i] = (wordArray.words[wordIndex] >>> shift) & 0xFF;
        }
        return byteArray;
    }

    // 修正的重组算法 - 更接近网页结果
    reorganizeBytes(inputBytes) {
        // 根据Hook日志，可能是不同的重组模式
        // 尝试：原始数据 + 特定模式的重组

        const output = [...inputBytes];

        // 可能是从特定位置开始重组，而不是简单的反向
        let position = inputBytes.length;
        const step = 2; // 尝试步长为2

        while (position > 0) {
            const start = Math.max(0, position - step);
            const chunk = inputBytes.slice(start, position);
            output.push(...chunk);
            position = start;
        }

        return output;
    }

    // 重组逆算法
    reverseReorganize(reorganizedBytes) {
        // 原始数据在前541字节
        return reorganizedBytes.slice(0, 541);
    }

    // 自定义Base64编码
    stringify1(wordArray, offset) {
        const words = wordArray.words;
        const sigBytes = wordArray.sigBytes;
        const map = this._map1;

        let result = '';
        let i = offset || 0;

        while (i < sigBytes) {
            const byte1 = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            i++;
            const byte2 = i < sigBytes ? (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff : 0;
            i++;
            const byte3 = i < sigBytes ? (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff : 0;
            i++;

            const triplet = (byte1 << 16) | (byte2 << 8) | byte3;
            const indices = [
                (triplet >>> 18) & 0x3f,
                (triplet >>> 12) & 0x3f,
                (triplet >>> 6) & 0x3f,
                triplet & 0x3f
            ];

            for (let j = 0; j < 4; j++) {
                if (i - 3 + j <= sigBytes) {
                    result += map.charAt(indices[j]);
                }
            }
        }
        return result;
    }

    // 主编码函数
    stringify(data) {
        try {
            const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
            const encoder = new TextEncoder();
            const byteArray = Array.from(encoder.encode(jsonString));
            const reorganizedBytes = this.reorganizeBytes(byteArray);
            const wordArray = this.toWordArray(reorganizedBytes);
            return this.stringify1(wordArray, 0);
        } catch (error) {
            console.error('编码错误:', error);
            return null;
        }
    }
}

// 测试与网页结果对比
const algorithm = new AlgorithmReconstructor();

const testData = '{\n  "sua": "Windows NT 10.0; Win64; x64",\n  "pp": {},\n  "extend": {\n    "wd": 0,\n    "l": 0,\n    "ls": 5,\n    "wk": 0,\n    "bu1": "0.1.4",\n    "bu3": 36,\n    "bu4": 0,\n    "bu5": 0,\n    "bu6": 21,\n    "bu7": 0,\n    "bu8": 0,\n    "random": "jVfaTE22wg",\n    "bu12": -8,\n    "bu10": 14,\n    "bu11": 2,\n    "bu13": "Fi"\n  },\n  "pf": "Win32",\n  "random": "xHu-KL2x7",\n  "v": "h5_file_v5.2.3",\n  "bu4": "0",\n  "canvas": "e7af426f9eef53627083a1eb3eb2a054",\n  "webglFp": "ed41eb716c47d5bb3b625320b2f2f1bf",\n  "ccn": 24,\n  "fp": "m9a3i99iajt60hh9"\n}';

console.log('=== 与网页结果对比测试 ===');
console.log('输入数据长度:', testData.length);

const ourResult = algorithm.stringify(testData);
console.log('我们的结果长度:', ourResult.length);
console.log('我们的结果:', ourResult);

const webResult = "fZRCXZPT5AbVrR6HA8LTo9rVA8OG-h-T-h6I-hfZXxfUvh-T-prJ_YfZB5hW-J7JwJ7V7Y_JxZuVsZ_U-U_J-MeIqRuJrduU-MLVtRLI-h-T-h6Q1E7J8E6ZBh-f1ZfUshOJvZLIuZLIwdrVphuUvJuVsJLI88_IrZeU7crU8YfZnZvFAI6GAU7ZBh-f1ZfV-h-T-ROE-YfZB5hW-V_WvpPUrkMI187ICMeH-h-T-J6ZBh-f1ZvUpYeOWsPEZA6ZB5_Z0kbIzc7F-hfZXx-ZvV_G4E8ZB5_Z7g6ZBh-f1taZB5BZ4I9ZB5_ZudOE-YfZBhfZXx-VB5_ZwdOE-YfZBhfZXxfUwh-T-hOVsY7ZBhfZB5hWptfZnZ-VwN6J-hfZBh-f1ZvIqY_VcQMJ7I8H-h-T-trG9oLJvYfZBhfZXxfVB5_ZpN6J-hfZBh-f1heZnZvUsY7ZBhfZB5hWwZeZnZ-UsY7ZBhfZB5hWxh-T-NOE-YfZBhfZXxfVB5_ZtN6J-hfZBh-f1JuVB5_ZuN6J-hfZBh-f1ZfUzd_WxZfZnZPVsY7ZBhfZB5hWxh-T-1rE-hfZBh-f1NeZnZvF1YfZBhfZXxfVB5_Z1YfZBhfZXxfVB5_Z9E6ZBhfZB5xDB5_Z9oLItAKI-hfZXxPCmg-T-haF-hfZXx-ZtJeDB1eUrpLHKgvTxpfVwhfMTgvFqkbIz8rM-h-T-dLEuYfZB5xD";

console.log('\n网页结果长度:', webResult.length);
console.log('网页结果:', webResult);

console.log('\n=== 对比分析 ===');
console.log('长度差异:', ourResult.length - webResult.length);
console.log('是否相同:', ourResult === webResult);

// 分析字符分布
function analyzeChars(str) {
    const chars = {};
    for (let char of str) {
        chars[char] = (chars[char] || 0) + 1;
    }
    return chars;
}

console.log('\n我们的结果字符分布:', analyzeChars(ourResult));
console.log('网页结果字符分布:', analyzeChars(webResult));
