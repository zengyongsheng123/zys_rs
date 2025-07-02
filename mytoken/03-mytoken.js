
// npm install crypto-js --save
var crypto = require('crypto-js')

function get_md5(time_Data){
    text = time_Data + "9527" + time_Data.substr(0, 6)
    return crypto.MD5(text).toString()

}

// 会获取到
// console.log(get_md5());


