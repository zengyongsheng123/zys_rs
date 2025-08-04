const files = require('fs');
const types = require("@babel/types");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;

//js混淆代码读取
let encodeFile = process.argv.length > 2 ? process.argv[2] : "./jquery.js";
let decodeFile = process.argv.length > 3 ? process.argv[3] : encodeFile.replace(".js", "_decode.js")

//将源代码解析为AST
let sourceCode = files.readFileSync(encodeFile, { encoding: "utf-8" });
let ast = parser.parse(sourceCode);

//eval解密函数到全局
eval(files.readFileSync("./Jm.js", { encoding: "utf-8" }));

//处理16进制和Unicode转义序列
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
        if (valueType == 'number' && (!Number.isFinite(value))) { //过滤掉 1/0 这种情况，否则会导致堆栈溢出。
            return;
        }

        path.replaceWith(types.valueToNode(value))

    }
}

traverse(ast, constantFold);


function isBaseLiteral(node) {
    if (types.isNumericLiteral(node) || types.isStringLiteral(node)) {return true;}
    if (types.isUnaryExpression(node)) {return isBaseLiteral(node.argument);}
    return false;
}

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
            let KeyName = types.isIdentifier(key) ? key.name : key.value;
            if (!KeyName || KeyName.length != 5) {
                //  continue; //仅针对ob混淆
            }
            newMap.set(KeyName, value);
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
    }
}

traverse(ast, decodeObjectofValue);

// 1. 构建变量名到初始化值的映射（仅处理直接赋值为标识符的情况）
const varMap = {};
traverse(ast, {
  VariableDeclarator(path) {
    const id = path.node.id;
    const init = path.node.init;

    if (types.isIdentifier(id) && types.isIdentifier(init)) {
      varMap[id.name] = init.name; // 记录变量名与其初始值
    }
  }
});
// 2. 递归查找所有引用目标函数的变量名
function collectReferences(targetVar, varMap) {
  const collected = new Set();
  let queue = [targetVar];

  while (queue.length > 0) {
    const currentVar = queue.shift();

    // 查找所有变量名中，初始值指向 currentVar 的变量
    const referringVars = Object.keys(varMap).filter(
      varName => varMap[varName] === currentVar
    );

    referringVars.forEach(varName => {
      if (!collected.has(varName)) {
        collected.add(varName);
        queue.push(varName);
      }
    });
  }

  return Array.from(collected);
}
// 3. 使用示例：查找所有引用了_0x4d68的变量
const referencedVars = collectReferences('a', varMap);

const Restore_CallExpression={
    CallExpression: (path) => {
        let {callee,arguments} = path.node;
        let {name} = callee;
        if(!referencedVars.includes(name)){return;}
        if(arguments.length !==1 ){return;}
        if(!types.isNumericLiteral(arguments[0])){return}
        let {value} =arguments[0];
        console.log(`[String Decode]:::${path.toString()} ===> ${a(value)}`);
        path.replaceWith(types.valueToNode(a(value)))
    }
}
traverse(ast,Restore_CallExpression);
traverse(ast, constantFold);

const Delete_VariableDeclaration={
    VariableDeclaration:(path)=>{
        let {kind,declarations}=path.node;
        if(kind!=="var"){return;}
        if(declarations.length!==1){return;}
        let {id,init}=declarations[0];
        if(types.isIdentifier(id) && types.isIdentifier(init)){
            if(init.name==="a"){path.remove();}
            if(referencedVars.indexOf(init.name)===-1){return;}
            if(referencedVars.indexOf(id.name)===-1){return;}
            path.remove();
        }
    },
    VariableDeclarator:(path)=>{
        let {id,init}=path.node;
        if(types.isIdentifier(id) && types.isIdentifier(init)){
            if(init.name==="a"){path.remove();}
            if(referencedVars.indexOf(init.name)===-1){return;}
            if(referencedVars.indexOf(id.name)===-1){return;}
            path.remove();
        }
    }
}
traverse(ast, Delete_VariableDeclaration);


