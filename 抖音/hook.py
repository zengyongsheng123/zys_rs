import frida

# 连接到本地进程
session = frida.attach("chrome.exe")

# 加载 JS 脚本
with open("browser_hook.js", "r") as f:
    script_code = f.read()

script = session.create_script(script_code)
script.load()

# 保持连接
input("Press Enter to exit...")