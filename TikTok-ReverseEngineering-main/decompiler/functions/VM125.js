function VM125() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[11];          //BYTECODE_POS: 6 depth
 v0 = !v0                          //BYTECODE_POS: 9 
 // if (!v0) skip to 13            //BYTECODE_POS: 10 
 v0 = undefined                    //BYTECODE_POS: 12 
 //return v0;                      //BYTECODE_POS: 13 
 v0 = undefined                    //BYTECODE_POS: 14 
 v1 = executionStack[14];          //BYTECODE_POS: 15 depth
 v2 = executionStack[5];           //BYTECODE_POS: 18 depth
 v3 = 2;                           //BYTECODE_POS: 21 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 23 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 25 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 28 
 v1 = executionStack[14];          //BYTECODE_POS: 29 depth
 v2 = executionStack[7];           //BYTECODE_POS: 32 depth
 v3 = 5;                           //BYTECODE_POS: 35 
 v4 = true                         //BYTECODE_POS: 37 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 38 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 40 // depth = 0
 v0 = 1;                           //BYTECODE_POS: 43 
 executionStack[5] = v0;           //BYTECODE_POS: 45 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 48 depth
 v0 = !v0                          //BYTECODE_POS: 51 
 // if (!v0) skip 3 to 56          //BYTECODE_POS: 52 
 v1 = executionStack[3];           //BYTECODE_POS: 54 depth
 // if (!v1) skip to 83            //BYTECODE_POS: 57 
 v1 = executionStack[5];           //BYTECODE_POS: 59 depth
 v2 = 64;                          //BYTECODE_POS: 62 
 v1 |= v2;                         //BYTECODE_POS: 64 
 //get depth of 0 from executionStack//BYTECODE_POS: 65 
 v2 = executionStack;              //BYTECODE_POS: 65 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 68 
 v1 = executionStack[2];           //BYTECODE_POS: 70 depth
 v2 = executionStack[2];           //BYTECODE_POS: 73 depth
 v2 = v2.kFakeOperations;          //BYTECODE_POS: 76 
 v1 |= v2;                         //BYTECODE_POS: 78 
 //get depth of 0 from executionStack//BYTECODE_POS: 79 
 v2 = executionStack;              //BYTECODE_POS: 79 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 82 
 v1 = executionStack[0];           //BYTECODE_POS: 84 depth
 v1 = v1.isTrusted;                //BYTECODE_POS: 87 
 v2 = 1;                           //BYTECODE_POS: 89 
 v1 = v1 != v2;                    //BYTECODE_POS: 91 
 // if (!v1) skip to 118           //BYTECODE_POS: 92 
 v1 = executionStack[5];           //BYTECODE_POS: 94 depth
 v2 = 128;                         //BYTECODE_POS: 97 
 v1 |= v2;                         //BYTECODE_POS: 99 
 //get depth of 0 from executionStack//BYTECODE_POS: 100 
 v2 = executionStack;              //BYTECODE_POS: 100 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 103 
 v1 = executionStack[2];           //BYTECODE_POS: 105 depth
 v2 = executionStack[2];           //BYTECODE_POS: 108 depth
 v2 = v2.kUntrusted;               //BYTECODE_POS: 111 
 v1 |= v2;                         //BYTECODE_POS: 113 
 //get depth of 0 from executionStack//BYTECODE_POS: 114 
 v2 = executionStack;              //BYTECODE_POS: 114 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 117 
 v1 = executionStack[5];           //BYTECODE_POS: 119 depth
 v1 = v1.length;                   //BYTECODE_POS: 122 
 v2 = 0;                           //BYTECODE_POS: 124 
 v1 = v1 === v2                    //BYTECODE_POS: 126 
 // if (!v1) skip to 155           //BYTECODE_POS: 127 
 v1 = executionStack[5];           //BYTECODE_POS: 129 depth
 v2 = 2;                           //BYTECODE_POS: 132 
 v1 |= v2;                         //BYTECODE_POS: 134 
 //get depth of 0 from executionStack//BYTECODE_POS: 135 
 v2 = executionStack;              //BYTECODE_POS: 135 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 138 
 v1 = executionStack[2];           //BYTECODE_POS: 140 depth
 v2 = executionStack[2];           //BYTECODE_POS: 143 depth
 v2 = v2.kNoMove;                  //BYTECODE_POS: 146 
 v1 |= v2;                         //BYTECODE_POS: 148 
 //get depth of 0 from executionStack//BYTECODE_POS: 149 
 v2 = executionStack;              //BYTECODE_POS: 149 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 152 
 // go foward to 190               //BYTECODE_POS: 154 
 v1 = executionStack[3];           //BYTECODE_POS: 156 depth
 v1 = v1[0];                       //BYTECODE_POS: 159 
 v2 = 50;                          //BYTECODE_POS: 161 
 v1 = v1 > v2                      //BYTECODE_POS: 163 
 // if (!v1) skip to 190           //BYTECODE_POS: 164 
 v1 = executionStack[5];           //BYTECODE_POS: 166 depth
 v2 = 16;                          //BYTECODE_POS: 169 
 v1 |= v2;                         //BYTECODE_POS: 171 
 //get depth of 0 from executionStack//BYTECODE_POS: 172 
 v2 = executionStack;              //BYTECODE_POS: 172 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 175 
 v1 = executionStack[2];           //BYTECODE_POS: 177 depth
 v2 = executionStack[2];           //BYTECODE_POS: 180 depth
 v2 = v2.kMoveFast;                //BYTECODE_POS: 183 
 v1 |= v2;                         //BYTECODE_POS: 185 
 //get depth of 0 from executionStack//BYTECODE_POS: 186 
 v2 = executionStack;              //BYTECODE_POS: 186 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 189 
 v1 = executionStack[6];           //BYTECODE_POS: 191 depth
 v1 = v1.length;                   //BYTECODE_POS: 194 
 v2 = 0;                           //BYTECODE_POS: 196 
 v1 = v1 === v2                    //BYTECODE_POS: 198 
 // if (!v1) skip to 225           //BYTECODE_POS: 199 
 v1 = executionStack[5];           //BYTECODE_POS: 201 depth
 v2 = 4;                           //BYTECODE_POS: 204 
 v1 |= v2;                         //BYTECODE_POS: 206 
 //get depth of 0 from executionStack//BYTECODE_POS: 207 
 v2 = executionStack;              //BYTECODE_POS: 207 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 210 
 v1 = executionStack[2];           //BYTECODE_POS: 212 depth
 v2 = executionStack[2];           //BYTECODE_POS: 215 depth
 v2 = v2.kNoClickTouch;            //BYTECODE_POS: 218 
 v1 |= v2;                         //BYTECODE_POS: 220 
 //get depth of 0 from executionStack//BYTECODE_POS: 221 
 v2 = executionStack;              //BYTECODE_POS: 221 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 224 
 v1 = executionStack[7];           //BYTECODE_POS: 226 depth
 v1 = v1.length;                   //BYTECODE_POS: 229 
 v2 = 0;                           //BYTECODE_POS: 231 
 v1 = v1 === v2                    //BYTECODE_POS: 233 
 // if (!v1) skip to 262           //BYTECODE_POS: 234 
 v1 = executionStack[5];           //BYTECODE_POS: 236 depth
 v2 = 8;                           //BYTECODE_POS: 239 
 v1 |= v2;                         //BYTECODE_POS: 241 
 //get depth of 0 from executionStack//BYTECODE_POS: 242 
 v2 = executionStack;              //BYTECODE_POS: 242 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 245 
 v1 = executionStack[2];           //BYTECODE_POS: 247 depth
 v2 = executionStack[2];           //BYTECODE_POS: 250 depth
 v2 = v2.kNoKeyboardEvent;         //BYTECODE_POS: 253 
 v1 |= v2;                         //BYTECODE_POS: 255 
 //get depth of 0 from executionStack//BYTECODE_POS: 256 
 v2 = executionStack;              //BYTECODE_POS: 256 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 259 
 // go foward to 297               //BYTECODE_POS: 261 
 v1 = executionStack[4];           //BYTECODE_POS: 263 depth
 v1 = v1[0];                       //BYTECODE_POS: 266 
 v2 = +0.5                         //BYTECODE_POS: 268 
 v1 = v1 > v2                      //BYTECODE_POS: 270 
 // if (!v1) skip to 297           //BYTECODE_POS: 271 
 v1 = executionStack[5];           //BYTECODE_POS: 273 depth
 v2 = 32;                          //BYTECODE_POS: 276 
 v1 |= v2;                         //BYTECODE_POS: 278 
 //get depth of 0 from executionStack//BYTECODE_POS: 279 
 v2 = executionStack;              //BYTECODE_POS: 279 
 v3 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 282 
 v1 = executionStack[2];           //BYTECODE_POS: 284 depth
 v2 = executionStack[2];           //BYTECODE_POS: 287 depth
 v2 = v2.kKeyboardFast;            //BYTECODE_POS: 290 
 v1 |= v2;                         //BYTECODE_POS: 292 
 //get depth of 0 from executionStack//BYTECODE_POS: 293 
 v2 = executionStack;              //BYTECODE_POS: 293 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 296 
 v1 = executionStack[5];           //BYTECODE_POS: 298 depth
 v2 = executionStack[2];           //BYTECODE_POS: 301 depth
 v1.ubcode = v1;                   //BYTECODE_POS: 304 
 v1 = executionStack[5];           //BYTECODE_POS: 306 depth
 v2 = v1                           //BYTECODE_POS: 309 
 v2 = v2.toString;                 //BYTECODE_POS: 310 
 v3 = 32;                          //BYTECODE_POS: 312 
 v1 = v2(v3);                      //BYTECODE_POS: 314 // context 1 could be custom vm or native func
 executionStack[6] = v1;           //BYTECODE_POS: 316 // depth = 0
 v1 = executionStack[6];           //BYTECODE_POS: 319 depth
 v1 = v1.length;                   //BYTECODE_POS: 322 
 v2 = 1;                           //BYTECODE_POS: 324 
 v1 = v1 === v2                    //BYTECODE_POS: 326 
 // if (!v1) skip to 339           //BYTECODE_POS: 327 
 v1 = "00"                         //BYTECODE_POS: 329 
 v2 = executionStack[6];           //BYTECODE_POS: 331 depth
 v1 += v2                          //BYTECODE_POS: 334 
 executionStack[6] = v1;           //BYTECODE_POS: 335 // depth = 0
 // go foward to 358               //BYTECODE_POS: 338 
 v1 = executionStack[6];           //BYTECODE_POS: 340 depth
 v1 = v1.length;                   //BYTECODE_POS: 343 
 v2 = 2;                           //BYTECODE_POS: 345 
 v1 = v1 === v2                    //BYTECODE_POS: 347 
 // if (!v1) skip to 358           //BYTECODE_POS: 348 
 v1 = "0"                          //BYTECODE_POS: 350 
 v2 = executionStack[6];           //BYTECODE_POS: 352 depth
 v1 += v2                          //BYTECODE_POS: 355 
 executionStack[6] = v1;           //BYTECODE_POS: 356 // depth = 0
 v1 = executionStack[6];           //BYTECODE_POS: 359 depth
 //return v1;                      //BYTECODE_POS: 362 
}