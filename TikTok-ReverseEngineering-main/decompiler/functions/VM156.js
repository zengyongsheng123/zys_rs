function VM156() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM157;               //BYTECODE_POS: 1 
 executionStack[4] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = functionVM158;               //BYTECODE_POS: 6 
 executionStack[5] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = functionVM159;               //BYTECODE_POS: 11 
 executionStack[6] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = RegExp                       //BYTECODE_POS: 16 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = "\s*\(\)\s*{\s*\[\s*native\s+code\s*]\s*}\s*$"//BYTECODE_POS: 18 
 v0 = new v0()                     //BYTECODE_POS: 20 
 executionStack[2] = v0;           //BYTECODE_POS: 22 // depth = 0
 v0 = Function                     //BYTECODE_POS: 25 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.prototype;                //BYTECODE_POS: 27 
 v0 = v0.toString;                 //BYTECODE_POS: 29 
 executionStack[3] = v0;           //BYTECODE_POS: 31 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 34 
 v1 = arguments;                   //BYTECODE_POS: 35 depth
 v2 = 10;                          //BYTECODE_POS: 38 
 v0 = v1(v2);                      //BYTECODE_POS: 40 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 42 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 45 
 v1 = executionStack[2];           //BYTECODE_POS: 46 depth
 v2 = executionStack[3];           //BYTECODE_POS: 49 depth
 v3 = undefined                    //BYTECODE_POS: 52 
 v4 = undefined                    //BYTECODE_POS: 53 
 v5 = executionStack[6];           //BYTECODE_POS: 54 depth
 v6 = undefined                    //BYTECODE_POS: 57 
 v0 = v1(v2,v3,v4,v5,v6);          //BYTECODE_POS: 58 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 60 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 63 
 //return v0;                      //BYTECODE_POS: 64 
}