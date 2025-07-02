﻿const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./encode.js";  //默认的js文件
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = "./step1.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);
console.time("处理完毕，耗时");


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

const decodeObjectofValue =
{
	VariableDeclarator(path) {
		let { node, scope } = path;
		const { id, init } = node;
		
		if (!types.isObjectExpression(init)) return;

		let properties = init.properties;

		if (properties.length === 0 || !properties.every(property => isBaseLiteral(property.value)))
			return;

		let binding = scope.getBinding(id.name);

		if (!binding) return;

		let { constant, referencePaths, constantViolations } = binding;

		if (!constant) {//新版本的babel库，在循环里面的变量定义，默认非常量
			if (constantViolations.length !== 1 || constantViolations[0] !== path) //旧版本屏蔽该行即可
			{
				return;
			}
		}

		let newMap = new Map();

		for (const property of properties) {
			let { key, value } = property;

			let KeyName = types.isIdentifier(key) ? key.name : key.value;

			if (!KeyName || KeyName.length !== 5) {
				//  continue; //仅针对ob混淆
			}
			newMap.set(KeyName, value);
		}

		if (newMap.size !== properties.length) {
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

			let { property } = parentPath.node;

			let curKey = types.isIdentifier(property) ? property.name : property.value;
			
			if (!newMap.has(curKey)) {
				canBeRemoved = false;
				break;
			}
			
			parentPath.replaceWith(newMap.get(curKey));
		}

		canBeRemoved && path.remove();

		newMap.clear();
	},
}


traverse(ast, decodeObjectofValue);


console.timeEnd("处理完毕，耗时");
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});

fs.writeFile(decodeFile, code, (err) => { });