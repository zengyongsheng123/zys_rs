var crypto = require('crypto-js')


function get_hmac() {
    console.log(crypto.HmacSHA1('1', '1232345').toString());
    console.log(crypto.HmacMD5('1', '1232345').toString());
    console.log(crypto.HmacSHA256('1', '1232345').toString());
    console.log(crypto.HmacSHA512('1', '1232345').toString());
}
get_hmac()

