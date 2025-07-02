const { JSDOM } = require('jsdom');
const fs = require('fs').promises;
const path = require('path');

// 工厂函数，生成获取宽度或高度的函数
function createDimensionGetter(isWidth, includeMargin) {
    return function(element) {
        const dimension = isWidth ? 'Width' : 'Height';

        // 处理窗口
        if (element.window === element) {
            return element.document.documentElement[`client${dimension}`];
        }

        // 处理文档
        if (element.nodeType === 9) {
            const docElement = element.documentElement;
            return Math.max(
                element.body[`scroll${dimension}`],
                docElement[`scroll${dimension}`],
                element.body[`offset${dimension}`],
                docElement[`offset${dimension}`],
                docElement[`client${dimension}`]
            );
        }

        // 处理普通 DOM 元素
        const style = element.ownerDocument.defaultView.getComputedStyle(element);
        if (includeMargin) {
            const margin1 = parseFloat(style[`margin${isWidth ? 'Left' : 'Top'}`]) || 0;
            const margin2 = parseFloat(style[`margin${isWidth ? 'Right' : 'Bottom'}`]) || 0;
            return (parseFloat(style[dimension.toLowerCase()]) || 0) + margin1 + margin2;
        }
        return parseFloat(style[dimension.toLowerCase()]) || 0;
    };
}

// 创建获取尺寸的函数
const getWidth = createDimensionGetter(true, false);
const getHeight = createDimensionGetter(false, false);
const getWidthWithMargin = createDimensionGetter(true, true);
const getHeightWithMargin = createDimensionGetter(false, true);

// 封装的尺寸获取类
class DimensionGetter {
    constructor(options = {}) {
        this.url = options.url; // 网页 URL
        this.htmlFile = options.htmlFile; // 本地 HTML 文件路径
        this.htmlString = options.htmlString; // 静态 HTML 字符串（备用）
    }

    // 初始化 DOM
    async init() {
        let dom;
        try {
            if (this.url) {
                // 从 URL 加载网页
                dom = await JSDOM.fromURL(this.url, {
                    resources: 'usable',
                    runScripts: 'dangerously', // 运行网页中的 JavaScript
                    pretendToBeVisual: true // 模拟浏览器渲染
                });
            } else if (this.htmlFile) {
                // 从本地 HTML 文件加载
                const html = await fs.readFile(this.htmlFile, 'utf8');
                dom = new JSDOM(html, {
                    resources: 'usable',
                    runScripts: 'dangerously',
                    pretendToBeVisual: true
                });
            } else {
                // 回退到 HTML 字符串或默认空结构
                const html = this.htmlString || '<!DOCTYPE html><div id="box"></div>';
                dom = new JSDOM(html, {
                    resources: 'usable',
                    pretendToBeVisual: true
                });
            }
            this.dom = dom;
            this.window = dom.window;
            this.document = this.window.document;
        } catch (error) {
            throw new Error(`Failed to initialize DOM: ${error.message}`);
        }
    }

    // 获取元素
    getElement(selector) {
        if (!this.document) {
            throw new Error('DOM not initialized. Call init() first.');
        }
        const element = this.document.querySelector(selector);
        if (!element) {
            throw new Error(`Element with selector "${selector}" not found`);
        }
        return element;
    }

    // 获取元素尺寸
    async getSize(selector, includeMargin = false) {
        await this.init();
        const element = this.getElement(selector);
        return {
            width: includeMargin ? getWidthWithMargin(element) : getWidth(element),
            height: includeMargin ? getHeightWithMargin(element) : getHeight(element)
        };
    }

    // 获取窗口尺寸
    async getWindowSize() {
        await this.init();
        return {
            width: getWidth(this.window),
            height: getHeight(this.window)
        };
    }

    // 获取文档尺寸
    async getDocumentSize() {
        await this.init();
        return {
            width: getWidth(this.document),
            height: getHeight(this.document)
        };
    }
}

// 导出模块
module.exports = DimensionGetter;