function VM75(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = URL                          //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = thisContextRef;              //BYTECODE_POS: 8 
 v1 = v1.responseURL;              //BYTECODE_POS: 9 
 v0 = new v0()                     //BYTECODE_POS: 11 
 executionStack[4] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 16 
 v1 = executionStack[5];           //BYTECODE_POS: 17 depth
 v2 = executionStack[4];           //BYTECODE_POS: 20 depth
 v2 = v2.href;                     //BYTECODE_POS: 23 
 v0 = v1(v2);                      //BYTECODE_POS: 25 // context 0 could be custom vm or native func
 // if (!v0) skip to 33            //BYTECODE_POS: 27 
 v0 = 1;                           //BYTECODE_POS: 29 
 executionStack[3] = v0;           //BYTECODE_POS: 31 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 34 depth
 v0 = v0.host;                     //BYTECODE_POS: 37 
 v1 = v0                           //BYTECODE_POS: 39 
 v1 = v1.indexOf;                  //BYTECODE_POS: 40 
 v2 = window                       //BYTECODE_POS: 42 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.location;                 //BYTECODE_POS: 44 
 v2 = v2.host;                     //BYTECODE_POS: 46 
 v0 = v1(v2);                      //BYTECODE_POS: 48 // context 0 could be custom vm or native func
 v1 = 1;                           //BYTECODE_POS: 50 
 v1 = -v1                          //BYTECODE_POS: 52 
 v0 = v0 !== v1;                   //BYTECODE_POS: 53 
 // if (!v0) skip to 60            //BYTECODE_POS: 54 
 v0 = 2;                           //BYTECODE_POS: 56 
 executionStack[3] = v0;           //BYTECODE_POS: 58 // depth = 0
 // go foward to 65                //BYTECODE_POS: 61 
 executionStack[7] = v-1;          //BYTECODE_POS: 63 // depth = 0
 v-1 = executionStack[3];          //BYTECODE_POS: 66 depth
 v0 = 0;                           //BYTECODE_POS: 69 
 v-1 = v-1 > v0                    //BYTECODE_POS: 71 
 // if (!v-1) skip to 290          //BYTECODE_POS: 72 
 v-1 = thisContextRef;             //BYTECODE_POS: 74 
 v0 = v-1                          //BYTECODE_POS: 75 
 v0 = v0.getResponseHeader;        //BYTECODE_POS: 76 
 v1 = "x-ms-token"                 //BYTECODE_POS: 78 
 v-1 = v0(v1);                     //BYTECODE_POS: 80 // context -1 could be custom vm or native func
 executionStack[5] = v-1;          //BYTECODE_POS: 82 // depth = 0
 v-1 = executionStack[5];          //BYTECODE_POS: 85 depth
 // if (!v-1) skip to 290          //BYTECODE_POS: 88 
 v-1 = undefined                   //BYTECODE_POS: 90 
 v0 = executionStack[4];           //BYTECODE_POS: 91 depth
 v1 = thisContextRef;              //BYTECODE_POS: 94 
 v1 = v1._byted_url;               //BYTECODE_POS: 95 
 v-1 = v0(v1);                     //BYTECODE_POS: 97 // context -1 could be custom vm or native func
 executionStack[6] = v-1;          //BYTECODE_POS: 99 // depth = 0
 v-1 = executionStack[6];          //BYTECODE_POS: 102 depth
 v0 = executionStack[6];           //BYTECODE_POS: 105 depth
 v0 = v0.sec;                      //BYTECODE_POS: 108 
 v-1 = v-1 === v0                  //BYTECODE_POS: 110 
 // if (!v-1) skip to 186          //BYTECODE_POS: 111 
 v-1 = executionStack[4];          //BYTECODE_POS: 113 depth
 v0 = executionStack[5];           //BYTECODE_POS: 116 depth
 v-1.msToken = v-1;                //BYTECODE_POS: 119 
 v-1 = executionStack[4];          //BYTECODE_POS: 121 depth
 v0 = executionStack[6];           //BYTECODE_POS: 124 depth
 v-1.msStatus = v-1;               //BYTECODE_POS: 127 
 v-1 = undefined                   //BYTECODE_POS: 129 
 v0 = executionStack[10];          //BYTECODE_POS: 130 depth
 v1 = "msToken"                    //BYTECODE_POS: 133 
 v2 = executionStack[5];           //BYTECODE_POS: 135 depth
 v-1 = v0(v1,v2);                  //BYTECODE_POS: 138 // context -1 could be custom vm or native func
 v-1 = undefined                   //BYTECODE_POS: 141 
 v0 = executionStack[8];           //BYTECODE_POS: 142 depth
 v1 = executionStack[5];           //BYTECODE_POS: 145 depth
 v-1 = v0(v1);                     //BYTECODE_POS: 148 // context -1 could be custom vm or native func
 v-1 = executionStack[6];          //BYTECODE_POS: 151 depth
 v0 = executionStack[14];          //BYTECODE_POS: 154 depth
 v-1 = v-1 > v0                    //BYTECODE_POS: 157 
 // if (!v-1) skip to 184          //BYTECODE_POS: 158 
 v-1 = executionStack[4];          //BYTECODE_POS: 160 depth
 v-1 = v-1.msNewTokenList;         //BYTECODE_POS: 163 
 v-1 = v-1.length;                 //BYTECODE_POS: 165 
 v0 = 0;                           //BYTECODE_POS: 167 
 v-1 = v-1 > v0                    //BYTECODE_POS: 169 
 // if (!v-1) skip to 184          //BYTECODE_POS: 170 
 v-1 = undefined                   //BYTECODE_POS: 172 
 v0 = setTimeout                   //BYTECODE_POS: 173 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = functionVM76;                //BYTECODE_POS: 175 
 v2 = 2;                           //BYTECODE_POS: 177 
 v3 = 1000;                        //BYTECODE_POS: 179 
 v2 *= v3                          //BYTECODE_POS: 181 
 v-1 = v0(v1,v2);                  //BYTECODE_POS: 182 // context -1 could be custom vm or native func
 // go foward to 205               //BYTECODE_POS: 185 
 v-1 = executionStack[14];         //BYTECODE_POS: 187 depth
 v0 = executionStack[4];           //BYTECODE_POS: 190 depth
 v0 = v0.msStatus;                 //BYTECODE_POS: 193 
 v-1 = v-1 >= v0                   //BYTECODE_POS: 195 
 // if (!v-1) skip to 205          //BYTECODE_POS: 196 
 v-1 = executionStack[4];          //BYTECODE_POS: 198 depth
 v0 = executionStack[5];           //BYTECODE_POS: 201 depth
 v-1.msToken = v-1;                //BYTECODE_POS: 204 
 v-1 = executionStack[14];         //BYTECODE_POS: 206 depth
 v0 = executionStack[6];           //BYTECODE_POS: 209 depth
 v0 = v0.init;                     //BYTECODE_POS: 212 
 v-1 = v-1 === v0                  //BYTECODE_POS: 214 
 // if (!v-1) skip 10 to 226       //BYTECODE_POS: 215 
 v0 = executionStack[4];           //BYTECODE_POS: 217 depth
 v0 = v0.msNewTokenList;           //BYTECODE_POS: 220 
 v0 = v0.length;                   //BYTECODE_POS: 222 
 v1 = 10;                          //BYTECODE_POS: 224 
 v0 = v0 < v1;                     //BYTECODE_POS: 226 
 // if (!v0) skip to 290           //BYTECODE_POS: 227 
 v0 = executionStack[4];           //BYTECODE_POS: 229 depth
 v0 = v0.msNewTokenList;           //BYTECODE_POS: 232 
 v1 = v0                           //BYTECODE_POS: 234 
 v1 = v1.push;                     //BYTECODE_POS: 235 
 v2 = executionStack[5];           //BYTECODE_POS: 237 depth
 v0 = v1(v2);                      //BYTECODE_POS: 240 // context 0 could be custom vm or native func
 v0 = executionStack[5];           //BYTECODE_POS: 243 depth
 v0 = v0.msNewTokenList;           //BYTECODE_POS: 246 
 v1 = v0                           //BYTECODE_POS: 248 
 v1 = v1.push;                     //BYTECODE_POS: 249 
 v2 = executionStack[5];           //BYTECODE_POS: 251 depth
 v0 = v1(v2);                      //BYTECODE_POS: 254 // context 0 could be custom vm or native func
 v0 = executionStack[4];           //BYTECODE_POS: 257 depth
 v0 = v0.msNewTokenList;           //BYTECODE_POS: 260 
 v0 = v0.length;                   //BYTECODE_POS: 262 
 v1 = 1;                           //BYTECODE_POS: 264 
 v0 = v0 === v1                    //BYTECODE_POS: 266 
 // if (!v0) skip to 290           //BYTECODE_POS: 267 
 v0 = undefined                    //BYTECODE_POS: 269 
 v1 = executionStack[8];           //BYTECODE_POS: 270 depth
 v2 = executionStack[5];           //BYTECODE_POS: 273 depth
 v0 = v1(v2);                      //BYTECODE_POS: 276 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 279 
 v1 = executionStack[10];          //BYTECODE_POS: 280 depth
 v2 = "msToken"                    //BYTECODE_POS: 283 
 v3 = executionStack[5];           //BYTECODE_POS: 285 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 288 // context 0 could be custom vm or native func
 v0 = executionStack[7];           //BYTECODE_POS: 291 depth
 // if (!v0) skip to 305           //BYTECODE_POS: 294 
 v0 = undefined                    //BYTECODE_POS: 296 
 v1 = executionStack[7];           //BYTECODE_POS: 297 depth
 v2 = executionStack[2];           //BYTECODE_POS: 300 depth
 v0 = v1(v2);                      //BYTECODE_POS: 303 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 306 
 //return v0;                      //BYTECODE_POS: 307 
}