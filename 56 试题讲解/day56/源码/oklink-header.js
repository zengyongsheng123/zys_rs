const {getApiKey} = require( "./oklink-apikey.js")
async function get_key(str) {
    var t = str
    var r = ""
    var res = await crypto.subtle.digest("SHA-256", (new TextEncoder).encode(t))
    for (n = res,
             i = Array.from(new Uint8Array(n)),
             a = i.map((function (e) {
                     return e.toString(16).padStart(2, "0")
                 }
             )).join(""),
             c = Date.now(),
             u = Math.floor(c / 1e3),
             s = Math.floor(u / 600 % 32),
             l = Math.floor(u / 3600 % 32),
             f = 0; f < 32; f++)
        p = a[(s + (l + f) * f) % 32],
            r += p;
    return {
        key: await crypto.subtle.importKey("raw", (new TextEncoder).encode(r), {
            name: "HMAC",
            hash: "SHA-256"
        }, !1, ["sign"]),
        timestamp: c
    }
}


async function encrypt(url) {
  const token = get_token()
    const key = await get_key(token)
    const {signature, timestamp} = await HMAC_SHA256(key, url)
    return {
    "App-Type": "web",
    "Accept": "application/json",
    "X-Utc": "8",
    "X-Locale": "zh_CN",
    "X-Zkdex-Env": "0",
    "X-Cdn": "https://static.oklink.com",
    "Ok-Verify-Token": token,
    "Ok-Timestamp": timestamp+"",
    "Ok-Verify-Sign": signature,
    "Devid": "6c776349-2829-41d8-902a-7aa96498d147",
    "X-Site-Info": "9FjOikHdpRnblJCLiskTJx0SPJiOiUGZvNmIsIiTDJiOi42bpdWZyJye",
    "X-Id-Group": "2030118139167990001-c-5",
    "X-Apikey": getApiKey()
}
    return
}

function G(e) {
    return function (e) {
        if (Array.isArray(e))
            return M(e)
    }(e) || function (e) {
        if ("undefined" !== typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
            return Array.from(e)
    }(e) || $(e) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
    }()
}

async function HMAC_SHA256(result, url) {
    const {key: n, timestamp: o} = await result
    const i = url.replace("?","")
    const a = await crypto.subtle.sign("HMAC", n, (new TextEncoder).encode(i));

    const s = btoa(String.fromCharCode.apply(String, G(new Uint8Array(a))))
    return {
        signature: s,
        timestamp: o
    };
}

function get_token(){
    return crypto.randomUUID ? crypto.randomUUID() : (new Date).getTime()
}

// encrypt( "/api/explorer/v1/btc/transactionsNoRestrictoffset=360&limit=20&t=1731804462666").then(res=>{
//     console.log(res)
// })

encrypt(process.argv[3]).then(res=>console.log(JSON.stringify(res)))