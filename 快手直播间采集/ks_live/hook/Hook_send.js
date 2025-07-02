// == Hook WebSocket.send ==
(function () {
    // 保存原始send方法
    const originalSend = WebSocket.prototype.send;
    // 重写send方法
    WebSocket.prototype.send = function (data) {
        // 触发debugger
        debugger;

        /* 可添加自定义逻辑 */
        console.log("WebSocket send intercepted:", data);

        // 调用原始方法
        return originalSend.call(this, data);
    };
})();