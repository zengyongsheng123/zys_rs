import json
import urllib
from urllib.parse import urlencode, parse_qs
import urllib3
from playwright.sync_api import sync_playwright
import time
import requests
import random
import os

urllib3.disable_warnings()


def get_random_user_agent():
    return "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/{}.{}.{} (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1".format(
        random.randint(600, 606), random.randint(1, 5), random.randint(5, 15))


user = 'z60089016'
psw = 'Aadminzys@123456'
proxies = {'http': f'http://{user}:{psw}@proxycn2.huawei.com:8080/',
           'https': f'http://{user}:{psw}@proxycn2.huawei.com:8080/'}


def handle_route(route):
    route_url = route.request.url
    if route_url and "bdms-1.0.0.44.js" in route_url:
        local_js_path = "./source.js"
        if os.path.exists(local_js_path):
            route.fulfill(status=200, path=local_js_path)
            print("成功替换bdms文件")
        else:
            print("本地文件不存在，继续原始请求")
            route.continue_()
    else:
        route.continue_()


def extract_msToken_from_params(params_str):
    """从参数字符串中提取msToken"""
    try:
        params_dict = parse_qs(params_str)
        ms_tokens = params_dict.get('msToken', [])
        return ms_tokens[0] if ms_tokens else None
    except Exception as e:
        print(f"解析msToken时出错: {e}")
        return None


