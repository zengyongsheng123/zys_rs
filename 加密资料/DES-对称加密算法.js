var cryptoJS =  require('crypto-js')

function encrypt_des() {
    var key = cryptoJS.enc.Utf8.parse(key)
    var iv = cryptoJS.enc.Utf8.parse(iv)
    var data = cryptoJS.enc.Utf8.parse(text)
    var enc_dta = cryptoJS.DES.encrypt(data, key, {
        iv: iv,
        mode: cryptoJS.mode.CBC,
        padding: cryptoJS.pad.Pkcs7
    })
    return enc_dta.toString()
}

function decrypt_des() {
    const key = cryptoJS.enc.Utf8.parse(key);
    const iv = cryptoJS.enc.Utf8.parse(iv);
    const data = enc_da;
    dec_data = cryptoJS.DES.decrypt(data, key, {
        iv: iv,
        mode: cryptoJS.mode.CBC,
        padding: cryptoJS.pad.Pkcs7
    })
    return dec_data.toString(cryptoJS.enc.Utf8)
}

var text = 'python'  // 明文
var key = '6f726c64f2c2057' // key
var iv = '0123456789ABCDEF' // 偏移值   初始向量

enc_da = encrypt_des()
console.log(decrypt_des());