function savePropertiesToObject(properties, newMap) {
	for (const property of properties) {
		if (!property.key) {
			break;
		}
		let propKey = property.key.value;
        if (!propKey || propKey.length != 5)
        {
            break;
        }

		let propValue = property.value;
		if (types.isStringLiteral(propValue)) {
			newMap.set(propKey, propValue);
		}
		else if (types.isFunctionExpression(propValue)) {
			let retState = propValue.body.body;
			if (retState.length == 1 && types.isReturnStatement(retState[0])) {
				let argument = retState[0].argument;
				if (types.isCallExpression(argument)) {
					newMap.set(propKey, "Call");
				}
				else if (types.isBinaryExpression(argument) ||
					types.isLogicalExpression(argument)) {
					newMap.set(propKey, argument.operator);
				}
			}
		}
		else {
			break;
		}
	}
}
function replaceReferNode(newMap,referencePaths)
{
	for (const referPath of referencePaths.reverse())
	{
		let {node,parent,parentPath} = referPath;
		let ancestorPath = parentPath.parentPath;
		if (!parentPath.isMemberExpression({object:node})) return;
		let {property} = parent;
		let propKey = property.value;
		let propValue = newMap.get(propKey);
		if (!propValue) return;

		if (ancestorPath.isCallExpression({callee:parent}))
		{
			let {arguments} = ancestorPath.node;
			switch (propValue) {
					case "Call":
						 ancestorPath.replaceWith(types.CallExpression(arguments[0], arguments.slice(1)));
						 break;
					case "||":
					case "&&":
						 ancestorPath.replaceWith(types.LogicalExpression(propValue, arguments[0], arguments[1]));
						 break;
					default:
						 ancestorPath.replaceWith(types.BinaryExpression(propValue, arguments[0], arguments[1]));
						 break;
			}
		}
		else
		{
			parentPath.replaceWith(types.valueToNode(propValue));
		}
	}
}

const decodeObject = {
	VariableDeclarator({ node, scope }) {
		const { id, init } = node;
		if (!types.isObjectExpression(init)) return;
		let name = id.name;

		let binding = scope.getBinding(name);
		let { constant, referencePaths } = binding;
		if (!constant) return;

		let properties = init.properties;
		if (properties.length == 0) return;

		let newMap = new Map();
		savePropertiesToObject(properties, newMap);
		if (newMap.size != properties.length) return;

		for (const referPath of referencePaths.reverse()) {
			let { node, parent, parentPath } = referPath;
			let ancestorPath = parentPath.parentPath;
			if (!parentPath.isMemberExpression({ object: node })) {
				continue;
			}
			let { property } = parent;
            let propKey = types.isIdentifier(property) ? property.name : property.value;
			let propValue = newMap.get(propKey);
			if (!propValue) {
				continue;
			}

			if (typeof propValue != "string") {
				parentPath.replaceWith(propValue);
				continue;
			}
			if (ancestorPath.isCallExpression({ callee: parent })) {
				let { arguments } = ancestorPath.node;
				switch (propValue) {
					case "Call":
						ancestorPath.replaceWith(types.CallExpression(arguments[0], arguments.slice(1)));
						break;
					case "||":
					case "&&":
						ancestorPath.replaceWith(types.LogicalExpression(propValue, arguments[0], arguments[1]));
						break;
					default:
						ancestorPath.replaceWith(types.BinaryExpression(propValue, arguments[0], arguments[1]));
						break;
				}
			}
		}

		newMap.clear();

		scope.crawl();

	},
}
traverse(ast, decodeObject);

const decodeControlFlow = {

    WhileStatement(path) {
        const { node, scope } = path;
        const { test, body } = node;
        if (!types.isLiteral(test, { value: true })) return;
        if (body.body.length != 2) return;
        let switchNode = body.body[0], breakNode = body.body[1];
        if (!types.isSwitchStatement(switchNode) ||
            !types.isBreakStatement(breakNode)) {
            return;
        }
        let { discriminant, cases } = switchNode;
        if (!types.isMemberExpression(discriminant)) return;
        let { object, property } = discriminant;
        if (!types.isIdentifier(object) || !types.isUpdateExpression(property)) return;

        let arrName = object.name;
        let indexName = property.argument.name;

        let binding = scope.getBinding(arrName);
        if (!binding || !binding.path || !binding.path.isVariableDeclarator()) return;
        let { id, init } = binding.path.node;

        if (!types.isCallExpression(init) || !types.isMemberExpression(init.callee)) return;
        object = init.callee.object;
        property = init.callee.property;
        if (!types.isStringLiteral(object) || !types.isStringLiteral(property, { value: "split" })) {
            return;
        }

        let disPatchArray = object.value.split("|");
        let retBody = [];
        disPatchArray.forEach(index => {
            let caseBody = cases[index].consequent;
            if (types.isContinueStatement(caseBody[caseBody.length - 1])) {
                caseBody.pop();
            }
            retBody = retBody.concat(caseBody);
        })

        path.replaceWithMultiple(retBody);
        binding.path.remove();
        let indexBinding = scope.getBinding(indexName);
        indexBinding.path.remove();
    },
}

