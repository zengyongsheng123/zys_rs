function VM159() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Object                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.getOwnPropertyNames;      //BYTECODE_POS: 4 
 v2 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 13 
 v1 = executionStack[5];           //BYTECODE_POS: 14 depth
 v2 = window                       //BYTECODE_POS: 17 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[2];           //BYTECODE_POS: 19 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 22 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 24 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 27 
 v1 = executionStack[0];           //BYTECODE_POS: 28 depth
 v2 = executionStack[3];           //BYTECODE_POS: 31 depth
 v3 = 2;                           //BYTECODE_POS: 34 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 38 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 41 depth
 v0 = v0[0];                       //BYTECODE_POS: 44 
 executionStack[5] = v0;           //BYTECODE_POS: 46 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 49 depth
 v0 = v0[1];                       //BYTECODE_POS: 52 
 executionStack[6] = v0;           //BYTECODE_POS: 54 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 57 
 v1 = executionStack[4];           //BYTECODE_POS: 58 depth
 v0 = v1();                        //BYTECODE_POS: 61 // context 0 could be custom vm or native func
 executionStack[7] = v0;           //BYTECODE_POS: 63 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 66 
 v1 = executionStack[0];           //BYTECODE_POS: 67 depth
 v2 = executionStack[7];           //BYTECODE_POS: 70 depth
 v3 = 3;                           //BYTECODE_POS: 73 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 75 // context 0 could be custom vm or native func
 executionStack[8] = v0;           //BYTECODE_POS: 77 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 80 depth
 v0 = v0[0];                       //BYTECODE_POS: 83 
 executionStack[9] = v0;           //BYTECODE_POS: 85 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 88 depth
 v0 = v0[1];                       //BYTECODE_POS: 91 
 executionStack[10] = v0;          //BYTECODE_POS: 93 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 96 depth
 v0 = v0[2];                       //BYTECODE_POS: 99 
 executionStack[11] = v0;          //BYTECODE_POS: 101 // depth = 0
 v0 = {};                          //BYTECODE_POS: 104 
 v1 = {};                          //BYTECODE_POS: 105 
 v2 = executionStack[2];           //BYTECODE_POS: 106 depth
 v2 = v2.length;                   //BYTECODE_POS: 109 
 v1.a = v2;                        //BYTECODE_POS: 111 
 v2 = executionStack[9];           //BYTECODE_POS: 113 depth
 v1.b = v2;                        //BYTECODE_POS: 116 
 v2 = executionStack[5];           //BYTECODE_POS: 118 depth
 v1.c = v2;                        //BYTECODE_POS: 121 
 v2 = executionStack[6];           //BYTECODE_POS: 123 depth
 v1.d = v2;                        //BYTECODE_POS: 126 
 v2 = executionStack[10];          //BYTECODE_POS: 128 depth
 v1.e = v2;                        //BYTECODE_POS: 131 
 v2 = executionStack[11];          //BYTECODE_POS: 133 depth
 v1.f = v2;                        //BYTECODE_POS: 136 
 v0.data = v1;                     //BYTECODE_POS: 138 
 //return v0;                      //BYTECODE_POS: 140 
}