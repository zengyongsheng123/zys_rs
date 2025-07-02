function VM42(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = arguments;                   //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 v1 = 3;                           //BYTECODE_POS: 6 
 v0 = v0 > v1                      //BYTECODE_POS: 8 
 // if (!v0) skip 7 to 17          //BYTECODE_POS: 9 
 v1 = arguments;                   //BYTECODE_POS: 11 depth
 v1 = v1[3];                       //BYTECODE_POS: 14 
 v2 = undefined                    //BYTECODE_POS: 16 
 v1 = v1 !== v2;                   //BYTECODE_POS: 17 
 // if (!v1) skip to 26            //BYTECODE_POS: 18 
 v1 = arguments;                   //BYTECODE_POS: 20 depth
 v1 = v1[3];                       //BYTECODE_POS: 23 
 // go foward to 27                //BYTECODE_POS: 25 
 v2 = false;                       //BYTECODE_POS: 27 
 executionStack[5] = v2;           //BYTECODE_POS: 28 // depth = 0
 v2 = arguments;                   //BYTECODE_POS: 31 depth
 v2 = v2.length;                   //BYTECODE_POS: 34 
 v3 = 4;                           //BYTECODE_POS: 36 
 v2 = v2 > v3                      //BYTECODE_POS: 38 
 // if (!v2) skip to 47            //BYTECODE_POS: 39 
 v2 = arguments;                   //BYTECODE_POS: 41 depth
 v2 = v2[4];                       //BYTECODE_POS: 44 
 // go foward to 48                //BYTECODE_POS: 46 
 v3 = undefined                    //BYTECODE_POS: 48 
 executionStack[6] = v3;           //BYTECODE_POS: 49 // depth = 0
 v3 = arguments;                   //BYTECODE_POS: 52 depth
 v3 = v3.length;                   //BYTECODE_POS: 55 
 v4 = 5;                           //BYTECODE_POS: 57 
 v3 = v3 > v4                      //BYTECODE_POS: 59 
 // if (!v3) skip 7 to 68          //BYTECODE_POS: 60 
 v4 = arguments;                   //BYTECODE_POS: 62 depth
 v4 = v4[5];                       //BYTECODE_POS: 65 
 v5 = undefined                    //BYTECODE_POS: 67 
 v4 = v4 !== v5;                   //BYTECODE_POS: 68 
 // if (!v4) skip to 77            //BYTECODE_POS: 69 
 v4 = arguments;                   //BYTECODE_POS: 71 depth
 v4 = v4[5];                       //BYTECODE_POS: 74 
 // go foward to 78                //BYTECODE_POS: 76 
 v5 = false;                       //BYTECODE_POS: 78 
 executionStack[7] = v5;           //BYTECODE_POS: 79 // depth = 0
 v5 = executionStack[12];          //BYTECODE_POS: 82 depth
 // if (!v5) skip 4 to 90          //BYTECODE_POS: 85 
 v6 = executionStack[7];           //BYTECODE_POS: 87 depth
 v6 = !v6                          //BYTECODE_POS: 90 
 // if (!v6) skip to 94            //BYTECODE_POS: 91 
 v6 = undefined                    //BYTECODE_POS: 93 
 //return v6;                      //BYTECODE_POS: 94 
 v6 = executionStack[2];           //BYTECODE_POS: 95 depth
 executionStack[9] = v6;           //BYTECODE_POS: 98 // depth = 1
 v6 = executionStack[4];           //BYTECODE_POS: 101 depth
 executionStack[10] = v6;          //BYTECODE_POS: 104 // depth = 1
 v6 = executionStack[3];           //BYTECODE_POS: 107 depth
 executionStack[11] = v6;          //BYTECODE_POS: 110 // depth = 1
 v6 = 1;                           //BYTECODE_POS: 113 
 executionStack[8] = v6;           //BYTECODE_POS: 115 // depth = 0
 v6 = 2;                           //BYTECODE_POS: 118 
 executionStack[9] = v6;           //BYTECODE_POS: 120 // depth = 0
 v6 = 1;                           //BYTECODE_POS: 123 
 executionStack[10] = v6;          //BYTECODE_POS: 125 // depth = 0
 v6 = undefined                    //BYTECODE_POS: 128 
 v7 = executionStack[22];          //BYTECODE_POS: 129 depth
 v6 = v7();                        //BYTECODE_POS: 132 // context 6 could be custom vm or native func
 executionStack[11] = v6;          //BYTECODE_POS: 134 // depth = 0
 v6 = executionStack[11];          //BYTECODE_POS: 137 depth
 v6 = !v6                          //BYTECODE_POS: 140 
 // if (!v6) skip to 144           //BYTECODE_POS: 141 
 v6 = undefined                    //BYTECODE_POS: 143 
 //return v6;                      //BYTECODE_POS: 144 
 v6 = executionStack[11];          //BYTECODE_POS: 145 depth
 v7 = {};                          //BYTECODE_POS: 148 
 v8 = executionStack[11];          //BYTECODE_POS: 149 depth
 v8 = v8.wID;                      //BYTECODE_POS: 152 
 v8 = v8.msgType;                  //BYTECODE_POS: 154 
 v7.msgType = v8;                  //BYTECODE_POS: 156 
 v8 = executionStack[8];           //BYTECODE_POS: 158 depth
 v7.msgSrcProp = v8;               //BYTECODE_POS: 161 
 v8 = executionStack[10];          //BYTECODE_POS: 163 depth
 v7.msgProtocol = v8;              //BYTECODE_POS: 166 
 v8 = executionStack[4];           //BYTECODE_POS: 168 depth
 v8 = v8.aid;                      //BYTECODE_POS: 171 
 v7.aid = v8;                      //BYTECODE_POS: 173 
 v8 = executionStack[2];           //BYTECODE_POS: 175 depth
 v8 = v8.aidList;                  //BYTECODE_POS: 178 
 v7.aidList = v8;                  //BYTECODE_POS: 180 
 v6.msgMeta = v6;                  //BYTECODE_POS: 182 
 v6 = executionStack[5];           //BYTECODE_POS: 184 depth
 // if (!v6) skip to 258           //BYTECODE_POS: 187 
 v6 = executionStack[11];          //BYTECODE_POS: 189 depth
 v6 = v6.msgMeta;                  //BYTECODE_POS: 192 
 v7 = executionStack[9];           //BYTECODE_POS: 194 depth
 v6.msgSrcProp = v6;               //BYTECODE_POS: 197 
 v6 = executionStack[6];           //BYTECODE_POS: 199 depth
 // opcode 14                      //BYTECODE_POS: 202 
 //get depth of 0 from executionStack//BYTECODE_POS: 204 
 v6 = executionStack;              //BYTECODE_POS: 204 
 v7 = 12                           //BYTECODE_POS: NO BYTECODE POS ADDED 
 //case 54                         //BYTECODE_POS: 207 
 // if (!v6) skip to 258           //BYTECODE_POS: 209 
 v6 = executionStack[11];          //BYTECODE_POS: 211 depth
 v7 = executionStack[12];          //BYTECODE_POS: 214 depth
 v6 = v6[v7]                       //BYTECODE_POS: 217 
 // if (!v6) skip to 242           //BYTECODE_POS: 218 
 v6 = undefined                    //BYTECODE_POS: 220 
 v7 = executionStack[25];          //BYTECODE_POS: 221 depth
 v8 = executionStack[11];          //BYTECODE_POS: 224 depth
 v9 = executionStack[12];          //BYTECODE_POS: 227 depth
 v8 = v8[v9]                       //BYTECODE_POS: 230 
 v9 = executionStack[6];           //BYTECODE_POS: 231 depth
 v10 = executionStack[12];         //BYTECODE_POS: 234 depth
 v9 = v9[v10]                      //BYTECODE_POS: 237 
 v6 = v7(v8,v9);                   //BYTECODE_POS: 238 // context 6 could be custom vm or native func
 // go foward to 256               //BYTECODE_POS: 241 
 v6 = executionStack[11];          //BYTECODE_POS: 243 depth
 v7 = executionStack[12];          //BYTECODE_POS: 246 depth
 v8 = executionStack[6];           //BYTECODE_POS: 249 depth
 v9 = executionStack[12];          //BYTECODE_POS: 252 depth
 v8 = v8[v9]                       //BYTECODE_POS: 255 
 v6[v7] = v8;                      //BYTECODE_POS: 256 
 // go back to 203                 //BYTECODE_POS: 257 
 v6 = undefined                    //BYTECODE_POS: 259 
 v7 = executionStack[23];          //BYTECODE_POS: 260 depth
 v8 = executionStack[11];          //BYTECODE_POS: 263 depth
 v6 = v7(v8);                      //BYTECODE_POS: 266 // context 6 could be custom vm or native func
 // go foward to 292               //BYTECODE_POS: 269 
 executionStack[14] = v5;          //BYTECODE_POS: 271 // depth = 0
 v5 = executionStack[11];          //BYTECODE_POS: 274 depth
 v6 = v5                           //BYTECODE_POS: 277 
 v6 = v6.push;                     //BYTECODE_POS: 278 
 v7 = {};                          //BYTECODE_POS: 280 
 v8 = executionStack[14];          //BYTECODE_POS: 281 depth
 v7.err = v8;                      //BYTECODE_POS: 284 
 v8 = "d_o"                        //BYTECODE_POS: 286 
 v7.type = v8;                     //BYTECODE_POS: 288 
 v5 = v6(v7);                      //BYTECODE_POS: 290 // context 5 could be custom vm or native func
 v5 = undefined                    //BYTECODE_POS: 293 
 //return v5;                      //BYTECODE_POS: 294 
}