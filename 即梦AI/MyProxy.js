// ===== 1. 保存原始API =====
const original = {
    console: Object.assign({}, console),
    Object: {
        getPrototypeOf: Object.getOwnPropertyDescriptor(Object, 'getPrototypeOf').value,
        defineProperty: Object.defineProperty,
        getOwnPropertyDescriptors: Object.getOwnPropertyDescriptors,
        setPrototypeOf: Object.setPrototypeOf
    },
    Function: {
        prototype: Function.prototype,
        toString: Function.prototype.toString
    },
    Proxy: Proxy,
    Reflect: Reflect
};

// ===== 2. 日志控制与结果收集 =====
let loggingEnabled = true;
const collectedEnv = {};
const proxyCache = new WeakMap();
const proxyDepthLimit = 10; // Limit proxy nesting depth

function log(...args) {
    if (loggingEnabled) original.console.log("[环境代理]", ...args);
}

// ===== 3. 环境检测 =====
function isBrowserEnvironment() {
    const hasWindow = typeof window !== 'undefined' && window !== null;
    const hasDocument = typeof document !== 'undefined' && document !== null;
    const hasNavigator = typeof navigator !== 'undefined' && navigator !== null;
    log("环境检测: window=", hasWindow, "document=", hasDocument, "navigator=", hasNavigator);
    return hasWindow || hasDocument || hasNavigator;
}

// ===== 4. 代理处理器 =====
const handler = {
    get(target, prop, receiver) {
        if (prop === '__isProxy') return true;
        if (prop === '__target') return target;
        if (prop === Symbol.toStringTag) return target.constructor.name;

        let value;
        try {
            value = Reflect.get(target, prop, receiver);
        } catch (e) {
            log(`[GET] 错误 ${target.constructor?.name || 'Object'}.${prop}:`, e.message);
            value = undefined;
        }

        const targetName = target.constructor?.name || 'Object';
        if ((targetName.includes('Navigator') || targetName.includes('Screen') || targetName.includes('Location')) && typeof prop === "string") {
            if (!prop.startsWith("_") && !prop.startsWith("$") && prop !== 'constructor') {
                collectedEnv[`${targetName}_${prop}`] = value;
            }
        }

        if (loggingEnabled && typeof prop === "string" && !prop.startsWith("_") && prop !== 'constructor') {
            log(`[GET] ${targetName}.${prop} =`, typeof value === 'function' ? '[Function]' : JSON.stringify(value, null, 2));
        }

        if (prop === "__proto__" || prop === "constructor") {
            log(`[绕过原型检测] 返回原始 ${prop}`);
            return Object.getPrototypeOf(target);
        }

        const skipProps = ['toString', 'valueOf', 'toLocaleString', 'constructor', 'prototype', 'then', Symbol.toPrimitive];
        if (skipProps.includes(prop)) {
            return value;
        }

        // Prevent infinite recursion by limiting proxy depth
        if (value !== null && value !== undefined && typeof value === "object" && !proxyCache.has(value)) {
            const proxyDepth = getProxyDepth(receiver);
            if (proxyDepth >= proxyDepthLimit) {
                log(`[警告] 达到代理深度限制 (${proxyDepthLimit})，返回原始对象: ${targetName}.${prop}`);
                return value;
            }
            return getCachedProxy(value, `Nested_${prop}`, proxyDepth + 1);
        }

        return value;
    },

    set(target, prop, value, receiver) {
        if (loggingEnabled && typeof prop === "string" && !prop.startsWith("_")) {
            log(`[SET] ${target.constructor?.name || "Object"}.${prop} =`, typeof value === 'object' ? '[Object]' : value);
        }

        if (target.constructor?.name.includes('Storage')) {
            collectedEnv[`storage_${prop}`] = value;
        }

        return Reflect.set(target, prop, value, receiver);
    },

    apply(target, thisArg, args) {
        if (loggingEnabled) {
            log(`[CALL] ${target.name || "function"}(${args.map(a => typeof a).join(", ")})`);
        }

        if (target === Function.prototype.toString) {
            return () => "function () { [native code] }";
        }

        return Reflect.apply(target, thisArg, args);
    }
};

