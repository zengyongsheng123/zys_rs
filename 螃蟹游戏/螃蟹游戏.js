var crypto = require('crypto-js')
function get_md5(text) {
    return crypto.MD5(text).toString();
}

function s(e) {
                for (var t = "", n = 0; n < e; n++)
                    t += Math.floor(10 * Math.random());
                return t
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

function u(e, t) {
            var n = function(e, t) {
                return Object.keys(e).reduce((function(n, r) {
                    n = e[r]
                    return n
                }
                ), {})
            }(e, t)
              , r = Object.keys(n).sort().reduce((function(t, n) {
                var r;
                return t[n] = e[n],t
            }
            ), {});
            return t === o.GET ? function(e, t) {
                var n = [];
                for (var r in e)
                    if (e.hasOwnProperty(r)) {
                        var o, s = r, a = "string" == typeof e[r] ? null === (o = e[r]) || void 0 === o ? void 0 : o.trim() : e[r];
                        if (void 0 === a)
                            continue;
                        n.push("".concat(s, "=").concat(a))
                    }
                return n.join("&")
            }(r) : JSON.stringify(r)
            }
function getSign() {
                var i = "198f788b9ee343209e0121bf72e8c562"
                  , c = Math.floor((new Date).getTime() / 1000)
                  , l = s(10);
                    var d = "get"
                      , h = null
                      , f = null;
                    if (d === o.GET) {
                        var p = {
                                "game_id": "8",
                                "rec": "",
                                "category": {
                                    "1": 0,
                                    "2": 0,
                                    "3": 0,
                                    "4": 0,
                                    "5": [],
                                    "6": [],
                                    "7": [],
                                    "8": [],
                                    "9": [],
                                    "10": []
                                },
                                "scope": {
                                    "min_price": "",
                                    "max_price": "",
                                    "min_gongli": "",
                                    "max_gongli": "",
                                    "min_meili": "",
                                    "max_meili": ""
                                },
                                "services": "all",
                                "sort": {
                                    "type": "",
                                    "method": 2
                                },
                                "page": 2,
                                "timestamp": 1733673139,
                                "session": 1733673139};
                        h = u(p, o.GET)

                    }
                        var g = "appSecret=".concat(i, "&").concat(h, "&timestamp=").concat(c, "&randomStr=").concat(l).toUpperCase();
                        f = get_md5(g)
                let t = "";
                for (let e = 0; e < Math.floor(10 * Math.random()) + 1; e++)
                    t += Math.floor(10 * Math.random());
                var token = get_md5(t);
                var ApiToken = get_md5((new Date).getFullYear() + "" + ((new Date).getMonth() + 1 < 10 ? "0" + ((new Date).getMonth() + 1) : (new Date).getMonth() + 1) + "PXB7" + get_md5(t))
                return {
                        timestamp: c,
                        randomStr: l,
                        sign: f,
                        token: token,
                        ApiToken: ApiToken
                            }
            }

// getSign()