function VM102() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.grecaptcha;               //BYTECODE_POS: 3 
 v0 = v0.enterprise;               //BYTECODE_POS: 5 
 v1 = v0                           //BYTECODE_POS: 7 
 v1 = v1.execute;                  //BYTECODE_POS: 8 
 v2 = executionStack[2];           //BYTECODE_POS: 10 depth
 v3 = {};                          //BYTECODE_POS: 13 
 v4 = executionStack[3];           //BYTECODE_POS: 14 depth
 v3.action = v4;                   //BYTECODE_POS: 17 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 19 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 21 
 v1 = v1.then;                     //BYTECODE_POS: 22 
 v2 = functionVM103;               //BYTECODE_POS: 24 
 v0 = v1(v2);                      //BYTECODE_POS: 26 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 28 
 v1 = v1.catch;                    //BYTECODE_POS: 29 
 v2 = functionVM104;               //BYTECODE_POS: 31 
 v0 = v1(v2);                      //BYTECODE_POS: 33 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 36 
 //return v0;                      //BYTECODE_POS: 37 
}