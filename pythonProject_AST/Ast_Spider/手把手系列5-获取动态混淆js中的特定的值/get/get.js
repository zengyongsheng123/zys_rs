const express = require('express');
const app = express();

function add(a,b)
{
  return a + b;
}

app.get('/', function (req, res) {
  let params = req.query;
  let  value = add(params.a,params.b);
  console.log("The result is : ",value);
  res.send(value);
})

const port = 3000;
app.listen(port, () => {
    console.log("服务已开启，端口 : ", port);
});