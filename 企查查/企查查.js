
var crypto = require('crypto-js')
function get_hmac(data, key) {
    return crypto.HmacSHA512(data, key).toString();
}
bb = function() {
                for (var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/").toLowerCase(),
                         t = e + e, n = "", i = 0; i < t.length; ++i) {
                    var o = t[i].charCodeAt() % 20;
                    n += {
    "0": "W",
    "1": "l",
    "2": "k",
    "3": "B",
    "4": "Q",
    "5": "g",
    "6": "f",
    "7": "i",
    "8": "i",
    "9": "r",
    "10": "v",
    "11": "6",
    "12": "A",
    "13": "K",
    "14": "N",
    "15": "k",
    "16": "4",
    "17": "L",
    "18": "1",
    "19": "8"
}[o]
                }
                return n
            }
aa = function(t, e) {
                var t = t.toLowerCase();
                var n = JSON.stringify(e).toLowerCase();
                return get_hmac(t + n, bb(t)).toLowerCase().substr(8, 20)
            }
cc = function(e, t, n) {
                  var n = n.toLowerCase();
                  var i = JSON.stringify(e).toLowerCase();
                return get_hmac(n + "pathString" + i + t,bb(n))
            }


// data = {
//     "searchKey": "小米",
//     "pageIndex": 1,
//     "pageSize": 20
// }
function get_header(data) {
    var i = aa("/api/search/searchmulti", data)
    var u = cc(data, '5964fd55616a073a5ce44ae0d3a1948b', "/api/search/searchmulti");
    return {key : i, val : u}
}

