const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./encode.js";  //默认的js文件
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = encodeFile.slice(0, encodeFile.length - 3) + "_ok.js";

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


function isBaseLiteral(node) {

	let literalList = ['window', 'document', 'navigator', 'location', 'history', 'screen',];

	if (types.isLiteral(node) && node.value != null) {//null可能有坑
		return true;
	}

	if (types.isIdentifier(node) && literalList.includes(node.name)) {
		return true;
	}

	if (types.isIdentifier(node) && typeof globalThis[node.name] != "undefined") {
		return true;
	}

	if (types.isUnaryExpression(node) && ["+", "-", "!"].includes(node.operator)) {
		return isBaseLiteral(node.argument);
	}

	return false;
}

let Vardefined = false;
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
			Vardefined = true;
			//console.log(path.toString())
		}
	},
}


let constFlag = false;
const constantFold = {

	"Identifier|BinaryExpression|UnaryExpression"(path) {
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
		constFlag = true;
		path.replaceWith(types.valueToNode(value))

	}
}
traverse(ast, constantFold);

let ObjectFlag = false;
const decodeObjectofValue =
{
	VariableDeclarator(path) {
		let { node, scope } = path;
		const { id, init } = node;
		if (!types.isObjectExpression(init)) return;

		let properties = init.properties;
		if (properties.length == 0 || !properties.every(property => isBaseLiteral(property.value)))
			return;

		let binding = scope.getBinding(id.name);

		if (!binding) return;

		let { constant, referencePaths, constantViolations } = binding;
		if (!constant) {//新版本的babel库，在循环里面的变量定义，默认非常量
			if (constantViolations.length != 1 || constantViolations[0] != path) //旧版本屏蔽该行即可
			{
				return;
			}
		}

		let newMap = new Map();
		for (const property of properties) {
			let { key, value } = property;
			if (!key.value || key.value.length != 5) {
				//  continue; //仅针对ob混淆
			}
			newMap.set(key.value, value);
		}

		if (newMap.size != properties.length) {
			return;
		}

		let canBeRemoved = true;
		for (const referPath of referencePaths) {
			let { parentPath } = referPath;
			if (!parentPath.isMemberExpression()) {
				canBeRemoved = false;
				break;
			}

			let AncestorPath = parentPath.parentPath;

			if (AncestorPath.isAssignmentExpression({ "left": parentPath.node })) {
				canBeRemoved = false;
				break;
			}
			if (AncestorPath.isUpdateExpression() && ['++', '--'].includes(AncestorPath.node.operator)) {
				canBeRemoved = false;
				break;
			}

			let curKey = parentPath.node.property.value;
			if (!newMap.has(curKey)) {
				canBeRemoved = false;
				break;
			}
			ObjectFlag = true;
			parentPath.replaceWith(newMap.get(curKey));
		}
		canBeRemoved && path.remove();
		newMap.clear();
	},
}




let ArrayFlag = false;
const replaceArrayElements =
{//数组还原
	VariableDeclarator(path) {
		let { node, scope } = path;
		let { id, init } = node;
		if (!types.isArrayExpression(init) || init.elements.length == 0) return;

		const binding = scope.getBinding(id.name);
		if (!binding || !binding.constant) {
			return;
		}

		for (let referPath of binding.referencePaths) {
			let { node, parent,parentPath } = referPath;
			if (!types.isMemberExpression(parent, { object: node }) || !types.isNumericLiteral(parent.property)) {
				return;
			};
			if (parentPath.parentPath.isAssignmentExpression({"left":parent}))
			{
				return;
			}
			if (parentPath.parentPath.isUnaryExpression({"argument":parent}))
			{
				return;
			}
		}

		for (let referPath of binding.referencePaths) {
			let { parent, parentPath } = referPath;
			let index = parent.property.value;
			ArrayFlag = true;
			console.log(parentPath.parentPath.toString())
			parentPath.replaceWith(init.elements[index]);
		}

		path.remove();
	},
}


for (let i = 0; i < 5; i++) {

	traverse(ast, restoreVarDeclarator);
	traverse(ast, constantFold);
	traverse(ast, replaceArrayElements);
	traverse(ast, decodeObjectofValue);
	ast = parser.parse(generator(ast).code);
}

if (Vardefined)
{
	console.log("\n检测到 变量定义 可还原，请使用  restoreVarDeclarator 插件！\n");
}

if (constFlag)
{
	console.log("\n检测到 多个常量可折叠，请使用  constantFold 插件！\n");
}


if (ObjectFlag)
{
	console.log("\n检测到 object对象 可还原，请使用  ObjectFlag 插件！\n");
}

if (ArrayFlag)
{
	console.log("\n检测到 Array对象 可还原，请使用  ObjectFlag 插件！\n");
}


function isFuncPure(path, binding) {

	if (!binding) {
		return false;
	}
	if (!binding.constant) {

		let isConstant = true;

		for (let constPath of binding.constantViolations) {
			if (!path.isAncestor(constPath)) {
				isConstant = false;
				break;
			}
		}
		//isConstant && console.log(path.toString())
		return isConstant;
	}

	return true;
}

