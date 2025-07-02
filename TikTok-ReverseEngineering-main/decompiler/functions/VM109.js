function VM109(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = String                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.fromCharCode;             //BYTECODE_POS: 4 
 v2 = executionStack[2];           //BYTECODE_POS: 6 depth
 v0 = v1(v2);                      //BYTECODE_POS: 9 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 11 
}