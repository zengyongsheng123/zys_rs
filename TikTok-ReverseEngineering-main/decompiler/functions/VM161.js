function VM161(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[2];           //BYTECODE_POS: 3 depth
 v0 = v0[v1]                       //BYTECODE_POS: 6 
 executionStack[3] = v0;           //BYTECODE_POS: 7 // depth = 0
 v0 = "__web_idontknowwhyiwriteit__"//BYTECODE_POS: 10 
 executionStack[4] = v0;           //BYTECODE_POS: 12 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 15 depth
 v1 = v0                           //BYTECODE_POS: 18 
 v1 = v1.setItem;                  //BYTECODE_POS: 19 
 v2 = executionStack[4];           //BYTECODE_POS: 21 depth
 v3 = executionStack[4];           //BYTECODE_POS: 24 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 27 // context 0 could be custom vm or native func
 v0 = executionStack[3];           //BYTECODE_POS: 30 depth
 v1 = v0                           //BYTECODE_POS: 33 
 v1 = v1.removeItem;               //BYTECODE_POS: 34 
 v2 = executionStack[4];           //BYTECODE_POS: 36 depth
 v0 = v1(v2);                      //BYTECODE_POS: 39 // context 0 could be custom vm or native func
 v0 = 0;                           //BYTECODE_POS: 42 
 v0 = !v0                          //BYTECODE_POS: 44 
 //return v0;                      //BYTECODE_POS: 45 
 // go foward to 54                //BYTECODE_POS: 46 
 executionStack[5] = v-1;          //BYTECODE_POS: 48 // depth = 0
 v-1 = 1;                          //BYTECODE_POS: 51 
 v-1 = !v-1                        //BYTECODE_POS: 53 
 //return v-1;                     //BYTECODE_POS: 54 
 v-1 = undefined                   //BYTECODE_POS: 55 
 //return v-1;                     //BYTECODE_POS: 56 
}