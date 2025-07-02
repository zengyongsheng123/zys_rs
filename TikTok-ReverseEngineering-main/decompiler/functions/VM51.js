function VM51(arg0) {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 // if (!v0) skip to 12            //BYTECODE_POS: 4 
 v0 = {};                          //BYTECODE_POS: 6 
 v1 = executionStack[2];           //BYTECODE_POS: 7 depth
 v0.data = v1;                     //BYTECODE_POS: 10 
 //return v0;                      //BYTECODE_POS: 12 
 v0 = executionStack[2];           //BYTECODE_POS: 13 depth
 // if (!v0) skip to 24            //BYTECODE_POS: 16 
 v0 = {};                          //BYTECODE_POS: 18 
 v1 = 1;                           //BYTECODE_POS: 19 
 v1 = -v1                          //BYTECODE_POS: 21 
 v0.data = v1;                     //BYTECODE_POS: 22 
 //return v0;                      //BYTECODE_POS: 24 
 v0 = undefined                    //BYTECODE_POS: 25 
 v1 = executionStack[3];           //BYTECODE_POS: 26 depth
 v0 = v1();                        //BYTECODE_POS: 29 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 31 // depth = 1
 v0 = {};                          //BYTECODE_POS: 34 
 v1 = executionStack[2];           //BYTECODE_POS: 35 depth
 v0.data = v1;                     //BYTECODE_POS: 38 
 //return v0;                      //BYTECODE_POS: 40 
 // go foward to 64                //BYTECODE_POS: 41 
 executionStack[3] = v-1;          //BYTECODE_POS: 43 // depth = 0
 v-1 = {};                         //BYTECODE_POS: 46 
 v0 = 1;                           //BYTECODE_POS: 47 
 v0 = -v0                          //BYTECODE_POS: 49 
 v-1.data = v0;                    //BYTECODE_POS: 50 
 v0 = {};                          //BYTECODE_POS: 52 
 v1 = executionStack[3];           //BYTECODE_POS: 53 depth
 v0.err = v1;                      //BYTECODE_POS: 56 
 v1 = "c_c"                        //BYTECODE_POS: 58 
 v0.type = v1;                     //BYTECODE_POS: 60 
 v-1.error = v0;                   //BYTECODE_POS: 62 
 //return v-1;                     //BYTECODE_POS: 64 
 v-1 = undefined                   //BYTECODE_POS: 65 
 //return v-1;                     //BYTECODE_POS: 66 
}