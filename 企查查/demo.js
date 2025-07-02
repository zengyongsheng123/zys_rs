var crypto = require('crypto-js')


function HMACEncrypt(text, key) {

    // return crypto.HmacMD5(text, key).toString();
    return crypto.HmacSHA512(text, key).toString()

}


bb = function () {
    for (var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "/").toLowerCase(), t = e + e, n = "", i = 0; i < t.length; ++i) {
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


aa = function (t, e) {
    var t = t.toLowerCase()
    var n = JSON.stringify(e).toLowerCase();
    return HMACEncrypt(t + n, (0,
        bb)(t)).toLowerCase().substr(8, 20)
}

cc = function (e, t, n) {
    var n = n.toLowerCase()
    var i = JSON.stringify(e).toLowerCase();
    return HMACEncrypt(n + "pathString" + i + t, bb(n))
}



function get_data(data) {
    var i = aa("/api/search/searchmulti", data)
    var u = cc(data, "341a381d23992460edde88a493870e76", "/api/search/searchmulti")
    // return {key: i, val: u}
    // console.log(i, u)
}

// data = {
//     "searchKey": "小米",
//     "pageIndex": 1,
//     "pageSize": 20
// }
// get_data(data);
