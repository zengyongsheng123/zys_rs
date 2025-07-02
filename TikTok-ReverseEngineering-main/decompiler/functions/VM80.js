function VM80() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM81;                //BYTECODE_POS: 1 
 executionStack[5] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = functionVM86;                //BYTECODE_POS: 6 
 executionStack[6] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = "X-Bogus"                    //BYTECODE_POS: 11 
 executionStack[2] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = "_signature"                 //BYTECODE_POS: 16 
 executionStack[3] = v0;           //BYTECODE_POS: 18 // depth = 0
 v0 = typeof globalThis.fetch      //BYTECODE_POS: 21 
 v1 = "function"                   //BYTECODE_POS: 23 
 v0 = v0 !== v1;                   //BYTECODE_POS: 25 
 // if (!v0) skip to 29            //BYTECODE_POS: 26 
 v0 = undefined                    //BYTECODE_POS: 28 
 //return v0;                      //BYTECODE_POS: 29 
 v0 = window                       //BYTECODE_POS: 30 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.__ac_intercepted_fetch;   //BYTECODE_POS: 32 
 // if (!v0) skip to 37            //BYTECODE_POS: 34 
 v0 = undefined                    //BYTECODE_POS: 36 
 //return v0;                      //BYTECODE_POS: 37 
 v0 = window                       //BYTECODE_POS: 38 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = true                         //BYTECODE_POS: 40 
 v0.__ac_intercepted_fetch = v0;   //BYTECODE_POS: 41 
 v0 = window                       //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.fetch;                    //BYTECODE_POS: 45 
 executionStack[4] = v0;           //BYTECODE_POS: 47 // depth = 0
 v0 = window                       //BYTECODE_POS: 50 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[4];           //BYTECODE_POS: 52 depth
 v0._fetch = v0;                   //BYTECODE_POS: 55 
 v0 = window                       //BYTECODE_POS: 57 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[6];           //BYTECODE_POS: 59 depth
 v0.fetch = v0;                    //BYTECODE_POS: 62 
 v0 = undefined                    //BYTECODE_POS: 64 
 //return v0;                      //BYTECODE_POS: 65 
}