// Helper to track proxy depth
function getProxyDepth(proxy) {
    let depth = 0;
    let current = proxy;
    while (current && current.__isProxy) {
        depth++;
        current = proxyCache.get(current.__target);
    }
    return depth;
}

// ===== 5. 创建代理对象 =====
function getCachedProxy(target, name, depth = 0) {
    if (!target || typeof target !== 'object') return target;
    if (proxyCache.has(target)) return proxyCache.get(target);
    if (target.__isProxy) return target;

    const proxy = createStealthProxy(target, name);
    proxyCache.set(target, proxy);
    return proxy;
}

function createStealthProxy(target, name) {
    if (shouldSkipProxy(target)) {
        return target;
    }

    try {
        const proxy = new Proxy(target, handler);

        Object.defineProperty(proxy, '__isProxy', {
            value: true,
            writable: false,
            enumerable: false,
            configurable: false
        });

        Object.defineProperty(proxy, '__target', {
            value: target,
            writable: false,
            enumerable: false,
            configurable: false
        });

        return proxy;
    } catch (e) {
        log(`创建代理失败 ${name}:`, e.message);
        return target;
    }
}

function shouldSkipProxy(obj) {
    if (!obj || typeof obj !== 'object') return true;

    const skipTypes = [Date, RegExp, Error, Promise, Map, Set, WeakMap, WeakSet];
    const skipNames = ['Window', 'Document', 'HTMLDocument'];

    return skipTypes.some(type => obj instanceof type) ||
           skipNames.some(name => obj.constructor?.name === name);
}

// ===== 6. 补环境核心函数 =====
function patchEnvironment() {
    const globalObj = typeof global !== 'undefined' ? global : window;

    const hasBrowserLikeObjects = (
        globalObj.navigator ||
        globalObj.document ||
        globalObj.window ||
        globalObj.location
    );

    if (!hasBrowserLikeObjects) {
        log("未检测到浏览器环境对象，跳过代理");
        return false;
    }

    log("检测到浏览器模拟环境，开始代理...");

    const browserObjects = ["navigator", "screen", "location", "localStorage", "sessionStorage", "history", "document"];

    for (const key of browserObjects) {
        try {
            if (globalObj[key] && typeof globalObj[key] === 'object' && !globalObj[key].__isProxy) {
                globalObj[key] = getCachedProxy(globalObj[key], key);
                log(`已代理对象: ${key}`);
            }
        } catch (e) {
            log(`代理 ${key} 失败:`, e.message);
        }
    }

    fixCommonDetections(globalObj);
    return true;
}

function fixCommonDetections(globalObj) {
    try {
        if (globalObj.navigator) {
            Object.defineProperty(globalObj.navigator, "plugins", {
                get: () => [
                    { name: "Chrome PDF Plugin", description: "Portable Document Format", filename: "internal-pdf-viewer", length: 1 },
                    { name: "Chrome PDF Viewer", description: "", filename: "mhjfbmdgcfjbbpaeojofohoefgiehjai", length: 1 }
                ],
                configurable: false,
                enumerable: true
            });

            Object.defineProperty(globalObj.navigator, "languages", {
                get: () => ["zh-CN", "zh", "en-US"],
                configurable: false,
                enumerable: true
            });

            Object.defineProperty(globalObj.navigator, "webdriver", {
                get: () => false,
                configurable: false,
                enumerable: true
            });

            log("已修复浏览器检测点");
        }
    } catch (e) {
        log("修复检测点失败:", e.message);
    }
}

// ===== 7. 用户提供的环境模拟 =====
window = global;
delete global;
delete Buffer;

