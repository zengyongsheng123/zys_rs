function VM47() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Object                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.getOwnPropertyNames;      //BYTECODE_POS: 4 
 v2 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 10 
 v1 = v1.some;                     //BYTECODE_POS: 11 
 v2 = functionVM48;                //BYTECODE_POS: 13 
 v0 = v1(v2);                      //BYTECODE_POS: 15 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 17 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 20 
 //return v0;                      //BYTECODE_POS: 21 
}