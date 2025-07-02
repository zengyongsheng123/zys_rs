function VM126() {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = document                     //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 // if (!v0) skip 4 to 8           //BYTECODE_POS: 3 
 v1 = document                     //BYTECODE_POS: 5 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.addEventListener;         //BYTECODE_POS: 7 
 v1 = !v1                          //BYTECODE_POS: 9 
 // if (!v1) skip to 13            //BYTECODE_POS: 10 
 v1 = undefined                    //BYTECODE_POS: 12 
 //return v1;                      //BYTECODE_POS: 13 
 v1 = document                     //BYTECODE_POS: 14 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 // if (!v1) skip 4 to 21          //BYTECODE_POS: 16 
 v2 = document                     //BYTECODE_POS: 18 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.createEvent;              //BYTECODE_POS: 20 
 // if (!v2) skip to 37            //BYTECODE_POS: 22 
 v2 = document                     //BYTECODE_POS: 24 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 26 
 v3 = v3.createEvent;              //BYTECODE_POS: 27 
 v4 = "TouchEvent"                 //BYTECODE_POS: 29 
 v2 = v3(v4);                      //BYTECODE_POS: 31 // context 2 could be custom vm or native func
 v2 = true                         //BYTECODE_POS: 34 
 executionStack[4] = v2;           //BYTECODE_POS: 35 // depth = 1
 // go foward to 42                //BYTECODE_POS: 38 
 executionStack[7] = v1;           //BYTECODE_POS: 40 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 43 
 v2 = executionStack[2];           //BYTECODE_POS: 44 depth
 v1 = v2();                        //BYTECODE_POS: 47 // context 1 could be custom vm or native func
 executionStack[2] = v1;           //BYTECODE_POS: 49 // depth = 0
 v1 = executionStack[11];          //BYTECODE_POS: 52 depth
 v1 = !v1                          //BYTECODE_POS: 55 
 // if (!v1) skip to 134           //BYTECODE_POS: 56 
 v1 = Object                       //BYTECODE_POS: 58 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 60 
 v2 = v2.keys;                     //BYTECODE_POS: 61 
 v3 = executionStack[10];          //BYTECODE_POS: 63 depth
 v1 = v2(v3);                      //BYTECODE_POS: 66 // context 1 could be custom vm or native func
 executionStack[3] = v1;           //BYTECODE_POS: 68 // depth = 0
 v1 = 0;                           //BYTECODE_POS: 71 
 executionStack[4] = v1;           //BYTECODE_POS: 73 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 76 depth
 executionStack[5] = v1;           //BYTECODE_POS: 79 // depth = 0
 v1 = executionStack[4];           //BYTECODE_POS: 82 depth
 v2 = executionStack[5];           //BYTECODE_POS: 85 depth
 v2 = v2.length;                   //BYTECODE_POS: 88 
 v1 = v1 < v2;                     //BYTECODE_POS: 90 
 // if (!v1) skip to 130           //BYTECODE_POS: 91 
 v1 = executionStack[5];           //BYTECODE_POS: 93 depth
 v2 = executionStack[4];           //BYTECODE_POS: 96 depth
 v1 = v1[v2]                       //BYTECODE_POS: 99 
 executionStack[6] = v1;           //BYTECODE_POS: 100 // depth = 0
 v1 = document                     //BYTECODE_POS: 103 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 105 
 v2 = v2.addEventListener;         //BYTECODE_POS: 106 
 v3 = executionStack[6];           //BYTECODE_POS: 108 depth
 v4 = executionStack[10];          //BYTECODE_POS: 111 depth
 v5 = executionStack[6];           //BYTECODE_POS: 114 depth
 v4 = v4[v5]                       //BYTECODE_POS: 117 
 v5 = executionStack[2];           //BYTECODE_POS: 118 depth
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 121 // context 1 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 124 
 v1 = executionStack;              //BYTECODE_POS: 124 
 v2 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1 = v1[v2]++                     //BYTECODE_POS: 127 // replace the executionStack var with an index incremented
 // go back to 81                  //BYTECODE_POS: 129 
 v1 = true                         //BYTECODE_POS: 131 
 executionStack[11] = v1;          //BYTECODE_POS: 132 // depth = 1
 v1 = undefined                    //BYTECODE_POS: 135 
 //return v1;                      //BYTECODE_POS: 136 
}