
function ccc() {
        return UUU() || {}
    }

function UUU() {
    for (var A = C[i++], W = [], L = C[i++], t = C[i++], Q = [], S = 0; S < L; S++)
        W[C[i++]] = k[C[i++]];
    for (S = 0; S < t; S++)
        Q[S] = C[i++];
    k.push(function U() {
        var L = W.slice(0);
        L[0] = [this],
            L[1] = [arguments],
            L[2] = [U];
        for (var t = 0; t < Q.length && t < arguments.length; t++)
            0 < Q[t] && (L[Q[t]] = [arguments[t]]);
        return __TENCENT_CHAOS_VM(A, C, Z, L, B, y, X, F)
    })
}
function a(t) {
        UUU(t)
    }
var getTdcData = function() {
        return a({
            ft: "qf_7Pf__H"
        }),
        UUU(true) || "---"
    }
var getKeyInfo = function() {
        return (ccc() || {}).info || ""
    }

function workLoadData(t, e) {
            var r = this;
            this.workLoadData = {
                workloadAns: null,
                workloadDuration: null,
                workloadTarget: t.md5,
                workloadNonce: t.prefix,
                runWorkload: true
            },
            this.workLoadLog = [],
            (this.workerLoader && this.workerLoader.terminate(),
            this.workerLoader = new a["default"],
            this.workLoadLog = [],
            this.workLoadLog.push("useWebWorker:".concat(this.workerLoader.useWebWorker)),
            this.workerLoader.run({
                target: this.workLoadData.workloadTarget,
                nonce: this.workLoadData.workloadNonce
            }, function(t) {
                r.workLoadLog.push("web worker run cb: ".concat(JSON.stringify(t))),
                r.workLoadData.workloadAns = "".concat(t.ans),
                r.workLoadData.workloadDuration = t.duration,
                e()
            }))
    return this.workLoadData
        }


function verify(t, e, r) {
    var params = {}
    var n, i = this, a = decodeURIComponent((0,
        getTdcData)()), s = (0,
        getKeyInfo)(), c = {
        collect: a,
        tlg: a.length,
        eks: s,
        sess: this.sess,
        ans: JSON.stringify(t)
    }, u = workLoadData();
    c.pow_answer = "".concat(u.workloadNonce).concat(u.workloadAns),
        c.pow_calc_time = u.workloadDuration;
    params = c;
    return params
}

console.log(verify());
