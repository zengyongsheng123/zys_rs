const fs            = require('fs');
const types         = require("@babel/types");
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const generator     = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";

//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

let ast    = parser.parse(sourceCode);
// 手把手反混淆系列三：解密函数调用表达式的还原。
// add(1,2) ==> 3
// 函数表达式是混淆代码中最长见的一种，也是最错综复杂的。
// 在还原时需要满足以下几点:
// 1.必须是纯函数，一般和浏览器环境无关
// 2.函数的调用表达式，其实参必须是字面量，要不然在ast文件中无法计算值
// 附件中是一个通用的模板，你只需要把解密函数及其相关代码复制进来即可.
// 当然，有些函数代码需要进行压缩才能运行，常见的比如ob。这需要自己有一定的抠代码的能力。
// 还需要确保函数的调用表达式的实参是字面量。
// 如果实参隐藏在一般的变量定义中，请使用 这个插件先还原:
// 变量定义初始化为常量时的还原，该变量在其作用域内没有发生更改的时候，可以通过binding来进行还原。
// 新增对while循环的处理。
/********************************************************************
var a = 123;
var b = -5;
var c = String;
var d = String.fromCharCode;
function e()
{
  var f = c(123),g = d(0x31);
	return a + b + f ;
}
while(true)
{
  var h = 123;
  var i = 111;
  j = h + 456;
  i = i + 222;
}
===>
function e() {
  var f = String(123),
    g = String.fromCharCode(0x31);
  return 123 + -5 + f;
}
while (true) {
  var i = 111;
  j = 123 + 456;
  i = i + 222;
}
********************************************************************/
const restoreVarDeclarator = {
	VariableDeclarator(path)
	{
		let  scope    = path.scope;
		let {id,init} = path.node;
		if (!types.isIdentifier(id) || init == null)
		{
			return;
		}
		if (types.isUnaryExpression(init))
		{//处理 var b = -5;
			let {operator,argument} = init;
			if (!["+","-"].includes(operator) || !types.isLiteral(argument))
			{
				return;
			}
		}
		else if (types.isIdentifier(init))
		{//处理 var c = String;
			if (typeof this[init.name] == 'undefined')
			{
				return;
			}
		}
		else if (types.isMemberExpression(init))
		{//处理 var d = String.fromCharCode;
			let name = init.object.name;
			if (typeof this[name] == 'undefined' || name === 'window')
			{//注意object为window时，可能会还原出错
				return;
			}
		}
		else if (!types.isLiteral(init))
		{
			return;
		}
		const binding = scope.getBinding(id.name);
		let {constant,referencePaths,constantViolations} = binding;  //变量的定义一定会有binding.
		if(!constant)
		{//新版本的babel库，在循环里面的变量定义，默认非常量
			if (constantViolations.length !== 1 || constantViolations[0] !== path) //旧版本屏蔽该行即可
			{
				return;
			}
		}
		for (let referPath of referencePaths)
		{
			referPath.replaceWith(init);
		}
		path.remove();//没有被引用，或者替换完成，可直接删除

	},
}
traverse(ast, restoreVarDeclarator);
console.time("处理完毕，耗时");


// 如果实参隐藏在Array对象中，请使用 这个插件先还原:
// 通用插件更新，数组元素还原:
/******************************************************************
插件名称: replaceArrayElements
Description: Array数据类型还原，需要元素全部为Literal，可嵌套
还原前实例:
var a = [1,2,3,window];
b = a[0] + a[1] + a[2];
c = a[3];

还原后实例:
b = 1 + 2 + 3;
c = window;
******************************************************************/

const replaceArrayElements =
{//数组还原
    VariableDeclarator(path) {
        let { node, scope } = path;
        let { id, init } = node;
        if (!types.isArrayExpression(init) || init.elements.length === 0) return;

        for (let ele of init.elements)
        {
            if (types.isArrayExpression(ele) || types.isObjectExpression(ele))
            {
                return;  //20240401新增
            }
        }

        const binding = scope.getBinding(id.name);
        if (!binding) {
            return;
        }

        let { constant, referencePaths, constantViolations } = binding;  //变量的定义一定会有binding.

        if (constantViolations.length > 1) {
            return;
        }

        if (constant || constantViolations[0] === path) {

            for (let referPath of binding.referencePaths) {
                let { node, parent, parentPath } = referPath;
                if (!types.isMemberExpression(parent, { object: node }) || !types.isNumericLiteral(parent.property)) {
                    return;
                };
                if (parentPath.parentPath.isAssignmentExpression({ "left": parent })) {
                    return;
                }

                if (parentPath.parentPath.isUpdateExpression({ "argument": parent })) {
                    return;
                }
            }

            for (let referPath of binding.referencePaths) {
                let { parent, parentPath } = referPath;
                let index = parent.property.value;
                parentPath.replaceWith(init.elements[index]);
            }

            path.remove();
        }
    },
}

