var CryptoJS = require('crypto-js')
window = global
document = {
    createElement: function (args) {
        console.log('document的createElement需要的参数是：', args);
        if (args == 'script') {
            return script
        }
    },
}
script = {}
body = {
    appendChild: function (args) {
        console.log('body的appendChild需要的参数是：', args);
    }
}
document['body'] = body

function get_md5(text) {
    return CryptoJS.MD5(text).toString()
};
f = {
    init: function (v, y) {
        var o
        v = this.words = v || [],
            y != o ? this.sigBytes = y : this.sigBytes = v.length * 4
    },
    toString: function (v) {
        return (v || p).stringify(this)
    },
    concat: function (v) {
        var y = this.words
            , S = v.words
            , C = this.sigBytes
            , x = v.sigBytes;
        if (this.clamp(),
        C % 4)
            for (var E = 0; E < x; E++) {
                var I = S[E >>> 2] >>> 24 - E % 4 * 8 & 255;
                y[C + E >>> 2] |= I << 24 - (C + E) % 4 * 8
            }
        else
            for (var M = 0; M < x; M += 4)
                y[C + M >>> 2] = S[M >>> 2];
        return this.sigBytes += x,
            this
    },
    clamp: function () {
        var v = this.words
            , y = this.sigBytes;
        v[y >>> 2] &= 4294967295 << 32 - y % 4 * 8,
            v.length = n.ceil(y / 4)
    },
    clone: function () {
        var v = c.clone.call(this);
        return v.words = this.words.slice(0),
            v
    },
    random: function (v) {
        for (var y = [], S = 0; S < v; S += 4)
            y.push(s());
        return new f.init(y, v)
    }
}
m = {
    stringify: function (v) {
        for (var y = v.words, S = v.sigBytes, C = [], x = 0; x < S; x++) {
            var E = y[x >>> 2] >>> 24 - x % 4 * 8 & 255;
            C.push(String.fromCharCode(E))
        }
        return C.join("")
    },
    parse: function (v) {
        for (var y = v.length, S = [], C = 0; C < y; C++)
            S[C >>> 2] |= (v.charCodeAt(C) & 255) << 24 - C % 4 * 8;
        return new f.init(S, y)
    }
}
UTF8 = {
    stringify: function (v) {
        try {
            return decodeURIComponent(escape(m.stringify(v)))
        } catch {
            throw new Error("Malformed UTF-8 data")
        }
    },
    parse: function (v) {
        return m.parse(unescape(encodeURIComponent(v)))
    }
}
var commonjsGlobal = window

