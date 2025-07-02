const fs            = require('fs');
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const types         = require("@babel/types");
const generator     = require("@babel/generator").default;

//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});
let ast    = parser.parse(sourceCode);



//判断节点元素是否为字面量
//eg.  ++123,-456,"789";
function isBaseLiteral(path)
{
	if (path.isLiteral())
	{
		return true;
	}
	if (path.isUnaryExpression({operator:"-"}) ||
	    path.isUnaryExpression({operator:"+"}))
	{
		return isBaseLiteral(path.get('argument'));
	}

	return false;
}


//判断节点元素[Arrays]是否全部为字面量
function isElementsLiteral(path)
{
	let key = null;

	if (path.isArrayExpression())
	{
		key = "elements";
	}
	else if(path.isObjectExpression())
	{
		key = "properties";
	}
	else if(path.isCallExpression())
	{
		key = "arguments";
	}
	else
	{
		return isBaseLiteral(path);
	}

	let elements = path.get(key);

	if (elements.length == 0) return false;

	if (key == "properties")
	{
		return elements.every(element => isBaseLiteral(element.get("value")));
	}

	return elements.every(element=>isBaseLiteral(element));
}



const restoreVarDeclarator = {

	VariableDeclarator(path)
	{
		let {id,init} = path.node;
		if (!types.isIdentifier(id)) return;
		let initPath = path.get("init");
		if (initPath.isUnaryExpression({operator:"+"}) ||
		  initPath.isUnaryExpression({operator:"-"}))
		{// -5或者 +"3" 也可以算作是字面量
			if (!types.isLiteral(init.argument)) return;
		}

		else if (initPath.isIdentifier())
		{
			let name = init.name;
			let browserEnv = ["window",'document','navigator','Image','XMLHttpRequest','location'];
			if (!browserEnv.includes(name) || typeof global[name] == undefined)
			{
				let binding = path.scope.getBinding(init.name);
				if (!binding || !binding.constant) return;
			}
		}



		//如果初始值非Literal节点或者Identifier节点，不做还原
		//有时候为MemberExpression节点时，也可以还原，视情况而论
		//请大家自行添加，通用插件不做处理。
		else if (!initPath.isLiteral())
		{
			return;
		}

		const binding = path.scope.getBinding(id.name);

		//判断初始值是否被更改
		if (!binding || !binding.constant) return;

		//获取所有引用的地方并替换
		let referPaths = binding.referencePaths;
		for (let referPath of referPaths)
		{
			referPath.replaceWith(init);
		}
		//替换完毕，直接删除即可。
		path.remove();
	},
}

traverse(ast, restoreVarDeclarator);





const CalcCallExpression =
{
	FunctionDeclaration(path)
	{
		let {id,body} = path.node;
		const binding = path.scope.parent.getBinding(id.name);
		if (!binding || !binding.constant) return;
		if (!binding.referenced)
		{
			path.remove();
			return;
		}

		let sourceCode = path.toString();
		if (sourceCode.includes("try") ||
		    sourceCode.includes("random") ||
		    sourceCode.includes("Date")
		)
		{//返回值不唯一不做处理
			return;
		}

		//直接eval，如果缺环境，让其主动报错，再补上即可。下同
		eval(sourceCode);

		let referPaths = binding.referencePaths;
		for (const referPath of referPaths)
		{
			let callExpress = referPath.parentPath;
			if (!callExpress.isCallExpression({callee:referPath.node}))
			{
				continue;
			}
			if (!isElementsLiteral(callExpress)) continue;
			let value = eval(callExpress.toString());
			if (typeof value == "function" || typeof value == "undefined") continue;

			console.log(callExpress.toString(),"-->",value);
			callExpress.replaceWith(types.valueToNode(value));
		}
	},
}


traverse(ast, CalcCallExpression);

const constantFold =
{
	 "BinaryExpression|UnaryExpression|ConditionalExpression|SequenceExpression"(path)
  {
  	if(path.isUnaryExpression({operator:"-"}) ||
  	  path.isUnaryExpression({operator:"void"}))
  	{
  		return;
  	}
  	const {confident,value} = path.evaluate();
  	if (!confident || value == "Infinity") return;
  	if (typeof value == 'number' && isNaN(value)) return;
  	path.replaceWith(types.valueToNode(value));
  },
}

traverse(ast, constantFold);


traverse(ast, restoreVarDeclarator);



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

traverse(ast, simplifyLiteral);

let {code} = generator(ast);

fs.writeFile(decodeFile, code, (err) => {});