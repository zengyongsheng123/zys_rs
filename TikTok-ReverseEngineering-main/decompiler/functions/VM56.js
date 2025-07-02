function VM56() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Math                         //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.random;                   //BYTECODE_POS: 4 
 v0 = v1();                        //BYTECODE_POS: 6 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 11 depth
 v1 = v0                           //BYTECODE_POS: 14 
 v1 = v1.includes;                 //BYTECODE_POS: 15 
 v2 = executionStack[2];           //BYTECODE_POS: 17 depth
 v0 = v1(v2);                      //BYTECODE_POS: 20 // context 0 could be custom vm or native func
 // if (!v0) skip to 28            //BYTECODE_POS: 22 
 v0 = 2;                           //BYTECODE_POS: 24 
 executionStack[7] = v0;           //BYTECODE_POS: 26 // depth = 1
 v0 = executionStack[6];           //BYTECODE_POS: 29 depth
 v1 = v0                           //BYTECODE_POS: 32 
 v1 = v1.push;                     //BYTECODE_POS: 33 
 v2 = executionStack[2];           //BYTECODE_POS: 35 depth
 v0 = v1(v2);                      //BYTECODE_POS: 38 // context 0 could be custom vm or native func
 v0 = Math                         //BYTECODE_POS: 41 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 43 
 v1 = v1.floor;                    //BYTECODE_POS: 44 
 v2 = Math                         //BYTECODE_POS: 46 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 48 
 v3 = v3.random;                   //BYTECODE_POS: 49 
 v2 = v3();                        //BYTECODE_POS: 51 // context 2 could be custom vm or native func
 v3 = executionStack[3];           //BYTECODE_POS: 53 depth
 v4 = executionStack[2];           //BYTECODE_POS: 56 depth
 v3 -= v4;                         //BYTECODE_POS: 59 
 v4 = 1;                           //BYTECODE_POS: 60 
 v3 += v4                          //BYTECODE_POS: 62 
 v2 *= v3                          //BYTECODE_POS: 63 
 v3 = executionStack[2];           //BYTECODE_POS: 64 depth
 v2 += v3                          //BYTECODE_POS: 67 
 v0 = v1(v2);                      //BYTECODE_POS: 68 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 70 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 73 depth
 // if (!v0) skip to 92            //BYTECODE_POS: 76 
 v0 = undefined                    //BYTECODE_POS: 78 
 v1 = setTimeout                   //BYTECODE_POS: 79 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[10];          //BYTECODE_POS: 81 depth
 v3 = executionStack[3];           //BYTECODE_POS: 84 depth
 v4 = 1000;                        //BYTECODE_POS: 87 
 v3 *= v4                          //BYTECODE_POS: 89 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 90 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 93 
 //return v0;                      //BYTECODE_POS: 94 
}