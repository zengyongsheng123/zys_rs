function VM228(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = []                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 6 
 v1 = executionStack[2];           //BYTECODE_POS: 7 depth
 v2 = executionStack[3];           //BYTECODE_POS: 10 depth
 v0 = v1(v2);                      //BYTECODE_POS: 13 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 15 // depth = 0
 v0 = Object                       //BYTECODE_POS: 18 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 20 
 v1 = v1.create;                   //BYTECODE_POS: 21 
 v2 = null                         //BYTECODE_POS: 23 
 v0 = v1(v2);                      //BYTECODE_POS: 24 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 26 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 29 
 executionStack[6] = v0;           //BYTECODE_POS: 31 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 34 depth
 v1 = 256;                         //BYTECODE_POS: 37 
 v0 = v0 < v1;                     //BYTECODE_POS: 39 
 // if (!v0) skip to 65            //BYTECODE_POS: 40 
 v0 = executionStack[5];           //BYTECODE_POS: 42 depth
 v1 = String                       //BYTECODE_POS: 45 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 47 
 v2 = v2.fromCharCode;             //BYTECODE_POS: 48 
 v3 = executionStack[6];           //BYTECODE_POS: 50 depth
 v1 = v2(v3);                      //BYTECODE_POS: 53 // context 1 could be custom vm or native func
 v2 = executionStack[6];           //BYTECODE_POS: 55 depth
 v0[v1] = v2;                      //BYTECODE_POS: 58 
 //get depth of 0 from executionStack//BYTECODE_POS: 59 
 v0 = executionStack;              //BYTECODE_POS: 59 
 v1 = 6                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v0[v-1]);                      //BYTECODE_POS: 62 
 // go back to 33                  //BYTECODE_POS: 64 
 v0 = 8;                           //BYTECODE_POS: 66 
 executionStack[7] = v0;           //BYTECODE_POS: 68 // depth = 0
 v0 = 255;                         //BYTECODE_POS: 71 
 executionStack[8] = v0;           //BYTECODE_POS: 73 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 76 
 executionStack[9] = v0;           //BYTECODE_POS: 78 // depth = 0
 v0 = executionStack[9];           //BYTECODE_POS: 81 depth
 v1 = executionStack[2];           //BYTECODE_POS: 84 depth
 v1 = v1.length;                   //BYTECODE_POS: 87 
 v0 = v0 < v1;                     //BYTECODE_POS: 89 
 // if (!v0) skip to 249           //BYTECODE_POS: 90 
 v0 = executionStack[2];           //BYTECODE_POS: 92 depth
 v1 = executionStack[9];           //BYTECODE_POS: 95 depth
 v0 = v0[v1]                       //BYTECODE_POS: 98 
 executionStack[10] = v0;          //BYTECODE_POS: 99 // depth = 0
 v0 = executionStack[9];           //BYTECODE_POS: 102 depth
 v1 = 1;                           //BYTECODE_POS: 105 
 v0 += v1                          //BYTECODE_POS: 107 
 v1 = executionStack[2];           //BYTECODE_POS: 108 depth
 v1 = v1.length;                   //BYTECODE_POS: 111 
 v0 = v0 < v1;                     //BYTECODE_POS: 113 
 // if (!v0) skip 18 to 133        //BYTECODE_POS: 114 
 v1 = executionStack[5];           //BYTECODE_POS: 116 depth
 v2 = executionStack[10];          //BYTECODE_POS: 119 depth
 v3 = executionStack[2];           //BYTECODE_POS: 122 depth
 v4 = executionStack[9];           //BYTECODE_POS: 125 depth
 v5 = 1;                           //BYTECODE_POS: 128 
 v4 += v5                          //BYTECODE_POS: 130 
 v3 = v3[v4]                       //BYTECODE_POS: 131 
 v2 += v3                          //BYTECODE_POS: 132 
 v1 = v1[v2]                       //BYTECODE_POS: 133 
 // if (!v1) skip to 161           //BYTECODE_POS: 134 
 v1 = executionStack[10];          //BYTECODE_POS: 136 depth
 v2 = executionStack[2];           //BYTECODE_POS: 139 depth
 v3 = executionStack[9];           //BYTECODE_POS: 142 depth
 v4 = 1;                           //BYTECODE_POS: 145 
 v3 += v4                          //BYTECODE_POS: 147 
 v2 = v2[v3]                       //BYTECODE_POS: 148 
 v1 += v2                          //BYTECODE_POS: 149 
 //get depth of 0 from executionStack//BYTECODE_POS: 150 
 v2 = executionStack;              //BYTECODE_POS: 150 
 v3 = 10                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 153 
 //get depth of 0 from executionStack//BYTECODE_POS: 155 
 v1 = executionStack;              //BYTECODE_POS: 155 
 v2 = 9                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v1[v0]);                       //BYTECODE_POS: 158 
 // go back to 101                 //BYTECODE_POS: 160 
 v1 = executionStack[4];           //BYTECODE_POS: 162 depth
 v2 = v1                           //BYTECODE_POS: 165 
 v2 = v2.write;                    //BYTECODE_POS: 166 
 v3 = executionStack[5];           //BYTECODE_POS: 168 depth
 v4 = executionStack[10];          //BYTECODE_POS: 171 depth
 v3 = v3[v4]                       //BYTECODE_POS: 174 
 v4 = executionStack[7];           //BYTECODE_POS: 175 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 178 // context 1 could be custom vm or native func
 v1 = executionStack[9];           //BYTECODE_POS: 181 depth
 v2 = 1;                           //BYTECODE_POS: 184 
 v1 += v2                          //BYTECODE_POS: 186 
 v2 = executionStack[2];           //BYTECODE_POS: 187 depth
 v2 = v2.length;                   //BYTECODE_POS: 190 
 v1 = v1 == v2;                    //BYTECODE_POS: 192 
 // if (!v1) skip to 196           //BYTECODE_POS: 193 
 // go foward to 249               //BYTECODE_POS: 195 
 //get depth of 0 from executionStack//BYTECODE_POS: 197 
 v1 = executionStack;              //BYTECODE_POS: 197 
 v2 = 8                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v1[v0]);                       //BYTECODE_POS: 200 
 v1 = executionStack[8];           //BYTECODE_POS: 202 depth
 v2 = executionStack[8];           //BYTECODE_POS: 205 depth
 v3 = 1;                           //BYTECODE_POS: 208 
 v2 -= v3;                         //BYTECODE_POS: 210 
 v1 &= v2;                         //BYTECODE_POS: 211 
 v2 = 0;                           //BYTECODE_POS: 212 
 v1 = v1 == v2;                    //BYTECODE_POS: 214 
 // if (!v1) skip to 221           //BYTECODE_POS: 215 
 //get depth of 0 from executionStack//BYTECODE_POS: 217 
 v1 = executionStack;              //BYTECODE_POS: 217 
 v2 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v1[v0]);                       //BYTECODE_POS: 220 
 v1 = executionStack[5];           //BYTECODE_POS: 222 depth
 v2 = executionStack[10];          //BYTECODE_POS: 225 depth
 v3 = executionStack[2];           //BYTECODE_POS: 228 depth
 v4 = executionStack[9];           //BYTECODE_POS: 231 depth
 v5 = 1;                           //BYTECODE_POS: 234 
 v4 += v5                          //BYTECODE_POS: 236 
 v3 = v3[v4]                       //BYTECODE_POS: 237 
 v2 += v3                          //BYTECODE_POS: 238 
 v3 = executionStack[8];           //BYTECODE_POS: 239 depth
 v1[v2] = v3;                      //BYTECODE_POS: 242 
 //get depth of 0 from executionStack//BYTECODE_POS: 243 
 v1 = executionStack;              //BYTECODE_POS: 243 
 v2 = 9                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v1[v0]);                       //BYTECODE_POS: 246 
 // go back to 80                  //BYTECODE_POS: 248 
 v1 = executionStack[4];           //BYTECODE_POS: 250 depth
 v2 = v1                           //BYTECODE_POS: 253 
 v2 = v2.finalize;                 //BYTECODE_POS: 254 
 v1 = v2();                        //BYTECODE_POS: 256 // context 1 could be custom vm or native func
 v1 = executionStack[3];           //BYTECODE_POS: 259 depth
 //return v1;                      //BYTECODE_POS: 262 
}