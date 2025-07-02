#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import base64
import datetime
import loguru
import requests
import torch
import cv2
import numpy as np
from models.common import DetectMultiBackend
from utils.general import non_max_suppression, scale_boxes
from utils.torch_utils import select_device
from utils.plots import Annotator, colors
from utils.segment.general import process_mask
from utils.dataloaders import transform
from PIL import Image
import time
from models.common import DetectMultiBackend
from utils.augmentations import letterbox
from utils.general import non_max_suppression, scale_boxes
from utils.torch_utils import select_device
import difflib
from ocr.predict_system import text_predict


logger = loguru.logger
day = datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d')
logger.add(
    sink=f'logs/{day}.log',
    level='INFO',
    enqueue=True,  # Òì²½
    encoding='utf-8',
)


# 剔除掉关键词
def remove_chars(string):
    chars = ["拖", "动", "滑", "块", "出", "现", "完", "整", "的", "后", "就", "松", "开"]
    for char in chars:
        string = string.replace(char, '')
    return string

def judge_category(title_img, class_names):
    title = remove_chars(text_predict(title_img))
    logger.info({"title": title})
    # print(title)
    try:
        index, category = title.strip().split('个')
        if len(index) == 0:
            index = 1
        else:
            index = chinese_to_int(index)  # use the function here
            if index is None:  # handle non-integer index here
                index = 3  # or some default value
    except Exception as e:
        index = 3
        category = ""

    classes = []
    for cls, name in class_names.items():
        if same_title(name, category.strip()):
            classes.append(cls)
    return int(index), classes if len(classes) > 0 else None


def chinese_to_int(chinese_num):
    num_dict = {'一': 1, '两': 2, '三': 3, '四': 4, '五': 5,
                '六': 6, '七': 7, '八': 8, '九': 9, '十': 10}
    if chinese_num in num_dict:
        return num_dict[chinese_num]
    else:
        return None  # or some default value


def same_title(a, b):
    if a == b:
        return True
    return difflib.SequenceMatcher(a=a, b=b).ratio() > 0


def detect_box(detect_model, img, classes=None, img_size=640, conf_thres=0.6, iou_thres=0.45):
    im = letterbox(img, [640, 640], stride=32, auto=True)[0]
    im = im.transpose((2, 0, 1))[::-1]  # HWC to CHW, BGR to RGB
    im = np.ascontiguousarray(im)  # contiguous
    im = torch.from_numpy(im).to(detect_model.device)
    im = im.half() if detect_model.fp16 else im.float()  # uint8 to fp16/32
    im /= 255  # 0 - 255 to 0.0 - 1.0
    if len(im.shape) == 3:
        im = im[None]  # expand for batch dim
    pred = detect_model(im, augment=False, visualize=False)
    detections = non_max_suppression(pred, conf_thres=conf_thres, iou_thres=iou_thres, classes=classes, max_det=1000)
    # device, stride, pt = detect_model.device, detect_model.stride, detect_model.pt
    # im = transform(img, img_size=img_size, stride=stride, auto=pt)
    # im = torch.from_numpy(im).to(device).float().div(255.0).unsqueeze(0)
    #
    # # 运行模型进行预测
    # with torch.no_grad():
    #     detections = detect_model(im)
    #
    # # 进行非极大抑制
    # detections = non_max_suppression(detections, conf_thres=conf_thres, iou_thres=iou_thres, classes=classes,
    #                                  max_det=1000)
    # # print(detections)
    detection = detections[0]
    detection[:, :4] = scale_boxes(im.shape[2:], detection[:, :4], img.shape).round()
    return detection


def show_location(img, detections, names, hide_labels=False, hide_conf=True):
    annotator = Annotator(img, line_width=3, example=str(names))

    for j, (*xyxy, conf, cls) in enumerate(reversed(detections)):
        c = int(cls)  # integer class
        label = None if hide_labels else (names[c] if hide_conf else f'{names[c]} {conf:.2f}')
        annotator.box_label(xyxy, label, color=colors(c, True))
    cv2.imshow('img', annotator.result())
    cv2.waitKey(0)


