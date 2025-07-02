const CryptoJS = require("crypto-js");
const decrypt = (data, timestamp) => {
    const key = CryptoJS.enc.Utf8.parse(timestamp+"000");
    const iv = CryptoJS.enc.Utf8.parse(timestamp+"000");
    return CryptoJS.AES.decrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8);

}
