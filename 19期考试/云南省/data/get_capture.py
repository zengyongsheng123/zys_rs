import random
import requests
import json
import execjs
import base64
import ddddocr
import time
import cv2
import numpy as np

with open("get_verify_params.js", "r", encoding="utf-8") as f:
    js_code = f.read()

headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh,zh-CN;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://www.ynjzjgcx.com",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
    "appId": "84ded2cd478642b2",
    "isToken": "false",
    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}


def get_slide_info():
    """获取滑块验证码信息"""
    capture_params = execjs.compile(js_code).call("get_verify_params", '{"key": "query"}')
    url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/vcode/genVcode"
    data = {
        "params": capture_params
    }
    data = json.dumps(data, separators=(',', ':'))
    response = requests.post(url, headers=headers, data=data)
    res = response.json()
    json_data = json.loads(res['data'])
    slideId = json_data["slideId"]
    smallImage = json_data["smallImage"]
    bigImage = json_data["bigImage"]
    yHeight = json_data["yHeight"]
    timestamp = res["timestamp"]

    return slideId, smallImage, bigImage, yHeight, timestamp


def template_matching(smallImage, bigImage):
    """使用OpenCV模板匹配方法"""
    try:
        # 解码图片
        small_bytes = base64.b64decode(smallImage)
        big_bytes = base64.b64decode(bigImage)

        # 转换为numpy数组
        nparr_small = np.frombuffer(small_bytes, np.uint8)
        nparr_big = np.frombuffer(big_bytes, np.uint8)

        # 解码图像
        target_img = cv2.imdecode(nparr_small, cv2.IMREAD_COLOR)
        background_img = cv2.imdecode(nparr_big, cv2.IMREAD_COLOR)

        if target_img is None or background_img is None:
            print("图片解码失败")
            return None

        # 转换为灰度图
        target_gray = cv2.cvtColor(target_img, cv2.COLOR_BGR2GRAY)
        background_gray = cv2.cvtColor(background_img, cv2.COLOR_BGR2GRAY)

        # 模板匹配
        result = cv2.matchTemplate(background_gray, target_gray, cv2.TM_CCOEFF_NORMED)
        _, max_val, _, max_loc = cv2.minMaxLoc(result)

        # 计算目标位置
        x = max_loc[0]
        w = target_gray.shape[1]

        print(f"模板匹配结果: 位置({x}), 相似度: {max_val:.3f}")

        # 如果相似度太低，可能匹配错误
        if max_val < 0.3:
            return None

        return x

    except Exception as e:
        print(f"模板匹配失败: {e}")
        return None


def ddddocr_recognition(smallImage, bigImage):
    """使用ddddocr识别"""
    try:
        ocr = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
        target_bytes = base64.b64decode(smallImage)
        background_bytes = base64.b64decode(bigImage)

        result = ocr.slide_match(target_bytes, background_bytes, simple_target=True)
        distance = result['target'][0]
        print(f"ddddocr识别结果: {distance}")
        return distance
    except Exception as e:
        print(f"ddddocr识别失败: {e}")
        return None


def get_slide_distance_combined(smallImage, bigImage, yHeight):
    """结合多种方法识别滑块距离"""
    methods = []

    # 方法1: ddddocr (主要方法)
    ddddocr_result = ddddocr_recognition(smallImage, bigImage)
    if ddddocr_result is not None:
        methods.append(('ddddocr', ddddocr_result))

    # 方法2: OpenCV模板匹配 (备用方法)
    template_result = template_matching(smallImage, bigImage)
    if template_result is not None:
        methods.append(('template', template_result))

    if not methods:
        print("所有识别方法都失败")
        return None

    # 优先选择ddddocr的结果
    for method_name, result in methods:
        if method_name == 'ddddocr':
            return result

    # 如果没有ddddocr结果，返回模板匹配结果
    return methods[0][1]


