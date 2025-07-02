function VM194(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[7];           //BYTECODE_POS: 2 depth
 v2 = executionStack[5];           //BYTECODE_POS: 5 depth
 v3 = 26;                          //BYTECODE_POS: 8 
 v2 <<= v3                         //BYTECODE_POS: 10 
 v3 = executionStack[2];           //BYTECODE_POS: 11 depth
 v4 = 6;                           //BYTECODE_POS: 14 
 v3 >>>= v4;                       //BYTECODE_POS: 16 
 v2 |= v3;                         //BYTECODE_POS: 17 
 v0 = v1(v2);                      //BYTECODE_POS: 18 // context 0 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 20 
 v2 = executionStack[6];           //BYTECODE_POS: 21 depth
 v3 = executionStack[2];           //BYTECODE_POS: 24 depth
 v1 = v2(v3);                      //BYTECODE_POS: 27 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 29 
 //return v0;                      //BYTECODE_POS: 30 
}