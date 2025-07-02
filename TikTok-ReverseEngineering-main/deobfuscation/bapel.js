const fs = require("fs");
const { parse } = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");
const { File, expressionStatement, blockStatement, returnStatement, ifStatement } = require('@babel/types');
const code = fs.readFileSync("input.js", "utf-8");

const ast = parse(code, { sourceType: "module" });
var Q = [17, 175, 188, 8, 4294967295, 6, 139, 3212677781, 12, 3863347763, 129, 177, 14, 2157053261, 2654435769, 183, 185100057, 169, 133, 114, 4, 179, 185, 2633865432, 3732962506, 173, 18, 2, 28, 253, /\s*\(\)\s*{\s*\[\s*native\s+code\s*]\s*}\s*$/, 5, 1196819126, 1498001188, 229, 195, 2517678443, 600974999, 127, 264, 215, 53, 3, 2903579748, 62, 239, 58, 156, 217618912, 9, 200, 160, 44, 163, 202, 247, 1451689750, 49, 136, 1, 165, 2718276124, 45, 13, 143, 106, 258, 148, 2931180889, 152, 4294967296, 259, 224, 251, 257, 16, 262, 7, 15, 11, 171, 255, 10, 0, 167, 211147047, 181, 244]

traverse(ast, {
  SequenceExpression(path) {
      path.parentPath.replaceWithMultiple(path.node.expressions)
  },
  
  MemberExpression(path) {
      const { object, property } = path.node;

      if (!t.isIdentifier(object, { name: "Q" }) || !t.isNumericLiteral(property)) return;

      const index = property.value;
      const replacementValue = Q[index];

      if (replacementValue !== undefined) {
          path.replaceWith(t.valueToNode(replacementValue));
      }
  },
    
    
  MemberExpression(path) {
      const { object, property } = path.node;

      if (object.name !== 'Db') return;
      
      const newName = types.identifier('MD5')
      path.replaceWith(newName)
  },
    
    
  ConditionalExpression(path) {
    const { consequent, alternate } = path.node;

    const consequentExpStatement = expressionStatement(consequent);
    const consequentBlock = blockStatement([returnStatement(consequentExpStatement.expression)]);
    
    const alternateExpStatement = expressionStatement(alternate);
    const alternateBlock = blockStatement([returnStatement(alternateExpStatement.expression)]);
    
    path.parentPath.replaceWith(ifStatement(path.node.test, consequentBlock, alternateBlock));
    path.skip();
  },
       
    
  VariableDeclarator(path) {
    if (!types.isArrayExpression(path.node.init)) return;
    if (path.node.id.name !== "Ab") return;

    const arrayElements = path.node.init.elements;
    const functionDeclarations = [];
    arrayElements.forEach((element, index) => {
    if (types.isFunctionExpression(element)) {
        const funcName = `Ab`;
        const funcDeclaration = types.functionDeclaration(
        types.identifier(funcName),
        element.params,
        element.body
        );
        functionDeclarations.push(funcDeclaration);
    }
    });
    path.parentPath.replaceWithMultiple(functionDeclarations)
  }
  
  
});

const output = generate(ast, {}, code);

//fs.writeFileSync("output.js", output.code, "utf-8");

console.log("Transformed code saved to output.js");