
Ld = {
    RFC1738: "RFC1738",
    RFC3986: "RFC3986"
}
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
}
tC = function(t, n) {
    for (var u = n && n.plainObjects ? Object.create(null) : {}, o = 0; o < t.length; ++o)
        typeof t[o] < "u" && (u[o] = t[o]);
    return u
}
UW = function(t, n) {
    return Object.keys(n).reduce(function(u, o) {
        return u[o] = n[o],
        u
    }, t)
}
JW = function(t, n) {
    return [].concat(t, n)
}
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
}
WW = function(e, t, n) {
    var u = e.replace(/\+/g, " ");
    if (n === "iso-8859-1")
        return u.replace(/%[0-9a-f]{2}/gi, unescape);
    try {
        return decodeURIComponent(u)
    } catch {
        return u
    }
}
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
}
QW = function(t) {
    return !t || typeof t != "object" ? !1 : !!(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))
}
KW = function(t) {
    return Object.prototype.toString.call(t) === "[object RegExp]"
}
ZW = function(t, n) {
    if ($u(t)) {
        for (var u = [], o = 0; o < t.length; o += 1)
            u.push(n(t[o]));
        return u
    }
    return n(t)
}
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
}
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
}
xa = nC
ys = np
Kn = Array.isArray
Fg = ys.default
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
}
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
}
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
}
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
function aa(data) {
    return sC.stringify(data, {
        allowDots: !0
    })
}

console.log(aa(1));