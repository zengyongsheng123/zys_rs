//
// var a = '丽丽'
// var b = '菲菲'
// var c = '莹莹'
// var d = a+b
// var e = c + d


// var a ;
// a = '丽丽'
// var b;
// b = '菲菲'
// var c;
// c = '莹莹'
// var d;
// a+b;
// d = ?;
// var e;
// c+d;
// e = ?;


// 我们假设赋值指令为 1, 加和指令为 2,声明指令为 3
// 如果按照从上到下的顺序，我们就可以将他们的操作变成指令性的[用|分割左侧和右侧]
// 1 赋值
// 2 加
// 3 声明

// 3 --- var | a
// 1 --- a |  '丽丽'
// 3 --- var | b
// 1 --- b |  '菲菲'
// 3 --- var | c
// 1 --- c |  '莹莹'
// 3 --- var | d
// 2 --- a | b  -----> ?
// 1 --- d | ?
// 3 --- var | e
// 2 --- d | c   -----> ?
// 1 --- e | ?


// 给到浏览器的代码
// _stack = [
//             [3, 'var', 'a'],
//             [1, 'a', '丽丽'],
//             [3, 'var', 'b'],
//             [1, 'b', '菲菲'],
//             [3, 'var', 'c'],
//             [1, 'c', '莹莹'],
//             [3, 'var', 'd'],
//             [2, 'a', 'b'],
//             [1, 'd', '?'],
//             [3, 'var', 'e'],
//             [2, 'd', 'c'],
//             [1, 'e', '?'],
//         ]


!function(_stack) {
    var register;   // 这个就当做是问号的存储位置
    var variable = {};   // 这个就当做是var变量的存储位置。由于没有其他声明方式的存在，所就不写其他的了
    for (let i = 0; i < _stack.length; i++) {
        instruct = _stack[i][0];
        left = _stack[i][1];
        right = _stack[i][2];
        if (instruct === 3) {
            variable[right] = ''
        }
        if (instruct === 1) {
            if (right === '?') {
                variable[left] = register
            } else {
                variable[left] = right
            }
        }
        if (instruct === 2) {
            register = variable[left] + variable[right]
        }
    };
    console.log(variable)
} ([
            [3, 'var', 'a'],
            [1, 'a', '丽丽'],
            [3, 'var', 'b'],
            [1, 'b', '菲菲'],
            [3, 'var', 'c'],
            [1, 'c', '莹莹'],
            [3, 'var', 'd'],
            [2, 'a', 'b'],
            [1, 'd', '?'],
            [3, 'var', 'e'],
            [2, 'd', 'c'],
            [1, 'e', '?'],
        ]
)


// jsvmp


