const fs            = require('fs');
const types         = require("@babel/types");
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const generator     = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

let ast    = parser.parse(sourceCode);


console.time("处理完毕，耗时");


let rightVarList = new Map();

const collectMatchVarDefine = 
{//收集符合条件的变量定义，避免重复判断浪费时间。
	VariableDeclarator(path)
	{
		let {node, scope} = path;
		let {id, init} = node;
    if (!types.isIdentifier(id) || !types.isIdentifier(init))
    {
    	return;
    }
    const binding = scope.getBinding(id.name);
     
    if (!binding || !binding.constant)//如果被更改则不能进行替换
    {
     return;
    }
    
    if (rightVarList.has(id.name))
    {
    	console.log("发现同名变量，请不要使用该插件。");
    }
    
    rightVarList.set(id.name,init.name);
	}
}


traverse(ast,collectMatchVarDefine);


const deleteRepeatDefineOfVar = 
{
	VariableDeclarator(path)
	{
		let {parentPath,node,scope} = path;
		let {id,init} = node;
		let oldId = id;
		let name = id.name;
		
		const binding = scope.getBinding(name);
    
    if (!binding || !binding.constant) return;
    
    scope.traverse(scope.block, {
    	VariableDeclarator(path) {
    		let {node,scope} = path;
    		let {id, init} =path.node;
    		if(!rightVarList.has(id.name) || !types.isIdentifier(init, {name: name}))
    		{
    			return;
    		}
    		
    		const binding = scope.getBinding(id.name);
    		for (let referPath of binding.referencePaths)
        {
        	referPath.replaceWith(oldId);//使用replaceWith函数比rename函数更快。
        }
        path.remove();
        scope.crawl();

      },});
	},
}


traverse(ast,deleteRepeatDefineOfVar);

console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});