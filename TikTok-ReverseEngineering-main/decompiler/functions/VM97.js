function VM97(arg0, arg1) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[3];           //BYTECODE_POS: 1 depth
 executionStack[4] = v0;           //BYTECODE_POS: 4 // depth = 0
 v0 = window                       //BYTECODE_POS: 7 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 9 
 v0 = v0._urlRewriteRules;         //BYTECODE_POS: 11 
 v0 = v0.length;                   //BYTECODE_POS: 13 
 v1 = 0;                           //BYTECODE_POS: 15 
 v0 = v0 > v1                      //BYTECODE_POS: 17 
 // if (!v0) skip to 101           //BYTECODE_POS: 18 
 v0 = 0;                           //BYTECODE_POS: 20 
 executionStack[5] = v0;           //BYTECODE_POS: 22 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 25 depth
 v1 = window                       //BYTECODE_POS: 28 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 30 
 v1 = v1._urlRewriteRules;         //BYTECODE_POS: 32 
 v1 = v1.length;                   //BYTECODE_POS: 34 
 v0 = v0 < v1;                     //BYTECODE_POS: 36 
 // if (!v0) skip to 101           //BYTECODE_POS: 37 
 v0 = window                       //BYTECODE_POS: 39 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 41 
 v0 = v0._urlRewriteRules;         //BYTECODE_POS: 43 
 v1 = executionStack[5];           //BYTECODE_POS: 45 depth
 v0 = v0[v1]                       //BYTECODE_POS: 48 
 v0 = v0[0];                       //BYTECODE_POS: 49 
 executionStack[6] = v0;           //BYTECODE_POS: 51 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 54 depth
 v1 = v0                           //BYTECODE_POS: 57 
 v1 = v1.test;                     //BYTECODE_POS: 58 
 v2 = executionStack[3];           //BYTECODE_POS: 60 depth
 v0 = v1(v2);                      //BYTECODE_POS: 63 // context 0 could be custom vm or native func
 // if (!v0) skip to 94            //BYTECODE_POS: 65 
 v0 = executionStack[3];           //BYTECODE_POS: 67 depth
 v1 = v0                           //BYTECODE_POS: 70 
 v1 = v1.replace;                  //BYTECODE_POS: 71 
 v2 = executionStack[6];           //BYTECODE_POS: 73 depth
 v3 = window                       //BYTECODE_POS: 76 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3._mssdk;                   //BYTECODE_POS: 78 
 v3 = v3._urlRewriteRules;         //BYTECODE_POS: 80 
 v4 = executionStack[5];           //BYTECODE_POS: 82 depth
 v3 = v3[v4]                       //BYTECODE_POS: 85 
 v3 = v3[1];                       //BYTECODE_POS: 86 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 88 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 90 // depth = 0
 // go foward to 101               //BYTECODE_POS: 93 
 //get depth of 0 from executionStack//BYTECODE_POS: 95 
 v0 = executionStack;              //BYTECODE_POS: 95 
 v1 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 98 // replace the executionStack var with an index incremented
 // go back to 24                  //BYTECODE_POS: 100 
 v0 = undefined                    //BYTECODE_POS: 102 
 v1 = executionStack[6];           //BYTECODE_POS: 103 depth
 v2 = executionStack[4];           //BYTECODE_POS: 106 depth
 v0 = v1(v2);                      //BYTECODE_POS: 109 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 111 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 114 depth
 //return v0;                      //BYTECODE_POS: 117 
}