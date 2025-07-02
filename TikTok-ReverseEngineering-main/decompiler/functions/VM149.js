function VM149(arg0, arg1, arg2, arg3) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[3];           //BYTECODE_POS: 1 depth
 v1 = executionStack[4];           //BYTECODE_POS: 4 depth
 v2 = 1;                           //BYTECODE_POS: 7 
 v1 -= v2;                         //BYTECODE_POS: 9 
 v0 = v0 < v1;                     //BYTECODE_POS: 10 
 // if (!v0) skip to 151           //BYTECODE_POS: 11 
 v0 = Math                         //BYTECODE_POS: 13 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 15 
 v1 = v1.floor;                    //BYTECODE_POS: 16 
 v2 = executionStack[3];           //BYTECODE_POS: 18 depth
 v3 = executionStack[4];           //BYTECODE_POS: 21 depth
 v2 += v3                          //BYTECODE_POS: 24 
 v3 = 2;                           //BYTECODE_POS: 25 
 v2 /= v3                          //BYTECODE_POS: 27 
 v0 = v1(v2);                      //BYTECODE_POS: 28 // context 0 could be custom vm or native func
 executionStack[6] = v0;           //BYTECODE_POS: 30 // depth = 0
 v0 = window                       //BYTECODE_POS: 33 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 35 
 v1 = v1.matchMedia;               //BYTECODE_POS: 36 
 v2 = "("                          //BYTECODE_POS: 38 
 v3 = v2                           //BYTECODE_POS: 40 
 v3 = v3.concat;                   //BYTECODE_POS: 41 
 v4 = executionStack[2];           //BYTECODE_POS: 43 depth
 v5 = ": "                         //BYTECODE_POS: 46 
 v2 = v3(v4,v5);                   //BYTECODE_POS: 48 // context 2 could be custom vm or native func
 v3 = v2                           //BYTECODE_POS: 50 
 v3 = v3.concat;                   //BYTECODE_POS: 51 
 v4 = executionStack[6];           //BYTECODE_POS: 53 depth
 v2 = v3(v4);                      //BYTECODE_POS: 56 // context 2 could be custom vm or native func
 v3 = v2                           //BYTECODE_POS: 58 
 v3 = v3.concat;                   //BYTECODE_POS: 59 
 v4 = executionStack[5];           //BYTECODE_POS: 61 depth
 v5 = ")"                          //BYTECODE_POS: 64 
 v2 = v3(v4,v5);                   //BYTECODE_POS: 66 // context 2 could be custom vm or native func
 v0 = v1(v2);                      //BYTECODE_POS: 68 // context 0 could be custom vm or native func
 v0 = v0.matches;                  //BYTECODE_POS: 70 
 executionStack[7] = v0;           //BYTECODE_POS: 72 // depth = 0
 v0 = executionStack[7];           //BYTECODE_POS: 75 depth
 // if (!v0) skip 43 to 122        //BYTECODE_POS: 78 
 v1 = window                       //BYTECODE_POS: 80 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 82 
 v2 = v2.matchMedia;               //BYTECODE_POS: 83 
 v3 = "("                          //BYTECODE_POS: 85 
 v4 = v3                           //BYTECODE_POS: 87 
 v4 = v4.concat;                   //BYTECODE_POS: 88 
 v5 = executionStack[2];           //BYTECODE_POS: 90 depth
 v6 = ": "                         //BYTECODE_POS: 93 
 v3 = v4(v5,v6);                   //BYTECODE_POS: 95 // context 3 could be custom vm or native func
 v4 = v3                           //BYTECODE_POS: 97 
 v4 = v4.concat;                   //BYTECODE_POS: 98 
 v5 = executionStack[6];           //BYTECODE_POS: 100 depth
 v6 = 1;                           //BYTECODE_POS: 103 
 v5 -= v6;                         //BYTECODE_POS: 105 
 v3 = v4(v5);                      //BYTECODE_POS: 106 // context 3 could be custom vm or native func
 v4 = v3                           //BYTECODE_POS: 108 
 v4 = v4.concat;                   //BYTECODE_POS: 109 
 v5 = executionStack[5];           //BYTECODE_POS: 111 depth
 v6 = ")"                          //BYTECODE_POS: 114 
 v3 = v4(v5,v6);                   //BYTECODE_POS: 116 // context 3 could be custom vm or native func
 v1 = v2(v3);                      //BYTECODE_POS: 118 // context 1 could be custom vm or native func
 v1 = v1.matches;                  //BYTECODE_POS: 120 
 v1 = !v1                          //BYTECODE_POS: 122 
 // if (!v1) skip to 128           //BYTECODE_POS: 123 
 v1 = executionStack[6];           //BYTECODE_POS: 125 depth
 //return v1;                      //BYTECODE_POS: 128 
 v1 = executionStack[7];           //BYTECODE_POS: 129 depth
 v2 = true                         //BYTECODE_POS: 132 
 v1 = v1 === v2                    //BYTECODE_POS: 133 
 // if (!v1) skip to 143           //BYTECODE_POS: 134 
 v1 = executionStack[6];           //BYTECODE_POS: 136 depth
 executionStack[4] = v1;           //BYTECODE_POS: 139 // depth = 0
 // go foward to 149               //BYTECODE_POS: 142 
 v1 = executionStack[6];           //BYTECODE_POS: 144 depth
 executionStack[3] = v1;           //BYTECODE_POS: 147 // depth = 0
 // go back to 0                   //BYTECODE_POS: 150 
 v1 = 1;                           //BYTECODE_POS: 152 
 v1 = -v1                          //BYTECODE_POS: 154 
 //return v1;                      //BYTECODE_POS: 155 
}