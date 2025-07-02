// sm-crypto   完整的库   node    成熟的库
// 非对称加密算法
// var sm2 = require('sm-crypto').sm2

// var keypair = sm2.generateKeyPairHex()
// var publickey = keypair.publicKey // 公钥
// var privatekey = keypair.privateKey // 私钥
//
// var text = 'python'
// enc_data = sm2.doEncrypt(text, publickey)
// console.log(enc_data)
// data = sm2.doDecrypt(enc_data, privatekey)
// console.log(data)

// 哈希
// var sm3 = require('sm-crypto').sm3
// var data = 'python'
// console.log(sm3(data).length);


// 对称加密算法
var sm4 = require('sm-crypto').sm4
var key = '0123456789ABCDEF0123456789ABCDEF'
var dta = 'python'

text = sm4.encrypt(dta, key)
dec_data = sm4.decrypt(text, key)

console.log(dec_data);
console.log(text)















