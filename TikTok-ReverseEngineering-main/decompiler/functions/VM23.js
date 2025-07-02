function VM23() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v0 = v0.wID;                      //BYTECODE_POS: 4 
 v1 = 0;                           //BYTECODE_POS: 6 
 v0.load = v0;                     //BYTECODE_POS: 8 
 v0 = window                       //BYTECODE_POS: 10 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.Image;                    //BYTECODE_POS: 12 
 v0 = typeof v0;                   //BYTECODE_POS: 14 
 v1 = "function"                   //BYTECODE_POS: 15 
 v0 = v0 === v1                    //BYTECODE_POS: 17 
 // if (!v0) skip to 61            //BYTECODE_POS: 18 
 v0 = window                       //BYTECODE_POS: 20 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.Image;                    //BYTECODE_POS: 22 
 v0 = new v0()                     //BYTECODE_POS: 24 
 executionStack[2] = v0;           //BYTECODE_POS: 26 // depth = 0
 v0 = document                     //BYTECODE_POS: 29 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 31 
 v1 = v1.createElement;            //BYTECODE_POS: 32 
 v2 = "canvas"                     //BYTECODE_POS: 34 
 v0 = v1(v2);                      //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 38 
 v1 = v1.getContext;               //BYTECODE_POS: 39 
 v2 = "2d"                         //BYTECODE_POS: 41 
 v0 = v1(v2);                      //BYTECODE_POS: 43 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 45 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 48 depth
 v1 = functionVM24;                //BYTECODE_POS: 51 
 v0.onload = v0;                   //BYTECODE_POS: 53 
 v0 = executionStack[2];           //BYTECODE_POS: 55 depth
 v1 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"//BYTECODE_POS: 58 
 v0.src = v0;                      //BYTECODE_POS: 60 
 // go foward to 75                //BYTECODE_POS: 62 
 executionStack[4] = v-1;          //BYTECODE_POS: 64 // depth = 0
 v-1 = executionStack[2];          //BYTECODE_POS: 67 depth
 v-1 = v-1.wID;                    //BYTECODE_POS: 70 
 v0 = 1;                           //BYTECODE_POS: 72 
 v-1.load = v-1;                   //BYTECODE_POS: 74 
 v-1 = undefined                   //BYTECODE_POS: 76 
 //return v-1;                     //BYTECODE_POS: 77 
}