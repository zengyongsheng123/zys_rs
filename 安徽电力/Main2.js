//!/usr/bin/env python
// -*- coding: UTF-8 -*-
/*****
 Project：TestProject
 File：Main2.py
 IDE：PyCharm
 Author：南宫啸天
 Date：2025/3/28 22:58
 *****/

const axios = require('axios');
const { CookieJar } = require('tough-cookie');
const chalk = require('chalk');

// 配置日志颜色
const logger = {
    success: (...msg) => console.log(chalk.green('✔'), ...msg),
    error: (...msg) => console.log(chalk.red('✖'), ...msg),
    info: (...msg) => console.log(chalk.blue('ℹ'), ...msg),
    warn: (...msg) => console.log(chalk.yellow('⚠'), ...msg)
};

// 创建请求实例
const cookieJar = new CookieJar();
const apiClient = axios.create({
    baseURL: 'https://pmos.ah.sgcc.com.cn:20080',
    jar: cookieJar,
    withCredentials: true,
    timeout: 10000,
    validateStatus: (status) => status === 412  // 重点修改：412视为成功
});

// 请求拦截器
apiClient.interceptors.request.use(config => {
    logger.info(`请求：${chalk.bold(config.method.toUpperCase())} ${config.url}`);
    logger.info(`Cookies：${chalk.gray(cookieJar.getCookieStringSync(config.url))}`);
    return config;
});

// 响应拦截器
apiClient.interceptors.response.use(
    response => {
        logger.success(`业务成功 ${chalk.gray(`状态码:${response.status}`)}`);
        return Promise.resolve(response.data);
    },
    error => {
        const status = error.response?.status || '无响应';
        const url = error.config?.url || '未知地址';

        if (error.code) {
            logger.error(`网络错误 ${chalk.gray(error.code)}`, error.message);
        } else if (error.response) {
            logger.warn(`业务异常 ${chalk.yellow(status)} @ ${url}`);
        }

        return Promise.reject(error);
    }
);

// 主请求函数
async function fetchData() {
    try {
        // 第一阶段：获取初始页面
        const firstRes = await apiClient.get('/');
        logger.info('第一阶段完成', firstRes.data?.slice(0, 50) + '...');

        // 第二阶段：带时间戳的请求
        const timestamp = Date.now();
        const secondRes = await apiClient.get(`/?2XHa1niT8Vwo=${timestamp}`);
        logger.success('第二阶段数据长度：', secondRes.data?.length || 0);

        // 最终POST请求（示例）
        const finalRes = await apiClient.post('/px-common-authority/marketMapping/selectByCondition', {
            data: { search: 'test' },
            pageInfo: { pageSize: 100 }
        });

        return finalRes;
    } catch (err) {
        logger.error('主流程异常：', err.message);
        throw err;
    }
}

// 执行示例
fetchData()
    .then(data => logger.success('最终结果：', data))
    .catch(() => logger.error(chalk.bgRed(' 请求流程失败 ')));