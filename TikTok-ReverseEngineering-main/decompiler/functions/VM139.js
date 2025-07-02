function VM139() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM140;               //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = functionVM141;               //BYTECODE_POS: 6 
 executionStack[4] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = functionVM142;               //BYTECODE_POS: 11 
 executionStack[5] = v0;           //BYTECODE_POS: 13 // depth = 1
 v0 = Function                     //BYTECODE_POS: 16 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.prototype;                //BYTECODE_POS: 18 
 v0 = v0.toString;                 //BYTECODE_POS: 20 
 executionStack[2] = v0;           //BYTECODE_POS: 22 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 25 
 v1 = arguments;                   //BYTECODE_POS: 26 depth
 v2 = 10;                          //BYTECODE_POS: 29 
 v0 = v1(v2);                      //BYTECODE_POS: 31 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 33 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 36 
 v1 = executionStack[2];           //BYTECODE_POS: 37 depth
 v2 = executionStack[3];           //BYTECODE_POS: 40 depth
 v3 = undefined                    //BYTECODE_POS: 43 
 v4 = executionStack[5];           //BYTECODE_POS: 44 depth
 v5 = undefined                    //BYTECODE_POS: 47 
 v6 = undefined                    //BYTECODE_POS: 48 
 v0 = v1(v2,v3,v4,v5,v6);          //BYTECODE_POS: 49 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 51 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 54 
 //return v0;                      //BYTECODE_POS: 55 
}