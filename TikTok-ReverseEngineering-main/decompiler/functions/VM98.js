function VM98() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM99;                //BYTECODE_POS: 1 
 executionStack[4] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = "X-Bogus"                    //BYTECODE_POS: 6 
 executionStack[2] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = window                       //BYTECODE_POS: 11 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.open;                     //BYTECODE_POS: 13 
 v1 = undefined                    //BYTECODE_POS: 15 
 v0 = v0 == v1;                    //BYTECODE_POS: 16 
 // if (v0) skip 4                 //BYTECODE_POS: 17 
 v1 = window                       //BYTECODE_POS: 19 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.__ac_intercepted_open;    //BYTECODE_POS: 21 
 // if (!v1) skip to 26            //BYTECODE_POS: 23 
 v1 = undefined                    //BYTECODE_POS: 25 
 //return v1;                      //BYTECODE_POS: 26 
 v1 = window                       //BYTECODE_POS: 27 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.open;                     //BYTECODE_POS: 29 
 executionStack[3] = v1;           //BYTECODE_POS: 31 // depth = 0
 v1 = window                       //BYTECODE_POS: 34 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[3];           //BYTECODE_POS: 36 depth
 v1._open = v1;                    //BYTECODE_POS: 39 
 v1 = window                       //BYTECODE_POS: 41 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = true                         //BYTECODE_POS: 43 
 v1.__ac_intercepted_open = v1;    //BYTECODE_POS: 44 
 v1 = window                       //BYTECODE_POS: 46 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[4];           //BYTECODE_POS: 48 depth
 v1.open = v1;                     //BYTECODE_POS: 51 
 v1 = undefined                    //BYTECODE_POS: 53 
 //return v1;                      //BYTECODE_POS: 54 
}