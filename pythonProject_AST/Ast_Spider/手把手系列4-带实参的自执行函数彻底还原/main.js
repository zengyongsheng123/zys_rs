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

let ast = parser.parse(sourceCode);


console.time("处理完毕，耗时");



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

// 去除逗号表达式
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

			path.replaceInline(lastExpression);
		}
		else if (parentPath.isExpressionStatement({ "expression": node })) {
			let body = [];
			expressions.forEach(express => { body.push(types.ExpressionStatement(express)); });
			path.replaceWithMultiple(body);
		}
		else {
			return;
		}

		scope.crawl();
	}
}

traverse(ast, resolveSequence);




const reduceAssign =
{
	AssignmentExpression:
	{
		exit(path) {
			let { parentPath, node } = path;
			if (!parentPath.isAssignmentExpression({ right: node, operator: "=" })) {
				return;
			}

			let { left, operator, right } = node;
			if (operator !== "=") return;


			let expressionPath = path.findParent(p => p.isExpressionStatement());
			if (!expressionPath) return;

			expressionPath.insertBefore(types.ExpressionStatement(node));

			path.replaceWith(right);
		}
	}
}

traverse(ast, reduceAssign);




const combinDefineAndNextAssgin =
{
	VariableDeclarator(path) {
		let { scope, node, parentPath } = path;
		let { id, init } = node;
		if (init != null) return;
		let name = id.name;

		let nextSiblings = parentPath.getAllNextSiblings();

		for (let nextSibling of nextSiblings) {
			if (!nextSibling.isExpressionStatement()) {
				break;
			}
			let expression = nextSibling.node.expression;
			if (!types.isAssignmentExpression(expression)) {
				continue;
			}
			let { left, operator, right } = expression;
			if (!types.isIdentifier(left, { name: name })) {
				continue;
			}
			if (operator !== "=") {
				break;
			}

			path.set("init", right);
			nextSibling.remove();
			break;
		}
		scope.crawl();
	}
}


traverse(ast, combinDefineAndNextAssgin);



ast = parser.parse(generator(ast).code);


function getRandomName(length) {

	let initArr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
	let puzzleArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
	let ranInx = Math.floor(Math.random() * initArr.length);
	let randomName = initArr[ranInx];

	for (var i = 1; i < length; i++) {
		ranInx = Math.floor(Math.random() * puzzleArr.length);
		randomName += puzzleArr[ranInx];
	}

	return randomName;
}


let allNewNames = new Map();  //定义一个全局变量，保存需要处理的函数

function getUnusedIdentifier() {//获取未被使用的名称,返回 Identifier 类型。
	do {
		var newName = "$CJ_" + getRandomName(3);

	} while (allNewNames.has(newName))

	return newName;

}


let paramsList = ['n', 't', 'r', 'e', 'a', 'u', 'c'];

const renameSameNameOfParams =
{
	VariableDeclarator(path) {
		let { scope, node } = path;
		let { id, init } = node;

		if (!paramsList.includes(id.name)) {
			return;
		}

		const binding = scope.getBinding(id.name);

		if (!binding) {
			return;
		}

		let newName = getUnusedIdentifier();

		allNewNames.set(newName, id.name);

		scope.rename(id.name, newName);



		id.name = newName;

		scope.crawl();

	}
}




traverse(ast, renameSameNameOfParams);



ast = parser.parse(generator(ast).code);



//删除重复定义且未被改变初始值的变量
const deleteRepeatDefine = {
	"VariableDeclarator"(path) {
		let { node, scope } = path;
		let { id, init } = node;
		if (!types.isIdentifier(init) || !paramsList.includes(init.name)) {
			return;
		}

		const binding = scope.getBinding(id.name);

		if (!binding || !binding.constant) return;


		for (let referPath of binding.referencePaths) {
			referPath.replaceWith(init);
		}

		path.remove();//没有被引用，或者替换完成，可直接删除


	},

}

traverse(ast, deleteRepeatDefine);

ast = parser.parse(generator(ast).code);




function isBaseLiteral(path) {
	if (path.isLiteral()) {
		return true;
	}
	if (path.isUnaryExpression({ operator: "-" }) ||
		path.isUnaryExpression({ operator: "+" })) {
		return isBaseLiteral(path.get('argument'));
	}

	return false;
}


const resolveParams =
{
	CallExpression(path) {
		let callee = path.get('callee');
		let arguments = path.get('arguments');
		if (!callee.isFunctionExpression() || arguments.length == 0) {
			return;
		}
		let scope = callee.scope;
		let params = callee.get('params');


		for (let i in arguments) {
			let paramsPath = params[i];
			let argumentPath = arguments[i];
			const binding = scope.getBinding(paramsPath.node.name);
			if (!binding || !binding.constant) {
				continue;
			}


			let canRemoved = true;

			for (let referPath of binding.referencePaths) {

				if (argumentPath.isIdentifier() || isBaseLiteral(argumentPath)) {

					referPath.replaceWith(argumentPath.node);
				}

				else if (argumentPath.isArrayExpression()) {
					let parentPath = referPath.parentPath
					if (!parentPath.isMemberExpression()) {
						canRemoved = false;
						continue;
					}

					let { property } = parentPath.node;
					if (!types.isNumericLiteral(property)) {
						canRemoved = false;
						continue;
					}
					let index = property.value;
					if (index > argumentPath.node.elements.length) {
						canRemoved = false;
						continue;
					}

					parentPath.replaceWith(argumentPath.node.elements[index]);
				}
				else {
					canRemoved = false;
					break;
				}
			}
			if (canRemoved) {
				paramsPath.remove();
				argumentPath.remove();
			}
		}
	},
}

traverse(ast, resolveParams);



const backParams =
{
	Identifier(path) {
		let name = path.node.name;
		if (allNewNames.has(name)) {
			path.node.name = allNewNames.get(name);
		}
	},
}

traverse(ast, backParams);

allNewNames.clear();

console.timeEnd("处理完毕，耗时");


let { code } = generator(ast, opts = { jsescOption: { "minimal": true } });

fs.writeFile(decodeFile, code, (err) => { });