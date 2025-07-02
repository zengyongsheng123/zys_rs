function VM120(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4,v5,v6,v7; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[5] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 6 
 executionStack[6] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 11 depth
 v0 = v0.length;                   //BYTECODE_POS: 14 
 v1 = executionStack[3];           //BYTECODE_POS: 16 depth
 v0 = v0 > v1                      //BYTECODE_POS: 19 
 // if (!v0) skip to 208           //BYTECODE_POS: 20 
 v0 = []                           //BYTECODE_POS: 22 
 executionStack[7] = v0;           //BYTECODE_POS: 24 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 27 
 executionStack[8] = v0;           //BYTECODE_POS: 29 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 32 depth
 v1 = executionStack[2];           //BYTECODE_POS: 35 depth
 v1 = v1.length;                   //BYTECODE_POS: 38 
 v2 = 1;                           //BYTECODE_POS: 40 
 v1 -= v2;                         //BYTECODE_POS: 42 
 v0 = v0 < v1;                     //BYTECODE_POS: 43 
 // if (!v0) skip to 171           //BYTECODE_POS: 44 
 v0 = executionStack[2];           //BYTECODE_POS: 46 depth
 v1 = executionStack[8];           //BYTECODE_POS: 49 depth
 v2 = 1;                           //BYTECODE_POS: 52 
 v1 += v2                          //BYTECODE_POS: 54 
 v0 = v0[v1]                       //BYTECODE_POS: 55 
 executionStack[9] = v0;           //BYTECODE_POS: 56 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 59 depth
 v1 = executionStack[8];           //BYTECODE_POS: 62 depth
 v0 = v0[v1]                       //BYTECODE_POS: 65 
 executionStack[10] = v0;          //BYTECODE_POS: 66 // depth = 0
 v0 = executionStack[9];           //BYTECODE_POS: 69 depth
 v0 = v0.d;                        //BYTECODE_POS: 72 
 v1 = executionStack[10];          //BYTECODE_POS: 74 depth
 v1 = v1.d;                        //BYTECODE_POS: 77 
 v0 -= v1;                         //BYTECODE_POS: 79 
 executionStack[11] = v0;          //BYTECODE_POS: 80 // depth = 0
 v0 = executionStack[11];          //BYTECODE_POS: 83 depth
 // if (!v0) skip to 164           //BYTECODE_POS: 86 
 v0 = executionStack[4];           //BYTECODE_POS: 88 depth
 // if (!v0) skip to 109           //BYTECODE_POS: 91 
 v0 = executionStack[7];           //BYTECODE_POS: 93 depth
 v1 = v0                           //BYTECODE_POS: 96 
 v1 = v1.push;                     //BYTECODE_POS: 97 
 v2 = 1;                           //BYTECODE_POS: 99 
 v3 = executionStack[11];          //BYTECODE_POS: 101 depth
 v2 /= v3                          //BYTECODE_POS: 104 
 v0 = v1(v2);                      //BYTECODE_POS: 105 // context 0 could be custom vm or native func
 // go foward to 164               //BYTECODE_POS: 108 
 v0 = executionStack[7];           //BYTECODE_POS: 110 depth
 v1 = v0                           //BYTECODE_POS: 113 
 v1 = v1.push;                     //BYTECODE_POS: 114 
 v2 = Math                         //BYTECODE_POS: 116 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 118 
 v3 = v3.sqrt;                     //BYTECODE_POS: 119 
 v4 = undefined                    //BYTECODE_POS: 121 
 v5 = executionStack[9];           //BYTECODE_POS: 122 depth
 v6 = executionStack[9];           //BYTECODE_POS: 125 depth
 v6 = v6.x;                        //BYTECODE_POS: 128 
 v7 = executionStack[10];          //BYTECODE_POS: 130 depth
 v7 = v7.x;                        //BYTECODE_POS: 133 
 v6 -= v7;                         //BYTECODE_POS: 135 
 v4 = v5(v6);                      //BYTECODE_POS: 136 // context 4 could be custom vm or native func
 v5 = undefined                    //BYTECODE_POS: 138 
 v6 = executionStack[9];           //BYTECODE_POS: 139 depth
 v7 = executionStack[9];           //BYTECODE_POS: 142 depth
 v7 = v7.y;                        //BYTECODE_POS: 145 
 v8 = executionStack[10];          //BYTECODE_POS: 147 depth
 v8 = v8.y;                        //BYTECODE_POS: 150 
 v7 -= v8;                         //BYTECODE_POS: 152 
 v5 = v6(v7);                      //BYTECODE_POS: 153 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 155 
 v2 = v3(v4);                      //BYTECODE_POS: 156 // context 2 could be custom vm or native func
 v3 = executionStack[11];          //BYTECODE_POS: 158 depth
 v2 /= v3                          //BYTECODE_POS: 161 
 v0 = v1(v2);                      //BYTECODE_POS: 162 // context 0 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 165 
 v0 = executionStack;              //BYTECODE_POS: 165 
 v1 = 8                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 168 // replace the executionStack var with an index incremented
 // go back to 31                  //BYTECODE_POS: 170 
 v0 = undefined                    //BYTECODE_POS: 172 
 v1 = executionStack[12];          //BYTECODE_POS: 173 depth
 v2 = executionStack[7];           //BYTECODE_POS: 176 depth
 v0 = v1(v2);                      //BYTECODE_POS: 179 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 181 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 184 
 v1 = executionStack[13];          //BYTECODE_POS: 185 depth
 v2 = executionStack[7];           //BYTECODE_POS: 188 depth
 v0 = v1(v2);                      //BYTECODE_POS: 191 // context 0 could be custom vm or native func
 executionStack[6] = v0;           //BYTECODE_POS: 193 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 196 depth
 v1 = 0;                           //BYTECODE_POS: 199 
 v0 = v0 === v1                    //BYTECODE_POS: 201 
 // if (!v0) skip to 208           //BYTECODE_POS: 202 
 v0 = +0.01                        //BYTECODE_POS: 204 
 executionStack[6] = v0;           //BYTECODE_POS: 206 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 209 depth
 v1 = executionStack[6];           //BYTECODE_POS: 212 depth
 v0 = [v0,v1]                      //BYTECODE_POS: 215 
 //return v0;                      //BYTECODE_POS: 217 
}