function VM248() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = 0;                           //BYTECODE_POS: 4 
 v0 = v0 === v1                    //BYTECODE_POS: 6 
 // if (!v0) skip to 105           //BYTECODE_POS: 7 
 v0 = 1;                           //BYTECODE_POS: 9 
 v0 = -v0                          //BYTECODE_POS: 11 
 executionStack[2] = v0;           //BYTECODE_POS: 12 // depth = 1
 v0 = RegExp                       //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = "chrome\/\d+\."              //BYTECODE_POS: 17 
 v2 = "gi"                         //BYTECODE_POS: 19 
 v0 = new v0()                     //BYTECODE_POS: 21 
 executionStack[2] = v0;           //BYTECODE_POS: 23 // depth = 0
 v0 = navigator                    //BYTECODE_POS: 26 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.userAgent;                //BYTECODE_POS: 28 
 v1 = v0                           //BYTECODE_POS: 30 
 v1 = v1.toLowerCase;              //BYTECODE_POS: 31 
 v0 = v1();                        //BYTECODE_POS: 33 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 35 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 38 depth
 v1 = v0                           //BYTECODE_POS: 41 
 v1 = v1.match;                    //BYTECODE_POS: 42 
 v2 = executionStack[2];           //BYTECODE_POS: 44 depth
 v0 = v1(v2);                      //BYTECODE_POS: 47 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 49 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 52 depth
 // if (!v0) skip to 105           //BYTECODE_POS: 55 
 v0 = executionStack[4];           //BYTECODE_POS: 57 depth
 v0 = v0[0];                       //BYTECODE_POS: 60 
 v1 = v0                           //BYTECODE_POS: 62 
 v1 = v1.replace;                  //BYTECODE_POS: 63 
 v2 = "chrome/"                    //BYTECODE_POS: 65 
 v3 = ""                           //BYTECODE_POS: 67 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 69 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 71 
 v1 = v1.replace;                  //BYTECODE_POS: 72 
 v2 = "."                          //BYTECODE_POS: 74 
 v3 = ""                           //BYTECODE_POS: 76 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 78 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 80 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 83 
 v1 = parseInt                     //BYTECODE_POS: 84 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[5];           //BYTECODE_POS: 86 depth
 v0 = v1(v2);                      //BYTECODE_POS: 89 // context 0 could be custom vm or native func
 v1 = 91;                          //BYTECODE_POS: 91 
 v0 = v0 >= v1                     //BYTECODE_POS: 93 
 // if (!v0) skip to 100           //BYTECODE_POS: 94 
 v0 = 1;                           //BYTECODE_POS: 96 
 executionStack[2] = v0;           //BYTECODE_POS: 98 // depth = 1
 // go foward to 105               //BYTECODE_POS: 101 
 executionStack[6] = v-1;          //BYTECODE_POS: 103 // depth = 0
 v-1 = executionStack[2];          //BYTECODE_POS: 106 depth
 v0 = 1;                           //BYTECODE_POS: 109 
 v-1 = v-1 === v0                  //BYTECODE_POS: 111 
 // if (!v-1) skip to 115          //BYTECODE_POS: 112 
 v-1 = true                        //BYTECODE_POS: 114 
 //return v-1;                     //BYTECODE_POS: 115 
 v-1 = false;                      //BYTECODE_POS: 116 
 //return v-1;                     //BYTECODE_POS: 117 
}