

var jc = {};
jc.byteLength = Jbe;
jc.toByteArray = exe;
jc.fromByteArray = oxe;
var Vo = []
  , oo = []
  , Xbe = typeof Uint8Array != "undefined" ? Uint8Array : Array
  , Lu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var js = 0, Zbe = Lu.length; js < Zbe; ++js)
    Vo[js] = Lu[js],
    oo[Lu.charCodeAt(js)] = js;
oo["-".charCodeAt(0)] = 62;
oo["_".charCodeAt(0)] = 63;
function n7(e) {
    var t = e.length;
    if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
    var n = e.indexOf("=");
    n === -1 && (n = t);
    var o = n === t ? 0 : 4 - n % 4;
    return [n, o]
}
function Jbe(e) {
    var t = n7(e)
      , n = t[0]
      , o = t[1];
    return (n + o) * 3 / 4 - o
}
function Qbe(e, t, n) {
    return (t + n) * 3 / 4 - n
}
function exe(e) {
    var t, n = n7(e), o = n[0], r = n[1], s = new Xbe(Qbe(e, o, r)), a = 0, l = r > 0 ? o - 4 : o, i;
    for (i = 0; i < l; i += 4)
        t = oo[e.charCodeAt(i)] << 18 | oo[e.charCodeAt(i + 1)] << 12 | oo[e.charCodeAt(i + 2)] << 6 | oo[e.charCodeAt(i + 3)],
        s[a++] = t >> 16 & 255,
        s[a++] = t >> 8 & 255,
        s[a++] = t & 255;
    return r === 2 && (t = oo[e.charCodeAt(i)] << 2 | oo[e.charCodeAt(i + 1)] >> 4,
    s[a++] = t & 255),
    r === 1 && (t = oo[e.charCodeAt(i)] << 10 | oo[e.charCodeAt(i + 1)] << 4 | oo[e.charCodeAt(i + 2)] >> 2,
    s[a++] = t >> 8 & 255,
    s[a++] = t & 255),
    s
}
function txe(e) {
    return Vo[e >> 18 & 63] + Vo[e >> 12 & 63] + Vo[e >> 6 & 63] + Vo[e & 63]
}
function nxe(e, t, n) {
    for (var o, r = [], s = t; s < n; s += 3)
        o = (e[s] << 16 & 16711680) + (e[s + 1] << 8 & 65280) + (e[s + 2] & 255),
        r.push(txe(o));
    return r.join("")
}
function oxe(e) {
    for (var t, n = e.length, o = n % 3, r = [], s = 16383, a = 0, l = n - o; a < l; a += s)
        r.push(nxe(e, a, a + s > l ? l : a + s));
    return o === 1 ? (t = e[n - 1],
    r.push(Vo[t >> 2] + Vo[t << 4 & 63] + "==")) : o === 2 && (t = (e[n - 2] << 8) + e[n - 1],
    r.push(Vo[t >> 10] + Vo[t >> 4 & 63] + Vo[t << 2 & 63] + "=")),
    r.join("")
}
var yd = {}, o7 = {}, r7 = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
        return !1;
    if (typeof Symbol.iterator == "symbol")
        return !0;
    var t = {}
      , n = Symbol("test")
      , o = Object(n);
    if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(o) !== "[object Symbol]")
        return !1;
    var r = 42;
    t[n] = r;
    for (n in t)
        return !1;
    if (typeof Object.keys == "function" && Object.keys(t).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(t).length !== 0)
        return !1;
    var s = Object.getOwnPropertySymbols(t);
    if (s.length !== 1 || s[0] !== n || !Object.prototype.propertyIsEnumerable.call(t, n))
        return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
        var a = Object.getOwnPropertyDescriptor(t, n);
        if (a.value !== r || a.enumerable !== !0)
            return !1
    }
    return !0
}, rxe = r7, Tf = function() {
    return rxe() && !!Symbol.toStringTag
}, sxe = Error, axe = EvalError, lxe = RangeError, ixe = ReferenceError, s7 = SyntaxError, Kc = TypeError, cxe = URIError, $6 = typeof Symbol != "undefined" && Symbol, uxe = r7, dxe = function() {
    return typeof $6 != "function" || typeof Symbol != "function" || typeof $6("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : uxe()
}, Nu = {
    __proto__: null,
    foo: {}
}, fxe = Object, pxe = function() {
    return {
        __proto__: Nu
    }.foo === Nu.foo && !(Nu instanceof fxe)
}, hxe = "Function.prototype.bind called on incompatible ", vxe = Object.prototype.toString, mxe = Math.max, gxe = "[object Function]", C6 = function(t, n) {
    for (var o = [], r = 0; r < t.length; r += 1)
        o[r] = t[r];
    for (var s = 0; s < n.length; s += 1)
        o[s + t.length] = n[s];
    return o
}, yxe = function(t, n) {
    for (var o = [], r = n || 0, s = 0; r < t.length; r += 1,
    s += 1)
        o[s] = t[r];
    return o
}, bxe = function(e, t) {
    for (var n = "", o = 0; o < e.length; o += 1)
        n += e[o],
        o + 1 < e.length && (n += t);
    return n
}, xxe = function(t) {
    var n = this;
    if (typeof n != "function" || vxe.apply(n) !== gxe)
        throw new TypeError(hxe + n);
    for (var o = yxe(arguments, 1), r, s = function() {
        if (this instanceof r) {
            var u = n.apply(this, C6(o, arguments));
            return Object(u) === u ? u : this
        }
        return n.apply(t, C6(o, arguments))
    }, a = mxe(0, n.length - o.length), l = [], i = 0; i < a; i++)
        l[i] = "$" + i;
    if (r = Function("binder", "return function (" + bxe(l, ",") + "){ return binder.apply(this,arguments); }")(s),
    n.prototype) {
        var c = function() {};
        c.prototype = n.prototype,
        r.prototype = new c,
        c.prototype = null
    }
    return r
}, _xe = xxe, Bf = Function.prototype.bind || _xe, wxe = Function.prototype.call, $xe = Object.prototype.hasOwnProperty, Cxe = Bf, Sxe = Cxe.call(wxe, $xe), Ct, Exe = sxe, kxe = axe, Axe = lxe, Txe = ixe, Ba = s7, ia = Kc, Bxe = cxe, a7 = Function, Iu = function(e) {
    try {
        return a7('"use strict"; return (' + e + ").constructor;")()
    } catch {}
}, _s = Object.getOwnPropertyDescriptor;
if (_s)
    try {
        _s({}, "")
    } catch {
        _s = null
    }
var Ru = function() {
    throw new ia
}
  , Mxe = _s ? function() {
    try {
        return arguments.callee,
        Ru
    } catch {
        try {
            return _s(arguments, "callee").get
        } catch {
            return Ru
        }
    }
}() : Ru
  , Ks = dxe()
  , zxe = pxe()
  , un = Object.getPrototypeOf || (zxe ? function(e) {
    return e.__proto__
}
: null)
  , Xs = {}
  , Dxe = typeof Uint8Array == "undefined" || !un ? Ct : un(Uint8Array)
  , ws = {
    __proto__: null,
    "%AggregateError%": typeof AggregateError == "undefined" ? Ct : AggregateError,
    "%Array%": Array,
    "%ArrayBuffer%": typeof ArrayBuffer == "undefined" ? Ct : ArrayBuffer,
    "%ArrayIteratorPrototype%": Ks && un ? un([][Symbol.iterator]()) : Ct,
    "%AsyncFromSyncIteratorPrototype%": Ct,
    "%AsyncFunction%": Xs,
    "%AsyncGenerator%": Xs,
    "%AsyncGeneratorFunction%": Xs,
    "%AsyncIteratorPrototype%": Xs,
    "%Atomics%": typeof Atomics == "undefined" ? Ct : Atomics,
    "%BigInt%": typeof BigInt == "undefined" ? Ct : BigInt,
    "%BigInt64Array%": typeof BigInt64Array == "undefined" ? Ct : BigInt64Array,
    "%BigUint64Array%": typeof BigUint64Array == "undefined" ? Ct : BigUint64Array,
    "%Boolean%": Boolean,
    "%DataView%": typeof DataView == "undefined" ? Ct : DataView,
    "%Date%": Date,
    "%decodeURI%": decodeURI,
    "%decodeURIComponent%": decodeURIComponent,
    "%encodeURI%": encodeURI,
    "%encodeURIComponent%": encodeURIComponent,
    "%Error%": Exe,
    "%eval%": eval,
    "%EvalError%": kxe,
    "%Float32Array%": typeof Float32Array == "undefined" ? Ct : Float32Array,
    "%Float64Array%": typeof Float64Array == "undefined" ? Ct : Float64Array,
    "%FinalizationRegistry%": typeof FinalizationRegistry == "undefined" ? Ct : FinalizationRegistry,
    "%Function%": a7,
    "%GeneratorFunction%": Xs,
    "%Int8Array%": typeof Int8Array == "undefined" ? Ct : Int8Array,
    "%Int16Array%": typeof Int16Array == "undefined" ? Ct : Int16Array,
    "%Int32Array%": typeof Int32Array == "undefined" ? Ct : Int32Array,
    "%isFinite%": isFinite,
    "%isNaN%": isNaN,
    "%IteratorPrototype%": Ks && un ? un(un([][Symbol.iterator]())) : Ct,
    "%JSON%": typeof JSON == "object" ? JSON : Ct,
    "%Map%": typeof Map == "undefined" ? Ct : Map,
    "%MapIteratorPrototype%": typeof Map == "undefined" || !Ks || !un ? Ct : un(new Map()[Symbol.iterator]()),
    "%Math%": Math,
    "%Number%": Number,
    "%Object%": Object,
    "%parseFloat%": parseFloat,
    "%parseInt%": parseInt,
    "%Promise%": typeof Promise == "undefined" ? Ct : Promise,
    "%Proxy%": typeof Proxy == "undefined" ? Ct : Proxy,
    "%RangeError%": Axe,
    "%ReferenceError%": Txe,
    "%Reflect%": typeof Reflect == "undefined" ? Ct : Reflect,
    "%RegExp%": RegExp,
    "%Set%": typeof Set == "undefined" ? Ct : Set,
    "%SetIteratorPrototype%": typeof Set == "undefined" || !Ks || !un ? Ct : un(new Set()[Symbol.iterator]()),
    "%SharedArrayBuffer%": typeof SharedArrayBuffer == "undefined" ? Ct : SharedArrayBuffer,
    "%String%": String,
    "%StringIteratorPrototype%": Ks && un ? un(""[Symbol.iterator]()) : Ct,
    "%Symbol%": Ks ? Symbol : Ct,
    "%SyntaxError%": Ba,
    "%ThrowTypeError%": Mxe,
    "%TypedArray%": Dxe,
    "%TypeError%": ia,
    "%Uint8Array%": typeof Uint8Array == "undefined" ? Ct : Uint8Array,
    "%Uint8ClampedArray%": typeof Uint8ClampedArray == "undefined" ? Ct : Uint8ClampedArray,
    "%Uint16Array%": typeof Uint16Array == "undefined" ? Ct : Uint16Array,
    "%Uint32Array%": typeof Uint32Array == "undefined" ? Ct : Uint32Array,
    "%URIError%": Bxe,
    "%WeakMap%": typeof WeakMap == "undefined" ? Ct : WeakMap,
    "%WeakRef%": typeof WeakRef == "undefined" ? Ct : WeakRef,
    "%WeakSet%": typeof WeakSet == "undefined" ? Ct : WeakSet
};
if (un)
    try {
        null.error
    } catch (e) {
        var Oxe = un(un(e));
        ws["%Error.prototype%"] = Oxe
    }
var Pxe = function e(t) {
    var n;
    if (t === "%AsyncFunction%")
        n = Iu("async function () {}");
    else if (t === "%GeneratorFunction%")
        n = Iu("function* () {}");
    else if (t === "%AsyncGeneratorFunction%")
        n = Iu("async function* () {}");
    else if (t === "%AsyncGenerator%") {
        var o = e("%AsyncGeneratorFunction%");
        o && (n = o.prototype)
    } else if (t === "%AsyncIteratorPrototype%") {
        var r = e("%AsyncGenerator%");
        r && un && (n = un(r.prototype))
    }
    return ws[t] = n,
    n
}
  , S6 = {
    __proto__: null,
    "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
    "%ArrayPrototype%": ["Array", "prototype"],
    "%ArrayProto_entries%": ["Array", "prototype", "entries"],
    "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
    "%ArrayProto_keys%": ["Array", "prototype", "keys"],
    "%ArrayProto_values%": ["Array", "prototype", "values"],
    "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
    "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
    "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
    "%BooleanPrototype%": ["Boolean", "prototype"],
    "%DataViewPrototype%": ["DataView", "prototype"],
    "%DatePrototype%": ["Date", "prototype"],
    "%ErrorPrototype%": ["Error", "prototype"],
    "%EvalErrorPrototype%": ["EvalError", "prototype"],
    "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
    "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
    "%FunctionPrototype%": ["Function", "prototype"],
    "%Generator%": ["GeneratorFunction", "prototype"],
    "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
    "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
    "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
    "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
    "%JSONParse%": ["JSON", "parse"],
    "%JSONStringify%": ["JSON", "stringify"],
    "%MapPrototype%": ["Map", "prototype"],
    "%NumberPrototype%": ["Number", "prototype"],
    "%ObjectPrototype%": ["Object", "prototype"],
    "%ObjProto_toString%": ["Object", "prototype", "toString"],
    "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
    "%PromisePrototype%": ["Promise", "prototype"],
    "%PromiseProto_then%": ["Promise", "prototype", "then"],
    "%Promise_all%": ["Promise", "all"],
    "%Promise_reject%": ["Promise", "reject"],
    "%Promise_resolve%": ["Promise", "resolve"],
    "%RangeErrorPrototype%": ["RangeError", "prototype"],
    "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
    "%RegExpPrototype%": ["RegExp", "prototype"],
    "%SetPrototype%": ["Set", "prototype"],
    "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
    "%StringPrototype%": ["String", "prototype"],
    "%SymbolPrototype%": ["Symbol", "prototype"],
    "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
    "%TypedArrayPrototype%": ["TypedArray", "prototype"],
    "%TypeErrorPrototype%": ["TypeError", "prototype"],
    "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
    "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
    "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
    "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
    "%URIErrorPrototype%": ["URIError", "prototype"],
    "%WeakMapPrototype%": ["WeakMap", "prototype"],
    "%WeakSetPrototype%": ["WeakSet", "prototype"]
}
  , ui = Bf
  , U0 = Sxe
  , Fxe = ui.call(Function.call, Array.prototype.concat)
  , Vxe = ui.call(Function.apply, Array.prototype.splice)
  , E6 = ui.call(Function.call, String.prototype.replace)
  , W0 = ui.call(Function.call, String.prototype.slice)
  , Hxe = ui.call(Function.call, RegExp.prototype.exec)
  , Lxe = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g
  , Nxe = /\\(\\)?/g
  , Ixe = function(t) {
    var n = W0(t, 0, 1)
      , o = W0(t, -1);
    if (n === "%" && o !== "%")
        throw new Ba("invalid intrinsic syntax, expected closing `%`");
    if (o === "%" && n !== "%")
        throw new Ba("invalid intrinsic syntax, expected opening `%`");
    var r = [];
    return E6(t, Lxe, function(s, a, l, i) {
        r[r.length] = l ? E6(i, Nxe, "$1") : a || s
    }),
    r
}
  , Rxe = function(t, n) {
    var o = t, r;
    if (U0(S6, o) && (r = S6[o],
    o = "%" + r[0] + "%"),
    U0(ws, o)) {
        var s = ws[o];
        if (s === Xs && (s = Pxe(o)),
        typeof s == "undefined" && !n)
            throw new ia("intrinsic " + t + " exists, but is not available. Please file an issue!");
        return {
            alias: r,
            name: o,
            value: s
        }
    }
    throw new Ba("intrinsic " + t + " does not exist!")
}
  , di = function(t, n) {
    if (typeof t != "string" || t.length === 0)
        throw new ia("intrinsic name must be a non-empty string");
    if (arguments.length > 1 && typeof n != "boolean")
        throw new ia('"allowMissing" argument must be a boolean');
    if (Hxe(/^%?[^%]*%?$/, t) === null)
        throw new Ba("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
    var o = Ixe(t)
      , r = o.length > 0 ? o[0] : ""
      , s = Rxe("%" + r + "%", n)
      , a = s.name
      , l = s.value
      , i = !1
      , c = s.alias;
    c && (r = c[0],
    Vxe(o, Fxe([0, 1], c)));
    for (var u = 1, f = !0; u < o.length; u += 1) {
        var d = o[u]
          , p = W0(d, 0, 1)
          , h = W0(d, -1);
        if ((p === '"' || p === "'" || p === "`" || h === '"' || h === "'" || h === "`") && p !== h)
            throw new Ba("property names with quotes must have matching quotes");
        if ((d === "constructor" || !f) && (i = !0),
        r += "." + d,
        a = "%" + r + "%",
        U0(ws, a))
            l = ws[a];
        else if (l != null) {
            if (!(d in l)) {
                if (!n)
                    throw new ia("base intrinsic for " + t + " exists, but the property is not available.");
                return
            }
            if (_s && u + 1 >= o.length) {
                var g = _s(l, d);
                f = !!g,
                f && "get"in g && !("originalValue"in g.get) ? l = g.get : l = l[d]
            } else
                f = U0(l, d),
                l = l[d];
            f && !i && (ws[a] = l)
        }
    }
    return l
}
  , Mf = {
    exports: {}
}
  , jxe = di
  , g0 = jxe("%Object.defineProperty%", !0) || !1;
if (g0)
    try {
        g0({}, "a", {
            value: 1
        })
    } catch {
        g0 = !1
    }
var zf = g0
  , Kxe = di
  , y0 = Kxe("%Object.getOwnPropertyDescriptor%", !0);
if (y0)
    try {
        y0([], "length")
    } catch {
        y0 = null
    }
var Df = y0
  , k6 = zf
  , Uxe = s7
  , Us = Kc
  , A6 = Df
  , Wxe = function(t, n, o) {
    if (!t || typeof t != "object" && typeof t != "function")
        throw new Us("`obj` must be an object or a function`");
    if (typeof n != "string" && typeof n != "symbol")
        throw new Us("`property` must be a string or a symbol`");
    if (arguments.length > 3 && typeof arguments[3] != "boolean" && arguments[3] !== null)
        throw new Us("`nonEnumerable`, if provided, must be a boolean or null");
    if (arguments.length > 4 && typeof arguments[4] != "boolean" && arguments[4] !== null)
        throw new Us("`nonWritable`, if provided, must be a boolean or null");
    if (arguments.length > 5 && typeof arguments[5] != "boolean" && arguments[5] !== null)
        throw new Us("`nonConfigurable`, if provided, must be a boolean or null");
    if (arguments.length > 6 && typeof arguments[6] != "boolean")
        throw new Us("`loose`, if provided, must be a boolean");
    var r = arguments.length > 3 ? arguments[3] : null
      , s = arguments.length > 4 ? arguments[4] : null
      , a = arguments.length > 5 ? arguments[5] : null
      , l = arguments.length > 6 ? arguments[6] : !1
      , i = !!A6 && A6(t, n);
    if (k6)
        k6(t, n, {
            configurable: a === null && i ? i.configurable : !a,
            enumerable: r === null && i ? i.enumerable : !r,
            value: o,
            writable: s === null && i ? i.writable : !s
        });
    else if (l || !r && !s && !a)
        t[n] = o;
    else
        throw new Uxe("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.")
}
  , bd = zf
  , l7 = function() {
    return !!bd
};
l7.hasArrayLengthDefineBug = function() {
    if (!bd)
        return null;
    try {
        return bd([], "length", {
            value: 1
        }).length !== 1
    } catch {
        return !0
    }
}
;
var qxe = l7
  , Yxe = di
  , T6 = Wxe
  , Gxe = qxe()
  , B6 = Df
  , M6 = Kc
  , Xxe = Yxe("%Math.floor%")
  , Zxe = function(t, n) {
    if (typeof t != "function")
        throw new M6("`fn` is not a function");
    if (typeof n != "number" || n < 0 || n > 4294967295 || Xxe(n) !== n)
        throw new M6("`length` must be a positive 32-bit integer");
    var o = arguments.length > 2 && !!arguments[2]
      , r = !0
      , s = !0;
    if ("length"in t && B6) {
        var a = B6(t, "length");
        a && !a.configurable && (r = !1),
        a && !a.writable && (s = !1)
    }
    return (r || s || !o) && (Gxe ? T6(t, "length", n, !0, !0) : T6(t, "length", n)),
    t
};
(function(e) {
    var t = Bf
      , n = di
      , o = Zxe
      , r = Kc
      , s = n("%Function.prototype.apply%")
      , a = n("%Function.prototype.call%")
      , l = n("%Reflect.apply%", !0) || t.call(a, s)
      , i = zf
      , c = n("%Math.max%");
    e.exports = function(d) {
        if (typeof d != "function")
            throw new r("a function is required");
        var p = l(t, a, arguments);
        return o(p, 1 + c(0, d.length - (arguments.length - 1)), !0)
    }
    ;
    var u = function() {
        return l(t, s, arguments)
    };
    i ? i(e.exports, "apply", {
        value: u
    }) : e.exports.apply = u
}
)(Mf);
var i7 = di
  , c7 = Mf.exports
  , Jxe = c7(i7("String.prototype.indexOf"))
  , u7 = function(t, n) {
    var o = i7(t, !!n);
    return typeof o == "function" && Jxe(t, ".prototype.") > -1 ? c7(o) : o
}
  , Qxe = Tf()
  , e_e = u7
  , xd = e_e("Object.prototype.toString")
  , Uc = function(t) {
    return Qxe && t && typeof t == "object" && Symbol.toStringTag in t ? !1 : xd(t) === "[object Arguments]"
}
  , d7 = function(t) {
    return Uc(t) ? !0 : t !== null && typeof t == "object" && typeof t.length == "number" && t.length >= 0 && xd(t) !== "[object Array]" && xd(t.callee) === "[object Function]"
}
  , t_e = function() {
    return Uc(arguments)
}();
Uc.isLegacyArguments = d7;
var n_e = t_e ? Uc : d7, o_e = Object.prototype.toString, r_e = Function.prototype.toString, s_e = /^\s*(?:function)?\*/, f7 = Tf(), ju = Object.getPrototypeOf, a_e = function() {
    if (!f7)
        return !1;
    try {
        return Function("return function*() {}")()
    } catch {}
}, Ku, l_e = function(t) {
    if (typeof t != "function")
        return !1;
    if (s_e.test(r_e.call(t)))
        return !0;
    if (!f7) {
        var n = o_e.call(t);
        return n === "[object GeneratorFunction]"
    }
    if (!ju)
        return !1;
    if (typeof Ku == "undefined") {
        var o = a_e();
        Ku = o ? ju(o) : !1
    }
    return ju(t) === Ku
}, p7 = Function.prototype.toString, ea = typeof Reflect == "object" && Reflect !== null && Reflect.apply, _d, b0;
if (typeof ea == "function" && typeof Object.defineProperty == "function")
    try {
        _d = Object.defineProperty({}, "length", {
            get: function() {
                throw b0
            }
        }),
        b0 = {},
        ea(function() {
            throw 42
        }, null, _d)
    } catch (e) {
        e !== b0 && (ea = null)
    }
else
    ea = null;
var i_e = /^\s*class\b/
  , wd = function(t) {
    try {
        var n = p7.call(t);
        return i_e.test(n)
    } catch {
        return !1
    }
}
  , Uu = function(t) {
    try {
        return wd(t) ? !1 : (p7.call(t),
        !0)
    } catch {
        return !1
    }
}
  , x0 = Object.prototype.toString
  , c_e = "[object Object]"
  , u_e = "[object Function]"
  , d_e = "[object GeneratorFunction]"
  , f_e = "[object HTMLAllCollection]"
  , p_e = "[object HTML document.all class]"
  , h_e = "[object HTMLCollection]"
  , v_e = typeof Symbol == "function" && !!Symbol.toStringTag
  , m_e = !(0 in [, ])
  , $d = function() {
    return !1
};
if (typeof document == "object") {
    var g_e = document.all;
    x0.call(g_e) === x0.call(document.all) && ($d = function(t) {
        if ((m_e || !t) && (typeof t == "undefined" || typeof t == "object"))
            try {
                var n = x0.call(t);
                return (n === f_e || n === p_e || n === h_e || n === c_e) && t("") == null
            } catch {}
        return !1
    }
    )
}
var y_e = ea ? function(t) {
    if ($d(t))
        return !0;
    if (!t || typeof t != "function" && typeof t != "object")
        return !1;
    try {
        ea(t, null, _d)
    } catch (n) {
        if (n !== b0)
            return !1
    }
    return !wd(t) && Uu(t)
}
: function(t) {
    if ($d(t))
        return !0;
    if (!t || typeof t != "function" && typeof t != "object")
        return !1;
    if (v_e)
        return Uu(t);
    if (wd(t))
        return !1;
    var n = x0.call(t);
    return n !== u_e && n !== d_e && !/^\[object HTML/.test(n) ? !1 : Uu(t)
}
  , b_e = y_e
  , x_e = Object.prototype.toString
  , h7 = Object.prototype.hasOwnProperty
  , __e = function(t, n, o) {
    for (var r = 0, s = t.length; r < s; r++)
        h7.call(t, r) && (o == null ? n(t[r], r, t) : n.call(o, t[r], r, t))
}
  , w_e = function(t, n, o) {
    for (var r = 0, s = t.length; r < s; r++)
        o == null ? n(t.charAt(r), r, t) : n.call(o, t.charAt(r), r, t)
}
  , $_e = function(t, n, o) {
    for (var r in t)
        h7.call(t, r) && (o == null ? n(t[r], r, t) : n.call(o, t[r], r, t))
}
  , C_e = function(t, n, o) {
    if (!b_e(n))
        throw new TypeError("iterator must be a function");
    var r;
    arguments.length >= 3 && (r = o),
    x_e.call(t) === "[object Array]" ? __e(t, n, r) : typeof t == "string" ? w_e(t, n, r) : $_e(t, n, r)
}
  , S_e = C_e
  , E_e = ["Float32Array", "Float64Array", "Int8Array", "Int16Array", "Int32Array", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "BigInt64Array", "BigUint64Array"]
  , Wu = E_e
  , k_e = typeof globalThis == "undefined" ? st : globalThis
  , A_e = function() {
    for (var t = [], n = 0; n < Wu.length; n++)
        typeof k_e[Wu[n]] == "function" && (t[t.length] = Wu[n]);
    return t
}
  , q0 = S_e
  , T_e = A_e
  , z6 = Mf.exports
  , Of = u7
  , _0 = Df
  , B_e = Of("Object.prototype.toString")
  , v7 = Tf()
  , D6 = typeof globalThis == "undefined" ? st : globalThis
  , Cd = T_e()
  , Pf = Of("String.prototype.slice")
  , qu = Object.getPrototypeOf
  , M_e = Of("Array.prototype.indexOf", !0) || function(t, n) {
    for (var o = 0; o < t.length; o += 1)
        if (t[o] === n)
            return o;
    return -1
}
  , Y0 = {
    __proto__: null
};
v7 && _0 && qu ? q0(Cd, function(e) {
    var t = new D6[e];
    if (Symbol.toStringTag in t) {
        var n = qu(t)
          , o = _0(n, Symbol.toStringTag);
        if (!o) {
            var r = qu(n);
            o = _0(r, Symbol.toStringTag)
        }
        Y0["$" + e] = z6(o.get)
    }
}) : q0(Cd, function(e) {
    var t = new D6[e]
      , n = t.slice || t.set;
    n && (Y0["$" + e] = z6(n))
});
var z_e = function(t) {
    var n = !1;
    return q0(Y0, function(o, r) {
        if (!n)
            try {
                "$" + o(t) === r && (n = Pf(r, 1))
            } catch {}
    }),
    n
}
  , D_e = function(t) {
    var n = !1;
    return q0(Y0, function(o, r) {
        if (!n)
            try {
                o(t),
                n = Pf(r, 1)
            } catch {}
    }),
    n
}
  , m7 = function(t) {
    if (!t || typeof t != "object")
        return !1;
    if (!v7) {
        var n = Pf(B_e(t), 8, -1);
        return M_e(Cd, n) > -1 ? n : n !== "Object" ? !1 : D_e(t)
    }
    return _0 ? z_e(t) : null
}
  , O_e = m7
  , P_e = function(t) {
    return !!O_e(t)
};
(function(e) {
    var t = n_e
      , n = l_e
      , o = m7
      , r = P_e;
    function s(X) {
        return X.call.bind(X)
    }
    var a = typeof BigInt != "undefined"
      , l = typeof Symbol != "undefined"
      , i = s(Object.prototype.toString)
      , c = s(Number.prototype.valueOf)
      , u = s(String.prototype.valueOf)
      , f = s(Boolean.prototype.valueOf);
    if (a)
        var d = s(BigInt.prototype.valueOf);
    if (l)
        var p = s(Symbol.prototype.valueOf);
    function h(X, ve) {
        if (typeof X != "object")
            return !1;
        try {
            return ve(X),
            !0
        } catch {
            return !1
        }
    }
    e.isArgumentsObject = t,
    e.isGeneratorFunction = n,
    e.isTypedArray = r;
    function g(X) {
        return typeof Promise != "undefined" && X instanceof Promise || X !== null && typeof X == "object" && typeof X.then == "function" && typeof X.catch == "function"
    }
    e.isPromise = g;
    function v(X) {
        return typeof ArrayBuffer != "undefined" && ArrayBuffer.isView ? ArrayBuffer.isView(X) : r(X) || q(X)
    }
    e.isArrayBufferView = v;
    function x(X) {
        return o(X) === "Uint8Array"
    }
    e.isUint8Array = x;
    function m(X) {
        return o(X) === "Uint8ClampedArray"
    }
    e.isUint8ClampedArray = m;
    function b(X) {
        return o(X) === "Uint16Array"
    }
    e.isUint16Array = b;
    function _(X) {
        return o(X) === "Uint32Array"
    }
    e.isUint32Array = _;
    function $(X) {
        return o(X) === "Int8Array"
    }
    e.isInt8Array = $;
    function S(X) {
        return o(X) === "Int16Array"
    }
    e.isInt16Array = S;
    function B(X) {
        return o(X) === "Int32Array"
    }
    e.isInt32Array = B;
    function M(X) {
        return o(X) === "Float32Array"
    }
    e.isFloat32Array = M;
    function R(X) {
        return o(X) === "Float64Array"
    }
    e.isFloat64Array = R;
    function O(X) {
        return o(X) === "BigInt64Array"
    }
    e.isBigInt64Array = O;
    function F(X) {
        return o(X) === "BigUint64Array"
    }
    e.isBigUint64Array = F;
    function K(X) {
        return i(X) === "[object Map]"
    }
    K.working = typeof Map != "undefined" && K(new Map);
    function W(X) {
        return typeof Map == "undefined" ? !1 : K.working ? K(X) : X instanceof Map
    }
    e.isMap = W;
    function Y(X) {
        return i(X) === "[object Set]"
    }
    Y.working = typeof Set != "undefined" && Y(new Set);
    function Z(X) {
        return typeof Set == "undefined" ? !1 : Y.working ? Y(X) : X instanceof Set
    }
    e.isSet = Z;
    function L(X) {
        return i(X) === "[object WeakMap]"
    }
    L.working = typeof WeakMap != "undefined" && L(new WeakMap);
    function U(X) {
        return typeof WeakMap == "undefined" ? !1 : L.working ? L(X) : X instanceof WeakMap
    }
    e.isWeakMap = U;
    function j(X) {
        return i(X) === "[object WeakSet]"
    }
    j.working = typeof WeakSet != "undefined" && j(new WeakSet);
    function oe(X) {
        return j(X)
    }
    e.isWeakSet = oe;
    function se(X) {
        return i(X) === "[object ArrayBuffer]"
    }
    se.working = typeof ArrayBuffer != "undefined" && se(new ArrayBuffer);
    function G(X) {
        return typeof ArrayBuffer == "undefined" ? !1 : se.working ? se(X) : X instanceof ArrayBuffer
    }
    e.isArrayBuffer = G;
    function H(X) {
        return i(X) === "[object DataView]"
    }
    H.working = typeof ArrayBuffer != "undefined" && typeof DataView != "undefined" && H(new DataView(new ArrayBuffer(1),0,1));
    function q(X) {
        return typeof DataView == "undefined" ? !1 : H.working ? H(X) : X instanceof DataView
    }
    e.isDataView = q;
    var te = typeof SharedArrayBuffer != "undefined" ? SharedArrayBuffer : void 0;
    function ae(X) {
        return i(X) === "[object SharedArrayBuffer]"
    }
    function J(X) {
        return typeof te == "undefined" ? !1 : (typeof ae.working == "undefined" && (ae.working = ae(new te)),
        ae.working ? ae(X) : X instanceof te)
    }
    e.isSharedArrayBuffer = J;
    function ue(X) {
        return i(X) === "[object AsyncFunction]"
    }
    e.isAsyncFunction = ue;
    function ie(X) {
        return i(X) === "[object Map Iterator]"
    }
    e.isMapIterator = ie;
    function _e(X) {
        return i(X) === "[object Set Iterator]"
    }
    e.isSetIterator = _e;
    function Se(X) {
        return i(X) === "[object Generator]"
    }
    e.isGeneratorObject = Se;
    function Me(X) {
        return i(X) === "[object WebAssembly.Module]"
    }
    e.isWebAssemblyCompiledModule = Me;
    function Ve(X) {
        return h(X, c)
    }
    e.isNumberObject = Ve;
    function ee(X) {
        return h(X, u)
    }
    e.isStringObject = ee;
    function ce(X) {
        return h(X, f)
    }
    e.isBooleanObject = ce;
    function we(X) {
        return a && h(X, d)
    }
    e.isBigIntObject = we;
    function Te(X) {
        return l && h(X, p)
    }
    e.isSymbolObject = Te;
    function Be(X) {
        return Ve(X) || ee(X) || ce(X) || we(X) || Te(X)
    }
    e.isBoxedPrimitive = Be;
    function Fe(X) {
        return typeof Uint8Array != "undefined" && (G(X) || J(X))
    }
    e.isAnyArrayBuffer = Fe,
    ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach(function(X) {
        Object.defineProperty(e, X, {
            enumerable: !1,
            value: function() {
                throw new Error(X + " is not supported in userland")
            }
        })
    })
}
)(o7);
var F_e = function(t) {
    return t && typeof t == "object" && typeof t.copy == "function" && typeof t.fill == "function" && typeof t.readUInt8 == "function"
}
  , Sd = {
    exports: {}
};
typeof Object.create == "function" ? Sd.exports = function(t, n) {
    n && (t.super_ = n,
    t.prototype = Object.create(n.prototype, {
        constructor: {
            value: t,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }))
}
: Sd.exports = function(t, n) {
    if (n) {
        t.super_ = n;
        var o = function() {};
        o.prototype = n.prototype,
        t.prototype = new o,
        t.prototype.constructor = t
    }
}
;
(function(e) {
    var t = Object.getOwnPropertyDescriptors || function(q) {
        for (var te = Object.keys(q), ae = {}, J = 0; J < te.length; J++)
            ae[te[J]] = Object.getOwnPropertyDescriptor(q, te[J]);
        return ae
    }
      , n = /%[sdj%]/g;
    e.format = function(H) {
        if (!$(H)) {
            for (var q = [], te = 0; te < arguments.length; te++)
                q.push(a(arguments[te]));
            return q.join(" ")
        }
        for (var te = 1, ae = arguments, J = ae.length, ue = String(H).replace(n, function(_e) {
            if (_e === "%%")
                return "%";
            if (te >= J)
                return _e;
            switch (_e) {
            case "%s":
                return String(ae[te++]);
            case "%d":
                return Number(ae[te++]);
            case "%j":
                try {
                    return JSON.stringify(ae[te++])
                } catch {
                    return "[Circular]"
                }
            default:
                return _e
            }
        }), ie = ae[te]; te < J; ie = ae[++te])
            m(ie) || !R(ie) ? ue += " " + ie : ue += " " + a(ie);
        return ue
    }
    ,
    e.deprecate = function(H, q) {
        if (typeof process != "undefined" && process.noDeprecation === !0)
            return H;
        if (typeof process == "undefined")
            return function() {
                return e.deprecate(H, q).apply(this, arguments)
            }
            ;
        var te = !1;
        function ae() {
            if (!te) {
                if (process.throwDeprecation)
                    throw new Error(q);
                process.traceDeprecation ? console.trace(q) : console.error(q),
                te = !0
            }
            return H.apply(this, arguments)
        }
        return ae
    }
    ;
    var o = {}
      , r = /^$/;
    if ({}.NODE_DEBUG) {
        var s = {}.NODE_DEBUG;
        s = s.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(),
        r = new RegExp("^" + s + "$","i")
    }
    e.debuglog = function(H) {
        if (H = H.toUpperCase(),
        !o[H])
            if (r.test(H)) {
                var q = process.pid;
                o[H] = function() {
                    var te = e.format.apply(e, arguments);
                    console.error("%s %d: %s", H, q, te)
                }
            } else
                o[H] = function() {}
                ;
        return o[H]
    }
    ;
    function a(H, q) {
        var te = {
            seen: [],
            stylize: i
        };
        return arguments.length >= 3 && (te.depth = arguments[2]),
        arguments.length >= 4 && (te.colors = arguments[3]),
        x(q) ? te.showHidden = q : q && e._extend(te, q),
        B(te.showHidden) && (te.showHidden = !1),
        B(te.depth) && (te.depth = 2),
        B(te.colors) && (te.colors = !1),
        B(te.customInspect) && (te.customInspect = !0),
        te.colors && (te.stylize = l),
        u(te, H, te.depth)
    }
    e.inspect = a,
    a.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
    },
    a.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
    };
    function l(H, q) {
        var te = a.styles[q];
        return te ? "\x1B[" + a.colors[te][0] + "m" + H + "\x1B[" + a.colors[te][1] + "m" : H
    }
    function i(H, q) {
        return H
    }
    function c(H) {
        var q = {};
        return H.forEach(function(te, ae) {
            q[te] = !0
        }),
        q
    }
    function u(H, q, te) {
        if (H.customInspect && q && K(q.inspect) && q.inspect !== e.inspect && !(q.constructor && q.constructor.prototype === q)) {
            var ae = q.inspect(te, H);
            return $(ae) || (ae = u(H, ae, te)),
            ae
        }
        var J = f(H, q);
        if (J)
            return J;
        var ue = Object.keys(q)
          , ie = c(ue);
        if (H.showHidden && (ue = Object.getOwnPropertyNames(q)),
        F(q) && (ue.indexOf("message") >= 0 || ue.indexOf("description") >= 0))
            return d(q);
        if (ue.length === 0) {
            if (K(q)) {
                var _e = q.name ? ": " + q.name : "";
                return H.stylize("[Function" + _e + "]", "special")
            }
            if (M(q))
                return H.stylize(RegExp.prototype.toString.call(q), "regexp");
            if (O(q))
                return H.stylize(Date.prototype.toString.call(q), "date");
            if (F(q))
                return d(q)
        }
        var Se = ""
          , Me = !1
          , Ve = ["{", "}"];
        if (v(q) && (Me = !0,
        Ve = ["[", "]"]),
        K(q)) {
            var ee = q.name ? ": " + q.name : "";
            Se = " [Function" + ee + "]"
        }
        if (M(q) && (Se = " " + RegExp.prototype.toString.call(q)),
        O(q) && (Se = " " + Date.prototype.toUTCString.call(q)),
        F(q) && (Se = " " + d(q)),
        ue.length === 0 && (!Me || q.length == 0))
            return Ve[0] + Se + Ve[1];
        if (te < 0)
            return M(q) ? H.stylize(RegExp.prototype.toString.call(q), "regexp") : H.stylize("[Object]", "special");
        H.seen.push(q);
        var ce;
        return Me ? ce = p(H, q, te, ie, ue) : ce = ue.map(function(we) {
            return h(H, q, te, ie, we, Me)
        }),
        H.seen.pop(),
        g(ce, Se, Ve)
    }
    function f(H, q) {
        if (B(q))
            return H.stylize("undefined", "undefined");
        if ($(q)) {
            var te = "'" + JSON.stringify(q).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return H.stylize(te, "string")
        }
        if (_(q))
            return H.stylize("" + q, "number");
        if (x(q))
            return H.stylize("" + q, "boolean");
        if (m(q))
            return H.stylize("null", "null")
    }
    function d(H) {
        return "[" + Error.prototype.toString.call(H) + "]"
    }
    function p(H, q, te, ae, J) {
        for (var ue = [], ie = 0, _e = q.length; ie < _e; ++ie)
            j(q, String(ie)) ? ue.push(h(H, q, te, ae, String(ie), !0)) : ue.push("");
        return J.forEach(function(Se) {
            Se.match(/^\d+$/) || ue.push(h(H, q, te, ae, Se, !0))
        }),
        ue
    }
    function h(H, q, te, ae, J, ue) {
        var ie, _e, Se;
        if (Se = Object.getOwnPropertyDescriptor(q, J) || {
            value: q[J]
        },
        Se.get ? Se.set ? _e = H.stylize("[Getter/Setter]", "special") : _e = H.stylize("[Getter]", "special") : Se.set && (_e = H.stylize("[Setter]", "special")),
        j(ae, J) || (ie = "[" + J + "]"),
        _e || (H.seen.indexOf(Se.value) < 0 ? (m(te) ? _e = u(H, Se.value, null) : _e = u(H, Se.value, te - 1),
        _e.indexOf(`
`) > -1 && (ue ? _e = _e.split(`
`).map(function(Me) {
            return "  " + Me
        }).join(`
`).slice(2) : _e = `
` + _e.split(`
`).map(function(Me) {
            return "   " + Me
        }).join(`
`))) : _e = H.stylize("[Circular]", "special")),
        B(ie)) {
            if (ue && J.match(/^\d+$/))
                return _e;
            ie = JSON.stringify("" + J),
            ie.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (ie = ie.slice(1, -1),
            ie = H.stylize(ie, "name")) : (ie = ie.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"),
            ie = H.stylize(ie, "string"))
        }
        return ie + ": " + _e
    }
    function g(H, q, te) {
        var ae = H.reduce(function(J, ue) {
            return ue.indexOf(`
`) >= 0,
            J + ue.replace(/\u001b\[\d\d?m/g, "").length + 1
        }, 0);
        return ae > 60 ? te[0] + (q === "" ? "" : q + `
 `) + " " + H.join(`,
  `) + " " + te[1] : te[0] + q + " " + H.join(", ") + " " + te[1]
    }
    e.types = o7;
    function v(H) {
        return Array.isArray(H)
    }
    e.isArray = v;
    function x(H) {
        return typeof H == "boolean"
    }
    e.isBoolean = x;
    function m(H) {
        return H === null
    }
    e.isNull = m;
    function b(H) {
        return H == null
    }
    e.isNullOrUndefined = b;
    function _(H) {
        return typeof H == "number"
    }
    e.isNumber = _;
    function $(H) {
        return typeof H == "string"
    }
    e.isString = $;
    function S(H) {
        return typeof H == "symbol"
    }
    e.isSymbol = S;
    function B(H) {
        return H === void 0
    }
    e.isUndefined = B;
    function M(H) {
        return R(H) && Y(H) === "[object RegExp]"
    }
    e.isRegExp = M,
    e.types.isRegExp = M;
    function R(H) {
        return typeof H == "object" && H !== null
    }
    e.isObject = R;
    function O(H) {
        return R(H) && Y(H) === "[object Date]"
    }
    e.isDate = O,
    e.types.isDate = O;
    function F(H) {
        return R(H) && (Y(H) === "[object Error]" || H instanceof Error)
    }
    e.isError = F,
    e.types.isNativeError = F;
    function K(H) {
        return typeof H == "function"
    }
    e.isFunction = K;
    function W(H) {
        return H === null || typeof H == "boolean" || typeof H == "number" || typeof H == "string" || typeof H == "symbol" || typeof H == "undefined"
    }
    e.isPrimitive = W,
    e.isBuffer = F_e;
    function Y(H) {
        return Object.prototype.toString.call(H)
    }
    function Z(H) {
        return H < 10 ? "0" + H.toString(10) : H.toString(10)
    }
    var L = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    function U() {
        var H = new Date
          , q = [Z(H.getHours()), Z(H.getMinutes()), Z(H.getSeconds())].join(":");
        return [H.getDate(), L[H.getMonth()], q].join(" ")
    }
    e.log = function() {
        console.log("%s - %s", U(), e.format.apply(e, arguments))
    }
    ,
    e.inherits = Sd.exports,
    e._extend = function(H, q) {
        if (!q || !R(q))
            return H;
        for (var te = Object.keys(q), ae = te.length; ae--; )
            H[te[ae]] = q[te[ae]];
        return H
    }
    ;
    function j(H, q) {
        return Object.prototype.hasOwnProperty.call(H, q)
    }
    var oe = typeof Symbol != "undefined" ? Symbol("util.promisify.custom") : void 0;
    e.promisify = function(q) {
        if (typeof q != "function")
            throw new TypeError('The "original" argument must be of type Function');
        if (oe && q[oe]) {
            var te = q[oe];
            if (typeof te != "function")
                throw new TypeError('The "util.promisify.custom" argument must be of type Function');
            return Object.defineProperty(te, oe, {
                value: te,
                enumerable: !1,
                writable: !1,
                configurable: !0
            }),
            te
        }
        function te() {
            for (var ae, J, ue = new Promise(function(Se, Me) {
                ae = Se,
                J = Me
            }
            ), ie = [], _e = 0; _e < arguments.length; _e++)
                ie.push(arguments[_e]);
            ie.push(function(Se, Me) {
                Se ? J(Se) : ae(Me)
            });
            try {
                q.apply(this, ie)
            } catch (Se) {
                J(Se)
            }
            return ue
        }
        return Object.setPrototypeOf(te, Object.getPrototypeOf(q)),
        oe && Object.defineProperty(te, oe, {
            value: te,
            enumerable: !1,
            writable: !1,
            configurable: !0
        }),
        Object.defineProperties(te, t(q))
    }
    ,
    e.promisify.custom = oe;
    function se(H, q) {
        if (!H) {
            var te = new Error("Promise was rejected with a falsy value");
            te.reason = H,
            H = te
        }
        return q(H)
    }
    function G(H) {
        if (typeof H != "function")
            throw new TypeError('The "original" argument must be of type Function');
        function q() {
            for (var te = [], ae = 0; ae < arguments.length; ae++)
                te.push(arguments[ae]);
            var J = te.pop();
            if (typeof J != "function")
                throw new TypeError("The last argument must be of type Function");
            var ue = this
              , ie = function() {
                return J.apply(ue, arguments)
            };
            H.apply(this, te).then(function(_e) {
                process.nextTick(ie.bind(null, null, _e))
            }, function(_e) {
                process.nextTick(se.bind(null, _e, ie))
            })
        }
        return Object.setPrototypeOf(q, Object.getPrototypeOf(H)),
        Object.defineProperties(q, t(H)),
        q
    }
    e.callbackify = G
}
)(yd);
const O6 = jc;
class V_e {
    static stringToArrayBufferInUtf8(t) {
        const n = TextEncoder
        return new n().encode(t)
    }
    static utf8ArrayBufferToString(t) {
        const n = typeof window == "undefined" ? yd.TextDecoder : window.TextDecoder;
        return new n("utf-8").decode(t)
    }
    static arrayBufferToBase64(t) {
        return O6.fromByteArray(t)
    }
    static base64ToArrayBuffer(t) {
        return O6.toByteArray(t)
    }
}
var H_e = V_e;
const Sr = H_e
  , to = 16
  , Di = Uint8Array.from([214, 144, 233, 254, 204, 225, 61, 183, 22, 182, 20, 194, 40, 251, 44, 5, 43, 103, 154, 118, 42, 190, 4, 195, 170, 68, 19, 38, 73, 134, 6, 153, 156, 66, 80, 244, 145, 239, 152, 122, 51, 84, 11, 67, 237, 207, 172, 98, 228, 179, 28, 169, 201, 8, 232, 149, 128, 223, 148, 250, 117, 143, 63, 166, 71, 7, 167, 252, 243, 115, 23, 186, 131, 89, 60, 25, 230, 133, 79, 168, 104, 107, 129, 178, 113, 100, 218, 139, 248, 235, 15, 75, 112, 86, 157, 53, 30, 36, 14, 94, 99, 88, 209, 162, 37, 34, 124, 59, 1, 33, 120, 135, 212, 0, 70, 87, 159, 211, 39, 82, 76, 54, 2, 231, 160, 196, 200, 158, 234, 191, 138, 210, 64, 199, 56, 181, 163, 247, 242, 206, 249, 97, 21, 161, 224, 174, 93, 164, 155, 52, 26, 85, 173, 147, 50, 48, 245, 140, 177, 227, 29, 246, 226, 46, 130, 102, 202, 96, 192, 41, 35, 171, 13, 83, 78, 111, 213, 219, 55, 69, 222, 253, 142, 47, 3, 255, 106, 114, 109, 108, 91, 81, 141, 27, 175, 146, 187, 221, 188, 127, 17, 217, 92, 65, 31, 16, 90, 216, 10, 193, 49, 136, 165, 205, 123, 189, 45, 116, 208, 18, 184, 229, 180, 176, 137, 105, 151, 74, 12, 150, 119, 126, 101, 185, 241, 9, 197, 110, 198, 132, 24, 240, 125, 236, 58, 220, 77, 32, 121, 238, 95, 62, 215, 203, 57, 72])
  , L_e = Uint32Array.from([462357, 472066609, 943670861, 1415275113, 1886879365, 2358483617, 2830087869, 3301692121, 3773296373, 4228057617, 404694573, 876298825, 1347903077, 1819507329, 2291111581, 2762715833, 3234320085, 3705924337, 4177462797, 337322537, 808926789, 1280531041, 1752135293, 2223739545, 2695343797, 3166948049, 3638552301, 4110090761, 269950501, 741554753, 1213159005, 1684763257])
  , Oi = Uint32Array.from([2746333894, 1453994832, 1736282519, 2993693404]);
class N_e {
    constructor(t) {
        let n = Sr.stringToArrayBufferInUtf8(t.key);
        if (n.length !== 16)
            throw new Error("key should be a 16 bytes string");
        this.key = n;
        let o = new Uint8Array(0);
        if (t.iv !== void 0 && t.iv !== null && (o = Sr.stringToArrayBufferInUtf8(t.iv),
        o.length !== 16))
            throw new Error("iv should be a 16 bytes string");
        this.iv = o,
        this.mode = "cbc",
        ["cbc", "ecb"].indexOf(t.mode) >= 0 && (this.mode = t.mode),
        this.cipherType = "base64",
        ["base64", "text"].indexOf(t.outType) >= 0 && (this.cipherType = t.outType),
        this.encryptRoundKeys = new Uint32Array(32),
        this.spawnEncryptRoundKeys(),
        this.decryptRoundKeys = Uint32Array.from(this.encryptRoundKeys),
        this.decryptRoundKeys.reverse()
    }
    doBlockCrypt(t, n) {
        let o = new Uint32Array(36);
        o.set(t, 0);
        for (let s = 0; s < 32; s++)
            o[s + 4] = o[s] ^ this.tTransform1(o[s + 1] ^ o[s + 2] ^ o[s + 3] ^ n[s]);
        let r = new Uint32Array(4);
        return r[0] = o[35],
        r[1] = o[34],
        r[2] = o[33],
        r[3] = o[32],
        r
    }
    spawnEncryptRoundKeys() {
        let t = new Uint32Array(4);
        t[0] = this.key[0] << 24 | this.key[1] << 16 | this.key[2] << 8 | this.key[3],
        t[1] = this.key[4] << 24 | this.key[5] << 16 | this.key[6] << 8 | this.key[7],
        t[2] = this.key[8] << 24 | this.key[9] << 16 | this.key[10] << 8 | this.key[11],
        t[3] = this.key[12] << 24 | this.key[13] << 16 | this.key[14] << 8 | this.key[15];
        let n = new Uint32Array(36);
        n[0] = t[0] ^ Oi[0],
        n[1] = t[1] ^ Oi[1],
        n[2] = t[2] ^ Oi[2],
        n[3] = t[3] ^ Oi[3];
        for (let o = 0; o < 32; o++)
            n[o + 4] = n[o] ^ this.tTransform2(n[o + 1] ^ n[o + 2] ^ n[o + 3] ^ L_e[o]),
            this.encryptRoundKeys[o] = n[o + 4]
    }
    rotateLeft(t, n) {
        return t << n | t >>> 32 - n
    }
    linearTransform1(t) {
        return t ^ this.rotateLeft(t, 2) ^ this.rotateLeft(t, 10) ^ this.rotateLeft(t, 18) ^ this.rotateLeft(t, 24)
    }
    linearTransform2(t) {
        return t ^ this.rotateLeft(t, 13) ^ this.rotateLeft(t, 23)
    }
    tauTransform(t) {
        return Di[t >>> 24 & 255] << 24 | Di[t >>> 16 & 255] << 16 | Di[t >>> 8 & 255] << 8 | Di[t & 255]
    }
    tTransform1(t) {
        let n = this.tauTransform(t);
        return this.linearTransform1(n)
    }
    tTransform2(t) {
        let n = this.tauTransform(t);
        return this.linearTransform2(n)
    }
    padding(t) {
        if (t === null)
            return null;
        let n = to - t.length % to
          , o = new Uint8Array(t.length + n);
        return o.set(t, 0),
        o.fill(n, t.length),
        o
    }
    dePadding(t) {
        if (t === null)
            return null;
        let n = t[t.length - 1];
        return t.slice(0, t.length - n)
    }
    uint8ToUint32Block(t, n=0) {
        let o = new Uint32Array(4);
        return o[0] = t[n] << 24 | t[n + 1] << 16 | t[n + 2] << 8 | t[n + 3],
        o[1] = t[n + 4] << 24 | t[n + 5] << 16 | t[n + 6] << 8 | t[n + 7],
        o[2] = t[n + 8] << 24 | t[n + 9] << 16 | t[n + 10] << 8 | t[n + 11],
        o[3] = t[n + 12] << 24 | t[n + 13] << 16 | t[n + 14] << 8 | t[n + 15],
        o
    }
    encrypt(t) {
        let n = Sr.stringToArrayBufferInUtf8(t)
          , o = this.padding(n)
          , r = o.length / to
          , s = new Uint8Array(o.length);
        if (this.mode === "cbc") {
            if (this.iv === null || this.iv.length !== 16)
                throw new Error("iv error");
            let a = this.uint8ToUint32Block(this.iv);
            for (let l = 0; l < r; l++) {
                let i = l * to
                  , c = this.uint8ToUint32Block(o, i);
                a[0] = a[0] ^ c[0],
                a[1] = a[1] ^ c[1],
                a[2] = a[2] ^ c[2],
                a[3] = a[3] ^ c[3];
                let u = this.doBlockCrypt(a, this.encryptRoundKeys);
                a = u;
                for (let f = 0; f < to; f++)
                    s[i + f] = u[parseInt(f / 4)] >> (3 - f) % 4 * 8 & 255
            }
        } else
            for (let a = 0; a < r; a++) {
                let l = a * to
                  , i = this.uint8ToUint32Block(o, l)
                  , c = this.doBlockCrypt(i, this.encryptRoundKeys);
                for (let u = 0; u < to; u++)
                    s[l + u] = c[parseInt(u / 4)] >> (3 - u) % 4 * 8 & 255
            }
        return this.cipherType === "base64" ? Sr.arrayBufferToBase64(s) : Sr.utf8ArrayBufferToString(s)
    }
    decrypt(t) {
        let n = new Uint8Array;
        this.cipherType === "base64" ? n = Sr.base64ToArrayBuffer(t) : n = Sr.stringToArrayBufferInUtf8(t);
        let o = n.length / to
          , r = new Uint8Array(n.length);
        if (this.mode === "cbc") {
            if (this.iv === null || this.iv.length !== 16)
                throw new Error("iv error");
            let a = this.uint8ToUint32Block(this.iv);
            for (let l = 0; l < o; l++) {
                let i = l * to
                  , c = this.uint8ToUint32Block(n, i)
                  , u = this.doBlockCrypt(c, this.decryptRoundKeys)
                  , f = new Uint32Array(4);
                f[0] = a[0] ^ u[0],
                f[1] = a[1] ^ u[1],
                f[2] = a[2] ^ u[2],
                f[3] = a[3] ^ u[3],
                a = c;
                for (let d = 0; d < to; d++)
                    r[i + d] = f[parseInt(d / 4)] >> (3 - d) % 4 * 8 & 255
            }
        } else
            for (let a = 0; a < o; a++) {
                let l = a * to
                  , i = this.uint8ToUint32Block(n, l)
                  , c = this.doBlockCrypt(i, this.decryptRoundKeys);
                for (let u = 0; u < to; u++)
                    r[l + u] = c[parseInt(u / 4)] >> (3 - u) % 4 * 8 & 255
            }
        let s = this.dePadding(r);
        return Sr.utf8ArrayBufferToString(s)
    }
}
var I_e = N_e;
var j_e = {
    sm4: I_e
}
function W_e() {
    const o = j_e.sm4;
    return new o({
    "key": "B6*40.2_C9#e4$E3",
    "mode": "ecb",
    "cipherType": "base64"
})
}
data = {"pageNum":1,"pageSize":10,"certificateType":"","name":"","slideId":"1335587884635258880","key":"query","width":327}
aa = W_e().encrypt(JSON.stringify(data))
console.log(aa)

