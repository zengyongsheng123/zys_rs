const files = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const {template} = require("@babel/core");
const { type } = require('os');
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

//js混淆代码读取
let encodeFile = process.argv.length > 2 ? process.argv[2] : "../demo.js";
let decodeFile = process.argv.length > 3 ? process.argv[3] : "output.js";

let Decode_FuncCode = files.readFileSync("source.js", { encoding: "utf-8" });
eval(Decode_FuncCode);

//将源代码解析为AST
let sourceCode = files.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);

//处理16进制和Unicode转义序列
const simplifyLiteral = {
  NumericLiteral({ node }) {
    if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
      node.extra = undefined;
    }
  },
  StringLiteral({ node }) {
    if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
      node.extra = undefined;
    }
  },
}
traverse(ast, simplifyLiteral);

//常量折叠
const ConstFold={
    BinaryExpression(path){
      let {left,operator,right}=path.node;
      // if(!types.isBinaryExpression(left)){return;}
      // if(!types.isStringLiteral(right)){return;}
      if(operator!=="+"){return;}
      let {value,confident}=path.evaluate();
      if(value==="undefined"){return}
      if(confident==="undefined"){return;}
      if(!(typeof value==="number")){return;}
      console.log(path.toString()+"======>"+value);
      path.replaceWith(types.valueToNode(value));
    }
}
traverse(ast,ConstFold);

const varMap = {};
traverse(ast, {
  VariableDeclarator(path) {
    const id = path.node.id;
    const init = path.node.init;

    if (types.isIdentifier(id) && types.isIdentifier(init)) {
      varMap[id.name] = init.name; // 记录变量名与其初始值
    }
  }
});
function collectReferences(targetVar, varMap) {
  const collected = new Set();
  let queue = [targetVar];
  while (queue.length > 0) {
    const currentVar = queue.shift();
    // 查找所有变量名中，初始值指向 currentVar 的变量
    const referringVars = Object.keys(varMap).filter(
      varName => varMap[varName] === currentVar
    );
    referringVars.forEach(varName => {
      if (!collected.has(varName)) {
        collected.add(varName);
        queue.push(varName);
      }
    });
  }
  return Array.from(collected);
}
const referencedVars = collectReferences('_0x383e', varMap);

const Restore_CallExpression={
    CallExpression(path){
      let {callee,arguments}=path.node;
      let {name}=callee;
      if(arguments.length!==1||!types.isNumericLiteral(arguments[0])){return;}
      if(referencedVars.indexOf(name)===-1){return;}
      let {value}=arguments[0];
      console.log(path.toString()+"======>"+_0x383e(value));
      path.replaceWith(types.valueToNode(_0x383e(value)));
    }
}
traverse(ast, Restore_CallExpression);

//if语句标准化
const IfStatementToNormal={
    IfStatement:(path)=>{
        let {test,consequent}=path.node;
        if(!types.isExpressionStatement(consequent)){return;}
        debugger;
        path.replaceWith(types.blockStatement([consequent]));
    }
}
// traverse(ast,IfStatementToNormal);


//重新生成源代码
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});
files.writeFile(decodeFile, code, (err) => { });