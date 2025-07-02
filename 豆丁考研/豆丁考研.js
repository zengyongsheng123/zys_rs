var crypto = require('crypto-js');
function getUtcTimestamp() {
    return Math.floor((new Date()).getTime() / 1000);
}
function Guid(g){
    var arr = new Array(); //存放32位数值的数组
    if (typeof(g) == "string"){ //如果构造函数的参数为字符串
        InitByString(arr, g);
    }
    else{
        InitByOther(arr);
    }
    this.Equals = function(o){
        if (o && o.IsGuid){
             return this.ToString() == o.ToString();
        }
        else{
             return false;
        }
    }
    this.IsGuid = function(){}
    //返回 Guid 类的此实例值的 String 表示形式。
    this.ToString = function(format){
        if(typeof(format) == "string"){
             if (format == "N" || format == "D" || format == "B" || format == "P"){
                  return ToStringWithFormat(arr, format);
             }
             else{
                  return ToStringWithFormat(arr, "D");
             }
        }
        else{
             return ToStringWithFormat(arr, "D");
        }
    }
    function InitByString(arr, g){
        g = g.replace(/\{|\(|\)|\}|-/g, "");
        g = g.toLowerCase();
        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1){
             InitByOther(arr);
        }
        else{
             for (var i = 0; i < g.length; i++){
                  arr.push(g[i]);
             }
        }
    }
    function InitByOther(arr){
        var i = 32;
        while(i--){
             arr.push("0");
        }
    }
    function ToStringWithFormat(arr, format){
        switch(format){
             case "N":
                  return arr.toString().replace(/,/g, "");
             case "D":
                  var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20,32);
                  str = str.replace(/,/g, "");
                  return str;
             case "B":
                  var str = ToStringWithFormat(arr, "D");
                  str = "{" + str + "}";
                  return str;
             case "P":
                  var str = ToStringWithFormat(arr, "D");
                  str = "(" + str + ")";
                  return str;
             default:
                  return new Guid();
        }
    }
}
    Guid.Empty = new Guid();
    Guid.NewGuid = function(){
        var g = "";
        var i = 32;
        while(i--){
            g += Math.floor(Math.random()*16.0).toString(16);
        }
        return new Guid(g);
    }
    function newGuid(){
        return Guid.NewGuid().ToString('N').toUpperCase();
    }
function sign1(timestamp, nonce, application, version, body) {
    var secret = "SV1dLfFDS32DS97jk32Qkjh34";
    var str = secret + "&" + timestamp + "&" + nonce + "&" + application + "&" + version + "&" + body;
    return crypto.MD5(str).toString().toUpperCase();
}
// var data = '{"SearchType":0,"SearchKeyword":"复试","DocumentType":" ","UniversityCode":"","MajorCode":"","ExamSubjectList":[],"PageIndex":2,"PageSize":30}';
function get_data(data) {
    var body = data,
        timestamp = getUtcTimestamp().toString(),
        nonce = newGuid(),
        application = 'Pdfreader.Web',
        version = 'V2.2',
        sign = sign1(timestamp, nonce, application, version, body);
    return {'X-Nonce': nonce, 'X-Sign': sign, 'X-Timestamp': timestamp}
}
// get_data()

