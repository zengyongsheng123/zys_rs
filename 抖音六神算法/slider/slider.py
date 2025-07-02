from ctypes import CDLL, c_char_p


mylib2 = CDLL(r'E:\2024\dy\Complete_Medusa\slider\slider.dll')

mylib2.AwemeSlider.argtypes = [
    c_char_p,
    c_char_p,
    c_char_p,
    c_char_p]
mylib2.AwemeSlider.restype = c_char_p

    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
def call_sliderV2(m_data):
    """
    Android滑块验证码
    Returns:
    """

    data = {}
    for k, v in m_data.items():
        data[k] = bytes(str(v), encoding="utf8")
    result = mylib2.AwemeSlider(
        data["verify_data"],
        data["device_id"],
        data["iid"],
        data["proxy"],
    )
    return result.decode("utf-8")


    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担
    # //QQ交流群739457206  仅供学习研究交流测试使用，禁止用于违法犯罪，后果需要自行承担