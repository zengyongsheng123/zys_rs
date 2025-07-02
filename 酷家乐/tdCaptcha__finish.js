(function (t, vc) {
  function fa(a) {
    var b = a.length,
      d = c.type(a);
    return c.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : 'array' === d || 'function' !== d && (0 === b || 'number' === typeof b && 0 < b && b - 1 in a);
  }
  function Fb(a) {
    var b = Ma[a] = {};
    c.each(a.match(W) || [], function (a, c) {
      b[c] = !0;
    });
    return b;
  }
  function Na(a, b, d, e) {
    if (c.acceptData(a)) {
      var f = c.expando,
        g = 'string' === typeof b,
        h = a.nodeType,
        k = h ? c.cache : a,
        n = h ? a[f] : a[f] && f;
      if (n && k[n] && (e || k[n].data) || !g || void 0 !== d) {
        n || (h ? a[f] = n = ba.pop() || c.guid++ : n = f);
        k[n] || (k[n] = {}, h || (k[n].toJSON = c.noop));
        if ('object' === typeof b || 'function' === typeof b) e ? k[n] = c.extend(k[n], b) : k[n].data = c.extend(k[n].data, b);
        a = k[n];
        e || (a.data || (a.data = {}), a = a.data);
        void 0 !== d && (a[c.camelCase(b)] = d);
        g ? (d = a[b], null == d && (d = a[c.camelCase(b)])) : d = a;
        return d;
      }
    }
  }
  function Oa(a, b, d) {
    if (c.acceptData(a)) {
      var e,
        f,
        g,
        h = a.nodeType,
        k = h ? c.cache : a,
        n = h ? a[c.expando] : c.expando;
      if (k[n]) {
        if (b && (g = d ? k[n] : k[n].data)) {
          c.isArray(b) ? b = b.concat(c.map(b, c.camelCase)) : b in g ? b = [b] : (b = c.camelCase(b), b = b in g ? [b] : b.split(' '));
          e = 0;
          for (f = b.length; e < f; e++) delete g[b[e]];
          if (!(d ? oa : c.isEmptyObject)(g)) return;
        }
        if (!d && (delete k[n].data, !oa(k[n]))) return;
        h ? c.cleanData([a], !0) : c.support.deleteExpando || k != k.window ? delete k[n] : k[n] = null;
      }
    }
  }
  function oa(a) {
    for (var b in a) if (('data' !== b || !c.isEmptyObject(a[b])) && 'toJSON' !== b) return !1;
    return !0;
  }
  function Pa(a, b) {
    do {
      a = a[b];
    } while (a && 1 !== a.nodeType);
    return a;
  }
  function Qa(a) {
    var b = Ra.split('|');
    a = a.createDocumentFragment();
    if (a.createElement) for (; b.length;) a.createElement(b.pop());
    return a;
  }
  function Gb(a, b) {
    return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b));
  }
  function Sa(a) {
    var b = a.getAttributeNode('type');
    a.type = (b && b.specified) + '/' + a.type;
    return a;
  }
  function Ta(a) {
    var b = Hb.exec(a.type);
    b ? a.type = b[1] : a.removeAttribute('type');
    return a;
  }
  function pa(a, b) {
    for (var d, e = 0; null != (d = a[e]); e++) c._data(d, 'globalEval', !b || c._data(b[e], 'globalEval'));
  }
  function Ua(a, b) {
    if (1 === b.nodeType && c.hasData(a)) {
      var d, e, f;
      e = c._data(a);
      a = c._data(b, e);
      var g = e.events;
      if (g) for (d in delete a.handle, a.events = {}, g) for (e = 0, f = g[d].length; e < f; e++) c.event.add(b, d, g[d][e]);
      a.data && (a.data = c.extend({}, a.data));
    }
  }
  function B(a, b) {
    var d,
      e,
      f = 0,
      g = 'undefined' !== typeof a.getElementsByTagName ? a.getElementsByTagName(b || '*') : 'undefined' !== typeof a.querySelectorAll ? a.querySelectorAll(b || '*') : void 0;
    if (!g) for (g = [], d = a.childNodes || a; null != (e = d[f]); f++) !b || c.nodeName(e, b) ? g.push(e) : c.merge(g, B(e, b));
    return void 0 === b || b && c.nodeName(a, b) ? c.merge([a], g) : g;
  }
  function Wa(a, b) {
    if (b in a) return b;
    for (var c = b.charAt(0).toUpperCase() + b.slice(1), e = b, f = Xa.length; f--;) if (b = Xa[f] + c, b in a) return b;
    return e;
  }
  function Ya(a, b) {
    a = b || a;
    return 'none' === c.css(a, 'display') || !c.contains(a.ownerDocument, a);
  }
  function Za(a, b) {
    for (var d, e, f, g = [], h = 0, k = a.length; h < k; h++) e = a[h], e.style && (g[h] = c._data(e, 'olddisplay'), d = e.style.display, b ? (g[h] || 'none' !== d || (e.style.display = ''), '' === e.style.display && Ya(e) && (g[h] = c._data(e, 'olddisplay', Jb(e.nodeName)))) : g[h] || (f = Ya(e), (d && 'none' !== d || !f) && c._data(e, 'olddisplay', f ? d : c.css(e, 'display'))));
    for (h = 0; h < k; h++) e = a[h], !e.style || b && 'none' !== e.style.display && '' !== e.style.display || (e.style.display = b ? g[h] || '' : 'none');
    return a;
  }
  function $a(a, b, c) {
    return (a = Kb.exec(b)) ? Math.max(0, a[1] - (c || 0)) + (a[2] || 'px') : b;
  }
  function ab(a, b, d, e, f) {
    b = d === (e ? 'border' : 'content') ? 4 : 'width' === b ? 1 : 0;
    for (var g = 0; 4 > b; b += 2) 'margin' === d && (g += c.css(a, d + G[b], !0, f)), e ? ('content' === d && (g -= c.css(a, 'padding' + G[b], !0, f)), 'margin' !== d && (g -= c.css(a, 'border' + G[b] + 'Width', !0, f))) : (g += c.css(a, 'padding' + G[b], !0, f), 'padding' !== d && (g += c.css(a, 'border' + G[b] + 'Width', !0, f)));
    return g;
  }
  function bb(a, b, d) {
    var e = !0,
      f = 'width' === b ? a.offsetWidth : a.offsetHeight,
      g = J(a),
      h = c.support.boxSizing && 'border-box' === c.css(a, 'boxSizing', !1, g);
    if (0 >= f || null == f) {
      f = Q(a, b, g);
      if (0 > f || null == f) f = a.style[b];
      if (ka.test(f)) return f;
      e = h && (c.support.boxSizingReliable || f === a.style[b]);
      f = parseFloat(f) || 0;
    }
    return f + ab(a, b, d || (h ? 'border' : 'content'), e, g) + 'px';
  }
  function Jb(a) {
    var b = l,
      d = cb[a];
    d || (d = db(a, b), 'none' !== d && d || (X = (X || c('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>').css('cssText', 'display:block !important')).appendTo(b.documentElement), b = (X[0].contentWindow || X[0].contentDocument).document, b.write('<!doctype html><html><body>'), b.close(), d = db(a, b), X.detach()), cb[a] = d);
    return d;
  }
  function db(a, b) {
    a = c(b.createElement(a)).appendTo(b.body);
    b = c.css(a[0], 'display');
    a.remove();
    return b;
  }
  function qa(a, b, d, e) {
    var f;
    if (c.isArray(b)) c.each(b, function (b, c) {
      d || Lb.test(a) ? e(a, c) : qa(a + '[' + ('object' === typeof c ? b : '') + ']', c, d, e);
    });else if (d || 'object' !== c.type(b)) e(a, b);else for (f in b) qa(a + '[' + f + ']', b[f], d, e);
  }
  function eb(a) {
    return function (b, d) {
      'string' !== typeof b && (d = b, b = '*');
      var e = 0,
        f = b.toLowerCase().match(W) || [];
      if (c.isFunction(d)) for (; b = f[e++];) '+' === b[0] ? (b = b.slice(1) || '*', (a[b] = a[b] || []).unshift(d)) : (a[b] = a[b] || []).push(d);
    };
  }
  function fb(a, b, d, e) {
    function f(k) {
      var n;
      g[k] = !0;
      c.each(a[k] || [], function (a, c) {
        a = c(b, d, e);
        if ('string' === typeof a && !h && !g[a]) return b.dataTypes.unshift(a), f(a), !1;
        if (h) return !(n = a);
      });
      return n;
    }
    var g = {},
      h = a === ra;
    return f(b.dataTypes[0]) || !g['*'] && f('*');
  }
  function sa(a, b) {
    var d,
      e,
      f = c.ajaxSettings.flatOptions || {};
    for (e in b) void 0 !== b[e] && ((f[e] ? a : d || (d = {}))[e] = b[e]);
    d && c.extend(!0, a, d);
    return a;
  }
  function gb() {
    try {
      return new t.XMLHttpRequest();
    } catch (a) {}
  }
  function hb(a) {
    return c.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1;
  }
  var Y,
    ib,
    l = t.document,
    Mb = t.location,
    ca = {},
    ba = [],
    jb = ba.concat,
    xa = ba.push,
    R = ba.slice,
    kb = ba.indexOf,
    Nb = ca.toString,
    S = ca.hasOwnProperty,
    ya = '1.9.1'.trim,
    c = function (a, b) {
      return new c.fn.init(a, b, ib);
    },
    za = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    W = /\S+/g,
    Ob = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    Pb = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    lb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    Qb = /^[\],:{}\s]*$/,
    Rb = /(?:^|:|,)(?:\s*\[)+/g,
    Sb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    Tb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    Ub = /^-ms-/,
    Vb = /-([\da-z])/gi,
    Wb = function (a, b) {
      return b.toUpperCase();
    },
    C = function (a) {
      if (l.addEventListener || 'load' === a.type || 'complete' === l.readyState) mb(), c.ready();
    },
    mb = function () {
      l.addEventListener ? (l.removeEventListener('DOMContentLoaded', C, !1), t.removeEventListener('load', C, !1)) : (l.detachEvent('onreadystatechange', C), t.detachEvent('onload', C));
    };
  c.fn = c.prototype = {
    jquery: '1.9.1',
    constructor: c,
    init: function (a, b, d) {
      var e;
      if (!a) return this;
      if ('string' === typeof a) {
        e = '<' === a.charAt(0) && '>' === a.charAt(a.length - 1) && 3 <= a.length ? [null, a, null] : Pb.exec(a);
        if (!e || !e[1] && b) return !b || b.jquery ? (b || d).find(a) : this.constructor(b).find(a);
        if (e[1]) {
          if (b = b instanceof c ? b[0] : b, c.merge(this, c.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), lb.test(e[1]) && c.isPlainObject(b)) for (e in b) if (c.isFunction(this[e])) this[e](b[e]);else this.attr(e, b[e]);
        } else {
          if ((b = l.getElementById(e[2])) && b.parentNode) {
            if (b.id !== e[2]) return d.find(a);
            this.length = 1;
            this[0] = b;
          }
          this.context = l;
          this.selector = a;
        }
        return this;
      }
      if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
      if (c.isFunction(a)) return d.ready(a);
      void 0 !== a.selector && (this.selector = a.selector, this.context = a.context);
      return c.makeArray(a, this);
    },
    selector: '',
    length: 0,
    size: function () {
      return this.length;
    },
    toArray: function () {
      return R.call(this);
    },
    get: function (a) {
      return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a];
    },
    pushStack: function (a) {
      a = c.merge(this.constructor(), a);
      a.prevObject = this;
      a.context = this.context;
      return a;
    },
    each: function (a, b) {
      return c.each(this, a, b);
    },
    ready: function (a) {
      c.ready.promise().done(a);
      return this;
    },
    slice: function () {
      return this.pushStack(R.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (a) {
      var b = this.length;
      a = +a + (0 > a ? b : 0);
      return this.pushStack(0 <= a && a < b ? [this[a]] : []);
    },
    map: function (a) {
      return this.pushStack(c.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: xa,
    sort: [].sort,
    splice: [].splice
  };
  c.fn.init.prototype = c.fn;
  c.extend = c.fn.extend = function () {
    var a,
      b,
      d,
      e,
      f,
      g = arguments[0] || {},
      h = 1,
      k = arguments.length,
      n = !1;
    'boolean' === typeof g && (n = g, g = arguments[1] || {}, h = 2);
    'object' === typeof g || c.isFunction(g) || (g = {});
    k === h && (g = this, --h);
    for (; h < k; h++) if (null != (f = arguments[h])) for (e in f) a = g[e], d = f[e], g !== d && (n && d && (c.isPlainObject(d) || (b = c.isArray(d))) ? (b ? (b = !1, a = a && c.isArray(a) ? a : []) : a = a && c.isPlainObject(a) ? a : {}, g[e] = c.extend(n, a, d)) : void 0 !== d && (g[e] = d));
    return g;
  };
  c.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function (a) {
      a ? c.readyWait++ : c.ready(!0);
    },
    ready: function (a) {
      if (!0 === a ? ! --c.readyWait : !c.isReady) {
        if (!l.body) return setTimeout(c.ready);
        c.isReady = !0;
        !0 !== a && 0 < --c.readyWait || (Y.resolveWith(l, [c]), c.fn.trigger && c(l).trigger('ready').off('ready'));
      }
    },
    isFunction: function (a) {
      return 'function' === c.type(a);
    },
    isArray: Array.isArray || function (a) {
      return 'array' === c.type(a);
    },
    isWindow: function (a) {
      return null != a && a == a.window;
    },
    isNumeric: function (a) {
      return !isNaN(parseFloat(a)) && isFinite(a);
    },
    type: function (a) {
      return null == a ? String(a) : 'object' === typeof a || 'function' === typeof a ? ca[Nb.call(a)] || 'object' : typeof a;
    },
    isPlainObject: function (a) {
      if (!a || 'object' !== c.type(a) || a.nodeType || c.isWindow(a)) return !1;
      try {
        if (a.constructor && !S.call(a, 'constructor') && !S.call(a.constructor.prototype, 'isPrototypeOf')) return !1;
      } catch (d) {
        return !1;
      }
      for (var b in a);
      return void 0 === b || S.call(a, b);
    },
    isEmptyObject: function (a) {
      for (var b in a) return !1;
      return !0;
    },
    error: function (a) {
      throw Error(a);
    },
    parseHTML: function (a, b, d) {
      if (!a || 'string' !== typeof a) return null;
      'boolean' === typeof b && (d = b, b = !1);
      b = b || l;
      var e = lb.exec(a);
      d = !d && [];
      if (e) return [b.createElement(e[1])];
      e = c.buildFragment([a], b, d);
      d && c(d).remove();
      return c.merge([], e.childNodes);
    },
    parseJSON: function (a) {
      if (t.JSON && t.JSON.parse) return t.JSON.parse(a);
      if (null === a) return a;
      if ('string' === typeof a && (a = c.trim(a)) && Qb.test(a.replace(Sb, '@').replace(Tb, ']').replace(Rb, ''))) return new Function('return ' + a)();
      c.error('Invalid JSON: ' + a);
    },
    parseXML: function (a) {
      var b, d;
      if (!a || 'string' !== typeof a) return null;
      try {
        t.DOMParser ? (d = new DOMParser(), b = d.parseFromString(a, 'text/xml')) : (b = new ActiveXObject('Microsoft.XMLDOM'), b.async = 'false', b.loadXML(a));
      } catch (e) {
        b = void 0;
      }
      b && b.documentElement && !b.getElementsByTagName('parsererror').length || c.error('Invalid XML: ' + a);
      return b;
    },
    noop: function () {},
    globalEval: function (a) {
      a && c.trim(a) && (t.execScript || function (a) {
        t.eval.call(t, a);
      })(a);
    },
    camelCase: function (a) {
      return a.replace(Ub, 'ms-').replace(Vb, Wb);
    },
    nodeName: function (a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
    },
    each: function (a, b, c) {
      var d,
        f = 0,
        g = a.length;
      d = fa(a);
      if (c) {
        if (d) for (; f < g && (d = b.apply(a[f], c), !1 !== d); f++);else for (f in a) {
          if (d = b.apply(a[f], c), !1 === d) break;
        }
      } else if (d) for (; f < g && (d = b.call(a[f], f, a[f]), !1 !== d); f++);else for (f in a) if (d = b.call(a[f], f, a[f]), !1 === d) break;
      return a;
    },
    trim: ya && !ya.call('\uFEFF\xA0') ? function (a) {
      return null == a ? '' : ya.call(a);
    } : function (a) {
      return null == a ? '' : (a + '').replace(Ob, '');
    },
    makeArray: function (a, b) {
      b = b || [];
      null != a && (fa(Object(a)) ? c.merge(b, 'string' === typeof a ? [a] : a) : xa.call(b, a));
      return b;
    },
    inArray: function (a, b, c) {
      var d;
      if (b) {
        if (kb) return kb.call(b, a, c);
        d = b.length;
        for (c = c ? 0 > c ? Math.max(0, d + c) : c : 0; c < d; c++) if (c in b && b[c] === a) return c;
      }
      return -1;
    },
    merge: function (a, b) {
      var c = b.length,
        e = a.length,
        f = 0;
      if ('number' === typeof c) for (; f < c; f++) a[e++] = b[f];else for (; void 0 !== b[f];) a[e++] = b[f++];
      a.length = e;
      return a;
    },
    grep: function (a, b, c) {
      var d,
        f = [],
        g = 0,
        h = a.length;
      for (c = !!c; g < h; g++) d = !!b(a[g], g), c !== d && f.push(a[g]);
      return f;
    },
    map: function (a, b, c) {
      var d,
        f = 0,
        g = a.length,
        h = [];
      if (fa(a)) for (; f < g; f++) d = b(a[f], f, c), null != d && (h[h.length] = d);else for (f in a) d = b(a[f], f, c), null != d && (h[h.length] = d);
      return jb.apply([], h);
    },
    guid: 1,
    proxy: function (a, b) {
      var d, e;
      'string' === typeof b && (e = a[b], b = a, a = e);
      if (c.isFunction(a)) return d = R.call(arguments, 2), e = function () {
        return a.apply(b || this, d.concat(R.call(arguments)));
      }, e.guid = a.guid = a.guid || c.guid++, e;
    },
    access: function (a, b, d, e, f, g, h) {
      var k = 0,
        n = a.length,
        q = null == d;
      if ('object' === c.type(d)) for (k in f = !0, d) c.access(a, b, k, d[k], !0, g, h);else if (void 0 !== e && (f = !0, c.isFunction(e) || (h = !0), q && (h ? (b.call(a, e), b = null) : (q = b, b = function (a, b, d) {
        return q.call(c(a), d);
      })), b)) for (; k < n; k++) b(a[k], d, h ? e : e.call(a[k], k, b(a[k], d)));
      return f ? a : q ? b.call(a) : n ? b(a[0], d) : g;
    },
    now: function () {
      return new Date().getTime();
    }
  });
  c.ready.promise = function (a) {
    if (!Y) if (Y = c.Deferred(), 'complete' === l.readyState) setTimeout(c.ready);else if (l.addEventListener) l.addEventListener('DOMContentLoaded', C, !1), t.addEventListener('load', C, !1);else {
      l.attachEvent('onreadystatechange', C);
      t.attachEvent('onload', C);
      var b = !1;
      try {
        b = null == t.frameElement && l.documentElement;
      } catch (d) {}
      b && b.doScroll && function e() {
        if (!c.isReady) {
          try {
            b.doScroll('left');
          } catch (f) {
            return setTimeout(e, 50);
          }
          mb();
          c.ready();
        }
      }();
    }
    return Y.promise(a);
  };
  c.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (a, b) {
    ca['[object ' + b + ']'] = b.toLowerCase();
  });
  ib = c(l);
  var Ma = {};
  c.Callbacks = function (a) {
    a = 'string' === typeof a ? Ma[a] || Fb(a) : c.extend({}, a);
    var b,
      d,
      e,
      f,
      g,
      h,
      k = [],
      n = !a.once && [],
      q = function (c) {
        d = a.memory && c;
        e = !0;
        g = h || 0;
        h = 0;
        f = k.length;
        for (b = !0; k && g < f; g++) if (!1 === k[g].apply(c[0], c[1]) && a.stopOnFalse) {
          d = !1;
          break;
        }
        b = !1;
        k && (n ? n.length && q(n.shift()) : d ? k = [] : m.disable());
      },
      m = {
        add: function () {
          if (k) {
            var e = k.length;
            (function ua(b) {
              c.each(b, function (b, d) {
                b = c.type(d);
                'function' === b ? a.unique && m.has(d) || k.push(d) : d && d.length && 'string' !== b && ua(d);
              });
            })(arguments);
            b ? f = k.length : d && (h = e, q(d));
          }
          return this;
        },
        remove: function () {
          k && c.each(arguments, function (a, d) {
            for (var e; -1 < (e = c.inArray(d, k, e));) k.splice(e, 1), b && (e <= f && f--, e <= g && g--);
          });
          return this;
        },
        has: function (a) {
          return a ? -1 < c.inArray(a, k) : !(!k || !k.length);
        },
        empty: function () {
          k = [];
          return this;
        },
        disable: function () {
          k = n = d = void 0;
          return this;
        },
        disabled: function () {
          return !k;
        },
        lock: function () {
          n = void 0;
          d || m.disable();
          return this;
        },
        locked: function () {
          return !n;
        },
        fireWith: function (a, c) {
          c = c || [];
          c = [a, c.slice ? c.slice() : c];
          !k || e && !n || (b ? n.push(c) : q(c));
          return this;
        },
        fire: function () {
          m.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!e;
        }
      };
    return m;
  };
  c.extend({
    Deferred: function (a) {
      var b = [['resolve', 'done', c.Callbacks('once memory'), 'resolved'], ['reject', 'fail', c.Callbacks('once memory'), 'rejected'], ['notify', 'progress', c.Callbacks('memory')]],
        d = 'pending',
        e = {
          state: function () {
            return d;
          },
          always: function () {
            f.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var a = arguments;
            return c.Deferred(function (d) {
              c.each(b, function (b, g) {
                var h = g[0],
                  k = c.isFunction(a[b]) && a[b];
                f[g[1]](function () {
                  var a = k && k.apply(this, arguments);
                  if (a && c.isFunction(a.promise)) a.promise().done(d.resolve).fail(d.reject).progress(d.notify);else d[h + 'With'](this === e ? d.promise() : this, k ? [a] : arguments);
                });
              });
              a = null;
            }).promise();
          },
          promise: function (a) {
            return null != a ? c.extend(a, e) : e;
          }
        },
        f = {};
      e.pipe = e.then;
      c.each(b, function (a, c) {
        var g = c[2],
          h = c[3];
        e[c[1]] = g.add;
        h && g.add(function () {
          d = h;
        }, b[a ^ 1][2].disable, b[2][2].lock);
        f[c[0]] = function () {
          f[c[0] + 'With'](this === f ? e : this, arguments);
          return this;
        };
        f[c[0] + 'With'] = g.fireWith;
      });
      e.promise(f);
      a && a.call(f, f);
      return f;
    },
    when: function (a) {
      var b = 0,
        d = R.call(arguments),
        e = d.length,
        f = 1 !== e || a && c.isFunction(a.promise) ? e : 0,
        g = 1 === f ? a : c.Deferred(),
        h = function (a, b, c) {
          return function (d) {
            b[a] = this;
            c[a] = 1 < arguments.length ? R.call(arguments) : d;
            c === k ? g.notifyWith(b, c) : --f || g.resolveWith(b, c);
          };
        },
        k,
        n,
        q;
      if (1 < e) for (k = Array(e), n = Array(e), q = Array(e); b < e; b++) d[b] && c.isFunction(d[b].promise) ? d[b].promise().done(h(b, q, d)).fail(g.reject).progress(h(b, n, k)) : --f;
      f || g.resolveWith(q, d);
      return g.promise();
    }
  });
  c.support = function () {
    var a,
      b,
      d,
      e,
      f,
      g,
      h,
      k = l.createElement('div');
    k.setAttribute('className', 't');
    k.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
    b = k.getElementsByTagName('*');
    d = k.getElementsByTagName('a')[0];
    if (!b || !d || !b.length) return {};
    e = l.createElement('select');
    f = e.appendChild(l.createElement('option'));
    b = k.getElementsByTagName('input')[0];
    d.style.cssText = 'top:1px;float:left;opacity:.5';
    a = {
      getSetAttribute: 't' !== k.className,
      leadingWhitespace: 3 === k.firstChild.nodeType,
      tbody: !k.getElementsByTagName('tbody').length,
      htmlSerialize: !!k.getElementsByTagName('link').length,
      style: /top/.test(d.getAttribute('style')),
      hrefNormalized: '/a' === d.getAttribute('href'),
      opacity: /^0.5/.test(d.style.opacity),
      cssFloat: !!d.style.cssFloat,
      checkOn: !!b.value,
      optSelected: f.selected,
      enctype: !!l.createElement('form').enctype,
      html5Clone: '<:nav></:nav>' !== l.createElement('nav').cloneNode(!0).outerHTML,
      boxModel: 'CSS1Compat' === l.compatMode,
      deleteExpando: !0,
      noCloneEvent: !0,
      inlineBlockNeedsLayout: !1,
      shrinkWrapBlocks: !1,
      reliableMarginRight: !0,
      boxSizingReliable: !0,
      pixelPosition: !1
    };
    b.checked = !0;
    a.noCloneChecked = b.cloneNode(!0).checked;
    e.disabled = !0;
    a.optDisabled = !f.disabled;
    try {
      delete k.test;
    } catch (n) {
      a.deleteExpando = !1;
    }
    b = l.createElement('input');
    b.setAttribute('value', '');
    a.input = '' === b.getAttribute('value');
    b.value = 't';
    b.setAttribute('type', 'radio');
    a.radioValue = 't' === b.value;
    b.setAttribute('checked', 't');
    b.setAttribute('name', 't');
    d = l.createDocumentFragment();
    d.appendChild(b);
    a.appendChecked = b.checked;
    a.checkClone = d.cloneNode(!0).cloneNode(!0).lastChild.checked;
    k.attachEvent && (k.attachEvent('onclick', function () {
      a.noCloneEvent = !1;
    }), k.cloneNode(!0).click());
    for (h in {
      submit: !0,
      change: !0,
      focusin: !0
    }) k.setAttribute(d = 'on' + h, 't'), a[h + 'Bubbles'] = d in t || !1 === k.attributes[d].expando;
    k.style.backgroundClip = 'content-box';
    k.cloneNode(!0).style.backgroundClip = '';
    a.clearCloneStyle = 'content-box' === k.style.backgroundClip;
    c(function () {
      var b,
        c,
        d = l.getElementsByTagName('body')[0];
      d && (b = l.createElement('div'), b.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px', d.appendChild(b).appendChild(k), k.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', c = k.getElementsByTagName('td'), c[0].style.cssText = 'padding:0;margin:0;border:0;display:none', g = 0 === c[0].offsetHeight, c[0].style.display = '', c[1].style.display = 'none', a.reliableHiddenOffsets = g && 0 === c[0].offsetHeight, k.innerHTML = '', k.style.cssText = 'box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;', a.boxSizing = 4 === k.offsetWidth, a.doesNotIncludeMarginInBodyOffset = 1 !== d.offsetTop, t.getComputedStyle && (a.pixelPosition = '1%' !== (t.getComputedStyle(k, null) || {}).top, a.boxSizingReliable = '4px' === (t.getComputedStyle(k, null) || {
        width: '4px'
      }).width, c = k.appendChild(l.createElement('div')), c.style.cssText = k.style.cssText = 'padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;', c.style.marginRight = c.style.width = '0', k.style.width = '1px', a.reliableMarginRight = !parseFloat((t.getComputedStyle(c, null) || {}).marginRight)), 'undefined' !== typeof k.style.zoom && (k.style.cssText = 'padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;width:1px;padding:1px;display:inline;zoom:1', a.inlineBlockNeedsLayout = 3 === k.offsetWidth, k.style.display = 'block', k.innerHTML = '<div></div>', k.firstChild.style.width = '5px', a.shrinkWrapBlocks = 3 !== k.offsetWidth, a.inlineBlockNeedsLayout && (d.style.zoom = 1)), d.removeChild(b), k = null);
    });
    b = e = d = f = d = b = null;
    return a;
  }();
  c.extend({
    cache: {},
    expando: 'jQuery' + ('1.9.1' + Math.random()).replace(/\D/g, ''),
    noData: {
      embed: !0,
      object: 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000',
      applet: !0
    },
    hasData: function (a) {
      a = a.nodeType ? c.cache[a[c.expando]] : a[c.expando];
      return !!a && !oa(a);
    },
    data: function (a, b, c) {
      return Na(a, b, c);
    },
    removeData: function (a, b) {
      return Oa(a, b);
    },
    _data: function (a, b, c) {
      return Na(a, b, c, !0);
    },
    _removeData: function (a, b) {
      return Oa(a, b, !0);
    },
    acceptData: function (a) {
      if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
      var b = a.nodeName && c.noData[a.nodeName.toLowerCase()];
      return !b || !0 !== b && a.getAttribute('classid') === b;
    }
  });
  var T,
    nb,
    Aa = /[\t\r\n]/g,
    Xb = /^(?:input|select|textarea|button|object)$/i,
    Yb = /^(?:a|area)$/i,
    Zb = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
    ob = /^(?:checked|selected)$/i,
    ga = c.support.getSetAttribute,
    Ba = c.support.input;
  c.fn.extend({
    attr: function (a, b) {
      return c.access(this, c.attr, a, b, 1 < arguments.length);
    },
    addClass: function (a) {
      var b,
        d,
        e,
        f,
        g,
        h = 0,
        k = this.length;
      b = 'string' === typeof a && a;
      if (c.isFunction(a)) return this.each(function (b) {
        c(this).addClass(a.call(this, b, this.className));
      });
      if (b) for (b = (a || '').match(W) || []; h < k; h++) if (d = this[h], e = 1 === d.nodeType && (d.className ? (' ' + d.className + ' ').replace(Aa, ' ') : ' ')) {
        for (g = 0; f = b[g++];) 0 > e.indexOf(' ' + f + ' ') && (e += f + ' ');
        d.className = c.trim(e);
      }
      return this;
    },
    removeClass: function (a) {
      var b,
        d,
        e,
        f,
        g,
        h = 0,
        k = this.length;
      b = 0 === arguments.length || 'string' === typeof a && a;
      if (c.isFunction(a)) return this.each(function (b) {
        c(this).removeClass(a.call(this, b, this.className));
      });
      if (b) for (b = (a || '').match(W) || []; h < k; h++) if (d = this[h], e = 1 === d.nodeType && (d.className ? (' ' + d.className + ' ').replace(Aa, ' ') : '')) {
        for (g = 0; f = b[g++];) for (; 0 <= e.indexOf(' ' + f + ' ');) e = e.replace(' ' + f + ' ', ' ');
        d.className = a ? c.trim(e) : '';
      }
      return this;
    },
    hasClass: function (a) {
      a = ' ' + a + ' ';
      for (var b = 0, c = this.length; b < c; b++) if (1 === this[b].nodeType && 0 <= (' ' + this[b].className + ' ').replace(Aa, ' ').indexOf(a)) return !0;
      return !1;
    }
  });
  c.extend({
    valHooks: {
      option: {
        get: function (a) {
          var b = a.attributes.value;
          return !b || b.specified ? a.value : a.text;
        }
      },
      select: {
        get: function (a) {
          for (var b, d = a.options, e = a.selectedIndex, f = (a = 'select-one' === a.type || 0 > e) ? null : [], g = a ? e + 1 : d.length, h = 0 > e ? g : a ? e : 0; h < g; h++) if (b = d[h], !(!b.selected && h !== e || (c.support.optDisabled ? b.disabled : null !== b.getAttribute('disabled')) || b.parentNode.disabled && c.nodeName(b.parentNode, 'optgroup'))) {
            b = c(b).val();
            if (a) return b;
            f.push(b);
          }
          return f;
        },
        set: function (a, b) {
          var d = c.makeArray(b);
          c(a).find('option').each(function () {
            this.selected = 0 <= c.inArray(c(this).val(), d);
          });
          d.length || (a.selectedIndex = -1);
          return d;
        }
      }
    },
    attr: function (a, b, d) {
      var e, f, g;
      f = a.nodeType;
      if (a && 3 !== f && 8 !== f && 2 !== f) {
        if ('undefined' === typeof a.getAttribute) return c.prop(a, b, d);
        if (f = 1 !== f || !c.isXMLDoc(a)) b = b.toLowerCase(), e = c.attrHooks[b] || (Zb.test(b) ? nb : T);
        if (void 0 !== d) {
          if (null === d) c.removeAttr(a, b);else {
            if (e && f && 'set' in e && void 0 !== (g = e.set(a, d, b))) return g;
            a.setAttribute(b, d + '');
            return d;
          }
        } else {
          if (e && f && 'get' in e && null !== (g = e.get(a, b))) return g;
          'undefined' !== typeof a.getAttribute && (g = a.getAttribute(b));
          return null == g ? void 0 : g;
        }
      }
    },
    attrHooks: {
      type: {
        set: function (a, b) {
          if (!c.support.radioValue && 'radio' === b && c.nodeName(a, 'input')) {
            var d = a.value;
            a.setAttribute('type', b);
            d && (a.value = d);
            return b;
          }
        }
      }
    },
    propFix: {
      tabindex: 'tabIndex',
      readonly: 'readOnly',
      'for': 'htmlFor',
      'class': 'className',
      maxlength: 'maxLength',
      cellspacing: 'cellSpacing',
      cellpadding: 'cellPadding',
      rowspan: 'rowSpan',
      colspan: 'colSpan',
      usemap: 'useMap',
      frameborder: 'frameBorder',
      contenteditable: 'contentEditable'
    },
    prop: function (a, b, d) {
      var e,
        f,
        g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g) return 1 === g && c.isXMLDoc(a) || (b = c.propFix[b] || b, f = c.propHooks[b]), void 0 !== d ? f && 'set' in f && void 0 !== (e = f.set(a, d, b)) ? e : a[b] = d : f && 'get' in f && null !== (e = f.get(a, b)) ? e : a[b];
    },
    propHooks: {
      tabIndex: {
        get: function (a) {
          var b = a.getAttributeNode('tabindex');
          return b && b.specified ? parseInt(b.value, 10) : Xb.test(a.nodeName) || Yb.test(a.nodeName) && a.href ? 0 : void 0;
        }
      }
    }
  });
  nb = {
    get: function (a, b) {
      var d = c.prop(a, b),
        e = 'boolean' === typeof d && a.getAttribute(b);
      return (a = 'boolean' === typeof d ? Ba && ga ? null != e : ob.test(b) ? a[c.camelCase('default-' + b)] : !!e : a.getAttributeNode(b)) && !1 !== a.value ? b.toLowerCase() : void 0;
    },
    set: function (a, b, d) {
      !1 === b ? c.removeAttr(a, d) : Ba && ga || !ob.test(d) ? a.setAttribute(!ga && c.propFix[d] || d, d) : a[c.camelCase('default-' + d)] = a[d] = !0;
      return d;
    }
  };
  Ba && ga || (c.attrHooks.value = {
    get: function (a, b) {
      b = a.getAttributeNode(b);
      return c.nodeName(a, 'input') ? a.defaultValue : b && b.specified ? b.value : void 0;
    },
    set: function (a, b, d) {
      if (c.nodeName(a, 'input')) a.defaultValue = b;else return T && T.set(a, b, d);
    }
  });
  ga || (T = c.valHooks.button = {
    get: function (a, b) {
      return (a = a.getAttributeNode(b)) && ('id' === b || 'name' === b || 'coords' === b ? '' !== a.value : a.specified) ? a.value : void 0;
    },
    set: function (a, b, c) {
      var d = a.getAttributeNode(c);
      d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c));
      d.value = b += '';
      return 'value' === c || b === a.getAttribute(c) ? b : void 0;
    }
  }, c.attrHooks.contenteditable = {
    get: T.get,
    set: function (a, b, c) {
      T.set(a, '' === b ? !1 : b, c);
    }
  }, c.each(['width', 'height'], function (a, b) {
    c.attrHooks[b] = c.extend(c.attrHooks[b], {
      set: function (a, c) {
        if ('' === c) return a.setAttribute(b, 'auto'), c;
      }
    });
  }));
  c.support.hrefNormalized || (c.each(['href', 'src', 'width', 'height'], function (a, b) {
    c.attrHooks[b] = c.extend(c.attrHooks[b], {
      get: function (a) {
        a = a.getAttribute(b, 2);
        return null == a ? void 0 : a;
      }
    });
  }), c.each(['href', 'src'], function (a, b) {
    c.propHooks[b] = {
      get: function (a) {
        return a.getAttribute(b, 4);
      }
    };
  }));
  c.support.style || (c.attrHooks.style = {
    get: function (a) {
      return a.style.cssText || void 0;
    },
    set: function (a, b) {
      return a.style.cssText = b + '';
    }
  });
  c.support.optSelected || (c.propHooks.selected = c.extend(c.propHooks.selected, {
    get: function (a) {
      if (a = a.parentNode) a.selectedIndex, a.parentNode && a.parentNode.selectedIndex;
      return null;
    }
  }));
  c.support.enctype || (c.propFix.enctype = 'encoding');
  c.support.checkOn || c.each(['radio', 'checkbox'], function () {
    c.valHooks[this] = {
      get: function (a) {
        return null === a.getAttribute('value') ? 'on' : a.value;
      }
    };
  });
  c.each(['radio', 'checkbox'], function () {
    c.valHooks[this] = c.extend(c.valHooks[this], {
      set: function (a, b) {
        if (c.isArray(b)) return a.checked = 0 <= c.inArray(c(a).val(), b);
      }
    });
  });
  var Ca = /^(?:input|select|textarea)$/i,
    $b = /^key/,
    ac = /^(?:mouse|contextmenu)|click/,
    pb = /^(?:focusinfocus|focusoutblur)$/,
    qb = /^([^.]*)(?:\.(.+)|)$/;
  c.event = {
    global: {},
    add: function (a, b, d, e, f) {
      var g, h, k, n, q, m, p, x, l;
      if (k = c._data(a)) {
        d.handler && (n = d, d = n.handler, f = n.selector);
        d.guid || (d.guid = c.guid++);
        (h = k.events) || (h = k.events = {});
        (q = k.handle) || (q = k.handle = function (a) {
          return 'undefined' === typeof c || a && c.event.triggered === a.type ? void 0 : c.event.dispatch.apply(q.elem, arguments);
        }, q.elem = a);
        b = (b || '').match(W) || [''];
        for (k = b.length; k--;) g = qb.exec(b[k]) || [], x = m = g[1], l = (g[2] || '').split('.').sort(), g = c.event.special[x] || {}, x = (f ? g.delegateType : g.bindType) || x, g = c.event.special[x] || {}, m = c.extend({
          type: x,
          origType: m,
          data: e,
          handler: d,
          guid: d.guid,
          selector: f,
          needsContext: f && c.expr.match.needsContext.test(f),
          namespace: l.join('.')
        }, n), (p = h[x]) || (p = h[x] = [], p.delegateCount = 0, g.setup && !1 !== g.setup.call(a, e, l, q) || (a.addEventListener ? a.addEventListener(x, q, !1) : a.attachEvent && a.attachEvent('on' + x, q))), g.add && (g.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, m) : p.push(m), c.event.global[x] = !0;
        a = null;
      }
    },
    remove: function (a, b, d, e, f) {
      var g,
        h,
        k,
        n,
        q,
        m,
        p,
        x,
        l,
        t,
        B,
        E = c.hasData(a) && c._data(a);
      if (E && (m = E.events)) {
        b = (b || '').match(W) || [''];
        for (q = b.length; q--;) if (k = qb.exec(b[q]) || [], l = B = k[1], t = (k[2] || '').split('.').sort(), l) {
          p = c.event.special[l] || {};
          l = (e ? p.delegateType : p.bindType) || l;
          x = m[l] || [];
          k = k[2] && new RegExp('(^|\\.)' + t.join('\\.(?:.*\\.|)') + '(\\.|$)');
          for (n = g = x.length; g--;) h = x[g], !f && B !== h.origType || d && d.guid !== h.guid || k && !k.test(h.namespace) || e && e !== h.selector && ('**' !== e || !h.selector) || (x.splice(g, 1), h.selector && x.delegateCount--, p.remove && p.remove.call(a, h));
          n && !x.length && (p.teardown && !1 !== p.teardown.call(a, t, E.handle) || c.removeEvent(a, l, E.handle), delete m[l]);
        } else for (l in m) c.event.remove(a, l + b[q], d, e, !0);
        c.isEmptyObject(m) && (delete E.handle, c._removeData(a, 'events'));
      }
    },
    trigger: function (a, b, d, e) {
      var f,
        g,
        h,
        k,
        n,
        q,
        m = [d || l],
        p = S.call(a, 'type') ? a.type : a;
      n = S.call(a, 'namespace') ? a.namespace.split('.') : [];
      h = f = d = d || l;
      if (3 !== d.nodeType && 8 !== d.nodeType && !pb.test(p + c.event.triggered) && (0 <= p.indexOf('.') && (n = p.split('.'), p = n.shift(), n.sort()), g = 0 > p.indexOf(':') && 'on' + p, a = a[c.expando] ? a : new c.Event(p, 'object' === typeof a && a), a.isTrigger = !0, a.namespace = n.join('.'), a.namespace_re = a.namespace ? new RegExp('(^|\\.)' + n.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, a.result = void 0, a.target || (a.target = d), b = null == b ? [a] : c.makeArray(b, [a]), n = c.event.special[p] || {}, e || !n.trigger || !1 !== n.trigger.apply(d, b))) {
        if (!e && !n.noBubble && !c.isWindow(d)) {
          k = n.delegateType || p;
          pb.test(k + p) || (h = h.parentNode);
          for (; h; h = h.parentNode) m.push(h), f = h;
          f === (d.ownerDocument || l) && m.push(f.defaultView || f.parentWindow || t);
        }
        for (q = 0; (h = m[q++]) && !a.isPropagationStopped();) a.type = 1 < q ? k : n.bindType || p, (f = (c._data(h, 'events') || {})[a.type] && c._data(h, 'handle')) && f.apply(h, b), (f = g && h[g]) && c.acceptData(h) && f.apply && !1 === f.apply(h, b) && a.preventDefault();
        a.type = p;
        if (!(e || a.isDefaultPrevented() || n._default && !1 !== n._default.apply(d.ownerDocument, b) || 'click' === p && c.nodeName(d, 'a')) && c.acceptData(d) && g && d[p] && !c.isWindow(d)) {
          (f = d[g]) && (d[g] = null);
          c.event.triggered = p;
          try {
            d[p]();
          } catch (x) {}
          c.event.triggered = void 0;
          f && (d[g] = f);
        }
        return a.result;
      }
    },
    dispatch: function (a) {
      a = c.event.fix(a);
      var b,
        d,
        e,
        f,
        g,
        h = R.call(arguments);
      b = (c._data(this, 'events') || {})[a.type] || [];
      var k = c.event.special[a.type] || {};
      h[0] = a;
      a.delegateTarget = this;
      if (!k.preDispatch || !1 !== k.preDispatch.call(this, a)) {
        g = c.event.handlers.call(this, a, b);
        for (b = 0; (e = g[b++]) && !a.isPropagationStopped();) for (a.currentTarget = e.elem, f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped();) if (!a.namespace_re || a.namespace_re.test(d.namespace)) a.handleObj = d, a.data = d.data, d = ((c.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h), void 0 !== d && !1 === (a.result = d) && (a.preventDefault(), a.stopPropagation());
        k.postDispatch && k.postDispatch.call(this, a);
        return a.result;
      }
    },
    handlers: function (a, b) {
      var d,
        e,
        f,
        g,
        h = [],
        k = b.delegateCount,
        n = a.target;
      if (k && n.nodeType && (!a.button || 'click' !== a.type)) for (; n != this; n = n.parentNode || this) if (1 === n.nodeType && (!0 !== n.disabled || 'click' !== a.type)) {
        f = [];
        for (g = 0; g < k; g++) e = b[g], d = e.selector + ' ', void 0 === f[d] && (f[d] = e.needsContext ? 0 <= c(d, this).index(n) : c.find(d, this, null, [n]).length), f[d] && f.push(e);
        f.length && h.push({
          elem: n,
          handlers: f
        });
      }
      k < b.length && h.push({
        elem: this,
        handlers: b.slice(k)
      });
      return h;
    },
    fix: function (a) {
      if (a[c.expando]) return a;
      var b, d, e;
      b = a.type;
      var f = a,
        g = this.fixHooks[b];
      g || (this.fixHooks[b] = g = ac.test(b) ? this.mouseHooks : $b.test(b) ? this.keyHooks : {});
      e = g.props ? this.props.concat(g.props) : this.props;
      a = new c.Event(f);
      for (b = e.length; b--;) d = e[b], a[d] = f[d];
      a.target || (a.target = f.srcElement || l);
      3 === a.target.nodeType && (a.target = a.target.parentNode);
      a.metaKey = !!a.metaKey;
      return g.filter ? g.filter(a, f) : a;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: ['char', 'charCode', 'key', 'keyCode'],
      filter: function (a, b) {
        null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode);
        return a;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (a, b) {
        var c,
          e,
          f = b.button,
          g = b.fromElement;
        null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, e = c.documentElement, c = c.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0));
        !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g);
        a.which || void 0 === f || (a.which = f & 1 ? 1 : f & 2 ? 3 : f & 4 ? 2 : 0);
        return a;
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      click: {
        trigger: function () {
          if (c.nodeName(this, 'input') && 'checkbox' === this.type && this.click) return this.click(), !1;
        }
      },
      focus: {
        trigger: function () {
          if (this !== l.activeElement && this.focus) try {
            return this.focus(), !1;
          } catch (a) {}
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === l.activeElement && this.blur) return this.blur(), !1;
        },
        delegateType: 'focusout'
      },
      beforeunload: {
        postDispatch: function (a) {
          void 0 !== a.result && (a.originalEvent.returnValue = a.result);
        }
      }
    },
    simulate: function (a, b, d, e) {
      a = c.extend(new c.Event(), d, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      e ? c.event.trigger(a, null, b) : c.event.dispatch.call(b, a);
      a.isDefaultPrevented() && d.preventDefault();
    }
  };
  c.removeEvent = l.removeEventListener ? function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1);
  } : function (a, b, c) {
    b = 'on' + b;
    a.detachEvent && ('undefined' === typeof a[b] && (a[b] = null), a.detachEvent(b, c));
  };
  c.Event = function (a, b) {
    if (!(this instanceof c.Event)) return new c.Event(a, b);
    a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || !1 === a.returnValue || a.getPreventDefault && a.getPreventDefault() ? ja : I) : this.type = a;
    b && c.extend(this, b);
    this.timeStamp = a && a.timeStamp || c.now();
    this[c.expando] = !0;
  };
  c.Event.prototype = {
    isDefaultPrevented: I,
    isPropagationStopped: I,
    isImmediatePropagationStopped: I,
    preventDefault: function () {
      var a = this.originalEvent;
      this.isDefaultPrevented = ja;
      a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1);
    },
    stopPropagation: function () {
      var a = this.originalEvent;
      this.isPropagationStopped = ja;
      a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0);
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = ja;
      this.stopPropagation();
    }
  };
  c.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (a, b) {
    c.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function (a) {
        var d,
          f = a.relatedTarget,
          g = a.handleObj;
        if (!f || f !== this && !c.contains(this, f)) a.type = g.origType, d = g.handler.apply(this, arguments), a.type = b;
        return d;
      }
    };
  });
  c.support.submitBubbles || (c.event.special.submit = {
    setup: function () {
      if (c.nodeName(this, 'form')) return !1;
      c.event.add(this, 'click._submit keypress._submit', function (a) {
        a = a.target;
        (a = c.nodeName(a, 'input') || c.nodeName(a, 'button') ? a.form : void 0) && !c._data(a, 'submitBubbles') && (c.event.add(a, 'submit._submit', function (a) {
          a._submit_bubble = !0;
        }), c._data(a, 'submitBubbles', !0));
      });
    },
    postDispatch: function (a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && c.event.simulate('submit', this.parentNode, a, !0));
    },
    teardown: function () {
      if (c.nodeName(this, 'form')) return !1;
      c.event.remove(this, '._submit');
    }
  });
  c.support.changeBubbles || (c.event.special.change = {
    setup: function () {
      if (Ca.test(this.nodeName)) {
        if ('checkbox' === this.type || 'radio' === this.type) c.event.add(this, 'propertychange._change', function (a) {
          'checked' === a.originalEvent.propertyName && (this._just_changed = !0);
        }), c.event.add(this, 'click._change', function (a) {
          this._just_changed && !a.isTrigger && (this._just_changed = !1);
          c.event.simulate('change', this, a, !0);
        });
        return !1;
      }
      c.event.add(this, 'beforeactivate._change', function (a) {
        a = a.target;
        Ca.test(a.nodeName) && !c._data(a, 'changeBubbles') && (c.event.add(a, 'change._change', function (a) {
          !this.parentNode || a.isSimulated || a.isTrigger || c.event.simulate('change', this.parentNode, a, !0);
        }), c._data(a, 'changeBubbles', !0));
      });
    },
    handle: function (a) {
      var b = a.target;
      if (this !== b || a.isSimulated || a.isTrigger || 'radio' !== b.type && 'checkbox' !== b.type) return a.handleObj.handler.apply(this, arguments);
    },
    teardown: function () {
      c.event.remove(this, '._change');
      return !Ca.test(this.nodeName);
    }
  });
  c.support.focusinBubbles || c.each({
    focus: 'focusin',
    blur: 'focusout'
  }, function (a, b) {
    var d = 0,
      e = function (a) {
        c.event.simulate(b, a.target, c.event.fix(a), !0);
      };
    c.event.special[b] = {
      setup: function () {
        0 === d++ && l.addEventListener(a, e, !0);
      },
      teardown: function () {
        0 === --d && l.removeEventListener(a, e, !0);
      }
    };
  });
  c.fn.extend({
    on: function (a, b, d, e, f) {
      var g, h;
      if ('object' === typeof a) {
        'string' !== typeof b && (d = d || b, b = void 0);
        for (g in a) this.on(g, b, d, a[g], f);
        return this;
      }
      null == d && null == e ? (e = b, d = b = void 0) : null == e && ('string' === typeof b ? (e = d, d = void 0) : (e = d, d = b, b = void 0));
      if (!1 === e) e = I;else if (!e) return this;
      1 === f && (h = e, e = function (a) {
        c().off(a);
        return h.apply(this, arguments);
      }, e.guid = h.guid || (h.guid = c.guid++));
      return this.each(function () {
        c.event.add(this, a, e, d, b);
      });
    },
    off: function (a, b, d) {
      var e;
      if (a && a.preventDefault && a.handleObj) return e = a.handleObj, c(a.delegateTarget).off(e.namespace ? e.origType + '.' + e.namespace : e.origType, e.selector, e.handler), this;
      if ('object' === typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this;
      }
      if (!1 === b || 'function' === typeof b) d = b, b = void 0;
      !1 === d && (d = I);
      return this.each(function () {
        c.event.remove(this, a, d, b);
      });
    }
  });
  (function (a, b) {
    function d() {
      var a,
        b = [];
      return a = function (c, d) {
        b.push(c += ' ') > u.cacheLength && delete a[b.shift()];
        return a[c] = d;
      };
    }
    function e(a) {
      a[D] = !0;
      return a;
    }
    function f(a) {
      var b = L.createElement('div');
      try {
        return a(b);
      } catch (w) {
        return !1;
      } finally {}
    }
    function g(a, b, c, d) {
      var e, f, g, r, h;
      (b ? b.ownerDocument || b : ha) !== L && la(b);
      b = b || L;
      c = c || [];
      if (!a || 'string' !== typeof a) return c;
      if (1 !== (r = b.nodeType) && 9 !== r) return [];
      if (!O && !d) {
        if (e = oa.exec(a)) if (g = e[1]) {
          if (9 === r) {
            if ((f = b.getElementById(g)) && f.parentNode) {
              if (f.id === g) return c.push(f), c;
            } else return c;
          } else {
            if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && ta(b, f) && f.id === g) return c.push(f), c;
          }
        } else {
          if (e[2]) return I.apply(c, G.call(b.getElementsByTagName(a), 0)), c;
          if ((g = e[3]) && y.getByClassName && b.getElementsByClassName) return I.apply(c, G.call(b.getElementsByClassName(g), 0)), c;
        }
        if (y.qsa && !H.test(a)) {
          e = !0;
          f = D;
          g = b;
          h = 9 === r && a;
          if (1 === r && 'object' !== b.nodeName.toLowerCase()) {
            r = m(a);
            (e = b.getAttribute('id')) ? f = e.replace(ra, '\\$&') : b.setAttribute('id', f);
            f = '[id=\'' + f + '\'] ';
            for (g = r.length; g--;) r[g] = f + p(r[g]);
            g = ca.test(a) && b.parentNode || b;
            h = r.join(',');
          }
          if (h) try {
            return I.apply(c, G.call(g.querySelectorAll(h), 0)), c;
          } catch (wc) {} finally {
            e || b.removeAttribute('id');
          }
        }
      }
      var w;
      a: {
        a = a.replace(S, '$1');
        f = m(a);
        if (!d && 1 === f.length) {
          e = f[0] = f[0].slice(0);
          if (2 < e.length && 'ID' === (w = e[0]).type && 9 === b.nodeType && !O && u.relative[e[1].type]) {
            b = u.find.ID(w.matches[0].replace(da, ea), b)[0];
            if (!b) {
              w = c;
              break a;
            }
            a = a.slice(e.shift().value.length);
          }
          for (r = Y.needsContext.test(a) ? 0 : e.length; r--;) {
            w = e[r];
            if (u.relative[g = w.type]) break;
            if (g = u.find[g]) if (d = g(w.matches[0].replace(da, ea), ca.test(e[0].type) && b.parentNode || b)) {
              e.splice(r, 1);
              a = d.length && p(e);
              if (!a) {
                I.apply(c, G.call(d, 0));
                w = c;
                break a;
              }
              break;
            }
          }
        }
        Da(a, f)(d, b, O, c, ca.test(a));
        w = c;
      }
      return w;
    }
    function h(a, b) {
      var c = b && a,
        d = c && (~b.sourceIndex || -2147483648) - (~a.sourceIndex || -2147483648);
      if (d) return d;
      if (c) for (; c = c.nextSibling;) if (c === b) return -1;
      return a ? 1 : -1;
    }
    function k(a) {
      return function (b) {
        return 'input' === b.nodeName.toLowerCase() && b.type === a;
      };
    }
    function n(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();
        return ('input' === c || 'button' === c) && b.type === a;
      };
    }
    function q(a) {
      return e(function (b) {
        b = +b;
        return e(function (c, d) {
          for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]));
        });
      });
    }
    function m(a, b) {
      var c, d, e, f, r, h, k;
      if (r = Q[a + ' ']) return b ? 0 : r.slice(0);
      r = a;
      h = [];
      for (k = u.preFilter; r;) {
        if (!c || (d = ga.exec(r))) d && (r = r.slice(d[0].length) || r), h.push(e = []);
        c = !1;
        if (d = ia.exec(r)) c = d.shift(), e.push({
          value: c,
          type: d[0].replace(S, ' ')
        }), r = r.slice(c.length);
        for (f in u.filter) !(d = Y[f].exec(r)) || k[f] && !(d = k[f](d)) || (c = d.shift(), e.push({
          value: c,
          type: f,
          matches: d
        }), r = r.slice(c.length));
        if (!c) break;
      }
      return b ? r.length : r ? g.error(a) : Q(a, h).slice(0);
    }
    function p(a) {
      for (var b = 0, c = a.length, d = ''; b < c; b++) d += a[b].value;
      return d;
    }
    function l(a, b, c) {
      var d = b.dir,
        e = c && 'parentNode' === d,
        f = W++;
      return b.first ? function (b, c, f) {
        for (; b = b[d];) if (1 === b.nodeType || e) return a(b, c, f);
      } : function (b, c, g) {
        var r,
          h,
          k,
          w = P + ' ' + f;
        if (g) for (; b = b[d];) {
          if ((1 === b.nodeType || e) && a(b, c, g)) return !0;
        } else for (; b = b[d];) if (1 === b.nodeType || e) if (k = b[D] || (b[D] = {}), (h = k[d]) && h[0] === w) {
          if (!0 === (r = h[1]) || r === v) return !0 === r;
        } else if (h = k[d] = [w], h[1] = a(b, c, g) || v, !0 === h[1]) return !0;
      };
    }
    function t(a) {
      return 1 < a.length ? function (b, c, d) {
        for (var e = a.length; e--;) if (!a[e](b, c, d)) return !1;
        return !0;
      } : a[0];
    }
    function B(a, b, c, d, e) {
      for (var f, g = [], r = 0, h = a.length, k = null != b; r < h; r++) if (f = a[r]) if (!c || c(f, d, e)) g.push(f), k && b.push(r);
      return g;
    }
    function E(a, b, c, d, f, h) {
      d && !d[D] && (d = E(d));
      f && !f[D] && (f = E(f, h));
      return e(function (e, r, h, k) {
        var w,
          N,
          n = [],
          U = [],
          m = r.length,
          q;
        if (!(q = e)) {
          q = b || '*';
          for (var p = h.nodeType ? [h] : h, l = [], u = 0, x = p.length; u < x; u++) g(q, p[u], l);
          q = l;
        }
        q = !a || !e && b ? q : B(q, n, a, h, k);
        p = c ? f || (e ? a : m || d) ? [] : r : q;
        c && c(q, p, h, k);
        if (d) for (w = B(p, U), d(w, [], h, k), h = w.length; h--;) if (N = w[h]) p[U[h]] = !(q[U[h]] = N);
        if (e) {
          if (f || a) {
            if (f) {
              w = [];
              for (h = p.length; h--;) (N = p[h]) && w.push(q[h] = N);
              f(null, p = [], w, k);
            }
            for (h = p.length; h--;) (N = p[h]) && -1 < (w = f ? T.call(e, N) : n[h]) && (e[w] = !(r[w] = N));
          }
        } else p = B(p === r ? p.splice(m, p.length) : p), f ? f(null, r, p, k) : I.apply(r, p);
      });
    }
    function C(a) {
      var b,
        c,
        d,
        e = a.length,
        f = u.relative[a[0].type];
      c = f || u.relative[' '];
      for (var g = f ? 1 : 0, h = l(function (a) {
          return a === b;
        }, c, !0), r = l(function (a) {
          return -1 < T.call(b, a);
        }, c, !0), k = [function (a, c, d) {
          return !f && (d || c !== va) || ((b = c).nodeType ? h(a, c, d) : r(a, c, d));
        }]; g < e; g++) if (c = u.relative[a[g].type]) k = [l(t(k), c)];else {
        c = u.filter[a[g].type].apply(null, a[g].matches);
        if (c[D]) {
          for (d = ++g; d < e && !u.relative[a[d].type]; d++);
          return E(1 < g && t(k), 1 < g && p(a.slice(0, g - 1)).replace(S, '$1'), c, g < d && C(a.slice(g, d)), d < e && C(a = a.slice(d)), d < e && p(a));
        }
        k.push(c);
      }
      return t(k);
    }
    function V(a, b) {
      var c = 0,
        d = 0 < b.length,
        f = 0 < a.length,
        h = function (e, h, r, k, w) {
          var N,
            n,
            m = [],
            U = 0,
            p = '0',
            q = e && [],
            l = null != w,
            x = va,
            bc = e || f && u.find.TAG('*', w && h.parentNode || h),
            t = P += null == x ? 1 : Math.random() || 0.1;
          l && (va = h !== L && h, v = c);
          for (; null != (w = bc[p]); p++) {
            if (f && w) {
              for (N = 0; n = a[N++];) if (n(w, h, r)) {
                k.push(w);
                break;
              }
              l && (P = t, v = ++c);
            }
            d && ((w = !n && w) && U--, e && q.push(w));
          }
          U += p;
          if (d && p !== U) {
            for (N = 0; n = b[N++];) n(q, m, h, r);
            if (e) {
              if (0 < U) for (; p--;) q[p] || m[p] || (m[p] = ba.call(k));
              m = B(m);
            }
            I.apply(k, m);
            l && !e && 0 < m.length && 1 < U + b.length && g.uniqueSort(k);
          }
          l && (P = t, va = x);
          return q;
        };
      return d ? e(h) : h;
    }
    var ma,
      v,
      u,
      K,
      rb,
      Da,
      na,
      va,
      la,
      L,
      z,
      O,
      H,
      F,
      wa,
      ta,
      Ea,
      D = 'sizzle' + -new Date(),
      ha = a.document,
      y = {},
      P = 0,
      W = 0,
      J = d(),
      Q = d(),
      R = d(),
      Z = typeof b,
      A = [],
      ba = A.pop,
      I = A.push,
      G = A.slice,
      T = A.indexOf || function (a) {
        for (var b = 0, c = this.length; b < c; b++) if (this[b] === a) return b;
        return -1;
      },
      A = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+'.replace('w', 'w#'),
      aa = '\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + A + ')|)|)[\\x20\\t\\r\\n\\f]*\\]',
      X = ':((?:\\\\.|[\\w-]|[^\\x00-\\xa0])+)(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + aa.replace(3, 8) + ')*)|.*)\\)|)',
      S = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
      ga = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
      ia = /^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,
      ja = new RegExp(X),
      ka = new RegExp('^' + A + '$'),
      Y = {
        ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
        CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
        NAME: /^\[name=['"]?((?:\\.|[\w-]|[^\x00-\xa0])+)['"]?\]/,
        TAG: new RegExp('^(' + '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+'.replace('w', 'w*') + ')'),
        ATTR: new RegExp('^' + aa),
        PSEUDO: new RegExp('^' + X),
        CHILD: /^:(only|first|last|nth|nth-last)-(child|of-type)(?:\([\x20\t\r\n\f]*(even|odd|(([+-]|)(\d*)n|)[\x20\t\r\n\f]*(?:([+-]|)[\x20\t\r\n\f]*(\d+)|))[\x20\t\r\n\f]*\)|)/i,
        needsContext: /^[\x20\t\r\n\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\([\x20\t\r\n\f]*((?:-\d)?\d*)[\x20\t\r\n\f]*\)|)(?=[^-]|$)/i
      },
      ca = /[\x20\t\r\n\f]*[+~]/,
      fa = /^[^{]+\{\s*\[native code/,
      oa = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      pa = /^(?:input|select|textarea|button)$/i,
      qa = /^h\d$/i,
      ra = /'|\\/g,
      sa = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
      da = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
      ea = function (a, b) {
        a = '0x' + b - 65536;
        return a !== a ? b : 0 > a ? String.fromCharCode(a + 65536) : String.fromCharCode(a >> 10 | 55296, a & 1023 | 56320);
      };
    try {
      G.call(ha.documentElement.childNodes, 0)[0].nodeType;
    } catch (r) {
      G = function (a) {
        for (var b, c = []; b = this[a++];) c.push(b);
        return c;
      };
    }
    rb = g.isXML = function (a) {
      return (a = a && (a.ownerDocument || a).documentElement) ? 'HTML' !== a.nodeName : !1;
    };
    la = g.setDocument = function (a) {
      var c = a ? a.ownerDocument || a : ha;
      if (c === L || 9 !== c.nodeType || !c.documentElement) return L;
      L = c;
      z = c.documentElement;
      O = rb(c);
      y.tagNameNoComments = f(function (a) {
        a.appendChild(c.createComment(''));
        return !a.getElementsByTagName('*').length;
      });
      y.attributes = f(function (a) {
        a.innerHTML = '<select></select>';
        a = typeof a.lastChild.getAttribute('multiple');
        return 'boolean' !== a && 'string' !== a;
      });
      y.getByClassName = f(function (a) {
        a.innerHTML = '<div class=\'hidden e\'></div><div class=\'hidden\'></div>';
        if (!a.getElementsByClassName || !a.getElementsByClassName('e').length) return !1;
        a.lastChild.className = 'e';
        return 2 === a.getElementsByClassName('e').length;
      });
      y.getByName = f(function (a) {
        a.id = D + 0;
        a.innerHTML = '<a name=\'' + D + '\'></a><div name=\'' + D + '\'></div>';
        z.insertBefore(a, z.firstChild);
        var b = c.getElementsByName && c.getElementsByName(D).length === 2 + c.getElementsByName(D + 0).length;
        y.getIdNotName = !c.getElementById(D);
        z.removeChild(a);
        return b;
      });
      u.attrHandle = f(function (a) {
        a.innerHTML = '<a href=\'#\'></a>';
        return a.firstChild && typeof a.firstChild.getAttribute !== Z && '#' === a.firstChild.getAttribute('href');
      }) ? {} : {
        href: function (a) {
          return a.getAttribute('href', 2);
        },
        type: function (a) {
          return a.getAttribute('type');
        }
      };
      y.getIdNotName ? (u.find.ID = function (a, b) {
        if (typeof b.getElementById !== Z && !O) return (a = b.getElementById(a)) && a.parentNode ? [a] : [];
      }, u.filter.ID = function (a) {
        var b = a.replace(da, ea);
        return function (a) {
          return a.getAttribute('id') === b;
        };
      }) : (u.find.ID = function (a, c) {
        if (typeof c.getElementById !== Z && !O) return (c = c.getElementById(a)) ? c.id === a || typeof c.getAttributeNode !== Z && c.getAttributeNode('id').value === a ? [c] : b : [];
      }, u.filter.ID = function (a) {
        var b = a.replace(da, ea);
        return function (a) {
          return (a = typeof a.getAttributeNode !== Z && a.getAttributeNode('id')) && a.value === b;
        };
      });
      u.find.TAG = y.tagNameNoComments ? function (a, b) {
        if (typeof b.getElementsByTagName !== Z) return b.getElementsByTagName(a);
      } : function (a, b) {
        var c = [],
          d = 0;
        b = b.getElementsByTagName(a);
        if ('*' === a) {
          for (; a = b[d++];) 1 === a.nodeType && c.push(a);
          return c;
        }
        return b;
      };
      u.find.NAME = y.getByName && function (a, b) {
        if (typeof b.getElementsByName !== Z) return b.getElementsByName(name);
      };
      u.find.CLASS = y.getByClassName && function (a, b) {
        if (typeof b.getElementsByClassName !== Z && !O) return b.getElementsByClassName(a);
      };
      F = [];
      H = [':focus'];
      if (y.qsa = fa.test(c.querySelectorAll + '')) f(function (a) {
        a.innerHTML = '<select><option selected=\'\'></option></select>';
        a.querySelectorAll('[selected]').length || H.push('\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)');
        a.querySelectorAll(':checked').length || H.push(':checked');
      }), f(function (a) {
        a.innerHTML = '<input type=\'hidden\' i=\'\'/>';
        a.querySelectorAll('[i^=\'\']').length && H.push('[*^$]=[\\x20\\t\\r\\n\\f]*(?:""|\'\')');
        a.querySelectorAll(':enabled').length || H.push(':enabled', ':disabled');
        a.querySelectorAll('*,:x');
        H.push(',.*:');
      });
      (y.matchesSelector = fa.test((wa = z.matchesSelector || z.mozMatchesSelector || z.webkitMatchesSelector || z.oMatchesSelector || z.msMatchesSelector) + '')) && f(function (a) {
        y.disconnectedMatch = wa.call(a, 'div');
        wa.call(a, '[s!=\'\']:x');
        F.push('!=', X);
      });
      H = new RegExp(H.join('|'));
      F = new RegExp(F.join('|'));
      ta = fa.test(z.contains + '') || z.compareDocumentPosition ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a;
        b = b && b.parentNode;
        return a === b || !!(b && 1 === b.nodeType && (c.contains ? c.contains(b) : a.compareDocumentPosition && a.compareDocumentPosition(b) & 16));
      } : function (a, b) {
        if (b) for (; b = b.parentNode;) if (b === a) return !0;
        return !1;
      };
      Ea = z.compareDocumentPosition ? function (a, b) {
        var d;
        return a === b ? (na = !0, 0) : (d = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b)) ? d & 1 || a.parentNode && 11 === a.parentNode.nodeType ? a === c || ta(ha, a) ? -1 : b === c || ta(ha, b) ? 1 : 0 : d & 4 ? -1 : 1 : a.compareDocumentPosition ? -1 : 1;
      } : function (a, b) {
        var d = 0,
          e = a.parentNode,
          f = b.parentNode,
          g = [a],
          k = [b];
        if (a === b) return na = !0, 0;
        if (!e || !f) return a === c ? -1 : b === c ? 1 : e ? -1 : f ? 1 : 0;
        if (e === f) return h(a, b);
        for (; a = a.parentNode;) g.unshift(a);
        for (a = b; a = a.parentNode;) k.unshift(a);
        for (; g[d] === k[d];) d++;
        return d ? h(g[d], k[d]) : g[d] === ha ? -1 : k[d] === ha ? 1 : 0;
      };
      na = !1;
      [0, 0].sort(Ea);
      y.detectDuplicates = na;
      return L;
    };
    g.matches = function (a, b) {
      return g(a, null, null, b);
    };
    g.matchesSelector = function (a, b) {
      (a.ownerDocument || a) !== L && la(a);
      b = b.replace(sa, '=\'$1\']');
      if (!(!y.matchesSelector || O || F && F.test(b) || H.test(b))) try {
        var c = wa.call(a, b);
        if (c || y.disconnectedMatch || a.document && 11 !== a.document.nodeType) return c;
      } catch (U) {}
      return 0 < g(b, L, null, [a]).length;
    };
    g.contains = function (a, b) {
      (a.ownerDocument || a) !== L && la(a);
      return ta(a, b);
    };
    g.attr = function (a, b) {
      var c;
      (a.ownerDocument || a) !== L && la(a);
      O || (b = b.toLowerCase());
      return (c = u.attrHandle[b]) ? c(a) : O || y.attributes ? a.getAttribute(b) : ((c = a.getAttributeNode(b)) || a.getAttribute(b)) && !0 === a[b] ? b : c && c.specified ? c.value : null;
    };
    g.error = function (a) {
      throw Error('Syntax error, unrecognized expression: ' + a);
    };
    g.uniqueSort = function (a) {
      var b,
        c = [],
        d = 1,
        e = 0;
      na = !y.detectDuplicates;
      a.sort(Ea);
      if (na) {
        for (; b = a[d]; d++) b === a[d - 1] && (e = c.push(d));
        for (; e--;) a.splice(c[e], 1);
      }
      return a;
    };
    K = g.getText = function (a) {
      var b,
        c = '',
        d = 0;
      b = a.nodeType;
      if (!b) for (; b = a[d]; d++) c += K(b);else if (1 === b || 9 === b || 11 === b) {
        if ('string' === typeof a.textContent) return a.textContent;
        for (a = a.firstChild; a; a = a.nextSibling) c += K(a);
      } else if (3 === b || 4 === b) return a.nodeValue;
      return c;
    };
    u = g.selectors = {
      cacheLength: 50,
      createPseudo: e,
      match: Y,
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: !0
        },
        ' ': {
          dir: 'parentNode'
        },
        '+': {
          dir: 'previousSibling',
          first: !0
        },
        '~': {
          dir: 'previousSibling'
        }
      },
      preFilter: {
        ATTR: function (a) {
          a[1] = a[1].replace(da, ea);
          a[3] = (a[4] || a[5] || '').replace(da, ea);
          '~=' === a[2] && (a[3] = ' ' + a[3] + ' ');
          return a.slice(0, 4);
        },
        CHILD: function (a) {
          a[1] = a[1].toLowerCase();
          'nth' === a[1].slice(0, 3) ? (a[3] || g.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ('even' === a[3] || 'odd' === a[3])), a[5] = +(a[7] + a[8] || 'odd' === a[3])) : a[3] && g.error(a[0]);
          return a;
        },
        PSEUDO: function (a) {
          var b,
            c = !a[5] && a[2];
          if (Y.CHILD.test(a[0])) return null;
          a[4] ? a[2] = a[4] : c && ja.test(c) && (b = m(c, !0)) && (b = c.indexOf(')', c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b));
          return a.slice(0, 3);
        }
      },
      filter: {
        TAG: function (a) {
          if ('*' === a) return function () {
            return !0;
          };
          a = a.replace(da, ea).toLowerCase();
          return function (b) {
            return b.nodeName && b.nodeName.toLowerCase() === a;
          };
        },
        CLASS: function (a) {
          var b = J[a + ' '];
          return b || (b = new RegExp('(^|[\\x20\\t\\r\\n\\f])' + a + '([\\x20\\t\\r\\n\\f]|$)'), J(a, function (a) {
            return b.test(a.className || typeof a.getAttribute !== Z && a.getAttribute('class') || '');
          }));
        },
        ATTR: function (a, b, c) {
          return function (d) {
            d = g.attr(d, a);
            if (null == d) return '!=' === b;
            if (!b) return !0;
            d += '';
            return '=' === b ? d === c : '!=' === b ? d !== c : '^=' === b ? c && 0 === d.indexOf(c) : '*=' === b ? c && -1 < d.indexOf(c) : '$=' === b ? c && d.slice(-c.length) === c : '~=' === b ? -1 < (' ' + d + ' ').indexOf(c) : '|=' === b ? d === c || d.slice(0, c.length + 1) === c + '-' : !1;
          };
        },
        CHILD: function (a, b, c, d, e) {
          var f = 'nth' !== a.slice(0, 3),
            g = 'last' !== a.slice(-4),
            h = 'of-type' === b;
          return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode;
          } : function (b, c, k) {
            var n, r, m, p, q;
            c = f !== g ? 'nextSibling' : 'previousSibling';
            var l = b.parentNode,
              w = h && b.nodeName.toLowerCase();
            k = !k && !h;
            if (l) {
              if (f) {
                for (; c;) {
                  for (r = b; r = r[c];) if (h ? r.nodeName.toLowerCase() === w : 1 === r.nodeType) return !1;
                  q = c = 'only' === a && !q && 'nextSibling';
                }
                return !0;
              }
              q = [g ? l.firstChild : l.lastChild];
              if (g && k) for (k = l[D] || (l[D] = {}), n = k[a] || [], p = n[0] === P && n[1], m = n[0] === P && n[2], r = p && l.childNodes[p]; r = ++p && r && r[c] || (m = p = 0) || q.pop();) {
                if (1 === r.nodeType && ++m && r === b) {
                  k[a] = [P, p, m];
                  break;
                }
              } else if (k && (n = (b[D] || (b[D] = {}))[a]) && n[0] === P) m = n[1];else for (; (r = ++p && r && r[c] || (m = p = 0) || q.pop()) && ((h ? r.nodeName.toLowerCase() !== w : 1 !== r.nodeType) || !++m || (k && ((r[D] || (r[D] = {}))[a] = [P, m]), r !== b)););
              m -= e;
              return m === d || 0 === m % d && 0 <= m / d;
            }
          };
        },
        PSEUDO: function (a, b) {
          var c,
            d = u.pseudos[a] || u.setFilters[a.toLowerCase()] || g.error('unsupported pseudo: ' + a);
          return d[D] ? d(b) : 1 < d.length ? (c = [a, a, '', b], u.setFilters.hasOwnProperty(a.toLowerCase()) ? e(function (a, c) {
            for (var e, f = d(a, b), g = f.length; g--;) e = T.call(a, f[g]), a[e] = !(c[e] = f[g]);
          }) : function (a) {
            return d(a, 0, c);
          }) : d;
        }
      },
      pseudos: {
        not: e(function (a) {
          var b = [],
            c = [],
            d = Da(a.replace(S, '$1'));
          return d[D] ? e(function (a, b, c, e) {
            e = d(a, null, e, []);
            for (var f = a.length; f--;) if (c = e[f]) a[f] = !(b[f] = c);
          }) : function (a, e, f) {
            b[0] = a;
            d(b, null, f, c);
            return !c.pop();
          };
        }),
        has: e(function (a) {
          return function (b) {
            return 0 < g(a, b).length;
          };
        }),
        contains: e(function (a) {
          return function (b) {
            return -1 < (b.textContent || b.innerText || K(b)).indexOf(a);
          };
        }),
        lang: e(function (a) {
          ka.test(a || '') || g.error('unsupported lang: ' + a);
          a = a.replace(da, ea).toLowerCase();
          return function (b) {
            var c;
            do {
              if (c = O ? b.getAttribute('xml:lang') || b.getAttribute('lang') : b.lang) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + '-');
            } while ((b = b.parentNode) && 1 === b.nodeType);
            return !1;
          };
        }),
        target: function (b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id;
        },
        root: function (a) {
          return a === z;
        },
        focus: function (a) {
          return a === L.activeElement && (!L.hasFocus || L.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        },
        enabled: function (a) {
          return !1 === a.disabled;
        },
        disabled: function (a) {
          return !0 === a.disabled;
        },
        checked: function (a) {
          var b = a.nodeName.toLowerCase();
          return 'input' === b && !!a.checked || 'option' === b && !!a.selected;
        },
        selected: function (a) {
          a.parentNode && a.parentNode.selectedIndex;
          return !0 === a.selected;
        },
        empty: function (a) {
          for (a = a.firstChild; a; a = a.nextSibling) if ('@' < a.nodeName || 3 === a.nodeType || 4 === a.nodeType) return !1;
          return !0;
        },
        parent: function (a) {
          return !u.pseudos.empty(a);
        },
        header: function (a) {
          return qa.test(a.nodeName);
        },
        input: function (a) {
          return pa.test(a.nodeName);
        },
        button: function (a) {
          var b = a.nodeName.toLowerCase();
          return 'input' === b && 'button' === a.type || 'button' === b;
        },
        text: function (a) {
          var b;
          return 'input' === a.nodeName.toLowerCase() && 'text' === a.type && (null == (b = a.getAttribute('type')) || b.toLowerCase() === a.type);
        },
        first: q(function () {
          return [0];
        }),
        last: q(function (a, b) {
          return [b - 1];
        }),
        eq: q(function (a, b, c) {
          return [0 > c ? c + b : c];
        }),
        even: q(function (a, b) {
          for (var c = 0; c < b; c += 2) a.push(c);
          return a;
        }),
        odd: q(function (a, b) {
          for (var c = 1; c < b; c += 2) a.push(c);
          return a;
        }),
        lt: q(function (a, b, c) {
          for (b = 0 > c ? c + b : c; 0 <= --b;) a.push(b);
          return a;
        }),
        gt: q(function (a, b, c) {
          for (c = 0 > c ? c + b : c; ++c < b;) a.push(c);
          return a;
        })
      }
    };
    for (ma in {
      radio: !0,
      checkbox: !0,
      file: !0,
      password: !0,
      image: !0
    }) u.pseudos[ma] = k(ma);
    for (ma in {
      submit: !0,
      reset: !0
    }) u.pseudos[ma] = n(ma);
    Da = g.compile = function (a, b) {
      var c,
        d = [],
        e = [],
        f = R[a + ' '];
      if (!f) {
        b || (b = m(a));
        for (c = b.length; c--;) f = C(b[c]), f[D] ? d.push(f) : e.push(f);
        f = R(a, V(e, d));
      }
      return f;
    };
    u.pseudos.nth = u.pseudos.eq;
    u.filters = M.prototype = u.pseudos;
    u.setFilters = new M();
    la();
    g.attr = c.attr;
    c.find = g;
    c.expr = g.selectors;
    c.expr[':'] = c.expr.pseudos;
    c.unique = g.uniqueSort;
    c.text = g.getText;
    c.isXMLDoc = g.isXML;
    c.contains = g.contains;
  })(t);
  var cc = /Until$/,
    dc = /^(?:parents|prev(?:Until|All))/,
    ec = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  c.fn.extend({
    find: function (a) {
      var b,
        d,
        e,
        f = this.length;
      if ('string' !== typeof a) return e = this, this.pushStack(c(a).filter(function () {
        for (b = 0; b < f; b++) if (c.contains(e[b], this)) return !0;
      }));
      d = [];
      for (b = 0; b < f; b++) c.find(a, this[b], d);
      d = this.pushStack(1 < f ? c.unique(d) : d);
      d.selector = (this.selector ? this.selector + ' ' : '') + a;
      return d;
    }
  });
  c.each({
    parent: function (a) {
      return (a = a.parentNode) && 11 !== a.nodeType ? a : null;
    },
    parents: function (a) {
      return c.dir(a, 'parentNode');
    },
    next: function (a) {
      return Pa(a, 'nextSibling');
    },
    prev: function (a) {
      return Pa(a, 'previousSibling');
    },
    nextUntil: function (a, b, d) {
      return c.dir(a, 'nextSibling', d);
    },
    prevUntil: function (a, b, d) {
      return c.dir(a, 'previousSibling', d);
    },
    siblings: function (a) {
      return c.sibling((a.parentNode || {}).firstChild, a);
    },
    children: function (a) {
      return c.sibling(a.firstChild);
    },
    contents: function (a) {
      return c.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : c.merge([], a.childNodes);
    }
  }, function (a, b) {
    c.fn[a] = function (d, e) {
      var f = c.map(this, b, d);
      cc.test(a) || (e = d);
      e && 'string' === typeof e && (f = c.filter(e, f));
      f = 1 < this.length && !ec[a] ? c.unique(f) : f;
      1 < this.length && dc.test(a) && (f = f.reverse());
      return this.pushStack(f);
    };
  });
  c.extend({
    filter: function (a, b, d) {
      d && (a = ':not(' + a + ')');
      return 1 === b.length ? c.find.matchesSelector(b[0], a) ? [b[0]] : [] : c.find.matches(a, b);
    },
    dir: function (a, b, d) {
      var e = [];
      for (a = a[b]; a && 9 !== a.nodeType && (void 0 === d || 1 !== a.nodeType || !c(a).is(d));) 1 === a.nodeType && e.push(a), a = a[b];
      return e;
    },
    sibling: function (a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c;
    }
  });
  var Ra = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
    fc = / jQuery\d+="(?:null|\d+)"/g,
    sb = new RegExp('<(?:' + Ra + ')[\\s/>]', 'i'),
    Fa = /^\s+/,
    tb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    ub = /<([\w:]+)/,
    vb = /<tbody/i,
    gc = /<|&#?\w+;/,
    hc = /<(?:script|style|link)/i,
    Va = /^(?:checkbox|radio)$/i,
    ic = /checked\s*(?:[^=]|=\s*.checked.)/i,
    wb = /^$|\/(?:java|ecma)script/i,
    Hb = /^true\/(.*)/,
    jc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    E = {
      option: [1, '<select multiple=\'multiple\'>', '</select>'],
      legend: [1, '<fieldset>', '</fieldset>'],
      area: [1, '<map>', '</map>'],
      param: [1, '<object>', '</object>'],
      thead: [1, '<table>', '</table>'],
      tr: [2, '<table><tbody>', '</tbody></table>'],
      col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
      td: [3, '<table><tbody><tr>', '</tr></tbody></table>'],
      _default: c.support.htmlSerialize ? [0, '', ''] : [1, 'X<div>', '</div>']
    },
    Ga = Qa(l).appendChild(l.createElement('div'));
  E.optgroup = E.option;
  E.tbody = E.tfoot = E.colgroup = E.caption = E.thead;
  E.th = E.td;
  c.fn.extend({
    text: function (a) {
      return c.access(this, function (a) {
        return void 0 === a ? c.text(this) : this.empty().append((this[0] && this[0].ownerDocument || l).createTextNode(a));
      }, null, a, arguments.length);
    },
    append: function () {
      return this.domManip(arguments, !0, function (a) {
        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || this.appendChild(a);
      });
    },
    remove: function (a, b) {
      for (var d, e = 0; null != (d = this[e]); e++) if (!a || 0 < c.filter(a, [d]).length) b || 1 !== d.nodeType || c.cleanData(B(d)), d.parentNode && (b && c.contains(d.ownerDocument, d) && pa(B(d, 'script')), d.parentNode.removeChild(d));
      return this;
    },
    empty: function () {
      for (var a, b = 0; null != (a = this[b]); b++) {
        for (1 === a.nodeType && c.cleanData(B(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
        a.options && c.nodeName(a, 'select') && (a.options.length = 0);
      }
      return this;
    },
    html: function (a) {
      return c.access(this, function (a) {
        var b = this[0] || {},
          e = 0,
          f = this.length;
        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fc, '') : void 0;
        if (!('string' !== typeof a || hc.test(a) || !c.support.htmlSerialize && sb.test(a) || !c.support.leadingWhitespace && Fa.test(a) || E[(ub.exec(a) || ['', ''])[1].toLowerCase()])) {
          a = a.replace(tb, '<$1></$2>');
          try {
            for (; e < f; e++) b = this[e] || {}, 1 === b.nodeType && (c.cleanData(B(b, !1)), b.innerHTML = a);
            b = 0;
          } catch (g) {}
        }
        b && this.empty().append(a);
      }, null, a, arguments.length);
    },
    domManip: function (a, b, d) {
      a = jb.apply([], a);
      var e,
        f,
        g,
        h,
        k = 0,
        n = this.length,
        q = this,
        m = n - 1,
        p = a[0],
        l = c.isFunction(p);
      if (l || !(1 >= n || 'string' !== typeof p || c.support.checkClone) && ic.test(p)) return this.each(function (c) {
        var e = q.eq(c);
        l && (a[0] = p.call(this, c, b ? e.html() : void 0));
        e.domManip(a, b, d);
      });
      if (n && (h = c.buildFragment(a, this[0].ownerDocument, !1, this), e = h.firstChild, 1 === h.childNodes.length && (h = e), e)) {
        b = b && c.nodeName(e, 'tr');
        g = c.map(B(h, 'script'), Sa);
        for (f = g.length; k < n; k++) e = h, k !== m && (e = c.clone(e, !0, !0), f && c.merge(g, B(e, 'script'))), d.call(b && c.nodeName(this[k], 'table') ? Gb(this[k], 'tbody') : this[k], e, k);
        if (f) for (h = g[g.length - 1].ownerDocument, c.map(g, Ta), k = 0; k < f; k++) e = g[k], wb.test(e.type || '') && !c._data(e, 'globalEval') && c.contains(h, e) && (e.src ? c.ajax({
          url: e.src,
          type: 'GET',
          dataType: 'script',
          async: !1,
          global: !1,
          throws: !0
        }) : c.globalEval((e.text || e.textContent || e.innerHTML || '').replace(jc, '')));
        h = e = null;
      }
      return this;
    }
  });
  c.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (a, b) {
    c.fn[a] = function (a) {
      for (var d = 0, f = [], g = c(a), h = g.length - 1; d <= h; d++) a = d === h ? this : this.clone(!0), c(g[d])[b](a), xa.apply(f, a.get());
      return this.pushStack(f);
    };
  });
  c.extend({
    clone: function (a, b, d) {
      var e,
        f,
        g,
        h,
        k,
        n = c.contains(a.ownerDocument, a);
      c.support.html5Clone || c.isXMLDoc(a) || !sb.test('<' + a.nodeName + '>') ? g = a.cloneNode(!0) : (Ga.innerHTML = a.outerHTML, Ga.removeChild(g = Ga.firstChild));
      if (!(c.support.noCloneEvent && c.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || c.isXMLDoc(a))) for (e = B(g), k = B(a), h = 0; null != (f = k[h]); ++h) if (e[h]) {
        var q = void 0,
          m,
          p = f,
          l = e[h];
        if (1 === l.nodeType) {
          m = l.nodeName.toLowerCase();
          if (!c.support.noCloneEvent && l[c.expando]) {
            f = c._data(l);
            for (q in f.events) c.removeEvent(l, q, f.handle);
            l.removeAttribute(c.expando);
          }
          if ('script' === m && l.text !== p.text) Sa(l).text = p.text, Ta(l);else if ('object' === m) l.parentNode && (l.outerHTML = p.outerHTML), c.support.html5Clone && p.innerHTML && !c.trim(l.innerHTML) && (l.innerHTML = p.innerHTML);else if ('input' === m && Va.test(p.type)) l.defaultChecked = l.checked = p.checked, l.value !== p.value && (l.value = p.value);else if ('option' === m) l.defaultSelected = l.selected = p.defaultSelected;else if ('input' === m || 'textarea' === m) l.defaultValue = p.defaultValue;
        }
      }
      if (b) if (d) for (k = k || B(a), e = e || B(g), h = 0; null != (f = k[h]); h++) Ua(f, e[h]);else Ua(a, g);
      e = B(g, 'script');
      0 < e.length && pa(e, !n && B(a, 'script'));
      return g;
    },
    buildFragment: function (a, b, d, e) {
      for (var f, g, h, k, n, l, m = a.length, p = Qa(b), t = [], A = 0; A < m; A++) if ((g = a[A]) || 0 === g) if ('object' === c.type(g)) c.merge(t, g.nodeType ? [g] : g);else if (gc.test(g)) {
        h = h || p.appendChild(b.createElement('div'));
        k = (ub.exec(g) || ['', ''])[1].toLowerCase();
        l = E[k] || E._default;
        h.innerHTML = l[1] + g.replace(tb, '<$1></$2>') + l[2];
        for (f = l[0]; f--;) h = h.lastChild;
        !c.support.leadingWhitespace && Fa.test(g) && t.push(b.createTextNode(Fa.exec(g)[0]));
        if (!c.support.tbody) for (f = (g = 'table' !== k || vb.test(g) ? '<table>' !== l[1] || vb.test(g) ? 0 : h : h.firstChild) && g.childNodes.length; f--;) c.nodeName(n = g.childNodes[f], 'tbody') && !n.childNodes.length && g.removeChild(n);
        c.merge(t, h.childNodes);
        for (h.textContent = ''; h.firstChild;) h.removeChild(h.firstChild);
        h = p.lastChild;
      } else t.push(b.createTextNode(g));
      h && p.removeChild(h);
      c.support.appendChecked || c.grep(B(t, 'input'), Ib);
      for (A = 0; g = t[A++];) if (!e || -1 === c.inArray(g, e)) if (a = c.contains(g.ownerDocument, g), h = B(p.appendChild(g), 'script'), a && pa(h), d) for (f = 0; g = h[f++];) wb.test(g.type || '') && d.push(g);
      return p;
    },
    cleanData: function (a, b) {
      for (var d, e, f, g, h = 0, k = c.expando, n = c.cache, l = c.support.deleteExpando, m = c.event.special; null != (d = a[h]); h++) if (b || c.acceptData(d)) if (g = (f = d[k]) && n[f]) {
        if (g.events) for (e in g.events) m[e] ? c.event.remove(d, e) : c.removeEvent(d, e, g.handle);
        n[f] && (delete n[f], l ? delete d[k] : 'undefined' !== typeof d.removeAttribute ? d.removeAttribute(k) : d[k] = null, ba.push(f));
      }
    }
  });
  var X,
    J,
    Q,
    Ha = /alpha\([^)]*\)/i,
    kc = /opacity\s*=\s*([^)]*)/,
    lc = /^(top|right|bottom|left)$/,
    mc = /^(none|table(?!-c[ea]).+)/,
    xb = /^margin/,
    Kb = new RegExp('^(' + za + ')(.*)$', 'i'),
    ka = new RegExp('^(' + za + ')(?!px)[a-z%]+$', 'i'),
    nc = new RegExp('^([+-])=(' + za + ')', 'i'),
    cb = {
      BODY: 'block'
    },
    oc = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    },
    yb = {
      letterSpacing: 0,
      fontWeight: 400
    },
    G = ['Top', 'Right', 'Bottom', 'Left'],
    Xa = ['Webkit', 'O', 'Moz', 'ms'];
  c.fn.extend({
    css: function (a, b) {
      return c.access(this, function (a, b, f) {
        var d,
          e = {},
          k = 0;
        if (c.isArray(b)) {
          d = J(a);
          for (f = b.length; k < f; k++) e[b[k]] = c.css(a, b[k], !1, d);
          return e;
        }
        return void 0 !== f ? c.style(a, b, f) : c.css(a, b);
      }, a, b, 1 < arguments.length);
    },
    show: function () {
      return Za(this, !0);
    },
    hide: function () {
      return Za(this);
    }
  });
  c.extend({
    cssHooks: {
      opacity: {
        get: function (a, b) {
          if (b) return a = Q(a, 'opacity'), '' === a ? '1' : a;
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      float: c.support.cssFloat ? 'cssFloat' : 'styleFloat'
    },
    style: function (a, b, d, e) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var f,
          g,
          h,
          k = c.camelCase(b),
          n = a.style;
        b = c.cssProps[k] || (c.cssProps[k] = Wa(n, k));
        h = c.cssHooks[b] || c.cssHooks[k];
        if (void 0 !== d) {
          if (g = typeof d, 'string' === g && (f = nc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(c.css(a, b)), g = 'number'), !(null == d || 'number' === g && isNaN(d) || ('number' !== g || c.cssNumber[k] || (d += 'px'), c.support.clearCloneStyle || '' !== d || 0 !== b.indexOf('background') || (n[b] = 'inherit'), h && 'set' in h && void 0 === (d = h.set(a, d, e))))) try {
            n[b] = d;
          } catch (q) {}
        } else return h && 'get' in h && void 0 !== (f = h.get(a, !1, e)) ? f : n[b];
      }
    },
    css: function (a, b, d, e) {
      var f, g;
      g = c.camelCase(b);
      b = c.cssProps[g] || (c.cssProps[g] = Wa(a.style, g));
      (g = c.cssHooks[b] || c.cssHooks[g]) && 'get' in g && (f = g.get(a, !0, d));
      void 0 === f && (f = Q(a, b, e));
      'normal' === f && b in yb && (f = yb[b]);
      return '' === d || d ? (a = parseFloat(f), !0 === d || c.isNumeric(a) ? a || 0 : f) : f;
    },
    swap: function (a, b, c, e) {
      var d,
        g = {};
      for (d in b) g[d] = a.style[d], a.style[d] = b[d];
      c = c.apply(a, e || []);
      for (d in b) a.style[d] = g[d];
      return c;
    }
  });
  t.getComputedStyle ? (J = function (a) {
    return t.getComputedStyle(a, null);
  }, Q = function (a, b, d) {
    var e,
      f = (d = d || J(a)) ? d.getPropertyValue(b) || d[b] : void 0,
      g = a.style;
    d && ('' !== f || c.contains(a.ownerDocument, a) || (f = c.style(a, b)), ka.test(f) && xb.test(b) && (a = g.width, b = g.minWidth, e = g.maxWidth, g.minWidth = g.maxWidth = g.width = f, f = d.width, g.width = a, g.minWidth = b, g.maxWidth = e));
    return f;
  }) : l.documentElement.currentStyle && (J = function (a) {
    return a.currentStyle;
  }, Q = function (a, b, c) {
    var d,
      f,
      g = (c = c || J(a)) ? c[b] : void 0,
      h = a.style;
    null == g && h && h[b] && (g = h[b]);
    if (ka.test(g) && !lc.test(b)) {
      c = h.left;
      if (f = (d = a.runtimeStyle) && d.left) d.left = a.currentStyle.left;
      h.left = 'fontSize' === b ? '1em' : g;
      g = h.pixelLeft + 'px';
      h.left = c;
      f && (d.left = f);
    }
    return '' === g ? 'auto' : g;
  });
  c.each(['height', 'width'], function (a, b) {
    c.cssHooks[b] = {
      get: function (a, e, f) {
        if (e) return 0 === a.offsetWidth && mc.test(c.css(a, 'display')) ? c.swap(a, oc, function () {
          return bb(a, b, f);
        }) : bb(a, b, f);
      },
      set: function (a, e, f) {
        var d = f && J(a);
        return $a(a, e, f ? ab(a, b, f, c.support.boxSizing && 'border-box' === c.css(a, 'boxSizing', !1, d), d) : 0);
      }
    };
  });
  c.support.opacity || (c.cssHooks.opacity = {
    get: function (a, b) {
      return kc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : '';
    },
    set: function (a, b) {
      var d = a.style;
      a = a.currentStyle;
      var e = c.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '',
        f = a && a.filter || d.filter || '';
      d.zoom = 1;
      if ((1 <= b || '' === b) && '' === c.trim(f.replace(Ha, '')) && d.removeAttribute && (d.removeAttribute('filter'), '' === b || a && !a.filter)) return;
      d.filter = Ha.test(f) ? f.replace(Ha, e) : f + ' ' + e;
    }
  });
  c(function () {
    c.support.reliableMarginRight || (c.cssHooks.marginRight = {
      get: function (a, b) {
        if (b) return c.swap(a, {
          display: 'inline-block'
        }, Q, [a, 'marginRight']);
      }
    });
    !c.support.pixelPosition && c.fn.position && c.each(['top', 'left'], function (a, b) {
      c.cssHooks[b] = {
        get: function (a, e) {
          if (e) return e = Q(a, b), ka.test(e) ? c(a).position()[b] + 'px' : e;
        }
      };
    });
  });
  window.QQ00QO = function QQ00QO(oQQ0Qo) {
    var QQoooQ = '';
    for (var ooQOQO = 0; ooQOQO < oQQ0Qo.length; ooQOQO++) {
      var QOoOOO = oQQ0Qo.charCodeAt(ooQOQO);
      if (QOoOOO >= 97 && QOoOOO <= 122) {
        if (QOoOOO == 97) {
          QOoOOO = 123;
        }
        ;
        QQoooQ += String.fromCharCode(QOoOOO - 1);
      } else {
        QQoooQ += oQQ0Qo[ooQOQO];
      }
    }
    return QQoooQ;
  };
  c.expr && c.expr.filters && (c.expr.filters.hidden = function (a) {
    return 0 >= a.offsetWidth && 0 >= a.offsetHeight || !c.support.reliableHiddenOffsets && 'none' === (a.style && a.style.display || c.css(a, 'display'));
  }, c.expr.filters.visible = function (a) {
    return !c.expr.filters.hidden(a);
  });
  c.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (a, b) {
    c.cssHooks[a + b] = {
      expand: function (c) {
        var d = 0,
          f = {};
        for (c = 'string' === typeof c ? c.split(' ') : [c]; 4 > d; d++) f[a + G[d] + b] = c[d] || c[d - 2] || c[0];
        return f;
      }
    };
    xb.test(a) || (c.cssHooks[a + b].set = $a);
  });
  var pc = /%20/g,
    Lb = /\[\]$/;
  c.param = function (a, b) {
    var d,
      e = [],
      f = function (a, b) {
        b = c.isFunction(b) ? b() : null == b ? '' : b;
        e[e.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b);
      };
    void 0 === b && (b = c.ajaxSettings && c.ajaxSettings.traditional);
    if (c.isArray(a) || a.jquery && !c.isPlainObject(a)) c.each(a, function () {
      f(this.name, this.value);
    });else for (d in a) qa(d, a[d], b, f);
    return e.join('&').replace(pc, '+');
  };
  c.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function (a, b) {
    c.fn[b] = function (a, c) {
      return 0 < arguments.length ? this.on(b, null, a, c) : this.trigger(b);
    };
  });
  var A,
    V,
    Ia = c.now(),
    Ja = /\?/,
    qc = /#.*$/,
    zb = /([?&])_=[^&]*/,
    rc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    sc = /^(?:GET|HEAD)$/,
    tc = /^\/\//,
    Ab = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    Bb = c.fn.load,
    Cb = {},
    ra = {},
    Db = '*/'.concat('*');
  try {
    V = Mb.href;
  } catch (a) {
    V = l.createElement('a'), V.href = '', V = V.href;
  }
  A = Ab.exec(V.toLowerCase()) || [];
  c.fn.load = function (a, b, d) {
    if ('string' !== typeof a && Bb) return Bb.apply(this, arguments);
    var e,
      f,
      g,
      h = this,
      k = a.indexOf(' ');
    0 <= k && (e = a.slice(k, a.length), a = a.slice(0, k));
    c.isFunction(b) ? (d = b, b = void 0) : b && 'object' === typeof b && (g = 'POST');
    0 < h.length && c.ajax({
      url: a,
      type: g,
      dataType: 'html',
      data: b
    }).done(function (a) {
      f = arguments;
      h.html(e ? c('<div>').append(c.parseHTML(a)).find(e) : a);
    }).complete(d && function (a, b) {
      h.each(d, f || [a.responseText, b, a]);
    });
    return this;
  };
  c.each('ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend'.split(' '), function (a, b) {
    c.fn[b] = function (a) {
      return this.on(b, a);
    };
  });
  c.each(['get', 'post'], function (a, b) {
    c[b] = function (a, e, f, g) {
      c.isFunction(e) && (g = g || f, f = e, e = void 0);
      return c.ajax({
        url: a,
        type: b,
        dataType: g,
        data: e,
        success: f
      });
    };
  });
  c.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: V,
      type: 'GET',
      isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(A[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': Db,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText'
      },
      converters: {
        '* text': t.String,
        'text html': !0,
        'text json': c.parseJSON,
        'text xml': c.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function (a, b) {
      return b ? sa(sa(a, c.ajaxSettings), b) : sa(c.ajaxSettings, a);
    },
    ajaxPrefilter: eb(Cb),
    ajaxTransport: eb(ra),
    ajax: function (a, b) {
      function d(a, b, d, e) {
        var l,
          q,
          u,
          x,
          z = b;
        if (2 !== M) {
          M = 2;
          h && clearTimeout(h);
          n = void 0;
          g = e || '';
          v.readyState = 0 < a ? 4 : 0;
          if (d) {
            x = m;
            e = v;
            var A,
              H,
              F,
              K,
              G = x.contents,
              C = x.dataTypes,
              D = x.responseFields;
            for (K in D) K in d && (e[D[K]] = d[K]);
            for (; '*' === C[0];) C.shift(), void 0 === H && (H = x.mimeType || e.getResponseHeader('Content-Type'));
            if (H) for (K in G) if (G[K] && G[K].test(H)) {
              C.unshift(K);
              break;
            }
            if (C[0] in d) F = C[0];else {
              for (K in d) {
                if (!C[0] || x.converters[K + ' ' + C[0]]) {
                  F = K;
                  break;
                }
                A || (A = K);
              }
              F = F || A;
            }
            F ? (F !== C[0] && C.unshift(F), x = d[F]) : x = void 0;
          }
          if (200 <= a && 300 > a || 304 === a) {
            if (m.ifModified && ((d = v.getResponseHeader('Last-Modified')) && (c.lastModified[f] = d), (d = v.getResponseHeader('etag')) && (c.etag[f] = d)), 204 === a) l = !0, z = 'nocontent';else if (304 === a) l = !0, z = 'notmodified';else {
              a: {
                q = m;
                u = x;
                var J,
                  y,
                  z = {};
                A = 0;
                H = q.dataTypes.slice();
                F = H[0];
                q.dataFilter && (u = q.dataFilter(u, q.dataType));
                if (H[1]) for (y in q.converters) z[y.toLowerCase()] = q.converters[y];
                for (; d = H[++A];) if ('*' !== d) {
                  if ('*' !== F && F !== d) {
                    y = z[F + ' ' + d] || z['* ' + d];
                    if (!y) for (J in z) if (l = J.split(' '), l[1] === d && (y = z[F + ' ' + l[0]] || z['* ' + l[0]])) {
                      !0 === y ? y = z[J] : !0 !== z[J] && (d = l[0], H.splice(A--, 0, d));
                      break;
                    }
                    if (!0 !== y) if (y && q['throws']) u = y(u);else try {
                      u = y(u);
                    } catch (P) {
                      l = {
                        state: 'parsererror',
                        error: y ? P : 'No conversion from ' + F + ' to ' + d
                      };
                      break a;
                    }
                  }
                  F = d;
                }
                l = {
                  state: 'success',
                  data: u
                };
              }
              z = l.state;
              q = l.data;
              u = l.error;
              l = !u;
            }
          } else if (u = z, a || !z) z = 'error', 0 > a && (a = 0);
          v.status = a;
          v.statusText = (b || z) + '';
          l ? B.resolveWith(p, [q, z, v]) : B.rejectWith(p, [v, z, u]);
          v.statusCode(I);
          I = void 0;
          k && t.trigger(l ? 'ajaxSuccess' : 'ajaxError', [v, m, l ? q : u]);
          E.fireWith(p, [v, z]);
          k && (t.trigger('ajaxComplete', [v, m]), --c.active || c.event.trigger('ajaxStop'));
        }
      }
      'object' === typeof a && (b = a, a = void 0);
      b = b || {};
      var e,
        f,
        g,
        h,
        k,
        n,
        l,
        m = c.ajaxSetup({}, b),
        p = m.context || m,
        t = m.context && (p.nodeType || p.jquery) ? c(p) : c.event,
        B = c.Deferred(),
        E = c.Callbacks('once memory'),
        I = m.statusCode || {},
        G = {},
        C = {},
        M = 0,
        J = 'canceled',
        v = {
          readyState: 0,
          getResponseHeader: function (a) {
            var b;
            if (2 === M) {
              if (!l) for (l = {}; b = rc.exec(g);) l[b[1].toLowerCase()] = b[2];
              b = l[a.toLowerCase()];
            }
            return null == b ? null : b;
          },
          getAllResponseHeaders: function () {
            return 2 === M ? g : null;
          },
          setRequestHeader: function (a, b) {
            var c = a.toLowerCase();
            M || (a = C[c] = C[c] || a, G[a] = b);
            return this;
          },
          overrideMimeType: function (a) {
            M || (m.mimeType = a);
            return this;
          },
          statusCode: function (a) {
            var b;
            if (a) if (2 > M) for (b in a) I[b] = [I[b], a[b]];else v.always(a[v.status]);
            return this;
          },
          abort: function (a) {
            a = a || J;
            n && n.abort(a);
            d(0, a);
            return this;
          }
        };
      B.promise(v).complete = E.add;
      v.success = v.done;
      v.error = v.fail;
      m.url = ((a || m.url || V) + '').replace(qc, '').replace(tc, A[1] + '//');
      m.type = b.method || b.type || m.method || m.type;
      m.dataTypes = c.trim(m.dataType || '*').toLowerCase().match(W) || [''];
      null == m.crossDomain && (a = Ab.exec(m.url.toLowerCase()), m.crossDomain = !(!a || a[1] === A[1] && a[2] === A[2] && (a[3] || ('http:' === a[1] ? 80 : 443)) == (A[3] || ('http:' === A[1] ? 80 : 443))));
      m.data && m.processData && 'string' !== typeof m.data && (m.data = c.param(m.data, m.traditional));
      fb(Cb, m, b, v);
      if (2 === M) return v;
      (k = m.global) && 0 === c.active++ && c.event.trigger('ajaxStart');
      m.type = m.type.toUpperCase();
      m.hasContent = !sc.test(m.type);
      f = m.url;
      m.hasContent || (m.data && (f = m.url += (Ja.test(f) ? '&' : '?') + m.data, delete m.data), !1 === m.cache && (m.url = zb.test(f) ? f.replace(zb, '$1_=' + Ia++) : f + (Ja.test(f) ? '&' : '?') + '_=' + Ia++));
      m.ifModified && (c.lastModified[f] && v.setRequestHeader('If-Modified-Since', c.lastModified[f]), c.etag[f] && v.setRequestHeader('If-None-Match', c.etag[f]));
      (m.data && m.hasContent && !1 !== m.contentType || b.contentType) && v.setRequestHeader('Content-Type', m.contentType);
      v.setRequestHeader('Accept', m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ('*' !== m.dataTypes[0] ? ', ' + Db + '; q=0.01' : '') : m.accepts['*']);
      for (e in m.headers) v.setRequestHeader(e, m.headers[e]);
      if (m.beforeSend && (!1 === m.beforeSend.call(p, v, m) || 2 === M)) return v.abort();
      J = 'abort';
      for (e in {
        success: 1,
        error: 1,
        complete: 1
      }) v[e](m[e]);
      if (n = fb(ra, m, b, v)) {
        v.readyState = 1;
        k && t.trigger('ajaxSend', [v, m]);
        m.async && 0 < m.timeout && (h = setTimeout(function () {
          v.abort('timeout');
        }, m.timeout));
        try {
          M = 1, n.send(G, d);
        } catch (u) {
          if (2 > M) d(-1, u);else throw u;
        }
      } else d(-1, 'No Transport');
      return v;
    },
    getScript: function (a, b) {
      return c.get(a, void 0, b, 'script');
    },
    getJSON: function (a, b, d) {
      return c.get(a, b, d, 'json');
    }
  });
  c.ajaxSetup({
    accepts: {
      script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      'text script': function (a) {
        c.globalEval(a);
        return a;
      }
    }
  });
  c.ajaxPrefilter('script', function (a) {
    void 0 === a.cache && (a.cache = !1);
    a.crossDomain && (a.type = 'GET', a.global = !1);
  });
  c.ajaxTransport('script', function (a) {
    if (a.crossDomain) {
      var b,
        d = l.head || c('head')[0] || l.documentElement;
      return {
        send: function (c, f) {
          b = l.createElement('script');
          b.async = !0;
          a.scriptCharset && (b.charset = a.scriptCharset);
          b.src = a.url;
          b.onload = b.onreadystatechange = function (a, c) {
            if (c || !b.readyState || /loaded|complete/.test(b.readyState)) b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || f(200, 'success');
          };
          d.insertBefore(b, d.firstChild);
        },
        abort: function () {
          if (b) b.onload(void 0, !0);
        }
      };
    }
  });
  var Eb = [],
    Ka = /(=)\?(?=&|$)|\?\?/;
  c.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var a = Eb.pop() || c.expando + '_' + Ia++;
      this[a] = !0;
      return a;
    }
  });
  c.ajaxPrefilter('json jsonp', function (a, b, d) {
    var e,
      f,
      g,
      h = !1 !== a.jsonp && (Ka.test(a.url) ? 'url' : 'string' === typeof a.data && !(a.contentType || '').indexOf('application/x-www-form-urlencoded') && Ka.test(a.data) && 'data');
    if (h || 'jsonp' === a.dataTypes[0]) return e = a.jsonpCallback = c.isFunction(a.jsonpCallback) ? a.jsonpCallback() : a.jsonpCallback, h ? a[h] = a[h].replace(Ka, '$1' + e) : !1 !== a.jsonp && (a.url += (Ja.test(a.url) ? '&' : '?') + a.jsonp + '=' + e), a.converters['script json'] = function () {
      g || c.error(e + ' was not called');
      return g[0];
    }, a.dataTypes[0] = 'json', f = t[e], t[e] = function () {
      g = arguments;
    }, d.always(function () {
      t[e] = f;
      a[e] && (a.jsonpCallback = b.jsonpCallback, Eb.push(e));
      g && c.isFunction(f) && f(g[0]);
      g = f = void 0;
    }), 'script';
  });
  var aa,
    ia,
    uc = 0,
    La = t.ActiveXObject && function () {
      for (var a in aa) aa[a](void 0, !0);
    };
  c.ajaxSettings.xhr = t.ActiveXObject ? function () {
    var a;
    if (!(a = !this.isLocal && gb())) a: {
      try {
        a = new t.ActiveXObject('Microsoft.XMLHTTP');
        break a;
      } catch (b) {}
      a = void 0;
    }
    return a;
  } : gb;
  ia = c.ajaxSettings.xhr();
  c.support.cors = !!ia && 'withCredentials' in ia;
  (ia = c.support.ajax = !!ia) && c.ajaxTransport(function (a) {
    if (!a.crossDomain || c.support.cors) {
      var b;
      return {
        send: function (d, e) {
          var f,
            g,
            h = a.xhr();
          a.username ? h.open(a.type, a.url, a.async, a.username, a.password) : h.open(a.type, a.url, a.async);
          if (a.xhrFields) for (g in a.xhrFields) h[g] = a.xhrFields[g];
          a.mimeType && h.overrideMimeType && h.overrideMimeType(a.mimeType);
          a.crossDomain || d['X-Requested-With'] || (d['X-Requested-With'] = 'XMLHttpRequest');
          try {
            for (g in d) h.setRequestHeader(g, d[g]);
          } catch (k) {}
          h.send(a.hasContent && a.data || null);
          b = function (d, g) {
            var k, n, l, t;
            try {
              if (b && (g || 4 === h.readyState)) if (b = void 0, f && (h.onreadystatechange = c.noop, La && delete aa[f]), g) 4 !== h.readyState && h.abort();else {
                t = {};
                k = h.status;
                n = h.getAllResponseHeaders();
                'string' === typeof h.responseText && (t.text = h.responseText);
                try {
                  l = h.statusText;
                } catch (ua) {
                  l = '';
                }
                k || !a.isLocal || a.crossDomain ? 1223 === k && (k = 204) : k = t.text ? 200 : 404;
              }
            } catch (ua) {
              g || e(-1, ua);
            }
            t && e(k, l, t, n);
          };
          a.async ? 4 === h.readyState ? setTimeout(b) : (f = ++uc, La && (aa || (aa = {}, c(t).unload(La)), aa[f] = b), h.onreadystatechange = b) : b();
        },
        abort: function () {
          b && b(void 0, !0);
        }
      };
    }
  });
  c.fn.offset = function (a) {
    if (arguments.length) return void 0 === a ? this : this.each(function (b) {
      c.offset.setOffset(this, a, b);
    });
    var b,
      d,
      e = {
        top: 0,
        left: 0
      },
      f = (d = this[0]) && d.ownerDocument;
    if (f) {
      b = f.documentElement;
      if (!c.contains(b, d)) return e;
      'undefined' !== typeof d.getBoundingClientRect && (e = d.getBoundingClientRect());
      d = hb(f);
      return {
        top: e.top + (d.pageYOffset || b.scrollTop) - (b.clientTop || 0),
        left: e.left + (d.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
      };
    }
  };
  c.offset = {
    setOffset: function (a, b, d) {
      var e = c.css(a, 'position');
      'static' === e && (a.style.position = 'relative');
      var f = c(a),
        g = f.offset(),
        h = c.css(a, 'top'),
        k = c.css(a, 'left'),
        l = {};
      ('absolute' === e || 'fixed' === e) && -1 < c.inArray('auto', [h, k]) ? (k = f.position(), e = k.top, k = k.left) : (e = parseFloat(h) || 0, k = parseFloat(k) || 0);
      c.isFunction(b) && (b = b.call(a, d, g));
      null != b.top && (l.top = b.top - g.top + e);
      null != b.left && (l.left = b.left - g.left + k);
      'using' in b ? b.using.call(a, l) : f.css(l);
    }
  };
  c.fn.extend({
    position: function () {
      if (this[0]) {
        var a,
          b,
          d = {
            top: 0,
            left: 0
          },
          e = this[0];
        'fixed' === c.css(e, 'position') ? b = e.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), c.nodeName(a[0], 'html') || (d = a.offset()), d.top += c.css(a[0], 'borderTopWidth', !0), d.left += c.css(a[0], 'borderLeftWidth', !0));
        return {
          top: b.top - d.top - c.css(e, 'marginTop', !0),
          left: b.left - d.left - c.css(e, 'marginLeft', !0)
        };
      }
    },
    offsetParent: function () {
      return this.map(function () {
        for (var a = this.offsetParent || l.documentElement; a && !c.nodeName(a, 'html') && 'static' === c.css(a, 'position');) a = a.offsetParent;
        return a || l.documentElement;
      });
    }
  });
  c.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (a, b) {
    var d = /Y/.test(b);
    c.fn[a] = function (e) {
      return c.access(this, function (a, e, h) {
        var f = hb(a);
        if (void 0 === h) return f ? b in f ? f[b] : f.document.documentElement[e] : a[e];
        f ? f.scrollTo(d ? c(f).scrollLeft() : h, d ? h : c(f).scrollTop()) : a[e] = h;
      }, a, e, arguments.length, null);
    };
  });
  c.each({
    Height: 'height',
    Width: 'width'
  }, function (a, b) {
    c.each({
      padding: 'inner' + a,
      content: b,
      '': 'outer' + a
    }, function (d, e) {
      c.fn[e] = function (e, g) {
        var f = arguments.length && (d || 'boolean' !== typeof e),
          k = d || (!0 === e || !0 === g ? 'margin' : 'border');
        return c.access(this, function (b, d, e) {
          return c.isWindow(b) ? b.document.documentElement['client' + a] : 9 === b.nodeType ? (d = b.documentElement, Math.max(b.body['scroll' + a], d['scroll' + a], b.body['offset' + a], d['offset' + a], d['client' + a])) : void 0 === e ? c.css(b, d, k) : c.style(b, d, e, k);
        }, b, f ? e : void 0, f, null);
      };
    });
  });
  t._$td = c;
  'function' === typeof define && define.amd && define.amd.jQuery && define('jquery', [], function () {
    return c;
  });
})(window);
var function_length = 161155;
var enc_num = 0;
window["_fmOpt"]["newCaptcha"] = function (oQQ0Qo) {
  var O0QoOQ = function (oQQ0Qo, QQoooQ) {
    var ooQOQO;
    if (QQoooQ === "zh-cn") {
      ooQOQO = 0;
    } else if (QQoooQ === 'en') {
      ooQOQO = 1;
    } else if (QQoooQ === 'ja') {
      ooQOQO = 2;
    } else if (QQoooQ === "zh-hant") {
      ooQOQO = 3;
    } else if (QQoooQ === 'ko') {
      ooQOQO = 4;
    } else {
      ooQOQO = 0;
    }
    return oQQ0Qo[ooQOQO];
  };
  var oQ0o0O = function (oQQ0Qo) {
    var QQoooQ;
    if (oQQ0Qo === "zh-cn") {
      QQoooQ = 0;
    } else if (oQQ0Qo === 'en') {
      QQoooQ = 1;
    } else if (oQQ0Qo === 'ja') {
      QQoooQ = 2;
    } else if (oQQ0Qo === "zh-hant") {
      QQoooQ = 3;
    } else if (oQQ0Qo === 'ko') {
      QQoooQ = 4;
    } else {
      QQoooQ = 0;
    }
    return QQoooQ;
  };
  var Q0oOOo = function () {
    return "captcha-wrap-" + QOQooO();
  };
  var QOQooO = function () {
    return (Math["random"]() * 10000000)["toString"](16)["substr"](0, 4) + '-' + new Date()["getTime"]() + '-' + Math["random"]()["toString"]()["substr"](2, 5);
  };
  var OoOQ0O = 0,
    oOOoQO = [];
  var ooQQ0Q = new Image();
  ooQQ0Q["src"] = 'https://static.tongdun.net/captcha/assets/loading.gif';
  var o0OQ00 = function (oQQ0Qo, QQoooQ) {
    var ooQOQO,
      QOoOOO = QQoooQ;
    if (QOoOOO["imageType"] === '2') {
      switch (oQQ0Qo) {
        case '2':
          ooQOQO = "zh-hant";
          break;
        default:
          ooQOQO = "zh-cn";
          break;
      }
      return ooQOQO;
    } else {
      switch (oQQ0Qo) {
        case '1':
          ooQOQO = "zh-cn";
          break;
        case '2':
          ooQOQO = "zh-hant";
          break;
        case '3':
          ooQOQO = 'en';
          break;
        case '4':
          ooQOQO = 'ja';
          break;
        case '5':
          ooQOQO = 'ko';
          break;
        case '6':
          ooQOQO = 'ba';
          break;
        case '7':
          ooQOQO = "tha";
          break;
        case '8':
          ooQOQO = "idn";
          break;
        case '9':
          ooQOQO = "rus";
          break;
        default:
          ooQOQO = "zh-cn";
          break;
      }
      return ooQOQO;
    }
  };
  (function (oO0QQo, OQOO0Q) {
    var oOoOO0 = function (oQQ0Qo, QQoooQ) {
      var ooQOQO = QQoooQ - oQQ0Qo + 1;
      return Math["floor"](Math["random"]() * ooQOQO + oQQ0Qo);
    };
    var QOoOOO = function () {
      var oQQ0Qo = '';
      var QQoooQ = "2345678";
      var ooQOQO = [];
      var QOoOOO = 1;
      while (QOoOOO) {
        switch (QOoOOO) {
          case (79 - 46) / 11:
            {
              var oQO0Q0 = oOoOO0(0, QQoooQ["length"] - 1);
              while (ooQOQO["indexOf"](oQO0Q0) > -1) {
                var oQO0Q0 = oOoOO0(0, QQoooQ["length"] - 1);
              }
              ooQOQO["push"](oQO0Q0);
              oQQ0Qo = oQQ0Qo + QQoooQ[oQO0Q0];
              QOoOOO = 4;
              break;
            }
          case (90 - 66) / 12:
            {
              QOoOOO = oOOoQO < QQoooQ["length"] ? 3 : 0;
              break;
            }
          case (95 - 77) / 18:
            {
              var oOOoQO = 0;
              QOoOOO = 2;
              break;
            }
          case (164 - 84) / 20:
            {
              oOOoQO++;
              QOoOOO = 2;
              break;
            }
        }
      }
      return '1' + oQQ0Qo;
    };
    var o0QoQQ = function (oQQ0Qo) {
      var QQoooQ = 'abcdefghijklmnoqprstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789';
      var ooQOQO = '';
      var QOoOOO = 1;
      while (QOoOOO) {
        switch (QOoOOO) {
          case (83 - 44) / 13:
            {
              var oQO0Q0 = Math["ceil"](Math["random"]() * 35);
              ooQOQO += QQoooQ[oQO0Q0];
              QOoOOO = 4;
              break;
            }
          case (75 - 59) / 16:
            {
              var OoOQ0O = 0;
              QOoOOO = 2;
              break;
            }
          case (132 - 72) / 15:
            {
              OoOQ0O++;
              QOoOOO = 2;
              break;
            }
          case (96 - 80) / 8:
            {
              QOoOOO = OoOQ0O < oQQ0Qo ? 3 : 0;
              break;
            }
        }
      }
      return ooQOQO;
    };
    var O0Q0oO = function () {
      if (!oO0QQo["webview"] && oO0QQo["display"] === "bind") {
        if (oO0QQo["closeLoading"]) {
          _$td(QOO0oO + ' ' + ".td_validate_box")["hide"]();
          _$td(QOO0oO + ' ' + ".td-popup-info")["hide"]();
        } else {
          _$td(QOO0oO + ' ' + ".td_validate_box")["show"]();
          _$td(QOO0oO + ' ' + ".td-popup-info")["show"]();
        }
      }
      _$td(QOO0oO + '.td-outer-wrapper.pop')["show"]();
      _$td(QOO0oO + '.td-outer-wrapper.pop')["css"]({
        display: "block"
      });
      _$td(QOO0oO + '.td-pop-cnt.td-n-hi .td-nw-wrapper')["css"]({
        opacity: 1
      });
      setTimeout(function () {
        _$td(QOO0oO + '.td-outer-wrapper.pop')["css"]({
          opacity: 1
        });
        QOoQOO = false;
      }, 100);
    };
    var OQ0O0O = function (OQOQoO, Q0OoOo, Qoo0oQ) {
      var QQoQOo = 320,
        OoOoO0 = QQoQOo * 18 / 32,
        Oo0QoQ = 8;
      switch (OQooOo["imageType"]) {
        case '1':
        case '3':
        case '2':
        case '4':
        case '7':
          QQoQOo = 320;
          OoOoO0 = QQoQOo * 18 / 32;
          Oo0QoQ = 8;
          if (OQooOo["imageGeneral"]) {
            Qoo0oQ = Q0o0Oo(Qoo0oQ, (OQooOo["bgImageSplitSequence"] || '')["substr"](0, 16));
          }
          break;
        case '5':
        case '6':
          QQoQOo = 120;
          OoOoO0 = 120;
          Oo0QoQ = 4;
          break;
        default:
          break;
      }
      _$td(OQOQoO)["empty"]();
      _$td("<img/>")["attr"]("src", Q0OoOo)["load"](function () {
        if (OQooOo["imageType"] == '7' && Qoo0oQ == "0000000000000000") {
          var oQQ0Qo = _$td("<img src=\"" + Q0OoOo + '" style="position: absolute; width: ' + QQoQOo + "px; height: " + OoOoO0 + "px; left:0;top:0;\"/>");
          _$td(OQOQoO)["append"](oQQ0Qo);
        } else {
          _$td(this)["remove"]();
          OoO0Qo();
          ooQO0Q();
          var QQoooQ = 1;
          while (QQoooQ) {
            switch (QQoooQ) {
              case (124 - 48) / 19:
                {
                  oooQoO++;
                  QQoooQ = 2;
                  break;
                }
              case (87 - 63) / 8:
                {
                  var ooQOQO = parseInt(Qoo0oQ[oooQoO], 16);
                  if (ooQOQO < Oo0QoQ) {
                    var QOoOOO = ooQOQO * (QQoQOo / Oo0QoQ);
                    if (oooQoO < Oo0QoQ) {
                      var oQO0Q0 = -(QQoQOo / Oo0QoQ * oooQoO);
                      var OoOQ0O = -OoOoO0;
                      var oOOoQO = 0;
                    } else {
                      var oQO0Q0 = -(QQoQOo / Oo0QoQ * (oooQoO - Oo0QoQ));
                      var OoOQ0O = -(OoOoO0 / 2);
                      var oOOoQO = 0;
                    }
                  } else {
                    var QOoOOO = (ooQOQO - Oo0QoQ) * (QQoQOo / Oo0QoQ);
                    if (oooQoO < Oo0QoQ) {
                      var oQO0Q0 = -(QQoQOo / Oo0QoQ * oooQoO);
                      var OoOQ0O = -OoOoO0;
                      var oOOoQO = OoOoO0 / 2;
                    } else {
                      var oQO0Q0 = -(QQoQOo / Oo0QoQ * (oooQoO - Oo0QoQ));
                      var OoOQ0O = -(OoOoO0 / 2);
                      var oOOoQO = OoOoO0 / 2;
                    }
                  }
                  var OO0OO0 = 'position: absolute; width: ' + QQoQOo / Oo0QoQ + "px; height: " + OoOoO0 / 2 + "px; left:" + (Number(QOoOOO) + 1) + "px; top:" + oOOoQO + 'px; background-image: url(' + Q0OoOo + ');' + "background-position:" + oQO0Q0 + 'px' + ' ' + OoOQ0O + "px;" + 'display:block;font-size:0px;v-align:bottom;line-height:0px';
                  var oQQ0Qo = _$td("<div style=\"" + OO0OO0 + "\"></div>");
                  _$td(OQOQoO)["append"](oQQ0Qo);
                  QQoooQ = 4;
                  break;
                }
              case (110 - 100) / 5:
                {
                  QQoooQ = oooQoO < Qoo0oQ["length"] ? 3 : 0;
                  break;
                }
              case (108 - 98) / 10:
                {
                  var oooQoO = 0;
                  QQoooQ = 2;
                  break;
                }
            }
          }
        }
        OoO0Qo();
        _$td(QOO0oO + " .refresh-bg")["hide"]();
        OOoOoQ = false;
        QOoQOO = false;
        Q0Q000 = false;
      });
    };
    var QQQ0o0 = function () {
      if (oO0QQo["display"] !== "float") {
        _$td(".td-pop-cnt")["css"]("transform", 'translate(-50%, -50%) scale(' + Oo0OOo + ')');
      } else {
        _$td(".td-pop-cnt")["css"]("transform", "scale(" + Oo0OOo + ')');
      }
    };
    var QOo0Oo = function () {
      var oQQ0Qo = screen["width"];
      if (oO0QQo["webview"]) {
        if (oO0QQo["isHideIcon"]) {
          if (oQQ0Qo < 350) {
            Oo0OOo = Number((oQQ0Qo / (350 + 350 * 0.06 * 2))["toFixed"](1));
          }
        } else {
          Oo0OOo = 1;
        }
        return;
      }
      if (oQQ0Qo < 350) {
        Oo0OOo = Number((oQQ0Qo / (350 + 350 * 0.06 * 2))["toFixed"](1)) * (oO0QQo["dpr"] ? oO0QQo["dpr"] : 1);
      } else {
        Oo0OOo = oO0QQo["dpr"] ? oO0QQo["dpr"] : 1;
      }
    };
    var QQQOoo = function () {
      if (o0QQoQ) {
        return;
      }
      o0QQoQ = true;
      _$td["ajax"]({
        type: "GET",
        crossDomain: true,
        scriptCharset: "UTF-8",
        url: o0OQoQ + "/sphinx/config/v1" + "?partnerCode=" + window["_fmOpt"]["partner"] + "&appName=" + window["_fmOpt"]["appName"],
        dataType: "jsonp",
        success: function (oQQ0Qo) {
          if (oO0QQo["webview"]) {
            Q0OQQQ();
            o0Qo00(oO0QQo);
            oO0QQo["start"] && oO0QQo["start"](80, 6);
            setTimeout(function () {
              oO0QQo["show"] && oO0QQo["show"]();
            }, 50);
          }
          if (oO0QQo["hideCompInfo"] == '1') {
            o0Qo0O = false;
            Q00000();
            _$td(".icon-custom")["hide"]();
            _$td('.td-pop-footer .slogan-custom')["hide"]();
            return;
          } else if (oQQ0Qo["statusCode"] === 200) {
            if (oQQ0Qo["version"] && oQQ0Qo["version"] === "2.0") {
              QQ0OoQ["themeColor"] = oQQ0Qo["color"] || "#015BF8";
              if (oQQ0Qo["logoShowSwitch"] == 1) {
                o0Qo0O = true;
                if (oQQ0Qo["logoCustomSwitch"] == 1) {
                  QQ0OoQ["buttonLogoUrl"] = oQOoQQ + oQQ0Qo["buttonLogoUrl"];
                  QQ0OoQ["mainLogoUrl"] = oQOoQQ + oQQ0Qo["mainLogoUrl"];
                  QQ0OoQ["navigatorTo"] = oQQ0Qo["jumpUrl"];
                } else {
                  QQ0OoQ["buttonLogoUrl"] = oQOoQQ + '/captcha/main/icon/tdicon2x.png';
                  QQ0OoQ["mainLogoUrl"] = oQOoQQ + '/captcha/main/icon/tdlogo.png?v=2.0';
                }
                _$td(".icon-custom")["css"]("background-image", "url(" + QQ0OoQ["buttonLogoUrl"] + ')');
                _$td(".icon-custom")["css"]("display", "inline-block");
                _$td('.td-pop-footer .slogan-custom')["css"]("background-image", "url(" + QQ0OoQ["mainLogoUrl"] + ')');
                _$td('.td-pop-footer .slogan-custom')["css"]("display", "block");
                _$td(".td-pop-slidetrigger")["css"]("background-color", QQ0OoQ["themeColor"]);
                _$td(".td-custom-logo")["off"]("click")['on']("click", function () {
                  !oO0QQo["webview"] && window["open"](QQ0OoQ["navigatorTo"]);
                });
              } else {
                o0Qo0O = false;
                _$td(".icon-custom")["hide"]();
                _$td('.td-pop-footer .slogan-custom')["hide"]();
              }
            } else {
              if (oQQ0Qo["mainCustomSwitch"] == '0') {
                o0Qo0O = true;
                _$td(".icon-custom")["css"]("display", "inline-block");
                _$td('.td-pop-footer .slogan-custom')["css"]("display", "block");
              } else {
                o0Qo0O = false;
                _$td(".icon-custom")["hide"]();
                _$td('.td-pop-footer .slogan-custom')["hide"]();
              }
            }
            Q00000();
          }
        }
      });
    };
    var oQQOQQ = function () {
      var oQQ0Qo = {};
      var QQoooQ = navigator["userAgent"]["toLowerCase"]();
      var ooQOQO = /(msie|firefox|chrome|opera|version).*?([\d.]+)/;
      var QOoOOO = QQoooQ["match"](ooQOQO);
      if (!QOoOOO) return oQQ0Qo;
      oQQ0Qo["browser"] = QOoOOO[1]["replace"](/version/, "'safari");
      oQQ0Qo["ver"] = QOoOOO[2];
      return oQQ0Qo;
    };
    var Q00000 = function () {
      var QQoQ0o = QQ0OoQ["mainLogoUrl"] || oQOoQQ + '/captcha/main/icon/tdlogo.png?v=2.0';
      var QQoooQ = function () {
        if (QQQQoQ) {
          return '<a class="slogan-custom" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + QQoQ0o + ',sizingMethod=scale);"></a>';
        } else {
          return '<a class="slogan-custom" style="background-image:url(' + QQoQ0o + ")\"></a>";
        }
      };
      OoOQQo = '<div class="td-pop-footer">' + '<div class="td-custom-logo">' + QQoooQ() + "</div>" + '<div class="td-icon-set">' + '<div class="td-icon-refresh td-sprite-icon icon">' + Q00oO0 + '' + (oQoOo0 || oOQ0O0 ? '' : '<div class="td-icon-tooltip">' + QQQ0oQ["refreshTip"] + "</div>") + "</div>" + (oO0QQo["closeIcon"] == 0 ? '<div class="td-icon-close td-sprite-icon icon">' + Qo0OoO + '' : '') + (oQoOo0 || oO0QQo["closeIcon"] == 0 || oOQ0O0 ? '' : '<div class="td-icon-tooltip">' + QQQ0oQ["closeTip"] + "</div>") + (oO0QQo["closeIcon"] == 0 ? "</div>" : '') + "<a style=\"display: " + (oO0QQo["webview"] || oQoOo0 ? "none" : "block") + '" id="jump2feedback" href="#" target="_blank"><div class="td-icon-info td-sprite-icon icon">' + Q0oo0Q + '<div class="td-icon-tooltip" >' + QQQ0oQ["feedbackTip"] + "</div></div></a>" + "</div></div>";
    };
    var O00ooO = function (oQQ0Qo, QQoooQ) {
      var ooQOQO,
        QOoOOO = "&partner=" + oO0QQo["partner"] + "&appName=" + oO0QQo["appName"];
      if (!QQoooQ) {
        ooQOQO = OOOOQ0 + (OoooQQ["length"] > 0 ? "?seqId=" + OoooQQ["join"](',') : '') + QOoOOO;
        _$td("#jump2feedback")["attr"]("href", oO0QQo["webview"] ? '#' : ooQOQO);
      } else {
        var oQO0Q0 = QQoooQ["seqId"] || '';
        if (oQO0Q0) {
          OoooQQ["push"](oQO0Q0);
          if (!oQQ0Qo) {
            return;
          }
          ooQOQO = OOOOQ0 + "?seqId=" + OoooQQ["join"](',') + QOoOOO;
        }
        _$td("#jump2feedback")["attr"]("href", oO0QQo["webview"] ? '#' : ooQOQO);
      }
    };
    var OoQoO0 = function () {
      if (QQoOQQ) {
        return;
      } else {
        setTimeout(ooQO0Q, 2000);
      }
    };
    var ooQO0Q = function () {
      var oQQ0Qo,
        QQoooQ,
        ooQOQO,
        QOoOOO = {};
      if (Oo0QOO && o00QQQ) {
        QoQ0o0["push"]([Qo0QOo, o00QQQ - Oo0QOO]);
        o00QQQ = 0;
        Oo0QOO = 0;
      }
      if (!QoQ0o0["length"]) {
        return;
      }
      for (oQQ0Qo in QoQ0o0) {
        QQoooQ = QoQ0o0[oQQ0Qo][0];
        ooQOQO = QoQ0o0[oQQ0Qo][1];
        if (!QOoOOO[QQoooQ]) {
          QOoOOO[QQoooQ] = [];
        }
        QOoOOO[QQoooQ]["push"](ooQOQO);
      }
      QoQ0o0 = [];
      var oQO0Q0 = window["_fmOpt"]["blackbox"] ? window["_fmOpt"]["blackbox"] : window["_fmOpt"]["getinfo"] && window["_fmOpt"]["getinfo"]() || '';
    };
    var OoO0Qo = function () {
      o00QQQ = new Date()["getTime"]();
    };
    var Q00QOQ = function (oQQ0Qo) {
      Qo0QOo = oQQ0Qo;
      if (oQQ0Qo === OO00O0["btnFail"] || oQQ0Qo === OO00O0["clickUpd"] || oQQ0Qo === OO00O0["slideUpd"] || oQQ0Qo === OO00O0["slideFail"] || oQQ0Qo === OO00O0["clickFail"] || oQQ0Qo === OO00O0["triggerCaptcha"]) {
        QQoOQQ = true;
      } else {
        QQoOQQ = false;
      }
    };
    var oo0Q0o = function (oQQ0Qo) {
      if (Oo0QOO && o00QQQ) {
        QoQ0o0["push"]([Qo0QOo, o00QQQ - Oo0QOO]);
        o00QQQ = 0;
      }
      if (oQQ0Qo) {
        Q00QOQ(oQQ0Qo);
      }
      Oo0QOO = new Date()["getTime"]();
    };
    var oQOoO0 = function (oQQ0Qo, QQoooQ) {
      return OQoQ0o(oQQ0Qo, QQoooQ);
    };
    var o00Oo0 = function (oQQ0Qo) {
      var QQoooQ = '';
      var ooQOQO = 1;
      while (ooQOQO) {
        switch (ooQOQO) {
          case (126 - 88) / 19:
            {
              ooQOQO = QOoOOO < oQQ0Qo["length"] ? 3 : 0;
              break;
            }
          case (118 - 50) / 17:
            {
              QOoOOO++;
              ooQOQO = 2;
              break;
            }
          case (94 - 87) / 7:
            {
              var QOoOOO = 0;
              ooQOQO = 2;
              break;
            }
          case (133 - 85) / 16:
            {
              var oQO0Q0 = oQQ0Qo["charCodeAt"](QOoOOO);
              if (oQO0Q0 < 128) {
                QQoooQ += String["fromCharCode"](oQO0Q0);
              } else if (oQO0Q0 > 127 && oQO0Q0 < 2048) {
                QQoooQ += String["fromCharCode"](oQO0Q0 >> 6 | 192);
                QQoooQ += String["fromCharCode"](oQO0Q0 & 63 | 128);
              } else {
                QQoooQ += String["fromCharCode"](oQO0Q0 >> 12 | 224);
                QQoooQ += String["fromCharCode"](oQO0Q0 >> 6 & 63 | 128);
                QQoooQ += String["fromCharCode"](oQO0Q0 & 63 | 128);
              }
              ooQOQO = 4;
              break;
            }
        }
      }
      return QQoooQ;
    };
    var Q0o0o0 = function (oQQ0Qo) {
      var QQoooQ = '',
        ooQOQO = '',
        QOoOOO,
        oQO0Q0;
      var OoOQ0O = 1;
      while (OoOQ0O) {
        switch (OoOQ0O) {
          case (104 - 60) / 11:
            {
              oQO0Q0++;
              OoOQ0O = 2;
              break;
            }
          case (99 - 63) / 18:
            {
              OoOQ0O = oQO0Q0 <= 3 ? 3 : 0;
              break;
            }
          case (69 - 61) / 8:
            {
              oQO0Q0 = 0;
              OoOQ0O = 2;
              break;
            }
          case (132 - 84) / 16:
            {
              QOoOOO = oQQ0Qo >>> oQO0Q0 * 8 & 255;
              ooQOQO = '0' + QOoOOO["toString"](16);
              QQoooQ = QQoooQ + ooQOQO["substr"](ooQOQO["length"] - 2, 2);
              OoOQ0O = 4;
              break;
            }
        }
      }
      return QQoooQ;
    };
    var oQOQoo = function (oQQ0Qo) {
      var QQoooQ = 1;
      while (QQoooQ) {
        switch (QQoooQ) {
          case (93 - 65) / 14:
            {
              var ooQOQO = (OOOQOQ + 1) * 16;
              var QOoOOO = Array(ooQOQO - 1);
              var oQO0Q0 = 0;
              var OoOQ0O = 0;
              QQoooQ = 3;
              break;
            }
          case (80 - 44) / 9:
            {
              QOoOOO[ooQOQO - 2] = ooQQ0Q << 3;
              QOoOOO[ooQOQO - 1] = ooQQ0Q >>> 29;
              return QOoOOO;
              QQoooQ = 0;
              break;
            }
          case (113 - 59) / 18:
            {
              while (OoOQ0O < ooQQ0Q) {
                oOOoQO = (OoOQ0O - OoOQ0O % 4) / 4;
                oQO0Q0 = OoOQ0O % 4 * 8;
                QOoOOO[oOOoQO] = QOoOOO[oOOoQO] | oQQ0Qo["charCodeAt"](OoOQ0O) << oQO0Q0;
                OoOQ0O++;
              }
              oOOoQO = (OoOQ0O - OoOQ0O % 4) / 4;
              oQO0Q0 = OoOQ0O % 4 * 8;
              QOoOOO[oOOoQO] = QOoOOO[oOOoQO] | 128 << oQO0Q0;
              QQoooQ = 4;
              break;
            }
          case (77 - 63) / 14:
            {
              var oOOoQO;
              var ooQQ0Q = oQQ0Qo["length"];
              var QOo0Oo = ooQQ0Q + 8;
              var OOOQOQ = (QOo0Oo - QOo0Oo % 64) / 64;
              QQoooQ = 2;
              break;
            }
        }
      }
    };
    var oOO0oo = function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0, OoOQ0O, oOOoQO) {
      oQQ0Qo = O0Oo0o(oQQ0Qo, O0Oo0o(O0Oo0o(Q0ooo0(QQoooQ, ooQOQO, QOoOOO), oQO0Q0), oOOoQO));
      return O0Oo0o(QQQoOQ(oQQ0Qo, OoOQ0O), QQoooQ);
    };
    var oOQoQo = function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0, OoOQ0O, oOOoQO) {
      oQQ0Qo = O0Oo0o(oQQ0Qo, O0Oo0o(O0Oo0o(o0ooo0(QQoooQ, ooQOQO, QOoOOO), oQO0Q0), oOOoQO));
      return O0Oo0o(QQQoOQ(oQQ0Qo, OoOQ0O), QQoooQ);
    };
    var O00Qoo = function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0, OoOQ0O, oOOoQO) {
      oQQ0Qo = O0Oo0o(oQQ0Qo, O0Oo0o(O0Oo0o(O0oOQ0(QQoooQ, ooQOQO, QOoOOO), oQO0Q0), oOOoQO));
      return O0Oo0o(QQQoOQ(oQQ0Qo, OoOQ0O), QQoooQ);
    };
    var OQ0Q0O = function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0, OoOQ0O, oOOoQO) {
      oQQ0Qo = O0Oo0o(oQQ0Qo, O0Oo0o(O0Oo0o(OO00oO(QQoooQ, ooQOQO, QOoOOO), oQO0Q0), oOOoQO));
      return O0Oo0o(QQQoOQ(oQQ0Qo, OoOQ0O), QQoooQ);
    };
    var Q0ooo0 = function (oQQ0Qo, QQoooQ, ooQOQO) {
      return QQoooQ ^ (oQQ0Qo | ~ooQOQO);
    };
    var o0ooo0 = function (oQQ0Qo, QQoooQ, ooQOQO) {
      return oQQ0Qo ^ QQoooQ ^ ooQOQO;
    };
    var O0oOQ0 = function (oQQ0Qo, QQoooQ, ooQOQO) {
      return oQQ0Qo & ooQOQO | QQoooQ & ~ooQOQO;
    };
    var OO00oO = function (oQQ0Qo, QQoooQ, ooQOQO) {
      return oQQ0Qo & QQoooQ | ~oQQ0Qo & ooQOQO;
    };
    var O0Oo0o = function (oQQ0Qo, QQoooQ) {
      var ooQOQO, QOoOOO, oQO0Q0, OoOQ0O, oOOoQO;
      oQO0Q0 = oQQ0Qo & 2147483648;
      OoOQ0O = QQoooQ & 2147483648;
      ooQOQO = oQQ0Qo & 1073741824;
      QOoOOO = QQoooQ & 1073741824;
      oOOoQO = (oQQ0Qo & 1073741823) + (QQoooQ & 1073741823);
      if (ooQOQO & QOoOOO) {
        return oOOoQO ^ 2147483648 ^ oQO0Q0 ^ OoOQ0O;
      }
      if (ooQOQO | QOoOOO) {
        if (oOOoQO & 1073741824) {
          return oOOoQO ^ 3221225472 ^ oQO0Q0 ^ OoOQ0O;
        } else {
          return oOOoQO ^ 1073741824 ^ oQO0Q0 ^ OoOQ0O;
        }
      } else {
        return oOOoQO ^ oQO0Q0 ^ OoOQ0O;
      }
    };
    var QQQoOQ = function (oQQ0Qo, QQoooQ) {
      return oQQ0Qo << QQoooQ | oQQ0Qo >>> 32 - QQoooQ;
    };
    var QOOO0O = function (oQQ0Qo) {
      var QQoooQ = 1;
      while (QQoooQ) {
        switch (QQoooQ) {
          case (132 - 76) / 14:
            {
              var ooQOQO = Q0o0o0(OO00QQ) + Q0o0o0(oooQoO) + Q0o0o0(o000oQ) + Q0o0o0(oQo0Qo);
              return ooQOQO;
              QQoooQ = 0;
              break;
            }
          case (143 - 86) / 19:
            {
              oooQoO = 4023233417;
              o000oQ = 2562383102;
              oQo0Qo = 271733878;
              var QOoOOO = 1;
              while (QOoOOO) {
                switch (QOoOOO) {
                  case (84 - 76) / 8:
                    {
                      Qoo0Q0 = 0;
                      QOoOOO = 2;
                      break;
                    }
                  case (116 - 86) / 15:
                    {
                      QOoOOO = Qoo0Q0 < QOQQO0["length"] ? 3 : 0;
                      break;
                    }
                  case (111 - 93) / 6:
                    {
                      QOQ0QQ = OO00QQ;
                      oOOOoo = oooQoO;
                      QoOO00 = o000oQ;
                      OO0OO0 = oQo0Qo;
                      OO00QQ = OQ0Q0O(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 0], o0OQ0o, 3614090360);
                      oQo0Qo = OQ0Q0O(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 1], oQoQoO, 3905402710);
                      o000oQ = OQ0Q0O(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 2], Q0QOOo, 606105819);
                      oooQoO = OQ0Q0O(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 3], oQOoQ0, 3250441966);
                      OO00QQ = OQ0Q0O(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 4], o0OQ0o, 4118548399);
                      oQo0Qo = OQ0Q0O(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 5], oQoQoO, 1200080426);
                      o000oQ = OQ0Q0O(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 6], Q0QOOo, 2821735955);
                      oooQoO = OQ0Q0O(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 7], oQOoQ0, 4249261313);
                      OO00QQ = OQ0Q0O(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 8], o0OQ0o, 1770035416);
                      oQo0Qo = OQ0Q0O(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 9], oQoQoO, 2336552879);
                      o000oQ = OQ0Q0O(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 10], Q0QOOo, 4294925233);
                      oooQoO = OQ0Q0O(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 11], oQOoQ0, 2304563134);
                      OO00QQ = OQ0Q0O(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 12], o0OQ0o, 1804603682);
                      oQo0Qo = OQ0Q0O(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 13], oQoQoO, 4254626195);
                      o000oQ = OQ0Q0O(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 14], Q0QOOo, 2792965006);
                      oooQoO = OQ0Q0O(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 15], oQOoQ0, 1236535329);
                      OO00QQ = O00Qoo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 1], o0OOOo, 4129170786);
                      oQo0Qo = O00Qoo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 6], oQooO0, 3225465664);
                      o000oQ = O00Qoo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 11], ooOQoo, 643717713);
                      oooQoO = O00Qoo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 0], O00oQQ, 3921069994);
                      OO00QQ = O00Qoo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 5], o0OOOo, 3593408605);
                      oQo0Qo = O00Qoo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 10], oQooO0, 38016083);
                      o000oQ = O00Qoo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 15], ooOQoo, 3634488961);
                      oooQoO = O00Qoo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 4], O00oQQ, 3889429448);
                      OO00QQ = O00Qoo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 9], o0OOOo, 568446438);
                      oQo0Qo = O00Qoo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 14], oQooO0, 3275163606);
                      o000oQ = O00Qoo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 3], ooOQoo, 4107603335);
                      oooQoO = O00Qoo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 8], O00oQQ, 1163531501);
                      OO00QQ = O00Qoo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 13], o0OOOo, 2850285829);
                      oQo0Qo = O00Qoo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 2], oQooO0, 4243563512);
                      o000oQ = O00Qoo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 7], ooOQoo, 1735328473);
                      oooQoO = O00Qoo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 12], O00oQQ, 2368359562);
                      OO00QQ = oOQoQo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 5], oQO0Q0, 4294588738);
                      oQo0Qo = oOQoQo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 8], OoOQ0O, 2272392833);
                      o000oQ = oOQoQo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 11], oOOoQO, 1839030562);
                      oooQoO = oOQoQo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 14], ooQQ0Q, 4259657740);
                      OO00QQ = oOQoQo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 1], oQO0Q0, 2763975236);
                      oQo0Qo = oOQoQo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 4], OoOQ0O, 1272893353);
                      o000oQ = oOQoQo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 7], oOOoQO, 4139469664);
                      oooQoO = oOQoQo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 10], ooQQ0Q, 3200236656);
                      OO00QQ = oOQoQo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 13], oQO0Q0, 681279174);
                      oQo0Qo = oOQoQo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 0], OoOQ0O, 3936430074);
                      o000oQ = oOQoQo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 3], oOOoQO, 3572445317);
                      oooQoO = oOQoQo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 6], ooQQ0Q, 76029189);
                      OO00QQ = oOQoQo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 9], oQO0Q0, 3654602809);
                      oQo0Qo = oOQoQo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 12], OoOQ0O, 3873151461);
                      o000oQ = oOQoQo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 15], oOOoQO, 530742520);
                      oooQoO = oOQoQo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 2], ooQQ0Q, 3299628645);
                      OO00QQ = oOO0oo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 0], QOo0Oo, 4096336452);
                      oQo0Qo = oOO0oo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 7], OOOQOQ, 1126891415);
                      o000oQ = oOO0oo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 14], QoQQo0, 2878612391);
                      oooQoO = oOO0oo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 5], QQQOQO, 4237533241);
                      OO00QQ = oOO0oo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 12], QOo0Oo, 1700485571);
                      oQo0Qo = oOO0oo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 3], OOOQOQ, 2399980690);
                      o000oQ = oOO0oo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 10], QoQQo0, 4293915773);
                      oooQoO = oOO0oo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 1], QQQOQO, 2240044497);
                      OO00QQ = oOO0oo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 8], QOo0Oo, 1873313359);
                      oQo0Qo = oOO0oo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 15], OOOQOQ, 4264355552);
                      o000oQ = oOO0oo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 6], QoQQo0, 2734768916);
                      oooQoO = oOO0oo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 13], QQQOQO, 1309151649);
                      OO00QQ = oOO0oo(OO00QQ, oooQoO, o000oQ, oQo0Qo, QOQQO0[Qoo0Q0 + 4], QOo0Oo, 4149444226);
                      oQo0Qo = oOO0oo(oQo0Qo, OO00QQ, oooQoO, o000oQ, QOQQO0[Qoo0Q0 + 11], OOOQOQ, 3174756917);
                      o000oQ = oOO0oo(o000oQ, oQo0Qo, OO00QQ, oooQoO, QOQQO0[Qoo0Q0 + 2], QoQQo0, 718787259);
                      oooQoO = oOO0oo(oooQoO, o000oQ, oQo0Qo, OO00QQ, QOQQO0[Qoo0Q0 + 9], QQQOQO, 3951481745);
                      OO00QQ = O0Oo0o(OO00QQ, QOQ0QQ);
                      oooQoO = O0Oo0o(oooQoO, oOOOoo);
                      o000oQ = O0Oo0o(o000oQ, QoOO00);
                      oQo0Qo = O0Oo0o(oQo0Qo, OO0OO0);
                      QOoOOO = 4;
                      break;
                    }
                  case (110 - 90) / 5:
                    {
                      Qoo0Q0 += 16;
                      QOoOOO = 2;
                      break;
                    }
                }
              }
              QQoooQ = 4;
              break;
            }
          case (126 - 98) / 14:
            {
              var oQO0Q0 = 4,
                OoOQ0O = 11,
                oOOoQO = 16,
                ooQQ0Q = 23;
              var QOo0Oo = 6,
                OOOQOQ = 10,
                QoQQo0 = 15,
                QQQOQO = 21;
              oQQ0Qo = o00Oo0(oQQ0Qo);
              QOQQO0 = oQOQoo(oQQ0Qo);
              OO00QQ = 1732584193;
              QQoooQ = 3;
              break;
            }
          case (116 - 97) / 19:
            {
              oOQoo0();
              var QOQQO0 = Array();
              var Qoo0Q0, QOQ0QQ, oOOOoo, QoOO00, OO0OO0, OO00QQ, oooQoO, o000oQ, oQo0Qo;
              var o0OQ0o = 7,
                oQoQoO = 12,
                Q0QOOo = 17,
                oQOoQ0 = 22;
              var o0OOOo = 5,
                oQooO0 = 9,
                ooOQoo = 14,
                O00oQQ = 20;
              QQoooQ = 2;
              break;
            }
        }
      }
    };
    var QQ00oQ = function () {
      return !!(typeof window !== "undefined" && ("ontouchstart" in window || window["DocumentTouch"] && typeof document !== "undefined" && document instanceof window["DocumentTouch"])) || !!(typeof navigator !== "undefined" && (navigator["maxTouchPoints"] || navigator["msMaxTouchPoints"]));
    };
    var oQ0oQ0 = function () {
      return window["PointerEvent"] !== OQOO0Q;
    };
    if (oO0QQo["closeIcon"] === OQOO0Q) {
      oO0QQo["closeIcon"] = 0;
    }
    if (oO0QQo["closeMask"] === OQOO0Q) {
      oO0QQo["closeMask"] = 0;
    }
    var QQ0ooO = function () {
      return arguments["callee"]["caller"]["toString"]()["length"];
    }();
    var Q0ooOo = function () {
      var oQQ0Qo = arguments["callee"]["caller"]["toString"]();
      return /\n/["test"](oQQ0Qo);
    }();
    var OOo0QO = function (oQQ0Qo) {
      var QQoooQ = navigator["userAgent"]["toLowerCase"]();
      var ooQOQO = QQoooQ["indexOf"]("msie") > -1;
      var QOoOOO;
      if (ooQOQO) {
        QOoOOO = QQoooQ["match"](/msie ([\d.]+)/)[1];
      }
      return ooQOQO && QOoOOO === oQQ0Qo;
    };
    var OoOoOO = function (oQQ0Qo) {
      if (!!window["ActiveXObject"] || "ActiveXObject" in window) {
        return true;
      }
      return false;
    };
    var oOQ0QQ = [{
      errorCode: "111",
      errorMsg: '前端没有网络'
    }, {
      errorCode: "112",
      errorMsg: '刷新太频繁'
    }, {
      errorCode: "113",
      errorMsg: '前端其他错误'
    }, {
      errorCode: "114",
      errorMsg: '验证码被关闭'
    }, {
      errorCode: "202",
      errorMsg: '验证成功'
    }];
    var Qo0oQQ = [{
      clickTitle: ['', '', '请按顺序点击图中文字', '请按顺序点击下图图标', '请按语序点击下图文字', '请转动立方体点击图片', '请转动立方体点击文字'],
      slideTitle: '请拖动下方滑块完成拼图',
      sliderTip: '请向右拖动滑块',
      refreshTip: '刷新',
      closeTip: '关闭',
      feedbackTip: '反馈',
      op2Much: '尝试过多',
      op2MuchTA: '尝试过多\uFF0C请重试',
      passTip: '验证通过',
      successTip: '验证成功',
      failTip: '验证失败\uFF0C请重试',
      verifyTip: '智能检测中',
      netTip: '网络不给力',
      limitTip: '系统繁忙\uFF0C请稍后再试',
      netTipTA: '网络错误\uFF0C请重试',
      slideTip: '请拖动滑块至缺口位置',
      btnClickTip: '点击完成验证',
      btnPlaceHolder: '请完成验证'
    }, {
      clickTitle: ['', '', 'Please select in order', 'Click icon below in order'],
      slideTitle: 'Drag the slider and complete puzzle',
      sliderTip: 'Slide to complete puzzle',
      refreshTip: "Refresh",
      closeTip: "Close",
      feedbackTip: "Feedback",
      op2Much: "Rest for a bit?",
      op2MuchTA: "Rest for a bit?",
      passTip: "Verification passed",
      successTip: "Verification success",
      failTip: 'Verification has failed.Try again',
      verifyTip: "Verifying",
      netTip: "Network error",
      netTipTA: 'Network error.Reload page please',
      limitTip: 'System busy, please try again later',
      slideTip: 'Please drag the slider to the notch',
      btnClickTip: "Click to verify",
      btnPlaceHolder: 'Complete the validation'
    }, {
      clickTitle: ['', '', '请按顺序点击图中文字', '順番にクリックしてください'],
      slideTitle: 'スライダーをドラッグしてパズルを完成させる',
      sliderTip: '完成パズルにスライド',
      refreshTip: '再開',
      closeTip: '閉じる',
      feedbackTip: 'フィードバック',
      op2Much: '暫くしてからまたお試しください',
      op2MuchTA: '少し休憩しますか\uFF1F',
      passTip: '認証通過',
      successTip: '認証成功',
      failTip: '検証が失敗したので',
      verifyTip: '認証中',
      netTip: 'ネットワークエラー',
      netTipTA: 'ネットワークエラー\u3002再読み込みページ',
      limitTip: 'システムが混雑していますので\u3001後でお試しください',
      slideTip: 'スライダーをノッチまでドラッグしてください',
      btnClickTip: '人間はここをクリック',
      btnPlaceHolder: '検証をご完成ください'
    }, {
      clickTitle: ['', '', '請按順序點擊圖中文字', '請按順序點擊下圖圖標', '請按語序點擊下圖文字'],
      slideTitle: '請拖動下方滑塊完成拼圖',
      sliderTip: '請向右拖動滑塊',
      refreshTip: '重載',
      closeTip: '關閉',
      feedbackTip: '反饋',
      op2Much: '嘗試過多',
      op2MuchTA: '嘗試過多\uFF0C請重試',
      passTip: '驗證通過',
      successTip: '驗證成功',
      failTip: '驗證失敗\uFF0C請重試',
      verifyTip: '智能驗證中',
      netTip: '網絡發生問題',
      limitTip: '系統繁忙\uFF0C請稍後再試',
      netTipTA: '網絡錯誤\uFF0C請重試',
      slideTip: '請拖動滑塊至缺口位置',
      btnClickTip: '點擊完成驗證',
      btnPlaceHolder: '請完成驗證'
    }, {
      clickTitle: ['', '', '请按顺序点击图中文字', '순서대로 클릭하십시오.'],
      slideTitle: '슬라이더를 드래그하여 퍼즐을 완성하십시오',
      sliderTip: '슬라이드를 완료하여 퍼즐',
      refreshTip: '새로 고침',
      closeTip: '닫기',
      feedbackTip: '피드백',
      op2Much: '시도 횟수가 너무 많습니다',
      op2MuchTA: '다시 시도하십시오.',
      passTip: '확인 통과',
      successTip: '성공',
      failTip: '인증에 실패했습니다.',
      verifyTip: '확인 과정에서',
      netTip: '네트워크 문제',
      limitTip: '현재 사용 중입니다. 나중에 다시 시도하십시오.',
      netTipTA: '다시 시도하십시오.',
      slideTip: '슬라이더를 노치로 드래그하십시오',
      btnClickTip: '여기를 클릭하십시오',
      btnPlaceHolder: '검증에 참여하십시오'
    }];
    "use strict";
    var OoQO00 = oO0QQo && oO0QQo["container"],
      Q0oQOO = Q0oOOo(OoQO00),
      QOO0oO = '.' + Q0oQOO,
      QoQOOO = "initial",
      o0QOQQ = false,
      O0Q0oQ = 0,
      QooOOO = 10,
      oO000O,
      OoQ0QQ,
      oQ0Q0O,
      Oo0QOO = 0,
      o00QQQ = 0,
      Qo0QOo = 0,
      QQoOQQ = false,
      QoQ0o0 = [],
      O00oOQ = oO0QQo["webview"] ? 10000 : 5000,
      Q0OoQQ = 1000 * 60 * 10,
      ooQooO = 10,
      OoOo0Q = 320,
      OoOOO0 = 180,
      o00oOo = 320,
      OQ0OO0 = 350,
      o0oQOo = 320,
      o00QOO = 380,
      Q0OoOQ = 42,
      Qo0O0o = 0,
      oOQQ00,
      o0QoOQ,
      QoO0Oo,
      Qo00oo = 1,
      O0OOOo = null,
      o0OQoQ = oO0QQo["cpHost"] || (oO0QQo["env"] != 0 ? 'https://sphinx.tongdun.net' : 'https://sphinxtest.tongdun.net'),
      Oo0OQo = o0OQoQ + '/sphinx/validatecode/v1',
      oOoOQO,
      Q0OOoO,
      oQOoQQ = oO0QQo["staticHost"] ? "https://" + oO0QQo["staticHost"] : oO0QQo["env"] != 0 ? 'https://static.tongdun.net' : 'https://statictest.tongdun.net',
      OQooOo = null,
      QOo0Qo = new Date()["getTime"](),
      o0OOOQ = QOo0Qo,
      oOoQQ0 = 'b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F',
      O00Ooo = [],
      O0OQ0o = {
        x: 0,
        y: 0
      },
      oOoQOQ = false,
      oQoOo0 = false,
      oO00QQ = false,
      oOQ0O0 = false,
      OQ0Q0o = false,
      o0OQ0O = false,
      QQOQo0 = window["devicePixelRatio"] ? Math["round"](window["devicePixelRatio"]) : 1,
      Q0Q000 = false,
      OOoOoQ = false,
      QOoQOO = false,
      Oo0OOo = 1,
      o00Ooo = oO0QQo["lang"] === 'en',
      oQQOOQ = 400,
      OO00O0 = {
        init: "init",
        btnSucc: "btnSucc",
        btnFail: "btnFail",
        slideSucc: "slideSucc",
        slideFrontFail: "slideFrontFail",
        slideFail: "slideFail",
        clickSucc: "clickSucc",
        clickFail: "clickFail",
        slideUpd: "slideUpd",
        clickUpd: "clickUpd",
        freqClose: "freqClose",
        triggerCaptcha: "triggerCaptcha"
      },
      QQQQoQ = OOo0QO("8.0"),
      o0Oo0O = OOo0QO("9.0"),
      OOOOQ0 = 'http://static.tongdun.net/captcha/test/index.html',
      OQQQOQ = 'https://static.tongdun.net/captcha/assets/loading.gif',
      OoooQQ = [],
      O0OOO0 = null,
      oOoOoQ = null,
      oQoQOo = 0,
      O0OQ00 = [["pointerdown", "pointermove", "pointerup", "pointerleave"], ["touchstart", "touchmove", "touchend", "touchleave"], ["mousedown", "mousemove", "mouseup", "mouseleave"], ["MSPointerDown", "MSPointerMove", "MSPointerUp", "MSPointerLeave"]];
    oO0QQo["token"] = window["_fmOpt"]["partner"] + '-' + new Date()["getTime"]() + '-' + Math["random"]()["toString"](16)["substr"](2);
    oO0QQo["bind"] = oO0QQo["display"] === "bind";
    var OOO00Q = "?partnerCode=" + window["_fmOpt"]["partner"] + "&appName=" + window["_fmOpt"]["appName"] + "&sessionId=" + window["_fmOpt"]["token"];
    oOoOQO = o0OQoQ + "/sphinx/captcha/v1" + OOO00Q;
    Q0OOoO = o0OQoQ + "/sphinx/loadcount/v1" + OOO00Q;
    var QQ0OoQ = {
      navigatorTo: 'https://sec.xiaodun.com/'
    };
    QOo0Oo();
    var QQQ0oQ = '';
    if (oO0QQo["webview"]) {
      QQQOoo();
      if (Number(oO0QQo["lang"]) > -1) {
        oO0QQo["lang"] = o0OQ00(oO0QQo["lang"], oO0QQo["validateCodeObj"]);
      }
    }
    QQQ0oQ = O0QoOQ(Qo0oQQ, oO0QQo["lang"]);
    var o0QOOO = function () {
      var oQQ0Qo = navigator["userAgent"] && navigator["userAgent"]["toLowerCase"]()["replace"](/[ ]/g, '');
      if (!oQQ0Qo) {
        return false;
      }
      var QQoooQ = oQQ0Qo["match"](/(iphone|ipod|ipad|android|windows phone|SymbianOS)/);
      if (oQQ0Qo["indexOf"]("msie9") !== -1) {
        OQ0Q0o = true;
      } else if (oQQ0Qo["indexOf"]("msie10") !== -1) {
        OQ0Q0o = true;
      } else if (oQQ0Qo["indexOf"]("msie8") !== -1) {
        OQ0Q0o = true;
      } else if (oQQ0Qo["indexOf"]("msie7") !== -1) {
        OQ0Q0o = true;
      }
      if (oQQ0Qo["indexOf"]("android4") !== -1 || oQQ0Qo["indexOf"]("android3") !== -1) {
        OQ0Q0o = true;
      }
      if (oQQ0Qo["indexOf"]("android") !== -1) {
        oO00QQ = true;
      }
      if (oQQ0Qo["indexOf"]("nexus") !== -1) {
        OQ0Q0o = true;
      }
      if (OQ0Q0o) {
        QQOQo0 = 1;
      }
      o0OQ0O = !_$td["support"]["cors"];
      oQoOo0 = oO0QQo["webview"] || !!QQoooQ;
      O00oOQ = oQoOo0 ? 10000 : 5000;
    }();
    var oQOQoQ = window["navigator"]["userAgent"];
    if (oO0QQo["webview"]) {
      if ((oQOQoQ["indexOf"]("Macintosh") > -1 || oQOQoQ["indexOf"]("Mac OS") > -1 || oQOQoQ["indexOf"]("WindowsWechat") > -1) && oQOQoQ["indexOf"]("iPhone") == -1) {
        oQoOo0 = false;
        oOQ0O0 = true;
      }
    }
    if (oQoOo0) {
      oQoQOo = 1;
    } else {
      var Qo00Qo = navigator["userAgent"] && navigator["userAgent"]["toLowerCase"]()["replace"](/[ ]/g, '');
      if (oQ0oQ0()) {
        oQoQOo = 0;
      } else if (QQ00oQ()) {
        if (Qo00Qo && Qo00Qo["indexOf"]("msie10") !== -1) {
          oQoQOo = 3;
        } else {
          oQoQOo = 1;
        }
      } else {
        oQoQOo = 2;
      }
    }
    var OQoQ0o = function (oQQ0Qo, QQoooQ) {
      oOQoo0();
      var OOo0OQ = OOo0OQ || function (QOQ0Qo, OQOO0Q) {
        var ooQOQO = {};
        var QOoOOO = ooQOQO.lib = {};
        var ooooOO = QOoOOO.Base = function () {
          function OO00oO() {}
          return {
            tp: function (oQQ0Qo) {
              OO00oO.prototype = this;
              var oOoQO0 = new OO00oO();
              if (oQQ0Qo) {
                oOoQO0.Gv(oQQ0Qo);
              }
              if (!oOoQO0.hasOwnProperty('fE')) {
                oOoQO0.fE = function () {
                  oOoQO0.$super.fE.apply(this, arguments);
                };
              }
              oOoQO0.fE.prototype = oOoQO0;
              oOoQO0.$super = this;
              return oOoQO0;
            },
            xA: function () {
              var oQQ0Qo = this.tp();
              oQQ0Qo.fE.apply(oQQ0Qo, arguments);
              return oQQ0Qo;
            },
            fE: function () {},
            Gv: function (oQQ0Qo) {
              for (var QQoooQ in oQQ0Qo) {
                if (oQQ0Qo.hasOwnProperty(QQoooQ)) {
                  this[QQoooQ] = oQQ0Qo[QQoooQ];
                }
              }
              if (oQQ0Qo.hasOwnProperty("toString")) {
                this.fF = oQQ0Qo.fF;
              }
            },
            yH: function () {
              return this.fE.prototype.tp(this);
            }
          };
        }();
        var QOoOQO = QOoOOO.WordArray = ooooOO.tp({
          fE: function (oQQ0Qo, QQoooQ) {
            oQQ0Qo = this.words = oQQ0Qo || [];
            if (QQoooQ != OQOO0Q) {
              this.sigBytes = QQoooQ;
            } else {
              this.sigBytes = oQQ0Qo.length * 4;
            }
          },
          fF: function (oQQ0Qo) {
            return (oQQ0Qo || Qoo0QO).fe(this);
          },
          Fj: function (oQQ0Qo) {
            var QQoooQ = this.words;
            var ooQOQO = oQQ0Qo.words;
            var QOoOOO = this.sigBytes;
            var oQO0Q0 = oQQ0Qo.sigBytes;
            this.mb();
            if (QOoOOO % 4) {
              for (var OoOQ0O = 0; OoOQ0O < oQO0Q0; OoOQ0O++) {
                var oOOoQO = ooQOQO[OoOQ0O >>> 2] >>> 24 - OoOQ0O % 4 * 8 & 255;
                QQoooQ[QOoOOO + OoOQ0O >>> 2] |= oOOoQO << 24 - (QOoOOO + OoOQ0O) % 4 * 8;
              }
            } else {
              for (var OoOQ0O = 0; OoOQ0O < oQO0Q0; OoOQ0O += 4) {
                QQoooQ[QOoOOO + OoOQ0O >>> 2] = ooQOQO[OoOQ0O >>> 2];
              }
            }
            this.sigBytes += oQO0Q0;
            return this;
          },
          mb: function () {
            var oQQ0Qo = this.words;
            var QQoooQ = this.sigBytes;
            oQQ0Qo[QQoooQ >>> 2] &= 4294967295 << 32 - QQoooQ % 4 * 8;
            oQQ0Qo.length = QOQ0Qo.ceil(QQoooQ / 4);
          },
          yH: function () {
            var oQQ0Qo = ooooOO.yH.call(this);
            oQQ0Qo.words = this.words.slice(0);
            return oQQ0Qo;
          },
          Bu: function (oQQ0Qo) {
            var QQoooQ = [];
            var ooQOQO = function (oOoQoQ) {
              var oOoQoQ = oOoQoQ;
              var QooOoO = 987654321;
              var OoO00O = 4294967295;
              return function () {
                QooOoO = 36969 * (QooOoO & 65535) + (QooOoO >> 16) & OoO00O;
                oOoQoQ = 18000 * (oOoQoQ & 65535) + (oOoQoQ >> 16) & OoO00O;
                var oQQ0Qo = (QooOoO << 16) + oOoQoQ & OoO00O;
                oQQ0Qo /= 4294967296;
                oQQ0Qo += 0.5;
                return oQQ0Qo * (QOQ0Qo.Bu() > 0.5 ? 1 : -1);
              };
            };
            for (var QOoOOO = 0, oQO0Q0; QOoOOO < oQQ0Qo; QOoOOO += 4) {
              var OoOQ0O = ooQOQO((oQO0Q0 || QOQ0Qo.Bu()) * 4294967296);
              oQO0Q0 = OoOQ0O() * 987654071;
              QQoooQ.push(OoOQ0O() * 4294967296 | 0);
            }
            return new QOoOQO.fE(QQoooQ, oQQ0Qo);
          }
        });
        var oOOoQO = ooQOQO.enc = {};
        var Qoo0QO = oOOoQO.Hex = {
          fe: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.words;
            var ooQOQO = oQQ0Qo.sigBytes;
            var QOoOOO = [];
            for (var oQO0Q0 = 0; oQO0Q0 < ooQOQO; oQO0Q0++) {
              var OoOQ0O = QQoooQ[oQO0Q0 >>> 2] >>> 24 - oQO0Q0 % 4 * 8 & 255;
              QOoOOO.push((OoOQ0O >>> 4).fF(16));
              QOoOOO.push((OoOQ0O & 15).fF(16));
            }
            return QOoOOO.join('');
          },
          ty: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.length;
            var ooQOQO = [];
            for (var QOoOOO = 0; QOoOOO < QQoooQ; QOoOOO += 2) {
              ooQOQO[QOoOOO >>> 3] |= parseInt(oQQ0Qo.substr(QOoOOO, 2), 16) << 24 - QOoOOO % 8 * 4;
            }
            return new QOoOQO.fE(ooQOQO, QQoooQ / 2);
          }
        };
        var QooooQ = oOOoQO.Latin1 = {
          fe: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.words;
            var ooQOQO = oQQ0Qo.sigBytes;
            var QOoOOO = [];
            for (var oQO0Q0 = 0; oQO0Q0 < ooQOQO; oQO0Q0++) {
              var OoOQ0O = QQoooQ[oQO0Q0 >>> 2] >>> 24 - oQO0Q0 % 4 * 8 & 255;
              QOoOOO.push(String.fromCharCode(OoOQ0O));
            }
            return QOoOOO.join('');
          },
          ty: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.length;
            var ooQOQO = [];
            for (var QOoOOO = 0; QOoOOO < QQoooQ; QOoOOO++) {
              ooQOQO[QOoOOO >>> 2] |= (oQQ0Qo.charCodeAt(QOoOOO) & 255) << 24 - QOoOOO % 4 * 8;
            }
            return new QOoOQO.fE(ooQOQO, QQoooQ);
          }
        };
        var QO0Qo0 = oOOoQO.Utf8 = {
          fe: function (oQQ0Qo) {
            try {
              return decodeURIComponent(escape(QooooQ.fe(oQQ0Qo)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          ty: function (oQQ0Qo) {
            return QooooQ.ty(unescape(encodeURIComponent(oQQ0Qo)));
          }
        };
        var OOOOQo = QOoOOO.BufferedBlockAlgorithm = ooooOO.tp({
          gK: function () {
            this._data = new QOoOQO.fE();
            this._nDataBytes = 0;
          },
          KF: function (oQQ0Qo) {
            if (typeof oQQ0Qo == "string") {
              oQQ0Qo = QO0Qo0.ty(oQQ0Qo);
            }
            this._data.Fj(oQQ0Qo);
            this._nDataBytes += oQQ0Qo.sigBytes;
          },
          Pu: function (oQQ0Qo) {
            var QQoooQ = this._data;
            var ooQOQO = QQoooQ.words;
            var QOoOOO = QQoooQ.sigBytes;
            var oQO0Q0 = this.Lr;
            var OoOQ0O = oQO0Q0 * 4;
            var oOOoQO = QOoOOO / OoOQ0O;
            if (oQQ0Qo) {
              oOOoQO = QOQ0Qo.ceil(oOOoQO);
            } else {
              oOOoQO = QOQ0Qo.max((oOOoQO | 0) - this.eL, 0);
            }
            var ooQQ0Q = oOOoQO * oQO0Q0;
            var QOo0Oo = QOQ0Qo.min(ooQQ0Q * 4, QOoOOO);
            if (ooQQ0Q) {
              for (var OOOQOQ = 0; OOOQOQ < ooQQ0Q; OOOQOQ += oQO0Q0) {
                this.zH(ooQOQO, OOOQOQ);
              }
              var QoQQo0 = ooQOQO.splice(0, ooQQ0Q);
              QQoooQ.sigBytes -= QOo0Oo;
            }
            return new QOoOQO.fE(QoQQo0, QOo0Oo);
          },
          yH: function () {
            var oQQ0Qo = ooooOO.yH.call(this);
            oQQ0Qo._data = this._data.yH();
            return oQQ0Qo;
          },
          eL: 0
        });
        var QQQOQO = QOoOOO.Hasher = OOOOQo.tp({
          uu: ooooOO.tp(),
          fE: function (oQQ0Qo) {
            this.uu = this.uu.tp(oQQ0Qo);
            this.gK();
          },
          gK: function () {
            OOOOQo.gK.call(this);
            this.fP();
          },
          Hu: function (oQQ0Qo) {
            this.KF(oQQ0Qo);
            this.Pu();
            return this;
          },
          ds: function (oQQ0Qo) {
            if (oQQ0Qo) {
              this.KF(oQQ0Qo);
            }
            var QQoooQ = this.fz();
            return QQoooQ;
          },
          Lr: 512 / 32,
          tq: function (OQ0OQ0) {
            return function (oQQ0Qo, QQoooQ) {
              return new OQ0OQ0.fE(QQoooQ).ds(oQQ0Qo);
            };
          },
          Jf: function (OQ0OQ0) {
            return function (oQQ0Qo, QQoooQ) {
              return new OQ0O00.HMAC.fE(OQ0OQ0, QQoooQ).ds(oQQ0Qo);
            };
          }
        });
        var OQ0O00 = ooQOQO.algo = {};
        return ooQOQO;
      }(Math);
      (function () {
        var oQQ0Qo = OOo0OQ;
        var QQoooQ = oQQ0Qo.lib;
        var QOoOQO = QQoooQ.WordArray;
        var QOoOOO = oQQ0Qo.enc;
        var oQO0Q0 = QOoOOO.Base64 = {
          fe: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.words;
            var ooQOQO = oQQ0Qo.sigBytes;
            var QOoOOO = this.Ky;
            oQQ0Qo.mb();
            var oQO0Q0 = [];
            for (var OoOQ0O = 0; OoOQ0O < ooQOQO; OoOQ0O += 3) {
              var oOOoQO = QQoooQ[OoOQ0O >>> 2] >>> 24 - OoOQ0O % 4 * 8 & 255;
              var ooQQ0Q = QQoooQ[OoOQ0O + 1 >>> 2] >>> 24 - (OoOQ0O + 1) % 4 * 8 & 255;
              var QOo0Oo = QQoooQ[OoOQ0O + 2 >>> 2] >>> 24 - (OoOQ0O + 2) % 4 * 8 & 255;
              var OOOQOQ = oOOoQO << 16 | ooQQ0Q << 8 | QOo0Oo;
              for (var QoQQo0 = 0; QoQQo0 < 4 && OoOQ0O + QoQQo0 * 0.75 < ooQOQO; QoQQo0++) {
                oQO0Q0.push(QOoOOO.charAt(OOOQOQ >>> 6 * (3 - QoQQo0) & 63));
              }
            }
            var QQQOQO = QOoOOO.charAt(64);
            if (QQQOQO) {
              while (oQO0Q0.length % 4) {
                oQO0Q0.push(QQQOQO);
              }
            }
            return oQO0Q0.join('');
          },
          ty: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.length;
            var ooQOQO = this.Ky;
            var QOoOOO = ooQOQO.charAt(64);
            if (QOoOOO) {
              var oQO0Q0 = oQQ0Qo.indexOf(QOoOOO);
              if (oQO0Q0 != -1) {
                QQoooQ = oQO0Q0;
              }
            }
            var OoOQ0O = [];
            var oOOoQO = 0;
            for (var ooQQ0Q = 0; ooQQ0Q < QQoooQ; ooQQ0Q++) {
              if (ooQQ0Q % 4) {
                var QOo0Oo = ooQOQO.indexOf(oQQ0Qo.charAt(ooQQ0Q - 1)) << ooQQ0Q % 4 * 2;
                var OOOQOQ = ooQOQO.indexOf(oQQ0Qo.charAt(ooQQ0Q)) >>> 6 - ooQQ0Q % 4 * 2;
                var QoQQo0 = QOo0Oo | OOOQOQ;
                OoOQ0O[oOOoQO >>> 2] |= QoQQo0 << 24 - oOOoQO % 4 * 8;
                oOOoQO++;
              }
            }
            return QOoOQO.xA(OoOQ0O, oOOoQO);
          },
          Ky: 'abcdefghijklmnoqprstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789' + '~' + '/='
        };
      })();
      OOo0OQ.lib.Cipher || function (OQOO0Q) {
        var QQoooQ = OOo0OQ;
        var ooQOQO = QQoooQ.lib;
        var QOoOOO = ooQOQO.Base;
        var QOoOQO = ooQOQO.WordArray;
        var OOOOQo = ooQOQO.BufferedBlockAlgorithm;
        var oOOoQO = QQoooQ.enc;
        var ooQQ0Q = oOOoQO.Utf8;
        var OOoo0Q = oOOoQO.Base64;
        var OOOQOQ = QQoooQ.algo;
        var O0O0o0 = OOOQOQ.EvpKDF;
        var oOOoQo = ooQOQO.Cipher = OOOOQo.tp({
          uu: QOoOOO.tp(),
          Jr: function (oQQ0Qo, QQoooQ) {
            return this.xA(this.Gj, oQQ0Qo, QQoooQ);
          },
          ch: function (oQQ0Qo, QQoooQ) {
            return this.xA(this.zm, oQQ0Qo, QQoooQ);
          },
          fE: function (oQQ0Qo, QQoooQ, ooQOQO) {
            this.uu = this.uu.tp(ooQOQO);
            this._xformMode = oQQ0Qo;
            this._key = QQoooQ;
            this.gK();
          },
          gK: function () {
            OOOOQo.gK.call(this);
            this.fP();
          },
          ux: function (oQQ0Qo) {
            this.KF(oQQ0Qo);
            return this.Pu();
          },
          ds: function (oQQ0Qo) {
            if (oQQ0Qo) {
              this.KF(oQQ0Qo);
            }
            var QQoooQ = this.fz();
            return QQoooQ;
          },
          Jv: 128 / 32,
          lk: 128 / 32,
          Gj: 1,
          zm: 2,
          tq: function () {
            function QoOOOo(oQQ0Qo) {
              if (typeof oQQ0Qo == "string") {
                return oOQQ0o;
              } else {
                return OQoo0o;
              }
            }
            return function (oQO0OQ) {
              return {
                jq: function (oQQ0Qo, QQoooQ, ooQOQO) {
                  return QoOOOo(QQoooQ).jq(oQO0OQ, oQQ0Qo, QQoooQ, ooQOQO);
                },
                qm: function (oQQ0Qo, QQoooQ, ooQOQO) {
                  return QoOOOo(QQoooQ).qm(oQO0OQ, oQQ0Qo, QQoooQ, ooQOQO);
                }
              };
            };
          }()
        });
        var QOQQO0 = ooQOQO.StreamCipher = oOOoQo.tp({
          fz: function () {
            var oQQ0Qo = this.Pu(!!"flush");
            return oQQ0Qo;
          },
          Lr: 1
        });
        var Qoo0Q0 = QQoooQ.ed = {};
        var ooQ00Q = ooQOQO.BlockCipherMode = QOoOOO.tp({
          Jr: function (oQQ0Qo, QQoooQ) {
            return this.Encryptor.xA(oQQ0Qo, QQoooQ);
          },
          ch: function (oQQ0Qo, QQoooQ) {
            return this.Decryptor.xA(oQQ0Qo, QQoooQ);
          },
          fE: function (oQQ0Qo, QQoooQ) {
            this._cipher = oQQ0Qo;
            this._iv = QQoooQ;
          }
        });
        var oOOOoo = Qoo0Q0.PD = function () {
          var oQQ0Qo = ooQ00Q.tp();
          oQQ0Qo.Encryptor = oQQ0Qo.tp({
            yr: function (oQQ0Qo, QQoooQ) {
              var ooQOQO = this._cipher;
              var QOoOOO = ooQOQO.Lr;
              oQo0OQ.call(this, oQQ0Qo, QQoooQ, QOoOOO);
              ooQOQO.Bc(oQQ0Qo, QQoooQ);
              this._prevBlock = oQQ0Qo.slice(QQoooQ, QQoooQ + QOoOOO);
            }
          });
          oQQ0Qo.Decryptor = oQQ0Qo.tp({
            yr: function (oQQ0Qo, QQoooQ) {
              var ooQOQO = this._cipher;
              var QOoOOO = ooQOQO.Lr;
              var oQO0Q0 = oQQ0Qo.slice(QQoooQ, QQoooQ + QOoOOO);
              ooQOQO.hx(oQQ0Qo, QQoooQ);
              oQo0OQ.call(this, oQQ0Qo, QQoooQ, QOoOOO);
              this._prevBlock = oQO0Q0;
            }
          });
          return oQQ0Qo;
        }();
        var QoOO00 = QQoooQ.mP = {};
        var OO0OO0 = QoOO00.lJ = {
          mP: function (oQQ0Qo, QQoooQ) {
            var ooQOQO = QQoooQ * 4;
            var QOoOOO = ooQOQO - oQQ0Qo.sigBytes % ooQOQO;
            var oQO0Q0 = QOoOOO << 24 | QOoOOO << 16 | QOoOOO << 8 | QOoOOO;
            var OoOQ0O = [];
            for (var oOOoQO = 0; oOOoQO < QOoOOO; oOOoQO += 4) {
              OoOQ0O.push(oQO0Q0);
            }
            var ooQQ0Q = QOoOQO.xA(OoOQ0O, QOoOOO);
            oQQ0Qo.Fj(ooQQ0Q);
          },
          xq: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.words[oQQ0Qo.sigBytes - 1 >>> 2] & 255;
            oQQ0Qo.sigBytes -= QQoooQ;
          }
        };
        var OO00QQ = ooQOQO.BlockCipher = oOOoQo.tp({
          uu: oOOoQo.uu.tp({
            ed: oOOOoo,
            HL: OO0OO0
          }),
          gK: function () {
            oOOoQo.gK.call(this);
            var oQQ0Qo = this.uu;
            var QQoooQ = oQQ0Qo.jh;
            var ooQOQO = oQQ0Qo.ed;
            if (this._xformMode == this.Gj) {
              var QOoOOO = ooQOQO.Jr;
            } else {
              var QOoOOO = ooQOQO.ch;
              this.eL = 1;
            }
            this._mode = QOoOOO.call(ooQOQO, this, QQoooQ && QQoooQ.words);
          },
          zH: function (oQQ0Qo, QQoooQ) {
            this._mode.yr(oQQ0Qo, QQoooQ);
          },
          fz: function () {
            var oQQ0Qo = this.uu.HL;
            if (this._xformMode == this.Gj) {
              oQQ0Qo.mP(this._data, this.Lr);
              var QQoooQ = this.Pu(!!"flush");
            } else {
              var QQoooQ = this.Pu(!!"flush");
              oQQ0Qo.xq(QQoooQ);
            }
            return QQoooQ;
          },
          Lr: 128 / 32
        });
        var OOQOOQ = ooQOQO.CipherParams = QOoOOO.tp({
          fE: function (oQQ0Qo) {
            this.Gv(oQQ0Qo);
          },
          fF: function (oQQ0Qo) {
            return (oQQ0Qo || this.yD).fe(this);
          }
        });
        var o000oQ = QQoooQ.yJ = {};
        var oQo0Qo = o000oQ.OpenSSL = {
          fe: function (oQQ0Qo) {
            var QQoooQ = oQQ0Qo.lm;
            var ooQOQO = oQQ0Qo.MB;
            if (ooQOQO) {
              var QOoOOO = QOoOQO.xA([1398893684, 1701076831]).Fj(ooQOQO).Fj(QQoooQ);
            } else {
              var QOoOOO = QQoooQ;
            }
            return QOoOOO.fF(OOoo0Q);
          },
          ty: function (oQQ0Qo) {
            var QQoooQ = OOoo0Q.ty(oQQ0Qo);
            var ooQOQO = QQoooQ.words;
            if (ooQOQO[0] == 1398893684 && ooQOQO[1] == 1701076831) {
              var QOoOOO = QOoOQO.xA(ooQOQO.slice(2, 4));
              ooQOQO.splice(0, 4);
              QQoooQ.sigBytes -= 16;
            }
            return OOQOOQ.xA({
              lm: QQoooQ,
              MB: QOoOOO
            });
          }
        };
        var OQoo0o = ooQOQO.SerializableCipher = QOoOOO.tp({
          uu: QOoOOO.tp({
            yJ: oQo0Qo
          }),
          jq: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO) {
            QOoOOO = this.uu.tp(QOoOOO);
            var oQO0Q0 = oQQ0Qo.Jr(ooQOQO, QOoOOO);
            var OoOQ0O = oQO0Q0.ds(QQoooQ);
            var oOOoQO = oQO0Q0.uu;
            return OOQOOQ.xA({
              lm: OoOQ0O,
              fG: ooQOQO,
              jh: oOOoQO.jh,
              sf: oQQ0Qo,
              ed: oOOoQO.ed,
              HL: oOOoQO.HL,
              Lr: oQQ0Qo.Lr,
              yD: QOoOOO.yJ
            });
          },
          qm: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO) {
            QOoOOO = this.uu.tp(QOoOOO);
            QQoooQ = this.bq(QQoooQ, QOoOOO.yJ);
            var oQO0Q0 = oQQ0Qo.ch(ooQOQO, QOoOOO).ds(QQoooQ.lm);
            return oQO0Q0;
          },
          bq: function (oQQ0Qo, QQoooQ) {
            if (typeof oQQ0Qo == "string") {
              return QQoooQ.ty(oQQ0Qo, this);
            } else {
              return oQQ0Qo;
            }
          }
        });
        var oQoQoO = QQoooQ.CE = {};
        var Q0QOOo = oQoQoO.OpenSSL = {
          gu: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO) {
            if (!QOoOOO) {
              QOoOOO = QOoOQO.Bu(64 / 8);
            }
            var oQO0Q0 = O0O0o0.xA({
              Jv: QQoooQ + ooQOQO
            }).compute(oQQ0Qo, QOoOOO);
            var OoOQ0O = QOoOQO.xA(oQO0Q0.words.slice(QQoooQ), ooQOQO * 4);
            oQO0Q0.sigBytes = QQoooQ * 4;
            return OOQOOQ.xA({
              fG: oQO0Q0,
              jh: OoOQ0O,
              MB: QOoOOO
            });
          }
        };
        var oOQQ0o = ooQOQO.PasswordBasedCipher = OQoo0o.tp({
          uu: OQoo0o.uu.tp({
            CE: Q0QOOo
          }),
          jq: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO) {
            QOoOOO = this.uu.tp(QOoOOO);
            var oQO0Q0 = QOoOOO.CE.gu(ooQOQO, oQQ0Qo.Jv, oQQ0Qo.lk);
            QOoOOO.jh = oQO0Q0.jh;
            var OoOQ0O = OQoo0o.jq.call(this, oQQ0Qo, QQoooQ, oQO0Q0.fG, QOoOOO);
            OoOQ0O.Gv(oQO0Q0);
            return OoOQ0O;
          },
          qm: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO) {
            QOoOOO = this.uu.tp(QOoOOO);
            QQoooQ = this.bq(QQoooQ, QOoOOO.yJ);
            var oQO0Q0 = QOoOOO.CE.gu(ooQOQO, oQQ0Qo.Jv, oQQ0Qo.lk, QQoooQ.MB);
            QOoOOO.jh = oQO0Q0.jh;
            var OoOQ0O = OQoo0o.qm.call(this, oQQ0Qo, QQoooQ, oQO0Q0.fG, QOoOOO);
            return OoOQ0O;
          }
        });
      }();
      OOo0OQ.ed.CFB = function () {
        var oQQ0Qo = OOo0OQ.lib.BlockCipherMode.tp();
        oQQ0Qo.Encryptor = oQQ0Qo.tp({
          yr: function (oQQ0Qo, QQoooQ) {
            var ooQOQO = this._cipher;
            var QOoOOO = ooQOQO.Lr;
            oQOQOQ.call(this, oQQ0Qo, QQoooQ, QOoOOO, ooQOQO);
            this._prevBlock = oQQ0Qo.slice(QQoooQ, QQoooQ + QOoOOO);
          }
        });
        oQQ0Qo.Decryptor = oQQ0Qo.tp({
          yr: function (oQQ0Qo, QQoooQ) {
            var ooQOQO = this._cipher;
            var QOoOOO = ooQOQO.Lr;
            var oQO0Q0 = oQQ0Qo.slice(QQoooQ, QQoooQ + QOoOOO);
            oQOQOQ.call(this, oQQ0Qo, QQoooQ, QOoOOO, ooQOQO);
            this._prevBlock = oQO0Q0;
          }
        });
        return oQQ0Qo;
      }();
      OOo0OQ.ed.ECB = function () {
        var oQQ0Qo = OOo0OQ.lib.BlockCipherMode.tp();
        oQQ0Qo.Encryptor = oQQ0Qo.tp({
          yr: function (oQQ0Qo, QQoooQ) {
            this._cipher.Bc(oQQ0Qo, QQoooQ);
          }
        });
        oQQ0Qo.Decryptor = oQQ0Qo.tp({
          yr: function (oQQ0Qo, QQoooQ) {
            this._cipher.hx(oQQ0Qo, QQoooQ);
          }
        });
        return oQQ0Qo;
      }();
      OOo0OQ.mP.AnsiX923 = {
        mP: function (oQQ0Qo, QQoooQ) {
          var ooQOQO = oQQ0Qo.sigBytes;
          var QOoOOO = QQoooQ * 4;
          var oQO0Q0 = QOoOOO - ooQOQO % QOoOOO;
          var OoOQ0O = ooQOQO + oQO0Q0 - 1;
          oQQ0Qo.mb();
          oQQ0Qo.words[OoOQ0O >>> 2] |= oQO0Q0 << 24 - OoOQ0O % 4 * 8;
          oQQ0Qo.sigBytes += oQO0Q0;
        },
        xq: function (oQQ0Qo) {
          var QQoooQ = oQQ0Qo.words[oQQ0Qo.sigBytes - 1 >>> 2] & 255;
          oQQ0Qo.sigBytes -= QQoooQ;
        }
      };
      OOo0OQ.ed.OFB = function () {
        var oQQ0Qo = OOo0OQ.lib.BlockCipherMode.tp();
        var QQoooQ = oQQ0Qo.Encryptor = oQQ0Qo.tp({
          yr: function (oQQ0Qo, QQoooQ) {
            var ooQOQO = this._cipher;
            var QOoOOO = ooQOQO.Lr;
            var oQO0Q0 = this._iv;
            var OoOQ0O = this._keystream;
            if (oQO0Q0) {
              OoOQ0O = this._keystream = oQO0Q0.slice(0);
              this._iv = OQOO0Q;
            }
            ooQOQO.Bc(OoOQ0O, 0);
            for (var oOOoQO = 0; oOOoQO < QOoOOO; oOOoQO++) {
              oQQ0Qo[QQoooQ + oOOoQO] ^= OoOQ0O[oOOoQO];
            }
          }
        });
        oQQ0Qo.Decryptor = QQoooQ;
        return oQQ0Qo;
      }();
      OOo0OQ.mP.NoPadding = {
        mP: function () {},
        xq: function () {}
      };
      OOo0OQ.mP.ZeroPadding = {
        mP: function (oQQ0Qo, QQoooQ) {
          var ooQOQO = QQoooQ * 4;
          oQQ0Qo.mb();
          oQQ0Qo.sigBytes += ooQOQO - (oQQ0Qo.sigBytes % ooQOQO || ooQOQO);
        },
        xq: function (oQQ0Qo) {
          var QQoooQ = oQQ0Qo.words;
          var ooQOQO = oQQ0Qo.sigBytes - 1;
          while (!(QQoooQ[ooQOQO >>> 2] >>> 24 - ooQOQO % 4 * 8 & 255)) {
            ooQOQO--;
          }
          oQQ0Qo.sigBytes = ooQOQO + 1;
        }
      };
      (function () {
        var oQQ0Qo = OOo0OQ;
        var QQoooQ = oQQ0Qo.lib;
        var ooQOQO = QQoooQ.BlockCipher;
        var QOoOOO = oQQ0Qo.algo;
        var Oo0Q0Q = [];
        var OQO0QO = [];
        var oooOoo = [];
        var o0QQOQ = [];
        var O0QoQo = [];
        var ooO0O0 = [];
        var oO0QOQ = [];
        var Q0OQQO = [];
        var QQ00OO = [];
        var Ooo0o0 = [];
        (function () {
          var oQQ0Qo = [];
          for (var QQoooQ = 0; QQoooQ < 256; QQoooQ++) {
            if (QQoooQ < 128) {
              oQQ0Qo[QQoooQ] = QQoooQ << 1;
            } else {
              oQQ0Qo[QQoooQ] = QQoooQ << 1 ^ 283;
            }
          }
          var ooQOQO = 0;
          var QOoOOO = 0;
          for (var QQoooQ = 0; QQoooQ < 256; QQoooQ++) {
            var OoOQ0O = QOoOOO ^ QOoOOO << 1 ^ QOoOOO << 2 ^ QOoOOO << 3 ^ QOoOOO << 4;
            OoOQ0O = OoOQ0O >>> 8 ^ OoOQ0O & 255 ^ 99;
            Oo0Q0Q[ooQOQO] = OoOQ0O;
            OQO0QO[OoOQ0O] = ooQOQO;
            var oOOoQO = oQQ0Qo[ooQOQO];
            var ooQQ0Q = oQQ0Qo[oOOoQO];
            var QOo0Oo = oQQ0Qo[ooQQ0Q];
            var OOOQOQ = oQQ0Qo[OoOQ0O] * 257 ^ OoOQ0O * 16843008;
            oooOoo[ooQOQO] = OOOQOQ << 24 | OOOQOQ >>> 8;
            o0QQOQ[ooQOQO] = OOOQOQ << 16 | OOOQOQ >>> 16;
            O0QoQo[ooQOQO] = OOOQOQ << 8 | OOOQOQ >>> 24;
            ooO0O0[ooQOQO] = OOOQOQ;
            var OOOQOQ = QOo0Oo * 16843009 ^ ooQQ0Q * 65537 ^ oOOoQO * 257 ^ ooQOQO * 16843008;
            oO0QOQ[OoOQ0O] = OOOQOQ << 24 | OOOQOQ >>> 8;
            Q0OQQO[OoOQ0O] = OOOQOQ << 16 | OOOQOQ >>> 16;
            QQ00OO[OoOQ0O] = OOOQOQ << 8 | OOOQOQ >>> 24;
            Ooo0o0[OoOQ0O] = OOOQOQ;
            if (!ooQOQO) {
              ooQOQO = QOoOOO = 1;
            } else {
              ooQOQO = oOOoQO ^ oQQ0Qo[oQQ0Qo[oQQ0Qo[QOo0Oo ^ oOOoQO]]];
              QOoOOO ^= oQQ0Qo[oQQ0Qo[QOoOOO]];
            }
          }
        })();
        var ooOQOO = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
        var oOOOoo = QOoOOO.AES = ooQOQO.tp({
          fP: function () {
            var oQQ0Qo = this._key;
            var QQoooQ = oQQ0Qo.words;
            var ooQOQO = oQQ0Qo.sigBytes / 4;
            var QOoOOO = this._nRounds = ooQOQO + 6;
            var oQO0Q0 = (QOoOOO + 1) * 4;
            var OoOQ0O = this._keySchedule = [];
            for (var oOOoQO = 0; oOOoQO < oQO0Q0; oOOoQO++) {
              if (oOOoQO < ooQOQO) {
                OoOQ0O[oOOoQO] = QQoooQ[oOOoQO];
              } else {
                var ooQQ0Q = OoOQ0O[oOOoQO - 1];
                if (!(oOOoQO % ooQOQO)) {
                  ooQQ0Q = ooQQ0Q << 8 | ooQQ0Q >>> 24;
                  ooQQ0Q = Oo0Q0Q[ooQQ0Q >>> 24] << 24 | Oo0Q0Q[ooQQ0Q >>> 16 & 255] << 16 | Oo0Q0Q[ooQQ0Q >>> 8 & 255] << 8 | Oo0Q0Q[ooQQ0Q & 255];
                  ooQQ0Q ^= ooOQOO[oOOoQO / ooQOQO | 0] << 24;
                } else if (ooQOQO > 6 && oOOoQO % ooQOQO == 4) {
                  ooQQ0Q = Oo0Q0Q[ooQQ0Q >>> 24] << 24 | Oo0Q0Q[ooQQ0Q >>> 16 & 255] << 16 | Oo0Q0Q[ooQQ0Q >>> 8 & 255] << 8 | Oo0Q0Q[ooQQ0Q & 255];
                }
                OoOQ0O[oOOoQO] = OoOQ0O[oOOoQO - ooQOQO] ^ ooQQ0Q;
              }
            }
            var QOo0Oo = this._invKeySchedule = [];
            for (var OOOQOQ = 0; OOOQOQ < oQO0Q0; OOOQOQ++) {
              var oOOoQO = oQO0Q0 - OOOQOQ;
              if (OOOQOQ % 4) {
                var ooQQ0Q = OoOQ0O[oOOoQO];
              } else {
                var ooQQ0Q = OoOQ0O[oOOoQO - 4];
              }
              if (OOOQOQ < 4 || oOOoQO <= 4) {
                QOo0Oo[OOOQOQ] = ooQQ0Q;
              } else {
                QOo0Oo[OOOQOQ] = oO0QOQ[Oo0Q0Q[ooQQ0Q >>> 24]] ^ Q0OQQO[Oo0Q0Q[ooQQ0Q >>> 16 & 255]] ^ QQ00OO[Oo0Q0Q[ooQQ0Q >>> 8 & 255]] ^ Ooo0o0[Oo0Q0Q[ooQQ0Q & 255]];
              }
            }
          },
          Bc: function (oQQ0Qo, QQoooQ) {
            this.GG(oQQ0Qo, QQoooQ, this._keySchedule, oooOoo, o0QQOQ, O0QoQo, ooO0O0, Oo0Q0Q);
          },
          hx: function (oQQ0Qo, QQoooQ) {
            var ooQOQO = oQQ0Qo[QQoooQ + 1];
            oQQ0Qo[QQoooQ + 1] = oQQ0Qo[QQoooQ + 3];
            oQQ0Qo[QQoooQ + 3] = ooQOQO;
            this.GG(oQQ0Qo, QQoooQ, this._invKeySchedule, oO0QOQ, Q0OQQO, QQ00OO, Ooo0o0, OQO0QO);
            var ooQOQO = oQQ0Qo[QQoooQ + 1];
            oQQ0Qo[QQoooQ + 1] = oQQ0Qo[QQoooQ + 3];
            oQQ0Qo[QQoooQ + 3] = ooQOQO;
          },
          GG: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0, OoOQ0O, oOOoQO, ooQQ0Q) {
            var QOo0Oo = this._nRounds;
            var OOOQOQ = oQQ0Qo[QQoooQ] ^ ooQOQO[0];
            var QoQQo0 = oQQ0Qo[QQoooQ + 1] ^ ooQOQO[1];
            var QQQOQO = oQQ0Qo[QQoooQ + 2] ^ ooQOQO[2];
            var QOQQO0 = oQQ0Qo[QQoooQ + 3] ^ ooQOQO[3];
            var Qoo0Q0 = 4;
            for (var QOQ0QQ = 1; QOQ0QQ < QOo0Oo; QOQ0QQ++) {
              var oOOOoo = QOoOOO[OOOQOQ >>> 24] ^ oQO0Q0[QoQQo0 >>> 16 & 255] ^ OoOQ0O[QQQOQO >>> 8 & 255] ^ oOOoQO[QOQQO0 & 255] ^ ooQOQO[Qoo0Q0++];
              var QoOO00 = QOoOOO[QoQQo0 >>> 24] ^ oQO0Q0[QQQOQO >>> 16 & 255] ^ OoOQ0O[QOQQO0 >>> 8 & 255] ^ oOOoQO[OOOQOQ & 255] ^ ooQOQO[Qoo0Q0++];
              var OO0OO0 = QOoOOO[QQQOQO >>> 24] ^ oQO0Q0[QOQQO0 >>> 16 & 255] ^ OoOQ0O[OOOQOQ >>> 8 & 255] ^ oOOoQO[QoQQo0 & 255] ^ ooQOQO[Qoo0Q0++];
              var OO00QQ = QOoOOO[QOQQO0 >>> 24] ^ oQO0Q0[OOOQOQ >>> 16 & 255] ^ OoOQ0O[QoQQo0 >>> 8 & 255] ^ oOOoQO[QQQOQO & 255] ^ ooQOQO[Qoo0Q0++];
              OOOQOQ = oOOOoo;
              QoQQo0 = QoOO00;
              QQQOQO = OO0OO0;
              QOQQO0 = OO00QQ;
            }
            var oOOOoo = (ooQQ0Q[OOOQOQ >>> 24] << 24 | ooQQ0Q[QoQQo0 >>> 16 & 255] << 16 | ooQQ0Q[QQQOQO >>> 8 & 255] << 8 | ooQQ0Q[QOQQO0 & 255]) ^ ooQOQO[Qoo0Q0++];
            var QoOO00 = (ooQQ0Q[QoQQo0 >>> 24] << 24 | ooQQ0Q[QQQOQO >>> 16 & 255] << 16 | ooQQ0Q[QOQQO0 >>> 8 & 255] << 8 | ooQQ0Q[OOOQOQ & 255]) ^ ooQOQO[Qoo0Q0++];
            var OO0OO0 = (ooQQ0Q[QQQOQO >>> 24] << 24 | ooQQ0Q[QOQQO0 >>> 16 & 255] << 16 | ooQQ0Q[OOOQOQ >>> 8 & 255] << 8 | ooQQ0Q[QoQQo0 & 255]) ^ ooQOQO[Qoo0Q0++];
            var OO00QQ = (ooQQ0Q[QOQQO0 >>> 24] << 24 | ooQQ0Q[OOOQOQ >>> 16 & 255] << 16 | ooQQ0Q[QoQQo0 >>> 8 & 255] << 8 | ooQQ0Q[QQQOQO & 255]) ^ ooQOQO[Qoo0Q0++];
            oQQ0Qo[QQoooQ] = oOOOoo;
            oQQ0Qo[QQoooQ + 1] = QoOO00;
            oQQ0Qo[QQoooQ + 2] = OO0OO0;
            oQQ0Qo[QQoooQ + 3] = OO00QQ;
          },
          Jv: 256 / 32
        });
        oQQ0Qo.AES = ooQOQO.tq(oOOOoo);
      })();
      var QOoOOO = OOo0OQ.enc.Latin1.ty(QQoooQ);
      var oQO0Q0 = OOo0OQ.enc.Latin1.ty("Mnz14C2tXod8AUJ5");
      var OoOQ0O = OOo0OQ.AES.jq(oQQ0Qo, QOoOOO, {
        jh: oQO0Q0,
        ed: OOo0OQ.ed.PD,
        HL: OOo0OQ.mP.lJ
      });
      return OoOQ0O.fF();
    };
    var Q0ooOQ = function () {
      var oQQ0Qo = function (oQQ0Qo, QQoooQ) {
        if (oQQ0Qo === OQOO0Q || oQQ0Qo === null || oQQ0Qo.length === 0) {
          return oQQ0Qo;
        }
        return QoO00o(OOQQQ0(oQQ0Qo), QQoooQ);
      };
      var QoO00o = function (oQQ0Qo, QQoooQ) {
        if (oQQ0Qo === OQOO0Q || oQQ0Qo === null || oQQ0Qo.length === 0) {
          return oQQ0Qo;
        }
        QQoooQ = ooQooQ(QQoooQ);
        return oOoQQo(QoQoOO(OOo0Qo(oo0o0O(oQQ0Qo, false), OoOoQ0(oo0o0O(QQoooQ, false))), true));
      };
      var oOoQQo = function (oQQ0Qo, QQoooQ) {
        if (QQoooQ === OQOO0Q || QQoooQ === null || QQoooQ < 0) QQoooQ = oQQ0Qo.length;
        if (QQoooQ === 0) return '';
        if (/^[\x00-\x7f]*$/.test(oQQ0Qo) || !/^[\x00-\xff]*$/.test(oQQ0Qo)) {
          if (QQoooQ === oQQ0Qo.length) return oQQ0Qo;
          return oQQ0Qo.substr(0, QQoooQ);
        }
        return QQoooQ < 65535 ? OQO0oQ(oQQ0Qo, QQoooQ) : ooooQQ(oQQ0Qo, QQoooQ);
      };
      var ooQooQ = function (oQQ0Qo) {
        if (/^[\x00-\x7f]*$/.test(oQQ0Qo)) {
          return oQQ0Qo;
        }
        var QQoooQ = [];
        var ooQOQO = oQQ0Qo.length;
        for (var QOoOOO = 0, oQO0Q0 = 0; QOoOOO < ooQOQO; ++QOoOOO, ++oQO0Q0) {
          var OoOQ0O = oQQ0Qo.charCodeAt(QOoOOO);
          if (OoOQ0O < 128) {
            QQoooQ[oQO0Q0] = oQQ0Qo.charAt(QOoOOO);
          } else if (OoOQ0O < 2048) {
            QQoooQ[oQO0Q0] = String.fromCharCode(192 | OoOQ0O >> 6, 128 | OoOQ0O & 63);
          } else if (OoOQ0O < 55296 || OoOQ0O > 57343) {
            QQoooQ[oQO0Q0] = String.fromCharCode(224 | OoOQ0O >> 12, 128 | OoOQ0O >> 6 & 63, 128 | OoOQ0O & 63);
          } else {
            if (QOoOOO + 1 < ooQOQO) {
              var oOOoQO = oQQ0Qo.charCodeAt(QOoOOO + 1);
              if (OoOQ0O < 56320 && 56320 <= oOOoQO && oOOoQO <= 57343) {
                var ooQQ0Q = ((OoOQ0O & 1023) << 10 | oOOoQO & 1023) + 65536;
                QQoooQ[oQO0Q0] = String.fromCharCode(240 | ooQQ0Q >> 18 & 63, 128 | ooQQ0Q >> 12 & 63, 128 | ooQQ0Q >> 6 & 63, 128 | ooQQ0Q & 63);
                ++QOoOOO;
                continue;
              }
            }
            throw new Error("Malformed string");
          }
        }
        return QQoooQ.join('');
      };
      var ooooQQ = function (oQQ0Qo, QQoooQ) {
        var ooQOQO = [];
        var QOoOOO = new Array(32768);
        var oQO0Q0 = 0,
          OoOQ0O = 0;
        for (var oOOoQO = oQQ0Qo.length; oQO0Q0 < QQoooQ && OoOQ0O < oOOoQO; oQO0Q0++) {
          var ooQQ0Q = oQQ0Qo.charCodeAt(OoOQ0O++);
          switch (ooQQ0Q >> 4) {
            case 0:
            case (94 - 77) / 17:
            case (112 - 74) / 19:
            case (85 - 40) / 15:
            case (165 - 97) / 17:
            case (89 - 44) / 9:
            case (127 - 55) / 12:
            case (119 - 49) / 10:
              QOoOOO[oQO0Q0] = ooQQ0Q;
              break;
            case (201 - 45) / 13:
            case (242 - 73) / 13:
              if (OoOQ0O < oOOoQO) {
                QOoOOO[oQO0Q0] = (ooQQ0Q & 31) << 6 | oQQ0Qo.charCodeAt(OoOQ0O++) & 63;
              } else {
                throw new Error('Unfinished UTF-8 octet sequence');
              }
              break;
            case (322 - 84) / 17:
              if (OoOQ0O + 1 < oOOoQO) {
                QOoOOO[oQO0Q0] = (ooQQ0Q & 15) << 12 | (oQQ0Qo.charCodeAt(OoOQ0O++) & 63) << 6 | oQQ0Qo.charCodeAt(OoOQ0O++) & 63;
              } else {
                throw new Error('Unfinished UTF-8 octet sequence');
              }
              break;
            case (294 - 99) / 13:
              if (OoOQ0O + 2 < oOOoQO) {
                var QOo0Oo = ((ooQQ0Q & 7) << 18 | (oQQ0Qo.charCodeAt(OoOQ0O++) & 63) << 12 | (oQQ0Qo.charCodeAt(OoOQ0O++) & 63) << 6 | oQQ0Qo.charCodeAt(OoOQ0O++) & 63) - 65536;
                if (0 <= QOo0Oo && QOo0Oo <= 1048575) {
                  QOoOOO[oQO0Q0++] = QOo0Oo >> 10 & 1023 | 55296;
                  QOoOOO[oQO0Q0] = QOo0Oo & 1023 | 56320;
                } else {
                  throw new Error('Character outside valid Unicode range: 0x' + QOo0Oo.toString(16));
                }
              } else {
                throw new Error('Unfinished UTF-8 octet sequence');
              }
              break;
            default:
              throw new Error('Bad UTF-8 encoding 0x' + ooQQ0Q.toString(16));
          }
          if (oQO0Q0 >= 32767 - 1) {
            var OOOQOQ = oQO0Q0 + 1;
            QOoOOO.length = OOOQOQ;
            ooQOQO[ooQOQO.length] = String.fromCharCode.apply(String, QOoOOO);
            QQoooQ -= OOOQOQ;
            oQO0Q0 = -1;
          }
        }
        if (oQO0Q0 > 0) {
          QOoOOO.length = oQO0Q0;
          ooQOQO[ooQOQO.length] = String.fromCharCode.apply(String, QOoOOO);
        }
        return ooQOQO.join('');
      };
      var OQO0oQ = function (oQQ0Qo, QQoooQ) {
        var ooQOQO = new Array(QQoooQ);
        var QOoOOO = 0,
          oQO0Q0 = 0;
        for (var OoOQ0O = oQQ0Qo.length; QOoOOO < QQoooQ && oQO0Q0 < OoOQ0O; QOoOOO++) {
          var oOOoQO = oQQ0Qo.charCodeAt(oQO0Q0++);
          switch (oOOoQO >> 4) {
            case 0:
            case (102 - 95) / 7:
            case (119 - 95) / 12:
            case (98 - 62) / 12:
            case (98 - 74) / 6:
            case (168 - 98) / 14:
            case (144 - 90) / 9:
            case (166 - 68) / 14:
              ooQOQO[QOoOOO] = oOOoQO;
              break;
            case (223 - 67) / 13:
            case (238 - 82) / 12:
              if (oQO0Q0 < OoOQ0O) {
                ooQOQO[QOoOOO] = (oOOoQO & 31) << 6 | oQQ0Qo.charCodeAt(oQO0Q0++) & 63;
              } else {
                throw new Error('Unfinished UTF-8 octet sequence');
              }
              break;
            case (226 - 86) / 10:
              if (oQO0Q0 + 1 < OoOQ0O) {
                ooQOQO[QOoOOO] = (oOOoQO & 15) << 12 | (oQQ0Qo.charCodeAt(oQO0Q0++) & 63) << 6 | oQQ0Qo.charCodeAt(oQO0Q0++) & 63;
              } else {
                throw new Error('Unfinished UTF-8 octet sequence');
              }
              break;
            case (275 - 80) / 13:
              if (oQO0Q0 + 2 < OoOQ0O) {
                var ooQQ0Q = ((oOOoQO & 7) << 18 | (oQQ0Qo.charCodeAt(oQO0Q0++) & 63) << 12 | (oQQ0Qo.charCodeAt(oQO0Q0++) & 63) << 6 | oQQ0Qo.charCodeAt(oQO0Q0++) & 63) - 65536;
                if (0 <= ooQQ0Q && ooQQ0Q <= 1048575) {
                  ooQOQO[QOoOOO++] = ooQQ0Q >> 10 & 1023 | 55296;
                  ooQOQO[QOoOOO] = ooQQ0Q & 1023 | 56320;
                } else {
                  throw new Error('Character outside valid Unicode range: 0x' + ooQQ0Q.toString(16));
                }
              } else {
                throw new Error('Unfinished UTF-8 octet sequence');
              }
              break;
            default:
              throw new Error('Bad UTF-8 encoding 0x' + oOOoQO.toString(16));
          }
        }
        if (QOoOOO < QQoooQ) {
          ooQOQO.length = QOoOOO;
        }
        return String.fromCharCode.apply(String, ooQOQO);
      };
      var OOo0Qo = function (oQQ0Qo, QQoooQ) {
        var ooQOQO = oQQ0Qo.length;
        var QOoOOO = ooQOQO - 1;
        var oQO0Q0, OoOQ0O, oOOoQO, ooQQ0Q, QOo0Oo, OOOQOQ;
        oQO0Q0 = oQQ0Qo[0];
        OOOQOQ = Math.floor(6 + 52 / ooQOQO);
        for (oOOoQO = oQOQOo(OOOQOQ * oO0Q00); oOOoQO !== 0; oOOoQO = oQOQOo(oOOoQO - oO0Q00)) {
          ooQQ0Q = oOOoQO >>> 2 & 3;
          for (QOo0Oo = QOoOOO; QOo0Oo > 0; --QOo0Oo) {
            OoOQ0O = oQQ0Qo[QOo0Oo - 1];
            oQO0Q0 = oQQ0Qo[QOo0Oo] = oQOQOo(oQQ0Qo[QOo0Oo] - OQQ00Q(oOOoQO, oQO0Q0, OoOQ0O, QOo0Oo, ooQQ0Q, QQoooQ));
          }
          OoOQ0O = oQQ0Qo[QOoOOO];
          oQO0Q0 = oQQ0Qo[0] = oQOQOo(oQQ0Qo[0] - OQQ00Q(oOOoQO, oQO0Q0, OoOQ0O, 0, ooQQ0Q, QQoooQ));
        }
        return oQQ0Qo;
      };
      var OoOoQ0 = function (oQQ0Qo) {
        if (oQQ0Qo.length < 4) oQQ0Qo.length = 4;
        return oQQ0Qo;
      };
      var OQQ00Q = function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0, OoOQ0O) {
        return (ooQOQO >>> 5 ^ QQoooQ << 2) + (QQoooQ >>> 3 ^ ooQOQO << 4) ^ (oQQ0Qo ^ QQoooQ) + (OoOQ0O[QOoOOO & 3 ^ oQO0Q0] ^ ooQOQO);
      };
      var oQOQOo = function (oQQ0Qo) {
        return oQQ0Qo & 4294967295;
      };
      var oo0o0O = function (oQQ0Qo, QQoooQ) {
        var ooQOQO = oQQ0Qo.length;
        var QOoOOO = ooQOQO >> 2;
        if ((ooQOQO & 3) !== 0) {
          ++QOoOOO;
        }
        var oQO0Q0;
        if (QQoooQ) {
          oQO0Q0 = new Array(QOoOOO + 1);
          oQO0Q0[QOoOOO] = ooQOQO;
        } else {
          oQO0Q0 = new Array(QOoOOO);
        }
        for (var OoOQ0O = 0; OoOQ0O < ooQOQO; ++OoOQ0O) {
          oQO0Q0[OoOQ0O >> 2] |= oQQ0Qo.charCodeAt(OoOQ0O) << ((OoOQ0O & 3) << 3);
        }
        return oQO0Q0;
      };
      var QoQoOO = function (oQQ0Qo, QQoooQ) {
        var ooQOQO = oQQ0Qo.length;
        var QOoOOO = ooQOQO << 2;
        if (QQoooQ) {
          var oQO0Q0 = oQQ0Qo[ooQOQO - 1];
          QOoOOO -= 4;
          if (oQO0Q0 < QOoOOO - 3 || oQO0Q0 > QOoOOO) {
            return null;
          }
          QOoOOO = oQO0Q0;
        }
        for (var OoOQ0O = 0; OoOQ0O < ooQOQO; OoOQ0O++) {
          oQQ0Qo[OoOQ0O] = String.fromCharCode(oQQ0Qo[OoOQ0O] & 255, oQQ0Qo[OoOQ0O] >>> 8 & 255, oQQ0Qo[OoOQ0O] >>> 16 & 255, oQQ0Qo[OoOQ0O] >>> 24 & 255);
        }
        var oOOoQO = oQQ0Qo.join('');
        if (QQoooQ) {
          return oOOoQO.substring(0, QOoOOO);
        }
        return oOOoQO;
      };
      var OOQQQ0 = function () {
        var O0OO00 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
        return function (oQQ0Qo) {
          var QQoooQ, ooQOQO, QOoOOO, oQO0Q0;
          var OoOQ0O, oOOoQO, ooQQ0Q, QOo0Oo, OOOQOQ, QoQQo0;
          ooQQ0Q = oQQ0Qo.length;
          if (ooQQ0Q % 4 !== 0) {
            return '';
          }
          if (/[^ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\+\/\=]/.test(oQQ0Qo)) {
            return '';
          }
          if (oQQ0Qo.charAt(ooQQ0Q - 2) == '=') {
            QOo0Oo = 1;
          } else if (oQQ0Qo.charAt(ooQQ0Q - 1) == '=') {
            QOo0Oo = 2;
          } else {
            QOo0Oo = 0;
          }
          OOOQOQ = ooQQ0Q;
          if (QOo0Oo > 0) {
            OOOQOQ -= 4;
          }
          OOOQOQ = (OOOQOQ >> 2) * 3 + QOo0Oo;
          QoQQo0 = new Array(OOOQOQ);
          OoOQ0O = oOOoQO = 0;
          while (OoOQ0O < ooQQ0Q) {
            QQoooQ = O0OO00[oQQ0Qo.charCodeAt(OoOQ0O++)];
            if (QQoooQ == -1) break;
            ooQOQO = O0OO00[oQQ0Qo.charCodeAt(OoOQ0O++)];
            if (ooQOQO == -1) break;
            QoQQo0[oOOoQO++] = String.fromCharCode(QQoooQ << 2 | (ooQOQO & 48) >> 4);
            QOoOOO = O0OO00[oQQ0Qo.charCodeAt(OoOQ0O++)];
            if (QOoOOO == -1) break;
            QoQQo0[oOOoQO++] = String.fromCharCode((ooQOQO & 15) << 4 | (QOoOOO & 60) >> 2);
            oQO0Q0 = O0OO00[oQQ0Qo.charCodeAt(OoOQ0O++)];
            if (oQO0Q0 == -1) break;
            QoQQo0[oOOoQO++] = String.fromCharCode((QOoOOO & 3) << 6 | oQO0Q0);
          }
          return QoQQo0.join('');
        };
      }();
      var oO0Q00 = 2654435769;
      return {
        decrypt: QoO00o,
        decryptFromBase64: oQQ0Qo
      };
    };
    var Q0o0Oo = Q0ooOQ().decryptFromBase64;
    var Q00oO0 = '<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-sg-refresh1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-sg-refresh2" transform="translate(-2991.000000, -1114.000000)" fill="#7E7E7E" fill-rule="nonzero">' + '<g id="td-sg-refresh3" transform="translate(2991.270270, 1114.000000)">' + '<path d="M1,9.72972973 C1.55228475,9.72972973 2,10.177445 2,10.7297297 C2,15.5510125 5.90844691,19.4594595 10.7297297,19.4594595 C13.0233396,19.4594595 15.1747304,18.5724272 16.7919669,17.0112829 C17.1893213,16.6277104 17.8223877,16.6388828 18.2059603,17.0362372 C18.5895329,17.4335916 18.5783605,18.066658 18.181006,18.4502306 C16.1945718,20.3677673 13.5468028,21.4594595 10.7297297,21.4594595 C7.13138512,21.4594595 3.94674192,19.6881446 2.00018131,16.969896 L2,19.3783784 C2,19.9306631 1.55228475,20.3783784 1,20.3783784 C0.487164161,20.3783784 0.0644928393,19.9923382 0.00672773133,19.4949995 L0,19.3783784 L0,10.7297297 C0,10.177445 0.44771525,9.72972973 1,9.72972973 Z M10.7301081,0 C14.3288952,0 17.5138792,1.77175056 19.4603746,4.49056634 L19.4594595,2.08108108 C19.4594595,1.52879633 19.9071747,1.08108108 20.4594595,1.08108108 C20.9722953,1.08108108 21.3949666,1.46712127 21.4527317,1.96445996 L21.4594595,2.08108108 L21.4598378,10.7297297 L21.4598378,10.7297297 C21.4598378,11.2425656 21.0737976,11.6652369 20.576459,11.723002 L20.4594595,11.7297297 L20.4594595,11.7297297 C19.9466236,11.7297297 19.5239523,11.3436895 19.4661872,10.8463509 L19.4594595,10.7297297 C19.4598378,5.90844691 15.5513909,2 10.7301081,2 C8.32830837,2 6.08399313,2.97333141 4.44854695,4.66750077 C4.06496984,5.0648508 3.43190332,5.07601596 3.03455329,4.69243885 C2.63720326,4.30886174 2.6260381,3.67579521 3.00961521,3.27844518 C5.0181739,1.19776613 7.7799925,0 10.7301081,0 Z" id="td-sg-refresh9"></path>' + "</g>" + "</g>" + "</g>" + "</svg>";
    var Qo0OoO = '<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-sg-close1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-sg-close2" transform="translate(-3026.000000, -1114.000000)" fill="#7E7E7E" fill-rule="nonzero">' + '<g id="td-sg-close3" transform="translate(3025.000000, 1113.000000)">' + '<path d="M12,1 C18.0751347,1 23,5.92486525 23,12 C23,18.0751347 18.0751347,23 12,23 C5.92486525,23 1,18.0751347 1,12 C1,5.92486525 5.92486525,1 12,1 Z M12,3 C7.02943475,3 3,7.02943475 3,12 C3,16.9705653 7.02943475,21 12,21 C16.9705653,21 21,16.9705653 21,12 C21,7.02943475 16.9705653,3 12,3 Z M9.78449944,8.38125461 L9.87870678,8.46444322 L12,10.586 L14.1213432,8.46444322 C14.5118675,8.07391893 15.1450325,8.07391893 15.5355568,8.46444322 C15.8960407,8.82492718 15.9237703,9.39215824 15.6187454,9.78444944 L15.5355568,9.87865678 L13.414,12 L15.5355568,14.1212932 C15.9260811,14.5118175 15.9260811,15.1449825 15.5355568,15.5355068 C15.1750728,15.8959907 14.6078418,15.9237203 14.2155506,15.6186954 L14.1213432,15.5355068 L12,13.414 L9.87870678,15.5355068 C9.48818249,15.9260311 8.85501751,15.9260311 8.46449322,15.5355068 C8.10400926,15.1750228 8.07627972,14.6077918 8.38130461,14.2155006 L8.46449322,14.1212932 L10.586,12 L8.46449322,9.87865678 C8.07396893,9.48813249 8.07396893,8.85496751 8.46449322,8.46444322 C8.82497718,8.10395926 9.39220824,8.07622972 9.78449944,8.38125461 Z" id="td-sg-close9"></path>' + "</g>" + "</g>" + "</g>" + "</svg>";
    var Q0oo0Q = '<svg width="22px" height="20px" viewBox="0 0 22 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-sg-fb1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-sg-fb2" transform="translate(-3775.000000, -1116.000000)" fill="#7E7E7E" fill-rule="nonzero">' + '<g id="td-sg-fb3" transform="translate(3478.000000, 1114.000000)">' + '<g id="td-sg-fb4" transform="translate(226.000000, 0.000000)">' + '<g id="td-sg-fb5" transform="translate(70.000000, 0.000000)">' + '<path d="M22,2 C22.5522847,2 23,2.44771525 23,3 L23,3 L23,18 C23,18.5522847 22.5522847,19 22,19 L22,19 L14.914,19 L12.7071068,21.2071068 C12.3466228,21.5675907 11.7793918,21.5953203 11.3871006,21.2902954 L11.3871006,21.2902954 L11.2928932,21.2071068 L9.085,19 L2,19 C1.48716416,19 1.06449284,18.6139598 1.00672773,18.1166211 L1.00672773,18.1166211 L1,18 L1,3 C1,2.44771525 1.44771525,2 2,2 L2,2 Z M21,4 L2.999,4 L2.999,17 L9.5,17 C9.72101374,17 9.93448403,17.0731645 10.1080295,17.2060806 L10.1080295,17.2060806 L10.2071068,17.2928932 L12,19.085 L13.7928932,17.2928932 C13.9491735,17.1366129 14.1518549,17.0374017 14.368556,17.0086724 L14.368556,17.0086724 L14.5,17 L21,17 L21,4 Z M12.50125,9.5 C13.0535347,9.5 13.50125,9.94771525 13.50125,10.5 C13.50125,11.0128358 13.1152098,11.4355072 12.6178711,11.4932723 L12.50125,11.5 L11.5,11.5 C10.9477153,11.5 10.5,11.0522847 10.5,10.5 C10.5,9.98716416 10.8860402,9.56449284 11.3833789,9.50672773 L11.5,9.5 L12.50125,9.5 Z M17.5,9.5 C18.0522847,9.5 18.5,9.94771525 18.5,10.5 C18.5,11.0128358 18.1139598,11.4355072 17.6166211,11.4932723 L17.5,11.5 L16.50055,11.5 C15.9482653,11.5 15.50055,11.0522847 15.50055,10.5 C15.50055,9.98716416 15.8865902,9.56449284 16.3839289,9.50672773 L16.50055,9.5 L17.5,9.5 Z M7.49995,9.5 C8.05223475,9.5 8.49995,9.94771525 8.49995,10.5 C8.49995,11.0128358 8.11390981,11.4355072 7.61657113,11.4932723 L7.49995,11.5 L6.5005,11.5 C5.94821525,11.5 5.5005,11.0522847 5.5005,10.5 C5.5005,9.98716416 5.88654019,9.56449284 6.38387887,9.50672773 L6.5005,9.5 L7.49995,9.5 Z" id="td-sg-fb9"></path>' + "</g>" + "</g>" + "</g>" + "</g>" + "</g>" + "</svg>";
    var OO0O00 = '<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-p-f1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-p-f2" transform="translate(-3026.000000, -1114.000000)" fill="#FF9A00" fill-rule="nonzero">' + '<g id="td-p-f3" transform="translate(3025.000000, 1113.000000)">' + '<path d="M12,1 C18.0751347,1 23,5.92486525 23,12 C23,18.0751347 18.0751347,23 12,23 C5.92486525,23 1,18.0751347 1,12 C1,5.92486525 5.92486525,1 12,1 Z M12,3 C7.02943475,3 3,7.02943475 3,12 C3,16.9705653 7.02943475,21 12,21 C16.9705653,21 21,16.9705653 21,12 C21,7.02943475 16.9705653,3 12,3 Z M9.78449944,8.38125461 L9.87870678,8.46444322 L12,10.586 L14.1213432,8.46444322 C14.5118675,8.07391893 15.1450325,8.07391893 15.5355568,8.46444322 C15.8960407,8.82492718 15.9237703,9.39215824 15.6187454,9.78444944 L15.5355568,9.87865678 L13.414,12 L15.5355568,14.1212932 C15.9260811,14.5118175 15.9260811,15.1449825 15.5355568,15.5355068 C15.1750728,15.8959907 14.6078418,15.9237203 14.2155506,15.6186954 L14.1213432,15.5355068 L12,13.414 L9.87870678,15.5355068 C9.48818249,15.9260311 8.85501751,15.9260311 8.46449322,15.5355068 C8.10400926,15.1750228 8.07627972,14.6077918 8.38130461,14.2155006 L8.46449322,14.1212932 L10.586,12 L8.46449322,9.87865678 C8.07396893,9.48813249 8.07396893,8.85496751 8.46449322,8.46444322 C8.82497718,8.10395926 9.39220824,8.07622972 9.78449944,8.38125461 Z" id="td-p-f9"></path>' + "</g>" + "</g>" + "</g>" + "</svg>";
    var QQQQ00 = '<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-p-s1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-p-s2" transform="translate(-4281.000000, -920.000000)" fill="#55C116" fill-rule="nonzero">' + '<g id="td-p-s3" transform="translate(4280.000000, 919.000000)">' + '<path d="M12,1.4 C14.8490184,1.4 17.5206398,2.5300026 19.4953164,4.50466828 C21.4699916,6.47936528 22.6,9.15098624 22.6,12 C22.6,14.8490172 21.4699887,17.5206394 19.4953141,19.4953141 C17.5206394,21.4699887 14.8490172,22.6 12,22.6 C9.15098624,22.6 6.47936528,21.4699916 4.50466476,19.4953129 C2.5300026,17.5206398 1.4,14.8490184 1.4,12 C1.4,9.15098509 2.52999971,6.47936489 4.50466945,4.50466241 C6.47936489,2.52999971 9.15098509,1.4 12,1.4 Z M12,2.6 C9.47251451,2.6 7.10507502,3.60134216 5.35319759,5.35319055 C3.60134216,7.10507502 2.6,9.47251451 2.6,12 C2.6,14.5274876 3.6013438,16.894926 5.35319172,18.6467836 C7.10507794,20.3986504 9.47251738,21.4 12,21.4 C14.5274847,21.4 16.8949231,20.3986488 18.6467859,18.6467859 C20.3986488,16.8949231 21.4,14.5274847 21.4,12 C21.4,9.47251738 20.3986504,7.10507794 18.6467871,5.35319524 C16.894926,3.6013438 14.5274876,2.6 12,2.6 Z M17.4242641,8.57573593 C17.6325437,8.78401555 17.6556859,9.10732483 17.4936906,9.3411666 L17.4242641,9.42426407 L11.4242641,15.4242641 C11.2159844,15.6325437 10.8926752,15.6556859 10.6588334,15.4936906 L10.5757359,15.4242641 L7.57573593,12.4242641 C7.34142136,12.1899495 7.34142136,11.8100505 7.57573593,11.5757359 C7.78401555,11.3674563 8.10732483,11.3443141 8.3411666,11.5063094 L8.42426407,11.5757359 L11,14.151 L16.5757359,8.57573593 C16.8100505,8.34142136 17.1899495,8.34142136 17.4242641,8.57573593 Z" id="td-p-s9"></path>' + "</g>" + "</g>" + "</g>" + "</svg>";
    var QOO00Q = '<svg width="27px" height="27px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-p-load1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-p-load2" transform="translate(2.000000, 2.000000)" fill="#015BF8">' + '<g id="td-p-load3" transform="translate(45.000000, 0.000000)">' + '<rect id="td-p-load4" x="0" y="0" width="6" height="24" rx="3"></rect>' + '<rect id="td-p-load5" x="0" y="72" width="6" height="24" rx="3"></rect>' + "</g>" + '<g id="td-p-load6" transform="translate(48.000000, 48.000000) rotate(90.000000) translate(-48.000000, -48.000000) translate(45.000000, 0.000000)">' + '<rect id="td-p-load7" x="0" y="0" width="6" height="24" rx="3"></rect>' + '<rect id="td-p-load8" x="0" y="72" width="6" height="24" rx="3"></rect>' + "</g>" + '<g id="td-p-load9" transform="translate(46.939340, 49.060660) rotate(45.000000) translate(-46.939340, -49.060660) translate(31.939340, -0.439340)">' + '<rect id="td-p-load10" x="12" y="4.54747351e-13" width="6" height="24" rx="3"></rect>' + '<path d="M23.4852814,75.5147186 C24.6568542,76.6862915 24.6568542,78.5857864 23.4852814,79.7573593 L10.7573593,92.4852814 C9.58578644,93.6568542 7.6862915,93.6568542 6.51471863,92.4852814 C5.34314575,91.3137085 5.34314575,89.4142136 6.51471863,88.2426407 L19.2426407,75.5147186 C20.4142136,74.3431458 22.3137085,74.3431458 23.4852814,75.5147186 Z" id="td-p-load12" transform="translate(15.000000, 84.000000) rotate(-45.000000) translate(-15.000000, -84.000000) "></path>' + "</g>" + '<g id="td-p-load11" transform="translate(48.000000, 48.000000) rotate(-45.000000) translate(-48.000000, -48.000000) translate(33.000000, -3.000000)">' + '<path d="M6.51471863,6.51471863 C7.6862915,5.34314575 9.58578644,5.34314575 10.7573593,6.51471863 L23.4852814,19.2426407 C24.6568542,20.4142136 24.6568542,22.3137085 23.4852814,23.4852814 C22.3137085,24.6568542 20.4142136,24.6568542 19.2426407,23.4852814 L6.51471863,10.7573593 C5.34314575,9.58578644 5.34314575,7.6862915 6.51471863,6.51471863 Z" id="td-p-load13" transform="translate(15.000000, 15.000000) rotate(45.000000) translate(-15.000000, -15.000000) "></path>' + '<path d="M6.51471863,78.5147186 C7.6862915,77.3431458 9.58578644,77.3431458 10.7573593,78.5147186 L23.4852814,91.2426407 C24.6568542,92.4142136 24.6568542,94.3137085 23.4852814,95.4852814 C22.3137085,96.6568542 20.4142136,96.6568542 19.2426407,95.4852814 L6.51471863,82.7573593 C5.34314575,81.5857864 5.34314575,79.6862915 6.51471863,78.5147186 Z" id="td-p-load14" transform="translate(15.000000, 87.000000) rotate(45.000000) translate(-15.000000, -87.000000) "></path>' + "</g>" + "</g>" + "</g>" + "</svg>";
    var OoOQQo = '';
    Q00000();
    var OOQoOo = OQ0Q0o ? '<div class="td-bg-img" width="320" height="180"></div>' + '<div class="refresh-bg initial"><img src="' + OQQQOQ + '" class="loading-icon"/></div>' : '<canvas class="td-bg-img" width="320" height="180"></canvas>' + '<div class="refresh-bg initial"><img src="' + OQQQOQ + '" class="loading-icon"/></div>';
    var o0Qo0O = false;
    var o0QQoQ = false;
    var OQo0Q0 = {
      getRotate: function (oQQ0Qo) {
        var QQoooQ = oQQ0Qo.css("-webkit-transform") || oQQ0Qo.css("-moz-transform") || oQQ0Qo.css("-ms-transform") || oQQ0Qo.css("-o-transform") || oQQ0Qo.css("transform");
        QQoooQ = QQoooQ.replace(/(matrix3d|matrix)/, '');
        var ooQOQO = QQoooQ.replace(/[^0-9\-.,]/g, '').split(',');
        return {
          x: Math.asin(ooQOQO[6]) * 180 / 3.14 || 0,
          y: Math.asin(ooQOQO[8]) * 180 / 3.14 || 0,
          z: Math.asin(ooQOQO[10]) * 180 / 3.14 || 0
        };
      },
      changeBtnStatus: function (oOoo0O, QQoooQ, OoQQOQ, QOoOOO, oQO0Q0, OoOQ0O) {
        var oOOoQO = ["td-s-loading", "td-s-validate", "td-s-success", "td-s-fail"];
        oOOoQO.splice(oOOoQO.indexOf(QOoOOO), 1);
        for (var ooQQ0Q = 0; ooQQ0Q < oOOoQO.length; ooQQ0Q++) {
          _$td(oOoo0O + ' ' + ".td-btn-cnt").removeClass(oOOoQO[ooQQ0Q]);
        }
        if (!QQoooQ) {
          _$td(oOoo0O + ' ' + '.td-btn-fail .td-btn-content').html(OoOQ0O);
        }
        _$td(oOoo0O + ' ' + ".td-btn-cnt").addClass(QOoOOO);
        setTimeout(function () {
          _$td(oOoo0O + ' ' + ".td-btn-cnt").removeClass(OoQQOQ);
          setTimeout(function () {
            OoO0Qo();
          }, 100);
        }, 500);
      },
      setPopupInfo: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO, oQO0Q0) {
        var OoOQ0O = {};
        if (QQoooQ === "fail" && QOoOOO !== OQOO0Q && typeof QOoOOO === "number" && oO0QQo.webview) {
          switch (QOoOOO) {
            case 0:
              OoOQ0O = oOQ0QQ[1];
              break;
            case (90 - 81) / 9:
              OoOQ0O = oOQ0QQ[0];
              break;
            default:
              OoOQ0O = oOQ0QQ[2];
              break;
          }
          oO0QQo.close && oO0QQo.close(JSON.stringify(OoOQ0O));
          return;
        }
        if (!oQO0Q0) {
          _$td(oQQ0Qo + ' ' + ".td-popup-info").removeClass("td-pp-loading").addClass("td-pp-res");
        } else {
          _$td(oQQ0Qo + ' ' + ".td-popup-info").removeClass("td-pp-res").addClass("td-pp-loading");
        }
        var oOOoQO = ["success", "fail", "validate"];
        var ooQQ0Q = {
          success: "#55C116",
          fail: "#FF9A00",
          validate: "rgba(0,0,0,0.8)"
        };
        oOOoQO.splice(oOOoQO.indexOf(QQoooQ), 1);
        var QOo0Oo = _$td(oQQ0Qo + ' ' + ".td_validate_msg"),
          OOOQOQ = _$td(oQQ0Qo + ' ' + ".td_" + QQoooQ + "_box"),
          QoQQo0 = OOOQOQ.children();
        QOo0Oo.text('');
        for (var QQQOQO = 0; QQQOQO < oOOoQO.length; QQQOQO++) {
          _$td(oQQ0Qo + ' ' + ".td_" + oOOoQO[QQQOQO] + "_box").hide();
        }
        if (QQoooQ !== "validate") {
          QOo0Oo.css({
            color: ooQQ0Q[QQoooQ]
          }).text(ooQOQO);
        }
        if (QQoooQ === "fail") {
          if (QOoOOO === "604" || QOoOOO === 0) {
            QoQQo0.addClass("td_op2much");
          } else if (QOoOOO === 1) {
            QoQQo0.addClass("td_bad_network");
          } else {
            QoQQo0.addClass("td_validate_fail");
          }
        }
        OOOQOQ.show();
        OoO0Qo();
      },
      validateShow: function (oOoo0O, ooQO0o, ooQOQO, QOoOOO) {
        if (ooQOQO.indexOf("click") !== -1) {
          _$td(oOoo0O + ' ' + ooQOQO).css({
            width: OQ0OO0
          }).css({
            height: o0oQOo
          });
          !OQo0Q0.isSupportTransform() && !o0Oo0O && !oQoOo0 && !oO0QQo.webview && _$td(oOoo0O + ' ' + ooQOQO).css({
            marginLeft: -(OQ0OO0 / 2)
          }).css({
            marginTop: -(o0oQOo / 2)
          });
        } else {
          _$td(oOoo0O + ' ' + ooQOQO).css({
            width: OQ0OO0
          }).css({
            height: o00QOO
          });
          !OQo0Q0.isSupportTransform() && !o0Oo0O && !oQoOo0 && !oO0QQo.webview && _$td(oOoo0O + ' ' + ooQOQO).css({
            marginLeft: -(OQ0OO0 / 2)
          }).css({
            marginTop: -(o00QOO / 2)
          });
        }
        if (oO0QQo.webview) {}
        if (oO0QQo.closeLoading) {
          setTimeout(function () {
            _$td(oOoo0O + ' ' + ".td-popup-info").hide();
            _$td(oOoo0O + ' ' + ".td-popup-info").removeClass("td-pp-sh").addClass("td-pp-hi");
            _$td(oOoo0O + ' ' + ".td-pop-cnt").removeClass("td-n-hi");
            _$td(oOoo0O + ' ' + ".td-pop-cnt").addClass("td-n-sh");
            _$td(oOoo0O + ' ' + ".td-pop-" + ooQO0o + "-area").show();
            setTimeout(function () {
              OQo0Q0.changeBtnStatus(OoQO00, true, "td-s-loading", "td-s-validate", 2000);
            }, 400);
            _$td(oOoo0O + ' ' + ".td_validate_box").hide();
            OoO0Qo();
          }, 500);
        } else {
          setTimeout(function () {
            setTimeout(function () {
              _$td(oOoo0O + ' ' + ".td-popup-info").hide();
              _$td(oOoo0O + ' ' + ".td-popup-info").removeClass("td-pp-sh").addClass("td-pp-hi");
              _$td(oOoo0O + ' ' + ".td-pop-cnt").removeClass("td-n-hi");
              _$td(oOoo0O + ' ' + ".td-pop-cnt").addClass("td-n-sh");
              _$td(oOoo0O + ' ' + ".td-pop-" + ooQO0o + "-area").show();
              setTimeout(function () {
                OQo0Q0.changeBtnStatus(OoQO00, true, "td-s-loading", "td-s-validate", 2000);
              }, 400);
              _$td(oOoo0O + ' ' + ".td_validate_box").hide();
              OoO0Qo();
            }, 300);
          }, QOoOOO);
        }
      },
      validateClose: function (oQQ0Qo, QQoooQ, ooQOQO, QOoOOO) {
        if (oO0QQo.webview) {
          return;
        }
        setTimeout(function () {
          OoO0Qo();
        }, QOoOOO);
      },
      fadeIn: function (oOoo0O, QQoooQ, ooQOQO) {
        setTimeout(function () {
          if (!oO0QQo.closeLoading) {
            _$td(oOoo0O + ' ' + ".td-popup-info").removeClass("td-pp-res").removeClass("td-pp-hi").addClass("td-pp-sh");
            _$td(oOoo0O + ' ' + ".td-popup-info").show();
          } else {
            _$td(oOoo0O + ' ' + ".td-popup-info").removeClass("td-pp-sh").addClass("td-pp-hi").addClass("td-pp-res");
            _$td(oOoo0O + ' ' + ".td-popup-info").hide();
          }
          if (!oO0QQo.webview && oO0QQo.display === "bind") {
            _$td(oOoo0O + ' ' + ".td-nw-wrapper").show();
          }
          _$td(oOoo0O + '.td-outer-wrapper.pop').show();
          OoO0Qo();
        }, QQoooQ);
      },
      popupCloseAni: function (oOoo0O) {
        _$td(oOoo0O + ' ' + '.td-pop-cnt .td-nw-wrapper').hide();
        _$td(oOoo0O + ' ' + ".td-popup-info").removeClass("td-pp-hi").addClass("td-pp-sh").addClass("td-pp-res");
        _$td(oOoo0O + ' ' + ".td-popup-info").show();
        setTimeout(function () {
          _$td(oOoo0O + ' ' + ".td-popup-info").removeClass("td-pp-sh").addClass("td-pp-hi");
          setTimeout(function () {
            _$td(oOoo0O + ' ' + ".td-pop-3d-area").length && _$td(".td-pop-3d-area").hide();
            _$td(oOoo0O + ' ' + ".td-pop-slide-area").length && _$td(".td-pop-slide-area").hide();
            _$td(oOoo0O + ' ' + ".td-pop-click-area").length && _$td(".td-pop-click-area").hide();
            _$td(oOoo0O + '.td-outer-wrapper.pop').hide();
          }, 300);
        }, 500);
      },
      errorOutAni: function () {},
      fadeOut: function (oOoo0O, QQoooQ, oOO0OQ) {
        var QOoOOO = Array.prototype.slice.call(arguments, 3);
        if (QOoOOO.length) {
          for (var oQO0Q0 = 0; oQO0Q0 < QOoOOO.length; oQO0Q0++) {
            QOoOOO[oQO0Q0]();
          }
        }
        if (oO0QQo.webview) {
          return;
        }
        setTimeout(function () {
          if (oO0QQo.display === "bind" && oO0QQo.bindSucNoFed) {
            _$td(oOoo0O + ' ' + ".td-popup-info").hide();
          }
          _$td(oOoo0O + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi");
          setTimeout(function () {
            _$td(oOoo0O + ' ' + '.td-pop-cnt .td-nw-wrapper').css("border", "none");
          }, 300);
          if (oO0QQo.display === "bind" && !oO0QQo.bindSucNoFed) {
            oOO0OQ = oOO0OQ + 500;
            setTimeout(function () {
              OQo0Q0.popupCloseAni(oOoo0O);
            }, 200);
          }
          setTimeout(function () {
            _$td(oOoo0O + ' ' + ".td-pop-3d-area").length && _$td(".td-pop-3d-area").hide();
            _$td(oOoo0O + ' ' + ".td-pop-slide-area").length && _$td(".td-pop-slide-area").hide();
            _$td(oOoo0O + ' ' + ".td-pop-click-area").length && _$td(".td-pop-click-area").hide();
            _$td(oOoo0O + '.td-outer-wrapper.pop').hide();
          }, oOO0OQ);
          OoO0Qo();
        }, QQoooQ);
      },
      onPopupError: function (oOoo0O, QQoooQ, ooQO0o) {
        _$td(oOoo0O + ' ' + ".td-pop-cnt." + ooQO0o).addClass("shake");
        setTimeout(function () {
          _$td(oOoo0O + ' ' + ".td-pop-cnt." + ooQO0o).removeClass("shake");
          OoO0Qo();
        }, QQoooQ);
      },
      support_css3: function (oQQ0Qo) {
        var QQoooQ = document.createElement("div"),
          ooQOQO = "Ms O Moz Webkit".split(' '),
          QOoOOO = ooQOQO.length;
        if (oQQ0Qo in QQoooQ.style) return true;
        oQQ0Qo = oQQ0Qo.replace(/^[a-z]/, function (oQQ0Qo) {
          return oQQ0Qo.toUpperCase();
        });
        while (QOoOOO--) {
          if (ooQOQO[QOoOOO] + oQQ0Qo in QQoooQ.style) {
            return true;
          }
        }
        return false;
      },
      support_css3_value: function (oQQ0Qo, QQoooQ) {
        var ooQOQO = document.createElement("div"),
          QOoOOO = "Ms O Moz Webkit".split(' '),
          oQO0Q0 = QOoOOO.length;
        if (oQQ0Qo in ooQOQO.style) {
          ooQOQO.style[oQQ0Qo] = QQoooQ;
          return ooQOQO.style[oQQ0Qo] === QQoooQ;
        }
        oQQ0Qo = oQQ0Qo.replace(/^[a-z]/, function (oQQ0Qo) {
          return oQQ0Qo.toUpperCase();
        });
        while (oQO0Q0--) {
          if (QOoOOO[oQO0Q0] + oQQ0Qo in ooQOQO.style) {
            ooQOQO.style[oQQ0Qo] = QQoooQ;
            return ooQOQO.style[oQQ0Qo] === QQoooQ;
          }
        }
        return false;
      },
      isSupportTransform: function () {
        return OQo0Q0.support_css3_value("transform", 'translate(-50%, -50%)');
      },
      isSupportAnimation: function () {
        return Object.prototype.hasOwnProperty.call(document.documentElement.style, "animation") || document.documentElement.style.animation !== OQOO0Q;
      },
      isSupportBGClip: function () {
        var oQQ0Qo = navigator.userAgent && navigator.userAgent.toLowerCase().replace(/[ ]/g, '');
        var QQoooQ = oQQOQQ();
        var ooQOQO = QQoooQ.browser,
          QOoOOO = parseInt(QQoooQ.ver);
        return ooQOQO === "firefox" && QOoOOO >= 49 || ooQOQO === "chrome" && QOoOOO >= 49 || ooQOQO === "safari" && QOoOOO >= 11 || oQQ0Qo.indexOf("safari") !== -1 && oQQ0Qo.indexOf("version") !== -1 && oQQ0Qo.indexOf("android4") === -1 || oQQ0Qo.indexOf("micromessenger") >= 0;
      },
      showValidateMsg: function (oQQ0Qo) {
        var QQoooQ = ".td-pop-" + oQQ0Qo[0] + "-msg";
        var Q0OOOO = _$td(QQoooQ);
        var o0oo0O, Q0Q00O, OoOQ0O, oOOoQO;
        if (typeof oQQ0Qo[3] === "function") {
          o0oo0O = oQQ0Qo[3];
          Q0Q00O = oQQ0Qo[4];
          OoOQ0O = oQQ0Qo[5];
        } else {
          OoOQ0O = oQQ0Qo[3];
        }
        switch (oQQ0Qo[1]) {
          case "success":
            oOOoQO = "#55C116";
            break;
          case "fail":
            oOOoQO = "#FF5232";
            break;
          case "warn":
            oOOoQO = "#ffa421";
            break;
        }
        Q0OOOO.text(oQQ0Qo[2]).css("bottom", "0px").css("background-color", oOOoQO);
        setTimeout(function () {
          o0oo0O ? o0oo0O(Q0Q00O) : {};
          Q0OOOO.css("bottom", "-30px").css("background-color", "transparent");
          OoO0Qo();
        }, OoOQ0O);
      },
      setValidateMsg: function (QQOoQQ) {
        var QQoooQ = ".td-pop-" + QQOoQQ[0] + "-msg";
        var Q0OOOO = _$td(QQoooQ);
        var o0oo0O, Q0Q00O, OoOQ0O;
        if (typeof QQOoQQ[3] === "function") {
          o0oo0O = QQOoQQ[3];
          Q0Q00O = QQOoQQ[4];
          OoOQ0O = QQOoQQ[5];
        } else {
          OoOQ0O = QQOoQQ[3];
        }
        Q0OOOO.text(QQOoQQ[2]).addClass(QQOoQQ[1]);
        setTimeout(function () {
          Q0OOOO.removeClass(QQOoQQ[1]);
          o0oo0O ? o0oo0O(Q0Q00O) : {};
          OoO0Qo();
        }, OoOQ0O);
      }
    };
    var OQQ0oQ = function (oQQ0Qo, QQoooQ, QOQ0oo) {
      var O0QoQ0 = {},
        OQQ000 = {},
        OoOQ0O = _$td(oQQ0Qo)[0],
        oQQ00O = OoOQ0O.getContext('2d'),
        Q0oQQQ = new Image(),
        QQoQOo = 320,
        OoOoO0 = QQoQOo * 18 / 32,
        Oo0QoQ = 8;
      var QQQOQO = OQooOo.mode || 1;
      switch (OQooOo.imageType) {
        case '1':
          OoOQ0O.width = 320 * Number(QQQOQO);
          OoOQ0O.height = 180 * Number(QQQOQO);
          QQoQOo = 320 * Number(QQQOQO);
          OoOoO0 = QQoQOo * 18 / 32;
          Oo0QoQ = 8;
          if (OQooOo.imageGeneral) {
            QOQ0oo = Q0o0Oo(QOQ0oo, (OQooOo.bgImageSplitSequence || '').substr(0, 16));
          }
          break;
        case '3':
        case '2':
        case '4':
        case '7':
          QQoQOo = 320;
          OoOoO0 = QQoQOo * 18 / 32;
          Oo0QoQ = 8;
          if (OQooOo.imageGeneral) {
            QOQ0oo = Q0o0Oo(QOQ0oo, (OQooOo.bgImageSplitSequence || '').substr(0, 16));
          }
          break;
        case '5':
        case '6':
          QQoQOo = 120;
          OoOoO0 = 120;
          Oo0QoQ = 4;
          break;
        default:
          break;
      }
      Q0oQQQ.crossOrigin = "Anonymous";
      Q0oQQQ.src = QQoooQ;
      Q0oQQQ.onload = function () {
        var o0Q0OQ = function (oQQ0Qo, QQoooQ) {
          var ooQOQO = 0;
          for (var QOoOOO = 0; QOoOOO < oQQ0Qo.length; QOoOOO++) {
            ooQOQO = ooQOQO + Math.abs(oQQ0Qo[QOoOOO] - QQoooQ[QOoOOO]);
          }
          return ooQOQO <= 65 && ooQOQO >= 20;
        };
        var QQoooQ = function (oQQ0Qo, QQoooQ) {
          if (o0Q0OQ([oOo0QO[oQQ0Qo + QQoooQ], oOo0QO[oQQ0Qo + QQoooQ + 1], oOo0QO[oQQ0Qo + QQoooQ + 2], oOo0QO[oQQ0Qo + QQoooQ + 3]], [oOo0QO[oQQ0Qo], oOo0QO[oQQ0Qo + 1], oOo0QO[oQQ0Qo + 2], oOo0QO[oQQ0Qo + 3]])) {
            oOo0QO[oQQ0Qo] = oOo0QO[oQQ0Qo + QQoooQ];
            oOo0QO[oQQ0Qo + 1] = oOo0QO[oQQ0Qo + QQoooQ + 1];
            oOo0QO[oQQ0Qo + 2] = oOo0QO[oQQ0Qo + QQoooQ + 2];
            oOo0QO[oQQ0Qo + 3] = oOo0QO[oQQ0Qo + QQoooQ + 3];
          }
        };
        oQQ00O.drawImage(Q0oQQQ, 0, 0, Math.round(QQoQOo / Oo0QoQ) * Oo0QoQ, Math.round(OoOoO0 / 2) * 2);
        if (!(OQooOo.imageType == '7' && QOQ0oo == "0000000000000000")) {
          for (var ooQOQO = 0; ooQOQO < 2; ooQOQO++) {
            O0QoQ0[ooQOQO] = {};
            for (var QOoOOO = 0; QOoOOO < Oo0QoQ; QOoOOO++) {
              var oQO0Q0 = oQQ00O.getImageData(Math.round(QQoQOo / Oo0QoQ) * QOoOOO, Math.round(OoOoO0 / 2) * ooQOQO, Math.round(QQoQOo / Oo0QoQ), Math.round(OoOoO0 / 2));
              O0QoQ0[ooQOQO][QOoOOO] = oQO0Q0;
            }
          }
          OQQ000 = [{}, {}];
          for (var QOoOOO = 0; QOoOOO < QOQ0oo.length; QOoOOO++) {
            var oOOoQO = parseInt(QOQ0oo[QOoOOO], 16);
            if (oOOoQO < Oo0QoQ) {
              OQQ000[0][oOOoQO] = {};
              if (QOoOOO >= Oo0QoQ) {
                OQQ000[0][oOOoQO] = O0QoQ0[1][QOoOOO - Oo0QoQ];
              } else {
                OQQ000[0][oOOoQO] = O0QoQ0[0][QOoOOO];
              }
            } else {
              OQQ000[1][oOOoQO - Oo0QoQ] = {};
              if (QOoOOO >= Oo0QoQ) {
                OQQ000[1][oOOoQO - Oo0QoQ] = O0QoQ0[1][QOoOOO - Oo0QoQ];
              } else {
                OQQ000[1][oOOoQO - Oo0QoQ] = O0QoQ0[0][QOoOOO];
              }
            }
          }
          for (var ooQOQO = 0; ooQOQO < 2; ooQOQO++) {
            for (var QOoOOO = 0; QOoOOO < Oo0QoQ; QOoOOO++) {
              oQQ00O.putImageData(OQQ000[ooQOQO][QOoOOO], Math.round(QQoQOo / Oo0QoQ) * QOoOOO, Math.round(OoOoO0 / 2) * ooQOQO);
            }
          }
          var OOOQOQ = oQQ00O.getImageData(0, 0, QQoQOo, OoOoO0);
          var oOo0QO = OOOQOQ.data;
          for (var QQQOQO = Math.round(QQoQOo / Oo0QoQ), QOQQO0 = QQQOQO; QOQQO0 < QQoQOo; QOQQO0 += QQQOQO) {
            for (var Qoo0Q0 = 0; Qoo0Q0 < OoOoO0; Qoo0Q0++) {
              QQoooQ((QQoQOo * Qoo0Q0 + QOQQO0 - 1) * 4, -4, oOo0QO);
              QQoooQ((QQoQOo * Qoo0Q0 + QOQQO0) * 4, 4, oOo0QO);
            }
          }
          for (var QOQ0QQ = Math.round(OoOoO0 / 2), oOOOoo = QOQ0QQ; oOOOoo < OoOoO0; oOOOoo += QOQ0QQ) {
            for (var QoOO00 = 0; QoOO00 < QQoQOo; QoOO00++) {
              QQoooQ((QQoQOo * (oOOOoo - 2) + QoOO00) * 4, -4 * QQoQOo, oOo0QO);
              QQoooQ((QQoQOo * oOOOoo + QoOO00) * 4, 4 * QQoQOo, oOo0QO);
            }
          }
          oQQ00O.putImageData(OOOQOQ, 0, 0);
        }
        OoO0Qo();
        ooQO0Q();
        _$td(QOO0oO + " .refresh-bg").hide();
        OOoOoQ = false;
        QOoQOO = false;
        Q0Q000 = false;
      };
    };
    var ooQ000 = function () {
      if (!_$td(OoQO00).length) {
        setTimeout(ooQ000, 300);
        return;
      }
      var oQQ0Qo = function (oQQ0Qo) {
        var QQoooQ = Number(oQQ0Qo.replace('px', '')) + 2;
        return QQoooQ + 'px';
      };
      var QQoooQ = oO0QQo.width;
      var Q0OooQ = QQ0OoQ.buttonLogoUrl || oQOoQQ + '/captcha/main/icon/tdicon2x.png';
      oO0QQo.height = oO0QQo.height || "40px";
      oO0QQo.width = oO0QQo.width || "300px";
      var QOoOOO = function () {
        var oQQ0Qo = '';
        if (QQQQoQ || o0Oo0O) {
          oQQ0Qo = oQQ0Qo + "line-height:" + oO0QQo.height + ';';
        }
        return oQQ0Qo;
      };
      var oQO0Q0 = function () {
        if (QQQQoQ) {
          return '<a class="icon-custom" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=' + Q0OooQ + ',sizingMethod=scale);"></a>';
        } else {
          return '<a class="icon-custom" style="background-image:url(' + Q0OooQ + ");\"></a>";
        }
      };
      if (oO0QQo.display !== "bind" && _$td(OoQO00).length && _$td(OoQO00 + ' ' + ".td-btn-cnt").length === 0) {
        _$td(OoQO00).append('<div class="td-btn-cnt td-s-logo" style="width: ' + oO0QQo.width + ";height:" + oO0QQo.height + '">' + '<div class="td-btn"><div class="td-btn-wrapper" style="height:' + oO0QQo.height + ';' + QOoOOO() + '">' + '<div class="td-pseu-border" style="width: ' + (oO0QQo.width ? oQQ0Qo(oO0QQo.width) : "302px") + ";height: " + (oO0QQo.height ? oQQ0Qo(oO0QQo.height) : "42px") + "\"></div>" + '<div class="td-btn-success">' + '<div class="td-btn-group">' + '<div class="td-icon-container">' + '<svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-sg-sc1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-sg-sc2" transform="translate(-4281.000000, -920.000000)" fill="#55C116" fill-rule="nonzero">' + '<g id="td-sg-sc3" transform="translate(4280.000000, 919.000000)">' + '<path d="M12,1.4 C14.8490184,1.4 17.5206398,2.5300026 19.4953164,4.50466828 C21.4699916,6.47936528 22.6,9.15098624 22.6,12 C22.6,14.8490172 21.4699887,17.5206394 19.4953141,19.4953141 C17.5206394,21.4699887 14.8490172,22.6 12,22.6 C9.15098624,22.6 6.47936528,21.4699916 4.50466476,19.4953129 C2.5300026,17.5206398 1.4,14.8490184 1.4,12 C1.4,9.15098509 2.52999971,6.47936489 4.50466945,4.50466241 C6.47936489,2.52999971 9.15098509,1.4 12,1.4 Z M12,2.6 C9.47251451,2.6 7.10507502,3.60134216 5.35319759,5.35319055 C3.60134216,7.10507502 2.6,9.47251451 2.6,12 C2.6,14.5274876 3.6013438,16.894926 5.35319172,18.6467836 C7.10507794,20.3986504 9.47251738,21.4 12,21.4 C14.5274847,21.4 16.8949231,20.3986488 18.6467859,18.6467859 C20.3986488,16.8949231 21.4,14.5274847 21.4,12 C21.4,9.47251738 20.3986504,7.10507794 18.6467871,5.35319524 C16.894926,3.6013438 14.5274876,2.6 12,2.6 Z M17.4242641,8.57573593 C17.6325437,8.78401555 17.6556859,9.10732483 17.4936906,9.3411666 L17.4242641,9.42426407 L11.4242641,15.4242641 C11.2159844,15.6325437 10.8926752,15.6556859 10.6588334,15.4936906 L10.5757359,15.4242641 L7.57573593,12.4242641 C7.34142136,12.1899495 7.34142136,11.8100505 7.57573593,11.5757359 C7.78401555,11.3674563 8.10732483,11.3443141 8.3411666,11.5063094 L8.42426407,11.5757359 L11,14.151 L16.5757359,8.57573593 C16.8100505,8.34142136 17.1899495,8.34142136 17.4242641,8.57573593 Z" id="td-sg-sc9"></path>' + "</g>" + "</g>" + "</g>" + "</svg>" + "</div>" + '<span class="td-btn-content"' + '>' + QQQ0oQ.passTip + "</span>" + "</div>" + oQO0Q0() + "</div>" + '<div class="td-btn-fail">' + '<span class="td-btn-content"  style="line-height: ' + (oO0QQo.height || "40px") + "\"></span>" + oQO0Q0() + "</div>" + '<div class="td-btn-logo">' + '<div class="td-btn-group">' + '<div class="td-icon-container">' + '<div class="td-logo-icon td-sprite-icon"></div>' + "</div>" + '<span class="td-btn-content"' + '>' + QQQ0oQ.btnClickTip + "</span>" + "</div>" + oQO0Q0() + "</div>" + '<div class="td-btn-loading">' + '<div class="td-btn-group">' + '<div class="td-icon-container">' + '<div class="td-logo-icon td-sprite-icon"></div>' + "</div>" + '<span class="td-btn-content"' + '>' + QQQ0oQ.verifyTip + "</span>" + "</div>" + oQO0Q0() + "</div>" + '<div class="td-btn-validate">' + '<div class="td-btn-group">' + '<div class="td-icon-container">' + '<div class="td-logo-icon td-sprite-icon"></div>' + "</div>" + '<span class="td-btn-content"' + '>' + QQQ0oQ.btnPlaceHolder + "</span>" + "</div>" + oQO0Q0() + "</div>" + "</div></div></div>");
      }
      if (oQoOo0) {
        _$td(OoQO00 + ' ' + ".td-btn-wrapper").addClass("td-mobile");
      }
      var QoOOoO = _$td(OoQO00 + ' ' + '.td-btn-cnt.td-s-logo .td-btn-logo .td-logo-icon');
      _$td(OoQO00 + ' ' + '.td-btn-cnt.td-s-logo').mouseenter(function () {
        QoOOoO.addClass("td-b-rip");
      }).mouseleave(function () {
        QoOOoO.removeClass("td-b-rip");
      });
      if (QQQQoQ || o0Oo0O) {
        _$td(".td-btn-cnt").addClass("ie-compat");
      }
      if (OoOoOO()) {
        if (!o0Oo0O && !QQQQoQ) {
          _$td(".td-pop-cnt").addClass("ie-all");
        }
      }
      _$td(oO0QQo.display === "bind" ? OoQO00 : OoQO00 + ' ' + ".td-btn-cnt").on("click", Ooo00Q);
      if (oO0QQo.display === "float") {
        _$td(window).on(oQoOo0 ? "orientationchange" : "resize", function (oQQ0Qo) {
          _$td(".td-pop-cnt").css(o0O0Q0());
        });
      }
      if (oO0QQo.display === "custom") {
        _$td(window).on(oQoOo0 ? "orientationchange" : "resize", function (oQQ0Qo) {
          oo0oo0();
        });
      }
      !oO0QQo.webview && QQQOoo();
      if (o0Qo0O) {
        _$td(".icon-custom").css("display", "inline-block");
        _$td('.td-pop-footer .slogan-custom').css("display", "block");
      } else {
        _$td(".icon-custom").hide();
        _$td('.td-pop-footer .slogan-custom').hide();
      }
    };
    var OOoOOQ = function (oQQ0Qo) {
      setTimeout(function () {
        oO000O = null;
        OoQ0QQ = null;
        oQ0Q0O = null;
        O00Ooo = [];
        o0QOQQ = false;
        O0Q0oQ = 0;
      }, oQQ0Qo);
      if (OQooOo) {
        setTimeout(function () {
          if (OQooOo.imageType === '1') {
            if (OQo0Q0.isSupportTransform()) {
              _$td(".td-pop-slidetrigger").css({
                transform: 'translate(0px, 0px) scale(1)'
              });
              _$td('.td-pop-slide-identity').css({
                transform: 'translate(16px, 0px) scale(1)'
              });
            } else {
              _$td(".td-pop-slidetrigger").css({
                left: "0px"
              });
              _$td('.td-pop-slide-identity').css({
                left: "16px"
              });
            }
          } else if (OQooOo.imageType === '2' || OQooOo.imageType === '3' || OQooOo.imageType === '4') {}
        }, oQQ0Qo || 600);
      }
    };
    var oOoo0o = function () {
      var oQQ0Qo = Array.prototype.slice.call(arguments);
      if (OQo0Q0.isSupportAnimation()) {
        OQo0Q0.setValidateMsg(oQQ0Qo);
      } else {
        OQo0Q0.showValidateMsg(oQQ0Qo);
      }
    };
    var Qo0QO0 = function (oQQ0Qo) {
      var QQoooQ = Math.floor(oQQ0Qo);
      var ooQOQO = 78;
      switch (QQoooQ) {
        case 0:
          ooQOQO = 97;
          break;
        case (84 - 70) / 14:
          ooQOQO = 93;
        case (132 - 94) / 19:
          ooQOQO = 91;
          break;
        case (123 - 69) / 18:
          ooQOQO = 87;
          break;
        case (140 - 80) / 15:
          ooQOQO = 83;
          break;
        default:
          break;
      }
      ;
      return '速度 ' + oQQ0Qo + ' 秒 超过 ' + ooQOQO + '% 的用户';
    };
    var oOooOo = function (oQQ0Qo) {
      var ooOoQ0 = false;
      try {
        ooOoQ0 = navigator.userAgent.indexOf("MI 9") != -1 && !oO0QQo.webview && oQoOo0;
      } catch (e) {}
      var o00QQO = 0;
      var OQOoOQ = 0;
      if (!OQooOo) {
        return;
      }
      _$td(QOO0oO + " .refresh-bg").show().removeClass("initial");
      var oQO0Q0 = oO0QQo && (oO0QQo.display === "popup" || oO0QQo.display === "custom"),
        QoO0OO = false,
        oOOoQO;
      if (OQo0Q0.isSupportBGClip() && OQo0Q0.isSupportAnimation()) {
        oOOoQO = "td-pop-slidebar-tip";
      } else {
        oOOoQO = 'td-pop-slidebar-tip-sub';
      }
      if (_$td(QOO0oO + ' ' + ".td-pop-click-area").length !== 0) {
        _$td(QOO0oO + ".td-outer-wrapper").remove();
      }
      if (_$td(QOO0oO + ' ' + ".td-pop-slide-area").length === 0) {
        var ooQQ0Q = '<div class="td-pop-slide-area"><div class="td-pop-slide-title"><div class="td-pop-title">' + QQQ0oQ.slideTitle + "</div>" + "</div>" + '<div class="td-pop-center">' + OOQoOo + '<div class="td-pop-slide-msg"></div>' + '<img class="td-pop-slide-identity" src="" draggable="false"/>' + "</div>" + '<div class="td-slide-wrap">' + '<div class="td-pop-slidebar">' + "</div>" + '<div class="td-pop-slidetrigger td-sprite-icon" style="background-color:' + QQ0OoQ.themeColor + '">' + (oQoOo0 ? '' : '<div class="td-trigger-mask"></div>') + '<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">' + '<g id="td-sg-tg1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">' + '<g id="td-sg-tg2" transform="translate(-3518.000000, -1056.000000)" fill="#FFFFFF" fill-rule="nonzero">' + '<g id="td-sg-tg3" transform="translate(3518.000000, 1056.000000)">' + '<rect id="td-sg-tg4" fill-opacity="0.01" x="0" y="0" width="24" height="24"></rect>' + '<path d="M5.00079182,4.83636956 L5.11471423,4.93933983 L11.1147142,10.9393398 C11.663889,11.4885146 11.6982124,12.357577 11.2176845,12.9467378 L11.1147142,13.0606602 L5.11471423,19.0606602 C4.52892779,19.6464466 3.57918032,19.6464466 2.99339388,19.0606602 C2.4442191,18.5114854 2.40989567,17.642423 2.89042361,17.0532622 L2.99339388,16.9393398 L7.933,12 L2.99339388,7.06066017 C2.4442191,6.51148539 2.40989567,5.64242298 2.89042361,5.05326224 L2.99339388,4.93933983 C3.54256867,4.39016504 4.41163108,4.35584162 5.00079182,4.83636956 Z M15.5413324,4.83636956 L15.6552548,4.93933983 L21.6552548,10.9393398 C22.2044296,11.4885146 22.238753,12.357577 21.758225,12.9467378 L21.6552548,13.0606602 L15.6552548,19.0606602 C15.0694683,19.6464466 14.1197209,19.6464466 13.5339344,19.0606602 C12.9847596,18.5114854 12.9504362,17.642423 13.4309642,17.0532622 L13.5339344,16.9393398 L18.473,12 L13.5339344,7.06066017 C12.9847596,6.51148539 12.9504362,5.64242298 13.4309642,5.05326224 L13.5339344,4.93933983 C14.0831092,4.39016504 14.9521716,4.35584162 15.5413324,4.83636956 Z" id="td-sg-tg9"></path>' + "</g>" + "</g>" + "</g>" + "</svg>" + "</div>" + "</div>" + OoOQQo + "</div>";
        if (oO0QQo.display === "bind") {
          if (_$td(QOO0oO + ".td-outer-wrapper").length === 0) {
            ooo0OO("slide");
          }
          _$td(QOO0oO + ' ' + '.td-pop-cnt .td-nw-wrapper').append(ooQQ0Q);
        } else {
          var QOo0Oo = oO0QQo.display === "float" ? '<div class="td-outer-wrapper pop ' + Q0oQOO + '">' + '<div class="td-mask-common background ' + (oQO0Q0 ? "grey" : "clear") + "\"></div>" + '<div class="td-pop-cnt slide td-n-hi">' + (oO0QQo.display === "bind" ? '<div class="td-nw-wrapper td-bind">' : '<div class="td-nw-wrapper td-flat">') + ooQQ0Q + "</div>" + "</div>" + "</div>" : '<div class="td-outer-wrapper pop ' + Q0oQOO + '">' + '<div class="td-mask-common background ' + (oQO0Q0 ? "grey" : "clear") + "\"></div>" + '<div class="td-pop-cnt slide td-n-hi">' + (oO0QQo.display === "bind" ? '<div class="td-nw-wrapper td-bind">' : '<div class="td-nw-wrapper td-flat">') + ooQQ0Q + "</div>" + '<div class="td-popup-info td-pp-hi">' + '<div class="td-popup-content">' + '<div class="td_validate_box">' + (oO0QQo.closeLoading ? '' : '<div class="td_logo_img td-sprite-icon">' + QOO00Q + "</div>") + "</div>" + '<div class="td_fail_box">' + '<div class="td_fail_img td-sprite-icon">' + OO0O00 + "</div>" + "</div>" + '<div class="td_success_box">' + '<div class="td_success_img td-sprite-icon">' + QQQQ00 + "</div> " + "</div>" + '<div class="td_validate_msg"></div> ' + "</div> " + "</div>" + "</div>" + "</div>";
          _$td("body").append(QOo0Oo);
        }
        _$td(QOO0oO + ' ' + ".td-custom-logo").off("click").on("click", function () {
          !oO0QQo.webview && window.open(QQ0OoQ.navigatorTo);
        });
        if (!OoOoOO() && !oQoOo0) {
          _$td(QOO0oO + ' ' + ".td-icon-set svg").mouseenter(function (oQQ0Qo) {
            oQQ0Qo.currentTarget.children[0].children[0].setAttribute("fill", "#333333");
          }).mouseleave(function (oQQ0Qo) {
            oQQ0Qo.currentTarget.children[0].children[0].setAttribute("fill", "#7E7E7E");
          });
        }
        if (oO0QQo.lang === 'ja') {
          _$td(QOO0oO + ' ' + ".td-pop-slide-title").addClass("jp-compat");
        }
        _$td(QOO0oO + ' ' + ".td-icon-refresh").click(function () {
          if (!OOoOoQ && QoQOOO !== "success" && !Q0Q000) {
            Q0oo0o();
          }
        });
        if (oO0QQo.display === "custom") {
          oo0oo0();
        }
        if (oO0QQo.popWidth) {
          var OOOQOQ = parseFloat(oO0QQo.popWidth.replace(/[^0-9.]/ig, '')),
            QoQQo0 = OOOQOQ * OoOOO0 / OoOo0Q;
          _$td(QOO0oO + ' ' + ".td-pop-center").width(oO0QQo.popWidth).height(QoQQo0 + oO0QQo.popWidth.replace(/[0-9.]/ig, ''));
        }
        var QQQOQO = function (oQQQ0o) {
            var QQoooQ = oQQQ0o;
            if (oQoOo0) {
              QQoooQ = (oQQQ0o.changedTouches || [{}])[0];
            } else {
              switch (oQoQOo) {
                case 0:
                case (77 - 59) / 6:
                  QQoooQ = oQQQ0o.originalEvent || {};
                  break;
                case (86 - 75) / 11:
                  QQoooQ = (oQQQ0o.originalEvent.changedTouches || [{}])[0];
                  break;
              }
            }
            if (!QoO0OO || OOoOoQ || Q0Q000) {
              return;
            }
            if (ooOoQ0) {
              clearInterval(oOoOoQ);
              o00QQO = new Date().getTime();
              oOoOoQ = setInterval(function () {
                OQOoOQ = new Date().getTime() - o00QQO;
                if (OQOoOQ > 300) {
                  O00Ooo.push({
                    type: o00ooO.MouseUp,
                    time: new Date().getTime(),
                    dialog_type: QO0oo0(oQQQ0o),
                    op_x: O0OQ0o.x,
                    op_y: O0OQ0o.y
                  });
                  QQoo00(oQQQ0o);
                  clearInterval(oOoOoQ);
                }
              });
            }
            var ooQOQO = QQoooQ.pageX - _$td(QOO0oO + ' ' + ".td-pop-slidebar").offset().left - Qo0O0o;
            ooQOQO = ooQOQO < 0 ? 0 : ooQOQO;
            ooQOQO = ooQOQO > o00oOo * Oo0OOo - 74 * Oo0OOo ? o00oOo * Oo0OOo - 74 * Oo0OOo : ooQOQO;
            if (OQo0Q0.isSupportTransform()) {
              _$td(QOO0oO + ' ' + ".td-pop-slidetrigger").css({
                transform: "translate(" + ooQOQO / Oo0OOo + "px, 0px)"
              });
              _$td(QOO0oO + ' ' + '.td-pop-slide-identity').css({
                transform: 'scale(1.1) translate(' + Number((ooQOQO + 16) / Oo0OOo / 1.1) + "px, 0px)"
              });
            } else {
              _$td(QOO0oO + ' ' + ".td-pop-slidetrigger").css({
                left: ooQOQO / Oo0OOo + 'px'
              });
              _$td(QOO0oO + ' ' + '.td-pop-slide-identity').css({
                left: Number((ooQOQO + 16) / Oo0OOo) + 'px'
              });
            }
            oQQQ0o.stopPropagation();
            oQQQ0o.preventDefault();
            QoO0OO = true;
            o0OOOQ = new Date().getTime();
            var QOoOOO = QQoooQ;
            O0OQ0o = {
              x: QOoOOO.pageX,
              y: QOoOOO.pageY
            };
            var oQO0Q0 = O00Ooo[O00Ooo.length - 1];
            if (oQO0Q0 && oQO0Q0.type === o00ooO.MouseMove && Math.abs(o0OOOQ - oQO0Q0.time) < ooQooO) {
              if (Math.abs(oQO0Q0.op_x - O0OQ0o.x) < 3 && Math.abs(oQO0Q0.op_y - O0OQ0o.y) < 3) {
                return;
              }
            }
            O00Ooo.push({
              type: o00ooO.MouseMove,
              time: o0OOOQ,
              Action: '',
              op_x: QOoOOO.pageX,
              op_y: QOoOOO.pageY
            });
          },
          QQoo00 = function (oQQ0Qo) {
            if (!QoO0OO || Q0Q000 || OOoOoQ) {
              return;
            }
            if (!QQQQoQ && !o0Oo0O) {
              setTimeout(function () {
                var oQQ0Qo = _$td(QOO0oO + ' ' + '.td-pop-slide-identity');
                oQQ0Qo.css("transform", oQQ0Qo.css("transform").replace(/1\.1/g, "1.0"));
              }, 50);
            }
            var OOOOo0 = oQQ0Qo;
            if (oQoOo0) {
              OOOOo0 = ((oQQ0Qo.originalEvent ? oQQ0Qo.originalEvent.changedTouches : oQQ0Qo.changedTouches) || [{}])[0];
            } else {
              switch (oQoQOo) {
                case 0:
                case (128 - 68) / 20:
                  OOOOo0 = oQQ0Qo.originalEvent || {};
                  break;
                case (55 - 44) / 11:
                  OOOOo0 = (oQQ0Qo.originalEvent.changedTouches || [{}])[0];
                  break;
              }
            }
            oo0Q0o();
            OoQ0QQ = new Date();
            setTimeout(function () {
              QoO0OO = false;
            }, 0);
            setTimeout(function () {
              QoO0Oo = OOOOo0.pageX - _$td(QOO0oO + ' ' + ".td-pop-slidebar").offset().left - Qo0O0o + 16;
              var oQQ0Qo = OQooOo.mode || 1;
              QoO0Oo = QoO0Oo * Number(oQQ0Qo);
              if (QoO0Oo < 26) {
                OQQO0Q();
                return;
              }
              if (O00Ooo.length > oQQOOQ) {
                O00Ooo = O00Ooo.slice(-oQQOOQ);
              }
              Q0Q000 = true;
              setTimeout(ooQOOo, 200);
            }, 100);
          },
          Qoo0Q0 = O0OQ00[oQoQOo][0],
          QOQ0QQ = O0OQ00[oQoQOo][1],
          oOOOoo = O0OQ00[oQoQOo][2];
        if (oO0QQo.display === "float") {
          _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("float");
        } else {
          var QoOO00 = !QQQQoQ ? "center" : "center-ie8";
          _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass(QoOO00);
        }
        _$td(QOO0oO + ' ' + ".td-pop-cnt").click(function (oQQ0Qo) {
          oQQ0Qo.stopPropagation();
        });
        (oO0QQo.closeIcon == 0 || oO0QQo.closeMask == 0) && _$td((oO0QQo.closeMask == 0 ? QOO0oO + '.td-outer-wrapper.pop' : '') + (oO0QQo.closeIcon == 0 && oO0QQo.closeMask == 0 ? " .td-mask-common," : '') + (oO0QQo.closeIcon == 0 ? QOO0oO + " .td-icon-close" : '')).on("click", function (oQQ0Qo) {
          QOoQOO = true;
          if (QoO0OO) {
            return;
          }
          OQ00Qo();
          if (!Q0Q000) {
            if (!oO0QQo.webview) {
              setTimeout(function () {
                if (oO0QQo.display === "bind") {
                  _$td(QOO0oO + ' ' + ".td-popup-info").addClass("td-pp-hi");
                  _$td(QOO0oO + ' ' + ".td-popup-info").hide();
                  _$td(QOO0oO + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi").addClass("td-n-zero");
                } else {
                  _$td(QOO0oO + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi");
                }
                setTimeout(function () {
                  _$td(QOO0oO + ' ' + '.td-pop-cnt .td-nw-wrapper').css("border", "none");
                }, 0);
                setTimeout(function () {
                  _$td(QOO0oO + ' ' + ".td-pop-3d-area").length && _$td(".td-pop-3d-area").hide();
                  _$td(QOO0oO + ' ' + ".td-pop-slide-area").length && _$td(".td-pop-slide-area").hide();
                  _$td(QOO0oO + ' ' + ".td-pop-click-area").length && _$td(".td-pop-click-area").hide();
                  _$td(QOO0oO + '.td-outer-wrapper.pop').hide();
                  _$td(QOO0oO + '.td-outer-wrapper.pop .td-pop-cnt').removeClass("td-n-zero");
                }, 0);
                OoO0Qo();
              }, 0);
            }
          }
          oO0QQo.webview && oO0QQo.close && oO0QQo.close(JSON.stringify(oOQ0QQ[3]));
          oO0QQo.onClose && oO0QQo.onClose();
          var QQoooQ = _$td(OoQO00 + ' ' + ".td-btn-cnt")[0];
          if (QQoooQ) {
            if (QQQQoQ || o0Oo0O) {
              QQoooQ.className = 'td-btn-cnt td-s-logo ie-compat';
            } else {
              QQoooQ.className = "td-btn-cnt td-s-logo";
            }
          }
        });
        _$td(QOO0oO + ' ' + ".td-pop-slidetrigger").on(Qoo0Q0, function (oQQ0Qo) {
          if (!Q0Q000 && !OOoOoQ && !QOoQOO) {
            QoO0OO = true;
            OQ00Qo();
            if (!oO000O) {
              oO000O = new Date();
            }
            oQ0Q0O = new Date();
            var QQoooQ = oQQ0Qo;
            if (oQoOo0) {
              QQoooQ = (oQQ0Qo.originalEvent.changedTouches || [{}])[0];
            } else {
              switch (oQoQOo) {
                case 0:
                case (111 - 66) / 15:
                  QQoooQ = oQQ0Qo.originalEvent || {};
                  break;
                case (102 - 94) / 8:
                  QQoooQ = (oQQ0Qo.originalEvent.changedTouches || [{}])[0];
                  break;
              }
            }
            oOQQ00 = QQoooQ.pageX;
            o0QoOQ = QQoooQ.pageY;
            Qo0O0o = QQoooQ.pageX - _$td(QOO0oO + ' ' + ".td-pop-slidebar").offset().left;
            var ooQOQO = _$td(QOO0oO + ' ' + ".td-pop-slidetrigger");
            ooQOQO.addClass("mousedown");
            _$td(QOO0oO + ' ' + '.td-pop-slide-identity').addClass("mousedown");
            OQo0Q0.isSupportTransform() ? _$td('.td-pop-slide-identity').css({
              transform: 'translate(16px, 0px) scale(1.1)'
            }) : _$td('.td-pop-slide-identity').css({
              left: "16px"
            });
          }
        });
        if (oQoOo0) {
          document.addEventListener(QOQ0QQ, QQQOQO, {
            passive: false
          });
        } else {
          _$td(document).on(QOQ0QQ, QQQOQO);
        }
        if (!ooOoQ0) _$td(document).on(oOOOoo, QQoo00);
      }
      if (oO0QQo.display === "float") {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").css(o0O0Q0());
      }
      if (OQ0Q0o) {
        OQ0O0O(QOO0oO + ' ' + ".td-bg-img", oQOoQQ + OQooOo.slideBgi, OQooOo.imageGeneral || OQooOo.bgImageSplitSequence);
      } else {
        OQQ0oQ(QOO0oO + ' ' + ".td-bg-img", oQOoQQ + OQooOo.slideBgi, OQooOo.imageGeneral || OQooOo.bgImageSplitSequence);
      }
      var QOo0oo = OQooOo.mode || 1;
      _$td(QOO0oO + ' ' + '.td-pop-slide-identity').css({
        top: OQooOo.slideY / Number(QOo0oo) + 'px'
      });
      var oQ0oQo = new Image();
      oQ0oQo.src = oQOoQQ + OQooOo.slideImage;
      oQ0oQo.onload = function () {
        _$td(QOO0oO + ' ' + '.td-pop-slide-identity').css({
          width: oQ0oQo.width / Number(QOo0oo),
          height: oQ0oQo.height / Number(QOo0oo)
        });
      };
      _$td(QOO0oO + ' ' + '.td-pop-slide-identity').attr("src", oQOoQQ + OQooOo.slideImage);
      OQo0Q0.isSupportTransform() ? _$td('.td-pop-slide-identity').css({
        transform: 'translate(16px, 0px) scale(1.0)'
      }) : _$td('.td-pop-slide-identity').css({
        left: "16px"
      });
      if (!oQQ0Qo) {
        O0Q0oO(Q0oQOO);
      }
      if (QQQQoQ || o0Oo0O) {
        _$td(".td-pop-slidetrigger").addClass("ie-compat");
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("ie-compat");
        _$td(".td-btn-cnt").addClass("ie-compat");
      }
      if (OoOoOO()) {
        if (!o0Oo0O && !QQQQoQ) {
          _$td(".td-pop-cnt").addClass("ie-all");
        }
      }
      QQQ0o0();
      Q0Q000 = false;
      OoO0Qo();
      O00ooO(true);
      !oO0QQo.webview && QQQOoo();
      if (o0Qo0O) {
        _$td(".icon-custom").css("display", "inline-block");
        _$td('.td-pop-footer .slogan-custom').css("display", "block");
      } else {
        _$td(".icon-custom").hide();
        _$td('.td-pop-footer .slogan-custom').hide();
      }
    };
    var ooQOOo = function (oQQ0Qo) {
      if (oO0QQo.webview && !oQQ0Qo) {
        var QQoooQ = oO0QQo.end && oO0QQo.end('');
        if (typeof QQoooQ === "string" || typeof QQoooQ === "undefined") {
          oQQ0Qo = QQoooQ;
        }
        if (!oQQ0Qo) {
          return;
        }
        oO0QQo.start && oO0QQo.start(80, 6);
      }
      if (oQQ0Qo === '-1') {
        oQQ0Qo = '';
      }
      Q00Q0o(Oo0OQo, {
        requestType: 3,
        validateCodeObj: JSON.stringify(OQooOo),
        userAnswer: Math.round(QoO0Oo / Oo0OOo) + "|10|" + new Date().getTime(),
        mouseInfo: QQQO0O(oOQQ00, o0QoOQ),
        sensorInfo: oQQ0Qo,
        usedTime: OoQ0QQ.getTime() - oO000O.getTime()
      }, function (oQQ0Qo) {
        O00ooO(true, oQQ0Qo);
        if (_$td(QOO0oO + ' ' + ".td-pop-slidetrigger").hasClass("mousedown")) {
          setTimeout(function () {
            _$td(QOO0oO + ' ' + ".td-pop-slidetrigger").removeClass("mousedown");
            _$td(QOO0oO + ' ' + '.td-pop-slide-identity').removeClass("mousedown");
          }, 0);
        }
        if (_$td(QOO0oO + ' ' + ".td-pop-slidebar-tip").hasClass("mousedown")) {
          setTimeout(function () {
            _$td(QOO0oO + ' ' + ".td-pop-slidebar-tip").removeClass("mousedown");
          }, 2000);
        }
        if (_$td(QOO0oO + ' ' + '.td-pop-slidebar-tip-sub').hasClass("mousedown")) {
          setTimeout(function () {
            _$td(QOO0oO + ' ' + '.td-pop-slidebar-tip-sub').removeClass("mousedown");
          }, 2000);
        }
        if (!oQQ0Qo.needValidateCode && oQQ0Qo.statusCode === "200") {
          OQ00Qo();
          Qo00O0(oQQ0Qo.validateToken);
        } else {
          QQ0OQo();
          OQQO0Q(oQQ0Qo.validateCodeObj);
        }
      });
    };
    var Qo00O0 = function (O0QQo0) {
      QoQOOO = "success";
      setTimeout(function () {
        var oQQ0Qo = _$td(oO0QQo.formID);
        if (!oO0QQo.webview && oO0QQo.formID && oQQ0Qo.length != 0) {
          if (_$td(oO0QQo.formID + ' ' + "input[name=token]").length != 0) {
            _$td(oO0QQo.formID + ' ' + "input[name=token]").attr("value", O0QQo0);
          } else {
            oQQ0Qo.append('<input name="token" style="display: none" value="' + O0QQo0 + "\"/>");
          }
          if (_$td(oO0QQo.formID + ' ' + "input[name=blackBox]").length != 0) {
            _$td(oO0QQo.formID + ' ' + "input[name=blackBox]")[0].value = oO0QQo.getinfo();
          } else {
            oQQ0Qo.append('<input name="blackBox" style="display: none" value="' + oO0QQo.getinfo() + "\"/>");
          }
          oO0QQo.display == "bind" && oQQ0Qo[0].submit();
        } else {
          oO0QQo.onSuccess && oO0QQo.onSuccess(O0QQo0);
        }
      }, 500);
      if (oO0QQo.lang !== OQOO0Q && oO0QQo.lang !== "zh-cn") {
        oOoo0o("slide", "success", QQQ0oQ.passTip, 600);
      } else {
        var QQoooQ = ((OoQ0QQ.getTime() - oQ0Q0O.getTime()) / 1000).toFixed(2);
        oOoo0o("slide", "success", Qo0QO0(QQoooQ), 600);
      }
      OOoOOQ(1600);
      if (oO0QQo.display !== "bind") {
        OQo0Q0.fadeOut(QOO0oO, 600, 500, OQo0Q0.changeBtnStatus.bind(OQo0Q0, OoQO00, true, "td-s-loading", "td-s-success", 1600));
      } else {
        if (!oO0QQo.bindSucNoFed) {
          OQo0Q0.fadeOut(QOO0oO, 600, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "success", QQQ0oQ.successTip), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "slide", '.td-pop-cnt.slide.center', 800));
        } else {
          OQo0Q0.fadeOut(QOO0oO, 800, 400);
        }
      }
      if (oO0QQo.webview) {
        setTimeout(function () {
          oO0QQo.onValidate && oO0QQo.onValidate(O0QQo0);
          oO0QQo.close && oO0QQo.close(JSON.stringify(oOQ0QQ[4]));
          return;
        }, 800);
      }
      Q00QOQ(OO00O0.slideSucc);
      OoO0Qo();
    };
    var OQQO0Q = function (oQQ0Qo) {
      oO0QQo.onFail && oO0QQo.onFail("opFail");
      OQo0Q0.onPopupError(QOO0oO, 390, "slide");
      _$td(".td-pop-center").removeClass("td-c-ani").addClass("disabled");
      if (oQQ0Qo) {
        oOoo0o("slide", "fail", QQQ0oQ.failTip, Q0oo0o, oQQ0Qo, 800);
        Q00QOQ(OO00O0.slideFail);
      } else {
        if (_$td(QOO0oO + ' ' + ".td-pop-slidetrigger").hasClass("mousedown")) {
          setTimeout(function () {
            _$td(QOO0oO + ' ' + ".td-pop-slidetrigger").removeClass("mousedown");
            _$td(QOO0oO + ' ' + '.td-pop-slide-identity').removeClass("mousedown");
          }, 0);
        }
        if (_$td(QOO0oO + ' ' + ".td-pop-slidebar-tip").hasClass("mousedown")) {
          setTimeout(function () {
            _$td(QOO0oO + ' ' + ".td-pop-slidebar-tip").removeClass("mousedown");
          }, 1500);
        }
        if (_$td(QOO0oO + ' ' + '.td-pop-slidebar-tip-sub').hasClass("mousedown")) {
          setTimeout(function () {
            _$td(QOO0oO + ' ' + '.td-pop-slidebar-tip-sub').removeClass("mousedown");
          }, 1500);
        }
        oOoo0o("slide", "fail", QQQ0oQ.slideTip, 1600);
        Q00QOQ(OO00O0.slideFrontFail);
      }
      OoO0Qo();
      setTimeout(function () {
        setTimeout(function () {
          OQo0Q0.isSupportTransform() ? _$td(".td-pop-slidetrigger").css({
            transform: "translate(0px, 0px)"
          }) : _$td(".td-pop-slidetrigger").css({
            left: "0px"
          });
          _$td('.td-pop-slide-identity').css({
            opacity: 1
          });
        }, 200);
      }, 600);
    };
    var Q0oo0o = function (oQQ0Qo) {
      _$td(QOO0oO + " .refresh-bg").show().removeClass("initial");
      OOoOoQ = true;
      O0Q0oQ++;
      if (!oQQ0Qo) {
        oo0Q0o();
        Q00QOQ(OO00O0.slideUpd);
      }
      if (!o0QOQQ) {
        if (O0Q0oQ >= QooOOO) {
          oo0Q0o();
          Q00QOQ(OO00O0.freqClose);
          o0QOQQ = true;
          oO0QQo.onFail && oO0QQo.onFail("op2much");
          OOoOOQ(2500);
          if (oO0QQo.display === "bind") {
            OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", QQQ0oQ.op2Much, 0), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "slide", ".td-pop-cnt", 800));
          } else {
            OQo0Q0.fadeOut(QOO0oO, 1200, 500, OQo0Q0.changeBtnStatus.bind(OQo0Q0, OoQO00, false, "td-s-loading", "td-s-fail", 1300, QQQ0oQ.op2MuchTA));
          }
        } else {
          if (oQQ0Qo && oQQ0Qo.slideBgi) {
            OQooOo = oQQ0Qo;
            _$td(".td-pop-center").removeClass("disabled").addClass("td-c-ani");
            oOooOo("unmodal");
          } else {
            _$td(".td-pop-center").removeClass("td-c-ani").addClass("disabled");
            O00Ooo = [];
            Q00Q0o(Oo0OQo, {
              requestType: 2,
              validateCodeObj: JSON.stringify(OQooOo)
            }, function (oQQ0Qo) {
              O00ooO(true, oQQ0Qo);
              OQooOo = oQQ0Qo.validateCodeObj;
              _$td(".td-pop-center").removeClass("disabled").addClass("td-c-ani");
              oOooOo("unmodal");
            });
          }
        }
      }
    };
    var O00Q0O = function (oQQ0Qo) {
      var OOQooQ = function () {
        var oQQ0Qo = _$td(QOO0oO + ' .td-pop-click-area .td-pop-status');
        var QQoooQ = _$td(QOO0oO + ' .td-pop-click-area .td-pop-status .td-pop-status-mark');
        if (!oQQ0Qo.length) return;
        var ooQOQO = OQooOo && OQooOo.characterNum ? OQooOo.characterNum || 0 : 0;
        if (QQoooQ.length === ooQOQO && QQoooQ.length) {
          for (var QOoOOO = 1, oQO0Q0 = QQoooQ.length; QOoOOO <= oQO0Q0; QOoOOO++) {
            if (Qo00oo > QOoOOO) {
              _$td(QQoooQ[QOoOOO - 1]).addClass("checked");
            } else {
              _$td(QQoooQ[QOoOOO - 1]).removeClass("checked");
            }
          }
        } else {
          oQQ0Qo.empty();
          for (var QOoOOO = 1; QOoOOO <= ooQOQO; QOoOOO++) {
            var oOOoQO = _$td('<div class="td-pop-status-mark"><div class="no">' + QOoOOO + "</div></div>");
            oOOoQO.attr("markIdx", Qo00oo);
            oQQ0Qo.append(oOOoQO);
          }
        }
      };
      var ooQOQO = function () {
        var oQQ0Qo = '';
        for (var QQoooQ = 1, ooQOQO = OQooOo.characterNum; QQoooQ <= ooQOQO; QQoooQ++) {
          oQQ0Qo += '<div class="td-pop-status-mark" markIdx="' + QQoooQ + "\"><div class=\"no\">" + QQoooQ + "</div></div>";
        }
        return oQQ0Qo;
      };
      if (!OQooOo) {
        return;
      } else {
        var ooQO0o = Number(OQooOo.imageType);
      }
      _$td(QOO0oO + " .refresh-bg").show().removeClass("initial");
      var oQO0Q0 = oO0QQo && (oO0QQo.display === "popup" || oO0QQo.display === "custom");
      Qo00oo = 1;
      _$td(QOO0oO + ' ' + ".td-pop-center").removeClass("disabled").addClass("td-c-ani");
      if (_$td(QOO0oO + ' ' + ".td-pop-slide-area").length !== 0) {
        _$td(QOO0oO + ".td-outer-wrapper").remove();
      }
      _$td(".td-click-mark") && _$td(".td-click-mark").remove();
      if (_$td(QOO0oO + ' ' + ".td-pop-click-area").length === 0 || _$td(QOO0oO + ' ' + '.td-pop-click-area .td-pop-hint').length !== 0 && ooQO0o === 4 || ooQO0o === 2 || ooQO0o === 3 || _$td(QOO0oO + ' ' + '.td-pop-click-area .td-3D-inference-title').length !== 0 && ooQO0o !== 7 || _$td(QOO0oO + ' ' + '.td-pop-click-area .td-3D-inference-title').length === 0 && ooQO0o === 7) {
        if (_$td(QOO0oO + ' ' + ".td-pop-click-area").length !== 0 || _$td(QOO0oO + ' ' + ".td-pop-3d-area").length !== 0) {
          _$td(QOO0oO + ".td-outer-wrapper").remove();
        }
        var OoOQ0O = '<div class="td-pop-click-area">' + '<div class="td-pop-click-title">' + '<div class="td-pop-title" style="' + (o00Ooo ? "font-size: 13px" : '') + '">' + (ooQO0o === 7 ? '<span class="td-3D-inference-title">' + OQooOo.clickTip + "</span>" : QQQ0oQ.clickTitle[ooQO0o]) + "</div>" + (ooQO0o === 2 || ooQO0o === 3 ? '<img class="td-pop-hint" style="height: 20px;"/>' : '') + "</div>" + '<div class="td-pop-center-cnt">' + '<div class="td-pop-click-msg"></div>' + '<div class="td-pop-center td-c-ani">' + OOQoOo + "</div>" + "</div>" + OoOQQo + "</div>";
        if (oO0QQo.display === "bind") {
          if (_$td(QOO0oO + ".td-outer-wrapper").length === 0) {
            ooo0OO("click");
          }
          _$td(QOO0oO + ' ' + '.td-pop-cnt .td-nw-wrapper').append(OoOQ0O);
        } else {
          _$td("body").append('<div class="td-outer-wrapper pop ' + Q0oQOO + '"><div class="td-mask-common background ' + (oQO0Q0 ? "grey" : "clear") + "\"></div>" + '<div class="td-pop-cnt click td-n-hi">' + (oO0QQo.display === "bind" ? '<div class="td-nw-wrapper td-bind">' : '<div class="td-nw-wrapper td-flat">') + OoOQ0O + "</div>" + '<div class="td-popup-info td-pp-hi">' + '<div class="td-popup-content">' + '<div class="td_validate_box">' + (oO0QQo.closeLoading ? '' : '<div class="td_logo_img td-sprite-icon">' + QOO00Q + "</div>") + "</div>" + '<div class="td_fail_box">' + '<div class="td_fail_img td-sprite-icon">' + OO0O00 + "</div>" + "</div>" + '<div class="td_success_box">' + '<div class="td_success_img td-sprite-icon">' + QQQQ00 + "</div> " + "</div>" + '<div class="td_validate_msg"></div> ' + "</div> " + "</div>" + "</div>" + "</div>");
        }
        if (oQQ0Qo) {
          _$td('.td-outer-wrapper .td-pop-cnt').removeClass("td-n-hi").addClass("td-n-sh");
          _$td(".td-outer-wrapper").show();
        } else {}
        var oQOQo0 = function (oQQ0Qo) {
          if (oQQ0Qo.target.parentNode.className.indexOf("td-bg-slogan") != -1) {
            var QQoooQ = oQQ0Qo.target.parentNode.offsetLeft,
              ooQOQO = oQQ0Qo.target.parentNode.offsetTop;
            if (window.navigator && window.navigator.userAgent.indexOf("Firefox") != -1) {
              if (oQQ0Qo.target.className.indexOf("td-logo-text") !== -1) {
                var QOoOOO = _$td('.td-logo-transparent-icon').length > 0 && _$td('.td-logo-transparent-icon')[0],
                  oQO0Q0 = QOoOOO.offsetWidth,
                  OoOQ0O = QOoOOO.offsetHeight;
                QQoooQ += oQO0Q0;
                ooQOQO += 3;
              }
            }
            if (!oQQ0Qo.offsetX) {
              var oOOoQO = _$td(QOO0oO + ' ' + ".td-pop-center").offset();
              return {
                left: oQQ0Qo.pageX - oOOoQO.left + QQoooQ,
                top: oQQ0Qo.pageY - oOOoQO.top + ooQOQO
              };
            } else {
              return {
                left: oQQ0Qo.offsetX + QQoooQ,
                top: oQQ0Qo.offsetY + ooQOQO
              };
            }
          } else if (oQQ0Qo.target.className.indexOf("td-bg-slogan") != -1) {
            if (!oQQ0Qo.offsetX) {
              var oOOoQO = _$td(QOO0oO + ' ' + ".td-pop-center").offset();
              return {
                left: oQQ0Qo.pageX - oOOoQO.left + oQQ0Qo.target.offsetLeft,
                top: oQQ0Qo.pageY - oOOoQO.top + oQQ0Qo.target.offsetTop
              };
            } else {
              return {
                left: oQQ0Qo.offsetX + oQQ0Qo.target.offsetLeft,
                top: oQQ0Qo.offsetY + oQQ0Qo.target.offsetTop
              };
            }
          } else {
            if (!oQQ0Qo.offsetX) {
              var oOOoQO = _$td(QOO0oO + ' ' + ".td-pop-center").offset();
              return {
                left: oQQ0Qo.pageX - oOOoQO.left,
                top: oQQ0Qo.pageY - oOOoQO.top
              };
            } else {
              return {
                left: oQQ0Qo.offsetX,
                top: oQQ0Qo.offsetY
              };
            }
          }
        };
        var ooQQ0Q = _$td(QOO0oO + ' ' + ".td-pop-click-title");
        if (ooQQ0Q.children().length === 1) {
          ooQQ0Q.addClass("td-t-sig");
        }
        _$td(QOO0oO + ' ' + ".td-pop-cnt").click(function (oQQ0Qo) {
          oQQ0Qo.stopPropagation();
        });
        _$td(QOO0oO + ' ' + ".td-custom-logo").off("click").on("click", function () {
          !oO0QQo.webview && window.open(QQ0OoQ.navigatorTo);
        });
        if (QQQQoQ || o0Oo0O) {
          _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("ie-compat");
          _$td(".td-btn-cnt").addClass("ie-compat");
        }
        if (!OoOoOO() && !oQoOo0) {
          _$td(QOO0oO + ' ' + ".td-icon-set svg").mouseenter(function (oQQ0Qo) {
            oQQ0Qo.currentTarget.children[0].children[0].setAttribute("fill", "#333333");
          }).mouseleave(function (oQQ0Qo) {
            oQQ0Qo.currentTarget.children[0].children[0].setAttribute("fill", "#7E7E7E");
          });
        } else {
          if (!o0Oo0O && !QQQQoQ && OoOoOO()) {
            _$td(".td-pop-cnt").addClass("ie-all");
          }
        }
        (oO0QQo.closeIcon == 0 || oO0QQo.closeMask == 0) && _$td((oO0QQo.closeMask == 0 ? QOO0oO + '.td-outer-wrapper.pop' : '') + (oO0QQo.closeIcon == 0 && oO0QQo.closeMask == 0 ? " .td-mask-common," : '') + (oO0QQo.closeIcon == 0 ? QOO0oO + " .td-icon-close" : '')).on("click", function (oQQ0Qo) {
          QOoQOO = true;
          if (!Q0Q000) {
            if (!oO0QQo.webview) {
              setTimeout(function () {
                if (oO0QQo.display === "bind") {
                  _$td(QOO0oO + ' ' + ".td-popup-info").addClass("td-pp-hi");
                  _$td(QOO0oO + ' ' + ".td-popup-info").hide();
                  _$td(QOO0oO + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi").addClass("td-n-zero");
                } else {
                  _$td(QOO0oO + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi");
                }
                setTimeout(function () {
                  _$td(QOO0oO + ' ' + '.td-pop-cnt .td-nw-wrapper').css("border", "none");
                }, 0);
                setTimeout(function () {
                  _$td(QOO0oO + ' ' + ".td-pop-3d-area").length && _$td(".td-pop-3d-area").hide();
                  _$td(QOO0oO + ' ' + ".td-pop-slide-area").length && _$td(".td-pop-slide-area").hide();
                  _$td(QOO0oO + ' ' + ".td-pop-click-area").length && _$td(".td-pop-click-area").hide();
                  _$td(QOO0oO + '.td-outer-wrapper.pop').hide();
                  _$td(QOO0oO + '.td-outer-wrapper.pop .td-pop-cnt').removeClass("td-n-zero");
                }, 0);
                OoO0Qo();
              }, 0);
            }
          }
          OQ00Qo();
          oO0QQo.webview && oO0QQo.close && oO0QQo.close(JSON.stringify(oOQ0QQ[3]));
          oO0QQo.onClose && oO0QQo.onClose();
          var QQoooQ = _$td(OoQO00 + ' ' + ".td-btn-cnt")[0];
          if (QQoooQ) {
            if (QQQQoQ || o0Oo0O) {
              QQoooQ.className = 'td-btn-cnt td-s-logo ie-compat';
            } else {
              QQoooQ.className = "td-btn-cnt td-s-logo";
            }
          }
          setTimeout(function () {
            Qo00oo = 1;
            _$td(QOO0oO + ' ' + ".td-click-mark").remove();
          }, 200);
        });
        _$td(QOO0oO + ' ' + ".td-pop-center").click(function (oQQ0Qo) {
          if (!Q0Q000 && !OOoOoQ && !QOoQOO) {
            if (!oO000O) {
              oO000O = new Date();
            }
            if (!oQ0Q0O) {
              oQ0Q0O = new Date();
            }
            if (Qo00oo === 1) {
              oQ0Q0O = new Date();
            }
            QQ0OQo();
            var QQoooQ = QQ0OoQ.themeColor || "#015BF8";
            var OQQOoO = _$td('<div class="td-click-mark" style="background-color:' + QQoooQ + "\"><div class=\"no\">" + Qo00oo + "</div></div>"),
              QOoOOO = oQOQo0(oQQ0Qo);
            OQQOoO.attr("markIdx", Qo00oo);
            Qo00oo++;
            if (Qo00oo > (ooQO0o !== 3 ? OQooOo.characterNum : OQooOo.imgNum) + 1) {
              return;
            }
            OQQOoO.css({
              opacity: 1
            });
            OQQOoO.css({
              left: QOoOOO.left + (OQ0Q0o ? oQQ0Qo.target.offsetLeft : 0),
              top: QOoOOO.top + (OQ0Q0o ? oQQ0Qo.target.offsetTop : 0)
            });
            _$td(QOO0oO + ' ' + ".td-pop-center-cnt").append(OQQOoO);
            setTimeout(function () {
              OQQOoO.addClass("td-c-show");
            }, 0);
            if (Qo00oo === (ooQO0o !== 3 ? OQooOo.characterNum : OQooOo.imgNum) + 1) {
              oo0Q0o();
              setTimeout(QOoOOQ, 200);
            }
            OQQOoO.on("click", function (oQQ0Qo) {
              oQQ0Qo.stopPropagation();
              var QQoooQ = _$td(oQQ0Qo.currentTarget).attr("markIdx"),
                ooQOQO = _$td(QOO0oO + ' ' + ".td-pop-center-cnt");
              for (var QOoOOO = QQoooQ; QOoOOO <= Qo00oo; QOoOOO++) {
                ooQOQO.find('.td-click-mark[markIdx=' + QOoOOO + ']').remove();
              }
              Qo00oo = QQoooQ;
            });
          }
        });
        _$td(QOO0oO + ' ' + ".td-icon-refresh").on("click", function () {
          if (!OOoOoQ && QoQOOO !== "success" && !Q0Q000) {
            QOQQQQ();
            setTimeout(function () {
              Qo00oo = 1;
              OOQooQ();
              _$td(QOO0oO + ' ' + ".td-click-mark").remove();
            }, 200);
          }
        });
        if (oO0QQo.display === "custom") {
          oo0oo0();
        }
        if (oO0QQo.popWidth) {
          var QOo0Oo = parseFloat(oO0QQo.popWidth.replace(/[^0-9.]/ig, '')),
            OOOQOQ = QOo0Oo * OoOOO0 / OoOo0Q;
          _$td(QOO0oO + ' ' + ".td-pop-center").width(oO0QQo.popWidth).height(OOOQOQ + oO0QQo.popWidth.replace(/[0-9.]/ig, ''));
        }
        if (oO0QQo.display === "float") {
          _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("float");
        } else {
          var QoQQo0 = !QQQQoQ ? "center" : "center-ie8";
          _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass(QoQQo0);
        }
      } else {
        ooQO0o === 4 && OOQooQ();
        ooQO0o === 7 && _$td(QOO0oO + ' ' + '.td-pop-click-area .td-3D-inference-title').html(OQooOo.clickTip || '');
      }
      if (oO0QQo.display === "float") {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").css(o0O0Q0());
      }
      if (OQ0Q0o) {
        OQ0O0O(QOO0oO + ' ' + ".td-bg-img", oQOoQQ + (ooQO0o !== 3 ? OQooOo.clickImage : OQooOo.imgClickImage), OQooOo.imageGeneral || OQooOo.bgImageSplitSequence);
      } else {
        OQQ0oQ(QOO0oO + ' ' + ".td-bg-img", oQOoQQ + (ooQO0o !== 3 ? OQooOo.clickImage : OQooOo.imgClickImage), OQooOo.imageGeneral || OQooOo.bgImageSplitSequence);
      }
      _$td(QOO0oO + ' ' + ".td-pop-hint").attr("src", oQOoQQ + (ooQO0o !== 3 ? OQooOo.clickTip : OQooOo.imgClickTip));
      if (!oQQ0Qo) {
        O0Q0oO(Q0oQOO);
      }
      QQQ0o0();
      Q0Q000 = false;
      OoO0Qo();
      O00ooO(true);
      !oO0QQo.webview && QQQOoo();
      if (o0Qo0O) {
        _$td(".icon-custom").css("display", "inline-block");
        _$td('.td-pop-footer .slogan-custom').css("display", "block");
      } else {
        _$td(".icon-custom").hide();
        _$td('.td-pop-footer .slogan-custom').hide();
      }
    };
    var QOoOOQ = function (oQQ0Qo) {
      var QQoooQ = false;
      var ooQOQO = 0,
        QOoOOO = "click";
      switch (OQooOo.imageType) {
        case '3':
          ooQOQO = OQooOo.imgNum;
          break;
        case '2':
        case '4':
        case '7':
          ooQOQO = OQooOo.characterNum;
          break;
        case '5':
        case '6':
          ooQOQO = OQooOo.rotateClickNum;
          QOoOOO = "3dClick";
          break;
        default:
          break;
      }
      Q0Q000 = true;
      if (oO0QQo.webview && !oQQ0Qo) {
        var oQO0Q0 = oO0QQo.end && oO0QQo.end('');
        if (typeof oQO0Q0 === "string" || typeof oQO0Q0 === "undefined") {
          oQQ0Qo = oQO0Q0;
        }
        if (!oQQ0Qo) {
          return;
        }
        oO0QQo.start && oO0QQo.start(80, 6);
      }
      if (oQQ0Qo === '-1') {
        oQQ0Qo = '';
      }
      OoQ0QQ = new Date();
      var OoOQ0O = '',
        oOOoQO = _$td(".td-pop-center-cnt");
      for (var ooQQ0Q = 0; ooQQ0Q < ooQOQO; ooQQ0Q++) {
        var QOo0Oo = {};
        switch (OQooOo.imageType) {
          case '3':
          case '2':
          case '4':
          case '7':
            QOo0Oo = oOOoQO.find('.td-click-mark[markIdx=' + (ooQQ0Q + 1) + ']').position();
            if (QOo0Oo && QOo0Oo.left) {
              OoOQ0O += Math.ceil(QOo0Oo.left / Oo0OOo) + '|' + Math.ceil(QOo0Oo.top / Oo0OOo) + '|' + new Date().getTime() + '^';
            } else {
              QQoooQ = true;
            }
            break;
          case '5':
          case '6':
            var OOOQOQ = oOOoQO.find('.td-click-mark[markIdx=' + (ooQQ0Q + 1) + ']');
            if (OOOQOQ.length == 0) {
              QQoooQ = true;
            } else {
              var QoQQo0 = OOOQOQ.css("left").replace('px', '');
              var QQQOQO = OOOQOQ.css("top").replace('px', '');
              QOo0Oo = oOOoQO.find('.td-click-mark[markIdx=' + (ooQQ0Q + 1) + ']').offset();
              OoOQ0O += QoQQo0 / 120 + '|' + QQQOQO / 120 + '|' + new Date().getTime() + '^';
            }
            break;
          default:
            break;
        }
      }
      if (QQoooQ) {
        Q0Q000 = false;
        return;
      }
      Q00Q0o(Oo0OQo, {
        requestType: 3,
        validateCodeObj: JSON.stringify(OQooOo),
        userAnswer: OoOQ0O,
        sensorInfo: oQQ0Qo,
        mouseInfo: QQQO0O(oOQQ00, o0QoOQ, QOoOOO),
        usedTime: OoQ0QQ.getTime() - oO000O.getTime()
      }, function (oQQ0Qo) {
        O00ooO(true, oQQ0Qo);
        OQ00Qo();
        if (!oQQ0Qo.needValidateCode && oQQ0Qo.statusCode === "200") {
          OQ00Qo();
          QQOOOO(oQQ0Qo.validateToken);
        } else {
          QQ0OQo();
          QOo0oO(oQQ0Qo.validateCodeObj);
        }
      });
    };
    var QQOOOO = function (O0QQo0) {
      QoQOOO = "success";
      setTimeout(function () {
        var oQQ0Qo = _$td(oO0QQo.formID);
        if (!oO0QQo.webview && oO0QQo.formID && oQQ0Qo.length != 0) {
          if (_$td(oO0QQo.formID + ' ' + "input[name=token]").length != 0) {
            _$td(oO0QQo.formID + ' ' + "input[name=token]").attr("value", O0QQo0);
          } else {
            oQQ0Qo.append('<input name="token" style="display: none" value="' + O0QQo0 + "\"/>");
          }
          if (_$td(oO0QQo.formID + ' ' + "input[name=blackBox]").length != 0) {
            _$td(oO0QQo.formID + ' ' + "input[name=blackBox]")[0].value = oO0QQo.getinfo();
          } else {
            oQQ0Qo.append('<input name="blackBox" style="display: none" value="' + oO0QQo.getinfo() + "\"/>");
          }
          oO0QQo.display == "bind" && oQQ0Qo[0].submit();
        } else {
          oO0QQo.onSuccess && oO0QQo.onSuccess(O0QQo0);
        }
      }, 500);
      if (oO0QQo.lang !== OQOO0Q && oO0QQo.lang !== "zh-cn" || OQooOo.imageType === '7' || OQooOo.imageType === '5') {
        oOoo0o("click", "success", QQQ0oQ.passTip, 600);
      } else {
        var QQoooQ = ((OoQ0QQ.getTime() - oQ0Q0O.getTime()) / 1000).toFixed(2);
        oOoo0o("click", "success", Qo0QO0(QQoooQ), 600);
      }
      OOoOOQ(1600);
      if (oO0QQo.display !== "bind") {
        OQo0Q0.fadeOut(QOO0oO, 600, 500, OQo0Q0.changeBtnStatus.bind(OQo0Q0, OoQO00, true, "td-s-loading", "td-s-success", 1600));
      } else {
        if (!oO0QQo.bindSucNoFed) {
          switch (OQooOo.imageType) {
            case '3':
            case '2':
            case '4':
            case '7':
              OQo0Q0.fadeOut(QOO0oO, 600, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "success", QQQ0oQ.successTip), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", '.td-pop-cnt.click.center', 800));
              break;
            case '5':
            case '6':
              OQo0Q0.fadeOut(QOO0oO, 600, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "success", QQQ0oQ.successTip), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '3d', '.td-pop-cnt.click.center', 800));
              break;
            default:
              break;
          }
        } else {
          OQo0Q0.fadeOut(QOO0oO, 800, 400);
        }
      }
      if (oO0QQo.webview) {
        setTimeout(function () {
          oO0QQo.onValidate && oO0QQo.onValidate(O0QQo0);
          oO0QQo.close && oO0QQo.close(JSON.stringify(oOQ0QQ[4]));
          return;
        }, 800);
      }
      Q00QOQ(OO00O0.clickSucc);
      OoO0Qo();
    };
    var QOo0oO = function (oQQ0Qo) {
      oO0QQo.onFail && oO0QQo.onFail("opFail");
      OQo0Q0.onPopupError(QOO0oO, 390, "click");
      _$td(".td-pop-center").removeClass("td-c-ani").addClass("disabled");
      oOoo0o("click", "fail", QQQ0oQ.failTip, QOQQQQ, oQQ0Qo, 1600);
      setTimeout(function () {
        Qo00oo = 1;
        _$td(".td-click-mark").remove();
      }, 1500);
      Q00QOQ(OO00O0.clickFail);
      OoO0Qo();
    };
    var QOQQQQ = function (oQQ0Qo) {
      _$td(QOO0oO + " .refresh-bg").show().removeClass("initial");
      OOoOoQ = true;
      O0Q0oQ++;
      if (!oQQ0Qo) {
        oo0Q0o();
        Q00QOQ(OO00O0.clickUpd);
      }
      if (!o0QOQQ) {
        if (O0Q0oQ >= QooOOO) {
          oo0Q0o();
          Q00QOQ(OO00O0.freqClose);
          o0QOQQ = true;
          oO0QQo.onFail && oO0QQo.onFail("op2much");
          OOoOOQ(2500);
          if (oO0QQo.display === "bind") {
            switch (OQooOo.imageType) {
              case '3':
              case '2':
              case '4':
              case '7':
                OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", QQQ0oQ.op2Much, 0), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", ".td-pop-cnt", 800));
                break;
              case '5':
              case '6':
                OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", QQQ0oQ.op2Much, 0), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '3d', ".td-pop-cnt", 800));
                break;
              default:
                break;
            }
          } else {
            OQo0Q0.fadeOut(QOO0oO, 1200, 500, OQo0Q0.changeBtnStatus.bind(OQo0Q0, OoQO00, false, "td-s-loading", "td-s-fail", 1600, QQQ0oQ.op2MuchTA));
          }
        } else {
          if (oQQ0Qo) {
            OQooOo = oQQ0Qo;
            if (OQooOo.imageType === '5' || OQooOo.imageType === '6') {
              _$td(".td-pop-center").removeClass("disabled");
            } else {
              _$td(".td-pop-center").removeClass("disabled").addClass("td-c-ani");
            }
            switch (OQooOo.imageType) {
              case '3':
              case '2':
              case '4':
              case '7':
                O00Q0O("unmodal");
                break;
              case '5':
              case '6':
                QO0oOQ("unmodal");
                break;
              default:
                break;
            }
          } else {
            _$td(".td-pop-center").removeClass("td-c-ani").addClass("disabled");
            Q00Q0o(Oo0OQo, {
              requestType: 2,
              validateCodeObj: JSON.stringify(OQooOo)
            }, function (oQQ0Qo) {
              O00ooO(true, oQQ0Qo);
              OQooOo = oQQ0Qo.validateCodeObj;
              if (OQooOo.imageType === '5' || OQooOo.imageType === '6') {
                _$td(".td-pop-center").removeClass("disabled");
              } else {
                _$td(".td-pop-center").removeClass("disabled").addClass("td-c-ani");
              }
              switch (OQooOo.imageType) {
                case '3':
                case '2':
                case '4':
                case '7':
                  O00Q0O("unmodal");
                  break;
                case '5':
                case '6':
                  QO0oOQ("unmodal");
                  break;
                default:
                  break;
              }
            });
          }
        }
      }
    };
    var QO0oOQ = function (oQQ0Qo) {
      var QOOQQo = function () {
        if (_$td(QOO0oO + ' ' + "#td-3d-box").length === 0) return;
        var oQQ0Qo = _$td(QOO0oO + ' ' + "#td-3d-box");
        var QQoooQ = oQQ0Qo[0];
        if (_$td(QQoooQ).attr("style") && /rotateX[(]([-]?[0-9\.]+)deg[)] rotateY[(]([-]?[0-9\.]+)deg[)] rotateZ[(]([-]?[0-9\.]+)deg[)]/.test(_$td(QQoooQ).attr("style"))) {
          var ooQOQO = /rotateX[(]([-]?[0-9\.]+)deg[)] rotateY[(]([-]?[0-9\.]+)deg[)] rotateZ[(]([-]?[0-9\.]+)deg[)]/.exec(_$td(QQoooQ).attr("style"));
          var QOoOOO = {
            x: Number(ooQOQO[1]),
            y: Number(ooQOQO[2])
          };
          if (Math.ceil(QOoOOO.x) < -20) {
            QOoOOO.x += 1;
            QOoOOO.y -= 1;
          } else if (Math.ceil(QOoOOO.x) > -20) {
            QOoOOO.x -= 1;
            QOoOOO.y -= 1;
          }
        } else {
          var QOoOOO = {
            x: -20,
            y: 90
          };
        }
        _$td(QQoooQ).css({
          transform: 'perspective(800px) rotateX(' + QOoOOO.x + "deg) rotateY(" + Math.ceil(QOoOOO.y + 1) + "deg) rotateZ(" + 0 + "deg)",
          webkitTransform: 'perspective(800px) rotateX(' + QOoOOO.x + "deg) rotateY(" + Math.ceil(QOoOOO.y + 1) + "deg) rotateZ(" + 0 + "deg)"
        });
      };
      if (!OQooOo) {
        return;
      } else {
        var ooQOQO = Number(OQooOo.imageType);
      }
      _$td(QOO0oO + " .refresh-bg").show().removeClass("initial");
      var QOoOOO = oO0QQo && (oO0QQo.display === "popup" || oO0QQo.display === "custom");
      Qo00oo = 1;
      _$td(QOO0oO + ' ' + ".td-pop-center").removeClass("disabled");
      if (_$td(QOO0oO + ' ' + ".td-pop-slide-area").length !== 0 || _$td(QOO0oO + ' ' + ".td-pop-click-area").length !== 0) {
        _$td(QOO0oO + ".td-outer-wrapper").remove();
      }
      _$td(".td-click-mark") && _$td(".td-click-mark").remove();
      if (_$td(QOO0oO + ' ' + ".td-pop-3d-area").length !== 0) {
        _$td(QOO0oO + ".td-outer-wrapper").remove();
      }
      var oQO0Q0 = '';
      for (var OoOQ0O = 0; OoOQ0O < 6; OoOQ0O++) {
        oQO0Q0 += "<div class=\"" + "td-3d-face-" + OoOQ0O + ' td-3dface" ondragstart="return false;"' + (((window.navigator || {}).userAgent || '').indexOf("Firefox") > -1 ? 'style="overflow:hidden"' : '') + '>' + (OQ0Q0o ? '<div class="td-3d-bg-img" style="width: 120px;height: 120px;"></div>' : '<canvas class="td-3d-bg-img" width="120" height="120"></canvas>') + '   <div class="td-3d-point td-3d-topLeftPoint">1</div>' + '        <div class="td-3d-point td-3d-topRightPoint">2</div>' + '        <div class="td-3d-point td-3d-bottomLeftPoint">3</div>' + '        <div class="td-3d-point td-3d-bottomRightPoint">4</div>' + "</div>";
      }
      var oOOoQO = '<div id="td-3d-box" class="td-3d-box-animation">' + oQO0Q0 + "</div>";
      var ooQQ0Q = '<div class="td-pop-3d-area"><div class="td-pop-3d-title"><div class="td-pop-title" style="' + (o00Ooo ? "font-size: 13px" : '') + '">' + QQQ0oQ.clickTitle[ooQOQO] + "</div>" + '<img class="td-pop-hint" style="height: 20px;" />' + '</div><div class="td-pop-center-cnt"><div class="td-pop-click-msg"></div><div class="td-pop-center"><div class="refresh-bg initial"><img src="' + OQQQOQ + '" class="loading-icon"/></div>' + oOOoQO + "</div></div>" + OoOQQo + "</div>";
      if (oO0QQo.display === "bind") {
        if (_$td(QOO0oO + ".td-outer-wrapper").length === 0) {
          ooo0OO("click");
        }
        _$td(QOO0oO + ' ' + '.td-pop-cnt .td-nw-wrapper').append(ooQQ0Q);
      } else {
        _$td("body").append('<div class="td-outer-wrapper pop ' + Q0oQOO + '"><div class="td-mask-common background ' + (QOoOOO ? "grey" : "clear") + "\"></div>" + '<div class="td-pop-cnt click td-n-hi">' + (oO0QQo.display === "bind" ? '<div class="td-nw-wrapper td-bind">' : '<div class="td-nw-wrapper td-flat">') + ooQQ0Q + "</div>" + '<div class="td-popup-info td-pp-hi">' + '<div class="td-popup-content">' + '<div class="td_validate_box">' + (oO0QQo.closeLoading ? '' : '<div class="td_logo_img td-sprite-icon">' + QOO00Q + "</div>") + "</div>" + '<div class="td_fail_box">' + '<div class="td_fail_img td-sprite-icon">' + OO0O00 + "</div>" + "</div>" + '<div class="td_success_box">' + '<div class="td_success_img td-sprite-icon">' + QQQQ00 + "</div> " + "</div>" + '<div class="td_validate_msg"></div> ' + "</div> " + "</div>" + "</div>" + "</div>");
      }
      if (oQQ0Qo) {
        _$td('.td-outer-wrapper .td-pop-cnt').removeClass("td-n-hi").addClass("td-n-sh");
        _$td(".td-outer-wrapper").show();
      }
      _$td(QOO0oO + " .refresh-bg").hide();
      var oQOQo0 = function (oQQ0Qo) {
        if (((window.navigator || {}).userAgent || '').indexOf("Firefox") > -1) {
          return {
            left: oQQ0Qo.layerX,
            top: oQQ0Qo.layerY
          };
        } else {
          return {
            left: oQQ0Qo.offsetX,
            top: oQQ0Qo.offsetY
          };
        }
      };
      var OOOQOQ = _$td(QOO0oO + ' ' + "#td-3d-box");
      var oO0OO0 = OOOQOQ[0];
      var QoQ0Qo = false;
      clearInterval(O0OOO0);
      O0OOO0 = setInterval(QOOQQo, 100);
      var Q00QO0 = null;
      QQ0QO0(oO0OO0, O0OQ00[oQoQOo][0], function (oQQ0Qo) {
        var ooO00O = function () {
          clearInterval(Q00QO0);
          Q00QO0 = setTimeout(function () {
            clearInterval(O0OOO0);
            O0OOO0 = setInterval(QOOQQo, 100);
          }, 3000);
          oooQQQ(_$td(QOO0oO), O0OQ00[oQoQOo][1], QoQQQO);
          oooQQQ(_$td(QOO0oO), O0OQ00[oQoQOo][2], ooO00O);
        };
        var QoQQQO = function (oQQ0Qo) {
          oQQ0Qo.stopPropagation();
          QoQ0Qo = true;
          var QQoooQ = oQQ0Qo;
          switch (oQoQOo) {
            case (103 - 97) / 6:
              QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
              break;
          }
          var ooQOQO = parseInt(QQoooQ.clientY - O0OQQO);
          var QOoOOO = parseInt(QQoooQ.clientX - oQO0OO);
          _$td(oO0OO0).css({
            transform: 'perspective(800px) rotateX(' + (QQOQoo.x - ooQOQO) + "deg) rotateY(" + (QQOQoo.y + QOoOOO) + "deg) rotateZ(" + 0 + "deg)",
            webkitTransform: 'perspective(800px) rotateX(' + (QQOQoo.x - ooQOQO) + "deg) rotateY(" + (QQOQoo.y + QOoOOO) + "deg) rotateZ(" + 0 + "deg)"
          });
        };
        if ((oQQ0Qo.target.className || '').indexOf("td-3d-point") > -1) return;
        clearInterval(O0OOO0);
        clearInterval(Q00QO0);
        QoQ0Qo = false;
        var QOoOOO = oQQ0Qo;
        switch (oQoQOo) {
          case (68 - 57) / 11:
            QOoOOO = (oQQ0Qo.changedTouches || [{}])[0];
            break;
        }
        var oQO0OO = QOoOOO.clientX;
        var O0OQQO = QOoOOO.clientY;
        var QQOQoo = {};
        var ooQQ0Q = /rotateX[(]([-]?[0-9\.]+)deg[)] rotateY[(]([-]?[0-9\.]+)deg[)] rotateZ[(]([-]?[0-9\.]+)deg[)]/.exec(_$td(oO0OO0).attr("style"));
        QQOQoo = {
          x: Number(ooQQ0Q[1]),
          y: Number(ooQQ0Q[2])
        };
        QQ0QO0(_$td(QOO0oO), O0OQ00[oQoQOo][1], QoQQQO);
        QQ0QO0(_$td(QOO0oO), O0OQ00[oQoQOo][2], ooO00O);
        QQ0QO0(_$td(QOO0oO), O0OQ00[oQoQOo][1], function (oQQ0Qo) {
          oQQ0Qo.preventDefault();
        });
      });
      QQ0QO0(_$td(QOO0oO + ' ' + ".td-pop-cnt"), O0OQ00[oQoQOo][0], function (oQQ0Qo) {
        oQQ0Qo.stopPropagation();
      });
      _$td(QOO0oO + ' ' + ".td-custom-logo").off("click").on("click", function () {
        !oO0QQo.webview && window.open(QQ0OoQ.navigatorTo);
      });
      if (QQQQoQ || o0Oo0O) {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("ie-compat");
        _$td(".td-btn-cnt").addClass("ie-compat");
      }
      if (!OoOoOO() && !oQoOo0) {
        _$td(QOO0oO + ' ' + ".td-icon-set svg").mouseenter(function (oQQ0Qo) {
          oQQ0Qo.currentTarget.children[0].children[0].setAttribute("fill", "#333333");
        }).mouseleave(function (oQQ0Qo) {
          oQQ0Qo.currentTarget.children[0].children[0].setAttribute("fill", "#7E7E7E");
        });
      } else {
        if (!o0Oo0O && !QQQQoQ && OoOoOO()) {
          _$td(".td-pop-cnt").addClass("ie-all");
        }
      }
      (oO0QQo.closeIcon == 0 || oO0QQo.closeMask == 0) && QQ0QO0(_$td((oO0QQo.closeMask == 0 ? QOO0oO + '.td-outer-wrapper.pop' : '') + (oO0QQo.closeIcon == 0 && oO0QQo.closeMask == 0 ? " .td-mask-common," : '') + (oO0QQo.closeIcon == 0 ? QOO0oO + " .td-icon-close" : '')), O0OQ00[oQoQOo][0], function (oQQ0Qo) {
        oQQ0Qo.preventDefault();
        clearInterval(O0OOO0);
        clearInterval(Q00QO0);
        QOoQOO = true;
        if (!Q0Q000) {
          if (!oO0QQo.webview) {
            setTimeout(function () {
              if (oO0QQo.display === "bind") {
                _$td(QOO0oO + ' ' + ".td-popup-info").addClass("td-pp-hi");
                _$td(QOO0oO + ' ' + ".td-popup-info").hide();
                _$td(QOO0oO + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi").addClass("td-n-zero");
              } else {
                _$td(QOO0oO + ' ' + ".td-pop-cnt").removeClass("td-n-sh").addClass("td-n-hi");
              }
              setTimeout(function () {
                _$td(QOO0oO + ' ' + '.td-pop-cnt .td-nw-wrapper').css("border", "none");
              }, 0);
              setTimeout(function () {
                _$td(QOO0oO + ' ' + ".td-pop-3d-area").length && _$td(".td-pop-3d-area").hide();
                _$td(QOO0oO + ' ' + ".td-pop-slide-area").length && _$td(".td-pop-slide-area").hide();
                _$td(QOO0oO + ' ' + ".td-pop-click-area").length && _$td(".td-pop-click-area").hide();
                _$td(QOO0oO + '.td-outer-wrapper.pop').hide();
                _$td(QOO0oO + '.td-outer-wrapper.pop .td-pop-cnt').removeClass("td-n-zero");
              }, 0);
              OoO0Qo();
            }, 0);
          }
        }
        OQ00Qo();
        oO0QQo.webview && oO0QQo.close && oO0QQo.close(JSON.stringify(oOQ0QQ[3]));
        oO0QQo.onClose && oO0QQo.onClose();
        var QQoooQ = _$td(OoQO00 + ' ' + ".td-btn-cnt")[0];
        if (QQoooQ) {
          if (QQQQoQ || o0Oo0O) {
            QQoooQ.className = 'td-btn-cnt td-s-logo ie-compat';
          } else {
            QQoooQ.className = "td-btn-cnt td-s-logo";
          }
        }
        setTimeout(function () {
          Qo00oo = 1;
          _$td(QOO0oO + ' ' + ".td-click-mark").remove();
        }, 200);
      });
      QQ0QO0(_$td(QOO0oO + ' ' + ".td-3dface"), "click", function (oQQ0Qo) {
        if (QoQ0Qo || (oQQ0Qo.target.className || '').indexOf("td-3d-point") > -1) return;
        if (Qo00oo == 1 && !_$td(this).find('.td-click-mark[markIdx=1]').length) {
          _$td(QOO0oO + ' ' + "#td-3d-box").attr("td_3d_data_id", this.className.replace("td-3dface", '').replace(' ', ''));
          _$td(QOO0oO + ' ' + "#td-3d-box").attr("td_3d_data_X", oQQ0Qo.clientX);
          _$td(QOO0oO + ' ' + "#td-3d-box").attr("td_3d_data_Y", oQQ0Qo.clientY);
          oQ0Q0O = new Date();
        }
        if (!Q0Q000 && !OOoOoQ && !QOoQOO) {
          if (!oO000O) {
            oO000O = new Date();
          }
          if (!oQ0Q0O) {
            oQ0Q0O = new Date();
          }
          QQ0OQo();
          var QQoooQ = QQ0OoQ.themeColor || "#015BF8";
          var OQQOoO = _$td('<div class="td-click-mark" style="background-color:' + QQoooQ + "\"><div class=\"no\">" + Qo00oo + "</div></div>"),
            QOoOOO = oQOQo0(oQQ0Qo);
          OQQOoO.attr("markIdx", Qo00oo);
          Qo00oo++;
          if (Qo00oo > OQooOo.rotateClickNum + 1) {
            return;
          }
          OQQOoO.css({
            opacity: 1
          });
          OQQOoO.css({
            left: QOoOOO.left + (OQ0Q0o ? oQQ0Qo.target.offsetLeft : 0),
            top: QOoOOO.top + (OQ0Q0o ? oQQ0Qo.target.offsetTop : 0)
          });
          _$td(this).append(OQQOoO);
          setTimeout(function () {
            OQQOoO.addClass("td-c-show");
          }, 0);
          if (Qo00oo === OQooOo.rotateClickNum + 1) {
            if (_$td(QOO0oO + ' ' + ".td-pop-center-cnt ." + _$td(QOO0oO + " #td-3d-box").attr("td_3d_data_id") + ' ' + ".td-click-mark").length !== OQooOo.rotateClickNum) {
              QOo0oO();
            } else {
              oo0Q0o();
              setTimeout(QOoOOQ, 0);
            }
          }
          OQQOoO.on("click", function (oQQ0Qo) {
            oQQ0Qo.stopPropagation();
            var QQoooQ = _$td(oQQ0Qo.currentTarget).attr("markIdx"),
              ooQOQO = _$td(QOO0oO + ' ' + ".td-pop-center-cnt");
            for (var QOoOOO = QQoooQ; QOoOOO <= Qo00oo; QOoOOO++) {
              ooQOQO.find('.td-click-mark[markIdx=' + QOoOOO + ']').remove();
            }
            Qo00oo = QQoooQ;
          });
        }
      });
      _$td(QOO0oO + ' ' + ".td-icon-refresh").click(function () {
        if (!OOoOoQ && QoQOOO !== "success" && !Q0Q000) {
          clearInterval(O0OOO0);
          clearInterval(Q00QO0);
          QOQQQQ();
          setTimeout(function () {
            Qo00oo = 1;
            _$td(QOO0oO + ' ' + ".td-click-mark").remove();
          }, 200);
        }
      });
      if (oO0QQo.display === "custom") {
        oo0oo0();
      }
      if (oO0QQo.popWidth) {
        var Qoo0Q0 = parseFloat(oO0QQo.popWidth.replace(/[^0-9.]/ig, '')),
          QOQ0QQ = Qoo0Q0 * OoOOO0 / OoOo0Q;
        _$td(QOO0oO + ' ' + ".td-pop-center").width(oO0QQo.popWidth).height(QOQ0QQ + oO0QQo.popWidth.replace(/[0-9.]/ig, ''));
      }
      if (oO0QQo.display === "float") {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("float");
      } else {
        var oOOOoo = !QQQQoQ ? "center" : "center-ie8";
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass(oOOOoo);
      }
      if (oO0QQo.display === "float") {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").css(o0O0Q0());
      }
      _$td(QOO0oO + ' ' + ".td-3d-bg-img").map(function (oQQ0Qo) {
        if (OQ0Q0o) {
          OQ0O0O(this, oQOoQQ + (OQooOo.rotateImages[oQQ0Qo] || {}).image, OQooOo.imageGeneral ? Q0o0Oo(OQooOo.imageGeneral, (OQooOo.bgImageSplitSequence || '').substr(0, 16)).split('_')[oQQ0Qo] : OQooOo.bgImageSplitSequence.length > 8 ? OQooOo.bgImageSplitSequence.split('_')[oQQ0Qo] : OQooOo.bgImageSplitSequence);
        } else {
          OQQ0oQ(this, oQOoQQ + (OQooOo.rotateImages[oQQ0Qo] || {}).image, OQooOo.imageGeneral ? Q0o0Oo(OQooOo.imageGeneral, (OQooOo.bgImageSplitSequence || '').substr(0, 16)).split('_')[oQQ0Qo] : OQooOo.bgImageSplitSequence.length > 8 ? OQooOo.bgImageSplitSequence.split('_')[oQQ0Qo] : OQooOo.bgImageSplitSequence);
        }
      });
      _$td(QOO0oO + ' ' + ".td-pop-hint").attr("src", oQOoQQ + OQooOo.rotateClickTip);
      if (!oQQ0Qo) {
        O0Q0oO(Q0oQOO);
      }
      QQQ0o0();
      Q0Q000 = false;
      OoO0Qo();
      O00ooO(true);
      !oO0QQo.webview && QQQOoo();
      if (o0Qo0O) {
        _$td(".icon-custom").css("display", "inline-block");
        _$td('.td-pop-footer .slogan-custom').css("display", "block");
      } else {
        _$td(".icon-custom").hide();
        _$td('.td-pop-footer .slogan-custom').hide();
      }
    };
    var o0OQQO = function () {
      try {
        var OO0OOo = false;
        if (!!window.__IE_DEVTOOLBAR_CONSOLE_COMMAND_LINE || '__BROWSERTOOLS_DOMEXPLORER_ADDED' in window) {
          OO0OOo = true;
          return OO0OOo;
        }
        var QQoooQ = new Image();
        QQoooQ.__defineGetter__('id', function () {
          OO0OOo = true;
        });
        if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
          OO0OOo = true;
          return OO0OOo;
        } else {}
        return OO0OOo;
      } catch (e) {
        return false;
      }
    }();
    var Q00Q0o = function (oQQ0Qo, QQoooQ, o0oo0O) {
      QQoooQ.blackBox = window._fmOpt.blackbox ? window._fmOpt.blackbox : window._fmOpt.getinfo && window._fmOpt.getinfo() || '';
      if (oO0QQo.webview && oO0QQo.configInfo) {
        var QOoOOO = oO0QQo.configInfo.split(',');
        if (QOoOOO.length > 3) {
          oO0QQo.mfaId = QOoOOO[3] || '';
        }
      }
      var oQO0Q0 = (oOoQQ0 || '|') + '^^' + (window._fmOpt.token || '|') + '^^' + (window._fmOpt.partner || '|') + '^^' + (window._fmOpt.appName || '|');
      oQO0Q0 = oQO0Q0 + (oO0QQo.mfaId ? '^^' + oO0QQo.mfaId : '');
      var OoOQ0O = (QQoooQ.blackBox || '|') + '^^' + QQoooQ.requestType + '^^' + (oQ0o0O(oO0QQo.lang) + 1) + '^^' + (OQo0Q0.support_css3_value("transform-style", "preserve-3d") && !(!!window.ActiveXObject || "ActiveXObject" in window) ? 1 : 2);
      var oOOoQO = (QQ0ooO || '|') + '^^' + (Q0ooOo || '|') + '^^' + (o0OQQO || '|') + '^^' + new Date().getTime();
      var ooQQ0Q = QOOO0O(oQO0Q0 + '^^' + OoOQ0O) + '^^' + (QQoooQ.validateCodeObj || '|') + '^^' + (QQoooQ.userAnswer || '|') + '^^' + (QQoooQ.validateToken || '|') + QOOO0O(oOOoQO);
      var QOo0Oo = (QQoooQ.sensorInfo || '|') + '^^' + (QQoooQ.mouseInfo || '|') + '^^' + (QQoooQ.usedTime || '|');
      var OOOQOQ = window._fmOpt.token.split('-');
      var QoQQo0 = OOOQOQ[OOOQOQ.length - 2] + '-' + OOOQOQ[OOOQOQ.length - 1];
      var QQQOQO = "rsp67ou9" + QoQQo0.substring(10, 18);
      var QOQQO0 = o0QoQQ(8);
      var Qoo0Q0 = oQOoO0(QOQQO0 + window.location.href, QQQOQO);
      var QOQ0QQ = QOOO0O(Qoo0Q0) + QOOO0O(oOOoQO);
      var oOOoQO = oQOoO0(oOOoQO, QQQOQO);
      var QoOO00 = "web";
      var OO0OO0 = {};
      if (o0OQ0O) {
        OO0OO0.p1 = oQO0Q0;
        OO0OO0.p2 = OoOQ0O;
      }
      OO0OO0.p3 = oQOoO0(ooQQ0Q, QQQOQO);
      OO0OO0.p4 = oQOoO0(QOo0Oo, QQQOQO);
      OO0OO0.p5 = QoOO00;
      OO0OO0.p6 = Qoo0Q0;
      OO0OO0.p7 = QOQ0QQ + o0QoQQ(32);
      OO0OO0.p8 = QOQQO0;
      OO0OO0.p9 = oOOoQO;
      OO0OO0.mode = QQOQo0;
      _$td.ajax({
        type: "POST",
        crossDomain: true,
        scriptCharset: "UTF-8",
        url: oQQ0Qo + (o0OQ0O ? '' : "?p1=" + encodeURIComponent(oQO0Q0) + "&p2=" + encodeURIComponent(OoOQ0O)),
        data: OO0OO0,
        xhrFields: {
          'Access-Control-Allow-Origin': '*'
        },
        dataType: o0OQ0O ? "jsonp" : "json",
        jsonp: o0OQ0O ? "callback" : null,
        jsonpCallback: o0OQ0O ? 'cb' : null,
        timeout: O00oOQ,
        success: function (oQQ0Qo) {
          if (oQQ0Qo.statusCode !== "200") {
            if (oO0QQo.webview && oO0QQo.close && oQQ0Qo.statusCode !== "601") {
              var QQoooQ = {
                errorCode: oQQ0Qo.statusCode,
                errorMsg: oQQ0Qo.failMes
              };
              oO0QQo.close(JSON.stringify(QQoooQ));
              return;
            }
            if (oQQ0Qo.statusCode !== "601") {
              if (oO0QQo.display === "bind") {
                if (OQooOo) {
                  if (OQooOo.imageType === '1') {
                    OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", oQQ0Qo.failMes, oQQ0Qo.statusCode), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "slide", '.td-pop-cnt.slide.center', 800));
                  } else if (OQooOo.imageType === '2' || OQooOo.imageType === '3' || OQooOo.imageType === '4') {
                    OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", oQQ0Qo.failMes, oQQ0Qo.statusCode), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", '.td-pop-cnt.click.center', 800));
                  } else if (OQooOo.imageType === '5' || OQooOo.imageType === '6') {
                    OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", oQQ0Qo.failMes, oQQ0Qo.statusCode), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '3d', '.td-pop-cnt.click.center', 800));
                  }
                } else {
                  OQo0Q0.fadeOut(QOO0oO, 200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", oQQ0Qo.failMes, oQQ0Qo.statusCode), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '', ".td-pop-cnt.center", 800));
                }
              } else {
                OQo0Q0.fadeOut(QOO0oO, 1200, 500, OQo0Q0.changeBtnStatus.bind(OQo0Q0, OoQO00, false, "td-s-loading", "td-s-fail", 1300, oQQ0Qo.failMes));
              }
            }
          }
          if (oQQ0Qo.statusCode == "200") {
            o0oo0O(oQQ0Qo);
          } else {
            QoQOOO = "initial";
          }
          OoQoO0();
        },
        complete: function (oQQ0Qo, QQoooQ) {
          var ooQOQO = 200;
          try {
            if (oQQ0Qo && oQQ0Qo.statusCode && oQQ0Qo.statusCode().status) {
              ooQOQO = oQQ0Qo.statusCode().status;
            }
          } catch (e) {}
          if (QQoooQ === "timeout" || QQoooQ === "error") {
            QoQOOO = "initial";
            if (oO0QQo.onFail) {
              if (ooQOQO === 503) {
                oO0QQo.onFail("limit");
              } else {
                oO0QQo.onFail("noNetwork");
              }
            }
            OOoOOQ();
            if (_$td(".td-pop-cnt").length) {
              if (oO0QQo.display === "bind") {
                if (OQooOo) {
                  if (OQooOo.imageType === '1') {
                    OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTip, 1), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "slide", '.td-pop-cnt.slide.center', 0));
                  } else if (OQooOo.imageType === '2' || OQooOo.imageType === '3' || OQooOo.imageType === '4') {
                    OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTip, 1), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", '.td-pop-cnt.click.center', 0));
                  } else if (OQooOo.imageType === '5' || OQooOo.imageType === '6') {
                    OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTip, 1), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '3d', '.td-pop-cnt.click.center', 0));
                  }
                } else {
                  OQo0Q0.fadeIn(QOO0oO, 0, 100);
                  OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTip, 1), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '', ".td-pop-cnt", 0));
                }
              } else {
                OQo0Q0.fadeOut(QOO0oO, 1200, 500, OQo0Q0.changeBtnStatus.bind(OQo0Q0, OoQO00, false, "td-s-loading", "td-s-fail", 100, ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTipTA));
              }
            } else {
              if (oO0QQo.display === "bind") {
                OQo0Q0.fadeIn(QOO0oO, 0, 100);
                OQo0Q0.fadeOut(QOO0oO, 1200, 1000, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTip, 1), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, '', ".td-pop-cnt", 0));
              } else {
                OQo0Q0.changeBtnStatus(OoQO00, false, "loading", "fail", 100, ooQOQO === 503 ? QQQ0oQ.limitTip : QQQ0oQ.netTipTA);
              }
            }
            OoQoO0();
          }
        }
      });
    };
    var ooo0OO = function (oQQ0Qo) {
      var QQoooQ = '<div class="td-outer-wrapper pop ' + Q0oQOO + '">' + '<div class="td-mask-common background ' + (true ? "grey" : "clear") + '">' + "</div>" + '<div class="td-pop-cnt center td-n-hi ' + oQQ0Qo + '">' + (oO0QQo.display === "bind" ? '<div class="td-nw-wrapper td-bind">' : '<div class="td-nw-wrapper td-flat">') + "</div>" + '<div class="td-popup-info td-pp-loading td-pp-hi">' + '<div class="td-popup-content">' + '<div class="td_validate_box">' + (oO0QQo.closeLoading ? '' : '<div class="td_logo_img td-sprite-icon">' + QOO00Q + "</div>") + "</div>" + '<div class="td_fail_box">' + '<div class="td_fail_img td-sprite-icon">' + OO0O00 + "</div>" + "</div>" + '<div class="td_success_box">' + '<div class="td_success_img td-sprite-icon">' + QQQQ00 + "</div> " + "</div>" + '<div class="td_validate_msg"></div> ' + "</div> " + "</div>" + "</div>" + "</div>";
      _$td("body").append(QQoooQ);
      if (QQQQoQ || o0Oo0O) {
        _$td(".td-pop-slidetrigger").addClass("ie-compat");
        _$td(".td-pop-cnt").addClass("ie-compat");
        _$td(".td-btn-cnt").addClass("ie-compat");
      }
      if (OoOoOO()) {
        if (!o0Oo0O && !QQQQoQ) {
          _$td(".td-pop-cnt").addClass("ie-all");
        }
      }
    };
    var Q0OQQQ = function () {
      if (oO0QQo.display === "bind" && _$td(QOO0oO + ".td-outer-wrapper").length === 0) {
        var oQQ0Qo = '<div class="td-outer-wrapper pop ' + Q0oQOO + '"><div class="td-mask-common background ' + (true ? "grey" : "clear") + '"></div><div class="td-pop-cnt center td-n-hi " style="' + (QQQQoQ ? 'margin: -62px 0 0 -100px' : '') + '">' + (oO0QQo.display === "bind" ? '<div class="td-nw-wrapper td-bind">' : '<div class="td-nw-wrapper td-flat">') + "</div>" + '<div class="td-popup-info td-pp-hi" style="display:none;">' + '<div class="td-popup-content">' + '<div class="td_validate_box">' + (oO0QQo.closeLoading ? '' : '<div class="td_logo_img td-sprite-icon">' + QOO00Q + "</div>") + "</div>" + '<div class="td_fail_box">' + '<div class="td_fail_img td-sprite-icon">' + OO0O00 + "</div>" + "</div>" + '<div class="td_success_box">' + '<div class="td_success_img td-sprite-icon">' + QQQQ00 + "</div> " + "</div>" + '<div class="td_validate_msg"></div> ' + "</div> " + "</div>" + "</div>" + "</div>";
        _$td("body").append(oQQ0Qo);
        if (QQQQoQ || o0Oo0O) {
          _$td(".td-pop-slidetrigger").addClass("ie-compat");
          _$td(".td-pop-cnt").addClass("ie-compat");
          _$td(".td-btn-cnt").addClass("ie-compat");
        }
        if (OoOoOO()) {
          if (!o0Oo0O && !QQQQoQ) {
            _$td(".td-pop-cnt").addClass("ie-all");
          }
        }
      }
      if (oO0QQo.webview) {
        _$td('.td-outer-wrapper .td-pop-cnt').removeClass("td-n-hi");
      }
      if (oO0QQo.display === "bind") {
        if (!oO0QQo.webview) {
          if (oO0QQo.closeLoading) {} else {
            OQo0Q0.setPopupInfo(QOO0oO, "validate", QQQ0oQ.verifyTip, ".td-pop-cnt", true);
            OQo0Q0.fadeIn(QOO0oO, 0, 100);
          }
        }
      } else {
        OQo0Q0.changeBtnStatus(OoQO00, true, '', "td-s-loading");
      }
      QQQ0o0();
    };
    var o0O0Q0 = function () {
      var oQQ0Qo = _$td(OoQO00).offset(),
        QQoooQ = 0,
        ooQOQO = 0,
        QOoOOO = OQ0OO0,
        oQO0Q0 = OQooOo && OQooOo.imageType === '1' ? o00QOO : o0oQOo,
        OoOQ0O = _$td(window).width(),
        oOOoQO = _$td(window).height();
      if (oQQ0Qo) {
        QQoooQ = oQQ0Qo.left - (OQ0OO0 - _$td(OoQO00).width()) / 2 - _$td(document).scrollLeft();
        ooQOQO = oQQ0Qo.top - 180 - _$td(document).scrollTop();
      } else {
        return {
          left: OoOQ0O / 2 - 175 + 'px',
          top: oOOoQO / 2 - 165 + 'px'
        };
      }
      QQoooQ = QQoooQ + QOoOOO > OoOQ0O ? OoOQ0O - QOoOOO : QQoooQ;
      ooQOQO = ooQOQO + oQO0Q0 > oOOoQO ? oOOoQO - oQO0Q0 : ooQOQO;
      QQoooQ = Math.max(0, QQoooQ);
      ooQOQO = Math.max(0, ooQOQO);
      return {
        left: QQoooQ + 'px',
        top: ooQOQO + 'px'
      };
    };
    var oo0oo0 = function () {
      var oQQ0Qo = _$td(oO0QQo.area);
      _$td(QOO0oO + '.td-outer-wrapper.pop').width(oQQ0Qo.outerWidth()).height(oQQ0Qo.outerHeight());
      _$td(QOO0oO + '.td-outer-wrapper.pop').css({
        left: oQQ0Qo.offset().left,
        top: oQQ0Qo.offset().top,
        position: "absolute"
      });
    };
    var o0Qo00 = function (QQOooO) {
      if (QoQOOO == "success") {
        QoQOOO = "initial";
      }
      O00ooO(false, QQOooO);
      QO0QQQ();
      OQooOo = QQOooO.validateCodeObj;
      var QQoooQ = oO0QQo.webview ? 0 : 500;
      if (!oO0QQo.webview && QQOooO.statusCode !== "200") {
        if (oO0QQo.display === "bind") {
          OQo0Q0.fadeOut(QOO0oO, 800, 400, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", QQOooO.failMes, QQOooO.statusCode), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", ".td-pop-cnt", 0));
        } else {
          OQo0Q0.changeBtnStatus(OoQO00, false, "td-s-loading", "td-s-fail", 200, QQOooO.failMes);
        }
        return;
      }
      if (oO0QQo.webview && OQooOo) {
        if (OQooOo.imageType === '1') {
          _$td('.td-outer-wrapper .td-pop-cnt .td-nw-wrapper').css("height", oO0QQo.height || "380px");
        } else {
          _$td('.td-outer-wrapper .td-pop-cnt .td-nw-wrapper').css("height", oO0QQo.height || "320px");
        }
        _$td('.td-outer-wrapper .td-pop-cnt').removeClass("td-n-hi");
        _$td('.td-outer-wrapper .td-pop-cnt .td-nw-wrapper').css("transform", "scale(" + Oo0OOo + ')');
        _$td(".td-popup-info").hide();
      }
      if (!QQOooO.needValidateCode) {
        OQ00Qo();
        QoQOOO = "success";
        if (oO0QQo.display === "bind") {
          if (!oO0QQo.bindSucNoFed) {
            if (oO0QQo.closeLoading) {
              OQo0Q0.fadeIn(QOO0oO, 0, 200);
            }
            OQo0Q0.fadeOut(QOO0oO, 400, 400, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "success", QQQ0oQ.successTip), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", ".td-pop-cnt", 0));
          } else {
            OQo0Q0.fadeOut(QOO0oO, 400, 400);
          }
        } else {
          OQo0Q0.changeBtnStatus(OoQO00, true, "td-s-loading", "td-s-success", 200);
        }
        Q00QOQ(OO00O0.btnSucc);
        OoO0Qo();
        setTimeout(function () {
          oO0QQo.onSuccess && oO0QQo.onSuccess(QQOooO.validateToken);
        }, 500);
      } else if (OQooOo && OQooOo.imageType === '1') {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("slide");
        OQo0Q0.validateShow(QOO0oO, "slide", ".td-pop-cnt.slide", 300);
        if (!oO0QQo.webview && oO0QQo.display === "bind") {
          OQo0Q0.fadeIn(QOO0oO, 0, 0);
        }
        if (_$td(QOO0oO + ' ' + ".td-pop-slide-area").length === 0 && _$td(QOO0oO + ' ' + ".td-pop-click-area").length === 0) {
          setTimeout(function () {
            oOooOo();
          }, QQoooQ);
        } else {
          oOooOo();
        }
        Q00QOQ(OO00O0.btnFail);
      } else if (OQooOo && (OQooOo.imageType === '2' || OQooOo.imageType === '3' || OQooOo.imageType === '4' || OQooOo.imageType === '7')) {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("click");
        OQo0Q0.validateShow(QOO0oO, "click", ".td-pop-cnt.click", 300);
        if (!oO0QQo.webview && oO0QQo.display === "bind") {
          OQo0Q0.fadeIn(QOO0oO, 0, 0);
        }
        if (_$td(QOO0oO + ' ' + ".td-pop-slide-area").length === 0 && _$td(QOO0oO + ' ' + ".td-pop-click-area").length === 0) {
          setTimeout(function () {
            O00Q0O();
          }, QQoooQ);
        } else {
          O00Q0O();
        }
        Q00QOQ(OO00O0.btnFail);
      } else if (OQooOo && OQooOo.imageType === '5' || OQooOo && OQooOo.imageType === '6') {
        _$td(QOO0oO + ' ' + ".td-pop-cnt").addClass("click");
        if (!oO0QQo.webview && oO0QQo.display === "bind") {
          OQo0Q0.fadeIn(QOO0oO, 0, 0);
        }
        if (OQo0Q0.isSupportTransform()) {
          OQo0Q0.validateShow(QOO0oO, '3d', ".td-pop-cnt.click", 300);
          if (_$td(QOO0oO + ' ' + ".td-pop-3d-area").length === 0) {
            setTimeout(function () {
              QO0oOQ();
            }, QQoooQ);
          } else {
            QO0oOQ();
          }
        } else {
          OQo0Q0.validateShow(QOO0oO, "click", ".td-pop-cnt.click", 300);
          if (_$td(QOO0oO + ' ' + ".td-pop-click-area").length === 0) {
            setTimeout(function () {
              O00Q0O();
            }, QQoooQ);
          } else {
            O00Q0O();
          }
        }
        Q00QOQ(OO00O0.btnFail);
      } else {
        if (oO0QQo.display === "bind") {
          OQo0Q0.fadeOut(QOO0oO, 800, 400, OQo0Q0.setPopupInfo.bind(OQo0Q0, QOO0oO, "fail", QQQ0oQ.failTip, QQOooO.statusCode), OQo0Q0.validateClose.bind(OQo0Q0, QOO0oO, "click", ".td-pop-cnt", 0));
        } else {
          OQo0Q0.changeBtnStatus(OoQO00, false, "td-s-loading", "td-s-fail", 200, QQOooO.failMes);
        }
        Q00QOQ(OO00O0.btnFail);
      }
    };
    var QO0QQQ = function () {
      O0OOOo = setInterval(function () {
        if (_$td(".td-outer-wrapper").css("display") !== "none") {
          if (OQooOo.imageType === '1') {
            Q0oo0o();
          } else {
            QOQQQQ();
          }
        } else {
          OQ00Qo();
        }
      }, Q0OoQQ);
    };
    var QQ0OQo = function () {
      clearInterval(O0OOOo);
      O0OOOo = setInterval(function () {
        if (_$td(".td-outer-wrapper").css("display") !== "none") {
          if (OQooOo.imageType === '1') {
            Q0oo0o();
          } else {
            QOQQQQ();
          }
        } else {
          OQ00Qo();
        }
      }, Q0OoQQ);
    };
    var OQ00Qo = function () {
      clearInterval(O0OOOo);
    };
    var Ooo00Q = function (oQQ0Qo) {
      if (oO0QQo.display === "bind" && oO0QQo.beforeValidate && !oO0QQo.beforeValidate() || QoQOOO === "loading") {
        return;
      }
      QoQOOO = "loading";
      oo0Q0o();
      Q0OQQQ();
      Q00Q0o(Oo0OQo, {
        requestType: 1,
        mouseInfo: QooQQO(oQQ0Qo.pageX, oQQ0Qo.pageY),
        usedTime: 0
      }, function (oQQ0Qo) {
        QoQOOO = "validate";
        o0Qo00(oQQ0Qo);
      });
    };
    window._fmOpt.triggerCaptcha = function (oQQ0Qo) {
      OOoOOQ(0);
      Q0OQQQ();
      oo0Q0o();
      if (oQQ0Qo) {
        _$td.ajax({
          type: "POST",
          crossDomain: true,
          scriptCharset: "UTF-8",
          data: {
            captchaToken: oQQ0Qo,
            blackBox: window._fmOpt.getinfo()
          },
          url: oOoOQO,
          dataType: o0OQ0O ? "jsonp" : "json",
          jsonp: o0OQ0O ? "callback" : null,
          jsonpCallback: o0OQ0O ? 'cb' : null,
          xhrFields: {
            'Access-Control-Allow-Origin': '*'
          },
          success: function (oQQ0Qo) {
            o0Qo00(oQQ0Qo);
            Q00QOQ(OO00O0.triggerCaptcha);
          }
        });
      } else {
        Q00Q0o(Oo0OQo, {
          requestType: 1,
          mouseInfo: QooQQO(0, 0),
          usedTime: 0
        }, function (oQQ0Qo) {
          o0Qo00(oQQ0Qo);
        });
      }
    };
    window._fmOpt.bindCaptcha = function (oQQ0Qo) {
      _$td(oO0QQo.display === "bind" ? OoQO00 : OoQO00 + ' ' + ".td-btn-cnt").off("click", Ooo00Q);
      oO0QQo.display = oQQ0Qo.display || oO0QQo.display;
      oO0QQo.container = oQQ0Qo.container || oO0QQo.container;
      oO0QQo.area = oQQ0Qo.area || oO0QQo.area;
      oO0QQo.width = oQQ0Qo.width || oO0QQo.width;
      OoQO00 = oO0QQo.container;
      ooQ000();
      setTimeout(function () {
        oO0QQo.onReady && oO0QQo.onReady();
      }, 1);
    };
    if (oO0QQo.webview) {
      window._fmSensorCbk = function (oQQ0Qo) {
        if (OQooOo && OQooOo.imageType === '1' && oQQ0Qo) {
          ooQOOo(oQQ0Qo);
        } else if (OQooOo && (OQooOo.imageType === '2' || OQooOo.imageType === '3' || OQooOo.imageType === '4' || OQooOo.imageType === '5' || OQooOo.imageType === '6' || OQooOo.imageType === '7') && oQQ0Qo) {
          QOoOOQ(oQQ0Qo);
        }
        oO0QQo.start && oO0QQo.start(80, 6);
      };
      window._fmSensorInfoCbk = function () {
        oO0QQo.setType && oO0QQo.setType(window._$td.support.cors ? "post" : "get");
      };
    } else {
      ooQ000();
    }
    Oo0QOO = window._fmOpt.initialTime;
    Q00QOQ(OO00O0.init);
    OoO0Qo();
    setTimeout(function () {
      oO0QQo.onReady && oO0QQo.onReady();
    }, 1);
    var o00ooO = {
        'Silence': 0,
        'MouseMove': 1,
        'MouseDown': 2,
        'MouseUp': 3,
        'ScrollDown': 4,
        'ScrollUp': 5,
        'KeyDown': 6,
        'KeyUp': 7,
        'Click': 10,
        'DbClick': 11,
        'MouseMoveSequence': 12,
        'DragAndDrop': 13,
        'Enter': 14,
        'td-login-id': 20,
        'td-login-pwd': 21,
        'td-reg-field': 22,
        'td-reg-pwd': 23,
        'td-forget-field': 24,
        'td-sms-field': 25,
        'td-post-field': 26,
        'td-query-field': 27,
        'Others': 'Z'
      },
      OQo0Oo = ["td-login-id", "td-login-pwd", "td-reg-field", "td-reg-pwd", "td-forget-field", "td-sms-field", "td-post-field", "td-query-field"];
    var QQ0QO0 = function (oQQ0Qo, QQoooQ, ooQOQO) {
      if (oQQ0Qo.length == OQOO0Q) {
        oQQ0Qo = [oQQ0Qo];
      }
      for (var QOoOOO = 0, oQO0Q0 = oQQ0Qo.length; QOoOOO < oQO0Q0; QOoOOO++) {
        if (oQQ0Qo[QOoOOO].addEventListener) {
          oQQ0Qo[QOoOOO].addEventListener(QQoooQ, ooQOQO, false);
        } else {
          oQQ0Qo[QOoOOO].attachEvent('on' + QQoooQ, ooQOQO);
        }
      }
    };
    var oooQQQ = function (oQQ0Qo, QQoooQ, ooQOQO) {
      if (oQQ0Qo.length == OQOO0Q) {
        oQQ0Qo = [oQQ0Qo];
      }
      for (var QOoOOO = 0, oQO0Q0 = oQQ0Qo.length; QOoOOO < oQO0Q0; QOoOOO++) {
        if (oQQ0Qo[QOoOOO].addEventListener) {
          return oQQ0Qo[QOoOOO].removeEventListener(QQoooQ, ooQOQO, false);
        } else {
          return oQQ0Qo[QOoOOO].detachEvent('on' + QQoooQ, ooQOQO);
        }
      }
    };
    var QQOoOQ = function (oQQ0Qo, QQoooQ) {
      if (window.navigator.userAgent.indexOf("Firefox") != -1) {
        oQQ0Qo.addEventListener("DOMMouseScroll", QQoooQ, false);
      } else {
        QQ0QO0(oQQ0Qo, "mousewheel", QQoooQ);
      }
    };
    var QO0oo0 = function (oQQ0Qo) {
      var QQoooQ = _$td(oQQ0Qo.target),
        ooQOQO = QQoooQ[0].className;
      if (ooQOQO.indexOf("td-") === -1) {
        return '';
      }
      for (var QOoOOO in OQo0Oo) {
        if (ooQOQO.indexOf(OQo0Oo[QOoOOO]) !== -1) {
          return o00ooO[OQo0Oo[QOoOOO]];
        }
      }
      return '';
    };
    var ooQQ0O = function () {
      if (!O00Ooo.length) {
        return;
      }
      var oQQ0Qo = O00Ooo[O00Ooo.length - 1];
      if (oQQ0Qo && oQQ0Qo.type === o00ooO.MouseMove) {
        oQQ0Qo.Action = o00ooO.MouseMoveSequence;
      }
    };
    var OoOOOQ;
    var oOQoo0 = function () {
      if (!OoOOOQ) {
        OoOOOQ = {};
        var oQQ0Qo = {};
        oQQ0Qo[OQQOo0(OQoQ0o)] = [oQOoO0];
        oQQ0Qo[OQQOo0(QOOO0O)] = [Q00Q0o];
        for (var QQoooQ in oQQ0Qo) {
          if (oQQ0Qo.hasOwnProperty(QQoooQ)) {
            var ooQOQO = OoOOOQ[QQoooQ] = [];
            for (var QOoOOO in oQQ0Qo[QQoooQ]) {
              if (oQQ0Qo[QQoooQ].hasOwnProperty(QOoOOO)) {
                ooQOQO.push(OQQOo0(oQQ0Qo[QQoooQ][QOoOOO]));
              }
            }
          }
        }
      }
      var oQO0Q0 = arguments["callee"].caller;
      var OoOQ0O = OQQOo0(oQO0Q0);
      if (OoOQ0O in OoOOOQ) {
        var oOOoQO = OQQOo0(oQO0Q0.caller);
        if (QoOo00(OoOOOQ[OoOQ0O], oOOoQO)) {
          return;
        }
        return;
      }
    };
    var QoOo00 = function (oQQ0Qo, QQoooQ) {
      var ooQOQO = oQQ0Qo.length;
      while (ooQOQO--) {
        if (oQQ0Qo[ooQOQO] === QQoooQ) {
          return true;
        }
      }
      return false;
    };
    var OQQOo0 = function (oQQ0Qo) {
      if ((typeof oQQ0Qo).toLowerCase() === "function") {
        oQQ0Qo = '' + oQQ0Qo;
      }
      if (oQQ0Qo == null) {
        return null;
      }
      for (var QQoooQ = 64222, ooQOQO = 0; ooQOQO < oQQ0Qo.length; ooQOQO++) QQoooQ ^= (QQoooQ << 8) + (QQoooQ >>> 3) + oQQ0Qo.charCodeAt(ooQOQO);
      return QQoooQ;
    };
    var QOOQOO = function () {
      var OOQQQQ = function (oQQ0Qo) {
        if (QQQQoQ) {
          var QQoooQ = document.documentElement.scrollLeft || document.body.scrollLeft;
          var ooQOQO = document.documentElement.scrollTop || document.body.scrollTop;
          return {
            x: QQoooQ + oQQ0Qo.clientX,
            y: ooQOQO + oQQ0Qo.clientY
          };
        } else {
          return {
            x: oQQ0Qo.pageX,
            y: oQQ0Qo.pageY
          };
        }
      };
      window.setInterval(function () {
        var oQQ0Qo = new Date().getTime();
        if (oOoQOQ || O00Ooo.length && oQQ0Qo - o0OOOQ < 200) {
          return;
        }
        ooQQ0O();
        var QQoooQ = O00Ooo[O00Ooo.length - 1];
        if (QQoooQ && QQoooQ.type !== o00ooO.Silence) {
          O00Ooo.push({
            type: o00ooO.Silence,
            time: oQQ0Qo,
            Action: '',
            op_x: O0OQ0o.x,
            op_y: O0OQ0o.y
          });
        }
      }, 200);
      QQ0QO0([window], "online", function () {
        try {
          if (window.performance && window.performance.getEntries) {
            var oQQ0Qo = window.performance.getEntries();
            var QQoooQ = '';
            var ooQOQO = [];
            var QOoOOO = {};
            var oQO0Q0 = 0;
            for (var OoOQ0O = 0, oOOoQO = oQQ0Qo.length; OoOQ0O < oOOoQO; OoOQ0O++) {
              if (oQQ0Qo[OoOQ0O].initiatorType == "img" && oQQ0Qo[OoOQ0O].name.indexOf("/sphinx/slide") != -1) {
                var ooQQ0Q = ((oQQ0Qo[OoOQ0O].name.match(/[^\/]+$/g) || [])[0] || '').split('.')[0];
                if (ooQOQO.indexOf(ooQQ0Q) == -1) ooQOQO.push(ooQQ0Q);
                if (ooQQ0Q) {
                  if (!QOoOOO[ooQQ0Q]) {
                    QOoOOO[ooQQ0Q] = [0, 0];
                  }
                  if (oQQ0Qo[OoOQ0O].name.indexOf("/sphinx/slide-bg") != -1) {
                    QOoOOO[ooQQ0Q][0] = 1;
                  } else {
                    QOoOOO[ooQQ0Q][1] = 1;
                  }
                }
                oQO0Q0++;
              }
            }
            ;
            for (var QOo0Oo = 0, OOOQOQ = ooQOQO.length; QOo0Oo < OOOQOQ; QOo0Oo++) {
              if (QOo0Oo) QQoooQ += '_';
              QQoooQ += ooQOQO[QOo0Oo] + '_' + QOoOOO[ooQOQO[QOo0Oo]][0] + '_' + QOoOOO[ooQOQO[QOo0Oo]][1];
            }
            switch (OQooOo && OQooOo.imageType) {
              case '1':
                _$td.ajax({
                  type: "GET",
                  crossDomain: true,
                  scriptCharset: "UTF-8",
                  url: o0OQoQ + '/sphinx/feedback/v1?partnerCode=' + window._fmOpt.partner + "&appName=" + window._fmOpt.appName + "&info=" + (oQO0Q0 == OoooQQ.length * 2) + ',' + oQO0Q0 + '_' + OoooQQ.length * 2 + ",images_" + QQoooQ + ",seqIds_" + OoooQQ.join('_') + "&type=6&sequenceId=" + OoooQQ[OoooQQ.length - 1]
                });
                break;
            }
          }
        } catch (e) {}
      });
      QQ0QO0(document, O0OQ00[oQoQOo][1], function (oQQ0Qo) {
        o0OOOQ = new Date().getTime();
        var QQoooQ = oQQ0Qo;
        if (oQoOo0) {
          QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
        } else {
          switch (oQoQOo) {
            case (108 - 89) / 19:
              QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
              break;
          }
        }
        O0OQ0o = {
          x: OOQQQQ(QQoooQ).x,
          y: OOQQQQ(QQoooQ).y
        };
        var ooQOQO = O00Ooo[O00Ooo.length - 1];
        if (ooQOQO && ooQOQO.type === o00ooO.MouseMove && Math.abs(o0OOOQ - ooQOQO.time) < ooQooO) {
          if (Math.abs(ooQOQO.op_x - O0OQ0o.x) < 3 && Math.abs(ooQOQO.op_y - O0OQ0o.y) < 3) {
            return;
          }
        }
        O00Ooo.push({
          type: o00ooO.MouseMove,
          time: o0OOOQ,
          Action: '',
          op_x: OOQQQQ(QQoooQ).x,
          op_y: OOQQQQ(QQoooQ).y
        });
      });
      QQ0QO0(document, O0OQ00[oQoQOo][0], function (oQQ0Qo) {
        o0OOOQ = new Date().getTime();
        ooQQ0O();
        oOoQOQ = true;
        var QQoooQ = oQQ0Qo;
        if (oQoOo0) {
          QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
        } else {
          switch (oQoQOo) {
            case (97 - 78) / 19:
              QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
              break;
          }
        }
        O00Ooo.push({
          type: o00ooO.MouseDown,
          time: o0OOOQ,
          Action: '',
          op_x: OOQQQQ(QQoooQ).x,
          op_y: OOQQQQ(QQoooQ).y
        });
      });
      QQ0QO0(document, O0OQ00[oQoQOo][2], function (oQQ0Qo) {
        o0OOOQ = new Date().getTime();
        oOoQOQ = false;
        var QQoooQ = oQQ0Qo;
        if (oQoOo0) {
          QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
        } else {
          switch (oQoQOo) {
            case (102 - 82) / 20:
              QQoooQ = (oQQ0Qo.changedTouches || [{}])[0];
              break;
          }
        }
        O00Ooo.push({
          type: o00ooO.MouseUp,
          time: o0OOOQ,
          Action: '',
          op_x: OOQQQQ(QQoooQ).x,
          op_y: OOQQQQ(QQoooQ).y
        });
        var ooQOQO = O00Ooo[O00Ooo.length - 1];
        if (ooQOQO.type === o00ooO.MouseUp) {
          if (O00Ooo[O00Ooo.length - 2] && O00Ooo[O00Ooo.length - 2].type === o00ooO.MouseMove) {
            ooQOQO.Action = o00ooO.DragAndDrop;
          } else {
            ooQOQO.Action = o00ooO.Click;
          }
        }
      });
      _$td("html").dblclick(function (oQQ0Qo) {
        o0OOOQ = new Date().getTime();
        var QQoooQ = O00Ooo[O00Ooo.length - 1];
        if (QQoooQ && QQoooQ.type === o00ooO.Click) {
          QQoooQ.Action = o00ooO.DbClick;
        }
      });
      QQOoOQ(document, function (oQQ0Qo) {
        var QQoooQ = oQQ0Qo.wheelDelta ? oQQ0Qo.wheelDelta > 0 : oQQ0Qo.detail < 0;
        ooQQ0O();
        O00Ooo.push({
          type: QQoooQ ? o00ooO.ScrollDown : o00ooO.ScrollUp,
          time: o0OOOQ,
          Action: '',
          op_x: OOQQQQ(oQQ0Qo).x,
          op_y: OOQQQQ(oQQ0Qo).y
        });
      });
      _$td(oO0QQo.keyContainer || "html").keydown(function (oQQ0Qo) {
        if (!oQQ0Qo.key) {
          return;
        }
        ooQQ0O();
        O00Ooo.push({
          type: o00ooO.KeyDown,
          time: new Date().getTime(),
          dialog_type: QO0oo0(oQQ0Qo),
          op_x: O0OQ0o.x,
          op_y: O0OQ0o.y,
          Action: oQQ0Qo.keyCode === 13 ? o00ooO.Enter : ''
        });
      });
      _$td(oO0QQo.keyContainer || "html").keyup(function (oQQ0Qo) {
        if (!oQQ0Qo.key) {
          return;
        }
        O00Ooo.push({
          type: o00ooO.KeyUp,
          time: new Date().getTime(),
          dialog_type: QO0oo0(oQQ0Qo),
          op_x: O0OQ0o.x,
          op_y: O0OQ0o.y
        });
      });
    };
    QOOQOO();
    var Ooo0oQ = function (oQQ0Qo) {
      return Math.round(oQQ0Qo).toString(36);
    };
    var OoO0oQ = function () {
      var oQQ0Qo = 99;
      var QQoooQ = Math.round(O00Ooo.length / oQQ0Qo),
        ooQOQO = [];
      if (QQoooQ === 0) {
        QQoooQ = 1;
      }
      if (o0OQ0O) {
        for (var QOoOOO = 0, oQO0Q0 = O00Ooo.length; QOoOOO < oQO0Q0; QOoOOO++) {
          var OoOQ0O = O00Ooo[QOoOOO];
          if (OoOQ0O.type !== 1) {
            ooQOQO.push(OoOQ0O);
          } else {
            if (QOoOOO % QQoooQ === 0) {
              ooQOQO.push(OoOQ0O);
            }
          }
        }
        O00Ooo = ooQOQO;
      }
    };
    var QooQQO = function (oQQ0Qo, QQoooQ) {
      var ooQOQO,
        QOoOOO = '',
        oQO0Q0 = '',
        OoOQ0O = 0,
        oOOoQO = 0,
        ooQQ0Q = O00Ooo[O00Ooo.length - 1];
      var QOo0Oo = _$td(OoQO00).offset() || {
        top: 0,
        left: 0
      };
      QOo0Oo.width = _$td(OoQO00).outerWidth();
      QOo0Oo.height = _$td(OoQO00).outerHeight();
      if (ooQQ0Q && ooQQ0Q.type === o00ooO.KeyDown && ooQQ0Q.Action === o00ooO.Enter) {
        oQQ0Qo = -1;
        QQoooQ = -1;
      }
      OoO0oQ();
      ooQOQO = Ooo0oQ(QOo0Oo.left) + ',' + Ooo0oQ(QOo0Oo.top) + ',' + Ooo0oQ(QOo0Oo.left + QOo0Oo.width) + ',' + Ooo0oQ(QOo0Oo.top + QOo0Oo.height) + ',' + Ooo0oQ(oQQ0Qo) + ',' + Ooo0oQ(QQoooQ) + ',' + '0,' + (oQoOo0 ? '1' : '0') + ',' + Ooo0oQ(QOo0Qo);
      for (var OOOQOQ = O00Ooo.length - 1; OOOQOQ >= 0; OOOQOQ--) {
        var QoQQo0 = O00Ooo[OOOQOQ];
        if (QoQQo0.type === o00ooO.KeyDown || QoQQo0.type === o00ooO.KeyUp) {
          if (!oQoOo0) {
            if (oOOoQO < oQQOOQ) {
              oQO0Q0 = Ooo0oQ(QoQQo0.time - QOo0Qo) + ',' + Ooo0oQ(QoQQo0.type) + (QoQQo0.dialog_type ? ',' + Ooo0oQ(QoQQo0.dialog_type) : '') + '|' + oQO0Q0;
              oOOoQO++;
            }
          }
        } else {
          if (OoOQ0O < oQQOOQ) {
            QOoOOO = Ooo0oQ(QoQQo0.time - QOo0Qo) + ',' + Ooo0oQ(QoQQo0.type) + ',' + Ooo0oQ(QoQQo0.op_x) + ',' + Ooo0oQ(QoQQo0.op_y) + (QoQQo0.Action ? ',' + Ooo0oQ(QoQQo0.Action) : '') + '|' + QOoOOO;
            OoOQ0O++;
          }
        }
      }
      O00Ooo = [];
      return ooQOQO + '%' + QOoOOO + (oQO0Q0 ? '%' + oQO0Q0 : '');
    };
    var QQQO0O = function (oQQ0Qo, QQoooQ, ooQOQO) {
      OoO0oQ();
      var QQQQ0O = '',
        oQO0Q0 = '',
        o0o0QQ = _$td(QOO0oO + ' ' + ".td-pop-cnt").offset(),
        oOOoQO = function (oQQ0Qo) {
          if (Oo0OOo !== 1 && oQQ0Qo > o0o0QQ.left) {
            oQQ0Qo = o0o0QQ.left + (oQQ0Qo - o0o0QQ.left) / Oo0OOo;
          }
          return oQQ0Qo;
        },
        ooQQ0Q = function (oQQ0Qo) {
          if (Oo0OOo !== 1 && oQQ0Qo > o0o0QQ.top) {
            oQQ0Qo = o0o0QQ.top + (oQQ0Qo - o0o0QQ.top) / Oo0OOo;
          }
          return oQQ0Qo;
        };
      if (ooQOQO === "click") {
        var QOo0Oo = _$td(QOO0oO + ' ' + ".td-bg-img").offset();
        QQQQ0O = Ooo0oQ(oOOoQO(QOo0Oo.left)) + ',' + Ooo0oQ(ooQQ0Q(QOo0Oo.top)) + ',' + Ooo0oQ(oOOoQO(QOo0Oo.left + 320)) + ',' + Ooo0oQ(ooQQ0Q(QOo0Oo.top) + 180) + ",2," + (oQoOo0 ? '1' : '0') + ',' + Ooo0oQ(QOo0Qo);
      } else if (ooQOQO === "3dClick") {
        var OOOQOQ = _$td(QOO0oO + " #td-3d-box");
        var QoQQo0 = OOOQOQ.attr("td_3d_data_id");
        var QQQOQO = OOOQOQ.attr("td_3d_data_X");
        var QOQQO0 = OOOQOQ.attr("td_3d_data_Y");
        _$td(QOO0oO + ' .' + QoQQo0).find(".td-3d-point").map(function (oQQ0Qo) {
          var QQoooQ = _$td(this).offset();
          QQQQ0O += QQoooQ.left + ',' + QQoooQ.top + ',';
        });
        QQQQ0O += (OQooOo.rotateImages[QoQQo0.replace("td-3d-face-", '')] || {}).index + ',' + QQQOQO + ',' + QOQQO0 + ',' + OQooOo.imageType + ',' + (oQoOo0 ? '1' : '0') + ',' + Ooo0oQ(QOo0Qo);
      } else {
        var Qoo0Q0 = _$td(QOO0oO + ' ' + ".td-pop-slidebar").offset(),
          QOQ0QQ = _$td(QOO0oO + ' ' + ".td-pop-center").offset();
        Qoo0Q0.top -= 4;
        QQQQ0O = Ooo0oQ(oOOoQO(Qoo0Q0.left)) + ',' + Ooo0oQ(ooQQ0Q(Qoo0Q0.top)) + ',' + Ooo0oQ(oOOoQO(Qoo0Q0.left) + Q0OoOQ * Oo0OOo) + ',' + Ooo0oQ(ooQQ0Q(Qoo0Q0.top) + 40) + ',' + Ooo0oQ(oOOoQO(oQQ0Qo)) + ',' + Ooo0oQ(ooQQ0Q(QQoooQ)) + ',' + Ooo0oQ(oOOoQO(QOQ0QQ.left)) + ',' + Ooo0oQ(ooQQ0Q(QOQ0QQ.top) + OQooOo.slideY) + ',' + '1,' + (oQoOo0 ? '1' : '0') + ',' + Ooo0oQ(QOo0Qo);
      }
      for (var oOOOoo = 0, QoOO00 = O00Ooo.length; oOOOoo < QoOO00; oOOOoo++) {
        var OO0OO0 = O00Ooo[oOOOoo];
        oQO0Q0 += Ooo0oQ(OO0OO0.time - QOo0Qo) + ',' + Ooo0oQ(OO0OO0.type) + ',' + Ooo0oQ(oOOoQO(OO0OO0.op_x)) + ',' + Ooo0oQ(ooQQ0Q(OO0OO0.op_y)) + (OO0OO0.Action ? ',' + Ooo0oQ(OO0OO0.Action) : '') + '|';
      }
      O00Ooo = [];
      var OO00QQ = 10200,
        oooQoO = (QQQQ0O + '%').length,
        o000oQ = oQO0Q0.length;
      if (o000oQ > OO00QQ - oooQoO) {
        var oQo0Qo = o000oQ - (OO00QQ - oooQoO);
        oQO0Q0 = oQO0Q0.substring(oQo0Qo, o000oQ - 1).split('|');
        oQO0Q0.shift();
        oQO0Q0 = oQO0Q0.join('|') + '|';
      }
      return QQQQ0O + '%' + oQO0Q0;
    };
    oO0QQo.reset = function () {
      QoQOOO = "initial";
      _$td(QOO0oO + ".td-outer-wrapper").remove();
      _$td(QOO0oO + ' ' + ".td-pop-slide-area").remove();
      _$td(QOO0oO + ' ' + ".td-pop-click-area").remove();
      _$td(QOO0oO + ' ' + ".td-pop-3d-area").remove();
      window._fmOpt.token = window._fmOpt.partner + '-' + new Date().getTime() + '-' + Math.random().toString(16).substr(2);
      var oQQ0Qo = "?partnerCode=" + window._fmOpt.partner + "&appName=" + window._fmOpt.appName + "&sessionId=" + window._fmOpt.token;
      oOoOQO = o0OQoQ + "/sphinx/captcha/v1" + oQQ0Qo;
      Q0OOoO = o0OQoQ + "/sphinx/loadcount/v1" + oQQ0Qo;
      var QQoooQ = _$td(OoQO00 + ' ' + ".td-btn-cnt")[0];
      if (QQoooQ) {
        if (QQQQoQ || o0Oo0O) {
          QQoooQ.className = 'td-btn-cnt td-s-logo ie-compat';
        } else {
          QQoooQ.className = "td-btn-cnt td-s-logo";
        }
      }
    };
    if (Array.prototype.indexOf === OQOO0Q) {
      Array.prototype.indexOf = function (oQQ0Qo) {
        for (var QQoooQ = 0; QQoooQ < this.length; QQoooQ++) {
          if (this[QQoooQ] == oQQ0Qo) return QQoooQ;
        }
        return -1;
      };
    }
    if (Function.prototype.bind === OQOO0Q) {
      Function.prototype.bind = function (OOQ0O0) {
        if (typeof this !== "function") {
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        var oOQOOO = Array.prototype.slice.call(arguments, 1),
          O0Q0oo = this,
          QOQOoO = function () {},
          oQO0Q0 = function () {
            return O0Q0oo.apply(this instanceof QOQOoO && OOQ0O0 ? this : OOQ0O0, oOQOOO.concat(Array.prototype.slice.call(arguments)));
          };
        QOQOoO.prototype = this.prototype;
        oQO0Q0.prototype = new QOQOoO();
        return oQO0Q0;
      };
    }
  })(oQQ0Qo);
  return oQQ0Qo;
};
if (window._fmOpt) {
  window._fmOpt.newCaptcha(window._fmOpt);
}