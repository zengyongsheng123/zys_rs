function p(t) {
                t = encodeURIComponent(t)["replace"](/%([0-9A-F]{2})/g, function(n, t) {
                    return o("0x" + t)
                });
                return btoa(t)
            }
function o(n) {
                t = "",
                ['66', '72', '6f', '6d', '43', '68', '61', '72', '43', '6f', '64', '65']["forEach"](function(n) {
                    t += unescape("%u00" + n)
                });
                var t, e = t;
                return String[e](n)
            }
function h(n, t) {
                t = t || u();
                for (var e = (n = n["split"](""))["length"], r = t["length"], a = "charCodeAt", i = 0; i < e; i++)
                    n[i] = o(n[i][a](0) ^ t[(i + 10) % r][a](0));
                return n["join"]("")
            }
// var a = [
//     3,
//     "2024-12-03",
//     "2024-12-03",
//     "2024-12-03",
//     "cn",
//     "36",
//     4,
//     3
// ]
function get_data(a){
    a = a["sort"]()["join"]("")
    a = (0,p)(a)
    var r = +new Date - (31 || 0) - 1661224081041
    a = (a += "@#" + "/rank/offline"["replace"]("https://api.qimai.cn", "")) + ("@#" + r) + ("@#" + 3)
    e = (0,p)((0,h)(a, "xyz517cda96efgh"))
    return e
}
// e = "eCRbWihbVghUX1xMCwdfWgwIAihbTksMBwBVVVgAAlcmRFs="
// t[qt] += '&' + "analysis" + "=" + encodeURIComponent("eCRbWihbVghUX1xMCwdfWgwIAihbTksMBwBVVVgAAlcmRFs=")