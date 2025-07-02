import cv2
import numpy as np


def detect_gap(image_path):
    # 读取图片
    image = cv2.imread(image_path)
    if image is None:
        print("无法加载图片")
        return None

    # 转换为灰度图
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 使用阈值分割，假设缺口是黑色区域
    _, thresh = cv2.threshold(gray, 50, 255, cv2.THRESH_BINARY_INV)

    # 寻找轮廓
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # 过滤并找到最大的轮廓（假设缺口是最大的黑色区域）
    max_contour = max(contours, key=cv2.contourArea) if contours else None

    if max_contour is not None:
        # 获取缺口的边界框
        x, y, w, h = cv2.boundingRect(max_contour)
        print(f"缺口位置：x={x}, y={y}, 宽度={w}, 高度={h}")

        # 在原图上绘制边界框（可选，用于可视化）
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # 保存或显示结果（可选）
        cv2.imwrite("output_with_gap.jpg", image)
        return (x, y, w, h)
    else:
        print("未找到缺口")
        return None


if __name__ == "__main__":
    # 替换为你的图片路径
    image_path = "../img.png"
    detect_gap(image_path)
