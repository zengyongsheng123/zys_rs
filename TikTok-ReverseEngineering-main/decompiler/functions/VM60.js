function VM60(arg0, arg1) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = null                         //BYTECODE_POS: 4 
 v0 = v0 === v1                    //BYTECODE_POS: 5 
 // if (v0) skip 5                 //BYTECODE_POS: 6 
 v1 = executionStack[2];           //BYTECODE_POS: 8 depth
 v2 = undefined                    //BYTECODE_POS: 11 
 v1 = v1 === v2                    //BYTECODE_POS: 12 
 // if (!v1) skip to 21            //BYTECODE_POS: 13 
 v1 = TypeError                    //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = "Cannot convert undefined or null to object"//BYTECODE_POS: 17 
 v1 = new v1()                     //BYTECODE_POS: 19 
 //return v1                       //BYTECODE_POS: 21 
 v1 = undefined                    //BYTECODE_POS: 22 
 v2 = Object                       //BYTECODE_POS: 23 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[2];           //BYTECODE_POS: 25 depth
 v1 = v2(v3);                      //BYTECODE_POS: 28 // context 1 could be custom vm or native func
 executionStack[4] = v1;           //BYTECODE_POS: 30 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 33 depth
 executionStack[5] = v1;           //BYTECODE_POS: 36 // depth = 0
 v1 = executionStack[5];           //BYTECODE_POS: 39 depth
 v2 = null                         //BYTECODE_POS: 42 
 v1 = v1 !== v2;                   //BYTECODE_POS: 43 
 // if (!v1) skip 5 to 50          //BYTECODE_POS: 44 
 v2 = executionStack[5];           //BYTECODE_POS: 46 depth
 v3 = undefined                    //BYTECODE_POS: 49 
 v2 = v2 !== v3;                   //BYTECODE_POS: 50 
 // if (!v2) skip to 99            //BYTECODE_POS: 51 
 v2 = executionStack[5];           //BYTECODE_POS: 53 depth
 // opcode 14                      //BYTECODE_POS: 56 
 //get depth of 0 from executionStack//BYTECODE_POS: 58 
 v2 = executionStack;              //BYTECODE_POS: 58 
 v3 = 6                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 //case 54                         //BYTECODE_POS: 61 
 // if (!v2) skip to 99            //BYTECODE_POS: 63 
 v2 = Object                       //BYTECODE_POS: 65 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.prototype;                //BYTECODE_POS: 67 
 v2 = v2.hasOwnProperty;           //BYTECODE_POS: 69 
 v3 = v2                           //BYTECODE_POS: 71 
 v3 = v3.call;                     //BYTECODE_POS: 72 
 v4 = executionStack[5];           //BYTECODE_POS: 74 depth
 v5 = executionStack[6];           //BYTECODE_POS: 77 depth
 v2 = v3(v4,v5);                   //BYTECODE_POS: 80 // context 2 could be custom vm or native func
 // if (!v2) skip to 97            //BYTECODE_POS: 82 
 v2 = executionStack[4];           //BYTECODE_POS: 84 depth
 v3 = executionStack[6];           //BYTECODE_POS: 87 depth
 v4 = executionStack[5];           //BYTECODE_POS: 90 depth
 v5 = executionStack[6];           //BYTECODE_POS: 93 depth
 v4 = v4[v5]                       //BYTECODE_POS: 96 
 v2[v3] = v4;                      //BYTECODE_POS: 97 
 // go back to 57                  //BYTECODE_POS: 98 
 v2 = executionStack[4];           //BYTECODE_POS: 100 depth
 //return v2;                      //BYTECODE_POS: 103 
}