function VM186() {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "111"                        //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = Object                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 8 
 v1 = v1.getOwnPropertyDescriptor; //BYTECODE_POS: 9 
 v2 = navigator                    //BYTECODE_POS: 11 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = "maxTouchPoints"             //BYTECODE_POS: 13 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 15 // context 0 could be custom vm or native func
 v0 = v0.get;                      //BYTECODE_POS: 17 
 v0 = typeof v0;                   //BYTECODE_POS: 19 
 v1 = "function"                   //BYTECODE_POS: 20 
 v0 = v0 === v1                    //BYTECODE_POS: 22 
 // if (!v0) skip to 28            //BYTECODE_POS: 23 
 v0 = 2;                           //BYTECODE_POS: 25 
 // go foward to 30                //BYTECODE_POS: 27 
 v1 = 3;                           //BYTECODE_POS: 29 
 executionStack[3] = v1;           //BYTECODE_POS: 31 // depth = 0
 // go foward to 43                //BYTECODE_POS: 34 
 executionStack[6] = v0;           //BYTECODE_POS: 36 // depth = 0
 v0 = 1;                           //BYTECODE_POS: 39 
 executionStack[3] = v0;           //BYTECODE_POS: 41 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 44 
 v1 = arguments;                   //BYTECODE_POS: 45 depth
 v2 = navigator                    //BYTECODE_POS: 48 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v1(v2);                      //BYTECODE_POS: 50 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 52 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 55 
 v1 = executionStack[0];           //BYTECODE_POS: 56 depth
 v2 = Object                       //BYTECODE_POS: 59 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 61 
 v3 = v3.getOwnPropertyDescriptor; //BYTECODE_POS: 62 
 v4 = navigator                    //BYTECODE_POS: 64 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4.connection;               //BYTECODE_POS: 66 
 v5 = "rtt"                        //BYTECODE_POS: 68 
 v2 = v3(v4,v5);                   //BYTECODE_POS: 70 // context 2 could be custom vm or native func
 v0 = v1(v2);                      //BYTECODE_POS: 72 // context 0 could be custom vm or native func
 v1 = "object"                     //BYTECODE_POS: 74 
 v0 = v0 === v1                    //BYTECODE_POS: 76 
 // if (!v0) skip to 82            //BYTECODE_POS: 77 
 v0 = 2;                           //BYTECODE_POS: 79 
 // go foward to 84                //BYTECODE_POS: 81 
 v1 = 1;                           //BYTECODE_POS: 83 
 executionStack[5] = v1;           //BYTECODE_POS: 85 // depth = 0
 // go foward to 97                //BYTECODE_POS: 88 
 executionStack[7] = v0;           //BYTECODE_POS: 90 // depth = 0
 v0 = 3;                           //BYTECODE_POS: 93 
 executionStack[5] = v0;           //BYTECODE_POS: 95 // depth = 0
 v0 = ""                           //BYTECODE_POS: 98 
 v1 = executionStack[3];           //BYTECODE_POS: 100 depth
 v0 += v1                          //BYTECODE_POS: 103 
 v1 = executionStack[4];           //BYTECODE_POS: 104 depth
 v0 += v1                          //BYTECODE_POS: 107 
 v1 = executionStack[5];           //BYTECODE_POS: 108 depth
 v0 += v1                          //BYTECODE_POS: 111 
 executionStack[2] = v0;           //BYTECODE_POS: 112 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 115 depth
 v1 = v0                           //BYTECODE_POS: 118 
 v1 = v1.includes;                 //BYTECODE_POS: 119 
 v2 = "2"                          //BYTECODE_POS: 121 
 v0 = v1(v2);                      //BYTECODE_POS: 123 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 125 // depth = 1
 v0 = true                         //BYTECODE_POS: 128 
 executionStack[2] = v0;           //BYTECODE_POS: 129 // depth = 1
 v0 = {};                          //BYTECODE_POS: 132 
 v1 = executionStack[2];           //BYTECODE_POS: 133 depth
 v0.data = v1;                     //BYTECODE_POS: 136 
 //return v0;                      //BYTECODE_POS: 138 
}