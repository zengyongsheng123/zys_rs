//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：demo_2.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/2/3 22:20
 *****/
function getIrisData(_0x3d0eeb) {
    const _0x1fa068 = Math["floor"](Math["random"]() * (0xba7af ^ 0xbb8ef) + (0xbe628 ^ 0xbe1f8));
    const _0x542b78 = Math["floor"](Date["now"]() / (0x54458 ^ 0x547b0));
    const _0x39669e = _0x3d0eeb ^ _0x542b78;
    const _0x56e6b4 = CryptoJS.MD5('' + _0x39669e + _0x542b78)["toString"]();
    const _0x811850 = {
        "xorResult": _0x39669e,
        'random': _0x1fa068,
        "timestamp": _0x542b78,
        "hash": _0x56e6b4
    };
    return _0x811850;

}