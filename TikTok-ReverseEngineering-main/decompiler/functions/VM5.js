function VM5(arg0) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 v1 = 0;                           //BYTECODE_POS: 2 
 v0.aid = v1;                      //BYTECODE_POS: 4 
 v1 = true                         //BYTECODE_POS: 6 
 v0.isSDK = v1;                    //BYTECODE_POS: 7 
 v1 = []                           //BYTECODE_POS: 9 
 v0.enablePathList = v1;           //BYTECODE_POS: 11 
 v1 = []                           //BYTECODE_POS: 13 
 v0.urlRewriteRules = v1;          //BYTECODE_POS: 15 
 v1 = false;                       //BYTECODE_POS: 17 
 v0.sdi = v1;                      //BYTECODE_POS: 18 
 v1 = ""                           //BYTECODE_POS: 20 
 v0.region = v1;                   //BYTECODE_POS: 22 
 v1 = false;                       //BYTECODE_POS: 24 
 v0.dev = v1;                      //BYTECODE_POS: 25 
 v1 = 0;                           //BYTECODE_POS: 27 
 v0.mode = v1;                     //BYTECODE_POS: 29 
 v1 = false;                       //BYTECODE_POS: 31 
 v0.v = v1;                        //BYTECODE_POS: 32 
 executionStack[3] = v0;           //BYTECODE_POS: 34 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 37 
 v1 = executionStack[13];          //BYTECODE_POS: 38 depth
 v2 = executionStack[3];           //BYTECODE_POS: 41 depth
 v3 = executionStack[2];           //BYTECODE_POS: 44 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 47 // context 0 could be custom vm or native func
 v0 = executionStack[3];           //BYTECODE_POS: 50 depth
 v0 = v0.aid;                      //BYTECODE_POS: 53 
 v1 = 0;                           //BYTECODE_POS: 55 
 v0 = v0 === v1                    //BYTECODE_POS: 57 
 // if (v0) skip 18                //BYTECODE_POS: 58 
 v1 = Math                         //BYTECODE_POS: 60 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 62 
 v2 = v2.floor;                    //BYTECODE_POS: 63 
 v3 = executionStack[3];           //BYTECODE_POS: 65 depth
 v3 = v3.aid;                      //BYTECODE_POS: 68 
 v1 = v2(v3);                      //BYTECODE_POS: 70 // context 1 could be custom vm or native func
 v2 = executionStack[3];           //BYTECODE_POS: 72 depth
 v2 = v2.aid;                      //BYTECODE_POS: 75 
 v1 = v1 !== v2;                   //BYTECODE_POS: 77 
 // if (!v1) skip to 87            //BYTECODE_POS: 78 
 v1 = executionStack[2];           //BYTECODE_POS: 80 depth
 v2 = "option aid(Integer) is needed!"//BYTECODE_POS: 83 
 v1 = new v1()                     //BYTECODE_POS: 85 
 //return v1                       //BYTECODE_POS: 87 
 v1 = executionStack[9];           //BYTECODE_POS: 88 depth
 v1 = v1.aidList;                  //BYTECODE_POS: 91 
 v2 = v1                           //BYTECODE_POS: 93 
 v2 = v2.push;                     //BYTECODE_POS: 94 
 v3 = executionStack[3];           //BYTECODE_POS: 96 depth
 v3 = v3.aid;                      //BYTECODE_POS: 99 
 v1 = v2(v3);                      //BYTECODE_POS: 101 // context 1 could be custom vm or native func
 v1 = executionStack[0];           //BYTECODE_POS: 104 depth
 v1 = v1.aid;                      //BYTECODE_POS: 107 
 v2 = 0;                           //BYTECODE_POS: 109 
 v1 = v1 === v2                    //BYTECODE_POS: 111 
 // if (!v1) skip to 123           //BYTECODE_POS: 112 
 v1 = executionStack[0];           //BYTECODE_POS: 114 depth
 v2 = executionStack[3];           //BYTECODE_POS: 117 depth
 v2 = v2.aid;                      //BYTECODE_POS: 120 
 v1.aid = v1;                      //BYTECODE_POS: 122 
 v1 = executionStack[3];           //BYTECODE_POS: 124 depth
 v1 = v1.isSDK;                    //BYTECODE_POS: 127 
 v1 = !v1                          //BYTECODE_POS: 129 
 // if (!v1) skip to 242           //BYTECODE_POS: 130 
 v1 = executionStack[3];           //BYTECODE_POS: 132 depth
 v1 = v1.region;                   //BYTECODE_POS: 135 
 v2 = ""                           //BYTECODE_POS: 137 
 v1 = v1 === v2                    //BYTECODE_POS: 139 
 // if (!v1) skip to 149           //BYTECODE_POS: 140 
 v1 = executionStack[2];           //BYTECODE_POS: 142 depth
 v2 = "region is null!"            //BYTECODE_POS: 145 
 v1 = new v1()                     //BYTECODE_POS: 147 
 //return v1                       //BYTECODE_POS: 149 
 v1 = executionStack[3];           //BYTECODE_POS: 150 depth
 v1 = v1.region;                   //BYTECODE_POS: 153 
 v2 = "cn"                         //BYTECODE_POS: 155 
 v1 = v1 === v2                    //BYTECODE_POS: 157 
 // if (!v1) skip to 167           //BYTECODE_POS: 158 
 v1 = executionStack[2];           //BYTECODE_POS: 160 depth
 v2 = "region is invalid!"         //BYTECODE_POS: 163 
 v1 = new v1()                     //BYTECODE_POS: 165 
 //return v1                       //BYTECODE_POS: 167 
 v1 = executionStack[0];           //BYTECODE_POS: 168 depth
 v2 = executionStack[3];           //BYTECODE_POS: 171 depth
 v2 = v2.region;                   //BYTECODE_POS: 174 
 v1.region = v1;                   //BYTECODE_POS: 176 
 v1 = executionStack[0];           //BYTECODE_POS: 178 depth
 v2 = undefined                    //BYTECODE_POS: 181 
 v3 = executionStack[6];           //BYTECODE_POS: 182 depth
 v4 = executionStack[3];           //BYTECODE_POS: 185 depth
 v4 = v4.region;                   //BYTECODE_POS: 188 
 v5 = executionStack[3];           //BYTECODE_POS: 190 depth
 v5 = v5.boe;                      //BYTECODE_POS: 193 
 v6 = executionStack[3];           //BYTECODE_POS: 195 depth
 v6 = v6.dev;                      //BYTECODE_POS: 198 
 v2 = v3(v4,v5,v6);                //BYTECODE_POS: 200 // context 2 could be custom vm or native func
 v1.regionConf = v1;               //BYTECODE_POS: 202 
 v1 = undefined                    //BYTECODE_POS: 204 
 v2 = executionStack[21];          //BYTECODE_POS: 205 depth
 v3 = executionStack[3];           //BYTECODE_POS: 208 depth
 v3 = v3.mode;                     //BYTECODE_POS: 211 
 v1 = v2(v3);                      //BYTECODE_POS: 213 // context 1 could be custom vm or native func
 v1 = executionStack[3];           //BYTECODE_POS: 216 depth
 v1 = v1.v;                        //BYTECODE_POS: 219 
 // if (!v1) skip to 232           //BYTECODE_POS: 221 
 v1 = executionStack[0];           //BYTECODE_POS: 223 depth
 v2 = executionStack[3];           //BYTECODE_POS: 226 depth
 v2 = v2.v;                        //BYTECODE_POS: 229 
 v1.v = v1;                        //BYTECODE_POS: 231 
 v1 = undefined                    //BYTECODE_POS: 233 
 v2 = executionStack[3];           //BYTECODE_POS: 234 depth
 v3 = executionStack[2];           //BYTECODE_POS: 237 depth
 v1 = v2(v3);                      //BYTECODE_POS: 240 // context 1 could be custom vm or native func
 v1 = executionStack[3];           //BYTECODE_POS: 243 depth
 v1 = v1.perf;                     //BYTECODE_POS: 246 
 // if (!v1) skip to 273           //BYTECODE_POS: 248 
 v1 = executionStack[0];           //BYTECODE_POS: 250 depth
 v2 = executionStack[3];           //BYTECODE_POS: 253 depth
 v2 = v2.perf;                     //BYTECODE_POS: 256 
 v1.perf = v1;                     //BYTECODE_POS: 258 
 v1 = undefined                    //BYTECODE_POS: 260 
 v2 = setTimeout                   //BYTECODE_POS: 261 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[8];           //BYTECODE_POS: 263 depth
 v4 = 5;                           //BYTECODE_POS: 266 
 v5 = 1000;                        //BYTECODE_POS: 268 
 v4 *= v5                          //BYTECODE_POS: 270 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 271 // context 1 could be custom vm or native func
 v1 = thisContextRef;              //BYTECODE_POS: 274 
 v2 = executionStack[3];           //BYTECODE_POS: 275 depth
 v1.options = v1;                  //BYTECODE_POS: 278 
 v1 = undefined                    //BYTECODE_POS: 280 
 v2 = arguments;                   //BYTECODE_POS: 281 depth
 v1 = v2();                        //BYTECODE_POS: 284 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 287 
 v2 = executionStack[22];          //BYTECODE_POS: 288 depth
 v3 = executionStack[3];           //BYTECODE_POS: 291 depth
 v3 = v3.enablePathList;           //BYTECODE_POS: 294 
 v1 = v2(v3);                      //BYTECODE_POS: 296 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 299 
 v2 = executionStack[2];           //BYTECODE_POS: 300 depth
 v3 = executionStack[3];           //BYTECODE_POS: 303 depth
 v3 = v3.urlRewriteRules;          //BYTECODE_POS: 306 
 v1 = v2(v3);                      //BYTECODE_POS: 308 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 311 
 v2 = executionStack[14];          //BYTECODE_POS: 312 depth
 v1 = v2();                        //BYTECODE_POS: 315 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 318 
 v2 = executionStack[11];          //BYTECODE_POS: 319 depth
 v1 = v2();                        //BYTECODE_POS: 322 // context 1 could be custom vm or native func
 v1 = executionStack[3];           //BYTECODE_POS: 325 depth
 v1 = v1.sdi;                      //BYTECODE_POS: 328 
 // if (!v1) skip to 355           //BYTECODE_POS: 330 
 v1 = executionStack[0];           //BYTECODE_POS: 332 depth
 v2 = executionStack[3];           //BYTECODE_POS: 335 depth
 v2 = v2.sdi;                      //BYTECODE_POS: 338 
 v1.sdi = v1;                      //BYTECODE_POS: 340 
 v1 = undefined                    //BYTECODE_POS: 342 
 v2 = setTimeout                   //BYTECODE_POS: 343 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[7];           //BYTECODE_POS: 345 depth
 v4 = 5;                           //BYTECODE_POS: 348 
 v5 = 1000;                        //BYTECODE_POS: 350 
 v4 *= v5                          //BYTECODE_POS: 352 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 353 // context 1 could be custom vm or native func
 v1 = executionStack[0];           //BYTECODE_POS: 356 depth
 v2 = true                         //BYTECODE_POS: 359 
 v1.initialized = v1;              //BYTECODE_POS: 360 
 v1 = undefined                    //BYTECODE_POS: 362 
 //return v1;                      //BYTECODE_POS: 363 
}