function VM212() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.location;                 //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.reload;                   //BYTECODE_POS: 6 
 v0 = v1();                        //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 10 
}