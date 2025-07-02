import cv2
import numpy as np


def detect_slider_gap(image_path):
    # 读取图像
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError("无法加载图像，请检查路径")

    # 转换为灰度图
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # 高斯模糊，减少噪声
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # 边缘检测，使用Canny
    edges = cv2.Canny(blurred, 50, 150)

    # 查找轮廓
    contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 遍历轮廓，寻找六边形缺口
    for contour in contours:
        # 计算轮廓的周长
        perimeter = cv2.arcLength(contour, True)
        # 近似多边形，检测是否为六边形
        approx = cv2.approxPolyDP(contour, 0.02 * perimeter, True)

        # 如果是六边形（6个顶点）
        if len(approx) == 6:
            # 计算六边形的边界框
            x, y, w, h = cv2.boundingRect(approx)

            # 返回缺口的中心位置（x坐标）
            gap_center_x = x + w // 2
            return gap_center_x

    raise ValueError("未检测到六边形缺口")


# 示例使用
if __name__ == "__main__":
    try:
        # 替换为你的图像路径
        image_path = "./img.png"
        gap_position = detect_slider_gap(image_path)
        print(f"缺口中心位置的x坐标: {gap_position}")
    except Exception as e:
        print(f"错误: {e}")