def get_page_data(page, slideId, distance):
    """获取指定页的数据"""
    verify_url = "https://www.ynjzjgcx.com/prod-api/mohurd-pub/dataServ/findBaseEntDpPage"

    verify_params = {
        "pageNum": page,
        "pageSize": 10,
        "certificateType": "",
        "name": "",
        "slideId": slideId,
        "key": "query",
        "width": distance
    }

    verify_params_data = execjs.compile(js_code).call("get_verify_params",
                                                      json.dumps(verify_params, separators=(',', ':')))
    data_params = {
        "params": verify_params_data
    }

    resp = requests.post(verify_url, headers=headers, json=data_params)
    return resp.json()


# 主程序
success_pages = 0
failed_pages = 0
failed_pages_list = []  # 记录失败的页码

for page in range(1, 11):
    print(f'========>第{page}页开始抓取数据')

    max_attempts = 3
    success = False

    for attempt in range(max_attempts):
        print(f"第{attempt + 1}次尝试...")

        # 为每一页重新获取验证码
        slideId, smallImage, bigImage, yHeight, timestamp = get_slide_info()
        print(f"slideId: {slideId}, yHeight: {yHeight}")

        # 识别滑块距离
        distance = get_slide_distance_combined(smallImage, bigImage, yHeight)

        if distance is None:
            print("距离识别失败，继续尝试...")
            time.sleep(1)
            continue

        # 获取数据
        try:
            result = get_page_data(page, slideId, distance)

            if result.get('code') == 200:
                records = result['data']['records']
                for record in records:
                    name = record['name']
                    creditCode = record['creditCode']
                    address = record['address']
                    print("企业名称", name, "统一社会信用代码", creditCode, "企业注册地", address, sep="\t")
                print(f'第{page}页数据抓取完毕')
                success = True
                success_pages += 1
                break
            else:
                print(f"第{page}页第{attempt + 1}次尝试失败: {result.get('msg')}")
                # 保存失败的图片用于分析
                with open(f"fail_small_{page}_{attempt}.png", "wb") as f:
                    f.write(base64.b64decode(smallImage))
                with open(f"fail_big_{page}_{attempt}.png", "wb") as f:
                    f.write(base64.b64decode(bigImage))

        except Exception as e:
            print(f"第{page}页第{attempt + 1}次尝试发生错误: {e}")

        time.sleep(random.uniform(2, 4))

    if not success:
        print(f"第{page}页所有尝试都失败")
        failed_pages += 1
        failed_pages_list.append(page)

    print(f'第{page}页处理完毕')
    print('-' * 50)

print('--------全部数据抓取完毕-------')
print(f'成功页数: {success_pages}, 失败页数: {failed_pages}')

# 如果有失败的页面，提供重试选项
if failed_pages_list:
    print(f"失败的页码: {failed_pages_list}")
    retry = input("是否要重试失败的页面？(y/n): ")
    if retry.lower() == 'y':
        for page in failed_pages_list:
            print(f'========>重试第{page}页')
            max_attempts = 3
            success = False

            for attempt in range(max_attempts):
                print(f"第{attempt + 1}次尝试...")

                slideId, smallImage, bigImage, yHeight, timestamp = get_slide_info()
                print(f"slideId: {slideId}, yHeight: {yHeight}")

                distance = get_slide_distance_combined(smallImage, bigImage, yHeight)

                if distance is None:
                    print("距离识别失败，继续尝试...")
                    time.sleep(1)
                    continue

                try:
                    result = get_page_data(page, slideId, distance)

                    if result.get('code') == 200:
                        records = result['data']['records']
                        for record in records:
                            name = record['name']
                            creditCode = record['creditCode']
                            address = record['address']
                            print("企业名称", name, "统一社会信用代码", creditCode, "企业注册地", address, sep="\t")
                        print(f'第{page}页数据抓取完毕')
                        success = True
                        success_pages += 1
                        failed_pages -= 1
                        break
                    else:
                        print(f"第{page}页第{attempt + 1}次尝试失败: {result.get('msg')}")

                except Exception as e:
                    print(f"第{page}页第{attempt + 1}次尝试发生错误: {e}")

                time.sleep(random.uniform(2, 4))

            if not success:
                print(f"第{page}页重试仍然失败")

            print(f'第{page}页重试完毕')
            print('-' * 50)

print('--------最终结果--------')
print(f'总成功页数: {success_pages}, 总失败页数: {failed_pages}')