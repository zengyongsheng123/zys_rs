//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：Main.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/3/28 22:46
 *****/

const axios = require('axios');
const { parse } = require('node-html-parser');
const fs = require('fs');
const { execSync } = require('child_process');
const tough = require('tough-cookie');
const { CookieJar } = require('tough-cookie');

// 配置axios的cookie处理
// const cookieJar = new tough.CookieJar();
// const axiosInstance = axios.create({
//     jar: cookieJar,
//     withCredentials: true,
//     headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0'
//     }
// });

async function main() {
    try {
        // 第一阶段请求
        const firstResponse = await axiosInstance.get('https://pmos.ah.sgcc.com.cn:20080/');
        console.log('第一次请求Cookies:', firstResponse.headers['set-cookie']);

        const root = parse(firstResponse.data);

        // 解析meta标签
        const metaTag = root.querySelector('meta[id]');
        const metaContent = metaTag.getAttribute('content');
        console.log('Meta标签Content:', metaContent);

        // 解析外联脚本
        const scriptTag = root.querySelector('script[src][r="m"]');
        const scriptUrl = `https://pmos.ah.sgcc.com.cn:20080${scriptTag.getAttribute('src')}`;
        console.log('外联脚本URL:', scriptUrl);

        // 下载脚本文件
        const [tsCodeResponse, funcCodeResponse] = await Promise.all([
            axios.get(firstResponse.request.res.responseUrl),
            axios.get(scriptUrl)
        ]);

        fs.writeFileSync('rs_ts.js', tsCodeResponse.data);
        fs.writeFileSync('rs_func.js', funcCodeResponse.data);
        console.log('JS文件保存成功');

        // 执行生成的Cookie逻辑
        const rs5Cookie = execSync('node rs_mains2.js').toString().trim();
        const [cookieName, cookieValue] = rs5Cookie.split(';')[0].split('=');
        cookieJar.setCookieSync(`${cookieName}=${cookieValue}`, 'https://pmos.ah.sgcc.com.cn:20080');
        console.log('第二阶段Cookie:', { [cookieName]: cookieValue });

        // 第二阶段请求
        const timestamp = Date.now();
        const secondResponse = await axiosInstance.get(
            `https://pmos.ah.sgcc.com.cn:20080/?2XHa1niT8Vwo=${timestamp}`,
            {
                headers: {
                    'Referer': 'https://pmos.ah.sgcc.com.cn:20080/',
                    'Sec-Fetch-Dest': 'document'
                }
            }
        );
        console.log('第二次响应状态:', secondResponse.status);
        console.log('第二次响应Cookies:', secondResponse.headers['set-cookie']);

        // 处理第二个页面的逻辑
        const secondPage = parse(secondResponse.data);
        const secondScriptTag = secondPage.querySelector('script[src][r="m"]');
        const secondScriptUrl = `https://pmos.ah.sgcc.com.cn:20080${secondScriptTag.getAttribute('src')}`;

        // 下载第二个脚本
        const secondFuncCode = await axios.get(secondScriptUrl);
        fs.writeFileSync('rs_func_2.js', secondFuncCode.data);

        // 生成第二个Cookie
        const rs5Cookie2 = execSync('node rs_mains2.js').toString().trim();
        const [cookieName2, cookieValue2] = rs5Cookie2.split(';')[0].split('=');
        cookieJar.setCookieSync(`${cookieName2}=${cookieValue2}`, 'https://pmos.ah.sgcc.com.cn:20080');

        // 最终POST请求
        const postData = {
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

        const finalResponse = await axiosInstance.post(
            'https://pmos.ah.sgcc.com.cn:20080/px-common-authority/marketMapping/selectByCondition',
            postData,
            {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'ClientTag': 'OUTNET_BROWSE',
                    'CurrentRoute': '/outNet'
                }
            }
        );

        console.log('最终响应数据:', finalResponse.data);

    } catch (error) {
        console.error('请求失败:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
        }
    }
}

