function VM118(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 v1 = 1;                           //BYTECODE_POS: 6 
 v0 = v0 <= v-1;                   //BYTECODE_POS: 8 
 // if (!v0) skip to 13            //BYTECODE_POS: 9 
 v0 = 0;                           //BYTECODE_POS: 11 
 //return v0;                      //BYTECODE_POS: 13 
 v0 = undefined                    //BYTECODE_POS: 14 
 v1 = executionStack[12];          //BYTECODE_POS: 15 depth
 v2 = executionStack[2];           //BYTECODE_POS: 18 depth
 v0 = v1(v2);                      //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 23 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 26 depth
 v1 = v0                           //BYTECODE_POS: 29 
 v1 = v1.map;                      //BYTECODE_POS: 30 
 v2 = functionVM119;               //BYTECODE_POS: 32 
 v0 = v1(v2);                      //BYTECODE_POS: 34 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 36 // depth = 0
 v0 = Math                         //BYTECODE_POS: 39 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 41 
 v1 = v1.sqrt;                     //BYTECODE_POS: 42 
 v2 = executionStack[4];           //BYTECODE_POS: 44 depth
 v3 = v2                           //BYTECODE_POS: 47 
 v3 = v3.map;                      //BYTECODE_POS: 48 
 v4 = executionStack[9];           //BYTECODE_POS: 50 depth
 v2 = v3(v4);                      //BYTECODE_POS: 53 // context 2 could be custom vm or native func
 v3 = v2                           //BYTECODE_POS: 55 
 v3 = v3.reduce;                   //BYTECODE_POS: 56 
 v4 = executionStack[8];           //BYTECODE_POS: 58 depth
 v2 = v3(v4);                      //BYTECODE_POS: 61 // context 2 could be custom vm or native func
 v3 = executionStack[2];           //BYTECODE_POS: 63 depth
 v3 = v3.length;                   //BYTECODE_POS: 66 
 v4 = 1;                           //BYTECODE_POS: 68 
 v3 -= v4;                         //BYTECODE_POS: 70 
 v2 /= v3                          //BYTECODE_POS: 71 
 v0 = v1(v2);                      //BYTECODE_POS: 72 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 74 
}