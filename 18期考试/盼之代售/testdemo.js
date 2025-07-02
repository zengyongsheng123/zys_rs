for (; ; )
    switch (e.prev = e.next) {
    case 0:
        if (t.data && (d.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8",
        d.defaults.headers.post["x-oss-forbid-overwrite"] = !0),
        r = {},
        "get" != t.method) {
            e.next = 8;
            break
        }
        return e.next = 5,
        Object(c.getSignature)(t.params);
    case 5:
        r = e.sent,
        e.next = 11;
        break;
    case 8:
        return e.next = 10,
        Object(c.getSignature)(t.data, "post");
    case 10:
        r = e.sent;
    case 11:
        if (o = n.getters["user/token"],
        a = u.get("pzdsCookie") || o,
        o && u.set("pzdsCookie", a),
        a && (t.headers.token = a),
        s = u.get("pzfrom") || n.getters.pzfrom,
        l = "string" == typeof u.get("bd_vid") ? u.get("bd_vid").split("d")[0] : u.get("bd_vid"),
        b = "string" == typeof n.getters.bd_vid ? n.getters.bd_vid.split("d")[0] : n.getters.bd_vid,
        g = l || b,
        f = u.get("qhclickid") || n.getters.qhclickid,
        h = u.get("sourceid") || n.getters.sourceid,
        v = u.get("uctrackid") || n.getters.uctrackid,
        A = u.get("markId") || n.getters.markId,
        w = u.get("keyword") || n.getters.keyword,
        q = null,
        g ? q = "BAIDU" : f ? q = "QIHU" : v ? q = "SM" : A ? q = "WEIBO" : h && (q = "QIHU_ZS"),
        t.headers.channelInfo = JSON.stringify({
            channelCode: s,
            tag: g || f || v || A || h,
            channelType: q,
            searchWord: encodeURIComponent(w)
        }),
        u.set("pzfrom", n.getters.pzfrom),
        u.set("bd_vid", n.getters.bd_vid),
        u.set("qhclickid", n.getters.qhclickid),
        u.set("sourceid", n.getters.sourceid),
        u.set("uctrackid", n.getters.uctrackid),
        u.set("markId", n.getters.markId),
        u.set("keyword", n.getters.keyword),
        t.headers.PZPlatform = "pc",
        JSON.parse(localStorage.getItem("setuserinfo")) && (t.headers.PZid = JSON.parse(localStorage.getItem("setuserinfo")).id),
        t.headers.PZOs = n.getters.operatingSystem,
        t.headers.PZVersion = m.version,
        t.headers.PZVersionCode = "1",
        t.headers.Skey = "CLIENT",
        t.headers.Sign = r.strMd5,
        t.headers.PZTimestamp = r.Timestamp,
        t.headers.Random = r.Random,
        "post" !== t.method) {
            e.next = 34;
            break
        }
        e.t0 = t.url,
        e.next = "/login" === e.t0 || "/code-login" === e.t0 || "/third-login" === e.t0 ? 30 : 32;
        break;
    case 30:
        return t.data = i()(t.data),
        e.abrupt("break", 32);
    case 32:
        e.next = 35;
        break;
    case 34:
        t.params = p({}, t.params);
    case 35:
        return e.abrupt("return", t);
    case 36:
    case "end":
        return e.stop()
    }


    //这里呢 我通过本地静态分析和日志分析 总结了一下
//首先 根据日志会执行0
//执行0之后
//        return e.next = 5,
//         Object(c.getSignature)(t.params);
//上面这这个return的意思就是说 下一个流程执行的是5 然后把 Object(c.getSignature)(t.params)之后的返回值给到下一个流程
//下一个流程通过 e.sent进行接收
//执行完5又会执行11
//        t.headers.Sign = r.strMd5,
//         t.headers.PZTimestamp = r.Timestamp,
//         t.headers.Random = r.Random,
//11里面有我们想要的东西 通过r对象进行获取 r=e.sent=Object(c.getSignature)(t.params)
//我们在0那个地方打断点看看
// 0 5 11 8 10 32 35



// 0 6 8 end
var g = function() {
    var t = Object(r.a)(regeneratorRuntime.mark((function t(e, n) {
        var o, r, a, c, s, l, d, f, p, g, h, S, T, b, v, E = arguments;
        return regeneratorRuntime.wrap((function(t) {
            for (; ; )
                switch (t.prev = t.next) {
                case 0:
                    if (o = E.length > 2 && void 0 !== E[2] && E[2],
                    r = n ? e : u({}, e),
                    !o) {
                        t.next = 6;
                        break
                    }
                    t.t0 = Date.now(),
                    t.next = 9;
                    break;
                case 6:
                    return t.next = 8,
                    m();
                case 8:
                    t.t0 = t.sent;
                case 9:
                    for (a = t.t0,
                    "",
                    s = "",
                    l = new Array(1,2,3,4,5,6,7,8,9),
                    d = 0; d < 6; d++)
                        f = Math.floor(9 * Math.random()),
                        s += l[f];
                    if (c = Number(s),
                    p = [],
                    n)
                        r ? p.push("PZTimestamp=" + a + "&Random=" + c + "&2147483647=" + encodeURIComponent(JSON.stringify(r))) : p.push("PZTimestamp=" + a + "&Random=" + c + "=" + encodeURIComponent(JSON.stringify(r)));
                    else {
                        for (S in r.PZTimestamp = a,
                        r.Random = c,
                        g = (g = Object.keys(r).sort()).sort((function(t, e) {
                            return t - e
                        }
                        )),
                        h = {},
                        g)
                            r[g[S]]instanceof Array && r[g[S]]instanceof Object && (r[g[S]] = JSON.stringify(r[g[S]])),
                            h[g[S]] = encodeURIComponent(r[g[S]]);
                        for (T in r = h)
                            (n || "null" !== r[T] && "undefined" !== r[T]) && p.push(T + "=" + r[T])
                    }
                    return b = p.join("&") + "&accessKey=3qXyB7uf",
                    I = void 0,
                    I = b.replace(/[(]/g, "%28"),
                    b = I = (I = (I = (I = (I = I.replace(/[)]/g, "%29")).replace(/[']/g, "%27")).replace(/[*]/g, "%2A")).replace(/[~]/g, "%7E")).replace(/[!！]/g, "%21"),
                    v = i()(b),
                    t.abrupt("return", {
                        Timestamp: a,
                        strMd5: v,
                        Random: c
                    });
                case 22:
                case "end":
                    return t.stop()
                }
            var I
        }
        ), t)
    }
    )));
    return function(e, n) {
        return t.apply(this, arguments)//你可以这样理解return t(arguments)
    }
}();


//简单的说一下这个apply吧
//func.apply(this,[arg,arg,...])
//他就说类似于
//func(arg,arg,...)这种 只不过他的this指向发生了变化而已