def predict(model, bg_img, title_img, show=False):
    class_names = model.names
    index, classes = judge_category(title_img, class_names)
    dets = detect_box(model, bg_img, classes)
    # print(index,classes,class_names[classes[0]])
    if len(dets) == 0:
        return 0
    xlist = []
    for *xyxy, conf, cls in reversed(dets):
        x1, y1, x2, y2 = int(xyxy[0]), int(xyxy[1]), int(xyxy[2]), int(xyxy[3])
        xlist.append(x2)

    # 是否展示图片
    # if show:
    #     print(index, classes, xlist)
    #     show_location(rgb_img, dets, class_names)

    xlist.sort()
    # 如果种类数量大于实际数量则以实际数量为准
    if index > len(xlist): index = len(xlist)
    return xlist[index - 1]


def load_img(url):
    if url.find('|') != -1:
        url1 = base64.b64decode(url.split('|')[1].split(',')[1])
        img_array = np.fromstring(url1, np.uint8)
        img1 = cv2.imdecode(img_array, cv2.COLOR_RGB2BGR)
        url2 = base64.b64decode(url.split('|')[2].split(',')[1])
        img_array = np.fromstring(url2, np.uint8)
        img2 = cv2.imdecode(img_array, cv2.COLOR_RGB2BGR)
        url = cv2.addWeighted(img1, 0.5, img2, 0.5, 0)
        img = cv2.imencode('.jpg', url)[1]
        return base64.b64decode(str(base64.b64encode(img))[2:-1])
    if url.find('http://') > -1 or url.find('https://') > -1:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.75 Safari/537.36'}
        req = requests.get(url, headers=headers, timeout=3)
        if req.status_code == 200:
            return req.content
    if url.find(';base64,') > -1:
        return base64.b64decode(url.split(';base64,')[-1])
    return base64.b64decode(url)


def base64_to_image(base64_data):
    nparr = np.frombuffer(base64_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    return img

def identify_px(model, title, bg):
    title_img = base64_to_image(load_img(title))
    bg_img = base64_to_image(load_img(bg))
    sliding_distance = predict(model, bg_img, title_img)
    return sliding_distance

# if __name__ == "__main__":
#     device = select_device('0' if True else 'cpu')  # 设置为 'cpu' 表示在 CPU 上运行
#     my_model = DetectMultiBackend("weights/taobao.pt", device=device, data='data/taobao.yaml')
    # start_time = time.time()
    # images = []
    # num = 1
    # def thread(i):
    #     global labels, num
    #     resp = requests.get('http://127.0.0.1:8888/')
    #     if resp.json()['imageData'] not in images:
    #         images.append(resp.json()['imageData'])
    #         with open(f'datasets/images/train/{num}.jpg','wb') as f:
    #             f.write(base64.b64decode(resp.json()['imageData'].split(',')[1]))
    #             f.close()
    #         num += 1
    #     ques = base64_to_image(load_img(resp.json()['ques']))
    #     # image_path = base64_to_image(load_img(bg))
    #     title = remove_chars(text_predict(ques)).strip().split('个')
    #     labels.append(title[1])
    #     print(i)
    # from concurrent.futures import ThreadPoolExecutor
    # with ThreadPoolExecutor(50) as t:
    #     for i in range(1,1001):
    #         t.submit(thread,i)
    # print()
    # title_path = base64_to_image(load_img(title))
    # image_path = base64_to_image(load_img(bg))
    # identify_px(title, bg)
    # print(a)
    # title_path = r"data/test/11.jpg"
    # image_path = r"data/test/1.jpg"
    # img = cv2.imread(image_path)
    # timg = cv2.imread(title_path)
    # print(predict(image_path, title_path, True))
    # print(time.time()-start_time)
