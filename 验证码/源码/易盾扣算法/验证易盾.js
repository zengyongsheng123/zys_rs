var Cp = require('./易盾').Cp

window = global

function CR1(x) {
    // var PF = M;
    x = '' + x;
    for (var F = [], w = window, D = 0x0, B = 0x0, I = x['length'] / 0x2; D < I; D++) {
        var Z = w['parseInt'](x['charAt'](B++), 0x10) << 0x4
            , H = w['parseInt'](x['charAt'](B++), 0x10);
        F[D] = z(Z + H);
    }
    return F;
}

function z(x) {
    return x < -0x80 ? z(0x100 + x) : x > 0x7f ? z(x - 0x100) : x;
}

function CE(x) {
    // var Pb = M;
    x = window['encodeURIComponent'](x);
    for (var F = [], b = 0x0, w = x['length']; b < w; b++)
        '%' === x['charAt'](b) ? b + 0x2 < w &&
            F['push'](CR1('' + x['charAt'](++b) + x['charAt'](++b))[0x0])
            : F['push'](z(x['charCodeAt'](b)));
    return F;
}

function P(T, m, O) {
    // var Q1 = M
    N = void 0x0
        , J = void 0x0
        , q = void 0x0
        , S = [];
    switch (T['length']) {
        case 0x1:
            N = T[0x0],
                J = q = 0x0,
                S['push'](m[N >>> 0x2 & 0x3f], m[(N << 0x4 & 0x30) + (J >>> 0x4 & 0xf)], O, O);
            break;
        case 0x2:
            N = T[0x0],
                J = T[0x1],
                q = 0x0,
                S['push'](m[N >>> 0x2 & 0x3f], m[(N << 0x4 & 0x30) + (J >>> 0x4 & 0xf)], m[(J << 0x2 & 0x3c) + (q >>> 0x6 & 0x3)], O);
            break;
        case 0x3:
            N = T[0x0],
                J = T[0x1],
                q = T[0x2],
                S['push'](m[N >>> 0x2 & 0x3f], m[(N << 0x4 & 0x30) + (J >>> 0x4 & 0xf)], m[(J << 0x2 & 0x3c) + (q >>> 0x6 & 0x3)], m[0x3f & q]);
            break;
        default:
            return '';
    }
    return S['join']('');
}

function z1(T, m, O) {
    // var Q2 = M;
    if (!T || 0x0 === T['length'])
        return '';

    for (var N = 0x0, J = []; N < T['length'];) {
        if (!(N + 0x3 <= T['length'])) {
            var q = T['slice'](N);
            J['push'](P(q, m, O));
            break;
        }
        var S = T['slice'](N, N + 0x3);
        J['push'](P(S, m, O)),
            N += 0x3;
    }
    return J['join']('');

}

function Cu(T) {
    var m = ['i', '/', 'x', '1', 'X', 'g', 'U', '0', 'z', '7', 'k', '8', 'N', '+', 'l', 'C', 'p', 'O', 'n', 'P', 'r', 'v', '6', '\x5c', 'q', 'u', '2', 'G', 'j', '9', 'H', 'R', 'c', 'w', 'T', 'Y', 'Z', '4', 'b', 'f', 'S', 'J', 'B', 'h', 'a', 'W', 's', 't', 'A', 'e', 'o', 'M', 'I', 'E', 'Q', '5', 'm', 'D', 'd', 'V', 'F', 'L', 'K', 'y']
        , O = '3';
    return z1(T, m, O);
};

function j(x, F) {
    return z(z(x) ^ z(F));
}

function Cl() {
    // var Px = M;
    for (var x = arguments['length'] > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : [], F = arguments['length'] > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : [], b = [], w = F['length'], D = 0x0, B = x['length']; D < B; D++)
        b[D] = j(x[D], F[D % w]);
    return b;
}

function C8(CO, CN) {
    var Ct = CE(CN)
        , CJ = CE(CO);
    return Cu(Cl(Ct, CJ));
}

sample = function (G, j) {
    // var a2 = MY
    L = G['length'];
    if (L <= j)
        return G;
    for (var E = [], Q = 0x0, k = 0x0; k < L; k++)
        k >= Q * (L - 0x1) / (j - 0x1) && (E['push'](G[k]),
            Q += 0x1);
    return E;
};







function unique2DArray(j) {
    // var a9 = MY
    L = arguments['length'] > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : 0x0;
    if (!Array['isArray'](j))
        return j;
    for (var E = {}, Q = [], k = 0x0, l = j['length']; k < l; k++) {
        var h = j[k][L];
        null === h || void 0x0 === h || E[h] || (E[h] = !0x0,
            Q['push'](j[k]));
    }
    return Q;
}

