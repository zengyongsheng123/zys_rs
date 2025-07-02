function VM153(arg0) {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = arguments;                   //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 v1 = 1;                           //BYTECODE_POS: 6 
 v0 = v0 > v1                      //BYTECODE_POS: 8 
 // if (!v0) skip 7 to 17          //BYTECODE_POS: 9 
 v1 = arguments;                   //BYTECODE_POS: 11 depth
 v1 = v1[1];                       //BYTECODE_POS: 14 
 v2 = undefined                    //BYTECODE_POS: 16 
 v1 = v1 !== v2;                   //BYTECODE_POS: 17 
 // if (!v1) skip to 26            //BYTECODE_POS: 18 
 v1 = arguments;                   //BYTECODE_POS: 20 depth
 v1 = v1[1];                       //BYTECODE_POS: 23 
 // go foward to 28                //BYTECODE_POS: 25 
 v2 = 20;                          //BYTECODE_POS: 27 
 executionStack[3] = v2;           //BYTECODE_POS: 29 // depth = 0
 v2 = arguments;                   //BYTECODE_POS: 32 depth
 v2 = v2.length;                   //BYTECODE_POS: 35 
 v3 = 2;                           //BYTECODE_POS: 37 
 v2 = v2 > v3                      //BYTECODE_POS: 39 
 // if (!v2) skip 7 to 48          //BYTECODE_POS: 40 
 v3 = arguments;                   //BYTECODE_POS: 42 depth
 v3 = v3[2];                       //BYTECODE_POS: 45 
 v4 = undefined                    //BYTECODE_POS: 47 
 v3 = v3 !== v4;                   //BYTECODE_POS: 48 
 // if (!v3) skip to 57            //BYTECODE_POS: 49 
 v3 = arguments;                   //BYTECODE_POS: 51 depth
 v3 = v3[2];                       //BYTECODE_POS: 54 
 // go foward to 59                //BYTECODE_POS: 56 
 v4 = 0;                           //BYTECODE_POS: 58 
 executionStack[4] = v4;           //BYTECODE_POS: 60 // depth = 0
 v4 = executionStack[4];           //BYTECODE_POS: 63 depth
 v5 = executionStack[3];           //BYTECODE_POS: 66 depth
 v4 = v4 > v5                      //BYTECODE_POS: 69 
 // if (!v4) skip to 79            //BYTECODE_POS: 70 
 v4 = undefined                    //BYTECODE_POS: 72 
 v5 = Error                        //BYTECODE_POS: 73 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v6 = "max depth exceeded"         //BYTECODE_POS: 75 
 v4 = v5(v6);                      //BYTECODE_POS: 77 // context 4 could be custom vm or native func
 //return v4                       //BYTECODE_POS: 79 
 v4 = executionStack[2];           //BYTECODE_POS: 80 depth
 v5 = 0;                           //BYTECODE_POS: 83 
 v5 = undefined;                   //BYTECODE_POS: 85 
 v4 = v4 === v5                    //BYTECODE_POS: 86 
 // if (!v4) skip to 91            //BYTECODE_POS: 87 
 v4 = "null"                       //BYTECODE_POS: 89 
 //return v4;                      //BYTECODE_POS: 91 
 v4 = executionStack[2];           //BYTECODE_POS: 92 depth
 v5 = null                         //BYTECODE_POS: 95 
 v4 = v4 === v5                    //BYTECODE_POS: 96 
 // if (!v4) skip to 101           //BYTECODE_POS: 97 
 v4 = "null"                       //BYTECODE_POS: 99 
 //return v4;                      //BYTECODE_POS: 101 
 v4 = executionStack[2];           //BYTECODE_POS: 102 depth
 v5 = v4                           //BYTECODE_POS: 105 
 v5 = v5.toString;                 //BYTECODE_POS: 106 
 v4 = v5();                        //BYTECODE_POS: 108 // context 4 could be custom vm or native func
 v5 = "NaN"                        //BYTECODE_POS: 110 
 v4 = v4 === v5                    //BYTECODE_POS: 112 
 // if (!v4) skip to 117           //BYTECODE_POS: 113 
 v4 = "null"                       //BYTECODE_POS: 115 
 //return v4;                      //BYTECODE_POS: 117 
 v4 = executionStack[2];           //BYTECODE_POS: 118 depth
 v5 = Infinity;                    //BYTECODE_POS: 121 
 v4 = v4 === v5                    //BYTECODE_POS: 122 
 // if (!v4) skip to 127           //BYTECODE_POS: 123 
 v4 = "null"                       //BYTECODE_POS: 125 
 //return v4;                      //BYTECODE_POS: 127 
 v4 = ""                           //BYTECODE_POS: 128 
 executionStack[5] = v4;           //BYTECODE_POS: 130 // depth = 0
 v4 = Object                       //BYTECODE_POS: 133 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4.prototype;                //BYTECODE_POS: 135 
 v4 = v4.toString;                 //BYTECODE_POS: 137 
 v5 = v4                           //BYTECODE_POS: 139 
 v5 = v5.call;                     //BYTECODE_POS: 140 
 v6 = executionStack[2];           //BYTECODE_POS: 142 depth
 v4 = v5(v6);                      //BYTECODE_POS: 145 // context 4 could be custom vm or native func
 v5 = "[object Array]"             //BYTECODE_POS: 147 
 v4 = v4 === v5                    //BYTECODE_POS: 149 
 // if (!v4) skip to 285           //BYTECODE_POS: 150 
 v4 = executionStack[4];           //BYTECODE_POS: 152 depth
 v5 = 1;                           //BYTECODE_POS: 155 
 v4 += v5                          //BYTECODE_POS: 157 
 //get depth of 0 from executionStack//BYTECODE_POS: 158 
 v5 = executionStack;              //BYTECODE_POS: 158 
 v6 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 161 
 v4 = executionStack[5];           //BYTECODE_POS: 163 depth
 v5 = "["                          //BYTECODE_POS: 166 
 v4 += v5                          //BYTECODE_POS: 168 
 //get depth of 0 from executionStack//BYTECODE_POS: 169 
 v5 = executionStack;              //BYTECODE_POS: 169 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 172 
 v4 = executionStack[2];           //BYTECODE_POS: 174 depth
 v4 = v4.length;                   //BYTECODE_POS: 177 
 v5 = 1;                           //BYTECODE_POS: 179 
 v4 = v4 >= v5                     //BYTECODE_POS: 181 
 // if (!v4) skip to 272           //BYTECODE_POS: 182 
 v4 = 0;                           //BYTECODE_POS: 184 
 executionStack[6] = v4;           //BYTECODE_POS: 186 // depth = 0
 v4 = executionStack[6];           //BYTECODE_POS: 189 depth
 v5 = executionStack[2];           //BYTECODE_POS: 192 depth
 v5 = v5.length;                   //BYTECODE_POS: 195 
 v4 = v4 < v5;                     //BYTECODE_POS: 197 
 // if (!v4) skip to 272           //BYTECODE_POS: 198 
 v4 = executionStack[2];           //BYTECODE_POS: 200 depth
 v5 = executionStack[6];           //BYTECODE_POS: 203 depth
 v4 = v4[v5]                       //BYTECODE_POS: 206 
 executionStack[7] = v4;           //BYTECODE_POS: 207 // depth = 0
 v4 = executionStack[5];           //BYTECODE_POS: 210 depth
 v5 = ""                           //BYTECODE_POS: 213 
 v6 = v5                           //BYTECODE_POS: 215 
 v6 = v6.concat;                   //BYTECODE_POS: 216 
 v7 = undefined                    //BYTECODE_POS: 218 
 v8 = executionStack[2];           //BYTECODE_POS: 219 depth
 v9 = executionStack[7];           //BYTECODE_POS: 222 depth
 v10 = executionStack[3];          //BYTECODE_POS: 225 depth
 v11 = executionStack[4];          //BYTECODE_POS: 228 depth
 v7 = v8(v9,v10,v11);              //BYTECODE_POS: 231 // context 7 could be custom vm or native func
 v5 = v6(v7);                      //BYTECODE_POS: 233 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 235 
 //get depth of 0 from executionStack//BYTECODE_POS: 236 
 v5 = executionStack;              //BYTECODE_POS: 236 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 239 
 v4 = executionStack[6];           //BYTECODE_POS: 241 depth
 v5 = executionStack[2];           //BYTECODE_POS: 244 depth
 v5 = v5.length;                   //BYTECODE_POS: 247 
 v6 = 1;                           //BYTECODE_POS: 249 
 v5 -= v6;                         //BYTECODE_POS: 251 
 v4 = v4 !== v5;                   //BYTECODE_POS: 252 
 // if (!v4) skip to 265           //BYTECODE_POS: 253 
 v4 = executionStack[5];           //BYTECODE_POS: 255 depth
 v5 = ","                          //BYTECODE_POS: 258 
 v4 += v5                          //BYTECODE_POS: 260 
 //get depth of 0 from executionStack//BYTECODE_POS: 261 
 v5 = executionStack;              //BYTECODE_POS: 261 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 264 
 //get depth of 0 from executionStack//BYTECODE_POS: 266 
 v4 = executionStack;              //BYTECODE_POS: 266 
 v5 = 6                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v4 = v4[v5]++                     //BYTECODE_POS: 269 // replace the executionStack var with an index incremented
 // go back to 188                 //BYTECODE_POS: 271 
 v4 = executionStack[5];           //BYTECODE_POS: 273 depth
 v5 = "]"                          //BYTECODE_POS: 276 
 v4 += v5                          //BYTECODE_POS: 278 
 //get depth of 0 from executionStack//BYTECODE_POS: 279 
 v5 = executionStack;              //BYTECODE_POS: 279 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 282 
 // go foward to 557               //BYTECODE_POS: 284 
 v4 = undefined                    //BYTECODE_POS: 286 
 v5 = executionStack[0];           //BYTECODE_POS: 287 depth
 v6 = executionStack[2];           //BYTECODE_POS: 290 depth
 v4 = v5(v6);                      //BYTECODE_POS: 293 // context 4 could be custom vm or native func
 v5 = "object"                     //BYTECODE_POS: 295 
 v4 = v4 === v5                    //BYTECODE_POS: 297 
 // if (!v4) skip to 467           //BYTECODE_POS: 298 
 v4 = executionStack[4];           //BYTECODE_POS: 300 depth
 v5 = 1;                           //BYTECODE_POS: 303 
 v4 += v5                          //BYTECODE_POS: 305 
 //get depth of 0 from executionStack//BYTECODE_POS: 306 
 v5 = executionStack;              //BYTECODE_POS: 306 
 v6 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 309 
 v4 = Object                       //BYTECODE_POS: 311 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 313 
 v5 = v5.keys;                     //BYTECODE_POS: 314 
 v6 = executionStack[2];           //BYTECODE_POS: 316 depth
 v4 = v5(v6);                      //BYTECODE_POS: 319 // context 4 could be custom vm or native func
 executionStack[8] = v4;           //BYTECODE_POS: 321 // depth = 0
 v4 = executionStack[8];           //BYTECODE_POS: 324 depth
 v5 = v4                           //BYTECODE_POS: 327 
 v5 = v5.pop;                      //BYTECODE_POS: 328 
 v4 = v5();                        //BYTECODE_POS: 330 // context 4 could be custom vm or native func
 executionStack[9] = v4;           //BYTECODE_POS: 332 // depth = 0
 v4 = executionStack[5];           //BYTECODE_POS: 335 depth
 v5 = "{"                          //BYTECODE_POS: 338 
 v4 += v5                          //BYTECODE_POS: 340 
 //get depth of 0 from executionStack//BYTECODE_POS: 341 
 v5 = executionStack;              //BYTECODE_POS: 341 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 344 
 v4 = executionStack[2];           //BYTECODE_POS: 346 depth
 // opcode 14                      //BYTECODE_POS: 349 
 //get depth of 0 from executionStack//BYTECODE_POS: 351 
 v4 = executionStack;              //BYTECODE_POS: 351 
 v5 = 10                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 //case 54                         //BYTECODE_POS: 354 
 // if (!v4) skip to 439           //BYTECODE_POS: 356 
 v4 = executionStack[2];           //BYTECODE_POS: 358 depth
 v5 = executionStack[10];          //BYTECODE_POS: 361 depth
 v4 = v4[v5]                       //BYTECODE_POS: 364 
 v5 = 0;                           //BYTECODE_POS: 365 
 v5 = undefined;                   //BYTECODE_POS: 367 
 v4 = v4 === v5                    //BYTECODE_POS: 368 
 // if (!v4) skip to 372           //BYTECODE_POS: 369 
 // go back to 350                 //BYTECODE_POS: 371 
 v4 = executionStack[5];           //BYTECODE_POS: 373 depth
 v5 = """                          //BYTECODE_POS: 376 
 v6 = v5                           //BYTECODE_POS: 378 
 v6 = v6.concat;                   //BYTECODE_POS: 379 
 v7 = executionStack[10];          //BYTECODE_POS: 381 depth
 v8 = "":"                         //BYTECODE_POS: 384 
 v5 = v6(v7,v8);                   //BYTECODE_POS: 386 // context 5 could be custom vm or native func
 v6 = v5                           //BYTECODE_POS: 388 
 v6 = v6.concat;                   //BYTECODE_POS: 389 
 v7 = undefined                    //BYTECODE_POS: 391 
 v8 = executionStack[2];           //BYTECODE_POS: 392 depth
 v9 = executionStack[2];           //BYTECODE_POS: 395 depth
 v10 = executionStack[10];         //BYTECODE_POS: 398 depth
 v9 = v9[v10]                      //BYTECODE_POS: 401 
 v10 = executionStack[3];          //BYTECODE_POS: 402 depth
 v11 = executionStack[4];          //BYTECODE_POS: 405 depth
 v7 = v8(v9,v10,v11);              //BYTECODE_POS: 408 // context 7 could be custom vm or native func
 v5 = v6(v7);                      //BYTECODE_POS: 410 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 412 
 //get depth of 0 from executionStack//BYTECODE_POS: 413 
 v5 = executionStack;              //BYTECODE_POS: 413 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 416 
 v4 = executionStack[10];          //BYTECODE_POS: 418 depth
 v5 = executionStack[9];           //BYTECODE_POS: 421 depth
 v4 = v4 !== v5;                   //BYTECODE_POS: 424 
 // if (!v4) skip to 437           //BYTECODE_POS: 425 
 v4 = executionStack[5];           //BYTECODE_POS: 427 depth
 v5 = ","                          //BYTECODE_POS: 430 
 v4 += v5                          //BYTECODE_POS: 432 
 //get depth of 0 from executionStack//BYTECODE_POS: 433 
 v5 = executionStack;              //BYTECODE_POS: 433 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 436 
 // go back to 350                 //BYTECODE_POS: 438 
 v4 = executionStack[5];           //BYTECODE_POS: 440 depth
 v5 = "}"                          //BYTECODE_POS: 443 
 v4 += v5                          //BYTECODE_POS: 445 
 //get depth of 0 from executionStack//BYTECODE_POS: 446 
 v5 = executionStack;              //BYTECODE_POS: 446 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 449 
 v4 = executionStack[5];           //BYTECODE_POS: 451 depth
 v5 = v4                           //BYTECODE_POS: 454 
 v5 = v5.replaceAll;               //BYTECODE_POS: 455 
 v6 = ",}"                         //BYTECODE_POS: 457 
 v7 = "}"                          //BYTECODE_POS: 459 
 v4 = v5(v6,v7);                   //BYTECODE_POS: 461 // context 4 could be custom vm or native func
 executionStack[5] = v4;           //BYTECODE_POS: 463 // depth = 0
 // go foward to 557               //BYTECODE_POS: 466 
 v4 = executionStack[2];           //BYTECODE_POS: 468 depth
 v4 = typeof v4;                   //BYTECODE_POS: 471 
 v5 = "string"                     //BYTECODE_POS: 472 
 v4 = v4 === v5                    //BYTECODE_POS: 474 
 // if (!v4) skip to 499           //BYTECODE_POS: 475 
 v4 = executionStack[5];           //BYTECODE_POS: 477 depth
 v5 = """                          //BYTECODE_POS: 480 
 v6 = v5                           //BYTECODE_POS: 482 
 v6 = v6.concat;                   //BYTECODE_POS: 483 
 v7 = executionStack[2];           //BYTECODE_POS: 485 depth
 v8 = """                          //BYTECODE_POS: 488 
 v5 = v6(v7,v8);                   //BYTECODE_POS: 490 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 492 
 //get depth of 0 from executionStack//BYTECODE_POS: 493 
 v5 = executionStack;              //BYTECODE_POS: 493 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 496 
 // go foward to 557               //BYTECODE_POS: 498 
 v4 = executionStack[2];           //BYTECODE_POS: 500 depth
 v4 = typeof v4;                   //BYTECODE_POS: 503 
 v5 = "number"                     //BYTECODE_POS: 504 
 v4 = v4 === v5                    //BYTECODE_POS: 506 
 // if (!v4) skip to 529           //BYTECODE_POS: 507 
 v4 = executionStack[5];           //BYTECODE_POS: 509 depth
 v5 = ""                           //BYTECODE_POS: 512 
 v6 = v5                           //BYTECODE_POS: 514 
 v6 = v6.concat;                   //BYTECODE_POS: 515 
 v7 = executionStack[2];           //BYTECODE_POS: 517 depth
 v5 = v6(v7);                      //BYTECODE_POS: 520 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 522 
 //get depth of 0 from executionStack//BYTECODE_POS: 523 
 v5 = executionStack;              //BYTECODE_POS: 523 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 526 
 // go foward to 557               //BYTECODE_POS: 528 
 v4 = executionStack[2];           //BYTECODE_POS: 530 depth
 v4 = typeof v4;                   //BYTECODE_POS: 533 
 v5 = "boolean"                    //BYTECODE_POS: 534 
 v4 = v4 === v5                    //BYTECODE_POS: 536 
 // if (!v4) skip to 557           //BYTECODE_POS: 537 
 v4 = executionStack[5];           //BYTECODE_POS: 539 depth
 v5 = ""                           //BYTECODE_POS: 542 
 v6 = v5                           //BYTECODE_POS: 544 
 v6 = v6.concat;                   //BYTECODE_POS: 545 
 v7 = executionStack[2];           //BYTECODE_POS: 547 depth
 v5 = v6(v7);                      //BYTECODE_POS: 550 // context 5 could be custom vm or native func
 v4 += v5                          //BYTECODE_POS: 552 
 //get depth of 0 from executionStack//BYTECODE_POS: 553 
 v5 = executionStack;              //BYTECODE_POS: 553 
 v6 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v5[v6] = v4                       //BYTECODE_POS: 556 
 v4 = executionStack[5];           //BYTECODE_POS: 558 depth
 //return v4;                      //BYTECODE_POS: 561 
}