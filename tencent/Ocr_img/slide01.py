import cv2
import numpy as np


def detect_gap_by_color(image_path):
    img = cv2.imread(image_path)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 定义缺口的颜色范围（示例：深色区域）
    lower = np.array([0, 0, 0])
    upper = np.array([180, 255, 50])

    # 颜色阈值化
    mask = cv2.inRange(hsv, lower, upper)

    # 查找轮廓
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 筛选最大轮廓（假设缺口是最大的深色区域）
    if contours:
        max_contour = max(contours, key=cv2.contourArea)
        x, _, w, _ = cv2.boundingRect(max_contour)
        gap_x = x + w // 2
        return gap_x
    else:
        return None


gap_x = detect_gap_by_color("../img.png")
print(f"缺口中心 x 坐标: {gap_x}")
