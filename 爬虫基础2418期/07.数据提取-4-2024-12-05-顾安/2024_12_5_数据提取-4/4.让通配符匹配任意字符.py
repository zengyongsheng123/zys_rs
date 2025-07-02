# -*- coding: utf-8 -*-
# @Time    : 2024/12/5 20:30
# @Author  : 顾安
# @File    : 4.让通配符匹配任意字符.py


import re


content = """
<div class="el">
        <p class="t1">           
            <span>
                <a>Python开发工程师</a>
            </span>
        </p>
        <span class="t2">南京</span>
        <span class="t3">1.5-2万/月</span>
</div>
<div class="el">
        <p class="t1">
            <span>
                <a>java开发工程师</a>
            </span>
		</p>
        <span class="t2">苏州</span>
        <span class="t3">1.5-2/月</span>
</div>
"""

# re.DOTALL: 让通配符匹配\n
for item in re.findall(r'class="t1">.*?<a>(.*?)</a>', content, re.DOTALL):
    print(item)
