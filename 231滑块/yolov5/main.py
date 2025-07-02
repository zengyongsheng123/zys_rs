import torch.cuda
from flask import Flask, request
from ultralytics.utils.torch_utils import select_device
from core import identify_px
from models.common import DetectMultiBackend

"""
python -m pip install --upgrade pip
pip install fastapi
pip install onnxruntime -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install uvicorn -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install ultralytics -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install tqdm -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install psutil -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install pandas -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install opencv-python -i https://pypi.tuna.tsinghua.edu.cn/simple
pip install loguru -i https://pypi.tuna.tsinghua.edu.cn/simple
conda install pytorch torchvision torchaudio cpuonly -c pytorch
"""
app = Flask(__name__)
app.ensure_ascii = False
@app.post("/img/api/TbCaptchaMatch")
async def captcha_match():
    imageData_str = request.get_json().get("imageData")
    ques_str = request.get_json().get('ques')
    distance = identify_px(my_model, ques_str, imageData_str)
    return {"code": 200, "data": {"xmax": distance}, "msg": "success"}




if __name__ == '__main__':
    device = select_device('0' if torch.cuda.is_available() else 'cpu')  # 设置为 'cpu' 表示在 CPU 上运行
    my_model = DetectMultiBackend("weights/taobao.pt", device=device, data='data/taobao.yaml', fp16=False)
    app.run(host='0.0.0.0', port=9999, debug=False)
