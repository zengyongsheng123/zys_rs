function VM157() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = document                     //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.createElement;            //BYTECODE_POS: 4 
 v2 = "iframe"                     //BYTECODE_POS: 6 
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 13 depth
 v0 = v0.style;                    //BYTECODE_POS: 16 
 v1 = "none"                       //BYTECODE_POS: 18 
 v0.display = v0;                  //BYTECODE_POS: 20 
 v0 = document                     //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.body;                     //BYTECODE_POS: 24 
 v1 = v0                           //BYTECODE_POS: 26 
 v1 = v1.appendChild;              //BYTECODE_POS: 27 
 v2 = executionStack[2];           //BYTECODE_POS: 29 depth
 v0 = v1(v2);                      //BYTECODE_POS: 32 // context 0 could be custom vm or native func
 v0 = Object                       //BYTECODE_POS: 35 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 37 
 v1 = v1.getOwnPropertyNames;      //BYTECODE_POS: 38 
 v2 = executionStack[2];           //BYTECODE_POS: 40 depth
 v2 = v2.contentWindow;            //BYTECODE_POS: 43 
 v0 = v1(v2);                      //BYTECODE_POS: 45 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 47 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 50 
 v1 = executionStack[5];           //BYTECODE_POS: 51 depth
 v2 = executionStack[2];           //BYTECODE_POS: 54 depth
 v2 = v2.contentWindow;            //BYTECODE_POS: 57 
 v3 = executionStack[3];           //BYTECODE_POS: 59 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 62 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 64 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 67 
 v1 = executionStack[0];           //BYTECODE_POS: 68 depth
 v2 = executionStack[4];           //BYTECODE_POS: 71 depth
 v3 = 2;                           //BYTECODE_POS: 74 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 76 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 78 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 81 depth
 v0 = v0[0];                       //BYTECODE_POS: 84 
 executionStack[6] = v0;           //BYTECODE_POS: 86 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 89 depth
 v0 = v0[1];                       //BYTECODE_POS: 92 
 executionStack[7] = v0;           //BYTECODE_POS: 94 // depth = 0
 v0 = document                     //BYTECODE_POS: 97 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.body;                     //BYTECODE_POS: 99 
 v1 = v0                           //BYTECODE_POS: 101 
 v1 = v1.removeChild;              //BYTECODE_POS: 102 
 v2 = executionStack[2];           //BYTECODE_POS: 104 depth
 v0 = v1(v2);                      //BYTECODE_POS: 107 // context 0 could be custom vm or native func
 v0 = executionStack[3];           //BYTECODE_POS: 110 depth
 v0 = v0.length;                   //BYTECODE_POS: 113 
 v1 = executionStack[6];           //BYTECODE_POS: 115 depth
 v2 = executionStack[7];           //BYTECODE_POS: 118 depth
 v0 = [v0,v1,v2]                   //BYTECODE_POS: 121 
 //return v0;                      //BYTECODE_POS: 123 
}