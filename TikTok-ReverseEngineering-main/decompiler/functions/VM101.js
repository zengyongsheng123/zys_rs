function VM101(arg0, arg1) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.grecaptcha;               //BYTECODE_POS: 3 
 // if (!v0) skip 6 to 12          //BYTECODE_POS: 5 
 v1 = window                       //BYTECODE_POS: 7 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.grecaptcha;               //BYTECODE_POS: 9 
 v1 = v1.enterprise;               //BYTECODE_POS: 11 
 // if (!v1) skip to 30            //BYTECODE_POS: 13 
 v1 = window                       //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.grecaptcha;               //BYTECODE_POS: 17 
 v1 = v1.enterprise;               //BYTECODE_POS: 19 
 v2 = v1                           //BYTECODE_POS: 21 
 v2 = v2.ready;                    //BYTECODE_POS: 22 
 v3 = functionVM102;               //BYTECODE_POS: 24 
 v1 = v2(v3);                      //BYTECODE_POS: 26 // context 1 could be custom vm or native func
 // go foward to 39                //BYTECODE_POS: 29 
 v1 = undefined                    //BYTECODE_POS: 31 
 v2 = executionStack[3];           //BYTECODE_POS: 32 depth
 v3 = "not loaded"                 //BYTECODE_POS: 35 
 v1 = v2(v3);                      //BYTECODE_POS: 37 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 40 
 //return v1;                      //BYTECODE_POS: 41 
}