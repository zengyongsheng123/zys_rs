const axios = require('axios');
const fs = require('fs');
const {parse} = require('cookie');
const {URL} = require('url');

// 增强日志系统
const logger = {
    success: (msg, param) => console.log('\x1b[32m✔\x1b[0m', msg.replace('{}', param)),
    debug: (msg, param) => console.log('\x1b[34mℹ\x1b[0m', msg.replace('{}', param)),
    warning: msg => console.log('\x1b[33m⚠\x1b[0m', msg),
    error: (msg, param) => console.log('\x1b[31m✖\x1b[0m', msg.replace('{}', param))
};

(async () => {
    try {
        // 第一阶段请求：获取初始 Cookie
        const headers = {
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
};
        const baseUrl = "https://pmos.ah.sgcc.com.cn:20080/";
        const response = await axios.get(baseUrl, {
            headers,
            maxRedirects: 0,
            validateStatus: status => [200, 412].includes(status) // 允许 200 和 412 状态码
        });
        // 处理 Cookie
        const cookies = {};
        if (response.headers['set-cookie']) {
            response.headers['set-cookie'].forEach(cookie => {
                const parsed = parse(cookie.split(';')[0]);
                Object.assign(cookies, parsed);
            });
        }
        logger.success("瑞数cookies1======>{}", JSON.stringify(cookies));
        // 正则匹配关键内容
        const html = response.data;
        const metaContent = html.match(/<meta id="(.*?)" content="(.*?)"/);
        const tsScript = html.match(/<script type="text\/javascript" r='m'>([\s\S]*?)<\/script>/);
        const scriptPath = html.match(/<script type="text\/javascript" charset="utf-8" src="(.*?)" r='m'><\/script>/);

        // 验证匹配结果
        if (!metaContent || !tsScript || !scriptPath) {
            throw new Error('关键HTML元素匹配失败');
        }
        logger.debug("meta标签的content的值=====>{}", metaContent[2]);
        const [xTicket, xToken] = metaContent[2].split(';').map(pair => pair.split('=')[1]);
        // 构建完整脚本 URL
        const funcUrl = new URL(scriptPath[1], baseUrl).href;
        logger.debug("外联自执行方法=====>{}", funcUrl);
        // 第二阶段请求：获取外联脚本（携带 Cookie）
        const scriptResponse = await axios.get(funcUrl, {
            headers: {
                ...headers,
                Cookie: Object.entries(cookies).map(([k, v]) => `${k}=${v}`).join('; ')
            },
            validateStatus: () => true // 接受所有状态码
        });
        // 写入文件（同步操作）
        fs.writeFileSync('rs_ts.js', tsScript[1]);
        fs.writeFileSync('rs_func.js', scriptResponse.data);
        logger.warning("js文件下载本地成功");

        // 读取并执行瑞数 JS 生成 Cookie
        var {get_cookie} = require('./rs_main.js');
        // 获取并解析 Cookie
        const rawCookie = get_cookie().split(';')[0];
        const [key, value] = rawCookie.split('=');
        const rsCk2 = {[key.trim()]: value.trim()};
        logger.debug("第二次生成的cookies值=====>{}", JSON.stringify(rsCk2));
        // 合并 Cookies
        const rsCookie = {...cookies, ...rsCk2};
        logger.debug("最终提交请求的cookies=====>{}", JSON.stringify(rsCookie));
        // 发送第二阶段请求
        const timestamp = Date.now();
        logger.debug("请求时间戳=====>{}", timestamp);
        const phase2Url = `https://pmos.ah.sgcc.com.cn:20080/?2XHa1niT8Vwo=${timestamp}`;
        const phase2Response = await axios.get(phase2Url, {
            headers: {
                ...headers,
                Cookie: Object.entries(rsCookie).map(([k, v]) => `${k}=${v}`).join('; ')
            },
            validateStatus: () => true // 允许所有状态码
        });
        // 处理响应
        if (phase2Response.status !== 200) {
            logger.error("请求失败=====>{}", phase2Response.status);
            return;
        }
        // 解析新 Cookie
        const alteonp = {};
        if (phase2Response.headers['set-cookie']) {
            phase2Response.headers['set-cookie'].forEach(cookie => {
                const parsed = parse(cookie.split(';')[0]);
                Object.assign(alteonp, parsed);
            });
        }
        logger.success("请求成功,状态码=====>{}", phase2Response.status);
        logger.success("请求成功,响应ck=====>{}", JSON.stringify(alteonp));
        // 正则匹配关键内容
        const _html = phase2Response.data;
        const metaMatch = _html.match(/<meta id="(.*?)" content="(.*?)"/);
        const tsScriptMatch = _html.match(/<script type="text\/javascript" r='m'>([\s\S]*?)<\/script>/);
        const scriptPathMatch = _html.match(/<script type="text\/javascript" charset="utf-8" src="(.*?)" r='m'><\/script>/);
        if (!metaMatch || !tsScriptMatch || !scriptPathMatch) {
            throw new Error('第二阶段关键HTML元素匹配失败');
        }
        logger.debug("meta标签的content的值=====>{}", metaMatch[2]);
        // 构建完整脚本 URL
        const funcUrl2 = new URL(scriptPathMatch[1], baseUrl).href;
        logger.debug("外联自执行方法=====>{}", funcUrl2);
        // 下载新脚本（携带最新 Cookie）
        const scriptResponse2 = await axios.get(funcUrl2, {
            headers: {
                ...headers,
                Cookie: Object.entries({...rsCookie, ...alteonp})
                    .map(([k, v]) => `${k}=${v}`).join('; ')
            },
            validateStatus: () => true
        });
        // 保存文件
        fs.writeFileSync('rs_ts_2.js', tsScriptMatch[1]);
        fs.writeFileSync('rs_func_2.js', scriptResponse2.data);
        logger.warning("js文件下载本地成功");
        // 生成第三阶段 Cookie
        var {get_cookie} = require('./rs_mains2.js');
        const [keys, values] = get_cookie().split(';')[0].split('=');
        const rs_ck2 = {[keys.trim()]: values.trim()}
        console.debug("[2]第二次生成的cookies值=====>", rs_ck2);
                // 合并 Cookie
                // 正确合并顺序（优先使用新值）
        const rs_cookie2 = {
          ...cookies,     // 初始 Cookie
          ...alteonp,     // 第二阶段 Cookie
          ...rs_ck2       // 第三阶段 Cookie（优先级最高）
        };
        console.debug("[2]最终提交请求的cookies=====>", JSON.stringify(rs_cookie2));
        // 发送请求
        const _headers = {
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
            "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Microsoft Edge\";v=\"134\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\""
        };
                // 注入到请求头
        _headers["X-Ticket"] = xTicket || "undefined";  // 不能直接写死 "undefined"
        _headers["X-Token"] = xToken || "null";         // 不能直接写死 "null"
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
                JSON.stringify(data).replace(/\s+/g, ''),
                {
                    params: params,
                    // withCredentials: true,
                    transformRequest: [data => data], // 禁止 axios 自动转换数据格式
                    responseType: 'json',
                    headers: {
                        ..._headers,
                        Cookie: Object.entries(rs_cookie2).map(([k, v]) => `${k}=${v}`).join('; ')
                    },
                }
            );
            logger.success("[2]响应=====>",response);
            logger.success("[2]请求成功, 状态码=====>", response.status);
            logger.success("[2]响应内容=====>", response.data);
        } catch (error) {
            if (error.response) {
                logger.error("[2]请求失败=====>", {
                    status: error.response.status,
                    headers: error.response.headers,
                    data: error.response.data.slice(0, 200) + '...'
                });
            } else {
                logger.error("[2]网络错误:", error.message);
            }
            throw error;
        }
    } catch (error) {
    if (error.response) {
        console.error('Full Error Response:', {
            status: error.response.status,
            headers: error.response.headers,
            data: error.response.data,
            config: error.response.config
        });
    }
}
})();