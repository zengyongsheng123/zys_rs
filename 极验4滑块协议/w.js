var CryptoJS = CryptoJS || function (u, p) {
    var d = {}, l = d.lib = {}, s = function () {
    }, t = l.Base = {
        extend: function (a) {
            s.prototype = this;
            var c = new s;
            a && c.mixIn(a);
            c.hasOwnProperty("init") || (c.init = function () {
                c.$super.init.apply(this, arguments)
            });
            c.init.prototype = c;
            c.$super = this;
            return c
        }, create: function () {
            var a = this.extend();
            a.init.apply(a, arguments);
            return a
        }, init: function () {
        }, mixIn: function (a) {
            for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
            a.hasOwnProperty("toString") && (this.toString = a.toString)
        }, clone: function () {
            return this.init.prototype.extend(this)
        }
    }, r = l.WordArray = t.extend({
        init: function (a, c) {
            a = this.words = a || [];
            this.sigBytes = c != p ? c : 4 * a.length
        }, toString: function (a) {
            return (a || v).stringify(this)
        }, concat: function (a) {
            var c = this.words, e = a.words, j = this.sigBytes;
            a = a.sigBytes;
            this.clamp();
            if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e);
            this.sigBytes += a;
            return this
        }, clamp: function () {
            var a = this.words, c = this.sigBytes;
            a[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4);
            a.length = u.ceil(c / 4)
        }, clone: function () {
            var a = t.clone.call(this);
            a.words = this.words.slice(0);
            return a
        }, random: function (a) {
            for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0);
            return new r.init(c, a)
        }
    }), w = d.enc = {}, v = w.Hex = {
        stringify: function (a) {
            var c = a.words;
            a = a.sigBytes;
            for (var e = [], j = 0; j < a; j++) {
                var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255;
                e.push((k >>> 4).toString(16));
                e.push((k & 15).toString(16))
            }
            return e.join("")
        }, parse: function (a) {
            for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << 24 - 4 * (j % 8);
            return new r.init(e, c / 2)
        }
    }, b = w.Latin1 = {
        stringify: function (a) {
            var c = a.words;
            a = a.sigBytes;
            for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255));
            return e.join("")
        }, parse: function (a) {
            for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4);
            return new r.init(e, c)
        }
    }, x = w.Utf8 = {
        stringify: function (a) {
            try {
                return decodeURIComponent(escape(b.stringify(a)))
            } catch (c) {
                throw Error("Malformed UTF-8 data");
            }
        }, parse: function (a) {
            return b.parse(unescape(encodeURIComponent(a)))
        }
    }, q = l.BufferedBlockAlgorithm = t.extend({
        reset: function () {
            this._data = new r.init;
            this._nDataBytes = 0
        }, _append: function (a) {
            "string" == typeof a && (a = x.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
        }, _process: function (a) {
            var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k),
                b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0);
            a = b * k;
            j = u.min(4 * a, j);
            if (a) {
                for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
                q = e.splice(0, a);
                c.sigBytes -= j
            }
            return new r.init(q, j)
        }, clone: function () {
            var a = t.clone.call(this);
            a._data = this._data.clone();
            return a
        }, _minBufferSize: 0
    });
    l.Hasher = q.extend({
        cfg: t.extend(), init: function (a) {
            this.cfg = this.cfg.extend(a);
            this.reset()
        }, reset: function () {
            q.reset.call(this);
            this._doReset()
        }, update: function (a) {
            this._append(a);
            this._process();
            return this
        }, finalize: function (a) {
            a && this._append(a);
            return this._doFinalize()
        }, blockSize: 16, _createHelper: function (a) {
            return function (b, e) {
                return (new a.init(e)).finalize(b)
            }
        }, _createHmacHelper: function (a) {
            return function (b, e) {
                return (new n.HMAC.init(a, e)).finalize(b)
            }
        }
    });
    var n = d.algo = {};
    return d
}(Math);
(function () {
    var u = CryptoJS, p = u.lib.WordArray;
    u.enc.Base64 = {
        stringify: function (d) {
            var l = d.words, p = d.sigBytes, t = this._map;
            d.clamp();
            d = [];
            for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63));
            if (l = t.charAt(64)) for (; d.length % 4;) d.push(l);
            return d.join("")
        }, parse: function (d) {
            var l = d.length, s = this._map, t = s.charAt(64);
            t && (t = d.indexOf(t), -1 != t && (l = t));
            for (var t = [], r = 0, w = 0; w < l; w++) if (w % 4) {
                var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4);
                t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4);
                r++
            }
            return p.create(t, r)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function (u) {
    function p(b, n, a, c, e, j, k) {
        b = b + (n & a | ~n & c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function d(b, n, a, c, e, j, k) {
        b = b + (n & c | a & ~c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function l(b, n, a, c, e, j, k) {
        b = b + (n ^ a ^ c) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    function s(b, n, a, c, e, j, k) {
        b = b + (a ^ (n | ~c)) + e + k;
        return (b << j | b >>> 32 - j) + n
    }

    for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0;
    r = r.MD5 = v.extend({
        _doReset: function () {
            this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878])
        }, _doProcessBlock: function (q, n) {
            for (var a = 0; 16 > a; a++) {
                var c = n + a, e = q[c];
                q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360
            }
            var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4],
                r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11],
                u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3],
                f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]),
                m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]),
                g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]), f = p(f, m, g, h, v, 7, b[8]),
                h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]),
                f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]),
                m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]),
                g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]),
                h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]),
                f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]),
                m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f, m, g, j, 9, b[29]),
                g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]),
                h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]),
                f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]),
                m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]),
                g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]),
                h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]),
                f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m, E, 15, b[50]),
                m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]),
                g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]),
                h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]),
                f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]),
                m = s(m, g, h, f, A, 21, b[63]);
            a[0] = a[0] + f | 0;
            a[1] = a[1] + m | 0;
            a[2] = a[2] + g | 0;
            a[3] = a[3] + h | 0
        }, _doFinalize: function () {
            var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes;
            n[c >>> 5] |= 128 << 24 - c % 32;
            var e = u.floor(a / 4294967296);
            n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360;
            n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360;
            b.sigBytes = 4 * (n.length + 1);
            this._process();
            b = this._hash;
            n = b.words;
            for (a = 0; 4 > a; a++) c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360;
            return b
        }, clone: function () {
            var b = v.clone.call(this);
            b._hash = this._hash.clone();
            return b
        }
    });
    t.MD5 = v._createHelper(r);
    t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
    var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({
        cfg: d.extend({keySize: 4, hasher: p.MD5, iterations: 1}), init: function (d) {
            this.cfg = this.cfg.extend(d)
        }, compute: function (d, r) {
            for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) {
                n && s.update(n);
                var n = s.update(d).finalize(r);
                s.reset();
                for (var a = 1; a < p; a++) n = s.finalize(n), s.reset();
                b.concat(n)
            }
            b.sigBytes = 4 * q;
            return b
        }
    });
    u.EvpKDF = function (d, l, p) {
        return s.create(p).compute(d, l)
    }
})();
CryptoJS.lib.Cipher || function (u) {
    var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64,
        w = p.algo.EvpKDF, v = d.Cipher = t.extend({
            cfg: l.extend(), createEncryptor: function (e, a) {
                return this.create(this._ENC_XFORM_MODE, e, a)
            }, createDecryptor: function (e, a) {
                return this.create(this._DEC_XFORM_MODE, e, a)
            }, init: function (e, a, b) {
                this.cfg = this.cfg.extend(b);
                this._xformMode = e;
                this._key = a;
                this.reset()
            }, reset: function () {
                t.reset.call(this);
                this._doReset()
            }, process: function (e) {
                this._append(e);
                return this._process()
            }, finalize: function (e) {
                e && this._append(e);
                return this._doFinalize()
            }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) {
                return {
                    encrypt: function (b, k, d) {
                        return ("string" == typeof k ? c : a).encrypt(e, b, k, d)
                    }, decrypt: function (b, k, d) {
                        return ("string" == typeof k ? c : a).decrypt(e, b, k, d)
                    }
                }
            }
        });
    d.StreamCipher = v.extend({
        _doFinalize: function () {
            return this._process(!0)
        }, blockSize: 1
    });
    var b = p.mode = {}, x = function (e, a, b) {
        var c = this._iv;
        c ? this._iv = u : c = this._prevBlock;
        for (var d = 0; d < b; d++) e[a + d] ^= c[d]
    }, q = (d.BlockCipherMode = l.extend({
        createEncryptor: function (e, a) {
            return this.Encryptor.create(e, a)
        }, createDecryptor: function (e, a) {
            return this.Decryptor.create(e, a)
        }, init: function (e, a) {
            this._cipher = e;
            this._iv = a
        }
    })).extend();
    q.Encryptor = q.extend({
        processBlock: function (e, a) {
            var b = this._cipher, c = b.blockSize;
            x.call(this, e, a, c);
            b.encryptBlock(e, a);
            this._prevBlock = e.slice(a, a + c)
        }
    });
    q.Decryptor = q.extend({
        processBlock: function (e, a) {
            var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c);
            b.decryptBlock(e, a);
            x.call(this, e, a, c);
            this._prevBlock = d
        }
    });
    b = b.CBC = q;
    q = (p.pad = {}).Pkcs7 = {
        pad: function (a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d);
            c = s.create(l, c);
            a.concat(c)
        }, unpad: function (a) {
            a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255
        }
    };
    d.BlockCipher = v.extend({
        cfg: v.cfg.extend({mode: b, padding: q}), reset: function () {
            v.reset.call(this);
            var a = this.cfg, b = a.iv, a = a.mode;
            if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1;
            this._mode = c.call(a, this, b && b.words)
        }, _doProcessBlock: function (a, b) {
            this._mode.processBlock(a, b)
        }, _doFinalize: function () {
            var a = this.cfg.padding;
            if (this._xformMode == this._ENC_XFORM_MODE) {
                a.pad(this._data, this.blockSize);
                var b = this._process(!0)
            } else b = this._process(!0), a.unpad(b);
            return b
        }, blockSize: 4
    });
    var n = d.CipherParams = l.extend({
        init: function (a) {
            this.mixIn(a)
        }, toString: function (a) {
            return (a || this.formatter).stringify(this)
        }
    }), b = (p.format = {}).OpenSSL = {
        stringify: function (a) {
            var b = a.ciphertext;
            a = a.salt;
            return (a ? s.create([1398893684, 1701076831]).concat(a).concat(b) : b).toString(r)
        }, parse: function (a) {
            a = r.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
                var c = s.create(b.slice(2, 4));
                b.splice(0, 4);
                a.sigBytes -= 16
            }
            return n.create({ciphertext: a, salt: c})
        }
    }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({format: b}), encrypt: function (a, b, c, d) {
            d = this.cfg.extend(d);
            var l = a.createEncryptor(c, d);
            b = l.finalize(b);
            l = l.cfg;
            return n.create({
                ciphertext: b,
                key: c,
                iv: l.iv,
                algorithm: a,
                mode: l.mode,
                padding: l.padding,
                blockSize: a.blockSize,
                formatter: d.format
            })
        }, decrypt: function (a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            return a.createDecryptor(c, d).finalize(b.ciphertext)
        }, _parse: function (a, b) {
            return "string" == typeof a ? b.parse(a, this) : a
        }
    }), p = (p.kdf = {}).OpenSSL = {
        execute: function (a, b, c, d) {
            d || (d = s.random(8));
            a = w.create({keySize: b + c}).compute(a, d);
            c = s.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return n.create({key: a, iv: c, salt: d})
        }
    }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({kdf: p}), encrypt: function (b, c, d, l) {
            l = this.cfg.extend(l);
            d = l.kdf.execute(d, b.keySize, b.ivSize);
            l.iv = d.iv;
            b = a.encrypt.call(this, b, c, d.key, l);
            b.mixIn(d);
            return b
        }, decrypt: function (b, c, d, l) {
            l = this.cfg.extend(l);
            c = this._parse(c, l.format);
            d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
            l.iv = d.iv;
            return a.decrypt.call(this, b, c, d.key, l)
        }
    })
}();
(function () {
    for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283;
    for (var e = 0, j = 0, c = 0; 256 > c; c++) {
        var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99;
        l[e] = k;
        s[k] = e;
        var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k;
        t[e] = y << 24 | y >>> 8;
        r[e] = y << 16 | y >>> 16;
        w[e] = y << 8 | y >>> 24;
        v[e] = y;
        y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e;
        b[k] = y << 24 | y >>> 8;
        x[k] = y << 16 | y >>> 16;
        q[k] = y << 8 | y >>> 24;
        n[k] = y;
        e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1
    }
    var H = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
        _doReset: function () {
            for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j]; else {
                var k = e[j - 1];
                j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24);
                e[j] = e[j - d] ^ k
            }
            c = this._invKeySchedule = [];
            for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>> 8 & 255]] ^ n[l[k & 255]]
        }, encryptBlock: function (a, b) {
            this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l)
        }, decryptBlock: function (a, c) {
            var d = a[c + 1];
            a[c + 1] = a[c + 3];
            a[c + 3] = d;
            this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
            d = a[c + 1];
            a[c + 1] = a[c + 3];
            a[c + 3] = d
        }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
            for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t = d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t;
            q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++];
            s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++];
            t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++];
            n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++];
            a[b] = q;
            a[b + 1] = s;
            a[b + 2] = t;
            a[b + 3] = n
        }, keySize: 8
    });
    u.AES = p._createHelper(d)
})();
CryptoJS.mode.CFB = (function () {
    var CFB = CryptoJS.lib.BlockCipherMode.extend();
    CFB.Encryptor = CFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = words.slice(offset, offset + blockSize);
        }
    });
    CFB.Decryptor = CFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher;
            var blockSize = cipher.blockSize;
            var thisBlock = words.slice(offset, offset + blockSize);
            generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
            this._prevBlock = thisBlock;
        }
    });

    function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
        var iv = this._iv;
        if (iv) {
            var keystream = iv.slice(0);
            this._iv = undefined;
        } else {
            var keystream = this._prevBlock;
        }
        cipher.encryptBlock(keystream, 0);
        for (var i = 0; i < blockSize; i++) {
            words[offset + i] ^= keystream[i];
        }
    }

    return CFB;
}());
CryptoJS.mode.CTR = (function () {
    var CTR = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = CTR.Encryptor = CTR.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = undefined;
            }
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            counter[blockSize - 1] = (counter[blockSize - 1] + 1) | 0
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    CTR.Decryptor = Encryptor;
    return CTR;
}());
CryptoJS.mode.CTRGladman = (function () {
    var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();

    function incWord(word) {
        if (((word >> 24) & 0xff) === 0xff) {
            var b1 = (word >> 16) & 0xff;
            var b2 = (word >> 8) & 0xff;
            var b3 = word & 0xff;
            if (b1 === 0xff) {
                b1 = 0;
                if (b2 === 0xff) {
                    b2 = 0;
                    if (b3 === 0xff) {
                        b3 = 0;
                    } else {
                        ++b3;
                    }
                } else {
                    ++b2;
                }
            } else {
                ++b1;
            }
            word = 0;
            word += (b1 << 16);
            word += (b2 << 8);
            word += b3;
        } else {
            word += (0x01 << 24);
        }
        return word;
    }

    function incCounter(counter) {
        if ((counter[0] = incWord(counter[0])) === 0) {
            counter[1] = incWord(counter[1]);
        }
        return counter;
    }

    var Encryptor = CTRGladman.Encryptor = CTRGladman.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var counter = this._counter;
            if (iv) {
                counter = this._counter = iv.slice(0);
                this._iv = undefined;
            }
            incCounter(counter);
            var keystream = counter.slice(0);
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    CTRGladman.Decryptor = Encryptor;
    return CTRGladman;
}());
CryptoJS.mode.ECB = (function () {
    var ECB = CryptoJS.lib.BlockCipherMode.extend();
    ECB.Encryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.encryptBlock(words, offset);
        }
    });
    ECB.Decryptor = ECB.extend({
        processBlock: function (words, offset) {
            this._cipher.decryptBlock(words, offset);
        }
    });
    return ECB;
}());
CryptoJS.mode.OFB = (function () {
    var OFB = CryptoJS.lib.BlockCipherMode.extend();
    var Encryptor = OFB.Encryptor = OFB.extend({
        processBlock: function (words, offset) {
            var cipher = this._cipher
            var blockSize = cipher.blockSize;
            var iv = this._iv;
            var keystream = this._keystream;
            if (iv) {
                keystream = this._keystream = iv.slice(0);
                this._iv = undefined;
            }
            cipher.encryptBlock(keystream, 0);
            for (var i = 0; i < blockSize; i++) {
                words[offset + i] ^= keystream[i];
            }
        }
    });
    OFB.Decryptor = Encryptor;
    return OFB;
}());
CryptoJS.pad.AnsiX923 = {
    pad: function (data, blockSize) {
        var dataSigBytes = data.sigBytes;
        var blockSizeBytes = blockSize * 4;
        var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
        var lastBytePos = dataSigBytes + nPaddingBytes - 1;
        data.clamp();
        data.words[lastBytePos >>> 2] |= nPaddingBytes << (24 - (lastBytePos % 4) * 8);
        data.sigBytes += nPaddingBytes;
    }, unpad: function (data) {
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
        data.sigBytes -= nPaddingBytes;
    }
};
CryptoJS.pad.Iso10126 = {
    pad: function (data, blockSize) {
        var blockSizeBytes = blockSize * 4;
        var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
        data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
    }, unpad: function (data) {
        var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
        data.sigBytes -= nPaddingBytes;
    }
};
CryptoJS.pad.Iso97971 = {
    pad: function (data, blockSize) {
        data.concat(CryptoJS.lib.WordArray.create([0x80000000], 1));
        CryptoJS.pad.ZeroPadding.pad(data, blockSize);
    }, unpad: function (data) {
        CryptoJS.pad.ZeroPadding.unpad(data);
        data.sigBytes--;
    }
};
CryptoJS.pad.NoPadding = {
    pad: function () {
    }, unpad: function () {
    }
};
CryptoJS.pad.ZeroPadding = {
    pad: function (data, blockSize) {
        var blockSizeBytes = blockSize * 4;
        data.clamp();
        data.sigBytes += blockSizeBytes - ((data.sigBytes % blockSizeBytes) || blockSizeBytes);
    }, unpad: function (data) {
        var dataWords = data.words;
        var i = data.sigBytes - 1;
        while (!((dataWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff)) {
            i--;
        }
        data.sigBytes = i + 1;
    }
};

function encrypt_AES(textToencrypt, key, iv, mode, padding, hexkey, hexiv, hextext, hexresult) {
    if (typeof (mode) == "undefined") {
        mode = 0;
    }
    if (typeof (mode) == "string") {
        if (mode == "") {
            mode = 0
        } else {
            mode = parseInt(mode);
        }
    }
    if (mode >= 6) {
        mode = 0;
    }
    if (mode <= -1) {
        mode = 0;
    }
    if (typeof (padding) == "undefined") {
        padding = 0;
    }
    if (typeof (padding) == "string") {
        if (padding == "") {
            padding = 0
        } else {
            padding = parseInt(padding);
        }
    }
    if (padding > 5) {
        padding = 0;
    }
    if (padding < 0) {
        padding = 0;
    }
    if (typeof (hexkey) == "undefined") {
        hexkey = 0;
    }
    if (typeof (hexkey) == "string") {
        if (hexkey == "") {
            hexkey = 0
        } else {
            hexkey = parseInt(hexkey);
        }
    }
    if (hexkey) {
        key = CryptoJS.enc.Hex.parse(key)
    } else {
        key = CryptoJS.enc.Utf8.parse(key)
    }
    if (typeof (hexiv) == "undefined") {
        hexiv = 0;
    }
    if (typeof (hexiv) == "string") {
        if (hexiv == "") {
            hexiv = 0
        } else {
            hexiv = parseInt(hexiv);
        }
    }
    if (hexiv) {
        iv = CryptoJS.enc.Hex.parse(iv)
    } else {
        iv = CryptoJS.enc.Utf8.parse(iv)
    }
    if (typeof (hextext) == "undefined") {
        hextext = 0;
    }
    if (typeof (hextext) == "string") {
        if (hextext == "") {
            hextext = 0
        } else {
            hextext = parseInt(hextext);
        }
    }
    if (hextext) {
        textToencrypt = Base64Encode(HexDecode(textToencrypt))
    }
    switch (mode) {
        case 0:
            switch (padding) {
                case 0:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 1:
            switch (padding) {
                case 0:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 2:
            switch (padding) {
                case 0:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 3:
            switch (padding) {
                case 0:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 4:
            switch (padding) {
                case 0:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 5:
            switch (padding) {
                case 0:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var encrypted = CryptoJS.AES.encrypt(textToencrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
    }
    if (typeof (encrypted) == "undefined") {
        return mode + "  " + padding
    }
    if (typeof (hexresult) == "undefined") {
        hexresult = 0;
    }
    if (typeof (hexresult) == "string") {
        if (hexresult == "") {
            hexresult = 0
        } else {
            hexresult = parseInt(hexresult);
        }
    }
    if (hexresult) {
        return HexEncode(Base64Decode(encrypted.toString()))
    } else {
        return encrypted.toString()
    }
}

function decrypt_AES(textTodecrypt, key, iv, mode, padding, hexkey, hexiv, hextext) {
    if (typeof (mode) == "undefined") {
        mode = 0;
    }
    if (typeof (mode) == "string") {
        if (mode == "") {
            mode = 0
        } else {
            mode = parseInt(mode);
        }
    }
    if (mode >= 6) {
        mode = 0;
    }
    if (mode <= -1) {
        mode = 0;
    }
    if (typeof (padding) == "undefined") {
        padding = 0;
    }
    if (typeof (padding) == "string") {
        if (padding == "") {
            padding = 0
        } else {
            padding = parseInt(padding);
        }
    }
    if (padding > 5) {
        padding = 0;
    }
    if (padding < 0) {
        padding = 0;
    }
    if (typeof (hexkey) == "undefined") {
        hexkey = 0;
    }
    if (typeof (hexkey) == "string") {
        if (hexkey == "") {
            hexkey = 0
        } else {
            hexkey = parseInt(hexkey);
        }
    }
    if (hexkey) {
        key = CryptoJS.enc.Hex.parse(key)
    } else {
        key = CryptoJS.enc.Utf8.parse(key)
    }
    if (typeof (hexiv) == "undefined") {
        hexiv = 0;
    }
    if (typeof (hexiv) == "string") {
        if (hexiv == "") {
            hexiv = 0
        } else {
            hexiv = parseInt(hexiv);
        }
    }
    if (hexiv) {
        iv = CryptoJS.enc.Hex.parse(iv)
    } else {
        iv = CryptoJS.enc.Utf8.parse(iv)
    }
    if (typeof (hextext) == "undefined") {
        hextext = 0;
    }
    if (typeof (hextext) == "string") {
        if (hextext == "") {
            hextext = 0
        } else {
            hextext = parseInt(hextext);
        }
    }
    if (hextext) {
        textToencrypt = Base64Encode(HexDecode(textTodecrypt))
    }
    switch (mode) {
        case 0:
            switch (padding) {
                case 0:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CBC,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 1:
            switch (padding) {
                case 0:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 2:
            switch (padding) {
                case 0:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CFB,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 3:
            switch (padding) {
                case 0:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.OFB,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 4:
            switch (padding) {
                case 0:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTR,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
        case 5:
            switch (padding) {
                case 0:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    break;
                case 1:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.NoPadding
                    });
                    break;
                case 2:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.ZeroPadding
                    });
                    break;
                case 3:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.Iso10126
                    });
                    break;
                case 4:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.Iso97971
                    });
                    break;
                case 5:
                    var decrypted = CryptoJS.AES.decrypt(textTodecrypt, key, {
                        iv: iv,
                        mode: CryptoJS.mode.CTRGladman,
                        padding: CryptoJS.pad.AnsiX923
                    });
                    break;
            }
            break;
    }
    if (typeof (decrypted) == "undefined") {
        return mode + "  " + padding
    }
    return decrypted.toString(CryptoJS.enc.Utf8);
}

function HexEncode(str) {
    if (str === "") return "";
    var hexCharCode = [];
    for (var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

function HexDecode(hexCharCoAEStr) {
    var rawStr = hexCharCoAEStr.substr(0, 2).toLowerCase() === "0x" ? hexCharCoAEStr.substr(2) : hexCharCoAEStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
        return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
        curCharCode = parseInt(rawStr.substr(i, 2), 16);
        resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
}

function Base64Encode(str) {
    var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    var out, i, len;
    var c1, c2, c3;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        c1 = str.charCodeAt(i++) & 0xff;
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt((c1 & 0x3) << 4);
            out += "==";
            break;
        }
        c2 = str.charCodeAt(i++);
        if (i == len) {
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt((c2 & 0xF) << 2);
            out += "=";
            break;
        }
        c3 = str.charCodeAt(i++);
        out += base64EncodeChars.charAt(c1 >> 2);
        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
        out += base64EncodeChars.charAt(c3 & 0x3F);
    }
    return out;
}

function Base64Decode(str) {
    var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1) break;
        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1) break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61) return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1) break;
        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61) return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1) break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}


