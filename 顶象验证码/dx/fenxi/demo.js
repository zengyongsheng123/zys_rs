var i = "includ"
  , e = "h"
  , r = "charC"
  , o = "odeAt";
function a(n, t) {
    if (n.includes)
        return n["includes"](t);
    for (var e = 0, r = n[function(n) {
        if (!n)
            return "";
        for (var t = "", i = "V587", e = 50133, r = 0; r < n.length; r++) {
            var o = n.charCodeAt(r);
            o ^= i.charCodeAt(e = (e + 1) % i.length),
            t += String.fromCharCode(o)
        }
        return t
    }("TR8RL_")]; e < r; e++)
        if (n[e] === t)
            return !0;
    return !1
}
function An(n) {
            for (var t = [1, 0, 3, 2], i = 0; ; ) {
                switch (t[i++]) {
                case 0:
                    var c = [];
                    continue;
                case 1:
                    var s = "lengt";
                    continue;
                case 2:
                    return c;
                case 3:
                    for (var d = 0; d < n[[s, e].join("")]; d++) {
                        var u = n[[r, o].join("")](d);
                        if (32 === d)
                            break;
                        for (; a(c, u % 32); )
                            u++;
                        c.push(u % 32)
                    }
                    continue
                }
                break
            }
        }
function sn(i) {
    return An(i.split("/")[7].split(".")[0])
}

i = "https://static4.dingxiang-inc.com/picture/dx/PG9u1XrXvs/zib3/3ac4bf40f6d344ad93314b413bbabf7f.webp"
var r = sn(i)
console.log(r);



