const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./encode.js";  //默认的js文件
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = encodeFile.replace(".js", "") + "_ok.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);
console.time("处理完毕，耗时");


const keyToLiteral = {
	MemberExpression:
	{
		exit({ node }) {
			const prop = node.property;
			if (!node.computed && types.isIdentifier(prop)) {
				node.property = types.StringLiteral(prop.name);
				node.computed = true;
			}
			if (node.computed && types.isArrayExpression(prop) && 
			    prop.elements.length == 1 && types.isStringLiteral(prop.elements[0]))
			{
				node.property = prop.elements[0];
			}
		}
	},
	ObjectProperty:
	{
		exit({ node }) {
			const key = node.key;
			if (!node.computed && types.isIdentifier(key)) {
				node.key = types.StringLiteral(key.name);
				return;
			}
			if (node.computed && types.isStringLiteral(key)) {
				node.computed = false;
			}
		}
	},
}

traverse(ast, keyToLiteral);


const standardLoop =
{
	"ForStatement|WhileStatement|ForInStatement|ForOfStatement"({ node }) {
		if (!types.isBlockStatement(node.body)) {
			node.body = types.BlockStatement([node.body]);
		}
	},
	IfStatement(path) {
		const consequent = path.get("consequent");
		const alternate = path.get("alternate");
		if (!consequent.isBlockStatement()) {
			consequent.replaceWith(types.BlockStatement([consequent.node]));
		}
		if (alternate.node !== null && !alternate.isBlockStatement()) {
			alternate.replaceWith(types.BlockStatement([alternate.node]));
		}
	},
}

traverse(ast, standardLoop);


const DeclaratorToDeclaration =
{
	VariableDeclaration(path) {
		let { parentPath, node } = path;
		if (!parentPath.isBlock()) {
			return;
		}
		let { declarations, kind } = node;

		if (declarations.length === 1) {
			return;
		}

		let newNodes = [];

		for (const varNode of declarations) {
			let newDeclartionNode = types.VariableDeclaration(kind, [varNode]);
			newNodes.push(newDeclartionNode);
		}

		path.replaceWithMultiple(newNodes);

	},
}

traverse(ast, DeclaratorToDeclaration);



