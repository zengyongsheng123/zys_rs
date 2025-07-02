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


const removeDeadCode = {
	"IfStatement|ConditionalExpression"(path)
	{
		let {consequent,alternate} = path.node;
		let testPath = path.get('test');
		const evaluateTest = testPath.evaluateTruthy();
		if (evaluateTest === true)
		{
			if (types.isBlockStatement(consequent))
			{
				consequent = consequent.body;
			}
			path.replaceWithMultiple(consequent);
		}
		else if (evaluateTest === false)
		{
			if (alternate != null)
			{
				if (types.isBlockStatement(alternate))
			  {
			  	alternate = alternate.body;
			  }
				path.replaceWithMultiple(alternate);
			}
			else
			{
				path.remove();
			}
		}  		
	},
  "EmptyStatement|DebuggerStatement"(path)
  {
  	path.remove();
  },  
  
}



traverse(ast, removeDeadCode);



const DeclaratorToDeclaration = 
{
   VariableDeclaration(path)
   {
      let {parentPath,node} = path;
   	  if (!parentPath.isBlock())
   	  {
   	 	 return;
   	  }
      let {declarations,kind} = node;
     
      if (declarations.length === 1)
      {
         return;
      }

      let newNodes = [];

      for (const varNode of declarations)
      {
         let newDeclartionNode = types.VariableDeclaration(kind,[varNode]);
         newNodes.push(newDeclartionNode);
      }

      path.replaceWithMultiple(newNodes);

   },
}

traverse(ast, DeclaratorToDeclaration);



const changeCallExpression = 
{
	CallExpression(path)
	{
		let {callee,arguments} = path.node;
		
		if (!types.isMemberExpression(callee))
		{
			return;
		}
		
		let {object,property} = callee;
		
		if (!['S','M','T'].includes(object.name))
		{
			//console.log(path.toString())
			return;
		}
		
		if (types.isIdentifier(property,{"name":"apply"}) && arguments.length == 2)
		{
			let newCallNode = types.CallExpression(object,arguments[1].elements);
			
			path.replaceWith(newCallNode);
			
			return;
		}
		if (types.isIdentifier(property,{"name":"call"}) && arguments.length == 2)
		{
			
			let newCallNode = types.CallExpression(object,arguments.slice(1));
			
			path.replaceWith(newCallNode);
			
			return;
		}		
		
	}
}

traverse(ast,changeCallExpression);





const standardLoop =
{
    "ForStatement|WhileStatement|ForInStatement|ForOfStatement"({ node }) {
        if (!types.isBlockStatement(node.body)) {
            node.body = types.BlockStatement([node.body]);
        }
    },
    IfStatement(path)
    {
    	const consequent = path.get("consequent");
    	const alternate  = path.get("alternate");
    	if (!consequent.isBlockStatement()) 
    	{
    		consequent.replaceWith(types.BlockStatement([consequent.node]));
    	}
    	if (alternate.node !== null && !alternate.isBlockStatement()) {
    		alternate.replaceWith(types.BlockStatement([alternate.node]));
    	}
    },
}

traverse(ast, standardLoop);

function SequenceOfStatement(path) {
	let { scope, parentPath, node } = path;
	let ancestorPath = parentPath.parentPath;
	if (ancestorPath.isLabeledStatement())
	{//标签节点无法往前插入。
		return;
	}
	let expressions = node.expressions;
	if (parentPath.isReturnStatement({ "argument": node })) {
		parentPath.node.argument = expressions.pop();
	}
	else if (parentPath.isThrowStatement({ "argument": node })) {
		parentPath.node.argument = expressions.pop();
	}	
	else if (parentPath.isIfStatement({ "test": node }) ||
		parentPath.isWhileStatement({ "test": node })) {
		parentPath.node.test = expressions.pop();
	}
	else if (parentPath.isForStatement({ "init": node })) {
		parentPath.node.init = expressions.pop();
	}
	else if (parentPath.isForInStatement({ "right": node })) {
		parentPath.node.right = expressions.pop();
	}	
	else if (parentPath.isSwitchStatement({ "discriminant": node })) {
		parentPath.node.discriminant = expressions.pop();
	}
	else if (parentPath.isCallExpression({ "callee": node })) {
		parentPath.node.callee = expressions.pop();
	}
	else if (parentPath.isExpressionStatement({ "expression": node })) {
		parentPath.node.expression = expressions.pop();
	}
	else {
		return;
	}

	for (let expression of expressions) {
		parentPath.insertBefore(types.ExpressionStatement(expression = expression));
	}
}


function SequenceOfExpression(path) {

	let { scope, parentPath, node, parent } = path;
	let ancestorPath = parentPath.parentPath;
	let expressions = node.expressions;
	if (parentPath.isConditionalExpression({ "test": node }) &&
		ancestorPath.isExpressionStatement({ "expression": parent })) {
		parentPath.node.test = expressions.pop();
	}
	else if (parentPath.isVariableDeclarator({ "init": node }) &&
		ancestorPath.parentPath.isBlock()) {
		parentPath.node.init = expressions.pop();
	}
	else if (parentPath.isAssignmentExpression({ "right": node }) &&
		ancestorPath.isExpressionStatement({ "expression": parent })) {
		parentPath.node.right = expressions.pop();
	}
	else if (parentPath.isUnaryExpression({ "argument": node }) &&
		ancestorPath.isExpressionStatement({ "expression": parent })) {
		parentPath.node.argument = expressions.pop();
	}
	else {
		return;
	}

	for (let expression of expressions) {
		ancestorPath.insertBefore(types.ExpressionStatement(expression = expression));
	}
}



const resolveSequence =
{
	SequenceExpression:
	{//对同一节点遍历多个方法
		exit: [SequenceOfStatement, SequenceOfExpression]
	}
}

traverse(ast,resolveSequence);




const callToConditionalExpression =
{
	CallExpression: {
		exit(path) {
			let { callee, arguments } = path.node;
			if (arguments.length != 1 || !types.isConditionalExpression(arguments[0])) {
				return;
			}

			let { test, consequent, alternate } = arguments[0];

			let consequentCallNode = types.CallExpression(callee, [consequent]);
			let alternateCallNode  = types.CallExpression(callee, [alternate]);

			let ConditionalNode = types.ConditionalExpression(test, consequentCallNode, alternateCallNode);

			path.replaceWith(ConditionalNode);
		}

	},
}

traverse(ast, callToConditionalExpression);



console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});