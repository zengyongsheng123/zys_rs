function VM95(arg0, arg1) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = ""                           //BYTECODE_POS: 1 
 executionStack[4] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 6 depth
 // if (!v0) skip 6 to 16          //BYTECODE_POS: 9 
 v1 = executionStack[2];           //BYTECODE_POS: 11 depth
 v2 = Request                      //BYTECODE_POS: 14 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1 instanceof v2;            //BYTECODE_POS: 16 
 // if (!v1) skip to 48            //BYTECODE_POS: 17 
 v1 = executionStack[2];           //BYTECODE_POS: 19 depth
 v1 = v1.headers;                  //BYTECODE_POS: 22 
 v2 = v1                           //BYTECODE_POS: 24 
 v2 = v2.get;                      //BYTECODE_POS: 25 
 v3 = "content-type"               //BYTECODE_POS: 27 
 v1 = v2(v3);                      //BYTECODE_POS: 29 // context 1 could be custom vm or native func
 executionStack[5] = v1;           //BYTECODE_POS: 31 // depth = 0
 v1 = executionStack[5];           //BYTECODE_POS: 34 depth
 // if (!v1) skip to 44            //BYTECODE_POS: 37 
 v1 = executionStack[5];           //BYTECODE_POS: 39 depth
 executionStack[4] = v1;           //BYTECODE_POS: 42 // depth = 0
 v1 = executionStack[4];           //BYTECODE_POS: 45 depth
 //return v1;                      //BYTECODE_POS: 48 
 v1 = executionStack[3];           //BYTECODE_POS: 49 depth
 // if (!v1) skip 5 to 58          //BYTECODE_POS: 52 
 v2 = executionStack[3];           //BYTECODE_POS: 54 depth
 v2 = v2.headers;                  //BYTECODE_POS: 57 
 // if (!v2) skip to 264           //BYTECODE_POS: 59 
 v2 = executionStack[3];           //BYTECODE_POS: 61 depth
 // if (!v2) skip 8 to 73          //BYTECODE_POS: 64 
 v3 = executionStack[3];           //BYTECODE_POS: 66 depth
 v3 = v3.headers;                  //BYTECODE_POS: 69 
 v4 = Headers                      //BYTECODE_POS: 71 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3 instanceof v4;            //BYTECODE_POS: 73 
 // if (!v3) skip to 105           //BYTECODE_POS: 74 
 v3 = executionStack[3];           //BYTECODE_POS: 76 depth
 v3 = v3.headers;                  //BYTECODE_POS: 79 
 v4 = v3                           //BYTECODE_POS: 81 
 v4 = v4.get;                      //BYTECODE_POS: 82 
 v5 = "content-type"               //BYTECODE_POS: 84 
 v3 = v4(v5);                      //BYTECODE_POS: 86 // context 3 could be custom vm or native func
 executionStack[6] = v3;           //BYTECODE_POS: 88 // depth = 0
 v3 = executionStack[6];           //BYTECODE_POS: 91 depth
 // if (!v3) skip to 101           //BYTECODE_POS: 94 
 v3 = executionStack[6];           //BYTECODE_POS: 96 depth
 executionStack[4] = v3;           //BYTECODE_POS: 99 // depth = 0
 v3 = executionStack[4];           //BYTECODE_POS: 102 depth
 //return v3;                      //BYTECODE_POS: 105 
 v3 = executionStack[3];           //BYTECODE_POS: 106 depth
 v3 = v3.headers;                  //BYTECODE_POS: 109 
 v4 = Array                        //BYTECODE_POS: 111 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3 instanceof v4;            //BYTECODE_POS: 113 
 // if (!v3) skip to 173           //BYTECODE_POS: 114 
 v3 = 0;                           //BYTECODE_POS: 116 
 executionStack[7] = v3;           //BYTECODE_POS: 118 // depth = 0
 v3 = executionStack[7];           //BYTECODE_POS: 121 depth
 v4 = executionStack[3];           //BYTECODE_POS: 124 depth
 v4 = v4.headers;                  //BYTECODE_POS: 127 
 v4 = v4.length;                   //BYTECODE_POS: 129 
 v3 = v3 < v4;                     //BYTECODE_POS: 131 
 // if (!v3) skip to 173           //BYTECODE_POS: 132 
 v3 = executionStack[3];           //BYTECODE_POS: 134 depth
 v3 = v3.headers;                  //BYTECODE_POS: 137 
 v4 = executionStack[7];           //BYTECODE_POS: 139 depth
 v3 = v3[v4]                       //BYTECODE_POS: 142 
 v3 = v3[0];                       //BYTECODE_POS: 143 
 v4 = v3                           //BYTECODE_POS: 145 
 v4 = v4.toLowerCase;              //BYTECODE_POS: 146 
 v3 = v4();                        //BYTECODE_POS: 148 // context 3 could be custom vm or native func
 v4 = "content-type"               //BYTECODE_POS: 150 
 v3 = v3 === v4                    //BYTECODE_POS: 152 
 // if (!v3) skip to 166           //BYTECODE_POS: 153 
 v3 = executionStack[3];           //BYTECODE_POS: 155 depth
 v3 = v3.headers;                  //BYTECODE_POS: 158 
 v4 = executionStack[7];           //BYTECODE_POS: 160 depth
 v3 = v3[v4]                       //BYTECODE_POS: 163 
 v3 = v3[1];                       //BYTECODE_POS: 164 
 //return v3;                      //BYTECODE_POS: 166 
 //get depth of 0 from executionStack//BYTECODE_POS: 167 
 v3 = executionStack;              //BYTECODE_POS: 167 
 v4 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v3 = v3[v4]++                     //BYTECODE_POS: 170 // replace the executionStack var with an index incremented
 // go back to 120                 //BYTECODE_POS: 172 
 v3 = executionStack[3];           //BYTECODE_POS: 174 depth
 v3 = v3.headers;                  //BYTECODE_POS: 177 
 v4 = Object                       //BYTECODE_POS: 179 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3 instanceof v4;            //BYTECODE_POS: 181 
 // if (!v3) skip to 264           //BYTECODE_POS: 182 
 v3 = Object                       //BYTECODE_POS: 184 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v3                           //BYTECODE_POS: 186 
 v4 = v4.keys;                     //BYTECODE_POS: 187 
 v5 = executionStack[3];           //BYTECODE_POS: 189 depth
 v5 = v5.headers;                  //BYTECODE_POS: 192 
 v3 = v4(v5);                      //BYTECODE_POS: 194 // context 3 could be custom vm or native func
 executionStack[8] = v3;           //BYTECODE_POS: 196 // depth = 0
 v3 = 0;                           //BYTECODE_POS: 199 
 executionStack[9] = v3;           //BYTECODE_POS: 201 // depth = 0
 v3 = executionStack[8];           //BYTECODE_POS: 204 depth
 executionStack[10] = v3;          //BYTECODE_POS: 207 // depth = 0
 v3 = executionStack[9];           //BYTECODE_POS: 210 depth
 v4 = executionStack[10];          //BYTECODE_POS: 213 depth
 v4 = v4.length;                   //BYTECODE_POS: 216 
 v3 = v3 < v4;                     //BYTECODE_POS: 218 
 // if (!v3) skip to 260           //BYTECODE_POS: 219 
 v3 = executionStack[10];          //BYTECODE_POS: 221 depth
 v4 = executionStack[9];           //BYTECODE_POS: 224 depth
 v3 = v3[v4]                       //BYTECODE_POS: 227 
 executionStack[11] = v3;          //BYTECODE_POS: 228 // depth = 0
 v3 = executionStack[11];          //BYTECODE_POS: 231 depth
 v4 = v3                           //BYTECODE_POS: 234 
 v4 = v4.toLowerCase;              //BYTECODE_POS: 235 
 v3 = v4();                        //BYTECODE_POS: 237 // context 3 could be custom vm or native func
 v4 = "content-type"               //BYTECODE_POS: 239 
 v3 = v3 === v4                    //BYTECODE_POS: 241 
 // if (!v3) skip to 253           //BYTECODE_POS: 242 
 v3 = executionStack[3];           //BYTECODE_POS: 244 depth
 v3 = v3.headers;                  //BYTECODE_POS: 247 
 v4 = executionStack[11];          //BYTECODE_POS: 249 depth
 v3 = v3[v4]                       //BYTECODE_POS: 252 
 //return v3;                      //BYTECODE_POS: 253 
 //get depth of 0 from executionStack//BYTECODE_POS: 254 
 v3 = executionStack;              //BYTECODE_POS: 254 
 v4 = 9                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v3 = v3[v4]++                     //BYTECODE_POS: 257 // replace the executionStack var with an index incremented
 // go back to 209                 //BYTECODE_POS: 259 
 v3 = executionStack[4];           //BYTECODE_POS: 261 depth
 //return v3;                      //BYTECODE_POS: 264 
 v3 = undefined                    //BYTECODE_POS: 265 
 //return v3;                      //BYTECODE_POS: 266 
}