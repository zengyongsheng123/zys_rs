function VM86(arg0, arg1) {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM89;                //BYTECODE_POS: 1 
 executionStack[14] = v0;          //BYTECODE_POS: 3 // depth = 0
 v0 = functionVM94;                //BYTECODE_POS: 6 
 executionStack[15] = v0;          //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 11 depth
 // if (v0) skip 1                 //BYTECODE_POS: 14 
 v1 = {};                          //BYTECODE_POS: 16 
 executionStack[3] = v1;           //BYTECODE_POS: 17 // depth = 0
 v1 = executionStack[2];           //BYTECODE_POS: 20 depth
 // if (!v1) skip 6 to 30          //BYTECODE_POS: 23 
 v2 = executionStack[2];           //BYTECODE_POS: 25 depth
 v3 = Request                      //BYTECODE_POS: 28 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2 instanceof v3;            //BYTECODE_POS: 30 
 executionStack[4] = v2;           //BYTECODE_POS: 31 // depth = 0
 v2 = ""                           //BYTECODE_POS: 34 
 executionStack[5] = v2;           //BYTECODE_POS: 36 // depth = 0
 v2 = "GET"                        //BYTECODE_POS: 39 
 executionStack[6] = v2;           //BYTECODE_POS: 41 // depth = 0
 v2 = ""                           //BYTECODE_POS: 44 
 executionStack[7] = v2;           //BYTECODE_POS: 46 // depth = 0
 v2 = executionStack[4];           //BYTECODE_POS: 49 depth
 // if (!v2) skip to 249           //BYTECODE_POS: 52 
 v2 = executionStack[2];           //BYTECODE_POS: 54 depth
 v2 = v2.url;                      //BYTECODE_POS: 57 
 executionStack[5] = v2;           //BYTECODE_POS: 59 // depth = 0
 v2 = executionStack[2];           //BYTECODE_POS: 62 depth
 v2 = v2.method;                   //BYTECODE_POS: 65 
 // if (!v2) skip to 75            //BYTECODE_POS: 67 
 v2 = executionStack[2];           //BYTECODE_POS: 69 depth
 v2 = v2.method;                   //BYTECODE_POS: 72 
 // go foward to 77                //BYTECODE_POS: 74 
 v3 = "GET"                        //BYTECODE_POS: 76 
 executionStack[6] = v3;           //BYTECODE_POS: 78 // depth = 0
 v3 = undefined                    //BYTECODE_POS: 81 
 v4 = executionStack[9];           //BYTECODE_POS: 82 depth
 v5 = executionStack[5];           //BYTECODE_POS: 85 depth
 v3 = v4(v5);                      //BYTECODE_POS: 88 // context 3 could be custom vm or native func
 // if (!v3) skip 14 to 105        //BYTECODE_POS: 90 
 v4 = executionStack[6];           //BYTECODE_POS: 92 depth
 v5 = "GET"                        //BYTECODE_POS: 95 
 v4 = v4 === v5                    //BYTECODE_POS: 97 
 // if (v4) skip 6                 //BYTECODE_POS: 98 
 v5 = executionStack[6];           //BYTECODE_POS: 100 depth
 v6 = "POST"                       //BYTECODE_POS: 103 
 v5 = v5 === v6                    //BYTECODE_POS: 105 
 // if (!v5) skip to 234           //BYTECODE_POS: 106 
 v5 = URL                          //BYTECODE_POS: 108 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v6 = executionStack[5];           //BYTECODE_POS: 110 depth
 v5 = new v5()                     //BYTECODE_POS: 113 
 executionStack[8] = v5;           //BYTECODE_POS: 115 // depth = 0
 v5 = executionStack[2];           //BYTECODE_POS: 118 depth
 v5 = v5.grecaptcha;               //BYTECODE_POS: 121 
 // if (!v5) skip 7 to 131         //BYTECODE_POS: 123 
 v6 = executionStack[2];           //BYTECODE_POS: 125 depth
 v6 = v6.grecaptcha;               //BYTECODE_POS: 128 
 v6 = v6.enabledPaths;             //BYTECODE_POS: 130 
 // if (!v6) skip 17 to 150        //BYTECODE_POS: 132 
 v7 = executionStack[2];           //BYTECODE_POS: 134 depth
 v7 = v7.grecaptcha;               //BYTECODE_POS: 137 
 v7 = v7.enabledPaths;             //BYTECODE_POS: 139 
 v8 = v7                           //BYTECODE_POS: 141 
 v8 = v8.includes;                 //BYTECODE_POS: 142 
 v9 = executionStack[8];           //BYTECODE_POS: 144 depth
 v9 = v9.pathname;                 //BYTECODE_POS: 147 
 v7 = v8(v9);                      //BYTECODE_POS: 149 // context 7 could be custom vm or native func
 // if (!v7) skip to 225           //BYTECODE_POS: 151 
 v7 = executionStack[2];           //BYTECODE_POS: 153 depth
 v7 = v7.grecaptcha;               //BYTECODE_POS: 156 
 v7 = v7.enabledPathActionMap;     //BYTECODE_POS: 158 
 executionStack[9] = v7;           //BYTECODE_POS: 160 // depth = 0
 v7 = executionStack[9];           //BYTECODE_POS: 163 depth
 v8 = executionStack[8];           //BYTECODE_POS: 166 depth
 v8 = v8.pathname;                 //BYTECODE_POS: 169 
 v7 = v7[v8]                       //BYTECODE_POS: 171 
 // if (!v7) skip to 184           //BYTECODE_POS: 172 
 v7 = executionStack[9];           //BYTECODE_POS: 174 depth
 v8 = executionStack[8];           //BYTECODE_POS: 177 depth
 v8 = v8.pathname;                 //BYTECODE_POS: 180 
 v7 = v7[v8]                       //BYTECODE_POS: 182 
 // go foward to 189               //BYTECODE_POS: 183 
 v8 = executionStack[8];           //BYTECODE_POS: 185 depth
 v8 = v8.pathname;                 //BYTECODE_POS: 188 
 executionStack[10] = v8;          //BYTECODE_POS: 190 // depth = 0
 v8 = undefined                    //BYTECODE_POS: 193 
 v9 = executionStack[17];          //BYTECODE_POS: 194 depth
 v10 = executionStack[2];          //BYTECODE_POS: 197 depth
 v10 = v10.grecaptcha;             //BYTECODE_POS: 200 
 v10 = v10.siteKey;                //BYTECODE_POS: 202 
 v11 = executionStack[10];         //BYTECODE_POS: 204 depth
 v8 = v9(v10,v11);                 //BYTECODE_POS: 207 // context 8 could be custom vm or native func
 v9 = v8                           //BYTECODE_POS: 209 
 v9 = v9.then;                     //BYTECODE_POS: 210 
 v10 = functionVM87;               //BYTECODE_POS: 212 
 v8 = v9(v10);                     //BYTECODE_POS: 214 // context 8 could be custom vm or native func
 v9 = v8                           //BYTECODE_POS: 216 
 v9 = v9.catch;                    //BYTECODE_POS: 217 
 v10 = functionVM88;               //BYTECODE_POS: 219 
 v8 = v9(v10);                     //BYTECODE_POS: 221 // context 8 could be custom vm or native func
 //return v8;                      //BYTECODE_POS: 223 
 // go foward to 232               //BYTECODE_POS: 224 
 v8 = undefined                    //BYTECODE_POS: 226 
 v9 = executionStack[14];          //BYTECODE_POS: 227 depth
 v8 = v9();                        //BYTECODE_POS: 230 // context 8 could be custom vm or native func
 //return v8;                      //BYTECODE_POS: 232 
 // go foward to 247               //BYTECODE_POS: 233 
 v8 = undefined                    //BYTECODE_POS: 235 
 v9 = executionStack[4];           //BYTECODE_POS: 236 depth
 v10 = executionStack[2];          //BYTECODE_POS: 239 depth
 v11 = executionStack[3];          //BYTECODE_POS: 242 depth
 v8 = v9(v10,v11);                 //BYTECODE_POS: 245 // context 8 could be custom vm or native func
 //return v8;                      //BYTECODE_POS: 247 
 // go foward to 486               //BYTECODE_POS: 248 
 v8 = executionStack[3];           //BYTECODE_POS: 250 depth
 v8 = v8.headers;                  //BYTECODE_POS: 253 
 v8 = !v8                          //BYTECODE_POS: 255 
 // if (!v8) skip to 266           //BYTECODE_POS: 256 
 v8 = executionStack[3];           //BYTECODE_POS: 258 depth
 v9 = Headers                      //BYTECODE_POS: 261 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v9 = new v9()                     //BYTECODE_POS: 263 
 v8.headers = v8;                  //BYTECODE_POS: 265 
 v8 = executionStack[2];           //BYTECODE_POS: 267 depth
 executionStack[5] = v8;           //BYTECODE_POS: 270 // depth = 0
 v8 = executionStack[3];           //BYTECODE_POS: 273 depth
 v8 = v8.method;                   //BYTECODE_POS: 276 
 // if (!v8) skip to 291           //BYTECODE_POS: 278 
 v8 = executionStack[3];           //BYTECODE_POS: 280 depth
 v8 = v8.method;                   //BYTECODE_POS: 283 
 v9 = v8                           //BYTECODE_POS: 285 
 v9 = v9.toUpperCase;              //BYTECODE_POS: 286 
 v8 = v9();                        //BYTECODE_POS: 288 // context 8 could be custom vm or native func
 // go foward to 293               //BYTECODE_POS: 290 
 v9 = "GET"                        //BYTECODE_POS: 292 
 executionStack[6] = v9;           //BYTECODE_POS: 294 // depth = 0
 v9 = undefined                    //BYTECODE_POS: 297 
 v10 = executionStack[9];          //BYTECODE_POS: 298 depth
 v11 = executionStack[5];          //BYTECODE_POS: 301 depth
 v9 = v10(v11);                    //BYTECODE_POS: 304 // context 9 could be custom vm or native func
 // if (!v9) skip 14 to 321        //BYTECODE_POS: 306 
 v10 = executionStack[6];          //BYTECODE_POS: 308 depth
 v11 = "GET"                       //BYTECODE_POS: 311 
 v10 = v10 === v11                 //BYTECODE_POS: 313 
 // if (v10) skip 6                //BYTECODE_POS: 314 
 v11 = executionStack[6];          //BYTECODE_POS: 316 depth
 v12 = "POST"                      //BYTECODE_POS: 319 
 v11 = v11 === v12                 //BYTECODE_POS: 321 
 // if (!v11) skip to 473          //BYTECODE_POS: 322 
 v11 = ""                          //BYTECODE_POS: 324 
 executionStack[11] = v11;         //BYTECODE_POS: 326 // depth = 0
 v11 = RegExp                      //BYTECODE_POS: 329 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v12 = "^\/.+\/.+$"                //BYTECODE_POS: 331 
 v11 = new v11()                   //BYTECODE_POS: 333 
 v12 = v11                         //BYTECODE_POS: 335 
 v12 = v12.test;                   //BYTECODE_POS: 336 
 v13 = executionStack[5];          //BYTECODE_POS: 338 depth
 v11 = v12(v13);                   //BYTECODE_POS: 341 // context 11 could be custom vm or native func
 // if (!v11) skip to 352          //BYTECODE_POS: 343 
 v11 = executionStack[5];          //BYTECODE_POS: 345 depth
 executionStack[11] = v11;         //BYTECODE_POS: 348 // depth = 0
 // go foward to 364               //BYTECODE_POS: 351 
 v11 = URL                         //BYTECODE_POS: 353 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v12 = executionStack[5];          //BYTECODE_POS: 355 depth
 v11 = new v11()                   //BYTECODE_POS: 358 
 v11 = v11.pathname;               //BYTECODE_POS: 360 
 executionStack[11] = v11;         //BYTECODE_POS: 362 // depth = 0
 v11 = executionStack[2];          //BYTECODE_POS: 365 depth
 v11 = v11.grecaptcha;             //BYTECODE_POS: 368 
 // if (!v11) skip 7 to 378        //BYTECODE_POS: 370 
 v12 = executionStack[2];          //BYTECODE_POS: 372 depth
 v12 = v12.grecaptcha;             //BYTECODE_POS: 375 
 v12 = v12.enabledPaths;           //BYTECODE_POS: 377 
 // if (!v12) skip 15 to 395       //BYTECODE_POS: 379 
 v13 = executionStack[2];          //BYTECODE_POS: 381 depth
 v13 = v13.grecaptcha;             //BYTECODE_POS: 384 
 v13 = v13.enabledPaths;           //BYTECODE_POS: 386 
 v14 = v13                         //BYTECODE_POS: 388 
 v14 = v14.includes;               //BYTECODE_POS: 389 
 v15 = executionStack[11];         //BYTECODE_POS: 391 depth
 v13 = v14(v15);                   //BYTECODE_POS: 394 // context 13 could be custom vm or native func
 // if (!v13) skip to 464          //BYTECODE_POS: 396 
 v13 = executionStack[2];          //BYTECODE_POS: 398 depth
 v13 = v13.grecaptcha;             //BYTECODE_POS: 401 
 v13 = v13.enabledPathActionMap;   //BYTECODE_POS: 403 
 executionStack[12] = v13;         //BYTECODE_POS: 405 // depth = 0
 v13 = executionStack[12];         //BYTECODE_POS: 408 depth
 v14 = executionStack[11];         //BYTECODE_POS: 411 depth
 v13 = v13[v14]                    //BYTECODE_POS: 414 
 // if (!v13) skip to 425          //BYTECODE_POS: 415 
 v13 = executionStack[12];         //BYTECODE_POS: 417 depth
 v14 = executionStack[11];         //BYTECODE_POS: 420 depth
 v13 = v13[v14]                    //BYTECODE_POS: 423 
 // go foward to 428               //BYTECODE_POS: 424 
 v14 = executionStack[11];         //BYTECODE_POS: 426 depth
 executionStack[13] = v14;         //BYTECODE_POS: 429 // depth = 0
 v14 = undefined                   //BYTECODE_POS: 432 
 v15 = executionStack[17];         //BYTECODE_POS: 433 depth
 v16 = executionStack[2];          //BYTECODE_POS: 436 depth
 v16 = v16.grecaptcha;             //BYTECODE_POS: 439 
 v16 = v16.siteKey;                //BYTECODE_POS: 441 
 v17 = executionStack[13];         //BYTECODE_POS: 443 depth
 v14 = v15(v16,v17);               //BYTECODE_POS: 446 // context 14 could be custom vm or native func
 v15 = v14                         //BYTECODE_POS: 448 
 v15 = v15.then;                   //BYTECODE_POS: 449 
 v16 = functionVM92;               //BYTECODE_POS: 451 
 v14 = v15(v16);                   //BYTECODE_POS: 453 // context 14 could be custom vm or native func
 v15 = v14                         //BYTECODE_POS: 455 
 v15 = v15.catch;                  //BYTECODE_POS: 456 
 v16 = functionVM93;               //BYTECODE_POS: 458 
 v14 = v15(v16);                   //BYTECODE_POS: 460 // context 14 could be custom vm or native func
 //return v14;                     //BYTECODE_POS: 462 
 // go foward to 471               //BYTECODE_POS: 463 
 v14 = undefined                   //BYTECODE_POS: 465 
 v15 = executionStack[15];         //BYTECODE_POS: 466 depth
 v14 = v15();                      //BYTECODE_POS: 469 // context 14 could be custom vm or native func
 //return v14;                     //BYTECODE_POS: 471 
 // go foward to 486               //BYTECODE_POS: 472 
 v14 = undefined                   //BYTECODE_POS: 474 
 v15 = executionStack[4];          //BYTECODE_POS: 475 depth
 v16 = executionStack[2];          //BYTECODE_POS: 478 depth
 v17 = executionStack[3];          //BYTECODE_POS: 481 depth
 v14 = v15(v16,v17);               //BYTECODE_POS: 484 // context 14 could be custom vm or native func
 //return v14;                     //BYTECODE_POS: 486 
 v14 = undefined                   //BYTECODE_POS: 487 
 //return v14;                     //BYTECODE_POS: 488 
}