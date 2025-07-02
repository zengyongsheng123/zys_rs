function VM163() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM164;               //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 6 
 v1 = arguments;                   //BYTECODE_POS: 7 depth
 v2 = 10;                          //BYTECODE_POS: 10 
 v0 = v1(v2);                      //BYTECODE_POS: 12 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 14 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 17 
 v1 = executionStack[0];           //BYTECODE_POS: 18 depth
 v2 = executionStack[2];           //BYTECODE_POS: 21 depth
 v3 = executionStack[2];           //BYTECODE_POS: 24 depth
 v4 = undefined                    //BYTECODE_POS: 27 
 v5 = undefined                    //BYTECODE_POS: 28 
 v6 = undefined                    //BYTECODE_POS: 29 
 v0 = v1(v2,v3,v4,v5,v6);          //BYTECODE_POS: 30 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 32 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 35 
 //return v0;                      //BYTECODE_POS: 36 
}