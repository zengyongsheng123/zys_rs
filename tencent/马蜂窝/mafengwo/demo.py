from DrissionPage import ChromiumPage, ChromiumOptions
import random
import time
import cv2
import numpy as np
from PIL import Image
import requests
from io import BytesIO
from loguru import logger

# 配置日志
logger.add("captcha_solver.log", rotation="1 MB", encoding="utf-8")

# 配置无痕浏览器选项
options = ChromiumOptions()
options.set_paths(
    browser_path='C:/Program Files/Google/Chrome/Application/chrome.exe'
    # driver_path='D:/chrome/chromedriver.exe'
)
options.set_argument('--incognito')  # 开启隐身模式

# 初始化 ChromiumPage
page = ChromiumPage(options)

# 访问目标网页
logger.info("正在访问目标网页: https://www.mafengwo.cn/sales/8539850.html")
page.get('https://www.mafengwo.cn/sales/8539850.html')

# --- 后面你的滑块处理逻辑 保持不变 ---


# 等待页面加载
time.sleep(3)

# 定位滑块和背景图片（根据目标网页调整选择器）
logger.info("定位滑块和背景图片...")
slider = page.ele('xpath://div[@class="tc-opera"]/div[@class="tc-fg-item"]')  # 滑块元素
bg_img = page.ele('xpath://div[@class="tc-opera"]/div[@class="tc-bg-img unselectable"]')  # 背景图片

# 如果滑块或背景图片未找到，退出
if not slider or not bg_img:
    logger.error("未找到滑块或背景图片，请检查选择器")
    page.quit()
    exit()


# 下载背景图片
def download_image(url):
    logger.info(f"下载图片: {url}")
    response = requests.get(url)
    img = Image.open(BytesIO(response.content))
    return cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)


# 识别缺口位置
def detect_gap(bg_image):
    logger.info("识别缺口位置...")
    # 转换为灰度图并去噪
    gray = cv2.cvtColor(bg_image, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (5, 5), 0)  # 添加高斯模糊
    # 边缘检测
    edges = cv2.Canny(gray, 100, 200)

    # 寻找轮廓
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 假设缺口是较大的轮廓之一
    if not contours:
        logger.warning("未找到轮廓，返回缺口位置 0")
        return 0
    max_contour = max(contours, key=cv2.contourArea)

    # 获取缺口的 x 坐标
    x, _, w, _ = cv2.boundingRect(max_contour)
    gap = x + w // 2  # 返回缺口中心位置
    logger.info(f"检测到缺口位置: {gap} 像素")
    return gap


# 模拟人类拖动轨迹
def simulate_human_drag(slider, total_distance, steps=15):
    logger.info(f"开始模拟拖动，目标距离: {total_distance} 像素")
    current_x = 0
    for i in range(steps):
        # 计算每段拖动距离（先快后慢）
        remaining_distance = total_distance - current_x
        step_distance = remaining_distance / (steps - i) * random.uniform(0.8, 1.2)
        slider.drag(step_distance, random.uniform(-2, 2))  # 添加 y 轴抖动
        current_x += step_distance
        time.sleep(random.uniform(0.05, 0.15))  # 随机停顿
    logger.info(f"总拖动距离: {current_x} 像素")


# 主逻辑（包含重试机制）
max_attempts = 3
for attempt in range(max_attempts):
    logger.info(f"第 {attempt + 1} 次尝试...")
    try:
        # 获取背景图片 URL
        bg_img_url = bg_img.attr('src')
        if not bg_img_url:
            logger.error("未找到背景图片 URL")
            page.quit()
            exit()

        # 下载并处理背景图片
        bg_image = download_image(bg_img_url)

        # 识别缺口位置
        gap_position = detect_gap(bg_image)
        if gap_position <= 0:
            logger.error("未能识别缺口位置")
            page.quit()
            exit()

        # 确保滑块移动距离在 50 到 552 像素之间
        gap_position = max(50, min(gap_position, 552))
        logger.info(f"调整后的缺口位置: {gap_position} 像素")

        # 执行人类化拖动
        simulate_human_drag(slider, total_distance=gap_position)

        # 等待验证结果
        time.sleep(2)

        # 检查是否通过验证
        success = page.ele('xpath://span[contains(text(), "验证通过")]')
        if success:
            logger.info("滑块验证码通过！")
            break
        else:
            logger.warning("滑块验证码未通过，检查距离或轨迹")
            if attempt < max_attempts - 1:
                logger.info("刷新验证码并重试...")
                page.refresh()  # 刷新页面以重载验证码
                time.sleep(3)
                slider = page.ele('xpath://div[@class="tc-fg-item"]')
                bg_img = page.ele('xpath://div[@class="tc-slider-bg"]/img')
                if not slider or not bg_img:
                    logger.error("刷新后未找到滑块或背景图片，退出")
                    break
            else:
                logger.error("达到最大重试次数，验证失败")

    except Exception as e:
        logger.error(f"发生错误: {e}")
        break

# 关闭浏览器
page.quit()