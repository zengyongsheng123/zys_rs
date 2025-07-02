function VM30() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = v0                           //BYTECODE_POS: 4 
 v1 = v1.join;                     //BYTECODE_POS: 5 
 v2 = ""                           //BYTECODE_POS: 7 
 v0 = v1(v2);                      //BYTECODE_POS: 9 // context 0 could be custom vm or native func
 v1 = executionStack[2];           //BYTECODE_POS: 11 depth
 v1 = v1.wID;                      //BYTECODE_POS: 14 
 v2 = "nap"                        //BYTECODE_POS: 16 
 v1[v2] = v0                       //BYTECODE_POS: 18 
 //return v0;                      //BYTECODE_POS: 19 
}