function random_t() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
}

function four_random_rt() {
    return random_t() + random_t() + random_t() + random_t();
}

function aesV(o_text, random_str) {
    var key = CryptoJS.enc.Utf8.parse(random_str);
    var iv = CryptoJS.enc.Utf8.parse("0000000000000000");
    var srcs = CryptoJS.enc.Utf8.parse(o_text);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    for (var r = encrypted, o = r.ciphertext.words, i = r.ciphertext.sigBytes, s = [], a = 0; a < i; a++) {
        var c = o[a >>> 2] >>> 24 - a % 4 * 8 & 255;
        s.push(c);
    }
    return s;
};

function arrayToHex(e) {
    for (var t = [], s = 0, n = 0; n < 2 * e.length; n += 2)
        t[n >>> 3] |= parseInt(e[s], 10) << 24 - n % 8 * 4,
            s++;
    for (var i = [], r = 0; r < e.length; r++) {
        var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
        i.push((o >>> 4).toString(16)),
            i.push((15 & o).toString(16));
    }
    return i.join("");
}


navigator = {};

var sinaSSOEncoder = sinaSSOEncoder || {};
(function () {
    function bt(a) {
        var b = bp(a, this.n.bitLength() + 7 >> 3);
        if (b == null) return null;
        var c = this.doPublic(b);
        if (c == null) return null;
        var d = c.toString(16);
        return (d.length & 1) == 0 ? d : "0" + d
    }

    function bs(a) {
        return a.modPowInt(this.e, this.n)
    }

    function br(a, b) {
        if (a != null && b != null && a.length > 0 && b.length > 0) {
            this.n = bm(a, 16);
            this.e = parseInt(b, 16)
        } else alert("Invalid RSA public key")
    }

    function bq() {
        this.n = null;
        this.e = 0;
        this.d = null;
        this.p = null;
        this.q = null;
        this.dmp1 = null;
        this.dmq1 = null;
        this.coeff = null
    }

    function bp(a, b) {
        if (b < a.length + 11) {
            alert("Message too long for RSA");
            return null
        }
        var c = [],
            e = a.length - 1;
        while (e >= 0 && b > 0) {
            var f = a.charCodeAt(e--);
            if (f < 128) c[--b] = f;
            else if (f > 127 && f < 2048) {
                c[--b] = f & 63 | 128;
                c[--b] = f >> 6 | 192
            } else {
                c[--b] = f & 63 | 128;
                c[--b] = f >> 6 & 63 | 128;
                c[--b] = f >> 12 | 224
            }
        }
        c[--b] = 0;
        var g = new bl,
            h = [];
        while (b > 2) {
            h[0] = 0;
            while (h[0] == 0)
                g.nextBytes(h);
            c[--b] = h[0]
        }
        c[--b] = 2;
        c[--b] = 0;
        return new d(c)
    }

    function bo(a) {
        return a < 16 ? "0" + a.toString(16) : a.toString(16)
    }

    function bn(a, b) {
        var c = "",
            d = 0;
        while (d + b < a.length) {
            c += a.substring(d, d + b) + "\n";
            d += b
        }
        return c + a.substring(d, a.length)
    }

    function bm(a, b) {
        return new d(a, b)
    }

    function bl() {
    }

    function bk(a) {
        var b;
        for (b = 0; b < a.length; ++b)
            a[b] = bj()
    }

    function bj() {
        if (bc == null) {
            bg();
            bc = ba();
            bc.init(bd);
            for (be = 0; be < bd.length; ++be)
                bd[be] = 0;
            be = 0
        }
        return bc.next()
    }

    function bg() {
        bf((new Date).getTime())
    }

    function bf(a) {
        bd[be++] ^= a & 255;
        bd[be++] ^= a >> 8 & 255;
        bd[be++] ^= a >> 16 & 255;
        bd[be++] ^= a >> 24 & 255;
        be >= bb && (be -= bb)
    }

    function ba() {
        return new Z
    }

    function _() {
        var a;
        this.i = this.i + 1 & 255;
        this.j = this.j + this.S[this.i] & 255;
        a = this.S[this.i];
        this.S[this.i] = this.S[this.j];
        this.S[this.j] = a;
        return this.S[a + this.S[this.i] & 255]
    }

    function $(a) {
        var b, c, d;
        for (b = 0; b < 256; ++b)
            this.S[b] = b;
        c = 0;
        for (b = 0; b < 256; ++b) {
            c = c + this.S[b] + a[b % a.length] & 255;
            d = this.S[b];
            this.S[b] = this.S[c];
            this.S[c] = d
        }
        this.i = 0;
        this.j = 0
    }

    function Z() {
        this.i = 0;
        this.j = 0;
        this.S = []
    }

    function Y(a, b) {
        var c;
        a < 256 || b.isEven() ? c = new J(b) : c = new Q(b);
        return this.exp(a, c)
    }

    function X(a, b) {
        if (a > 4294967295 || a < 1) return d.ONE;
        var c = e(),
            f = e(),
            g = b.convert(this),
            h = y(a) - 1;
        g.copyTo(c);
        while (--h >= 0) {
            b.sqrTo(c, f);
            if ((a & 1 << h) > 0) b.mulTo(f, g, c);
            else {
                var i = c;
                c = f;
                f = i
            }
        }
        return b.revert(c)
    }

    function W() {
        return (this.t > 0 ? this[0] & 1 : this.s) == 0
    }

    function V(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }

    function U(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }

    function T(a) {
        while (a.t <= this.mt2)
            a[a.t++] = 0;
        for (var b = 0; b < this.m.t; ++b) {
            var c = a[b] & 32767,
                d = c * this.mpl + ((c * this.mph + (a[b] >> 15) * this.mpl & this.um) << 15) & a.DM;
            c = b + this.m.t;
            a[c] += this.m.am(0, d, a, b, 0, this.m.t);
            while (a[c] >= a.DV) {
                a[c] -= a.DV;
                a[++c]++
            }
        }
        a.clamp();
        a.drShiftTo(this.m.t, a);
        a.compareTo(this.m) >= 0 && a.subTo(this.m, a)
    }

    function S(a) {
        var b = e();
        a.copyTo(b);
        this.reduce(b);
        return b
    }

    function R(a) {
        var b = e();
        a.abs().dlShiftTo(this.m.t, b);
        b.divRemTo(this.m, null, b);
        a.s < 0 && b.compareTo(d.ZERO) > 0 && this.m.subTo(b, b);
        return b
    }

    function Q(a) {
        this.m = a;
        this.mp = a.invDigit();
        this.mpl = this.mp & 32767;
        this.mph = this.mp >> 15;
        this.um = (1 << a.DB - 15) - 1;
        this.mt2 = 2 * a.t
    }

    function P() {
        if (this.t < 1) return 0;
        var a = this[0];
        if ((a & 1) == 0) return 0;
        var b = a & 3;
        b = b * (2 - (a & 15) * b) & 15;
        b = b * (2 - (a & 255) * b) & 255;
        b = b * (2 - ((a & 65535) * b & 65535)) & 65535;
        b = b * (2 - a * b % this.DV) % this.DV;
        return b > 0 ? this.DV - b : -b
    }

    function O(a, b) {
        a.squareTo(b);
        this.reduce(b)
    }

    function N(a, b, c) {
        a.multiplyTo(b, c);
        this.reduce(c)
    }

    function M(a) {
        a.divRemTo(this.m, null, a)
    }

    function L(a) {
        return a
    }

    function K(a) {
        return a.s < 0 || a.compareTo(this.m) >= 0 ? a.mod(this.m) : a
    }

    function J(a) {
        this.m = a
    }

    function I(a) {
        var b = e();
        this.abs().divRemTo(a, null, b);
        this.s < 0 && b.compareTo(d.ZERO) > 0 && a.subTo(b, b);
        return b
    }

    function H(a, b, c) {
        var f = a.abs();
        if (!(f.t <= 0)) {
            var g = this.abs();
            if (g.t < f.t) {
                b != null && b.fromInt(0);
                c != null && this.copyTo(c);
                return
            }
            c == null && (c = e());
            var h = e(),
                i = this.s,
                j = a.s,
                k = this.DB - y(f[f.t - 1]);
            if (k > 0) {
                f.lShiftTo(k, h);
                g.lShiftTo(k, c)
            } else {
                f.copyTo(h);
                g.copyTo(c)
            }
            var l = h.t,
                m = h[l - 1];
            if (m == 0) return;
            var n = m * (1 << this.F1) + (l > 1 ? h[l - 2] >> this.F2 : 0),
                o = this.FV / n,
                p = (1 << this.F1) / n,
                q = 1 << this.F2,
                r = c.t,
                s = r - l,
                t = b == null ? e() : b;
            h.dlShiftTo(s, t);
            if (c.compareTo(t) >= 0) {
                c[c.t++] = 1;
                c.subTo(t, c)
            }
            d.ONE.dlShiftTo(l, t);
            t.subTo(h, h);
            while (h.t < l)
                h[h.t++] = 0;
            while (--s >= 0) {
                var u = c[--r] == m ? this.DM : Math.floor(c[r] * o + (c[r - 1] + q) * p);
                if ((c[r] += h.am(0, u, c, s, 0, l)) < u) {
                    h.dlShiftTo(s, t);
                    c.subTo(t, c);
                    while (c[r] < --u)
                        c.subTo(t, c)
                }
            }
            if (b != null) {
                c.drShiftTo(l, b);
                i != j && d.ZERO.subTo(b, b)
            }
            c.t = l;
            c.clamp();
            k > 0 && c.rShiftTo(k, c);
            i < 0 && d.ZERO.subTo(c, c)
        }
    }

    function G(a) {
        var b = this.abs(),
            c = a.t = 2 * b.t;
        while (--c >= 0)
            a[c] = 0;
        for (c = 0; c < b.t - 1; ++c) {
            var d = b.am(c, b[c], a, 2 * c, 0, 1);
            if ((a[c + b.t] += b.am(c + 1, 2 * b[c], a, 2 * c + 1, d, b.t - c - 1)) >= b.DV) {
                a[c + b.t] -= b.DV;
                a[c + b.t + 1] = 1
            }
        }
        a.t > 0 && (a[a.t - 1] += b.am(c, b[c], a, 2 * c, 0, 1));
        a.s = 0;
        a.clamp()
    }

    function F(a, b) {
        var c = this.abs(),
            e = a.abs(),
            f = c.t;
        b.t = f + e.t;
        while (--f >= 0)
            b[f] = 0;
        for (f = 0; f < e.t; ++f)
            b[f + c.t] = c.am(0, e[f], b, f, 0, c.t);
        b.s = 0;
        b.clamp();
        this.s != a.s && d.ZERO.subTo(b, b)
    }

    function E(a, b) {
        var c = 0,
            d = 0,
            e = Math.min(a.t, this.t);
        while (c < e) {
            d += this[c] - a[c];
            b[c++] = d & this.DM;
            d >>= this.DB
        }
        if (a.t < this.t) {
            d -= a.s;
            while (c < this.t) {
                d += this[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            d += this.s
        } else {
            d += this.s;
            while (c < a.t) {
                d -= a[c];
                b[c++] = d & this.DM;
                d >>= this.DB
            }
            d -= a.s
        }
        b.s = d < 0 ? -1 : 0;
        d < -1 ? b[c++] = this.DV + d : d > 0 && (b[c++] = d);
        b.t = c;
        b.clamp()
    }

    function D(a, b) {
        b.s = this.s;
        var c = Math.floor(a / this.DB);
        if (c >= this.t) b.t = 0;
        else {
            var d = a % this.DB,
                e = this.DB - d,
                f = (1 << d) - 1;
            b[0] = this[c] >> d;
            for (var g = c + 1; g < this.t; ++g) {
                b[g - c - 1] |= (this[g] & f) << e;
                b[g - c] = this[g] >> d
            }
            d > 0 && (b[this.t - c - 1] |= (this.s & f) << e);
            b.t = this.t - c;
            b.clamp()
        }
    }

    function C(a, b) {
        var c = a % this.DB,
            d = this.DB - c,
            e = (1 << d) - 1,
            f = Math.floor(a / this.DB),
            g = this.s << c & this.DM,
            h;
        for (h = this.t - 1; h >= 0; --h) {
            b[h + f + 1] = this[h] >> d | g;
            g = (this[h] & e) << c
        }
        for (h = f - 1; h >= 0; --h)
            b[h] = 0;
        b[f] = g;
        b.t = this.t + f + 1;
        b.s = this.s;
        b.clamp()
    }

    function B(a, b) {
        for (var c = a; c < this.t; ++c)
            b[c - a] = this[c];
        b.t = Math.max(this.t - a, 0);
        b.s = this.s
    }

    function A(a, b) {
        var c;
        for (c = this.t - 1; c >= 0; --c)
            b[c + a] = this[c];
        for (c = a - 1; c >= 0; --c)
            b[c] = 0;
        b.t = this.t + a;
        b.s = this.s
    }

    function z() {
        return this.t <= 0 ? 0 : this.DB * (this.t - 1) + y(this[this.t - 1] ^ this.s & this.DM)
    }

    function y(a) {
        var b = 1,
            c;
        if ((c = a >>> 16) != 0) {
            a = c;
            b += 16
        }
        if ((c = a >> 8) != 0) {
            a = c;
            b += 8
        }
        if ((c = a >> 4) != 0) {
            a = c;
            b += 4
        }
        if ((c = a >> 2) != 0) {
            a = c;
            b += 2
        }
        if ((c = a >> 1) != 0) {
            a = c;
            b += 1
        }
        return b
    }

    function x(a) {
        var b = this.s - a.s;
        if (b != 0) return b;
        var c = this.t;
        b = c - a.t;
        if (b != 0) return b;
        while (--c >= 0)
            if ((b = this[c] - a[c]) != 0) return b;
        return 0
    }

    function w() {
        return this.s < 0 ? this.negate() : this
    }

    function v() {
        var a = e();
        d.ZERO.subTo(this, a);
        return a
    }

    function u(a) {
        if (this.s < 0) return "-" + this.negate().toString(a);
        var b;
        if (a == 16) b = 4;
        else if (a == 8) b = 3;
        else if (a == 2) b = 1;
        else if (a == 32) b = 5;
        else if (a == 4) b = 2;
        else return this.toRadix(a);
        var c = (1 << b) - 1,
            d, e = !1,
            f = "",
            g = this.t,
            h = this.DB - g * this.DB % b;
        if (g-- > 0) {
            if (h < this.DB && (d = this[g] >> h) > 0) {
                e = !0;
                f = n(d)
            }
            while (g >= 0) {
                if (h < b) {
                    d = (this[g] & (1 << h) - 1) << b - h;
                    d |= this[--g] >> (h += this.DB - b)
                } else {
                    d = this[g] >> (h -= b) & c;
                    if (h <= 0) {
                        h += this.DB;
                        --g
                    }
                }
                d > 0 && (e = !0);
                e && (f += n(d))
            }
        }
        return e ? f : "0"
    }

    function t() {
        var a = this.s & this.DM;
        while (this.t > 0 && this[this.t - 1] == a) --this.t
    }

    function s(a, b) {
        var c;
        if (b == 16) c = 4;
        else if (b == 8) c = 3;
        else if (b == 256) c = 8;
        else if (b == 2) c = 1;
        else if (b == 32) c = 5;
        else if (b == 4) c = 2;
        else {
            this.fromRadix(a, b);
            return
        }
        this.t = 0;
        this.s = 0;
        var e = a.length,
            f = !1,
            g = 0;
        while (--e >= 0) {
            var h = c == 8 ? a[e] & 255 : o(a, e);
            if (h < 0) {
                a.charAt(e) == "-" && (f = !0);
                continue
            }
            f = !1;
            if (g == 0) this[this.t++] = h;
            else if (g + c > this.DB) {
                this[this.t - 1] |= (h & (1 << this.DB - g) - 1) << g;
                this[this.t++] = h >> this.DB - g
            } else this[this.t - 1] |= h << g;
            g += c;
            g >= this.DB && (g -= this.DB)
        }
        if (c == 8 && (a[0] & 128) != 0) {
            this.s = -1;
            g > 0 && (this[this.t - 1] |= (1 << this.DB - g) - 1 << g)
        }
        this.clamp();
        f && d.ZERO.subTo(this, this)
    }

    function r(a) {
        var b = e();
        b.fromInt(a);
        return b
    }

    function q(a) {
        this.t = 1;
        this.s = a < 0 ? -1 : 0;
        a > 0 ? this[0] = a : a < -1 ? this[0] = a + DV : this.t = 0
    }

    function p(a) {
        for (var b = this.t - 1; b >= 0; --b)
            a[b] = this[b];
        a.t = this.t;
        a.s = this.s
    }

    function o(a, b) {
        var c = k[a.charCodeAt(b)];
        return c == null ? -1 : c
    }

    function n(a) {
        return j.charAt(a)
    }

    function h(a, b, c, d, e, f) {
        var g = b & 16383,
            h = b >> 14;
        while (--f >= 0) {
            var i = this[a] & 16383,
                j = this[a++] >> 14,
                k = h * i + j * g;
            i = g * i + ((k & 16383) << 14) + c[d] + e;
            e = (i >> 28) + (k >> 14) + h * j;
            c[d++] = i & 268435455
        }
        return e
    }

    function g(a, b, c, d, e, f) {
        var g = b & 32767,
            h = b >> 15;
        while (--f >= 0) {
            var i = this[a] & 32767,
                j = this[a++] >> 15,
                k = h * i + j * g;
            i = g * i + ((k & 32767) << 15) + c[d] + (e & 1073741823);
            e = (i >>> 30) + (k >>> 15) + h * j + (e >>> 30);
            c[d++] = i & 1073741823
        }
        return e
    }

    function f(a, b, c, d, e, f) {
        while (--f >= 0) {
            var g = b * this[a++] + c[d] + e;
            e = Math.floor(g / 67108864);
            c[d++] = g & 67108863
        }
        return e
    }

    function e() {
        return new d(null)
    }

    function d(a, b, c) {
        a != null && ("number" == typeof a ? this.fromNumber(a, b, c) : b == null && "string" != typeof a ? this.fromString(a, 256) : this.fromString(a, b))
    }

    var a, b = 0xdeadbeefcafe,
        c = (b & 16777215) == 15715070;
    if (c && navigator.appName == "Microsoft Internet Explorer") {
        d.prototype.am = g;
        a = 30
    } else if (c && navigator.appName != "Netscape") {
        d.prototype.am = f;
        a = 26
    } else {
        d.prototype.am = h;
        a = 28
    }
    d.prototype.DB = a;
    d.prototype.DM = (1 << a) - 1;
    d.prototype.DV = 1 << a;
    var i = 52;
    d.prototype.FV = Math.pow(2, i);
    d.prototype.F1 = i - a;
    d.prototype.F2 = 2 * a - i;
    var j = "0123456789abcdefghijklmnopqrstuvwxyz",
        k = [],
        l, m;
    l = "0".charCodeAt(0);
    for (m = 0; m <= 9; ++m)
        k[l++] = m;
    l = "a".charCodeAt(0);
    for (m = 10; m < 36; ++m)
        k[l++] = m;
    l = "A".charCodeAt(0);
    for (m = 10; m < 36; ++m)
        k[l++] = m;
    J.prototype.convert = K;
    J.prototype.revert = L;
    J.prototype.reduce = M;
    J.prototype.mulTo = N;
    J.prototype.sqrTo = O;
    Q.prototype.convert = R;
    Q.prototype.revert = S;
    Q.prototype.reduce = T;
    Q.prototype.mulTo = V;
    Q.prototype.sqrTo = U;
    d.prototype.copyTo = p;
    d.prototype.fromInt = q;
    d.prototype.fromString = s;
    d.prototype.clamp = t;
    d.prototype.dlShiftTo = A;
    d.prototype.drShiftTo = B;
    d.prototype.lShiftTo = C;
    d.prototype.rShiftTo = D;
    d.prototype.subTo = E;
    d.prototype.multiplyTo = F;
    d.prototype.squareTo = G;
    d.prototype.divRemTo = H;
    d.prototype.invDigit = P;
    d.prototype.isEven = W;
    d.prototype.exp = X;
    d.prototype.toString = u;
    d.prototype.negate = v;
    d.prototype.abs = w;
    d.prototype.compareTo = x;
    d.prototype.bitLength = z;
    d.prototype.mod = I;
    d.prototype.modPowInt = Y;
    d.ZERO = r(0);
    d.ONE = r(1);
    Z.prototype.init = $;
    Z.prototype.next = _;
    var bb = 256,
        bc, bd, be;
    if (bd == null) {
        bd = [];
        be = 0;
        var bh;
        if (navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto && typeof window.crypto.random == "function") {
            var bi = window.crypto.random(32);
            for (bh = 0; bh < bi.length; ++bh)
                bd[be++] = bi.charCodeAt(bh) & 255
        }
        while (be < bb) {
            bh = Math.floor(65536 * Math.random());
            bd[be++] = bh >>> 8;
            bd[be++] = bh & 255
        }
        be = 0;
        bg()
    }
    bl.prototype.nextBytes = bk;
    bq.prototype.doPublic = bs;
    bq.prototype.setPublic = br;
    bq.prototype.encrypt = bt;
    this.RSAKey = bq
}).call(sinaSSOEncoder);

function get_key(data) {
    const public_key_1 = '00C1E3934D1614465B33053E7F48EE4EC87B14B95EF88947713D25EECBFF7E74C7977D02DC1D9451F79DD5D1C10C29ACB6A9B4D6FB7D0A0279B6719E1772565F09AF627715919221AEF91899CAE08C0D686D748B20A3603BE2318CA6BC2B59706592A9219D0BF05C9F65023A21D2330807252AE0066D59CEEFA5F2748EA80BAB81';
    const public_key_2 = '10001';
    var e = new sinaSSOEncoder.RSAKey;
    e.setPublic(public_key_1, public_key_2)
    b = e.encrypt(data)
    return b
}


var powSignFunc = function (e, t, s, n, i, r, o, guid) {
    var guid = four_random_rt();
    var a = i % 4;
    var _ = parseInt(i / 4, 10)
    var u = function g(e, t) {
        return new Array(t + 1).join(e);
    }('0', _);

    var c = n + '|' + i + '|' + s + '|' + r + '|' + t + '|' + e + '|' + o + '|';

    while (1) {
        var h = guid;
        var p = c + h;
        var l = void 0;
        // console.log(p);
        switch (s) {
            case 'md5':
                l = CryptoJS.MD5(p).toString();
                break;
            case 'sha1':
                l = CryptoJS.SHA1(p).toString();
                break;
            case 'sha256':
                l = CryptoJS.SHA256(p).toString();
        }
        if (0 == a) {
            if (0 === l.indexOf(u))
                return {"pow_msg": c + h, "pow_sign": l};
        } else if (0 === l.indexOf(u)) {
            var f = void 0
                , d = l[_];
            switch (a) {
                case 1:
                    f = 7;
                    break;
                case 2:
                    f = 3;
                    break;
                case 3:
                    f = 1;
            }
            if (d <= f)
                return {"pow_msg": c + h, "pow_sign": l};
        }
    }
}


// 无感的w
function genFullW4(randomKey, pow_sign, lot_number, pow_msg) {
    var out_key1 = lot_number.substring(21, 23) + lot_number.substring(13, 15);
    var in_key = lot_number.substring(14, 22);
    ee = {
        "device_id": "",
        "lot_number": lot_number,
        "pow_msg": pow_msg,
        "pow_sign": pow_sign,
        "geetest": "captcha",
        "lang": "zh",
        "ep": "123",
        "biht": "1426265548",
        [out_key1]: in_key,
        "fNNi": "oEfq",
        "em": {"ph": 0, "cp": 0, "ek": "11", "wd": 1, "nt": 0, "si": 0, "sc": 0}
    }
    var rsaVal = get_key(randomKey);
    var aesArray = aesV(JSON.stringify(ee), randomKey);
    var aesVal = arrayToHex(aesArray)
    var w = aesVal + rsaVal;
    return w

}


// 滑块的w
function genSlideW4(lot_number, distance, passtime, pow_msg, pow_sign, randomKey) {
    // 提取关键子串
    var out_key1 = lot_number.substring(21, 23) + lot_number.substring(13, 15);
    var in_key = lot_number.substring(14, 22);
    ee = {
        "setLeft": distance,
        "passtime": passtime,
        "userresponse": distance / 1.0059466666666665 + 2,
        "device_id": "",
        "lot_number": lot_number,
        "pow_msg": pow_msg,
        "pow_sign": pow_sign,
        "geetest": "captcha",
        "lang": "zh",
        "ep": "123",
        "biht": "1426265548",
        [out_key1]: in_key,
        "fNNi": "oEfq",
        "em": {
            "ph": 0,
            "cp": 0,
            "ek": "11",
            "wd": 1,
            "nt": 0,
            "si": 0,
            "sc": 0
        }
    }
    // console.log(ee)
    // console.log(JSON.stringify(ee))
    var rsaVal = get_key(randomKey);

    var aesArray = aesV(JSON.stringify(ee), randomKey);
    var aesVal = arrayToHex(aesArray)

    var w = aesVal + rsaVal;
    return w
}

// console.log(genSlideW4("53b0565d77664e16b53c926b748c92fb", 123, 1737, "1|0|md5|2025-02-25T20:39:42.475539+08:00|24f56dc13c40dc4a02fd0318567caef5|53b0565d77664e16b53c926b748c92fb||c016d41edba15db5", "3f4e554105fdbe1a62fa989998f2d797", "c016d41edba15db5"));


