import ctypes


def allocate_utf8(s: str) -> int:
    # 计算 UTF-8 编码的字节长度（包括终止符）
    utf8_bytes = s.encode('utf-8')
    size = len(utf8_bytes) + 1

    # 模拟 _malloc：分配内存
    buffer = (ctypes.c_char * size)()  # 分配 size 字节的内存

    # 将字符串写入内存
    buffer[:len(utf8_bytes)] = utf8_bytes  # 写入 UTF-8 字节
    buffer[len(utf8_bytes)] = 0  # 添加 \0 终止符

    # 返回内存地址（模拟 WebAssembly 内存偏移）
    return ctypes.addressof(buffer)


# 测试
s = "Hello, world!"
ptr = allocate_utf8(s)
print(f"Allocated memory address: {ptr}")
# 注意：Python 的 ctypes 内存会自动管理，无需手动 _free
