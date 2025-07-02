function VM110(arg0, arg1, arg2) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[3];           //BYTECODE_POS: 2 depth
 v2 = executionStack[2];           //BYTECODE_POS: 5 depth
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 10 
 v2 = executionStack[3];           //BYTECODE_POS: 11 depth
 v3 = executionStack[3];           //BYTECODE_POS: 14 depth
 v1 = v2(v3);                      //BYTECODE_POS: 17 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 19 
 v1 = executionStack[4];           //BYTECODE_POS: 20 depth
 v0 += v1                          //BYTECODE_POS: 23 
 //return v0;                      //BYTECODE_POS: 24 
}