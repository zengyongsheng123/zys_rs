function VM6(arg0) {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = 513;                         //BYTECODE_POS: 4 
 v0 = v0 < v1;                     //BYTECODE_POS: 6 
 // if (v0) skip 6                 //BYTECODE_POS: 7 
 v1 = executionStack[2];           //BYTECODE_POS: 9 depth
 v2 = 519;                         //BYTECODE_POS: 12 
 v1 = v1 > v2                      //BYTECODE_POS: 14 
 // if (!v1) skip to 24            //BYTECODE_POS: 15 
 v1 = undefined                    //BYTECODE_POS: 17 
 v2 = Error                        //BYTECODE_POS: 18 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = "unsupport privacy mode"     //BYTECODE_POS: 20 
 v1 = v2(v3);                      //BYTECODE_POS: 22 // context 1 could be custom vm or native func
 //return v1                       //BYTECODE_POS: 24 
 v1 = executionStack[0];           //BYTECODE_POS: 25 depth
 v2 = executionStack[2];           //BYTECODE_POS: 28 depth
 v1.umode = v1;                    //BYTECODE_POS: 31 
 v1 = window                       //BYTECODE_POS: 33 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 35 
 // if (!v1) skip 6 to 44          //BYTECODE_POS: 37 
 v2 = window                       //BYTECODE_POS: 39 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2._mssdk;                   //BYTECODE_POS: 41 
 v2 = v2.cacheOpts;                //BYTECODE_POS: 43 
 // if (!v2) skip 12 to 58         //BYTECODE_POS: 45 
 v3 = window                       //BYTECODE_POS: 47 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3._mssdk;                   //BYTECODE_POS: 49 
 v3 = v3.cacheOpts;                //BYTECODE_POS: 51 
 v4 = executionStack[0];           //BYTECODE_POS: 53 depth
 v4 = v4.aid;                      //BYTECODE_POS: 56 
 v3 = v3[v4]                       //BYTECODE_POS: 58 
 // if (!v3) skip to 77            //BYTECODE_POS: 59 
 v3 = window                       //BYTECODE_POS: 61 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3._mssdk;                   //BYTECODE_POS: 63 
 v3 = v3.cacheOpts;                //BYTECODE_POS: 65 
 v4 = executionStack[0];           //BYTECODE_POS: 67 depth
 v4 = v4.aid;                      //BYTECODE_POS: 70 
 v3 = v3[v4]                       //BYTECODE_POS: 72 
 v4 = executionStack[2];           //BYTECODE_POS: 73 depth
 v3.mode = v3;                     //BYTECODE_POS: 76 
 v3 = window                       //BYTECODE_POS: 78 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3._mssdk;                   //BYTECODE_POS: 80 
 v4 = executionStack[2];           //BYTECODE_POS: 82 depth
 v3.umode = v3;                    //BYTECODE_POS: 85 
 v3 = undefined                    //BYTECODE_POS: 87 
 v4 = executionStack[15];          //BYTECODE_POS: 88 depth
 v5 = executionStack[9];           //BYTECODE_POS: 91 depth
 v6 = executionStack[10];          //BYTECODE_POS: 94 depth
 v6 = v6.slardarErrs;              //BYTECODE_POS: 97 
 v3 = v4(v5,v6);                   //BYTECODE_POS: 99 // context 3 could be custom vm or native func
 v3 = undefined                    //BYTECODE_POS: 102 
 v4 = executionStack[17];          //BYTECODE_POS: 103 depth
 v3 = v4();                        //BYTECODE_POS: 106 // context 3 could be custom vm or native func
 v3 = executionStack[5];           //BYTECODE_POS: 109 depth
 v4 = v3                           //BYTECODE_POS: 112 
 v4 = v4.bind;                     //BYTECODE_POS: 113 
 v5 = null                         //BYTECODE_POS: 115 
 v6 = executionStack[9];           //BYTECODE_POS: 116 depth
 v7 = executionStack[10];          //BYTECODE_POS: 119 depth
 v7 = v7.slardarErrs;              //BYTECODE_POS: 122 
 v8 = executionStack[0];           //BYTECODE_POS: 124 depth
 v9 = false;                       //BYTECODE_POS: 127 
 v10 = null                        //BYTECODE_POS: 128 
 v3 = v4(v5,v6,v7,v8,v9,v10);      //BYTECODE_POS: 129 // context 3 could be custom vm or native func
 executionStack[3] = v3;           //BYTECODE_POS: 131 // depth = 0
 v3 = undefined                    //BYTECODE_POS: 134 
 v4 = executionStack[16];          //BYTECODE_POS: 135 depth
 v5 = executionStack[3];           //BYTECODE_POS: 138 depth
 v3 = v4(v5);                      //BYTECODE_POS: 141 // context 3 could be custom vm or native func
 v3 = undefined                    //BYTECODE_POS: 144 
 v4 = setTimeout                   //BYTECODE_POS: 145 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = functionVM7;                 //BYTECODE_POS: 147 
 v6 = 8;                           //BYTECODE_POS: 149 
 v7 = 1000;                        //BYTECODE_POS: 151 
 v6 *= v7                          //BYTECODE_POS: 153 
 v3 = v4(v5,v6);                   //BYTECODE_POS: 154 // context 3 could be custom vm or native func
 v3 = undefined                    //BYTECODE_POS: 157 
 //return v3;                      //BYTECODE_POS: 158 
}