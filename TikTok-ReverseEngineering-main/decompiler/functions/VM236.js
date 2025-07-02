function VM236(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[5];           //BYTECODE_POS: 1 depth
 executionStack[3] = v0;           //BYTECODE_POS: 4 // depth = 1
 v0 = executionStack[2];           //BYTECODE_POS: 7 depth
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 13 
 v1 = executionStack[9];           //BYTECODE_POS: 14 depth
 v2 = executionStack[2];           //BYTECODE_POS: 17 depth
 v3 = 2;                           //BYTECODE_POS: 20 
 v2 >>= v3                         //BYTECODE_POS: 22 
 v0 = v1(v2);                      //BYTECODE_POS: 23 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 25 
}