function VM10(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Array                        //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.isArray;                  //BYTECODE_POS: 4 
 v2 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2._mssdk;                   //BYTECODE_POS: 8 
 v2 = v2._urlRewriteRules;         //BYTECODE_POS: 10 
 v0 = v1(v2);                      //BYTECODE_POS: 12 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 14 
 // if (!v0) skip to 24            //BYTECODE_POS: 15 
 v0 = window                       //BYTECODE_POS: 17 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 19 
 v1 = []                           //BYTECODE_POS: 21 
 v0._urlRewriteRules = v0;         //BYTECODE_POS: 23 
 v0 = executionStack[2];           //BYTECODE_POS: 25 depth
 v1 = undefined                    //BYTECODE_POS: 28 
 v0 = v0 !== v1;                   //BYTECODE_POS: 29 
 // if (!v0) skip to 90            //BYTECODE_POS: 30 
 v0 = 0;                           //BYTECODE_POS: 32 
 executionStack[3] = v0;           //BYTECODE_POS: 34 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 37 depth
 v1 = executionStack[2];           //BYTECODE_POS: 40 depth
 v1 = v1.length;                   //BYTECODE_POS: 43 
 v0 = v0 < v1;                     //BYTECODE_POS: 45 
 // if (!v0) skip to 90            //BYTECODE_POS: 46 
 v0 = window                       //BYTECODE_POS: 48 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 50 
 v0 = v0._urlRewriteRules;         //BYTECODE_POS: 52 
 v1 = v0                           //BYTECODE_POS: 54 
 v1 = v1.push;                     //BYTECODE_POS: 55 
 v2 = RegExp                       //BYTECODE_POS: 57 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[2];           //BYTECODE_POS: 59 depth
 v4 = executionStack[3];           //BYTECODE_POS: 62 depth
 v3 = v3[v4]                       //BYTECODE_POS: 65 
 v3 = v3[0];                       //BYTECODE_POS: 66 
 v2 = new v2()                     //BYTECODE_POS: 68 
 v3 = executionStack[2];           //BYTECODE_POS: 70 depth
 v4 = executionStack[3];           //BYTECODE_POS: 73 depth
 v3 = v3[v4]                       //BYTECODE_POS: 76 
 v3 = v3[1];                       //BYTECODE_POS: 77 
 v2 = [v2,v3]                      //BYTECODE_POS: 79 
 v0 = v1(v2);                      //BYTECODE_POS: 81 // context 0 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 84 
 v0 = executionStack;              //BYTECODE_POS: 84 
 v1 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 87 // replace the executionStack var with an index incremented
 // go back to 36                  //BYTECODE_POS: 89 
 v0 = undefined                    //BYTECODE_POS: 91 
 //return v0;                      //BYTECODE_POS: 92 
}