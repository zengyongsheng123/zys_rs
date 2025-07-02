function get_enviroment (proxy_array) {
  for (var i = 0; i < proxy_array.length; i++) {
    handler = '{\n' +
      '    get: function(target, property, receiver) {\n' +
      '        console.log("方法:", "get  ", "对象:", ' +
      '"' + proxy_array[i] + '" ,' +
      '"  属性:", property, ' +
      '"  属性类型:", ' + 'typeof property, ' +
      // '"  属性值:", ' + 'target[property], ' +
      '"  属性值类型:", typeof target[property]);\n' +
      // 'if (typeof target[property] == "undefined"){debugger}' +
      '        return target[property];\n' +
      '    },\n' +
      '    set: function(target, property, value, receiver) {\n' +
      '        console.log("方法:", "set  ", "对象:", ' +
      '"' + proxy_array[i] + '" ,' +
      '"  属性:", property, ' +
      '"  属性类型:", ' + 'typeof property, ' +
      // '"  属性值:", ' + 'target[property], ' +
      '"  属性值类型:", typeof target[property]);\n' +
      '        return Reflect.set(...arguments);\n' +
      '    }\n' +
      '}'
    eval('try{\n' + proxy_array[i] + ';\n'
      + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
      + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
  }
}
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen',"localStorage","sessionStorage","all","HTMLDocument","Window"]
// delete __filename;
// delete __dirname;
window=global;
function Window(){}
window.Window=Window;
function HTMLDocument(){}
// window.HTMLDocument=HTMLDocument;
function Navigator(){}
// window.Navigator=Navigator;
function Location(){}
// window.Location=Location;
function HTMLAllCollection() {}
window.HTMLAllCollection=HTMLAllCollection;



// delete Buffer;
// delete process;
// delete global;
// window.XMLHttpRequest=require('xmlhttprequest').XMLHttpRequest;
// window.crypto={
//     "subtle": {
//         "digest": function (arg) {
//             console.log("crypto的digest--->",arg);
//         }
//     }
// };
// window.chrome={
//     "app": {
//         "isInstalled": false,
//         "InstallState": {
//             "DISABLED": "disabled",
//             "INSTALLED": "installed",
//             "NOT_INSTALLED": "not_installed"
//         },
//         "RunningState": {
//             "CANNOT_RUN": "cannot_run",
//             "READY_TO_RUN": "ready_to_run",
//             "RUNNING": "running"
//         }
//     }
// };
// window.outerWidth=1600;
// window.outerHeight=900;
// window.devicePixelRatio=1;

// window.__proto__=Window.prototype;

// _all={innerHTML:""};
// _all.__proto__=HTMLAllCollection.prototype;
document={
    createElement: function (arg) {
        console.log("document的createElement--->",arg)
        if(arg==="canvas"){
            return {
                getContext: function (arg) {
                    console.log("canvas的getContext--->",arg);
                }
            }
        }
        if(arg==="script"){
            return {
                parentNode: {
                    appendChild: function (arg) {
                        console.log("script的appendChild--->",arg)
                    },
                    removeChild: function (arg) {
                        // console.log("script的removeChild--->",arg)
                    }
                }
            }
        }
    },
    // all:_all,
    // documentElement:{},
    // body:{innerHTML:""},
    // head:{},
    createEvent:function (arg){
        console.log("document的createEvent--->",arg);
    },
    getElementsByTagName:function (arg){
        console.log("document的getElementsByTagName--->",arg);
        if(arg==="head"){
            return {
                "0": {},
                length:1
            }
        }
    },
    // querySelector:function (arg){
    //     console.log("document的querySelector--->",arg);
    // },
    // referrer:'',
    cookie:'shshshfpa=59d12b25-a34f-9e80-0400-35c65e40dfa8-1733559570; shshshfpx=59d12b25-a34f-9e80-0400-35c65e40dfa8-1733559570; TrackID=16eJuqsfnHGYuDBDFI7jBR7VRl2bT8Ll7rqKMvf2NWa-BKFUULkkKD-9iXFLzQiR5LDJQ-lWbnnY5jUeCkdsFTD4SapZ6idwZ-nu_IoaEVBk; pinId=m7gg3Fn6DkUkK7NhVIJnl7V9-x-f3wj7; pin=jd_7b09a906088f7; unick=jd_8jggnm9uys33gd; webp=1; mba_muid=17335595686372029756293; visitkey=6596918083517888133; x-rp-evtoken=mGW9U4qbzsaBdCMe70m9pBi3yVF1HaNNdKc7o2F9MlBDi9MihamyMRgRS4msgSH_bcOJde3rMR9TqwdBHrN8rw%3D%3D; joyya=1736737592.0.33.1bhbyue; qid_uid=75428e9c-e829-417e-b3c7-a2313810b4d7; qid_fs=1737182669936; qid_ls=1737182669958; qid_ts=1738846801999; qid_vis=2; 3AB9D23F7A4B3C9B=NMANJWFRJOHBU356C4GL67SYD46CA2M3NA7TN66ZOWAD2QR2SMMX76LTUEAOSLEZ2A2E7VDNJJWOH4OHDG5CMMDMTA; __jdu=17395484191841412122768; __jdv=209449046|direct|-|none|-|1741183594398; sidebarStatus=1; __jda=209449046.17395484191841412122768.1739548419.1741183594.1741227100.5; __jdc=209449046; 3AB9D23F7A4B3CSS=jdd03NMANJWFRJOHBU356C4GL67SYD46CA2M3NA7TN66ZOWAD2QR2SMMX76LTUEAOSLEZ2A2E7VDNJJWOH4OHDG5CMMDMTAAAAAMVNE5C4QIAAAAACZAPISLZBC553QX; login=true; MMsgIdjd_7b09a906088f7=20052647; shshshfpb=BApXSjdkyavBAJ4U1UQhwNLbJXLHlhm5yBnEUkl949xJ1Mqg-SYG2; sdtoken=AAbEsBpEIOVjqTAKCQtvQu17hYIIFO3Xxxh1XcBT6fTRb6xYQnG0e7rFy_v4pxBLU87_LNliJdI3An0fk_MKMnPlrbcPI0kwtLqIIPowtvC2XUEB8HIVupyBoGV3LTU',
};
// document.__proto__=HTMLDocument.prototype;

navigator={
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "appCodeName": "Mozilla",
    "appName": "Netscape",
    "appVersion": "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
    "platform": "Win32",
    "languages": ["zh-CN", "zh"],
    "language":"zh-CN",
    "plugins":{
    "0": {
        "0": {},
        "1": {}
    },
    "1": {
        "0": {},
        "1": {}
    },
    "2": {
        "0": {},
        "1": {}
    },
    "3": {
        "0": {},
        "1": {}
    },
    "4": {
        "0": {},
        "1": {}
    },
    length:5,
},
    "webdriver": false,
    "hardwareConcurrency":4,
    "mimeTypes":{
    "0": {},
    "1": {}
}
};
// navigator.__proto__=Navigator.prototype;
location={
    "ancestorOrigins": {},
    "href": "https://union.jd.com/proManager/index?pageNo=2",
    "origin": "https://union.jd.com",
    "protocol": "https:",
    "host": "union.jd.com",
    "hostname": "union.jd.com",
    "port": "",
    "pathname": "/proManager/index",
    "search": "?pageNo=2",
    "hash": ""
};
// location.__proto__=Location.prototype;
// screen={
//     "height":900,
//     "width":1600,
// };
localStorage={
    "getItem":function (arg){
        console.log("localStorage的getItem--->",arg);
        if(arg==="WQ_gather_wgl1"){
            return '{"v":"38bf4cd4bd3e5ab568ffe93f2dd087d9","t":1741186393982,"e":31536000}'
        }
        return st[arg]
    },
    "setItem":function (arg){
        console.log("localStorage的setItem--->",arg);
    },
    "removeItem":function (arg){
        console.log("localStorage的removeItem--->",arg);
    },
    "clear":function (arg){
        console.log("localStorage的clear--->",arg);
    },
    "key":function (arg){}
};
st={
    "WQ_vk1_73806_4.9": "{\"v\":\"eeq00y00zur4e1l9\",\"t\":1733559569170,\"e\":31536000}",
    "msgVisiblePop2035875271": "true",
    "dra_union_device": "edfc5ab2-5678-4ae8-b048-fe655f5668ee",
    "JDst_rac_nfd": "{\"v\":10,\"t\":1741186394761,\"e\":31536000}",
    "hf_time": "1741201602279",
    "WQ_vk1_586ae_4.9": "{\"v\":\"eyhe8hh8ku9ezlr8\",\"t\":1733559570582,\"e\":31536000}",
    "__we_m_gl__": "ZnAlM0FjYzg1NjEyMWU2NGI2OWEwNjNjMmY2NGZmNmJhZmRiZn52ZW5kb3IlM0FXZWJLaXR+dmVyc2lvbiUzQVdlYkdMJTIwMS4wJTIwKE9wZW5HTCUyMEVTJTIwMi4wJTIwQ2hyb21pdW0pfnVubWFza2VkJTIwdmVuZG9yJTNBR29vZ2xlJTIwSW5jLiUyMChBTUQpfnVubWFza2VkJTIwcmVuZGVyZXIlM0FBTkdMRSUyMChBTUQlMkMlMjBBTUQlMjBSYWRlb24lMjBSNyUyMDM1MCUyMFNlcmllcyUyMCgweDAwMDA2ODNGKSUyMERpcmVjdDNEMTElMjB2c181XzAlMjBwc181XzAlMkMlMjBEM0QxMSk=",
    "batchData": "{}",
    "UNION_ROLES": "{\"appAgree\":0,\"calendar\":0,\"cpActivity\":0,\"cpcAgree\":0,\"cpsAgree\":1,\"isCeleShop\":0,\"isContent\":0,\"isOperate\":0,\"isGK\":0,\"userTask\":0,\"isMotherPower\":0,\"isChannel\":0,\"qualificationStatus\":1,\"register\":1,\"nickName\":\"jd_8jggnm9uys33gd\",\"haveMultipleAccounts\":false,\"yunBigImageUrl\":\"\"}",
    "WQ_gather_cv1": "{\"v\":\"75ddd3bbdf9572fc069a0a5ce070a138\",\"t\":1741186393982,\"e\":31536000}",
    "3AB9D23F7A4B3CSS": "jdd03NMANJWFRJOHBU356C4GL67SYD46CA2M3NA7TN66ZOWAD2QR2SMMX76LTUEAOSLEZ2A2E7VDNJJWOH4OHDG5CMMDMTAAAAAMVM2RE7SIAAAAADZPSCC5PVKY6KYX",
    "3AB9D23F7A4B3C9B": "NMANJWFRJOHBU356C4GL67SYD46CA2M3NA7TN66ZOWAD2QR2SMMX76LTUEAOSLEZ2A2E7VDNJJWOH4OHDG5CMMDMTA",
    "WQ_dy_algo_s_eeq00y00zur4e1l9": "{\"v\":\"ZnVuY3Rpb24gdGVzdCh0ayxmcCx0cyxhaSxhbGdvKXt2YXIgcmQ9J2JTNzZ4TkhUeVppTCc7dmFyIHN0cj0iIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uSG1hY01ENShzdHIsdGspO30=\",\"t\":1734617726513,\"e\":86400}",
    "CA1AN5BV0CA8DS2EPC": "081729a0863faa192f0dc1dfe0e02d9a",
    "WQ_dy1_vk": "{\"5.0\":{\"73806\":{\"e\":31536000,\"v\":\"dwdxdx9ap3cwds33\",\"t\":1735703056227},\"586ae\":{\"e\":31536000,\"v\":\"dssxdpsdrawc3970\",\"t\":1735703055455}}}",
    "JDst_rac_last_update": "{\"v\":1741186393951,\"t\":1741186393951,\"e\":31536000}",
    "msgVisiblePop": "false",
    "WQ_gather_wgl1": "{\"v\":\"38bf4cd4bd3e5ab568ffe93f2dd087d9\",\"t\":1741186393982,\"e\":31536000}",
    "__we_m_ft__": "QXJpYWwlMkNBcmlhbCUyMEJsYWNrJTJDQXJpYWwlMjBOYXJyb3clMkNDYWxpYnJpJTJDQ2FtYnJpYSUyQ0NhbWJyaWElMjBNYXRoJTJDQ29taWMlMjBTYW5zJTIwTVMlMkNDb25zb2xhcyUyQ0NvdXJpZXIlMkNDb3VyaWVyJTIwTmV3JTJDR2VvcmdpYSUyQ0hlbHZldGljYSUyQ0ltcGFjdCUyQ0x1Y2lkYSUyMENvbnNvbGUlMkNMdWNpZGElMjBTYW5zJTIwVW5pY29kZSUyQ01pY3Jvc29mdCUyMFNhbnMlMjBTZXJpZiUyQ01TJTIwR290aGljJTJDTVMlMjBQR290aGljJTJDTVMlMjBTYW5zJTIwU2VyaWYlMkNNUyUyMFNlcmlmJTJDUGFsYXRpbm8lMjBMaW5vdHlwZSUyQ1NlZ29lJTIwUHJpbnQlMkNTZWdvZSUyMFNjcmlwdCUyQ1NlZ29lJTIwVUklMkNTZWdvZSUyMFVJJTIwTGlnaHQlMkNTZWdvZSUyMFVJJTIwU2VtaWJvbGQlMkNTZWdvZSUyMFVJJTIwU3ltYm9sJTJDVGFob21hJTJDVGltZXMlMkNUaW1lcyUyME5ldyUyMFJvbWFuJTJDVHJlYnVjaGV0JTIwTVMlMkNWZXJkYW5hJTJDV2luZ2Rpbmdz",
    "register": "1",
    "__we_m_cv__": "Y2FudmFzJTIwd2luZGluZyUzQXllc35jYW52YXMlMjBmcCUzQTBiM2NlNjZjMTk0MjNjYzJjOGY0OWYzMmRlNWE5NWRk",
    "__we_m_ftk__": "NmUwNGMxMTNlYjlkNDZiMDdmZjcyMWNlY2FiMDgyN2E=",
    "WQ_dy_algo_s_eyhe8hh8ku9ezlr8": "{\"v\":\"ZnVuY3Rpb24gdGVzdCh0ayxmcCx0cyxhaSxhbGdvKXt2YXIgcmQ9JzdmMExNMFF6S0JMbSc7dmFyIHN0cj0iIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uSG1hY01ENShzdHIsdGspO30=\",\"t\":1734617726461,\"e\":86400}",
    "WQ_dy_tk_s_eeq00y00zur4e1l9": "{\"v\":\"dGswM3dhZjExMWNjYzE4bkNSS1JoZkVFanhSOF9EUmFybE9EZkRWSWxxRHd6TzFUcHJHUThPa05CSGlnN2dCLW9obWYzNGVOU1ZJNnBhbW9ySWMzb3JwYXVFY3U=\",\"t\":1734617726513,\"e\":86400}",
    "dra_0.0.1-11_device": "1704f5c4-b275-416f-b590-f4612ba174ce",
    "__we_m_cf__": "{\"t\":1741183655194,\"v\":\"012fgzPiyRQPqkH-bL6iR9qdnH-aCEzyV9IfyLxyPzBndwcgbl6YaWCEmO8r9P29FGYtMKUqBGQdQgJ7B6DxDf0opqj63yrkv1a5SXY2UvYUGrC9nMG4d72efKD_w5GobpZyt2X__JrEhzDA1P0WdCvAkVy-o1cLewHViQl634gfgP6kNYPM3Zs8p5OgsZm-oPM98nBXPtn3pxw0LABXxDfmehoNP3cTfgaovvnhiFNAPuqSKjgbnGqa7aIwE60M0PqzbVW_KAnVKRAOrYL0EiLKRg1IyjAOYKLRTXXE1h9VcTFFz7aa3s4-sHBCnKzQwseAKk8xWNhjB9WILM_23vcxeN0SmniZ3Z7sDdivl9H7M27bsJ9a1SV_oZvYbuVchD6L0QP248wks9jNsD5Iew6FXlEH4zdvCqAPEmO85astLhfbuIkZCoLu3wL42JCuaV67K-jQgC_WxcK2gd6qrpSC4goWuM5sJ5y4xw1qRJxoTvECfHLlWEjgVFqK0SLusgqg41SzGRYlZPSjivARJdo2_Uwl_oeeTwQ8pE8gx6RGlE2sMwP3F_1txU8gl2ynkyh_nd03a62Lc8xkVHcRfVYwrpjUX9dFxapa_WanE0RsS6gBxubtDL0ioiaE1O46ltagkvDcq2zr91KT1ESzYDeNWYojpenCuDQtjPbl1O8DxD2_5ZCUVKrYyQ9KMLyj_AzAass_RZlx0F1uDq7PX9SLfG4RqQWjGFcgSEf4cP2MBlM7LuIExNiM7DssrfyLk0LwaPCqv0H7_vmxMNrXlNq1emnl8RqLINQUGG6AmauYnfcLNAlBR5sFgNfL17Zm6cb8tcnWppz37uqjp2mJovSrVKM_rPA78S4mP9HWCNNA-Lsw_f2gjXEQyWsCia8D20y2Vy2CDIghV06n9B6wGSHopTbBP9gtxBdCHYf0icauQze7LbTFdvL6sv5jpv8zER8m6rsFjIHXMnX_5yyvbZLbgydeRs2f2hxIVx2vx9k1wmznVEO98qR3Lll8O8QmmLLKFa5X8nyj1x57PsXM2D_IRQTDYIN_4F7KbhSO-4Ncc22eYO1_7XbYJpxM6mL9Y52Fs-L_kFq-_CPLYBGkg2nh26sGd_rMwrfCAi13TO176jA2BBy80vSTjxggxXyWyPbmj8OQGYvcZozlX7Vg_a-EKH82eFW4PyhXTBxGhDA6WqRha_J3CQBHE_PUb4OTWWWKFLi1RqN2wSllP6cAQXWB7MSXoia1V-RbneubLHPp4JAwjdrkvsyQJX4fyq5hWjrx_fXOFLdatsKrX3Nk6au0g5Zc1rKv12HLll9UUU6o_ymCZb7rgHVIT6dk53oF2ytUCeZ48gi-lJOk2Qq8C8MRDqrC2J6htkyyX5XnyZdZn2DPV4n-8Rh7LBycAGt84_vfPLQ80iURoLzO2l_QuZlagp0vfoclzXXhSalEYMT__my6r2uT-SWewNOvqOD4t0eDOQ7uBdIjYR3byBthx7QUnIKgvXTZ-NTCPAIyb5xq0Ql5zKnTtPUHKMupsozg97_ugKdoGqJZrjXGO-G2e54UQfHTt6rY0-NMGCW67TasqnZDW2PpBRavNDWdCPq5\"}",
    "localImprovingAccountFlag": "",
    "PCA9D23F7A4B3CSS": "5db6bcbb85da6232c0b7a7f891d2f6c5",
    "shshshfpb": "BApXSUOaqZfBAJ4U1UQhwNLbJXLHlhm5yBnEUkl9n9xJ1Mqg-SYG2",
    "WQ_dy_tk_s_eyhe8hh8ku9ezlr8": "{\"v\":\"dGswM3diYmMxMWM5MzE4blQ2Mm1FdGRoUXNtTGlGWm5XcV91UElzSkp2aDhndDMtTlBNRm1HUUktN3VnbUNJRUx4TVdDWXZBamRjVERwaGxwVmRFR2Z2Q1FiQ0M=\",\"t\":1734617726461,\"e\":86400}",
    "shshshfpx": "59d12b25-a34f-9e80-0400-35c65e40dfa8-1733559570",
    "shshshfpa": "59d12b25-a34f-9e80-0400-35c65e40dfa8-1733559570",
    "PCTSD23F7A4B3CSS": "1741187045052",
    "_isGotoIndexFlag": "35",
    "WQ_dy1_tk_algo": "{\"dwdxdx9ap3cwds33\":{\"73806\":{\"v\":\"eyJ0ayI6InRrMDN3OTllZDFiNzAxOG5xWU0wUDZkNlVkUEpPOF9tSGxtcmNPamlNVEZLWHNRSkFFaUdjWDhjcXhNYzNBMW9qZmpINm4yWk91NlU0aGNIeF9hNzZHSEU5TC12IiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdXQWpTdktvMzEyVDUnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9\",\"e\":86400,\"t\":1741183595361}},\"dssxdpsdrawc3970\":{\"586ae\":{\"v\":\"eyJ0ayI6InRrMDN3OTQzMjFiNzgxOG5DMHhRdFlPQnhSdVBZZFA4ZVZNUzBmVm1aZDk5T3paMG02VkN3ZG9YeTd2ZFFWNk1FLTQ1NzA2M2taUGFmQUxwalA2dTNrMkpicndiIiwiYWxnbyI6ImZ1bmN0aW9uIHRlc3QodGssZnAsdHMsYWksYWxnbyl7dmFyIHJkPSdyVTVoU1RVclBZNzgnO3ZhciBzdHI9XCJcIi5jb25jYXQodGspLmNvbmNhdChmcCkuY29uY2F0KHRzKS5jb25jYXQoYWkpLmNvbmNhdChyZCk7cmV0dXJuIGFsZ28uTUQ1KHN0cik7fSJ9\",\"e\":86400,\"t\":1741183595362}}}"
};
get_enviroment(proxy_array)