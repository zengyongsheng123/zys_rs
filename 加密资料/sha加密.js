var crypto = require('crypto-js')

function get_sha() {
    console.log(crypto.SHA224('123').toString())
}


get_sha()