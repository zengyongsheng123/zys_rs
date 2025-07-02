
// data = {
//     "type": "trading-type",
//     "openConvert": false,
//     "keyword": "",
//     "siteCode": "44",
//     "secondType": "A",
//     "tradingProcess": "",
//     "thirdType": "[]",
//     "projectType": "",
//     "publishStartTime": "",
//     "publishEndTime": "",
//     "pageNo": 2,
//     "pageSize": 10
// }
function fne(e, t) {
    switch (arguments.length) {
    case 1:
        return parseInt(Math.random() * e + 1, 10);
    case 2:
        return parseInt(Math.random() * (t - e + 1) + e, 10);
    default:
        return 0
    }
}
const cF = "zxcvbnmlkjhgfdsaqwertyuiop0987654321QWERTYUIOPLKJHGFDSAZXCVBNM"
  , hne = cF + "-@#$%^&*+!";
function on(e=[]) {
    return e.map(t => hne[t]).join("")
}
function pne(e) {
    return [...Array(e)].map( () => cF[fne(0, 61)]).join("")
}
function dF(e) {
    let t = "";
    return typeof e == "object" ? t = Object.keys(e).map(n => `${n}=${e[n]}`).sort().join("&") : typeof e == "string" && (t = e.split("&").sort().join("&")),
    t
}
var EC = {
    exports: {}
};
var ln = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};