window.addEventListener = function(eventName, callback) {
    log("window的addEventListener参数为=========>", eventName, typeof callback);
    this[eventName] = callback;
};
window.requestAnimationFrame = function(callback) {
    log("window的requestAnimationFrame参数为=========>", callback);
    const id = setTimeout(() => {
        try {
            callback(Date.now());
        } catch (e) {
            console.error("requestAnimationFrame callback error:", e.message);
        }
    }, 16);
    return id;
};
window.cancelAnimationFrame = function(id) {
    log("cancelAnimationFrame:", id);
    clearTimeout(id);
};
window._sdkGlueVersionMap = {
    "bdmsVersion": "1.0.0.44",
    "sdkGlueVersion": "1.0.0.39"
};
window.XMLHttpRequest = function() {
    const xhr = {
        readyState: 0,
        status: 0,
        statusText: '',
        response: null,
        responseText: '',
        responseType: '',
        open(method, url) {
            log("XMLHttpRequest请求:", method, url);
            this.method = method;
            this.url = url;
            this.readyState = 1;
        },
        send(body) {
            const http = require('http');
            const req = http.request(this.url, { method: this.method }, (res) => {
                let data = '';
                res.on('data', (chunk) => data += chunk);
                res.on('end', () => {
                    this.readyState = 4;
                    this.status = res.statusCode;
                    this.statusText = res.statusMessage;
                    this.response = this.responseText = data;
                    if (this.responseType === 'json') {
                        try {
                            this.response = JSON.parse(data);
                        } catch (e) {
                            log("XMLHttpRequest JSON parse error:", e.message);
                        }
                    }
                    if (this.onload) this.onload();
                });
            });
            req.on('error', (err) => {
                if (this.onerror) this.onerror(err);
            });
            if (body) req.write(body);
            req.end();
        },
        setRequestHeader() {},
        getResponseHeader() {},
        getAllResponseHeaders() {}
    };
    return xhr;
};
window.screen = {
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    pixelDepth: 24,
    width: 1920,
    orientation: {
        type: 'landscape-primary',
        angle: 0,
        onchange: null
    },
    onorientationchange: null
};

