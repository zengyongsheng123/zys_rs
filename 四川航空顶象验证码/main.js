/*****
File：main.js
Author：南宫啸天
Date：2025/3/10 21:44
*****/
require("./env");
require("./greenseer");


function getAc(x,y,sid){
    var UA = window._dx.UA.init({"token": sid});
    UA.sendSA();
    UA.sendTemp("x=" + x + "&y=" + y);
    var ac = UA.getUA()
    // console.log(ac)
    // console.log(ac.length)
    return String(ac);
}
console.log(getAc(160, 30, '2643339aa7517807dcf345e85c99d6e4'));