function E() {
    // var Eo = M
    X = arguments['length'] > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : []
        , T = []
        , m = []
        , O = [];
    if (!Array['isArray'](X) || X['length'] <= 0x2)
        return [T, m, O];
    for (var N = 0x0; N < X['length']; N++) {
        var J = X[N];
        T['push'](J[0x0]),
            m['push'](J[0x1]),
            O['push'](J[0x2]);
    }
    return [T, m, O];
}
function K123(T, m) {
                // var Ed = M;
                if (Array["isArray"](T))
                    return T;
                if (Symbol[Ed(0x6cf)]in Object(T))
                    return X(T, m);
                throw new TypeError(Ed(0x7c4));
            };

function L123(X, T) {
            // var EB = M;
            for (var m = [], O = [], N = 0x0; N < X["length"] - 0x1; N++)
                m['push'](X[N + 0x1] - X[N]),
                O['push'](T[N + 0x1] - T[N]);
            for (var J = [], q = 0x0; q < O["length"]; q++)
                J['push'](O[q] / m[q]);
            return J;
        }
function Q123(X, T, m) {
            // var EI = M;
            for (var O = L123(m, X), N = L123(m, T), J = [], q = 0x0; q < X['length']; q++) {
                var S = Math['sqrt'](Math['pow'](X[q], 0x2) + Math['pow'](T[q], 0x2));
                J['push'](S);
            }
            var V = L123(m, J);
            return [O, N, V];
        };
function P123(X) {
            // var Ef = M;
            for (var T = [], m = X['length'], O = 0x0; O < m; O++)
                T['indexOf'](X[O]) === -0x1 && T['push'](X[O]);
            return T;
        };
function G123(X) {
            // var Ew = M;
            return parseFloat(X["toFixed"](0x4));
        };

function z123(X) {
            for (var T = 0x0, m = X['length'], O = 0x0; O < m; O++)
                T += X[O];
            return T / m;
        }
function A123(X) {
            // var EY = M;
            for (var T = z(X), m = X['length'], O = [], N = 0x0; N < m; N++) {
                var J = X[N] - T;
                O['push'](Math['pow'](J, 0x2));
            }
            for (var q = 0x0, S = 0x0; S < O['length']; S++)
                O[S] && (q += O[S]);
            return Math['sqrt'](q / m);
        }
function h123() {
    // var EZ = M
    C0 = arguments['length'] > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : [];
    if (!Array['isArray'](C0) || C0['length'] <= 0x2)
        return [];
    var C1 = E(C0)
        , C2 = K123(C1, 0x3)
        , C3 = C2[0x0]
        , C4 = C2[0x1]
        , C5 = C2[0x2]
        , C6 = Q123(C3, C4, C5)
        , C7 = K123(C6, 0x3)
        , C8 = C7[0x0]
        , C9 = C7[0x1]
        , CC = C7[0x2]
        , CM = K123(C8, C9, CC, C5)
        , Ca = K123(CM, 0x3)
        , CW = Ca[0x0]
        , CU = Ca[0x1]
        , CR = Ca[0x2]
        , CP = P123(C3)['length']
        , Cz = P123(C4)['length']
        , CA = G123(z123(C4))
        , CG = G123(A123(C4))
        , Cj = C3['length']
        , CL = G123(Math['min']['apply'](Math, R(C8)))
        , CE = G123(Math[EZ(0x2c9)][EZ(0x426)](Math, R(C8)))
        , CQ = G123(z123(C8))
        , Ck = G123(A123(C8))
        , Cl = P(C8)['length']
        , Ch = G(j(C8, 0x19))
        , CK = G(j(C8, 0x4b))
        , Cu = G(Math['min'][EZ(0x426)](Math, R(C9)))
        , CX = G(Math[EZ(0x2c9)][EZ(0x426)](Math, R(C9)))
        , CT = G(z(C9))
        , Cs = G(A(C9))
        , Cm = P(C9)['length']
        , Cp = G(j(C9, 0x19))
        , CO = G(j(C9, 0x4b))
        , CN = G(Math['min']['apply'](Math, R(CC)))
        , Ct = G(Math[EZ(0x2c9)][EZ(0x426)](Math, R(CC)))
        , CJ = G(z(CC))
        , Cq = G(A(CC))
        , CS = P(CC)['length']
        , CV = G(j(CC, 0x19))
        , Cy = G(j(CC, 0x4b))
        , Cn = G(Math['min'][EZ(0x426)](Math, R(CW)))
        , Ce = G(Math[EZ(0x2c9)][EZ(0x426)](Math, R(CW)))
        , Ci = G(z(CW))
        , Cx = G(A(CW))
        , CF = P(CW)['length']
        , Cb = G(j(CW, 0x19))
        , Cc = G(j(CW, 0x4b))
        , Cv = G(Math['min'][EZ(0x426)](Math, R(CU)))
        , Cf = G(Math[EZ(0x2c9)]['apply'](Math, R(CU)))
        , CY = G(z(CU))
        , Cw = G(A(CU))
        , CD = P(CU)['length']
        , CB = G(j(CU, 0x19))
        , Co = G(j(CU, 0x4b))
        , CI = G(Math['min']['apply'](Math, R(CR)))
        , Cr = G(Math[EZ(0x2c9)][EZ(0x426)](Math, R(CR)))
        , CZ = G(z(CR))
        , CH = G(A(CR))
        , Cd = P(CR)['length']
        , Cg = G(j(CR, 0x19))
        , M0 = G(j(CR, 0x4b));
    return [CP, Cz, CA, CG, Cj, CL, CE, CQ, Ck, Cl, Ch, CK, Cu, CX, CT, Cs, Cm, Cp, CO, CN, Ct, CJ, Cq, CS, CV, Cy, Cn, Ce, Ci, Cx, CF, Cb, Cc, Cv, Cf, CY, Cw, CD, CB, Co, CI, Cr, CZ, CH, Cd, Cg, M0];
}



