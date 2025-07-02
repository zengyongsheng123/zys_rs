//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：test.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/3/29 10:17
 *****/
const { get_cookie } = require('./rs_mains2.js');
const axios = require('axios');

// 生成动态 Cookie
const generateCookies = (rs_cookie) => {
  try {
    const fullCookie = get_cookie();
    const cookiePair = fullCookie.split(';')[0].split('=');
    const rs_ck2 = { [cookiePair[0].trim()]: cookiePair[1].trim() };

    console.debug("[2]第二次生成的cookies值=====>", rs_ck2);

    // 合并 Cookie
    const rs_cookie2 = { ...rs_cookie, ...rs_ck2 };
    console.debug("[2]最终提交请求的cookies=====>", rs_cookie2);

    return rs_cookie2;
  } catch (error) {
    console.error("Cookie生成失败:", error.stack);
    throw error;
  }
};

// 发送验证请求
const postRequest = async (rs_cookie) => {
  const headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "Cache-Control": "no-cache",
    "ClientTag": "OUTNET_BROWSE",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "CurrentRoute": "/outNet",
    "Intercept-Headers": "SKIP",
    "Origin": "https://pmos.ah.sgcc.com.cn:20080",
    "Pragma": "no-cache",
    "Referer": "https://pmos.ah.sgcc.com.cn:20080/",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0",
    "X-Ticket": "undefined",
    "X-Token": "null",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
  };

  const params = {
    // "a3KfuFO3": "03ZNrxqlqWlo6vbHHoGL2kwq.Tbeyxib9Srp8ibROP8LXRmkFex4SM.NY.2h5GxsO5tNpRzglW1cgIkisUpurfQlHWQg8q3YApQpEhlq053XgZnxTeKNrUa"
  };

  const data = {
    data: {
      marketName: "",
      newMarketCode: "",
      newUrl: "",
      oldUrl: ""
    },
    pageInfo: {
      pageSizes1: ["20", "50", "100", "200", "500", "1000"],
      pageSizes: [20, 50, 100, 200, 500, 1000],
      pageSize: 100,
      pageNum: 1
    }
  };

  try {
    const response = await axios.post(
      "https://pmos.ah.sgcc.com.cn:20080/px-common-authority/marketMapping/selectByCondition",
      JSON.stringify(data).replace(/,\s*/g, ','), // 等效 Python 的 separators=(',', ':')
      {
        headers: headers,
        params: params,
        withCredentials: true,
        transformRequest: [data => data], // 禁止 axios 自动转换数据格式
        responseType: 'text',
        // 手动处理 Cookie
        headers: {
          ...headers,
          Cookie: Object.entries(rs_cookie)
            .map(([k, v]) => `${k}=${v}`)
            .join('; ')
        }
      }
    );

    console.success("[2]请求成功, 状态码=====>", response.status);
    console.success("[2]响应内容=====>", response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("[2]请求失败=====>", {
        status: error.response.status,
        headers: error.response.headers,
        data: error.response.data.slice(0, 200) + '...'
      });
    } else {
      console.error("[2]网络错误:", error.message);
    }
    throw error;
  }
};

// 使用示例
(async () => {
  try {
    // 假设已获取初始 cookie（rs_cookie）
    const rs_cookie = { /* 初始 cookie 值 */ };

    // 生成第二阶段 Cookie
    const rs_cookie2 = generateCookies(rs_cookie);

    // 发送请求
    await postRequest(rs_cookie2);
  } catch (error) {
    // 统一错误处理
    process.exit(1);
  }
})();