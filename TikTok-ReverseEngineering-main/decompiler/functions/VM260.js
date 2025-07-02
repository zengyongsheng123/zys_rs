function VM260(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[3];           //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 // if (!v0) skip to 27            //BYTECODE_POS: 7 
 v0 = indexedDB                    //BYTECODE_POS: 9 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 11 
 v1 = v1.open;                     //BYTECODE_POS: 12 
 v2 = "test"                       //BYTECODE_POS: 14 
 v0 = v1(v2);                      //BYTECODE_POS: 16 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 18 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 21 depth
 v1 = functionVM261;               //BYTECODE_POS: 24 
 v0.onerror = v0;                  //BYTECODE_POS: 26 
 v0 = undefined                    //BYTECODE_POS: 28 
 v1 = arguments;                   //BYTECODE_POS: 29 depth
 v0 = v1();                        //BYTECODE_POS: 32 // context 0 could be custom vm or native func
 // if (!v0) skip to 95            //BYTECODE_POS: 34 
 v0 = window                       //BYTECODE_POS: 36 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.sessionStorage;           //BYTECODE_POS: 38 
 v1 = v0                           //BYTECODE_POS: 40 
 v1 = v1.setItem;                  //BYTECODE_POS: 41 
 v2 = "someKeyHereByted"           //BYTECODE_POS: 43 
 v3 = ""                           //BYTECODE_POS: 45 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 47 // context 0 could be custom vm or native func
 v0 = window                       //BYTECODE_POS: 50 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.sessionStorage;           //BYTECODE_POS: 52 
 v1 = v0                           //BYTECODE_POS: 54 
 v1 = v1.removeItem;               //BYTECODE_POS: 55 
 v2 = "someKeyHereByted"           //BYTECODE_POS: 57 
 v0 = v1(v2);                      //BYTECODE_POS: 59 // context 0 could be custom vm or native func
 // go foward to 95                //BYTECODE_POS: 62 
 executionStack[4] = v-1;          //BYTECODE_POS: 64 // depth = 0
 v-1 = executionStack[4];          //BYTECODE_POS: 67 depth
 v-1 = v-1.code;                   //BYTECODE_POS: 70 
 v0 = DOMException                 //BYTECODE_POS: 72 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.QUOTA_EXCEEDED_ERR;       //BYTECODE_POS: 74 
 v-1 = v-1 === v0                  //BYTECODE_POS: 76 
 // if (!v-1) skip 9 to 87         //BYTECODE_POS: 77 
 v0 = window                       //BYTECODE_POS: 79 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.sessionStorage;           //BYTECODE_POS: 81 
 v0 = v0.length;                   //BYTECODE_POS: 83 
 v1 = 0;                           //BYTECODE_POS: 85 
 v0 = v0 === v1                    //BYTECODE_POS: 87 
 // if (!v0) skip to 95            //BYTECODE_POS: 88 
 v0 = executionStack[2];           //BYTECODE_POS: 90 depth
 v1 = true                         //BYTECODE_POS: 93 
 v0.incognito = v0;                //BYTECODE_POS: 94 
 v0 = undefined                    //BYTECODE_POS: 96 
 v1 = executionStack[2];           //BYTECODE_POS: 97 depth
 v0 = v1();                        //BYTECODE_POS: 100 // context 0 could be custom vm or native func
 // if (!v0) skip to 128           //BYTECODE_POS: 102 
 v0 = window                       //BYTECODE_POS: 104 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.indexedDB;                //BYTECODE_POS: 106 
 v0 = !v0                          //BYTECODE_POS: 108 
 // if (!v0) skip 10 to 120        //BYTECODE_POS: 109 
 v1 = window                       //BYTECODE_POS: 111 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.PointerEvent;             //BYTECODE_POS: 113 
 // if (v1) skip 4                 //BYTECODE_POS: 115 
 v2 = window                       //BYTECODE_POS: 117 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.MSPointerEvent;           //BYTECODE_POS: 119 
 // if (!v2) skip to 128           //BYTECODE_POS: 121 
 v2 = executionStack[2];           //BYTECODE_POS: 123 depth
 v3 = true                         //BYTECODE_POS: 126 
 v2.incognito = v2;                //BYTECODE_POS: 127 
 v2 = executionStack[0];           //BYTECODE_POS: 129 depth
 v2 = v2.envcode;                  //BYTECODE_POS: 132 
 v3 = executionStack[2];           //BYTECODE_POS: 134 depth
 v3 = v3.incognito;                //BYTECODE_POS: 137 
 v4 = 2;                           //BYTECODE_POS: 139 
 v3 <<= v4                         //BYTECODE_POS: 141 
 v2 |= v3;                         //BYTECODE_POS: 142 
 v3 = executionStack[0];           //BYTECODE_POS: 143 depth
 v4 = "envcode"                    //BYTECODE_POS: 146 
 v3[v4] = v2                       //BYTECODE_POS: 148 
 v2 = undefined                    //BYTECODE_POS: 150 
 //return v2;                      //BYTECODE_POS: 151 
}