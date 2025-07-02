import ddddocr
from loguru import logger

#稍等我去拿一份代码
ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
with open('sprite.png', 'rb') as f:
    img_bytes = f.read()
with open('img.png', 'rb') as f:
    img_bytes2 = f.read()
res = ocr.slide_match(img_bytes2,img_bytes)
logger.debug("识别结果======>{}",res)
logger.debug("缺口距离======>{}",res['target'][0])