// main();



// 配置全局headers模板
const baseHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
    'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"'
};

const cookieJar = new tough.CookieJar();
const axiosInstance = axios.create({
    jar: cookieJar,
    withCredentials: true,
    headers: baseHeaders
});

async function makeRequest() {
    try {
        // 第一阶段请求
        const firstResponse = await axiosInstance.get('https://pmos.ah.sgcc.com.cn:20080/');
        console.log('[1] 初始Cookies:', cookieJar.getCookieStringSync(firstResponse.config.url));

        const root = parse(firstResponse.data);
                // 解析meta标签
        const metaTag = root.querySelector('meta[id]');
        const metaContent = metaTag.getAttribute('content');
        console.log('Meta标签Content:', metaContent);

        // 解析外联脚本
        const scriptTag = root.querySelector('script[src][r="m"]');
        const scriptUrl = `https://pmos.ah.sgcc.com.cn:20080${scriptTag.getAttribute('src')}`;
        console.log('外联脚本URL:', scriptUrl);

        // 下载脚本文件
        const [tsCodeResponse, funcCodeResponse] = await Promise.all([
            axios.get(firstResponse.request.res.responseUrl),
            axios.get(scriptUrl)
        ]);

        fs.writeFileSync('rs_ts.js', tsCodeResponse.data);
        fs.writeFileSync('rs_func.js', funcCodeResponse.data);
        console.log('JS文件保存成功');

        // 执行生成的Cookie逻辑
        const rs5Cookie = execSync('node rs_mains2.js').toString().trim();
        const [cookieName, cookieValue] = rs5Cookie.split(';')[0].split('=');
        cookieJar.setCookieSync(`${cookieName}=${cookieValue}`, 'https://pmos.ah.sgcc.com.cn:20080');
        console.log('第二阶段Cookie:', { [cookieName]: cookieValue });


        // 第二阶段请求（重点修复headers）
        const timestamp = Date.now();
        const secondResponse = await axiosInstance.get(
            `https://pmos.ah.sgcc.com.cn:20080/?2XHa1niT8Vwo=${timestamp}`,
            {
                headers: {
                    ...baseHeaders, // 继承基础headers
                    'Referer': 'https://pmos.ah.sgcc.com.cn:20080/',
                    'Sec-Fetch-Dest': 'document'
                }
            }
        );

        // 最终POST请求（完整headers配置）
        const postHeaders = {
            ...baseHeaders,
            'Accept': 'application/json, text/plain, */*',
            'ClientTag': 'OUTNET_BROWSE',
            'Content-Type': 'application/json;charset=UTF-8',
            'CurrentRoute': '/outNet',
            'Intercept-Headers': 'SKIP',
            'Origin': 'https://pmos.ah.sgcc.com.cn:20080',
            'Referer': 'https://pmos.ah.sgcc.com.cn:20080/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'X-Ticket': 'undefined',
            'X-Token': 'null'
        };

        const postData = {
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
        };;

        const finalResponse = await axiosInstance.post(
            'https://pmos.ah.sgcc.com.cn:20080/px-common-authority/marketMapping/selectByCondition',
            postData,
            {
                headers: postHeaders,
                params: {
                    'a3KfuFO3': '03ZNrxqlqWlo6vbHHoGL2kwq.Tbeyxib9Srp8ibROP8LXRmkFex4SM.NY.2h5GxsO5tNpRzglW1cgIkisUpurfQlHWQg8q3YApQpEhlq053XgZnxTeKNrUa'
                }
            }
        );

        console.log('最终响应:', JSON.stringify(finalResponse.data, null, 2));

    } catch (error) {
        console.error('请求异常:', error.message);
        if (error.response) {
            console.log('失败响应头:', error.response.headers);
            console.log('失败响应状态:', error.response.status);
            console.log('失败响应数据:', error.response.data);
        }
    }
}

// makeRequest();