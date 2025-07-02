const fs = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2] : encodeFile = "./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3] : decodeFile = "./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, { encoding: "utf-8" });


//去逗号表达式


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
		if (properties.length === 0) {
			return true;
		}

		return properties.every(property => isNodeLiteral(property));

	}
	if (types.isArrayExpression(node)) {
		let { elements } = node;
		if (elements.length === 0) {
			return true;
		}
		return elements.every(element => isNodeLiteral(element));
	}

	return false;
}


function isObfuscatorCode(path) {//判断是否未ob混淆的特征，对于变种的ob代码，可以更改此代码

	let { parentPath, node } = path;
	let { id, body } = node;
	if (body.body.length !== 3) {
		return false;
	}

	let [firstNode, secondNode, thirdNode] = body.body;

	if (!types.isVariableDeclaration(firstNode) ||
		!types.isExpressionStatement(secondNode) ||
		!types.isReturnStatement(thirdNode)) {
		return false;
	}

	let { init } = firstNode.declarations[0];
	if (!types.isArrayExpression(init) || init.elements.length === 0 ||
		!init.elements.every(element => types.isStringLiteral(element))) {
		return false;
	}

	if (!types.isAssignmentExpression(secondNode.expression) || !types.isIdentifier(secondNode.expression.left, { "name": id.name })) {
		return false;
	}
	let scope = parentPath.scope;
	let binding = scope.getBinding(id.name);

	if (!binding || binding.referencePaths.length < 5 ||
		binding.constantViolations.length !== 1) {
		return false;
	}

	return true;
}

function getReDefineFunction(scope, funcNames) {
	let decodeCode = "";
	scope.traverse(scope.block, {
		"FunctionDeclaration"(path) {
			let { id, body, params } = path.node;
			if (params.length !== 2) {
				//return;
			}
			body = body.body;
			if (!body || body.length !== 1 ||
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
			path.remove();
		},
	})
	return decodeCode;
}



function getMyKey(sourceCode) {
	let key = ""
	let ast = parser.parse(sourceCode);


	const CallExpressToLiteral =
	{
		FunctionDeclaration(path) {
			if (!isObfuscatorCode(path)) return;//如果不是ob混淆的代码，直接退出.

			let { parentPath, node } = path;
			let scope = parentPath.scope;
			let binding = scope.getBinding(node.id.name);

			let obfuscatorPaths = [path], funcNames = [];
			let decodePath = "";

			for (let referPath of binding.referencePaths) {
				if (path.isAncestor(referPath)) {
					continue;
				}
				let { parentPath, node } = referPath;

				if (!parentPath.isCallExpression()) return;  //引用的地方都是 CallExpression

				let funcPath = parentPath.findParent(p => p.isFunctionDeclaration());//找 FunctionDeclaration父节点，即解密函数
				if (!funcPath) {
					let AnthorPath = parentPath.parentPath;
					if (AnthorPath.isSequenceExpression()) {
						funcPath = parentPath;
					}
					else if (AnthorPath.isExpressionStatement()) {
						funcPath = AnthorPath;
					}
					else {

						return;
					}
				}
				else {
					funcNames.push(funcPath.node.id.name);
					decodePath = funcPath;
				}

				obfuscatorPaths.push(funcPath);
			}

			let obfuscatorCode = "";
			for (let eachPath of obfuscatorPaths) {

				if (eachPath.isCallExpression() && eachPath.parentPath.isSequenceExpression()) {

					let newNode = types.ExpressionStatement(eachPath.node);

					obfuscatorCode += generator(newNode).code;

				}
				else {
					obfuscatorCode += eachPath.toString();
				}
			}

			obfuscatorCode += getReDefineFunction(scope, funcNames);
			let funcAst = parser.parse(obfuscatorCode);
			obfuscatorCode = generator(funcAst, opts = { "compact": true }).code;

			eval(obfuscatorCode);
			let key = "";
			scope.traverse(scope.block, {
				"CallExpression"(path) {
					let { node } = path;
					let { callee, arguments } = node;
					if (!types.isIdentifier(callee) || arguments.length < 6) return;

					let exitFlag = false;
					for (let argNode of arguments) {
						if (types.isCallExpression(argNode)) {
							let { callee, arguments } = argNode;
							if (!funcNames.includes(callee.name) || !isNodeLiteral(arguments)) {
								exitFlag = true;
								break;
							}
							continue;
						}
						if (!types.isStringLiteral(argNode)) {
							exitFlag = true;
							break;
						}
					}

					if (exitFlag) return;



					for (let argNode of arguments) {
						if (types.isCallExpression(argNode)) {
							key += eval(generator(argNode).code);
						}
						else {
							key += argNode.value;
						}
					}


					if (key.length !== 32) {
						key = "";
					}
					else {
						console.log("key is :", key);
						path.stop();
					}


				},
			});


		},
	}




	traverse(ast, CallExpressToLiteral);

	return key;

}


getMyKey(sourceCode);







