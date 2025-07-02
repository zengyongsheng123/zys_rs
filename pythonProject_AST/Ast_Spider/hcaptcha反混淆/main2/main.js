/*****************************************************
通用反混淆插件合集，理论上不会更改混淆代码的逻辑。

声明:

脚本仅用于学习研究，禁止非法使用，否则后果自负！

欢迎购买AST星球共同学习交流
星球地址:
https://t.zsxq.com/FMRf2ZV

微信:523176585

*****************************************************/

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

const deleteRepeatDefine = {
	"FunctionDeclaration"(path) {
		let { node, scope, parentPath } = path;
		let oldId = node.id;
		let name = oldId.name;

		if (name != "WA") {
			return; //打开该行，过滤掉大部分判断，加快判断速度
		}

		scope = parentPath.scope;
		const binding = scope.getBinding(name);
		let isPathConst = true;
		if (binding && !binding.constant) {
			for (let constantPath of binding.constantViolations) {
				if (!path.isAncestor(constantPath)) {
					isPathConst = false;
					break;
				}
			}
		}

		if (!binding || !isPathConst) return;

		let allReferencePath = binding.referencePaths;

		scope.traverse(scope.block, {
			VariableDeclarator(path) {
				let { node, scope } = path;
				let { id, init } = node;
				if (!types.isIdentifier(init, { name: name })) {
					return;
				}

				let isRefer = false;
				for (let referPath of allReferencePath) {
					if (path.isAncestor(referPath)) {
						isRefer = true;
						break;
					}
				}

				if (!isRefer) return;

				const binding = scope.getBinding(id.name);

				if (!binding || !binding.constant)//如果被更改则不能进行替换
					return;

				for (let referPath of binding.referencePaths) {
					referPath.replaceWith(oldId);//使用replaceWith函数比rename函数更快。
				}
				console.log(path.toString())
				path.remove();
				scope.crawl();
			},
			AssignmentExpression(path) {
				let { scope, node, parentPath } = path;

				let { left, operator, right } = node;

				if (!types.isIdentifier(left) || operator != "=" ||
					!types.isIdentifier(right, { name: name })) {
					return;
				}

				let isRefer = false;
				for (let referPath of allReferencePath) {
					if (path.isAncestor(referPath)) {
						isRefer = true;
						break;
					}
				}

				if (!isRefer) return;

				const binding = scope.getBinding(left.name);

				if (!binding) {//如果没有binding,或者赋值语句本身改变了它，因此这里判断只有一处改变。
					return;
				}

				for (let referPath of binding.referencePaths) {
					referPath.replaceWith(oldId);//使用replaceWith函数比rename函数更快。
				}
				if (parentPath.isExpressionStatement({ "expression": node }) || parentPath.isSequenceExpression()) {
					let bindPath = binding.path;

					if (bindPath.isVariableDeclarator() && bindPath.node.init == null) {
						bindPath.remove();
					}
					
					path.remove();

				}
				
			},
		})
	},
}

for (let i=0; i<10 ;i++)
{

	traverse(ast, deleteRepeatDefine);
	ast = parser.parse(generator(ast).code);
}




console.timeEnd("处理完毕，耗时");
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});

fs.writeFile(decodeFile, code, (err) => { });