!(function () {
    if (window._flag) {
    }
    else{
        var websocket = new WebSocket('ws://127.0.0.1:8081')
        window._flag = true;
        // 接受py发送的数据
        websocket.onmessage = function (event) {
            var data = event.data
            var res = b(data)
            console.log(res)
            // 把解密之后的数据发送给py
            websocket.send(res)
        }
    }
}())







