function VM144() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = arguments;                   //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 v1 = 0;                           //BYTECODE_POS: 6 
 v0 = v0 > v1                      //BYTECODE_POS: 8 
 // if (!v0) skip 7 to 17          //BYTECODE_POS: 9 
 v1 = arguments;                   //BYTECODE_POS: 11 depth
 v1 = v1[0];                       //BYTECODE_POS: 14 
 v2 = undefined                    //BYTECODE_POS: 16 
 v1 = v1 !== v2;                   //BYTECODE_POS: 17 
 // if (!v1) skip to 26            //BYTECODE_POS: 18 
 v1 = arguments;                   //BYTECODE_POS: 20 depth
 v1 = v1[0];                       //BYTECODE_POS: 23 
 // go foward to 27                //BYTECODE_POS: 25 
 v2 = false;                       //BYTECODE_POS: 27 
 executionStack[2] = v2;           //BYTECODE_POS: 28 // depth = 0
 v2 = executionStack[3];           //BYTECODE_POS: 31 depth
 v3 = 1;                           //BYTECODE_POS: 34 
 v2 += v3                          //BYTECODE_POS: 36 
 //get depth of 1 from executionStack//BYTECODE_POS: 37 
 v3 = executionStack;              //BYTECODE_POS: 37 
 v4 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v3[v4] = v2                       //BYTECODE_POS: 40 
 v2 = {};                          //BYTECODE_POS: 42 
 executionStack[3] = v2;           //BYTECODE_POS: 43 // depth = 0
 v2 = ""                           //BYTECODE_POS: 46 
 executionStack[4] = v2;           //BYTECODE_POS: 48 // depth = 0
 v2 = executionStack[2];           //BYTECODE_POS: 51 depth
 // if (!v2) skip 5 to 60          //BYTECODE_POS: 54 
 v3 = executionStack[2];           //BYTECODE_POS: 56 depth
 v3 = v3.WEBGL;                    //BYTECODE_POS: 59 
 // if (!v3) skip 5 to 67          //BYTECODE_POS: 61 
 v4 = executionStack[2];           //BYTECODE_POS: 63 depth
 v4 = v4.VENDOR;                   //BYTECODE_POS: 66 
 // if (!v4) skip 5 to 74          //BYTECODE_POS: 68 
 v5 = executionStack[2];           //BYTECODE_POS: 70 depth
 v5 = v5.RENDERER;                 //BYTECODE_POS: 73 
 // if (!v5) skip to 103           //BYTECODE_POS: 75 
 v5 = executionStack[2];           //BYTECODE_POS: 77 depth
 v5 = v5.WEBGL;                    //BYTECODE_POS: 80 
 executionStack[3] = v5;           //BYTECODE_POS: 82 // depth = 0
 v5 = executionStack[2];           //BYTECODE_POS: 85 depth
 v5 = v5.VENDOR;                   //BYTECODE_POS: 88 
 v6 = "/"                          //BYTECODE_POS: 90 
 v5 += v6                          //BYTECODE_POS: 92 
 v6 = executionStack[2];           //BYTECODE_POS: 93 depth
 v6 = v6.RENDERER;                 //BYTECODE_POS: 96 
 v5 += v6                          //BYTECODE_POS: 98 
 executionStack[4] = v5;           //BYTECODE_POS: 99 // depth = 0
 // go foward to 505               //BYTECODE_POS: 102 
 v5 = undefined                    //BYTECODE_POS: 104 
 v6 = executionStack[5];           //BYTECODE_POS: 105 depth
 v5 = v6();                        //BYTECODE_POS: 108 // context 5 could be custom vm or native func
 executionStack[5] = v5;           //BYTECODE_POS: 110 // depth = 0
 v5 = executionStack[5];           //BYTECODE_POS: 113 depth
 v5 = !v5                          //BYTECODE_POS: 116 
 // if (!v5) skip to 130           //BYTECODE_POS: 117 
 v5 = {};                          //BYTECODE_POS: 119 
 v6 = {};                          //BYTECODE_POS: 120 
 v7 = {};                          //BYTECODE_POS: 121 
 v6.webglData = v7;                //BYTECODE_POS: 122 
 v7 = ""                           //BYTECODE_POS: 124 
 v6.gpu = v7;                      //BYTECODE_POS: 126 
 v5.data = v6;                     //BYTECODE_POS: 128 
 //return v5;                      //BYTECODE_POS: 130 
 v5 = {};                          //BYTECODE_POS: 131 
 v6 = executionStack[5];           //BYTECODE_POS: 132 depth
 v7 = v6                           //BYTECODE_POS: 135 
 v7 = v7.getSupportedExtensions;   //BYTECODE_POS: 136 
 v6 = v7();                        //BYTECODE_POS: 138 // context 6 could be custom vm or native func
 // if (v6) skip 2                 //BYTECODE_POS: 140 
 v7 = []                           //BYTECODE_POS: 142 
 v6.supportedExtensions = v7;      //BYTECODE_POS: 144 
 v7 = executionStack[5];           //BYTECODE_POS: 146 depth
 v8 = v7                           //BYTECODE_POS: 149 
 v8 = v8.getContextAttributes;     //BYTECODE_POS: 150 
 v7 = v8();                        //BYTECODE_POS: 152 // context 7 could be custom vm or native func
 v7 = v7.antialias;                //BYTECODE_POS: 154 
 // if (!v7) skip to 161           //BYTECODE_POS: 156 
 v7 = 1;                           //BYTECODE_POS: 158 
 // go foward to 163               //BYTECODE_POS: 160 
 v8 = 2;                           //BYTECODE_POS: 162 
 v7.antialias = v8;                //BYTECODE_POS: 164 
 v8 = executionStack[5];           //BYTECODE_POS: 166 depth
 v9 = v8                           //BYTECODE_POS: 169 
 v9 = v9.getParameter;             //BYTECODE_POS: 170 
 v10 = executionStack[5];          //BYTECODE_POS: 172 depth
 v10 = v10.BLUE_BITS;              //BYTECODE_POS: 175 
 v8 = v9(v10);                     //BYTECODE_POS: 177 // context 8 could be custom vm or native func
 v7.blueBits = v8;                 //BYTECODE_POS: 179 
 v8 = executionStack[5];           //BYTECODE_POS: 181 depth
 v9 = v8                           //BYTECODE_POS: 184 
 v9 = v9.getParameter;             //BYTECODE_POS: 185 
 v10 = executionStack[5];          //BYTECODE_POS: 187 depth
 v10 = v10.DEPTH_BITS;             //BYTECODE_POS: 190 
 v8 = v9(v10);                     //BYTECODE_POS: 192 // context 8 could be custom vm or native func
 v7.depthBits = v8;                //BYTECODE_POS: 194 
 v8 = executionStack[5];           //BYTECODE_POS: 196 depth
 v9 = v8                           //BYTECODE_POS: 199 
 v9 = v9.getParameter;             //BYTECODE_POS: 200 
 v10 = executionStack[5];          //BYTECODE_POS: 202 depth
 v10 = v10.GREEN_BITS;             //BYTECODE_POS: 205 
 v8 = v9(v10);                     //BYTECODE_POS: 207 // context 8 could be custom vm or native func
 v7.greenBits = v8;                //BYTECODE_POS: 209 
 v8 = undefined                    //BYTECODE_POS: 211 
 v9 = executionStack[6];           //BYTECODE_POS: 212 depth
 v10 = executionStack[5];          //BYTECODE_POS: 215 depth
 v8 = v9(v10);                     //BYTECODE_POS: 218 // context 8 could be custom vm or native func
 v7.maxAnisotropy = v8;            //BYTECODE_POS: 220 
 v8 = executionStack[5];           //BYTECODE_POS: 222 depth
 v9 = v8                           //BYTECODE_POS: 225 
 v9 = v9.getParameter;             //BYTECODE_POS: 226 
 v10 = executionStack[5];          //BYTECODE_POS: 228 depth
 v10 = v10.MAX_COMBINED_TEXTURE_IMAGE_UNITS;//BYTECODE_POS: 231 
 v8 = v9(v10);                     //BYTECODE_POS: 233 // context 8 could be custom vm or native func
 v7.maxCombinedTextureImageUnits = v8;//BYTECODE_POS: 235 
 v8 = executionStack[5];           //BYTECODE_POS: 237 depth
 v9 = v8                           //BYTECODE_POS: 240 
 v9 = v9.getParameter;             //BYTECODE_POS: 241 
 v10 = executionStack[5];          //BYTECODE_POS: 243 depth
 v10 = v10.MAX_CUBE_MAP_TEXTURE_SIZE;//BYTECODE_POS: 246 
 v8 = v9(v10);                     //BYTECODE_POS: 248 // context 8 could be custom vm or native func
 v7.maxCubeMapTextureSize = v8;    //BYTECODE_POS: 250 
 v8 = executionStack[5];           //BYTECODE_POS: 252 depth
 v9 = v8                           //BYTECODE_POS: 255 
 v9 = v9.getParameter;             //BYTECODE_POS: 256 
 v10 = executionStack[5];          //BYTECODE_POS: 258 depth
 v10 = v10.MAX_FRAGMENT_UNIFORM_VECTORS;//BYTECODE_POS: 261 
 v8 = v9(v10);                     //BYTECODE_POS: 263 // context 8 could be custom vm or native func
 v7.maxFragmentUniformVectors = v8;//BYTECODE_POS: 265 
 v8 = executionStack[5];           //BYTECODE_POS: 267 depth
 v9 = v8                           //BYTECODE_POS: 270 
 v9 = v9.getParameter;             //BYTECODE_POS: 271 
 v10 = executionStack[5];          //BYTECODE_POS: 273 depth
 v10 = v10.MAX_RENDERBUFFER_SIZE;  //BYTECODE_POS: 276 
 v8 = v9(v10);                     //BYTECODE_POS: 278 // context 8 could be custom vm or native func
 v7.maxRenderbufferSize = v8;      //BYTECODE_POS: 280 
 v8 = executionStack[5];           //BYTECODE_POS: 282 depth
 v9 = v8                           //BYTECODE_POS: 285 
 v9 = v9.getParameter;             //BYTECODE_POS: 286 
 v10 = executionStack[5];          //BYTECODE_POS: 288 depth
 v10 = v10.MAX_TEXTURE_IMAGE_UNITS;//BYTECODE_POS: 291 
 v8 = v9(v10);                     //BYTECODE_POS: 293 // context 8 could be custom vm or native func
 v7.maxTextureImageUnits = v8;     //BYTECODE_POS: 295 
 v8 = executionStack[5];           //BYTECODE_POS: 297 depth
 v9 = v8                           //BYTECODE_POS: 300 
 v9 = v9.getParameter;             //BYTECODE_POS: 301 
 v10 = executionStack[5];          //BYTECODE_POS: 303 depth
 v10 = v10.MAX_TEXTURE_SIZE;       //BYTECODE_POS: 306 
 v8 = v9(v10);                     //BYTECODE_POS: 308 // context 8 could be custom vm or native func
 v7.maxTextureSize = v8;           //BYTECODE_POS: 310 
 v8 = executionStack[5];           //BYTECODE_POS: 312 depth
 v9 = v8                           //BYTECODE_POS: 315 
 v9 = v9.getParameter;             //BYTECODE_POS: 316 
 v10 = executionStack[5];          //BYTECODE_POS: 318 depth
 v10 = v10.MAX_VARYING_VECTORS;    //BYTECODE_POS: 321 
 v8 = v9(v10);                     //BYTECODE_POS: 323 // context 8 could be custom vm or native func
 v7.maxVaryingVectors = v8;        //BYTECODE_POS: 325 
 v8 = executionStack[5];           //BYTECODE_POS: 327 depth
 v9 = v8                           //BYTECODE_POS: 330 
 v9 = v9.getParameter;             //BYTECODE_POS: 331 
 v10 = executionStack[5];          //BYTECODE_POS: 333 depth
 v10 = v10.MAX_VERTEX_ATTRIBS;     //BYTECODE_POS: 336 
 v8 = v9(v10);                     //BYTECODE_POS: 338 // context 8 could be custom vm or native func
 v7.maxVertexAttribs = v8;         //BYTECODE_POS: 340 
 v8 = executionStack[5];           //BYTECODE_POS: 342 depth
 v9 = v8                           //BYTECODE_POS: 345 
 v9 = v9.getParameter;             //BYTECODE_POS: 346 
 v10 = executionStack[5];          //BYTECODE_POS: 348 depth
 v10 = v10.MAX_VERTEX_TEXTURE_IMAGE_UNITS;//BYTECODE_POS: 351 
 v8 = v9(v10);                     //BYTECODE_POS: 353 // context 8 could be custom vm or native func
 v7.maxVertexTextureImageUnits = v8;//BYTECODE_POS: 355 
 v8 = executionStack[5];           //BYTECODE_POS: 357 depth
 v9 = v8                           //BYTECODE_POS: 360 
 v9 = v9.getParameter;             //BYTECODE_POS: 361 
 v10 = executionStack[5];          //BYTECODE_POS: 363 depth
 v10 = v10.MAX_VERTEX_UNIFORM_VECTORS;//BYTECODE_POS: 366 
 v8 = v9(v10);                     //BYTECODE_POS: 368 // context 8 could be custom vm or native func
 v7.maxVertexUniformVectors = v8;  //BYTECODE_POS: 370 
 v8 = executionStack[5];           //BYTECODE_POS: 372 depth
 v9 = v8                           //BYTECODE_POS: 375 
 v9 = v9.getParameter;             //BYTECODE_POS: 376 
 v10 = executionStack[5];          //BYTECODE_POS: 378 depth
 v10 = v10.SHADING_LANGUAGE_VERSION;//BYTECODE_POS: 381 
 v8 = v9(v10);                     //BYTECODE_POS: 383 // context 8 could be custom vm or native func
 v7.shadingLanguageVersion = v8;   //BYTECODE_POS: 385 
 v8 = executionStack[5];           //BYTECODE_POS: 387 depth
 v9 = v8                           //BYTECODE_POS: 390 
 v9 = v9.getParameter;             //BYTECODE_POS: 391 
 v10 = executionStack[5];          //BYTECODE_POS: 393 depth
 v10 = v10.STENCIL_BITS;           //BYTECODE_POS: 396 
 v8 = v9(v10);                     //BYTECODE_POS: 398 // context 8 could be custom vm or native func
 v7.stencilBits = v8;              //BYTECODE_POS: 400 
 v8 = executionStack[5];           //BYTECODE_POS: 402 depth
 v9 = v8                           //BYTECODE_POS: 405 
 v9 = v9.getParameter;             //BYTECODE_POS: 406 
 v10 = executionStack[5];          //BYTECODE_POS: 408 depth
 v10 = v10.VERSION;                //BYTECODE_POS: 411 
 v8 = v9(v10);                     //BYTECODE_POS: 413 // context 8 could be custom vm or native func
 v7.version = v8;                  //BYTECODE_POS: 415 
 executionStack[3] = v7;           //BYTECODE_POS: 417 // depth = 0
 v7 = executionStack[5];           //BYTECODE_POS: 420 depth
 v8 = v7                           //BYTECODE_POS: 423 
 v8 = v8.getExtension;             //BYTECODE_POS: 424 
 v9 = "WEBGL_debug_renderer_info"  //BYTECODE_POS: 426 
 v7 = v8(v9);                      //BYTECODE_POS: 428 // context 7 could be custom vm or native func
 executionStack[6] = v7;           //BYTECODE_POS: 430 // depth = 0
 v7 = executionStack[5];           //BYTECODE_POS: 433 depth
 v8 = v7                           //BYTECODE_POS: 436 
 v8 = v8.getParameter;             //BYTECODE_POS: 437 
 v9 = executionStack[6];           //BYTECODE_POS: 439 depth
 v9 = v9.UNMASKED_VENDOR_WEBGL;    //BYTECODE_POS: 442 
 v7 = v8(v9);                      //BYTECODE_POS: 444 // context 7 could be custom vm or native func
 executionStack[7] = v7;           //BYTECODE_POS: 446 // depth = 0
 v7 = executionStack[5];           //BYTECODE_POS: 449 depth
 v8 = v7                           //BYTECODE_POS: 452 
 v8 = v8.getParameter;             //BYTECODE_POS: 453 
 v9 = executionStack[6];           //BYTECODE_POS: 455 depth
 v9 = v9.UNMASKED_RENDERER_WEBGL;  //BYTECODE_POS: 458 
 v7 = v8(v9);                      //BYTECODE_POS: 460 // context 7 could be custom vm or native func
 executionStack[8] = v7;           //BYTECODE_POS: 462 // depth = 0
 v7 = executionStack[2];           //BYTECODE_POS: 465 depth
 v8 = executionStack[8];           //BYTECODE_POS: 468 depth
 v7.RENDERER = v7;                 //BYTECODE_POS: 471 
 v7 = executionStack[2];           //BYTECODE_POS: 473 depth
 v8 = executionStack[7];           //BYTECODE_POS: 476 depth
 v7.VENDOR = v7;                   //BYTECODE_POS: 479 
 v7 = executionStack[2];           //BYTECODE_POS: 481 depth
 v7 = v7.VENDOR;                   //BYTECODE_POS: 484 
 v8 = "/"                          //BYTECODE_POS: 486 
 v7 += v8                          //BYTECODE_POS: 488 
 v8 = executionStack[2];           //BYTECODE_POS: 489 depth
 v8 = v8.RENDERER;                 //BYTECODE_POS: 492 
 v7 += v8                          //BYTECODE_POS: 494 
 executionStack[4] = v7;           //BYTECODE_POS: 495 // depth = 0
 v7 = executionStack[2];           //BYTECODE_POS: 498 depth
 v8 = executionStack[3];           //BYTECODE_POS: 501 depth
 v7.WEBGL = v7;                    //BYTECODE_POS: 504 
 v7 = executionStack[2];           //BYTECODE_POS: 506 depth
 // if (!v7) skip to 557           //BYTECODE_POS: 509 
 v7 = {};                          //BYTECODE_POS: 511 
 executionStack[9] = v7;           //BYTECODE_POS: 512 // depth = 0
 v7 = undefined                    //BYTECODE_POS: 515 
 v8 = executionStack[0];           //BYTECODE_POS: 516 depth
 v9 = executionStack[9];           //BYTECODE_POS: 519 depth
 v10 = executionStack[3];          //BYTECODE_POS: 522 depth
 v7 = v8(v9,v10);                  //BYTECODE_POS: 525 // context 7 could be custom vm or native func
 v7 = executionStack[9];           //BYTECODE_POS: 528 depth
 v8 = executionStack[3];           //BYTECODE_POS: 531 depth
 v8 = v8.antialias;                //BYTECODE_POS: 534 
 v9 = 1;                           //BYTECODE_POS: 536 
 v8 = v8 === v9                    //BYTECODE_POS: 538 
 v7.antialias = v7;                //BYTECODE_POS: 539 
 v7 = {};                          //BYTECODE_POS: 541 
 v8 = {};                          //BYTECODE_POS: 542 
 v9 = executionStack[9];           //BYTECODE_POS: 543 depth
 v8.webglData = v9;                //BYTECODE_POS: 546 
 v9 = executionStack[4];           //BYTECODE_POS: 548 depth
 v8.gpu = v9;                      //BYTECODE_POS: 551 
 v7.data = v8;                     //BYTECODE_POS: 553 
 //return v7;                      //BYTECODE_POS: 555 
 // go foward to 577               //BYTECODE_POS: 556 
 v7 = executionStack[3];           //BYTECODE_POS: 558 depth
 v8 = executionStack[2];           //BYTECODE_POS: 561 depth
 v8 = v8.VENDOR;                   //BYTECODE_POS: 564 
 v7.vendor = v7;                   //BYTECODE_POS: 566 
 v7 = executionStack[3];           //BYTECODE_POS: 568 depth
 v8 = executionStack[2];           //BYTECODE_POS: 571 depth
 v8 = v8.RENDERER;                 //BYTECODE_POS: 574 
 v7.renderer = v7;                 //BYTECODE_POS: 576 
 v7 = {};                          //BYTECODE_POS: 578 
 v8 = {};                          //BYTECODE_POS: 579 
 v9 = executionStack[3];           //BYTECODE_POS: 580 depth
 v8.webglData = v9;                //BYTECODE_POS: 583 
 v9 = executionStack[4];           //BYTECODE_POS: 585 depth
 v8.gpu = v9;                      //BYTECODE_POS: 588 
 v7.data = v8;                     //BYTECODE_POS: 590 
 //return v7;                      //BYTECODE_POS: 592 
}