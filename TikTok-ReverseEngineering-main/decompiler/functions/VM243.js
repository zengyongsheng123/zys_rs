function VM243(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4,v5,v6; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 v1 = undefined                    //BYTECODE_POS: 2 
 v2 = executionStack[3];           //BYTECODE_POS: 3 depth
 v3 = executionStack[0];           //BYTECODE_POS: 6 depth
 v3 = v3.kHttp;                    //BYTECODE_POS: 9 
 v4 = arguments;                   //BYTECODE_POS: 11 depth
 v4 = v4.initialized;              //BYTECODE_POS: 14 
 v5 = executionStack[2];           //BYTECODE_POS: 16 depth
 v6 = executionStack[3];           //BYTECODE_POS: 19 depth
 v7 = executionStack[4];           //BYTECODE_POS: 22 depth
 v1 = v2(v3,v4,v5,v6,v7);          //BYTECODE_POS: 25 // context 1 could be custom vm or native func
 v0.X-Bogus = v1;                  //BYTECODE_POS: 27 
 //return v0;                      //BYTECODE_POS: 29 
}