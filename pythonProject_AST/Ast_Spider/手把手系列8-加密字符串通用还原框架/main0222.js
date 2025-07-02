const fs            = require('fs');
const types         = require("@babel/types");
const parser        = require("@babel/parser");
const traverse      = require("@babel/traverse").default;
const generator     = require("@babel/generator").default;


//js混淆代码读取
process.argv.length > 2 ? encodeFile = process.argv[2]: encodeFile ="./encode.js";
process.argv.length > 3 ? decodeFile = process.argv[3]: decodeFile ="./decodeResult.js";




Object.freeze(console);//防止console.log被改写。
require = undefined;  //防止恶意格盘



//浏览器环境*****************************************/
var window = new Object();
window.parseFloat = parseFloat;
window.parseInt = parseInt;
window.isNaN = isNaN;
window.decodeURI = decodeURI;
window.decodeURIComponent = decodeURIComponent;
window.encodeURI = encodeURI;
window.encodeURIComponent = encodeURIComponent;
window.escape = escape;
window.unescape = unescape;
window.eval = eval;
window.Date = Date;

document = new Object();
document.createElement = function (name) {
};
document.createElement.toString = function () {
};
window.document = document;

var navigator = new Object();
navigator.appCodeName = "Mozilla";
navigator.appName = "Netscape";
navigator.appVersion = "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";
navigator.cookieEnabled = true;
navigator.connection = {
    'connection': null,
    'effectiveType': "4g",
    'rtt': 50,
    'downlink': 10,
    'saveData': false
};
navigator.deviceMemory = 8;
navigator.hardwareConcurrency;
navigator.doNotTrack = null;
navigator.language = "zh-CN";
navigator.languages = ["zh-CN", "zh"];
navigator.onLine = true;
navigator.platform = 'Win32';
navigator.product = 'Gecko';
navigator.productSub = '20030107';
navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36";
navigator.vendor = "Google Inc.";
navigator.vendorSub = "";

window.navigator = navigator;

location = new Object();
location.port = "";
location.protocol = "https:";

window.location = location;

history = new Object();
history.length = 5;
history.scrollRestoration = "auto";
history.state = null;
window.history = history;

screen = new Object();
screen.availHeight = 1040;
screen.availLeft = 2560;
screen.availTop = 0;
screen.availWidth = 1920;
screen.colorDepth = 24;
screen.height = 1080;
screen.pixelDepth = 24;
screen.width = 1920;

screen.orientation = {
    angle: 0,
    onchange: null,
    type: "landscape-primary"
};

window.getComputedStyle = function () {
    debugger
};

window.screen = screen;

window.parent = window;

window.top = window;
window.Array = Array;
window.Object = {
    defineProperty: Object.defineProperty,
    assign: Object.assign,
    prototype: Object.prototype
}
window.Function = {
    prototype: Function.prototype
}
window.setTimeout = function (a, b) {}
window.Error = Error;
window.self = window;
window.window = window;
window.String = {
    fromCharCode: String.fromCharCode
}
//浏览器环境*****************************************


//将源代码解析为AST
let sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

let ast    = parser.parse(sourceCode);

console.time("处理完毕，耗时");

let evalCode = "try{" + sourceCode + "}catch(e){}";//如果代码本身被try语句包裹，需要自己手动去掉。

let funcAst = parser.parse(evalCode);
evalCode = generator(funcAst,opts = {"compact":true}).code;
eval(evalCode);  //压缩再eval，防止格式化检测。相当于把全局函数暴露到本地。



const constantFold = {
    "BinaryExpression|UnaryExpression"(path) {
        if(path.isUnaryExpression({operator:"-"}) || 
    	   path.isUnaryExpression({operator:"void"}))
    	{
    		return;
    	}
        const {confident, value} = path.evaluate();
        if (!confident)
            return;
        if (typeof value == 'number' && (!Number.isFinite(value))) {
            return;
        }
        path.replaceWith(types.valueToNode(value));
    },
}

traverse(ast, constantFold);


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


const deleteRepeatDefineOfVar = 
{
	VariableDeclarator(path)
	{
		let {parentPath,node,scope} = path;
		let {id,init} = node;
		let oldId = id;
		let name = id.name;
		
		const binding = scope.getBinding(name);
    
    if (!binding || !binding.constant) return;
    
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
        	referPath.replaceWith(oldId);//使用replaceWith函数比rename函数更快。
        }
        path.remove();
        scope.crawl();

      },});
	},
}


traverse(ast,deleteRepeatDefineOfVar);




//判断节点是否为字面量，插件地址 https://t.zsxq.com/09CvEE1FY
function isNodeLiteral(node) {
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


const callToStringLiteral = 
{
	CallExpression(path)
	{
		let {callee,arguments} = path.node;

		if (!types.isIdentifier(callee))
		{//防止全局函数污染，也可以屏蔽。
			return;
		}
		
		if(arguments.length == 0 || !isNodeLiteral(arguments))
		{//无实参或者实参非字面量,无法计算，退出。
			
			return;
		}
		try
		{
			let value  = eval(path.toString());
			if (typeof value != "string")
			{//过滤掉非字符串的结果，如果不想过滤，也可以屏蔽
				return;
			}
			console.log(path.toString(),"--->",value);
			path.replaceWith(types.valueToNode(value));
		}catch(e){};
		
	}
}



traverse(ast, callToStringLiteral);


traverse(ast, constantFold);


const simplifyLiteral = {
	NumericLiteral({node}) {
		if (node.extra && /^0[obx]/i.test(node.extra.raw)) {
			node.extra = undefined;
		}
  },
  StringLiteral({node}) 
  {
  	if (node.extra && /\\[ux]/gi.test(node.extra.raw)) {
  		node.extra = undefined;
    }
  },
}


traverse(ast,simplifyLiteral);




console.timeEnd("处理完毕，耗时");


let {code} = generator(ast,opts = {jsescOption:{"minimal":true}});

fs.writeFile(decodeFile, code, (err) => {});