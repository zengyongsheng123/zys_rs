const parser    = require("@babel/parser");
const traverse  = require("@babel/traverse").default;
const types     = require("@babel/types");
const t         = require("@babel/types");
const generator = require("@babel/generator");
const fs        = require("fs");


process.argv.length > 2?encodeFile = process.argv[2]:encodeFile = "./result1.js";
process.argv.length > 3?decodeFile = process.argv[3]:decodeFile = "./decodeResult.js";
sourceCode = fs.readFileSync(encodeFile, {encoding: "utf-8"});

// 转换为AST语法树
let ast = parser.parse(sourceCode);


const addBreakStatement = 
{
	SwitchCase(path)
	{
		let {consequent} = path.node;
		if (!t.isBreakStatement(consequent[consequent.length-1]))
		{
			consequent.push(t.BreakStatement());
		}
	}
}

traverse(ast, addBreakStatement);


console.time('穷举还原一些简单的if和for混淆');

function getItemFromTestValue(path, number)
{
	let {cases} = path.node;
	for (let index =0; index<cases.length;index++)
	{
		let item = cases[index];
		if (item.test.value == number)
		{
			return [item,index];
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


function isCombinCases(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let {left,operator,right} = consequent[len-2].expression;
	
	let nextNumber = right.value;
	
	let counts = countsMap.get(nextNumber);
	if (counts == 1)
	{
		let data = getItemFromTestValue(path, nextNumber);
		let nextItem = data[0];
		consequent.splice(consequent.length - 2, 2);
		consequent.push(...nextItem.consequent);
		
		path.node.cases.splice(data[1], 1);
		countsMap.set(nextNumber,0);
		
		return true;
	}
	
	return false;
}






function isCreateWhileNode(path,item,countsMap)
{
	let {test,consequent} = item; 
	
	let curValue = test.value;
	let len = consequent.length;
	
	let {left,operator,right} = consequent[len-2].expression;
	
	let nextTest = right.test; 
	
	if (t.isBinaryExpression(nextTest))
	{
		let trueValue  = right.consequent.value;  //6
		let falseValue = right.alternate.value;   //7
		
		let data = getItemFromTestValue(path, trueValue)
			
		let trueItem = data[0] //case 8:.....
			
		let trueConse = trueItem.consequent;
		let trueLen   = trueConse.length;
		let rightNode = trueConse[trueLen-2].expression.right; 
		if (t.isNumericLiteral(rightNode,{value:curValue}))
		{
			let whileNode = t.whileStatement(nextTest,t.blockStatement(trueConse.slice(0, trueLen - 2)));
			consequent.splice(consequent.length - 2, 0, whileNode);
      consequent[consequent.length - 2].expression.right = t.NumericLiteral(falseValue);
      
      let counts = countsMap.get(trueValue);
      
      if (counts == 1)
      {
      	path.node.cases.splice(data[1], 1);
      	
      	let curCounts = countsMap.get(curValue);
      	countsMap.set(curValue,curCounts - 1);
      }
      countsMap.set(trueValue,counts - 1);

      return true;
		}
	}
	
	
	return false;
}



function isCreateWhileIFNode(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;
	
//p > h ? 6 : 7
		let nextTest = right.test;
		if (t.isBinaryExpression(nextTest))
		{
			let trueValue  = right.consequent.value;  //6
			let falseValue = right.alternate.value;   //7
			
			let trueData = getItemFromTestValue(path, trueValue);
			let trueItem = trueData[0]; //case 6:.....
			let trueConse = trueItem.consequent;
			let trueLen = trueConse.length;	
			let rightNode = trueConse[trueLen-2].expression.right;
			
			
			if (t.isConditionalExpression(rightNode))
			{//m ? 8:9
				let true_true_number  = rightNode.consequent.value;  //8
        let true_false_number = rightNode.alternate.value;   //9
        
        let trueTrueData = getItemFromTestValue(path, true_true_number);
        let true_true_item =  trueTrueData[0];  //case 8:...
        let true_true_conse = true_true_item.consequent;
        let true_true_len   = true_true_conse.length;
        
        let trueFalseData = getItemFromTestValue(path, true_false_number);
        let true_false_item = trueFalseData[0]; //case 9:...
        let true_false_conse = true_false_item.consequent;
        let true_false_len   = true_false_conse.length;      
        
        if (t.isNumericLiteral(true_true_conse[true_true_len-2].expression.right,{value:falseValue}) &&
            t.isNumericLiteral(true_false_conse[true_false_len-2].expression.right,{value:curValue}))
        {
         	true_true_item.consequent.splice(true_true_item.consequent.length-2,1);
         	let ifNode = t.ifStatement(rightNode.test,t.blockStatement(true_true_item.consequent),null);

         	let whileBody = trueConse.slice(0, trueLen - 2);//code 1
         	whileBody.push(ifNode);  //ifNode;
         	whileBody.push(...true_false_item.consequent.slice(0, true_false_item.consequent.length - 2));//code 3
         	let whileNode = t.whileStatement(nextTest,t.blockStatement(whileBody)); 

       	  consequent.splice(consequent.length - 2, 0, whileNode);  //case 5 插入 while节点
       	  consequent[consequent.length - 2].expression.right = t.numericLiteral(falseValue);  // next = 7
       	  
       	  let trueCounts = countsMap.get(trueValue);
       	  if (trueCounts == 1)
       	  {
       	  	path.node.cases.splice(trueData[1], 1);
       	  	
       	  	let trueTrueCounts = countsMap.get(true_true_number);
       	  	countsMap.set(true_true_number,trueTrueCounts - 1);
      	  	
       	  	let trueFalseCounts = countsMap.get(true_false_number);
       	  	countsMap.set(true_false_number,trueFalseCounts - 1);
       	  }
       	  
       	  let trueTrueCounts = countsMap.get(true_true_number);
       	  if (trueTrueCounts == 0)
       	  {
       	  	trueTrueData = getItemFromTestValue(path, true_true_number);
       	  	path.node.cases.splice(trueTrueData[1], 1);
       	  	
       	  	let falseCounts = countsMap.get(falseValue);
       	  	countsMap.set(falseValue,falseCounts - 1);
       	  	
       	  	
       	  }
       	  let trueFalseCounts = countsMap.get(true_false_number);
       	  if (trueFalseCounts == 0)
       	  {
       	  	trueFalseData = getItemFromTestValue(path, true_false_number);
       	  	path.node.cases.splice(trueFalseData[1], 1);
       	  	
       	  	
       	  	let curCounts = countsMap.get(curValue);
       	  	countsMap.set(curValue,curCounts - 1);	
       	  }       	  

       	  countsMap.set(trueValue,trueCounts - 1);
       	  return true;
        }
			}
		}	

	
	return false;	
}




function isCreateIFNode1(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;

	let nextTest = right.test;
	let trueValue  = right.consequent.value;  //6
	let falseValue = right.alternate.value;   //7
	if (t.isBinaryExpression(nextTest)) return;
	
	let data = getItemFromTestValue(path, trueValue);
	let trueItem = data[0] //case 8:.....
		
	let trueConse = trueItem.consequent;
	let trueLen = trueConse.length;
		
	if (t.isExpressionStatement(trueConse[trueLen-2]) &&
		  t.isNumericLiteral(trueConse[trueLen-2].expression.right,{value:falseValue}))
	{
		let ifNode = t.ifStatement(nextTest, t.blockStatement(trueConse.slice(0, trueLen - 2)));
		consequent.splice(consequent.length - 2, 0, ifNode);
    consequent[consequent.length - 2].expression.right = t.numericLiteral(falseValue);  // next = 7
    
    let counts = countsMap.get(trueValue);
    if (counts == 1)
    {
     path.node.cases.splice(data[1], 1);
     
     falseCounts = countsMap.get(falseValue);
     countsMap.set(falseValue,falseCounts-1);
    }
    countsMap.set(trueValue,counts-1);
    

    
    return true;
  }
	
	return false;	
}


function isCreateIFNode2(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;

	let nextTest = right.test;
	let trueValue  = right.consequent.value;  //6
	let falseValue = right.alternate.value;   //7
	if (t.isBinaryExpression(nextTest)) return;
	
	
	let data = getItemFromTestValue(path, falseValue);
	let falseItem = data[0] //case 8:.....
		
	let falseConse = falseItem.consequent;
	let falseLen = falseConse.length;
		
	if (t.isExpressionStatement(falseConse[falseLen-2]) &&
		  t.isNumericLiteral(falseConse[falseLen-2].expression.right,{value:trueValue}))
	{
		let ifNode = t.ifStatement(t.unaryExpression("!",nextTest), t.blockStatement(falseConse.slice(0, falseLen - 2)));
		consequent.splice(consequent.length - 2, 0, ifNode);
    consequent[consequent.length - 2].expression.right = t.numericLiteral(trueValue);  // next = 7
    
    let counts = countsMap.get(falseValue);
    if (counts == 1)
    {
     path.node.cases.splice(data[1], 1);
     tureCounts = countsMap.get(trueValue);
     countsMap.set(trueValue,tureCounts-1);
    }
    
    countsMap.set(falseValue,counts-1);
    
    


    
    return true;
	}

	
	return false;	
}



/********************************
      case 5:
        code1;
        next = m ? 6 : 7;
        break;
     case 6 :
        code2;
        next = 8;
        break;
     case 7:
        code3;
        next = 8;
        break;      
    
     ===>
     
     case 5 :
        code1;
        if (m)
        {
          code2;
        }
        else
        {
          code3;
        }
        
        next = 8;
        break;
        
********************************/ 

function isCreateIFNode3(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;
	
	let nextTest = right.test;
	let trueValue  = right.consequent.value;  //6
	let falseValue = right.alternate.value;   //7
	
	if (t.isBinaryExpression(nextTest)) return;	
	
	let trueData = getItemFromTestValue(path, trueValue);
	let trueItem = trueData[0]; //case 6:.....
	let trueConse = trueItem.consequent;
	let trueLen = trueConse.length;
	
	let falseData = getItemFromTestValue(path, falseValue);
	let falseItem = falseData[0]; //case 8:.....
	let falseConse = falseItem.consequent;
	let falseLen = falseConse.length;
		
	if (t.isExpressionStatement(trueConse[trueLen-2]) && t.isExpressionStatement(falseConse[falseLen-2]) &&
		  t.isNumericLiteral(trueConse[trueLen-2].expression.right) && t.isNumericLiteral(falseConse[falseLen-2].expression.right) &&
		  trueConse[trueLen-2].expression.right.value == falseConse[falseLen-2].expression.right.value)
	{

			let ifNode = t.ifStatement(nextTest, 
      	                         t.blockStatement(trueConse.slice(0, trueLen - 2)),
      	                         t.blockStatement(falseConse.slice(0, falseLen - 2)));
			consequent.splice(consequent.length - 2, 0, ifNode);
      consequent[consequent.length - 2].expression.right = trueConse[trueLen-2].expression.right;  // next = 7
      
      
      let trueCounts = countsMap.get(trueValue);
      if (trueCounts == 1)
      {
     	  path.node.cases.splice(trueData[1], 1);
     	  let counts = countsMap.get(trueConse[trueLen-2].expression.right.value);
     	  countsMap.set(trueConse[trueLen-2].expression.right.value,counts-1);
     	}
      countsMap.set(trueValue,trueCounts-1);
      
      
      falseData = getItemFromTestValue(path, falseValue);
      let falseCounts = countsMap.get(falseValue);
      if (falseCounts == 1)
      {
     	  path.node.cases.splice(falseData[1], 1);
     	  let counts = countsMap.get(trueConse[trueLen-2].expression.right.value);
     	  countsMap.set(trueConse[trueLen-2].expression.right.value,counts-1);
      }
      countsMap.set(falseValue,falseCounts-1);
      
      let counts = countsMap.get(trueConse[trueLen-2].expression.right.value);
      countsMap.set(trueConse[trueLen-2].expression.right.value,counts+1);

      return true;
	}

	
	return false;	
}


function isCreateReturnNode1(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;
	
		let nextTest = right.test;
		let trueValue  = right.consequent.value;  //6
		let falseValue = right.alternate.value;   //7
		
		if (t.isBinaryExpression(nextTest)) return;

    let data = getItemFromTestValue(path, trueValue);
		let trueItem = data[0]; 
		
		let trueConse = trueItem.consequent;
		let trueLen = trueConse.length;

		if (t.isReturnStatement(trueConse[trueLen-2]))
		{
			
			 let counts = countsMap.get(trueValue);
			 if (counts == 1)
			 {
			 	
			 	let ifNode = t.ifStatement(nextTest, t.blockStatement(trueConse.slice(0,trueLen-1)));
		  	consequent.splice(consequent.length - 2, 0, ifNode);
		  	consequent[consequent.length - 2].expression.right = t.numericLiteral(falseValue);  // next = 7
		  	
		  	path.node.cases.splice(data[1], 1);
		  	countsMap.set(trueValue,counts-1);
		  	
		  	return true;
			 }
		}
		
		return false;	
}




function isCreateReturnNode2(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;

  let nextTest = right.test;
	let trueValue  = right.consequent.value;  //6
	let falseValue = right.alternate.value;   //7
	
	if (t.isBinaryExpression(nextTest)) return;
	
	let data = getItemFromTestValue(path, falseValue);
		
	let falseItem = data[0]; 
		
	let falseConse = falseItem.consequent;
	let falseLen = falseConse.length;
		
	if (t.isReturnStatement(falseConse[falseLen-2]))
	{
		let counts = countsMap.get(falseValue);
		if (counts == 1)
		{
			let ifNode = t.ifStatement(t.unaryExpression("!",nextTest), t.blockStatement(falseConse.slice(0,falseLen-1)));
		  consequent.splice(consequent.length - 2, 0, ifNode);
		  consequent[consequent.length - 2].expression.right = t.numericLiteral(trueValue);  // next = 7
		  
		  path.node.cases.splice(data[1], 1);
		  countsMap.set(falseValue,counts-1);
		  
		  return true;
		}
	}
	
	return false;	
}


function isCreateWhileNode2(path,item,countsMap)
{
	let {test,consequent} = item;
	let len = consequent.length;
	let curValue = test.value;
	let {left,operator,right} = consequent[len-2].expression;
	
		let nextTest = right.test;
		let trueValue  = right.consequent.value;  //6
		let falseValue = right.alternate.value;   //7
		
		if (t.isBinaryExpression(nextTest)) return;
		
		
		let data = getItemFromTestValue(path, trueValue);
		let trueItem = data[0]; 
		
		
		let trueConse = trueItem.consequent;
		let trueLen   = trueConse.length;
		if (t.isExpressionStatement(trueConse[trueLen-2]) &&
		    t.isNumericLiteral(trueConse[trueLen-2].expression.right,{value:curValue}))
		{
			
			let counts = countsMap.get(trueValue);
		  if (counts == 1)
		  {
		  	let whileNode = null;
		  	if(item.consequent.length === 2)
		  	{
		  		whileNode = t.whileStatement(nextTest, t.blockStatement(trueConse.slice(0, trueLen - 2)));
        }
        else
        {
        	whileNode = t.whileStatement(
                      t.booleanLiteral(true),
                      t.blockStatement(consequent.slice(0, consequent.length - 2).concat(t.ifStatement(
                                       nextTest,
                                       t.blockStatement(trueConse.slice(0, trueLen - 2)),
                                       t.blockStatement([t.breakStatement()])))))
        	
        }
        
        consequent.splice(0, 0, whileNode);
        consequent.splice(1, consequent.length - 3);
        consequent[consequent.length - 2].expression.right = t.numericLiteral(falseValue);
        

      	path.node.cases.splice(data[1], 1);
      	countsMap.set(trueValue,0);
      	
      	let curCounts = countsMap.get(curValue);
      	countsMap.set(curValue,curCounts - 1);
      	
        
        return true;                   
      }
    }
  
  return false;
}


function savePrevsCountsToMap(path)
{
	let countsMap = new Map();
	let {cases} = path.node;
	for (const singleCase of cases)
	{
		let {test} = singleCase;
		let value = test.value;
		let prevItemCounts = getPrevItemCounts(path, value);
		countsMap.set(value,prevItemCounts);
	}
	
	return countsMap;
}






const dealWithSwitch = 
{
	SwitchStatement(path)
	{
		
		let {scope,node} = path;
		
		let countsMap = savePrevsCountsToMap(path);

		for (let i=0; i < path.node.cases.length;i++)
		{
			let item = path.node.cases[i];
			let {test,consequent} = item;
			
			let len = consequent.length;
			if (!t.isExpressionStatement(consequent[len-2]))
			{//过滤掉return语句
				continue;
			}
			
			let {left,operator,right} = consequent[len-2].expression;

			if (t.isNumericLiteral(right))
			{
				if (isCombinCases(path,item,countsMap))
				{
					i = -1;
					continue;
				}
			}
			else if (t.isConditionalExpression(right))
			{
				if (isCreateWhileNode(path,item,countsMap)||
				   isCreateWhileIFNode(path,item,countsMap) ||
				   isCreateIFNode1(path,item,countsMap) ||
				   isCreateIFNode2(path,item,countsMap) ||
				   isCreateIFNode3(path,item,countsMap) ||
				   isCreateReturnNode1(path,item,countsMap) ||
				   isCreateReturnNode2(path,item,countsMap) ||
				   isCreateWhileNode2(path,item,countsMap)
				   )
				{
					i = -1;
					continue;
				}
			}
		}
		
		
		
		
	},
}


traverse(ast, dealWithSwitch);



//去除无效节点
const combinSingleCase = 
{
	SwitchCase(path)
	{
		let {scope,node} = path;
		let {test,consequent} = node;
		if (consequent.length != 2) return;
		if (!t.isExpressionStatement(consequent[0]) ||
		    !t.isBreakStatement(consequent[1]))
		{//不满足条件皆退出
			return;
		}
		
		let {left,operator,right} = consequent[0].expression;
		
		if (!t.isIdentifier(left) || operator != "=" || !t.isNumericLiteral(right)) 
		{//可屏蔽
			return;
		}
		
		let testValue  = test.value;
		let nextValue  = right.value;
		let switchName = left.name;
		
		let canBeRemoved = false;
		
		scope.traverse(scope.block,
		{
			NumericLiteral(ppath)
			{
				if (ppath.node.value != testValue)
				{//不是当前testValue则退出
					return;
				}
				let assignPath = ppath.findParent(p => p.isAssignmentExpression());  //获取赋值语句父节点
				if (!assignPath || !assignPath.parentPath.isExpressionStatement())
				{//不满足条件皆退出
					return;
				}
				
				if (!t.isIdentifier(assignPath.node.left,{name:switchName}))
				{//可屏蔽
					return;
				}
				ppath.node.value = nextValue;
			}

		});
		
		path.remove();
	}
}

traverse(ast, combinSingleCase);




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