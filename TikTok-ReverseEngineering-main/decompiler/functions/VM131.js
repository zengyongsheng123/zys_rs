function VM131(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = ""                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 6 depth
 // opcode 14                      //BYTECODE_POS: 9 
 //get depth of 0 from executionStack//BYTECODE_POS: 11 
 v0 = executionStack;              //BYTECODE_POS: 11 
 v1 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 //case 54                         //BYTECODE_POS: 14 
 // if (!v0) skip to 45            //BYTECODE_POS: 16 
 v0 = executionStack[3];           //BYTECODE_POS: 18 depth
 v1 = "&"                          //BYTECODE_POS: 21 
 v2 = executionStack[4];           //BYTECODE_POS: 23 depth
 v1 += v2                          //BYTECODE_POS: 26 
 v2 = "="                          //BYTECODE_POS: 27 
 v1 += v2                          //BYTECODE_POS: 29 
 v2 = executionStack[2];           //BYTECODE_POS: 30 depth
 v3 = executionStack[4];           //BYTECODE_POS: 33 depth
 v2 = v2[v3]                       //BYTECODE_POS: 36 
 v1 += v2                          //BYTECODE_POS: 37 
 v0 += v1                          //BYTECODE_POS: 38 
 //get depth of 0 from executionStack//BYTECODE_POS: 39 
 v1 = executionStack;              //BYTECODE_POS: 39 
 v2 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 42 
 // go back to 10                  //BYTECODE_POS: 44 
 v0 = executionStack[3];           //BYTECODE_POS: 46 depth
 v1 = v0                           //BYTECODE_POS: 49 
 v1 = v1.substring;                //BYTECODE_POS: 50 
 v2 = 1;                           //BYTECODE_POS: 52 
 v0 = v1(v2);                      //BYTECODE_POS: 54 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 56 // depth = 0
 v0 = String                       //BYTECODE_POS: 59 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 61 
 v1 = v1.fromCharCode;             //BYTECODE_POS: 62 
 v2 = Math                         //BYTECODE_POS: 64 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 66 
 v3 = v3.floor;                    //BYTECODE_POS: 67 
 v4 = executionStack[4];           //BYTECODE_POS: 69 depth
 v5 = v4                           //BYTECODE_POS: 72 
 v5 = v5.rand;                     //BYTECODE_POS: 73 
 v4 = v5();                        //BYTECODE_POS: 75 // context 4 could be custom vm or native func
 v5 = 256;                         //BYTECODE_POS: 77 
 v4 *= v5                          //BYTECODE_POS: 79 
 v2 = v3(v4);                      //BYTECODE_POS: 80 // context 2 could be custom vm or native func
 v0 = v1(v2);                      //BYTECODE_POS: 82 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 84 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 87 
 v1 = executionStack[0];           //BYTECODE_POS: 88 depth
 v2 = executionStack[5];           //BYTECODE_POS: 91 depth
 v3 = executionStack[3];           //BYTECODE_POS: 94 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 97 // context 0 could be custom vm or native func
 executionStack[6] = v0;           //BYTECODE_POS: 99 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 102 depth
 v1 = executionStack[6];           //BYTECODE_POS: 105 depth
 v0 += v1                          //BYTECODE_POS: 108 
 executionStack[7] = v0;           //BYTECODE_POS: 109 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 112 
 v1 = arguments;                   //BYTECODE_POS: 113 depth
 v2 = executionStack[7];           //BYTECODE_POS: 116 depth
 v3 = "s2"                         //BYTECODE_POS: 119 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 121 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 123 
}