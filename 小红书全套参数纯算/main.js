//x-b3-traceid算法
function generateTraceId() {
    for (var e = "", r = 0; r < 16; r++)
        e += "abcdef0123456789".charAt(Math.floor(16 * Math.random()));
    return e
}
console.log(generateTraceId());

// x-s-common算法
function generate_XsCommmon(a1,X_t,X_s,b1) {
    {
        for (var P = [], A = "ZmserbBoHQtNP+wOcza/LpngG8yJq42KWYj0DSfdikx3VT16IlUAFM97hECvuRX5", I = 0, R = A.length; I < R; ++I)
            P[I] = A[I];
    }
    var O = function (e) {
        for (var r, i, a = 256, s = []; a--; s[a] = r >>> 0)
            for (i = 8,
                     r = a; i--;)
                r = 1 & r ? r >>> 1 ^ 0xedb88320 : r >>> 1;
        return function (e) {
            if ("string" == typeof e) {
                for (var r = 0, i = -1; r < e.length; ++r)
                    i = s[255 & i ^ e.charCodeAt(r)] ^ i >>> 8;
                return -1 ^ i ^ 0xedb88320
            }
            for (var r = 0, i = -1; r < e.length; ++r)
                i = s[255 & i ^ e[r]] ^ i >>> 8;
            return -1 ^ i ^ 0xedb88320
        }
    }()

    function getSigCount(e) {
        var r = Number(12) || 0;
        return r;
    }
    function tripletToBase64(e) {
        return P[e >> 18 & 63] + P[e >> 12 & 63] + P[e >> 6 & 63] + P[63 & e]
    }

    function encodeChunk(e, r, i) {
        for (var a, s = [], u = r; u < i; u += 3)
            a = (e[u] << 16 & 0xff0000) + (e[u + 1] << 8 & 65280) + (255 & e[u + 2]),
                s.push(tripletToBase64(a));
        return s.join("")
    }

    function b64Encode(e) {
        for (var r, i = e.length, a = i % 3, s = [], u = 0, c = i - a; u < c; u += 16383)
            s.push(encodeChunk(e, u, u + 16383 > c ? c : u + 16383));
        return 1 === a ? (r = e[i - 1],
            s.push(P[r >> 2] + P[r << 4 & 63] + "==")) : 2 === a && (r = (e[i - 2] << 8) + e[i - 1],
            s.push(P[r >> 10] + P[r >> 4 & 63] + P[r << 2 & 63] + "=")),
            s.join("")
    }

    function encodeUtf8(e) {
        for (var r = encodeURIComponent(e), i = [], a = 0; a < r.length; a++) {
            var s = r.charAt(a);
            if ("%" === s) {
                var u = parseInt(r.charAt(a + 1) + r.charAt(a + 2), 16);
                i.push(u),
                    a += 2
            } else
                i.push(s.charCodeAt(0))
        }
        return i
    }
    m = {
        "s0": 5,
        "s1": "",
        "x0": "1",
        "x1": "4.1.0",
        "x2": "Windows",
        "x3": "xhs-pc-web",
        "x4": "4.62.3",
        "x5": a1,
        "x6": X_t,
        "x7": X_s,
        "x8": b1,
        "x9": O("".concat(X_t).concat(X_s).concat(b1)),
        "x10": getSigCount(X_s)
    }
    return b64Encode(encodeUtf8(JSON.stringify(m)));
}

