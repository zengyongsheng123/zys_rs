window = global;
delete global;
delete Buffer;
require("./MyProxy");
window.requestAnimationFrame = function () {};
window.XMLHttpRequest = function () {};
document = {};
screen = {
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    pixelDepth:24,
    width:1920
};
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    cookieEnabled: true,
    doNotTrack: null,
    geolocation: {},
    language: "zh-CN",
    languages: ["zh-CN"],
    locks: {},
    maxTouchPoints: 0,
    mimeTypes: {},
    onLine: true,
    platform: "Win32",
    plugins: {},
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
};