traverse(ast, replaceArrayElements);
function isNodeLiteral(node) {//判断形参是否全部为字面量，要不然eval的时候会报错
    if (Array.isArray(node)) {
        return node.every(ele => isNodeLiteral(ele));
    }
    if (types.isLiteral(node)) {
    	if (node.value == null)
    	{
    		return false;
    	}
      return true;
    }
    if(types.isBinaryExpression(node))
    {
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
//把函数声明及相关代码复制到ast的反混淆文件中。
 function S(s) {
            return 355 > s
        }
 function I(s, _) {
            s += _;
            return s.toString(36)
        }       
 function l(s) {
            var _ = arguments.length
              , J = []
              , z = 1;
            while (z < _)
                J[z - 1] = arguments[z++] - s;
            return String.fromCharCode.apply(String, J)
        }

let funcNames = ['S','I',"l"]; //填写函数名。
const callToString = {
    "CallExpression"(path) {
        let node = path.node;

        let {callee, arguments} = node;
        if (!types.isIdentifier(callee) || !funcNames.includes(callee.name)) 
        {
            return;
        }

        if (arguments.length === 0 || !isNodeLiteral(arguments)) {
            return;
        }

        let value = eval(path.toString());
        console.log(path.toString(), "-->", value);
        path.replaceWith(types.valueToNode(value));
    },
}

traverse(ast, callToString);




// 如果实参隐藏在Object对象中，请使用这个插件先还原:


// 当一个object里面的value全部为字面量时的还原，没有考虑单个key重新赋值的情况。
//
// var obj = {"a":123,"b":456,"c":"",};
// var res = obj["a"] + obj["a"] + obj["b"] + obj["c"];
//
// ===>
//
// var res = 123 + 123 + 456 + "";
//
// 还原思路:
// 1.遍历 VariableDeclarator 节点或者  AssignmentExpression 节点
// 2.判断object里面的value是否全部为字面量
// 3.判断是否被重新赋值
// 4.根据scope来查找其引用的地方，替换
// 5.如果全部进行了还原，删除垃圾代码
// 代码:

function isBaseLiteral(node) {

    if (types.isNumericLiteral(node) || types.isStringLiteral(node)) {
        return true;
    }

    if (types.isUnaryExpression(node)) {
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

// 原 isBaseLiteral 函数:

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
// 大家决定自行取舍。
// 当然，除了上述插件，可能需要需要清除掉函数名的重复命名。
//  函数名被重复赋值的还原

/*****************************************************

function _0x2146(_0x204948, _0x3064fb) {
  return _0x204948 + _0x3064fb;
}

var aaa = _0x2146;
b = aaa(2,3);

var bbb = aaa;
c = bbb(3,4);

===>

function _0x2146(_0x204948, _0x3064fb) {
  return _0x204948 + _0x3064fb;
}
b = _0x2146(2, 3);
c = _0x2146(3, 4);

*****************************************************/

let rightVarList = new Map();

const collectMatchVarDefine =
{//收集符合条件的变量定义，避免重复判断浪费时间。
	VariableDeclarator(path)
	{
		let {node, scope} = path;
		let {id, init} = node;
    if (!types.isIdentifier(id) || !types.isIdentifier(init))
    {
    	return;
    }
    const binding = scope.getBinding(id.name);

    if (!binding || !binding.constant)//如果被更改则不能进行替换
    {
     return;
    }

    if (rightVarList.has(id.name))
    {
    	console.log("发现同名变量，请不要使用该插件。");
    }

    rightVarList.set(id.name,init.name);
	}
}

traverse(ast,collectMatchVarDefine);

const deleteRepeatDefineOfFunction =
{
	FunctionDeclaration(path)
	{
		let {parentPath,node} = path;
		let {id,params} = node;
		let funcId = id;
		let name = id.name;

		if (!["_0x2146","_0x15a7"].includes(name))//函数名过滤，视情况而改
		{
			//return;  打开该行，过滤掉大部分判断，加快判断速度
		}

		let scope = parentPath.scope;
		const binding = scope.getBinding(name);
		let isPathConst = true;
		if (binding && !binding.constant)
		{//函数内部的更改不用过滤
			for (let constantPath of binding.constantViolations)
			{
				if (!path.isAncestor(constantPath))
				{
					isPathConst = false;
					break;
        }
      }
    }

    if (!binding || !isPathConst) return;

    scope.traverse(scope.block, {
    	VariableDeclarator(path) {
    		let {node,scope} = path;
    		let {id, init} =path.node;
    		if(!rightVarList.has(id.name) || !types.isIdentifier(init, {name: name}))
    		{
    			return;
    		}

    		const binding = scope.getBinding(id.name);
    		for (let referPath of binding.referencePaths)
        {
        	referPath.replaceWith(funcId);//使用replaceWith函数比rename函数更快。
        }
        path.remove();
        scope.crawl();

      },});
	},
}

traverse(ast,deleteRepeatDefineOfFunction);
console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});