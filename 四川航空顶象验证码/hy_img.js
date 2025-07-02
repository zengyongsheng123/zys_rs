/*****
 File:hy_img.js
 Author:南宫啸天
 Date:2025/5/30 17:25
 *****/

var n = "incl";
function e(r, t) {
    if (r[n + "udes"])
        return r.includes(t);
    for (var e = 0, i = r.length; e < i; e++)
        if (r[e] === t)
            return !0;
    return !1
}
function hy(r) {
    for (var t = [], n = 0; n < r.length; n++) {
        var i = r.charCodeAt(n);
        if (32 === n)
            break;
        for (; e(t, i % 32);)
            i++;
        t.push(i % 32)
    }
    return t
}

console.log(hy("dingxianga52023644a9b62497660bee6605ac33e"));