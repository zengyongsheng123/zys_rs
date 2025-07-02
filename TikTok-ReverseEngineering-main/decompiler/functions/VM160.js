function VM160() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM161;               //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = functionVM162;               //BYTECODE_POS: 6 
 executionStack[3] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 11 
 v1 = arguments;                   //BYTECODE_POS: 12 depth
 v2 = 10;                          //BYTECODE_POS: 15 
 v0 = v1(v2);                      //BYTECODE_POS: 17 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 19 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 22 
 v1 = executionStack[0];           //BYTECODE_POS: 23 depth
 v2 = executionStack[2];           //BYTECODE_POS: 26 depth
 v3 = undefined                    //BYTECODE_POS: 29 
 v4 = executionStack[3];           //BYTECODE_POS: 30 depth
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 33 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 35 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 38 
 //return v0;                      //BYTECODE_POS: 39 
}