function VM199() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "characterSet"               //BYTECODE_POS: 1 
 v1 = "compatMode"                 //BYTECODE_POS: 3 
 v2 = "documentMode"               //BYTECODE_POS: 5 
 v3 = "layers"                     //BYTECODE_POS: 7 
 v4 = "images"                     //BYTECODE_POS: 9 
 v0 = [v0,v1,v2,v3,v4]             //BYTECODE_POS: 11 
 executionStack[2] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 16 
 v1 = executionStack[2];           //BYTECODE_POS: 17 depth
 v2 = document                     //BYTECODE_POS: 20 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[2];           //BYTECODE_POS: 22 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 25 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 27 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 30 
 v1 = executionStack[0];           //BYTECODE_POS: 31 depth
 v2 = document                     //BYTECODE_POS: 34 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.location;                 //BYTECODE_POS: 36 
 v0 = v1(v2);                      //BYTECODE_POS: 38 // context 0 could be custom vm or native func
 v1 = "object"                     //BYTECODE_POS: 40 
 v0 = v0 === v1                    //BYTECODE_POS: 42 
 // if (!v0) skip to 55            //BYTECODE_POS: 43 
 v0 = executionStack[3];           //BYTECODE_POS: 45 depth
 v1 = document                     //BYTECODE_POS: 48 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.location;                 //BYTECODE_POS: 50 
 v1 = v1.host;                     //BYTECODE_POS: 52 
 v0.location = v0;                 //BYTECODE_POS: 54 
 v0 = executionStack[3];           //BYTECODE_POS: 56 depth
 //return v0;                      //BYTECODE_POS: 59 
}