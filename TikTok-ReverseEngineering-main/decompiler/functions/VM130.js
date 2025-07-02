function VM130(arg0, arg1) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 executionStack[4] = v0;           //BYTECODE_POS: 4 // depth = 0
 v0 = String                       //BYTECODE_POS: 7 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.fromCharCode;             //BYTECODE_POS: 9 
 v1 = v0                           //BYTECODE_POS: 11 
 v1 = v1.apply;                    //BYTECODE_POS: 12 
 v2 = null                         //BYTECODE_POS: 14 
 v3 = undefined                    //BYTECODE_POS: 15 
 v4 = executionStack[3];           //BYTECODE_POS: 16 depth
 v5 = executionStack[2];           //BYTECODE_POS: 19 depth
 v3 = v4(v5);                      //BYTECODE_POS: 22 // context 3 could be custom vm or native func
 v0 = v1(v2,v3);                   //BYTECODE_POS: 24 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 26 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 29 depth
 v0 = v0.length;                   //BYTECODE_POS: 32 
 v1 = executionStack[2];           //BYTECODE_POS: 34 depth
 v1 = v1.length;                   //BYTECODE_POS: 37 
 v0 = v0 < v1;                     //BYTECODE_POS: 39 
 // if (!v0) skip to 53            //BYTECODE_POS: 40 
 v0 = executionStack[3];           //BYTECODE_POS: 42 depth
 executionStack[4] = v0;           //BYTECODE_POS: 45 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 48 depth
 executionStack[2] = v0;           //BYTECODE_POS: 51 // depth = 0
 v0 = String                       //BYTECODE_POS: 54 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 56 
 v1 = v1.fromCharCode;             //BYTECODE_POS: 57 
 v2 = 255;                         //BYTECODE_POS: 59 
 v3 = executionStack[3];           //BYTECODE_POS: 61 depth
 v4 = 6;                           //BYTECODE_POS: 64 
 v3 <<= v4                         //BYTECODE_POS: 66 
 v4 = executionStack[4];           //BYTECODE_POS: 67 depth
 v5 = 3;                           //BYTECODE_POS: 70 
 v4 <<= v5                         //BYTECODE_POS: 72 
 v3 |= v4;                         //BYTECODE_POS: 73 
 v4 = executionStack[4];           //BYTECODE_POS: 74 depth
 v3 |= v4;                         //BYTECODE_POS: 77 
 v2 &= v3;                         //BYTECODE_POS: 78 
 v0 = v1(v2);                      //BYTECODE_POS: 79 // context 0 could be custom vm or native func
 executionStack[6] = v0;           //BYTECODE_POS: 81 // depth = 0
 v0 = []                           //BYTECODE_POS: 84 
 executionStack[7] = v0;           //BYTECODE_POS: 86 // depth = 0
 v0 = []                           //BYTECODE_POS: 89 
 executionStack[8] = v0;           //BYTECODE_POS: 91 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 94 
 executionStack[9] = v0;           //BYTECODE_POS: 96 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 99 
 executionStack[10] = v0;          //BYTECODE_POS: 101 // depth = 0
 v0 = executionStack[10];          //BYTECODE_POS: 104 depth
 v1 = 12;                          //BYTECODE_POS: 107 
 v0 = v0 < v1;                     //BYTECODE_POS: 109 
 // if (!v0) skip to 216           //BYTECODE_POS: 110 
 v0 = Math                         //BYTECODE_POS: 112 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 114 
 v1 = v1.floor;                    //BYTECODE_POS: 115 
 v2 = executionStack[4];           //BYTECODE_POS: 117 depth
 v3 = v2                           //BYTECODE_POS: 120 
 v3 = v3.rand;                     //BYTECODE_POS: 121 
 v2 = v3();                        //BYTECODE_POS: 123 // context 2 could be custom vm or native func
 v3 = Math                         //BYTECODE_POS: 125 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v3                           //BYTECODE_POS: 127 
 v4 = v4.pow;                      //BYTECODE_POS: 128 
 v5 = 2;                           //BYTECODE_POS: 130 
 v6 = 32;                          //BYTECODE_POS: 132 
 v3 = v4(v5,v6);                   //BYTECODE_POS: 134 // context 3 could be custom vm or native func
 v2 *= v3                          //BYTECODE_POS: 136 
 v0 = v1(v2);                      //BYTECODE_POS: 137 // context 0 could be custom vm or native func
 executionStack[11] = v0;          //BYTECODE_POS: 139 // depth = 0
 v0 = executionStack[7];           //BYTECODE_POS: 142 depth
 v1 = executionStack[10];          //BYTECODE_POS: 145 depth
 v2 = executionStack[11];          //BYTECODE_POS: 148 depth
 v0[v1] = v2;                      //BYTECODE_POS: 151 
 v0 = executionStack[11];          //BYTECODE_POS: 152 depth
 v1 = 15;                          //BYTECODE_POS: 155 
 v0 &= v1;                         //BYTECODE_POS: 157 
 v1 = executionStack[9];           //BYTECODE_POS: 158 depth
 v0 += v1                          //BYTECODE_POS: 161 
 v1 = 15;                          //BYTECODE_POS: 162 
 v0 &= v1;                         //BYTECODE_POS: 164 
 executionStack[9] = v0;           //BYTECODE_POS: 165 // depth = 0
 v0 = executionStack[8];           //BYTECODE_POS: 168 depth
 v1 = v0                           //BYTECODE_POS: 171 
 v1 = v1.push;                     //BYTECODE_POS: 172 
 v2 = executionStack[11];          //BYTECODE_POS: 174 depth
 v3 = 255;                         //BYTECODE_POS: 177 
 v2 &= v3;                         //BYTECODE_POS: 179 
 v3 = executionStack[11];          //BYTECODE_POS: 180 depth
 v4 = 8;                           //BYTECODE_POS: 183 
 v3 >>>= v4;                       //BYTECODE_POS: 185 
 v4 = 255;                         //BYTECODE_POS: 186 
 v3 &= v4;                         //BYTECODE_POS: 188 
 v4 = executionStack[11];          //BYTECODE_POS: 189 depth
 v5 = 16;                          //BYTECODE_POS: 192 
 v4 >>>= v5;                       //BYTECODE_POS: 194 
 v5 = 255;                         //BYTECODE_POS: 195 
 v4 &= v5;                         //BYTECODE_POS: 197 
 v5 = executionStack[11];          //BYTECODE_POS: 198 depth
 v6 = 24;                          //BYTECODE_POS: 201 
 v5 >>>= v6;                       //BYTECODE_POS: 203 
 v6 = 255;                         //BYTECODE_POS: 204 
 v5 &= v6;                         //BYTECODE_POS: 206 
 v0 = v1(v2,v3,v4,v5);             //BYTECODE_POS: 207 // context 0 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 210 
 v0 = executionStack;              //BYTECODE_POS: 210 
 v1 = 10                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v0[v-1]);                      //BYTECODE_POS: 213 
 // go back to 103                 //BYTECODE_POS: 215 
 v0 = executionStack[9];           //BYTECODE_POS: 217 depth
 v1 = 5;                           //BYTECODE_POS: 220 
 v0 += v1                          //BYTECODE_POS: 222 
 //get depth of 0 from executionStack//BYTECODE_POS: 223 
 v1 = executionStack;              //BYTECODE_POS: 223 
 v2 = 9                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 226 
 v0 = undefined                    //BYTECODE_POS: 228 
 v1 = executionStack[5];           //BYTECODE_POS: 229 depth
 v2 = executionStack[7];           //BYTECODE_POS: 232 depth
 v3 = executionStack[9];           //BYTECODE_POS: 235 depth
 v4 = executionStack[2];           //BYTECODE_POS: 238 depth
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 241 // context 0 could be custom vm or native func
 executionStack[12] = v0;          //BYTECODE_POS: 243 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 246 
 executionStack[13] = v0;          //BYTECODE_POS: 248 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 251 
 executionStack[14] = v0;          //BYTECODE_POS: 253 // depth = 0
 v0 = executionStack[14];          //BYTECODE_POS: 256 depth
 v1 = executionStack[8];           //BYTECODE_POS: 259 depth
 v1 = v1.length;                   //BYTECODE_POS: 262 
 v0 = v0 < v1;                     //BYTECODE_POS: 264 
 // if (!v0) skip to 296           //BYTECODE_POS: 265 
 v0 = executionStack[13];          //BYTECODE_POS: 267 depth
 v1 = executionStack[8];           //BYTECODE_POS: 270 depth
 v2 = executionStack[14];          //BYTECODE_POS: 273 depth
 v1 = v1[v2]                       //BYTECODE_POS: 276 
 v0 += v1                          //BYTECODE_POS: 277 
 v1 = executionStack[12];          //BYTECODE_POS: 278 depth
 v1 = v1.length;                   //BYTECODE_POS: 281 
 v2 = 1;                           //BYTECODE_POS: 283 
 v1 += v2                          //BYTECODE_POS: 285 
 v0 %= v1                          //BYTECODE_POS: 286 
 executionStack[13] = v0;          //BYTECODE_POS: 287 // depth = 0
 //get depth of 0 from executionStack//BYTECODE_POS: 290 
 v0 = executionStack;              //BYTECODE_POS: 290 
 v1 = 14                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v0[v-1]);                      //BYTECODE_POS: 293 
 // go back to 255                 //BYTECODE_POS: 295 
 v0 = 0;                           //BYTECODE_POS: 297 
 executionStack[15] = v0;          //BYTECODE_POS: 299 // depth = 0
 v0 = executionStack[15];          //BYTECODE_POS: 302 depth
 v1 = executionStack[12];          //BYTECODE_POS: 305 depth
 v1 = v1.length;                   //BYTECODE_POS: 308 
 v0 = v0 < v1;                     //BYTECODE_POS: 310 
 // if (!v0) skip to 346           //BYTECODE_POS: 311 
 v0 = executionStack[13];          //BYTECODE_POS: 313 depth
 v1 = executionStack[12];          //BYTECODE_POS: 316 depth
 v2 = v1                           //BYTECODE_POS: 319 
 v2 = v2.charCodeAt;               //BYTECODE_POS: 320 
 v3 = executionStack[15];          //BYTECODE_POS: 322 depth
 v1 = v2(v3);                      //BYTECODE_POS: 325 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 327 
 v1 = executionStack[12];          //BYTECODE_POS: 328 depth
 v1 = v1.length;                   //BYTECODE_POS: 331 
 v2 = 1;                           //BYTECODE_POS: 333 
 v1 += v2                          //BYTECODE_POS: 335 
 v0 %= v1                          //BYTECODE_POS: 336 
 executionStack[13] = v0;          //BYTECODE_POS: 337 // depth = 0
 //get depth of 0 from executionStack//BYTECODE_POS: 340 
 v0 = executionStack;              //BYTECODE_POS: 340 
 v1 = 15                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v0[v-1]);                      //BYTECODE_POS: 343 
 // go back to 301                 //BYTECODE_POS: 345 
 v0 = executionStack[6];           //BYTECODE_POS: 347 depth
 v1 = executionStack[12];          //BYTECODE_POS: 350 depth
 v2 = v1                           //BYTECODE_POS: 353 
 v2 = v2.substring;                //BYTECODE_POS: 354 
 v3 = 0;                           //BYTECODE_POS: 356 
 v4 = executionStack[13];          //BYTECODE_POS: 358 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 361 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 363 
 v1 = String                       //BYTECODE_POS: 364 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.fromCharCode;             //BYTECODE_POS: 366 
 v2 = v1                           //BYTECODE_POS: 368 
 v2 = v2.apply;                    //BYTECODE_POS: 369 
 v3 = String                       //BYTECODE_POS: 371 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = executionStack[8];           //BYTECODE_POS: 373 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 376 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 378 
 v1 = executionStack[12];          //BYTECODE_POS: 379 depth
 v2 = v1                           //BYTECODE_POS: 382 
 v2 = v2.substring;                //BYTECODE_POS: 383 
 v3 = executionStack[13];          //BYTECODE_POS: 385 depth
 v1 = v2(v3);                      //BYTECODE_POS: 388 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 390 
 executionStack[16] = v0;          //BYTECODE_POS: 391 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 394 
 v1 = arguments;                   //BYTECODE_POS: 395 depth
 v2 = executionStack[16];          //BYTECODE_POS: 398 depth
 v3 = "s1"                         //BYTECODE_POS: 401 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 403 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 405 
}