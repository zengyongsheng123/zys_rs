import os
import sys
import subprocess
import json
import math
import copy

__dir__ = os.path.dirname(os.path.abspath(__file__))
print(__dir__)
sys.path.append(__dir__)
sys.path.append(os.path.abspath(os.path.join(__dir__, '../')))
os.environ["FLAGS_allocator_strategy"] = 'auto_growth'

import cv2
import copy
import numpy as np
import time
import predict_rec
# import predict_det
# import predict_cls
import argparse


def parse_args():
    def str2bool(v):
        return v.lower() in ("true", "t", "1")
    parser = argparse.ArgumentParser()
    # params for text detector
    # parser.add_argument("--image_dir", type=str, default="E:/prj/PaddleOCR/train_data/OCR-goods_det/train_image_9000/")
    parser.add_argument("--det_algorithm", type=str, default='DB')
    parser.add_argument("--det_model_dir", type=str)
    parser.add_argument("--det_limit_side_len", type=float, default=960)
    parser.add_argument("--det_limit_type", type=str, default='max')

    # DB parmas
    parser.add_argument("--det_db_thresh", type=float, default=0.3)
    parser.add_argument("--det_db_box_thresh", type=float, default=0.3)
    parser.add_argument("--det_db_unclip_ratio", type=float, default=1.9)
    parser.add_argument("--max_batch_size", type=int, default=10)
    parser.add_argument("--use_dilation", type=bool, default=False)
    parser.add_argument("--det_db_score_mode", type=str, default="fast")
    # EAST parmas
    parser.add_argument("--det_east_score_thresh", type=float, default=0.8)
    parser.add_argument("--det_east_cover_thresh", type=float, default=0.1)
    parser.add_argument("--det_east_nms_thresh", type=float, default=0.2)

    # SAST parmas
    parser.add_argument("--det_sast_score_thresh", type=float, default=0.5)
    parser.add_argument("--det_sast_nms_thresh", type=float, default=0.2)
    parser.add_argument("--det_sast_polygon", type=bool, default=False)

    # params for text recognizer
    parser.add_argument("--rec_algorithm", type=str, default='CRNN')
    # parser.add_argument("--rec_model_dir", type=str,default="../inference/ch_PP-OCRv2_rec_infer")
    parser.add_argument("--rec_model_dir", type=str, default="weights/ch_PP-OCRv2_rec_infer.onnx")
    parser.add_argument("--rec_image_shape", type=str, default="3, 32, 320")
    parser.add_argument("--rec_char_type", type=str, default='ch')
    parser.add_argument("--rec_batch_num", type=int, default=6)
    parser.add_argument("--max_text_length", type=int, default=25)
    parser.add_argument("--rec_char_dict_path",type=str,default="ocr/doc/ppocr_keys_v1.txt")
    # parser.add_argument("--rec_char_dict_path",type=str,default="paddleocr/ppocr/utils/ppocr_keys_v1.txt")
    parser.add_argument("--use_space_char", type=str2bool, default=True)
    # parser.add_argument(
    #     "--vis_font_path", type=str, default="E:/prj/image_translation/doc/fonts/simfang.ttf")
    parser.add_argument(
        "--vis_font_path", type=str, default="ocr/doc/fonts/Thai/TH Baijam Bold.ttf")
    # 低于drop_score不显示
    parser.add_argument("--drop_score", type=float, default=0.7)

    # params for text classifier
    parser.add_argument("--use_angle_cls", type=str2bool, default=False)
    parser.add_argument("--cls_model_dir", type=str)
    parser.add_argument("--cls_image_shape", type=str, default="3, 48, 192")
    parser.add_argument("--label_list", type=list, default=['0', '180'])
    parser.add_argument("--cls_batch_num", type=int, default=6)
    parser.add_argument("--cls_thresh", type=float, default=0.9)

    parser.add_argument("--use_paddle_predict", type=str2bool, default=False)
    return parser.parse_args()

class TextSystem(object):
    def __init__(self, args):
        self.text_recognizer = predict_rec.TextRecognizer(args)

    def __call__(self, imgs):
        rec_res = self.text_recognizer(imgs)
        return rec_res

def get_mask(img):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # low_red = np.array([0, 151, 150])
    # high_red = np.array([10, 255, 255])
    low_red = np.array([0, 0, 0])
    high_red = np.array([255, 255, 255])
    mask = cv2.inRange(hsv, low_red, high_red)
    contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    xmins = []
    xmaxs = []
    for cnt in range(len(contours)):
        x,y,w,h = cv2.boundingRect(contours[cnt])
        xmins.append(x)
        xmaxs.append(x+w)
    xmin = min(xmins)
    xmax = max(xmaxs)
    res = cv2.bitwise_and(img, img, mask=mask)
    # cv2.imshow('mask', res[0:22,xmin:xmax])
    # cv2.waitKey(0)
    return res[0:22,xmin:xmax]

args = parse_args()
text_sys = TextSystem(args)

def text_predict(img):
    new = get_mask(img)
    res = text_sys([new])
    text, conf = res[0]
    return text


if __name__ == "__main__":
    img_path = r'/tesimg/349.jpg'
    img = cv2.imread(img_path)
    s = time.time()
    boxes = text_predict(img)
    print(time.time()-s, boxes)