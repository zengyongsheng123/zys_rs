from captcha_recognizer.recognizer import Recognizer

# source传入图片路径
box, confidence = Recognizer().identify_gap(source='111.png', verbose=False)

print(f'缺口坐标: {box}')
print(f'可信度: {confidence}')

"""
打印结果格式如下:
缺口方框坐标: [331.72052001953125, 55.96122741699219, 422.079345703125, 161.7498779296875]
可信度: 0.9513089656829834

坐标原点：图片左上角
缺口方框坐标为缺口方框左上角和右下角距离坐标原点的距离
"""