let referofVar = false;

function replaceReferOfVar(parentPath) {
	let { scope, node } = parentPath;
	let { id, init } = node;

	let binding = scope.getBinding(id.name);

	if (!binding) return;

	let { constant, referencePaths, constantViolations } = binding;

	if (constantViolations.length > 1) {
		return;
	}

	if (constant || constantViolations[0] == path) {

		for (let referPath of referencePaths) {
			referofVar = true;
			referPath.replaceWith(init);
		}
		
		//console.log(parentPath.toString())

		parentPath.remove();//没有被引用，或者替换完成，可直接删除
	}
}



function replaceReferOfAssign(parentPath) {
	let { scope, node } = parentPath;

	let { left, right } = node;

	let binding = scope.getBinding(left.name);

	if (!binding || binding.constantViolations.length > 1) return;

	for (let referPath of binding.referencePaths) {
		referofVar = true;
		referPath.replaceWith(right);
	}

	let AncestorPath = parentPath.parentPath;

	if (AncestorPath.isExpressionStatement({ "expression": node }) || AncestorPath.isSequenceExpression()) {
		let bindPath = binding.path;

		if (bindPath.isVariableDeclarator() && bindPath.node.init == null) {
			bindPath.remove();
		}

		parentPath.remove();
	}

}



const deleteRepeatDefineOfFunction =
{
	FunctionDeclaration(path) {

		let { parentPath, node } = path;

		let { id, params, body } = node;
		let length = body.body.length;

		if (params.length == 0 || !types.isReturnStatement(body.body[length - 1])) {
			return;
		}

		let binding = parentPath.scope.getBinding(id.name);

		if (!isFuncPure(path, binding)) {
			return;
		}

		for (let referPath of binding.referencePaths) {
			let { parentPath, node } = referPath;

			if (parentPath.isVariableDeclarator({ "init": node })) {
				replaceReferOfVar(parentPath);
				continue;
			}
			if (parentPath.isAssignmentExpression({ "right": node }) && parentPath.get('left').isIdentifier()) {
				replaceReferOfAssign(parentPath)
				continue;
			}
		}
	}
}
traverse(ast, deleteRepeatDefineOfFunction);

for (let i = 0; i < 5; i++) {
	ast = parser.parse(generator(ast).code);
	traverse(ast, deleteRepeatDefineOfFunction);
}


if (referofVar)
{
	console.log("\n检测到 函数被赋值给多个变量，请使用  deleteRepeatDefineOfFunction 插件！\n");
}





let glbFunctions = [];
let locFunctions = [];

const detectFunctions =
{
	FunctionDeclaration(path) {
		let { parentPath, node } = path;
		let { id, params } = node;

		if (parentPath.isProgram()) {
			glbFunctions.push(id.name);
		}
		else {
			locFunctions.push(id.name);
		}


	}
}

traverse(ast, detectFunctions);

console.log("\n检测到全局函数 : " + glbFunctions.length + "个!\n");

console.log("检测到局部函数 : " + locFunctions.length + "个!\n");

function isNodeLiteral(node) {
	if (Array.isArray(node)) {
		return node.every(ele => isNodeLiteral(ele));
	}

	if (types.isThisExpression(node)) {
		return true;
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

let callMap = new Map();
let argLiteral = [];

const detectCallExpression =
{
	CallExpression(path) {
		let { callee, arguments } = path.node;

		if (!types.isIdentifier(callee) || arguments.length == 0) {
			return;
		}

		let name = callee.name;

		if (!glbFunctions.includes(name) && !locFunctions.includes(name)) {
			return;
		}

		if (isNodeLiteral(arguments) && !argLiteral.includes(name)) {
			argLiteral.push(name);
		}


		if (callMap.has(name)) {
			let value = callMap.get(name);
			callMap.set(name, value + 1);
		}
		else {
			callMap.set(name, 1);
		}

	}
}

traverse(ast, detectCallExpression);


if (callMap.size > 0) {

	const mapArray = Array.from(callMap).sort(([keyA, valueA], [keyB, valueB]) => {
		return valueB - valueA;
	});
	console.log("\n混淆代码中，被调用次数最多的函数是:\n");

	console.log(mapArray[0][0], "被调用:",mapArray[0][1]," 次！");
}

let count = 0;
if (argLiteral.length > 0)
{
	console.log("\n检测到 实参为字面量的函数调用 前三:");
	const mapArray = Array.from(callMap).sort(([keyA, valueA], [keyB, valueB]) => {
		return valueB - valueA;
	});

	for (let ele of mapArray)
	{
		if (count > 2)
		{
			break;
		}
		if (argLiteral.includes(ele[0]))
		{
			console.log(ele[0]);
			count++;
		}
	}
	console.log("\n实参为字面量的函数调用一般可进行还原操作，请自行处理！\n");
}