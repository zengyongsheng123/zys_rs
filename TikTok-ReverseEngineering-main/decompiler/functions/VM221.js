function VM221() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Date                         //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = new v0()                     //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.getTime;                  //BYTECODE_POS: 6 
 v0 = v1();                        //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 10 
}