import random,hashlib,time
demo = "355bab1ed5110dfd#"
target = "1eb9e32eeb1e34e447220c6b27b8c27a"

"""其实这个是可以跟栈跟出来的 那我用py实现一下？
首先对于一个给定的字符串 如demo
比如 我给个字符串123456789 然后这个字符串的md5加密结果是 1eb9e32eeb1e34e447220c6b27b8c27a
我想知道1eb9e32eeb1e34e447220c6b27b8c27a对应的明文是什么 对雀食不可逆 但是可以通过枚举碰装的方法逆向出来
比如我可以从0-100000000000进行分别的md5加密 在判断是不是与1eb9e32eeb1e34e447220c6b27b8c27a相同
假设我生成的范围足够大 是不是有可能把123456789进行枚举出来 明白了吗？ 哪里 就是假设有这个场景
"""

def perfix_md5(prefix, target):
    for i in range(1000000):
        if(hashlib.md5((prefix+str(i)).encode()).hexdigest()==target):
            return prefix+str(i)
            break

strart_time = time.time()*1000
prefix=perfix_md5(demo, target)
print(prefix)
end_time = time.time()
pre_time=end_time-strart_time
print(pre_time)


