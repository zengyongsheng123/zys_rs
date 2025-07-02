console.log('相乘::', b[b.length - 2], '*', b[b.length - 1], '=', b[b.length - 2] * b[b.length - 1])
console.log('相减::', b[b.length - 2], '-', b[b.length - 1], '=', b[b.length - 2] - b[b.length - 1])
console.log('按位或::', b[b.length - 2], '|', b[b.length - 1], '=', b[b.length - 2] | b[b.length - 1])
console.log('相除::', b[b.length - 2], '/', b[b.length - 1], '=', b[b.length - 2] / b[b.length - 1])
console.log('相加::', b[b.length - 2], '+', b[b.length - 1], '=', b[b.length - 2] + b[b.length - 1])
console.log('按位与::', b[b.length - 2], '&', b[b.length - 1], '=', b[b.length - 2] & b[b.length - 1])
console.log('按位异或::', b[b.length - 2], '^', b[b.length - 1], '=', b[b.length - 2] ^ b[b.length - 1])
console.log('无符号右移::', b[b.length - 2], '>>>', b[b.length - 1], '=', b[b.length - 2] >>> b[b.length - 1])
console.log('右移::', b[b.length - 2], '>>', b[b.length - 1], '=', b[b.length - 2] >> b[b.length - 1])
console.log('取余::', b[b.length - 2], '%', b[b.length - 1], '=', b[b.length - 2] % b[b.length - 1])
console.log('左移::', b[b.length - 2], '<<', b[b.length - 1], '=', b[b.length - 2] << b[b.length - 1])



// b.pop().apply(U, N)
// '方法-->',b[b.length-1],'当前对象-->',U,'传入值-->',N,'结果-->',b[b.length-1].apply(U,N)


// Z[0][Z[1]].apply(Z[0], N)
// '方法-->',Z[0][Z[1]],'当前对象-->',Z[0],'传入的值-->',N,'结果-->',Z[0][Z[1]].apply(Z[0], N)

// '方法-->',E[0][E[1]],'当前对象-->',E[0],'传入的值-->',S,'结果-->',E[0][E[1]].apply(E[0], S)
// '方法-->',x[0][x[1]],'当前对象-->',x[0],'传入的值-->',H,'结果-->',x[0][x[1]].apply(x[0], H)
// '方法-->',H[0][H[1]],'当前对象-->',H[0],'传入的值-->',x,'结果-->',H[0][H[1]].apply(H[0], x)
// 指令集转成可eval的字符串
// function() {
//     b[b.length - 1] += String.fromCharCode(c[m++])
//     // console.log(b[b.length - 1] )
// }
// 执行指令1
// , , , function() {
//     var E = c[m++]
//       , S = E ? I.slice(-E) : [];
//     I.length -= E,
//     // console.log('func::',I[I.length-1],'\n','this::',w,'\n','args::',S,'\n','ret::',I[I.length-1].apply(w,S))
//     I.push(I.pop().apply(w, S))

// }

// 执行指令2
// function() {
//     var E = c[m++]
//         , S = E ? I.slice(-E) : []
//         , E = (I.length -= E,
//             I.pop());
//     I.push(E[0][E[1]].apply(E[0], S));
//     // console.log('func::',E[0][E[1]],'\n','this::',E[0],'\n','args::',S,'\n','ret::',I[I.length-1])
// }

'args0::',S
'rest0::',I[I.length-1]
'args1::',S
'rest1::',I[I.length-1]