const storageData = {
    "__tea_cache_first_2018": "1",
    "_uetvid_exp": "Mon, 21 Sep 2026 14:13:24 GMT",
    "beta-test-injected-cache": "{\"config_list\":[{\"feature_key\":\"dreamina_video_generate\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_canvas_preview\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_image_generate\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"human_face_enable\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_workflow_mode\",\"status\":2,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_story_agent\",\"status\":1,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_story_mode\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"canvas_fusion_enable\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"bg_paint_enable\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_audio_generate\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"https://survey.feelgood.cn/s/?taskID=7414053475895476275\",\"survey_id\":\"7414053475895476275\"},{\"feature_key\":\"dreamina_smart_reference\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"dreamina_lip_sync\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"mweb_publish_image\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"mweb_publish_video\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"mweb_publish_canvas\",\"status\":1,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"mweb_publish_canvas_draft\",\"status\":1,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"mweb_publish_story\",\"status\":1,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"},{\"feature_key\":\"mweb_publish_short_video\",\"status\":3,\"is_white\":false,\"is_invite\":false,\"questionnaire_url\":\"\",\"survey_id\":\"\"}]}",
    "__tea_cache_tokens_2018": "{\"web_id\":\"7542505920430704167\",\"user_unique_id\":\"verify_mer4e1h5_dQ4B8Cq4_36Wj_4AXi_8c1O_l8MfAVuVeqvC\",\"timestamp\":1756303830939,\"_type_\":\"default\"}",
    "xmst": "fKdFz0kewfZhPrFAK8QyVw3b-gf4BPNghyNgriU_xq1ZFau9xfH_sowxUbc9VHQ6UFrB-btEyMA26FLH_kp7lB4FLfr7qMtAIB_nFQl5MHkYzaQmU9_uLZPuoM5c77VnzZM=",
    "dreamina__generator_video_modelKey": "\"dreamina_ic_generate_video_model_vgfm_3.0\"",
    "dreamina__generator_image__selectedImageModel": "{\"feats\":[\"new_model\",\"default_scene\",\"etta\",\"t2i\",\"character\",\"face_swap\",\"bg_paint\"],\"fps\":0,\"extra\":{\"modelSource\":\"by Seedream 3.0\",\"rawModelSource\":\"Seedream 3.0\"},\"iconUrl\":\"https://p3-dreamina-sign.byteimg.com/tos-cn-i-tb4s082cfz/model_image_v8_3_1.jpg~tplv-tb4s082cfz-resize:300:300.webp?lk3s=8e790bc3&x-expires=1787662517&x-signature=r%2F5AYzMyZznqo%2FYpvlkyMlPaDKw%3D\",\"modelNameStarlingKey\":\"dre_t2i_model_3_1\",\"modelTipStarlingKey\":\"dre_t2i_model_3_1_desc\",\"modelReqKey\":\"high_aes_general_v30l_art_fangzhou:general_v3.0_18b\",\"isNewModel\":true,\"sampleSteps\":{\"steps\":16,\"minSteps\":10,\"maxSteps\":41},\"blendEnable\":{\"canny\":false,\"depth\":false,\"pose\":false,\"faceSwap\":true,\"bgPaint\":true},\"modelName\":\"图片 3.1\",\"modelTip\":\"丰富的美学多样性，画面更鲜明生动\",\"featureKey\":\"\",\"generationCategoryNameStarlingKey\":\"dreamina_app_modalswitch_image_3_1\",\"generationCategoryName\":\"图片・3.1 \",\"durationOption\":null,\"lensMotionTypeOption\":null,\"motionSpeedOption\":null,\"cameraStrengthOption\":null,\"videoAspectRatioOption\":null,\"commercialConfig\":{\"commerceInfoMap\":null,\"imageModelCommerceConfig\":{\"base\":{\"default\":{\"amount\":1,\"resourceSubType\":\"aigc\",\"resourceIdType\":\"str\",\"resourceId\":\"generate_img\",\"benefitType\":\"image_basic_generate_plus\"},\"rules\":[{\"resolution\":[\"2k\"],\"benefitKey\":{\"amount\":1,\"resourceSubType\":\"aigc\",\"resourceIdType\":\"str\",\"resourceId\":\"generate_img\",\"benefitType\":\"image_uhd\"}}]},\"blend\":{\"default\":{\"amount\":1,\"resourceSubType\":\"aigc\",\"resourceIdType\":\"str\",\"resourceId\":\"generate_img\",\"benefitType\":\"image_blend_plus\"},\"rules\":[]}}},\"featConfig\":{\"canny\":{\"strength\":0.6},\"depth\":{\"strength\":0.6},\"pose\":{\"strength\":0.6},\"styleReference\":{\"strength\":0.8}},\"featsCantCombine\":[],\"modelBgPromptStarlingKey\":\"\",\"resolutionMap\":{\"1k\":{\"imageRatioSizes\":[{\"width\":1328,\"height\":1328,\"ratioType\":1},{\"width\":1104,\"height\":1472,\"ratioType\":2},{\"width\":1664,\"height\":936,\"ratioType\":3},{\"width\":1472,\"height\":1104,\"ratioType\":4},{\"width\":936,\"height\":1664,\"ratioType\":5},{\"width\":1056,\"height\":1584,\"ratioType\":6},{\"width\":1584,\"height\":1056,\"ratioType\":7},{\"width\":2016,\"height\":864,\"ratioType\":8}],\"imageRangeConfig\":{\"minLength\":512,\"maxLength\":2016,\"maxPixelNum\":1763584},\"resolutionName\":\"标清 1K\"},\"2k\":{\"imageRatioSizes\":[{\"width\":2048,\"height\":2048,\"ratioType\":1},{\"width\":1728,\"height\":2304,\"ratioType\":2},{\"width\":2560,\"height\":1440,\"ratioType\":3},{\"width\":2304,\"height\":1728,\"ratioType\":4},{\"width\":1440,\"height\":2560,\"ratioType\":5},{\"width\":1664,\"height\":2496,\"ratioType\":6},{\"width\":2496,\"height\":1664,\"ratioType\":7},{\"width\":3024,\"height\":1296,\"ratioType\":8}],\"imageRangeConfig\":{\"minLength\":1296,\"maxLength\":3024,\"maxPixelNum\":4194304},\"resolutionName\":\"高清 2K\"}}}",
    "dreamina__generator_video_fps": "24",
    "_uetsid": "96891a90834f11f0a0f8d3d26d756806",
    "loglevel": "SILENT",
    "__tea_cache_first_513695": "1",
    "SLARDARcn_mweb": "JTdCJTIydXNlcklkJTIyOiUyMjllMGEwMTE5LTk0ODctNGQ1Ni1iMzBiLWM0ZDY3MGU4ZmZiOCUyMiwlMjJkZXZpY2VJZCUyMjolMjI1OGYwMTY0Mi1lOWU4LTQ3OGUtYTUwZS1iYjllMmZmZDRkODclMjIsJTIyZXhwaXJlcyUyMjoxNzY0MDgwMDA0ODQ5JTdE",
    "_uetmsclkid_exp": "Tue, 25 Nov 2025 14:13:24 GMT",
    "_uetsid_exp": "Thu, 28 Aug 2025 14:13:24 GMT",
    "_uetmsclkid": "baf90cdda8f510693ee36471f5c2dfae",
    "_uetvid": "c319c60081b211f0bdc833e536d7faa5",
    "web_runtime_security_uid": "179a2886-b208-4147-a418-53b322a614e5",
    "__tea_sdk_ab_version_513695": "{\"data\":{\"byte_edit_as_default\":{\"val\":true,\"vid\":\"90172834\"},\"byte_edit_enable\":{\"val\":true,\"vid\":\"90172833\"},\"draft_gen\":{\"val\":true,\"vid\":\"90176952\"},\"dreamina_commerce_component\":{\"val\":{\"enable\":true},\"vid\":\"91249282\"},\"dreamina_feed_filter_byte_edit\":{\"val\":{\"filter_blend_abilities_update\":{\"high_aes_general_v20:general_v2.0\":{\"delete\":[\"byte_edit\"]},\"high_aes_general_v20_L:general_v2.0_L\":{\"delete\":[\"byte_edit\"]}}},\"vid\":\"90172835\"},\"dreamina_web_search\":{\"val\":true,\"vid\":\"12007707\"},\"enable_task_indicator\":{\"val\":true,\"vid\":\"91245630\"},\"image_custom_size\":{\"val\":true,\"vid\":\"90121821\"},\"lip_sync_hd_fast_enable\":{\"val\":true,\"vid\":\"91023183\"},\"portrait_survey_v3_display\":{\"val\":true,\"vid\":\"90215423\"},\"sync_asset_to_capcut\":{\"val\":true,\"vid\":\"91051508\"},\"video_draft_gen\":{\"val\":true,\"vid\":\"91033129\"},\"web_runtime_prefetch_enable\":{\"val\":true,\"vid\":\"90175970\"},\"web_runtime_prefetch_extra_feed_enable\":{\"val\":false,\"vid\":\"90175971\"}},\"uuid\":\"7542505916283176475\",\"timestamp\":1756304005370,\"ab_version_multilink\":[],\"ab_ext_version\":[],\"ab_version\":[\"91245630\"]}",
    "SLARDARpassport_account_api": "JTdCJTIydXNlcklkJTIyOiUyMmFkMDc4Y2NkLWNjZDQtNDU4Mi04NWNiLTY5YWRiOWVjYzM0YyUyMiwlMjJkZXZpY2VJZCUyMjolMjI0MzRjMTlhYS1jMWM0LTQyODYtOWI5Mi05MzQxMDc2NDU3YzQlMjIsJTIyZXhwaXJlcyUyMjoxNzY0MDc5OTIzMjgxJTdE",
    "__tea_cache_tokens_513695": "{\"web_id\":\"7542505916283176475\",\"user_unique_id\":\"7542505916283176475\",\"timestamp\":1756304004853,\"_type_\":\"default\"}"
};

