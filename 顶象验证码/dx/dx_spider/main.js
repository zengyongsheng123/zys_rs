require("./env");
require("./green");

//就是这个玩意 对的 init方法就是构造z对象的 那我们这里直接这样
//z=window._dx.UA.init()
//z.sendSA()
//z.sendTemp(...)
//参数列表:xpath:定值写死 |x===>x坐标|y===>y坐标
//z.getUA()===>acValue
//不多比比 直接补环境就完了
//完美

function getAc(x,y,sid){
    var n = {
        "token": sid
    }
    var UA = window._dx.UA.init(n)
    // var mousemove = trake_list
    // for (let index = 0; index < mousemove.length; index++) {
    //     UA.__proto__.tm=new Date().getTime()-mousemove[index][2]
    //     UA.recordSA({"pageX":mousemove[index][0],"pageY":mousemove[index][1]})
    // }
    UA.sendSA()
    UA.sendTemp({"xpath":"/html/body/div[12]","x":x,"y":y})
    var ac = UA.getUA()
    // console.log(ac)
    console.log(ac.length)
    return ac
}
console.log(getAc(100,100,'1234567890'))
