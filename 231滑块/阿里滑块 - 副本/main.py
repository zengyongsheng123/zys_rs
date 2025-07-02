from flask import Flask, request, jsonify
from api.Captcha import Captcha
from api.CaptchaCapSlideV2 import CaptchaCapSlideV2
import json


app = Flask(__name__)
app.json.ensure_ascii = False

@app.post('/')
async def verify_slider():
    # try:
        url = request.json.get('url')
        config = request.json.get('config')
        cookie = request.json.get('cookie')
        umidToken = request.json.get('umidToken')

        config = json.loads(config) if type(config) == str else config

        if config['action'] == 'captcha':
            data = Captcha(url, config, umidToken).verify(cookie)
        elif config['action'] in ['captchacapslidev2', 'captchascene']:
            data = CaptchaCapSlideV2(url, config, umidToken).verify(cookie)
        else:
            data = '滑块类型未知'
        return jsonify({'code': 200, 'data': data, 'msg': 'success'}), 200
    # except Exception as e:
    #     return jsonify({'code': 400, 'error': str(e), 'msg': 'fail'}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8888, debug=False)