window.localStorage = {
    getItem(key) {
        log("localStorage的getItem参数为=========>", key);
        return storageData[key] || null;
    },
    setItem(key, value) {
        storageData[key] = value.toString();
        window.dispatchEvent(new Event('storage'));
    },
    removeItem(key) {
        delete storageData[key];
        window.dispatchEvent(new Event('storage'));
    },
    clear() {
        Object.keys(storageData).forEach(key => delete storageData[key]);
        window.dispatchEvent(new Event('storage'));
    },
    key(index) {
        return Object.keys(storageData)[index] || null;
    },
    get length() {
        return Object.keys(storageData).length;
    }
};

window.sessionStorage = { ...window.localStorage };

window.document = {
    all: {
        length: 0,
        item: () => null,
        namedItem: () => null
    },
    createElement(tagName) {
        if (tagName.toLowerCase() === 'canvas') {
            return {
                tagName,
                style: {},
                getContext(contextType) {
                    if (contextType === '2d') {
                        return {
                            fillRect: () => {},
                            drawImage: () => {},
                            getImageData: () => ({ data: new Uint8ClampedArray([255, 255, 255, 255]), width: 1, height: 1 }),
                            toDataURL: () => `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkY${Math.random().toString(36).slice(2, 8)}AAjCB0C8AAAAASUVORK5CYII=`
                        };
                    } else if (contextType === 'webgl' || contextType === 'webgl2') {
                        return {
                            getParameter(param) {
                                const params = {
                                    7938: 'WebGL 1.0', // GL_VERSION
                                    35724: 'WebGL GLSL ES 1.0', // GL_SHADING_LANGUAGE_VERSION
                                    7936: 'WebGL', // GL_VENDOR
                                    7937: 'WebGL', // GL_RENDERER
                                };
                                return params[param] || null;
                            },
                            getExtension: () => null
                        };
                    }
                    return null;
                },
                width: 300,
                height: 150
            };
        }
        return {
            tagName,
            style: {},
            getAttribute(attrName) {
                return this[attrName] || null;
            },
            setAttribute(attrName, attrValue) {
                this[attrName] = attrValue;
            },
            appendChild(child) {
                this.child = child;
            },
            removeChild(child) {
                this.child = null;
            },
            insertBefore(child, beforeChild) {
                this.child = child;
            },
            replaceChild(newChild, oldChild) {
                this.child = newChild;
            },
            addEventListener(eventName, callback) {
                this[eventName] = callback;
            }
        };
    },
    createTextNode(text) {
        return { textContent: text };
    },
    getElementsByTagName(tagName) {
        return tagName === 'html' ? [this.documentElement] : [];
    },
    querySelector(selector) {
        return {
            style: {},
            getAttribute(attrName) {
                return this[attrName] || null;
            },
            setAttribute(attrName, attrValue) {
                this[attrName] = attrValue;
            },
            appendChild(child) {
                this.child = child;
            },
            removeChild(child) {
                this.child = null;
            },
            insertBefore(child, beforeChild) {
                this.child = child;
            },
            replaceChild(newChild, oldChild) {
                this.child = newChild;
            },
            addEventListener(eventName, callback) {
                this[eventName] = callback;
            }
        };
    },
    getElementsByClassName(className) {
        return [];
    },
    getElementById(id) {
        return null;
    },
    getComputedStyle(element) {
        return {
            getPropertyValue(propertyName) {
                return element.style[propertyName] || '';
            }
        };
    },
    documentElement: {
        style: {},
        tagName: 'HTML',
        getAttribute(attrName) {
            return this[attrName] || null;
        }
    },
    head: {
        appendChild(child) { this.child = child; },
        removeChild(child) { this.child = null; },
        insertBefore(child, beforeChild) { this.child = child; },
        replaceChild(newChild, oldChild) { this.child = newChild; }
    },
    body: {
        appendChild(child) { this.child = child; },
        removeChild(child) { this.child = null; },
        insertBefore(child, beforeChild) { this.child = child; },
        replaceChild(newChild, oldChild) { this.child = newChild; },
        addEventListener(eventName, callback) {
            this[eventName] = callback;
        }
    },
    documentMode: 11,
    cookie: "",
    addEventListener(eventName, callback) {
        log("document.addEventListener:", eventName);
        this[eventName] = callback;
        if (eventName === 'DOMContentLoaded') {
            setTimeout(() => {
                if (this[eventName]) {
                    this[eventName]({ type: eventName, target: this });
                }
            }, 100);
        }
    },
    removeEventListener(eventName, callback) {
        this[eventName] = null;
    },
    dispatchEvent(event) {
        log("document.dispatchEvent:", event.type);
        if (this[event.type]) {
            try {
                this[event.type](event);
            } catch (e) {
                log("dispatchEvent error:", e.message);
            }
        }
        return true;
    },
    createEvent(eventType) {
        return {
            type: eventType,
            initEvent(type, bubbles, cancelable) {
                this.type = type;
                this.bubbles = bubbles;
                this.cancelable = cancelable;
            },
            timeStamp: Date.now()
        };
    },
    createTouch(identifier, pageX, pageY, screenX, screenY, clientX, clientY) {
        return { identifier, pageX, pageY, screenX, screenY, clientX, clientY };
    },
    createTouchList(...touches) {
        return touches;
    },
    createTouchEvent(type, touches, changedTouches, target) {
        return { type, touches, changedTouches, target };
    },
    createPointerEvent(type, pointerEventInit) {
        return { type, ...pointerEventInit };
    },
    createMouseEvent(type, mouseEventInit) {
        return { type, ...mouseEventInit, timeStamp: Date.now() };
    },
    createKeyboardEvent(type, keyboardEventInit) {
        return { type, ...keyboardEventInit };
    },
    hidden: false,
    visibilityState: 'visible',
    referrer: 'https://jimeng.jianying.com/',
    activeElement: null,
    title: '即梦AI',
    defaultView: window
};

