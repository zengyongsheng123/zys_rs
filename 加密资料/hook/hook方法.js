(function() {
    var _parse = JSON.parse;
    JSON.parse = function(ps) {
        console.log("Hook JSON.parse ——> ", ps);
        debugger;
        return _parse(ps);  // 不改变原有的执行逻辑
    }
})();