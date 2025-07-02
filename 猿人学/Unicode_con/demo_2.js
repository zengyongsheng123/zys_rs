function getIrisData(_0x3d0eeb) {
    const _0x1fa068 = Math["\u0066\u006c\u006f\u006f\u0072"](Math["\u0072\u0061\u006e\u0064\u006f\u006d"]() * (0xba7af ^ 0xbb8ef) + (0xbe628 ^ 0xbe1f8));
    const _0x542b78 = Math["\u0066\u006c\u006f\u006f\u0072"](Date["\u006e\u006f\u0077"]() / (0x54458 ^ 0x547b0));
    const _0x39669e = _0x3d0eeb ^ _0x542b78;
    const _0x56e6b4 = CryptoJS.MD5('' + _0x39669e + _0x542b78)["\u0074\u006f\u0053\u0074\u0072\u0069\u006e\u0067"]();
    const _0x811850 = {
        "\u0078\u006f\u0072\u0052\u0065\u0073\u0075\u006c\u0074": _0x39669e,
        'random': _0x1fa068,
        "\u0074\u0069\u006d\u0065\u0073\u0074\u0061\u006d\u0070": _0x542b78,
        "\u0068\u0061\u0073\u0068": _0x56e6b4
    };
    return _0x811850;
    fetch("\u0063\u0030\u0033", {
        "\u006d\u0065\u0074\u0068\u006f\u0064": 'POST',
        'body': JSON["\u0073\u0074\u0072\u0069\u006e\u0067\u0069\u0066\u0079"](_0x811850)
    })["\u0074\u0068\u0065\u006e"](_0x227e76 => {
        return _0x227e76['json']();
    })['then'](_0xebb97e => {
        const _0x398058 = document["\u0071\u0075\u0065\u0072\u0079\u0053\u0065\u006c\u0065\u0063\u0074\u006f\u0072"]('#flightTable\x20tbody');
        _0x398058['innerHTML'] = '';
        _0xebb97e['forEach']((_0x6aa98b, _0x2a8b82) => {
            const _0x393a48 = document['createElement']("\u0074\u0072");
            _0x393a48["\u0069\u006e\u006e\u0065\u0072\u0048\u0054\u004d\u004c"] = '\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>' + (_0x2a8b82 + (0xdc2fa ^ 0xdc2fb)) + '</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>' + _0x6aa98b['sepal_length'] + '</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>' + _0x6aa98b['sepal_width'] + '</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>' + _0x6aa98b['petal_length'] + '</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>' + _0x6aa98b['petal_width'] + '</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20<td>' + _0x6aa98b["\u0063\u006c\u0061\u0073\u0073"] + '</td>\x0a\x20\x20\x20\x20\x20\x20\x20\x20';
            _0x398058['appendChild'](_0x393a48);
        });
    });
}