function VM90(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = ""                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 6 
 v1 = executionStack[7];           //BYTECODE_POS: 7 depth
 v2 = executionStack[7];           //BYTECODE_POS: 10 depth
 v3 = executionStack[2];           //BYTECODE_POS: 13 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 16 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 18 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 21 
 v1 = executionStack[7];           //BYTECODE_POS: 22 depth
 v2 = executionStack[6];           //BYTECODE_POS: 25 depth
 v3 = executionStack[2];           //BYTECODE_POS: 28 depth
 v4 = executionStack[4];           //BYTECODE_POS: 31 depth
 v3 = [v3,v4]                      //BYTECODE_POS: 34 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 38 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 41 
 v1 = executionStack[10];          //BYTECODE_POS: 42 depth
 v2 = executionStack[7];           //BYTECODE_POS: 45 depth
 v0 = v1(v2);                      //BYTECODE_POS: 48 // context 0 could be custom vm or native func
 // if (!v0) skip to 120           //BYTECODE_POS: 50 
 v0 = {};                          //BYTECODE_POS: 52 
 v1 = undefined                    //BYTECODE_POS: 53 
 v2 = executionStack[15];          //BYTECODE_POS: 54 depth
 v3 = null                         //BYTECODE_POS: 57 
 v4 = executionStack[5];           //BYTECODE_POS: 58 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 61 // context 1 could be custom vm or native func
 v0.url = v1;                      //BYTECODE_POS: 63 
 executionStack[6] = v0;           //BYTECODE_POS: 65 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 68 
 v1 = executionStack[14];          //BYTECODE_POS: 69 depth
 v2 = executionStack[6];           //BYTECODE_POS: 72 depth
 v3 = executionStack[7];           //BYTECODE_POS: 75 depth
 v4 = executionStack[2];           //BYTECODE_POS: 78 depth
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 81 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 84 
 v1 = executionStack[0];           //BYTECODE_POS: 85 depth
 v2 = executionStack[6];           //BYTECODE_POS: 88 depth
 v3 = undefined                    //BYTECODE_POS: 91 
 v4 = "forreal"                    //BYTECODE_POS: 92 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 94 // context 0 could be custom vm or native func
 executionStack[7] = v0;           //BYTECODE_POS: 96 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 99 
 v1 = executionStack[7];           //BYTECODE_POS: 100 depth
 v2 = executionStack[5];           //BYTECODE_POS: 103 depth
 v3 = executionStack[3];           //BYTECODE_POS: 106 depth
 v4 = executionStack[7];           //BYTECODE_POS: 109 depth
 v3 = [v3,v4]                      //BYTECODE_POS: 112 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 114 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 116 // depth = 0
 // go foward to 126               //BYTECODE_POS: 119 
 v0 = executionStack[5];           //BYTECODE_POS: 121 depth
 executionStack[3] = v0;           //BYTECODE_POS: 124 // depth = 0
 v0 = Request                      //BYTECODE_POS: 127 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[3];           //BYTECODE_POS: 129 depth
 v2 = {};                          //BYTECODE_POS: 132 
 v3 = executionStack[2];           //BYTECODE_POS: 133 depth
 v3 = v3.method;                   //BYTECODE_POS: 136 
 v2.method = v3;                   //BYTECODE_POS: 138 
 v3 = executionStack[8];           //BYTECODE_POS: 140 depth
 v2.headers = v3;                  //BYTECODE_POS: 143 
 v3 = executionStack[2];           //BYTECODE_POS: 145 depth
 v2.body = v3;                     //BYTECODE_POS: 148 
 v3 = executionStack[2];           //BYTECODE_POS: 150 depth
 v3 = v3.referrer;                 //BYTECODE_POS: 153 
 v2.referrer = v3;                 //BYTECODE_POS: 155 
 v3 = executionStack[2];           //BYTECODE_POS: 157 depth
 v3 = v3.referrerPolicy;           //BYTECODE_POS: 160 
 v2.referrerPolicy = v3;           //BYTECODE_POS: 162 
 v3 = executionStack[2];           //BYTECODE_POS: 164 depth
 v3 = v3.mode;                     //BYTECODE_POS: 167 
 v2.mode = v3;                     //BYTECODE_POS: 169 
 v3 = executionStack[2];           //BYTECODE_POS: 171 depth
 v3 = v3.credentials;              //BYTECODE_POS: 174 
 v2.credentials = v3;              //BYTECODE_POS: 176 
 v3 = executionStack[2];           //BYTECODE_POS: 178 depth
 v3 = v3.cache;                    //BYTECODE_POS: 181 
 v2.cache = v3;                    //BYTECODE_POS: 183 
 v3 = executionStack[2];           //BYTECODE_POS: 185 depth
 v3 = v3.redirect;                 //BYTECODE_POS: 188 
 v2.redirect = v3;                 //BYTECODE_POS: 190 
 v3 = executionStack[2];           //BYTECODE_POS: 192 depth
 v3 = v3.integrity;                //BYTECODE_POS: 195 
 v2.integrity = v3;                //BYTECODE_POS: 197 
 v0 = new v0()                     //BYTECODE_POS: 199 
 executionStack[8] = v0;           //BYTECODE_POS: 201 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 204 
 v1 = executionStack[5];           //BYTECODE_POS: 205 depth
 v2 = executionStack[8];           //BYTECODE_POS: 208 depth
 v3 = executionStack[3];           //BYTECODE_POS: 211 depth
 v4 = executionStack[3];           //BYTECODE_POS: 214 depth
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 217 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 219 
}