window.navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    cookieEnabled: true,
    doNotTrack: null,
    geolocation: {
        getCurrentPosition: (success, error) => success({ coords: { latitude: 0, longitude: 0 } })
    },
    language: "zh-CN",
    languages: ["zh-CN", "zh", "en-US"],
    locks: {},
    maxTouchPoints: 0,
    mimeTypes: {
        'application/pdf': { type: 'application/pdf', suffixes: 'pdf', description: 'Portable Document Format' },
        length: 1,
        item: function(index) { return this['application/pdf'] || null; },
        namedItem: function(name) { return this[name] || null; }
    },
    onLine: true,
    platform: "Win32",
    plugins: {
        0: { name: 'Chrome PDF Plugin', description: 'Portable Document Format', filename: 'internal-pdf-viewer', length: 1 },
        1: { name: 'Chrome PDF Viewer', description: '', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', length: 1 },
        length: 2,
        item: function(index) { return this[index] || null; },
        namedItem: function(name) { return this[0] || this[1] || null; }
    },
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver: false,
    hardwareConcurrency: 8,
    deviceMemory: 8,
    connection: {
        effectiveType: '4g',
        rtt: 50,
        downlink: 10,
        saveData: false,
        onchange: null
    },
    getBattery: function() {
        return Promise.resolve({
            charging: true,
            chargingTime: 0,
            dischargingTime: Infinity,
            level: 1.0,
            onchargingchange: null,
            onchargingtimechange: null,
            ondischargingtimechange: null,
            onlevelchange: null
        });
    },
    permissions: {
        query: function(permissionDesc) {
            return Promise.resolve({ state: 'granted' });
        }
    },
    mediaDevices: {
        getUserMedia: () => Promise.reject(new Error('Not allowed')),
        enumerateDevices: () => Promise.resolve([])
    }
};