function SequenceOfStatement(path) {
	let { scope, parentPath, node } = path;
	if (parentPath.parentPath.isLabeledStatement()) {//标签节点无法往前插入。
		return;
	}
	let expressions = node.expressions;
	if (parentPath.isReturnStatement({ "argument": node }) ||
		parentPath.isThrowStatement({ "argument": node })) {
		parentPath.node.argument = expressions.pop();
	}
	else if (parentPath.isIfStatement({ "test": node }) ||
		parentPath.isWhileStatement({ "test": node })) {
		parentPath.node.test = expressions.pop();
	}
	else if (parentPath.isForStatement({ "init": node })) {
		parentPath.node.init = expressions.pop();
	}
	else if (parentPath.isForInStatement({ "right": node }) ||
		parentPath.isForOfStatement({ "right": node })) {
		parentPath.node.right = expressions.pop();
	}
	else if (parentPath.isSwitchStatement({ "discriminant": node })) {
		parentPath.node.discriminant = expressions.pop();
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
	else if ((parentPath.isCallExpression({ "callee": node }) ||
		parentPath.isNewExpression({ "callee": node })) &&
		ancestorPath.isExpressionStatement({ "expression": parent })) {
		parentPath.node.callee = expressions.pop();
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

traverse(ast, resolveSequence);


const removeDeadCode = {
	"IfStatement|ConditionalExpression"(path) {
		let { consequent, alternate } = path.node;
		let testPath = path.get('test');
		const evaluateTest = testPath.evaluateTruthy();
		if (evaluateTest === true) {
			if (types.isBlockStatement(consequent)) {
				consequent = consequent.body;
			}
			path.replaceWithMultiple(consequent);
			return;
		}
		if (evaluateTest === false) {
			if (alternate != null) {
				if (types.isBlockStatement(alternate)) {
					alternate = alternate.body;
				}
				path.replaceWithMultiple(alternate);
			}
			else {
				path.remove();
			}
		}
	},
	"LogicalExpression"(path) {
		let { left, operator, right } = path.node;

		let leftPath = path.get('left');

		const evaluateLeft = leftPath.evaluateTruthy();

		if ((operator == "||" && evaluateLeft == true) ||
			(operator == "&&" && evaluateLeft == false)) {
			path.replaceWith(left);
			return;
		}
		if ((operator == "||" && evaluateLeft == false) ||
			(operator == "&&" && evaluateLeft == true)) {
			path.replaceWith(right);
		}
	},
	"EmptyStatement|DebuggerStatement"(path) {
		path.remove();
	},
}

traverse(ast, removeDeadCode);  //PS：因为有赋值语句和定义语句同时存在，因此该插件可能需要运行多次才能删除干净。



//判断节点是否为字面量，插件地址 https://t.zsxq.com/09CvEE1FY
function isNodeLiteral(node) {
	if (Array.isArray(node)) {
		return node.every(ele => isNodeLiteral(ele));
	}
	if (types.isLiteral(node)) {
		if (node.value == null) {
			return false;
		}
		return true;
	}
	if (types.isBinaryExpression(node)) {
		return isNodeLiteral(node.left) && isNodeLiteral(node.right);
	}
	if (types.isUnaryExpression(node, {
		"operator": "-"
	}) || types.isUnaryExpression(node, {
		"operator": "+"
	})) {
		return isNodeLiteral(node.argument);
	}

	if (types.isObjectExpression(node)) {
		let { properties } = node;
		if (properties.length == 0) {
			return true;
		}

		return properties.every(property => isNodeLiteral(property));

	}
	if (types.isArrayExpression(node)) {
		let { elements } = node;
		if (elements.length == 0) {
			return true;
		}
		return elements.every(element => isNodeLiteral(element));
	}

	return false;
}


const calcCallValue =
{
	FunctionDeclaration(path) {
		let { scope, node } = path;
		let { id, params, body } = node;

		if (id.name != "i" || params.length == 0 || !types.isReturnStatement(body.body[body.body.length - 1])) {
			return;
		}

		let funcNames = [id.name];
		let decodeCode = path.toString();


		let allNextSiblings = path.getAllNextSiblings();

		for (let nextSibling of allNextSiblings) {
			if (!nextSibling.isFunctionDeclaration()) {
				break;
			}
			funcNames.push(nextSibling.node.id.name);
			decodeCode += nextSibling.toString();
		}

		if (funcNames.length == 1) return;

		eval(decodeCode);

		for (let funcName of funcNames) {
			let binding = scope.getBinding(funcName);

			if (!binding || !binding.constant) {
				continue;
			}

			for (let referPath of binding.referencePaths) {
				let { parentPath, node } = referPath;
				if (!parentPath.isCallExpression({ "callee": node })) {
					continue;
				}

				let { arguments } = parentPath.node;

				if (arguments.length == 0 || !isNodeLiteral(arguments)) {
					continue;
				}

				let value = eval(parentPath.toString());
				console.log(parentPath.toString(), "--->", value);
				parentPath.replaceWith(types.valueToNode(value));
			}
		}



	}
}





const constantFold = {
    
    "Identifier|BinaryExpression|UnaryExpression|CallExpression"(path) {
        if (path.isUnaryExpression({ operator: "-" }) ||
            path.isUnaryExpression({ operator: "void" })) {
            return;
        }

        let { confident, value } = path.evaluate();

        if (!confident) return; //无法计算出结果，直接返回

        let valueType = typeof value;

        if (!["number", "string", "boolean"].includes(valueType)) {
            return;
        }
        if (valueType == 'number' && (!Number.isFinite(value))) { //过滤掉 1/0 这种情况，否则会导致堆栈溢出。
            return;
        }

        path.replaceWith(types.valueToNode(value))

    }
}

for(let i=0; i<5; i++)
{
	traverse(ast, calcCallValue);

	traverse(ast, constantFold);
}


const changeCallToConditionalExpression = 
{
	CallExpression(path)
	{
		let {callee,arguments} = path.node;

		if (arguments.length != 1 || !types.isConditionalExpression(arguments[0]))
		{
			return;
		}

		let {test,consequent,alternate} = arguments[0];

		let newConsequent = types.callExpression(callee,[consequent]);
		let newAlternate  = types.callExpression(callee,[alternate]);

		let newConditionalNode = types.ConditionalExpression(test,newConsequent,newAlternate);

		path.replaceWith(newConditionalNode);


	}
}

traverse(ast, changeCallToConditionalExpression);

ast = parser.parse(generator(ast).code);


const getObCode = 
{
	VariableDeclarator(path)
	{
		let {parentPath,scope,node} = path;

		let {id,init} = node;

		if (!types.isArrayExpression(init) || init.elements.length == 0 ||
			!init.elements.every(element => types.isLiteral(element))) {
			return;
		}

		let binding = scope.getBinding(id.name);

		if (!binding || !binding.constant || binding.referencePaths.length != 1)
		{
			return;
		}

		let nextSibling = parentPath.getNextSibling();

		if (!nextSibling.isFunctionDeclaration() || !nextSibling.isAncestor(binding.referencePaths[0]))
		{
			return;
		}

		let code = parentPath.toString() + nextSibling.toString();

		eval(code)

		let funcName = nextSibling.node.id.name;
		binding = nextSibling.scope.getBinding(funcName);

		let canRemoved = true;
		for (let referPath of binding.referencePaths) {
			let { parentPath, node } = referPath;
			if (!parentPath.isCallExpression({ "callee": node })) {
				canRemoved = false;
				continue;
			}

			let { arguments } = parentPath.node;

			if (arguments.length == 0 || !isNodeLiteral(arguments)) {
				canRemoved = false;
				continue;
			}

			let value = eval(parentPath.toString());
			console.log(parentPath.toString(), "--->", value);
			parentPath.replaceWith(types.valueToNode(value));
		}

		if (canRemoved)
		{
			nextSibling.remove();
			parentPath.remove();
		}
		
	},
}

traverse(ast, getObCode);


const removeDeadFunctionDeclaration =
{
  FunctionDeclaration(path) {
    let { parentPath, node } = path;
    if (parentPath.isProgram()) {
      return;//全局函数不作处理
    }

    let binding = parentPath.scope.getBinding(node.id.name);
    if (!binding) return;

    let isReferenced = false;
    for (let referPath of binding.referencePaths) {
      if (!path.isAncestor(referPath)) {
        isReferenced = true;
        break;
      }
    }

    if (!isReferenced) {
      console.log(path.toString());
      path.remove();
      traverseFlag = true;
    }
  }
}

do {
  var traverseFlag = false;
  ast = parser.parse(generator(ast).code);
  traverse(ast, removeDeadFunctionDeclaration);
} while (traverseFlag);



function isBaseLiteral(node) {

    if (types.isLiteral(node) && node.value != null) {//null可能有坑
        return true;
    }

    if (types.isUnaryExpression(node) && ["+", "-"].includes(node.operator)) {
        return isBaseLiteral(node.argument);
    }

    return false;
}

const restoreVarDeclarator = {
    VariableDeclarator(path) {
        let scope = path.scope;
        let { id, init } = path.node;

        if (!types.isIdentifier(id) || !isBaseLiteral(init)) {
            return;
        }

        const binding = scope.getBinding(id.name);

		if (!binding) return;

        let { constant, referencePaths, constantViolations } = binding;  //变量的定义一定会有binding.

        if (constantViolations.length > 1) {
            return;
        }

        if (constant || constantViolations[0] == path) {
            for (let referPath of referencePaths) {
                referPath.replaceWith(init);
            }
            path.remove();//没有被引用，或者替换完成，可直接删除
        }
    },
}

traverse(ast, restoreVarDeclarator);

traverse(ast, keyToLiteral);

traverse(ast, constantFold);

const calcMathFunction = 
{
	CallExpression(path)
	{
		let {callee,arguments} = path.node;

		if (!types.isMemberExpression(callee) || arguments.length != 1 || 
		    !types.isNumericLiteral(arguments[0]))
		{
			return;
		}

		let {object,property} = callee;

		if (!types.isIdentifier(object,{"name":"Math"}) || 
		    !types.isStringLiteral(property,{"value":"round"}))
		{
			return;
		}

		let value = Math["round"](arguments[0].value);
		console.log(path.toString(), "--->", value);
		path.replaceWith(types.valueToNode(value));

	}
}

traverse(ast, calcMathFunction);

traverse(ast, constantFold);

traverse(ast, removeDeadCode);  

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


console.timeEnd("处理完毕，耗时");
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});

fs.writeFile(decodeFile, code, (err) => { });