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

//if 转 switch语句是基于 https://t.zsxq.com/0e7Eecr47 这个插件修改

//先将for循环转成while循环，尽量减少对原插件的修改。顺便学习下 template 来构造节点。

let whileNODE = template(`while(1){A;}`);
const forToWhile = 
{
	ForStatement(path)
	{
		let {init,test,update,body} = path.node;
		
		if (init == null && update == null && update == null)
		{
			let whileNode = whileNODE({"A":body.body}); //template 就是好用。注意这里传body.body，要不然会多一个{};
			
			path.replaceWith(whileNode);
		}

	}
}


traverse(ast, forToWhile);

//稍作修改，适配当前混淆。
function collectSwitchCase(WhilePath,name)
{
	let ifNodes = [];
	
	WhilePath.traverse({
			"IfStatement"(path)
			{//遍历所有的ifStatement;
				let {test,consequent,alternate} = path.node; //获取子节点
				
				let {left,operator,right} = test; // 必定是BinaryExpression
				
				if (!types.isIdentifier(left,{name:name}) || operator != '<' || !types.isNumericLiteral(right)) 
				{//条件过滤
					return;
				}

				let value      = right.value;
				
				ifNodes[right.value-1] = consequent.body;   //保存整个body，记得生成switchCase节点的时候加上break节点。
				
				if (!types.isIfStatement(alternate))
				{
					ifNodes[right.value] = alternate.body;  //最后一个else，其实就是上一个else-if 的 test.right的值
				}				
			},
		})
	
	return ifNodes;
} 



//稍作修改，适配当前混淆。
const IfToSwitchNode = {
	"WhileStatement"(path)
	{
		let {test,body} = path.node;
		
		if (!types.isNumericLiteral(test,{value:1}) || body.body.length != 1) 
		{//条件过滤
			return;
		}
		
		let blockBody = body.body;
		
		if (!types.isIfStatement(blockBody[0]))
		{//条件过滤
			return;
		}

		let name = blockBody[0].test.left.name;   //变量名
		
		let ifNodes = collectSwitchCase(path,name);   //收集case
		
		if (ifNodes.length == 0) return;   //无case，直接返回。
		
		let len = ifNodes.length;
		
		for (let i=0; i < len; i++)
		{
			ifNodes[i].push(types.BreakStatement());  //每一个case最后都加break
			ifNodes[i] = types.SwitchCase(test = types.valueToNode(i),consequent = ifNodes[i]);  //生成SwitchCase节点
		}
		
		let switchNode = types.SwitchStatement(blockBody[0].test.left,ifNodes);   //生成SwitchCase节点
		
		path.node.body.body = [switchNode]; //最后的while节点只有一个Switch Node;
		
	},
}


traverse(ast, IfToSwitchNode);



//把指向下一个执行的case的值改成直接赋值 = ，而不是 +=;

const changeNextValue = 
{
	SwitchStatement(path)
	{
		let {discriminant,cases} = path.node;
		
		let switchName = discriminant.name;
		
		path.traverse({  //学习在path下的遍历，这个方法可以减少ast这个实参
			AssignmentExpression(_path)
			{
				let {parentPath,node} = _path; 
				if (!parentPath.isExpressionStatement({"expression":node}))
				{
					return;
				}
				
				
				let caseParentPath = _path.findParent(p => p.isSwitchCase());  //学习使用findParent来寻找满足回调函数条件的父节点
				 
				if (!caseParentPath)
				{//往上找不到，则返回null
					return;
				}

				
				let {left,operator,right} = node;
				
				if (!types.isIdentifier(left,{"name":switchName}))
				{//与 switch(a) 中的这个 a的name 必须一致。
					return;
				}
				
				let testValue = caseParentPath.node.test.value;
				
				if (operator == "-=" && types.isNumericLiteral(right))
				{
					let trueValue = testValue - right.value;
					
					_path.node.operator = "=";
					
					_path.node.right.value = trueValue;
					
					return;
				}
				if (operator == "+=" && types.isNumericLiteral(right))
				{
					let trueValue = testValue + right.value;
					
					_path.node.operator = "=";
					
					_path.node.right.value = trueValue;
					
					return;
				}				
				
				
			}
		})
		
	}
}

traverse(ast, changeNextValue);


//if表达式改三目表达式，方便后续遍历。

const ifToConditionalExpression =
{
	IfStatement(path)
	{
		
		let {test,consequent,alternate} = path.node;
		
		if (alternate == null) return;
		
		if (consequent.body.length != 1 || alternate.body.length != 1)
		{
			return;
		}
		
		let conseBody = consequent.body[0];
		let alterBody = alternate.body[0];
		
		if (!types.isExpressionStatement(conseBody) || !types.isExpressionStatement(alterBody))
		{
			return
		}
		
		let conseExpress = conseBody.expression;
		let alterExpress = alterBody.expression;
		
		if (!types.isAssignmentExpression(conseExpress) || !types.isNumericLiteral(conseExpress.right) || 
	      !types.isAssignmentExpression(alterExpress) || !types.isNumericLiteral(alterExpress.right))
		{
			return
		}
		
		let conseLeftName = conseExpress.left.name;
		let alterLeftName = alterExpress.left.name;
		
		if (conseLeftName == undefined || alterLeftName != alterLeftName)
		{
			return;
		}
		
		let ConditionalNode = types.ConditionalExpression(test,conseExpress,alterExpress);//注意条件表达式的构造。必须是expression类型。
		
		path.replaceWith(ConditionalNode);
		
	}
}


traverse(ast, ifToConditionalExpression);


console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});