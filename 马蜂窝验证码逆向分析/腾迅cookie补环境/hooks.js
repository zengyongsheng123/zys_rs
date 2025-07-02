(function(){
// 保存原始方法
const originalSetItem = localStorage.setItem;
const originalGetItem = localStorage.getItem;

// Hook setItem
localStorage.setItem = function(key, value) {
  // 打印入参
  console.log('localStorage.setItem called with:', { key, value });
  // 触发调试断点
  debugger;
  // 调用原始方法
  return originalSetItem.apply(this, [key, value]);
};

// Hook getItem
localStorage.getItem = function(key) {
  // 打印入参
  console.log('localStorage.getItem called with:', { key });
  // 触发调试断点
  debugger;
  // 调用原始方法
  return originalGetItem.apply(this, [key]);
};
})()
