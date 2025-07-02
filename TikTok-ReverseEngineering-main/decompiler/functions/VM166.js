function VM166() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 v1 = eval                         //BYTECODE_POS: 2 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 4 
 v2 = v2.toString;                 //BYTECODE_POS: 5 
 v1 = v2();                        //BYTECODE_POS: 7 // context 1 could be custom vm or native func
 v1 = v1.length;                   //BYTECODE_POS: 9 
 v0.data = v1;                     //BYTECODE_POS: 11 
 //return v0;                      //BYTECODE_POS: 13 
}