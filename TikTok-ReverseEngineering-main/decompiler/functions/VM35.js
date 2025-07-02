function VM35() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = typeof globalThis.Promise    //BYTECODE_POS: 1 
 v1 = "function"                   //BYTECODE_POS: 3 
 v0 = v0 !== v1;                   //BYTECODE_POS: 5 
 // if (!v0) skip to 10            //BYTECODE_POS: 6 
 v0 = ""                           //BYTECODE_POS: 8 
 //return v0;                      //BYTECODE_POS: 10 
 v0 = Promise                      //BYTECODE_POS: 11 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = functionVM36;                //BYTECODE_POS: 13 
 v0 = new v0()                     //BYTECODE_POS: 15 
 //return v0;                      //BYTECODE_POS: 17 
}