function get_data(token, xy_gj, zb) {

    gj = []
    for (var i of xy_gj) {
        C6123 = C8(token, i + '');
        gj.push(C6123);
    }
    var H1 = sample(gj, 50)
    // console.log(H)
    // console.log(Cp("rivkrciU"))
    C123 = Cp(C8(token, parseInt(zb, 0xa) / 320 * 100 + ""))
    console.log(C123)
    // C2 = h123(unique2DArray(xy_gj, 0x2));
    // console.log(C123)
    res = JSON.stringify({
        'd': Cp(H1['join'](':')),
        'm': '',
        'p': C123,
        // 'f': '',
        'ext': Cp(C8(token, 1 + ',' + gj['length']))
    })
    return res
}

console.log(get_data("f5f28bc5e163419791c1d3447495ead6", [
    [
        4,
        0,
        142
    ],
    [
        5,
        0,
        144
    ],
    [
        6,
        0,
        146
    ],
    [
        6,
        0,
        148
    ],
    [
        7,
        0,
        150
    ],
    [
        8,
        0,
        152
    ],
    [
        9,
        0,
        154
    ],
    [
        10,
        0,
        155
    ],
    [
        10,
        0,
        157
    ],
    [
        11,
        0,
        159
    ],
    [
        12,
        0,
        161
    ],
    [
        13,
        0,
        162
    ],
    [
        14,
        0,
        163
    ],
    [
        15,
        0,
        166
    ],
    [
        16,
        0,
        169
    ],
    [
        17,
        0,
        170
    ],
    [
        18,
        0,
        171
    ],
    [
        18,
        0,
        174
    ],
    [
        19,
        0,
        175
    ],
    [
        20,
        0,
        176
    ],
    [
        21,
        0,
        179
    ],
    [
        22,
        0,
        181
    ],
    [
        22,
        0,
        183
    ],
    [
        23,
        0,
        185
    ],
    [
        24,
        0,
        187
    ],
    [
        25,
        0,
        190
    ],
    [
        26,
        0,
        191
    ],
    [
        26,
        0,
        197
    ],
    [
        27,
        0,
        198
    ],
    [
        28,
        0,
        200
    ],
    [
        29,
        0,
        204
    ],
    [
        30,
        0,
        206
    ],
    [
        30,
        0,
        209
    ],
    [
        31,
        0,
        212
    ],
    [
        32,
        0,
        216
    ],
    [
        33,
        0,
        217
    ],
    [
        34,
        0,
        220
    ],
    [
        34,
        0,
        224
    ],
    [
        35,
        0,
        225
    ],
    [
        36,
        0,
        229
    ],
    [
        37,
        0,
        230
    ],
    [
        38,
        0,
        232
    ],
    [
        38,
        0,
        235
    ],
    [
        39,
        0,
        237
    ],
    [
        40,
        0,
        238
    ],
    [
        41,
        0,
        240
    ],
    [
        42,
        0,
        242
    ],
    [
        42,
        0,
        244
    ],
    [
        43,
        0,
        245
    ],
    [
        44,
        0,
        246
    ],
    [
        45,
        0,
        248
    ],
    [
        46,
        0,
        249
    ],
    [
        46,
        0,
        252
    ],
    [
        47,
        0,
        253
    ],
    [
        48,
        0,
        256
    ],
    [
        49,
        0,
        256
    ],
    [
        50,
        0,
        257
    ],
    [
        50,
        0,
        260
    ],
    [
        51,
        0,
        261
    ],
    [
        52,
        0,
        263
    ],
    [
        53,
        0,
        264
    ],
    [
        54,
        0,
        265
    ],
    [
        54,
        0,
        267
    ],
    [
        55,
        0,
        268
    ],
    [
        56,
        0,
        270
    ],
    [
        57,
        0,
        272
    ],
    [
        58,
        0,
        273
    ],
    [
        58,
        0,
        276
    ],
    [
        59,
        0,
        277
    ],
    [
        60,
        0,
        278
    ],
    [
        61,
        0,
        281
    ],
    [
        62,
        0,
        282
    ],
    [
        62,
        0,
        286
    ],
    [
        63,
        0,
        287
    ],
    [
        64,
        0,
        289
    ],
    [
        65,
        0,
        292
    ],
    [
        66,
        0,
        294
    ],
    [
        66,
        0,
        297
    ],
    [
        67,
        0,
        299
    ],
    [
        68,
        0,
        303
    ],
    [
        69,
        0,
        305
    ],
    [
        70,
        0,
        306
    ],
    [
        70,
        0,
        311
    ],
    [
        71,
        0,
        312
    ],
    [
        72,
        0,
        318
    ],
    [
        73,
        0,
        322
    ],
    [
        74,
        0,
        323
    ],
    [
        74,
        0,
        330
    ],
    [
        75,
        0,
        332
    ],
    [
        76,
        0,
        336
    ],
    [
        77,
        0,
        340
    ],
    [
        78,
        0,
        343
    ],
    [
        78,
        0,
        348
    ],
    [
        79,
        0,
        350
    ],
    [
        80,
        0,
        359
    ],
    [
        81,
        0,
        361
    ],
    [
        82,
        0,
        364
    ],
    [
        82,
        0,
        368
    ],
    [
        83,
        0,
        370
    ],
    [
        84,
        0,
        375
    ],
    [
        85,
        0,
        377
    ],
    [
        86,
        0,
        379
    ],
    [
        86,
        0,
        383
    ],
    [
        87,
        0,
        386
    ],
    [
        88,
        0,
        390
    ],
    [
        89,
        0,
        392
    ],
    [
        90,
        0,
        396
    ],
    [
        90,
        0,
        399
    ],
    [
        91,
        0,
        402
    ],
    [
        92,
        0,
        406
    ],
    [
        93,
        0,
        409
    ],
    [
        94,
        0,
        414
    ],
    [
        94,
        0,
        416
    ],
    [
        95,
        0,
        420
    ],
    [
        96,
        0,
        430
    ],
    [
        97,
        0,
        433
    ],
    [
        98,
        0,
        440
    ],
    [
        98,
        0,
        441
    ],
    [
        99,
        0,
        443
    ],
    [
        100,
        0,
        448
    ],
    [
        101,
        0,
        449
    ],
    [
        102,
        0,
        453
    ],
    [
        102,
        0,
        454
    ],
    [
        103,
        1,
        455
    ],
    [
        104,
        1,
        459
    ],
    [
        105,
        1,
        460
    ],
    [
        106,
        1,
        462
    ],
    [
        106,
        1,
        465
    ],
    [
        107,
        1,
        467
    ],
    [
        108,
        1,
        469
    ],
    [
        109,
        1,
        470
    ],
    [
        110,
        1,
        472
    ],
    [
        110,
        1,
        474
    ],
    [
        111,
        1,
        476
    ],
    [
        112,
        1,
        479
    ],
    [
        113,
        1,
        480
    ],
    [
        114,
        1,
        481
    ],
    [
        114,
        1,
        485
    ],
    [
        115,
        1,
        486
    ],
    [
        116,
        1,
        490
    ],
    [
        117,
        1,
        492
    ],
    [
        118,
        1,
        493
    ],
    [
        118,
        1,
        498
    ],
    [
        119,
        1,
        501
    ],
    [
        120,
        1,
        505
    ],
    [
        121,
        1,
        510
    ],
    [
        122,
        1,
        518
    ],
    [
        122,
        1,
        521
    ],
    [
        123,
        1,
        531
    ],
    [
        124,
        1,
        552
    ],
    [
        125,
        1,
        559
    ]
], 79));
'uekVuQqFGULUNs8PeGHsoilKLKpMtBexOS2qLLitjEpiKL1M6ZnG3V0Yfm2CFH35JhtvX2/cHHS5BoULS4DEAt/GXDf7'
'uekVuQqFGULUNs8PeGHsoilKLKpMtBexOS2qLLitjEpiKL1M6ZnG3V0Yfm2CFH35JhtvX2/cHHS5BoULS4DEAt/GXDf7'