def main():
    user_agent = get_random_user_agent()
    print(f"User-Agent: {user_agent}")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.route("**/*", handle_route)

        # 访问首页
        page.goto("https://jimeng.jianying.com/ai-tool/home?type=image")
        page.wait_for_timeout(5000)

        # 检查a_bogus函数是否已加载
        is_loaded = page.evaluate('''() => {
            return typeof window.a_bogus !== 'undefined' && 
                   typeof window.a_bogus._u !== 'undefined' &&
                   typeof window.a_bogus._v !== 'undefined';
        }''')

        if not is_loaded:
            print("a_bogus函数未正确加载，重新加载页面...")
            page.reload()
            page.wait_for_timeout(5000)

        def get_a_bogus(params_str, data_str):
            """生成a_bogus参数"""
            try:
                result = page.evaluate('''([params, data, ua]) => {
                    const argumentsArray = [0, 1, 0, params, data, ua];
                    return window.a_bogus._u(
                        window.a_bogus._v[0], 
                        argumentsArray, 
                        window.a_bogus._v[1], 
                        window.a_bogus._v[2], 
                        null
                    );
                }''', [params_str, data_str, user_agent])
                return result
            except Exception as e:
                print(f"生成a_bogus时出错: {e}")
                return None

        # 初始化翻页参数
        offset = -20
        has_more = True
        page_num = 1
        total_items = 0

        while has_more:
            print(f"\n=== 正在爬取第 {page_num} 页，偏移量: {offset} ===")

            # 构建查询参数
            query_params = [
                ("aid", "513695"),
                ("web_version", "6.6.0"),
                ("da_version", "3.2.8"),
                ("aigc_features", "app_lip_sync"),
                ("msToken",
                 "J06fFJuJLCZ2KVDrEqcM74y6fdflxbcsp0NQCPbe1olvxd_2bBiVyIixI8lJhNC-a70Tsrw--T6G9dVY81pWeDtsX2fg7_nOuGbQXB9pTGIlmDrzwMOOEIKZSQLNAAs%3D")
            ]
            params_str = urlencode(query_params)

            # 提取msToken
            msToken = extract_msToken_from_params(params_str)
            if not msToken:
                print("无法获取msToken，跳过本次请求")
                break

            # 构建请求体
            data = {
                "count": 40,
                "filter": {
                    "work_type_list": [
                        "video",
                        "image",
                        "canvas"
                    ]
                },
                "offset": offset,
                "image_info": {
                    "width": 2048,
                    "height": 2048,
                    "format": "webp",
                    "image_scene_list": [
                        {
                            "scene": "smart_crop",
                            "width": 240,
                            "height": 240,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:240-h:240"
                        },
                        {
                            "scene": "smart_crop",
                            "width": 320,
                            "height": 320,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:320-h:320"
                        },
                        {
                            "scene": "smart_crop",
                            "width": 480,
                            "height": 480,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:480-h:480"
                        },
                        {
                            "scene": "smart_crop",
                            "width": 480,
                            "height": 320,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:480-h:320"
                        },
                        {
                            "scene": "smart_crop",
                            "width": 240,
                            "height": 160,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:240-h:160"
                        },
                        {
                            "scene": "smart_crop",
                            "width": 160,
                            "height": 213,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:160-h:213"
                        },
                        {
                            "scene": "smart_crop",
                            "width": 320,
                            "height": 427,
                            "format": "webp",
                            "uniq_key": "smart_crop-w:320-h:427"
                        },
                        {
                            "scene": "loss",
                            "width": 1080,
                            "height": 1080,
                            "format": "webp",
                            "uniq_key": "1080"
                        },
                        {
                            "scene": "loss",
                            "width": 900,
                            "height": 900,
                            "format": "webp",
                            "uniq_key": "900"
                        },
                        {
                            "scene": "loss",
                            "width": 720,
                            "height": 720,
                            "format": "webp",
                            "uniq_key": "720"
                        },
                        {
                            "scene": "loss",
                            "width": 480,
                            "height": 480,
                            "format": "webp",
                            "uniq_key": "480"
                        },
                        {
                            "scene": "loss",
                            "width": 360,
                            "height": 360,
                            "format": "webp",
                            "uniq_key": "360"
                        },
                        {
                            "scene": "normal",
                            "width": 2048,
                            "height": 2048,
                            "format": "webp",
                            "uniq_key": "2048"
                        }
                    ]
                },
                "category_id": 11222,
                "feed_refer": "feed_loadmore"
            }
            str_data = json.dumps(data, separators=(',', ':'))

            # 生成a_bogus参数
            a_bogus = get_a_bogus(params_str, str_data)
            if not a_bogus:
                print("a_bogus生成失败，跳过本次请求")
                break

            # 构建请求URL
            index_url = f'https://jimeng.jianying.com/mweb/v1/get_explore?{params_str}&a_bogus={a_bogus}'

            try:
                response = requests.post(index_url, data=str_data, proxies=proxies,
                                         verify=False, headers={
                                                        'User-Agent': user_agent,
                                                        'Content-Type': 'application/json',
                                                        'Referer': 'https://jimeng.jianying.com/ai-tool/home',
                                                        'Origin': 'https://jimeng.jianying.com'
                                                    })

                if response.status_code == 200:
                    result = response.json()
                    if result['ret'] == '0':
                        items = result['data']['item_list']
                        has_more = result['data']['has_more']
                        next_offset = result['data']['next_offset']

                        print(f"成功获取 {len(items)} 条数据")
                        print(f"是否有更多数据: {has_more}")
                        print(f"下一个偏移量: {next_offset}")

                        total_items += len(items)

                        # 更新偏移量用于下一页
                        offset = next_offset

                        # 这里可以保存或处理数据
                        # 例如：save_data(items, page_num)
                        for item in items:
                            with open(f'jimeng_发现_page_{page_num}.txt', 'a', encoding='utf-8') as f:
                                f.write(json.dumps(item, ensure_ascii=False) + '\n')
                                print(f"数据已保存到 jimeng_发现_page_{page_num}.txt")

                    else:
                        print(f"API返回错误: {result['errmsg']}")
                        break
                else:
                    print(f"请求失败，状态码: {response.status_code}")
                    break

            except Exception as e:
                print(f"请求异常: {e}")
                break

            # 增加页面计数
            page_num += 1

            # 添加随机延迟，避免请求过于频繁
            time.sleep(random.uniform(1, 3))

        print(f"\n=== 爬取完成 ===")
        print(f"总共爬取 {page_num - 1} 页")
        print(f"总共获取 {total_items} 条数据")

        browser.close()


if __name__ == "__main__":
    main()
