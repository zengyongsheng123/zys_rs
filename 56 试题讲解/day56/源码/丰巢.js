const CryptoJS = require('crypto-js');
const JSEncrypt = require("jsencrypt");
function H5uuid() {
    for (var _0x5084d4 = [], _0x30a0b2 = "0123456789abcdef", _0x3cc58f = 0; _0x3cc58f < 36; _0x3cc58f++) _0x5084d4[_0x3cc58f] = _0x30a0b2["substr"](Math["floor"](16 * Math["random"]()), 1);
    return _0x5084d4[14] = '4', _0x5084d4[19] = _0x30a0b2["substr"](3 & _0x5084d4[19] | 8, 1), _0x5084d4[8] = _0x5084d4[13] = _0x5084d4[18] = _0x5084d4[23] = '-', _0x5084d4["join"]('');
}

function _0x4ca869(_0x1e14be) {
    for (var _0x21f2e1 = '', _0x507961 = 0; _0x507961 < _0x1e14be["length"]; _0x507961++) {
        var _0x33825f = _0x1e14be[_0x507961];
        _0x21f2e1 += _0x33825f["x"] + '' + _0x33825f["y"] + _0x33825f["time"];
    }
    return _0x21f2e1;
}

function getSign(data, trace, uuid) {
    var str = data["clientIp"] + data["checkId"] + uuid + _0x4ca869(trace)
    return CryptoJS.MD5(str).toString()
}


function aseEncrypt(data) {
    var key = CryptoJS.enc.Utf8.parse(data.aesKey);
    var dataStr = "string" === typeof data.data ? data.data : JSON.stringify(data.data);
    var dataArr = CryptoJS.enc.Utf8.parse(dataStr);
    var encrypted = CryptoJS.AES.encrypt(dataArr, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function getParams(data, track, uuid) {
    let params = {
        'data': {
            'sign': getSign(data, track, uuid),
            'track': track
        },
        'aesKey': data['key']
    }
    console.log(params)
    return aseEncrypt(params, data.key)
}

function pwdEncrypt(pwd, pk) {
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(pk);
    return encrypt.encrypt(pwd);
}
