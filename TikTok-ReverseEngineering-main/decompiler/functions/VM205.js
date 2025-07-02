function VM205() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[5];           //BYTECODE_POS: 1 depth
 v0 = v0.readyState;               //BYTECODE_POS: 4 
 v1 = XMLHttpRequest               //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.DONE;                     //BYTECODE_POS: 8 
 v0 = v0 === v1                    //BYTECODE_POS: 10 
 // if (!v0) skip to 175           //BYTECODE_POS: 11 
 v0 = executionStack[5];           //BYTECODE_POS: 13 depth
 v0 = v0.status;                   //BYTECODE_POS: 16 
 executionStack[2] = v0;           //BYTECODE_POS: 18 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 21 depth
 v1 = 200;                         //BYTECODE_POS: 24 
 v0 = v0 !== v1;                   //BYTECODE_POS: 26 
 // if (!v0) skip to 124           //BYTECODE_POS: 27 
 v0 = executionStack[4];           //BYTECODE_POS: 29 depth
 v0 = v0.interval;                 //BYTECODE_POS: 32 
 v1 = 2;                           //BYTECODE_POS: 34 
 v0 *= v1                          //BYTECODE_POS: 36 
 v1 = executionStack[4];           //BYTECODE_POS: 37 depth
 v2 = "interval"                   //BYTECODE_POS: 40 
 v1[v2] = v0                       //BYTECODE_POS: 42 
 v0 = executionStack[4];           //BYTECODE_POS: 44 depth
 v0 = v0.interval;                 //BYTECODE_POS: 47 
 v1 = 2;                           //BYTECODE_POS: 49 
 v2 = 60;                          //BYTECODE_POS: 51 
 v1 *= v2                          //BYTECODE_POS: 53 
 v2 = 1000;                        //BYTECODE_POS: 54 
 v1 *= v2                          //BYTECODE_POS: 56 
 v0 = v0 > v1                      //BYTECODE_POS: 57 
 // if (!v0) skip to 72            //BYTECODE_POS: 58 
 v0 = executionStack[4];           //BYTECODE_POS: 60 depth
 v1 = 2;                           //BYTECODE_POS: 63 
 v2 = 60;                          //BYTECODE_POS: 65 
 v1 *= v2                          //BYTECODE_POS: 67 
 v2 = 1000;                        //BYTECODE_POS: 68 
 v1 *= v2                          //BYTECODE_POS: 70 
 v0.interval = v0;                 //BYTECODE_POS: 71 
 v0 = executionStack[4];           //BYTECODE_POS: 73 depth
 v0 = v0.times;                    //BYTECODE_POS: 76 
 v1 = 1;                           //BYTECODE_POS: 78 
 v0 += v1                          //BYTECODE_POS: 80 
 v1 = executionStack[4];           //BYTECODE_POS: 81 depth
 v2 = "times"                      //BYTECODE_POS: 84 
 v1[v2] = v0                       //BYTECODE_POS: 86 
 v0 = executionStack[4];           //BYTECODE_POS: 88 depth
 v0 = v0.times;                    //BYTECODE_POS: 91 
 v1 = 5;                           //BYTECODE_POS: 93 
 v0 = v0 < v1;                     //BYTECODE_POS: 95 
 // if (!v0) skip to 112           //BYTECODE_POS: 96 
 v0 = undefined                    //BYTECODE_POS: 98 
 v1 = setTimeout                   //BYTECODE_POS: 99 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = functionVM206;               //BYTECODE_POS: 101 
 v3 = executionStack[4];           //BYTECODE_POS: 103 depth
 v3 = v3.interval;                 //BYTECODE_POS: 106 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 108 // context 0 could be custom vm or native func
 // go foward to 122               //BYTECODE_POS: 111 
 v0 = undefined                    //BYTECODE_POS: 113 
 v1 = executionStack[3];           //BYTECODE_POS: 114 depth
 v2 = executionStack[2];           //BYTECODE_POS: 117 depth
 v0 = v1(v2);                      //BYTECODE_POS: 120 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 123 
 //return v0;                      //BYTECODE_POS: 124 
 v0 = executionStack[5];           //BYTECODE_POS: 125 depth
 v0 = v0.response;                 //BYTECODE_POS: 128 
 executionStack[3] = v0;           //BYTECODE_POS: 130 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 133 depth
 v0 = v0.code;                     //BYTECODE_POS: 136 
 v1 = 0;                           //BYTECODE_POS: 138 
 v0 = v0 != v1;                    //BYTECODE_POS: 140 
 // if (!v0) skip to 144           //BYTECODE_POS: 141 
 v0 = undefined                    //BYTECODE_POS: 143 
 //return v0;                      //BYTECODE_POS: 144 
 v0 = undefined                    //BYTECODE_POS: 145 
 v1 = executionStack[3];           //BYTECODE_POS: 146 depth
 v2 = executionStack[3];           //BYTECODE_POS: 149 depth
 v2 = v2.content;                  //BYTECODE_POS: 152 
 v0 = v1(v2);                      //BYTECODE_POS: 154 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 156 // depth = 0
 // go foward to 165               //BYTECODE_POS: 159 
 executionStack[5] = v-1;          //BYTECODE_POS: 161 // depth = 0
 v-1 = undefined                   //BYTECODE_POS: 164 
 //return v-1;                     //BYTECODE_POS: 165 
 v-1 = undefined                   //BYTECODE_POS: 166 
 v0 = executionStack[3];           //BYTECODE_POS: 167 depth
 v1 = executionStack[4];           //BYTECODE_POS: 170 depth
 v-1 = v0(v1);                     //BYTECODE_POS: 173 // context -1 could be custom vm or native func
 v-1 = undefined                   //BYTECODE_POS: 176 
 //return v-1;                     //BYTECODE_POS: 177 
}