window = global

function G(j, L) {

    E = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'['split']('')
        , Q = []
        , k = void 0x0;
    if (L = L || E["length"],
        j) {
        for (k = 0x0; k < j; k++)
            Q[k] = E[0x0 | Math['random']() * L];
    } else {
        var l = void 0x0;
        for (Q[0x8] = Q[0xd] = Q[0x12] = Q[0x17] = '-',
                 Q[0xe] = '4',
                 k = 0x0; k < 0x24; k++)
            Q[k] || (l = 0x0 | 0x10 * Math[a5(0x50c)](),
                Q[k] = E[0x13 === k ? 0x3 & l | 0x8 : l]);
    }
    return Q['join']('');
};

function z(x) {
    return x < -0x80 ? z(0x100 + x) : x > 0x7f ? z(x - 0x100) : x;
}

function Q123(x) {
            // var PF = M;
            x = '' + x;
            for (var F = [], w = window, D = 0x0, B = 0x0, I = x['length'] / 0x2; D < I; D++) {
                var Z = w['parseInt'](x['charAt'](B++), 0x10) << 0x4
                  , H = w['parseInt'](x['charAt'](B++), 0x10);
                F[D] = z(Z + H);
            }
            return F;
        }

function CE(x) {
    // var Pb = M;
    x = window['encodeURIComponent'](x);
    for (var F = [], b = 0x0, w = x['length']; b < w; b++)
        '%' === x['charAt'](b) ? b + 0x2 < w && F['push'](Q123('' + x['charAt'](++b) + x['charAt'](++b))[0x0]) : F['push'](z(x['charCodeAt'](b)));
    return F;
}


function CQ(x) {
    return x < -0x80 ? CQ(0x100 + x) : x > 0x7f ? CQ(x - 0x100) : x;
}

function Z() {
    // var WB = M;
    for (var CO = [], CN = 0x0; CN < 0x4; CN++)
        CO[CN] = CQ(Math['floor'](0x100 * Math["random"]()));
    return CO;
};

