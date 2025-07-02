function VM108(arg0, arg1) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Uint8Array                   //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = 3;                           //BYTECODE_POS: 3 
 v0 = new v0()                     //BYTECODE_POS: 5 
 executionStack[4] = v0;           //BYTECODE_POS: 7 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 10 depth
 v1 = executionStack[2];           //BYTECODE_POS: 13 depth
 v2 = 256;                         //BYTECODE_POS: 16 
 v1 /= v2                          //BYTECODE_POS: 18 
 v0.0 = v0;                        //BYTECODE_POS: 19 
 v0 = executionStack[4];           //BYTECODE_POS: 21 depth
 v1 = executionStack[2];           //BYTECODE_POS: 24 depth
 v2 = 256;                         //BYTECODE_POS: 27 
 v1 %= v2                          //BYTECODE_POS: 29 
 v0.1 = v0;                        //BYTECODE_POS: 30 
 v0 = executionStack[4];           //BYTECODE_POS: 32 depth
 v1 = executionStack[3];           //BYTECODE_POS: 35 depth
 v2 = 256;                         //BYTECODE_POS: 38 
 v1 %= v2                          //BYTECODE_POS: 40 
 v0.2 = v0;                        //BYTECODE_POS: 41 
 v0 = String                       //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.fromCharCode;             //BYTECODE_POS: 45 
 v1 = v0                           //BYTECODE_POS: 47 
 v1 = v1.apply;                    //BYTECODE_POS: 48 
 v2 = null                         //BYTECODE_POS: 50 
 v3 = executionStack[4];           //BYTECODE_POS: 51 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 54 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 56 
}