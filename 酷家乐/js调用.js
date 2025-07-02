const { JSDOM } = require('jsdom');

// Set up jsdom with full DOM and event support
const dom = new JSDOM(
  `<!DOCTYPE html><html><body><div id="myElement" style="width: 100px; height: 100px;"></div></body></html>`,
  { resources: 'usable', runScripts: 'dangerously' }
);
const window = dom.window;
const document = window.document;
global.window = window;
global.document = document;

function getOrSetDimension(element, value, extra, dimension) {
    const includeMargin = arguments.length > 0 && (typeof value !== 'boolean');
    const property = includeMargin || (value === true || extra === true) ? 'margin' : 'border';

    if (element === window) {
        return window.document.documentElement['client' + dimension];
    }

    if (element.nodeType === 9) {
        const docElem = element.documentElement;
        return Math.max(
            element.body['scroll' + dimension],
            docElem['scroll' + dimension],
            element.body['offset' + dimension],
            docElem['offset' + dimension],
            docElem['client' + dimension]
        );
    }

    if (value === undefined) {
        const style = window.getComputedStyle(element);
        if (property === 'margin') {
            return parseFloat(style['margin' + dimension.toLowerCase()]);
        } else {
            return parseFloat(style['border' + dimension + 'Width']);
        }
    } else {
        if (property === 'margin') {
            element.style['margin' + dimension.toLowerCase()] = typeof value === 'number' ? value + 'px' : value;
        } else {
            element.style['border' + dimension + 'Width'] = typeof value === 'number' ? value + 'px' : value;
        }
        return element;
    }
}

function getWidth(element) {
    return getOrSetDimension(element, false, false, 'Width');
}

function getHeight(element) {
    return getOrSetDimension(element, false, false, 'Height');
}

function setWidth(element, value) {
    return getOrSetDimension(element, value, false, 'Width');
}

function setHeight(element, value) {
    return getOrSetDimension(element, value, false, 'Height');
}

// Ensure dimension is set dynamically
let dimension = 'Width'; // Can be 'Width' or 'Height', set dynamically if needed

// Manually get dimensions for a specific element
const targetElement = document.querySelector('#myElement'); // 替换成你的元素选择器
if (targetElement) {
    console.log('当前宽度:', getWidth(targetElement));
    console.log('当前高度:', getHeight(targetElement));
} else {
    console.log('目标元素未找到，请检查选择器！');
}

// Bind to window resize to keep values live
window.addEventListener('resize', () => {
    if (targetElement) {
        console.log('实时宽度:', getWidth(targetElement));
        console.log('实时高度:', getHeight(targetElement));
    } else {
        console.log('目标元素未找到，请检查选择器！');
    }
});

// Optionally trigger resize for testing
window.dispatchEvent(new window.Event('resize'));