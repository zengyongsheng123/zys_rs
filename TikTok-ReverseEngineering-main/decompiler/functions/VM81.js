function VM81(arg0, arg1, arg2) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[4];           //BYTECODE_POS: 2 depth
 v2 = executionStack[2];           //BYTECODE_POS: 5 depth
 v3 = executionStack[3];           //BYTECODE_POS: 8 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 11 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 13 
 v1 = v1.then;                     //BYTECODE_POS: 14 
 v2 = functionVM82;                //BYTECODE_POS: 16 
 v3 = functionVM84;                //BYTECODE_POS: 18 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 20 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 22 
 v1 = v1.catch;                    //BYTECODE_POS: 23 
 v2 = functionVM85;                //BYTECODE_POS: 25 
 v0 = v1(v2);                      //BYTECODE_POS: 27 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 29 
}