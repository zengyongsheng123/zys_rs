function VM155(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = ""                           //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 6 
 v1 = executionStack[3];           //BYTECODE_POS: 7 depth
 v2 = executionStack[2];           //BYTECODE_POS: 10 depth
 v0 = v1(v2);                      //BYTECODE_POS: 13 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 15 
 // go foward to 26                //BYTECODE_POS: 16 
 executionStack[5] = v-1;          //BYTECODE_POS: 18 // depth = 0
 v-1 = executionStack[5];          //BYTECODE_POS: 21 depth
 executionStack[3] = v-1;          //BYTECODE_POS: 24 // depth = 0
 v-1 = JSON                        //BYTECODE_POS: 27 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v-1                          //BYTECODE_POS: 29 
 v0 = v0.stringify;                //BYTECODE_POS: 30 
 v1 = executionStack[2];           //BYTECODE_POS: 32 depth
 v-1 = v0(v1);                     //BYTECODE_POS: 35 // context -1 could be custom vm or native func
 executionStack[4] = v-1;          //BYTECODE_POS: 37 // depth = 0
 v-1 = arguments;                  //BYTECODE_POS: 40 depth
 v-1 = v-1.slardarErrs;            //BYTECODE_POS: 43 
 v0 = v-1                          //BYTECODE_POS: 45 
 v0 = v0.push;                     //BYTECODE_POS: 46 
 v1 = {};                          //BYTECODE_POS: 48 
 v2 = executionStack[3];           //BYTECODE_POS: 49 depth
 v1.err = v2;                      //BYTECODE_POS: 52 
 v2 = "sr_string"                  //BYTECODE_POS: 54 
 v1.type = v2;                     //BYTECODE_POS: 56 
 v2 = executionStack[4];           //BYTECODE_POS: 58 depth
 v3 = v2                           //BYTECODE_POS: 61 
 v3 = v3.substring;                //BYTECODE_POS: 62 
 v4 = 0;                           //BYTECODE_POS: 64 
 v5 = 20;                          //BYTECODE_POS: 66 
 v2 = v3(v4,v5);                   //BYTECODE_POS: 68 // context 2 could be custom vm or native func
 v1.data = v2;                     //BYTECODE_POS: 70 
 v-1 = v0(v1);                     //BYTECODE_POS: 72 // context -1 could be custom vm or native func
 v-1 = executionStack[4];          //BYTECODE_POS: 75 depth
 //return v-1;                     //BYTECODE_POS: 78 
}