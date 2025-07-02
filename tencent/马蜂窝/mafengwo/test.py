from DrissionPage import ChromiumPage, ChromiumOptions
import time
import random

# 正确配置浏览器参数
co = ChromiumOptions().set_argument('--window-size=1280,720')  # 设置窗口大小
co = co.set_argument('--disable-gpu')  # 禁用GPU加速

# 创建浏览器对象并访问页面
page = ChromiumPage(co)
page.get('https://tingshen.court.gov.cn/live/38998205')

# 定位滑块元素（带超时等待）
slider = page.ele('#aliyunCaptcha-sliding-slider', timeout=10)

if slider:
    print("找到滑块元素，开始模拟滑动...")


    # 生成人类滑动轨迹
    def human_track(distance):
        track = []
        current = 0
        while current < distance:
            step = random.randint(3, 8)
            current += step
            track.append((step, random.uniform(0.05, 0.2)))
        return track


    # 假设缺口距离为180像素（需实际图像识别）
    target_distance = 180

    # 执行滑动操作
    slider.hold()  # 按住滑块
    for step, delay in human_track(target_distance):
        slider.move(step, 0)  # 横向移动
        time.sleep(delay)
    slider.release()  # 释放鼠标

    # 等待验证结果
    time.sleep(3)
    print("滑动完成，请检查验证结果。")
else:
    print("错误：滑块元素未找到！")

# 关闭浏览器
page.quit()