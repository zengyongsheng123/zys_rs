const fs            = require('fs');
const types         = require("@babel/types");
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const generator     = require("@babel/generator").default;
const template      = require("@babel/template").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

let ast    = parser.parse(sourceCode);


console.time("处理完毕，耗时");



let localCode = "";
let ASSIGNNODE = template(`A = B;`);

const getEvalCode = 
{
	ReturnStatement(path)
	{
		let {argument} = path.node;
		
		let leftNode = types.Identifier("localCode");
		
		path.insertBefore(ASSIGNNODE({"A":leftNode,"B":argument}));
	},
	CallExpression(path)
	{
		let {callee,arguments} = path.node;
		
		if (types.isIdentifier(callee,{"name":"eval"}))
		{
			path.replaceWith(arguments[0]);
		}
	}
}


traverse(ast,getEvalCode);

eval(generator(ast).code);


ast = parser.parse(localCode);



const simplifyLiteral = {
	NumericLiteral({node}) {
		if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
			node.extra = undefined;
		}
  },
  StringLiteral({node}) 
  {
  	if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
  		node.extra = undefined;
    }
  },
}


traverse(ast,simplifyLiteral);



console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});