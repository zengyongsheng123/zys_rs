function setCookie(name, value) {
  var expiredate = new Date();
  expiredate.setTime(expiredate.getTime() + 3600000);
  document.cookie = name + "=" + value + ";expires=" + expiredate.toGMTString() + ";max-age=3600;path=/";
}
function reload(x) {
  setCookie("acw_sc__v2", x);
  document.location.reload();
}
var _0x4818 = ["csKHwqMI", "ZsKJwr8VeAsy", "UcKiN8O/wplwMA==", "JR8CTg==", "YsOnbSEQw7ozwqZKesKUw7kwX8ORIQ==", "w7oVS8OSwoPCl3jChMKhw6HDlsKXw4s/YsOG", "fwVmI1AtwplaY8Otw5cNfSgpw6M=", "OcONwrjCqsKxTGTChsOjEWE8PcOcJ8K6", "U8K5LcOtwpV0EMOkw47DrMOX", "HMO2woHCiMK9SlXClcOoC1k=", "asKIwqMDdgMuPsOKBMKcwrrCtkLDrMKBw64d", "wqImMT0tw6RNw5k=", "DMKcU0JmUwUv", "VjHDlMOHVcONX3fDicKJHQ==", "wqhBH8Knw4TDhSDDgMOdwrjCncOWwphhN8KCGcKqw6dHAU5+wrg2JcKaw4IEJcOcwrRJwoZ0wqF9YgAV", "dzd2w5bDm3jDpsK3wpY=", "w4PDgcKXwo3CkcKLwr5qwrY=", "wrJOTcOQWMOg", "wqTDvcOjw447wr4=", "w5XDqsKhMF1/", "wrAyHsOfwppc", "J3dVPcOxLg==", "wrdHw7p9Zw==", "w4rDo8KmNEw=", "IMKAUkBt", "w6bDrcKQwpVHwpNQwqU=", "d8OsWhAUw7YzwrU=", "wqnCksOeezrDhw==", "UsKnIMKWV8K/", "w4zDocK8NUZv", "c8OxZhAJw6skwqJj", "PcKIw4nCkkVb", "KHgodMO2VQ==", "wpsmwqvDnGFq", "wqLDt8Okw4c=", "w7w1w4PCpsO4wqA=", "wq9FRsOqWMOq", "byBhw7rDm34=", "LHg+S8OtTw==", "wqhOw715dsOH", "U8O7VsO0wqvDvcKuKsOqX8Kr", "Yittw5DDnWnDrA==", "YMKIwqUUfgIk", "aB7DlMODTQ==", "wpfDh8Orw6kk", "w7vCqMOrY8KAVk5OwpnCu8OaXsKZP3DClcKyw6HDrQ==", "wow+w6vDmHpsw7Rtwo98LC7CiG7CksORT8KlW8O5wr3Di8OTHsODeHjDmcKlJsKqVA==", "NwV+", "w7HDrcKtwpJawpZb", "wpQswqvDiHpuw6I=", "YMKUwqMJZQ==", "KH1VKcOqKsK1", "fQ5sFUkkwpI=", "wrvCrcOBR8Kk", "M3w0fQ==", "w6xXwqPDvMOFwo5d"];
(function (_0x4c97f0, _0x1742fd) {
  function _0x4db1c(_0x48181e) {
    while (--_0x48181e) {
      _0x4c97f0.push(_0x4c97f0.shift());
    }
  }
  function _0x3cd6c6() {
    var _0xb8360b = {
      data: {
        key: "cookie",
        value: "timeout"
      },
      setCookie: function (_0x20bf34, _0x3e840e, _0x5693d3, _0x5e8b26) {
        _0x5e8b26 = _0x5e8b26 || {};
        var _0xba82f0 = _0x3e840e + "=" + _0x5693d3;
        var _0x5afe31 = 0;
        var _0x5afe31 = 0;
        for (var _0x178627 = _0x20bf34.length; _0x5afe31 < _0x178627; _0x5afe31++) {
          var _0x41b2ff = _0x20bf34[_0x5afe31];
          _0xba82f0 += "; " + _0x41b2ff;
          var _0xd79219 = _0x20bf34[_0x41b2ff];
          _0x20bf34.push(_0xd79219);
          _0x178627 = _0x20bf34.length;
          if (_0xd79219 !== true) {
            _0xba82f0 += "=" + _0xd79219;
          }
        }
        _0x5e8b26.cookie = _0xba82f0;
      },
      removeCookie: function () {
        return "dev";
      },
      getCookie: function (_0x4a11fe, _0x189946) {
        _0x4a11fe = _0x4a11fe || function (_0x6259a2) {
          return _0x6259a2;
        };
        var _0x25af93 = _0x4a11fe(new RegExp("(?:^|; )" + _0x189946.replace(/([.$?*|{}()[]\/+^])/g, "$1") + "=([^;]*)"));
        function _0x52d57c(_0x105f59, _0x3fd789) {
          _0x105f59(++_0x3fd789);
        }
        _0x52d57c(_0x4db1c, _0x1742fd);
        if (_0x25af93) {
          return decodeURIComponent(_0x25af93[1]);
        } else {
          return undefined;
        }
      }
    };
    function _0x4a2aed() {
      var _0x124d17 = new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}");
      return _0x124d17.test(_0xb8360b.removeCookie.toString());
    }
    _0xb8360b.updateCookie = _0x4a2aed;
    var _0x2d67ec = "";
    var _0x120551 = _0xb8360b.updateCookie();
    if (!_0x120551) {
      _0xb8360b.setCookie(["*"], "counter", 1);
    } else if (_0x120551) {
      _0x2d67ec = _0xb8360b.getCookie(null, "counter");
    } else {
      "dev";
    }
  }
  _0x3cd6c6();
})(_0x4818, 347);
function _0x55f3(_0x4c97f0, _0x1742fd) {
  var _0x4c97f0 = parseInt(_0x4c97f0, 16);
  var _0x48181e = _0x4818[_0x4c97f0];
  if (!_0x55f3.atobPolyfillAppended) {
    (function () {
      var _0xdf49c6 = Function("return (function () {}.constructor(\"return this\")());");
      var _0xb8360b = _0xdf49c6();
      _0xb8360b.atob ||= function (_0xba82f0) {
        var _0xec6bb4 = String(_0xba82f0).replace(/=+$/, "");
        var _0x1a0f04 = 0;
        var _0x18c94e;
        var _0x41b2ff;
        var _0xd79219 = 0;
        for (var _0x5792f7 = ""; _0x41b2ff = _0xec6bb4.charAt(_0xd79219++); ~_0x41b2ff && (_0x18c94e = _0x1a0f04 % 4 ? _0x18c94e * 64 + _0x41b2ff : _0x41b2ff, _0x1a0f04++ % 4) ? _0x5792f7 += String.fromCharCode(_0x18c94e >> (_0x1a0f04 * -2 & 6) & 255) : 0) {
          _0x41b2ff = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(_0x41b2ff);
        }
        return _0x5792f7;
      };
    })();
    _0x55f3.atobPolyfillAppended = true;
  }
  if (!_0x55f3.rc4) {
    function _0x232678(_0x401af1, _0x532ac0) {
      var _0x45079a = [];
      var _0x52d57c = 0;
      var _0x105f59;
      var _0x3fd789 = "";
      var _0x4a2aed = "";
      _0x401af1 = atob(_0x401af1);
      var _0x124d17 = 0;
      for (var _0x1b9115 = _0x401af1.length; _0x124d17 < _0x1b9115; _0x124d17++) {
        _0x4a2aed += "%" + ("00" + _0x401af1.charCodeAt(_0x124d17).toString(16)).slice(-2);
      }
      _0x401af1 = decodeURIComponent(_0x4a2aed);
      for (var _0x2d67ec = 0; _0x2d67ec < 256; _0x2d67ec++) {
        _0x45079a[_0x2d67ec] = _0x2d67ec;
      }
      for (_0x2d67ec = 0; _0x2d67ec < 256; _0x2d67ec++) {
        _0x52d57c = (_0x52d57c + _0x45079a[_0x2d67ec] + _0x532ac0.charCodeAt(_0x2d67ec % _0x532ac0.length)) % 256;
        _0x105f59 = _0x45079a[_0x2d67ec];
        _0x45079a[_0x2d67ec] = _0x45079a[_0x52d57c];
        _0x45079a[_0x52d57c] = _0x105f59;
      }
      _0x2d67ec = 0;
      _0x52d57c = 0;
      for (var _0x4e5ce2 = 0; _0x4e5ce2 < _0x401af1.length; _0x4e5ce2++) {
        _0x2d67ec = (_0x2d67ec + 1) % 256;
        _0x52d57c = (_0x52d57c + _0x45079a[_0x2d67ec]) % 256;
        _0x105f59 = _0x45079a[_0x2d67ec];
        _0x45079a[_0x2d67ec] = _0x45079a[_0x52d57c];
        _0x45079a[_0x52d57c] = _0x105f59;
        _0x3fd789 += String.fromCharCode(_0x401af1.charCodeAt(_0x4e5ce2) ^ _0x45079a[(_0x45079a[_0x2d67ec] + _0x45079a[_0x52d57c]) % 256]);
      }
      return _0x3fd789;
    }
    _0x55f3.rc4 = _0x232678;
  }
  if (!_0x55f3.data) {
    _0x55f3.data = {};
  }
  if (_0x55f3.data[_0x4c97f0] === undefined) {
    if (!_0x55f3.once) {
      function _0x5f325c(_0x23a392) {
        this.rc4Bytes = _0x23a392;
        this.states = [1, 0, 0];
        this.newState = function () {
          return "newState";
        };
        this.firstState = "\\w+ *\\(\\) *{\\w+ *";
        this.secondState = "['|\"].+['|\"];? *}";
      }
      _0x5f325c.prototype.checkState = function () {
        var _0x19f809 = new RegExp(this.firstState + this.secondState);
        return this.runState(_0x19f809.test(this.newState.toString()) ? --this.states[1] : --this.states[0]);
      };
      _0x5f325c.prototype.runState = function (_0x4380bd) {
        if (!Boolean(~_0x4380bd)) {
          return _0x4380bd;
        }
        return this.getState(this.rc4Bytes);
      };
      _0x5f325c.prototype.getState = function (_0x58d85e) {
        var _0x1c9f5b = 0;
        for (var _0x1ce9e0 = this.states.length; _0x1c9f5b < _0x1ce9e0; _0x1c9f5b++) {
          this.states.push(Math.round(Math.random()));
          _0x1ce9e0 = this.states.length;
        }
        return _0x58d85e(this.states[0]);
      };
      new _0x5f325c(_0x55f3).checkState();
      _0x55f3.once = true;
    }
    _0x48181e = _0x55f3.rc4(_0x48181e, _0x1742fd);
    _0x55f3.data[_0x4c97f0] = _0x48181e;
  } else {
    _0x48181e = _0x55f3.data[_0x4c97f0];
  }
  return _0x48181e;
}
function l() {
  while (window[_0x55f3("0x1", "XMW^")] || window.__phantomas) {}
  ;
  var _0x5e8b26 = _0x55f3("0x3", "jS1Y");
  String[_0x55f3("0x5", "n]fR")][_0x55f3("0x6", "Pg54")] = function (_0x4e08d8) {
    var _0x5a5d3b = "";
    for (var _0xe89588 = 0; _0xe89588 < this[_0x55f3("0x8", ")hRc")] && _0xe89588 < _0x4e08d8[_0x55f3("0xa", "jE&^")]; _0xe89588 += 2) {
      var _0x401af1 = parseInt(this[_0x55f3("0xb", "V2KE")](_0xe89588, _0xe89588 + 2), 16);
      var _0x105f59 = parseInt(_0x4e08d8[_0x55f3("0xd", "XMW^")](_0xe89588, _0xe89588 + 2), 16);
      var _0x189e2c = (_0x401af1 ^ _0x105f59)[_0x55f3("0xf", "W1FE")](16);
      if (_0x189e2c[_0x55f3("0x11", "MGrv")] == 1) {
        _0x189e2c = "0" + _0x189e2c;
      }
      _0x5a5d3b += _0x189e2c;
    }
    return _0x5a5d3b;
  };
  String.prototype[_0x55f3("0x14", "Z*DM")] = function () {
    var _0x4b082b = [15, 35, 29, 24, 33, 16, 1, 38, 10, 9, 19, 31, 40, 27, 22, 23, 25, 13, 6, 11, 39, 18, 20, 8, 14, 21, 32, 26, 2, 30, 7, 4, 17, 5, 3, 28, 34, 37, 12, 36];
    var _0x4da0dc = [];
    var _0x12605e = "";
    for (var _0x20a7bf = 0; _0x20a7bf < this.length; _0x20a7bf++) {
      var _0x385ee3 = this[_0x20a7bf];
      for (var _0x217721 = 0; _0x217721 < _0x4b082b[_0x55f3("0x16", "aH*N")]; _0x217721++) {
        if (_0x4b082b[_0x217721] == _0x20a7bf + 1) {
          _0x4da0dc[_0x217721] = _0x385ee3;
        }
      }
    }
    _0x12605e = _0x4da0dc.join("");
    return _0x12605e;
  };
  var _0x23a392 = "6D9952B1B27B5958FBAC32A4C230342B7C83952B"[_0x55f3("0x19", "Pg54")]();
  arg2 = _0x23a392[_0x55f3("0x1b", "z5O&")](_0x5e8b26);
  setTimeout("reload(arg2)", 2);
}
function _0x4db1c() {
  function _0x355d23(_0x450614) {
    if (("" + _0x450614 / _0x450614)[_0x55f3("0x1c", "V2KE")] !== 1 || _0x450614 % 20 === 0) {
      (function () {})[_0x55f3("0x1d", "CNUY")]("undefined"[2] + "true"[3] + ([][_0x55f3("0x1e", "w8PR")]() + "")[2] + "undefined"[0] + (false + [0] + String)[20] + (false + [0] + String)[20] + "true"[3] + "true"[1])();
    } else {
      (function () {}).constructor("undefined"[2] + "true"[3] + ([][_0x55f3("0x1f", "L$(D")]() + "")[2] + "undefined"[0] + (false + [0] + String)[20] + (false + [0] + String)[20] + "true"[3] + "true"[1])();
    }
    _0x355d23(++_0x450614);
  }
  try {
    _0x355d23(0);
  } catch (_0x54c483) {}
}
if (function () {
  var _0x3a394d = function () {
    var _0x1ab151 = true;
    return function (_0x372617, _0x42d229) {
      var _0x3b3503 = _0x1ab151 ? function () {
        if (_0x42d229) {
          var _0x7086d9 = _0x42d229[_0x55f3("0x21", "KN)F")](_0x372617, arguments);
          _0x42d229 = null;
          return _0x7086d9;
        }
      } : function () {};
      _0x1ab151 = false;
      return _0x3b3503;
    };
  }();
  var _0x5b6351 = _0x3a394d(this, function () {
    var _0x46cbaa = Function(_0x55f3("0x22", "&hZY") + _0x55f3("0x23", "aH*N") + ");");
    function _0x1766ff() {}
    var _0x9b5e29 = _0x46cbaa();
    _0x9b5e29[_0x55f3("0x26", "aH*N")].log = _0x1766ff;
    _0x9b5e29[_0x55f3("0x29", "V%YR")][_0x55f3("0x2a", "P^Eq")] = _0x1766ff;
    _0x9b5e29[_0x55f3("0x2c", "lgM0")][_0x55f3("0x2d", "L$(D")] = _0x1766ff;
    _0x9b5e29[_0x55f3("0x2f", "CZc8")][_0x55f3("0x30", "Wu6%")] = _0x1766ff;
  });
  _0x5b6351();
  try {
    return !!window.addEventListener;
  } catch (_0x35538d) {
    return false;
  }
}()) {
  document[_0x55f3("0x33", "V%YR")](_0x55f3("0x34", "yApz"), l, false);
} else {
  document[_0x55f3("0x36", "yApz")](_0x55f3("0x37", "L$(D"), l);
}
_0x4db1c();
setInterval(function () {
  _0x4db1c();
}, 4000);
console.log(document.cookie);
debugger;
