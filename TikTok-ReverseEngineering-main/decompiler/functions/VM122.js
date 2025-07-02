function VM122(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = arguments;                   //BYTECODE_POS: 2 depth
 v2 = executionStack[2];           //BYTECODE_POS: 5 depth
 v3 = executionStack[0];           //BYTECODE_POS: 8 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 11 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 14 
 v1 = executionStack[15];          //BYTECODE_POS: 15 depth
 v2 = executionStack[7];           //BYTECODE_POS: 18 depth
 v3 = {};                          //BYTECODE_POS: 21 
 v4 = Date                         //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 24 
 v5 = v5.now;                      //BYTECODE_POS: 25 
 v4 = v5();                        //BYTECODE_POS: 27 // context 4 could be custom vm or native func
 v3.d = v4;                        //BYTECODE_POS: 29 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 31 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 34 
 //return v0;                      //BYTECODE_POS: 35 
}