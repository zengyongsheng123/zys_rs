// https://g.alicdn.com/bsop-static/scratch-captcha/0.0.29/index.js
// https://g.alicdn.com/secdev/sec-captcha/0.0.13/program.wasm
// https://g.alicdn.com/bsop-static/scratch-captcha/0.0.29/index.js
// https://g.alicdn.com/secdev/sec-captcha/0.0.13/program.wasm

const { createCanvas, ImageData } = require('canvas');
const path = require("path");
const fs = require("fs");
window = global
index = 0
result = {'images':{}, 'question':[]}
self = window
requestAnimationFrameEvent = []
requestAnimationFrame = function requestAnimationFrame(){
    requestAnimationFrameEvent.push(arguments[0])
    return requestAnimationFrameEvent.length
}

function putImageData(p1, p2, p3) {
    let canvas = createCanvas(p1.width, p1.height);
    let ctx = canvas.getContext('2d');
    ctx.putImageData(p1, p2, p3);

    if (p1.data.length >= 68160 && result['question'].length < 2)
        result['question'].push(canvas.toDataURL())
    if (p1.data.length <= 57600 && Object.keys(result['images']).length < 18) {
        let keys = Object.keys(result['images'])
        let dataURL = canvas.toDataURL()
        if (keys.length < 9){
            result['images'][keys.length] = [dataURL]
        }
        else if (result['images'][index % 9].length < 2) {
            result['images'][index % 9].push(dataURL)
        }
        index++
    }
}


document = {}
bg_list_2d = {
    '0': {putImageData: putImageData},
    '1': {putImageData: putImageData},
    '2': {putImageData: putImageData},
    '3': {putImageData: putImageData},
    '4': {putImageData: putImageData},
    '5': {putImageData: putImageData},
    '6': {putImageData: putImageData},
    '7': {putImageData: putImageData},
    '8': {putImageData: putImageData},
}
bg_list = {
    '0': {height: 120, width: 120, getContext(){return bg_list_2d[0]}},
    '1': {height: 120, width: 120, getContext(){return bg_list_2d[1]}},
    '2': {height: 120, width: 120, getContext(){return bg_list_2d[2]}},
    '3': {height: 120, width: 120, getContext(){return bg_list_2d[3]}},
    '4': {height: 120, width: 120, getContext(){return bg_list_2d[4]}},
    '5': {height: 120, width: 120, getContext(){return bg_list_2d[5]}},
    '6': {height: 120, width: 120, getContext(){return bg_list_2d[6]}},
    '7': {height: 120, width: 120, getContext(){return bg_list_2d[7]}},
    '8': {height: 120, width: 120, getContext(){return bg_list_2d[8]}},
}
question = {
    width: 355,
    height: 48,
    getContext(){
        return {putImageData: putImageData}
    }
}

var Cc = []
  , lc = [undefined, null, !0, !1, 0, function() {}
    , self, self.document]
  , gc = lc.length
  , uc = function(c) {
        return c
    }, dc = function(c) {
        return lc[c]
    }, qc = function(c) {
        return c
    }, bc = function(c) {
        return lc[gc] = c,
        gc++
    }, kc = [];
    V = [undefined, null, !0, !1, 0, function() {}
        , self, self.document], W = V.length, X = function(c) {
            return c
        }, j = function(c) {
            return V[c]
        }, K = function(c) {
            return c
        }, G = function(c) {
            return V[W] = c,
            W++
        }, Z = [];

function updateImg(c, a) {
    var t = Cc.indexOf(c);
    -1 === t && (-1 === (t = Cc.indexOf(null)) && (t = Cc.length),
    Cc[t] = c);
    var n = document.__update_img(t, c, a);
    if (n > 0)
        throw Error(_c[n - 1] || "ERROR_UNKNOWN")
}

