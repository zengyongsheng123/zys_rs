
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true //需明确设置
}));

function add(a,b)
{
    return a + b;
}

app.post('/', function (req, res) {
    var a = req.body.a;
    var b = req.body.b;
    var value = add(a,b);
    console.log("The result is : ",value);
    res.send(value)
})


const port = 3000;
app.listen(port, () => {
    console.log("服务已开启，端口 : ", port);
});