window.location = {
    ancestorOrigins: { length: 0 },
    href: "https://jimeng.jianying.com/ai-tool/home/",
    origin: "https://jimeng.jianying.com",
    protocol: "https:",
    host: "jimeng.jianying.com",
    hostname: "jimeng.jianying.com",
    port: "",
    pathname: "/ai-tool/home/",
    search: "",
    hash: "",
    assign: () => {},
    reload: () => {},
    replace: () => {}
};

window.history = {
    length: 2,
    scrollRestoration: "auto",
    pushState: () => {},
    replaceState: () => {},
    back: () => {},
    forward: () => {},
    go: () => {}
};

// 补充的代码 - 事件系统
window.Event = function(type, eventInit = {}) {
    return {
        type,
        bubbles: eventInit.bubbles || false,
        cancelable: eventInit.cancelable || false,
        target: null,
        currentTarget: null,
        preventDefault: () => {},
        stopPropagation: () => {},
        timeStamp: Date.now()
    };
};

window.CustomEvent = function(type, eventInit = {}) {
    const event = new window.Event(type, eventInit);
    event.detail = eventInit.detail || null;
    return event;
};

window.dispatchEvent = function(event) {
    log("window.dispatchEvent:", event.type);
    if (this[event.type]) {
        try {
            this[event.type](event);
        } catch (e) {
            log("window.dispatchEvent error:", e.message);
        }
    }
    return true;
};

