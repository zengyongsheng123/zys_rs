function VM154(arg0) {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = []                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 6 depth
 v1 = v0                           //BYTECODE_POS: 9 
 v1 = v1.push;                     //BYTECODE_POS: 10 
 v2 = {};                          //BYTECODE_POS: 12 
 v3 = "object"                     //BYTECODE_POS: 13 
 v2.type = v3;                     //BYTECODE_POS: 15 
 v3 = executionStack[2];           //BYTECODE_POS: 17 depth
 v2.obj = v3;                      //BYTECODE_POS: 20 
 v0 = v1(v2);                      //BYTECODE_POS: 22 // context 0 could be custom vm or native func
 v0 = ""                           //BYTECODE_POS: 25 
 executionStack[4] = v0;           //BYTECODE_POS: 27 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 30 depth
 v0 = v0.length;                   //BYTECODE_POS: 33 
 v1 = 0;                           //BYTECODE_POS: 35 
 v0 = v0 > v1                      //BYTECODE_POS: 37 
 // if (!v0) skip to 533           //BYTECODE_POS: 38 
 v0 = executionStack[3];           //BYTECODE_POS: 40 depth
 v1 = v0                           //BYTECODE_POS: 43 
 v1 = v1.pop;                      //BYTECODE_POS: 44 
 v0 = v1();                        //BYTECODE_POS: 46 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 48 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 51 depth
 v0 = v0.obj;                      //BYTECODE_POS: 54 
 executionStack[6] = v0;           //BYTECODE_POS: 56 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 59 depth
 v0 = v0.type;                     //BYTECODE_POS: 62 
 v1 = "value"                      //BYTECODE_POS: 64 
 v0 = v0 == v1;                    //BYTECODE_POS: 66 
 // if (!v0) skip to 82            //BYTECODE_POS: 67 
 v0 = executionStack[4];           //BYTECODE_POS: 69 depth
 v1 = executionStack[6];           //BYTECODE_POS: 72 depth
 v0 += v1                          //BYTECODE_POS: 75 
 //get depth of 0 from executionStack//BYTECODE_POS: 76 
 v1 = executionStack;              //BYTECODE_POS: 76 
 v2 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 79 
 // go back to 29                  //BYTECODE_POS: 81 
 v0 = executionStack[4];           //BYTECODE_POS: 83 depth
 v1 = executionStack[5];           //BYTECODE_POS: 86 depth
 v1 = v1.prefix;                   //BYTECODE_POS: 89 
 // if (v1) skip 2                 //BYTECODE_POS: 91 
 v2 = ""                           //BYTECODE_POS: 93 
 v1 += v2                          //BYTECODE_POS: 95 
 //get depth of 0 from executionStack//BYTECODE_POS: 96 
 v2 = executionStack;              //BYTECODE_POS: 96 
 v3 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 99 
 v1 = executionStack[6];           //BYTECODE_POS: 101 depth
 v2 = null                         //BYTECODE_POS: 104 
 v1 = v1 === v2                    //BYTECODE_POS: 105 
 // if (v1) skip 7                 //BYTECODE_POS: 106 
 v2 = executionStack[6];           //BYTECODE_POS: 108 depth
 v3 = 0;                           //BYTECODE_POS: 111 
 v3 = undefined;                   //BYTECODE_POS: 113 
 v2 = v2 === v3                    //BYTECODE_POS: 114 
 // if (v2) skip 11                //BYTECODE_POS: 115 
 v3 = executionStack[6];           //BYTECODE_POS: 117 depth
 v4 = v3                           //BYTECODE_POS: 120 
 v4 = v4.toString;                 //BYTECODE_POS: 121 
 v3 = v4();                        //BYTECODE_POS: 123 // context 3 could be custom vm or native func
 v4 = "NaN"                        //BYTECODE_POS: 125 
 v3 = v3 === v4                    //BYTECODE_POS: 127 
 // if (v3) skip 5                 //BYTECODE_POS: 128 
 v4 = executionStack[6];           //BYTECODE_POS: 130 depth
 v5 = Infinity;                    //BYTECODE_POS: 133 
 v4 = v4 === v5                    //BYTECODE_POS: 134 
 // if (!v4) skip to 149           //BYTECODE_POS: 135 
 v4 = executionStack[4];           //BYTECODE_POS: 137 depth
 v5 = "null"                       //BYTECODE_POS: 140 
 v4 += v5                          //BYTECODE_POS: 142 
 //get depth of 0 from executionStack//BYTECODE_POS: 143 
 v5 = executionStack;              //BYTECODE_POS: 143 
 v6 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 146 
 // go foward to 531               //BYTECODE_POS: 148 
 v4 = executionStack[6];           //BYTECODE_POS: 150 depth
 v4 = typeof v4;                   //BYTECODE_POS: 153 
 v5 = "string"                     //BYTECODE_POS: 154 
 v4 = v4 === v5                    //BYTECODE_POS: 156 
 // if (!v4) skip to 181           //BYTECODE_POS: 157 
 v4 = executionStack[4];           //BYTECODE_POS: 159 depth
 v5 = """                          //BYTECODE_POS: 162 
 v6 = v5                           //BYTECODE_POS: 164 
 v6 = v6.concat;                   //BYTECODE_POS: 165 
 v7 = executionStack[6];           //BYTECODE_POS: 167 depth
 v8 = """                          //BYTECODE_POS: 170 
 v5 = v6(v7,v8);                   //BYTECODE_POS: 172 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 174 
 //get depth of 0 from executionStack//BYTECODE_POS: 175 
 v5 = executionStack;              //BYTECODE_POS: 175 
 v6 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 178 
 // go foward to 531               //BYTECODE_POS: 180 
 v4 = executionStack[6];           //BYTECODE_POS: 182 depth
 v4 = typeof v4;                   //BYTECODE_POS: 185 
 v5 = "number"                     //BYTECODE_POS: 186 
 v4 = v4 === v5                    //BYTECODE_POS: 188 
 // if (!v4) skip to 211           //BYTECODE_POS: 189 
 v4 = executionStack[4];           //BYTECODE_POS: 191 depth
 v5 = ""                           //BYTECODE_POS: 194 
 v6 = v5                           //BYTECODE_POS: 196 
 v6 = v6.concat;                   //BYTECODE_POS: 197 
 v7 = executionStack[6];           //BYTECODE_POS: 199 depth
 v5 = v6(v7);                      //BYTECODE_POS: 202 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 204 
 //get depth of 0 from executionStack//BYTECODE_POS: 205 
 v5 = executionStack;              //BYTECODE_POS: 205 
 v6 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 208 
 // go foward to 531               //BYTECODE_POS: 210 
 v4 = executionStack[6];           //BYTECODE_POS: 212 depth
 v4 = typeof v4;                   //BYTECODE_POS: 215 
 v5 = "boolean"                    //BYTECODE_POS: 216 
 v4 = v4 === v5                    //BYTECODE_POS: 218 
 // if (!v4) skip to 241           //BYTECODE_POS: 219 
 v4 = executionStack[4];           //BYTECODE_POS: 221 depth
 v5 = ""                           //BYTECODE_POS: 224 
 v6 = v5                           //BYTECODE_POS: 226 
 v6 = v6.concat;                   //BYTECODE_POS: 227 
 v7 = executionStack[6];           //BYTECODE_POS: 229 depth
 v5 = v6(v7);                      //BYTECODE_POS: 232 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 234 
 //get depth of 0 from executionStack//BYTECODE_POS: 235 
 v5 = executionStack;              //BYTECODE_POS: 235 
 v6 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 238 
 // go foward to 531               //BYTECODE_POS: 240 
 v4 = Array                        //BYTECODE_POS: 242 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 244 
 v5 = v5.isArray;                  //BYTECODE_POS: 245 
 v6 = executionStack[6];           //BYTECODE_POS: 247 depth
 v4 = v5(v6);                      //BYTECODE_POS: 250 // context 4 could be custom vm or native func
 // if (!v4) skip to 362           //BYTECODE_POS: 252 
 v4 = executionStack[3];           //BYTECODE_POS: 254 depth
 v5 = v4                           //BYTECODE_POS: 257 
 v5 = v5.push;                     //BYTECODE_POS: 258 
 v6 = {};                          //BYTECODE_POS: 260 
 v7 = "value"                      //BYTECODE_POS: 261 
 v6.type = v7;                     //BYTECODE_POS: 263 
 v7 = "]"                          //BYTECODE_POS: 265 
 v6.obj = v7;                      //BYTECODE_POS: 267 
 v4 = v5(v6);                      //BYTECODE_POS: 269 // context 4 could be custom vm or native func
 v4 = executionStack[6];           //BYTECODE_POS: 272 depth
 v4 = v4.length;                   //BYTECODE_POS: 275 
 v5 = 1;                           //BYTECODE_POS: 277 
 v4 -= v5;                         //BYTECODE_POS: 279 
 executionStack[7] = v4;           //BYTECODE_POS: 280 // depth = 0
 v4 = executionStack[7];           //BYTECODE_POS: 283 depth
 v5 = 0;                           //BYTECODE_POS: 286 
 v4 = v4 >= v5                     //BYTECODE_POS: 288 
 // if (!v4) skip to 342           //BYTECODE_POS: 289 
 v4 = executionStack[7];           //BYTECODE_POS: 291 depth
 v5 = 0;                           //BYTECODE_POS: 294 
 v4 = v4 === v5                    //BYTECODE_POS: 296 
 // if (!v4) skip to 302           //BYTECODE_POS: 297 
 v4 = ""                           //BYTECODE_POS: 299 
 // go foward to 304               //BYTECODE_POS: 301 
 v5 = ","                          //BYTECODE_POS: 303 
 executionStack[8] = v5;           //BYTECODE_POS: 305 // depth = 0
 v5 = executionStack[3];           //BYTECODE_POS: 308 depth
 v6 = v5                           //BYTECODE_POS: 311 
 v6 = v6.push;                     //BYTECODE_POS: 312 
 v7 = {};                          //BYTECODE_POS: 314 
 v8 = "object"                     //BYTECODE_POS: 315 
 v7.type = v8;                     //BYTECODE_POS: 317 
 v8 = executionStack[6];           //BYTECODE_POS: 319 depth
 v9 = executionStack[7];           //BYTECODE_POS: 322 depth
 v8 = v8[v9]                       //BYTECODE_POS: 325 
 v7.obj = v8;                      //BYTECODE_POS: 326 
 v8 = executionStack[8];           //BYTECODE_POS: 328 depth
 v7.prefix = v8;                   //BYTECODE_POS: 331 
 v5 = v6(v7);                      //BYTECODE_POS: 333 // context 5 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 336 
 v5 = executionStack;              //BYTECODE_POS: 336 
 v6 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6]--                          //BYTECODE_POS: 339 
 // go back to 282                 //BYTECODE_POS: 341 
 v5 = executionStack[3];           //BYTECODE_POS: 343 depth
 v6 = v5                           //BYTECODE_POS: 346 
 v6 = v6.push;                     //BYTECODE_POS: 347 
 v7 = {};                          //BYTECODE_POS: 349 
 v8 = "value"                      //BYTECODE_POS: 350 
 v7.type = v8;                     //BYTECODE_POS: 352 
 v8 = "["                          //BYTECODE_POS: 354 
 v7.obj = v8;                      //BYTECODE_POS: 356 
 v5 = v6(v7);                      //BYTECODE_POS: 358 // context 5 could be custom vm or native func
 // go foward to 531               //BYTECODE_POS: 361 
 v5 = executionStack[3];           //BYTECODE_POS: 363 depth
 v6 = v5                           //BYTECODE_POS: 366 
 v6 = v6.push;                     //BYTECODE_POS: 367 
 v7 = {};                          //BYTECODE_POS: 369 
 v8 = "value"                      //BYTECODE_POS: 370 
 v7.type = v8;                     //BYTECODE_POS: 372 
 v8 = "}"                          //BYTECODE_POS: 374 
 v7.obj = v8;                      //BYTECODE_POS: 376 
 v5 = v6(v7);                      //BYTECODE_POS: 378 // context 5 could be custom vm or native func
 v5 = Object                       //BYTECODE_POS: 381 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v6 = v5                           //BYTECODE_POS: 383 
 v6 = v6.keys;                     //BYTECODE_POS: 384 
 v7 = executionStack[6];           //BYTECODE_POS: 386 depth
 v5 = v6(v7);                      //BYTECODE_POS: 389 // context 5 could be custom vm or native func
 executionStack[9] = v5;           //BYTECODE_POS: 391 // depth = 0
 v5 = executionStack[9];           //BYTECODE_POS: 394 depth
 v5 = v5.length;                   //BYTECODE_POS: 397 
 v6 = 1;                           //BYTECODE_POS: 399 
 v5 -= v6;                         //BYTECODE_POS: 401 
 executionStack[7] = v5;           //BYTECODE_POS: 402 // depth = 0
 v5 = executionStack[7];           //BYTECODE_POS: 405 depth
 v6 = 0;                           //BYTECODE_POS: 408 
 v5 = v5 >= v6                     //BYTECODE_POS: 410 
 // if (!v5) skip to 513           //BYTECODE_POS: 411 
 v5 = executionStack[9];           //BYTECODE_POS: 413 depth
 v6 = executionStack[7];           //BYTECODE_POS: 416 depth
 v5 = v5[v6]                       //BYTECODE_POS: 419 
 executionStack[10] = v5;          //BYTECODE_POS: 420 // depth = 0
 v5 = executionStack[6];           //BYTECODE_POS: 423 depth
 v6 = executionStack[10];          //BYTECODE_POS: 426 depth
 v5 = v5[v6]                       //BYTECODE_POS: 429 
 executionStack[11] = v5;          //BYTECODE_POS: 430 // depth = 0
 v5 = executionStack[11];          //BYTECODE_POS: 433 depth
 v6 = 0;                           //BYTECODE_POS: 436 
 v6 = undefined;                   //BYTECODE_POS: 438 
 v5 = v5 === v6                    //BYTECODE_POS: 439 
 // if (!v5) skip to 443           //BYTECODE_POS: 440 
 // go foward to 506               //BYTECODE_POS: 442 
 v5 = executionStack[7];           //BYTECODE_POS: 444 depth
 v6 = 0;                           //BYTECODE_POS: 447 
 v5 = v5 > v6                      //BYTECODE_POS: 449 
 // if (!v5) skip to 455           //BYTECODE_POS: 450 
 v5 = ","                          //BYTECODE_POS: 452 
 // go foward to 457               //BYTECODE_POS: 454 
 v6 = ""                           //BYTECODE_POS: 456 
 executionStack[12] = v6;          //BYTECODE_POS: 458 // depth = 0
 v6 = executionStack[12];          //BYTECODE_POS: 461 depth
 v7 = JSON                         //BYTECODE_POS: 464 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v8 = v7                           //BYTECODE_POS: 466 
 v8 = v8.stringify;                //BYTECODE_POS: 467 
 v9 = executionStack[10];          //BYTECODE_POS: 469 depth
 v7 = v8(v9);                      //BYTECODE_POS: 472 // context 7 could be custom vm or native func
 v8 = ":"                          //BYTECODE_POS: 474 
 v7 += v8                          //BYTECODE_POS: 476 
 v6 += v7                          //BYTECODE_POS: 477 
 //get depth of 0 from executionStack//BYTECODE_POS: 478 
 v7 = executionStack;              //BYTECODE_POS: 478 
 v8 = 12                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v7[v8] = v6                       //BYTECODE_POS: 481 
 v6 = executionStack[3];           //BYTECODE_POS: 483 depth
 v7 = v6                           //BYTECODE_POS: 486 
 v7 = v7.push;                     //BYTECODE_POS: 487 
 v8 = {};                          //BYTECODE_POS: 489 
 v9 = "object"                     //BYTECODE_POS: 490 
 v8.type = v9;                     //BYTECODE_POS: 492 
 v9 = executionStack[11];          //BYTECODE_POS: 494 depth
 v8.obj = v9;                      //BYTECODE_POS: 497 
 v9 = executionStack[12];          //BYTECODE_POS: 499 depth
 v8.prefix = v9;                   //BYTECODE_POS: 502 
 v6 = v7(v8);                      //BYTECODE_POS: 504 // context 6 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 507 
 v6 = executionStack;              //BYTECODE_POS: 507 
 v7 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v6[v7]--                          //BYTECODE_POS: 510 
 // go back to 404                 //BYTECODE_POS: 512 
 v6 = executionStack[3];           //BYTECODE_POS: 514 depth
 v7 = v6                           //BYTECODE_POS: 517 
 v7 = v7.push;                     //BYTECODE_POS: 518 
 v8 = {};                          //BYTECODE_POS: 520 
 v9 = "value"                      //BYTECODE_POS: 521 
 v8.type = v9;                     //BYTECODE_POS: 523 
 v9 = "{"                          //BYTECODE_POS: 525 
 v8.obj = v9;                      //BYTECODE_POS: 527 
 v6 = v7(v8);                      //BYTECODE_POS: 529 // context 6 could be custom vm or native func
 // go back to 29                  //BYTECODE_POS: 532 
 v6 = executionStack[4];           //BYTECODE_POS: 534 depth
 //return v6;                      //BYTECODE_POS: 537 
}