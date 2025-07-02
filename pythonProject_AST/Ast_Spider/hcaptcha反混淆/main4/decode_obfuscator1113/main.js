/*****************************************************
Module name:decode_obfuscator.js
Author:悦来客栈的老板
Date:2023.11.13
Version:V3.0.0

混淆工具地址:https://obfuscator.io/

脚本仅用于被obfuscator混淆了的代码，不支持商业工具混淆的代码

声明:

脚本仅用于学习研究，禁止非法使用，否则后果自负！


使用方法可以观看在线视频:

https://www.bilibili.com/video/BV16V411H7yz

欢迎购买AST星球共同学习交流

星球地址:

https://t.zsxq.com/FMRf2ZV

本人微信:523176585

*****************************************************/

const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const usefulPlugins = require("./tools/usefulPlugins");


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./input/encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = "./output/decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, { encoding: "utf-8" });

let ast = parser.parse(sourceCode);


console.time("处理完毕，耗时");


//字面量解混淆
console.log("traverse Hex or Unicode String.......\n");

traverse(ast, simplifyLiteral);

//常量折叠
console.log("constantFold.......\n");

traverse(ast, constantFold);

//给循环体加上{}
console.log("standardLoop.......\n");

traverse(ast, standardLoop);

//去逗号表达式
console.log("resolve Sequence.......\n");

traverse(ast, resolveSequence);

//变量定义的分离
console.log("Simpliy VariableDeclaration......\n");

traverse(ast, DeclaratorToDeclaration);

//变量定义转函数定义
console.log("VariableDeclaration To FuncDeclaration......\n");

traverse(ast, varDeclarToFuncDeclar);

ast = parser.parse(generator(ast).code);


function isObfuscatorInitArray(path) {//判断是否未ob混淆的特征，对于变种的ob代码，可以更改此代码

	let { parentPath, node } = path;
	let { id, body } = node;
	if (body.body.length < 2) {
		return false;
	}

	let firstNode = body.body[0];
	let lastNode = body.body[body.body.length - 1];
	if (!types.isVariableDeclaration(firstNode) ||
		!types.isReturnStatement(lastNode)) {
		return false;
	}
	let { init } = firstNode.declarations[0];
	if (!types.isArrayExpression(init) || init.elements.length == 0 ||
		!init.elements.every(element => types.isStringLiteral(element))) {
		return false;
	}

	let binding = parentPath.scope.getBinding(id.name);
	for (let constPath of binding.constantViolations) {
		if (path.isAncestor(constPath)) {
			return true;
		}
	}

	return false;
}

function getObfuscatorEncodePaths(path, referencePaths, obfuscatorPaths) {
	for (let referPath of referencePaths) {
		let { parentPath, node } = referPath;

		if (path.isAncestor(referPath)) {
			continue;
		}

		if (!parentPath.isCallExpression()) {
			break;  //引用的地方都是 CallExpression
		}

		let funcPath = parentPath.findParent(p => p.isFunctionDeclaration() || p.isExpressionStatement());//找 FunctionDeclaration父节点，即解密函数
		if (!funcPath) {
			break;
		}
		obfuscatorPaths.push(funcPath);
	}
}

let funcNames = [];

function getReDefineFunction(scope) {
	let decodeCode = "";
	scope.traverse(scope.block, {//在scope内收集符合ob混淆特征的解密函数
		"FunctionDeclaration"(path) {
			let { id, body, params } = path.node;
			if (params.length < 2) {
				return;
			}
			body = body.body;
			if (!body || body.length != 1 ||
				!types.isReturnStatement(body[0])) {
				return;
			}
			let argument = body[0].argument;
			if (!types.isCallExpression(argument) ||
				!types.isIdentifier(argument.callee)) {
				return;
			}
			decodeCode += path.toString();
			funcNames.push(id.name);
		},
	})
	return decodeCode;
}


const CallExpressToLiteral =
{
	FunctionDeclaration(path) {
		if (!isObfuscatorInitArray(path)) {
			return;//如果不是ob混淆的代码，直接退出
		}

		let { parentPath, node } = path;
		let scope = parentPath.scope;
		let binding = scope.getBinding(node.id.name);

		let obfuscatorPaths = [path];

		getObfuscatorEncodePaths(path, binding.referencePaths, obfuscatorPaths);

		if (obfuscatorPaths.length != 3) {
			console.log("Get Obfuscator Code fail!\n");
			return;
		}

		if (obfuscatorPaths[1].isFunctionDeclaration()) {
			funcNames.push(obfuscatorPaths[1].node.id.name);
		}
		else {
			funcNames.push(obfuscatorPaths[2].node.id.name);
		}



		let obfuscatorCode = "";
		obfuscatorPaths.forEach(eachPath => { obfuscatorCode += eachPath.toString() });
		obfuscatorCode += getReDefineFunction(scope);

		let funcAst = parser.parse(obfuscatorCode);
		obfuscatorCode = generator(funcAst, opts = { "compact": true }).code;

		require = undefined; //防止恶意格盘
		eval(obfuscatorCode);

		let canRemoved = true;

		scope.traverse(scope.block, {
			"FunctionDeclaration"(_path) {
				let { parentPath, node } = _path;
				let name = node.id.name;

				if (!funcNames.includes(name)) {
					return;
				}

				let binding = parentPath.scope.getBinding(name);

				if (!binding) return;

				let { constantViolations, referencePaths } = binding;

				for (let constantPath of constantViolations) {
					if (!_path.isAncestor(constantPath)) {
						return;
					}
				}

				for (let referPath of referencePaths) {
					if (_path.isAncestor(referPath)) {
						continue;
					}

					let { parentPath, node } = referPath;

					let ancestorPath = parentPath.parentPath;

					if (ancestorPath.isCallExpression())
					{
					  let {callee} = ancestorPath.node;
			  
					  if (types.isIdentifier(callee) && callee.name == "parseInt")
					  {
						continue;
					  }
					}

					if (parentPath.isAssignmentExpression() && ancestorPath.isCallExpression())
					{
					  let value = eval(ancestorPath.toString());
					  console.log(value);
					  ancestorPath.replaceWith(types.valueToNode(value));
					  continue;
					}

					if (!parentPath.isCallExpression({ "callee": node })) {
						canRemoved = false;
						continue;
					}

					let { arguments } = parentPath.node;

					if (arguments.length == 0 || !isNodeLiteral(arguments)) {
						canRemoved = false;
						continue;
					}
					try {

						let value = eval(parentPath.toString());
						console.log(parentPath.toString(), "-->", value);
						parentPath.replaceWith(types.valueToNode(value));
					} catch { canRemoved = false; }
				}
				if (canRemoved) {
					_path.remove();
				}
			},
		});

		obfuscatorPaths.forEach(eachPath => { eachPath.remove(); });//强制删除得了。懒得判断了

	},
}

console.log("解密函数调用替换......\n");

traverse(ast, CallExpressToLiteral);

const removeDeadFunctionDeclaration =
{
	FunctionDeclaration(path) {
		let { parentPath, node } = path;
		let name = node.id.name;


		if (!funcNames.includes(name)) {
			return;
		}

		let binding = parentPath.scope.getBinding(name);
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


console.log("\nconstantFold.......\n");
traverse(ast, constantFold);


console.log("traverse Hex or Unicode String.......\n");
traverse(ast, simplifyLiteral);

console.timeEnd("处理完毕，耗时");


let { code } = generator(ast, opts = { jsescOption: { "minimal": true } });

fs.writeFile(decodeFile, code, (err) => { });