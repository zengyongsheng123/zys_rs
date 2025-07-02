const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const parser = require("@babel/parser");
const generator = require("@babel/generator").default;
const fs = require("fs");

// 万能数组还原插件:
//这里填入 需要处理的 数组的声明与定义
let arrName = "XXX";   //XXX 为你要还原的数组名

const replaceArrayElements =
{
	MemberExpression:{
		exit(path)
		{
			let {object,property} = path.node;
			if (!types.isIdentifier(object,{name:arrName}) ||
			  !types.isNumericLiteral(property))
			{
				return;
			}

			let value = eval(path.toString());
			path.replaceWith(types.valueToNode(value));
		}
	},
}

traverse(ast,replaceArrayElements);