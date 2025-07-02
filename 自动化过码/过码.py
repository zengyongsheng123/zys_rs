import time
import base64
import ddddocr
from DrissionPage import ChromiumPage

# 启动浏览器
page = ChromiumPage()
page.get('https://www.geetest.com/demo/slide-float.html')

# 2、填写信息
page.ele('#username').input('13535353535')
page.ele('#password').input('12312313')
time.sleep(2)

# 3、点击滑块
page.ele('xpath://div[@class="geetest_btn"]/div[@class="geetest_radar_btn"]').click()
time.sleep(2)

# 3.1 获取验证码图片
bg_src = page.run_js("return document.getElementsByClassName('geetest_canvas_bg geetest_absolute')[0].toDataURL('image/png')")
full_src = page.run_js("return document.getElementsByClassName('geetest_canvas_fullbg geetest_fade geetest_absolute')[0].toDataURL('image/png')")

bg_base = base64.b64decode(bg_src.split(',')[1])
with open('bg.jpg', 'wb') as f:
    f.write(bg_base)
full_base = base64.b64decode(full_src.split(',')[1])
with open('full.jpg', 'wb') as f:
    f.write(full_base)

# 3.2 缺口识别
def read_img():
    slide = ddddocr.DdddOcr(det=False, ocr=False)
    # with open('bg.jpg', 'rb') as f:
    #     target_bytes = f.read()
    # with open('full.jpg', 'rb') as f:
    #     background_bytes = f.read()
    res = slide.slide_comparison(bg_base, full_base)
    return res.get('target')[0]
# 滑块到左边的距离

dis = read_img()

# 3.3 拖动滑块
slide_btn = page.ele('css:div.geetest_slider_button')
actions = page.actions
# 鼠标移动到滑块按钮。
actions.move_to(slide_btn)
# 按下鼠标左键。
actions.m_hold(slide_btn)
time.sleep(0.2)
# 相对当前位置移动鼠标。
actions.move(dis - 10, 0)
time.sleep(0.8)
actions.move(10, 0)
time.sleep(1.4)
actions.move(-10, 0)
# 松开鼠标左键
actions.m_release(slide_btn)
