function VM240(arg0, arg1) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[3];           //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 executionStack[4] = v0;           //BYTECODE_POS: 6 // depth = 0
 v0 = ArrayBuffer                  //BYTECODE_POS: 9 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[4];           //BYTECODE_POS: 11 depth
 v2 = 1;                           //BYTECODE_POS: 14 
 v1 += v2                          //BYTECODE_POS: 16 
 v0 = new v0()                     //BYTECODE_POS: 17 
 executionStack[5] = v0;           //BYTECODE_POS: 19 // depth = 0
 v0 = Uint8Array                   //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[5];           //BYTECODE_POS: 24 depth
 v0 = new v0()                     //BYTECODE_POS: 27 
 executionStack[6] = v0;           //BYTECODE_POS: 29 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 32 
 executionStack[7] = v0;           //BYTECODE_POS: 34 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 37 
 executionStack[8] = v0;           //BYTECODE_POS: 39 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 42 depth
 v1 = executionStack[4];           //BYTECODE_POS: 45 depth
 v0 = v0 < v1;                     //BYTECODE_POS: 48 
 // if (!v0) skip to 87            //BYTECODE_POS: 49 
 v0 = executionStack[6];           //BYTECODE_POS: 51 depth
 v1 = executionStack[8];           //BYTECODE_POS: 54 depth
 v2 = executionStack[3];           //BYTECODE_POS: 57 depth
 v3 = executionStack[8];           //BYTECODE_POS: 60 depth
 v2 = v2[v3]                       //BYTECODE_POS: 63 
 v0[v1] = v2;                      //BYTECODE_POS: 64 
 v0 = executionStack[7];           //BYTECODE_POS: 65 depth
 v1 = executionStack[3];           //BYTECODE_POS: 68 depth
 v2 = executionStack[8];           //BYTECODE_POS: 71 depth
 v1 = v1[v2]                       //BYTECODE_POS: 74 
 v0 ^= v1;                         //BYTECODE_POS: 75 
 //get depth of 0 from executionStack//BYTECODE_POS: 76 
 v1 = executionStack;              //BYTECODE_POS: 76 
 v2 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 79 
 //get depth of 0 from executionStack//BYTECODE_POS: 81 
 v0 = executionStack;              //BYTECODE_POS: 81 
 v1 = 8                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 84 // replace the executionStack var with an index incremented
 // go back to 41                  //BYTECODE_POS: 86 
 v0 = executionStack[6];           //BYTECODE_POS: 88 depth
 v1 = executionStack[4];           //BYTECODE_POS: 91 depth
 v2 = executionStack[7];           //BYTECODE_POS: 94 depth
 v0[v1] = v2;                      //BYTECODE_POS: 97 
 v0 = Math                         //BYTECODE_POS: 98 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 100 
 v1 = v1.floor;                    //BYTECODE_POS: 101 
 v2 = Math                         //BYTECODE_POS: 103 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 105 
 v3 = v3.random;                   //BYTECODE_POS: 106 
 v2 = v3();                        //BYTECODE_POS: 108 // context 2 could be custom vm or native func
 v3 = 255;                         //BYTECODE_POS: 110 
 v2 *= v3                          //BYTECODE_POS: 112 
 v0 = v1(v2);                      //BYTECODE_POS: 113 // context 0 could be custom vm or native func
 v1 = 255;                         //BYTECODE_POS: 115 
 v0 &= v1;                         //BYTECODE_POS: 117 
 executionStack[9] = v0;           //BYTECODE_POS: 118 // depth = 0
 v0 = String                       //BYTECODE_POS: 121 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.fromCharCode;             //BYTECODE_POS: 123 
 v1 = v0                           //BYTECODE_POS: 125 
 v1 = v1.apply;                    //BYTECODE_POS: 126 
 v2 = null                         //BYTECODE_POS: 128 
 v3 = executionStack[6];           //BYTECODE_POS: 129 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 132 // context 0 could be custom vm or native func
 executionStack[10] = v0;          //BYTECODE_POS: 134 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 137 
 v1 = executionStack[9];           //BYTECODE_POS: 138 depth
 v2 = String                       //BYTECODE_POS: 141 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 143 
 v3 = v3.fromCharCode;             //BYTECODE_POS: 144 
 v4 = executionStack[9];           //BYTECODE_POS: 146 depth
 v2 = v3(v4);                      //BYTECODE_POS: 149 // context 2 could be custom vm or native func
 v3 = executionStack[10];          //BYTECODE_POS: 151 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 154 // context 0 could be custom vm or native func
 executionStack[11] = v0;          //BYTECODE_POS: 156 // depth = 0
 v0 = ""                           //BYTECODE_POS: 159 
 executionStack[12] = v0;          //BYTECODE_POS: 161 // depth = 0
 v0 = executionStack[12];          //BYTECODE_POS: 164 depth
 v1 = String                       //BYTECODE_POS: 167 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 169 
 v2 = v2.fromCharCode;             //BYTECODE_POS: 170 
 v3 = executionStack[2];           //BYTECODE_POS: 172 depth
 v1 = v2(v3);                      //BYTECODE_POS: 175 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 177 
 //get depth of 0 from executionStack//BYTECODE_POS: 178 
 v1 = executionStack;              //BYTECODE_POS: 178 
 v2 = 12                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 181 
 v0 = executionStack[12];          //BYTECODE_POS: 183 depth
 v1 = String                       //BYTECODE_POS: 186 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 188 
 v2 = v2.fromCharCode;             //BYTECODE_POS: 189 
 v3 = executionStack[9];           //BYTECODE_POS: 191 depth
 v1 = v2(v3);                      //BYTECODE_POS: 194 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 196 
 //get depth of 0 from executionStack//BYTECODE_POS: 197 
 v1 = executionStack;              //BYTECODE_POS: 197 
 v2 = 12                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 200 
 v0 = executionStack[12];          //BYTECODE_POS: 202 depth
 v1 = executionStack[11];          //BYTECODE_POS: 205 depth
 v0 += v1                          //BYTECODE_POS: 208 
 //get depth of 0 from executionStack//BYTECODE_POS: 209 
 v1 = executionStack;              //BYTECODE_POS: 209 
 v2 = 12                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 212 
 v0 = undefined                    //BYTECODE_POS: 214 
 v1 = executionStack[4];           //BYTECODE_POS: 215 depth
 v2 = executionStack[12];          //BYTECODE_POS: 218 depth
 v3 = "s1"                         //BYTECODE_POS: 221 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 223 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 225 
}