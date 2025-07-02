require('./env')
require("./soures")



function main(t){
    var s = decodeURIComponent(window.TDC.getData()),
        c = window.TDC.getInfo();
    var parms = {
        conllet:s,
        tlg: s.length,
        eks:c.info
    }
    return parms;
}

console.log(main());