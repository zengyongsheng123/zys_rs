http://www.cninfo.com.cn/new/commonUrl?url=disclosure/list/notice#szseGem


// 请求参数
body = 'column=szse_gem_latest&pageNum=2&pageSize=30&sortName=&sortType=&clusterFlag=true'

// 构造请求
let e = {
    'url':"http://www.cninfo.com.cn/new/disclosure",
    'method':'POST',
    "data": body
}
var h  = new  XMLHttpRequest();
// 初始化链接
h.open(e.method,e.url,true);
// 设置头部
h.setRequestHeader('accept','application/json;charset=UTF-8');
// 接收响应
    h.onreadystatechange = function (){
        if (h.status===200){
            console.log(JSON.parse(h.response))
        }
    }
// 发请求
h.send(e.data)