const files = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
template = require("@babel/template").default;
const js_code = files.readFileSync("./demo.js", { encoding: "utf-8" });
const ast = parser.parse(js_code);
const visitor = traverse(ast, {
      VariableDeclaration(path){
          // console.log(path.node.type);
          let initpath = path.get('declarations.0.init');
          // console.log(initpath);
            if(path.node.type === "VariableDeclaration"){
                path.node.declarations.forEach(item => {
                    if(item.id.name === "a"){
                        item.init.value = "hello world";
                        console.log(item.init.value);
                    }
                });
            }
            const {code} = generator(path.node);
            console.log(code);
      }
});

code = generator(ast).code;
files.writeFileSync("./output.js", code);
