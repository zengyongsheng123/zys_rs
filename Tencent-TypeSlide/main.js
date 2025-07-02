//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：main.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/3/9 20:10
 *****/

// require("./env");
require("./env_senior");
require("./tdc");


// collect_value=decodeURIComponent(window.TDC.getData(!0));
// console.log("collect_value------------>",collect_value);
// console.log("collect_value_length------------>",collect_value.length);
// console.log("eks_value------------>",window.TDC.getInfo())
// eks_value=window.TDC.getInfo()['info'];
// console.log("eks_value------------>",eks_value);
// console.log("eks_value_length------------>",eks_value.length);

function get_collect_value() {
    window.TDC.setData({"ft": "qf_7Pf__H"});
    var collect = decodeURIComponent(globalThis.TDC.getData(!0));
    // console.log("collect------------>",collect);
    // console.log("collect_length------------>",collect.length);
    return collect;
}

function get_eks_value() {
    var eks = globalThis.TDC.getInfo()['info'];
    // console.log("eks------------>",eks);
    // console.log("eks_length------------>",eks.length);
    return eks;
}

console.log("collect_value=====>",get_collect_value());
console.log("eks_value=====>",get_eks_value());