//console.log(generate_XsCommmon("1960b4b8035inpqotvqy6240bb0ex80p8y92xavdp50000176977", 1746527122462, "XYW_eyJzaWduU3ZuIjoiNTYiLCJzaWduVHlwZSI6IngyIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjA2NTkyNDhhMTdmMTk1OGY5YmM0MGI5MTcxZDgxZGQ4YzIxNjBhNTI4YzU5NDhjNTJlOGI2Y2ZjZDFiNmJhZmRhNjJiMjBjY2I4YzM1NjJkZTNlNzg3NmI1ZTI0YTcyZWIyY2U2MTg5ZGE2ZTY4MzRlZmRmMzIxY2M0MzEwZWE2NWI2NzAwMTEzMzIwMDZhMDc0ZTI4NWY2YTg0ZWE2NmIyYzBhZmE0MDJjNzZmZDUzZDYxOWRkYjJlMTA0ZmFmNWExZmUyNjkxZGQxODljYTI2NmM2YmQ2ODk0ZTkzNWY0ZmIxY2RiZjJiMWUzZmRiMTE4ZGUwNDI2ZTJhYzRjMzY0MDM4NzI2Nzk0ZmYyYmE3Mzc0MTJmYTIxZmI5OWZmYjQ0ZTExMWYzMGNjYjljOTdhMWExODlmYzViZTdmMmQ0ZjQ0ZWZkYjYwY2MzNjMzNzk2ZDFjMmEwOTNkMTY3ZjY5MjdlOWIwZDUyNDAyODMxZTFlYmY0ZTExYzVhZGYyOTg4ZmUwNGIwZDY0NGFkZTBhMWJkZDgyNDEyNWJkNjcyIn0=", "I38rHdgsjopgIvesdVwgIC+oIELmBZ5e3VwXLgFTIxS3bqwErFeexd0ekncAzMFYnqthIhJeSnMDKutRI3KsYorWHPtGrbV0P9WfIi/eWc6eYqtyQApPI37ekmR6QL+5Ii6sdneeSfqYHqwl2qt5B0DBIx+PGDi/sVtkIxdsxuwr4qtiIhuaIE3e3LV0I3VTIC7e0utl2ADmsLveDSKsSPw5IEvsiVtJOqw8BuwfPpdeTFWOIx4TIiu6ZPwrPut5IvlaLbgs3qtxIxes1VwHIkumIkIyejgsY/WTge7eSqte/D7sDcpipedeYrDtIC6eDVw2IENsSqtlnlSuNjVtIx5e1qt3bmAeVn8LIESaIEY+wn4iI3Yq8lEgIkLxoqwkICZV2d3ejIgs1uwRIvge00ve0euPIi6e1MmDyuwuIiKeTf0sxm/e1Vt4LsJeYqwEIvE8aA7eSuwup9osfPwgIxQrIvkkoVwGzVw+ag4QPW/edngeTVwoIEosjBAsxLrvIE0s0L3s6fGdIhNs3uwvIEmWtuwpOqwCI3JeTVtFIk3siqwVIEosdqtItPwgmPwMIvhhIxhKGdHW2ZNe3VtlIhHcIidedqwnrl4K/U6sYazkIiLO2qtwsqwCIvdekqtitF/eTm3sTDMOIhAs3gdskVtnpVwBIC0ejqwRIiOeV/IOIv7eSnveDut5Ix7sVqwu2fWBIEcnICgsVM6s6eesSI3eDVtQIvzzIxcEaqwpI3+CIk3s6FD3GUOsjutaIEM2mPt14lNedM0eYPwpmPwZIC+IIicy/VwttVtaIC5e0pesVPwFautgIESpbVt9IiVtZeDBIidsfUge0e7eTVwstut4IkhmIx5sTutXIi0sjIh7IxiBzSHHIxHGIxdskutULqw/wVtMI3I9Ih3s6WNe1VwEpFIVICEsQVwsLqwBI3GDI3+cIkEEIhJe3SOe3Wc3yutmI3SSoutwautUIi6s6eWlIhhY/oJeSVtvbVtVomqmo7ZlIhcIrVt4Ihgeiz+qIim2mVwYIkTaQuwi/PwLIiYFIxDTI3uczPtWIEmQIigsTutWBYmIIhigICgsTn7s3VwFICYWIhETeLl5I3RFpZudICAsfSAe0Vw8IigeTVw+IkmOI3JeYqtPIxhyzqtWI3OeTW4spVt6Out8IvAe0PtRIhNsWFE5IEKsWzdexVwa4dosYVwabF0siPtrIxAsxWOskqwgIibCIEZpcutBySczIv/sjqt/BB0eTclfouteI3bWIi7sDzkaI3JejuwGIxzbIh/edpkUIhFLIiIoqYu/I3esdFR5IkZCIvm5I3JedgiJHPwwnutJmIoeSMosTqtjIv/ejD/eVuwtgVw2IvHbnqtIcVwmQVt6Jqwltqw12foe1zNei93s3zdeVuwgIirGIhiDIxFvIv0sVaesxBWmQPtyIEEpeqtOJdds3qt8I35eYL3edUSPIv/sSVtOGci1I3JsfPtYIv3sVqwvtVtGI3JedeHwqPwNmeds0FGwIi3eWPwqgPwip00e6ut9eVtrputnI3SyIhWDgr3sfY0s1utkIx0e1qw/bVwzGdesiWzFsf4WNbD1Zqw1LPwGIvZVICkqIvqiNbveTnLqIvRqICMgpVtKICiSGVwtIkoeVZV0but1Ihi/cPtNI37s6pW3IEPAIxgsYqtLbPwnBIvsVs7eSPwO8PwLIvWdyqwgIh5ei07sdf7sVqtAIiYcIkKsVnq6IvesDVtHI3zRI3KeSPwBmrWgsqwCeqwq"));

//a1生成逻辑
function a1() {
    function crfc32(t) {
        for (var e, r = [], n = 0; n < 256; n++) {
            e = n;
            for (var o = 0; o < 8; o++) {
                e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
            }
            r[n] = e;
        }
        for (var i = -1, a = 0; a < t.length; a++) {
            i = i >>> 8 ^ r[255 & (i ^ t.charCodeAt(a))];
        }
        return ~i >>> 0;
    }

    var CHARSET = "abcdefghijklmnopqrstuvwxyz1234567890";

    function genRandomString(t) {
        var v = "";
        for (var i = 0; i < t; i++) {
            v = v.concat(CHARSET[Math.floor(36 * Math.random())]);
        }
        return v;
    }

    var wxw = "".concat((+new Date()).toString(16))
        .concat(genRandomString(30))
        .concat("50008");
    return wxw.concat(crfc32(wxw));
}

console.log(a1());
