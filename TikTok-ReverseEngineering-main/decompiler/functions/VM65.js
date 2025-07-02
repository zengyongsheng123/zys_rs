function VM65(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 executionStack[3] = v0;           //BYTECODE_POS: 4 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 7 
 v1 = decodeURIComponent           //BYTECODE_POS: 8 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[2];           //BYTECODE_POS: 10 depth
 v0 = v1(v2);                      //BYTECODE_POS: 13 // context 0 could be custom vm or native func
 v1 = executionStack[2];           //BYTECODE_POS: 15 depth
 v0 = v0 === v1                    //BYTECODE_POS: 18 
 // if (!v0) skip to 31            //BYTECODE_POS: 19 
 v0 = undefined                    //BYTECODE_POS: 21 
 v1 = encodeURI                    //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[2];           //BYTECODE_POS: 24 depth
 v0 = v1(v2);                      //BYTECODE_POS: 27 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 29 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 32 depth
 v1 = v0                           //BYTECODE_POS: 35 
 v1 = v1.indexOf;                  //BYTECODE_POS: 36 
 v2 = "?"                          //BYTECODE_POS: 38 
 v0 = v1(v2);                      //BYTECODE_POS: 40 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 42 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 45 depth
 v1 = 0;                           //BYTECODE_POS: 48 
 v0 = v0 > v1                      //BYTECODE_POS: 50 
 // if (!v0) skip to 112           //BYTECODE_POS: 51 
 v0 = executionStack[3];           //BYTECODE_POS: 53 depth
 v1 = v0                           //BYTECODE_POS: 56 
 v1 = v1.substr;                   //BYTECODE_POS: 57 
 v2 = 0;                           //BYTECODE_POS: 59 
 v3 = executionStack[4];           //BYTECODE_POS: 61 depth
 v4 = 1;                           //BYTECODE_POS: 64 
 v3 += v4                          //BYTECODE_POS: 66 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 67 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 69 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 72 depth
 v1 = v0                           //BYTECODE_POS: 75 
 v1 = v1.substr;                   //BYTECODE_POS: 76 
 v2 = executionStack[4];           //BYTECODE_POS: 78 depth
 v3 = 1;                           //BYTECODE_POS: 81 
 v2 += v3                          //BYTECODE_POS: 83 
 v0 = v1(v2);                      //BYTECODE_POS: 84 // context 0 could be custom vm or native func
 executionStack[6] = v0;           //BYTECODE_POS: 86 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 89 depth
 v1 = executionStack[6];           //BYTECODE_POS: 92 depth
 v2 = v1                           //BYTECODE_POS: 95 
 v2 = v2.split;                    //BYTECODE_POS: 96 
 v3 = "'"                          //BYTECODE_POS: 98 
 v1 = v2(v3);                      //BYTECODE_POS: 100 // context 1 could be custom vm or native func
 v2 = v1                           //BYTECODE_POS: 102 
 v2 = v2.join;                     //BYTECODE_POS: 103 
 v3 = "%27"                        //BYTECODE_POS: 105 
 v1 = v2(v3);                      //BYTECODE_POS: 107 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 109 
 executionStack[3] = v0;           //BYTECODE_POS: 110 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 113 depth
 //return v0;                      //BYTECODE_POS: 116 
}