function X(CO) {
    // var Wf = M
    CN = [];
    if (!CO['length'])
        return CA(0x40);
    if (CO['length'] >= 0x40)
        return CO["splice"](0x0, 0x40);
    for (var Ct = 0x0; Ct < 0x40; Ct++)
        CN[Ct] = CO[Ct % CO['length']];
    return CN;
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

function C7() {
    var CO = CE("fd6a43ae25f74398b61c03c83be37449")
        , CN = Z();
    return CO = X(CO),
        CO = Cl(CO, X(CN)),
        CO = X(CO),
        [CO, CN];
}

function CM(CN, Ct) {

    if (Array['isArray'](CN))
        return CN;
    if (Symbol[U3(0x6cf)] in Object(CN))
        return CO(CN, Ct);
    throw new TypeError(U3(0x7c4));
};

function E1(x) {
    var F = [];
    return F[0x0] = z(x >>> 0x18 & 0xff),
        F[0x1] = z(x >>> 0x10 & 0xff),
        F[0x2] = z(x >>> 0x8 & 0xff),
        F[0x3] = z(0xff & x),
        F;
};

function X1(x) {
    var F = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    return '' + F[x >>> 0x4 & 0xf] + F[0xf & x];
}

function O(x) {

    return x['map'](function (F) {
        return X1(F);
    })['join']('');
}

function N1(x) {
    return O(E1(x));
}

function CU(x) {
    for (var F = [0x0, 0x77073096, 0xee0e612c, 0x990951ba, 0x76dc419, 0x706af48f, 0xe963a535, 0x9e6495a3, 0xedb8832, 0x79dcb8a4, 0xe0d5e91e, 0x97d2d988, 0x9b64c2b, 0x7eb17cbd, 0xe7b82d07, 0x90bf1d91, 0x1db71064, 0x6ab020f2, 0xf3b97148, 0x84be41de, 0x1adad47d, 0x6ddde4eb, 0xf4d4b551, 0x83d385c7, 0x136c9856, 0x646ba8c0, 0xfd62f97a, 0x8a65c9ec, 0x14015c4f, 0x63066cd9, 0xfa0f3d63, 0x8d080df5, 0x3b6e20c8, 0x4c69105e, 0xd56041e4, 0xa2677172, 0x3c03e4d1, 0x4b04d447, 0xd20d85fd, 0xa50ab56b, 0x35b5a8fa, 0x42b2986c, 0xdbbbc9d6, 0xacbcf940, 0x32d86ce3, 0x45df5c75, 0xdcd60dcf, 0xabd13d59, 0x26d930ac, 0x51de003a, 0xc8d75180, 0xbfd06116, 0x21b4f4b5, 0x56b3c423, 0xcfba9599, 0xb8bda50f, 0x2802b89e, 0x5f058808, 0xc60cd9b2, 0xb10be924, 0x2f6f7c87, 0x58684c11, 0xc1611dab, 0xb6662d3d, 0x76dc4190, 0x1db7106, 0x98d220bc, 0xefd5102a, 0x71b18589, 0x6b6b51f, 0x9fbfe4a5, 0xe8b8d433, 0x7807c9a2, 0xf00f934, 0x9609a88e, 0xe10e9818, 0x7f6a0dbb, 0x86d3d2d, 0x91646c97, 0xe6635c01, 0x6b6b51f4, 0x1c6c6162, 0x856530d8, 0xf262004e, 0x6c0695ed, 0x1b01a57b, 0x8208f4c1, 0xf50fc457, 0x65b0d9c6, 0x12b7e950, 0x8bbeb8ea, 0xfcb9887c, 0x62dd1ddf, 0x15da2d49, 0x8cd37cf3, 0xfbd44c65, 0x4db26158, 0x3ab551ce, 0xa3bc0074, 0xd4bb30e2, 0x4adfa541, 0x3dd895d7, 0xa4d1c46d, 0xd3d6f4fb, 0x4369e96a, 0x346ed9fc, 0xad678846, 0xda60b8d0, 0x44042d73, 0x33031de5, 0xaa0a4c5f, 0xdd0d7cc9, 0x5005713c, 0x270241aa, 0xbe0b1010, 0xc90c2086, 0x5768b525, 0x206f85b3, 0xb966d409, 0xce61e49f, 0x5edef90e, 0x29d9c998, 0xb0d09822, 0xc7d7a8b4, 0x59b33d17, 0x2eb40d81, 0xb7bd5c3b, 0xc0ba6cad, 0xedb88320, 0x9abfb3b6, 0x3b6e20c, 0x74b1d29a, 0xead54739, 0x9dd277af, 0x4db2615, 0x73dc1683, 0xe3630b12, 0x94643b84, 0xd6d6a3e, 0x7a6a5aa8, 0xe40ecf0b, 0x9309ff9d, 0xa00ae27, 0x7d079eb1, 0xf00f9344, 0x8708a3d2, 0x1e01f268, 0x6906c2fe, 0xf762575d, 0x806567cb, 0x196c3671, 0x6e6b06e7, 0xfed41b76, 0x89d32be0, 0x10da7a5a, 0x67dd4acc, 0xf9b9df6f, 0x8ebeeff9, 0x17b7be43, 0x60b08ed5, 0xd6d6a3e8, 0xa1d1937e, 0x38d8c2c4, 0x4fdff252, 0xd1bb67f1, 0xa6bc5767, 0x3fb506dd, 0x48b2364b, 0xd80d2bda, 0xaf0a1b4c, 0x36034af6, 0x41047a60, 0xdf60efc3, 0xa867df55, 0x316e8eef, 0x4669be79, 0xcb61b38c, 0xbc66831a, 0x256fd2a0, 0x5268e236, 0xcc0c7795, 0xbb0b4703, 0x220216b9, 0x5505262f, 0xc5ba3bbe, 0xb2bd0b28, 0x2bb45a92, 0x5cb36a04, 0xc2d7ffa7, 0xb5d0cf31, 0x2cd99e8b, 0x5bdeae1d, 0x9b64c2b0, 0xec63f226, 0x756aa39c, 0x26d930a, 0x9c0906a9, 0xeb0e363f, 0x72076785, 0x5005713, 0x95bf4a82, 0xe2b87a14, 0x7bb12bae, 0xcb61b38, 0x92d28e9b, 0xe5d5be0d, 0x7cdcefb7, 0xbdbdf21, 0x86d3d2d4, 0xf1d4e242, 0x68ddb3f8, 0x1fda836e, 0x81be16cd, 0xf6b9265b, 0x6fb077e1, 0x18b74777, 0x88085ae6, 0xff0f6a70, 0x66063bca, 0x11010b5c, 0x8f659eff, 0xf862ae69, 0x616bffd3, 0x166ccf45, 0xa00ae278, 0xd70dd2ee, 0x4e048354, 0x3903b3c2, 0xa7672661, 0xd06016f7, 0x4969474d, 0x3e6e77db, 0xaed16a4a, 0xd9d65adc, 0x40df0b66, 0x37d83bf0, 0xa9bcae53, 0xdebb9ec5, 0x47b2cf7f, 0x30b5ffe9, 0xbdbdf21c, 0xcabac28a, 0x53b39330, 0x24b4a3a6, 0xbad03605, 0xcdd70693, 0x54de5729, 0x23d967bf, 0xb3667a2e, 0xc4614ab8, 0x5d681b02, 0x2a6f2b94, 0xb40bbe37, 0xc30c8ea1, 0x5a05df1b, 0x2d02ef8d], b = 0xffffffff, w = 0x0, D = x['length']; w < D; w++)
        b = b >>> 0x8 ^ F[0xff & (b ^ x[w])];
    return N1(0xffffffff ^ b);
};

function CW(x, F, b, w, D) {

    for (var B = 0x0, I = x['length']; B < D; B++)
        F + B < I && (b[w + B] = x[F + B]);
    return b;
}

function J1(CO) {
    if (!CO['length'])
        return CA(0x40);
    var CN = []
        , Ct = CO['length']
        , CJ = Ct % 0x40 <= 0x3c ? 0x40 - Ct % 0x40 - 0x4 : 0x80 - Ct % 0x40 - 0x4;
    CW(CO, 0x0, CN, 0x0, Ct);
    for (var Cq = 0x0; Cq < CJ; Cq++)
        CN[Ct + Cq] = 0x0;
    return CW(E1(Ct), 0x0, CN, Ct + CJ, 0x4),
        CN;
}

function K1(CO) {

    if (Array['isArray'](CO)) {
        for (var CN = 0x0, Ct = Array(CO["length"]); CN < CO['length']; CN++)
            Ct[CN] = CO[CN];
        return Ct;
    }
    return Array[Wv(0x372)](CO);
};

function q1(CO) {

    if (CO['length'] % 0x40 !== 0x0)
        return [];
    for (var CN = [], Ct = CO['length'] / 0x40, CJ = 0x0, Cq = 0x0; CJ < Ct; CJ++) {
        CN[CJ] = [];
        for (var CS = 0x0; CS < 0x40; CS++)
            CN[CJ][CS] = CO[Cq++];
    }
    return CN;
}

function C5(CO) {
    var Wg = M
        , CN = arguments[Wg(0x735)] > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : 0x0;
    return CN + 0x100 >= 0x0 ? CO : [];
}

function H(CO, CN) {
    var Wo = M;
    if (!CO[Wo(0x735)])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO[Wo(0x735)]; CJ < Cq; CJ++)
        Ct[Wo(0x813)](Ck(CO[CJ], CN));
    return Ct;
};

