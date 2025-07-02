
function string10to64(a) {
        var b = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~'['split']('')
          , c = b['length']
          , d = +a
          , e = [];
        do {
            mod = d % c;
            d = (d - mod) / c;
            e['unshift'](b[mod]);
        } while (d);
        return e['join']('');
    }

function prefixInteger(a, b) {
        return (Array(b)['join'](0x0) + a)['slice'](-b);
    }
function pretreatment(a, b, c) {
        var d = this;
        var e = string10to64(Math['abs'](a));
        var f = '';
        if (!c) {
            f += a > 0x0 ? '1' : '0';
        }
        f += prefixInteger(e, b);
        return f;
    }

function getCoordinate(a) {
    var b = this;
    var c = new Array();
    for (var d = 0x0; d < a['length']; d++) {
        if (d == 0x0) {
            c['push'](pretreatment(a[d][0x0] < 0x3ffff ? a[d][0x0] : 0x3ffff, 0x3, !![]));
            c['push'](pretreatment(a[d][0x1] < 0xffffff ? a[d][0x1] : 0xffffff, 0x4, !![]));
            c['push'](pretreatment(a[d][0x2] < 0x3ffffffffff ? a[d][0x2] : 0x3ffffffffff, 0x7, !![]));
        } else {
            var e = a[d][0x0] - a[d - 0x1][0x0];
            var f = a[d][0x1] - a[d - 0x1][0x1];
            var g = a[d][0x2] - a[d - 0x1][0x2];
            c['push'](pretreatment(e < 0xfff ? e : 0xfff, 0x2, ![]));
            c['push'](pretreatment(f < 0xfff ? f : 0xfff, 0x2, ![]));
            c['push'](pretreatment(g < 0xffffff ? g : 0xffffff, 0x4, !![]));
        }
    }
    return c['join']('');
}

function getJdEid(m, r, u) {
    _JdTdudfp.eid = _JdEid;
    _JdTdudfp.fp = _JdJrTdRiskFpInfo;
    _JdTdudfp.date = Date.parse(new Date),
    _JdTdudfp.token = jd_risk_token_id,
    _JdTdudfp.jstub = ""
    m(_JdEid, _JdJrTdRiskFpInfo, _JdTdudfp)
}
function getEid() {
        var a = '';
        a = getJdEid()['eid'];
        if (a == '') {
            if (typeof eval('getJdEid;') == 'function') {
                getJdEid(function(c, d, f) {
                    a = c;
                });
            }
        }
        return a;
    }
function getJsTk() {
        var a = '';
            if (typeof eval('getJsToken;') == 'function') {
                getJsToken(function(b) {
                    a = b['jsToken'];
                }, 0xbb8);
            }
        return a;
    }

console.log(getEid());
console.log(getJsTk());
// b = [
//     [
//         "1027",
//         "250",
//         1747481354801
//     ],
//     [
//         "1044",
//         "275",
//         1747481354801
//     ],
//     [
//         "1048",
//         "275",
//         1747481354810
//     ],
//     [
//         "1050",
//         "275",
//         1747481354817
//     ],
//     [
//         "1053",
//         "275",
//         1747481354826
//     ],
//     [
//         "1056",
//         "275",
//         1747481354833
//     ],
//     [
//         "1059",
//         "275",
//         1747481354841
//     ],
//     [
//         "1063",
//         "275",
//         1747481354848
//     ],
//     [
//         "1066",
//         "275",
//         1747481354857
//     ],
//     [
//         "1070",
//         "275",
//         1747481354865
//     ],
//     [
//         "1073",
//         "275",
//         1747481354873
//     ],
//     [
//         "1076",
//         "275",
//         1747481354881
//     ],
//     [
//         "1079",
//         "275",
//         1747481354890
//     ],
//     [
//         "1082",
//         "275",
//         1747481354897
//     ],
//     [
//         "1085",
//         "275",
//         1747481354905
//     ],
//     [
//         "1088",
//         "275",
//         1747481354913
//     ],
//     [
//         "1092",
//         "276",
//         1747481354920
//     ],
//     [
//         "1096",
//         "276",
//         1747481354928
//     ],
//     [
//         "1100",
//         "276",
//         1747481354937
//     ],
//     [
//         "1104",
//         "277",
//         1747481354944
//     ],
//     [
//         "1107",
//         "277",
//         1747481354953
//     ],
//     [
//         "1110",
//         "277",
//         1747481354961
//     ],
//     [
//         "1113",
//         "277",
//         1747481354968
//     ],
//     [
//         "1115",
//         "277",
//         1747481354976
//     ],
//     [
//         "1116",
//         "277",
//         1747481354984
//     ],
//     [
//         "1117",
//         "277",
//         1747481354992
//     ],
//     [
//         "1118",
//         "277",
//         1747481355002
//     ],
//     [
//         "1118",
//         "277",
//         1747481355218
//     ]
// ]
// console.log(getCoordinate(b));
