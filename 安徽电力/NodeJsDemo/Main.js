//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：Main.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/3/29 9:49
 *****/

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { CookieJar } = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');

// 使用axios-cookie-jar支持处理cookies
const cookieJar = new CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

// 模拟Python logger的格式化输出
const logger = {
  success: (msg, ...args) => console.log(`\x1b[32m✓ ${formatLog(msg, args)}\x1b[0m`),
  debug: (msg, ...args) => console.debug(`\x1b[36m? ${formatLog(msg, args)}\x1b[0m`),
  warning: (msg, ...args) => console.warn(`\x1b[33m⚠ ${formatLog(msg, args)}\x1b[0m`)
};

function formatLog(msg, args) {
  return msg.replace(/{}/g, () => args.shift());
}

async function main() {
  try {
    // 第一阶段：发送初始请求
    const url = "https://pmos.ah.sgcc.com.cn:20080/";
    const response = await client.get(url, {
      headers: {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
        "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
      }
    });
    if(response.status === 412){
      console.log("响应状态码=====> {}", response.status);
    }
    // 解析响应内容
    const html = response.data;
    logger.success("响应内容=====> {}", response.status);
    logger.success("响应内容=====> {}", html);

    // 提取meta标签
    const metaMatch = html.match(/<meta id="(.*?)" content="(.*?)"/);
    const metaLabelContent = metaMatch ? metaMatch[2] : null;
    logger.debug("meta标签的content的值=====> {}", metaLabelContent);

    // 提取内联脚本
    const tsCodeMatch = html.match(/<script type="text\/javascript" r='m'>(.*?)<\/script>/s);
    const tsCode = tsCodeMatch ? tsCodeMatch[1] : '';

    // 提取外部脚本URL
    const funcCodeMatch = html.match(/<script type="text\/javascript" charset="utf-8" src="(.*?)" r='m'><\/script>/);
    const funcCodePath = funcCodeMatch ? funcCodeMatch[1] : '';
    const funcCodeUrl = new URL(funcCodePath, url).href;
    logger.debug("外联自执行方法=====> {}", funcCodeUrl);

    // 下载并保存JavaScript文件
    const [tsResponse, funcResponse] = await Promise.all([
      axios.get(funcCodeUrl),
      axios.get(funcCodeUrl)
    ]);

    fs.writeFileSync(path.join(__dirname, 'rs_ts.js'), tsCode);
    fs.writeFileSync(path.join(__dirname, 'rs_func.js'), funcResponse.data);
    logger.warning("js文件下载本地成功");


  } catch (error) {
    console.error(`请求失败: ${error.message}`);
    const url = "https://pmos.ah.sgcc.com.cn:20080/";
    // 获取cookies
    const cookies = cookieJar.getCookiesSync(url);
    const rsCookies = cookies.reduce((acc, cookie) => {
      acc[cookie.key] = cookie.value;
      return acc;
    }, {});
    logger.success("瑞数cookies1======> {}", JSON.stringify(rsCookies));


  }
}

// 执行主函数
main();
