function VM146() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = document                     //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.createElement;            //BYTECODE_POS: 4 
 v2 = "canvas"                     //BYTECODE_POS: 6 
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = null                         //BYTECODE_POS: 13 
 executionStack[3] = v0;           //BYTECODE_POS: 14 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 17 depth
 v1 = v0                           //BYTECODE_POS: 20 
 v1 = v1.getContext;               //BYTECODE_POS: 21 
 v2 = "webgl"                      //BYTECODE_POS: 23 
 v0 = v1(v2);                      //BYTECODE_POS: 25 // context 0 could be custom vm or native func
 // if (v0) skip 10                //BYTECODE_POS: 27 
 v1 = executionStack[2];           //BYTECODE_POS: 29 depth
 v2 = v1                           //BYTECODE_POS: 32 
 v2 = v2.getContext;               //BYTECODE_POS: 33 
 v3 = "experimental-webgl"         //BYTECODE_POS: 35 
 v1 = v2(v3);                      //BYTECODE_POS: 37 // context 1 could be custom vm or native func
 executionStack[3] = v1;           //BYTECODE_POS: 39 // depth = 0
 // go foward to 46                //BYTECODE_POS: 42 
 executionStack[4] = v0;           //BYTECODE_POS: 44 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 47 depth
 v0 = !v0                          //BYTECODE_POS: 50 
 // if (!v0) skip to 56            //BYTECODE_POS: 51 
 v0 = null                         //BYTECODE_POS: 53 
 executionStack[3] = v0;           //BYTECODE_POS: 54 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 57 depth
 //return v0;                      //BYTECODE_POS: 60 
}