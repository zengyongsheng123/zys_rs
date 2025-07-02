function VM246(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Object                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.keys;                     //BYTECODE_POS: 4 
 v2 = executionStack[2];           //BYTECODE_POS: 6 depth
 v0 = v1(v2);                      //BYTECODE_POS: 9 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 11 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 14 
 executionStack[4] = v0;           //BYTECODE_POS: 16 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 19 depth
 v0 = v0.length;                   //BYTECODE_POS: 22 
 v1 = 1;                           //BYTECODE_POS: 24 
 v0 -= v1;                         //BYTECODE_POS: 26 
 executionStack[5] = v0;           //BYTECODE_POS: 27 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 30 depth
 v1 = 0;                           //BYTECODE_POS: 33 
 v0 = v0 >= v1                     //BYTECODE_POS: 35 
 // if (!v0) skip to 89            //BYTECODE_POS: 36 
 v0 = executionStack[2];           //BYTECODE_POS: 38 depth
 v1 = executionStack[3];           //BYTECODE_POS: 41 depth
 v2 = executionStack[5];           //BYTECODE_POS: 44 depth
 v1 = v1[v2]                       //BYTECODE_POS: 47 
 v0 = v0[v1]                       //BYTECODE_POS: 48 
 // if (!v0) skip to 54            //BYTECODE_POS: 49 
 v0 = 1;                           //BYTECODE_POS: 51 
 // go foward to 56                //BYTECODE_POS: 53 
 v1 = 0;                           //BYTECODE_POS: 55 
 executionStack[6] = v1;           //BYTECODE_POS: 57 // depth = 0
 v1 = executionStack[6];           //BYTECODE_POS: 60 depth
 v2 = executionStack[3];           //BYTECODE_POS: 63 depth
 v2 = v2.length;                   //BYTECODE_POS: 66 
 v3 = executionStack[5];           //BYTECODE_POS: 68 depth
 v2 -= v3;                         //BYTECODE_POS: 71 
 v3 = 1;                           //BYTECODE_POS: 72 
 v2 -= v3;                         //BYTECODE_POS: 74 
 v1 <<= v2                         //BYTECODE_POS: 75 
 v2 = executionStack[4];           //BYTECODE_POS: 76 depth
 v1 |= v2;                         //BYTECODE_POS: 79 
 executionStack[4] = v1;           //BYTECODE_POS: 80 // depth = 0
 //get depth of 0 from executionStack//BYTECODE_POS: 83 
 v1 = executionStack;              //BYTECODE_POS: 83 
 v2 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2]--                          //BYTECODE_POS: 86 
 // go back to 29                  //BYTECODE_POS: 88 
 v1 = executionStack[4];           //BYTECODE_POS: 90 depth
 //return v1;                      //BYTECODE_POS: 93 
}