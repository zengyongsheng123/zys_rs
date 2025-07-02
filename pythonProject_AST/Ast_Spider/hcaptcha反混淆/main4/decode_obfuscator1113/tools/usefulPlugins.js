/*****************************************************
通用插件合集:

Module name:usefulPugins.js
Author:悦来客栈的老板
Date:2023.11.13
Version:V2.0.0


欢迎加入本人的星球:


https://t.zsxq.com/FMRf2ZV

本人微信:523176585

*****************************************************/

const types = require("@babel/types");



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


/******************************
变量分离,插件地址:

https://t.zsxq.com/09UTuS54o


处理前:
var a = 123,b = 456;
let c  = 789,d = 120;
处理后:
var a = 123;
var b = 456;
let c = 789;
let d = 120;
******************************/
const DeclaratorToDeclaration =
{
	VariableDeclaration(path) {
		let { parentPath, node } = path;
		if (!parentPath.isBlock()) {
			return;
		}
		let { declarations, kind } = node;

		if (declarations.length == 1) {
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



/**************************************
变量定义为函数表达式合并为函数定义
var a = function ()
{
  console.log(666);
}

===>

function a() {
  console.log(666);
}
**************************************/
const varDeclarToFuncDeclar =
{
	VariableDeclaration(path) {
		let { parentPath, node, scope } = path;
		if (!parentPath.isBlock()) {//过滤掉部分特殊情况，例如for循环里的变量定义
			return;
		}
		let { declarations, kind } = node;
		if (declarations.length != 1) {
			return;
		}

		let { id, init } = declarations[0];
		if (!types.isFunctionExpression(init, { id: null })) {
			return;
		}

		let { params, body } = init;
		let newNode = types.FunctionDeclaration(id, params, body);
		path.replaceWith(newNode);

	}
}

//规范For循环和While循环
const standardLoop =
{
	"ForStatement|WhileStatement|ForInStatement|ForOfStatement"({ node }) {
		if (!types.isBlockStatement(node.body)) {
			node.body = types.BlockStatement([node.body]);
		}
	},
	"IfStatement"(path) {
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


//去逗号表达式
const resolveSequence =
{
	SequenceExpression(path) {
		let { scope, parentPath, node } = path;
		let expressions = node.expressions;
		if (parentPath.isReturnStatement({ "argument": node })) {
			let lastExpression = expressions.pop();
			for (let expression of expressions) {
				parentPath.insertBefore(types.ExpressionStatement(expression = expression));
			}

			path.replaceWith(lastExpression);
		}
		else if (parentPath.isExpressionStatement({ "expression": node })) {
			let body = [];
			expressions.forEach(express => { body.push(types.ExpressionStatement(express)); });
			path.replaceWithMultiple(body);
		}
		else {
			return;
		}

	}
}


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



const constantFold = {
	"BinaryExpression|UnaryExpression"(path) {
		if (path.isBinaryExpression({ operator: "/" }) ||
			path.isUnaryExpression({ operator: "-" }) ||
			path.isUnaryExpression({ operator: "void" })) {
			return;
		}
		const { confident, value } = path.evaluate();
		if (!confident)
			return;
		if (typeof value == 'number' && (!Number.isFinite(value))) {
			return;
		}
		path.replaceWith(types.valueToNode(value));
	},
}



const keyToLiteral = {
	MemberExpression:
	{
		exit({ node }) {
			const prop = node.property;
			if (!node.computed && types.isIdentifier(prop)) {
				node.property = types.StringLiteral(prop.name);
				node.computed = true;
			}
		}
	},
	ObjectProperty:
	{
		exit({ node }) {
			const key = node.key;
			if (!node.computed && types.isIdentifier(key)) {
				node.key = types.StringLiteral(key.name);
			}
		}
	},
}




const preDecodeObject = {
	VariableDeclarator({ node, parentPath, scope }) {
		const { id, init } = node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;

		let properties = init.properties;
		let allNextSiblings = parentPath.getAllNextSiblings();
		for (let nextSibling of allNextSiblings) {
			if (!nextSibling.isExpressionStatement()) break;

			let expression = nextSibling.get('expression');
			if (!expression.isAssignmentExpression({ operator: "=" })) 
			{
				break;
			}

			let { left, right } = expression.node;
			if (!types.isMemberExpression(left)) 
			{
				break;
			}

			let { object, property } = left;
			if (!types.isIdentifier(object, { name: name }) ||
				!types.isStringLiteral(property) || property.value.length != 5) {
				break;
			}

			properties.push(types.ObjectProperty(property, right));
			nextSibling.remove();
		}
		scope.crawl();
	},
}


const deleteRepeatOfObject = {

	"VariableDeclarator"(path) {
		let { node, scope } = path;
		let { id, init } = node;

		if (!types.isObjectExpression(init)) {
			return;
		}

		let oldId = id;
		let name = id.name;

		const binding = scope.getBinding(name);
		if (!binding || !binding.constant) {
			return;
		}


		scope.traverse(scope.block, {
			VariableDeclarator(path) {
				let { node, scope } = path;
				let { id, init } = node;
				if (!types.isIdentifier(init, { name: name })) {
					return;
				}

				const binding = scope.getBinding(id.name);

				if (!binding || !binding.constant)//如果被更改则不能进行替换
					return;

				for (let referPath of binding.referencePaths) {
					referPath.replaceWith(oldId);//使用replaceWith函数比rename函数更快。
				}
				path.remove();
				scope.crawl();
			},
		})
	},
}






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
	"EmptyStatement"(path) {
		path.remove();
	},
}



global.constantFold = constantFold;
global.keyToLiteral = keyToLiteral;
global.standardLoop = standardLoop;
global.isNodeLiteral = isNodeLiteral
global.removeDeadCode = removeDeadCode;
global.preDecodeObject = preDecodeObject;
global.simplifyLiteral = simplifyLiteral;
global.resolveSequence = resolveSequence;
global.deleteRepeatOfObject = deleteRepeatOfObject;
global.varDeclarToFuncDeclar = varDeclarToFuncDeclar;
global.DeclaratorToDeclaration = DeclaratorToDeclaration;

