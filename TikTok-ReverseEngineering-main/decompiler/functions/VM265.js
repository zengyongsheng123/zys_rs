function VM265() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21,v22,v23,v24,v25,v26,v27,v28,v29,v30,v31; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = navigator                    //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.userAgent;                //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.toLowerCase;              //BYTECODE_POS: 6 
 v0 = v1();                        //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = navigator                    //BYTECODE_POS: 13 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.platform;                 //BYTECODE_POS: 15 
 v1 = v0                           //BYTECODE_POS: 17 
 v1 = v1.toLowerCase;              //BYTECODE_POS: 18 
 v0 = v1();                        //BYTECODE_POS: 20 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 22 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 25 
 executionStack[4] = v0;           //BYTECODE_POS: 27 // depth = 0
 v0 = 1;                           //BYTECODE_POS: 30 
 executionStack[5] = v0;           //BYTECODE_POS: 32 // depth = 0
 v0 = 2;                           //BYTECODE_POS: 35 
 executionStack[6] = v0;           //BYTECODE_POS: 37 // depth = 0
 v0 = 3;                           //BYTECODE_POS: 40 
 executionStack[7] = v0;           //BYTECODE_POS: 42 // depth = 0
 v0 = 4;                           //BYTECODE_POS: 45 
 executionStack[8] = v0;           //BYTECODE_POS: 47 // depth = 0
 v0 = 5;                           //BYTECODE_POS: 50 
 executionStack[9] = v0;           //BYTECODE_POS: 52 // depth = 0
 v0 = executionStack[9];           //BYTECODE_POS: 55 depth
 executionStack[10] = v0;          //BYTECODE_POS: 58 // depth = 0
 v0 = "windows"                    //BYTECODE_POS: 61 
 executionStack[11] = v0;          //BYTECODE_POS: 63 // depth = 0
 v0 = "win"                        //BYTECODE_POS: 66 
 executionStack[12] = v0;          //BYTECODE_POS: 68 // depth = 0
 v0 = "android"                    //BYTECODE_POS: 71 
 executionStack[13] = v0;          //BYTECODE_POS: 73 // depth = 0
 v0 = "linux"                      //BYTECODE_POS: 76 
 executionStack[14] = v0;          //BYTECODE_POS: 78 // depth = 0
 v0 = "iphone"                     //BYTECODE_POS: 81 
 executionStack[15] = v0;          //BYTECODE_POS: 83 // depth = 0
 v0 = "ipad"                       //BYTECODE_POS: 86 
 executionStack[16] = v0;          //BYTECODE_POS: 88 // depth = 0
 v0 = "ipod"                       //BYTECODE_POS: 91 
 executionStack[17] = v0;          //BYTECODE_POS: 93 // depth = 0
 v0 = "mac"                        //BYTECODE_POS: 96 
 executionStack[18] = v0;          //BYTECODE_POS: 98 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 101 depth
 v1 = v0                           //BYTECODE_POS: 104 
 v1 = v1.indexOf;                  //BYTECODE_POS: 105 
 v2 = "macintosh"                  //BYTECODE_POS: 107 
 v0 = v1(v2);                      //BYTECODE_POS: 109 // context 0 could be custom vm or native func
 v1 = 0;                           //BYTECODE_POS: 111 
 v0 = v0 >= v1                     //BYTECODE_POS: 113 
 // if (v0) skip 13                //BYTECODE_POS: 114 
 v1 = executionStack[2];           //BYTECODE_POS: 116 depth
 v2 = v1                           //BYTECODE_POS: 119 
 v2 = v2.indexOf;                  //BYTECODE_POS: 120 
 v3 = "mac_powerpc)"               //BYTECODE_POS: 122 
 v1 = v2(v3);                      //BYTECODE_POS: 124 // context 1 could be custom vm or native func
 v2 = 0;                           //BYTECODE_POS: 126 
 v1 = v1 >= v2                     //BYTECODE_POS: 128 
 // if (!v1) skip to 138           //BYTECODE_POS: 129 
 v1 = executionStack[8];           //BYTECODE_POS: 131 depth
 executionStack[10] = v1;          //BYTECODE_POS: 134 // depth = 0
 // go foward to 332               //BYTECODE_POS: 137 
 v1 = executionStack[2];           //BYTECODE_POS: 139 depth
 v2 = v1                           //BYTECODE_POS: 142 
 v2 = v2.indexOf;                  //BYTECODE_POS: 143 
 v3 = executionStack[11];          //BYTECODE_POS: 145 depth
 v1 = v2(v3);                      //BYTECODE_POS: 148 // context 1 could be custom vm or native func
 v2 = 0;                           //BYTECODE_POS: 150 
 v1 = v1 >= v2                     //BYTECODE_POS: 152 
 // if (!v1) skip to 162           //BYTECODE_POS: 153 
 v1 = executionStack[4];           //BYTECODE_POS: 155 depth
 executionStack[10] = v1;          //BYTECODE_POS: 158 // depth = 0
 // go foward to 332               //BYTECODE_POS: 161 
 v1 = executionStack[2];           //BYTECODE_POS: 163 depth
 v2 = v1                           //BYTECODE_POS: 166 
 v2 = v2.indexOf;                  //BYTECODE_POS: 167 
 v3 = executionStack[13];          //BYTECODE_POS: 169 depth
 v1 = v2(v3);                      //BYTECODE_POS: 172 // context 1 could be custom vm or native func
 v2 = 0;                           //BYTECODE_POS: 174 
 v1 = v1 >= v2                     //BYTECODE_POS: 176 
 // if (!v1) skip to 186           //BYTECODE_POS: 177 
 v1 = executionStack[5];           //BYTECODE_POS: 179 depth
 executionStack[10] = v1;          //BYTECODE_POS: 182 // depth = 0
 // go foward to 332               //BYTECODE_POS: 185 
 v1 = executionStack[2];           //BYTECODE_POS: 187 depth
 v2 = v1                           //BYTECODE_POS: 190 
 v2 = v2.indexOf;                  //BYTECODE_POS: 191 
 v3 = executionStack[14];          //BYTECODE_POS: 193 depth
 v1 = v2(v3);                      //BYTECODE_POS: 196 // context 1 could be custom vm or native func
 v2 = 0;                           //BYTECODE_POS: 198 
 v1 = v1 >= v2                     //BYTECODE_POS: 200 
 // if (v1) skip 13                //BYTECODE_POS: 201 
 v2 = executionStack[2];           //BYTECODE_POS: 203 depth
 v3 = v2                           //BYTECODE_POS: 206 
 v3 = v3.indexOf;                  //BYTECODE_POS: 207 
 v4 = "cros"                       //BYTECODE_POS: 209 
 v2 = v3(v4);                      //BYTECODE_POS: 211 // context 2 could be custom vm or native func
 v3 = 0;                           //BYTECODE_POS: 213 
 v2 = v2 >= v3                     //BYTECODE_POS: 215 
 // if (v2) skip 13                //BYTECODE_POS: 216 
 v3 = executionStack[2];           //BYTECODE_POS: 218 depth
 v4 = v3                           //BYTECODE_POS: 221 
 v4 = v4.indexOf;                  //BYTECODE_POS: 222 
 v5 = "x11"                        //BYTECODE_POS: 224 
 v3 = v4(v5);                      //BYTECODE_POS: 226 // context 3 could be custom vm or native func
 v4 = 0;                           //BYTECODE_POS: 228 
 v3 = v3 >= v4                     //BYTECODE_POS: 230 
 // if (!v3) skip to 240           //BYTECODE_POS: 231 
 v3 = executionStack[6];           //BYTECODE_POS: 233 depth
 executionStack[10] = v3;          //BYTECODE_POS: 236 // depth = 0
 // go foward to 332               //BYTECODE_POS: 239 
 v3 = executionStack[2];           //BYTECODE_POS: 241 depth
 v4 = v3                           //BYTECODE_POS: 244 
 v4 = v4.indexOf;                  //BYTECODE_POS: 245 
 v5 = executionStack[15];          //BYTECODE_POS: 247 depth
 v3 = v4(v5);                      //BYTECODE_POS: 250 // context 3 could be custom vm or native func
 v4 = 0;                           //BYTECODE_POS: 252 
 v3 = v3 >= v4                     //BYTECODE_POS: 254 
 // if (v3) skip 14                //BYTECODE_POS: 255 
 v4 = executionStack[2];           //BYTECODE_POS: 257 depth
 v5 = v4                           //BYTECODE_POS: 260 
 v5 = v5.indexOf;                  //BYTECODE_POS: 261 
 v6 = executionStack[16];          //BYTECODE_POS: 263 depth
 v4 = v5(v6);                      //BYTECODE_POS: 266 // context 4 could be custom vm or native func
 v5 = 0;                           //BYTECODE_POS: 268 
 v4 = v4 >= v5                     //BYTECODE_POS: 270 
 // if (v4) skip 14                //BYTECODE_POS: 271 
 v5 = executionStack[2];           //BYTECODE_POS: 273 depth
 v6 = v5                           //BYTECODE_POS: 276 
 v6 = v6.indexOf;                  //BYTECODE_POS: 277 
 v7 = executionStack[17];          //BYTECODE_POS: 279 depth
 v5 = v6(v7);                      //BYTECODE_POS: 282 // context 5 could be custom vm or native func
 v6 = 0;                           //BYTECODE_POS: 284 
 v5 = v5 >= v6                     //BYTECODE_POS: 286 
 // if (v5) skip 13                //BYTECODE_POS: 287 
 v6 = executionStack[2];           //BYTECODE_POS: 289 depth
 v7 = v6                           //BYTECODE_POS: 292 
 v7 = v7.indexOf;                  //BYTECODE_POS: 293 
 v8 = "crios"                      //BYTECODE_POS: 295 
 v6 = v7(v8);                      //BYTECODE_POS: 297 // context 6 could be custom vm or native func
 v7 = 0;                           //BYTECODE_POS: 299 
 v6 = v6 >= v7                     //BYTECODE_POS: 301 
 // if (v6) skip 13                //BYTECODE_POS: 302 
 v7 = executionStack[2];           //BYTECODE_POS: 304 depth
 v8 = v7                           //BYTECODE_POS: 307 
 v8 = v8.indexOf;                  //BYTECODE_POS: 308 
 v9 = "fxios"                      //BYTECODE_POS: 310 
 v7 = v8(v9);                      //BYTECODE_POS: 312 // context 7 could be custom vm or native func
 v8 = 0;                           //BYTECODE_POS: 314 
 v7 = v7 >= v8                     //BYTECODE_POS: 316 
 // if (!v7) skip to 326           //BYTECODE_POS: 317 
 v7 = executionStack[7];           //BYTECODE_POS: 319 depth
 executionStack[10] = v7;          //BYTECODE_POS: 322 // depth = 0
 // go foward to 332               //BYTECODE_POS: 325 
 v7 = executionStack[9];           //BYTECODE_POS: 327 depth
 executionStack[10] = v7;          //BYTECODE_POS: 330 // depth = 0
 v7 = executionStack[3];           //BYTECODE_POS: 333 depth
 v8 = v7                           //BYTECODE_POS: 336 
 v8 = v8.indexOf;                  //BYTECODE_POS: 337 
 v9 = executionStack[12];          //BYTECODE_POS: 339 depth
 v7 = v8(v9);                      //BYTECODE_POS: 342 // context 7 could be custom vm or native func
 v8 = 0;                           //BYTECODE_POS: 344 
 v7 = v7 >= v8                     //BYTECODE_POS: 346 
 // if (!v7) skip 7 to 355         //BYTECODE_POS: 347 
 v8 = executionStack[10];          //BYTECODE_POS: 349 depth
 v9 = executionStack[4];           //BYTECODE_POS: 352 depth
 v8 = v8 !== v9;                   //BYTECODE_POS: 355 
 // if (!v8) skip to 361           //BYTECODE_POS: 356 
 v8 = true                         //BYTECODE_POS: 358 
 //return v8;                      //BYTECODE_POS: 359 
 // go foward to 628               //BYTECODE_POS: 360 
 v8 = executionStack[3];           //BYTECODE_POS: 362 depth
 v9 = v8                           //BYTECODE_POS: 365 
 v9 = v9.indexOf;                  //BYTECODE_POS: 366 
 v10 = executionStack[14];         //BYTECODE_POS: 368 depth
 v8 = v9(v10);                     //BYTECODE_POS: 371 // context 8 could be custom vm or native func
 v9 = 0;                           //BYTECODE_POS: 373 
 v8 = v8 >= v9                     //BYTECODE_POS: 375 
 // if (v8) skip 14                //BYTECODE_POS: 376 
 v9 = executionStack[3];           //BYTECODE_POS: 378 depth
 v10 = v9                          //BYTECODE_POS: 381 
 v10 = v10.indexOf;                //BYTECODE_POS: 382 
 v11 = executionStack[13];         //BYTECODE_POS: 384 depth
 v9 = v10(v11);                    //BYTECODE_POS: 387 // context 9 could be custom vm or native func
 v10 = 0;                          //BYTECODE_POS: 389 
 v9 = v9 >= v10                    //BYTECODE_POS: 391 
 // if (v9) skip 13                //BYTECODE_POS: 392 
 v10 = executionStack[3];          //BYTECODE_POS: 394 depth
 v11 = v10                         //BYTECODE_POS: 397 
 v11 = v11.indexOf;                //BYTECODE_POS: 398 
 v12 = "pike"                      //BYTECODE_POS: 400 
 v10 = v11(v12);                   //BYTECODE_POS: 402 // context 10 could be custom vm or native func
 v11 = 0;                          //BYTECODE_POS: 404 
 v10 = v10 >= v11                  //BYTECODE_POS: 406 
 // if (!v10) skip 7 to 415        //BYTECODE_POS: 407 
 v11 = executionStack[10];         //BYTECODE_POS: 409 depth
 v12 = executionStack[6];          //BYTECODE_POS: 412 depth
 v11 = v11 !== v12;                //BYTECODE_POS: 415 
 // if (!v11) skip 7 to 424        //BYTECODE_POS: 416 
 v12 = executionStack[10];         //BYTECODE_POS: 418 depth
 v13 = executionStack[5];          //BYTECODE_POS: 421 depth
 v12 = v12 !== v13;                //BYTECODE_POS: 424 
 // if (!v12) skip to 430          //BYTECODE_POS: 425 
 v12 = true                        //BYTECODE_POS: 427 
 //return v12;                     //BYTECODE_POS: 428 
 // go foward to 628               //BYTECODE_POS: 429 
 v12 = executionStack[3];          //BYTECODE_POS: 431 depth
 v13 = v12                         //BYTECODE_POS: 434 
 v13 = v13.indexOf;                //BYTECODE_POS: 435 
 v14 = executionStack[18];         //BYTECODE_POS: 437 depth
 v12 = v13(v14);                   //BYTECODE_POS: 440 // context 12 could be custom vm or native func
 v13 = 0;                          //BYTECODE_POS: 442 
 v12 = v12 >= v13                  //BYTECODE_POS: 444 
 // if (v12) skip 14               //BYTECODE_POS: 445 
 v13 = executionStack[3];          //BYTECODE_POS: 447 depth
 v14 = v13                         //BYTECODE_POS: 450 
 v14 = v14.indexOf;                //BYTECODE_POS: 451 
 v15 = executionStack[16];         //BYTECODE_POS: 453 depth
 v13 = v14(v15);                   //BYTECODE_POS: 456 // context 13 could be custom vm or native func
 v14 = 0;                          //BYTECODE_POS: 458 
 v13 = v13 >= v14                  //BYTECODE_POS: 460 
 // if (v13) skip 14               //BYTECODE_POS: 461 
 v14 = executionStack[3];          //BYTECODE_POS: 463 depth
 v15 = v14                         //BYTECODE_POS: 466 
 v15 = v15.indexOf;                //BYTECODE_POS: 467 
 v16 = executionStack[17];         //BYTECODE_POS: 469 depth
 v14 = v15(v16);                   //BYTECODE_POS: 472 // context 14 could be custom vm or native func
 v15 = 0;                          //BYTECODE_POS: 474 
 v14 = v14 >= v15                  //BYTECODE_POS: 476 
 // if (v14) skip 14               //BYTECODE_POS: 477 
 v15 = executionStack[3];          //BYTECODE_POS: 479 depth
 v16 = v15                         //BYTECODE_POS: 482 
 v16 = v16.indexOf;                //BYTECODE_POS: 483 
 v17 = executionStack[15];         //BYTECODE_POS: 485 depth
 v15 = v16(v17);                   //BYTECODE_POS: 488 // context 15 could be custom vm or native func
 v16 = 0;                          //BYTECODE_POS: 490 
 v15 = v15 >= v16                  //BYTECODE_POS: 492 
 // if (!v15) skip 7 to 501        //BYTECODE_POS: 493 
 v16 = executionStack[10];         //BYTECODE_POS: 495 depth
 v17 = executionStack[8];          //BYTECODE_POS: 498 depth
 v16 = v16 !== v17;                //BYTECODE_POS: 501 
 // if (!v16) skip 7 to 510        //BYTECODE_POS: 502 
 v17 = executionStack[10];         //BYTECODE_POS: 504 depth
 v18 = executionStack[7];          //BYTECODE_POS: 507 depth
 v17 = v17 !== v18;                //BYTECODE_POS: 510 
 // if (!v17) skip to 516          //BYTECODE_POS: 511 
 v17 = true                        //BYTECODE_POS: 513 
 //return v17;                     //BYTECODE_POS: 514 
 // go foward to 628               //BYTECODE_POS: 515 
 v17 = executionStack[3];          //BYTECODE_POS: 517 depth
 v18 = v17                         //BYTECODE_POS: 520 
 v18 = v18.indexOf;                //BYTECODE_POS: 521 
 v19 = executionStack[12];         //BYTECODE_POS: 523 depth
 v17 = v18(v19);                   //BYTECODE_POS: 526 // context 17 could be custom vm or native func
 v18 = 0;                          //BYTECODE_POS: 528 
 v17 = v17 < v18;                  //BYTECODE_POS: 530 
 // if (!v17) skip 14 to 546       //BYTECODE_POS: 531 
 v18 = executionStack[3];          //BYTECODE_POS: 533 depth
 v19 = v18                         //BYTECODE_POS: 536 
 v19 = v19.indexOf;                //BYTECODE_POS: 537 
 v20 = executionStack[14];         //BYTECODE_POS: 539 depth
 v18 = v19(v20);                   //BYTECODE_POS: 542 // context 18 could be custom vm or native func
 v19 = 0;                          //BYTECODE_POS: 544 
 v18 = v18 < v19;                  //BYTECODE_POS: 546 
 // if (!v18) skip 14 to 562       //BYTECODE_POS: 547 
 v19 = executionStack[3];          //BYTECODE_POS: 549 depth
 v20 = v19                         //BYTECODE_POS: 552 
 v20 = v20.indexOf;                //BYTECODE_POS: 553 
 v21 = executionStack[18];         //BYTECODE_POS: 555 depth
 v19 = v20(v21);                   //BYTECODE_POS: 558 // context 19 could be custom vm or native func
 v20 = 0;                          //BYTECODE_POS: 560 
 v19 = v19 < v20;                  //BYTECODE_POS: 562 
 // if (!v19) skip 14 to 578       //BYTECODE_POS: 563 
 v20 = executionStack[3];          //BYTECODE_POS: 565 depth
 v21 = v20                         //BYTECODE_POS: 568 
 v21 = v21.indexOf;                //BYTECODE_POS: 569 
 v22 = executionStack[15];         //BYTECODE_POS: 571 depth
 v20 = v21(v22);                   //BYTECODE_POS: 574 // context 20 could be custom vm or native func
 v21 = 0;                          //BYTECODE_POS: 576 
 v20 = v20 < v21;                  //BYTECODE_POS: 578 
 // if (!v20) skip 14 to 594       //BYTECODE_POS: 579 
 v21 = executionStack[3];          //BYTECODE_POS: 581 depth
 v22 = v21                         //BYTECODE_POS: 584 
 v22 = v22.indexOf;                //BYTECODE_POS: 585 
 v23 = executionStack[16];         //BYTECODE_POS: 587 depth
 v21 = v22(v23);                   //BYTECODE_POS: 590 // context 21 could be custom vm or native func
 v22 = 0;                          //BYTECODE_POS: 592 
 v21 = v21 < v22;                  //BYTECODE_POS: 594 
 // if (!v21) skip 14 to 610       //BYTECODE_POS: 595 
 v22 = executionStack[3];          //BYTECODE_POS: 597 depth
 v23 = v22                         //BYTECODE_POS: 600 
 v23 = v23.indexOf;                //BYTECODE_POS: 601 
 v24 = executionStack[17];         //BYTECODE_POS: 603 depth
 v22 = v23(v24);                   //BYTECODE_POS: 606 // context 22 could be custom vm or native func
 v23 = 0;                          //BYTECODE_POS: 608 
 v22 = v22 < v23;                  //BYTECODE_POS: 610 
 executionStack[19] = v22;         //BYTECODE_POS: 611 // depth = 0
 v22 = executionStack[19];         //BYTECODE_POS: 614 depth
 v23 = executionStack[10];         //BYTECODE_POS: 617 depth
 v24 = executionStack[9];          //BYTECODE_POS: 620 depth
 v23 = v23 === v24                 //BYTECODE_POS: 623 
 v22 = v22 !== v23;                //BYTECODE_POS: 624 
 // if (!v22) skip to 628          //BYTECODE_POS: 625 
 v22 = true                        //BYTECODE_POS: 627 
 //return v22;                     //BYTECODE_POS: 628 
 v22 = 0;                          //BYTECODE_POS: 629 
 executionStack[20] = v22;         //BYTECODE_POS: 631 // depth = 0
 v22 = 1;                          //BYTECODE_POS: 634 
 executionStack[21] = v22;         //BYTECODE_POS: 636 // depth = 0
 v22 = 2;                          //BYTECODE_POS: 639 
 executionStack[22] = v22;         //BYTECODE_POS: 641 // depth = 0
 v22 = 4;                          //BYTECODE_POS: 644 
 executionStack[23] = v22;         //BYTECODE_POS: 646 // depth = 0
 v22 = 5;                          //BYTECODE_POS: 649 
 executionStack[24] = v22;         //BYTECODE_POS: 651 // depth = 0
 v22 = executionStack[24];         //BYTECODE_POS: 654 depth
 executionStack[25] = v22;         //BYTECODE_POS: 657 // depth = 0
 v22 = executionStack[2];          //BYTECODE_POS: 660 depth
 v23 = v22                         //BYTECODE_POS: 663 
 v23 = v23.indexOf;                //BYTECODE_POS: 664 
 v24 = "firefox/"                  //BYTECODE_POS: 666 
 v22 = v23(v24);                   //BYTECODE_POS: 668 // context 22 could be custom vm or native func
 v23 = 0;                          //BYTECODE_POS: 670 
 v22 = v22 >= v23                  //BYTECODE_POS: 672 
 // if (!v22) skip to 682          //BYTECODE_POS: 673 
 v22 = executionStack[22];         //BYTECODE_POS: 675 depth
 executionStack[25] = v22;         //BYTECODE_POS: 678 // depth = 0
 // go foward to 799               //BYTECODE_POS: 681 
 v22 = executionStack[2];          //BYTECODE_POS: 683 depth
 v23 = v22                         //BYTECODE_POS: 686 
 v23 = v23.indexOf;                //BYTECODE_POS: 687 
 v24 = "opera/"                    //BYTECODE_POS: 689 
 v22 = v23(v24);                   //BYTECODE_POS: 691 // context 22 could be custom vm or native func
 v23 = 0;                          //BYTECODE_POS: 693 
 v22 = v22 >= v23                  //BYTECODE_POS: 695 
 // if (v22) skip 13               //BYTECODE_POS: 696 
 v23 = executionStack[2];          //BYTECODE_POS: 698 depth
 v24 = v23                         //BYTECODE_POS: 701 
 v24 = v24.indexOf;                //BYTECODE_POS: 702 
 v25 = " opr/"                     //BYTECODE_POS: 704 
 v23 = v24(v25);                   //BYTECODE_POS: 706 // context 23 could be custom vm or native func
 v24 = 0;                          //BYTECODE_POS: 708 
 v23 = v23 >= v24                  //BYTECODE_POS: 710 
 // if (v23) skip 10               //BYTECODE_POS: 711 
 v24 = executionStack[2];          //BYTECODE_POS: 713 depth
 v25 = v24                         //BYTECODE_POS: 716 
 v25 = v25.indexOf;                //BYTECODE_POS: 717 
 v26 = " opt/"                     //BYTECODE_POS: 719 
 v24 = v25(v26);                   //BYTECODE_POS: 721 // context 24 could be custom vm or native func
 // if (!v24) skip to 732          //BYTECODE_POS: 723 
 v24 = executionStack[21];         //BYTECODE_POS: 725 depth
 executionStack[25] = v24;         //BYTECODE_POS: 728 // depth = 0
 // go foward to 799               //BYTECODE_POS: 731 
 v24 = executionStack[2];          //BYTECODE_POS: 733 depth
 v25 = v24                         //BYTECODE_POS: 736 
 v25 = v25.indexOf;                //BYTECODE_POS: 737 
 v26 = "chrome/"                   //BYTECODE_POS: 739 
 v24 = v25(v26);                   //BYTECODE_POS: 741 // context 24 could be custom vm or native func
 v25 = 0;                          //BYTECODE_POS: 743 
 v24 = v24 >= v25                  //BYTECODE_POS: 745 
 // if (!v24) skip to 755          //BYTECODE_POS: 746 
 v24 = executionStack[20];         //BYTECODE_POS: 748 depth
 executionStack[25] = v24;         //BYTECODE_POS: 751 // depth = 0
 // go foward to 799               //BYTECODE_POS: 754 
 v24 = executionStack[2];          //BYTECODE_POS: 756 depth
 v25 = v24                         //BYTECODE_POS: 759 
 v25 = v25.indexOf;                //BYTECODE_POS: 760 
 v26 = "trident/"                  //BYTECODE_POS: 762 
 v24 = v25(v26);                   //BYTECODE_POS: 764 // context 24 could be custom vm or native func
 v25 = 0;                          //BYTECODE_POS: 766 
 v24 = v24 >= v25                  //BYTECODE_POS: 768 
 // if (v24) skip 13               //BYTECODE_POS: 769 
 v25 = executionStack[2];          //BYTECODE_POS: 771 depth
 v26 = v25                         //BYTECODE_POS: 774 
 v26 = v26.indexOf;                //BYTECODE_POS: 775 
 v27 = "msie"                      //BYTECODE_POS: 777 
 v25 = v26(v27);                   //BYTECODE_POS: 779 // context 25 could be custom vm or native func
 v26 = 0;                          //BYTECODE_POS: 781 
 v25 = v25 >= v26                  //BYTECODE_POS: 783 
 // if (!v25) skip to 793          //BYTECODE_POS: 784 
 v25 = executionStack[23];         //BYTECODE_POS: 786 depth
 executionStack[25] = v25;         //BYTECODE_POS: 789 // depth = 0
 // go foward to 799               //BYTECODE_POS: 792 
 v25 = executionStack[24];         //BYTECODE_POS: 794 depth
 executionStack[25] = v25;         //BYTECODE_POS: 797 // depth = 0
 v25 = undefined                   //BYTECODE_POS: 800 
 v26 = executionStack[0];          //BYTECODE_POS: 801 depth
 v27 = executionStack[2];          //BYTECODE_POS: 804 depth
 v28 = executionStack[3];          //BYTECODE_POS: 807 depth
 v28 = v28.slardarErrs;            //BYTECODE_POS: 810 
 v25 = v26(v27,v28);               //BYTECODE_POS: 812 // context 25 could be custom vm or native func
 v26 = v25                         //BYTECODE_POS: 814 
 v26 = v26.toLowerCase;            //BYTECODE_POS: 815 
 v25 = v26();                      //BYTECODE_POS: 817 // context 25 could be custom vm or native func
 executionStack[26] = v25;         //BYTECODE_POS: 819 // depth = 0
 v25 = undefined                   //BYTECODE_POS: 822 
 v26 = arguments;                  //BYTECODE_POS: 823 depth
 v27 = false;                      //BYTECODE_POS: 826 
 v25 = v26(v27);                   //BYTECODE_POS: 827 // context 25 could be custom vm or native func
 executionStack[27] = v25;         //BYTECODE_POS: 829 // depth = 0
 v25 = executionStack[27];         //BYTECODE_POS: 832 depth
 v25 = v25.data;                   //BYTECODE_POS: 835 
 v25 = v25.gpu;                    //BYTECODE_POS: 837 
 executionStack[28] = v25;         //BYTECODE_POS: 839 // depth = 0
 v25 = executionStack[28];         //BYTECODE_POS: 842 depth
 v26 = v25                         //BYTECODE_POS: 845 
 v26 = v26.toLowerCase;            //BYTECODE_POS: 846 
 v25 = v26();                      //BYTECODE_POS: 848 // context 25 could be custom vm or native func
 executionStack[29] = v25;         //BYTECODE_POS: 850 // depth = 0
 v25 = executionStack[25];         //BYTECODE_POS: 853 depth
 v26 = executionStack[20];         //BYTECODE_POS: 856 depth
 v25 = v25 !== v26;                //BYTECODE_POS: 859 
 // if (!v25) skip 7 to 868        //BYTECODE_POS: 860 
 v26 = executionStack[25];         //BYTECODE_POS: 862 depth
 v27 = executionStack[21];         //BYTECODE_POS: 865 depth
 v26 = v26 !== v27;                //BYTECODE_POS: 868 
 // if (!v26) skip 25 to 895       //BYTECODE_POS: 869 
 v27 = window                      //BYTECODE_POS: 871 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v27 = v27.chrome;                 //BYTECODE_POS: 873 
 // if (v27) skip 19               //BYTECODE_POS: 875 
 v28 = navigator                   //BYTECODE_POS: 877 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v28 = v28.vendor;                 //BYTECODE_POS: 879 
 v29 = v28                         //BYTECODE_POS: 881 
 v29 = v29.toString;               //BYTECODE_POS: 882 
 v28 = v29();                      //BYTECODE_POS: 884 // context 28 could be custom vm or native func
 v29 = v28                         //BYTECODE_POS: 886 
 v29 = v29.indexOf;                //BYTECODE_POS: 887 
 v30 = "Google"                    //BYTECODE_POS: 889 
 v28 = v29(v30);                   //BYTECODE_POS: 891 // context 28 could be custom vm or native func
 v29 = 0;                          //BYTECODE_POS: 893 
 v28 = v28 >= v29                  //BYTECODE_POS: 895 
 // if (!v28) skip to 899          //BYTECODE_POS: 896 
 v28 = true                        //BYTECODE_POS: 898 
 //return v28;                     //BYTECODE_POS: 899 
 v28 = executionStack[25];         //BYTECODE_POS: 900 depth
 v29 = executionStack[20];         //BYTECODE_POS: 903 depth
 v28 = v28 !== v29;                //BYTECODE_POS: 906 
 // if (!v28) skip 7 to 915        //BYTECODE_POS: 907 
 v29 = executionStack[25];         //BYTECODE_POS: 909 depth
 v30 = executionStack[21];         //BYTECODE_POS: 912 depth
 v29 = v29 !== v30;                //BYTECODE_POS: 915 
 // if (!v29) skip 13 to 930       //BYTECODE_POS: 916 
 v30 = executionStack[26];         //BYTECODE_POS: 918 depth
 v31 = v30                         //BYTECODE_POS: 921 
 v31 = v31.indexOf;                //BYTECODE_POS: 922 
 v32 = "chrome"                    //BYTECODE_POS: 924 
 v30 = v31(v32);                   //BYTECODE_POS: 926 // context 30 could be custom vm or native func
 v31 = 0;                          //BYTECODE_POS: 928 
 v30 = v30 >= v31                  //BYTECODE_POS: 930 
 // if (!v30) skip to 934          //BYTECODE_POS: 931 
 v30 = true                        //BYTECODE_POS: 933 
 //return v30;                     //BYTECODE_POS: 934 
 v30 = executionStack[25];         //BYTECODE_POS: 935 depth
 v31 = executionStack[23];         //BYTECODE_POS: 938 depth
 v30 = v30 === v31                 //BYTECODE_POS: 941 
 // if (!v30) skip 6 to 949        //BYTECODE_POS: 942 
 v31 = executionStack[29];         //BYTECODE_POS: 944 depth
 v32 = ""                          //BYTECODE_POS: 947 
 v31 = v31 !== v32;                //BYTECODE_POS: 949 
 // if (!v31) skip to 953          //BYTECODE_POS: 950 
 v31 = true                        //BYTECODE_POS: 952 
 //return v31;                     //BYTECODE_POS: 953 
 v31 = false;                      //BYTECODE_POS: 954 
 //return v31;                     //BYTECODE_POS: 955 
}