function VM172() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.opera;                    //BYTECODE_POS: 8 
 // if (v0) skip 14                //BYTECODE_POS: 10 
 v1 = navigator                    //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.userAgent;                //BYTECODE_POS: 14 
 v2 = v1                           //BYTECODE_POS: 16 
 v2 = v2.indexOf;                  //BYTECODE_POS: 17 
 v3 = " OPR/"                      //BYTECODE_POS: 19 
 v1 = v2(v3);                      //BYTECODE_POS: 21 // context 1 could be custom vm or native func
 v2 = 0;                           //BYTECODE_POS: 23 
 v1 = v1 >= v2                     //BYTECODE_POS: 25 
 // if (!v1) skip to 31            //BYTECODE_POS: 26 
 v1 = "Opera"                      //BYTECODE_POS: 28 
 // go foward to 33                //BYTECODE_POS: 30 
 v2 = 0;                           //BYTECODE_POS: 32 
 executionStack[3] = v2;           //BYTECODE_POS: 34 // depth = 0
 v2 = "undefined"                  //BYTECODE_POS: 37 
 v3 = typeof globalThis.InstallTrigger//BYTECODE_POS: 39 
 v2 = v2 != v3;                    //BYTECODE_POS: 41 
 // if (!v2) skip to 47            //BYTECODE_POS: 42 
 v2 = "Firefox"                    //BYTECODE_POS: 44 
 // go foward to 49                //BYTECODE_POS: 46 
 v3 = 0;                           //BYTECODE_POS: 48 
 executionStack[4] = v3;           //BYTECODE_POS: 50 // depth = 0
 v3 = Object                       //BYTECODE_POS: 53 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.prototype;                //BYTECODE_POS: 55 
 v3 = v3.toString;                 //BYTECODE_POS: 57 
 v4 = v3                           //BYTECODE_POS: 59 
 v4 = v4.call;                     //BYTECODE_POS: 60 
 v5 = window                       //BYTECODE_POS: 62 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5.HTMLElement;              //BYTECODE_POS: 64 
 v3 = v4(v5);                      //BYTECODE_POS: 66 // context 3 could be custom vm or native func
 v4 = v3                           //BYTECODE_POS: 68 
 v4 = v4.indexOf;                  //BYTECODE_POS: 69 
 v5 = "Constructor"                //BYTECODE_POS: 71 
 v3 = v4(v5);                      //BYTECODE_POS: 73 // context 3 could be custom vm or native func
 v4 = 0;                           //BYTECODE_POS: 75 
 v3 = v3 > v4                      //BYTECODE_POS: 77 
 // if (v3) skip 28                //BYTECODE_POS: 78 
 v4 = window                       //BYTECODE_POS: 80 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4.safari;                   //BYTECODE_POS: 82 
 // if (!v4) skip 6 to 91          //BYTECODE_POS: 84 
 v5 = window                       //BYTECODE_POS: 86 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5.safari;                   //BYTECODE_POS: 88 
 v5 = v5.pushNotification;         //BYTECODE_POS: 90 
 // if (!v5) skip 14 to 107        //BYTECODE_POS: 92 
 v6 = "[object SafariRemoteNotification]"//BYTECODE_POS: 94 
 v7 = window                       //BYTECODE_POS: 96 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v7 = v7.safari;                   //BYTECODE_POS: 98 
 v7 = v7.pushNotification;         //BYTECODE_POS: 100 
 v8 = v7                           //BYTECODE_POS: 102 
 v8 = v8.toString;                 //BYTECODE_POS: 103 
 v7 = v8();                        //BYTECODE_POS: 105 // context 7 could be custom vm or native func
 v6 = v6 === v7                    //BYTECODE_POS: 107 
 // if (v6) skip 4                 //BYTECODE_POS: 108 
 v7 = window                       //BYTECODE_POS: 110 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v7 = v7.ApplePaySession;          //BYTECODE_POS: 112 
 executionStack[5] = v7;           //BYTECODE_POS: 114 // depth = 0
 v7 = executionStack[5];           //BYTECODE_POS: 117 depth
 // if (!v7) skip to 125           //BYTECODE_POS: 120 
 v7 = "Safari"                     //BYTECODE_POS: 122 
 // go foward to 127               //BYTECODE_POS: 124 
 v8 = 0;                           //BYTECODE_POS: 126 
 executionStack[5] = v8;           //BYTECODE_POS: 128 // depth = 0
 v8 = executionStack[5];           //BYTECODE_POS: 131 depth
 // if (!v8) skip 11 to 146        //BYTECODE_POS: 134 
 v9 = navigator                    //BYTECODE_POS: 136 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v9 = v9.userAgent;                //BYTECODE_POS: 138 
 v10 = v9                          //BYTECODE_POS: 140 
 v10 = v10.match;                  //BYTECODE_POS: 141 
 v11 = "CriOS"                     //BYTECODE_POS: 143 
 v9 = v10(v11);                    //BYTECODE_POS: 145 // context 9 could be custom vm or native func
 // if (!v9) skip to 152           //BYTECODE_POS: 147 
 v9 = "Chrome IOS"                 //BYTECODE_POS: 149 
 // go foward to 154               //BYTECODE_POS: 151 
 v10 = 0;                          //BYTECODE_POS: 153 
 executionStack[6] = v10;          //BYTECODE_POS: 155 // depth = 0
 v10 = window                      //BYTECODE_POS: 158 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v10 = v10.chrome;                 //BYTECODE_POS: 160 
 // if (!v10) skip 4 to 167        //BYTECODE_POS: 162 
 v11 = executionStack[3];          //BYTECODE_POS: 164 depth
 v11 = !v11                        //BYTECODE_POS: 167 
 // if (!v11) skip to 173          //BYTECODE_POS: 168 
 v11 = "Chrome"                    //BYTECODE_POS: 170 
 // go foward to 175               //BYTECODE_POS: 172 
 v12 = 0;                          //BYTECODE_POS: 174 
 executionStack[7] = v12;          //BYTECODE_POS: 176 // depth = 0
 v12 = undefined                   //BYTECODE_POS: 179 
 v13 = executionStack[0];          //BYTECODE_POS: 180 depth
 v12 = v13();                      //BYTECODE_POS: 183 // context 12 could be custom vm or native func
 // if (!v12) skip to 190          //BYTECODE_POS: 185 
 v12 = "IE"                        //BYTECODE_POS: 187 
 // go foward to 192               //BYTECODE_POS: 189 
 v13 = 0;                          //BYTECODE_POS: 191 
 executionStack[8] = v13;          //BYTECODE_POS: 193 // depth = 0
 v13 = executionStack[8];          //BYTECODE_POS: 196 depth
 v13 = !v13                        //BYTECODE_POS: 199 
 // if (!v13) skip 4 to 205        //BYTECODE_POS: 200 
 v14 = window                      //BYTECODE_POS: 202 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v14 = v14.StyleMedia;             //BYTECODE_POS: 204 
 // if (!v14) skip to 211          //BYTECODE_POS: 206 
 v14 = "Edge"                      //BYTECODE_POS: 208 
 // go foward to 213               //BYTECODE_POS: 210 
 v15 = 0;                          //BYTECODE_POS: 212 
 executionStack[9] = v15;          //BYTECODE_POS: 214 // depth = 0
 v15 = ""                          //BYTECODE_POS: 217 
 executionStack[10] = v15;         //BYTECODE_POS: 219 // depth = 0
 v15 = executionStack[3];          //BYTECODE_POS: 222 depth
 // if (!v15) skip to 237          //BYTECODE_POS: 225 
 v15 = executionStack[2];          //BYTECODE_POS: 227 depth
 v16 = 1;                          //BYTECODE_POS: 230 
 v15 |= v16;                       //BYTECODE_POS: 232 
 //get depth of 0 from executionStack//BYTECODE_POS: 233 
 v16 = executionStack;             //BYTECODE_POS: 233 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 236 
 v15 = executionStack[4];          //BYTECODE_POS: 238 depth
 // if (!v15) skip to 256          //BYTECODE_POS: 241 
 v15 = executionStack[2];          //BYTECODE_POS: 243 depth
 v16 = 1;                          //BYTECODE_POS: 246 
 v17 = 1;                          //BYTECODE_POS: 248 
 v16 <<= v17                       //BYTECODE_POS: 250 
 v15 |= v16;                       //BYTECODE_POS: 251 
 //get depth of 0 from executionStack//BYTECODE_POS: 252 
 v16 = executionStack;             //BYTECODE_POS: 252 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 255 
 v15 = executionStack[9];          //BYTECODE_POS: 257 depth
 // if (!v15) skip to 275          //BYTECODE_POS: 260 
 v15 = executionStack[2];          //BYTECODE_POS: 262 depth
 v16 = 1;                          //BYTECODE_POS: 265 
 v17 = 2;                          //BYTECODE_POS: 267 
 v16 <<= v17                       //BYTECODE_POS: 269 
 v15 |= v16;                       //BYTECODE_POS: 270 
 //get depth of 0 from executionStack//BYTECODE_POS: 271 
 v16 = executionStack;             //BYTECODE_POS: 271 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 274 
 v15 = executionStack[8];          //BYTECODE_POS: 276 depth
 // if (!v15) skip to 294          //BYTECODE_POS: 279 
 v15 = executionStack[2];          //BYTECODE_POS: 281 depth
 v16 = 1;                          //BYTECODE_POS: 284 
 v17 = 3;                          //BYTECODE_POS: 286 
 v16 <<= v17                       //BYTECODE_POS: 288 
 v15 |= v16;                       //BYTECODE_POS: 289 
 //get depth of 0 from executionStack//BYTECODE_POS: 290 
 v16 = executionStack;             //BYTECODE_POS: 290 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 293 
 v15 = executionStack[7];          //BYTECODE_POS: 295 depth
 // if (!v15) skip to 313          //BYTECODE_POS: 298 
 v15 = executionStack[2];          //BYTECODE_POS: 300 depth
 v16 = 1;                          //BYTECODE_POS: 303 
 v17 = 4;                          //BYTECODE_POS: 305 
 v16 <<= v17                       //BYTECODE_POS: 307 
 v15 |= v16;                       //BYTECODE_POS: 308 
 //get depth of 0 from executionStack//BYTECODE_POS: 309 
 v16 = executionStack;             //BYTECODE_POS: 309 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 312 
 v15 = executionStack[6];          //BYTECODE_POS: 314 depth
 // if (!v15) skip to 332          //BYTECODE_POS: 317 
 v15 = executionStack[2];          //BYTECODE_POS: 319 depth
 v16 = 1;                          //BYTECODE_POS: 322 
 v17 = 5;                          //BYTECODE_POS: 324 
 v16 <<= v17                       //BYTECODE_POS: 326 
 v15 |= v16;                       //BYTECODE_POS: 327 
 //get depth of 0 from executionStack//BYTECODE_POS: 328 
 v16 = executionStack;             //BYTECODE_POS: 328 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 331 
 v15 = executionStack[5];          //BYTECODE_POS: 333 depth
 // if (!v15) skip to 351          //BYTECODE_POS: 336 
 v15 = executionStack[2];          //BYTECODE_POS: 338 depth
 v16 = 1;                          //BYTECODE_POS: 341 
 v17 = 6;                          //BYTECODE_POS: 343 
 v16 <<= v17                       //BYTECODE_POS: 345 
 v15 |= v16;                       //BYTECODE_POS: 346 
 //get depth of 0 from executionStack//BYTECODE_POS: 347 
 v16 = executionStack;             //BYTECODE_POS: 347 
 v17 = 2                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 v16[v17] = v15                    //BYTECODE_POS: 350 
 v15 = {};                         //BYTECODE_POS: 352 
 v16 = executionStack[2];          //BYTECODE_POS: 353 depth
 v15.data = v16;                   //BYTECODE_POS: 356 
 //return v15;                     //BYTECODE_POS: 358 
 // go foward to 382               //BYTECODE_POS: 359 
 executionStack[11] = v14;         //BYTECODE_POS: 361 // depth = 0
 v14 = {};                         //BYTECODE_POS: 364 
 v15 = 1;                          //BYTECODE_POS: 365 
 v15 = -v15                        //BYTECODE_POS: 367 
 v14.data = v15;                   //BYTECODE_POS: 368 
 v15 = {};                         //BYTECODE_POS: 370 
 v16 = executionStack[11];         //BYTECODE_POS: 371 depth
 v15.err = v16;                    //BYTECODE_POS: 374 
 v16 = "d_w_b"                     //BYTECODE_POS: 376 
 v15.type = v16;                   //BYTECODE_POS: 378 
 v14.error = v15;                  //BYTECODE_POS: 380 
 //return v14;                     //BYTECODE_POS: 382 
 v14 = undefined                   //BYTECODE_POS: 383 
 //return v14;                     //BYTECODE_POS: 384 
}