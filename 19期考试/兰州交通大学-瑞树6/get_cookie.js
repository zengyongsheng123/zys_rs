require('./source');
// require('./tmp');
function get_cookie() {
    let tm_ck = document.cookie.toString().split(';')[0].split('=')
    return {
        name: tm_ck[0],
        value: tm_ck[1]
    }
}

console.log(get_cookie());