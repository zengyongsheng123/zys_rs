// == Hook WebSocket.onmessage ==
(function() {
    // 保存原始onmessage属性描述符
    const originalOnmessage = Object.getOwnPropertyDescriptor(WebSocket.prototype, 'onmessage');
    // 重写onmessage属性
    Object.defineProperty(WebSocket.prototype, 'onmessage', {
        set: function(fn) {
            // 包裹新回调函数
            const wrappedFn = function(event) {
                debugger;

                /* 可添加自定义逻辑 */
                console.log("WebSocket message received:", event.data);

                // 调用原始回调
                return fn.call(this, event);
            };

            // 设置新回调
            return originalOnmessage.set.call(this, wrappedFn);
        },
        get: function() {
            return originalOnmessage.get.call(this);
        }
    });
})();
