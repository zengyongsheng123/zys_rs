'''
@File:Demo_time.py
@Autho:南宫啸天
@Date:2025/5/10 23:14 
'''

# 2025-05-10T15:16:08.309Z 是ISO 8601 标准的时间格式
#
# # 获取当前UTC时间（包含时区信息）
# utc_now = datetime.datetime.now(datetime.timezone.utc)
#
# # 生成ISO格式字符串，保留毫秒，并替换时区后缀为Z
# iso_str = utc_now.isoformat(timespec="milliseconds").replace("+00:00", "Z")
#
# print(iso_str)  # 输出：2025-05-05T02:35:45.844Z
#
#
# # 获取当前UTC时间（包含时区信息）
# utc_now = datetime.datetime.now(datetime.timezone.utc)
#
# # 格式化时间，截取微秒的前3位作为毫秒，并添加Z
# iso_str = utc_now.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
#
# print(iso_str)  # 输出：2025-05-05T02:35:45.844Z
#

import datetime,random,time

def generate_swipe_times():
    """生成模拟人类滑动操作的开始和结束时间（UTC时间）"""
    # 随机生成一个近期的起始时间（例如：当前时间之前的0~60秒内）
    start_time = datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(
        seconds=random.uniform(0, 60)
    )

    # 模拟人类滑动持续时间：0.3~1.5秒之间，但大部分集中在0.5秒左右（正态分布）
    duration = max(0.3, min(1.5, random.normalvariate(0.5, 0.2)))
    end_time = start_time + datetime.timedelta(seconds=duration)

    # 格式化时间字符串（保留3位毫秒，替换时区为Z）
    def format_iso(dt):
        return dt.isoformat(timespec="milliseconds").replace("+00:00", "Z")

    return format_iso(start_time), format_iso(end_time)
