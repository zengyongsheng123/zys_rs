function VM117(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = v0                           //BYTECODE_POS: 4 
 v1 = v1.reduce;                   //BYTECODE_POS: 5 
 v2 = executionStack[8];           //BYTECODE_POS: 7 depth
 v0 = v1(v2);                      //BYTECODE_POS: 10 // context 0 could be custom vm or native func
 v1 = executionStack[2];           //BYTECODE_POS: 12 depth
 v1 = v1.length;                   //BYTECODE_POS: 15 
 v0 /= v1                          //BYTECODE_POS: 17 
 //return v0;                      //BYTECODE_POS: 18 
}