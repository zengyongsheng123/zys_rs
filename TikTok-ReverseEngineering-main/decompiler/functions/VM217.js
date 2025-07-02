function VM217() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = eval                         //BYTECODE_POS: 2 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = "/*@cc_on!@*/false"          //BYTECODE_POS: 4 
 v0 = v1(v2);                      //BYTECODE_POS: 6 // context 0 could be custom vm or native func
 // if (v0) skip 6                 //BYTECODE_POS: 8 
 v1 = document                     //BYTECODE_POS: 10 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.documentMode;             //BYTECODE_POS: 12 
 v1 = !v1                          //BYTECODE_POS: 14 
 v1 = !v1                          //BYTECODE_POS: 15 
 //return v1;                      //BYTECODE_POS: 16 
}