function get_uint_array(file_path){
    const buffer = fs.readFileSync(file_path);
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
}
var wasm_uint_array = get_uint_array(path.join(path.resolve(__dirname, '..'), 'utils/program_0.0.13.wasm'))
, wasm_imports = {
    a: {
        0: function(c) {
            return qc(dc(c).length)
        },
        5: function(c, a, t) {
            return qc(dc(c).addEventListener(dc(a), dc(t)))
        },
        8: function() {
            return bc(new Image)
        },
        9: function(c) {
            return qc(dc(c).width)
        },
        10: function(c) {
            return qc(dc(c).height)
        },
        11: function(c, a) {
            dc(c).width = uc(a)
        },
        12: function(c, a) {
            dc(c).height = uc(a)
        },
        13: function(c, a) {
            dc(c).src = dc(a)
        },
        14: function(c, a, t) {
            return bc(new ImageData(dc(c),uc(a),uc(t)))
        },
        15: function(c) {
            return bc(dc(c).data)
        },
        17: function(c, a, t, n, e) {
            return bc(dc(c).getImageData(uc(a), uc(t), uc(n), uc(e)))
        },
        18: function(c, a, t, n) {
            return qc(dc(c).putImageData(dc(a), uc(t), uc(n)))
        },
        19: function(c, a, t, n) {
            return qc(dc(c).drawImage(dc(a), uc(t), uc(n)))
        },
        22: function(c, a) {
            return bc(dc(c).getContext(dc(a)))
        },
        23: function(c, a) {
            return bc(dc(c).createElement(dc(a)))
        },
        27: function(c) {
            return window.requestAnimationFrame(lc[c])
        },
        10001: function() {
            return lc[gc] = void 0,
            gc++
        },
        10002: function(c) {
            lc[c] = void 0
        },
        10003: function(c, a) {
            lc[c] = lc[a]
        },
        10010: function(c, a) {
            return lc[gc] = lc[c][lc[a]],
            gc++
        },
        10011: function(c, a, t) {
            lc[c][lc[a]] = lc[t]
        },
        10020: function(c) {
            return +!lc[c]
        },
        10030: function(c) {
            return lc[gc] = c,
            gc++
        },
        10031: function(c) {
            return +lc[c]
        },
        10032: function(c, a) {
            lc[c] = a
        },
        10033: function(c) {
            return lc[gc] = !!c,
            gc++
        },
        10034: function(c, a) {
            return lc[c] === lc[a]
        },
        10040: function(c, a) {
            for (var t = "", n = c; c + a > n; n++)
                t += String.fromCharCode(rc[n]);
            return lc[gc] = t,
            gc++
        },
        10041: function() {
            for (var c = "", a = hc; ; ) {
                var t = 34 ^ rc[a++];
                if (0 === t)
                    break;
                c += String.fromCharCode(t)
            }
            return lc[gc] = c,
            gc++
        },
        10050: function(c) {
            return lc[gc] = kc[c],
            gc++
        },
        10051: function() {
            return kc.length
        },
        10060: function(c, a) {
            return function(c, a) {
                for (var t = c.length, n = 0; t > n; n++)
                    rc[a + n] = c.charCodeAt(n);
                return t
            }(lc[c], a)
        },
        10061: function(c, a, t, n) {
            var e = lc[c]
              , i = rc.subarray(t, t + n);
            e.set(i, a)
        },
        10062: function(c, a, t, n) {
            var e = lc[c].subarray(a, a + t);
            rc.subarray(n, n + t).set(e)
        },
        10063: function(c, a) {
            return lc[gc] = new Uint8ClampedArray(rc.buffer,c,a),
            gc++
        },
        10070: function(c) {
            return lc[gc] = function(c) {
                return function() {
                    kc = arguments,
                    lc[4] = this;
                    var a = gc
                      , t = oc(0, c, 0);
                    return gc = a,
                    t
                }
            }(c),
            gc++
        },
        20000: function(c) {
            console.log(lc[c])
        },
        20001: function(c, a) {
            console.log(lc[c], lc[a])
        },
        20002: function(c, a, t) {
            console.log(lc[c], lc[a], lc[t])
        },
        30000: function() {}
    }
}
function picDecode(res) {
    return WebAssembly.instantiate(wasm_uint_array, wasm_imports).then(function(content) {
        var t = content.instance.exports;
        t._initialize(),
        rc = new Uint8Array(t.memory.buffer),
        oc = t[0],
        hc = oc(1);
        var t = lc.length;
        oc(2),
        gc = t
        updateImg(question, {
            token: res.data.encryptToken,
            data: res.data.questionText
        })
        for (var t = 0, e = res.data.images; e.length > t; t++) {
            var i = e[t];
            updateImg(bg_list[i.index], {
                token: res.data.encryptToken,
                data: i.content
            })

        }
        for (let i = 0; i < 10; i++) {
            requestAnimationFrameEvent[0](i * 10)
        }
        return result
    })
}

// 从标准输入读取传入的数据
process.stdin.setEncoding('utf-8');
let input = '';

// 收集数据
process.stdin.on('data', chunk => {
    input += chunk;
});
process.stdin.on('end', () => {
    picDecode(JSON.parse(input)).then(() => {
        console.log(JSON.stringify(result));
    }).catch(error => {
        console.error(error);
    })
});
