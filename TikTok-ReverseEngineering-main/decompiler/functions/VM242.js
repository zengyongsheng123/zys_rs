function VM242(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4,v5,v6,v7; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 v1 = undefined                    //BYTECODE_POS: 2 
 v2 = executionStack[3];           //BYTECODE_POS: 3 depth
 v3 = executionStack[0];           //BYTECODE_POS: 6 depth
 v3 = v3.kWebsocket;               //BYTECODE_POS: 9 
 v4 = arguments;                   //BYTECODE_POS: 11 depth
 v4 = v4.initialized;              //BYTECODE_POS: 14 
 v5 = executionStack[2];           //BYTECODE_POS: 16 depth
 v6 = null                         //BYTECODE_POS: 19 
 //get depth of 0 from executionStack//BYTECODE_POS: 20 
 v7 = executionStack;              //BYTECODE_POS: 20 
 v8 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v7[v8] = v6                       //BYTECODE_POS: 23 
 v7 = executionStack[4];           //BYTECODE_POS: 24 depth
 v1 = v2(v3,v4,v5,v6,v7);          //BYTECODE_POS: 27 // context 1 could be custom vm or native func
 v0.X-Bogus = v1;                  //BYTECODE_POS: 29 
 //return v0;                      //BYTECODE_POS: 31 
}