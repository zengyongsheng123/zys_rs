function encode(data){
    var t = [];
    for (var n in data)
        t.push(encodeURIComponent(n) + "=" + encodeURIComponent(data[n]));
    return t.join("&")
}