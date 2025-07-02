// npm install crypto-js --save
var crypto = require('crypto-js')

function get_md5(text) {
    console.log(crypto.MD5(text).toString());
}
get_md5('1')
