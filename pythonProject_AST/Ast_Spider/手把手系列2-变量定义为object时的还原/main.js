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


console.time("处理完毕，耗时");


const simplifyLiteral = {//还原十六进制数字或字符串及Unicode
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


const keyToLiteral = {//将所有的key值字符串化，方便统一处理。
   MemberExpression:
   {
      exit({node})
      {
         const prop = node.property;
         if (!node.computed && types.isIdentifier(prop))
         {
            node.property = types.StringLiteral(prop.name);
            node.computed = true;
         }
    }
  },   
  ObjectProperty: 
  {
      exit({node})
      {
         const key = node.key;
         if (!node.computed && types.isIdentifier(key))
         {
            node.key = types.StringLiteral(key.name);
         }
      }
   },  
}

traverse(ast, keyToLiteral);



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


const decodeValueOfObject =
{//当一个object里面的value全部为字面量时的还原，没有考虑单个key重新赋值的情况。
    VariableDeclarator(path) {
        let { node, scope } = path;
        const { id, init } = node;
        if (!types.isObjectExpression(init)) return;
        
        let properties = init.properties;
        if (properties.length === 0 || !properties.every(property => isBaseLiteral(property.value)))
            return;
            
        let binding = scope.getBinding(id.name);
    
        let { constant, referencePaths } = binding;
        if (!constant) return;

        let newMap = new Map();
        for (const property of properties) {
            let { key, value } = property;
            newMap.set(key.value, value);
        }

        let canBeRemoved = true;
        for (const referPath of referencePaths) {
            let { parentPath } = referPath;
            if (!parentPath.isMemberExpression()) {
                canBeRemoved = false;
                return;
            }
            
            let AncestorPath = parentPath.parentPath;
            
            if (AncestorPath.isAssignmentExpression({"left":parentPath.node}))
            {
            	  canBeRemoved = false;
                return;
            }
            if (AncestorPath.isUpdateExpression() && ['++','--'].includes(AncestorPath.node.operator))
            {
            	  canBeRemoved = false;
                return;            	
            }
            	
            let curKey = parentPath.node.property.value;
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


traverse(ast, decodeValueOfObject);







console.timeEnd("处理完毕，耗时");


let {code} = generator(ast, opts = {
    "compact": false,  // 是否压缩代码
    "comments": false,  // 是否保留注释
    "jsescOption": {"minimal": true},  //Unicode转义
});


fs.writeFile(decodeFile, code, (err) => {});