function VM238(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[4];           //BYTECODE_POS: 1 depth
 executionStack[3] = v0;           //BYTECODE_POS: 4 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 7 
 v1 = executionStack[9];           //BYTECODE_POS: 8 depth
 v2 = executionStack[2];           //BYTECODE_POS: 11 depth
 v3 = 26;                          //BYTECODE_POS: 14 
 v2 <<= v3                         //BYTECODE_POS: 16 
 v3 = executionStack[2];           //BYTECODE_POS: 17 depth
 v4 = 6;                           //BYTECODE_POS: 20 
 v3 >>>= v4;                       //BYTECODE_POS: 22 
 v2 |= v3;                         //BYTECODE_POS: 23 
 v0 = v1(v2);                      //BYTECODE_POS: 24 // context 0 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 26 
 v2 = executionStack[8];           //BYTECODE_POS: 27 depth
 v3 = executionStack[2];           //BYTECODE_POS: 30 depth
 v1 = v2(v3);                      //BYTECODE_POS: 33 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 35 
 //return v0;                      //BYTECODE_POS: 36 
}