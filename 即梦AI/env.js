window = global;
delete global;
delete Buffer;
require("./MyProxy");
window.addEventListener = function (args) {
    console.log("window的addEventListener参数为=========>", args);
};
window.requestAnimationFrame = function (args) {
    console.log("window的requestAnimationFrame参数为=========>", args);
};
window._sdkGlueVersionMap = {
    "bdmsVersion": "1.0.0.44",
    "sdkGlueVersion": "1.0.0.39"
}
window.XMLHttpRequest = function (args) {
    console.log("window的XMLHttpRequest参数为=========>", args);
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
    pixelDepth:24,
    width:1920
};

window.localStorage = {
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
document = {
    createElement(tagName) {
        return {
            tagName,
            style: {},
            getAttribute(attrName) {
                return this[attrName];
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
        }
    },
    createTextNode(text) {
        return {
            textContent: text
        }
    },
    getElementsByTagName(tagName) {
        return []
    },
    querySelector(selector) {
        return {
            style: {},
            getAttribute(attrName) {
                return this[attrName];
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
        }
    },
    getElementsByClassName(className) {
        return []
    },
    getElementById(id) {},
    getComputedStyle(element) {
        return {
            getPropertyValue(propertyName) {
                return element.style[propertyName];
            }
        }
    },
    documentElement: {
        style: {}
    },
    head: {
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
        }
    },
    body: {
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
        }
    },
    documentMode: 5,
    cookie: "",
    addEventListener(eventName, callback) {
        this[eventName] = callback;
    },
    removeEventListener(eventName, callback) {
        this[eventName] = null;
    },
    dispatchEvent(event) {},
    createEvent(eventName) {
        return {
            initEvent(type, bubbles, cancelable) {
                this.type = type;
                this.bubbles = bubbles;
                this.cancelable = cancelable;
            }
        }
    },
    createTouch(identifier, pageX, pageY, screenX, screenY, clientX, clientY) {},
    createTouchList() {},
    createTouchEvent(type, touches, changedTouches, target) {},
    createPointerEvent(type, pointerEventInit) {},
    createMouseEvent(type, mouseEventInit) {},
    createKeyboardEvent(type, keyboardEventInit) {},
};
screen = {
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    pixelDepth:24,
    width:1920
};
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    cookieEnabled: true,
    doNotTrack: null,
    geolocation: {},
    language: "zh-CN",
    languages: ["zh-CN"],
    locks: {},
    maxTouchPoints: 0,
    mimeTypes: {},
    onLine: true,
    platform: "Win32",
    plugins: {},
    product: "Gecko",
    productSub: "20030107",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
};
localStorage = {
    getItem(key) {
        console.log("localStorage的getItem参数为=========>", key);
        if (key === "xmst") {
            return 'fKdFz0kewfZhPrFAK8QyVw3b-gf4BPNghyNgriU_xq1ZFau9xfH_sowxUbc9VHQ6UFrB-btEyMA26FLH_kp7lB4FLfr7qMtAIB_nFQl5MHkYzaQmU9_uLZPuoM5c77VnzZM=';
        }
    },
    setItem(key, value) {},
    removeItem(key) {},
    clear() {},
    key(index) {},
    get length() {
        return 0;
    },
}
location = {
    "ancestorOrigins": {},
    "href": "https://jimeng.jianying.com/ai-tool/home/",
    "origin": "https://jimeng.jianying.com",
    "protocol": "https:",
    "host": "jimeng.jianying.com",
    "hostname": "jimeng.jianying.com",
    "port": "",
    "pathname": "/ai-tool/home/",
    "search": "",
    "hash": ""
}
history = {length: 2, scrollRestoration: "auto"}