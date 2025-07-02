function VM82(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v0 = v0.ok;                       //BYTECODE_POS: 4 
 // if (!v0) skip to 289           //BYTECODE_POS: 6 
 v0 = executionStack[2];           //BYTECODE_POS: 8 depth
 v0 = v0.url;                      //BYTECODE_POS: 11 
 v0 = !v0                          //BYTECODE_POS: 13 
 // if (!v0) skip to 19            //BYTECODE_POS: 14 
 v0 = executionStack[2];           //BYTECODE_POS: 16 depth
 //return v0;                      //BYTECODE_POS: 19 
 v0 = URL                          //BYTECODE_POS: 20 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[2];           //BYTECODE_POS: 22 depth
 v1 = v1.url;                      //BYTECODE_POS: 25 
 v0 = new v0()                     //BYTECODE_POS: 27 
 executionStack[3] = v0;           //BYTECODE_POS: 29 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 32 depth
 v0 = v0.host;                     //BYTECODE_POS: 35 
 v1 = v0                           //BYTECODE_POS: 37 
 v1 = v1.indexOf;                  //BYTECODE_POS: 38 
 v2 = window                       //BYTECODE_POS: 40 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.location;                 //BYTECODE_POS: 42 
 v2 = v2.host;                     //BYTECODE_POS: 44 
 v0 = v1(v2);                      //BYTECODE_POS: 46 // context 0 could be custom vm or native func
 v1 = 1;                           //BYTECODE_POS: 48 
 v1 = -v1                          //BYTECODE_POS: 50 
 v0 = v0 !== v1;                   //BYTECODE_POS: 51 
 // if (v0) skip 11                //BYTECODE_POS: 52 
 v1 = undefined                    //BYTECODE_POS: 54 
 v2 = executionStack[5];           //BYTECODE_POS: 55 depth
 v3 = executionStack[3];           //BYTECODE_POS: 58 depth
 v3 = v3.href;                     //BYTECODE_POS: 61 
 v1 = v2(v3);                      //BYTECODE_POS: 63 // context 1 could be custom vm or native func
 // if (!v1) skip to 289           //BYTECODE_POS: 65 
 v1 = executionStack[2];           //BYTECODE_POS: 67 depth
 v1 = v1.headers;                  //BYTECODE_POS: 70 
 v2 = v1                           //BYTECODE_POS: 72 
 v2 = v2.get;                      //BYTECODE_POS: 73 
 v3 = "x-ms-token"                 //BYTECODE_POS: 75 
 v1 = v2(v3);                      //BYTECODE_POS: 77 // context 1 could be custom vm or native func
 executionStack[4] = v1;           //BYTECODE_POS: 79 // depth = 0
 v1 = executionStack[4];           //BYTECODE_POS: 82 depth
 // if (!v1) skip to 289           //BYTECODE_POS: 85 
 v1 = undefined                    //BYTECODE_POS: 87 
 v2 = executionStack[4];           //BYTECODE_POS: 88 depth
 v3 = executionStack[2];           //BYTECODE_POS: 91 depth
 v3 = v3.url;                      //BYTECODE_POS: 94 
 v1 = v2(v3);                      //BYTECODE_POS: 96 // context 1 could be custom vm or native func
 executionStack[5] = v1;           //BYTECODE_POS: 98 // depth = 0
 v1 = executionStack[5];           //BYTECODE_POS: 101 depth
 v2 = executionStack[6];           //BYTECODE_POS: 104 depth
 v2 = v2.sec;                      //BYTECODE_POS: 107 
 v1 = v1 === v2                    //BYTECODE_POS: 109 
 // if (!v1) skip to 185           //BYTECODE_POS: 110 
 v1 = executionStack[4];           //BYTECODE_POS: 112 depth
 v2 = executionStack[4];           //BYTECODE_POS: 115 depth
 v1.msToken = v1;                  //BYTECODE_POS: 118 
 v1 = executionStack[4];           //BYTECODE_POS: 120 depth
 v2 = executionStack[5];           //BYTECODE_POS: 123 depth
 v1.msStatus = v1;                 //BYTECODE_POS: 126 
 v1 = undefined                    //BYTECODE_POS: 128 
 v2 = executionStack[10];          //BYTECODE_POS: 129 depth
 v3 = "msToken"                    //BYTECODE_POS: 132 
 v4 = executionStack[4];           //BYTECODE_POS: 134 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 137 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 140 
 v2 = executionStack[8];           //BYTECODE_POS: 141 depth
 v3 = executionStack[4];           //BYTECODE_POS: 144 depth
 v1 = v2(v3);                      //BYTECODE_POS: 147 // context 1 could be custom vm or native func
 v1 = executionStack[5];           //BYTECODE_POS: 150 depth
 v2 = executionStack[4];           //BYTECODE_POS: 153 depth
 v1 = v1 > v2                      //BYTECODE_POS: 156 
 // if (!v1) skip to 183           //BYTECODE_POS: 157 
 v1 = executionStack[4];           //BYTECODE_POS: 159 depth
 v1 = v1.msNewTokenList;           //BYTECODE_POS: 162 
 v1 = v1.length;                   //BYTECODE_POS: 164 
 v2 = 0;                           //BYTECODE_POS: 166 
 v1 = v1 > v2                      //BYTECODE_POS: 168 
 // if (!v1) skip to 183           //BYTECODE_POS: 169 
 v1 = undefined                    //BYTECODE_POS: 171 
 v2 = setTimeout                   //BYTECODE_POS: 172 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = functionVM83;                //BYTECODE_POS: 174 
 v4 = 2;                           //BYTECODE_POS: 176 
 v5 = 1000;                        //BYTECODE_POS: 178 
 v4 *= v5                          //BYTECODE_POS: 180 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 181 // context 1 could be custom vm or native func
 // go foward to 204               //BYTECODE_POS: 184 
 v1 = executionStack[4];           //BYTECODE_POS: 186 depth
 v2 = executionStack[4];           //BYTECODE_POS: 189 depth
 v2 = v2.msStatus;                 //BYTECODE_POS: 192 
 v1 = v1 >= v2                     //BYTECODE_POS: 194 
 // if (!v1) skip to 204           //BYTECODE_POS: 195 
 v1 = executionStack[4];           //BYTECODE_POS: 197 depth
 v2 = executionStack[4];           //BYTECODE_POS: 200 depth
 v1.msToken = v1;                  //BYTECODE_POS: 203 
 v1 = executionStack[4];           //BYTECODE_POS: 205 depth
 v2 = executionStack[6];           //BYTECODE_POS: 208 depth
 v2 = v2.init;                     //BYTECODE_POS: 211 
 v1 = v1 === v2                    //BYTECODE_POS: 213 
 // if (!v1) skip 10 to 225        //BYTECODE_POS: 214 
 v2 = executionStack[4];           //BYTECODE_POS: 216 depth
 v2 = v2.msNewTokenList;           //BYTECODE_POS: 219 
 v2 = v2.length;                   //BYTECODE_POS: 221 
 v3 = 10;                          //BYTECODE_POS: 223 
 v2 = v2 < v3;                     //BYTECODE_POS: 225 
 // if (!v2) skip to 289           //BYTECODE_POS: 226 
 v2 = executionStack[4];           //BYTECODE_POS: 228 depth
 v2 = v2.msNewTokenList;           //BYTECODE_POS: 231 
 v3 = v2                           //BYTECODE_POS: 233 
 v3 = v3.push;                     //BYTECODE_POS: 234 
 v4 = executionStack[4];           //BYTECODE_POS: 236 depth
 v2 = v3(v4);                      //BYTECODE_POS: 239 // context 2 could be custom vm or native func
 v2 = executionStack[5];           //BYTECODE_POS: 242 depth
 v2 = v2.msNewTokenList;           //BYTECODE_POS: 245 
 v3 = v2                           //BYTECODE_POS: 247 
 v3 = v3.push;                     //BYTECODE_POS: 248 
 v4 = executionStack[4];           //BYTECODE_POS: 250 depth
 v2 = v3(v4);                      //BYTECODE_POS: 253 // context 2 could be custom vm or native func
 v2 = executionStack[4];           //BYTECODE_POS: 256 depth
 v2 = v2.msNewTokenList;           //BYTECODE_POS: 259 
 v2 = v2.length;                   //BYTECODE_POS: 261 
 v3 = 1;                           //BYTECODE_POS: 263 
 v2 = v2 === v3                    //BYTECODE_POS: 265 
 // if (!v2) skip to 289           //BYTECODE_POS: 266 
 v2 = undefined                    //BYTECODE_POS: 268 
 v3 = executionStack[8];           //BYTECODE_POS: 269 depth
 v4 = executionStack[4];           //BYTECODE_POS: 272 depth
 v2 = v3(v4);                      //BYTECODE_POS: 275 // context 2 could be custom vm or native func
 v2 = undefined                    //BYTECODE_POS: 278 
 v3 = executionStack[10];          //BYTECODE_POS: 279 depth
 v4 = "msToken"                    //BYTECODE_POS: 282 
 v5 = executionStack[4];           //BYTECODE_POS: 284 depth
 v2 = v3(v4,v5);                   //BYTECODE_POS: 287 // context 2 could be custom vm or native func
 v2 = executionStack[2];           //BYTECODE_POS: 290 depth
 //return v2;                      //BYTECODE_POS: 293 
}