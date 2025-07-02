const files = require('fs');  //导入文件库，防止与fs变量名冲突
const types = require("@babel/types");
const parser = require("@babel/parser");
const template = require("@babel/template").default;
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const NodePath = require("@babel/traverse").NodePath; //智能提示所需

//js混淆代码读取
const encodeFile = process.argv.length > 2 ? process.argv[2] : "./encode.js";  //默认的js文件
const decodeFile = process.argv.length > 3 ? process.argv[3] : encodeFile.slice(0, encodeFile.length - 3) + "_ok.js";


//将源代码解析为AST
let sourceCode = files.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);
console.time("处理完毕，耗时");




const aheadInitNodeOfFor = {
	/**  @param  {NodePath} path */  //每个插件前都要加哈。
	ForStatement(path) {

		let { init, test, update, body } = path.node;

		if (!types.isBooleanLiteral(test, { "value": true }) ||
			update != null || body.body.length != 2) {
			return;
		}

		let firstNode = body.body[0];
		let secondNode = body.body[1];

		if (!types.isSwitchStatement(firstNode) || !types.isBreakStatement(secondNode)) {
			return;
		}

		if (types.isAssignmentExpression(init)) {
			path.insertBefore(types.ExpressionStatement(init));
		}
		else if (types.isVariableDeclaration(init)) {
			path.insertBefore(init);
		}
		else {
			return;
		}
		path.node.init = null;

	},
}


traverse(ast, aheadInitNodeOfFor);





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

traverse(ast, DeclaratorToDeclaration);


const addBreakNodeOfemptyCase =
{
	SwitchCase(path) {
		let { consequent } = path.node;

		if (consequent.length == 0) {
			console.log(path.toString());
			path.node.consequent.push(types.BreakStatement());
		}

	},
}

traverse(ast, addBreakNodeOfemptyCase);

/*
ast = parser.parse(generator(ast).code)

function getInitValue(path, name) {
	let allPrevSiblings = path.getAllPrevSiblings();
	for (let prevSibling of allPrevSiblings) {
		if (prevSibling.isVariableDeclaration()) {
			let { id, init } = prevSibling.node.declarations[0];
			if (id.name == name) {
				return init.value;
			}
		}
		if (prevSibling.isExpressionStatement()) {
			let { left, right } = prevSibling.node.expression;
			if (left.name == name) {
				return right.value;
			}
		}
	}
}


const decodeControlFlowOfFor = {
	ForStatement(path) {

		let { node, scope } = path;

		let { init, test, update, body } = node;

		if (!types.isBooleanLiteral(test, { "value": true }) || update != null || body.body.length != 2) {
			return;
		}

		if (!types.isSwitchStatement(body.body[0]) || !types.isBreakStatement(body.body[1])) {
			return;
		}
		let { cases, discriminant } = body.body[0];
		let initValue = getInitValue(path, discriminant.name);
		let retBody = [];
		while (true) {
			let retFlag = false;
			for (let eachCase of cases) {
				let { test, consequent } = eachCase;
				if (test.value == initValue) {
					
					let length = consequent.length;
					console.log(path.toString())
					if (types.isContinueStatement(consequent[length - 1])) {
						initValue = consequent[length - 2].expression.right.value;
						retBody.push(...consequent.slice(0, length - 2));
						break;
					}
					if (types.isReturnStatement(consequent[length - 1])) {
						retBody.push(...consequent);
						retFlag = true;
						break;
					}
					if (types.isBreakStatement(consequent[length - 1])) {
						retBody.push(...consequent.slice(0, length - 1));
						retFlag = true;
						break;
					}
				}
			}

			if (retFlag) break;
		}

		path.replaceWithMultiple(retBody);



	}
}

traverse(ast, decodeControlFlowOfFor);

*/

console.timeEnd("处理完毕，耗时");
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});

files.writeFile(decodeFile, code, (err) => { });