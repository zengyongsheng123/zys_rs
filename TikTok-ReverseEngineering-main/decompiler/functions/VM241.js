function VM241(arg0, arg1, arg2, arg3, arg4) {
 var v0,v1,v2,v3,v4,v5,v6; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[5];           //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 8 
 v1 = executionStack[2];           //BYTECODE_POS: 9 depth
 v0 = v1();                        //BYTECODE_POS: 12 // context 0 could be custom vm or native func
 v0 = executionStack[5];           //BYTECODE_POS: 15 depth
 v1 = undefined                    //BYTECODE_POS: 18 
 v0 = v0 !== v1;                   //BYTECODE_POS: 19 
 // if (!v0) skip 6 to 27          //BYTECODE_POS: 20 
 v1 = executionStack[5];           //BYTECODE_POS: 22 depth
 v2 = ""                           //BYTECODE_POS: 25 
 v1 = v1 !== v2;                   //BYTECODE_POS: 27 
 // if (!v1) skip to 34            //BYTECODE_POS: 28 
 v1 = ""                           //BYTECODE_POS: 30 
 executionStack[5] = v1;           //BYTECODE_POS: 32 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 35 
 v2 = executionStack[7];           //BYTECODE_POS: 36 depth
 v3 = executionStack[5];           //BYTECODE_POS: 39 depth
 v1 = v2(v3);                      //BYTECODE_POS: 42 // context 1 could be custom vm or native func
 executionStack[7] = v1;           //BYTECODE_POS: 44 // depth = 0
 v1 = executionStack[6];           //BYTECODE_POS: 47 depth
 v1 = !v1                          //BYTECODE_POS: 50 
 // if (!v1) skip to 57            //BYTECODE_POS: 51 
 v1 = "00000000000000000000000000000000"//BYTECODE_POS: 53 
 executionStack[6] = v1;           //BYTECODE_POS: 55 // depth = 0
 v1 = 0;                           //BYTECODE_POS: 58 
 executionStack[8] = v1;           //BYTECODE_POS: 60 // depth = 0
 v1 = 0;                           //BYTECODE_POS: 63 
 executionStack[9] = v1;           //BYTECODE_POS: 65 // depth = 0
 v1 = 8;                           //BYTECODE_POS: 68 
 v2 = 1;                           //BYTECODE_POS: 70 
 v1 += v2                          //BYTECODE_POS: 72 
 executionStack[10] = v1;          //BYTECODE_POS: 73 // depth = 0
 v1 = ArrayBuffer                  //BYTECODE_POS: 76 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[10];          //BYTECODE_POS: 78 depth
 v1 = new v1()                     //BYTECODE_POS: 81 
 executionStack[11] = v1;          //BYTECODE_POS: 83 // depth = 0
 v1 = Uint8Array                   //BYTECODE_POS: 86 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = executionStack[11];          //BYTECODE_POS: 88 depth
 v1 = new v1()                     //BYTECODE_POS: 91 
 executionStack[12] = v1;          //BYTECODE_POS: 93 // depth = 0
 v1 = Math                         //BYTECODE_POS: 96 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 98 
 v2 = v2.floor;                    //BYTECODE_POS: 99 
 v3 = Math                         //BYTECODE_POS: 101 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v3                           //BYTECODE_POS: 103 
 v4 = v4.random;                   //BYTECODE_POS: 104 
 v3 = v4();                        //BYTECODE_POS: 106 // context 3 could be custom vm or native func
 v4 = 100;                         //BYTECODE_POS: 108 
 v3 *= v4                          //BYTECODE_POS: 110 
 v1 = v2(v3);                      //BYTECODE_POS: 111 // context 1 could be custom vm or native func
 v2 = 1;                           //BYTECODE_POS: 113 
 v1 &= v2;                         //BYTECODE_POS: 115 
 executionStack[13] = v1;          //BYTECODE_POS: 116 // depth = 0
 v1 = executionStack[8];           //BYTECODE_POS: 119 depth
 v2 = 7;                           //BYTECODE_POS: 122 
 v1 <<= v2                         //BYTECODE_POS: 124 
 v2 = executionStack[2];           //BYTECODE_POS: 125 depth
 v3 = 6;                           //BYTECODE_POS: 128 
 v2 <<= v3                         //BYTECODE_POS: 130 
 v1 |= v2;                         //BYTECODE_POS: 131 
 v2 = executionStack[3];           //BYTECODE_POS: 132 depth
 v3 = 5;                           //BYTECODE_POS: 135 
 v2 <<= v3                         //BYTECODE_POS: 137 
 v1 |= v2;                         //BYTECODE_POS: 138 
 v2 = executionStack[13];          //BYTECODE_POS: 139 depth
 v3 = 4;                           //BYTECODE_POS: 142 
 v2 <<= v3                         //BYTECODE_POS: 144 
 v1 |= v2;                         //BYTECODE_POS: 145 
 v2 = executionStack[9];           //BYTECODE_POS: 146 depth
 v1 |= v2;                         //BYTECODE_POS: 149 
 executionStack[14] = v1;          //BYTECODE_POS: 150 // depth = 0
 v1 = executionStack[6];           //BYTECODE_POS: 153 depth
 v2 = "bogusIndex"                 //BYTECODE_POS: 156 
 v1 = v1[v2]++                     //BYTECODE_POS: 158 // replace the executionStack var with an index incremented
 v1 = executionStack[6];           //BYTECODE_POS: 160 depth
 v1 = v1.bogusIndex;               //BYTECODE_POS: 163 
 v2 = 63;                          //BYTECODE_POS: 165 
 v1 &= v2;                         //BYTECODE_POS: 167 
 executionStack[15] = v1;          //BYTECODE_POS: 168 // depth = 0
 v1 = executionStack[12];          //BYTECODE_POS: 171 depth
 v2 = executionStack[4];           //BYTECODE_POS: 174 depth
 v3 = 6;                           //BYTECODE_POS: 177 
 v2 <<= v3                         //BYTECODE_POS: 179 
 v3 = executionStack[15];          //BYTECODE_POS: 180 depth
 v2 |= v3;                         //BYTECODE_POS: 183 
 v1.0 = v1;                        //BYTECODE_POS: 184 
 v1 = executionStack[12];          //BYTECODE_POS: 186 depth
 v2 = executionStack[6];           //BYTECODE_POS: 189 depth
 v2 = v2.envcode;                  //BYTECODE_POS: 192 
 v3 = 8;                           //BYTECODE_POS: 194 
 v2 >>= v3                         //BYTECODE_POS: 196 
 v3 = 255;                         //BYTECODE_POS: 197 
 v2 &= v3;                         //BYTECODE_POS: 199 
 v1.1 = v1;                        //BYTECODE_POS: 200 
 v1 = executionStack[12];          //BYTECODE_POS: 202 depth
 v2 = executionStack[6];           //BYTECODE_POS: 205 depth
 v2 = v2.envcode;                  //BYTECODE_POS: 208 
 v3 = 255;                         //BYTECODE_POS: 210 
 v2 &= v3;                         //BYTECODE_POS: 212 
 v1.2 = v1;                        //BYTECODE_POS: 213 
 v1 = executionStack[12];          //BYTECODE_POS: 215 depth
 v2 = executionStack[3];           //BYTECODE_POS: 218 depth
 v2 = v2.ubcode;                   //BYTECODE_POS: 221 
 v1.3 = v1;                        //BYTECODE_POS: 223 
 v1 = executionStack[8];           //BYTECODE_POS: 225 depth
 v2 = v1                           //BYTECODE_POS: 228 
 v2 = v2.decode;                   //BYTECODE_POS: 229 
 v3 = undefined                    //BYTECODE_POS: 231 
 v4 = executionStack[7];           //BYTECODE_POS: 232 depth
 v5 = executionStack[8];           //BYTECODE_POS: 235 depth
 v6 = v5                           //BYTECODE_POS: 238 
 v6 = v6.decode;                   //BYTECODE_POS: 239 
 v7 = executionStack[7];           //BYTECODE_POS: 241 depth
 v5 = v6(v7);                      //BYTECODE_POS: 244 // context 5 could be custom vm or native func
 v3 = v4(v5);                      //BYTECODE_POS: 246 // context 3 could be custom vm or native func
 v1 = v2(v3);                      //BYTECODE_POS: 248 // context 1 could be custom vm or native func
 executionStack[16] = v1;          //BYTECODE_POS: 250 // depth = 0
 v1 = executionStack[12];          //BYTECODE_POS: 253 depth
 v2 = executionStack[16];          //BYTECODE_POS: 256 depth
 v2 = v2[14];                      //BYTECODE_POS: 259 
 v1.4 = v1;                        //BYTECODE_POS: 261 
 v1 = executionStack[12];          //BYTECODE_POS: 263 depth
 v2 = executionStack[16];          //BYTECODE_POS: 266 depth
 v2 = v2[15];                      //BYTECODE_POS: 269 
 v1.5 = v1;                        //BYTECODE_POS: 271 
 v1 = executionStack[8];           //BYTECODE_POS: 273 depth
 v2 = v1                           //BYTECODE_POS: 276 
 v2 = v2.decode;                   //BYTECODE_POS: 277 
 v3 = undefined                    //BYTECODE_POS: 279 
 v4 = executionStack[7];           //BYTECODE_POS: 280 depth
 v5 = executionStack[8];           //BYTECODE_POS: 283 depth
 v6 = v5                           //BYTECODE_POS: 286 
 v6 = v6.decode;                   //BYTECODE_POS: 287 
 v7 = executionStack[6];           //BYTECODE_POS: 289 depth
 v5 = v6(v7);                      //BYTECODE_POS: 292 // context 5 could be custom vm or native func
 v3 = v4(v5);                      //BYTECODE_POS: 294 // context 3 could be custom vm or native func
 v1 = v2(v3);                      //BYTECODE_POS: 296 // context 1 could be custom vm or native func
 executionStack[17] = v1;          //BYTECODE_POS: 298 // depth = 0
 v1 = executionStack[12];          //BYTECODE_POS: 301 depth
 v2 = executionStack[17];          //BYTECODE_POS: 304 depth
 v2 = v2[14];                      //BYTECODE_POS: 307 
 v1.6 = v1;                        //BYTECODE_POS: 309 
 v1 = executionStack[12];          //BYTECODE_POS: 311 depth
 v2 = executionStack[17];          //BYTECODE_POS: 314 depth
 v2 = v2[15];                      //BYTECODE_POS: 317 
 v1.7 = v1;                        //BYTECODE_POS: 319 
 v1 = executionStack[12];          //BYTECODE_POS: 321 depth
 v2 = Math                         //BYTECODE_POS: 324 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 326 
 v3 = v3.floor;                    //BYTECODE_POS: 327 
 v4 = Math                         //BYTECODE_POS: 329 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 331 
 v5 = v5.random;                   //BYTECODE_POS: 332 
 v4 = v5();                        //BYTECODE_POS: 334 // context 4 could be custom vm or native func
 v5 = 255;                         //BYTECODE_POS: 336 
 v4 *= v5                          //BYTECODE_POS: 338 
 v2 = v3(v4);                      //BYTECODE_POS: 339 // context 2 could be custom vm or native func
 v3 = 255;                         //BYTECODE_POS: 341 
 v2 &= v3;                         //BYTECODE_POS: 343 
 v1.8 = v1;                        //BYTECODE_POS: 344 
 v1 = undefined                    //BYTECODE_POS: 346 
 v2 = executionStack[2];           //BYTECODE_POS: 347 depth
 v3 = executionStack[14];          //BYTECODE_POS: 350 depth
 v4 = executionStack[12];          //BYTECODE_POS: 353 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 356 // context 1 could be custom vm or native func
 //return v1;                      //BYTECODE_POS: 358 
}