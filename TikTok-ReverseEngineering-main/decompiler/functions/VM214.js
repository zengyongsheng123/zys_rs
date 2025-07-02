function VM214() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = 0;                           //BYTECODE_POS: 4 
 v0 = v0 === v1                    //BYTECODE_POS: 6 
 // if (!v0) skip to 13            //BYTECODE_POS: 7 
 v0 = 2;                           //BYTECODE_POS: 9 
 executionStack[5] = v0;           //BYTECODE_POS: 11 // depth = 5
 v0 = executionStack[2];           //BYTECODE_POS: 14 depth
 v1 = v0                           //BYTECODE_POS: 17 
 v1 = v1.indexOf;                  //BYTECODE_POS: 18 
 v2 = "webmssdk_ex"                //BYTECODE_POS: 20 
 v0 = v1(v2);                      //BYTECODE_POS: 22 // context 0 could be custom vm or native func
 v1 = 1;                           //BYTECODE_POS: 24 
 v1 = -v1                          //BYTECODE_POS: 26 
 v0 = v0 !== v1;                   //BYTECODE_POS: 27 
 // if (!v0) skip to 107           //BYTECODE_POS: 28 
 v0 = window                       //BYTECODE_POS: 30 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._xex;                     //BYTECODE_POS: 32 
 // if (!v0) skip 6 to 41          //BYTECODE_POS: 34 
 v1 = window                       //BYTECODE_POS: 36 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._xex;                     //BYTECODE_POS: 38 
 v1 = v1.i;                        //BYTECODE_POS: 40 
 // if (!v1) skip to 107           //BYTECODE_POS: 42 
 v1 = window                       //BYTECODE_POS: 44 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 46 
 v1 = v1.cacheOpts;                //BYTECODE_POS: 48 
 // if (!v1) skip to 107           //BYTECODE_POS: 50 
 v1 = Object                       //BYTECODE_POS: 52 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 54 
 v2 = v2.values;                   //BYTECODE_POS: 55 
 v3 = window                       //BYTECODE_POS: 57 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3._mssdk;                   //BYTECODE_POS: 59 
 v3 = v3.cacheOpts;                //BYTECODE_POS: 61 
 v1 = v2(v3);                      //BYTECODE_POS: 63 // context 1 could be custom vm or native func
 executionStack[2] = v1;           //BYTECODE_POS: 65 // depth = 0
 v1 = 0;                           //BYTECODE_POS: 68 
 executionStack[3] = v1;           //BYTECODE_POS: 70 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 73 depth
 v2 = executionStack[2];           //BYTECODE_POS: 76 depth
 v2 = v2.length;                   //BYTECODE_POS: 79 
 v1 = v1 < v2;                     //BYTECODE_POS: 81 
 // if (!v1) skip to 107           //BYTECODE_POS: 82 
 v1 = window                       //BYTECODE_POS: 84 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._xex;                     //BYTECODE_POS: 86 
 v2 = v1                           //BYTECODE_POS: 88 
 v2 = v2.i;                        //BYTECODE_POS: 89 
 v3 = executionStack[2];           //BYTECODE_POS: 91 depth
 v4 = executionStack[3];           //BYTECODE_POS: 94 depth
 v3 = v3[v4]                       //BYTECODE_POS: 97 
 v1 = v2(v3);                      //BYTECODE_POS: 98 // context 1 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 101 
 v1 = executionStack;              //BYTECODE_POS: 101 
 v2 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1 = v1[v2]++                     //BYTECODE_POS: 104 // replace the executionStack var with an index incremented
 // go back to 72                  //BYTECODE_POS: 106 
 v1 = undefined                    //BYTECODE_POS: 108 
 //return v1;                      //BYTECODE_POS: 109 
}