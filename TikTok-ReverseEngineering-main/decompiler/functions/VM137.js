function VM137(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Date                         //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.prototype;                //BYTECODE_POS: 3 
 v0 = v0.toString;                 //BYTECODE_POS: 5 
 v1 = v0                           //BYTECODE_POS: 7 
 v1 = v1.call;                     //BYTECODE_POS: 8 
 v2 = executionStack[2];           //BYTECODE_POS: 10 depth
 v0 = v1(v2);                      //BYTECODE_POS: 13 // context 0 could be custom vm or native func
 // go foward to 55                //BYTECODE_POS: 16 
 executionStack[3] = v-1;          //BYTECODE_POS: 18 // depth = 0
 v-1 = executionStack[3];          //BYTECODE_POS: 21 depth
 v-1 = v-1.stack;                  //BYTECODE_POS: 24 
 v0 = v-1                          //BYTECODE_POS: 26 
 v0 = v0.includes;                 //BYTECODE_POS: 27 
 v1 = "Proxy."                     //BYTECODE_POS: 29 
 v-1 = v0(v1);                     //BYTECODE_POS: 31 // context -1 could be custom vm or native func
 // if (v-1) skip 12               //BYTECODE_POS: 33 
 v0 = executionStack[3];           //BYTECODE_POS: 35 depth
 v0 = v0.stack;                    //BYTECODE_POS: 38 
 v1 = v0                           //BYTECODE_POS: 40 
 v1 = v1.includes;                 //BYTECODE_POS: 41 
 v2 = "proxy."                     //BYTECODE_POS: 43 
 v0 = v1(v2);                      //BYTECODE_POS: 45 // context 0 could be custom vm or native func
 // if (!v0) skip to 52            //BYTECODE_POS: 47 
 v0 = 2;                           //BYTECODE_POS: 49 
 // go foward to 54                //BYTECODE_POS: 51 
 v1 = 1;                           //BYTECODE_POS: 53 
 //return v1;                      //BYTECODE_POS: 55 
 v1 = 1;                           //BYTECODE_POS: 56 
 //return v1;                      //BYTECODE_POS: 58 
}