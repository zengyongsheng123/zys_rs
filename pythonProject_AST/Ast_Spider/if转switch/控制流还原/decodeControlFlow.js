const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const t         = require("@babel/types");
const generator = require("@babel/generator");
const fs        = require("fs");


process.argv.length > 2?encodeFile = process.argv[2]:encodeFile = "./encode.js";
process.argv.length > 3?decodeFile = process.argv[3]:decodeFile = "./decodeResult.js";
sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

// 转换为AST语法树
let ast = parser.parse(sourceCode);


const addBreakStatement = 
{
	SwitchCase(path)
	{
		let {consequent} = path.node;
		if (t.isReturnStatement(consequent[consequent.length-1]))
		{
			consequent.push(t.BreakStatement());
		}
	}
}

traverse(ast, addBreakStatement);


console.time('穷举还原一些简单的if和for混淆');

function getItemFromTestValue(path, number, is_remove)
{
	let {cases} = path.node;
	for (let i=0; i<cases.length;i++)
	{
		let item = cases[i];
		if (item.test.value == number)
		{
			if (is_remove)
			{
				return path.node.cases.splice(i, 1)[0];
      }
      else
      {
      	return item;
      }
		}
	}
}


function getPrevItemCounts(path, number)
{
	let counts = 0;
	let {cases} = path.node;
	
	for (let i=0; i<cases.length;i++)
	{
		let item = cases[i];
		let {test,consequent} = item;
		let len = consequent.length;
		if (!t.isExpressionStatement(consequent[len - 2])) 
		{
			continue;
		}
	  let {right} = consequent[len - 2].expression;
	  if (t.isNumericLiteral(right,{value:number}))
	  {
	  	counts++;
	  	continue;
	  }
	  if (t.isConditionalExpression(right))
	  {
	  	if (right.consequent.value == number || 
	  	    right.alternate.value  == number)
	  	{
	  		counts++;
	  	}
	  }
	}

	return counts;
}


function isCombinCases(path,item)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let {left,operator,right} = consequent[len-2].expression;
	
	let nextNumber = right.value;
	let prevItemCounts = getPrevItemCounts(path, nextNumber);
	if (prevItemCounts == 1)
	{
		let nextItem = getItemFromTestValue(path, nextNumber, true);
		consequent.splice(consequent.length - 2, 2);
		consequent.push(...nextItem.consequent);
		return true;
	}
	
	return false;
}



function isCreateWhileNode(path,item)
{
	let {test,consequent} = item;  //case 5:.....
	
	let curValue = test.value;
	let len = consequent.length;
	
	let {left,operator,right} = consequent[len-2].expression;
	
//next = p > h ? 6 : 7;
		let nextTest = right.test;  //p > h
		if (t.isBinaryExpression(nextTest))
		{
			let trueValue  = right.consequent.value;  //6
			let falseValue = right.alternate.value;   //7
			
			let trueItem = getItemFromTestValue(path, trueValue, false) //case 8:.....
			
			let trueConse = trueItem.consequent;
			let trueLen   = trueConse.length;
			let rightNode = trueConse[trueLen-2].expression.right; 
			
			if (t.isNumericLiteral(rightNode,{value:curValue}))
			{
				let whileNode = t.whileStatement(nextTest,t.blockStatement(trueConse.slice(0, trueLen - 2)));
				consequent.splice(consequent.length - 2, 0, whileNode);
        consequent[consequent.length - 2].expression.right = t.NumericLiteral(falseValue);
        
        return true;
			}
		}
	
	
	return false;
}



const dealWithSwitch = 
{
	SwitchStatement(path)
	{
		
		let {scope,node} = path;
		let {discriminant} = node;
		let binding =  scope.getBinding(discriminant.name);
		if (!binding || !binding.path || 
		    !binding.path.isVariableDeclarator()) 
		{
			return;
		}
		let {id,init} = binding.path.node;
		if (!t.isNumericLiteral(init)) return;
		
		let initValue = init.value;
		
		
		let funcLists = [isCreateWhileNode];//函数列表，存放控制流8个基础算法
		
		for (let i=0; i < path.node.cases.length;i++)
		{
			let item = path.node.cases[i];
			let {test,consequent} = item;
			
			let prevItemCounts = getPrevItemCounts(path, test.value);
			
			if (prevItemCounts == 0 && test.value != init.value)
		  {
		  	path.node.cases.splice(i, 1);
		  	i = -1;
		  	continue;
		  }
		  
			let len = consequent.length;
			if (!t.isExpressionStatement(consequent[len-2]))
			{//过滤掉return语句
				continue;
			}
			
			let {left,operator,right} = consequent[len-2].expression;

			if (t.isNumericLiteral(right))
			{
				if (isCombinCases(path,item))
				{
					i = -1;
				}
			}
			else if (t.isConditionalExpression(right))
			{
				for (let func of funcLists)
				{
					if (func.call(this,path,item))
					{
						i = -1;
						break;
					}
				}
			}
		}
	},
}

traverse(ast, dealWithSwitch);




const replaceSwitchNOde = 
{
	"ForStatement|WhileStatement"(path)
	{
		let {scope,node} = path;
		let body = node.body.body;
		if (body.length != 1 ||
		    !types.isSwitchStatement(body[0]))
		{
			return;
		}
		let {discriminant,cases} = body[0];
		let binding =  path.scope.getBinding(discriminant.name);
		if (!binding || !binding.path || 
		    !binding.path.isVariableDeclarator()) 
		{
			return;
		}
		
		if (cases.length != 1) return;
		
		let {consequent} = cases[0];
		
		if (types.isBreakStatement(consequent[consequent.length-1]))
		{
			consequent.pop();
		}
		if (types.isExpressionStatement(consequent[consequent.length-1]) &&
		    types.isAssignmentExpression(consequent[consequent.length-1].expression))
		{

			let {left} = consequent[consequent.length-1].expression;
			if (types.isIdentifier(left,{name:discriminant.name}))
			{
				consequent.pop();
			}
		}		
		
		path.replaceWithMultiple(consequent);
		
		binding.path.remove();
		

	}
}


traverse(ast, replaceSwitchNOde);


console.timeEnd('穷举还原一些简单的if和for混淆');


let {code} = generator.default(ast, {
    compact: false,  // 压缩格式
    comments: false,  // 注释
    jsescOption: {
        minimal: false // 转义
    }
});

fs.writeFile(decodeFile, code, (err) => {});