var Vd = {
    exports: {}
}, wg;
function uK() {
    return wg || (wg = 1,
    function(e, t) {
        (function(n, u) {
            e.exports = u()
        }
        )(ln, function() {
            var n = n || function(u, o) {
                var r;
                if (typeof window < "u" && window.crypto && (r = window.crypto),
                typeof self < "u" && self.crypto && (r = self.crypto),
                typeof globalThis < "u" && globalThis.crypto && (r = globalThis.crypto),
                !r && typeof window < "u" && window.msCrypto && (r = window.msCrypto),
                !r && typeof ln < "u" && ln.crypto && (r = ln.crypto),
                !r && typeof nK == "function")
                    try {
                        r = Ky
                    } catch {}
                var s = function() {
                    if (r) {
                        if (typeof r.getRandomValues == "function")
                            try {
                                return r.getRandomValues(new Uint32Array(1))[0]
                            } catch {}
                        if (typeof r.randomBytes == "function")
                            try {
                                return r.randomBytes(4).readInt32LE()
                            } catch {}
                    }
                    throw new Error("Native crypto module could not be used to get secure random number.")
                }
                  , i = Object.create || function() {
                    function v() {}
                    return function(y) {
                        var E;
                        return v.prototype = y,
                        E = new v,
                        v.prototype = null,
                        E
                    }
                }()
                  , a = {}
                  , l = a.lib = {}
                  , c = l.Base = function() {
                    return {
                        extend: function(v) {
                            var y = i(this);
                            return v && y.mixIn(v),
                            (!y.hasOwnProperty("init") || this.init === y.init) && (y.init = function() {
                                y.$super.init.apply(this, arguments)
                            }
                            ),
                            y.init.prototype = y,
                            y.$super = this,
                            y
                        },
                        create: function() {
                            var v = this.extend();
                            return v.init.apply(v, arguments),
                            v
                        },
                        init: function() {},
                        mixIn: function(v) {
                            for (var y in v)
                                v.hasOwnProperty(y) && (this[y] = v[y]);
                            v.hasOwnProperty("toString") && (this.toString = v.toString)
                        },
                        clone: function() {
                            return this.init.prototype.extend(this)
                        }
                    }
                }()
                  , d = l.WordArray = c.extend({
                    init: function(v, y) {
                        v = this.words = v || [],
                        y != o ? this.sigBytes = y : this.sigBytes = v.length * 4
                    },
                    toString: function(v) {
                        return (v || p).stringify(this)
                    },
                    concat: function(v) {
                        var y = this.words
                          , E = v.words
                          , B = this.sigBytes
                          , A = v.sigBytes;
                        if (this.clamp(),
                        B % 4)
                            for (var _ = 0; _ < A; _++) {
                                var O = E[_ >>> 2] >>> 24 - _ % 4 * 8 & 255;
                                y[B + _ >>> 2] |= O << 24 - (B + _) % 4 * 8
                            }
                        else
                            for (var P = 0; P < A; P += 4)
                                y[B + P >>> 2] = E[P >>> 2];
                        return this.sigBytes += A,
                        this
                    },
                    clamp: function() {
                        var v = this.words
                          , y = this.sigBytes;
                        v[y >>> 2] &= 4294967295 << 32 - y % 4 * 8,
                        v.length = u.ceil(y / 4)
                    },
                    clone: function() {
                        var v = c.clone.call(this);
                        return v.words = this.words.slice(0),
                        v
                    },
                    random: function(v) {
                        for (var y = [], E = 0; E < v; E += 4)
                            y.push(s());
                        return new d.init(y,v)
                    }
                })
                  , f = a.enc = {}
                  , p = f.Hex = {
                    stringify: function(v) {
                        for (var y = v.words, E = v.sigBytes, B = [], A = 0; A < E; A++) {
                            var _ = y[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                            B.push((_ >>> 4).toString(16)),
                            B.push((_ & 15).toString(16))
                        }
                        return B.join("")
                    },
                    parse: function(v) {
                        for (var y = v.length, E = [], B = 0; B < y; B += 2)
                            E[B >>> 3] |= parseInt(v.substr(B, 2), 16) << 24 - B % 8 * 4;
                        return new d.init(E,y / 2)
                    }
                }
                  , h = f.Latin1 = {
                    stringify: function(v) {
                        for (var y = v.words, E = v.sigBytes, B = [], A = 0; A < E; A++) {
                            var _ = y[A >>> 2] >>> 24 - A % 4 * 8 & 255;
                            B.push(String.fromCharCode(_))
                        }
                        return B.join("")
                    },
                    parse: function(v) {
                        for (var y = v.length, E = [], B = 0; B < y; B++)
                            E[B >>> 2] |= (v.charCodeAt(B) & 255) << 24 - B % 4 * 8;
                        return new d.init(E,y)
                    }
                }
                  , m = f.Utf8 = {
                    stringify: function(v) {
                        try {
                            return decodeURIComponent(escape(h.stringify(v)))
                        } catch {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(v) {
                        return h.parse(unescape(encodeURIComponent(v)))
                    }
                }
                  , C = l.BufferedBlockAlgorithm = c.extend({
                    reset: function() {
                        this._data = new d.init,
                        this._nDataBytes = 0
                    },
                    _append: function(v) {
                        typeof v == "string" && (v = m.parse(v)),
                        this._data.concat(v),
                        this._nDataBytes += v.sigBytes
                    },
                    _process: function(v) {
                        var y, E = this._data, B = E.words, A = E.sigBytes, _ = this.blockSize, O = _ * 4, P = A / O;
                        v ? P = u.ceil(P) : P = u.max((P | 0) - this._minBufferSize, 0);
                        var L = P * _
                          , ue = u.min(L * 4, A);
                        if (L) {
                            for (var N = 0; N < L; N += _)
                                this._doProcessBlock(B, N);
                            y = B.splice(0, L),
                            E.sigBytes -= ue
                        }
                        return new d.init(y,ue)
                    },
                    clone: function() {
                        var v = c.clone.call(this);
                        return v._data = this._data.clone(),
                        v
                    },
                    _minBufferSize: 0
                });
                l.Hasher = C.extend({
                    cfg: c.extend(),
                    init: function(v) {
                        this.cfg = this.cfg.extend(v),
                        this.reset()
                    },
                    reset: function() {
                        C.reset.call(this),
                        this._doReset()
                    },
                    update: function(v) {
                        return this._append(v),
                        this._process(),
                        this
                    },
                    finalize: function(v) {
                        v && this._append(v);
                        var y = this._doFinalize();
                        return y
                    },
                    blockSize: 16,
                    _createHelper: function(v) {
                        return function(y, E) {
                            return new v.init(E).finalize(y)
                        }
                    },
                    _createHmacHelper: function(v) {
                        return function(y, E) {
                            return new g.HMAC.init(v,E).finalize(y)
                        }
                    }
                });
                var g = a.algo = {};
                return a
            }(Math);
            return n
        })
    }(Vd)),
    Vd.exports
}
(function(e, t) {
    (function(n, u) {
        e.exports = u(uK())
    }
    )(ln, function(n) {
        return function(u) {
            var o = n
              , r = o.lib
              , s = r.WordArray
              , i = r.Hasher
              , a = o.algo
              , l = []
              , c = [];
            (function() {
                function p(g) {
                    for (var v = u.sqrt(g), y = 2; y <= v; y++)
                        if (!(g % y))
                            return !1;
                    return !0
                }
                function h(g) {
                    return (g - (g | 0)) * 4294967296 | 0
                }
                for (var m = 2, C = 0; C < 64; )
                    p(m) && (C < 8 && (l[C] = h(u.pow(m, 1 / 2))),
                    c[C] = h(u.pow(m, 1 / 3)),
                    C++),
                    m++
            }
            )();
            var d = []
              , f = a.SHA256 = i.extend({
                _doReset: function() {
                    this._hash = new s.init(l.slice(0))
                },
                _doProcessBlock: function(p, h) {
                    for (var m = this._hash.words, C = m[0], g = m[1], v = m[2], y = m[3], E = m[4], B = m[5], A = m[6], _ = m[7], O = 0; O < 64; O++) {
                        if (O < 16)
                            d[O] = p[h + O] | 0;
                        else {
                            var P = d[O - 15]
                              , L = (P << 25 | P >>> 7) ^ (P << 14 | P >>> 18) ^ P >>> 3
                              , ue = d[O - 2]
                              , N = (ue << 15 | ue >>> 17) ^ (ue << 13 | ue >>> 19) ^ ue >>> 10;
                            d[O] = L + d[O - 7] + N + d[O - 16]
                        }
                        var H = E & B ^ ~E & A
                          , Q = C & g ^ C & v ^ g & v
                          , W = (C << 30 | C >>> 2) ^ (C << 19 | C >>> 13) ^ (C << 10 | C >>> 22)
                          , R = (E << 26 | E >>> 6) ^ (E << 21 | E >>> 11) ^ (E << 7 | E >>> 25)
                          , I = _ + R + H + c[O] + d[O]
                          , te = W + Q;
                        _ = A,
                        A = B,
                        B = E,
                        E = y + I | 0,
                        y = v,
                        v = g,
                        g = C,
                        C = I + te | 0
                    }
                    m[0] = m[0] + C | 0,
                    m[1] = m[1] + g | 0,
                    m[2] = m[2] + v | 0,
                    m[3] = m[3] + y | 0,
                    m[4] = m[4] + E | 0,
                    m[5] = m[5] + B | 0,
                    m[6] = m[6] + A | 0,
                    m[7] = m[7] + _ | 0
                },
                _doFinalize: function() {
                    var p = this._data
                      , h = p.words
                      , m = this._nDataBytes * 8
                      , C = p.sigBytes * 8;
                    return h[C >>> 5] |= 128 << 24 - C % 32,
                    h[(C + 64 >>> 9 << 4) + 14] = u.floor(m / 4294967296),
                    h[(C + 64 >>> 9 << 4) + 15] = m,
                    p.sigBytes = h.length * 4,
                    this._process(),
                    this._hash
                },
                clone: function() {
                    var p = i.clone.call(this);
                    return p._hash = this._hash.clone(),
                    p
                }
            });
            o.SHA256 = i._createHelper(f),
            o.HmacSHA256 = i._createHmacHelper(f)
        }(Math),
        n.SHA256
    })
}
)(EC);
var rK = EC.exports;
function rc(e) {
    return e
}
const vC = rc(rK);
function t1(e={}) {
    const {p: t, t: n, n: u, k: o} = e
      , r = dF(t);
    return vC(u + o + decodeURIComponent(r) + n)
}

var NW = function() {
    var t, n, u, o = {
        assert: function(r) {
            if (!o.has(r))
                throw new _W("Side channel does not contain " + SW(r))
        },
        get: function(r) {
            if (t)
                return xW(t, r)
        },
        has: function(r) {
            if (ta && r && (typeof r == "object" || typeof r == "function")) {
                if (t)
                    return OW(t, r)
            } else if (na) {
                if (n)
                    return IW(n, r)
            } else if (u)
                return LW(u, r);
            return !1
        },
        set: function(r, s) {
            ta && r && (typeof r == "object" || typeof r == "function") ? (t || (t = new ta),
            kW(t, r, s)) : na ? (n || (n = new na),
            PW(n, r, s)) : (u || (u = {
                key: {},
                next: null
            }),
            RW(u, r, s))
        }
    };
    return o
},
Ld = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
},
np = {
    default: Ld.RFC3986,
    formatters: {
        RFC1738: function(e) {
            return HW.call(e, jW, "+")
        },
        RFC3986: function(e) {
            return String(e)
        }
    },
    RFC1738: Ld.RFC1738,
    RFC3986: Ld.RFC3986
},
tC = function(t, n) {
    for (var u = n && n.plainObjects ? Object.create(null) : {}, o = 0; o < t.length; ++o)
        typeof t[o] < "u" && (u[o] = t[o]);
    return u
},
UW = function(t, n) {
    return Object.keys(n).reduce(function(u, o) {
        return u[o] = n[o],
        u
    }, t)
},
JW = function(t, n) {
    return [].concat(t, n)
},
qW = function(t) {
    for (var n = [{
        obj: {
            o: t
        },
        prop: "o"
    }], u = [], o = 0; o < n.length; ++o)
        for (var r = n[o], s = r.obj[r.prop], i = Object.keys(s), a = 0; a < i.length; ++a) {
            var l = i[a]
              , c = s[l];
            typeof c == "object" && c !== null && u.indexOf(c) === -1 && (n.push({
                obj: s,
                prop: l
            }),
            u.push(c))
        }
    return VW(n),
    t
},
WW = function(e, t, n) {
    var u = e.replace(/\+/g, " ");
    if (n === "iso-8859-1")
        return u.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
        return decodeURIComponent(u)
    } catch {
        return u
    }
},
GW = function(t, n, u, o, r) {
    if (t.length === 0)
        return t;
    var s = t;
    if (typeof t == "symbol" ? s = Symbol.prototype.toString.call(t) : typeof t != "string" && (s = String(t)),
    u === "iso-8859-1")
        return escape(s).replace(/%u[0-9a-f]{4}/gi, function(c) {
            return "%26%23" + parseInt(c.slice(2), 16) + "%3B"
        });
    for (var i = "", a = 0; a < s.length; ++a) {
        var l = s.charCodeAt(a);
        if (l === 45 || l === 46 || l === 95 || l === 126 || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || r === zW.RFC1738 && (l === 40 || l === 41)) {
            i += s.charAt(a);
            continue
        }
        if (l < 128) {
            i = i + kn[l];
            continue
        }
        if (l < 2048) {
            i = i + (kn[192 | l >> 6] + kn[128 | l & 63]);
            continue
        }
        if (l < 55296 || l >= 57344) {
            i = i + (kn[224 | l >> 12] + kn[128 | l >> 6 & 63] + kn[128 | l & 63]);
            continue
        }
        a += 1,
        l = 65536 + ((l & 1023) << 10 | s.charCodeAt(a) & 1023),
        i += kn[240 | l >> 18] + kn[128 | l >> 12 & 63] + kn[128 | l >> 6 & 63] + kn[128 | l & 63]
    }
    return i
},
QW = function(t) {
    return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
},
KW = function(t) {
    return Object.prototype.toString.call(t) === "[object RegExp]"
},
ZW = function(t, n) {
    if ($u(t)) {
        for (var u = [], o = 0; o < t.length; o += 1)
            u.push(n(t[o]));
        return u
    }
    return n(t)
},
YW = function e(t, n, u) {
    if (!n)
        return t;
    if (typeof n != "object") {
        if ($u(t))
            t.push(n);
        else if (t && typeof t == "object")
            (u && (u.plainObjects || u.allowPrototypes) || !Nd.call(Object.prototype, n)) && (t[n] = !0);
        else
            return [t, n];
        return t
    }
    if (!t || typeof t != "object")
        return [t].concat(n);
    var o = t;
    return $u(t) && !$u(n) && (o = tC(t, u)),
    $u(t) && $u(n) ? (n.forEach(function(r, s) {
        if (Nd.call(t, s)) {
            var i = t[s];
            i && typeof i == "object" && r && typeof r == "object" ? t[s] = e(i, r, u) : t.push(r)
        } else
            t[s] = r
    }),
    t) : Object.keys(n).reduce(function(r, s) {
        var i = n[s];
        return Nd.call(r, s) ? r[s] = e(r[s], i, u) : r[s] = i,
        r
    }, o)
},
nC = {
    arrayToObject: tC,
    assign: UW,
    combine: JW,
    compact: qW,
    decode: WW,
    encode: GW,
    isBuffer: QW,
    isRegExp: KW,
    maybeMap: ZW,
    merge: YW
},
uC = NW,
xa = nC,
ys = np,
Cg = {
    brackets: function (t) {
        return t + "[]"
    }
},
zW = np,
Kn = Array.isArray,
$W = Array.prototype.push,
kn = function() {
    for (var e = [], t = 0; t < 256; ++t)
        e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
    return e
}(),
rC = function (e, t) {
    $W.apply(e, Kn(t) ? t : [t])
},
Fg = ys.default,
bt = {
    addQueryPrefix: !1,
    allowDots: !1,
    charset: "utf-8",
    charsetSentinel: !1,
    delimiter: "&",
    encode: !0,
    encoder: xa.encode,
    encodeValuesOnly: !1,
    format: Fg,
    formatter: ys.formatters[Fg],
    indices: !1,
    serializeDate: function(t) {
        return eG.call(t)
    },
    skipNulls: !1,
    strictNullHandling: !1
},
tG = function (t) {
    return typeof t == "string" || typeof t == "number" || typeof t == "boolean" || typeof t == "symbol" || typeof t == "bigint"
},
Hd = {},
nG = function e(t, n, u, o, r, s, i, a, l, c, d, f, p, h, m, C) {
    for (var g = t, v = C, y = 0, E = !1; (v = v.get(Hd)) !== void 0 && !E; ) {
        var B = v.get(t);
        if (y += 1,
        typeof B < "u") {
            if (B === y)
                throw new RangeError("Cyclic object value");
            E = !0
        }
        typeof v.get(Hd) > "u" && (y = 0)
    }
    if (typeof a == "function" ? g = a(n, g) : g instanceof Date ? g = d(g) : u === "comma" && Kn(g) && (g = xa.maybeMap(g, function(R) {
        return R instanceof Date ? d(R) : R
    })),
    g === null) {
        if (r)
            return i && !h ? i(n, bt.encoder, m, "key", f) : n;
        g = ""
    }
    if (tG(g) || xa.isBuffer(g)) {
        if (i) {
            var A = h ? n : i(n, bt.encoder, m, "key", f);
            return [p(A) + "=" + p(i(g, bt.encoder, m, "value", f))]
        }
        return [p(n) + "=" + p(String(g))]
    }
    var _ = [];
    if (typeof g > "u")
        return _;
    var O;
    if (u === "comma" && Kn(g))
        h && i && (g = xa.maybeMap(g, i)),
        O = [{
            value: g.length > 0 ? g.join(",") || null : void 0
        }];
    else if (Kn(a))
        O = a;
    else {
        var P = Object.keys(g);
        O = l ? P.sort(l) : P
    }
    for (var L = o && Kn(g) && g.length === 1 ? n + "[]" : n, ue = 0; ue < O.length; ++ue) {
        var N = O[ue]
          , H = typeof N == "object" && typeof N.value < "u" ? N.value : g[N];
        if (!(s && H === null)) {
            var Q = Kn(g) ? typeof u == "function" ? u(L, N) : L : L + (c ? "." + N : "[" + N + "]");
            C.set(t, y);
            var W = uC();
            W.set(Hd, C),
            rC(_, e(H, Q, u, o, r, s, u === "comma" && h && Kn(g) ? null : i, a, l, c, d, f, p, h, m, W))
        }
    }
    return _
},
uG = function(t) {
    if (!t)
        return bt;
    if (t.encoder !== null && typeof t.encoder < "u" && typeof t.encoder != "function")
        throw new TypeError("Encoder has to be a function.");
    var n = t.charset || bt.charset;
    if (typeof t.charset < "u" && t.charset !== "utf-8" && t.charset !== "iso-8859-1")
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
    var u = ys.default;
    if (typeof t.format < "u") {
        if (!XW.call(ys.formatters, t.format))
            throw new TypeError("Unknown format option provided.");
        u = t.format
    }
    var o = ys.formatters[u]
      , r = bt.filter;
    return (typeof t.filter == "function" || Kn(t.filter)) && (r = t.filter),
    {
        addQueryPrefix: typeof t.addQueryPrefix == "boolean" ? t.addQueryPrefix : bt.addQueryPrefix,
        allowDots: typeof t.allowDots > "u" ? bt.allowDots : !!t.allowDots,
        charset: n,
        charsetSentinel: typeof t.charsetSentinel == "boolean" ? t.charsetSentinel : bt.charsetSentinel,
        delimiter: typeof t.delimiter > "u" ? bt.delimiter : t.delimiter,
        encode: typeof t.encode == "boolean" ? t.encode : bt.encode,
        encoder: typeof t.encoder == "function" ? t.encoder : bt.encoder,
        encodeValuesOnly: typeof t.encodeValuesOnly == "boolean" ? t.encodeValuesOnly : bt.encodeValuesOnly,
        filter: r,
        format: u,
        formatter: o,
        serializeDate: typeof t.serializeDate == "function" ? t.serializeDate : bt.serializeDate,
        skipNulls: typeof t.skipNulls == "boolean" ? t.skipNulls : bt.skipNulls,
        sort: typeof t.sort == "function" ? t.sort : null,
        strictNullHandling: typeof t.strictNullHandling == "boolean" ? t.strictNullHandling : bt.strictNullHandling
    }
},
rG = function(e, t) {
    var n = e, u = uG(t), o, r;
    typeof u.filter == "function" ? (r = u.filter,
    n = r("", n)) : Kn(u.filter) && (r = u.filter,
    o = r);
    var s = [];
    if (typeof n != "object" || n === null)
        return "";
    var i;
    t && t.arrayFormat in Cg ? i = t.arrayFormat : t && "indices"in t ? i = t.indices ? "indices" : "repeat" : i = "indices";
    var a = Cg[i];
    if (t && "commaRoundTrip"in t && typeof t.commaRoundTrip != "boolean")
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
    var l = a === "comma" && t && t.commaRoundTrip;
    o || (o = Object.keys(n)),
    u.sort && o.sort(u.sort);
    for (var c = uC(), d = 0; d < o.length; ++d) {
        var f = o[d];
        u.skipNulls && n[f] === null || rC(s, nG(n[f], f, a, l, u.strictNullHandling, u.skipNulls, u.encode ? u.encoder : null, u.filter, u.sort, u.allowDots, u.serializeDate, u.format, u.formatter, u.encodeValuesOnly, u.charset, c))
    }
    var p = s.join(u.delimiter)
      , h = u.addQueryPrefix === !0 ? "?" : "";
    return u.charsetSentinel && (u.charset === "iso-8859-1" ? h += "utf8=%26%2310003%3B&" : h += "utf8=%E2%9C%93&"),
    p.length > 0 ? h + p : ""
},
hG = function(e, t) {
    var n = fG(t);
    if (e === "" || e === null || typeof e > "u")
        return n.plainObjects ? Object.create(null) : {};
    for (var u = typeof e == "string" ? lG(e, n) : e, o = n.plainObjects ? Object.create(null) : {}, r = Object.keys(u), s = 0; s < r.length; ++s) {
        var i = r[s]
          , a = dG(i, u[i], n, typeof e == "string");
        o = co.merge(o, a, n)
    }
    return n.allowSparse === !0 ? o : co.compact(o)
}
  , pG = rG
  , mG = hG
  , gG = np
  , EG = {
    formats: gG,
    parse: mG,
    stringify: pG
};
function rc(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
const sC = rc(EG);

function get_headers(data) {
    const a = Date.now()
        , l = pne(16)
        , c = on([8, 28, 20, 42, 21, 53, 65, 6])
        , d = {
        ["X-Dgi-Req-App"]: "ggzy-portal",
        ["X-Dgi-Req-Nonce"]: l,
        ["X-Dgi-Req-Timestamp"]: a
    };

    const p = t1({
        p: sC.stringify(data, {
            allowDots: !0
        }),
        t: a,
        n: l,
        k: c
    });
    d[["X-Dgi-Req-Signature"]] = p.toString()
    return d;
}
// console.log(get_headers(data));