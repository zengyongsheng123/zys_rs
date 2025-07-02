function VM9(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Array                        //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.isArray;                  //BYTECODE_POS: 4 
 v2 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2._mssdk;                   //BYTECODE_POS: 8 
 v2 = v2._enablePathList;          //BYTECODE_POS: 10 
 v0 = v1(v2);                      //BYTECODE_POS: 12 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 14 
 // if (v0) skip 14                //BYTECODE_POS: 15 
 v1 = Array                        //BYTECODE_POS: 17 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 19 
 v2 = v2.isArray;                  //BYTECODE_POS: 20 
 v3 = window                       //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3._mssdk;                   //BYTECODE_POS: 24 
 v3 = v3._enablePathListRegex;     //BYTECODE_POS: 26 
 v1 = v2(v3);                      //BYTECODE_POS: 28 // context 1 could be custom vm or native func
 v1 = !v1                          //BYTECODE_POS: 30 
 // if (!v1) skip to 48            //BYTECODE_POS: 31 
 v1 = window                       //BYTECODE_POS: 33 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 35 
 v2 = []                           //BYTECODE_POS: 37 
 v1._enablePathList = v1;          //BYTECODE_POS: 39 
 v1 = window                       //BYTECODE_POS: 41 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 43 
 v2 = []                           //BYTECODE_POS: 45 
 v1._enablePathListRegex = v1;     //BYTECODE_POS: 47 
 v1 = 0;                           //BYTECODE_POS: 49 
 executionStack[3] = v1;           //BYTECODE_POS: 51 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 54 depth
 v2 = executionStack[2];           //BYTECODE_POS: 57 depth
 v2 = v2.length;                   //BYTECODE_POS: 60 
 v1 = v1 < v2;                     //BYTECODE_POS: 62 
 // if (!v1) skip to 146           //BYTECODE_POS: 63 
 v1 = executionStack[2];           //BYTECODE_POS: 65 depth
 v2 = executionStack[3];           //BYTECODE_POS: 68 depth
 v1 = v1[v2]                       //BYTECODE_POS: 71 
 // if (!v1) skip to 139           //BYTECODE_POS: 72 
 v1 = window                       //BYTECODE_POS: 74 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 76 
 v1 = v1._enablePathList;          //BYTECODE_POS: 78 
 v2 = v1                           //BYTECODE_POS: 80 
 v2 = v2.indexOf;                  //BYTECODE_POS: 81 
 v3 = executionStack[2];           //BYTECODE_POS: 83 depth
 v4 = executionStack[3];           //BYTECODE_POS: 86 depth
 v3 = v3[v4]                       //BYTECODE_POS: 89 
 v1 = v2(v3);                      //BYTECODE_POS: 90 // context 1 could be custom vm or native func
 v2 = 1;                           //BYTECODE_POS: 92 
 v2 = -v2                          //BYTECODE_POS: 94 
 v1 = v1 === v2                    //BYTECODE_POS: 95 
 // if (!v1) skip to 139           //BYTECODE_POS: 96 
 v1 = window                       //BYTECODE_POS: 98 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 100 
 v1 = v1._enablePathList;          //BYTECODE_POS: 102 
 v2 = v1                           //BYTECODE_POS: 104 
 v2 = v2.push;                     //BYTECODE_POS: 105 
 v3 = executionStack[2];           //BYTECODE_POS: 107 depth
 v4 = executionStack[3];           //BYTECODE_POS: 110 depth
 v3 = v3[v4]                       //BYTECODE_POS: 113 
 v1 = v2(v3);                      //BYTECODE_POS: 114 // context 1 could be custom vm or native func
 v1 = window                       //BYTECODE_POS: 117 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 119 
 v1 = v1._enablePathListRegex;     //BYTECODE_POS: 121 
 v2 = v1                           //BYTECODE_POS: 123 
 v2 = v2.push;                     //BYTECODE_POS: 124 
 v3 = RegExp                       //BYTECODE_POS: 126 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = executionStack[2];           //BYTECODE_POS: 128 depth
 v5 = executionStack[3];           //BYTECODE_POS: 131 depth
 v4 = v4[v5]                       //BYTECODE_POS: 134 
 v3 = new v3()                     //BYTECODE_POS: 135 
 v1 = v2(v3);                      //BYTECODE_POS: 137 // context 1 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 140 
 v1 = executionStack;              //BYTECODE_POS: 140 
 v2 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1 = v1[v2]++                     //BYTECODE_POS: 143 // replace the executionStack var with an index incremented
 // go back to 53                  //BYTECODE_POS: 145 
 v1 = undefined                    //BYTECODE_POS: 147 
 //return v1;                      //BYTECODE_POS: 148 
}