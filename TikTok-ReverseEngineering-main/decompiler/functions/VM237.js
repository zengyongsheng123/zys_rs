function VM237(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[6];           //BYTECODE_POS: 1 depth
 executionStack[3] = v0;           //BYTECODE_POS: 4 // depth = 1
 v0 = executionStack[2];           //BYTECODE_POS: 7 depth
 v1 = 28;                          //BYTECODE_POS: 10 
 v0 <<= v1                         //BYTECODE_POS: 12 
 v1 = executionStack[2];           //BYTECODE_POS: 13 depth
 v2 = 4;                           //BYTECODE_POS: 16 
 v1 >>>= v2;                       //BYTECODE_POS: 18 
 v0 |= v1;                         //BYTECODE_POS: 19 
 executionStack[3] = v0;           //BYTECODE_POS: 20 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 23 depth
 executionStack[2] = v0;           //BYTECODE_POS: 26 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 29 
 v1 = executionStack[9];           //BYTECODE_POS: 30 depth
 v2 = executionStack[3];           //BYTECODE_POS: 33 depth
 v0 = v1(v2);                      //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 38 
}