function C0(CO, CN) {
    // var WI = M;
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO['length']; CJ < Cq; CJ++)
        Ct['push'](j(CO[CJ], CN++));
    return Ct;
};

function C3(CO, CN) {
    var WH = M;
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO[WH(0x735)]; CJ < Cq; CJ++)
        Ct[WH(0x813)](CG(CO[CJ], CN++));
    return Ct;
};

function C1(CO, CN) {
    // var Wr = M;
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO['length']; CJ < Cq; CJ++)
        Ct["push"](j(CO[CJ], CN--));
    return Ct;
};

function CG(x, F) {
    return z(x + F);
}

function C4(CO, CN) {
    // var Wd = M;
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO['length']; CJ < Cq; CJ++)
        Ct['push'](CG(CO[CJ], CN--));
    return Ct;
};


function CR1(x) {
    // var Pv = M;
    x = '' + x;
    var F = window
        , b = window
        , w = b['parseInt'](x['charAt'](0x0), 0x10) << 0x4
        , D = b['parseInt'](x['charAt'](0x1), 0x10);
    return z(w + D);
}

function C2(CO, CN) {
    // var WZ = M;
    if (!CO['length'])
        return [];
    CN = CQ(CN);
    for (var Ct = [], CJ = 0x0, Cq = CO['length']; CJ < Cq; CJ++)
        Ct["push"](CG(CO[CJ], CN));
    return Ct;
}

function C6(CO) {
    // var U0 = M;
    var Cp = "037606da0296055c"
    for (var CN = [C5, H, C2, C0, C3, C1, C4], Ct = Cp, CJ = 0x0, Cq = Ct['length']; CJ < Cq;) {
        var CS = Ct['substring'](CJ, CJ + 0x4)
            , CV = CR1(CS['substring'](0x0, 0x2))
            , Cy = CR1(CS['substring'](0x2, 0x4));
        CO = CN[CV](CO, Cy),
            CJ += 0x4;
    }
    return CO;
}

