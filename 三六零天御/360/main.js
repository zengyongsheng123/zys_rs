const Crypto = require("crypto-js");
window=global;
if (typeof navigator === 'undefined') {
    global.navigator = { appName: 'Netscape' };
}
require('./jsencrypt_min');


function get_rsa_enc(key, track, captchaId, token){
    CryptoJS = new JSEncrypt();
    CryptoJS.setPublicKey(atob(key));
    return CryptoJS.encryptLong(JSON.stringify(track)) + Crypto.MD5(captchaId + token).toString();
}