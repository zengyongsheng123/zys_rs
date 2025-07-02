(function () {
    cookieTemp = document.cookie;
    Object.defineProperty(document, 'cookie', {
        set: function (val) {
            if (val.indexOf('v') != -1) {
                debugger;
            }
            console.log('Hook捕获到cookie设置->', val);
            cookieTemp = val;
        },
        get: function () {
            return cookieTemp;
        },
    });
})();