function Cj() {
    // var Pi = M;
    for (var x = arguments['length'] > 0x0 && void 0x0 !== arguments[0x0] ? arguments[0x0] : [], F = arguments['length'] > 0x1 && void 0x0 !== arguments[0x1] ? arguments[0x1] : [], b = [], w = F['length'], D = 0x0, B = x['length']; D < B; D++)
        b[D] = CG(x[D], F[D % w]);
    return b;
};

function CP(x) {
    // var PF = M;
    x = '' + x;
    for (var F = [], w = window, D = 0x0, B = 0x0, I = x['length'] / 0x2; D < I; D++) {
        var Z = w['parseInt'](x['charAt'](B++), 0x10) << 0x4
            , H = w['parseInt'](x['charAt'](B++), 0x10);
        F[D] = z(Z + H);
    }
    return F;
}

function F(CO) {
    // var WD = M
    var Cs = "a7be3f3933fa8c5fcf86c4b6908b569ba1e26c1a6d7cfbf60ae4b00e074a194dac4b73e7f898541159a39d08183b76eedee3ed341e6685d2357440158394b1ff03a9004cbbb5ca7dcb7f41489a16e03dcc9c71eb3c9796685b1d01b4d56193a6e1f1a2470445c191ae49c5d82765dc82c350f263387a24a502fcbf442e2dddaad0e936d9ea22b89275307b42518fbc3a626ba806d4ecd6d725f50cc8c72fefa4551ccd6fc9b2b7ab954f815c7264c6e51f4eaf99885a79892b1b60a0b3526e57ba5d178d370958847eb9fd28f9ce0bc023f4148a2adfe632126769057043d3bd8eda0df7872629f3809ef05310e83113216afe202c460fc23e789f77d1addb5e"
    CN = CP(Cs)
        , Ct = function (CV) {
        return CN[0x10 * (CV >>> 0x4 & 0xf) + (0xf & CV)];
    };
    if (!CO['length'])
        return [];
    for (var CJ = [], Cq = 0x0, CS = CO['length']; Cq < CS; Cq++)
        CJ[Cq] = Ct(CO[Cq]);
    return CJ;
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
            var q = T["slice"](N);
            J['push'](P(q, m, O));
            break;
        }
        var S = T['slice'](N, N + 0x3);
        J['push'](P(S, m, O)),
            N += 0x3;
    }
    return J['join']('');

}

function CX(T, m, O) {
    K = "MB.CfHUzEeJpsuGkgNwhqiSaI4Fd9L6jYKZAxn1/Vml0c5rbXRP+8tD3QTO2vWyo"
    var N = void 0x0 !== m && null !== m ? m : K
        , J = void 0x0 !== O && null !== O ? O : "7";
    return z1(T, N['split'](''), J);
}

function Cp(CO) {
    for (var CN = CE(CO), Ct =C7(), CJ = CM(Ct, 0x2), Cq = CJ[0x0], CS = CJ[0x1], CV = CE(CU(CN)), Cy = J1([]["concat"](K1(CN), K1(CV))), Cn = q1(Cy), Ce = []['concat'](K1(CS)), Ci = Cq, Cx = 0x0, CF = Cn['length']; Cx < CF; Cx++) {
        var Cb = Cl(C6(Cn[Cx]), Cq)
            , Cc = Cj(Cb, Ci);
        Cb = Cl(Cc, Ci),
            Ci = F(F(Cb)),
            CW(Ci, 0x0, Ce, 0x40 * Cx + 0x4, 0x40);
    }
    return CX(Ce);
}

function get_cb() {
    Cb = G(0x20);
    return Cp(Cb)
}

module.exports = {'Cp': Cp}
// "KNzQao5HkvFhMyjoWIoHx1TVoge2TZ.c5FA2CzICPQYtuMmFxvIxwuYqrQjiWoZqkhHTuFXZm0B+QxqNKpQwrPVy6pv7"
// 'KNzQao5HkvFhMyjoWIoHx1TVoge2TZ.c5FA2CzICPQYtuMmFxvIxwuYqrQjiWoZqkhHTuFXZm0B+QxqNKpQwrPVy6pv7'
console.log(Cp("rivkrciU"));
