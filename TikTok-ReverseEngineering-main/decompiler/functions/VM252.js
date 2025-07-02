function VM252() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = navigator                    //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.userAgent;                //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.toLowerCase;              //BYTECODE_POS: 6 
 v0 = v1();                        //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 13 depth
 v1 = v0                           //BYTECODE_POS: 16 
 v1 = v1.indexOf;                  //BYTECODE_POS: 17 
 v2 = "electron"                   //BYTECODE_POS: 19 
 v0 = v1(v2);                      //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 v1 = 0;                           //BYTECODE_POS: 23 
 v0 = v0 >= v1                     //BYTECODE_POS: 25 
 // if (!v0) skip to 29            //BYTECODE_POS: 26 
 v0 = false;                       //BYTECODE_POS: 28 
 //return v0;                      //BYTECODE_POS: 29 
 v0 = "undefined"                  //BYTECODE_POS: 30 
 executionStack[3] = v0;           //BYTECODE_POS: 32 // depth = 0
 v0 = typeof globalThis.window     //BYTECODE_POS: 35 
 v1 = "undefined"                  //BYTECODE_POS: 37 
 v0 = v0 === v1                    //BYTECODE_POS: 39 
 // if (!v0) skip to 45            //BYTECODE_POS: 40 
 v0 = "undefined"                  //BYTECODE_POS: 42 
 // go foward to 53                //BYTECODE_POS: 44 
 v1 = undefined                    //BYTECODE_POS: 46 
 v2 = executionStack[0];           //BYTECODE_POS: 47 depth
 v3 = window                       //BYTECODE_POS: 50 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v2(v3);                      //BYTECODE_POS: 52 // context 1 could be custom vm or native func
 v2 = executionStack[3];           //BYTECODE_POS: 54 depth
 v1 = v1 === v2                    //BYTECODE_POS: 57 
 // if (v1) skip 10                //BYTECODE_POS: 58 
 v2 = window                       //BYTECODE_POS: 60 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 62 
 v3 = v3.toString;                 //BYTECODE_POS: 63 
 v2 = v3();                        //BYTECODE_POS: 65 // context 2 could be custom vm or native func
 v3 = "[object Window]"            //BYTECODE_POS: 67 
 v2 = v2 !== v3;                   //BYTECODE_POS: 69 
 // if (v2) skip 16                //BYTECODE_POS: 70 
 v3 = Object                       //BYTECODE_POS: 72 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.prototype;                //BYTECODE_POS: 74 
 v3 = v3.toString;                 //BYTECODE_POS: 76 
 v4 = v3                           //BYTECODE_POS: 78 
 v4 = v4.call;                     //BYTECODE_POS: 79 
 v5 = window                       //BYTECODE_POS: 81 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v4(v5);                      //BYTECODE_POS: 83 // context 3 could be custom vm or native func
 v4 = "[object Window]"            //BYTECODE_POS: 85 
 v3 = v3 !== v4;                   //BYTECODE_POS: 87 
 // if (v3) skip 23                //BYTECODE_POS: 88 
 v4 = typeof globalThis.document   //BYTECODE_POS: 90 
 v5 = "undefined"                  //BYTECODE_POS: 92 
 v4 = v4 === v5                    //BYTECODE_POS: 94 
 // if (!v4) skip to 100           //BYTECODE_POS: 95 
 v4 = "undefined"                  //BYTECODE_POS: 97 
 // go foward to 108               //BYTECODE_POS: 99 
 v5 = undefined                    //BYTECODE_POS: 101 
 v6 = executionStack[0];           //BYTECODE_POS: 102 depth
 v7 = document                     //BYTECODE_POS: 105 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v6(v7);                      //BYTECODE_POS: 107 // context 5 could be custom vm or native func
 v6 = executionStack[3];           //BYTECODE_POS: 109 depth
 v5 = v5 === v6                    //BYTECODE_POS: 112 
 // if (v5) skip 17                //BYTECODE_POS: 113 
 v6 = document                     //BYTECODE_POS: 115 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v7 = v6                           //BYTECODE_POS: 117 
 v7 = v7.toString;                 //BYTECODE_POS: 118 
 v6 = v7();                        //BYTECODE_POS: 120 // context 6 could be custom vm or native func
 v7 = v6                           //BYTECODE_POS: 122 
 v7 = v7.indexOf;                  //BYTECODE_POS: 123 
 v8 = "Document"                   //BYTECODE_POS: 125 
 v6 = v7(v8);                      //BYTECODE_POS: 127 // context 6 could be custom vm or native func
 v7 = 0;                           //BYTECODE_POS: 129 
 v6 = v6 < v7;                     //BYTECODE_POS: 131 
 // if (v6) skip 23                //BYTECODE_POS: 132 
 v7 = typeof globalThis.navigator  //BYTECODE_POS: 134 
 v8 = "undefined"                  //BYTECODE_POS: 136 
 v7 = v7 === v8                    //BYTECODE_POS: 138 
 // if (!v7) skip to 144           //BYTECODE_POS: 139 
 v7 = "undefined"                  //BYTECODE_POS: 141 
 // go foward to 152               //BYTECODE_POS: 143 
 v8 = undefined                    //BYTECODE_POS: 145 
 v9 = executionStack[0];           //BYTECODE_POS: 146 depth
 v10 = navigator                   //BYTECODE_POS: 149 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v8 = v9(v10);                     //BYTECODE_POS: 151 // context 8 could be custom vm or native func
 v9 = executionStack[3];           //BYTECODE_POS: 153 depth
 v8 = v8 === v9                    //BYTECODE_POS: 156 
 // if (v8) skip 10                //BYTECODE_POS: 157 
 v9 = navigator                    //BYTECODE_POS: 159 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v10 = v9                          //BYTECODE_POS: 161 
 v10 = v10.toString;               //BYTECODE_POS: 162 
 v9 = v10();                       //BYTECODE_POS: 164 // context 9 could be custom vm or native func
 v10 = "[object Navigator]"        //BYTECODE_POS: 166 
 v9 = v9 !== v10;                  //BYTECODE_POS: 168 
 // if (v9) skip 14                //BYTECODE_POS: 169 
 v10 = navigator                   //BYTECODE_POS: 171 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v10 = v10.userAgent;              //BYTECODE_POS: 173 
 v11 = v10                         //BYTECODE_POS: 175 
 v11 = v11.indexOf;                //BYTECODE_POS: 176 
 v12 = "jsdom"                     //BYTECODE_POS: 178 
 v10 = v11(v12);                   //BYTECODE_POS: 180 // context 10 could be custom vm or native func
 v11 = 0;                          //BYTECODE_POS: 182 
 v10 = v10 >= v11                  //BYTECODE_POS: 184 
 // if (v10) skip 23               //BYTECODE_POS: 185 
 v11 = typeof globalThis.location  //BYTECODE_POS: 187 
 v12 = "undefined"                 //BYTECODE_POS: 189 
 v11 = v11 === v12                 //BYTECODE_POS: 191 
 // if (!v11) skip to 197          //BYTECODE_POS: 192 
 v11 = "undefined"                 //BYTECODE_POS: 194 
 // go foward to 205               //BYTECODE_POS: 196 
 v12 = undefined                   //BYTECODE_POS: 198 
 v13 = executionStack[0];          //BYTECODE_POS: 199 depth
 v14 = location                    //BYTECODE_POS: 202 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v12 = v13(v14);                   //BYTECODE_POS: 204 // context 12 could be custom vm or native func
 v13 = executionStack[3];          //BYTECODE_POS: 206 depth
 v12 = v12 === v13                 //BYTECODE_POS: 209 
 // if (!v12) skip to 213          //BYTECODE_POS: 210 
 v12 = true                        //BYTECODE_POS: 212 
 //return v12;                     //BYTECODE_POS: 213 
 v12 = undefined                   //BYTECODE_POS: 214 
 v13 = arguments;                  //BYTECODE_POS: 215 depth
 v12 = v13();                      //BYTECODE_POS: 218 // context 12 could be custom vm or native func
 v12 = !v12                        //BYTECODE_POS: 220 
 // if (!v12) skip to 261          //BYTECODE_POS: 221 
 v12 = typeof globalThis.history   //BYTECODE_POS: 223 
 v13 = "undefined"                 //BYTECODE_POS: 225 
 v12 = v12 === v13                 //BYTECODE_POS: 227 
 // if (!v12) skip to 233          //BYTECODE_POS: 228 
 v12 = "undefined"                 //BYTECODE_POS: 230 
 // go foward to 241               //BYTECODE_POS: 232 
 v13 = undefined                   //BYTECODE_POS: 234 
 v14 = executionStack[0];          //BYTECODE_POS: 235 depth
 v15 = history                     //BYTECODE_POS: 238 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v13 = v14(v15);                   //BYTECODE_POS: 240 // context 13 could be custom vm or native func
 v14 = executionStack[3];          //BYTECODE_POS: 242 depth
 v13 = v13 === v14                 //BYTECODE_POS: 245 
 // if (v13) skip 10               //BYTECODE_POS: 246 
 v14 = history                     //BYTECODE_POS: 248 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v15 = v14                         //BYTECODE_POS: 250 
 v15 = v15.toString;               //BYTECODE_POS: 251 
 v14 = v15();                      //BYTECODE_POS: 253 // context 14 could be custom vm or native func
 v15 = "[object History]"          //BYTECODE_POS: 255 
 v14 = v14 !== v15;                //BYTECODE_POS: 257 
 // if (!v14) skip to 261          //BYTECODE_POS: 258 
 v14 = true                        //BYTECODE_POS: 260 
 //return v14;                     //BYTECODE_POS: 261 
 v14 = false;                      //BYTECODE_POS: 262 
 //return v14;                     //BYTECODE_POS: 263 
}