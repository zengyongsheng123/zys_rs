function VM208(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = document                     //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.body;                     //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.removeChild;              //BYTECODE_POS: 6 
 v2 = executionStack[6];           //BYTECODE_POS: 8 depth
 v0 = v1(v2);                      //BYTECODE_POS: 11 // context 0 could be custom vm or native func
 v0 = executionStack[5];           //BYTECODE_POS: 14 depth
 v0 = v0.interval;                 //BYTECODE_POS: 17 
 v1 = 2;                           //BYTECODE_POS: 19 
 v0 *= v1                          //BYTECODE_POS: 21 
 v1 = executionStack[5];           //BYTECODE_POS: 22 depth
 v2 = "interval"                   //BYTECODE_POS: 25 
 v1[v2] = v0                       //BYTECODE_POS: 27 
 v0 = executionStack[5];           //BYTECODE_POS: 29 depth
 v0 = v0.interval;                 //BYTECODE_POS: 32 
 v1 = 2;                           //BYTECODE_POS: 34 
 v2 = 60;                          //BYTECODE_POS: 36 
 v1 *= v2                          //BYTECODE_POS: 38 
 v2 = 1000;                        //BYTECODE_POS: 39 
 v1 *= v2                          //BYTECODE_POS: 41 
 v0 = v0 >= v1                     //BYTECODE_POS: 42 
 // if (!v0) skip to 57            //BYTECODE_POS: 43 
 v0 = executionStack[5];           //BYTECODE_POS: 45 depth
 v1 = 2;                           //BYTECODE_POS: 48 
 v2 = 60;                          //BYTECODE_POS: 50 
 v1 *= v2                          //BYTECODE_POS: 52 
 v2 = 1000;                        //BYTECODE_POS: 53 
 v1 *= v2                          //BYTECODE_POS: 55 
 v0.interval = v0;                 //BYTECODE_POS: 56 
 v0 = executionStack[5];           //BYTECODE_POS: 58 depth
 v0 = v0.times;                    //BYTECODE_POS: 61 
 v1 = 1;                           //BYTECODE_POS: 63 
 v0 += v1                          //BYTECODE_POS: 65 
 v1 = executionStack[5];           //BYTECODE_POS: 66 depth
 v2 = "times"                      //BYTECODE_POS: 69 
 v1[v2] = v0                       //BYTECODE_POS: 71 
 v0 = executionStack[2];           //BYTECODE_POS: 73 depth
 v1 = 0;                           //BYTECODE_POS: 76 
 v0 = v0 === v1                    //BYTECODE_POS: 78 
 // if (!v0) skip to 87            //BYTECODE_POS: 79 
 v0 = 3;                           //BYTECODE_POS: 81 
 executionStack[5] = v0;           //BYTECODE_POS: 83 // depth = 3
 // go foward to 100               //BYTECODE_POS: 86 
 v0 = executionStack[2];           //BYTECODE_POS: 88 depth
 v1 = 0;                           //BYTECODE_POS: 91 
 v0 = v0 > v1                      //BYTECODE_POS: 93 
 // if (!v0) skip to 100           //BYTECODE_POS: 94 
 v0 = 1;                           //BYTECODE_POS: 96 
 executionStack[5] = v0;           //BYTECODE_POS: 98 // depth = 3
 //get depth of 2 from executionStack//BYTECODE_POS: 101 
 v0 = executionStack;              //BYTECODE_POS: 101 
 v1 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 104 // replace the executionStack var with an index incremented
 v0 = executionStack[5];           //BYTECODE_POS: 106 depth
 v0 = v0.times;                    //BYTECODE_POS: 109 
 v1 = 3;                           //BYTECODE_POS: 111 
 v0 = v0 < v1;                     //BYTECODE_POS: 113 
 // if (!v0) skip to 130           //BYTECODE_POS: 114 
 v0 = undefined                    //BYTECODE_POS: 116 
 v1 = setTimeout                   //BYTECODE_POS: 117 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = functionVM209;               //BYTECODE_POS: 119 
 v3 = executionStack[5];           //BYTECODE_POS: 121 depth
 v3 = v3.interval;                 //BYTECODE_POS: 124 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 126 // context 0 could be custom vm or native func
 // go foward to 140               //BYTECODE_POS: 129 
 v0 = undefined                    //BYTECODE_POS: 131 
 v1 = executionStack[3];           //BYTECODE_POS: 132 depth
 v2 = executionStack[2];           //BYTECODE_POS: 135 depth
 v0 = v1(v2);                      //BYTECODE_POS: 138 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 141 
 //return v0;                      //BYTECODE_POS: 142 
}