traverse(ast, decodeControlFlow);

const removeDeadCode = {
    "VariableDeclarator|FunctionDeclaration"(path)
    {
      let {node,scope,parentPath} = path;
      let binding =  scope.getBinding(node.id.name);
      if (binding && !binding.referenced && binding.constant)
      {//没有被引用，也没有被改变
        if (parentPath.parentPath.isForInStatement())
        {
          return;
        }
        path.remove();
      }
    },
}
traverse(ast, removeDeadCode);


const standardLoop =
{
    "ForStatement|WhileStatement|ForInStatement|ForOfStatement|DoWhileStatement"({ node }) {
        if (!types.isBlockStatement(node.body)) {
            node.body = types.BlockStatement([node.body]);
        }
    },
    IfStatement(path)
    {
    	const consequent = path.get("consequent");
    	const alternate  = path.get("alternate");
    	if (!consequent.isBlockStatement()) 
    	{
    		consequent.replaceWith(types.BlockStatement([consequent.node]));
    	}
    	if (alternate.node !== null && !alternate.isBlockStatement()) {
    		alternate.replaceWith(types.BlockStatement([alternate.node]));
    	}
    },
}
traverse(ast, standardLoop);

function SequenceOfStatement(path) {
    let { scope, parentPath, node } = path;
    if (parentPath.parentPath.isLabeledStatement()) {//标签节点无法往前插入。
        return;
    }
    let expressions = node.expressions;
    if (parentPath.isReturnStatement({ "argument": node }) ||
        parentPath.isThrowStatement({ "argument": node })) {
        parentPath.node.argument = expressions.pop();
    }
    else if (parentPath.isIfStatement({ "test": node }) ||
        parentPath.isWhileStatement({ "test": node })) {
        parentPath.node.test = expressions.pop();
    }
    else if (parentPath.isForStatement({ "init": node })) {
        parentPath.node.init = expressions.pop();
    }
    else if (parentPath.isForInStatement({ "right": node }) ||
        parentPath.isForOfStatement({ "right": node })) {
        parentPath.node.right = expressions.pop();
    }
    else if (parentPath.isSwitchStatement({ "discriminant": node })) {
        parentPath.node.discriminant = expressions.pop();
    }

    else if (parentPath.isExpressionStatement({ "expression": node })) {
        parentPath.node.expression = expressions.pop();
    }
    else {
        return;
    }

    for (let expression of expressions) {
        parentPath.insertBefore(types.ExpressionStatement(expression = expression));
    }
}

function SequenceOfExpression(path) {
    let { scope, parentPath, node, parent } = path;
    let ancestorPath = parentPath.parentPath;
    let expressions = node.expressions;
    if (parentPath.isConditionalExpression({ "test": node }) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.test = expressions.pop();
    }
    else if (parentPath.isVariableDeclarator({ "init": node }) &&
        ancestorPath.parentPath.isBlock()) {
        parentPath.node.init = expressions.pop();
    }
    else if (parentPath.isUnaryExpression({ "argument": node }) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.argument = expressions.pop();
    }
    else if (parentPath.isAssignmentExpression({ "right": node }) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.right = expressions.pop();
    }
    else if ((parentPath.isCallExpression({ "callee": node }) ||
        parentPath.isNewExpression({ "callee": node })) &&
        ancestorPath.isExpressionStatement({ "expression": parent })) {
        parentPath.node.callee = expressions.pop();
    }
    else {
        return;
    }

    for (let expression of expressions) {
        ancestorPath.insertBefore(types.ExpressionStatement(expression = expression));
    }
}

const resolveSequence =
{
    SequenceExpression:
    {//对同一节点遍历多个方法
        exit: [SequenceOfStatement, SequenceOfExpression]
    }
}

traverse(ast, resolveSequence);








//重新生成源代码
let { code } = generator(ast, opts = {
	"compact": false,  // 是否压缩代码
	"comments": false,  // 是否保留注释
	"jsescOption": { "minimal": true },  //Unicode转义
});
files.writeFile(decodeFile, code, (err) => { });