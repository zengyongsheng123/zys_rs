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



const constantFold = {

    "Identifier|BinaryExpression|UnaryExpression|ConditionalExpression"(path) {
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
        if (valueType === 'number' && (!Number.isFinite(value))) { //过滤掉 1/0 这种情况，否则会导致堆栈溢出。
            return;
        }

        path.replaceWith(types.valueToNode(value))

    }
}

traverse(ast, constantFold);

const CalcCallExpression = {

	FunctionDeclaration(path) {
		let { node, parentPath } = path;

		let { id, body, params } = node;

		let len = body.body.length;

		if (params.length === 0 || !types.isReturnStatement(body.body[len - 1])) {
			return;
		}

		const binding = parentPath.scope.getBinding(id.name);

		if (!binding || !binding.constant)
			return;
		if (!binding.referenced && !parentPath.isProgram()) {
			path.remove();
			return;
		}

		let sourceCode = path.toString();

		if (sourceCode.includes("try") || sourceCode.includes("random") || sourceCode.includes("Date")) {
			//返回值不唯一不做处理
			return;
		}

		//直接eval，如果缺环境，让其主动报错，再补上即可。下同,函数声明eval不会报错。
		eval(sourceCode);

		globalThis[id.name] = eval(id.name);

		try {
			let canRemoved = true;

			for (const referPath of binding.referencePaths) {
				let { parentPath, node } = referPath;
				if (!parentPath.isCallExpression({ "callee": node })) {
					canRemoved = false;
					continue;
				}

				const args = parentPath.get("arguments").map(arg => arg.evaluate().value);

				if (args.length === 0 || args.includes(undefined)) {
					canRemoved = false;
					continue;
				}

				let value = globalThis[id.name].apply(null, args); //计算结果
				if (typeof value == "function" || typeof value == "undefined") {
					canRemoved = false;
					continue;
				}
				console.log(parentPath.toString(), "-->", value);
				parentPath.replaceWith(types.valueToNode(value)); //替换
			}

			canRemoved && path.remove();

		} catch (e) { }

	},
}


traverse(ast, CalcCallExpression);

traverse(ast, constantFold);



function isBaseLiteral(node) {
    if (types.isLiteral(node)) {
        return true;
    }
    if (types.isUnaryExpression(node, {operator: "-"}) ||
        types.isUnaryExpression(node, {operator: "+"})) {
        return isBaseLiteral(node.argument);
    }

    return false;
}

const deleteLiteralOfSequenceExpression = 
{
	SequenceExpression(path)
	{
		let expressionsPaths = path.get('expressions');

		if(expressionsPaths.every(expression => isBaseLiteral(expression.node)))
		{
			console.log(path.toString())
			let lastNode = expressionsPaths.pop().node;
			path.replaceWith(lastNode);
		}
	}
}

traverse(ast, deleteLiteralOfSequenceExpression);

ast = parser.parse(generator(ast).code);


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
	"VariableDeclarator"(path) {
		let { node, scope, parentPath } = path;
		if(!parentPath.parentPath.isBlock())
		{//过滤for..of等语句
		//	return;
		}
		
		let {id,init} = node;
		
		if (!types.isIdentifier(id) || !isBaseLiteral(init))
		{//
			return;
		}
		
		let binding = scope.getBinding(id.name);//重新解析ast后，一定会有binding;
		
		let {referenced,constant,constantViolations} = binding;
		
		if (referenced || constantViolations.length > 1)
		{
			return;
		}
		
		if(constant || constantViolations[0] == path)
		{
			path.remove();
		}
	},

}

traverse(ast, removeDeadCode);  //PS：因为有赋值语句和定义语句同时存在，因此该插件可能需要运行多次才能删除干净。








console.timeEnd("处理完毕，耗时");
let { code } = generator(ast);

fs.writeFile(decodeFile, code, (err) => { });