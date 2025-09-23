delete __filename;
delete __dirname;
window = global;
window.top = window;
window.self = window;
window.XMLHttpRequest = function (args) {
    console.log("window的XMLHttpRequest参数为=========>", args);
}
window.ActiveXObject = undefined;
window.CollectGarbage = undefined;
window.DOMParser = function (args) {
    console.log("window的DOMParser参数为=========>", args);
}
setTimeout = function (args) {
    console.log("window的setTimeout参数为=========>", args);
}
setInterval = function (args) {
    console.log("window的setInterval参数为=========>", args);
}
window.HTMLCanvasElement = function (args) {
    console.log("window的HTMLCanvasElement参数为=========>", args);
}
window.CanvasRenderingContext2D = function (args) {
    console.log("window的CanvasRenderingContext2D参数为=========>", args);
}
window.addEventListener = function (args) {
    if (args.type === "load") {
        console.log("window的addEventListener参数为=========>", args);
    }
}
window.name='$_YWTU=0B_Rmsd0js16nUlM9ppJOaKsl.Xzb707MaohKbD0req&$_YVTX=WOE&vdFm='
window.indexedDB={}
window.HTMLFormElement = function (args) {
    console.log("window的HTMLFormElement参数为=========>", args);
}
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    cookieEnabled:true,
    deprecatedRunAdAuctionEnforcesKAnonymity:false,
    deviceMemory: 8,
    doNotTrack:null,
    language:"zh",
    languages: ['zh', 'zh-CN'],
    onLine: true,
    pdfViewerEnabled: true,
    platform: "Win32",
    product:"Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver: false
}
document = {
    visibilityState: "visible",
    createElement: function (tagName) {
        console.log("document的createElement参数为=========>", tagName);
        if(tagName==='div'){return {
            getElementsByTagName: function (tagName) {
                console.log("div的getElementsByTagName参数为=========>", tagName);
                if(tagName==='i'){return []}
            },
        }
    }
        else return {}

    },
    appendChild: function (args) {
                console.log("div的appendChild参数为=========>", args);
            },
    removeChild: function (args) {
        console.log("div的removeChild参数为=========>", args);
    },
    getElementById: function (id) {
        console.log("document的getElementById参数为=========>", id);
        if(id==='a'){
            return []
        }
    },
    getElementsByTagName: function (tagName) {
        console.log("document的getElementsByTagName参数为=========>", tagName);
        if(tagName==="base"){return {}}
        else if(tagName==="script"){return {}}
    },
    addEventListener: function (args) {
        console.log("document的addEventListener参数为=========>", args);
        if (args.type === "base") {
            console.log("document的addEventListener参数为=========>", args);
            return {}
        }
        else return {}
    },
}


location = {
    "ancestorOrigins": {},
    "href": "https://zbzx.lzjtu.edu.cn/zbxx/hwl.htm",
    "origin": "https://zbzx.lzjtu.edu.cn",
    "protocol": "https:",
    "host": "zbzx.lzjtu.edu.cn",
    "hostname": "zbzx.lzjtu.edu.cn",
    "port": "",
    "pathname": "/zbxx/hwl.htm",
    "search": "",
    "hash": ""
}
screen = {
    "availHeight": 1040,
    "availLeft": 0,
    "availTop": 0,
    "availWidth": 1920,
    "colorDepth": 24,
    "height": 1080,
    "pixelDepth": 24,
    "width": 1920,

}