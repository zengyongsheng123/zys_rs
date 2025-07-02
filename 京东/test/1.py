import execjs
import time
import asyncio


# 初始化 JS 环境
def init_js_context():
    with open('jd_sign.js', 'r', encoding='utf-8') as f:
        js_code = f.read()

    # 使用 Node.js 运行时（需安装 node）
    return execjs.get('node').compile(js_code)


ctx = init_js_context()


# 异步获取签名
async def get_signature(
        page=1,
        pagesize=25,
        area="19_1607_0_0",
        source="pc-home",
        timestamp=None
):
    try:
        timestamp = timestamp or int(time.time() * 1000)
        return await ctx.call(
            'getH5stSign',
            page,
            pagesize,
            area,
            source,
            timestamp
        )
    except Exception as e:
        print(f"签名失败: {str(e)}")
        return None


# 使用示例
async def main():
    sign_data = await get_signature()
    if sign_data:
        print(f"H5ST签名: {sign_data['h5st']}")
        print(f"签名长度: {sign_data['h5st_length']}")


if __name__ == "__main__":
    asyncio.run(main())