window.document.dispatchEvent = window.document.dispatchEvent;

// 补充的代码 - fetch
const http = require('http');

window.fetch = function(url, options = {}) {
    log("fetch请求:", url, options);
    return new Promise((resolve, reject) => {
        const req = http.request(url, { method: options.method || 'GET', headers: options.headers || {} }, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                resolve({
                    ok: res.statusCode >= 200 && res.statusCode < 300,
                    status: res.statusCode,
                    statusText: res.statusMessage,
                    headers: res.headers,
                    json: () => Promise.resolve(JSON.parse(data)),
                    text: () => Promise.resolve(data)
                });
            });
        });
        req.on('error', reject);
        if (options.body) req.write(options.body);
        req.end();
    });
};

// 补充的代码 - 其他检测点
const { performance } = require('perf_hooks');
window.performance = {
    now: () => performance.now(),
    timing: {
        navigationStart: Date.now() - 1000,
        loadEventEnd: Date.now(),
        domContentLoadedEventStart: Date.now() - 100,
        domContentLoadedEventEnd: Date.now() - 50
    },
    getEntriesByType: (type) => [],
    mark: () => {},
    measure: () => {}
};
window.innerWidth = 1920;
window.innerHeight = 1080;
window.devicePixelRatio = 1;
window.RTCPeerConnection = function() {
    return {
        createOffer: () => Promise.resolve({ sdp: 'v=0\r\no=- 123456789 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n', type: 'offer' }),
        createAnswer: () => Promise.resolve({ sdp: 'v=0\r\no=- 123456789 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n', type: 'answer' }),
        setLocalDescription: () => Promise.resolve(),
        setRemoteDescription: () => Promise.resolve(),
        addIceCandidate: () => Promise.resolve()
    };
};
window.AudioContext = function() {
    return {
        createOscillator: () => ({ start: () => {}, connect: () => {} }),
        createAnalyser: () => ({ connect: () => {}, getByteFrequencyData: () => new Uint8Array(32) }),
        destination: {}
    };
};
window.webkitAudioContext = window.AudioContext;

// 模拟用户行为
setInterval(() => {
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    const mouseEvent = new window.Event('mousemove', { bubbles: true });
    mouseEvent.pageX = x;
    mouseEvent.pageY = y;
    mouseEvent.clientX = x;
    mouseEvent.clientY = y;
    window.document.dispatchEvent(mouseEvent);
    log("模拟 mousemove: x=", x, "y=", y);
}, 1000);

// 模拟页面加载事件
setTimeout(() => {
    const loadEvent = new window.Event('load', { bubbles: true });
    window.dispatchEvent(loadEvent);
    const domContentLoadedEvent = new window.Event('DOMContentLoaded', { bubbles: true });
    window.document.dispatchEvent(domContentLoadedEvent);
}, 100);

// 捕获未处理的错误
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.stack);
});

// ===== 8. 立即执行补环境 =====
let isPatched = false;

try {
    isPatched = patchEnvironment();
    if (isPatched) {
        log("环境代理已完成");
    }
} catch (e) {
    console.error("环境代理初始化失败:", e.message);
}

// ===== 9. 导出函数 =====
module.exports = {
    patchEnvironment,
    enableLogging: () => { loggingEnabled = true; },
    disableLogging: () => { loggingEnabled = false; },
    getCollectedEnv: () => collectedEnv,
    isEnvironmentPatched: () => isPatched
};

// ===== 10. 延迟验证 =====
setTimeout(() => {
    if (isPatched) {
        try {
            console.log("\n===== 环境代理验证 =====");
            console.log("navigator.userAgent:", navigator.userAgent);
            console.log("navigator.plugins:", navigator.plugins.length);
            console.log("navigator.languages:", navigator.languages);
            console.log("document.hidden:", document.hidden);
            console.log("document.all:", !!document.all);
            console.log("window.innerWidth:", window.innerWidth);
            console.log("代理运行正常");
        } catch (e) {
            console.error("验证失败:", e.message);
        }
    }
}, 1500);