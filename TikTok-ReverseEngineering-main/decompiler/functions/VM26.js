function VM26(arg0, arg1) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = navigator                    //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.permissions;              //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.query;                    //BYTECODE_POS: 6 
 v2 = {};                          //BYTECODE_POS: 8 
 v3 = executionStack[2];           //BYTECODE_POS: 9 depth
 v2.name = v3;                     //BYTECODE_POS: 12 
 v0 = v1(v2);                      //BYTECODE_POS: 14 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 16 
 v1 = v1.then;                     //BYTECODE_POS: 17 
 v2 = functionVM27;                //BYTECODE_POS: 19 
 v0 = v1(v2);                      //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 23 
 v1 = v1.catch;                    //BYTECODE_POS: 24 
 v2 = functionVM28;                //BYTECODE_POS: 26 
 v0 = v1(v2);                      //BYTECODE_POS: 28 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 30 
}