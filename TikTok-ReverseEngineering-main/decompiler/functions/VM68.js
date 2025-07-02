function VM68(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 6 depth
 v1 = window                       //BYTECODE_POS: 9 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 11 
 v1 = v1._enablePathListRegex;     //BYTECODE_POS: 13 
 v1 = v1.length;                   //BYTECODE_POS: 15 
 v0 = v0 < v1;                     //BYTECODE_POS: 17 
 // if (!v0) skip to 48            //BYTECODE_POS: 18 
 v0 = window                       //BYTECODE_POS: 20 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 22 
 v0 = v0._enablePathListRegex;     //BYTECODE_POS: 24 
 v1 = executionStack[3];           //BYTECODE_POS: 26 depth
 v0 = v0[v1]                       //BYTECODE_POS: 29 
 v1 = v0                           //BYTECODE_POS: 30 
 v1 = v1.test;                     //BYTECODE_POS: 31 
 v2 = executionStack[2];           //BYTECODE_POS: 33 depth
 v0 = v1(v2);                      //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 // if (!v0) skip to 41            //BYTECODE_POS: 38 
 v0 = true                         //BYTECODE_POS: 40 
 //return v0;                      //BYTECODE_POS: 41 
 //get depth of 0 from executionStack//BYTECODE_POS: 42 
 v0 = executionStack;              //BYTECODE_POS: 42 
 v1 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 45 // replace the executionStack var with an index incremented
 // go back to 5                   //BYTECODE_POS: 47 
 v0 = false;                       //BYTECODE_POS: 49 
 //return v0;                      //BYTECODE_POS: 50 
}