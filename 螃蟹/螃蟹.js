var crypto = require('crypto-js')
function get_md5(text) {
    return crypto.MD5(text).toString();
}

o = {
    "GET": "get",
    "POST": "post",
    "PUT": "put",
    "DELETE": "delete",
    "PATCH": "patch",
    "HEAD": "head",
    "OPTIONS": "options"
}
function i(e) {
                return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                }
                : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
                ,
                i(e)
            }
var a = function(e) {
                return "object" === i(e) && 0 === Object.keys(e).length && e.constructor === Object
            };
function u(e, t) {
                var n = function(e, t) {
                    return Object.keys(e).reduce((function(n, r) {
                        var i = null == e ? void 0 : e[r];
                        return t === o.GET ? null === i || "" === i || "string" == typeof i && ("null" === (null == i ? void 0 : i.toLowerCase()) || "[]" === (null == i ? void 0 : i.toLowerCase()) || "{}" === (null == i ? void 0 : i.toLowerCase())) || Array.isArray(i) && 0 === i.length || a(i) || (n[r] = i) : null === i || "" === i || Array.isArray(i) && 0 === i.length || a(i) || (n[r] = i),
                        n
                    }
                    ), {})
                }(e, t)
                  , r = Object.keys(n).sort().reduce((function(t, n) {
                    var r;
                    return (null === (r = n) || "object" !== i(r) && "function" != typeof r) && (t[n] = e[n]),
                    t
                }
                ), {});
                return t === o.GET ? function(e, t) {
                    var n = [];
                    for (var r in e)
                        if (e.hasOwnProperty(r)) {
                            var o, s = r, a = "string" == typeof e[r] ? null === (o = e[r]) || void 0 === o ? void 0 : o.trim() : e[r];
                            if (void 0 === a)
                                continue;
                            null !== a && "object" === i(a) ? n.push("".concat(s, "=").concat(JSON.stringify(a))) : n.push("".concat(s, "=").concat(a))
                        }
                    return n.join("&")
                }(r) : JSON.stringify(r)
            }
function s(e) {
                for (var t = "", n = 0; n < e; n++)
                    t += Math.floor(10 * Math.random());
                return t
            }
function getSign(p) {
    var i = "198f788b9ee343209e0121bf72e8c562"
                  , c = Math.floor((new Date).getTime() / 1000)
                  , l = s(10);
                    var d = "get"
                      , h = null
                      , f = null;
                    // var p = {
                    //     "game_id": "8",
                    //     "rec": "",
                    //     "category": {
                    //         "1": 0,
                    //         "2": 0,
                    //         "3": 0,
                    //         "4": 0,
                    //         "5": [],
                    //         "6": [],
                    //         "7": [],
                    //         "8": [],
                    //         "9": [],
                    //         "10": []
                    //     },
                    //     "scope": {
                    //         "min_price": "",
                    //         "max_price": "",
                    //         "min_gongli": "",
                    //         "max_gongli": "",
                    //         "min_meili": "",
                    //         "max_meili": ""
                    //     },
                    //     "services": "all",
                    //     "sort": {
                    //         "type": "",
                    //         "method": 2
                    //     },
                    //     "page": 5,
                    //     "timestamp": 1733848921,
                    //     "session": "1733848921"
                    // };
                    h = u(p, "get")
                    var g = "appSecret=".concat(i, "&").concat(h, "&timestamp=").concat(c, "&randomStr=").concat(l).toUpperCase();
                    f = get_md5(g)
                    return {
                        timestamp: c,
                        randomStr: l,
                        sign: f
                        }

        }
// getSign()
// "category={"1":0,"2":0,"3":0,"4":0,"5":[],"6":[],"7":[],"8":[],"9":[],"10":[]}&game_id=8&page=5&scope={"min_price":"","max_price":"","min_gongli":"","max_gongli":"","min_meili":"","max_meili":""}&services=all&session=1733848921&sort={"type":"","method":2}&timestamp=1733848921"
// "APPSECRET=198F788B9EE343209E0121BF72E8C562&CATEGORY={"1":0,"2":0,"3":0,"4":0,"5":[],"6":[],"7":[],"8":[],"9":[],"10":[]}&GAME_ID=8&PAGE=5&SCOPE={"MIN_PRICE":"","MAX_PRICE":"","MIN_GONGLI":"","MAX_GONGLI":"","MIN_MEILI":"","MAX_MEILI":""}&SERVICES=ALL&SESSION=1733848921&SORT={"TYPE":"","METHOD":2}&TIMESTAMP=1733848921&TIMESTAMP=1733849575&RANDOMSTR=4681331652"