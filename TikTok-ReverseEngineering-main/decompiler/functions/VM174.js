function VM174() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[0];           //BYTECODE_POS: 2 depth
 v2 = navigator                    //BYTECODE_POS: 5 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.connection;               //BYTECODE_POS: 7 
 v0 = v1(v2);                      //BYTECODE_POS: 9 // context 0 could be custom vm or native func
 v1 = "object"                     //BYTECODE_POS: 11 
 v0 = v0 !== v1;                   //BYTECODE_POS: 13 
 // if (!v0) skip to 21            //BYTECODE_POS: 14 
 v0 = {};                          //BYTECODE_POS: 16 
 v1 = 2;                           //BYTECODE_POS: 17 
 v0.data = v1;                     //BYTECODE_POS: 19 
 //return v0;                      //BYTECODE_POS: 21 
 v0 = navigator                    //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.connection;               //BYTECODE_POS: 24 
 v0 = v0.rtt;                      //BYTECODE_POS: 26 
 v0 = typeof v0;                   //BYTECODE_POS: 28 
 v1 = "number"                     //BYTECODE_POS: 29 
 v0 = v0 !== v1;                   //BYTECODE_POS: 31 
 // if (!v0) skip to 39            //BYTECODE_POS: 32 
 v0 = {};                          //BYTECODE_POS: 34 
 v1 = 2;                           //BYTECODE_POS: 35 
 v0.data = v1;                     //BYTECODE_POS: 37 
 //return v0;                      //BYTECODE_POS: 39 
 v0 = {};                          //BYTECODE_POS: 40 
 v1 = navigator                    //BYTECODE_POS: 41 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.connection;               //BYTECODE_POS: 43 
 v1 = v1.rtt;                      //BYTECODE_POS: 45 
 v2 = 0;                           //BYTECODE_POS: 47 
 v1 = v1 === v2                    //BYTECODE_POS: 49 
 // if (!v1) skip to 55            //BYTECODE_POS: 50 
 v1 = 1;                           //BYTECODE_POS: 52 
 // go foward to 57                //BYTECODE_POS: 54 
 v2 = 2;                           //BYTECODE_POS: 56 
 v1.data = v2;                     //BYTECODE_POS: 58 
 //return v1;                      //BYTECODE_POS: 60 
}