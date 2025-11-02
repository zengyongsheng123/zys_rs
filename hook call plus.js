(function() {
    // 1. 获取原始的 Function.prototype.call 方法
    const originalCall = Function.prototype.call;
    // 2. 安全保存原始的 Function.prototype.call.call
    const originalCallCall = Function.prototype.call.call.bind(Function.prototype.call);
    // 3. 使用 Object.defineProperty 强制覆盖（处理不可写属性）
    Object.defineProperty(Function.prototype.call, 'call', {
        value: function(targetFunc, thisArg, ...args) {
            let result;
            // 4. 调用原始方法
            result = originalCallCall(targetFunc, thisArg, ...args);
            // 5. 记录日志
            console.log(
                "[Hook] 双重 call 调用:::>",
                "目标函数:", targetFunc?.name || "(anonymous)",
                "this指向:", thisArg,
                "参数:", args,
                "返回值:", result
            );
        return result;
        },
        writable: true,    // 强制可写
        configurable: true,
        enumerable: false  // 保持不可枚举
    });
})();
