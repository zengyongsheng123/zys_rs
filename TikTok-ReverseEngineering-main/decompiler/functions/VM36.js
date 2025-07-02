function VM36(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[6];           //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 7 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 10 depth
 // if (!v0) skip to 30            //BYTECODE_POS: 13 
 v0 = executionStack[3];           //BYTECODE_POS: 15 depth
 v1 = v0                           //BYTECODE_POS: 18 
 v1 = v1.then;                     //BYTECODE_POS: 19 
 v2 = functionVM37;                //BYTECODE_POS: 21 
 v0 = v1(v2);                      //BYTECODE_POS: 23 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 25 
 v1 = v1.catch;                    //BYTECODE_POS: 26 
 v0 = v1();                        //BYTECODE_POS: 28 // context 0 could be custom vm or native func
 // go foward to 54                //BYTECODE_POS: 31 
 executionStack[4] = v-1;          //BYTECODE_POS: 33 // depth = 0
 v-1 = executionStack[11];         //BYTECODE_POS: 36 depth
 v0 = v-1                          //BYTECODE_POS: 39 
 v0 = v0.push;                     //BYTECODE_POS: 40 
 v1 = {};                          //BYTECODE_POS: 42 
 v2 = executionStack[4];           //BYTECODE_POS: 43 depth
 v1.err = v2;                      //BYTECODE_POS: 46 
 v2 = "d_r"                        //BYTECODE_POS: 48 
 v1.type = v2;                     //BYTECODE_POS: 50 
 v-1 = v0(v1);                     //BYTECODE_POS: 52 // context -1 could be custom vm or native func
 v-1 = undefined                   //BYTECODE_POS: 55 
 v0 = executionStack[2];           //BYTECODE_POS: 56 depth
 v1 = ""                           //BYTECODE_POS: 59 
 v-1 = v0(v1);                     //BYTECODE_POS: 61 // context -1 could be custom vm or native func
 v-1 = undefined                   //BYTECODE_POS: 64 
 //return v-1;                     //BYTECODE_POS: 65 
}