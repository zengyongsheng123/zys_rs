# -*- coding: utf-8 -*-
# @Time    : 2024/12/22 20:58
# @Author  : 顾安
# @File    : 5.接口监听.py
import DrissionPage
from DrissionPage.common import By
from DrissionPage import ChromiumPage

# 网站地址: http://www.ccgp-hunan.gov.cn/page/content/more.jsp?column_code=2

page = ChromiumPage()

# 监听api数据接口(接口监听一定先要监听之后才是请求)
page.listen.start('/mvc/getContentList.do')

# 监听后再去访问网站
page.get("http://www.ccgp-hunan.gov.cn/page/content/more.jsp?column_code=2")

# 打印监听到的数据（steps返回的是一个生成器对象）
# gen_obj = page.listen.steps()

# for item in gen_obj:
# print(item)  # item: 返回的是DataPacket数据包对象
# print(item.response.body)


# count: 监听次数
for item in page.listen.steps(count=4):
    print('数据集:', item.response.body)

    # 定位下一页按钮
    next_element_flag = page.ele((By.LINK_TEXT, '下一页'), timeout=3)
    print('标签:', next_element_flag)

    if next_element_flag:
        next_element_flag.click()
    else:
        print('没有下一页了...')
        page.quit()
        break

"""
drissionpage监听api:
    
    先监听, 后请求
        page.listen.start('api地址')
        
    返回生成器对象, 如果对生成器对象进行迭代获取则可以拿到数据包对象
        page.listen.steps()
        
    如果获取到了数据包对象之后可以通过response.body返回接口数据
    
    可以设置监听次数
"""
