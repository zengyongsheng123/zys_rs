const vmInit = Module.findExportByName("chrome.dll", "_vm_init");
Interceptor.attach(vmInit, {
  onEnter: function(args) {
    this.bytecodePtr = args[0]; // 字节码指针
    console.log("字节码地址:", this.bytecodePtr);
  }
});