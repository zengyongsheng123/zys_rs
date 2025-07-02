delete global;
delete __filename;
delete __dirname;
delete Buffer;
delete process;

function watch(obj, name) {
    return new Proxy(obj, {
        get: function (target, property, receiver) {
            try {
                if (typeof target[property] === "function") {
                    console.log("对象 => " + name + ",读取属性:" + property + ",值为:" + 'function' + ",类型为:" + (typeof target[property]))
                } else {
                    console.log("对象 => " + name + ",读取属性:" + property + ",值为:" + target[property] + ",类型为:" + (typeof target[property]))
                }
            } catch (e) {
            }
            return target[property]
        },
        set: (target, property, newValue, receiver) => {
            try {
                console.log("对象 => " + name + ",设置属性:" + property + ",值为:" + newValue + ",类型为:" + (typeof newValue))
            } catch (e) {
            }
            return Reflect.set(target, property, newValue, receiver)
        }
    })
}

function Window(){}
function HTMLDocument(){}
function Navigator(){}
function Location(){}
function Screen(){}
function History(){}
function Storage(){}

window=globalThis;
window.addEventListener = function(){
    console.log("window.addEventListener==>", arguments);
}
document={
    cookie: "",
    createElement: function (tagName) {
        console.log("document.createElement==>", tagName);
        if(tagName==='canvas'){return {
            getContext:function (type) {
                console.log("canvas.getContext==>", type);
               if (type === 'webgl') {
                        console.log("canvas.getContext==>", type);
                        return {
                            drawingBufferColorSpace: "srgb",
                            drawingBufferFormat: 32856,
                            drawingBufferHeight: 150,
                            drawingBufferWidth: 300,
                            unpackColorSpace: "srgb"
               }
           }
                else if(type==='2d'){
                console.log("canvas.getContext==>", type);
                    return {
                    direction: "ltr",
                    fillStyle: "#000000",
                    filter: "none",
                    font: "10px sans-serif",
                    fontKerning: "auto",
                    fontStretch: "normal",
                    fontVariantCaps: "normal",
                    globalAlpha: 1,
                    globalCompositeOperation: "source-over",
                    imageSmoothingEnabled: true,
                    imageSmoothingQuality: "low",
                    letterSpacing: "0px",
                    lineCap: "butt",
                    lineDashOffset: 0,
                    lineJoin: "miter",
                    lineWidth: 1,
                    miterLimit: 10,
                    shadowBlur: 0,
                    shadowColor: "rgba(0, 0, 0, 0)",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    strokeStyle: "#000000",
                    textAlign: "start",
                    textBaseline: "alphabetic",
                    textRendering: "auto",
                    wordSpacing: "0px"
                }
            }



            }
        }}
        // if(tagName==='div'){return {}}
        // if(tagName==='span'){return {}}
        // if(tagName==='p'){return {}}
        // if(tagName==='iframe'){return {}}
    }
};
// HTMLCanvasElement = document.createElement("canvas").getContext().Prototype;
navigator={
    'userAgent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
};
location={};
screen={
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    pixelDepth: 24,
    width: 1920
};
history={};
localStorage={
   setItem:function (key, value) {
        console.log("localStorage.setItem==>", key, value);
    },
    getItem:function (key) {
        console.log("localStorage.getItem==>", key);
    },
};
sessionStorage={};


// window.__proto__=Window.prototype;
// document.__proto__=HTMLDocument.prototype;
// navigator.__proto__=Navigator.prototype;
// location.__proto__=Location.prototype;
// screen.__proto__=Screen.prototype;
// history.__proto__=History.prototype;
// localStorage.__proto__=Storage.prototype;
// sessionStorage.__proto__=Storage.prototype;

window = watch(window, "window")
document = watch(document, "document")
navigator = watch(navigator, "navigator")
location = watch(location, "location")
screen = watch(screen, "screen")
history = watch(history, "history")
localStorage = watch(localStorage, "localStorage")
sessionStorage = watch(sessionStorage, "sessionStorage")
