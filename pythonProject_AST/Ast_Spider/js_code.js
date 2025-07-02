// npm install @babel/core --save
// npm install fs --save
const files = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const template = require("@babel/template").default;
js_code = 'var a = 1;'
const ast = parser.parse(js_code);
const visitor = traverse(ast,{
    VariableDeclarator(path)
        {
      if(path.node.id.name === 'a'){
          path.node.id.name = 'b';
          console.log(path.node.id.name);
          let newid = types.identifier("b");
          console.log(newid);
      }
    }
});

let newNode = template.ast('console.log("hello world")')
console.log(newNode);