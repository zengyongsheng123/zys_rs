function VM193(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[5];           //BYTECODE_POS: 1 depth
 v1 = 28;                          //BYTECODE_POS: 4 
 v0 <<= v1                         //BYTECODE_POS: 6 
 v1 = executionStack[2];           //BYTECODE_POS: 7 depth
 v2 = 4;                           //BYTECODE_POS: 10 
 v1 >>>= v2;                       //BYTECODE_POS: 12 
 v0 |= v1;                         //BYTECODE_POS: 13 
 executionStack[3] = v0;           //BYTECODE_POS: 14 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 17 depth
 executionStack[5] = v0;           //BYTECODE_POS: 20 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 23 
 v1 = executionStack[7];           //BYTECODE_POS: 24 depth
 v2 = executionStack[3];           //BYTECODE_POS: 27 depth
 v0 = v1(v2);                      //BYTECODE_POS: 30 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 32 
}