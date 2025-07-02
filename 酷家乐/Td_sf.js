/*****
 File:Td_sf.js
 Author:南宫啸天
 Date:2025/5/28 21:43
 *****/
var CryptoJS = require("crypto-js");
var MD5=function (str){
    return CryptoJS.MD5(str).toString();
}

function get_p1(){
    var token="kujia-"+Date.now()+""+"-a7f349d4344e5";
    return "b37uCyfyme4S7TF/MVDRqSRxP4CB2BjsnDxr4bSxz0vSL/~hXNGID9Tr7vzaBm~F"+"^^"+token+"^^kujia^^kujia_web";
}

function get_p2(requestType){
    var blackbox="pWPHx1743422862ODh38gElof4";
    return  blackbox+'^^'+requestType+""+'^^1^^1';
}

function get_p3(p1,p2,rd,token){
    return encryptAES256CBC(MD5(p1+"^^"+p2)+"^^|^^|^^|"+MD5(rd), "rsp67ou9"+token.substring(10, 18));
}

function get_p4(track,token){
    return encryptAES256CBC(track, "rsp67ou9"+token.substring(10, 18));
}

function get_p8(){
    var o0QoQQ = function (oQQ0Qo) {
    var QQoooQ = 'abcdefghijklmnoqprstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789';
    var ooQOQO = '';
    var QOoOOO = 1;
    while (QOoOOO) {
        switch (QOoOOO) {
            case (83 - 44) / 13: {
                var oQO0Q0 = Math["ceil"](Math["random"]() * 35);
                ooQOQO += QQoooQ[oQO0Q0];
                QOoOOO = 4;
                break;
            }
            case (75 - 59) / 16: {
                var OoOQ0O = 0;
                QOoOOO = 2;
                break;
            }
            case (132 - 72) / 15: {
                OoOQ0O++;
                QOoOOO = 2;
                break;
            }
            case (96 - 80) / 8: {
                QOoOOO = OoOQ0O < oQQ0Qo ? 3 : 0;
                break;
            }
        }
    }
    return ooQOQO;
}
    return o0QoQQ(8);
}


function get_p6(p8,token){
    return encryptAES256CBC(p8+'https://www.kujiale.com/', "rsp67ou9"+token.substring(10, 18));
}

function get_p7(p6,rd){
    var o0QoQQ = function (oQQ0Qo) {
    var QQoooQ = 'abcdefghijklmnoqprstuvwxyzABCDEFGHJIKLMNOPQRSTUVWXYZ0123456789';
    var ooQOQO = '';
    var QOoOOO = 1;
    while (QOoOOO) {
        switch (QOoOOO) {
            case (83 - 44) / 13: {
                var oQO0Q0 = Math["ceil"](Math["random"]() * 35);
                ooQOQO += QQoooQ[oQO0Q0];
                QOoOOO = 4;
                break;
            }
            case (75 - 59) / 16: {
                var OoOQ0O = 0;
                QOoOOO = 2;
                break;
            }
            case (132 - 72) / 15: {
                OoOQ0O++;
                QOoOOO = 2;
                break;
            }
            case (96 - 80) / 8: {
                QOoOOO = OoOQ0O < oQQ0Qo ? 3 : 0;
                break;
            }
        }
    }
    return ooQOQO;
}
    return MD5(p6)+MD5(rd)+o0QoQQ(32);
}

function get_p9(rd,token){
    return encryptAES256CBC(rd, "rsp67ou9"+token.substring(10, 18));
}

// Node.js 版本
const crypto = require('crypto');

function encryptAES256CBC(plaintext, key) {
    const iv = Buffer.from("Mnz14C2tXod8AUJ5", 'latin1');
    const cipher = crypto.createCipheriv('aes-256-cbc',
        Buffer.from(key, 'latin1').subarray(0, 32), // 取前32字节
        iv
    );
    return Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final()
    ]).toString('base64');
}



