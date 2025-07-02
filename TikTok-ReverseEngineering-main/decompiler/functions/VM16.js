function VM16() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19,v20,v21,v22,v23,v24,v25,v26,v27; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = document                     //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.screen;                   //BYTECODE_POS: 8 
 executionStack[3] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = window                       //BYTECODE_POS: 13 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.innerWidth;               //BYTECODE_POS: 15 
 v1 = 0;                           //BYTECODE_POS: 17 
 v0 >>>= v1;                       //BYTECODE_POS: 19 
 executionStack[4] = v0;           //BYTECODE_POS: 20 // depth = 0
 v0 = window                       //BYTECODE_POS: 23 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.innerHeight;              //BYTECODE_POS: 25 
 v1 = 0;                           //BYTECODE_POS: 27 
 v0 >>>= v1;                       //BYTECODE_POS: 29 
 executionStack[5] = v0;           //BYTECODE_POS: 30 // depth = 0
 v0 = window                       //BYTECODE_POS: 33 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.outerWidth;               //BYTECODE_POS: 35 
 v1 = 0;                           //BYTECODE_POS: 37 
 v0 >>>= v1;                       //BYTECODE_POS: 39 
 executionStack[6] = v0;           //BYTECODE_POS: 40 // depth = 0
 v0 = window                       //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.outerHeight;              //BYTECODE_POS: 45 
 v1 = 0;                           //BYTECODE_POS: 47 
 v0 >>>= v1;                       //BYTECODE_POS: 49 
 executionStack[7] = v0;           //BYTECODE_POS: 50 // depth = 0
 v0 = Math                         //BYTECODE_POS: 53 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 55 
 v1 = v1.floor;                    //BYTECODE_POS: 56 
 v2 = window                       //BYTECODE_POS: 58 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.screenX;                  //BYTECODE_POS: 60 
 v0 = v1(v2);                      //BYTECODE_POS: 62 // context 0 could be custom vm or native func
 executionStack[8] = v0;           //BYTECODE_POS: 64 // depth = 0
 v0 = Math                         //BYTECODE_POS: 67 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 69 
 v1 = v1.floor;                    //BYTECODE_POS: 70 
 v2 = window                       //BYTECODE_POS: 72 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.screenY;                  //BYTECODE_POS: 74 
 v0 = v1(v2);                      //BYTECODE_POS: 76 // context 0 could be custom vm or native func
 executionStack[9] = v0;           //BYTECODE_POS: 78 // depth = 0
 v0 = Math                         //BYTECODE_POS: 81 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 83 
 v1 = v1.max;                      //BYTECODE_POS: 84 
 v2 = 0;                           //BYTECODE_POS: 86 
 v3 = Math                         //BYTECODE_POS: 88 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v3                           //BYTECODE_POS: 90 
 v4 = v4.floor;                    //BYTECODE_POS: 91 
 v5 = window                       //BYTECODE_POS: 93 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5.pageXOffset;              //BYTECODE_POS: 95 
 v3 = v4(v5);                      //BYTECODE_POS: 97 // context 3 could be custom vm or native func
 v0 = v1(v2,v3);                   //BYTECODE_POS: 99 // context 0 could be custom vm or native func
 executionStack[10] = v0;          //BYTECODE_POS: 101 // depth = 0
 v0 = Math                         //BYTECODE_POS: 104 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 106 
 v1 = v1.max;                      //BYTECODE_POS: 107 
 v2 = 0;                           //BYTECODE_POS: 109 
 v3 = Math                         //BYTECODE_POS: 111 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v3                           //BYTECODE_POS: 113 
 v4 = v4.floor;                    //BYTECODE_POS: 114 
 v5 = window                       //BYTECODE_POS: 116 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5.pageYOffset;              //BYTECODE_POS: 118 
 v3 = v4(v5);                      //BYTECODE_POS: 120 // context 3 could be custom vm or native func
 v0 = v1(v2,v3);                   //BYTECODE_POS: 122 // context 0 could be custom vm or native func
 executionStack[11] = v0;          //BYTECODE_POS: 124 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 127 depth
 v0 = v0.availWidth;               //BYTECODE_POS: 130 
 v1 = 0;                           //BYTECODE_POS: 132 
 v0 >>>= v1;                       //BYTECODE_POS: 134 
 executionStack[12] = v0;          //BYTECODE_POS: 135 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 138 depth
 v0 = v0.availHeight;              //BYTECODE_POS: 141 
 v1 = 0;                           //BYTECODE_POS: 143 
 v0 >>>= v1;                       //BYTECODE_POS: 145 
 executionStack[13] = v0;          //BYTECODE_POS: 146 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 149 depth
 v0 = v0.width;                    //BYTECODE_POS: 152 
 v1 = 0;                           //BYTECODE_POS: 154 
 v0 >>>= v1;                       //BYTECODE_POS: 156 
 executionStack[14] = v0;          //BYTECODE_POS: 157 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 160 depth
 v0 = v0.height;                   //BYTECODE_POS: 163 
 v1 = 0;                           //BYTECODE_POS: 165 
 v0 >>>= v1;                       //BYTECODE_POS: 167 
 executionStack[15] = v0;          //BYTECODE_POS: 168 // depth = 0
 v0 = {};                          //BYTECODE_POS: 171 
 v1 = 0;                           //BYTECODE_POS: 172 
 v1 = undefined;                   //BYTECODE_POS: 174 
 v2 = executionStack[4];           //BYTECODE_POS: 175 depth
 v1 = v1 !== v2;                   //BYTECODE_POS: 178 
 // if (!v1) skip to 185           //BYTECODE_POS: 179 
 v1 = executionStack[4];           //BYTECODE_POS: 181 depth
 // go foward to 188               //BYTECODE_POS: 184 
 v2 = 1;                           //BYTECODE_POS: 186 
 v2 = -v2                          //BYTECODE_POS: 188 
 v1.innerWidth = v2;               //BYTECODE_POS: 189 
 v2 = 0;                           //BYTECODE_POS: 191 
 v2 = undefined;                   //BYTECODE_POS: 193 
 v3 = executionStack[4];           //BYTECODE_POS: 194 depth
 v2 = v2 !== v3;                   //BYTECODE_POS: 197 
 // if (!v2) skip to 204           //BYTECODE_POS: 198 
 v2 = executionStack[5];           //BYTECODE_POS: 200 depth
 // go foward to 207               //BYTECODE_POS: 203 
 v3 = 1;                           //BYTECODE_POS: 205 
 v3 = -v3                          //BYTECODE_POS: 207 
 v2.innerHeight = v3;              //BYTECODE_POS: 208 
 v3 = 0;                           //BYTECODE_POS: 210 
 v3 = undefined;                   //BYTECODE_POS: 212 
 v4 = executionStack[6];           //BYTECODE_POS: 213 depth
 v3 = v3 !== v4;                   //BYTECODE_POS: 216 
 // if (!v3) skip to 223           //BYTECODE_POS: 217 
 v3 = executionStack[6];           //BYTECODE_POS: 219 depth
 // go foward to 226               //BYTECODE_POS: 222 
 v4 = 1;                           //BYTECODE_POS: 224 
 v4 = -v4                          //BYTECODE_POS: 226 
 v3.outerWidth = v4;               //BYTECODE_POS: 227 
 v4 = 0;                           //BYTECODE_POS: 229 
 v4 = undefined;                   //BYTECODE_POS: 231 
 v5 = executionStack[7];           //BYTECODE_POS: 232 depth
 v4 = v4 !== v5;                   //BYTECODE_POS: 235 
 // if (!v4) skip to 242           //BYTECODE_POS: 236 
 v4 = executionStack[7];           //BYTECODE_POS: 238 depth
 // go foward to 245               //BYTECODE_POS: 241 
 v5 = 1;                           //BYTECODE_POS: 243 
 v5 = -v5                          //BYTECODE_POS: 245 
 v4.outerHeight = v5;              //BYTECODE_POS: 246 
 v5 = 0;                           //BYTECODE_POS: 248 
 v5 = undefined;                   //BYTECODE_POS: 250 
 v6 = executionStack[8];           //BYTECODE_POS: 251 depth
 v5 = v5 !== v6;                   //BYTECODE_POS: 254 
 // if (!v5) skip to 261           //BYTECODE_POS: 255 
 v5 = executionStack[8];           //BYTECODE_POS: 257 depth
 // go foward to 264               //BYTECODE_POS: 260 
 v6 = 1;                           //BYTECODE_POS: 262 
 v6 = -v6                          //BYTECODE_POS: 264 
 v5.screenX = v6;                  //BYTECODE_POS: 265 
 v6 = 0;                           //BYTECODE_POS: 267 
 v6 = undefined;                   //BYTECODE_POS: 269 
 v7 = executionStack[9];           //BYTECODE_POS: 270 depth
 v6 = v6 !== v7;                   //BYTECODE_POS: 273 
 // if (!v6) skip to 280           //BYTECODE_POS: 274 
 v6 = executionStack[9];           //BYTECODE_POS: 276 depth
 // go foward to 283               //BYTECODE_POS: 279 
 v7 = 1;                           //BYTECODE_POS: 281 
 v7 = -v7                          //BYTECODE_POS: 283 
 v6.screenY = v7;                  //BYTECODE_POS: 284 
 v7 = 0;                           //BYTECODE_POS: 286 
 v7 = undefined;                   //BYTECODE_POS: 288 
 v8 = executionStack[10];          //BYTECODE_POS: 289 depth
 v7 = v7 !== v8;                   //BYTECODE_POS: 292 
 // if (!v7) skip to 299           //BYTECODE_POS: 293 
 v7 = executionStack[10];          //BYTECODE_POS: 295 depth
 // go foward to 302               //BYTECODE_POS: 298 
 v8 = 1;                           //BYTECODE_POS: 300 
 v8 = -v8                          //BYTECODE_POS: 302 
 v7.pageXOffset = v8;              //BYTECODE_POS: 303 
 v8 = 0;                           //BYTECODE_POS: 305 
 v8 = undefined;                   //BYTECODE_POS: 307 
 v9 = executionStack[11];          //BYTECODE_POS: 308 depth
 v8 = v8 !== v9;                   //BYTECODE_POS: 311 
 // if (!v8) skip to 318           //BYTECODE_POS: 312 
 v8 = executionStack[11];          //BYTECODE_POS: 314 depth
 // go foward to 321               //BYTECODE_POS: 317 
 v9 = 1;                           //BYTECODE_POS: 319 
 v9 = -v9                          //BYTECODE_POS: 321 
 v8.pageYOffset = v9;              //BYTECODE_POS: 322 
 v9 = 0;                           //BYTECODE_POS: 324 
 v9 = undefined;                   //BYTECODE_POS: 326 
 v10 = executionStack[12];         //BYTECODE_POS: 327 depth
 v9 = v9 !== v10;                  //BYTECODE_POS: 330 
 // if (!v9) skip to 337           //BYTECODE_POS: 331 
 v9 = executionStack[12];          //BYTECODE_POS: 333 depth
 // go foward to 340               //BYTECODE_POS: 336 
 v10 = 1;                          //BYTECODE_POS: 338 
 v10 = -v10                        //BYTECODE_POS: 340 
 v9.availWidth = v10;              //BYTECODE_POS: 341 
 v10 = 0;                          //BYTECODE_POS: 343 
 v10 = undefined;                  //BYTECODE_POS: 345 
 v11 = executionStack[13];         //BYTECODE_POS: 346 depth
 v10 = v10 !== v11;                //BYTECODE_POS: 349 
 // if (!v10) skip to 356          //BYTECODE_POS: 350 
 v10 = executionStack[13];         //BYTECODE_POS: 352 depth
 // go foward to 359               //BYTECODE_POS: 355 
 v11 = 1;                          //BYTECODE_POS: 357 
 v11 = -v11                        //BYTECODE_POS: 359 
 v10.availHeight = v11;            //BYTECODE_POS: 360 
 v11 = 0;                          //BYTECODE_POS: 362 
 v11 = undefined;                  //BYTECODE_POS: 364 
 v12 = executionStack[14];         //BYTECODE_POS: 365 depth
 v11 = v11 !== v12;                //BYTECODE_POS: 368 
 // if (!v11) skip to 375          //BYTECODE_POS: 369 
 v11 = executionStack[14];         //BYTECODE_POS: 371 depth
 // go foward to 378               //BYTECODE_POS: 374 
 v12 = 1;                          //BYTECODE_POS: 376 
 v12 = -v12                        //BYTECODE_POS: 378 
 v11.sizeWidth = v12;              //BYTECODE_POS: 379 
 v12 = 0;                          //BYTECODE_POS: 381 
 v12 = undefined;                  //BYTECODE_POS: 383 
 v13 = executionStack[15];         //BYTECODE_POS: 384 depth
 v12 = v12 !== v13;                //BYTECODE_POS: 387 
 // if (!v12) skip to 394          //BYTECODE_POS: 388 
 v12 = executionStack[15];         //BYTECODE_POS: 390 depth
 // go foward to 397               //BYTECODE_POS: 393 
 v13 = 1;                          //BYTECODE_POS: 395 
 v13 = -v13                        //BYTECODE_POS: 397 
 v12.sizeHeight = v13;             //BYTECODE_POS: 398 
 v13 = executionStack[2];          //BYTECODE_POS: 400 depth
 v13 = v13.body;                   //BYTECODE_POS: 403 
 // if (!v13) skip to 418          //BYTECODE_POS: 405 
 v13 = executionStack[2];          //BYTECODE_POS: 407 depth
 v13 = v13.body;                   //BYTECODE_POS: 410 
 v13 = v13.clientWidth;            //BYTECODE_POS: 412 
 v14 = 0;                          //BYTECODE_POS: 414 
 v13 >>>= v14;                     //BYTECODE_POS: 416 
 // go foward to 421               //BYTECODE_POS: 417 
 v14 = 1;                          //BYTECODE_POS: 419 
 v14 = -v14                        //BYTECODE_POS: 421 
 v13.clientWidth = v14;            //BYTECODE_POS: 422 
 v14 = executionStack[2];          //BYTECODE_POS: 424 depth
 v14 = v14.body;                   //BYTECODE_POS: 427 
 // if (!v14) skip to 442          //BYTECODE_POS: 429 
 v14 = executionStack[2];          //BYTECODE_POS: 431 depth
 v14 = v14.body;                   //BYTECODE_POS: 434 
 v14 = v14.clientHeight;           //BYTECODE_POS: 436 
 v15 = 0;                          //BYTECODE_POS: 438 
 v14 >>>= v15;                     //BYTECODE_POS: 440 
 // go foward to 445               //BYTECODE_POS: 441 
 v15 = 1;                          //BYTECODE_POS: 443 
 v15 = -v15                        //BYTECODE_POS: 445 
 v14.clientHeight = v15;           //BYTECODE_POS: 446 
 v15 = executionStack[3];          //BYTECODE_POS: 448 depth
 v15 = v15.colorDepth;             //BYTECODE_POS: 451 
 v16 = 0;                          //BYTECODE_POS: 453 
 v15 >>>= v16;                     //BYTECODE_POS: 455 
 v14.colorDepth = v15;             //BYTECODE_POS: 456 
 v15 = executionStack[3];          //BYTECODE_POS: 458 depth
 v15 = v15.pixelDepth;             //BYTECODE_POS: 461 
 v16 = 0;                          //BYTECODE_POS: 463 
 v15 >>>= v16;                     //BYTECODE_POS: 465 
 v14.pixelDepth = v15;             //BYTECODE_POS: 466 
 v15 = executionStack[2];          //BYTECODE_POS: 468 depth
 v16 = v15                         //BYTECODE_POS: 471 
 v16 = v16.hasFocus;               //BYTECODE_POS: 472 
 v15 = v16();                      //BYTECODE_POS: 474 // context 15 could be custom vm or native func
 // if (!v15) skip to 481          //BYTECODE_POS: 476 
 v15 = 1;                          //BYTECODE_POS: 478 
 // go foward to 483               //BYTECODE_POS: 480 
 v16 = 2;                          //BYTECODE_POS: 482 
 v15.focus = v16;                  //BYTECODE_POS: 484 
 v16 = executionStack[2];          //BYTECODE_POS: 486 depth
 v16 = v16.hidden;                 //BYTECODE_POS: 489 
 // if (!v16) skip to 496          //BYTECODE_POS: 491 
 v16 = 1;                          //BYTECODE_POS: 493 
 // go foward to 498               //BYTECODE_POS: 495 
 v17 = 2;                          //BYTECODE_POS: 497 
 v16.hidden = v17;                 //BYTECODE_POS: 499 
 v17 = executionStack[2];          //BYTECODE_POS: 501 depth
 v17 = v17.visibilityState;        //BYTECODE_POS: 504 
 v16.visibilityState = v17;        //BYTECODE_POS: 506 
 v17 = typeof globalThis.locationbar//BYTECODE_POS: 508 
 v18 = "undefined"                 //BYTECODE_POS: 510 
 v17 = v17 === v18                 //BYTECODE_POS: 512 
 // if (!v17) skip to 518          //BYTECODE_POS: 513 
 v17 = "undefined"                 //BYTECODE_POS: 515 
 // go foward to 526               //BYTECODE_POS: 517 
 v18 = undefined                   //BYTECODE_POS: 519 
 v19 = executionStack[0];          //BYTECODE_POS: 520 depth
 v20 = locationbar                 //BYTECODE_POS: 523 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v18 = v19(v20);                   //BYTECODE_POS: 525 // context 18 could be custom vm or native func
 v19 = "object"                    //BYTECODE_POS: 527 
 v18 = v18 !== v19;                //BYTECODE_POS: 529 
 // if (!v18) skip to 535          //BYTECODE_POS: 530 
 v18 = 0;                          //BYTECODE_POS: 532 
 // go foward to 547               //BYTECODE_POS: 534 
 v19 = locationbar                 //BYTECODE_POS: 536 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v19 = v19.visible;                //BYTECODE_POS: 538 
 // if (!v19) skip to 545          //BYTECODE_POS: 540 
 v19 = 1;                          //BYTECODE_POS: 542 
 // go foward to 547               //BYTECODE_POS: 544 
 v20 = 2;                          //BYTECODE_POS: 546 
 v19.location = v20;               //BYTECODE_POS: 548 
 v20 = typeof globalThis.menubar   //BYTECODE_POS: 550 
 v21 = "undefined"                 //BYTECODE_POS: 552 
 v20 = v20 === v21                 //BYTECODE_POS: 554 
 // if (!v20) skip to 560          //BYTECODE_POS: 555 
 v20 = "undefined"                 //BYTECODE_POS: 557 
 // go foward to 568               //BYTECODE_POS: 559 
 v21 = undefined                   //BYTECODE_POS: 561 
 v22 = executionStack[0];          //BYTECODE_POS: 562 depth
 v23 = menubar                     //BYTECODE_POS: 565 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v21 = v22(v23);                   //BYTECODE_POS: 567 // context 21 could be custom vm or native func
 v22 = "object"                    //BYTECODE_POS: 569 
 v21 = v21 !== v22;                //BYTECODE_POS: 571 
 // if (!v21) skip to 577          //BYTECODE_POS: 572 
 v21 = 0;                          //BYTECODE_POS: 574 
 // go foward to 589               //BYTECODE_POS: 576 
 v22 = locationbar                 //BYTECODE_POS: 578 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v22 = v22.visible;                //BYTECODE_POS: 580 
 // if (!v22) skip to 587          //BYTECODE_POS: 582 
 v22 = 1;                          //BYTECODE_POS: 584 
 // go foward to 589               //BYTECODE_POS: 586 
 v23 = 2;                          //BYTECODE_POS: 588 
 v22.menubar = v23;                //BYTECODE_POS: 590 
 v23 = typeof globalThis.scrollbar //BYTECODE_POS: 592 
 v24 = "undefined"                 //BYTECODE_POS: 594 
 v23 = v23 === v24                 //BYTECODE_POS: 596 
 // if (!v23) skip to 602          //BYTECODE_POS: 597 
 v23 = "undefined"                 //BYTECODE_POS: 599 
 // go foward to 610               //BYTECODE_POS: 601 
 v24 = undefined                   //BYTECODE_POS: 603 
 v25 = executionStack[0];          //BYTECODE_POS: 604 depth
 v26 = scrollbar                   //BYTECODE_POS: 607 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v24 = v25(v26);                   //BYTECODE_POS: 609 // context 24 could be custom vm or native func
 v25 = "object"                    //BYTECODE_POS: 611 
 v24 = v24 !== v25;                //BYTECODE_POS: 613 
 // if (!v24) skip to 619          //BYTECODE_POS: 614 
 v24 = 0;                          //BYTECODE_POS: 616 
 // go foward to 631               //BYTECODE_POS: 618 
 v25 = scrollbars                  //BYTECODE_POS: 620 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v25 = v25.visible;                //BYTECODE_POS: 622 
 // if (!v25) skip to 629          //BYTECODE_POS: 624 
 v25 = 1;                          //BYTECODE_POS: 626 
 // go foward to 631               //BYTECODE_POS: 628 
 v26 = 2;                          //BYTECODE_POS: 630 
 v25.scrollbar = v26;              //BYTECODE_POS: 632 
 v26 = undefined                   //BYTECODE_POS: 634 
 v27 = executionStack[0];          //BYTECODE_POS: 635 depth
 v28 = executionStack[3];          //BYTECODE_POS: 638 depth
 v28 = v28.orientation;            //BYTECODE_POS: 641 
 v26 = v27(v28);                   //BYTECODE_POS: 643 // context 26 could be custom vm or native func
 v27 = "object"                    //BYTECODE_POS: 645 
 v26 = v26 !== v27;                //BYTECODE_POS: 647 
 // if (!v26) skip to 653          //BYTECODE_POS: 648 
 v26 = "undefined"                 //BYTECODE_POS: 650 
 // go foward to 660               //BYTECODE_POS: 652 
 v27 = executionStack[3];          //BYTECODE_POS: 654 depth
 v27 = v27.orientation;            //BYTECODE_POS: 657 
 v27 = v27.type;                   //BYTECODE_POS: 659 
 v26.orientation = v27;            //BYTECODE_POS: 661 
 executionStack[16] = v26;         //BYTECODE_POS: 663 // depth = 0
 v26 = executionStack[16];         //BYTECODE_POS: 666 depth
 //return v26;                     //BYTECODE_POS: 669 
 // go foward to 695               //BYTECODE_POS: 670 
 executionStack[17] = v25;         //BYTECODE_POS: 672 // depth = 0
 v25 = executionStack[11];         //BYTECODE_POS: 675 depth
 v26 = v25                         //BYTECODE_POS: 678 
 v26 = v26.push;                   //BYTECODE_POS: 679 
 v27 = {};                         //BYTECODE_POS: 681 
 v28 = executionStack[17];         //BYTECODE_POS: 682 depth
 v27.err = v28;                    //BYTECODE_POS: 685 
 v28 = "d_s"                       //BYTECODE_POS: 687 
 v27.type = v28;                   //BYTECODE_POS: 689 
 v25 = v26(v27);                   //BYTECODE_POS: 691 // context 25 could be custom vm or native func
 v25 = {};                         //BYTECODE_POS: 694 
 //return v25;                     //BYTECODE_POS: 695 
 v25 = undefined                   //BYTECODE_POS: 696 
 //return v25;                     //BYTECODE_POS: 697 
}