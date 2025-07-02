function VM132(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[2];           //BYTECODE_POS: 2 depth
 v2 = executionStack[2];           //BYTECODE_POS: 5 depth
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 13 depth
 v0 = v0[0];                       //BYTECODE_POS: 16 
 executionStack[4] = v0;           //BYTECODE_POS: 18 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 21 depth
 v1 = v0                           //BYTECODE_POS: 24 
 v1 = v1.substring;                //BYTECODE_POS: 25 
 v2 = 1;                           //BYTECODE_POS: 27 
 v0 = v1(v2);                      //BYTECODE_POS: 29 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 31 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 34 
 v1 = executionStack[0];           //BYTECODE_POS: 35 depth
 v2 = executionStack[4];           //BYTECODE_POS: 38 depth
 v3 = executionStack[5];           //BYTECODE_POS: 41 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 44 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 46 
}