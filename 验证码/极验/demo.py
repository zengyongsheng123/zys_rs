import re

data = '''geetest_1736258245050({"status": "success", "data": {"lot_number":"556f19e2d3db41d5b9c4e3ea8a65ffc2", ...}})'''

# 匹配 geetest_ 后面任意数字并捕获括号内的内容
pattern = r"geetest_\d+\((.*)\)"
result = re.findall(pattern, data)

# 输出结果
if result:
    print(result[0])
