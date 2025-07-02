function VM192(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 executionStack[5] = v0;           //BYTECODE_POS: 4 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 7 
 v1 = executionStack[7];           //BYTECODE_POS: 8 depth
 v2 = executionStack[2];           //BYTECODE_POS: 11 depth
 v3 = 2;                           //BYTECODE_POS: 14 
 v2 >>= v3                         //BYTECODE_POS: 16 
 v0 = v1(v2);                      //BYTECODE_POS: 17 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 19 
}