function getDefaultExportFromCjs(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

var aes = {
    exports: {}
}, encBase64 = {
    exports: {}
}, hasRequiredEncBase64;

function getDefaultExportFromCjs(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}

var core = {
    exports: {}
}, hasRequiredCore;

function requireCore() {
    return hasRequiredCore || (hasRequiredCore = 1,
        function (e, t) {
            (function (r, n) {
                    e.exports = n()
                }
            )(commonjsGlobal, function () {
                var r = r || function (n, o) {
                    var a;
                    if (typeof window < "u" && window.crypto && (a = window.crypto),
                    typeof self < "u" && self.crypto && (a = self.crypto),
                    typeof globalThis < "u" && globalThis.crypto && (a = globalThis.crypto),
                    !a && typeof window < "u" && window.msCrypto && (a = window.msCrypto),
                    !a && typeof commonjsGlobal < "u" && commonjsGlobal.crypto && (a = commonjsGlobal.crypto),
                    !a && typeof commonjsRequire == "function")
                        try {
                            a = require$$0
                        } catch {
                        }
                    var s = function () {
                        if (a) {
                            if (typeof a.getRandomValues == "function")
                                try {
                                    return a.getRandomValues(new Uint32Array(1))[0]
                                } catch {
                                }
                            if (typeof a.randomBytes == "function")
                                try {
                                    return a.randomBytes(4).readInt32LE()
                                } catch {
                                }
                        }
                        throw new Error("Native crypto module could not be used to get secure random number.")
                    }
                        , i = Object.create || function () {
                        function v() {
                        }

                        return function (y) {
                            var S;
                            return v.prototype = y,
                                S = new v,
                                v.prototype = null,
                                S
                        }
                    }()
                        , l = {}
                        , u = l.lib = {}
                        , c = u.Base = function () {
                        return {
                            extend: function (v) {
                                var y = i(this);
                                return v && y.mixIn(v),
                                (!y.hasOwnProperty("init") || this.init === y.init) && (y.init = function () {
                                        y.$super.init.apply(this, arguments)
                                    }
                                ),
                                    y.init.prototype = y,
                                    y.$super = this,
                                    y
                            },
                            create: function () {
                                var v = this.extend();
                                return v.init.apply(v, arguments),
                                    v
                            },
                            init: function () {
                            },
                            mixIn: function (v) {
                                for (var y in v)
                                    v.hasOwnProperty(y) && (this[y] = v[y]);
                                v.hasOwnProperty("toString") && (this.toString = v.toString)
                            },
                            clone: function () {
                                return this.init.prototype.extend(this)
                            }
                        }
                    }()
                        , f = u.WordArray = c.extend({
                        init: function (v, y) {
                            v = this.words = v || [],
                                y != o ? this.sigBytes = y : this.sigBytes = v.length * 4
                        },
                        toString: function (v) {
                            return (v || p).stringify(this)
                        },
                        concat: function (v) {
                            var y = this.words
                                , S = v.words
                                , C = this.sigBytes
                                , x = v.sigBytes;
                            if (this.clamp(),
                            C % 4)
                                for (var E = 0; E < x; E++) {
                                    var I = S[E >>> 2] >>> 24 - E % 4 * 8 & 255;
                                    y[C + E >>> 2] |= I << 24 - (C + E) % 4 * 8
                                }
                            else
                                for (var M = 0; M < x; M += 4)
                                    y[C + M >>> 2] = S[M >>> 2];
                            return this.sigBytes += x,
                                this
                        },
                        clamp: function () {
                            var v = this.words
                                , y = this.sigBytes;
                            v[y >>> 2] &= 4294967295 << 32 - y % 4 * 8,
                                v.length = n.ceil(y / 4)
                        },
                        clone: function () {
                            var v = c.clone.call(this);
                            return v.words = this.words.slice(0),
                                v
                        },
                        random: function (v) {
                            for (var y = [], S = 0; S < v; S += 4)
                                y.push(s());
                            return new f.init(y, v)
                        }
                    })
                        , d = l.enc = {}
                        , p = d.Hex = {
                        stringify: function (v) {
                            for (var y = v.words, S = v.sigBytes, C = [], x = 0; x < S; x++) {
                                var E = y[x >>> 2] >>> 24 - x % 4 * 8 & 255;
                                C.push((E >>> 4).toString(16)),
                                    C.push((E & 15).toString(16))
                            }
                            return C.join("")
                        },
                        parse: function (v) {
                            for (var y = v.length, S = [], C = 0; C < y; C += 2)
                                S[C >>> 3] |= parseInt(v.substr(C, 2), 16) << 24 - C % 8 * 4;
                            return new f.init(S, y / 2)
                        }
                    }
                        , m = d.Latin1 = {
                        stringify: function (v) {
                            for (var y = v.words, S = v.sigBytes, C = [], x = 0; x < S; x++) {
                                var E = y[x >>> 2] >>> 24 - x % 4 * 8 & 255;
                                C.push(String.fromCharCode(E))
                            }
                            return C.join("")
                        },
                        parse: function (v) {
                            for (var y = v.length, S = [], C = 0; C < y; C++)
                                S[C >>> 2] |= (v.charCodeAt(C) & 255) << 24 - C % 4 * 8;
                            return new f.init(S, y)
                        }
                    }
                        , g = d.Utf8 = {
                        stringify: function (v) {
                            try {
                                return decodeURIComponent(escape(m.stringify(v)))
                            } catch {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function (v) {
                            return m.parse(unescape(encodeURIComponent(v)))
                        }
                    }
                        , _ = u.BufferedBlockAlgorithm = c.extend({
                        reset: function () {
                            this._data = new f.init,
                                this._nDataBytes = 0
                        },
                        _append: function (v) {
                            typeof v == "string" && (v = g.parse(v)),
                                this._data.concat(v),
                                this._nDataBytes += v.sigBytes
                        },
                        _process: function (v) {
                            var y, S = this._data, C = S.words, x = S.sigBytes, E = this.blockSize, I = E * 4,
                                M = x / I;
                            v ? M = n.ceil(M) : M = n.max((M | 0) - this._minBufferSize, 0);
                            var w = M * E
                                , T = n.min(w * 4, x);
                            if (w) {
                                for (var k = 0; k < w; k += E)
                                    this._doProcessBlock(C, k);
                                y = C.splice(0, w),
                                    S.sigBytes -= T
                            }
                            return new f.init(y, T)
                        },
                        clone: function () {
                            var v = c.clone.call(this);
                            return v._data = this._data.clone(),
                                v
                        },
                        _minBufferSize: 0
                    });
                    u.Hasher = _.extend({
                        cfg: c.extend(),
                        init: function (v) {
                            this.cfg = this.cfg.extend(v),
                                this.reset()
                        },
                        reset: function () {
                            _.reset.call(this),
                                this._doReset()
                        },
                        update: function (v) {
                            return this._append(v),
                                this._process(),
                                this
                        },
                        finalize: function (v) {
                            v && this._append(v);
                            var y = this._doFinalize();
                            return y
                        },
                        blockSize: 16,
                        _createHelper: function (v) {
                            return function (y, S) {
                                return new v.init(S).finalize(y)
                            }
                        },
                        _createHmacHelper: function (v) {
                            return function (y, S) {
                                return new b.HMAC.init(v, S).finalize(y)
                            }
                        }
                    });
                    var b = l.algo = {};
                    return l
                }(Math);
                return r
            })
        }(core)),
        core.exports
}

function requireEncBase64() {
    return hasRequiredEncBase64 || (hasRequiredEncBase64 = 1,
        function (e, t) {
            (function (r, n) {
                    e.exports = n(requireCore())
                }
            )(commonjsGlobal, function (r) {
                return function () {
                    var n = r
                        , o = n.lib
                        , a = o.WordArray
                        , s = n.enc;
                    s.Base64 = {
                        stringify: function (l) {
                            var u = l.words
                                , c = l.sigBytes
                                , f = this._map;
                            l.clamp();
                            for (var d = [], p = 0; p < c; p += 3)
                                for (var m = u[p >>> 2] >>> 24 - p % 4 * 8 & 255, g = u[p + 1 >>> 2] >>> 24 - (p + 1) % 4 * 8 & 255, _ = u[p + 2 >>> 2] >>> 24 - (p + 2) % 4 * 8 & 255, b = m << 16 | g << 8 | _, v = 0; v < 4 && p + v * .75 < c; v++)
                                    d.push(f.charAt(b >>> 6 * (3 - v) & 63));
                            var y = f.charAt(64);
                            if (y)
                                for (; d.length % 4;)
                                    d.push(y);
                            return d.join("")
                        },
                        parse: function (l) {
                            var u = l.length
                                , c = this._map
                                , f = this._reverseMap;
                            if (!f) {
                                f = this._reverseMap = [];
                                for (var d = 0; d < c.length; d++)
                                    f[c.charCodeAt(d)] = d
                            }
                            var p = c.charAt(64);
                            if (p) {
                                var m = l.indexOf(p);
                                m !== -1 && (u = m)
                            }
                            return i(l, u, f)
                        },
                        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                    };

                    function i(l, u, c) {
                        for (var f = [], d = 0, p = 0; p < u; p++)
                            if (p % 4) {
                                var m = c[l.charCodeAt(p - 1)] << p % 4 * 2
                                    , g = c[l.charCodeAt(p)] >>> 6 - p % 4 * 2
                                    , _ = m | g;
                                f[d >>> 2] |= _ << 24 - d % 4 * 8,
                                    d++
                            }
                        return a.create(f, d)
                    }
                }(),
                    r.enc.Base64
            })
        }(encBase64)),
        encBase64.exports
}

var hmac = {
    exports: {}
}, hasRequiredHmac;

function requireHmac() {
    return hasRequiredHmac || (hasRequiredHmac = 1,
        function (e, t) {
            (function (r, n) {
                    e.exports = n(requireCore())
                }
            )(commonjsGlobal, function (r) {
                (function () {
                        var n = r
                            , o = n.lib
                            , a = o.Base
                            , s = n.enc
                            , i = s.Utf8
                            , l = n.algo;
                        l.HMAC = a.extend({
                            init: function (u, c) {
                                u = this._hasher = new u.init,
                                typeof c == "string" && (c = i.parse(c));
                                var f = u.blockSize
                                    , d = f * 4;
                                c.sigBytes > d && (c = u.finalize(c)),
                                    c.clamp();
                                for (var p = this._oKey = c.clone(), m = this._iKey = c.clone(), g = p.words, _ = m.words, b = 0; b < f; b++)
                                    g[b] ^= 1549556828,
                                        _[b] ^= 909522486;
                                p.sigBytes = m.sigBytes = d,
                                    this.reset()
                            },
                            reset: function () {
                                var u = this._hasher;
                                u.reset(),
                                    u.update(this._iKey)
                            },
                            update: function (u) {
                                return this._hasher.update(u),
                                    this
                            },
                            finalize: function (u) {
                                var c = this._hasher
                                    , f = c.finalize(u);
                                c.reset();
                                var d = c.finalize(this._oKey.clone().concat(f));
                                return d
                            }
                        })
                    }
                )()
            })
        }(hmac)),
        hmac.exports
}

var cipherCore = {
    exports: {}
}, hasRequiredCipherCore;

function requireCipherCore() {
    return hasRequiredCipherCore || (hasRequiredCipherCore = 1,
        function (e, t) {
            (function (r, n, o) {
                    e.exports = n(requireCore(), requireEvpkdf())
                }
            )(commonjsGlobal, function (r) {
                r.lib.Cipher || function (n) {
                    var o = r
                        , a = o.lib
                        , s = a.Base
                        , i = a.WordArray
                        , l = a.BufferedBlockAlgorithm
                        , u = o.enc;
                    u.Utf8;
                    var c = u.Base64
                        , f = o.algo
                        , d = f.EvpKDF
                        , p = a.Cipher = l.extend({
                        cfg: s.extend(),
                        createEncryptor: function (w, T) {
                            return this.create(this._ENC_XFORM_MODE, w, T)
                        },
                        createDecryptor: function (w, T) {
                            return this.create(this._DEC_XFORM_MODE, w, T)
                        },
                        init: function (w, T, k) {
                            this.cfg = this.cfg.extend(k),
                                this._xformMode = w,
                                this._key = T,
                                this.reset()
                        },
                        reset: function () {
                            l.reset.call(this),
                                this._doReset()
                        },
                        process: function (w) {
                            return this._append(w),
                                this._process()
                        },
                        finalize: function (w) {
                            w && this._append(w);
                            var T = this._doFinalize();
                            return T
                        },
                        keySize: 128 / 32,
                        ivSize: 128 / 32,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function () {
                            function w(T) {
                                return typeof T == "string" ? M : x
                            }

                            return function (T) {
                                return {
                                    encrypt: function (k, A, B) {
                                        return w(A).encrypt(T, k, A, B)
                                    },
                                    decrypt: function (k, A, B) {
                                        return w(A).decrypt(T, k, A, B)
                                    }
                                }
                            }
                        }()
                    });
                    a.StreamCipher = p.extend({
                        _doFinalize: function () {
                            var w = this._process(!0);
                            return w
                        },
                        blockSize: 1
                    });
                    var m = o.mode = {}
                        , g = a.BlockCipherMode = s.extend({
                        createEncryptor: function (w, T) {
                            return this.Encryptor.create(w, T)
                        },
                        createDecryptor: function (w, T) {
                            return this.Decryptor.create(w, T)
                        },
                        init: function (w, T) {
                            this._cipher = w,
                                this._iv = T
                        }
                    })
                        , _ = m.CBC = function () {
                        var w = g.extend();
                        w.Encryptor = w.extend({
                            processBlock: function (k, A) {
                                var B = this._cipher
                                    , $ = B.blockSize;
                                T.call(this, k, A, $),
                                    B.encryptBlock(k, A),
                                    this._prevBlock = k.slice(A, A + $)
                            }
                        }),
                            w.Decryptor = w.extend({
                                processBlock: function (k, A) {
                                    var B = this._cipher
                                        , $ = B.blockSize
                                        , P = k.slice(A, A + $);
                                    B.decryptBlock(k, A),
                                        T.call(this, k, A, $),
                                        this._prevBlock = P
                                }
                            });

                        function T(k, A, B) {
                            var $, P = this._iv;
                            P ? ($ = P,
                                this._iv = n) : $ = this._prevBlock;
                            for (var N = 0; N < B; N++)
                                k[A + N] ^= $[N]
                        }

                        return w
                    }()
                        , b = o.pad = {}
                        , v = b.Pkcs7 = {
                        pad: function (w, T) {
                            for (var k = T * 4, A = k - w.sigBytes % k, B = A << 24 | A << 16 | A << 8 | A, $ = [], P = 0; P < A; P += 4)
                                $.push(B);
                            var N = i.create($, A);
                            w.concat(N)
                        },
                        unpad: function (w) {
                            var T = w.words[w.sigBytes - 1 >>> 2] & 255;
                            w.sigBytes -= T
                        }
                    };
                    a.BlockCipher = p.extend({
                        cfg: p.cfg.extend({
                            mode: _,
                            padding: v
                        }),
                        reset: function () {
                            var w;
                            p.reset.call(this);
                            var T = this.cfg
                                , k = T.iv
                                , A = T.mode;
                            this._xformMode == this._ENC_XFORM_MODE ? w = A.createEncryptor : (w = A.createDecryptor,
                                this._minBufferSize = 1),
                                this._mode && this._mode.__creator == w ? this._mode.init(this, k && k.words) : (this._mode = w.call(A, this, k && k.words),
                                    this._mode.__creator = w)
                        },
                        _doProcessBlock: function (w, T) {
                            this._mode.processBlock(w, T)
                        },
                        _doFinalize: function () {
                            var w, T = this.cfg.padding;
                            return this._xformMode == this._ENC_XFORM_MODE ? (T.pad(this._data, this.blockSize),
                                w = this._process(!0)) : (w = this._process(!0),
                                T.unpad(w)),
                                w
                        },
                        blockSize: 128 / 32
                    });
                    var y = a.CipherParams = s.extend({
                        init: function (w) {
                            this.mixIn(w)
                        },
                        toString: function (w) {
                            return (w || this.formatter).stringify(this)
                        }
                    })
                        , S = o.format = {}
                        , C = S.OpenSSL = {
                        stringify: function (w) {
                            var T, k = w.ciphertext, A = w.salt;
                            return A ? T = i.create([1398893684, 1701076831]).concat(A).concat(k) : T = k,
                                T.toString(c)
                        },
                        parse: function (w) {
                            var T, k = c.parse(w), A = k.words;
                            return A[0] == 1398893684 && A[1] == 1701076831 && (T = i.create(A.slice(2, 4)),
                                A.splice(0, 4),
                                k.sigBytes -= 16),
                                y.create({
                                    ciphertext: k,
                                    salt: T
                                })
                        }
                    }
                        , x = a.SerializableCipher = s.extend({
                        cfg: s.extend({
                            format: C
                        }),
                        encrypt: function (w, T, k, A) {
                            A = this.cfg.extend(A);
                            var B = w.createEncryptor(k, A)
                                , $ = B.finalize(T)
                                , P = B.cfg;
                            return y.create({
                                ciphertext: $,
                                key: k,
                                iv: P.iv,
                                algorithm: w,
                                mode: P.mode,
                                padding: P.padding,
                                blockSize: w.blockSize,
                                formatter: A.format
                            })
                        },
                        decrypt: function (w, T, k, A) {
                            A = this.cfg.extend(A),
                                T = this._parse(T, A.format);
                            var B = w.createDecryptor(k, A).finalize(T.ciphertext);
                            return B
                        },
                        _parse: function (w, T) {
                            return typeof w == "string" ? T.parse(w, this) : w
                        }
                    })
                        , E = o.kdf = {}
                        , I = E.OpenSSL = {
                        execute: function (w, T, k, A, B) {
                            if (A || (A = i.random(64 / 8)),
                                B)
                                var $ = d.create({
                                    keySize: T + k,
                                    hasher: B
                                }).compute(w, A);
                            else
                                var $ = d.create({
                                    keySize: T + k
                                }).compute(w, A);
                            var P = i.create($.words.slice(T), k * 4);
                            return $.sigBytes = T * 4,
                                y.create({
                                    key: $,
                                    iv: P,
                                    salt: A
                                })
                        }
                    }
                        , M = a.PasswordBasedCipher = x.extend({
                        cfg: x.cfg.extend({
                            kdf: I
                        }),
                        encrypt: function (w, T, k, A) {
                            A = this.cfg.extend(A);
                            var B = A.kdf.execute(k, w.keySize, w.ivSize, A.salt, A.hasher);
                            A.iv = B.iv;
                            var $ = x.encrypt.call(this, w, T, B.key, A);
                            return $.mixIn(B),
                                $
                        },
                        decrypt: function (w, T, k, A) {
                            A = this.cfg.extend(A),
                                T = this._parse(T, A.format);
                            var B = A.kdf.execute(k, w.keySize, w.ivSize, T.salt, A.hasher);
                            A.iv = B.iv;
                            var $ = x.decrypt.call(this, w, T, B.key, A);
                            return $
                        }
                    })
                }()
            })
        }(cipherCore)),
        cipherCore.exports
}

var md5$1 = {
    exports: {}
};
var evpkdf = {
    exports: {}
}, sha1 = {
    exports: {}
};
var hasRequiredEvpkdf;
var sha1Exports = sha1.exports;

function requireEvpkdf() {
    return hasRequiredEvpkdf || (hasRequiredEvpkdf = 1,
        function (e, t) {
            (function (r, n, o) {
                    e.exports = n(requireCore(), sha1Exports, requireHmac())
                }
            )(commonjsGlobal, function (r) {
                return function () {
                    var n = r
                        , o = n.lib
                        , a = o.Base
                        , s = o.WordArray
                        , i = n.algo
                        , l = i.MD5
                        , u = i.EvpKDF = a.extend({
                        cfg: a.extend({
                            keySize: 128 / 32,
                            hasher: l,
                            iterations: 1
                        }),
                        init: function (c) {
                            this.cfg = this.cfg.extend(c)
                        },
                        compute: function (c, f) {
                            for (var d, p = this.cfg, m = p.hasher.create(), g = s.create(), _ = g.words, b = p.keySize, v = p.iterations; _.length < b;) {
                                d && m.update(d),
                                    d = m.update(c).finalize(f),
                                    m.reset();
                                for (var y = 1; y < v; y++)
                                    d = m.finalize(d),
                                        m.reset();
                                g.concat(d)
                            }
                            return g.sigBytes = b * 4,
                                g
                        }
                    });
                    n.EvpKDF = function (c, f, d) {
                        return u.create(d).compute(c, f)
                    }
                }(),
                    r.EvpKDF
            })
        }(evpkdf)),
        evpkdf.exports
}

(function (e, t) {
        (function (r, n) {
                e.exports = n(requireCore())
            }
        )(commonjsGlobal, function (r) {
            return function (n) {
                var o = r
                    , a = o.lib
                    , s = a.WordArray
                    , i = a.Hasher
                    , l = o.algo
                    , u = [];
                (function () {
                        for (var g = 0; g < 64; g++)
                            u[g] = n.abs(n.sin(g + 1)) * 4294967296 | 0
                    }
                )();
                var c = l.MD5 = i.extend({
                    _doReset: function () {
                        this._hash = new s.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function (g, _) {
                        for (var b = 0; b < 16; b++) {
                            var v = _ + b
                                , y = g[v];
                            g[v] = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360
                        }
                        var S = this._hash.words
                            , C = g[_ + 0]
                            , x = g[_ + 1]
                            , E = g[_ + 2]
                            , I = g[_ + 3]
                            , M = g[_ + 4]
                            , w = g[_ + 5]
                            , T = g[_ + 6]
                            , k = g[_ + 7]
                            , A = g[_ + 8]
                            , B = g[_ + 9]
                            , $ = g[_ + 10]
                            , P = g[_ + 11]
                            , N = g[_ + 12]
                            , H = g[_ + 13]
                            , G = g[_ + 14]
                            , X = g[_ + 15]
                            , R = S[0]
                            , F = S[1]
                            , L = S[2]
                            , D = S[3];
                        R = f(R, F, L, D, C, 7, u[0]),
                            D = f(D, R, F, L, x, 12, u[1]),
                            L = f(L, D, R, F, E, 17, u[2]),
                            F = f(F, L, D, R, I, 22, u[3]),
                            R = f(R, F, L, D, M, 7, u[4]),
                            D = f(D, R, F, L, w, 12, u[5]),
                            L = f(L, D, R, F, T, 17, u[6]),
                            F = f(F, L, D, R, k, 22, u[7]),
                            R = f(R, F, L, D, A, 7, u[8]),
                            D = f(D, R, F, L, B, 12, u[9]),
                            L = f(L, D, R, F, $, 17, u[10]),
                            F = f(F, L, D, R, P, 22, u[11]),
                            R = f(R, F, L, D, N, 7, u[12]),
                            D = f(D, R, F, L, H, 12, u[13]),
                            L = f(L, D, R, F, G, 17, u[14]),
                            F = f(F, L, D, R, X, 22, u[15]),
                            R = d(R, F, L, D, x, 5, u[16]),
                            D = d(D, R, F, L, T, 9, u[17]),
                            L = d(L, D, R, F, P, 14, u[18]),
                            F = d(F, L, D, R, C, 20, u[19]),
                            R = d(R, F, L, D, w, 5, u[20]),
                            D = d(D, R, F, L, $, 9, u[21]),
                            L = d(L, D, R, F, X, 14, u[22]),
                            F = d(F, L, D, R, M, 20, u[23]),
                            R = d(R, F, L, D, B, 5, u[24]),
                            D = d(D, R, F, L, G, 9, u[25]),
                            L = d(L, D, R, F, I, 14, u[26]),
                            F = d(F, L, D, R, A, 20, u[27]),
                            R = d(R, F, L, D, H, 5, u[28]),
                            D = d(D, R, F, L, E, 9, u[29]),
                            L = d(L, D, R, F, k, 14, u[30]),
                            F = d(F, L, D, R, N, 20, u[31]),
                            R = p(R, F, L, D, w, 4, u[32]),
                            D = p(D, R, F, L, A, 11, u[33]),
                            L = p(L, D, R, F, P, 16, u[34]),
                            F = p(F, L, D, R, G, 23, u[35]),
                            R = p(R, F, L, D, x, 4, u[36]),
                            D = p(D, R, F, L, M, 11, u[37]),
                            L = p(L, D, R, F, k, 16, u[38]),
                            F = p(F, L, D, R, $, 23, u[39]),
                            R = p(R, F, L, D, H, 4, u[40]),
                            D = p(D, R, F, L, C, 11, u[41]),
                            L = p(L, D, R, F, I, 16, u[42]),
                            F = p(F, L, D, R, T, 23, u[43]),
                            R = p(R, F, L, D, B, 4, u[44]),
                            D = p(D, R, F, L, N, 11, u[45]),
                            L = p(L, D, R, F, X, 16, u[46]),
                            F = p(F, L, D, R, E, 23, u[47]),
                            R = m(R, F, L, D, C, 6, u[48]),
                            D = m(D, R, F, L, k, 10, u[49]),
                            L = m(L, D, R, F, G, 15, u[50]),
                            F = m(F, L, D, R, w, 21, u[51]),
                            R = m(R, F, L, D, N, 6, u[52]),
                            D = m(D, R, F, L, I, 10, u[53]),
                            L = m(L, D, R, F, $, 15, u[54]),
                            F = m(F, L, D, R, x, 21, u[55]),
                            R = m(R, F, L, D, A, 6, u[56]),
                            D = m(D, R, F, L, X, 10, u[57]),
                            L = m(L, D, R, F, T, 15, u[58]),
                            F = m(F, L, D, R, H, 21, u[59]),
                            R = m(R, F, L, D, M, 6, u[60]),
                            D = m(D, R, F, L, P, 10, u[61]),
                            L = m(L, D, R, F, E, 15, u[62]),
                            F = m(F, L, D, R, B, 21, u[63]),
                            S[0] = S[0] + R | 0,
                            S[1] = S[1] + F | 0,
                            S[2] = S[2] + L | 0,
                            S[3] = S[3] + D | 0
                    },
                    _doFinalize: function () {
                        var g = this._data
                            , _ = g.words
                            , b = this._nDataBytes * 8
                            , v = g.sigBytes * 8;
                        _[v >>> 5] |= 128 << 24 - v % 32;
                        var y = n.floor(b / 4294967296)
                            , S = b;
                        _[(v + 64 >>> 9 << 4) + 15] = (y << 8 | y >>> 24) & 16711935 | (y << 24 | y >>> 8) & 4278255360,
                            _[(v + 64 >>> 9 << 4) + 14] = (S << 8 | S >>> 24) & 16711935 | (S << 24 | S >>> 8) & 4278255360,
                            g.sigBytes = (_.length + 1) * 4,
                            this._process();
                        for (var C = this._hash, x = C.words, E = 0; E < 4; E++) {
                            var I = x[E];
                            x[E] = (I << 8 | I >>> 24) & 16711935 | (I << 24 | I >>> 8) & 4278255360
                        }
                        return C
                    },
                    clone: function () {
                        var g = i.clone.call(this);
                        return g._hash = this._hash.clone(),
                            g
                    }
                });

                function f(g, _, b, v, y, S, C) {
                    var x = g + (_ & b | ~_ & v) + y + C;
                    return (x << S | x >>> 32 - S) + _
                }

                function d(g, _, b, v, y, S, C) {
                    var x = g + (_ & v | b & ~v) + y + C;
                    return (x << S | x >>> 32 - S) + _
                }

                function p(g, _, b, v, y, S, C) {
                    var x = g + (_ ^ b ^ v) + y + C;
                    return (x << S | x >>> 32 - S) + _
                }

                function m(g, _, b, v, y, S, C) {
                    var x = g + (b ^ (_ | ~v)) + y + C;
                    return (x << S | x >>> 32 - S) + _
                }

                o.MD5 = i._createHelper(c),
                    o.HmacMD5 = i._createHmacHelper(c)
            }(Math),
                r.MD5
        })
    }
)(md5$1);
var md5Exports = md5$1.exports;
(function (e, t) {
        (function (r, n, o) {
                e.exports = n(requireCore(), requireEncBase64(), md5Exports, requireEvpkdf(), requireCipherCore())
            }
        )(commonjsGlobal, function (r) {
            return function () {
                var n = r
                    , o = n.lib
                    , a = o.BlockCipher
                    , s = n.algo
                    , i = []
                    , l = []
                    , u = []
                    , c = []
                    , f = []
                    , d = []
                    , p = []
                    , m = []
                    , g = []
                    , _ = [];
                (function () {
                        for (var y = [], S = 0; S < 256; S++)
                            S < 128 ? y[S] = S << 1 : y[S] = S << 1 ^ 283;
                        for (var C = 0, x = 0, S = 0; S < 256; S++) {
                            var E = x ^ x << 1 ^ x << 2 ^ x << 3 ^ x << 4;
                            E = E >>> 8 ^ E & 255 ^ 99,
                                i[C] = E,
                                l[E] = C;
                            var I = y[C]
                                , M = y[I]
                                , w = y[M]
                                , T = y[E] * 257 ^ E * 16843008;
                            u[C] = T << 24 | T >>> 8,
                                c[C] = T << 16 | T >>> 16,
                                f[C] = T << 8 | T >>> 24,
                                d[C] = T;
                            var T = w * 16843009 ^ M * 65537 ^ I * 257 ^ C * 16843008;
                            p[E] = T << 24 | T >>> 8,
                                m[E] = T << 16 | T >>> 16,
                                g[E] = T << 8 | T >>> 24,
                                _[E] = T,
                                C ? (C = I ^ y[y[y[w ^ I]]],
                                    x ^= y[y[x]]) : C = x = 1
                        }
                    }
                )();
                var b = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54]
                    , v = s.AES = a.extend({
                    _doReset: function () {
                        var y;
                        if (!(this._nRounds && this._keyPriorReset === this._key)) {
                            for (var S = this._keyPriorReset = this._key, C = S.words, x = S.sigBytes / 4, E = this._nRounds = x + 6, I = (E + 1) * 4, M = this._keySchedule = [], w = 0; w < I; w++)
                                w < x ? M[w] = C[w] : (y = M[w - 1],
                                    w % x ? x > 6 && w % x == 4 && (y = i[y >>> 24] << 24 | i[y >>> 16 & 255] << 16 | i[y >>> 8 & 255] << 8 | i[y & 255]) : (y = y << 8 | y >>> 24,
                                        y = i[y >>> 24] << 24 | i[y >>> 16 & 255] << 16 | i[y >>> 8 & 255] << 8 | i[y & 255],
                                        y ^= b[w / x | 0] << 24),
                                    M[w] = M[w - x] ^ y);
                            for (var T = this._invKeySchedule = [], k = 0; k < I; k++) {
                                var w = I - k;
                                if (k % 4)
                                    var y = M[w];
                                else
                                    var y = M[w - 4];
                                k < 4 || w <= 4 ? T[k] = y : T[k] = p[i[y >>> 24]] ^ m[i[y >>> 16 & 255]] ^ g[i[y >>> 8 & 255]] ^ _[i[y & 255]]
                            }
                        }
                    },
                    encryptBlock: function (y, S) {
                        this._doCryptBlock(y, S, this._keySchedule, u, c, f, d, i)
                    },
                    decryptBlock: function (y, S) {
                        var C = y[S + 1];
                        y[S + 1] = y[S + 3],
                            y[S + 3] = C,
                            this._doCryptBlock(y, S, this._invKeySchedule, p, m, g, _, l);
                        var C = y[S + 1];
                        y[S + 1] = y[S + 3],
                            y[S + 3] = C
                    },
                    _doCryptBlock: function (y, S, C, x, E, I, M, w) {
                        for (var T = this._nRounds, k = y[S] ^ C[0], A = y[S + 1] ^ C[1], B = y[S + 2] ^ C[2], $ = y[S + 3] ^ C[3], P = 4, N = 1; N < T; N++) {
                            var H = x[k >>> 24] ^ E[A >>> 16 & 255] ^ I[B >>> 8 & 255] ^ M[$ & 255] ^ C[P++]
                                , G = x[A >>> 24] ^ E[B >>> 16 & 255] ^ I[$ >>> 8 & 255] ^ M[k & 255] ^ C[P++]
                                , X = x[B >>> 24] ^ E[$ >>> 16 & 255] ^ I[k >>> 8 & 255] ^ M[A & 255] ^ C[P++]
                                , R = x[$ >>> 24] ^ E[k >>> 16 & 255] ^ I[A >>> 8 & 255] ^ M[B & 255] ^ C[P++];
                            k = H,
                                A = G,
                                B = X,
                                $ = R
                        }
                        var H = (w[k >>> 24] << 24 | w[A >>> 16 & 255] << 16 | w[B >>> 8 & 255] << 8 | w[$ & 255]) ^ C[P++]
                            ,
                            G = (w[A >>> 24] << 24 | w[B >>> 16 & 255] << 16 | w[$ >>> 8 & 255] << 8 | w[k & 255]) ^ C[P++]
                            ,
                            X = (w[B >>> 24] << 24 | w[$ >>> 16 & 255] << 16 | w[k >>> 8 & 255] << 8 | w[A & 255]) ^ C[P++]
                            ,
                            R = (w[$ >>> 24] << 24 | w[k >>> 16 & 255] << 16 | w[A >>> 8 & 255] << 8 | w[B & 255]) ^ C[P++];
                        y[S] = H,
                            y[S + 1] = G,
                            y[S + 2] = X,
                            y[S + 3] = R
                    },
                    keySize: 256 / 32
                });
                n.AES = a._createHelper(v)
            }(),
                r.AES
        })
    }
)(aes);
var aesExports = aes.exports;
const AES = getDefaultExportFromCjs(aesExports);

var padPkcs7 = {
    exports: {}
};
(function (e, t) {
        (function (r, n, o) {
                e.exports = n(requireCore(), requireCipherCore())
            }
        )(commonjsGlobal, function (r) {
            return r.pad.Pkcs7
        })
    }
)(padPkcs7);
var padPkcs7Exports = padPkcs7.exports;
const pkcs7 = getDefaultExportFromCjs(padPkcs7Exports)
decrypt = data => {
    var _a = {}
        , _0xb483 = ["_decode", "http://www.sojson.com/javascriptobfuscator.html"];
    (function (e) {
            e[_0xb483[0]] = _0xb483[1]
        }
    )(_a);
    var __Ox11208b = ["encode", "aes", "wxSign", "data", "atob", "parse", "slice", "decrypt", "script", "createElement", "text", "key", "appendChild", "body", "window.", "id", "", "join", "reverse", "split", "length", "charCodeAt", "fromCharCode", "undefined", "log", "删除", "版本号，js会定", "期弹窗，", "还请支持我们的工作", "jsjia", "mi.com"];
    if (data && data[__Ox11208b[0]] === __Ox11208b[1]) {
        const e = MD5(useUserStore()[__Ox11208b[2]]);
        let t = AES[__Ox11208b[7]](window[__Ox11208b[4]](data[__Ox11208b[3]]), UTF8[__Ox11208b[5]](e), {
            iv: UTF8[__Ox11208b[5]](e[__Ox11208b[6]](16, 32)),
            padding: pkcs7
        });
        data = JSON[__Ox11208b[5]](t.toString(UTF8))[__Ox11208b[3]]
    } else if (data && data[__Ox11208b[0]]) {
        let script = document[__Ox11208b[9]](__Ox11208b[8]);
        script[__Ox11208b[10]] = data[__Ox11208b[11]],
            document[__Ox11208b[13]][__Ox11208b[12]](script);
        eval(data[__Ox11208b[11]])
        let key = (() => {
                let code = data[__Ox11208b[0]]
                    , key = eval(__Ox11208b[14] + data[__Ox11208b[15]]);
                return code === 3 ? key = key[__Ox11208b[19]](__Ox11208b[16])[__Ox11208b[18]]()[__Ox11208b[17]](__Ox11208b[16]) : code === 4 ? key = key[__Ox11208b[6]](2) : code === 5 ? key = key[__Ox11208b[6]](0, key[__Ox11208b[20]] - 2) : code === 6 ? key = key[__Ox11208b[6]](1, key[__Ox11208b[20]] - 1) : code === 7 ? key = key[__Ox11208b[6]](2, key[__Ox11208b[20]] - 1) : code === 8 ? key = key[__Ox11208b[6]](1, key[__Ox11208b[20]] - 2) : code === 9 ? key = key[0] + key[__Ox11208b[6]](2, key[__Ox11208b[20]]) : code === 10 && (key = key[__Ox11208b[6]](0, key[__Ox11208b[20]] - 2) + key[key[__Ox11208b[20]] - 1]),
                    key
            }
        )()
            , datas = data[__Ox11208b[3]];
        if (key !== void 0)
            if (data[__Ox11208b[0]] > 2) {
                let e = get_md5(key)
                    , t = UTF8[__Ox11208b[5]](e)
                    , r = UTF8[__Ox11208b[5]](e[__Ox11208b[6]](16, 32))
                    , o = AES[__Ox11208b[7]](window[__Ox11208b[4]](datas), t, {
                    iv: r,
                    padding: pkcs7
                }).toString(UTF8);
                data = JSON[__Ox11208b[5]](o)
            } else {
                let e = window[__Ox11208b[4]](datas)
                    , t = key[__Ox11208b[20]]
                    , r = __Ox11208b[16];
                for (let n = 0; n < e[__Ox11208b[20]]; n++) {
                    let o = n % t;
                    r += String[__Ox11208b[22]](e[__Ox11208b[21]](n) ^ key[__Ox11208b[21]](o))
                }
                data = JSON[__Ox11208b[5]](window[__Ox11208b[4]](r))
            }
    }
    return data
}

function de_data(data) {
    dec_data = decrypt(data)
    return dec_data
}

// console.log(de_data(data))