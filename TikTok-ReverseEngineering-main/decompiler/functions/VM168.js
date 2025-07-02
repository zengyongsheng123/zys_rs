function VM168() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "contextMenu"                //BYTECODE_POS: 1 
 v0 = [v0]                         //BYTECODE_POS: 3 
 executionStack[3] = v0;           //BYTECODE_POS: 5 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 8 
 v1 = executionStack[2];           //BYTECODE_POS: 9 depth
 v2 = document                     //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.documentElement;          //BYTECODE_POS: 14 
 v3 = executionStack[3];           //BYTECODE_POS: 16 depth
 v4 = 0;                           //BYTECODE_POS: 19 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 23 // depth = 0
 v0 = {};                          //BYTECODE_POS: 26 
 v1 = executionStack[2];           //BYTECODE_POS: 27 depth
 v0.data = v1;                     //BYTECODE_POS: 30 
 //return v0;                      //BYTECODE_POS: 32 
}